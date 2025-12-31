"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import SubscriptionWrapper from "./SubscriptionWrapper";
import PaymentModal from "./PaymentModal";
import { useAuth, useSignIn } from "@clerk/nextjs";

export default function Membership() {
    const { userId } = useAuth();
    const { signIn } = useSignIn();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number }>({ name: "", price: 0 });

    const openModal = (name: string, price: number) => {
        if (!userId) {
            // Redirect to top and show a clear message
            window.scrollTo({ top: 0, behavior: "smooth" });
            alert("Please sign in using the 'Member Portal' button at the top to complete your registration.");
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
            />
            <section id="membership" className="py-24 bg-club-cream relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-club-gold to-transparent opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-serif font-bold text-club-dark mb-4">
                        Membership Options
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                        Priority registration given to members of Partner Clubs.
                    </p>

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
                                onClick={() => openModal("Single Season Membership", 39500)}
                                className="w-full py-3 bg-gray-100 text-club-dark font-bold hover:bg-gray-200 transition rounded-sm cursor-pointer"
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
                                onClick={() => openModal("Multi-Sport Pass (Annual)", 55000)}
                                className="w-full py-3 bg-club-dark text-white font-bold hover:bg-club-green transition rounded-sm shadow-lg cursor-pointer"
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
