'use client';

/**
 * TreasureChestBench — launches the real ChestScene for every reward type.
 *
 * Deliberately separate from RewardRunTestWidget so it can be switched on in
 * staging without exposing that widget's other triggers, which post real
 * rewards to the backend. This bench uses the CHEST scene's generic `claim`
 * path with a mocked resolver: it renders the exact production component and
 * animation, but calls no reward API and grants nothing.
 *
 * Visible when NEXT_PUBLIC_SHOW_CHEST_BENCH === 'true' (set it per
 * environment in Vercel), or automatically in local development.
 */

import React from 'react';
import Image from 'next/image';
import { useCelebration } from '@/context/CelebrationContext';
import { playHaptic } from '@/lib/haptics';

const REWARDS = [
  { rawType: 'COINS', amount: 50, label: '+50 Coins' },
  { rawType: 'XP', amount: 30, label: '+30 XP' },
  { rawType: 'STREAK_FREEZE', amount: 1, label: '+1 Streak Freeze' },
  { rawType: 'XP_BOOST', amount: 1, label: '+1 XP Boost' },
  { rawType: 'HEARTS', amount: 1, label: '+1 Heart' },
] as const;

function btnStyle(): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 12px',
    backgroundColor: '#FFF7ED',
    border: '2px solid #FED7AA',
    borderRadius: 12,
    color: '#B45309',
    fontWeight: 800,
    fontSize: 13,
    cursor: 'pointer',
  };
}

export default function TreasureChestBench() {
  const { celebrate } = useCelebration();

  const enabled =
    process.env.NEXT_PUBLIC_SHOW_CHEST_BENCH === 'true' ||
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
  if (!enabled) return null;

  return (
    <div
      style={{
        width: '100%',
        marginBottom: '0.75rem',
        padding: 16,
        border: '1px dashed #CBD5E1',
        borderRadius: 12,
        background: '#FFFFFF',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 900, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          🏴‍☠️ Treasure Chest (Rive) — Full Scene
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: 6 }}>
          NO REAL REWARDS
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {REWARDS.map(({ rawType, amount, label }) => (
          <button
            key={rawType}
            type="button"
            onClick={() => {
              playHaptic('medium');
              celebrate({
                kind: 'CHEST',
                source: 'test',
                claim: async () => ({ type: rawType, amount }),
              });
            }}
            style={btnStyle()}
          >
            <Image src="/Tressure box.webp" alt="Chest" width={18} height={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
