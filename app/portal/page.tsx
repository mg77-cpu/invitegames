"use client";

import { useEffect, useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Trophy, Calendar, User, ArrowLeft, Loader2, CreditCard } from "lucide-react";
import Link from "next/link";

export default function PortalPage() {
    const { isLoaded, userId } = useAuth();
    const router = useRouter();
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && !userId) {
            router.push("/");
        }
    }, [isLoaded, userId, router]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (!userId) return;
            try {
                const res = await fetch("/api/user/subscription");
                const data = await res.json();
                setSubscriptions(data.subscriptions || []);
            } catch (err) {
                console.error("Failed to fetch subscriptions:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchSubscriptions();
        }
    }, [userId]);

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen bg-club-cream flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-club-gold animate-spin mb-4" />
                <p className="font-serif text-club-dark text-lg italic">Accessing your locker room...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-club-cream">
            {/* Header */}
            <header className="bg-club-dark text-white border-b border-club-gold/30">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ArrowLeft className="w-5 h-5 text-club-gold group-hover:-translate-x-1 transition-transform" />
                        <span className="font-sans text-sm font-medium text-gray-300">Back to Site</span>
                    </Link>
                    
                    <div className="flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-club-gold" />
                        <span className="font-serif text-xl font-bold tracking-wide">
                            Member<span className="text-club-gold">Portal</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="font-serif text-4xl text-club-dark mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Manage your active memberships and athlete registrations.</p>
                </div>

                {subscriptions.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-club-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-8 h-8 text-club-gold" />
                        </div>
                        <h2 className="text-xl font-bold text-club-dark mb-2">No Active Memberships</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            You haven't registered any athletes for current seasons yet.
                        </p>
                        <Link 
                            href="/#membership" 
                            className="inline-flex items-center bg-club-dark text-white px-8 py-3 rounded-sm font-bold hover:bg-club-green transition-colors"
                        >
                            View Registration Options
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subscriptions.map((sub) => (
                            <div key={sub.id} className="bg-white rounded-lg shadow-md border-l-4 border-club-gold overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-club-gold bg-club-gold/10 px-2 py-1 rounded">
                                                {sub.status === "active" ? "Active" : "Expired"}
                                            </span>
                                            <h3 className="text-xl font-bold text-club-dark mt-2">
                                                {sub.planName}
                                            </h3>
                                        </div>
                                        <Trophy className="w-8 h-8 text-gray-100" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                                <User className="w-4 h-4 text-club-green" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Athlete</p>
                                                <p className="font-semibold text-club-dark">{sub.athleteName} <span className="text-gray-400 ml-1">({sub.ageTier})</span></p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-club-green" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">Valid Until</p>
                                                <p className="font-semibold text-club-dark">
                                                    {new Date(sub.endDate).toLocaleDateString('en-US', { 
                                                        month: 'long', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Registered on {new Date(sub.createdAt).toLocaleDateString()}</span>
                                    <button className="text-xs font-bold text-club-green hover:underline">Download Receipt</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Support Section */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <h3 className="font-serif text-lg text-club-dark mb-4">Need Assistance?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 rounded border border-gray-100 bg-white">
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Registration Help</p>
                            <p className="text-sm text-club-dark">Contact our registrar for changes to your athlete's information.</p>
                        </div>
                        <div className="p-4 rounded border border-gray-100 bg-white">
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Billing Questions</p>
                            <p className="text-sm text-club-dark">Reach out for refund requests or billing discrepancies.</p>
                        </div>
                        <div className="p-4 rounded border border-gray-100 bg-white">
                            <p className="text-xs font-bold uppercase text-gray-400 mb-1">Technical Support</p>
                            <p className="text-sm text-club-dark">Report issues with your member dashboard or payment processing.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
