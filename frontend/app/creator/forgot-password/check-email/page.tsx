'use client';

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
