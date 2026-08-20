'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BarChart2, MessageSquare, DollarSign, Users,
  AlertCircle, UserPlus, Trophy, ListChecks, Check
} from 'lucide-react';

const CHALLENGES = [
  {
    id: 'learners_dont_finish',
    icon: <BarChart2 size={26} strokeWidth={2} />,
    iconBg: '#FFF0F2',
    iconColor: '#E11D48',
    label: "Learners don't finish",
    description: "Many start but don't complete my courses.",
  },
  {
    id: 'low_engagement',
    icon: <MessageSquare size={26} strokeWidth={2} />,
    iconBg: '#EFF9FF',
    iconColor: '#0EA5E9',
    label: 'Low engagement',
    description: "Learners don't interact or participate enough.",
  },
  {
    id: 'low_revenue',
    icon: <DollarSign size={26} strokeWidth={2} />,
    iconBg: '#EDFDF5',
    iconColor: '#059669',
    label: 'Low revenue',
    description: "I'm not earning enough from my content.",
  },
  {
    id: 'hard_to_build_community',
    icon: <Users size={26} strokeWidth={2} />,
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    label: 'Hard to build community',
    description: 'I struggle to grow an active learner community.',
  },
  {
    id: 'no_accountability',
    icon: <AlertCircle size={26} strokeWidth={2} />,
    iconBg: '#FFF0F2',
    iconColor: '#E11D48',
    label: 'No accountability',
    description: 'Learners lack motivation and follow-through.',
  },
  {
    id: 'difficult_onboarding',
    icon: <UserPlus size={26} strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Difficult onboarding',
    description: 'Getting new learners started is complicated.',
  },
  {
    id: 'too_much_competition',
    icon: <Trophy size={26} strokeWidth={2} />,
    iconBg: '#EFF9FF',
    iconColor: '#2563EB',
    label: 'Crowded market',
    description: "It's hard to stand out from other educators.",
  },
  {
    id: 'hard_to_stay_organized',
    icon: <ListChecks size={26} strokeWidth={2} />,
    iconBg: '#EDFDF5',
    iconColor: '#059669',
    label: 'Hard to stay organized',
    description: 'Managing content, students and tasks is overwhelming.',
  },
];

interface Step7ContentProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function Step7Content({
  selected,
  onToggle,
}: Step7ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            What is your
            <br className="hidden sm:block" />
            <span className="text-blue-600"> biggest challenge?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Teyro was specifically engineered with gamification and guided pacing to solve learner drop-off.
          </p>
        </div>

        {/* Large Step 7 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST7_side_img.png"
              alt="Creator Challenges"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Challenges Grid: 2 columns) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {CHALLENGES.map((item) => {
            const isSelected = selected.includes(item.id);
            const isHovered = hoveredCard === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onToggle(item.id)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  relative flex items-center gap-3.5 p-3.5 sm:p-4 lg:p-4.5 rounded-2xl cursor-pointer select-none transition-all duration-100 min-h-[74px] sm:min-h-[82px] lg:min-h-[88px]
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
                  className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[50px] lg:h-[50px] rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isSelected ? '#0172FD' : item.iconBg,
                    color: isSelected ? '#FFFFFF' : item.iconColor,
                  }}
                >
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-extrabold text-gray-900 text-[14px] sm:text-[15.5px] lg:text-[16px] leading-snug">
                    {item.label}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] text-gray-500 mt-0.5 leading-normal">
                    {item.description}
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
