'use client';

/**
 * The course path as learners walk it, annotated for the creator: each unit
 * banner, each lesson node with how many finished it out of those who opened
 * it, where journeys stall ("stopped here"), who is on it right now, and a
 * flag when a lesson is a drop-off, too hard, or runs long. Tap a lesson for
 * the close-up.
 */

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { AlertTriangle, ChevronRight, Clock, Lock, Target, TrendingDown } from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import type { CoursePulse, PathLesson } from '@/lib/creator/studio';
import { Faces, Pill, studio as s } from '../StudioParts';
import p from './path.module.css';

const UNIT_TONES = ['var(--color-brand)', 'var(--success-green)', 'var(--brand-purple)', 'var(--warning)'];

const FLAG: Record<NonNullable<PathLesson['flag']>, { label: string; tone: string; icon: typeof AlertTriangle }> = {
  drop: { label: 'Biggest drop-off', tone: 'var(--error-red)', icon: TrendingDown },
  hard: { label: 'Tough exercises', tone: 'var(--warning)', icon: Target },
  slow: { label: 'Runs long', tone: 'var(--brand-purple)', icon: Clock },
};

export function CoursePathMap({ pulse }: { pulse: CoursePulse }) {
  const { units } = pulse.path;
  const courseId = pulse.course.id;
  // The first locked lesson of a paid course: where the paywall sits.
  const paywallId = pulse.course.isPaid
    ? units.flatMap((u) => u.lessons).find((l) => !l.isFree)?.id ?? null
    : null;
  if (units.length === 0) {
    return (
      <div className={s.empty}>
        <strong>No published lessons yet</strong>
        Publish a lesson and its path shows up here.
      </div>
    );
  }
  return (
    <div className={p.path}>
      {units.map((unit) => {
        const tone = UNIT_TONES[unit.index % UNIT_TONES.length];
        return (
          <div key={unit.id} className={p.unit} style={{ '--unit': tone } as CSSProperties}>
            <div className={p.banner}>
              <span className={p.bannerKicker}>Unit {unit.index + 1}</span>
              <span className={p.bannerTitle}>{unit.title}</span>
            </div>
            <ol className={p.lessons}>
              {unit.lessons.map((l) => (
                <LessonNode
                  key={l.id}
                  lesson={l}
                  courseId={courseId}
                  learners={pulse.totals.learners}
                  paywall={l.id === paywallId}
                />
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

function LessonNode({
  lesson: l,
  courseId,
  learners,
  paywall,
}: {
  lesson: PathLesson;
  courseId: string;
  learners: number;
  paywall: boolean;
}) {
  const flag = l.flag ? FLAG[l.flag] : null;
  const rate = l.finishRatePct;
  const first = l.index === 0;
  const doneShare = learners > 0 ? Math.round((l.finished / learners) * 100) : 0;
  return (
    <li className={p.node}>
      <span className={p.dot} data-state={l.finished > 0 ? 'done' : l.opened > 0 ? 'open' : 'none'} aria-hidden="true">
        {l.index + 1}
      </span>
      <Link
        href={`/creator/analytics/${courseId}/lessons/${l.id}`}
        className={p.card}
        onClick={() => playSound('nodeTap')}
        data-flag={l.flag ?? undefined}
        style={flag ? ({ '--flag': flag.tone } as CSSProperties) : undefined}
      >
        <span className={p.cardTop}>
          <span className={p.lessonTitle}>{l.title}</span>
          {l.isFree && <Pill tone="var(--success-green)">Free</Pill>}
          {paywall && (
            <Pill tone="var(--text-muted)">
              <Lock size={11} aria-hidden="true" /> Paywall
            </Pill>
          )}
          <ChevronRight size={18} className={p.chev} aria-hidden="true" />
        </span>

        <span className={p.stats}>
          <span className={p.stat}>
            <strong>{l.finished}</strong> finished
            {l.opened > 0 && rate !== null && <em> · {rate}% of {l.opened} who opened it</em>}
          </span>
          {l.avgAccuracyPct !== null && (
            <span className={p.stat}>
              <strong>{l.avgAccuracyPct}%</strong> first-try right
            </span>
          )}
          {l.medianMinutes !== null && (
            <span className={p.stat}>
              <strong>{Math.round(l.medianMinutes)} min</strong>
              {l.estMinutes ? <em> · planned {l.estMinutes}</em> : null}
            </span>
          )}
        </span>

        <span className={p.meter} aria-label={`${doneShare}% of all learners finished this lesson`}>
          <span className={p.meterFill} style={{ width: `${doneShare}%` }} />
        </span>

        {(flag || l.stoppedHere > 0 || l.hereNowCount > 0) && (
          <span className={p.foot}>
            {flag && (
              <Pill tone={flag.tone}>
                <flag.icon size={11} aria-hidden="true" /> {flag.label}
              </Pill>
            )}
            {l.stoppedHere > 0 && (
              <span className={p.stopped}>
                {l.stoppedHere} {first ? 'haven’t started' : 'stopped here'}
              </span>
            )}
            {l.hereNowCount > 0 && (
              <span className={p.here}>
                <Faces faces={l.hereNow} total={l.hereNowCount} />
                on it now
              </span>
            )}
          </span>
        )}
      </Link>
    </li>
  );
}
