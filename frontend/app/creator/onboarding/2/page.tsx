'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, 
  PlaySquare, MonitorPlay, UserPlus, GraduationCap, 
  BookOpen, Users, Briefcase, Building2 
} from 'lucide-react';

const CREATOR_TYPES = [
  {
    id: 'course_creator',
    icon: <PlaySquare size={38} strokeWidth={2.2} />,
    label: 'Course creator',
    description: 'I create and sell online courses.',
  },
  {
    id: 'youtube_educator',
    icon: <MonitorPlay size={38} strokeWidth={2.2} />,
    label: 'YouTube educator',
    description: 'I teach and grow my audience on YouTube.',
  },
  {
    id: 'coach',
    icon: <UserPlus size={38} strokeWidth={2.2} />,
    label: 'Coach',
    description: 'I offer coaching and help people achieve their goals.',
  },
  {
    id: 'teacher',
    icon: <GraduationCap size={38} strokeWidth={2.2} />,
    label: 'Teacher',
    description: 'I teach students (online or offline).',
  },
  {
    id: 'mentor',
    icon: <BookOpen size={38} strokeWidth={2.2} />,
    label: 'Mentor',
    description: 'I guide and mentor individuals.',
  },
  {
    id: 'community_educator',
    icon: <Users size={38} strokeWidth={2.2} />,
    label: 'Community educator',
    description: 'I build and educate communities.',
  },
  {
    id: 'freelancer',
    icon: <Briefcase size={38} strokeWidth={2.2} />,
    label: 'Freelancer teaching skills',
    description: 'I teach skills as a freelancer.',
  },
  {
    id: 'agency_educator',
    icon: <Building2 size={38} strokeWidth={2.2} />,
    label: 'Agency educator',
    description: 'I represent an agency or teach on behalf of a brand.',
  },
];

export default function StepTwoPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setIsLoading(true);
    try {
      const draftId = localStorage.getItem('teyro_onboarding_draft_id');
      if (draftId && !draftId.startsWith('local_')) {
        await fetch(`https://upskiill-backend.onrender.com/creator-onboarding/${draftId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ creatorType: selected }),
        });
      } else {
        const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
        localStorage.setItem('teyro_onboarding_data', JSON.stringify({ ...existing, creatorType: selected }));
      }
    } catch {
      const existing = JSON.parse(localStorage.getItem('teyro_onboarding_data') || '{}');
      localStorage.setItem('teyro_onboarding_data', JSON.stringify({ ...existing, creatorType: selected }));
    } finally {
      setIsLoading(false);
      router.push('/creator/onboarding/3');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-visible min-h-0 pt-8 px-6 lg:pt-[48px] lg:px-[32px] gap-8 lg:gap-0">
        
        {/* ──── LEFT PANEL ──── */}
        <div className="w-full lg:w-[30%] shrink-0 flex flex-col overflow-visible lg:-ml-[32px]">
          <div className="lg:ml-[32px]">
            <h1 className="font-extrabold tracking-tight text-gray-900 text-[32px] lg:text-[40px] leading-[1.2]">
              Let&apos;s personalize
              <br className="hidden sm:block" />
              <span className="text-blue-600"> your creator journey.</span>
            </h1>

            {/* Decorative Horizontal Blue Line */}
            <div className="w-[50px] h-[2px] bg-blue-600 rounded-full mt-6 mb-6 lg:mt-8 lg:mb-8" />

            {/* Description */}
            <p className="text-base sm:text-lg xl:text-[20px] text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-[480px]">
              This helps us customize Teyro{' '}
              <br className="hidden sm:block" />
              around <span className="font-semibold text-blue-600">your goals</span> and how{' '}
              <br className="hidden sm:block" />
              you teach.
            </p>
          </div>

          {/* 3D Illustration */}
          <div className="w-full flex justify-center lg:justify-start items-end shrink-0 mt-2 lg:mt-5 hidden sm:flex">
            <Image
              src="/onboarding-step2-dashboard.png"
              alt="Creator Dashboard"
              width={550}
              height={440}
              className="w-full max-w-[400px] lg:max-w-[550px] h-auto object-contain block"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
              }}
              priority
            />
          </div>
        </div>

        {/* ──── RIGHT PANEL ──── */}
        <div className="w-full lg:w-[70%] flex flex-col overflow-y-auto lg:overflow-visible pb-8 lg:pb-0">
          {/* Section heading */}
          <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-2">
            What best describes you?
          </h1>
          <p className="text-[15px] lg:text-[16px] text-slate-500 mb-6 lg:mb-8">
            Choose the option that fits you the most.
          </p>

          {/* ── Card Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-5 gap-x-5 xl:gap-y-7 xl:gap-x-6 w-full xl:max-w-[95%] 2xl:max-w-[80%] flex-1 min-h-0 pb-4">
            {CREATOR_TYPES.map((type) => {
              const isSel = selected === type.id;
              const isHov = hoveredCard === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => setSelected(type.id)}
                  onMouseEnter={() => setHoveredCard(type.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative flex flex-col items-center p-6 lg:p-[32px_24px_28px_24px] rounded-[16px] bg-white cursor-pointer text-center transition-all duration-200 outline-none w-full h-[240px] sm:h-[280px]"
                  style={{
                    border: isSel
                      ? '2.5px solid #2563EB'
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
                  {/* Checkmark badge (selected only) */}
                  {isSel && (
                    <div className="absolute top-4 right-4 w-[22px] h-[22px] rounded-full bg-blue-600 flex items-center justify-center z-10">
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Icon container */}
                  <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[14px] bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mb-4 sm:mb-4">
                    {type.icon}
                  </div>

                  {/* Label */}
                  <p className="text-[15px] sm:text-[16px] font-bold text-slate-900 mb-[6px] leading-[1.35] w-full">
                    {type.label}
                  </p>

                  {/* Description */}
                  <p className="text-[13px] text-slate-500 m-0 leading-[1.4] font-normal w-full">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/1')}
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

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected || isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            !selected || isLoading 
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
