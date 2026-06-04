'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, Star, Rocket, X, CheckCircle2 } from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const CARDS_DATA = [
  {
    number: '1',
    color: 'bg-[#7C3AED]',
    cardBg: 'bg-violet-50',
    title: 'AI-guided\nlearners',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card1.png',
    description: 'AI guides each learner personally, helping them stay on track and succeed.',
    details: [
      'Personalized pacing based on individual learner performance',
      'Automated check-ins to maintain high engagement',
      'Dynamic quiz generation tailored to their weak spots'
    ]
  },
  {
    number: '2',
    color: 'bg-[#2563EB]',
    cardBg: 'bg-blue-50',
    title: 'Structured\nlearning paths',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card2.png',
    description: 'Create step-by-step learning journeys that build skills in the right order.',
    details: [
      'Intuitive drag-and-drop curriculum builder',
      'Milestone-based content unlock logic',
      'Clear visual progress indicators for every student'
    ]
  },
  {
    number: '3',
    color: 'bg-[#10B981]',
    cardBg: 'bg-emerald-50',
    title: 'Smart\naccountability',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card3.png',
    description: 'Keep learners accountable with nudges, reminders and smart goal tracking.',
    details: [
      'Automated SMS and email smart nudges',
      'Social accountability and public commitments',
      'Daily streak tracking to build learning habits'
    ]
  },
  {
    number: '4',
    color: 'bg-[#F59E0B]',
    cardBg: 'bg-amber-50',
    title: 'Community\ntools',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card4.png',
    description: 'Build engaged communities where learners connect, share and grow together.',
    details: [
      'Integrated forum discussions tied to lessons',
      'Peer-to-peer feedback loops and assignments',
      'Direct messaging and group cohorts'
    ]
  },
  {
    number: '5',
    color: 'bg-[#9333EA]',
    cardBg: 'bg-purple-50',
    title: 'Progress\ntracking',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card5.png',
    description: 'Visualize learner progress in real-time and identify who needs support.',
    details: [
      'Real-time drop-off analytics and completion rates',
      'Individual learner profiles with detailed histories',
      'Intervention alerts for struggling students'
    ]
  },
  {
    number: '6',
    color: 'bg-[#F59E0B]',
    cardBg: 'bg-orange-50',
    title: 'Better\nmonetization',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card6.png',
    description: 'Sell courses, cohorts and subscriptions with flexible pricing that scales.',
    details: [
      'Tiered subscription models and memberships',
      'One-off course purchases and bundles',
      'Seamless global payment processing'
    ]
  },
  {
    number: '7',
    color: 'bg-[#06B6D4]',
    cardBg: 'bg-cyan-50',
    title: 'AI course\nassistant',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card7.png',
    description: 'Your AI copilot helps you create content faster and teach more effectively.',
    details: [
      'Instantly generate comprehensive course outlines',
      'AI-assisted video scripting and lesson drafting',
      'Automated transcription and summaries'
    ]
  },
  {
    number: '8',
    color: 'bg-[#E11D48]',
    cardBg: 'bg-rose-50',
    title: 'Learner\nanalytics',
    image: '/Teyro Creator Onbarding flow/CF_ST10_card8.png',
    description: 'Data-driven insights help you improve outcomes and make better decisions.',
    details: [
      'Revenue, retention, and churn dashboards',
      'Content engagement heatmaps',
      'Exportable PDF performance reports for stakeholders'
    ]
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

export default function StepTenPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<typeof CARDS_DATA[0] | null>(null);

  const handleContinue = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/creator/onboarding/11');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto min-h-[calc(100vh-88px)]">
      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-0 pt-0 px-6 lg:pt-0 lg:px-[32px]">
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full max-w-[1600px] mx-auto h-full max-h-[calc(100vh-180px)]">
          {/* ──── LEFT PANEL ──── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full lg:w-[35%] shrink-0 flex flex-col lg:-ml-[32px] h-full"
          >
            <div className="lg:ml-[32px]">
              <h1 className="font-extrabold tracking-tight text-gray-900 text-[28px] lg:text-[36px] leading-[1.15] mb-4">
                Here&apos;s how Teyro
                <br className="hidden sm:block" />
                <span className="text-violet-700">works for you.</span>
              </h1>

              {/* Decorative Line */}
              <div className="w-[50px] h-[2px] bg-violet-700 rounded-full mb-4" />

              {/* Description */}
              <p className="text-[15px] lg:text-[16px] text-slate-600 mb-6 leading-relaxed max-w-[420px]">
                Teyro gives you the tools, intelligence and community to create learning experiences that actually work.
              </p>
            </div>

            {/* Illustration */}
            <div className="relative w-full flex-1 min-h-[350px] lg:min-h-[400px] flex items-center justify-center lg:ml-[32px] z-0">
              <Image
                src="/Teyro Creator Onbarding flow/CF_ST10_side_img.png"
                alt="Teyro Platform Features"
                fill
                className="object-contain object-center scale-[1.15] lg:scale-[1.25]"
                style={{
                  maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 90%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 90%)',
                }}
                priority
              />
            </div>

            {/* Bottom Left Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto lg:ml-[32px] pt-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative shadow-sm bg-slate-200">
                       <img src={`https://i.pravatar.cc/150?u=${i + 42}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-[14px] lg:text-[15px] text-slate-600 leading-relaxed max-w-[320px]">
                Creators love how Teyro brings everything together in <span className="font-bold text-violet-700">one powerful platform.</span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-[65%] flex flex-col mt-4 lg:mt-0 relative h-full overflow-y-auto overflow-x-hidden pb-4 custom-scrollbar lg:pr-4"
          >
            <div className="mb-4">
              <h2 className="text-[20px] lg:text-[22px] font-bold text-slate-900 mb-1">
                Powerful features. Better outcomes.
              </h2>
              <p className="text-[14px] text-slate-500">
                Click on each card to see how it works.
              </p>
            </div>

            {/* Grid of Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4"
            >
              {CARDS_DATA.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  onClick={() => setSelectedFeature(card)}
                  className={`flex flex-col w-full rounded-xl overflow-hidden cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 ${card.cardBg}`}
                  style={{
                    boxShadow: '0 2px 12px -2px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-2 mb-3 pt-3 px-3 lg:pt-4 lg:px-4">
                    <div className={`w-5 h-5 lg:w-6 lg:h-6 shrink-0 rounded-full flex items-center justify-center text-white text-[11px] lg:text-[12px] font-bold ${card.color}`}>
                      {card.number}
                    </div>
                    <h3 className="font-bold text-[13px] lg:text-[14px] leading-tight text-slate-900 mt-0.5 whitespace-pre-line">
                      {card.title}
                    </h3>
                  </div>
                  
                  {/* Card Image */}
                  <div className="relative w-full h-[100px] lg:h-[120px]">
                    <Image
                      src={card.image}
                      alt={card.title.replace('\n', ' ')}
                      fill
                      className="object-cover object-center"
                      style={{
                        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                      }}
                    />
                  </div>
                  
                  {/* Card Footer */}
                  <div className="mt-auto flex flex-col gap-2 pb-3 px-3 lg:pb-4 lg:px-4 pt-3">
                    <p className="text-[11px] lg:text-[12px] font-bold text-slate-600 leading-snug min-h-[48px]">
                      {card.description}
                    </p>
                    <button className="text-[12px] lg:text-[13px] font-bold text-violet-700 flex items-center gap-1 hover:text-violet-800 self-start transition-colors">
                      See how it works <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative w-full rounded-2xl overflow-hidden mt-auto shrink-0 bg-[#F3EFFE] border border-slate-100 flex items-center h-[90px] lg:h-[110px]"
              style={{
                boxShadow: '0 4px 20px -4px rgba(124, 58, 237, 0.08)',
              }}
            >
              <div className="flex-1 flex flex-col z-10 px-4 lg:px-8">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-violet-600 bg-white p-1 rounded-md shadow-sm">
                    <Rocket size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-[16px] lg:text-[18px] text-slate-900">All in one creator OS</h3>
                </div>
                <p className="text-[12px] lg:text-[13px] text-slate-600 font-medium">
                  Everything you need to teach, engage and grow—powered by AI.
                </p>
              </div>

              <div className="relative w-[220px] sm:w-[300px] lg:w-[450px] h-full shrink-0 z-0">
                <Image
                  src="/Teyro Creator Onbarding flow/CF_ST10_bottom_img_short.png"
                  alt="All in one creator OS"
                  fill
                  className="object-cover object-center"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between p-6 lg:p-[24px_32px] border-t border-slate-200 shrink-0 bg-white gap-4 sm:gap-0 mt-auto sticky bottom-0 z-50">
        {/* Back */}
        <button
          onClick={() => router.push('/creator/onboarding/9')}
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
          disabled={isLoading}
          className={`flex items-center justify-center gap-[10px] w-full sm:w-[180px] h-[56px] rounded-[14px] text-white text-[16.5px] font-semibold border-none transition-all duration-200 ${
            isLoading
              ? 'bg-violet-300 cursor-not-allowed'
              : 'bg-violet-600 cursor-pointer shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:bg-violet-700 hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] hover:-translate-y-[1px]'
          }`}
        >
          {isLoading ? 'Loading...' : 'Continue'}
          {!isLoading && <ArrowRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
      {/* ═══ FEATURE MODAL ═══ */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
            >
              {/* Image Header area */}
              <div className={`relative w-full h-[180px] ${selectedFeature.cardBg} flex items-center justify-center p-6`}>
                <Image
                  src={selectedFeature.image}
                  alt={selectedFeature.title.replace('\n', ' ')}
                  fill
                  className="object-cover object-center"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)',
                  }}
                />
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/50 hover:bg-white text-slate-700 rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white text-[14px] font-bold ${selectedFeature.color}`}>
                    {selectedFeature.number}
                  </div>
                  <h3 className="font-bold text-[22px] leading-tight text-slate-900 whitespace-pre-line">
                    {selectedFeature.title.replace('\n', ' ')}
                  </h3>
                </div>

                <p className="text-[15px] text-slate-600 leading-relaxed mb-2">
                  {selectedFeature.description}
                </p>

                <div className="flex flex-col gap-3">
                  <h4 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Deep Dive</h4>
                  <ul className="flex flex-col gap-2.5">
                    {selectedFeature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-slate-600">
                        <CheckCircle2 size={18} className="text-violet-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedFeature(null)}
                  className="mt-4 w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
