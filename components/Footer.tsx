export default function Footer() {
    return (
        <footer className="bg-club-dark text-gray-400 border-t border-white/10 py-12 text-center">
            <p className="font-serif text-white text-lg">
                Invited<span className="text-club-gold">Games</span>
            </p>
            <p className="text-sm mt-2">
                &copy; {new Date().getFullYear()} Invited Games LLC. Dallas, TX.
            </p>
        </footer>
    );
}
