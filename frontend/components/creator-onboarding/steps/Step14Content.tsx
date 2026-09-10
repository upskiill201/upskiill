'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Target, DollarSign, BookOpen, Users, CloudUpload, TrendingUp } from 'lucide-react';

const MILESTONES = [
  {
    icon: <Target size={18} className="text-violet-600" />,
    title: 'Teaching domain & audience size selected',
    status: 'Completed',
  },
  {
    icon: <CloudUpload size={18} className="text-blue-600" />,
    title: 'Content assets & existing materials identified',
    status: 'Completed',
  },
  {
    icon: <DollarSign size={18} className="text-emerald-600" />,
    title: 'Monthly revenue target configured',
    status: 'Completed',
  },
  {
    icon: <BookOpen size={18} className="text-amber-500" />,
    title: 'Course architecture & AI copilot assigned',
    status: 'Completed',
  },
  {
    icon: <Users size={18} className="text-rose-500" />,
    title: 'Community & cohort preferences saved',
    status: 'Completed',
  },
];

export default function Step14Content() {
  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Rocket Visual) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-3">
            <span className="text-[13px] font-extrabold text-blue-700">78% Profile Setup Complete</span>
          </div>

          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Almost ready to
            <br className="hidden sm:block" />
            <span className="text-blue-600"> take flight!</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            You have completed all foundational questions. Next, we will secure your creator account and unlock your Creator Studio dashboard.
          </p>
        </div>

        {/* Large Step 14 Rocket Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST14_side_img_rocket_78.webp"
              alt="Launch Rocket"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Completed Milestones Checklist) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="flex flex-col gap-3 w-full">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-white border-2 border-gray-200 border-b-[4px] border-b-gray-300 min-h-[64px]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 text-[14px] sm:text-[15.5px]">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-[12.5px] sm:text-[13.5px] shrink-0">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
