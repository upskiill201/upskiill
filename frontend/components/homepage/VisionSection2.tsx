'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Flame, Brain, Users } from 'lucide-react';
import { MascotBackground } from '../onboarding/MascotBackground';
import { SpeechBubble } from '../onboarding/SpeechBubble';

export default function VisionSection2() {
  const mascotRef = useRef<HTMLDivElement>(null);
  // Decorative float below, gated on visibility: framer-motion drives these
  // from JS every frame, and the marketing page ran eight concurrently for as
  // long as it was open — continuous CPU for motion nobody is looking at.
  // Invisible by definition, since you cannot see an animation you scrolled past.
  const mascotInView = useInView(mascotRef, { margin: '200px 0px 200px 0px' });

  const teyQuote = [
    `<strong>If you skip today, your streak timer starts... ⏰</strong>`,
    `Don't worry, I won't reset you just yet. Let's do some active practice first! 🤖`,
  ];

  return (
    <section className="relative w-full py-24 bg-white border-b border-slate-100 overflow-hidden px-6">
      <MascotBackground />

      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left column: Tey Thinking Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative w-full flex flex-col items-center gap-4 order-2 lg:order-1"
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
              transition={{ duration: 4.8, repeat: mascotInView ? Infinity : 0, ease: "easeInOut" }}
              className="relative w-[95%] h-[95%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/Tey_thinking_desktop.webp" 
                alt="Thinking Tey Mascot" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.06)]"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right column: Narrative & Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col items-start text-left order-1 lg:order-2"
        >
          <span className="text-xs font-black text-[#0172FD] bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 uppercase tracking-wider mb-4 shadow-sm">
            The Science of Habits
          </span>
          
          <h2 
            className="text-3xl md:text-5xl font-[900] text-[#071233] leading-none mb-6"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Gamifying active repetition.
          </h2>

          <p className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed mb-6 max-w-xl">
            Most meaningful skills—like writing code, designing layouts, or reading languages—are mastered through repetition. Teyro gamifies this practice loop to turn daily showing up into a natural habit.
          </p>

          <p className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed mb-10 max-w-xl">
            By combining loss-aversion mechanics with real-time AI guidance, we make mastering real-world skills feel like playing a game.
          </p>

          {/* Gamification widgets */}
          <div className="flex flex-col gap-4 w-full max-w-xl">
            
            {/* 1. Streaks */}
            <div className="bg-white border-2 border-slate-200/80 border-b-4 border-slate-300 rounded-[1.5rem] p-4 flex gap-4 items-center shadow-sm">
              <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                <Flame className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-black text-slate-800">Loss-Aversion Streaks</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5 leading-normal">
                  Streaks build powerful consistency. You learn daily because you don't want to lose your streak.
                </p>
              </div>
            </div>

            {/* 2. AI companion */}
            <div className="bg-white border-2 border-slate-200/80 border-b-4 border-slate-300 rounded-[1.5rem] p-4 flex gap-4 items-center shadow-sm">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#0172FD] shrink-0">
                <Brain className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-black text-slate-800">Proactive AI Companion</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5 leading-normal">
                  Tey notices when you struggle and jumps in to explain, keeping you on track before you quit.
                </p>
              </div>
            </div>

            {/* 3. Community */}
            <div className="bg-white border-2 border-slate-200/80 border-b-4 border-slate-300 rounded-[1.5rem] p-4 flex gap-4 items-center shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <Users className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-black text-slate-800">Social Accountability</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5 leading-normal">
                  Push yourself alongside peers on leaderboards. Human peer dynamic drives high consistency.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
