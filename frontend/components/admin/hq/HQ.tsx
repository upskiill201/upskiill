'use client';

/**
 * Teyro HQ dashboard pieces — shared by Overview, Learning, Creators at a
 * glance and Subscribers. Chunky Duolingo tiles, one tone per metric, every
 * number with its change against the period before. Styles: hq.module.css.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Minus } from 'lucide-react';
import { TEY_POSE_SRC, type TeyPose } from '@/components/lesson/TeySays';
import { Columns } from '@/components/studio/Charts';
import h from './hq.module.css';

export { h as hq };

/* ── numbers ──────────────────────────────────────────────────────────── */

export interface Stat {
  value: number;
  prev: number;
  deltaPct: number;
}

export type Range = 7 | 30 | 90;

export function compact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (Math.abs(n) >= 10_000) return `${Math.round(n / 1000)}K`;
  if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toLocaleString();
}

export function money(minor: number, cents = false): string {
  const v = minor / 100;
  // Whole dollars stay whole; anything with cents shows both digits (.50, never .5).
  const withCents = cents || (v < 1000 && !Number.isInteger(v));
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: withCents ? 2 : 0, maximumFractionDigits: withCents ? 2 : 0 })}`;
}

export function ago(iso: string | Date | null | undefined): string {
  if (!iso) return '—';
  const t = new Date(iso).getTime();
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m}m ago`;
  const hrs = Math.round(m / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const d = Math.round(hrs / 24);
  if (d < 14) return `${d}d ago`;
  return new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function greeting(): string {
  const hr = new Date().getHours();
  return hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
}

/* ── layout ───────────────────────────────────────────────────────────── */

export function Hero({ pose, title, sub, right }: { pose: TeyPose; title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <header className={h.hero}>
      <Image src={TEY_POSE_SRC[pose]} alt="" width={96} height={115} className={h.heroTey} priority />
      <div className={h.heroText}>
        <h1 className={h.heroTitle}>{title}</h1>
        {sub && <p className={h.heroSub}>{sub}</p>}
      </div>
      {right && <div className={h.heroRight}>{right}</div>}
    </header>
  );
}

export function RangeSwitch({ value, onChange }: { value: Range; onChange: (r: Range) => void }) {
  const opts: { v: Range; label: string }[] = [
    { v: 7, label: '7 days' },
    { v: 30, label: '30 days' },
    { v: 90, label: '90 days' },
  ];
  return (
    <div className={h.seg} role="radiogroup" aria-label="Time range">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          className={`${h.segBtn} ${value === o.v ? h.segOn : ''}`}
          onClick={() => onChange(o.v)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Panel({
  title,
  note,
  action,
  children,
  flush = false,
}: {
  title: string;
  note?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  flush?: boolean;
}) {
  return (
    <section className={`${h.panel} ${flush ? h.panelFlush : ''}`}>
      <div className={h.panelHead}>
        <div>
          <h2 className={h.panelTitle}>{title}</h2>
          {note && <p className={h.panelNote}>{note}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={h.more}>
      {children} <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}

/* ── tiles ────────────────────────────────────────────────────────────── */

export function Delta({ pct, upIsGood = true, label = 'vs previous' }: { pct: number; upIsGood?: boolean; label?: string }) {
  const tone = pct === 0 ? h.flat : (pct > 0) === upIsGood ? h.up : h.down;
  const Icon = pct === 0 ? Minus : pct > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`${h.delta} ${tone}`}>
      <Icon size={14} strokeWidth={3} aria-hidden="true" />
      {pct > 0 ? '+' : ''}
      {pct}% <span className={h.deltaLabel}>{label}</span>
    </span>
  );
}

export function Tile({
  icon,
  tone,
  label,
  value,
  stat,
  foot,
  href,
  upIsGood,
}: {
  icon: ReactNode;
  tone: string;
  label: string;
  value: ReactNode;
  stat?: Stat;
  foot?: ReactNode;
  href?: string;
  upIsGood?: boolean;
}) {
  const body = (
    <>
      <span className={h.tileTop}>
        <span className={h.tileIcon} aria-hidden="true">
          {icon}
        </span>
        <span className={h.tileLabel}>{label}</span>
      </span>
      <span className={h.tileValue}>{value}</span>
      <span className={h.tileFoot}>
        {stat && <Delta pct={stat.deltaPct} upIsGood={upIsGood} />}
        {foot}
      </span>
    </>
  );
  const style = { '--tone': tone } as CSSProperties;
  return href ? (
    <Link href={href} className={`${h.tile} ${h.tileLink}`} style={style}>
      {body}
    </Link>
  ) : (
    <div className={h.tile} style={style}>
      {body}
    </div>
  );
}

/* ── charts ───────────────────────────────────────────────────────────── */

export interface SeriesTab {
  key: string;
  label: string;
  tone: string;
  unit: (n: number) => string;
  points: { day: string; value: number }[];
  /** Headline over the chart; defaults to the sum. Daily actives must not be summed. */
  summary?: (points: { day: string; value: number }[]) => string;
}

export function SeriesChart({ tabs, title }: { tabs: SeriesTab[]; title: string }) {
  const [k, setK] = useState(tabs[0].key);
  const tab = tabs.find((t) => t.key === k) ?? tabs[0];
  const many = tab.points.length > 31;
  const points = tab.points.map((p, i) => {
    const d = new Date(`${p.day}T12:00:00Z`);
    const showAxis = many ? i % 14 === 0 : tab.points.length > 10 ? i % 5 === 0 : true;
    return {
      key: p.day,
      // Day numbers only: a bar slot is too narrow for "Sep 12". The span
      // under the chart names the months.
      axis: showAxis ? String(d.getUTCDate()) : '',
      label: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      value: p.value,
    };
  });
  const total = tab.points.reduce((s, p) => s + p.value, 0);
  const fmt = (day?: string) =>
    day ? new Date(`${day}T12:00:00Z`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';
  const span = `${fmt(tab.points[0]?.day)} – ${fmt(tab.points[tab.points.length - 1]?.day)}`;
  return (
    <Panel
      title={title}
      action={
        tabs.length > 1 ? (
          <div className={h.seg} role="tablist" aria-label="Series">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={t.key === tab.key}
                className={`${h.segBtn} ${t.key === tab.key ? h.segOn : ''}`}
                onClick={() => setK(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : undefined
      }
    >
      <p className={h.chartTotal}>
        <strong>{tab.summary ? tab.summary(tab.points) : tab.unit(total)}</strong> · {span}
      </p>
      <Columns points={points} unit={tab.unit} caption={`${tab.label} per day`} tone={tab.tone} height={180} />
    </Panel>
  );
}

/** Horizontal bars with the value at the end: distributions and rankings. */
export function Bars({ rows, tone, unit = (n) => compact(n) }: { rows: { label: string; value: number }[]; tone: string; unit?: (n: number) => string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className={h.bars} style={{ '--tone': tone } as CSSProperties}>
      {rows.map((r) => (
        <li key={r.label} className={h.barRow}>
          <span className={h.barLabel} title={r.label}>
            {r.label}
          </span>
          <span className={h.barTrack}>
            <span className={h.barFill} style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className={h.barValue}>{unit(r.value)}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── funnel, cohorts, pipeline ────────────────────────────────────────── */

export function Funnel({ steps }: { steps: { key: string; label: string; count: number; pctOfSignups: number }[] }) {
  return (
    <ol className={h.funnel}>
      {steps.map((s, i) => {
        const prev = i > 0 ? steps[i - 1].count : null;
        const drop = prev !== null && prev > 0 ? Math.round(((prev - s.count) / prev) * 100) : null;
        return (
          <li key={s.key} className={h.funnelRow}>
            <span className={h.funnelLabel}>{s.label}</span>
            <span className={h.funnelTrack}>
              <span className={h.funnelFill} style={{ width: `${Math.max(s.pctOfSignups, s.count > 0 ? 3 : 0)}%` }}>
                {s.pctOfSignups}%
              </span>
            </span>
            <span className={h.funnelCount}>
              {compact(s.count)}
              {drop !== null && drop > 0 && <span className={h.funnelDrop}>−{drop}%</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function CohortGrid({ rows }: { rows: { week: string; size: number; weeks: (number | null)[] }[] }) {
  if (rows.length === 0) return <p className={h.empty}>No signups in the last 8 weeks yet.</p>;
  return (
    <div className={h.cohortWrap}>
      <table className={h.cohort}>
        <thead>
          <tr>
            <th scope="col">Signed up the week of</th>
            <th scope="col">People</th>
            {[1, 2, 3, 4].map((w) => (
              <th key={w} scope="col">
                Week {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.week}>
              <th scope="row">{new Date(`${r.week}T12:00:00Z`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</th>
              <td className={h.cohortSize}>{r.size}</td>
              {r.weeks.map((v, i) => (
                <td key={i}>
                  {v === null ? (
                    <span className={h.cohortPending}>…</span>
                  ) : (
                    <span className={h.cohortCell} style={{ '--a': `${Math.min(100, v)}%` } as CSSProperties}>
                      {v}%
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pipeline({ stages }: { stages: { label: string; count: number; tone: string; href?: string }[] }) {
  return (
    <ol className={h.pipeline}>
      {stages.map((s) => {
        const inner = (
          <>
            <span className={h.pipeCount}>{compact(s.count)}</span>
            <span className={h.pipeLabel}>{s.label}</span>
          </>
        );
        return (
          <li key={s.label} className={h.pipeStep} style={{ '--tone': s.tone } as CSSProperties}>
            {s.href ? (
              <Link href={s.href} className={h.pipeInner}>
                {inner}
              </Link>
            ) : (
              <span className={h.pipeInner}>{inner}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ── people ───────────────────────────────────────────────────────────── */

export function Face({ person, size = 36 }: { person: { fullName: string; avatarUrl: string | null }; size?: number }) {
  const initials = person.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  return (
    <span className={h.face} style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {person.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- user uploads on arbitrary hosts
        <img src={person.avatarUrl} alt="" loading="lazy" />
      ) : (
        initials
      )}
    </span>
  );
}

/* ── states ───────────────────────────────────────────────────────────── */

export function Skeleton() {
  return (
    <div className={h.page} aria-busy="true" aria-label="Loading">
      <div className={h.skel} style={{ height: 110 }} />
      <div className={h.tiles}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={h.skel} style={{ height: 124 }} />
        ))}
      </div>
      <div className={h.skel} style={{ height: 260 }} />
    </div>
  );
}

export function LoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={h.error} role="alert">
      <span>These numbers didn’t load. The database may have dropped a connection for a moment.</span>
      <button type="button" className={h.retry} onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
