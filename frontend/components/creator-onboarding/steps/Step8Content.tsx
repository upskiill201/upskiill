'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { FaSeedling, FaTree, FaCoins, FaCrown, FaGem } from 'react-icons/fa6';

const REVENUE_TARGETS = [
  {
    id: 'under_500',
    icon: <FaSeedling size={24} className="text-[#059669]" />,
    iconBg: '#ECFDF5',
    label: 'Under $500 / month',
    description: "I'm just getting started building extra income.",
    tag: 'Foundation',
    tagColor: '#059669',
    tagBg: '#ECFDF5',
  },
  {
    id: '500_2k',
    icon: <FaTree size={24} className="text-[#0284C7]" />,
    iconBg: '#F0F9FF',
    label: '$500 – $2,000 / month',
    description: 'Steady side income alongside my main work.',
    tag: 'Steady Growth',
    tagColor: '#0284C7',
    tagBg: '#F0F9FF',
  },
  {
    id: '2k_10k',
    icon: <FaCoins size={24} className="text-[#D97706]" />,
    iconBg: '#FFFBEB',
    label: '$2,000 – $10,000 / month',
    description: 'A meaningful full-time creator income.',
    tag: 'Scale',
    tagColor: '#D97706',
    tagBg: '#FFFBEB',
  },
  {
    id: '10k_50k',
    icon: <FaCrown size={24} className="text-[#7C3AED]" />,
    iconBg: '#F3EFFE',
    label: '$10,000 – $50,000 / month',
    description: 'A thriving educational brand and business.',
    tag: 'High Impact',
    tagColor: '#7C3AED',
    tagBg: '#F3EFFE',
  },
  {
    id: '50k_plus',
    icon: <FaGem size={24} className="text-[#0172FD]" />,
    iconBg: '#EFF6FF',
    label: '$50,000+ / month',
    description: 'Total financial freedom and large-scale impact.',
    tag: 'Legacy',
    tagColor: '#0172FD',
    tagBg: '#EFF6FF',
  },
];

interface Step8ContentProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function Step8Content({
  selected,
  onSelect,
}: Step8ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            What is your
            <br className="hidden sm:block" />
            <span className="text-blue-600"> monthly revenue goal?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            We&apos;ll tailor your pricing models, checkout funnels, and growth strategies to help you hit your target.
          </p>
        </div>

        {/* Large Step 8 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST8_side_img.webp"
              alt="Revenue Target"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Revenue Cards: Stacked) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {REVENUE_TARGETS.map((item) => {
            const isSelected = selected === item.id;
            const isHovered = hoveredCard === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                onMouseEnter={() => setHoveredCard(item.id)}
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
                    backgroundColor: isSelected ? '#0172FD' : item.iconBg,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    className: isSelected ? 'text-white' : item.icon.props.className,
                  })}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-extrabold text-gray-900 text-[14.5px] sm:text-[16px] lg:text-[17px] leading-snug">
                      {item.label}
                    </h3>
                    <span 
                      className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                      style={{
                        backgroundColor: item.tagBg,
                        color: item.tagColor,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] text-gray-500 leading-normal">
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
