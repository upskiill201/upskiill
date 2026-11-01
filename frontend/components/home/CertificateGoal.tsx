'use client';

/**
 * CertificateGoal — the last stop on the home road: the course certificate
 * the learner is walking towards. A drawing of it (Art `certificateGoal`),
 * not the certificate itself, with how far away it still is.
 *
 *  - far:    muted, a soft shine now and then;
 *  - close:  the final unit — warmer, glowing;
 *  - earned: lit and floating; taps open the learner's real certificate
 *            (/c/[code]). Asking the server also issues it, exactly like the
 *            course-complete screen's Certificate pill.
 *
 * The rule for which state, and what counts, is `certificateGoal()` in
 * lib/path/model.ts, mirroring backend/src/certificate.
 */

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import useSWR from 'swr';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { fetcher } from '@/lib/swr';
import { playPathCue } from '@/lib/audio/pathAudio';
import { playHaptic } from '@/lib/haptics';
import { type CourseCertificateStatus, verifyPath } from '@/lib/certificates/types';
import type { CertificateGoal as Goal } from '@/lib/path/model';
import type { LandId } from '@/lib/path/journey';
import styles from './map/JourneyMap.module.css';

const ROAD_H = 96;
// The goal, not another stop: four-plus lesson nodes wide (NODE_W is 76), capped to the column.
const ART = { far: 310, close: 330, earned: 350 } as const;

export function CertificateGoal({
  goal,
  courseId,
  courseTitle,
  land,
  fogged,
  enrolled,
}: {
  goal: Goal;
  courseId: string;
  courseTitle: string;
  /** The last unit's land: the road runs on through the same ground. */
  land: LandId;
  /** The last land isn't reached yet: carry on its fog, so the ground doesn't change at the seam. */
  fogged: boolean;
  enrolled: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const { state, left, testedOutLeft } = goal;
  const earned = state === 'earned';
  const { data } = useSWR<CourseCertificateStatus>(
    earned && enrolled ? `/api/certificates/course/${courseId}` : null,
    fetcher,
  );
  const code = data?.status === 'ISSUED' ? data.certificate.code : null;

  const status = earned
    ? code
      ? 'Earned! Tap to see it'
      : 'Earned!'
    : testedOutLeft === left
      ? `Finish the ${left} ${left === 1 ? 'lesson' : 'lessons'} you tested out of`
      : `${left} ${left === 1 ? 'lesson' : 'lessons'} to go`;

  const glow =
    state === 'far'
      ? null
      : (
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: earned ? 460 : 400,
              height: earned ? 460 : 400,
              background: `radial-gradient(circle, color-mix(in srgb, var(--warning) ${earned ? 55 : 38}%, transparent) 0%, transparent 68%)`,
            }}
            animate={reducedMotion ? undefined : { opacity: [0.65, 1, 0.65], scale: [0.94, 1.04, 0.94] }}
            transition={{ duration: earned ? 2.4 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        );

  const art = (
    <span className="relative inline-flex items-center justify-center" style={{ width: ART.earned + 16, maxWidth: '100%' }}>
      {glow}
      <motion.span
        className="relative inline-flex max-w-full"
        style={state === 'far' ? { opacity: 0.72, filter: 'saturate(0.45)' } : undefined}
        animate={earned && !reducedMotion ? { y: [0, -6, 0] } : undefined}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Art name="certificateGoal" size={ART[state]} className="max-w-full h-auto" />
        {/* A soft shine passes over it now and then, even far away. */}
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            // Just the framed certificate (x 5–59, y 8–46.5 of the 64 grid, leaning -5° about
            // (32, 48)), never the air round it.
            className="absolute left-[8%] right-[8%] top-[12.5%] bottom-[27%] overflow-hidden rounded-[6px] pointer-events-none"
            style={{ transform: 'rotate(-5deg)', transformOrigin: '50% 104%' }}
          >
            <motion.span
              className="absolute inset-y-0 w-[34%]"
              style={{
                background: 'linear-gradient(100deg, transparent, color-mix(in srgb, white 55%, transparent), transparent)',
              }}
              initial={{ left: '-30%' }}
              animate={{ left: ['-30%', '110%'] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: earned ? 1.6 : 4.5, ease: 'easeInOut' }}
            />
          </motion.span>
        )}
      </motion.span>
    </span>
  );

  const label = (
    <span
      className="mt-1 inline-flex flex-col items-center rounded-[16px] border-2 px-5 py-3 text-center max-w-[340px]"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: earned ? 'color-mix(in srgb, var(--warning) 60%, transparent)' : 'var(--border)',
        boxShadow: `0 4px 0 ${earned ? 'color-mix(in srgb, var(--warning) 60%, transparent)' : 'var(--border)'}`,
      }}
    >
      <span
        className="inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.1em]"
        style={{ color: state === 'far' ? 'var(--text-secondary)' : 'var(--warning)' }}
      >
        <Glyph name="medal" size={14} strokeWidth={2.8} />
        Your certificate
      </span>
      <span
        className="mt-1 block text-[22px] font-extrabold leading-tight text-ink"
        style={{ fontFamily: 'var(--font-jakarta)' }}
      >
        {courseTitle}
      </span>
      <span
        className="mt-1.5 block text-[14px] font-bold"
        style={{ color: earned ? 'var(--success-green)' : 'var(--text-secondary)' }}
      >
        {status}
      </span>
    </span>
  );

  const body = (
    <>
      {art}
      {label}
    </>
  );

  return (
    <section
      aria-label={`Your certificate for ${courseTitle}: ${status}`}
      className={`${styles.land} ${styles[land]} flex flex-col items-center px-4 pb-12`}
    >
      {/* The road runs on from the last chest down to the certificate. */}
      <svg
        aria-hidden="true"
        width="40"
        height={ROAD_H}
        viewBox={`-20 0 40 ${ROAD_H}`}
        className="overflow-visible"
        // Dimmed like the land scene it carries on from.
        style={fogged ? { opacity: 0.55, filter: 'saturate(0.55)' } : undefined}
      >
        {earned ? (
          <g>
            <path className={styles.roadEdge} d={`M0,0 L0,${ROAD_H}`} />
            <path className={styles.road} d={`M0,0 L0,${ROAD_H}`} />
            <path className={styles.roadLine} d={`M0,0 L0,${ROAD_H}`} />
          </g>
        ) : (
          <g>
            <path className={styles.roadAheadBed} d={`M0,0 L0,${ROAD_H}`} opacity={0.5} />
            <path className={styles.roadAhead} d={`M0,0 L0,${ROAD_H}`} />
          </g>
        )}
      </svg>
      {fogged && (
        <div
          aria-hidden="true"
          className={styles.fog}
          style={{ background: 'color-mix(in srgb, var(--bg-page) 70%, transparent)' }}
        />
      )}
      <div className="relative -mt-6 flex w-full flex-col items-center">
        {code ? (
          <motion.div className="flex w-full justify-center" whileTap={reducedMotion ? undefined : { scale: 0.96 }} whileHover={reducedMotion ? undefined : { y: -2 }}>
            <Link
              href={verifyPath(code)}
              onClick={() => {
                playPathCue('nodeTap');
                playHaptic('medium', false);
              }}
              className="flex max-w-full flex-col items-center rounded-[20px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--warning)]"
            >
              {body}
            </Link>
          </motion.div>
        ) : (
          body
        )}
      </div>
    </section>
  );
}
