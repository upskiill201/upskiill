import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  userName: string;
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName, onNext }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Column - Content */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 justify-center relative">
        {/* Logo */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:left-24">
          <Image
            src="/teyro-logo-blue.png"
            alt="Upskiill Logo"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </div>

        <div className="max-w-md mx-auto w-full mt-16 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Welcome, {userName}!
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Let's get your creator store set up. We'll guide you through a few quick steps to personalize your dashboard and get you ready to launch.
          </p>

          <button
            onClick={onNext}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0052FF] hover:bg-[#0043D1] text-white px-8 h-[48px] rounded-[10px] text-lg font-medium transition-colors"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Column - Image Mockup */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gray-50 items-center justify-center p-8 lg:p-16 border-l border-gray-100">
        <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <Image
            src="/creator-onboarding/dashboard-mockup.png"
            alt="Dashboard Preview"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  );
};
