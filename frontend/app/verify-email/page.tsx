'use client';

import React, { useState, Suspense } from 'react';
import { MailCheck, ShieldCheck, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';

/**
 * Email magic-link landing page.
 *
 * The verification link in the welcome email points here (APP origin) — never
 * at the API origin, where a session cookie would be set for the wrong domain.
 * The token is exchanged through the proxied /api route so the httpOnly
 * cookie lands first-party.
 *
 * Deliberately does NOT verify on mount: email scanners prefetch links, and
 * an auto-verify would consume the token before the human clicks. Verification
 * happens only on an explicit user action (POST).
 */
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!token || verifying) return;

    setVerifying(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'This verification link is invalid or has expired.');
      }

      // Server decides where to send them based on their real role:
      // creators continue onboarding, students go to their dashboard.
      const role = data?.user?.role;
      window.location.href = role === 'INSTRUCTOR' ? '/creator/onboarding/16' : '/dashboard';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setVerifying(false);
    }
  };

  if (!token) {
    return (
      <VerifyCard>
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Missing verification token</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          This link looks incomplete. Please open the verification email again and tap the button inside it.
        </p>
        <FallbackLink />
      </VerifyCard>
    );
  }

  return (
    <VerifyCard>
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <MailCheck className="w-8 h-8 text-blue-600" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">Confirm your email</h1>

      <p className="text-gray-600 mb-8 leading-relaxed">
        One tap and your Teyro account is officially yours — streaks, XP, and all.
      </p>

      {error && (
        <p className="mb-5 text-sm text-red-600 flex items-center justify-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      <Button
        onClick={handleConfirm}
        disabled={verifying}
        className="w-full justify-center h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
      >
        {verifying ? (
          <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</span>
        ) : (
          <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Verify my account</span>
        )}
      </Button>

      <div className="mt-8">
        <FallbackLink />
      </div>
    </VerifyCard>
  );
}

function VerifyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
        {children}
      </div>
    </div>
  );
}

function FallbackLink() {
  return (
    <>
      <p className="text-sm text-gray-500 mb-3">Link expired or already used?</p>
      <a
        href="/creator/verify-pending"
        className="text-sm text-gray-700 hover:text-gray-900 font-semibold inline-flex items-center justify-center gap-1 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Enter your 6-digit code instead
      </a>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
