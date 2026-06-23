'use client';

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate-token?token=${token}`);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
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
          <button
            type="button"
            className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
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
          <button
            type="button"
            className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors z-10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
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
