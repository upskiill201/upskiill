'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Clapperboard, ArrowRight, Loader2 } from 'lucide-react';

/**
 * /role-select
 *
 * Post-login role selector — shown when a user has both
 * hasStudentAccess and hasCreatorAccess set.
 *
 * The role they pick here triggers POST /api/auth/switch-role,
 * which issues a new JWT cookie with the correct role claim,
 * then redirects to the matching dashboard.
 */
export default function RoleSelectPage() {
  const [selected, setSelected] = useState<'STUDENT' | 'INSTRUCTOR' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch the user's name to personalise the greeting
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d?.fullName) setUserName(d.fullName.split(' ')[0]);
      })
      .catch(() => {});
  }, []);

  const handleContinue = async (role: 'STUDENT' | 'INSTRUCTOR') => {
    setSelected(role);
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Role switch failed');
      }

      // Route to the matching dashboard
      window.location.href = role === 'INSTRUCTOR' ? '/creator' : '/dashboard';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      setLoading(false);
      setSelected(null);
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes role-select-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .role-card-spin {
          animation: role-select-spin 0.8s linear infinite;
        }
        @media (max-width: 480px) {
          .role-options-container {
            flex-direction: column !important;
          }
        }
      `}} />

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
          maxWidth: '520px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}
      >
        {/* Tey mascot */}
        <div
          style={{
            margin: '0 auto 20px',
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

        {/* Greeting */}
        <div style={{ marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
            }}
          >
            {userName ? `Hey ${userName}! 👋` : 'Welcome back! 👋'}
          </h1>
          <p
            style={{
              fontSize: '0.95rem',
              color: '#64748b',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            You have both a learner and a creator account.<br />
            Which mode are you in today?
          </p>
        </div>

        {/* Role cards */}
        <div
          className="role-options-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <RoleCard
            role="STUDENT"
            icon={<GraduationCap size={32} />}
            label="Continue as Learner"
            description="Access your courses, streaks, and learning path."
            accentColor="#4f46e5"
            accentLight="rgba(79,70,229,0.08)"
            isSelected={selected === 'STUDENT'}
            isLoading={loading && selected === 'STUDENT'}
            disabled={loading}
            onClick={() => handleContinue('STUDENT')}
          />
          <RoleCard
            role="INSTRUCTOR"
            icon={<Clapperboard size={32} />}
            label="Continue as Creator"
            description="Manage your courses, analytics, and earnings."
            accentColor="#0172fd"
            accentLight="rgba(1,114,253,0.08)"
            isSelected={selected === 'INSTRUCTOR'}
            isLoading={loading && selected === 'INSTRUCTOR'}
            disabled={loading}
            onClick={() => handleContinue('INSTRUCTOR')}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                color: '#ef4444',
                fontSize: '0.875rem',
                margin: '0 0 12px',
              }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
          You can switch between modes any time from the sidebar.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Role Card ────────────────────────────────────────────────────────────────

interface RoleCardProps {
  role: 'STUDENT' | 'INSTRUCTOR';
  icon: React.ReactNode;
  label: string;
  description: string;
  accentColor: string;
  accentLight: string;
  isSelected: boolean;
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

function RoleCard({
  icon,
  label,
  description,
  accentColor,
  accentLight,
  isSelected,
  isLoading,
  disabled,
  onClick,
}: RoleCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 16px',
        borderRadius: '16px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        fontFamily: 'inherit',
        position: 'relative',
        border: isSelected ? `2px solid ${accentColor}` : '2px solid #e2e8f0',
        backgroundColor: isSelected ? accentLight : '#fafafa',
        opacity: disabled ? 0.8 : 1,
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: accentColor,
          backgroundColor: accentLight,
        }}
      >
        {isLoading ? <Loader2 size={28} className="role-card-spin" /> : icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4 }}>{description}</span>
      </div>
      {!isLoading && (
        <ArrowRight
          size={18}
          style={{
            color: accentColor,
            opacity: 0.6,
            marginTop: 'auto',
          }}
        />
      )}
    </motion.button>
  );
}
