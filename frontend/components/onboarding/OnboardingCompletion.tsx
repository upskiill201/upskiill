'use client';

/**
 * OnboardingCompletion — the last screen, and the handoff into real learning.
 *
 * Unnumbered and shows no progress bar: the final numbered step's advance
 * already marked onboarding complete before routing here, so the bar was
 * accurate at 14/14 when the learner last saw it.
 *
 * ── The CTA uses real data ───────────────────────────────────────────────────
 * The destination comes from an actual catalog query against the learner's
 * track (`catalog.ts` maps Coding/AI onto the free-text `Course.category`
 * values that exist today — there is no Category model and no recommendation
 * engine).
 *
 *   matches   → recommend the top course; Start learning enrolls for real
 *   no match  → SAY SO, and route to explore. We do not invent a course, and
 *               we do not enroll anyone into something that doesn't exist.
 *   error     → straight to the dashboard. Never block the learner here.
 *
 * The badge claim is the existing server-side achievement, reused as-is.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';
import {
  trackFirstLearningAction,
  trackOnboardingCompleted,
} from '@/lib/onboarding/analytics';
import { findTrackCourse, isLearningTrack, startCourse } from '@/lib/path/trackCourse';
import { resolveDialogue } from '@/lib/onboarding/dialogue/resolve';
import { buildPathSummary } from '@/lib/onboarding/pathSummary';
import { getOnboardingState, saveOnboardingState } from '@/lib/user-onboarding';
import type { OnboardingAnswersV2 } from '@/lib/onboarding/types';
import { MascotBackground } from './MascotBackground';
import { TeyCharacter } from './TeyCharacter';

interface CourseSummary {
  id: string;
  title: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  category?: string;
}

type Destination =
  | { kind: 'loading' }
  | { kind: 'course'; course: CourseSummary }
  | { kind: 'explore'; reason: string }
  | { kind: 'dashboard' };

export function OnboardingCompletion() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  const [answers, setAnswers] = useState<OnboardingAnswersV2>({});
  const [destination, setDestination] = useState<Destination>({ kind: 'loading' });
  const [starting, setStarting] = useState(false);

  // ── Mark complete, locally and on the server ──────────────────────────────
  useEffect(() => {
    const state = getOnboardingState();
    // Same hydration constraint as useOnboardingSession: localStorage cannot
    // be read during render without a server/client HTML mismatch, so the
    // effect is the correct placement. Runs once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(state.answers);

    if (!state.onboardingComplete) {
      saveOnboardingState({
        onboardingComplete: true,
        completedAt: new Date().toISOString(),
      });
    }

    trackOnboardingCompleted(state.answers);
    playOnboardingCue('completion');
    playHaptic('teyroCelebration');
  }, []);

  // ── Find something real to point at ───────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const track = getOnboardingState().answers.category;
      if (!isLearningTrack(track)) {
        if (!cancelled) setDestination({ kind: 'dashboard' });
        return;
      }

      try {
        // The same finder home uses (lib/path/trackCourse.ts), so this screen
        // and home always point at the same course — and a course with no
        // published lessons is never recommended.
        const found = await findTrackCourse(track);
        if (found) {
          if (!cancelled) {
            setDestination({
              kind: 'course',
              course: {
                id: found.id,
                title: found.title,
                shortDescription: found.shortDescription ?? undefined,
                category: found.category ?? undefined,
              },
            });
          }
          return;
        }

        if (!cancelled) {
          setDestination({
            kind: 'explore',
            reason: "We're still building out courses for that exactly — here's everything live right now.",
          });
        }
      } catch {
        // Offline or the API is down. The dashboard always works.
        if (!cancelled) setDestination({ kind: 'dashboard' });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const beat = useMemo(() => resolveDialogue('reveal', 'completion', answers), [answers]);
  const summary = useMemo(() => buildPathSummary(answers), [answers]);

  const start = useCallback(async () => {
    if (starting) return;
    setStarting(true);
    playHaptic('medium');
    playOnboardingCue('continue');

    trackFirstLearningAction({
      destination: destination.kind === 'loading' ? 'dashboard' : destination.kind,
      category: answers.category,
    });

    if (destination.kind === 'course') {
      // Enroll (idempotent server-side) and go straight into lesson 1 — not
      // the course page. Leaving the lesson returns to the home path.
      let href = '/dashboard';
      try {
        href = await startCourse(destination.course.id);
      } catch {
        // Offline mid-enroll: home will show their track's path either way.
      }
      router.push(href);
      return;
    }

    router.push(destination.kind === 'explore' ? '/dashboard/explore' : '/dashboard');
  }, [answers.category, destination, router, starting]);

  // Distinct per destination — a button that says "Explore courses" but
  // navigates to /dashboard would be a small but real broken promise right
  // at the last screen a learner sees before the app proper.
  const ctaLabel =
    destination.kind === 'course'
      ? 'Start learning'
      : destination.kind === 'explore'
        ? 'Explore courses'
        : 'Go to dashboard';

  return (
    // Mirrors the rest of onboarding's background treatment (bubble field)
    // rather than a bare gradient, so the last screen doesn't visually reset
    // to something plainer right as it becomes the most important one.
    <div className="min-h-[100dvh] w-full relative flex flex-col items-center justify-center bg-gradient-to-br from-[#EBF3FE] via-[#F4F8FF] to-[#FFFFFF] px-5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <MascotBackground variant="soft" />
      </div>

      <div
        className="relative w-full max-w-[420px] md:max-w-[560px] flex flex-col items-center"
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 24px)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
        }}
      >
        <div className="relative w-[62vw] max-w-[280px] md:max-w-[420px] md:w-[42vw] aspect-square">
          <TeyCharacter pose="celebrating" className="w-full h-full" priority />
        </div>

        <motion.h1
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 text-center text-[22px] md:text-[32px] font-extrabold leading-tight text-[#071233]"
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          {beat?.text ?? "You're in. Your learning journey starts now."}
        </motion.h1>

        {summary.highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {summary.highlights.map((h) => (
              <span
                key={h.label}
                className="rounded-full bg-white/80 border border-white px-3 py-1.5 text-[12.5px] font-bold text-[#0050B3]"
              >
                <span className="font-semibold text-[#47567A]">{h.label}: </span>
                {h.value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 w-full" aria-live="polite">
          {destination.kind === 'loading' && (
            <div className="flex items-center justify-center gap-2 text-[14px] text-[#47567A]">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Finding your first lesson…
            </div>
          )}

          {destination.kind === 'course' && (
            <div
              className="rounded-[16px] border border-white/80 bg-white/80 backdrop-blur-md p-4"
              style={{ boxShadow: '0 12px 32px rgba(7,18,51,0.08)' }}
            >
              <p className="text-[11.5px] font-bold uppercase tracking-wide text-[#94A3B8]">
                Starting with
              </p>
              <p
                className="mt-1 text-[16px] font-extrabold leading-tight text-[#071233]"
                style={{ fontFamily: 'var(--font-jakarta)' }}
              >
                {destination.course.title}
              </p>
              {destination.course.shortDescription && (
                <p className="mt-1 text-[13.5px] leading-snug text-[#47567A]">
                  {destination.course.shortDescription}
                </p>
              )}
            </div>
          )}

          {destination.kind === 'explore' && (
            // Honest, not apologetic, and not a fake course.
            <p className="text-center text-[14px] leading-snug text-[#47567A]">
              {destination.reason}
            </p>
          )}

          {destination.kind === 'dashboard' && (
            // Never leave this region empty — an empty aria-live block here
            // is exactly the dead space between headline and CTA that made
            // the whole screen look unfinished.
            <p className="text-center text-[14px] leading-snug text-[#47567A]">
              Your dashboard is ready whenever you are.
            </p>
          )}
        </div>

        <motion.button
          type="button"
          onClick={start}
          disabled={destination.kind === 'loading' || starting}
          whileTap={reducedMotion ? undefined : { scale: 0.96 }}
          className={[
            'group mt-6 w-full h-[56px] md:h-[64px] rounded-[14px] flex items-center justify-center gap-2',
            'text-[16px] md:text-[18px] font-extrabold uppercase tracking-wide text-white cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0172FD]/40',
            'disabled:opacity-60 disabled:cursor-not-allowed',
          ].join(' ')}
          style={{
            fontFamily: 'var(--font-jakarta)',
            backgroundColor: '#0172FD',
            boxShadow:
              '0 12px 24px -8px rgba(1,114,253,0.4), inset 0px -6px 0px rgba(0,0,0,0.24), inset 0px 2px 0px rgba(255,255,255,0.2)',
          }}
        >
          {starting ? (
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          ) : (
            <>
              {ctaLabel}
              <ArrowRight
                aria-hidden="true"
                className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default OnboardingCompletion;
