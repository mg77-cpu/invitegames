"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, X } from "lucide-react";

export default function PaymentSuccessToast() {
    const searchParams = useSearchParams();
    const [show, setShow] = useState(false);

    // 1. Check URL for success param
    useEffect(() => {
        if (searchParams.get("success") === "true") {
            setShow(true);
            window.history.replaceState({}, "", "/");
        }
    }, [searchParams]);

    // 2. Auto-hide timer
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-5 fade-in duration-300">
            <div className="bg-club-green text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 max-w-md">
                <CheckCircle className="w-8 h-8 flex-shrink-0" />
                <div>
                    <h4 className="font-serif font-bold text-lg">Payment Successful!</h4>
                    <p className="text-sm text-white/80">Welcome to Invited Games. Check your email for confirmation.</p>
                </div>
                <button
                    onClick={() => setShow(false)}
                    className="text-white/60 hover:text-white ml-2"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
