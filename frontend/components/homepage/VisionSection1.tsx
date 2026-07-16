'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { MascotBackground } from '../onboarding/MascotBackground';
import { SpeechBubble } from '../onboarding/SpeechBubble';

export default function VisionSection1() {
  const mascotRef = useRef<HTMLDivElement>(null);

  const teyQuote = [
    `<strong>I know I can't compete with celebrity gossip... 😹</strong>`,
    `But I promise: learning coding or design is infinitely more rewarding than scrolling. Give me 10 minutes today! 🤖`,
  ];

  return (
    <section className="relative w-full py-24 bg-slate-50/50 border-b border-slate-100 overflow-hidden px-6">
      <MascotBackground />

      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left column: Narrative & Paradox */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start text-left"
        >
          <span className="text-xs font-black text-[#0172FD] bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 uppercase tracking-wider mb-4 shadow-sm">
            The Attention Paradox
          </span>
          
          <h2 
            className="text-3xl md:text-5xl font-[900] text-[#071233] leading-none mb-6"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Traditional courses are built to fail.
          </h2>

          <p className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed mb-6 max-w-xl">
            Legacy edtech is in the content distribution business. They sell video access, then leave you to scroll through 40-hour lecture dumps. They assume your motivation is a fixed resource—but motivation decays.
          </p>

          <p className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed mb-10 max-w-xl">
            Teyro is in the <strong>habit-building business</strong>. We apply the same behavioral science that TikTok and mobile games use to keep billions of people scrolling, but redirect it entirely toward your learning.
          </p>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
            {/* Wasted time */}
            <div className="bg-white border-2 border-rose-100 border-b-4 border-rose-200 rounded-[1.5rem] p-5 flex flex-col gap-3 shadow-sm text-left">
              <div className="w-9 h-9 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500 shrink-0">
                <AlertCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-black text-slate-800">Mindless Scrolling</h3>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">
                2 hours on social media feeds you instant dopamine, but leaves you feeling like you just wasted your time.
              </p>
            </div>

            {/* Meaningful time */}
            <div className="bg-white border-2 border-blue-100 border-b-4 border-blue-200 rounded-[1.5rem] p-5 flex flex-col gap-3 shadow-sm text-left">
              <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#0172FD] shrink-0">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-black text-slate-800">The 90% Rule</h3>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">
                We make lessons 90% as engaging as TikTok. Your own internal desire to learn will easily carry the remaining 10%.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right column: Tey Waving Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative w-full flex flex-col items-center gap-4"
        >
          {/* Tey's bubble */}
          <div className="w-full max-w-[380px] z-20 flex justify-center">
            <SpeechBubble
              lines={teyQuote}
              tailAlign={0.5}
              mascotRef={mascotRef}
              disableTypewriter={true}
            />
          </div>

          {/* Mascot container */}
          <div 
            ref={mascotRef}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center overflow-visible"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[95%] h-[95%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/Tey_welcome.webp" 
                alt="Waving Tey Mascot" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.06)]"
                unoptimized
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
