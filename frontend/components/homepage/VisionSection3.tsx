'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Smartphone, ShieldCheck, Globe } from 'lucide-react';
import { MascotBackground } from '../onboarding/MascotBackground';
import { SpeechBubble } from '../onboarding/SpeechBubble';

export default function VisionSection3() {
  const mascotRef = useRef<HTMLDivElement>(null);

  const teyQuote = [
    `<strong>Education is a human right. 🌍</strong>`,
    `My goal is to help you master real-world skills, build a portfolio, and start earning! Let's build your future. 🎓`,
  ];

  return (
    <section className="relative w-full py-24 bg-slate-50/50 border-b border-slate-100 overflow-hidden px-6">
      <MascotBackground />

      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left column: Narrative & Global Constraints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start text-left"
        >
          <span className="text-xs font-black text-[#0172FD] bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 uppercase tracking-wider mb-4 shadow-sm">
            A Global Hope
          </span>
          
          <h2 
            className="text-3xl md:text-5xl font-[900] text-[#071233] leading-none mb-6"
            style={{ fontFamily: 'var(--font-jakarta)' }}
          >
            Education for everyone, everywhere.
          </h2>

          <p className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed mb-6 max-w-xl">
            We hope for a future where screen time is not a bad thing, and where we can deliver high-quality, practical education to everyone, rich or poor, using just a mobile phone. That is why Teyro is built for real-world constraints—operating natively on WhatsApp, running offline, and saving 60% of your data plan.
          </p>

          <p className="text-sm md:text-base font-semibold text-slate-500 leading-relaxed mb-10 max-w-xl">
            But learning is only the first half of the journey. The final destination is income. We build a direct digital bridge between learning and earning through the **Teyro Marketplace**, allowing you to offer your verified skills to clients globally.
          </p>

          {/* Africa-first Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            
            {/* WhatsApp native */}
            <div className="bg-white border border-slate-200/80 rounded-[1.2rem] p-4 text-left shadow-sm">
              <Smartphone className="w-5 h-5 text-[#0172FD] mb-2 stroke-[2.5]" />
              <h4 className="text-xs font-black text-slate-800 mb-1">WhatsApp Native</h4>
              <p className="text-[10px] font-bold text-slate-400 leading-normal">
                Lessons and reminders delivered where you already are.
              </p>
            </div>

            {/* Offline & Lite */}
            <div className="bg-white border border-slate-200/80 rounded-[1.2rem] p-4 text-left shadow-sm">
              <Globe className="w-5 h-5 text-emerald-500 mb-2 stroke-[2.5]" />
              <h4 className="text-xs font-black text-slate-800 mb-1">Lite Mode</h4>
              <p className="text-[10px] font-bold text-slate-400 leading-normal">
                High-quality learning designed for low-data devices.
              </p>
            </div>

            {/* Marketplace verification */}
            <div className="bg-white border border-slate-200/80 rounded-[1.2rem] p-4 text-left shadow-sm">
              <ShieldCheck className="w-5 h-5 text-amber-500 mb-2 stroke-[2.5]" />
              <h4 className="text-xs font-black text-slate-800 mb-1">Verified Outcomes</h4>
              <p className="text-[10px] font-bold text-slate-400 leading-normal">
                Get paid immediately for the verified skills you master.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right column: Tey Celebrating Mascot */}
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
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[95%] h-[95%] z-10 flex items-center justify-center"
            >
              <Image 
                src="/User onbarding Assets/Step_12_image_desktop.webp" 
                alt="Successful Tey Mascot" 
                fill 
                className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.06)]"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
