import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SportsGrid from "@/components/SportsGrid";
import Schedule from "@/components/Schedule";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";
import PaymentSuccessToast from "@/components/PaymentSuccessToast";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <PaymentSuccessToast />
      </Suspense>
      <Navbar />
      <Hero />
      <SportsGrid />
      <Schedule />
      <Suspense fallback={
        <div className="py-24 bg-club-cream flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-club-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Membership />
      </Suspense>
      <Footer />
    </main>
  );
}
