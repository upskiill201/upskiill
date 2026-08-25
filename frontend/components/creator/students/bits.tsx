'use client';

/**
 * Students-specific building blocks on top of the shared analytics bits.
 * lucide-react icons only — no emoji anywhere.
 */

import React from 'react';
import {
  BookOpen, CheckCircle2, CircleDashed,
  Flag, GraduationCap, Rocket, Target,
} from 'lucide-react';
import type { AttentionReason, JourneyEvent, LearnerSegment } from './types';
import styles from './students.module.css';

/* ─── status chip ─────────────────────────────────────────────────────── */

export const SEGMENT_LABELS: Record<LearnerSegment, string> = {
  NEW: 'New',
  ACTIVE: 'Active',
  HIGHLY_ENGAGED: 'Highly engaged',
  NEAR_COMPLETION: 'Near completion',
  STRUGGLING: 'Struggling',
  HIGH_PERFORMER: 'High performer',
  AT_RISK: 'At risk',
  INACTIVE: 'Inactive',
  COMPLETED: 'Completed',
};

export function StatusChip({ segment }: { segment: LearnerSegment }) {
  const cls =
    segment === 'AT_RISK' || segment === 'STRUGGLING'
      ? styles.segRed
      : segment === 'INACTIVE'
        ? styles.segGray
        : segment === 'HIGHLY_ENGAGED' || segment === 'HIGH_PERFORMER'
          ? styles.segPurple
          : segment === 'NEAR_COMPLETION'
            ? styles.segAmber
            : segment === 'NEW'
              ? styles.segBlue
              : styles.segGreen; // ACTIVE / COMPLETED
  return <span className={`${styles.segChip} ${cls}`}>{SEGMENT_LABELS[segment]}</span>;
}

export const ATTENTION_LABELS: Record<AttentionReason, string> = {
  GONE_QUIET: 'Went quiet',
  STUCK_LESSON: 'Stuck on a lesson',
  FAILING_QUIZ: 'Retrying a quiz',
  ALMOST_THERE: 'Almost done',
};

export function AttentionChip({ reason }: { reason: AttentionReason }) {
  return (
    <span className={`${styles.attChip} ${reason === 'ALMOST_THERE' ? styles.attGood : styles.attBad}`}>
      {ATTENTION_LABELS[reason]}
    </span>
  );
}

/* ─── behavior visuals ────────────────────────────────────────────────── */

export function WeekdayBars({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className={styles.wdBars}>
      {data.map((d) => (
        <div key={d.label} className={styles.wdCol}>
          <div className={styles.wdTrack}>
            <div
              className={styles.wdFill}
              style={{ height: `${Math.round((d.count / max) * 100)}%` }}
              title={`${d.label}: ${d.count} active ${d.count === 1 ? 'day' : 'days'}`}
            />
          </div>
          <span className={styles.wdLabel}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function HourHeatStrip({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className={styles.hourStrip}>
      {data.map((d) => (
        <div
          key={d.label}
          className={styles.hourCell}
          style={{
            background:
              d.count === 0 ? '#f0f2f5' : `rgba(28, 176, 246, ${0.25 + (d.count / max) * 0.75})`,
            color: d.count / max > 0.55 ? '#ffffff' : '#3c3c3c',
          }}
          title={`${d.label} UTC — ${d.count} lesson${d.count === 1 ? '' : 's'}`}
        >
          <span>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Simple inline SVG sparkline for quiz-score timelines (0–100 fixed scale). */
export function QuizSparkline({ points }: { points: { score: number }[] }) {
  if (points.length < 2) return null;
  const w = 320;
  const h = 72;
  const stepX = w / (points.length - 1);
  const coords = points.map((p, i) => [i * stepX, h - (p.score / 100) * h] as const);
  const path = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={styles.quizSvg} preserveAspectRatio="none">
      <line x1="0" y1={h - 0.7 * h} x2={w} y2={h - 0.7 * h} stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" />
      <path d={path} fill="none" stroke="#1cb0f6" strokeWidth="2.5" strokeLinecap="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#1cb0f6" />
      ))}
    </svg>
  );
}

export function WhereTheyStoppedCallout({
  courseTitle,
  lessonTitle,
  progressPct,
}: {
  courseTitle: string;
  lessonTitle: string | null;
  progressPct: number;
}) {
  if (!lessonTitle) return null;
  return (
    <div className={styles.stoppedBox}>
      <Flag size={15} />
      <span>
        Stopped at <strong>{lessonTitle}</strong> in {courseTitle} · {progressPct}% done
      </span>
    </div>
  );
}

/* ─── journey ─────────────────────────────────────────────────────────── */

const JOURNEY_ICONS: Record<JourneyEvent['kind'], React.ReactNode> = {
  ENROLLED: <Rocket size={14} />,
  STARTED: <BookOpen size={14} />,
  LESSON_COMPLETED: <CheckCircle2 size={14} />,
  QUIZ_RESULT: <Target size={14} />,
  COURSE_COMPLETED: <GraduationCap size={14} />,
  STOPPED: <CircleDashed size={14} />,
};

const JOURNEY_COLORS: Record<JourneyEvent['kind'], string> = {
  ENROLLED: '#ce82ff',
  STARTED: '#1cb0f6',
  LESSON_COMPLETED: '#58cc02',
  QUIZ_RESULT: '#1cb0f6',
  COURSE_COMPLETED: '#ffc800',
  STOPPED: '#afafaf',
};

export function JourneyTimeline({ events }: { events: JourneyEvent[] }) {
  return (
    <div className={styles.journeyList}>
      {events.map((e, i) => (
        <div key={i} className={styles.journeyRow}>
          <span
            className={styles.journeyDot}
            style={{ background: JOURNEY_COLORS[e.kind], color: '#fff' }}
          >
            {JOURNEY_ICONS[e.kind]}
          </span>
          <div className={styles.journeyBody}>
            <span className={styles.journeyLabel}>{e.label}</span>
            {e.detail && <span className={styles.journeyDetail}>{e.detail}</span>}
          </div>
          <span className={styles.journeyWhen}>
            {new Date(e.at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── skeletons (layout-true) ─────────────────────────────────────────── */

function Sk({ w, h, r = 8 }: { w: string | number; h: number; r?: number }) {
  return <div className={styles.skBlock} style={{ width: w, height: h, borderRadius: r }} />;
}

export function StudentsOverviewSkeleton() {
  return (
    <div className={styles.skelStack}>
      <div className={styles.kpiGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.panelBox}>
            <Sk w={64} h={11} r={6} />
            <Sk w={90} h={26} r={8} />
            <Sk w={120} h={10} r={5} />
          </div>
        ))}
      </div>
      <div className={styles.panelBox}>
        <Sk w={180} h={12} r={6} />
        <Sk w="100%" h={140} r={12} />
      </div>
      <div className={styles.twoCol}>
        <div className={styles.panelBox}><Sk w={150} h={12} r={6} /><Sk w="100%" h={110} r={12} /></div>
        <div className={styles.panelBox}><Sk w={150} h={12} r={6} /><Sk w="100%" h={110} r={12} /></div>
      </div>
    </div>
  );
}

export function StudentsAttentionSkeleton() {
  return (
    <div className={styles.skelStack}>
      {[0, 1].map((k) => (
        <div key={k} className={styles.panelBox}>
          <Sk w={200} h={13} r={6} />
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.rowLike}>
              <Sk w={42} h={42} r={21} />
              <Sk w={160} h={13} r={6} />
              <Sk w={90} h={22} r={11} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StudentDetailSkeleton() {
  return (
    <div className={styles.skelStack}>
      <div className={styles.detailHeader}>
        <Sk w={64} h={64} r={32} />
        <div>
          <Sk w={190} h={20} r={8} />
          <Sk w={130} h={12} r={6} />
        </div>
      </div>
      <div className={styles.kpiGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.panelBox}><Sk w={70} h={11} r={6} /><Sk w={80} h={24} r={8} /></div>
        ))}
      </div>
      <div className={styles.panelBox}><Sk w={170} h={12} r={6} /><Sk w="100%" h={120} r={12} /></div>
    </div>
  );
}
