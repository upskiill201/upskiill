'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  PlaySquare, Video, FileText, Users, Headphones, PlusSquare, Check
} from 'lucide-react';

const CONTENT_TYPES = [
  {
    id: 'full_courses',
    icon: <PlaySquare size={28} strokeWidth={2} />,
    iconBg: '#EEF3FF',
    iconColor: '#2563EB',
    label: 'Full courses',
    description: 'I have complete courses ready to upload or import.',
  },
  {
    id: 'recorded_videos',
    icon: <Video size={28} strokeWidth={2} />,
    iconBg: '#EDFDF5',
    iconColor: '#059669',
    label: 'Recorded videos',
    description: 'I have raw video footage or tutorial clips.',
  },
  {
    id: 'pdfs_resources',
    icon: <FileText size={28} strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'PDFs & resources',
    description: 'I have written guides, slide decks or worksheets.',
  },
  {
    id: 'community_group',
    icon: <Users size={28} strokeWidth={2} />,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Community / group',
    description: 'I already host an engaged student community.',
  },
  {
    id: 'coaching_calls',
    icon: <Headphones size={28} strokeWidth={2} />,
    iconBg: '#FFF0F5',
    iconColor: '#E11D48',
    label: 'Live coaching calls',
    description: 'I deliver 1:1 or group mentorship sessions.',
  },
  {
    id: 'nothing_yet',
    icon: <PlusSquare size={28} strokeWidth={2} />,
    iconBg: '#F8FAFC',
    iconColor: '#64748B',
    label: 'Starting from scratch',
    description: "I don't have existing assets yet — creating fresh!",
  },
];

interface Step6ContentProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function Step6Content({
  selected,
  onToggle,
}: Step6ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            What existing content
            <br className="hidden sm:block" />
            <span className="text-blue-600"> do you already have?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            We&apos;ll help you organize, convert, and repurpose your existing assets into interactive learning units.
          </p>
        </div>

        {/* Large Step 6 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST6_side_img.png"
              alt="Content Assets"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Content Assets Grid: 2 columns) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {CONTENT_TYPES.map((type) => {
            const isSelected = selected.includes(type.id);
            const isHovered = hoveredCard === type.id;

            return (
              <div
                key={type.id}
                onClick={() => onToggle(type.id)}
                onMouseEnter={() => setHoveredCard(type.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative flex items-center gap-3.5 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[76px] sm:min-h-[86px] lg:min-h-[92px]
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
                    backgroundColor: isSelected ? '#0172FD' : type.iconBg,
                    color: isSelected ? '#FFFFFF' : type.iconColor,
                  }}
                >
                  {type.icon}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-extrabold text-gray-900 text-[14.5px] sm:text-[16px] lg:text-[17px] leading-snug">
                    {type.label}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] text-gray-500 mt-0.5 leading-normal">
                    {type.description}
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
