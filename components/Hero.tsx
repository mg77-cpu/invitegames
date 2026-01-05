"use client";

import Link from "next/link";
import Background from "./Background";
import { List, UserPlus } from "lucide-react";
import { Button as MovingBorderButton } from "./ui/moving-border";

export default function Hero() {
    return (
        <div className="relative bg-club-dark overflow-hidden pt-20">
            <Background />
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-6">
                    <span className="text-club-gold text-sm font-semibold tracking-[0.2em] uppercase">
                        The Junior Elite Collection
                    </span>
                    <span className="text-club-gold/80 text-[11px] font-medium tracking-[0.1em] uppercase mt-1">
                        Ages 4 - 16
                    </span>
                </div>
                <h1
                    className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-6"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                    The Country Club Experience <br />
                    <span className="text-gray-400 font-bold">
                        for the Next Generation
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 font-base leading-relaxed">
                    A private athletic institution dedicated to technical mastery and character 
                    development. We merge professional-grade competition with the etiquette 
                    and hospitality of a private club.
                </p>
                <div className="mt-10 flex gap-4 justify-center">
                    <Link
                        href="#sports"
                        className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-sm text-club-dark bg-white hover:bg-gray-50 md:py-3 md:text-base md:px-8 transition shadow-lg flex items-center gap-2"
                    >
                        <List className="w-4 h-4" />
                        Our Disciplines
                    </Link>
                    <MovingBorderButton
                        as={Link}
                        href="#membership"
                        borderRadius="0.125rem"
                        duration={8000}
                        containerClassName="h-auto w-auto"
                        className="px-6 py-2.5 bg-club-dark border-white/20 text-white text-sm font-medium rounded-sm hover:bg-white/10 transition flex items-center gap-2"
                    >
                        <UserPlus className="w-4 h-4" />
                        Membership Inquiry
                    </MovingBorderButton>
                </div>
            </div>
        </div>
    );
}
