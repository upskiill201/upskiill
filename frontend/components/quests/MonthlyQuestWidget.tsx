'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Target } from 'lucide-react';
import { playHaptic } from '@/lib/haptics';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import { buildMilestoneClaimScenes, type QuestMilestone } from '@/lib/monthlyQuest';
import { useMonthlyQuest } from '@/hooks/useMonthlyQuest';

/**
 * MONTHLY QUEST — compact live widget for the dashboard sidebar, in the
 * Celebration Engine's Duolingo grammar (navy panel, Baloo numerals, chest
 * nodes, 3D claim pill). Shows this month's goal-days progress with the
 * three milestone checkpoints, a claim shortcut, and deep-links into
 * /dashboard/quests.
 */
export default function MonthlyQuestWidget() {
  const { quest, loading, error } = useMonthlyQuest();
  const { celebrate } = useCelebration();
  const { refresh: refreshWallet } = useGamification();

  // Silent failure — the sidebar must never shout about an optional widget.
  if (error || (!quest && !loading)) return null;

  const claimable = quest?.milestones.find((m) => m.claimable) ?? null;

  const handleClaim = (milestone: QuestMilestone) => {
    if (!quest) return;
    playHaptic('medium');
    const scenes = buildMilestoneClaimScenes(quest, milestone);
    const last = scenes[scenes.length - 1];
    const prevOnComplete = last.onComplete;
    last.onComplete = () => {
      prevOnComplete?.();
      void refreshWallet();
    };
    celebrate(scenes);
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 900,
    fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif',
    color: '#0F172A',
    margin: 0,
    letterSpacing: '0.02em',
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 9,
    fontWeight: 800,
    color: '#FFD966',
    background: 'rgba(255,200,0,0.1)',
    border: '1px solid rgba(255,200,0,0.35)',
    borderRadius: 999,
    padding: '3px 8px',
    whiteSpace: 'nowrap',
  };

  const trackBaseStyle: React.CSSProperties = {
    position: 'relative',
    height: 11,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.1)',
    boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.35)',
  };

  const trackFillStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: `${Math.min(100, quest?.progressPct ?? 0)}%`,
    borderRadius: 999,
    background: 'linear-gradient(180deg, #FFDD55 0%, #FFC800 100%)',
    transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={headerStyle}>
        <Target size={14} className="text-[#0172FD]" />
        <h4 style={headerTitleStyle}>MONTHLY QUEST</h4>
      </div>

      <Link
        href="/dashboard/quests"
        onClick={() => playHaptic('light')}
        style={{
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(120% 90% at 50% -10%, rgba(61,90,254,0.22) 0%, rgba(16,26,46,0) 55%), #101a2e',
          borderRadius: 16,
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          textDecoration: 'none',
          boxShadow:
            '0 6px 18px rgba(16,26,46,0.3), inset 0 2px 0 rgba(255,255,255,0.06)',
        }}
      >
        {loading && !quest ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} aria-busy="true">
            <div className="animate-pulse" style={{ height: 13, width: '60%', borderRadius: 6, background: 'rgba(255,255,255,0.16)' }} />
            <div className="animate-pulse" style={{ height: 10, width: '100%', borderRadius: 999, background: 'rgba(255,255,255,0.16)' }} />
            <div className="animate-pulse" style={{ height: 10, width: '40%', borderRadius: 6, background: 'rgba(255,255,255,0.16)' }} />
          </div>
        ) : quest ? (
          <>
            {/* Title row */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 800, fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif', color: '#FFFFFF' }}>
                {quest.monthLabel.split(' ')[0]} Quest
              </span>
              <span style={chipStyle}>
                <Clock size={10} />
                {quest.daysRemaining}d left
              </span>
            </div>

            {/* Fraction */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 20,
                fontWeight: 800,
                fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif',
                color: '#FFC800',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {quest.goalDays}
              <span style={{ fontSize: 11.5, fontWeight: 700, color: '#B7C4D6' }}> / {quest.targetDays} goal days</span>
            </div>

            {/* Milestone track — chest nodes at each threshold */}
            <div style={{ ...trackBaseStyle, margin: '0 12px' }}>
              <div style={trackFillStyle} />
              {quest.milestones.map((m) => {
                const leftPct = Math.min(100, Math.round((m.requiredDays / Math.max(1, quest.targetDays)) * 100));
                return (
                  <div
                    key={m.id}
                    title={`${m.label} — ${m.requiredDays} goal-days`}
                    style={{
                      position: 'absolute',
                      left: `${leftPct}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: m.claimable ? 24 : 21,
                      height: m.claimable ? 24 : 21,
                      borderRadius: 999,
                      background: m.claimable
                        ? 'radial-gradient(circle at 32% 28%, #FFE38A 0%, #FFD54A 52%, #FFC800 100%)'
                        : '#1B2740',
                      boxShadow: m.claimable
                        ? '0 3px 0 #C98A00, inset 0 2px 0 rgba(255,255,255,0.55)'
                        : 'inset 0 2px 5px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.07)',
                      animation: m.claimable ? 'nodePulseWidget 1.6s ease-in-out infinite' : undefined,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src="/Icons/tressure-chest-locked.png"
                      alt=""
                      width={m.claimable ? 15 : 12}
                      height={m.claimable ? 15 : 12}
                      style={{
                        objectFit: 'contain',
                        filter: m.claimed
                          ? 'saturate(0.55) brightness(0.9)'
                          : m.claimable
                          ? 'drop-shadow(0 1px 1px rgba(122, 76, 0, 0.55))'
                          : 'grayscale(1) brightness(0.5)',
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Footer: status or claim shortcut */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#B7C4D6', lineHeight: 1.3 }}>
                {claimable
                  ? `${claimable.label} unlocked!`
                  : quest.status === 'FULLY_CLAIMED'
                  ? 'Monthly Champion!'
                  : `Hit ${quest.dailyGoalXp} XP today`}
              </span>
              {claimable ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClaim(claimable);
                  }}
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-celebration), var(--font-jakarta), sans-serif',
                    color: '#FFFFFF',
                    background: 'linear-gradient(180deg, #FFC800 0%, #F59E0B 100%)',
                    border: 'none',
                    borderRadius: 10,
                    padding: '6px 13px',
                    cursor: 'pointer',
                    boxShadow: '0 3px 0 #B45309',
                  }}
                >
                  CLAIM
                </button>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 9.5, fontWeight: 800, color: '#E6EDF6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  View
                  <ArrowRight size={11} strokeWidth={2.8} />
                </span>
              )}
            </div>
          </>
        ) : null}
      </Link>

      {/* Chest-node pulse keyframe for this component's inline-style node */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nodePulseWidget {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}} />
    </div>
  );
}
