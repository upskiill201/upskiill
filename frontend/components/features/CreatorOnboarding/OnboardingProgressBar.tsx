'use client';

import React from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingProgressBar() {
  const segment = useSelectedLayoutSegment();
  const currentStep = segment ? parseInt(segment, 10) : 1;
  const totalSteps = 15;

  return (
    <div className="w-full flex flex-col items-center bg-transparent">
      {/* Top Header Bar */}
      <div 
        className="w-full flex items-center justify-between z-20 relative max-w-[1761px] mx-auto px-6 md:px-[56px]"
        style={{ height: '88px' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/teyro-logo-blue.png" 
            alt="Teyro" 
            width={160} 
            height={44} 
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Progress Bar (Desktop only) */}
        <div className="hidden md:flex flex-col items-center">
          <div className="flex items-center space-x-2">
            {[...Array(totalSteps)].map((_, i) => {
              const step = i + 1;
              const isActive = step === currentStep;
              const isPast = step < currentStep;

              return (
                <React.Fragment key={step}>
                  <div 
                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[14px] font-semibold transition-all
                      ${isActive 
                        ? 'bg-[#2563EB] text-white' 
                        : isPast 
                          ? 'bg-[#2563EB] text-white' 
                          : 'bg-transparent border border-gray-300 text-gray-500'}`}
                  >
                    {isPast ? (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4 8L11 1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < totalSteps && (
                    <div className={`w-[8px] h-[2px] ${isPast ? 'bg-[#2563EB]' : 'bg-gray-300'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div style={{ fontSize: '14px', color: '#64748B', marginTop: '12px' }}>
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Right Badge */}
        <div className="flex items-center space-x-3 text-gray-900">
          <div className="bg-blue-50 p-2.5 rounded-full">
            <ShieldCheck size={22} className="text-blue-700" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block text-sm font-bold leading-tight">
            Secure & trusted<br/><span className="font-medium text-gray-600">by creators worldwide</span>
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden w-full px-6 pb-4">
         <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
         </div>
         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
         </div>
      </div>
    </div>
  );
}