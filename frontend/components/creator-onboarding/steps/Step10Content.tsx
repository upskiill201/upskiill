'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

const CARDS_DATA = [
  {
    number: '1',
    title: 'AI-guided learners',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card1.webp',
    cardBg: '#F5F3FF',
    color: '#7C3AED',
    description: 'AI guides each learner personally, helping them stay on track and succeed.',
    details: [
      'Personalized pacing based on individual learner performance',
      'Automated check-ins to maintain high engagement',
      'Dynamic quiz generation tailored to weak spots',
    ],
  },
  {
    number: '2',
    title: 'Structured learning paths',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card2.webp',
    cardBg: '#EFF6FF',
    color: '#2563EB',
    description: 'Create step-by-step learning journeys that build skills in the right order.',
    details: [
      'Intuitive drag-and-drop curriculum builder',
      'Milestone-based content unlock logic',
      'Clear visual progress indicators for every student',
    ],
  },
  {
    number: '3',
    title: 'Smart accountability',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card3.webp',
    cardBg: '#ECFDF5',
    color: '#059669',
    description: 'Keep learners accountable with nudges, reminders and smart goal tracking.',
    details: [
      'Automated SMS and email smart nudges',
      'Social accountability and public commitments',
      'Daily streak tracking to build learning habits',
    ],
  },
  {
    number: '4',
    title: 'Community tools',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card4.webp',
    cardBg: '#FFFBEB',
    color: '#D97706',
    description: 'Build engaged communities where learners connect, share and grow together.',
    details: [
      'Integrated forum discussions tied to lessons',
      'Peer-to-peer feedback loops and assignments',
      'Direct messaging and group cohorts',
    ],
  },
  {
    number: '5',
    title: 'Progress tracking',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card5.webp',
    cardBg: '#FDF4FF',
    color: '#A855F7',
    description: 'Visualize learner progress in real-time and identify who needs support.',
    details: [
      'Real-time drop-off analytics and completion rates',
      'Individual learner profiles with detailed histories',
      'Intervention alerts for struggling students',
    ],
  },
  {
    number: '6',
    title: 'Better monetization',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card6.webp',
    cardBg: '#FFF7ED',
    color: '#EA580C',
    description: 'Sell courses, cohorts and subscriptions with flexible pricing that scales.',
    details: [
      'Tiered subscription models and memberships',
      'One-off course purchases and bundles',
      'Seamless global payment processing',
    ],
  },
  {
    number: '7',
    title: 'AI course assistant',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card7.webp',
    cardBg: '#ECFEFF',
    color: '#0891B2',
    description: 'Your AI copilot helps you create content faster and teach more effectively.',
    details: [
      'Instantly generate comprehensive course outlines',
      'AI-assisted video scripting and lesson drafting',
      'Automated transcription and summaries',
    ],
  },
  {
    number: '8',
    title: 'Learner analytics',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card8.webp',
    cardBg: '#FFF1F2',
    color: '#E11D48',
    description: 'Data-driven insights help you improve outcomes and make better decisions.',
    details: [
      'Revenue, retention, and churn dashboards',
      'Content engagement heatmaps',
      'Exportable performance reports for stakeholders',
    ],
  },
];

export default function Step10Content() {
  const [activeModal, setActiveModal] = useState<typeof CARDS_DATA[0] | null>(null);

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Illustration) ──── */}
      <div className="w-full lg:w-[35%] shrink-0 flex flex-col justify-center">
        <div>
          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            How Teyro
            <br className="hidden sm:block" />
            <span className="text-blue-600"> powers your growth.</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Every tool is designed to maximize learner completion and creator revenue. Tap any card to explore.
          </p>
        </div>

        {/* Large Step 10 Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[440px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST10_side_img.webp"
              alt="Feature Ecosystem"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (8 Feature Cards Grid: 2 columns on desktop) ──── */}
      <div className="w-full lg:w-[65%] flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 lg:gap-4 w-full">
          {CARDS_DATA.map((card) => (
            <div
              key={card.number}
              onClick={() => setActiveModal(card)}
              className="group relative flex items-center gap-3.5 p-3.5 sm:p-4 lg:p-4.5 rounded-2xl bg-white border-2 border-gray-200 border-b-[4.5px] border-b-gray-300 hover:border-blue-300 hover:border-b-blue-400 cursor-pointer select-none transition-all duration-100 min-h-[82px] sm:min-h-[90px]"
            >
              <div 
                className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
                style={{ backgroundColor: card.cardBg }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-5 h-5 rounded-full text-[11px] font-extrabold text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.number}
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-[14px] sm:text-[15.5px] lg:text-[16px] leading-snug">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-gray-500 mt-1 line-clamp-1">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CARD DETAILS MODAL ─── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-[480px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-gray-100">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: activeModal.cardBg }}
              >
                <Image
                  src={activeModal.image}
                  alt={activeModal.title}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span 
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-white inline-block mb-1"
                  style={{ backgroundColor: activeModal.color }}
                >
                  Feature #{activeModal.number}
                </span>
                <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight">
                  {activeModal.title}
                </h3>
              </div>
            </div>

            <p className="text-[14px] text-gray-600 mb-5 leading-relaxed">
              {activeModal.description}
            </p>

            <div className="space-y-2.5 mb-6">
              {activeModal.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-gray-700">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full h-[46px] rounded-2xl bg-blue-600 text-white font-extrabold text-[15px] hover:bg-blue-700 transition-colors shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
