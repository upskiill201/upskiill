const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app/creator');

// 1. Forgot Password Page
const forgotPasswordDir = path.join(baseDir, 'forgot-password');
fs.mkdirSync(forgotPasswordDir, { recursive: true });

const forgotPasswordCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Reusing FloatingInput style from onboarding
const FloatingInput = ({ icon: Icon, label, id, type, value, onChange, placeholder, required, autoFocus }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative flex flex-col mb-4 w-full">
      <motion.div 
        className="absolute left-10 pointer-events-none z-10 flex items-center h-full"
        initial={false}
        animate={{ 
          y: isActive ? -24 : 0, 
          scale: isActive ? 0.85 : 1,
          color: isFocused ? '#2563EB' : '#64748b'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left center' }}
      >
        <span className="bg-white px-1 font-medium">{label}</span>
      </motion.div>
      <div className="relative flex items-center w-full">
        <div className="absolute left-3 text-slate-400 z-10">
          <Icon size={18} color={isFocused ? '#2563EB' : '#94a3b8'} className="transition-colors" />
        </div>
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isActive ? placeholder : ''}
          required={required}
          autoFocus={autoFocus}
          className="w-full h-[52px] pl-10 pr-4 rounded-[12px] border-[1.5px] border-slate-200 outline-none text-[15px] text-slate-900 bg-white transition-shadow relative z-0"
          animate={{
            borderColor: isFocused ? '#3b82f6' : '#e2e8f0',
            boxShadow: isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : '0 0 0 0px rgba(59, 130, 246, 0)',
          }}
        />
      </div>
    </div>
  );
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLongWaitMsg, setShowLongWaitMsg] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowLongWaitMsg(false);

    // Show long wait message after 5 seconds due to Render cold start
    const waitTimeout = setTimeout(() => setShowLongWaitMsg(true), 5000);

    try {
      // Use full Render URL as requested by production principles
      const res = await fetch('https://upskiill-backend.onrender.com/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      clearTimeout(waitTimeout);

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Something went wrong. Please try again.');
      }

      // Always redirect to check-email regardless of result
      router.push('/creator/forgot-password/check-email');
    } catch (err: any) {
      clearTimeout(waitTimeout);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400 opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500 opacity-[0.08] blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src="/teyro-logo-blue.png" alt="Teyro Logo" width={180} height={54} style={{ width: 'auto', height: '48px' }} priority />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Forgot your password?</h1>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            Enter the email linked to your creator account and we'll send you a reset link.
          </p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3 text-[14px]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingInput 
            id="email" 
            type="email" 
            label="Email address" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e: any) => setEmail(e.target.value)} 
            icon={Mail} 
            required 
            autoFocus 
          />

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full h-[52px] bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : 'Send reset link'}
          </button>

          <AnimatePresence>
            {showLongWaitMsg && loading && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                className="text-center text-sm text-slate-500 mt-2"
              >
                This may take a moment...
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 text-center">
          <Link href="/creator/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(forgotPasswordDir, 'page.tsx'), forgotPasswordCode, 'utf8');


// 2. Check Email Page
const checkEmailDir = path.join(forgotPasswordDir, 'check-email');
fs.mkdirSync(checkEmailDir, { recursive: true });

const checkEmailCode = `'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400 opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500 opacity-[0.08] blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600" />
        
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-blue-600" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">Check your email</h1>
        
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
          If that email is linked to a Teyro creator account, you'll receive a reset link shortly. Check your spam folder if you don't see it.
        </p>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-8">
          <p className="text-sm text-slate-500 font-medium">
            The link expires in 30 minutes.
          </p>
        </div>

        <Link href="/creator/login" className="inline-flex items-center justify-center w-full h-[52px] bg-white border-[1.5px] border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors gap-2">
          <ArrowLeft size={18} /> Back to login
        </Link>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(checkEmailDir, 'page.tsx'), checkEmailCode, 'utf8');


// 3. Reset Password Page
const resetPasswordDir = path.join(baseDir, 'reset-password');
fs.mkdirSync(resetPasswordDir, { recursive: true });

const resetPasswordCode = `'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMON_PASSWORDS = ['password123', 'qwerty', '12345678', 'password', '123456789'];

function getPasswordStrength(pwd: string) {
  let score = 0;
  if (!pwd) return { score: 0, label: '', color: '#e2e8f0' };
  if (pwd.length > 5) score += 1;
  if (pwd.length > 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

  if (COMMON_PASSWORDS.includes(pwd.toLowerCase())) {
    return { score: 1, label: 'Too Common', color: '#ef4444' }; // Red
  }

  score = Math.min(4, score);
  if (score <= 1) return { score, label: 'Weak', color: '#ef4444' };      // Red
  if (score === 2) return { score, label: 'Fair', color: '#f59e0b' };     // Amber
  if (score === 3) return { score, label: 'Good', color: '#3b82f6' };     // Blue
  return { score: 4, label: 'Strong', color: '#22c55e' };                 // Green
}

const FloatingInput = ({ icon: Icon, label, id, type, value, onChange, placeholder, required, children }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative flex flex-col mb-4 w-full">
      <motion.div 
        className="absolute left-10 pointer-events-none z-10 flex items-center h-full"
        initial={false}
        animate={{ 
          y: isActive ? -24 : 0, 
          scale: isActive ? 0.85 : 1,
          color: isFocused ? '#2563EB' : '#64748b'
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left center' }}
      >
        <span className="bg-white px-1 font-medium">{label}</span>
      </motion.div>
      <div className="relative flex items-center w-full">
        <div className="absolute left-3 text-slate-400 z-10">
          <Icon size={18} color={isFocused ? '#2563EB' : '#94a3b8'} className="transition-colors" />
        </div>
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isActive ? placeholder : ''}
          required={required}
          className="w-full h-[52px] pl-10 pr-10 rounded-[12px] border-[1.5px] border-slate-200 outline-none text-[15px] text-slate-900 bg-white transition-shadow relative z-0"
          animate={{
            borderColor: isFocused ? '#3b82f6' : '#e2e8f0',
            boxShadow: isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : '0 0 0 0px rgba(59, 130, 246, 0)',
          }}
        />
        {children}
      </div>
    </div>
  );
};

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const [status, setStatus] = useState<'checking' | 'valid' | 'invalid'>('checking');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/creator/forgot-password');
      return;
    }

    const checkToken = async () => {
      try {
        const res = await fetch(\`https://upskiill-backend.onrender.com/auth/validate-token?token=\${token}\`);
        const data = await res.json();
        if (res.ok && data.valid) {
          setStatus('valid');
        } else {
          setStatus('invalid');
        }
      } catch {
        // If network fails, we'll let them try submitting the form anyway to not block them
        setStatus('valid'); 
      }
    };
    checkToken();
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const strength = getPasswordStrength(password);
    if (strength.score < 2) {
      setError('Please choose a stronger password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://upskiill-backend.onrender.com/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'token_expired' || data.error === 'token_used' || data.error === 'invalid_token') {
          setStatus('invalid');
          return;
        }
        throw new Error(data.message || 'Failed to reset password');
      }

      router.push('/creator/reset-password/success');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (status === 'checking') {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-500 text-sm font-medium">Verifying secure link...</p>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">This link has expired</h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
          Reset links are only valid for 30 minutes and can only be used once for your security.
        </p>
        <Link 
          href="/creator/forgot-password" 
          className="inline-flex items-center justify-center w-full h-[52px] bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-6">
          <Image src="/teyro-logo-blue.png" alt="Teyro Logo" width={180} height={54} style={{ width: 'auto', height: '48px' }} priority />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Set a new password</h1>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl flex items-start gap-3 text-[14px]">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="mb-2">
          <FloatingInput id="password" type={showPassword ? "text" : "password"} label="New password" placeholder="Create a secure password (min. 8 chars)" value={password} onChange={(e: any) => setPassword(e.target.value)} icon={Lock} required>
            <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </FloatingInput>
          
          <AnimatePresence>
            {password.length > 0 && (() => {
              const strength = getPasswordStrength(password);
              return (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 mb-2 overflow-hidden">
                  <div className="flex gap-1 h-1.5 w-full">
                    {[1, 2, 3, 4].map((level) => (
                      <motion.div 
                        key={level} 
                        className="flex-1 rounded-full"
                        animate={{ backgroundColor: level <= strength.score ? strength.color : '#e2e8f0' }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs font-semibold" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        <FloatingInput id="confirmPassword" type={showConfirmPassword ? "text" : "password"} label="Confirm password" placeholder="Confirm your new password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} icon={Lock} required>
          <button type="button" className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </FloatingInput>

        <button
          type="submit"
          disabled={loading || !password || !confirmPassword}
          className="w-full h-[52px] bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Resetting...</span>
            </div>
          ) : 'Reset password'}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400 opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500 opacity-[0.08] blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 relative z-10">
        <Suspense fallback={<div className="p-10 text-center"><div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(resetPasswordDir, 'page.tsx'), resetPasswordCode, 'utf8');


// 4. Reset Success Page
const successDir = path.join(resetPasswordDir, 'success');
fs.mkdirSync(successDir, { recursive: true });

const successCode = `'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResetSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/creator/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400 opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-500 opacity-[0.08] blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </motion.div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">Password updated</h1>
        
        <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
          Your password has been changed successfully. You can now log in with your new password.
        </p>

        <Link 
          href="/creator/login" 
          className="inline-flex items-center justify-center w-full h-[52px] bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors mb-4"
        >
          Go to login
        </Link>
        
        <p className="text-sm text-slate-400">
          Redirecting in {countdown}...
        </p>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(successDir, 'page.tsx'), successCode, 'utf8');

console.log('Successfully created all 4 frontend pages for Forgot Password flow');
