import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { sendRegistrationEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

async function handlePaymentSuccess(
    userId: string,
    email: string,
    name: string | undefined,
    amount: number,
    status: string,
    metadata: any,
    eventId: string,
    sessionId?: string
) {
    console.log("--- handlePaymentSuccess START ---");
    console.log("Data:", { userId, email, name, amount, status, eventId, sessionId });
    console.log("Metadata:", metadata);

    const { planName, parentName, athleteName, ageTier } = metadata;

    try {
        console.log("Step 1: Upserting user...");
        await prisma.user.upsert({
            where: { id: userId },
            update: {
                email: email,
                name: name || undefined,
            },
            create: {
                id: userId,
                email: email,
                name: name || "Anonymous User",
            }
        });

        // Check if payment already recorded using stripeEventId (Idempotency)
        const existingPayment = await (prisma.payment as any).findFirst({
            where: { stripeEventId: eventId }
        });

        if (existingPayment) {
            console.log("Duplicate payment detected (Event ID), skipping creation.");
        } else {
            console.log("Step 2: Creating payment record...");
            await (prisma.payment as any).create({
                data: {
                    amount: amount,
                    status: status,
                    userId: userId,
                    parentName,
                    athleteName,
                    ageTier,
                    stripeEventId: eventId,
                }
            });
        }

        // 3. Sync Subscription
        console.log("Step 3: Syncing subscription...");
        const now = new Date();
        let endDate = new Date();
        
        const durationMonths = parseInt(metadata?.durationMonths || "3");
        endDate.setMonth(now.getMonth() + durationMonths);
        
        // Add a 48-hour grace period (Task 3)
        endDate.setDate(endDate.getDate() + 2);

        // Use findFirst instead of findUnique/upsert to avoid unique identifier type issues
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                userId: userId,
                athleteName: athleteName || "Unknown Athlete",
                ageTier: ageTier || "U6",
            }
        });

        let subscription;
        if (existingSubscription) {
            subscription = await (prisma.subscription as any).update({
                where: { id: existingSubscription.id },
                data: {
                    planName: planName || "Unknown Plan",
                    parentName,
                    startDate: now,
                    endDate: endDate,
                    status: "active",
                    stripeSessionId: sessionId,
                    updatedAt: new Date(),
                }
            });
        } else {
            subscription = await (prisma.subscription as any).create({
                data: {
                    userId: userId,
                    planName: planName || "Unknown Plan",
                    parentName,
                    athleteName: athleteName || "Unknown Athlete",
                    ageTier: ageTier || "U6",
                    startDate: now,
                    endDate: endDate,
                    status: "active",
                    stripeSessionId: sessionId,
                }
            });
        }

        console.log("Subscription synced:", subscription.id);

        // Send confirmation email
        try {
            console.log("Step 4: Sending confirmation email...");
            await sendRegistrationEmail(email, {
                parentName: parentName || "Parent",
                athleteName: athleteName || "your athlete",
                planName: planName || "Invited Games Membership",
                amount: amount,
                endDate: endDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
            });
            console.log("Email sent successfully.");
        } catch (emailError) {
            console.error("Non-critical error sending confirmation email:", emailError);
        }

        console.log("--- handlePaymentSuccess COMPLETE ---");
    } catch (error: any) {
        console.error("CRITICAL ERROR in handlePaymentSuccess:");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        throw error; // Re-throw to be caught by the main POST handler
    }
}

export async function POST(req: Request) {
    console.log("--- Webhook Received ---");
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        console.log("Webhook Event Validated:", event.type);
    } catch (error: any) {
        console.error(`CRITICAL: Webhook Signature Failed: ${error.message}`);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log("Session Metadata:", session.metadata);
            if (!session?.metadata?.userId) {
                console.warn("User ID is missing in checkout session metadata");
                return new NextResponse("User ID is missing in metadata", { status: 200 });
            }
            await handlePaymentSuccess(
                session.metadata.userId,
                session.customer_email || session.metadata.email || "",
                session.customer_details?.name || session.metadata.name,
                session.amount_total || 0,
                session.payment_status || "succeeded",
                session.metadata,
                event.id,
                session.id
            );
        } else if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log("PaymentIntent Metadata:", paymentIntent.metadata);
            if (!paymentIntent?.metadata?.userId) {
                console.warn("User ID is missing in payment intent metadata");
                return new NextResponse("User ID is missing in metadata", { status: 200 });
            }
            await handlePaymentSuccess(
                paymentIntent.metadata.userId,
                paymentIntent.receipt_email || paymentIntent.metadata.email || "",
                paymentIntent.metadata.name,
                paymentIntent.amount_received,
                paymentIntent.status,
                paymentIntent.metadata,
                event.id
            );
        }
        console.log("--- Webhook Processed Successfully ---");
    } catch (error: any) {
        console.error("--- WEBHOOK PROCESSING ERROR ---");
        console.error("Error Message:", error.message);
        console.error("Stack Trace:", error.stack);
        return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
    }

    return new NextResponse(null, { status: 200 });
}
