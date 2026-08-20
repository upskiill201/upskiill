'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sprout, Users, BarChart2, TrendingUp, Star,
  Check
} from 'lucide-react';

const AUDIENCE_SIZES = [
  {
    id: 'just_starting',
    icon: <Sprout size={28} strokeWidth={2.2} />,
    iconBg: '#ECFDF5',
    iconColor: '#16A34A',
    label: 'Just starting',
    description: "I'm just getting started and building my audience.",
  },
  {
    id: 'under_1k',
    icon: <Users size={28} strokeWidth={2.2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Under 1k',
    description: 'I have a small but growing audience (less than 1,000).',
  },
  {
    id: '1k_10k',
    icon: <BarChart2 size={28} strokeWidth={2.2} />,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    label: '1k – 10k',
    description: 'I have an audience between 1,000 and 10,000 people.',
  },
  {
    id: '10k_100k',
    icon: <TrendingUp size={28} strokeWidth={2.2} />,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    label: '10k – 100k',
    description: 'I have an audience between 10,000 and 100,000 people.',
  },
  {
    id: '100k_plus',
    icon: <Star size={28} strokeWidth={2.2} />,
    iconBg: '#FFF7ED',
    iconColor: '#D97706',
    label: '100k+',
    description: 'I have more than 100,000 amazing followers!',
  },
];

interface Step4ContentProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function Step4Content({
  selected,
  onSelect,
}: Step4ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Graph) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            How large is your
            <br className="hidden sm:block" />
            <span className="text-blue-600"> current audience?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Whether you are just starting or have thousands of fans, Teyro gives you the tools to teach and monetize.
          </p>
        </div>

        {/* Large Step 4 Growth Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/onboarding-step4-graph.png"
              alt="Audience Growth"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Chunky Audience Cards) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {AUDIENCE_SIZES.map((aud) => {
            const isSelected = selected === aud.id;
            const isHovered = hoveredCard === aud.id;

            return (
              <div
                key={aud.id}
                onClick={() => onSelect(aud.id)}
                onMouseEnter={() => setHoveredCard(aud.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative flex items-center gap-3.5 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[76px] sm:min-h-[84px] lg:min-h-[90px]
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
                  className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isSelected ? '#0172FD' : aud.iconBg,
                    color: isSelected ? '#FFFFFF' : aud.iconColor,
                  }}
                >
                  {aud.icon}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-extrabold text-gray-900 text-[14.5px] sm:text-[16px] lg:text-[17px] leading-snug">
                    {aud.label}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] text-gray-500 mt-0.5 leading-normal">
                    {aud.description}
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
