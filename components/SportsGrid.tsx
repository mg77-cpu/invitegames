"use client";

import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import {
    Activity,
    Trophy,
    Zap,
    Flag,
    Waves,
    Target,
    ArrowRight,
    List,
} from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface Sport {
    name: string;
    season: string;
    description: string;
    details: string;
    icon: React.ElementType;
}

const sports: Sport[] = [
    {
        name: "Soccer",
        season: "Fall & Spring",
        description:
            "Developmental 7v7 and competitive 11v11 leagues. Professional coaching staff.",
        details: "U6 - U16 Divisions",
        icon: Activity,
    },
    {
        name: "Tennis Academy",
        season: "Year-Round",
        description:
            "USTA Junior Circuit pathways. Red Ball (U8) through High Performance.",
        details: "Sat Mornings",
        icon: Trophy,
    },
    {
        name: "Jr. Pickleball",
        season: "Summer & Winter",
        description:
            "Fast-paced fun. Family doubles tournaments and skill clinics.",
        details: "Ages 6+",
        icon: Zap,
    },
    {
        name: "PGA Jr. League",
        season: "Summer",
        description:
            "Team-based golf format. Scramble matches designed for fun and etiquette.",
        details: "Twilight Matches",
        icon: Flag,
    },
    {
        name: "Swim Team",
        season: "Summer",
        description:
            "Sharks & Minnows. Competitive relays and end-of-season pool parties.",
        details: "Mon/Wed Practice",
        icon: Waves,
    },
    {
        name: "Lacrosse",
        season: "Spring",
        description: "The fastest game on two feet. Full gear rentals available.",
        details: "Boys & Girls Divs",
        icon: Target,
    },
];

const SportCard = ({ sport }: { sport: Sport }) => (
    <CardContainer containerClassName="py-4 px-4 w-[400px] flex-shrink-0">
        <CardBody className="bg-[#CEDFD2] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#CEDFD2] dark:border-white/[0.1] border-stone-200/50 w-full h-auto rounded-xl p-6 border shadow-sm transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <CardItem
                    translateZ="50"
                    className="text-xl font-serif font-bold text-[#455E53]"
                >
                    {sport.name}
                </CardItem>
                <CardItem
                    translateZ="50"
                    className="px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-club-gold border border-club-gold/20"
                >
                    {sport.season}
                </CardItem>
            </div>

            <CardItem translateZ="100" className="w-full mt-4">
                <div className="h-48 w-full rounded-xl flex items-center justify-center relative overflow-hidden">
                    <sport.icon className="h-24 w-24 text-[#455E53] relative z-10 group-hover/card:scale-110 transition-all duration-500" />
                </div>
            </CardItem>

            <div className="mt-6 space-y-4">
                <CardItem
                    as="p"
                    translateZ="50"
                    className="text-[#455E53]/80 text-sm leading-relaxed max-w-sm"
                >
                    {sport.description}
                </CardItem>

                <div className="flex items-center justify-between pt-2 border-t border-[#455E53]/10">
                    <CardItem
                        translateZ="60"
                        className="text-xs font-medium text-club-gold flex items-center gap-1.5"
                    >
                        <List className="w-3.5 h-3.5" />
                        {sport.details}
                    </CardItem>
                    <CardItem
                        translateZ="60"
                        as="button"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#455E53] text-white text-xs font-bold hover:bg-[#364a41] transition-colors"
                    >
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5" />
                    </CardItem>
                </div>
            </div>
        </CardBody>
    </CardContainer>
);

export default function SportsGrid() {
    const row1 = [...sports.slice(0, 3), ...sports.slice(0, 3)];
    const row2 = [...sports.slice(3, 6), ...sports.slice(3, 6)];

    const [isRow1Paused, setIsRow1Paused] = useState(false);
    const [isRow2Paused, setIsRow2Paused] = useState(false);

    return (
        <section className="py-24 bg-club-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="border-l-4 border-club-gold pl-4">
                    <h2 className="text-3xl font-serif font-bold text-club-dark">
                        Junior Leagues
                    </h2>
                    <p className="text-club-gold font-medium tracking-[0.2em] uppercase text-sm mt-1">
                        Cultivating Excellence
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Gradient Masks for smooth fading at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-club-cream to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-club-cream to-transparent z-20 pointer-events-none" />

                <div className="space-y-8">
                    {/* Row 1: Left to Right */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex"
                            onMouseEnter={() => setIsRow1Paused(true)}
                            onMouseLeave={() => setIsRow1Paused(false)}
                            animate={{
                                x: isRow1Paused ? undefined : [0, -1200],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {row1.map((sport, index) => (
                                <SportCard key={`row1-${index}`} sport={sport} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Row 2: Right to Left */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex"
                            onMouseEnter={() => setIsRow2Paused(true)}
                            onMouseLeave={() => setIsRow2Paused(false)}
                            animate={{
                                x: isRow2Paused ? undefined : [-1200, 0],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {row2.map((sport, index) => (
                                <SportCard key={`row2-${index}`} sport={sport} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
