'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MascotBackground } from '@/components/onboarding/MascotBackground';

export default function StudentForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://upskiill-backend.onrender.com';
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(),
          role: 'STUDENT'
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Something went wrong. Please try again.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        position: 'relative',
        backgroundColor: '#f8f9ff',
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(79,70,229,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(1,114,253,0.07) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#fff',
          borderRadius: '24px',
          padding: '40px 36px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}
      >
        {/* Back Link */}
        <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
          <Link
            href="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#4f46e5')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        {/* Tey mascot */}
        <div
          style={{
            margin: '20px auto 20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(79,70,229,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/User onbarding Assets/Step_7_tey_verified_state.webp"
            alt="Tey"
            width={100}
            height={100}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            priority
          />
        </div>

        {!success ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <h1
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '0 0 8px',
                  letterSpacing: '-0.02em',
                }}
              >
                Forgot your password?
              </h1>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Enter your email address and Tey will send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', color: '#94a3b8' }} />
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      height: '48px',
                      paddingLeft: '44px',
                      paddingRight: '16px',
                      borderRadius: '10px',
                      border: '1.5px solid #e2e8f0',
                      outline: 'none',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      color: '#0f172a',
                      backgroundColor: '#fff',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      backgroundColor: 'rgba(239, 68, 68, 0.06)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                    }}
                  >
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                style={{
                  height: '48px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#4f46e5',
                  color: '#fff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s, transform 0.1s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.opacity = '1';
                }}
              >
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: '10px 0' }}
          >
            <h1
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}
            >
              Check your email! ✉️
            </h1>
            <p
              style={{
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: 1.6,
                margin: '0 0 24px',
              }}
            >
              Tey has sent a password reset link to <strong>{email}</strong>.
              Follow the instructions in the email to get back in.
            </p>
            <Link
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                padding: '0 24px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            >
              Return to Login
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
