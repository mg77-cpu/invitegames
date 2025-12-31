import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {

        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is missing in metadata", { status: 200 });
        }

        try {
            // Ensure user exists (Upsert)
            await prisma.user.upsert({
                where: { id: session.metadata.userId },
                update: {}, // No update needed if exists
                create: {
                    id: session.metadata.userId,
                    email: session.customer_email || "",
                    name: session.customer_details?.name || undefined,
                }
            });

            // Create Payment
            await prisma.payment.create({
                data: {
                    amount: session.amount_total || 0,
                    status: session.payment_status,
                    userId: session.metadata.userId,
                }
            });

        } catch (error) {
            console.error("Database Error:", error);
            return new NextResponse("Database Error", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
