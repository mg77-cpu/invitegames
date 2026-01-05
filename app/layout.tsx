import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Montserrat, Caveat, DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SmoothScroll from "@/components/SmoothScroll";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invited Games | Junior Country Club Leagues",
  description: "Premier youth sports leagues exclusively for Junior Members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${montserrat.variable} ${caveat.variable} ${dmSans.variable} antialiased bg-club-cream text-slate-800`}
        >
          <Toaster position="top-center" richColors />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}
