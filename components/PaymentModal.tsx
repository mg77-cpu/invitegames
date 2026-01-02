"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { X } from "lucide-react";
import { getPlanByName } from "@/lib/plans";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    price: number;
    existingSubscriptions?: any[];
}

export default function PaymentModal({ isOpen, onClose, planName, price, existingSubscriptions = [] }: PaymentModalProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [parentName, setParentName] = useState("");
    const [athleteName, setAthleteName] = useState("");
    const [ageTier, setAgeTier] = useState("U6");

    const duplicate = existingSubscriptions.find(
        sub => 
            athleteName && 
            sub.athleteName?.toLowerCase() === athleteName.toLowerCase() && 
            sub.ageTier === ageTier &&
            sub.planName === planName
    );

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements || duplicate) {
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        const plan = getPlanByName(planName);

        try {
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message || "Please check your details.");
                setLoading(false);
                return;
            }

            const res = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: price,
                    metadata: {
                        planName,
                        durationMonths: plan?.durationMonths || 3, // Fallback to 3 if not found
                        parentName,
                        athleteName,
                        ageTier,
                    },
                }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setErrorMessage(data.error || "Payment setup failed. Please try again.");
                setLoading(false);
                return;
            }

            const { clientSecret } = data;

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/?success=true`,
                    payment_method_data: {
                        billing_details: {
                            name: parentName,
                        }
                    }
                },
            });

            if (error) {
                setErrorMessage(error.message || "Payment failed.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 overflow-y-auto bg-black/60 backdrop-blur-md">
            <div className="flex min-h-full items-center justify-center p-4 py-12">
                <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full relative">
                    {/* Header */}
                    <div className="bg-club-dark p-6 flex justify-between items-center rounded-t-lg">
                        <h3 className="font-serif text-2xl text-white">Secure Registration</h3>
                        <button onClick={onClose} className="text-white/60 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <h4 className="font-serif text-xl text-club-dark mb-4 border-b pb-2">{planName}</h4>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Parent Name</label>
                                <input
                                    type="text"
                                    required
                                    value={parentName}
                                    onChange={(e) => setParentName(e.target.value)}
                                    className="w-full border-b-2 border-gray-200 focus:border-club-gold outline-none py-2 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Athlete Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={athleteName}
                                        onChange={(e) => setAthleteName(e.target.value)}
                                        className="w-full border-b-2 border-gray-200 focus:border-club-gold outline-none py-2 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Age Tier</label>
                                    <select
                                        value={ageTier}
                                        onChange={(e) => setAgeTier(e.target.value)}
                                        className="w-full border-b-2 border-gray-200 focus:border-club-gold outline-none py-2 bg-transparent"
                                    >
                                        {["U6", "U8", "U10", "U12", "U14", "U16"].map((tier) => (
                                            <option key={tier} value={tier}>
                                                {tier}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Stripe Element */}
                            <div className={`pt-4 ${duplicate ? 'opacity-50 pointer-events-none' : ''}`}>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                                    Select Payment Method
                                </label>
                                <div className="p-3 border border-gray-200 rounded bg-stone-50 max-h-87.5 overflow-y-auto">
                                    <PaymentElement
                                        options={{
                                            layout: {
                                                type: 'tabs'
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {(errorMessage || duplicate) && (
                                <div className="text-sm font-medium text-red-600 bg-red-50 p-2 rounded">
                                    {duplicate 
                                        ? `${athleteName} is already registered for the ${planName} (${ageTier} tier).`
                                        : errorMessage
                                    }
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !stripe || !!duplicate}
                                className="w-full bg-club-gold text-white py-4 rounded-sm font-bold shadow-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? "Processing..." : duplicate ? "Already Registered" : `Complete $${(price / 100).toLocaleString()} Investment`}
                            </button>
                            <p className="text-[10px] text-center text-gray-400 mt-2">
                                SECURED BY STRIPE • PROCESSED BY INVITED GAMES LLC
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
