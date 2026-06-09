'use client';

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
