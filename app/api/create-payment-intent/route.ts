import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = user.emailAddresses[0]?.emailAddress;
        const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

        const { amount, metadata } = await req.json();

        // Validation (Task 5)
        if (!metadata?.planName || !metadata?.athleteName || !metadata?.ageTier) {
            return NextResponse.json({ error: "Missing required metadata fields" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            receipt_email: email,
            metadata: {
                userId,
                email,
                name,
                ...metadata, // planName, parentName, athleteName, ageTier
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error("[PAYMENT_INTENT_ERROR]", error);
        return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
    }
}
