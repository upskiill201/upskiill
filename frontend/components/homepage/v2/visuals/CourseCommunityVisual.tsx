'use client';

/**
 * CourseCommunityVisual — the real per-course community feed, recreated in
 * code from the shipped design tokens and components (not invented):
 *
 *  - app/(app)/dashboard/community/[courseId]/page.tsx + CommunityPage.module.css
 *    for the tab row and filter chips (the active chip is dark navy
 *    `--text-primary` #1F2A44, not brand blue).
 *  - components/community/PostCard.tsx + PostCard.module.css for the post
 *    card shape (flat, 1px #E2E8F0 border, no hard shadow), the amber
 *    flame streak badge, and the liked-state pill (#3D5AFE / #EEF2FF).
 *  - components/community/CommunityRail.module.css for the leaderboard
 *    widget's exact rank-badge colors (gold #fde68a/#92660a, silver
 *    #e2e8f0/#475569, bronze #f6d0b1/#9a4b1a) and the "your row" highlight.
 *
 * This page runs its own clean, light design system (globals.css tokens) —
 * distinct from the Duolingo-chunky style everywhere else on this homepage —
 * kept as-is here because that IS the real community surface.
 *
 * The post content is invented copy, but deliberately busy: real products
 * show their community mid-conversation, not empty, and the outcome this
 * section sells is "you get unstuck fast and your wins get seen" — that
 * only reads if the feed looks lived-in.
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Flame, MessageCircle, ThumbsUp, Users } from 'lucide-react';

const TABS = ['Community', 'Classroom', 'Members', 'Leaderboards'];
const FILTERS = ['All', 'Questions', 'Wins', 'Tips'];

const POSTS = [
  {
    name: 'Maya R.',
    time: '18m',
    category: 'Questions',
    streak: 12,
    title: 'How do I fix overlapping constraints in Figma?',
    body: 'Tried auto-layout but items keep jumping around when I resize the frame…',
    likes: 23,
    comments: 9,
    liked: false,
  },
  {
    name: 'Chen W.',
    time: '2h',
    category: 'Wins',
    streak: 31,
    title: 'Just shipped my first client project! 🎉',
    body: 'Used the pitch deck template from Module 3. Client signed off the same day.',
    likes: 47,
    comments: 16,
    liked: true,
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Amara T.', points: 540, tone: { bg: '#fde68a', text: '#92660a' } },
  { rank: 2, name: 'Chen W.', points: 495, tone: { bg: '#e2e8f0', text: '#475569' } },
  { rank: 3, name: 'You', points: 410, tone: { bg: '#f6d0b1', text: '#9a4b1a' }, isMe: true },
];

function Avatar({ label, gradient }: { label: string; gradient: string }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
      style={{ background: gradient }}
    >
      {label}
    </span>
  );
}

const GRADIENTS = ['linear-gradient(135deg,#3D5AFE,#6352FF)', 'linear-gradient(135deg,#F59E0B,#EF4444)'];

export default function CourseCommunityVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-black/5"
    >
      {/* Real tab row */}
      <div className="flex items-center gap-3 overflow-x-auto border-b border-slate-200 px-4 pt-4">
        {TABS.map((t) => (
          <span
            key={t}
            className="relative shrink-0 whitespace-nowrap pb-2.5 text-[12px] font-extrabold"
            style={{ color: t === 'Community' ? '#1F2A44' : '#94A3B8' }}
          >
            {t}
            {t === 'Community' && (
              <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-t-[3px]" style={{ backgroundColor: '#1F2A44' }} />
            )}
          </span>
        ))}
      </div>

      <div className="p-4">
        {/* Composer trigger */}
        <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3 py-2">
          <Avatar label="Y" gradient="linear-gradient(135deg,#3D5AFE,#6352FF)" />
          <span className="text-[13px] font-medium text-slate-400">Share a question, win or tip&hellip;</span>
        </div>

        {/* Filter chips */}
        <div className="mt-3 flex gap-2">
          {FILTERS.map((f, i) => (
            <span
              key={f}
              className="rounded-full px-3.5 py-1.5 text-[12.5px] font-extrabold"
              style={
                i === 0
                  ? { backgroundColor: '#1F2A44', color: '#fff' }
                  : { backgroundColor: '#fff', border: '1px solid #E2E8F0', color: '#64748B' }
              }
            >
              {f}
            </span>
          ))}
        </div>

        {/* Feed */}
        <div className="mt-3.5 flex flex-col gap-3">
          {POSTS.map((p, i) => (
            <div key={p.name} className="rounded-xl border border-slate-200 p-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar label={p.name.charAt(0)} gradient={GRADIENTS[i]} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-extrabold text-[#1F2A44]">{p.name}</p>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94A3B8]">
                    {p.time} ago in {p.category}
                    <span className="flex items-center gap-0.5 font-extrabold" style={{ color: '#F59E0B' }}>
                      <Flame size={11} fill="#F59E0B" /> {p.streak}
                    </span>
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[14px] font-bold leading-snug text-[#1F2A44]">{p.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-[#64748B]">{p.body}</p>

              <div className="mt-2.5 flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold"
                  style={
                    p.liked
                      ? { border: '1px solid #3D5AFE', backgroundColor: '#EEF2FF', color: '#3D5AFE' }
                      : { border: '1px solid #E2E8F0', backgroundColor: '#fff', color: '#64748B' }
                  }
                >
                  <ThumbsUp size={12} fill={p.liked ? '#3D5AFE' : 'none'} /> {p.likes}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-[12px] font-bold text-[#64748B]">
                  <MessageCircle size={12} /> {p.comments}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard widget — real CommunityRail styling */}
        <div className="mt-3.5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 px-3.5 py-2.5">
            <span className="text-[13px] font-extrabold text-[#1F2A44]">Leaderboard (30-day)</span>
            <span className="text-[11px] font-semibold text-[#94A3B8]">points</span>
          </div>
          <div className="flex flex-col">
            {LEADERBOARD.map((row) => (
              <div
                key={row.rank}
                className="flex items-center gap-2.5 px-3.5 py-2"
                style={row.isMe ? { backgroundColor: '#EEF2FF' } : undefined}
              >
                <span
                  className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold"
                  style={{ backgroundColor: row.tone.bg, color: row.tone.text }}
                >
                  {row.rank}
                </span>
                <span className="flex-1 text-[13px] font-bold text-[#1F2A44]">{row.name}</span>
                <span className="text-[13px] font-extrabold" style={{ color: '#3D5AFE' }}>+{row.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role pill */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-[#F5F7FB] px-3.5 py-2.5 text-[13px] font-bold text-[#64748B]">
          <Users size={15} /> You&rsquo;re a member
        </div>
      </div>
    </motion.div>
  );
}
