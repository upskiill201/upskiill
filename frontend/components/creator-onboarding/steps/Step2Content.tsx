'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  PlaySquare, MonitorPlay, UserPlus, GraduationCap, 
  BookOpen, Users, Briefcase, Building2, Check 
} from 'lucide-react';

const CREATOR_TYPES = [
  {
    id: 'course_creator',
    icon: <PlaySquare size={28} strokeWidth={2.2} />,
    label: 'Course creator',
    description: 'I create and sell online courses.',
  },
  {
    id: 'youtube_educator',
    icon: <MonitorPlay size={28} strokeWidth={2.2} />,
    label: 'YouTube educator',
    description: 'I teach and grow my audience on YouTube.',
  },
  {
    id: 'coach',
    icon: <UserPlus size={28} strokeWidth={2.2} />,
    label: 'Coach',
    description: 'I offer coaching and help people achieve their goals.',
  },
  {
    id: 'teacher',
    icon: <GraduationCap size={28} strokeWidth={2.2} />,
    label: 'Teacher',
    description: 'I teach students (online or offline).',
  },
  {
    id: 'mentor',
    icon: <BookOpen size={28} strokeWidth={2.2} />,
    label: 'Mentor',
    description: 'I guide and mentor individuals.',
  },
  {
    id: 'community_educator',
    icon: <Users size={28} strokeWidth={2.2} />,
    label: 'Community educator',
    description: 'I build and educate communities.',
  },
  {
    id: 'freelancer',
    icon: <Briefcase size={28} strokeWidth={2.2} />,
    label: 'Freelancer teaching skills',
    description: 'I teach skills as a freelancer.',
  },
  {
    id: 'agency_educator',
    icon: <Building2 size={28} strokeWidth={2.2} />,
    label: 'Agency educator',
    description: 'I represent an agency or teach on behalf of a brand.',
  },
];

interface Step2ContentProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function Step2Content({
  selected,
  onSelect,
}: Step2ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Mockup) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Let&apos;s personalize
            <br className="hidden sm:block" />
            <span className="text-blue-600"> your creator journey.</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            This helps us customize Teyro to match your specific teaching style and content format.
          </p>
        </div>

        {/* Large Official Dashboard Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/onboarding-step2-dashboard.webp"
              alt="Creator Dashboard"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Chunky 2-Column Selection Grid) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {CREATOR_TYPES.map((type) => {
            const isSelected = selected === type.id;
            const isHovered = hoveredCard === type.id;

            return (
              <div
                key={type.id}
                onClick={() => onSelect(type.id)}
                onMouseEnter={() => setHoveredCard(type.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative flex items-center gap-3.5 p-3.5 sm:p-4.5 lg:p-5 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[76px] sm:min-h-[88px] lg:min-h-[94px]
                  border-2 
                  ${isSelected 
                    ? 'bg-blue-50/80 border-blue-600 border-b-[5px] border-b-blue-700 translate-y-[-1px]' 
                    : isHovered 
                      ? 'bg-gray-50/90 border-blue-300 border-b-[4px] border-b-blue-400' 
                      : 'bg-white border-gray-200 border-b-[4px] border-b-gray-300'
                  }
                `}
              >
                <div className={`
                  w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-2xl flex items-center justify-center shrink-0 transition-colors
                  ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}
                `}>
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
