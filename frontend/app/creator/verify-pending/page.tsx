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

  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifying) return; // Enter-spam guard
    if (code.trim().length !== 6) {
      setVerifyError('Please enter a 6-digit code');
      return;
    }
    setVerifying(true);
    setVerifyError('');

    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          code: code.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid verification code');
      }

      // Success — redirect to Step 16 onboarding congratulations
      window.location.href = '/creator/onboarding/16';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
      setVerifyError(msg);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
        
        {/* Top decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
        
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          We've sent a verification code & link to <br/>
          <strong className="text-gray-900 font-semibold">{maskEmail(email)}</strong>
        </p>

        {/* Code Input Form */}
        <form onSubmit={handleVerifyCode} className="mb-6">
          <div className="mb-3">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => {
                setVerifyError('');
                setCode(e.target.value.replace(/\D/g, ''));
              }}
              className="w-full h-12 text-center text-xl tracking-[0.3em] font-bold border-2 border-gray-200 rounded-xl focus:border-blue-600 outline-none transition-colors"
            />
          </div>

          {verifyError && (
            <p className="text-sm text-red-600 mb-3 flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" /> {verifyError}
            </p>
          )}

          <Button
            type="submit"
            className="w-full justify-center h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
            disabled={verifying || code.trim().length !== 6}
          >
            {verifying ? 'Verifying...' : 'Verify Code & Enter Studio'}
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider absolute">
            or click the link in your email
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 text-left flex gap-3">
          <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            The verification link and code will expire in 24 hours. Check your spam folder if you don't see it.
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
