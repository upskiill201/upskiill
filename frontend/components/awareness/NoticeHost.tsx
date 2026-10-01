'use client';

/**
 * Shows the current notice (lib/awareness/notices.ts): a white, chunky card
 * that drops in from the top with its own sound, says one thing, and gets
 * out of the way — tap it to go there, swipe it up to dismiss, or let the
 * little timer line run out.
 *
 * It holds (doesn't drop the notice, just waits) while a lesson or a
 * full-screen celebration is on screen, and only lives in the student app.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isCelebrationActive } from '@/context/CelebrationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { dismissNotice, notify, useCurrentNotice, type Notice, type NoticeIcon, type NoticeTone } from '@/lib/awareness/notices';
import { playHaptic } from '@/lib/haptics';
import { isStudentExperienceRoute } from '@/lib/herald-scope';

const SHOW_MS = 5200;

const ICON_SRC: Record<NoticeIcon, string> = {
  league: '/Icons/Leaderboard.png',
  chest: '/Icons/tressure-chest-locked.png',
  quest: '/Icons/Quests.png',
  streak: '/Icons/burn.png',
  tey: '/User onbarding Assets/tey/cheering.webp',
  xp: '/Icons/gem.png',
};

const TONE: Record<NoticeTone, { color: string; sound: 'noticeGood' | 'noticeWarn' | 'noticeInfo' }> = {
  good: { color: 'var(--success-green)', sound: 'noticeGood' },
  warn: { color: 'var(--warning)', sound: 'noticeWarn' },
  info: { color: 'var(--color-brand)', sound: 'noticeInfo' },
};

function useHeld(): boolean {
  const [held, setHeld] = useState(false);
  useEffect(() => {
    const sync = () => setHeld(isCelebrationActive());
    sync();
    window.addEventListener('celebration:visibility', sync);
    return () => window.removeEventListener('celebration:visibility', sync);
  }, []);
  return held;
}

function NoticeCard({ notice }: { notice: Notice }) {
  const router = useRouter();
  const pathname = usePathname();
  // Already on the page it points to: the notice just informs.
  const hasAction = Boolean(notice.onTap || (notice.href && notice.href !== pathname));
  const reducedMotion = useReducedMotion();
  const tone = TONE[notice.tone];
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    playSound(tone.sound);
    playHaptic(notice.tone === 'warn' ? 'warning' : 'light', false);
  }, [notice.id, notice.tone, tone.sound]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(dismissNotice, SHOW_MS);
    return () => clearTimeout(t);
  }, [notice.id, paused]);

  const open = () => {
    playSound('next');
    playHaptic('medium', false);
    dismissNotice();
    notice.onTap?.();
    if (notice.href && notice.href !== pathname) router.push(notice.href);
  };

  return (
    <motion.div
      key={notice.id}
      role="status"
      aria-live="polite"
      className="pointer-events-auto w-full max-w-[440px]"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -90, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -70, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 520, damping: 30 }}
      drag={reducedMotion ? false : 'y'}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.6, bottom: 0.1 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -30) dismissNotice();
      }}
      onHoverStart={() => setPaused(true)}
      onHoverEnd={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={open}
        className="relative w-full overflow-hidden rounded-[20px] border-2 border-[var(--border)] bg-white px-3.5 py-3 flex items-center gap-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
        style={{ boxShadow: '0 4px 0 var(--border), 0 14px 32px rgba(7, 18, 51, 0.14)' }}
      >
        <motion.span
          className="shrink-0 w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${tone.color} 14%, white)` }}
          initial={reducedMotion ? false : { scale: 0.4, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 600, damping: 12 }}
        >
          <Image src={ICON_SRC[notice.icon]} alt="" aria-hidden="true" width={34} height={34} unoptimized className="w-[34px] h-[34px] object-contain" />
        </motion.span>
        <span className="flex-1 min-w-0">
          <span className="block text-[15.5px] font-extrabold text-ink leading-snug" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {notice.title}
          </span>
          {notice.body && (
            <span className="block text-[13.5px] font-semibold text-[var(--text-secondary)] leading-snug">{notice.body}</span>
          )}
        </span>
        {hasAction && (
          <span className="shrink-0 inline-flex items-center gap-0.5 text-[13px] font-extrabold uppercase tracking-[0.05em]" style={{ color: tone.color }}>
            {notice.action ?? 'View'}
            <ChevronRight className="w-4 h-4 stroke-[3]" aria-hidden="true" />
          </span>
        )}
        {/* The time left, draining along the bottom edge. */}
        <motion.span
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-[3px]"
          style={{ backgroundColor: tone.color }}
          initial={{ width: '100%' }}
          animate={{ width: paused ? undefined : '0%' }}
          transition={{ duration: SHOW_MS / 1000, ease: 'linear' }}
        />
      </button>
    </motion.div>
  );
}

export function NoticeHost() {
  const notice = useCurrentNotice();

  // Development only: `window.__teyroNotify({...})` raises a notice by hand,
  // for checking the look and sound without waiting for a real event.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    (window as unknown as { __teyroNotify: typeof notify }).__teyroNotify = notify;
  }, []);
  const held = useHeld();
  const pathname = usePathname();
  const visible = notice && !held && isStudentExperienceRoute(pathname);

  return (
    <div
      className="fixed inset-x-0 z-[99000] flex justify-center px-4 pointer-events-none"
      style={{ top: 'calc(env(safe-area-inset-top) + 12px)' }}
    >
      <AnimatePresence mode="wait">{visible && <NoticeCard key={notice.id} notice={notice} />}</AnimatePresence>
    </div>
  );
}

export default NoticeHost;
