export default function Schedule() {
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
    ];

    return (
        <section id="schedule" className="py-20 bg-club-dark text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-serif font-bold mb-8">Weekend Fixtures</h2>
                <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    {fixtures.map((game, index) => (
                        <div
                            key={index}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-white/10 transition ${index !== fixtures.length - 1 ? "border-b border-white/10" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                <div className="bg-club-green p-3 rounded text-center w-16">
                                    <span className="block text-xs uppercase text-club-gold font-bold">
                                        {game.month}
                                    </span>
                                    <span className="block text-xl font-bold">{game.day}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{game.title}</h4>
                                    <p className="text-sm text-gray-400">{game.location}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xl font-mono">{game.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
