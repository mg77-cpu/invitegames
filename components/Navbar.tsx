"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-club-dark/95 backdrop-blur-sm border-b border-club-gold/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div
                        className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <Trophy className="h-8 w-8 text-club-gold" />
                        <span className="font-serif text-2xl font-bold text-white tracking-wide">
                            Invited<span className="text-club-gold">Games</span>
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {["Philosophy", "Sports", "Schedule", "Membership"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollTo(item.toLowerCase())}
                                    className="font-sans text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    {item === "Sports" ? "Junior Leagues" : item === "Schedule" ? "Fixtures" : item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button
                                    className="bg-club-gold hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-sm shadow-md transition-all font-serif"
                                >
                                    Member Portal
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}
