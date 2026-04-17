'use client';

import { useRouter } from 'next/navigation';
import HeroSection from '../components/homepage/HeroSection';
import ProblemsSolutions from '../components/homepage/ProblemsSolutions';
import WhyTeyro from '../components/homepage/WhyTeyro';
import RoleSolutions from '../components/homepage/RoleSolutions';
import Marketplace from '../components/homepage/Marketplace';
import StatsSection from '../components/homepage/StatsSection';
import FAQSection from '../components/homepage/FAQSection';
import FinalCTA from '../components/homepage/FinalCTA';

export default function Home() {
  const router = useRouter();

  const openModal = () => router.push('/join');

  return (
    <main>
      {/* 1. Hero — Dark, Scribe gradient */}
      <HeroSection onOpenModal={openModal} />

      {/* 2. Stats — Social proof numbers + comparison table */}
      <StatsSection />

      {/* 3. Problems & Solutions — 5 red/purple card pairs */}
      <ProblemsSolutions onOpenModal={openModal} />

      {/* 4. Why Teyro — 6 feature cards */}
      <WhyTeyro onOpenModal={openModal} />

      {/* 5. Role Solutions — Student vs Instructor two columns */}
      <RoleSolutions onOpenModal={openModal} />

      {/* 6. Marketplace — Dark section */}
      <Marketplace onOpenModal={openModal} />

      {/* 7. FAQ — Accordion */}
      <FAQSection />

      {/* 8. Final CTA — Dark, glowing button */}
      <FinalCTA onOpenModal={openModal} />
    </main>
  );
}