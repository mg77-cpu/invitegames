"use client";

import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ArrowRight, User, Loader2, Trophy, Zap, Activity, Waves } from "lucide-react";
import SubscriptionWrapper from "./SubscriptionWrapper";
import PaymentModal from "./PaymentModal";
import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

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
            toast.error("Authentication Required", {
                description: "Please sign in using the 'Login' button at the top to complete your registration.",
                duration: 5000,
            });
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
            <section id="membership" className="py-24 bg-club-cream relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#455E53_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]"></div>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-club-gold to-transparent opacity-30"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#455E53] mb-6">
                        Pricing
                    </h2>
                    <p className="text-xl text-[#455E53]/70 max-w-2xl mx-auto mb-16 font-medium">
                        We believe in accessibility, so our pricing model reflects that with options for every stage of development.
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
                                className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-[#455E53]/10 rounded-2xl p-6 w-full hover:bg-white/80 transition-all group shadow-sm"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#455E53] flex items-center justify-center shrink-0">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <h3 className="text-lg font-bold text-[#455E53] leading-tight">
                                        You have {subscriptions.length} active {subscriptions.length === 1 ? 'membership' : 'memberships'}
                                    </h3>
                                    <p className="text-sm text-[#455E53]/70">Manage your registrations and view receipts in your portal.</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-[#455E53] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                        {/* Seasonal */}
                        <div className="bg-[#E2EDDE] p-10 rounded-[2rem] text-left relative overflow-hidden group hover:shadow-xl transition-all duration-500 border border-[#455E53]/5">
                            <div className="inline-block px-4 py-1 rounded-full bg-[#455E53]/10 text-[#455E53] text-xs font-bold uppercase tracking-widest mb-8">
                                Seasonal Access
                            </div>
                            
                            <h3 className="text-4xl font-serif font-bold text-[#455E53] mb-4">
                                Single <br /> Season
                            </h3>
                            <p className="text-[#455E53]/70 mb-8 font-medium max-w-[240px]">
                                Perfect for exploring a specific discipline during our active seasons.
                            </p>

                            <ul className="space-y-3 mb-10 text-sm font-semibold text-[#455E53]/80">
                                <li className="flex items-center gap-2">
                                    Premium Uniform Kit • 8-Game Guarantee
                                </li>
                                <li className="flex items-center gap-2">
                                    End of Season Awards Ceremony
                                </li>
                            </ul>

                            <div className="flex items-end justify-between">
                                <button
                                    onClick={() => openModal(PLANS.SINGLE_SEASON.name, PLANS.SINGLE_SEASON.price)}
                                    className="px-8 py-3 bg-[#455E53] text-white font-bold rounded-xl hover:bg-[#364a41] transition-all flex items-center gap-2 group/btn shadow-lg shadow-[#455E53]/20"
                                >
                                    Register now
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                    <Trophy className="w-32 h-32 text-[#455E53]" />
                                </div>
                            </div>
                        </div>

                        {/* Annual Pass */}
                        <div className="bg-[#FFF9E6] p-10 rounded-[2rem] text-left relative overflow-hidden group hover:shadow-xl transition-all duration-500 border border-club-gold/10">
                            <div className="inline-block px-4 py-1 rounded-full bg-club-gold/10 text-club-gold text-xs font-bold uppercase tracking-widest mb-8">
                                Best Value
                            </div>
                            
                            <h3 className="text-4xl font-serif font-bold text-[#455E53] mb-4">
                                Multi-Sport <br /> Pass
                            </h3>
                            <p className="text-[#455E53]/70 mb-8 font-medium max-w-[240px]">
                                Get advanced access and year-round participation across all disciplines.
                            </p>

                            <ul className="space-y-3 mb-10 text-sm font-semibold text-[#455E53]/80">
                                <li className="flex items-center gap-2">
                                    All 4 seasons • Priority Practice Times
                                </li>
                                <li className="flex items-center gap-2">
                                    Exclusive Summer Camp Discounts
                                </li>
                            </ul>

                            <div className="flex items-end justify-between">
                                <button
                                    onClick={() => openModal(PLANS.ANNUAL_PASS.name, PLANS.ANNUAL_PASS.price)}
                                    className="px-8 py-3 bg-club-gold text-club-dark font-bold rounded-xl hover:bg-club-gold/90 transition-all flex items-center gap-2 group/btn shadow-lg shadow-club-gold/20"
                                >
                                    Get membership
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                    <Zap className="w-32 h-32 text-club-gold" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section: Simple and Scalable */}
                    <div className="max-w-5xl mx-auto bg-[#455E53] rounded-[2rem] p-8 md:p-12 text-left flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none"></div>
                        
                        <div className="flex items-center gap-4 relative z-10 shrink-0">
                            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md text-center group">
                                <div className="w-20 h-20 bg-club-gold/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Activity className="w-10 h-10 text-club-gold" />
                                </div>
                                <span className="text-white font-bold text-sm">Platform fee</span>
                            </div>
                            
                            <div className="w-8 h-8 bg-club-gold rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                                +
                            </div>

                            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md text-center group">
                                <div className="w-20 h-20 bg-club-gold/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Waves className="w-10 h-10 text-club-gold" />
                                </div>
                                <span className="text-white font-bold text-sm">Add-ons</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
                                Membership Structure
                            </span>
                            <h4 className="text-3xl font-serif font-bold text-white mb-4">
                                Simple and scalable
                            </h4>
                            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
                                Start with our base membership fee which covers insurance and facility access. Then use our modular add-ons to customize your child's athletic journey throughout the year.
                            </p>
                            <Link href="/disciplines" className="text-white text-xs font-bold flex items-center gap-2 hover:underline">
                                Read more <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </SubscriptionWrapper>
    );
}
