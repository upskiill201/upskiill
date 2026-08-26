'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from '@/lib/firebase';
import { getOnboardingData, saveOnboardingStep } from '@/lib/onboarding';
import { setCachedUser } from '@/lib/user-cache';
import posthog from 'posthog-js';

interface Step15ContentProps {
  formData: {
    fullName: string;
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  authError?: string;
  showLoginLink?: boolean;
  onGoogleSuccess?: (name: string, email: string) => void;
  onSubmit?: () => void;
}

export default function Step15Content({
  formData,
  onChange,
  authError,
  showLoginLink,
  onGoogleSuccess,
  onSubmit,
}: Step15ContentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const displayError = authError || localError;

  const handleGoogleSignup = async () => {
    if (isGoogleLoading) return; // double-click guard — two clicks used to run two auth flows
    try {
      setLocalError('');
      setIsGoogleLoading(true);
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();
      const onboardingData = getOnboardingData();

      const res = await fetch('/api/auth/firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          idToken,
          role: 'INSTRUCTOR',
          draftId: onboardingData.draftId,
          onboarding: onboardingData,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }

      if (data) {
        setCachedUser(data.user || data);
      }

      const displayName = result?.user?.displayName || data?.user?.fullName || data?.fullName || 'Creator';
      const userEmail = result?.user?.email || data?.user?.email || data?.email || '';

      onChange('fullName', displayName);
      onChange('email', userEmail);
      saveOnboardingStep(15, { accountCreated: true, method: 'google' });
      posthog.capture('creator_account_created', { email: userEmail, method: 'google' });

      if (onGoogleSuccess) {
        onGoogleSuccess(displayName, userEmail);
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Google authentication failed';
      setLocalError(msg);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-[1560px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-2 lg:py-6">
      
      {/* ──── LEFT PANEL (Text & Visual Entrance) ──── */}
      <div className="w-full lg:w-[38%] shrink-0 flex flex-col justify-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-3">
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-[13px] font-extrabold text-amber-700">Founding Creator Tier #2026</span>
          </div>

          <h1 className="font-extrabold tracking-tight text-gray-900 text-[24px] sm:text-[34px] lg:text-[44px] xl:text-[48px] leading-[1.14]">
            Claim your
            <br className="hidden sm:block" />
            <span className="text-blue-600"> creator account.</span>
          </h1>

          <div className="w-[48px] h-[3.5px] bg-blue-600 rounded-full my-2.5 sm:my-5" />

          <p className="text-[13px] sm:text-[15px] xl:text-[17.5px] text-gray-600 leading-relaxed max-w-[480px]">
            Save your customized creator preferences and unlock your complete course building studio.
          </p>
        </div>

        {/* Large Step 15 Entrance Illustration on Desktop */}
        <div className="hidden lg:block mt-8 relative w-full max-w-[460px]">
          <div className="relative w-full h-[220px] xl:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-200/80 bg-white">
            <Image 
              src="/Teyro Creator Onbarding flow/CF_ST15_side_img_entrance.png"
              alt="Creator Studio Entrance"
              fill
              priority
              className="object-contain p-3"
            />
          </div>
        </div>
      </div>

      {/* ──── RIGHT PANEL (Creator Registration Form) ──── */}
      <div className="w-full lg:w-[62%] flex flex-col justify-center">
        <div className="w-full max-w-[540px] bg-white rounded-3xl p-5 sm:p-7 border-2 border-gray-200 border-b-[4.5px] border-b-gray-300 shadow-sm">
          
          {/* Google Quick Sign-Up */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className="w-full h-[48px] rounded-2xl border-2 border-gray-200 border-b-[4px] border-b-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3 font-extrabold text-[14.5px] text-gray-800 transition-all active:translate-y-[1px] cursor-pointer disabled:opacity-50"
          >
            <FcGoogle size={20} />
            <span>{isGoogleLoading ? 'Connecting with Google...' : 'Continue with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[12px] font-bold text-gray-400 uppercase tracking-wider absolute">
              or with email
            </span>
          </div>

          {displayError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-semibold">
              {displayError}
            </div>
          )}

          {showLoginLink && (
            <a
              href="/creator/login"
              className="mb-4 flex items-center justify-center gap-1 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-[13px] font-bold hover:bg-blue-100 transition-colors"
            >
              This email already has a Teyro account — log in instead
            </a>
          )}

          <div className="flex flex-col gap-3" onKeyDown={handleKeyDown}>
            {/* Full Name */}
            <div>
              <label className="block text-[13px] font-extrabold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User size={18} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => {
                    setLocalError('');
                    onChange('fullName', e.target.value);
                  }}
                  className="w-full h-[48px] pl-10 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none text-[14.5px] font-medium text-gray-900 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-extrabold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setLocalError('');
                    onChange('email', e.target.value);
                  }}
                  className="w-full h-[48px] pl-10 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none text-[14.5px] font-medium text-gray-900 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-extrabold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-3.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => {
                    setLocalError('');
                    onChange('password', e.target.value);
                  }}
                  className="w-full h-[48px] pl-10 pr-10 rounded-xl border-2 border-gray-200 focus:border-blue-600 outline-none text-[14.5px] font-medium text-gray-900 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
