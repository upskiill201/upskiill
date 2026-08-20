'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { PartyPopper, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step16ContentProps {
  creatorName: string;
}

export default function Step16Content({
  creatorName,
}: Step16ContentProps) {
  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0172FD', '#3A96FF', '#7C3AED', '#10B981', '#F59E0B'],
      });
    } catch {}
  }, []);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-center justify-center py-2 lg:py-6 text-center lg:text-left">
      
      {/* ──── LEFT PANEL (Congratulations & Text) ──── */}
      <div className="w-full lg:w-[45%] shrink-0 flex flex-col items-center lg:items-start justify-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-4 shadow-sm">
          <PartyPopper size={18} className="text-violet-600" />
          <span className="text-[14px] font-extrabold text-violet-700">
            All set, {creatorName || 'Creator'}!
          </span>
        </div>

        <h1 className="font-extrabold tracking-tight text-gray-900 text-[32px] sm:text-[46px] lg:text-[56px] xl:text-[62px] leading-[1.08] mb-3">
          Your Creator Studio
          <br />
          <span className="text-blue-600"> is ready to launch.</span>
        </h1>

        <div className="w-[56px] h-[4px] bg-blue-600 rounded-full my-3 sm:my-5" />

        <p className="text-[14.5px] sm:text-[17px] xl:text-[19px] text-gray-600 leading-relaxed max-w-[480px]">
          Let&apos;s build interactive learning experiences that your students will truly enjoy and finish.
        </p>
      </div>

      {/* ──── RIGHT PANEL (Takeoff Graphic) ──── */}
      <div className="w-full lg:w-[55%] flex items-center justify-center">
        <div className="relative w-full max-w-[480px] h-[260px] sm:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden shadow-lg border border-gray-200/80 bg-white">
          <Image 
            src="/Teyro Creator Onbarding flow/Rocket_take_off_img.png"
            alt="Rocket Takeoff"
            fill
            priority
            className="object-contain p-4"
          />
        </div>
      </div>

    </div>
  );
}
