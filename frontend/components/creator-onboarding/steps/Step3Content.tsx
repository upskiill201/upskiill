'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Palette, Code2, Brain, Megaphone,
  Briefcase, DollarSign, Film, CheckSquare,
  MessageCircle, Music, Camera, MoreHorizontal,
  Check
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'design',
    icon: <Palette size={24} strokeWidth={2.2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Design',
    description: 'UI/UX & Illustration',
  },
  {
    id: 'programming',
    icon: <Code2 size={24} strokeWidth={2.2} />,
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    label: 'Programming',
    description: 'Web, Mobile & AI Apps',
  },
  {
    id: 'ai',
    icon: <Brain size={24} strokeWidth={2.2} />,
    iconBg: '#F5F3FF',
    iconColor: '#6D28D9',
    label: 'Artificial Intelligence',
    description: 'AI Tools & Models',
  },
  {
    id: 'marketing',
    icon: <Megaphone size={24} strokeWidth={2.2} />,
    iconBg: '#FFF1F2',
    iconColor: '#E11D48',
    label: 'Marketing & Growth',
    description: 'SEO, Content & Ads',
  },
  {
    id: 'business',
    icon: <Briefcase size={24} strokeWidth={2.2} />,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Business & Startups',
    description: 'Strategy & Leadership',
  },
  {
    id: 'finance',
    icon: <DollarSign size={24} strokeWidth={2.2} />,
    iconBg: '#ECFDF5',
    iconColor: '#16A34A',
    label: 'Finance & Wealth',
    description: 'Investing & Personal Finance',
  },
  {
    id: 'video_editing',
    icon: <Film size={24} strokeWidth={2.2} />,
    iconBg: '#FFF1F2',
    iconColor: '#E11D48',
    label: 'Video & Animation',
    description: 'Editing, Motion & VFX',
  },
  {
    id: 'productivity',
    icon: <CheckSquare size={24} strokeWidth={2.2} />,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    label: 'Productivity',
    description: 'Systems & Time Mastery',
  },
  {
    id: 'language',
    icon: <MessageCircle size={24} strokeWidth={2.2} />,
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    label: 'Languages',
    description: 'Communication & Fluency',
  },
  {
    id: 'music',
    icon: <Music size={24} strokeWidth={2.2} />,
    iconBg: '#FEFCE8',
    iconColor: '#D97706',
    label: 'Music & Audio',
    description: 'Production & Mixing',
  },
  {
    id: 'photography',
    icon: <Camera size={24} strokeWidth={2.2} />,
    iconBg: '#F3F4F6',
    iconColor: '#4B5563',
    label: 'Photography',
    description: 'Lighting & Editing',
  },
  {
    id: 'other',
    icon: <MoreHorizontal size={24} strokeWidth={2.2} />,
    iconBg: '#F3F4F6',
    iconColor: '#4B5563',
    label: 'Other Topic',
    description: 'Custom learning niche',
  },
];

interface Step3ContentProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function Step3Content({
  selected,
  onSelect,
}: Step3ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[35%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            What will you be
            <br className="hidden sm:block" />
            <span className="text-blue-600"> teaching on Teyro?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Select the primary category for your content. You can always teach across multiple domains later.
          </p>
        </div>

        {/* Large Step 3 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[440px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/onboarding-step3-illustration.webp"
              alt="Category Cube"
              fill
              priority
              className="object-contain p-4"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Category Grid: 3 columns) ──── */}
      <div className="w-full lg:w-[65%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
          {CATEGORIES.map((cat) => {
            const isSelected = selected === cat.id;
            const isHovered = hoveredCard === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelect(cat.id)}
                  onMouseEnter={() => setHoveredCard(cat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`
                    relative flex items-center gap-3 p-3 sm:p-3.5 lg:p-4 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[72px] sm:min-h-[80px] lg:min-h-[86px]
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
                    className="w-[40px] h-[40px] lg:w-[46px] lg:h-[46px] rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isSelected ? '#0172FD' : cat.iconBg,
                      color: isSelected ? '#FFFFFF' : cat.iconColor,
                    }}
                  >
                    {cat.icon}
                  </div>

                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-extrabold text-gray-900 text-[13.5px] sm:text-[15px] lg:text-[15.5px] leading-snug">
                      {cat.label}
                    </h3>
                    <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] text-gray-500 mt-0.5 leading-normal">
                      {cat.description}
                    </p>
                  </div>

                  <div className={`
                    absolute right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all
                    ${isSelected ? 'bg-blue-600 text-white scale-100' : 'border-2 border-gray-300 scale-90 opacity-40'}
                  `}>
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

    </div>
  );
}
