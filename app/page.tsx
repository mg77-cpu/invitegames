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
      <Membership />
      <Footer />
    </main>
  );
}
