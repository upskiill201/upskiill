'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

const FORMAT_OPTIONS = [
  {
    id: 'upload',
    title: 'Upload existing course',
    description: 'Bring your slides, videos and content to Teyro.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card1.webp',
    cardBg: '#F5F3FF',
  },
  {
    id: 'create',
    title: 'Create new course',
    description: 'Build a new course from scratch with AI assistance.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card2.webp',
    cardBg: '#ECFDF5',
  },
  {
    id: 'cohort',
    title: 'Build a cohort',
    description: 'Create a time-bound cohort with a structured journey.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card3.webp',
    cardBg: '#FFF7ED',
  },
  {
    id: 'community',
    title: 'Start with a community',
    description: 'Build your community first and add products later.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card4.webp',
    cardBg: '#EFF6FF',
  },
  {
    id: 'test',
    title: 'Test with learners',
    description: 'Validate your idea with a small group before launch.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card5.webp',
    cardBg: '#FFF1F2',
  },
  {
    id: 'explore',
    title: 'Explore platform first',
    description: 'Take a tour and explore features at your own pace.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card6.webp',
    cardBg: '#EEF2FF',
  },
];

interface Step12ContentProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function Step12Content({
  selected,
  onSelect,
}: Step12ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            What would you
            <br className="hidden sm:block" />
            <span className="text-blue-600"> like to build first?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            We&apos;ll configure your initial dashboard workspace based on your primary launch objective.
          </p>
        </div>

        {/* Large Step 12 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST12_side_img.webp"
              alt="Build Objective"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (6 Action Cards Grid: 2 columns) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {FORMAT_OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            const isHovered = hoveredCard === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                onMouseEnter={() => setHoveredCard(opt.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative flex items-center gap-3.5 p-3.5 sm:p-4 lg:p-4.5 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[80px] sm:min-h-[88px] lg:min-h-[92px]
                  border-2 
                  ${isSelected 
                    ? 'bg-blue-50/80 border-blue-600 border-b-[5px] border-b-blue-700 translate-y-[-1px]' 
                    : isHovered 
                      ? 'bg-gray-50/90 border-blue-300 border-b-[4px] border-b-blue-400' 
                      : 'bg-white border-gray-200 border-b-[4px] border-b-gray-300'
                  }
                `}
              >
                <div 
                  className="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
                  style={{ backgroundColor: opt.cardBg }}
                >
                  <Image
                    src={opt.image}
                    alt={opt.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-extrabold text-gray-900 text-[14px] sm:text-[15.5px] lg:text-[16.5px] leading-snug">
                    {opt.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] text-gray-500 mt-0.5 leading-normal">
                    {opt.description}
                  </p>
                </div>

                <div className={`
                  absolute right-3.5 sm:right-4 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center transition-all
                  ${isSelected ? 'bg-blue-600 text-white scale-100' : 'border-2 border-gray-300 scale-90 opacity-40'}
                `}>
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
