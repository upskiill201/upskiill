'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Play, BookOpen, LayoutDashboard } from 'lucide-react';
import Button from '../../../components/ui/Button';

export default function CheckoutSuccessPage() {
  return (
    <div style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <CheckCircle2 size={80} color="#10B981" style={{ margin: '0 auto' }} />
      </div>
      
      <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
        Success! Your order is complete.
      </h1>
      
      <p style={{ fontSize: '18px', color: '#475569', marginBottom: '40px', lineHeight: '1.6' }}>
        Congratulations! You have successfully enrolled in your new courses. 
        You can now start learning immediately from your dashboard.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Link href="/dashboard">
          <Button variant="primary" fullWidth size="lg">
            <LayoutDashboard size={20} style={{ marginRight: '8px' }} />
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/courses">
          <Button variant="outline" fullWidth size="lg">
            <BookOpen size={20} style={{ marginRight: '8px' }} />
            Browse More
          </Button>
        </Link>
      </div>

      <div style={{ marginTop: '48px', padding: '24px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
          What's next?
        </h3>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Check your email for a detailed receipt and instructions on how to access your learning portal. 
          Happy learning!
        </p>
      </div>
    </div>
  );
}
