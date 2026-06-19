'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
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
