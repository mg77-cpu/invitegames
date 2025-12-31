"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscriptionWrapper({ children }: { children: ReactNode }) {
    const options = {
        mode: 'payment' as const,
        amount: 100, // Placeholder, updated by PaymentElement or Intent
        currency: 'usd',
        appearance: {
            theme: 'stripe' as const,
            variables: {
                colorPrimary: '#d97706', // club-gold
            }
        }
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
}
