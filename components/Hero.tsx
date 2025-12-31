import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative bg-club-dark overflow-hidden pt-20">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-club-dark via-club-green to-club-dark opacity-90"></div>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: "radial-gradient(#d97706 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                ></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-club-gold/20 text-club-gold text-xs font-semibold tracking-wider uppercase mb-4 border border-club-gold/30">
                    Ages 4 - 16
                </span>
                <h1
                    className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-6"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                    The Country Club Experience <br />
                    <span className="text-gray-300 italic font-light">
                        for the Next Generation
                    </span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 font-light">
                    Premier youth sports leagues exclusively for Junior Members. Soccer,
                    Tennis, Golf, Pickleball, and more—organized with the hospitality you
                    expect.
                </p>
                <div className="mt-10 flex gap-4 justify-center">
                    <Link
                        href="#sports"
                        className="px-8 py-3 border border-transparent text-base font-medium rounded-sm text-club-dark bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition shadow-lg"
                    >
                        View Sports
                    </Link>
                    <Link
                        href="#membership"
                        className="px-8 py-3 border border-white text-base font-medium rounded-sm text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
