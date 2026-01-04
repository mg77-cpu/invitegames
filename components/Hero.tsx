import Link from "next/link";
import Background from "./Background";
import { List, UserPlus } from "lucide-react";

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
                    <span className="text-gray-300 italic font-light">
                        for the Next Generation
                    </span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-serif text-club-gold/90 mb-6 tracking-wide">
                    Defining the Art of Junior Sport
                </h2>
                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 font-light leading-relaxed">
                    A private athletic institution dedicated to technical mastery and character 
                    development. We merge professional-grade competition with the etiquette 
                    and hospitality of a private club.
                </p>
                <div className="mt-10 flex gap-4 justify-center">
                    <Link
                        href="#sports"
                        className="px-8 py-3 border border-transparent text-base font-medium rounded-sm text-club-dark bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition shadow-lg flex items-center gap-2"
                    >
                        <List className="w-5 h-5" />
                        Our Disciplines
                    </Link>
                    <Link
                        href="#membership"
                        className="px-8 py-3 border border-white text-base font-medium rounded-sm text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition flex items-center gap-2"
                    >
                        <UserPlus className="w-5 h-5" />
                        Membership Inquiry
                    </Link>
                </div>
            </div>
        </div>
    );
}
