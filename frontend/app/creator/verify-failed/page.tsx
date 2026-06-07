'use client';

import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function VerifyFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1EDFC] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
        
        {/* Top decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
        
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          The verification link you clicked is invalid or has expired. Links are only valid for 24 hours.
        </p>
        
        <div className="space-y-4">
          <Button 
            variant="primary" 
            className="w-full justify-center"
            onClick={() => router.push('/creator/login')}
          >
            Go to Login
          </Button>
          
          <div className="pt-4 border-t border-gray-100">
            <Link 
              href="/creator/onboarding/15" 
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
