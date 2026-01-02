"use client";

import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import SubscriptionWrapper from "./SubscriptionWrapper";
import PaymentModal from "./PaymentModal";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, User, Loader2 } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { useSearchParams } from "next/navigation";

export default function Membership() {
    const { userId } = useAuth();
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number }>({ name: "", price: 0 });
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPolling, setIsPolling] = useState(false);

    const checkSubscriptions = async () => {
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("/api/user/subscription");
            const data = await res.json();
            setSubscriptions(data.subscriptions || []);
            return data.subscriptions || [];
        } catch (err) {
            console.error("Failed to fetch subscriptions:", err);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSubscriptions();
    }, [userId]);

    // Polling logic for Task 5
    useEffect(() => {
        if (searchParams.get("success") === "true" && userId) {
            setIsPolling(true);
            let attempts = 0;
            const maxAttempts = 5;
            const initialCount = subscriptions.length;

            const interval = setInterval(async () => {
                attempts++;
                const newSubscriptions = await checkSubscriptions();
                
                if (newSubscriptions.length > initialCount || attempts >= maxAttempts) {
                    clearInterval(interval);
                    setIsPolling(false);
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [searchParams, userId]);

    const openModal = (name: string, price: number) => {
        if (!userId) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            alert("Please sign in using the 'Login' button at the top to complete your registration.");
            return;
        }
        setSelectedPlan({ name, price });
        setIsModalOpen(true);
    };

    return (
        <SubscriptionWrapper>
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                planName={selectedPlan.name}
                price={selectedPlan.price}
                existingSubscriptions={subscriptions}
            />
            <section id="membership" className="py-24 bg-club-cream relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-club-gold to-transparent opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-serif font-bold text-club-dark mb-4">
                        Membership Options
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                        Priority registration given to members of Partner Clubs.
                    </p>

                    {isPolling && (
                        <div className="flex items-center justify-center gap-2 mb-8 text-club-gold animate-pulse">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="font-bold">Syncing your membership...</span>
                        </div>
                    )}

                    {subscriptions.length > 0 && (
                        <div className="max-w-4xl mx-auto mb-12">
                            <Link 
                                href="/portal"
                                className="inline-flex items-center gap-3 bg-club-green/10 border-2 border-club-green/30 rounded-lg p-6 w-full hover:bg-club-green/20 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full bg-club-green flex items-center justify-center shrink-0">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <h3 className="text-lg font-bold text-club-dark leading-tight">
                                        You have {subscriptions.length} active {subscriptions.length === 1 ? 'membership' : 'memberships'}
                                    </h3>
                                    <p className="text-sm text-gray-600">Click to view registration details and receipts in your portal.</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-club-green group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Seasonal */}
                        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-gray-400">
                            <h3 className="text-2xl font-bold text-club-dark mb-2">
                                Single Season
                            </h3>
                            <p className="text-gray-500 mb-6">One sport, one season.</p>
                            <div className="text-4xl font-serif font-bold text-club-dark mb-6">
                                $395
                                <span className="text-base font-sans font-normal text-gray-400">
                                    /season
                                </span>
                            </div>
                            <ul className="text-left text-gray-600 space-y-3 mb-8 pl-4">
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-club-green" />
                                    Premium Uniform Kit
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-club-green" />
                                    8-Game Guarantee
                                </li>
                            </ul>
                            <button
                                onClick={() => openModal(PLANS.SINGLE_SEASON.name, PLANS.SINGLE_SEASON.price)}
                                className="w-full py-3 font-bold rounded-sm cursor-pointer transition bg-gray-100 text-club-dark hover:bg-gray-200"
                            >
                                Register
                            </button>
                        </div>

                        {/* Annual Pass */}
                        <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-club-gold transform md:-translate-y-4 relative">
                            <div className="absolute top-0 right-0 bg-club-gold text-white text-xs font-bold px-3 py-1 rounded-bl">
                                BEST VALUE
                            </div>
                            <h3 className="text-2xl font-bold text-club-dark mb-2">
                                Multi-Sport Pass
                            </h3>
                            <p className="text-gray-500 mb-6">Unlimited access year-round.</p>
                            <div className="text-4xl font-serif font-bold text-club-dark mb-6">
                                $550
                                <span className="text-base font-sans font-normal text-gray-400">
                                    /year
                                </span>
                            </div>
                            <ul className="text-left text-gray-600 space-y-3 mb-8 pl-4">
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-club-gold" />
                                    Access to all 4 seasons
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-club-gold" />
                                    Priority Practice Times
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-club-gold" />
                                    Summer Camp Discounts
                                </li>
                            </ul>
                            <button
                                onClick={() => openModal(PLANS.ANNUAL_PASS.name, PLANS.ANNUAL_PASS.price)}
                                className="w-full py-3 font-bold rounded-sm shadow-lg transition cursor-pointer bg-club-dark text-white hover:bg-club-green"
                            >
                                Purchase Pass
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </SubscriptionWrapper>
    );
}
