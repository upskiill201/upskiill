'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Sparkles } from 'lucide-react';

const OPTIONS = [
  {
    id: 'yes',
    title: 'Yes, build a community',
    description: 'Learners can connect, ask questions, share wins and support each other.',
    isRecommended: true,
  },
  {
    id: 'no',
    title: 'No, self-paced only',
    description: 'I prefer to keep my courses focused without a community for now.',
    isRecommended: false,
  },
  {
    id: 'maybe',
    title: 'Maybe later',
    description: "I'm not sure right now. I'll decide when my course is ready.",
    isRecommended: false,
  },
];

interface Step13ContentProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function Step13Content({
  selected,
  onSelect,
}: Step13ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Stronger learning happens
            <br className="hidden sm:block" />
            <span className="text-blue-600"> together.</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            A community helps your learners connect, ask questions, stay motivated and achieve more — together.
          </p>
        </div>

        {/* Large Step 13 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST13_side_img.png"
              alt="Community"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Options & Live Preview Card) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 w-full mb-4">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            const isHovered = hoveredCard === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                onMouseEnter={() => setHoveredCard(opt.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative flex items-center gap-3.5 p-4 sm:p-4.5 lg:p-5 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[76px] sm:min-h-[84px]
                  border-2 
                  ${isSelected 
                    ? 'bg-blue-50/80 border-blue-600 border-b-[5px] border-b-blue-700 translate-y-[-1px]' 
                    : isHovered 
                      ? 'bg-gray-50/90 border-blue-300 border-b-[4px] border-b-blue-400' 
                      : 'bg-white border-gray-200 border-b-[4px] border-b-gray-300'
                  }
                `}
              >
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-extrabold text-gray-900 text-[15px] sm:text-[16px] lg:text-[17px] leading-snug">
                      {opt.title}
                    </h3>
                    {opt.isRecommended && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-700">
                        <Sparkles size={11} />
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] text-gray-500 leading-normal">
                    {opt.description}
                  </p>
                </div>

                <div className={`
                  absolute right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all
                  ${isSelected ? 'bg-blue-600 text-white scale-100' : 'border-2 border-gray-300 scale-90 opacity-40'}
                `}>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Community Preview when 'Yes' is Selected */}
        {selected === 'yes' && (
          <div className="relative w-full h-[120px] sm:h-[150px] rounded-2xl overflow-hidden border border-blue-100 bg-blue-50/50 p-2 animate-fadeIn">
            <Image
              src="/Teyro Creator Onbarding flow/CF_ST13_yes_option_img.png"
              alt="Community Preview"
              fill
              className="object-contain object-center"
            />
          </div>
        )}
      </div>

    </div>
  );
}
