'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Zap, Brain, Shield } from 'lucide-react';

const AI_HIGHLIGHTS = [
  {
    icon: <Sparkles size={20} className="text-violet-600" />,
    title: 'Instant Curriculum Architecture',
    desc: 'Generate complete chapter outlines and lesson milestones in seconds.',
  },
  {
    icon: <Brain size={20} className="text-blue-600" />,
    title: 'Adaptive Learning Prompts',
    desc: 'Automated quizzes and practice exercises tailored to student weaknesses.',
  },
  {
    icon: <Zap size={20} className="text-amber-500" />,
    title: 'Smart Engagement Copilot',
    desc: 'Predict drop-offs before they happen and re-engage students automatically.',
  },
];

export default function Step11Content() {
  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Meet your
            <br className="hidden sm:block" />
            <span className="text-blue-600"> AI creator copilot.</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Teyro&apos;s built-in intelligence assists with content structuring, exercise creation, and student retention 24/7.
          </p>
        </div>

        {/* Large Step 11 Left Mascot/Copilot Visual */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST11_side_img.png"
              alt="AI Creator Copilot"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (AI Capabilities Showcase) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        {/* Large Showcase Graphic */}
        <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-gradient-to-br from-violet-50 via-blue-50 to-white mb-4">
          <Image
            src="/Teyro Creator Onbarding flow/CF_ST11_side_img_right.png"
            alt="AI Assistant Features"
            fill
            priority
            className="object-contain p-4"
          />
        </div>

        {/* 3 AI Highlight Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {AI_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-gray-200 border-b-[4px] border-b-gray-300 flex flex-col gap-1.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <h4 className="font-extrabold text-gray-900 text-[13.5px] leading-snug">
                {item.title}
              </h4>
              <p className="text-[11.5px] text-gray-500 leading-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
