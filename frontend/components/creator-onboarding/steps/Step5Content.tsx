'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, Sparkles } from 'lucide-react';
import { FaYoutube, FaWhatsapp, FaTelegram, FaPatreon, FaGlobe } from 'react-icons/fa6';

const PLATFORMS = [
  {
    id: 'youtube',
    icon: <FaYoutube size={26} className="text-[#FF0000]" />,
    iconBg: '#FFF0F0',
    label: 'YouTube',
    description: 'I teach & grow my audience on YouTube.',
  },
  {
    id: 'whatsapp',
    icon: <FaWhatsapp size={26} className="text-[#25D366]" />,
    iconBg: '#EDFBF1',
    label: 'WhatsApp',
    description: 'I share content or sell via WhatsApp.',
  },
  {
    id: 'telegram',
    icon: <FaTelegram size={26} className="text-[#229ED9]" />,
    iconBg: '#EFF9FF',
    label: 'Telegram',
    description: 'I teach or sell via Telegram groups.',
  },
  {
    id: 'udemy',
    icon: <span className="font-extrabold text-[18px] text-[#A435F0]">U</span>,
    iconBg: '#F9F0FF',
    label: 'Udemy / Skillshare',
    description: 'I create or sell courses on marketplaces.',
  },
  {
    id: 'gumroad',
    icon: <span className="font-extrabold text-[17px] text-[#FF90E8]">G</span>,
    iconBg: '#18181B',
    label: 'Gumroad / Lemon',
    description: 'I sell digital downloads & templates.',
  },
  {
    id: 'teachable',
    icon: <span className="font-extrabold text-[16px] text-[#006B5D]">T</span>,
    iconBg: '#E6F8F5',
    label: 'Teachable / Kajabi',
    description: 'I host courses on traditional platforms.',
  },
  {
    id: 'skool',
    icon: <span className="font-extrabold text-[16px] text-[#E85D26]">sk</span>,
    iconBg: '#FFF4EE',
    label: 'Skool / Circle',
    description: 'I run a paid community or group.',
  },
  {
    id: 'patreon',
    icon: <FaPatreon size={24} className="text-[#FF424D]" />,
    iconBg: '#FFF0F2',
    label: 'Patreon / Substack',
    description: 'I offer memberships & newsletters.',
  },
  {
    id: 'website',
    icon: <FaGlobe size={24} className="text-[#2563EB]" />,
    iconBg: '#EEF3FF',
    label: 'My own website',
    description: 'I sell directly on custom web pages.',
  },
  {
    id: 'starting_fresh',
    icon: <Sparkles size={24} className="text-[#D97706]" />,
    iconBg: '#FFFBEB',
    label: 'Starting fresh',
    description: "I haven't published anywhere yet.",
  },
];

interface Step5ContentProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function Step5Content({
  selected,
  onToggle,
}: Step5ContentProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[36%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Where do you
            <br className="hidden sm:block" />
            <span className="text-blue-600"> currently share or sell?</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Select all platforms where you interact with learners or sell products. You can pick multiple options.
          </p>
        </div>

        {/* Large Step 5 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST5_side_img.png"
              alt="Platforms"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Platforms Grid: 2 columns) ──── */}
      <div className="w-full lg:w-[64%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
          {PLATFORMS.map((plat) => {
            const isSelected = selected.includes(plat.id);
            const isHovered = hoveredCard === plat.id;

            return (
              <div
                key={plat.id}
                onClick={() => onToggle(plat.id)}
                onMouseEnter={() => setHoveredCard(plat.id)}
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
                  className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: plat.iconBg }}
                >
                  {plat.icon}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h3 className="font-extrabold text-gray-900 text-[14px] sm:text-[15.5px] lg:text-[16px] leading-snug">
                    {plat.label}
                  </h3>
                  <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-gray-500 mt-0.5 leading-normal">
                    {plat.description}
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
