'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Zap, ChevronRight } from 'lucide-react';
import { MascotBackground } from '../onboarding/MascotBackground';
import { SpeechBubble } from '../onboarding/SpeechBubble';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [count, setCount] = useState<number | null>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  // The mascot float and its three badges are decorative infinite loops that
  // framer-motion drives from JS every frame. Gated so they stop once the hero
  // scrolls away — this is a long marketing page, and there is no reason to
  // keep four animations running behind the rest of it.
  const heroVisible = useInView(mascotRef, { margin: '200px 0px 200px 0px' });

  useEffect(() => {
    fetch('/webhook/count')
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(0));
  }, []);

  const countLabel =
    count === null ? '...' : count === 0 ? 'Be first' : `${count.toLocaleString()} joined`;

  // Speech bubble text for Tey
  const teyQuote = [
    `<strong>You’re early… and I like that. 😄</strong>`,
    `We’re building something that makes learning hard to put down. Join the waitlist, and you’ll be one of the first to experience it! ✨`,
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] overflow-hidden pt-28 pb-16 px-6 z-10">
      
      {/* 📱 Bubbles and decorative shapes background */}
      <MascotBackground />

      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center relative z-10">
        
        {/* ── LEFT COLUMN: Text & Actions ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
          className="flex flex-col items-start text-left"
        >
          {/* Timeline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EBF3FE] border-2 border-white rounded-full text-xs font-bold text-[#0172FD] mb-6 shadow-[0_4px_12px_rgba(1,114,253,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#0172FD] animate-pulse" />
            <span>Beta Launching Nov / Dec 2026</span>
          </div>

          {/* Primary Headline */}
          <h1 
            className="text-[10vw] xs:text-[9vw] md:text-5xl lg:text-6xl font-[900] leading-[1.05] tracking-tight text-[#071233] mb-6"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            The learning app you’ll{' '}
            <span className="text-[#0172FD]" style={{ textShadow: '0px 2px 3px rgba(255,255,255,0.9), 0px -1px 2px rgba(1,114,253,0.2)' }}>
              actually
            </span>{' '}
            come back to.
          </h1>

          {/* Core Subtitle / Thesis */}
          <p className="text-[4.5vw] xs:text-[4vw] md:text-lg lg:text-xl font-semibold text-slate-500 leading-relaxed mb-10 max-w-xl">
            We’re making practical skill learning as engaging as social media and mobile games. Powered by AI, built for consistency.
          </p>

          {/* Actions & Live Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenModal}
              id="hero-join-waitlist-btn"
              className="h-14 sm:h-16 px-8 bg-[#0172FD] border-b-4 border-[#0050B3] text-white rounded-[1.2rem] font-[900] text-base tracking-wider hover:bg-[#0060D9] active:border-b-0 active:translate-y-[2px] transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(1,114,253,0.3)] cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-white stroke-[2.5]" />
              <span>JOIN THE WAITLIST</span>
              <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-extrabold ml-2 border border-white/20">
                {countLabel}
              </span>
            </motion.button>

            <button
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 sm:h-16 px-6 bg-white/70 hover:bg-white text-slate-700 font-extrabold text-base rounded-[1.2rem] border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>See how we do it</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: Speech Bubble & Mascot ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.4 }}
          className="relative w-full flex flex-col items-center gap-4"
        >
          {/* Tey's Onboarding Speech Bubble */}
          <div className="w-full max-w-[420px] z-20 flex justify-center lg:justify-start">
            <SpeechBubble
              lines={teyQuote}
              tailAlign={0.5}
              mascotRef={mascotRef}
              disableTypewriter={true}
            />
          </div>

          {/* Scaled-up Tey Frame */}
          <div 
            ref={mascotRef}
            className="relative w-full max-w-[500px] aspect-square flex items-center justify-center overflow-visible"
          >
            
            {/* Mascot Image */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: heroVisible ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="relative w-[95%] h-[95%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/Step_7_tey_verified_state.webp" 
                alt="Tey AI Mascot" 
                fill 
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </motion.div>

            {/* 🎮 Duolingo-style 3D gamification badges floating around Tey */}
            
            {/* 1. Streak Flame Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.2, repeat: heroVisible ? Infinity : 0, ease: 'easeInOut' }}
              className="absolute -top-2 right-4 bg-white border-2 border-orange-100 border-b-4 border-orange-200 rounded-[1.2rem] px-4 py-2 flex items-center gap-2 shadow-md z-20"
            >
              <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(249,115,22,0.2)]">🔥</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-wide leading-none">STREAK</span>
                <span className="text-sm font-black text-slate-800 leading-none mt-1">7 Days</span>
              </div>
            </motion.div>

            {/* 2. XP Star Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.8, repeat: heroVisible ? Infinity : 0, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -left-6 bg-white border-2 border-amber-100 border-b-4 border-amber-200 rounded-[1.2rem] px-4 py-2 flex items-center gap-2 shadow-md z-20"
            >
              <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(245,158,11,0.2)]">⭐</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-wide leading-none">XP EARNED</span>
                <span className="text-sm font-black text-[#0172FD] leading-none mt-1">+120 XP</span>
              </div>
            </motion.div>

            {/* 3. Skill Badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: heroVisible ? Infinity : 0, ease: 'easeInOut', delay: 0.8 }}
              className="absolute -bottom-2 left-1/4 bg-white border-2 border-emerald-100 border-b-4 border-emerald-200 rounded-[1.2rem] px-4 py-2 flex items-center gap-2 shadow-md z-20"
            >
              <span className="text-2xl filter drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)]">✅</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wide leading-none">VERIFIED</span>
                <span className="text-sm font-black text-slate-800 leading-none mt-1">Skill Mastered</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}