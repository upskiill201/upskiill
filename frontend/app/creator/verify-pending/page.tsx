'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';

function VerifyPendingContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    setEmail(emailParam);
  }, [emailParam]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const maskEmail = (str: string) => {
    if (!str || !str.includes('@')) return str;
    const [name, domain] = str.split('@');
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name.substring(0, 2)}***${name.substring(name.length - 1)}@${domain}`;
  };

  const handleResend = async () => {
    if (countdown > 0 || !email) return;
    
    setResending(true);
    setResendStatus('idle');
    
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (!res.ok) throw new Error('Failed to resend');
      
      setResendStatus('success');
      setCountdown(60); // 60 seconds cooldown
    } catch (err) {
      setResendStatus('error');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
        
        {/* Top decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
        
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          We've sent a verification link to <br/>
          <strong className="text-gray-900 font-semibold">{maskEmail(email)}</strong>
        </p>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm text-gray-600 text-left flex gap-3">
          <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            The link will expire in 24 hours. If you don't see it, be sure to check your spam folder.
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-center flex items-center gap-2"
            onClick={handleResend}
            disabled={resending || countdown > 0 || !email}
          >
            {resending ? (
              <span className="flex items-center gap-2">Sending...</span>
            ) : countdown > 0 ? (
              <span className="flex items-center gap-2">Resend in {countdown}s</span>
            ) : (
              <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Resend verification email</span>
            )}
          </Button>

          {resendStatus === 'success' && (
            <p className="text-sm text-green-600 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Email resent successfully!
            </p>
          )}

          {resendStatus === 'error' && (
            <p className="text-sm text-red-600 flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" /> Failed to resend. Please try again later.
            </p>
          )}
          
          <div className="pt-4 border-t border-gray-100">
            <Link 
              href="/creator/onboarding/15" 
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Wrong email? Click here to fix it
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <VerifyPendingContent />
    </Suspense>
  );
}
