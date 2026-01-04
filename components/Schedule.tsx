"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Schedule() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const fixtures = [
        {
            day: "24",
            month: "OCT",
            title: "U10 Soccer: Stonebriar vs. Gleneagles",
            location: "North Region • Field 1",
            time: "09:00 AM",
        },
        {
            day: "24",
            month: "OCT",
            title: "U12 Tennis: Brookhaven vs. Prestonwood",
            location: "North Region • Courts 1-4",
            time: "10:30 AM",
        },
        {
            day: "25",
            month: "OCT",
            title: "U8 T-Ball: Royal Oaks vs. Dallas CC",
            location: "South Region • Diamond 2",
            time: "02:00 PM",
        },
        {
            day: "25",
            month: "OCT",
            title: "Jr. Pickleball: Member/Guest Open",
            location: "Courts 5-8",
            time: "04:00 PM",
        },
    ];

    return (
        <section id="schedule" className="py-24 bg-club-dark text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 border-l-4 border-club-gold pl-4"
                >
                    <h2 className="text-3xl font-serif font-bold">Weekend Fixtures</h2>
                    <p className="text-club-gold font-medium tracking-[0.2em] uppercase text-sm mt-1">
                        Live Match Schedule
                    </p>
                </motion.div>

                <div ref={containerRef} className="relative h-[600px] flex flex-col gap-4">
                    {fixtures.map((game, index) => {
                        const range = [index * 0.1, (index + 1) * 0.25];
                        const y = useTransform(scrollYProgress, range, [100 * (index + 1), 0]);
                        const scale = useTransform(scrollYProgress, range, [0.8, 1]);
                        const opacity = useTransform(scrollYProgress, range, [0, 1]);

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    y,
                                    scale,
                                    opacity,
                                    zIndex: index + 1,
                                }}
                                className="sticky top-24"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 backdrop-blur-sm shadow-2xl"
                                >
                                    <div className="flex items-center gap-6 mb-4 sm:mb-0">
                                        <div className="bg-club-gold/10 p-4 rounded-lg text-center w-20 border border-club-gold/20 group-hover:bg-club-gold/20 transition-colors">
                                            <span className="block text-xs uppercase text-club-gold font-bold tracking-widest">
                                                {game.month}
                                            </span>
                                            <span className="block text-2xl font-bold text-white">{game.day}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg group-hover:text-club-gold transition-colors">{game.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-club-gold/60" />
                                                <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">{game.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className="block text-2xl font-mono text-club-gold">{game.time}</span>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1 font-bold">Scheduled</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
