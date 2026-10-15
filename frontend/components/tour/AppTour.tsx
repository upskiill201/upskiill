'use client';

/**
 * The guided app tour: dims the page, lights up one thing at a time and walks
 * the learner to the page it belongs to (lib/tour/steps.ts).
 *
 * - Targets are found by `data-tour`. The same name can exist twice (desktop
 *   rail and phone bottom bar), so the first one actually on screen wins.
 * - On a phone, tabs that only live in the slide-out menu make the shell open
 *   its drawer (`tour:drawer` event) and close it again afterwards.
 * - If a target never shows up (slow page, empty state) the step falls back to
 *   a centred card, so the tour can never get stuck.
 * - Auto-starts once for a learner who has not seen it, on home, when no
 *   celebration or lesson is on screen. Replay: "Take the tour" in More.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isCelebrationActive } from '@/context/CelebrationContext';
import { useMe } from '@/hooks/useMe';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { TOUR_STEPS } from '@/lib/tour/steps';
import { endTour, goToTourStep, isTourDone, markTourDone, startTour, useTourState } from '@/lib/tour/store';

const PAD = 8;
const CARD_W = 360;
const GAP = 16;
const FIND_TIMEOUT_MS = 4500;
const AUTO_START_DELAY_MS = 1800;
const NEW_ACCOUNT_DAYS = 21;

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

function isNarrow() {
  return window.innerWidth <= 768;
}

/** First element with this tour name that is really on screen. */
function findVisible(name: string): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(`[data-tour="${name}"]`);
  for (const el of nodes) {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    if (r.right <= 0 || r.bottom <= 0 || r.left >= window.innerWidth || r.top >= window.innerHeight) continue;
    return el;
  }
  return null;
}

function setDrawer(open: boolean) {
  window.dispatchEvent(new CustomEvent('tour:drawer', { detail: open }));
}

export default function AppTour() {
  const { active, index } = useTourState();
  const { me } = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const step = TOUR_STEPS[index];
  const [box, setBox] = useState<Box | null>(null);
  // True until the target is found or the wait runs out.
  const [searching, setSearching] = useState(true);
  const [narrow, setNarrow] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);
  const userId = me?.id;

  // ── Auto-start, once, for a learner who has not seen it ──────────────────
  useEffect(() => {
    if (!userId || active || pathname !== '/dashboard') return;
    if (!me?.hasStudentAccess || isTourDone(userId)) return;
    // An older account does not need a welcome tour — mark it so we never ask.
    const created = typeof me.createdAt === 'string' ? Date.parse(me.createdAt) : NaN;
    if (!Number.isNaN(created) && Date.now() - created > NEW_ACCOUNT_DAYS * 86_400_000) {
      markTourDone(userId);
      return;
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const attempt = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isCelebrationActive()) return; // retried when the scene ends
        startTour();
      }, AUTO_START_DELAY_MS);
    };
    attempt();
    window.addEventListener('celebration:visibility', attempt);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('celebration:visibility', attempt);
    };
  }, [userId, active, pathname, me?.hasStudentAccess, me?.createdAt]);

  const finish = useCallback(() => {
    if (userId) markTourDone(userId);
    setDrawer(false);
    endTour();
  }, [userId]);

  const go = useCallback(
    (to: number) => {
      const next = TOUR_STEPS[to];
      if (!next) return;
      playSound('navTap', to % 8);
      playHaptic('selection', false);
      setBox(null);
      setSearching(true);
      goToTourStep(to);
      if (next.route !== pathname) router.push(next.route);
    },
    [pathname, router],
  );

  // ── Find the target on this step, following it as the page moves ─────────
  useEffect(() => {
    if (!active || !step) return;
    setNarrow(isNarrow());
    if (!step.target) {
      setDrawer(false);
      setSearching(false);
      setBox(null);
      return;
    }
    // Only look once we are on the step's page.
    // (A route that never arrives still ends in a centred card, not a stall.)
    if (pathname !== step.route) {
      const giveUp = setTimeout(() => setSearching(false), 12_000);
      return () => clearTimeout(giveUp);
    }

    let raf = 0;
    let cancelled = false;
    let lastDrawerAsk = 0;
    const started = performance.now();
    const target = step.target;

    const tick = () => {
      if (cancelled) return;
      const el = findVisible(target);
      if (el) {
        const r = el.getBoundingClientRect();
        // A tall target (the whole path) is lit only where it is on screen.
        const top = Math.max(r.top, PAD + 8);
        const bottom = Math.min(r.bottom, window.innerHeight - PAD - 8);
        const next: Box = { top, left: r.left, width: r.width, height: Math.max(bottom - top, 24) };
        setBox((prev) =>
          prev && prev.top === next.top && prev.left === next.left && prev.width === next.width && prev.height === next.height
            ? prev
            : next,
        );
        setSearching(false);
        const partlyOut = r.height < window.innerHeight * 0.6 && (r.top < 56 || r.bottom > window.innerHeight - 8);
        if (partlyOut && !el.closest('aside, nav')) {
          el.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      } else {
        // On a phone, tabs that live in the menu need it opened first. Asked
        // again until the target shows: a route change can close the drawer
        // right after the first request.
        const now = performance.now();
        if (step.inDrawer && isNarrow() && now - lastDrawerAsk > 500) {
          lastDrawerAsk = now;
          setDrawer(true);
        }
        if (performance.now() - started > FIND_TIMEOUT_MS) setSearching(false);
        setBox(null);
      }
      raf = requestAnimationFrame(tick);
    };

    // Close the drawer for steps that do not live in it.
    if (!step.inDrawer) setDrawer(false);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [active, step, pathname, reducedMotion]);

  // ── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
      else if (e.key === 'ArrowRight') {
        if (index >= TOUR_STEPS.length - 1) finish();
        else go(index + 1);
      } else if (e.key === 'ArrowLeft' && index > 0) go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, index, go, finish]);

  useEffect(() => {
    if (active && !searching) nextRef.current?.focus({ preventScroll: true });
  }, [active, index, searching]);

  useEffect(() => {
    if (!active) return;
    const onResize = () => setNarrow(isNarrow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

  if (!active || !step) return null;

  const isLast = index === TOUR_STEPS.length - 1;
  const spot = box
    ? {
        top: box.top - PAD,
        left: box.left - PAD,
        width: box.width + PAD * 2,
        height: box.height + PAD * 2,
      }
    : null;

  // ── Where the card sits ──────────────────────────────────────────────────
  let cardStyle: React.CSSProperties;
  if (!spot) {
    cardStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: `min(${CARD_W}px, calc(100vw - 32px))` };
  } else if (narrow) {
    const targetInLowerHalf = spot.top + spot.height / 2 > window.innerHeight / 2;
    cardStyle = {
      left: 16,
      right: 16,
      ...(targetInLowerHalf ? { top: 'max(16px, env(safe-area-inset-top))' } : { bottom: 'max(16px, env(safe-area-inset-bottom))' }),
    };
  } else {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const roomRight = vw - (spot.left + spot.width) - GAP;
    const roomLeft = spot.left - GAP;
    const clampTop = (t: number) => Math.min(Math.max(16, t), vh - 260);
    if (roomRight >= CARD_W) {
      cardStyle = { left: spot.left + spot.width + GAP, top: clampTop(spot.top + spot.height / 2 - 110), width: CARD_W };
    } else if (roomLeft >= CARD_W) {
      cardStyle = { left: spot.left - GAP - CARD_W, top: clampTop(spot.top + spot.height / 2 - 110), width: CARD_W };
    } else {
      const below = spot.top + spot.height + GAP;
      cardStyle = {
        left: Math.min(Math.max(16, spot.left + spot.width / 2 - CARD_W / 2), vw - CARD_W - 16),
        top: below + 240 < vh ? below : Math.max(16, spot.top - GAP - 240),
        width: CARD_W,
      };
    }
  }

  const spring = reducedMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 320, damping: 32 };

  return (
    <div className="fixed inset-0" style={{ zIndex: 2000 }} role="presentation" data-tour-overlay>
      {/* Catches every tap so the page underneath stays still. */}
      <div
        className="absolute inset-0"
        style={{ background: spot ? 'transparent' : 'color-mix(in srgb, var(--color-ink) 62%, transparent)' }}
      />

      {/* The spotlight: a ring whose huge shadow dims everything else. */}
      {spot && (
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none"
          initial={false}
          animate={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height }}
          transition={spring}
          style={{
            borderRadius: 18,
            border: '3px solid var(--color-brand)',
            boxShadow:
              '0 0 0 9999px color-mix(in srgb, var(--color-ink) 62%, transparent), 0 0 0 6px color-mix(in srgb, var(--color-brand) 28%, transparent)',
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {!searching && (
          // Positioned by a plain wrapper: framer owns the card's own transform.
          <div key={step.id} className="absolute" style={cardStyle}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Tour step ${index + 1} of ${TOUR_STEPS.length}: ${step.title}`}
            className="relative rounded-[20px] border-2 bg-white"
            style={{ borderColor: 'var(--border)', boxShadow: '0 6px 0 var(--border), var(--shadow-lift)' }}
            initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={finish}
              aria-label="Skip the tour"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-section)]"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="flex gap-3 p-4 pb-3">
              <div className="relative h-[84px] w-[68px] shrink-0">
                <Image
                  src={`/User onbarding Assets/tey/${step.tey}.webp`}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="68px"
                  className="object-contain object-bottom"
                />
              </div>
              <div className="min-w-0 pr-6">
                <p className="text-[12px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--color-brand)' }}>
                  Step {index + 1} of {TOUR_STEPS.length}
                </p>
                <h2 className="mt-0.5 text-[19px] font-extrabold leading-tight text-ink">{step.title}</h2>
                <p className="mt-1.5 text-[15px] leading-snug" style={{ color: 'var(--color-ink-soft)' }}>
                  {step.body}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 px-4 pb-4">
              <div className="flex items-center gap-1" aria-hidden="true">
                {TOUR_STEPS.map((s, i) => (
                  <span
                    key={s.id}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === index ? 14 : 6,
                      background: i === index ? 'var(--color-brand)' : i < index ? 'var(--soft-blue)' : 'var(--border-strong)',
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    aria-label="Previous step"
                    className="grid h-10 w-10 place-items-center rounded-[10px] border-2 text-ink hover:bg-[var(--bg-section)]"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                  </button>
                )}
                <button
                  ref={nextRef}
                  type="button"
                  onClick={() => (isLast ? finish() : go(index + 1))}
                  className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 text-[15px] font-extrabold text-white active:translate-y-[2px]"
                  style={{ background: 'var(--color-brand)', boxShadow: '0 3px 0 var(--color-brand-deep)' }}
                >
                  {isLast ? "Let's go" : index === 0 ? 'Show me' : 'Next'}
                  {!isLast && <ArrowRight size={16} strokeWidth={3} />}
                </button>
              </div>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
