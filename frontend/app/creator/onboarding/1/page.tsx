'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Target, Users, TrendingUp, DollarSign, ArrowRight, Clock, Star, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function WelcomeStep() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://upskiill-backend.onrender.com/creator-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.id) {
          localStorage.setItem('teyro_onboarding_draft_id', data.id);
        }
      } else {
        console.warn('Backend draft creation failed. Proceeding with local flow.');
        localStorage.setItem('teyro_onboarding_draft_id', `local_${Date.now()}`);
      }
    } catch (error) {
      console.warn('Error connecting to backend:', error);
      localStorage.setItem('teyro_onboarding_draft_id', `local_${Date.now()}`);
    } finally {
      setIsLoading(false);
      router.push('/creator/onboarding/2');
    }
  };

  return (
    <div className="w-full py-8 md:py-12 relative flex-grow flex flex-col justify-center" style={{ background: 'transparent' }}>
      
      {/* 
        Blue Background Shapes — RIGHT SIDE ONLY, matching UI design:
        1. Large circular blob upper-right (peeks behind dashboard top-right)
        2. Small circular blob bottom-right corner
      */}
      {/* Large upper-right circle */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: '#DAEEFF',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Small bottom-right circle */}
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: '#C8E6FF',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Main Flex Layout: 38% Text / 62% Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: 'relative', zIndex: 10 }} 
        className="flex flex-col lg:flex-row items-center w-full h-full px-6 md:px-12 xl:px-24"
      >
        {/* Left Content Column (38%) */}
        <div className="w-full lg:w-[38%] flex flex-col items-start text-left">
          <p className="text-[20px] font-medium text-gray-800 mb-6 flex items-center">
            Welcome to Teyro, <span className="text-blue-600 ml-1.5">Creator!</span> <Sparkles className="inline-block ml-2 text-yellow-400 fill-yellow-400" size={20} />
          </p>
          
          <h1 className="text-[52px] xl:text-[68px] font-extrabold tracking-tight text-gray-900 leading-[1.05] mb-6">
            Teach online <br className="hidden md:block"/>
            <span className="text-blue-600">differently.</span>
          </h1>
          
          <p className="text-lg xl:text-[20px] text-gray-600 mb-10 leading-relaxed max-w-[480px]">
            Teyro helps creators build guided, AI-powered learning experiences that keep learners <span className="font-semibold text-blue-600">consistent, engaged</span> and <span className="font-semibold text-blue-600">successful.</span>
          </p>

          {/* Value Props Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 w-full max-w-[540px]">
            <div className="flex flex-col items-center text-center">
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-2.5 border-[1.5px] border-blue-100">
                <Target size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-tight">Higher completion<br/>rates</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-2.5 border-[1.5px] border-blue-100">
                <Users size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-tight">Stronger learner<br/>engagement</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-2.5 border-[1.5px] border-blue-100">
                <TrendingUp size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-tight">Grow your<br/>creator brand</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-2.5 border-[1.5px] border-blue-100">
                <DollarSign size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 leading-tight">More impact,<br/>more income</span>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col items-start gap-3.5 mb-10">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-[260px] h-[50px] text-[16px] font-semibold rounded-[10px] group shadow-lg shadow-blue-600/20"
              onClick={handleContinue}
              disabled={isLoading}
              rightIcon={!isLoading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
            <div className="flex items-center text-[13px] text-gray-500 font-medium ml-1">
              <Clock size={15} className="mr-2" />
              Takes about 3 minutes
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-5">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=11" alt="Creator" className="w-[40px] h-[40px] rounded-full border-[2.5px] border-white object-cover shadow-sm relative z-30" />
              <img src="https://i.pravatar.cc/100?img=47" alt="Creator" className="w-[40px] h-[40px] rounded-full border-[2.5px] border-white object-cover shadow-sm relative z-20" />
              <img src="https://i.pravatar.cc/100?img=12" alt="Creator" className="w-[40px] h-[40px] rounded-full border-[2.5px] border-white object-cover shadow-sm relative z-10" />
              <div className="w-[40px] h-[40px] rounded-full border-[2.5px] border-white bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm relative z-40">
                12K+
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-[13px] font-medium text-gray-500">
                Join 12,000+ creators building the future of learning
              </span>
            </div>
          </div>
          
        </div>

        {/* Right Image Column (62%) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[62%] pr-6 md:pr-10 xl:pr-16 mt-12 lg:mt-0 flex justify-end items-center relative perspective-1000"
        >
          <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(37,99,235,0.3)] ring-1 ring-gray-900/5 hover:scale-[1.01] transition-transform duration-500 bg-white">
            <Image 
              src="/creator-welcome-dashboard.png"
              alt="Teyro Creator Dashboard"
              width={2200}
              height={1650}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}