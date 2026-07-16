'use client';

import { useRouter } from 'next/navigation';
import HeroSection from '../components/homepage/HeroSection';
import StatsSection from '../components/homepage/StatsSection';
import VisionSection1 from '../components/homepage/VisionSection1';
import ProblemsSolutions from '../components/homepage/ProblemsSolutions';
import VisionSection2 from '../components/homepage/VisionSection2';
import WhyTeyro from '../components/homepage/WhyTeyro';
import RoleSolutions from '../components/homepage/RoleSolutions';
import VisionSection3 from '../components/homepage/VisionSection3';
import Marketplace from '../components/homepage/Marketplace';
import FAQSection from '../components/homepage/FAQSection';
import FinalCTA from '../components/homepage/FinalCTA';

export default function Home() {
  const router = useRouter();

  const openModal = () => router.push('/join');

  return (
    <main>
      {/* 1. Hero — Onboarding style welcome */}
      <HeroSection onOpenModal={openModal} />

      {/* 2. Stats — Key outcome numbers and platform comparison */}
      <StatsSection />

      {/* 3. Vision Section 1 — The Attention Paradox */}
      <VisionSection1 />

      {/* 4. Problems & Solutions — The 5 core edtech flaws & fixes */}
      <ProblemsSolutions onOpenModal={openModal} />

      {/* 5. Vision Section 2 — Gamifying Repetition */}
      <VisionSection2 />

      {/* 6. Why Teyro — Platform feature cards horizontal slider */}
      <WhyTeyro onOpenModal={openModal} />

      {/* 7. Role Solutions — Personalized pathways for Students & Creators */}
      <RoleSolutions onOpenModal={openModal} />

      {/* 8. Vision Section 3 — High Quality Education & Bridge to Earning */}
      <VisionSection3 />

      {/* 9. Marketplace — Step-by-step freelance timeline */}
      <Marketplace onOpenModal={openModal} />

      {/* 10. FAQ — General questions and answers */}
      <FAQSection />

      {/* 11. Final CTA — Celebratory onboarding action banner */}
      <FinalCTA onOpenModal={openModal} />
    </main>
  );
}