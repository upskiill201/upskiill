'use client';

import React from 'react';
import Image from 'next/image';
import { TrendingUp, Users, MessageSquare, CircleDollarSign, Star } from 'lucide-react';

const BENEFITS = [
  {
    id: 'completion',
    icon: <TrendingUp size={24} className="text-[#7C3AED]" />,
    iconBg: '#F3EFFE',
    title: 'Increase learner completion',
    description: 'AI-guided learning paths keep learners on track and help them finish what they start.',
  },
  {
    id: 'engagement',
    icon: <Users size={24} className="text-[#2563EB]" />,
    iconBg: '#EFF6FF',
    title: 'Improve engagement',
    description: 'Interactive content, smart nudges and AI insights keep learners actively involved.',
  },
  {
    id: 'community',
    icon: <MessageSquare size={24} className="text-[#059669]" />,
    iconBg: '#EDFDF5',
    title: 'Grow community',
    description: 'Built-in communities and discussions turn learners into loyal advocates.',
  },
  {
    id: 'revenue',
    icon: <CircleDollarSign size={24} className="text-[#D97706]" />,
    iconBg: '#FFFBEB',
    title: 'Build recurring revenue',
    description: 'Subscriptions, cohorts and digital products help you earn consistently.',
  },
  {
    id: 'loyalty',
    icon: <Star size={24} className="text-[#E11D48]" />,
    iconBg: '#FFF0F2',
    title: 'Create long-term learner loyalty',
    description: 'Better outcomes build trust, reputation and lasting relationships.',
  },
];

export default function Step9Content() {
  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Your expertise +
            <br className="hidden sm:block" />
            <span className="text-blue-600"> Teyro&apos;s intelligence.</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            We provide the infrastructure, gamification, and AI copilot so you can focus entirely on sharing your knowledge.
          </p>
        </div>

        {/* Large Step 9 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST9_side_img.webp"
              alt="Teyro Intelligence"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (5 Value Cards) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {BENEFITS.map((b) => (
            <div
              key={b.id}
              className="relative flex items-center gap-3.5 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl bg-white border-2 border-gray-200 border-b-[4px] border-b-gray-300 min-h-[74px] sm:min-h-[82px] lg:min-h-[88px]"
            >
              <div 
                className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[50px] lg:h-[50px] rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: b.iconBg }}
              >
                {b.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-gray-900 text-[14.5px] sm:text-[16px] lg:text-[17px] leading-snug">
                  {b.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] text-gray-500 mt-0.5 leading-normal">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
