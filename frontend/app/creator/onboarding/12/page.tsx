'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const CARDS_DATA = [
  {
    id: 'upload',
    title: 'Upload existing course',
    description: 'Bring your slides, videos and content to Teyro.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card1.png',
    cardBg: 'bg-violet-50',
  },
  {
    id: 'create',
    title: 'Create new course',
    description: 'Build a new course from scratch with AI assistance.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card2.png',
    cardBg: 'bg-emerald-50',
  },
  {
    id: 'cohort',
    title: 'Build a cohort',
    description: 'Create a time-bound cohort with a structured journey.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card3.png',
    cardBg: 'bg-orange-50',
  },
  {
    id: 'community',
    title: 'Start with a community',
    description: 'Build your community first and add products later.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card4.png',
    cardBg: 'bg-blue-50',
  },
  {
    id: 'test',
    title: 'Test with learners',
    description: 'Validate your idea with a small group before going all in.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card5.png',
    cardBg: 'bg-pink-50',
  },
  {
    id: 'explore',
    title: 'Explore platform first',
    description: 'Take a tour and explore features at your own pace.',
    image: '/Teyro Creator Onbarding flow/CF_ST12_card6.png',
    cardBg: 'bg-indigo-50',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function StepTwelvePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/creator/onboarding/13');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-0 pt-0 px-6 lg:pt-0 lg:px-[32px]">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full max-w-[1600px] mx-auto h-full flex-1">
          {/* ──── LEFT PANEL ──── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-[35%] shrink-0 flex flex-col lg:-ml-[32px] h-full"
          >
            <div className="lg:ml-[32px] pt-8 lg:pt-12">
              <h1 className="font-extrabold tracking-tight text-slate-900 text-[28px] lg:text-[38px] leading-[1.15] mb-4">
                What do you want
                <br className="hidden sm:block" />
                to do <span className="text-violet-700">first?</span>
              </h1>

              {/* Decorative Line */}
              <div className="w-[50px] h-[2px] bg-violet-700 rounded-full mb-5" />

              {/* Description */}
              <p className="text-[15px] lg:text-[16px] text-slate-600 mb-6 leading-relaxed max-w-[420px]">
                Choose where you want to begin. We&apos;ll personalize your dashboard and guide you from there.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative w-full flex-1 min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-center lg:ml-[32px] mt-[30px] z-0">
              <div className="relative w-full h-[250px] lg:h-[350px]">
                <Image
                  src="/Teyro Creator Onbarding flow/CF_ST12_side_img.png"
                  alt="Creator thinking"
                  fill
                  className="object-contain object-bottom scale-[1.1] origin-bottom"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
                  }}
                  priority
                />
              </div>

              {/* Small Tip Box */}
              <div className="mt-4 p-4 rounded-xl border border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm flex items-start gap-4 w-full max-w-[400px]">
                <div className="w-10 h-10 shrink-0 relative flex items-center justify-center">
                  <Image
                    src="/Teyro Creator Onbarding flow/CF_ST12_rocket-img.png"
                    alt="Rocket"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[13px] text-slate-700 font-medium leading-snug">
                    You&apos;re one step closer to building something amazing.
                  </p>
                  <p className="text-[13px] font-bold text-violet-700 mt-1">
                    Let&apos;s get you started!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ──── RIGHT PANEL ──── */}
          <div className="w-full lg:w-[65%] flex flex-col mt-4 lg:mt-0 relative h-full min-h-[400px] lg:min-h-[600px] pt-8 lg:pt-12 lg:pr-[30px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 lg:mb-8"
            >
              <h2 className="text-[20px] lg:text-[22px] font-bold text-slate-900 mb-1">
                Choose your starting point
              </h2>
              <p className="text-[14px] text-slate-500 font-medium">
                You can always change this later.
              </p>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[12px] gap-x-[25px] w-full lg:w-[85%]"
            >
              {CARDS_DATA.map((card) => {
                const isSelected = selectedId === card.id;
                return (
                  <motion.div
                    key={card.id}
                    variants={itemVariants}
                    onClick={() => setSelectedId(card.id)}
                    className={`relative flex flex-col w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-[1.5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${
                      isSelected ? 'border-violet-600 shadow-[0_0_0_2px_rgba(124,58,237,0.1)]' : 'border-slate-100 hover:border-violet-200'
                    } ${card.cardBg}`}
                  >
                    {/* Radio */}
                    <div className="absolute top-4 right-4 z-10 w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-colors">
                      <div
                        className={`w-full h-full rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-violet-600 bg-violet-600'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-[120px] lg:h-[130px] mt-0 lg:mt-6 mb-3 lg:mb-4 flex items-center justify-center">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover object-center"
                        style={{
                          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 px-4 pb-4">
                      <h3 className="font-bold text-[14px] lg:text-[15px] text-slate-900 mb-1.5">
                        {card.title}
                      </h3>
                      <p className="text-[12.5px] lg:text-[13px] text-slate-500 font-medium leading-snug">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ──── BOTTOM BANNER (Now in Right Panel) ──── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative w-full lg:w-[85%] rounded-2xl overflow-hidden mt-[20px] shrink-0 bg-[#F5F3FF] border border-violet-100 flex flex-row items-center min-h-[70px] h-auto lg:h-[80px] py-4 lg:py-0 mb-6"
            >
              {/* Left Sparkles Icon */}
              <div className="flex items-center justify-center w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] rounded-xl bg-violet-100 text-violet-700 ml-4 lg:ml-6 shrink-0 z-10">
                <Sparkles size={18} strokeWidth={2.5} className="lg:w-[20px] lg:h-[20px] w-[16px] h-[16px]" />
              </div>

              <div className="flex-1 flex flex-col justify-center px-4 lg:px-5 z-10">
                <h3 className="font-bold text-[13px] sm:text-[14px] lg:text-[15px] text-violet-900 mb-0.5 leading-snug">
                  No wrong choice. Just progress.
                </h3>
                <p className="text-[12px] sm:text-[12.5px] lg:text-[13px] text-slate-600 font-medium leading-snug">
                  Every creator starts somewhere. Teyro grows with you.
                </p>
              </div>

              {/* Right Flow Graphic */}
              <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[280px] lg:w-[450px] shrink-0 z-0 pointer-events-none">
                <Image
                  src="/Teyro Creator Onbarding flow/CF_ST12_bottom_card_flow_img.png"
                  alt="Flow"
                  fill
                  className="object-cover object-center"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/11')}
          className="flex items-center justify-center sm:justify-start gap-2 text-[16px] font-medium text-violet-600 bg-transparent border-none cursor-pointer py-2 px-4 sm:-ml-4 w-full sm:w-auto hover:text-violet-700 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back
        </button>

        {/* Trust badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-500 text-[13.5px] font-medium text-center">
          <ShieldCheck size={18} />
          Your information is secure and will never be shared.
        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={isLoading || !selectedId}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading || !selectedId
              ? 'bg-violet-300 cursor-not-allowed'
              : 'bg-violet-600 cursor-pointer shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:bg-violet-700 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-[1px]'
          }`}
        >
          {isLoading ? 'Loading...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
