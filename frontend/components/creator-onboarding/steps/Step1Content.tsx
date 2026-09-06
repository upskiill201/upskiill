'use client';

import React from 'react';
import Image from 'next/image';
import { Target, Users, TrendingUp, DollarSign, Clock, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { leftPanelVariants, rightPanelVariants } from '@/lib/animations';
import OnboardingRecoveryBanner from '@/components/features/CreatorOnboarding/OnboardingRecoveryBanner';
import DuolingoButton3D from '../DuolingoButton3D';

interface Step1ContentProps {
  onNext: () => void;
  isLoading?: boolean;
}

export default function Step1Content({ onNext, isLoading }: Step1ContentProps) {
  return (
    <div className="flex flex-col w-full max-w-[1761px] mx-auto h-full flex-grow justify-center px-3.5 sm:px-6 md:px-12 xl:px-24 overflow-y-auto sm:overflow-visible py-2 sm:py-0">
      {/* Progress Recovery Banner */}
      <div className="w-full relative z-20 mb-2 sm:mb-4">
        <OnboardingRecoveryBanner />
      </div>

      {/* Blue Background Shapes — RIGHT SIDE ONLY */}
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{
          top: '-60px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: '#DAEEFF',
          zIndex: 0,
        }}
      />
      <div
        className="hidden lg:block absolute pointer-events-none"
        style={{
          bottom: '-40px',
          right: '60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: '#C8E6FF',
          zIndex: 0,
        }}
      />

      {/* Main Flex Layout: 38% Text / 62% Image */}
      <div className="flex flex-col lg:flex-row items-center w-full h-full relative z-10 gap-4 sm:gap-6 lg:gap-8 py-2 sm:py-4">
        
        {/* ──── LEFT PANEL (Text) ──── */}
        <motion.div 
          variants={leftPanelVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[38%] flex flex-col items-start text-left shrink-0"
        >
          <p className="text-[13.5px] sm:text-[17px] lg:text-[19px] font-bold text-gray-800 mb-1.5 sm:mb-3 flex items-center">
            Welcome to Teyro, <span className="text-blue-600 ml-1.5 font-extrabold">Creator!</span> <Sparkles className="inline-block ml-1.5 text-yellow-400 fill-yellow-400" size={16} />
          </p>
          
          <h1 className="text-[26px] xs:text-[30px] sm:text-[42px] xl:text-[60px] font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-2.5 sm:mb-4">
            Teach online <br className="hidden sm:block"/>
            <span className="text-blue-600">differently.</span>
          </h1>
          
          <p className="text-[12.5px] sm:text-[15px] xl:text-[17.5px] text-gray-600 mb-3.5 sm:mb-6 leading-relaxed max-w-[480px]">
            Teyro helps creators build guided, AI-powered learning experiences that keep learners <span className="font-bold text-blue-600">consistent, engaged</span> and <span className="font-bold text-blue-600">successful.</span>
          </p>

          {/* Value Props Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3.5 sm:mb-6 w-full max-w-[540px]">
            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-blue-50/60 sm:bg-transparent border border-blue-100/50 sm:border-none">
              <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] bg-white rounded-full flex items-center justify-center shadow-xs text-blue-600 mb-1 border-[1.5px] border-blue-100">
                <Target size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] sm:text-[12px] font-bold text-gray-800 leading-tight">Higher completion<br/>rates</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-blue-50/60 sm:bg-transparent border border-blue-100/50 sm:border-none">
              <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] bg-white rounded-full flex items-center justify-center shadow-xs text-blue-600 mb-1 border-[1.5px] border-blue-100">
                <Users size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] sm:text-[12px] font-bold text-gray-800 leading-tight">Stronger learner<br/>engagement</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-blue-50/60 sm:bg-transparent border border-blue-100/50 sm:border-none">
              <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] bg-white rounded-full flex items-center justify-center shadow-xs text-blue-600 mb-1 border-[1.5px] border-blue-100">
                <TrendingUp size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] sm:text-[12px] font-bold text-gray-800 leading-tight">Grow your<br/>creator brand</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-blue-50/60 sm:bg-transparent border border-blue-100/50 sm:border-none">
              <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] bg-white rounded-full flex items-center justify-center shadow-xs text-blue-600 mb-1 border-[1.5px] border-blue-100">
                <DollarSign size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[10.5px] sm:text-[12px] font-bold text-gray-800 leading-tight">More impact,<br/>more income</span>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 flex flex-col items-start gap-2 mb-3.5 sm:mb-6">
            <DuolingoButton3D
              onClick={onNext}
              isLoading={isLoading}
              className="w-full sm:w-[240px] h-[48px] px-6"
            >
              Continue
            </DuolingoButton3D>
            <div className="flex items-center text-[11.5px] sm:text-[12.5px] text-gray-500 font-semibold ml-1">
              <Clock size={13} className="mr-1.5 text-gray-400" />
              Takes about 3 minutes
            </div>
          </div>

          {/* Social Proof */}
          <div className="hidden sm:flex items-center gap-3 pt-1">
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/100?img=11" alt="Creator" className="w-[32px] h-[32px] rounded-full border-2 border-white object-cover shadow-xs relative z-30" />
              <img src="https://i.pravatar.cc/100?img=47" alt="Creator" className="w-[32px] h-[32px] rounded-full border-2 border-white object-cover shadow-xs relative z-20" />
              <img src="https://i.pravatar.cc/100?img=12" alt="Creator" className="w-[32px] h-[32px] rounded-full border-2 border-white object-cover shadow-xs relative z-10" />
              <div className="w-[32px] h-[32px] rounded-full border-2 border-white bg-blue-600 text-white text-[9.5px] font-extrabold flex items-center justify-center shadow-xs relative z-40">
                12K+
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-[11.5px] font-semibold text-gray-500">
                Join 12,000+ creators building the future of learning
              </span>
            </div>
          </div>
          
        </motion.div>

        {/* Right Image Column (62%) */}
        <motion.div 
          variants={rightPanelVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[62%] mt-1 lg:mt-0 flex justify-center lg:justify-end items-center relative"
        >
          <div className="relative w-full max-w-[540px] lg:max-w-none rounded-2xl overflow-hidden shadow-[0_12px_32px_-8px_rgba(37,99,235,0.18)] ring-1 ring-gray-900/5 bg-white">
            <Image 
              src="/creator-welcome-dashboard.webp"
              alt="Teyro Creator Dashboard"
              width={2200}
              height={1650}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
