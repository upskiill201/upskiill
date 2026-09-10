'use client';

/**
 * Shared Duolingo-style building blocks for creator analytics.
 * Icon rule: lucide-react ONLY — no emoji anywhere.
 */

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Flame, CheckCircle2, PauseCircle, AlertTriangle, PlayCircle, Trophy,
  Crown, Lock, Clock, Gift, TrendingUp, TrendingDown, Star, AlarmClock,
  BadgeDollarSign, ChevronRight,
} from 'lucide-react';
import styles from './bits.module.css';

/* ─── Animated counter ─────────────────────────────────────────────── */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 700;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── KPI stat card ────────────────────────────────────────────────── */
export function StatCard({
  icon, label, value, accent = 'blue', sub,
}: {
  icon: React.ReactNode; label: string; value: number | string;
  accent?: 'green' | 'blue' | 'yellow' | 'red' | 'purple'; sub?: React.ReactNode;
}) {
  return (
    <motion.div
      className={`${styles.statCard} ${styles[`accent_${accent}`]}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <div className={styles.statIconWrap}>{icon}</div>
      <div className={styles.statTextGroup}>
        <span className={styles.statValue}>
          {typeof value === 'number' ? <CountUp value={value} /> : value}
        </span>
        <span className={styles.statLabel}>{label}</span>
        {sub && <span className={styles.statSub}>{sub}</span>}
      </div>
    </motion.div>
  );
}

/* ─── SVG trend chart (hand-built — no chart library) ──────────────── */
export function TrendChart({
  data, color = '#58CC02', label,
}: {
  data: { date: string; count: number }[];
  color?: string;
  label?: string;
}) {
  if (!data || data.length === 0) return null;
  const W = 320, H = 90, PAD = 6;
  const max = Math.max(1, ...data.map((d) => d.count));
  const stepX = (W - PAD * 2) / Math.max(1, data.length - 1);
  const points = data.map((d, i) => ({
    x: PAD + i * stepX,
    y: H - PAD - (d.count / max) * (H - PAD * 2),
    ...d,
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L ${points[points.length - 1].x.toFixed(1)} ${H - PAD} L ${PAD} ${H - PAD} Z`;
  const total = data.reduce((a, d) => a + d.count, 0);

  return (
    <div className={styles.trendWrap}>
      <div className={styles.trendHead}>
        <span className={styles.trendLabel}>{label}</span>
        <span className={styles.trendTotal} style={{ color }}>
          {total.toLocaleString()} total
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.trendSvg} preserveAspectRatio="none">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#E5E5E5" strokeWidth="2" />
        <motion.path
          d={area}
          fill={color}
          opacity={0.15}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        {points.map((p, i) =>
          p.count > 0 ? (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff" stroke={color} strokeWidth="2" />
          ) : null,
        )}
      </svg>
      <div className={styles.trendAxis}>
        <span>{formatDay(data[0]?.date)}</span>
        <span>{formatDay(data[data.length - 1]?.date)}</span>
      </div>
    </div>
  );
}

function formatDay(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function timeAgo(date?: string | Date | null): string {
  if (!date) return 'Never';
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ─── Student status chip (bucket) ─────────────────────────────────── */
const BUCKET_META: Record<string, { icon: React.ReactNode; label: string; cls: string }> = {
  CONSISTENT: { icon: <Flame size={13} />, label: 'Consistent', cls: styles.chipGreen },
  ON_TRACK: { icon: <CheckCircle2 size={13} />, label: 'On Track', cls: styles.chipBlue },
  SLIPPING: { icon: <PauseCircle size={13} />, label: 'Slipping', cls: styles.chipAmber },
  AT_RISK: { icon: <AlertTriangle size={13} />, label: 'At Risk', cls: styles.chipRed },
  NOT_STARTED: { icon: <PlayCircle size={13} />, label: 'Not Started', cls: styles.chipGray },
  COMPLETED: { icon: <Trophy size={13} />, label: 'Completed', cls: styles.chipPurple },
};

export function BucketChip({ bucket }: { bucket: string }) {
  const meta = BUCKET_META[bucket] ?? BUCKET_META.NOT_STARTED;
  return (
    <span className={`${styles.chip} ${meta.cls}`}>
      {meta.icon}
      <span>{meta.label}</span>
    </span>
  );
}

/* ─── Access chip (paid / preview / expired) ───────────────────────── */
const ACCESS_META: Record<string, { icon: React.ReactNode; label: string; cls: string }> = {
  PAID: { icon: <Crown size={12} />, label: 'Paid', cls: styles.chipGold },
  FREE_COURSE: { icon: <Gift size={12} />, label: 'Free Course', cls: styles.chipBlue },
  EXPIRED: { icon: <Clock size={12} />, label: 'Expired', cls: styles.chipGray },
  PREVIEW_ONLY: { icon: <Lock size={12} />, label: 'Preview Only', cls: styles.chipGray },
};

export function AccessChip({ access }: { access: string }) {
  const meta = ACCESS_META[access] ?? ACCESS_META.PREVIEW_ONLY;
  return (
    <span className={`${styles.chip} ${meta.cls}`}>
      {meta.icon}
      <span>{meta.label}</span>
    </span>
  );
}

/* ─── Avatar with initials fallback ────────────────────────────────── */
export function Avatar({ src, name, size = 40 }: { src?: string | null; name: string; size?: number }) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} width={size} height={size} className={styles.avatarImg} style={{ width: size, height: size }} />
  ) : (
    <span
      className={styles.avatarFallback}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </span>
  );
}

/* ─── Progress bar ─────────────────────────────────────────────────── */
export function ProgressBar({ pct, color = '#58CC02' }: { pct: number; color?: string }) {
  return (
    <div className={styles.pbTrack}>
      <motion.div
        className={styles.pbFill}
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        transition={{ duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }}
      />
    </div>
  );
}

/* ─── Skeleton / empty / error states ──────────────────────────────── */
const SHIMMER = 'shimmer';

function ShimmerBlock({ className }: { className?: string }) {
  return <div className={`${styles.shimmerBlock} ${className ?? ''}`} aria-hidden />;
}

/** Mirrors the Overview tab: 2 KPI rows + insight banner + 2 charts */
export function OverviewSkeleton() {
  return (
    <div className={styles.ovSkeleton}>
      {[0, 1].map((row) => (
        <div key={row} className={styles.skeletonGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.statCard}>
              <ShimmerBlock className={styles.skStatIcon} />
              <div className={styles.statTextGroup}>
                <ShimmerBlock className={styles.skStatValue} />
                <ShimmerBlock className={styles.skStatLabel} />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className={styles.skInsight}>
        <ShimmerBlock className={styles.skMascot} />
        <div className={styles.skInsightLines}>
          <ShimmerBlock className={styles.skTag} />
          <ShimmerBlock className={styles.skLineLong} />
          <ShimmerBlock className={styles.skLineShort} />
        </div>
      </div>
      <div className="grid gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
        <ShimmerBlock className={styles.skChart} />
        <ShimmerBlock className={styles.skChart} />
      </div>
    </div>
  );
}

/** Mirrors Journey: funnel stage rows with connectors + lesson strip */
export function JourneySkeleton() {
  return (
    <div>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.skFunnelStack}>
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <div className={styles.stageRow}>
              <ShimmerBlock className={styles.skStageIcon} />
              <ShimmerBlock className={styles.skStageLabel} />
              <ShimmerBlock className={styles.skStageCount} />
            </div>
            {i < 3 && (
              <div className={styles.skConnectorRow}>
                <ShimmerBlock className={styles.skConnectorPill} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <ShimmerBlock className={styles.skHeading2} />
      <div className={styles.retentionStrip}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.lessonCard}>
            <ShimmerBlock className={styles.skIndexBubble} />
            <ShimmerBlock className={styles.skLessonTitle} />
            <ShimmerBlock className={styles.skBarFull} />
            <ShimmerBlock className={styles.skBarHalf} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mirrors Lessons table: header row + stacked lesson metric cards */
export function LessonsSkeleton() {
  return (
    <div>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.lessonsList}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.lessonMetricRow}>
            <ShimmerBlock className={styles.skIndexBubble} />
            <div className={styles.skLessonMid}>
              <ShimmerBlock className={styles.skLessonTitleWide} />
              <ShimmerBlock className={styles.skBarThin} />
            </div>
            <ShimmerBlock className={styles.skMetricChip} />
            <ShimmerBlock className={styles.skMetricChip} />
            <ShimmerBlock className={styles.skMetricChip} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mirrors Students: filter chips + search bar + roster row anatomy */
export function StudentsSkeleton() {
  return (
    <div className={styles.studentsRoot}>
      <div className={styles.filterChips}>
        {Array.from({ length: 5 }).map((_, i) => (
          <ShimmerBlock key={i} className={styles.skFilterChip} />
        ))}
      </div>
      <ShimmerBlock className={styles.skSearchBar} />
      <div className={styles.roster}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.studentRow} style={{ cursor: 'default' }}>
            <ShimmerBlock className={styles.skAvatar} />
            <div className={styles.studentIdentity}>
              <ShimmerBlock className={styles.skNameLine} />
              <ShimmerBlock className={styles.skUserLine} />
            </div>
            <div className={styles.studentProgressCol}>
              <ShimmerBlock className={styles.skBarThin} />
              <ShimmerBlock className={styles.skUserLine} />
            </div>
            <ShimmerBlock className={styles.skChipPair} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mirrors the hub: header block + KPI band + course-card grid */
export function HubSkeleton() {
  return (
    <div className={styles.hubSkeleton}>
      <div className={styles.skHeaderRow}>
        <ShimmerBlock className={styles.skHeaderIcon} />
        <div>
          <ShimmerBlock className={styles.skTitleLine} />
          <ShimmerBlock className={styles.skSubLine} />
        </div>
      </div>
      <div className={styles.skBand}>
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.statCard}>
              <ShimmerBlock className={styles.skStatIcon} />
              <div className={styles.statTextGroup}>
                <ShimmerBlock className={styles.skStatValue} />
                <ShimmerBlock className={styles.skStatLabel} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          <ShimmerBlock className={styles.skChart} />
          <ShimmerBlock className={styles.skChart} />
        </div>
      </div>
      <ShimmerBlock className={styles.skHeading2} />
      <div className={styles.courseGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.courseCard} style={{ cursor: 'default' }}>
            <ShimmerBlock className={styles.skThumb} />
            <div className={styles.cardBody}>
              <ShimmerBlock className={styles.skPill} />
              <ShimmerBlock className={styles.skNameLine} />
              <ShimmerBlock className={styles.skUserLine} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonCard} />
      ))}
    </div>
  );
}

export function RowsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className={styles.rowsSkeleton}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeletonRow} />
      ))}
    </div>
  );
}

export function EmptyState({
  icon, title, body,
}: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className={styles.errorState}>
      <AlertTriangle size={22} />
      <p>{message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HUB TABS — shared pieces for the instructor-wide analytics tabs
   ══════════════════════════════════════════════════════════════════════ */

/* ─── Delta chip (this period vs previous) ─────────────────────────── */
export function DeltaChip({
  pct, invert = false, caption,
}: { pct?: number | null; invert?: boolean; caption?: string }) {
  const body =
    pct === null || pct === undefined ? (
      <span className={`${styles.deltaChip} ${styles.deltaFlat}`}>no data yet</span>
    ) : pct === 0 ? (
      <span className={`${styles.deltaChip} ${styles.deltaFlat}`}>steady</span>
    ) : (
      (() => {
        const up = pct > 0;
        const good = invert ? !up : up;
        return (
          <span
            className={`${styles.deltaChip} ${good ? styles.deltaGood : styles.deltaBad}`}
            title={caption ?? 'vs the previous period'}
          >
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(pct)}%
          </span>
        );
      })()
    );
  return body;
}

/* ─── Star rating display ──────────────────────────────────────────── */
export function Stars({ rating, size = 14 }: { rating: number | null; size?: number }) {
  if (rating === null) {
    return <span className={styles.starsMuted}>No ratings yet</span>;
  }
  return (
    <span className={styles.starsRow} title={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(rating) ? styles.starFull : styles.starEmpty}
        />
      ))}
    </span>
  );
}

/* ─── Insight cards (rule-engine feed) ─────────────────────────────── */
export interface InsightCardShape {
  id: string;
  kind: 'win' | 'watch' | 'risk';
  icon: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
}

const INSIGHT_ICONS: Record<string, React.ReactNode> = {
  'trending-up': <TrendingUp size={18} />,
  'trending-down': <TrendingDown size={18} />,
  'alert-triangle': <AlertTriangle size={18} />,
  lock: <Lock size={18} />,
  crown: <Crown size={18} />,
  'alarm-clock': <AlarmClock size={18} />,
  'play-circle': <PlayCircle size={18} />,
  star: <Star size={18} />,
  'badge-dollar-sign': <BadgeDollarSign size={18} />,
};

const KIND_TAG: Record<InsightCardShape['kind'], { label: string; cls: string }> = {
  win: { label: "What's working", cls: styles.insTagWin },
  watch: { label: 'Watch', cls: styles.insTagWatch },
  risk: { label: 'Needs attention', cls: styles.insTagRisk },
};

export function InsightCardView({ card }: { card: InsightCardShape }) {
  const kindCls =
    card.kind === 'win'
      ? styles.insWin
      : card.kind === 'watch'
        ? styles.insWatch
        : styles.insRisk;
  const tag = KIND_TAG[card.kind];
  const inner = (
    <>
      <div className={`${styles.insIconCircle} ${kindCls}`}>
        {INSIGHT_ICONS[card.icon] ?? <AlertTriangle size={18} />}
      </div>
      <div className={styles.insContent}>
        <div className={styles.insMetaRow}>
          <span className={`${styles.insTag} ${tag.cls}`}>{tag.label}</span>
        </div>
        <h4 className={styles.insTitle}>{card.title}</h4>
        <p className={styles.insBody}>{card.body}</p>
        {card.href && card.cta && (
          <span className={styles.insCta}>
            {card.cta}
            <ChevronRight size={14} />
          </span>
        )}
      </div>
    </>
  );

  if (card.href) {
    return (
      <Link href={card.href} className={`${styles.insCard} ${kindCls}`} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    );
  }
  return <div className={`${styles.insCard} ${kindCls}`}>{inner}</div>;
}

/* ─── Retention cohort row (D1 / D7 / D30) ─────────────────────────── */
export function RetentionRow({
  label, data,
}: { label: string; data: { cohort: number; retainedPct: number } | null }) {
  return (
    <div className={styles.retRow}>
      <span className={styles.retLabel}>{label}</span>
      {data ? (
        <>
          <div className={styles.retTrack}>
            <motion.div
              className={styles.retFill}
              style={{
                background:
                  data.retainedPct >= 40 ? '#58cc02' : data.retainedPct >= 20 ? '#ffc800' : '#ff4b4b',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${data.retainedPct}%` }}
              transition={{ duration: 0.7 }}
            />
          </div>
          <span className={styles.retPct}>{data.retainedPct}%</span>
          <span className={styles.retCohort}>of {data.cohort}</span>
        </>
      ) : (
        <>
          <div className={`${styles.retTrack} ${styles.retTrackEmpty}`} />
          <span className={styles.retMuted}>cohort too young</span>
        </>
      )}
    </div>
  );
}

/* ─── Horizontal distribution bars ─────────────────────────────────── */
export function DistBars({
  items,
}: { items: { label: string; count: number; color?: string }[] }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className={styles.distWrap}>
      {items.map((item) => (
        <div key={item.label} className={styles.distRow}>
          <span className={styles.distLabel}>{item.label}</span>
          <div className={styles.distTrack}>
            <motion.div
              className={styles.distFill}
              style={{ background: item.color ?? '#1cb0f6' }}
              initial={{ width: 0 }}
              animate={{ width: `${(item.count / max) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className={styles.distCount}>{item.count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   LAYOUT-TRUE SKELETONS for each hub tab
   ══════════════════════════════════════════════════════════════════════ */

function SkStat({ wide = false }: { wide?: boolean }) {
  return (
    <div className={styles.statCard} style={wide ? { gridColumn: 'span 2' } : undefined}>
      <ShimmerBlock className={styles.skStatIcon} />
      <div className={styles.statTextGroup}>
        <ShimmerBlock className={styles.skStatValue} />
        <ShimmerBlock className={styles.skStatLabel} />
      </div>
    </div>
  );
}

function SkTileRow({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerBlock key={i} className={styles.skTile} />
      ))}
    </div>
  );
}

/** Overview tab: KPI grid + two charts + top-courses list */
export function HubOverviewSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkStat key={i} />
        ))}
      </div>
      <div className={styles.skChartsRow}>
        <ShimmerBlock className={styles.skChart} />
        <ShimmerBlock className={styles.skChart} />
      </div>
      <ShimmerBlock className={styles.skHeading2} />
      {[0, 1, 2].map((i) => (
        <ShimmerBlock key={i} className={styles.skListRow} />
      ))}
    </div>
  );
}

/** Learners tab: totals grid + DAU/WAU/MAU tiles + charts + retention panel */
export function LearnersSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkStat key={i} />
        ))}
      </div>
      <SkTileRow count={3} />
      <div className={styles.skChartsRow}>
        <ShimmerBlock className={styles.skChart} />
        <ShimmerBlock className={styles.skChart} />
      </div>
      <ShimmerBlock className={styles.skHeading2} />
      {[0, 1, 2].map((i) => (
        <ShimmerBlock key={i} className={styles.skListRow} />
      ))}
    </div>
  );
}

/** Engagement tab: three trend charts + streak dist + weekday heat + tiles */
export function EngagementSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      <SkTileRow count={3} />
      <div className={styles.skChartsRow}>
        <ShimmerBlock className={styles.skChart} />
        <ShimmerBlock className={styles.skChart} />
      </div>
      <div className={styles.skTwoCol}>
        <ShimmerBlock className={styles.skPanelBox} />
        <ShimmerBlock className={styles.skPanelBox} />
      </div>
    </div>
  );
}

/** Courses tab: sort chips + course metric rows */
export function CoursesTableSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.filterChips}>
        {Array.from({ length: 3 }).map((_, i) => (
          <ShimmerBlock key={i} className={styles.skFilterChip} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <ShimmerBlock key={i} className={styles.skCourseRow} />
      ))}
    </div>
  );
}

/** Revenue tab: KPI grid + big chart + ranked revenue bars */
export function RevenueSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkStat key={i} />
        ))}
      </div>
      <ShimmerBlock className={styles.skChartBig} />
      <ShimmerBlock className={styles.skHeading2} />
      {[0, 1, 2].map((i) => (
        <ShimmerBlock key={i} className={styles.skListRow} />
      ))}
    </div>
  );
}

/** Feedback tab: rating header + distribution + review rows */
export function FeedbackSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      <div className={styles.skRatingHead}>
        <ShimmerBlock className={styles.skMascot} />
        <div className={styles.skInsightLines}>
          <ShimmerBlock className={styles.skStatValue} />
          <ShimmerBlock className={styles.skLineShort} />
        </div>
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <ShimmerBlock key={i} className={styles.skBarThin} />
      ))}
      <ShimmerBlock className={styles.skHeading2} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={styles.studentRow} style={{ cursor: 'default' }}>
          <ShimmerBlock className={styles.skAvatar} />
          <div className={styles.skLessonMid}>
            <ShimmerBlock className={styles.skNameLine} />
            <ShimmerBlock className={styles.skUserLine} />
          </div>
          <ShimmerBlock className={styles.skChipPair} />
        </div>
      ))}
    </div>
  );
}

/** Insights tab: stacked insight cards */
export function InsightsSkeleton() {
  return (
    <div className={styles.hubTabSkeleton}>
      <ShimmerBlock className={styles.skHeading} />
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.skInsight}>
          <ShimmerBlock className={styles.skStageIcon} />
          <div className={styles.skInsightLines}>
            <ShimmerBlock className={styles.skTag} />
            <ShimmerBlock className={styles.skLineLong} />
            <ShimmerBlock className={styles.skLineShort} />
          </div>
        </div>
      ))}
    </div>
  );
}
