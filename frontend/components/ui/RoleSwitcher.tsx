'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Clapperboard, ChevronDown, Loader2 } from 'lucide-react';

/**
 * RoleSwitcher — persistent nav toggle for dual-role users.
 *
 * Shows the active role pill in the sidebar footer.
 * On click, expands a mini-picker to switch to the other role.
 *
 * Props:
 *  activeRole       — 'STUDENT' | 'INSTRUCTOR' (current JWT role)
 *  hasStudentAccess — user has a student profile
 *  hasCreatorAccess — user has a creator profile
 *  collapsed        — whether the sidebar is in icon-only collapsed mode
 */

interface RoleSwitcherProps {
  activeRole: 'STUDENT' | 'INSTRUCTOR';
  hasStudentAccess: boolean;
  hasCreatorAccess: boolean;
  collapsed?: boolean;
}

const ROLE_META = {
  STUDENT: {
    label: 'Learner',
    icon: <GraduationCap size={16} />,
    color: '#4f46e5',
    bg: 'rgba(79,70,229,0.1)',
    href: '/dashboard',
  },
  INSTRUCTOR: {
    label: 'Creator',
    icon: <Clapperboard size={16} />,
    color: '#0172fd',
    bg: 'rgba(1,114,253,0.1)',
    href: '/creator',
  },
} as const;

export function RoleSwitcher({
  activeRole,
  hasStudentAccess,
  hasCreatorAccess,
  collapsed = false,
}: RoleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  // Only show if the user genuinely has both profiles
  if (!hasStudentAccess || !hasCreatorAccess) return null;

  const active = ROLE_META[activeRole];
  const targetRole = activeRole === 'STUDENT' ? 'INSTRUCTOR' : 'STUDENT';
  const target = ROLE_META[targetRole];

  const handleSwitch = async () => {
    setSwitching(true);
    setOpen(false);
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: targetRole }),
      });
      if (res.ok) {
        window.location.href = target.href;
      }
    } catch {
      setSwitching(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes _spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .role-switcher-spin {
          animation: _spin 0.8s linear infinite;
        }
      `}} />

      {/* Current role pill */}
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={switching}
        title={collapsed ? `Active: ${active.label}` : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          padding: collapsed ? '8px' : '8px 12px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: active.bg,
          color: active.color,
          fontFamily: 'inherit',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: switching ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.15s',
          textAlign: 'left',
          opacity: switching ? 0.7 : 1,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {switching ? <Loader2 size={15} className="role-switcher-spin" /> : active.icon}
        </span>
        {!collapsed && (
          <>
            <span style={{ flex: 1 }}>{active.label} mode</span>
            <ChevronDown
              size={13}
              style={{
                transition: 'transform 0.2s',
                flexShrink: 0,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </>
        )}
      </button>

      {/* Switch option popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '10px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 999,
            }}
          >
            <p
              style={{
                fontSize: '0.7rem',
                color: '#94a3b8',
                margin: '0 0 6px 2px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Switch to
            </p>
            <button
              onClick={handleSwitch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: target.bg,
                color: target.color,
                fontFamily: 'inherit',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>{target.icon}</span>
              <span>{target.label} mode</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
