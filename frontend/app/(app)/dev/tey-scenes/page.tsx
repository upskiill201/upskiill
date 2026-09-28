'use client';

/**
 * Throwaway dev-only page for manually verifying Tey's Phase 1 voice work
 * across every Celebration Engine scene, including the ones with no easy
 * real-gameplay trigger (Achievement, Section/Course milestones, Leaderboard,
 * League). Gated on NODE_ENV (not NEXT_PUBLIC_ENVIRONMENT) so it needs no
 * .env.local change and never ships in a production build.
 *
 * Not linked from anywhere — visit /dev/tey-scenes directly. Safe to delete
 * once the manual verification checklist in tey-audit-progress.md is done.
 */

import React, { useState } from 'react';
import { useCelebration } from '@/context/CelebrationContext';
import { useShopEngine } from '@/context/ShopEngineContext';
import { pickAchievementVoice } from '@/lib/tey/achievementVoice';
import TreasureChestBench from '@/components/dashboard/v2/TreasureChestBench';

const btn: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px 14px',
  marginBottom: 8,
  borderRadius: 10,
  border: '2px solid #E2E8F0',
  background: '#F8FAFC',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
};

export default function TeyScenesDevPage() {
  const { celebrate } = useCelebration();
  const { shopScene } = useShopEngine();
  const [rawPicks, setRawPicks] = useState<string[]>([]);

  if (process.env.NODE_ENV !== 'development') {
    return <div style={{ padding: 40 }}>Not available.</div>;
  }

  const rivalRow = (rank: number) => ({
    userId: `rival-${rank}`,
    name: 'Jordan',
    avatarUrl: null,
    rank,
    isMe: false,
  });
  const meRow = (rank: number) => ({
    userId: 'me',
    name: 'You',
    avatarUrl: null,
    rank,
    isMe: true,
  });

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>Tey Voice — Scene Bench</h1>
      <p style={{ fontSize: 12, color: '#64748B', marginBottom: 20 }}>
        Dev-only. Click a few times each — lines rotate from a pool, so one click isn&apos;t proof of anything.
      </p>

      <div style={{ border: '2px solid #FDE047', background: '#FEFCE8', borderRadius: 10, padding: 12, marginBottom: 20 }}>
        <h2 style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>DIAGNOSTIC — raw pool, no overlay</h2>
        <button
          style={{ ...btn, background: '#FFF', marginBottom: 8 }}
          onClick={() => setRawPicks((prev) => [pickAchievementVoice(2, 5).headline, ...prev].slice(0, 6))}
        >
          Pick a line directly (no scene, no overlay)
        </button>
        {rawPicks.length > 0 && (
          <ol style={{ fontSize: 12, paddingLeft: 18, margin: 0 }}>
            {rawPicks.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        )}
      </div>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Achievement</h2>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'ACHIEVEMENT',
            badgeId: 'dev-test',
            badgeTitle: 'On Fire',
            tier: 2,
            maxTier: 5,
            tierDescription: 'Reach a 7-day streak',
            badgeBg: '#FF8A00',
          })
        }
      >
        Achievement — normal tier (2 of 5)
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'ACHIEVEMENT',
            badgeId: 'dev-test-max',
            badgeTitle: 'Unstoppable',
            tier: 5,
            maxTier: 5,
            tierDescription: 'Reach a 100-day streak',
            badgeBg: '#7E22CE',
          })
        }
      >
        Achievement — MAX tier (5 of 5)
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Level / welcome back / reward (mock — nothing persists)</h2>
      <button style={btn} onClick={() => celebrate({ kind: 'LEVEL_UP', oldLevel: 11, newLevel: 12, bonusCoins: 50 })}>
        Level up — 11 → 12 (+50 Coins)
      </button>
      <button style={btn} onClick={() => celebrate({ kind: 'WELCOME_BACK', days: 4 })}>
        Welcome back — 4 days
      </button>
      {/* Real permission prompt / install prompt — these DO persist (browser-owned). */}
      <button style={btn} onClick={() => celebrate({ kind: 'REMINDERS', variant: 'enable', streakDays: 4 })}>
        Reminders — turn on (real prompt)
      </button>
      <button style={btn} onClick={() => celebrate({ kind: 'REMINDERS', variant: 'install', streakDays: 4 })}>
        Reminders — install first
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'CLAIM',
            title: '+30 Coins',
            subtitle: 'Mock claim',
            rewards: [{ currency: 'COINS', amount: 30 }, { currency: 'XP', amount: 20 }],
          })
        }
      >
        Reward claim — 30 Coins + 20 XP
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Shop (mock — nothing persists)</h2>
      <button
        style={btn}
        onClick={() =>
          shopScene({
            kind: 'PURCHASE_SUCCESS',
            itemId: 'dev-freeze',
            itemName: 'Streak Freeze',
            rarity: 'common',
            art: 'freeze',
            slot: null,
            price: 200,
            coinsBefore: 1250,
            coinsAfter: 1050,
            message: 'Protects your streak for one missed day.',
          })
        }
      >
        Shop — Purchase success
      </button>
      <button
        style={btn}
        onClick={() =>
          shopScene({
            kind: 'CHEST_REVEAL',
            chestName: 'Gold Chest',
            accent: 'var(--warning)',
            rarity: 'rare',
            coins: 120,
            substituted: false,
            item: null,
            coinsAfter: 1170,
          })
        }
      >
        Shop — Chest reveal
      </button>
      <button
        style={btn}
        onClick={() =>
          shopScene({
            kind: 'COLLECTION_COMPLETE',
            collectionName: 'Space Collection',
            accent: 'var(--brand-purple)',
            rewardCoins: 300,
            rewardItem: null,
            coinsAfter: 1350,
          })
        }
      >
        Shop — Collection complete
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Streak (no override, so the pool actually fires)</h2>
      <button style={btn} onClick={() => celebrate({ kind: 'STREAK', mode: 'SAVED', days: 6 })}>
        Streak — Saved
      </button>
      <button style={btn} onClick={() => celebrate({ kind: 'STREAK', mode: 'LOST', days: 0, lostCount: 8 })}>
        Streak — Lost
      </button>
      <button style={btn} onClick={() => celebrate({ kind: 'STREAK', mode: 'EXTENDED', days: 3, previousDays: 2 })}>
        Streak — Extended (small, day 3)
      </button>
      <button style={btn} onClick={() => celebrate({ kind: 'STREAK', mode: 'EXTENDED', days: 30, previousDays: 29 })}>
        Streak — Extended (milestone, day 30)
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Section / Course milestones</h2>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'SECTION_COMPLETE',
            courseTitle: 'Intro to Figma',
            sectionTitle: 'Layout Basics',
            sectionIndexLabel: 'SECTION 2',
            sectionProgress: { lessonsCompleted: 5, lessonsTotal: 5 },
            results: { xpEarned: 40, bonusXp: 15, coinsEarned: 10, streakDays: 4 },
          })
        }
      >
        Section Complete
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'SECTION_UNLOCKED',
            sectionIndexLabel: 'SECTION 3',
            sectionTitle: 'Prototyping',
            description: 'Bring your designs to life.',
            lessonCount: 6,
            estimatedMinutes: 45,
            onStartSection: () => {},
            onBackToCourse: () => {},
          })
        }
      >
        Section Unlocked
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'COURSE_PROGRESS',
            courseTitle: 'Intro to Figma',
            from: 20,
            to: 30,
            sectionsCompleted: 2,
            sectionsTotal: 6,
            lessonsCompleted: 8,
            lessonsTotal: 24,
          })
        }
      >
        Course Progress — small tick (20% → 30%)
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'COURSE_PROGRESS',
            courseTitle: 'Intro to Figma',
            from: 42,
            to: 50,
            sectionsCompleted: 3,
            sectionsTotal: 6,
            lessonsCompleted: 12,
            lessonsTotal: 24,
          })
        }
      >
        Course Progress — crosses 50% milestone
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'COURSE_COMPLETE',
            courseTitle: 'Intro to Figma',
            sectionsCompleted: 6,
            sectionsTotal: 6,
            lessonsCompleted: 24,
            lessonsTotal: 24,
            xpTotal: 1240,
            streakDays: 12,
            onContinue: () => {},
          })
        }
      >
        Course Complete
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Leaderboard / League (subhead variety)</h2>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'LEADERBOARD',
            variant: 'REACHED_FIRST',
            league: 'GOLD',
            myRank: 1,
            beforeStandings: [rivalRow(1), meRow(2)],
            afterStandings: [meRow(1), rivalRow(2)],
            weekStart: new Date().toISOString(),
          })
        }
      >
        Leaderboard — Reached #1
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'LEADERBOARD',
            variant: 'PASSED_RIVAL',
            league: 'GOLD',
            myRank: 3,
            beforeStandings: [meRow(4), rivalRow(3)],
            afterStandings: [rivalRow(4), meRow(3)],
            rivalName: 'Jordan',
            rivalUserId: 'rival-3',
            weekStart: new Date().toISOString(),
          })
        }
      >
        Leaderboard — Passed a rival
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'LEAGUE',
            outcome: 'PROMOTED',
            fromTier: 'BRONZE',
            toTier: 'GOLD',
            rank: 2,
            totalXp: 480,
            weekStart: new Date().toISOString(),
            finalStandings: [rivalRow(1), meRow(2)],
          })
        }
      >
        League — Promoted
      </button>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'LEAGUE',
            outcome: 'DEMOTED',
            fromTier: 'GOLD',
            toTier: 'BRONZE',
            rank: 9,
            totalXp: 40,
            weekStart: new Date().toISOString(),
            finalStandings: [rivalRow(1), meRow(9)],
          })
        }
      >
        League — Demoted
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Community</h2>
      <button
        style={btn}
        onClick={() =>
          celebrate({
            kind: 'COMMUNITY_WELCOME',
            communityId: 'cm1',
            courseId: 'course1',
            name: 'Copywriting that Sells',
            courseTitle: 'Copywriting that Sells',
            thumbnailUrl: null,
            memberCount: 184,
            postCount: 212,
            instructor: { id: 'c1', fullName: 'Joel Mensah', avatarUrl: null },
            members: [
              { id: 'c1', fullName: 'Joel Mensah', avatarUrl: null },
              { id: 'u2', fullName: 'Kemi Adeyemi', avatarUrl: null },
              { id: 'u3', fullName: 'Luis Ortega', avatarUrl: null },
              { id: 'u4', fullName: 'Amara Diallo', avatarUrl: null },
              { id: 'u5', fullName: 'Priya Nair', avatarUrl: null },
            ],
            samplePost: {
              id: 'p2',
              postType: 'WIN',
              title: 'Landed my first paid client!',
              excerpt: 'Used the AIDA framework from lesson 4 on a cold email. They said yes to a $300 landing page.',
              commentCount: 4,
              likeCount: 31,
              authorName: 'Kemi Adeyemi',
              authorAvatarUrl: null,
            },
            onEnter: () => undefined,
          })
        }
      >
        Community welcome (after 2nd lesson)
      </button>

      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>Chest (real server-first open)</h2>
      <button style={btn} onClick={() => celebrate({ kind: 'CHEST' })}>
        Open today&apos;s chest
      </button>

      {/* The same TreasureChestBench the dashboard shows, mounted here too so
          the Rive chest can be exercised for every reward type without a
          backend, a logged-in session or a real Daily Chest row. Identical
          component, mocked claim — grants nothing. */}
      <h2 style={{ fontSize: 13, fontWeight: 800, marginTop: 20, marginBottom: 8 }}>
        Chest (Rive, every reward type — no backend needed)
      </h2>
      <TreasureChestBench />
    </div>
  );
}
