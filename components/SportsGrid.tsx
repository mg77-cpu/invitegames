import {
    Goal,
    Trophy,
    Zap,
    FlagTriangleRight,
    Droplets,
    Crosshair,
    Check,
} from "lucide-react";

interface Sport {
    name: string;
    season: string;
    description: string;
    details: string;
    icon: React.ElementType;
    gradient: string;
}

const sports: Sport[] = [
    {
        name: "Soccer",
        season: "Fall & Spring",
        description:
            "Developmental 7v7 and competitive 11v11 leagues. Professional coaching staff.",
        details: "U6 - U16 Divisions",
        icon: Goal,
        gradient: "from-green-700 to-green-900",
    },
    {
        name: "Tennis Academy",
        season: "Year-Round",
        description:
            "USTA Junior Circuit pathways. Red Ball (U8) through High Performance.",
        details: "Sat Mornings",
        icon: Trophy,
        gradient: "from-emerald-800 to-teal-900",
    },
    {
        name: "Jr. Pickleball",
        season: "Summer & Winter",
        description:
            "Fast-paced fun. Family doubles tournaments and skill clinics.",
        details: "Ages 6+",
        icon: Zap,
        gradient: "from-lime-600 to-green-700",
    },
    {
        name: "PGA Jr. League",
        season: "Summer",
        description:
            "Team-based golf format. Scramble matches designed for fun and etiquette.",
        details: "Twilight Matches",
        icon: FlagTriangleRight,
        gradient: "from-green-800 to-emerald-950",
    },
    {
        name: "Swim Team",
        season: "Summer",
        description:
            "Sharks & Minnows. Competitive relays and end-of-season pool parties.",
        details: "Mon/Wed Practice",
        icon: Droplets,
        gradient: "from-cyan-600 to-blue-700",
    },
    {
        name: "Lacrosse",
        season: "Spring",
        description: "The fastest game on two feet. Full gear rentals available.",
        details: "Boys & Girls Divs",
        icon: Crosshair,
        gradient: "from-indigo-800 to-purple-900",
    },
];

export default function SportsGrid() {
    return (
        <section id="sports" className="py-20 bg-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-serif font-bold text-club-dark mb-12 border-l-4 border-club-gold pl-4">
                    Junior Leagues
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {sports.map((sport) => (
                        <div
                            key={sport.name}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div
                                className={`h-40 bg-gradient-to-br ${sport.gradient} flex items-center justify-center relative`}
                            >
                                <sport.icon className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-serif font-bold text-club-dark">
                                    {sport.name}
                                </h3>
                                <p className="text-xs text-club-gold font-bold uppercase mb-2">
                                    {sport.season}
                                </p>
                                <p className="text-gray-600 text-sm mb-4">
                                    {sport.description}
                                </p>
                                <ul className="text-xs text-gray-500 space-y-1">
                                    <li className="flex items-center">
                                        <Check className="h-3 w-3 mr-2 text-club-green" />
                                        {sport.details}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
