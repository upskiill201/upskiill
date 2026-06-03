'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Lightbulb, Sparkles, UserRound } from 'lucide-react';
import { FaYoutube, FaWhatsapp, FaTelegram, FaPatreon } from 'react-icons/fa';
import { motion } from 'framer-motion';

// ── Platform definitions ─────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: 'udemy',
    icon: (
      <img
        src="https://cdn.brandfetch.io/idTqV2BNgX/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1741065942533"
        alt="Udemy"
        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
      />
    ),
    iconBg: '#F9F0FF',
    label: 'Udemy',
    description: 'I create or sell courses on Udemy.',
  },
  {
    id: 'youtube',
    icon: <FaYoutube size={32} />,
    iconBg: '#FFF0F0',
    iconColor: '#FF0000',
    label: 'YouTube',
    description: 'I teach through YouTube.',
  },
  {
    id: 'whatsapp',
    icon: <FaWhatsapp size={32} />,
    iconBg: '#EDFBF1',
    iconColor: '#25D366',
    label: 'WhatsApp',
    description: 'I share content or sell via WhatsApp.',
  },
  {
    id: 'telegram',
    icon: <FaTelegram size={32} />,
    iconBg: '#EFF9FF',
    iconColor: '#229ED9',
    label: 'Telegram',
    description: 'I teach or sell via Telegram.',
  },
  {
    id: 'gumroad',
    icon: (
      <img
        src="https://cdn.brandfetch.io/idMw8qr5lW/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1667593186460"
        alt="Gumroad"
        style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px' }}
      />
    ),
    iconBg: '#111111',
    label: 'Gumroad',
    description: 'I sell digital products on Gumroad.',
  },
  {
    id: 'teachable',
    icon: (
      <img
        src="https://cdn.brandfetch.io/ida_8ohRPU/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1667840795991"
        alt="Teachable"
        style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '4px' }}
      />
    ),
    iconBg: '#006B5D',
    label: 'Teachable',
    description: 'I host my courses on Teachable.',
  },
  {
    id: 'kajabi',
    icon: (
      <img
        src="https://cdn.brandfetch.io/idDDho9RcJ/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1732695044236"
        alt="Kajabi"
        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
      />
    ),
    iconBg: '#EEF3FF',
    label: 'Kajabi',
    description: 'I use Kajabi to run my courses.',
  },
  {
    id: 'skool',
    icon: (
      <span
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          fontWeight: 800,
          color: '#E85D26',
          letterSpacing: '-0.5px',
        }}
      >
        sk
      </span>
    ),
    iconBg: '#FFF4EE',
    label: 'Skool',
    description: 'I run my community on Skool.',
  },
  {
    id: 'patreon',
    icon: <FaPatreon size={28} />,
    iconBg: '#FFF0F2',
    iconColor: '#FF424D',
    label: 'Patreon',
    description: 'I offer content or membership on Patreon.',
  },
  {
    id: 'private_coaching',
    icon: <UserRound size={28} strokeWidth={2} />,
    iconBg: '#F3EFFE',
    iconColor: '#7C3AED',
    label: 'Private coaching',
    description: 'I do 1:1 coaching or consulting.',
  },
  {
    id: 'none_yet',
    icon: <Sparkles size={26} strokeWidth={2} />,
    iconBg: '#EEF3FF',
    iconColor: '#2563EB',
    label: 'None yet',
    description: "I'm just getting started with teaching online.",
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// ── Page Component ─────────────────────────────────────────────────────────────
export default function StepFivePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggle = (id: string) => {
    // "None yet" is mutually exclusive with everything else
    if (id === 'none_yet') {
      setSelected((prev) =>
        prev.includes('none_yet') ? [] : ['none_yet']
      );
    } else {
      setSelected((prev) => {
        const without = prev.filter((s) => s !== 'none_yet');
        return without.includes(id)
          ? without.filter((s) => s !== id)
          : [...without, id];
      });
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const draftId = localStorage.getItem('teyro_onboarding_draft_id');
      if (draftId && !draftId.startsWith('local_')) {
        await fetch(
          `https://upskiill-backend.onrender.com/creator-onboarding/${draftId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPlatforms: selected }),
          }
        );
      } else {
        const existing = JSON.parse(
          localStorage.getItem('teyro_onboarding_data') || '{}'
        );
        localStorage.setItem(
          'teyro_onboarding_data',
          JSON.stringify({ ...existing, currentPlatforms: selected })
        );
      }
    } catch {
      const existing = JSON.parse(
        localStorage.getItem('teyro_onboarding_data') || '{}'
      );
      localStorage.setItem(
        'teyro_onboarding_data',
        JSON.stringify({ ...existing, currentPlatforms: selected })
      );
    } finally {
      setIsLoading(false);
      router.push('/creator/onboarding/6');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-visible min-h-0 pt-8 px-6 lg:pt-[48px] lg:px-[32px] gap-8 lg:gap-0">

        {/* ──── LEFT PANEL ──── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full lg:w-[30%] shrink-0 flex flex-col overflow-visible lg:-ml-[32px]"
        >
          <div className="lg:ml-[32px]">
            <h1 className="font-extrabold tracking-tight text-gray-900 text-[32px] lg:text-[40px] leading-[1.2]">
              Let&apos;s map your
              <br className="hidden sm:block" />
              <span className="text-blue-600"> current journey</span>
            </h1>

            {/* Decorative Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-4 lg:mb-4 leading-relaxed max-w-[480px]">
              Knowing where you teach or sell
              <br className="hidden sm:block" />
              today helps us make your
              <br className="hidden sm:block" />
              transition to Teyro seamless.
            </p>
          </div>

          {/* 3D Illustration */}
          <div className="w-full flex justify-center lg:justify-start items-end shrink-0 mt-4 lg:mt-6 hidden sm:flex">
            <Image
              src="/Teyro Creator Onbarding flow/CF_ST5_side_img.png"
              alt="Platform integrations globe"
              width={550}
              height={480}
              className="w-full max-w-[400px] lg:max-w-[520px] h-auto object-contain block"
              style={{
                maskImage:
                  'radial-gradient(ellipse at center, black 45%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at center, black 45%, transparent 100%)',
              }}
              priority
            />
          </div>
        </motion.div>

        {/* ──── RIGHT PANEL ──── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="w-full lg:w-[70%] flex flex-col pb-8 lg:pb-12"
        >
          {/* Section heading */}
          <h2 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            Where do you currently teach or sell?
          </h2>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Select all that apply. This helps us import, migrate and guide you better.
          </p>

          {/* ── Card Grid (multi-select) ── */}
          {/* Mobile: 2-col, tablet: 3-col, desktop: 4-col */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 w-full xl:max-w-[95%] 2xl:max-w-[90%] mb-[40px]"
          >
            {PLATFORMS.map((platform) => {
              const isSel = selected.includes(platform.id);
              const isHov = hoveredCard === platform.id;

              return (
                <motion.button
                  variants={itemVariants}
                  key={platform.id}
                  onClick={() => toggle(platform.id)}
                  onMouseEnter={() => setHoveredCard(platform.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-center p-3 sm:p-5 lg:p-[28px_20px_24px_20px] rounded-[12px] sm:rounded-[16px] bg-white cursor-pointer text-center transition-all duration-200 outline-none w-full h-[150px] sm:h-[200px] lg:h-[220px]"
                  style={{
                    border: isSel
                      ? '2px solid #2563EB'
                      : isHov
                      ? '1px solid #93C5FD'
                      : '1px solid #E2E8F0',
                    boxShadow: isSel
                      ? '0 24px 48px -8px rgba(37, 99, 235, 0.35)'
                      : isHov
                      ? '0 24px 48px -8px rgba(15, 23, 42, 0.16)'
                      : '0 12px 36px -6px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  {/* Checkmark badge */}
                  <div
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] rounded-full flex items-center justify-center z-10 transition-all duration-200"
                    style={{
                      backgroundColor: isSel ? '#2563EB' : 'transparent',
                      border: isSel ? '2px solid #2563EB' : '1.5px solid #CBD5E1',
                    }}
                  >
                    {isSel && (
                      <svg
                        width="6"
                        height="5"
                        viewBox="0 0 8 6"
                        fill="none"
                        className="sm:w-[8px] sm:h-[6px]"
                      >
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Icon container */}
                  <div
                    className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] lg:w-[60px] lg:h-[60px] rounded-[10px] sm:rounded-[12px] lg:rounded-[14px] flex items-center justify-center shrink-0 mb-2 sm:mb-3 [&>svg]:w-[20px] [&>svg]:h-[20px] sm:[&>svg]:w-[28px] sm:[&>svg]:h-[28px] lg:[&>svg]:w-[32px] lg:[&>svg]:h-[32px]"
                    style={{
                      backgroundColor: platform.iconBg,
                      color: platform.iconColor ?? undefined,
                    }}
                  >
                    {platform.icon}
                  </div>

                  {/* Label */}
                  <p className="text-[12px] sm:text-[15px] lg:text-[16px] font-bold text-slate-900 mb-0.5 lg:mb-1.5 leading-[1.3] w-full">
                    {platform.label}
                  </p>

                  {/* Description */}
                  <p className="text-[10px] sm:text-[12px] lg:text-[13px] text-slate-500 m-0 leading-[1.35] font-normal w-full line-clamp-2">
                    {platform.description}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Bottom Banner Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-[16px] sm:rounded-[20px] p-5 sm:p-[0_0_0_24px] w-full xl:max-w-[95%] 2xl:max-w-[90%] overflow-hidden"
            style={{
              backgroundColor: '#F2F6FE',
              boxShadow: '0 8px 28px -6px rgba(15, 23, 42, 0.08)',
            }}
          >
            {/* Left: icon + text */}
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 py-4 sm:py-5">
              <div className="w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] bg-white/80 backdrop-blur-sm flex items-center justify-center shrink-0 text-blue-600">
                <Lightbulb size={22} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] sm:text-[15px] font-bold text-blue-600 mb-[2px]">
                  Don&apos;t worry!
                </p>
                <p className="text-[13px] sm:text-[14px] text-slate-700 leading-[1.55]">
                  You can import and connect your existing platforms later.
                </p>
              </div>
            </div>

            {/* Right: bottom image with fade-out */}
            <div className="hidden sm:block shrink-0 w-[180px] lg:w-[360px] xl:w-[460px] h-[100px]">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST5_bottom_img.png"
                alt="Platform import illustration"
                width={460}
                height={100}
                className="w-full h-[100px] object-cover block"
                style={{
                  maskImage:
                    'radial-gradient(ellipse at center, black 30%, transparent 98%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse at center, black 30%, transparent 98%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/4')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-blue-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-full sm:w-auto"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        {/* Trust badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-[13.5px] font-medium text-center">
          <ShieldCheck size={18} />
          Your information is secure and will never be shared.
        </div>

        {/* Continue button — always enabled (platforms are optional) */}
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 cursor-pointer shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Saving...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
