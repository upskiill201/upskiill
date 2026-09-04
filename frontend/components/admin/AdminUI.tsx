'use client';

import useSWR from 'swr';
import styles from './AdminUI.module.css';

/** All admin reads go through the same cookie-authenticated fetcher. */
export const adminFetcher = async (url: string) => {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`) as Error & {
      status?: number;
    };
    err.status = res.status;
    throw err;
  }
  return res.json();
};

/**
 * Shared SWR config for the dashboard.
 *
 * Deliberately no polling: this is an operational view someone reads, not a
 * live wallboard, and a 5-second poll across six panels is a lot of load for
 * numbers that move on a one-minute tick.
 */
export function useAdminData<T>(path: string | null) {
  return useSWR<T>(path, adminFetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 15_000,
  });
}

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
    </header>
  );
}

export function Card({
  title,
  icon,
  children,
}: {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.card}>
      {title && (
        <h2 className={styles.cardTitle}>
          {icon}
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export type MetricAccent = 'none' | 'good' | 'warn' | 'bad';

export function Metric({
  label,
  value,
  hint,
  accent = 'none',
  icon,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  accent?: MetricAccent;
  icon?: React.ReactNode;
}) {
  const accentClass =
    accent === 'good'
      ? styles.metricAccentGood
      : accent === 'warn'
        ? styles.metricAccentWarn
        : accent === 'bad'
          ? styles.metricAccentBad
          : '';

  return (
    <div className={`${styles.metric} ${accentClass}`}>
      <span className={styles.metricLabel}>
        {icon}
        {label}
      </span>
      <span className={styles.metricValue}>{value}</span>
      {hint && <span className={styles.metricHint}>{hint}</span>}
    </div>
  );
}

/**
 * Horizontal distribution. Scaled to the largest value rather than the total,
 * so a long tail stays legible instead of collapsing into invisible slivers.
 */
export function BarList({
  data,
  variant = 'brand',
  emptyLabel = 'Nothing yet',
}: {
  data: Record<string, number>;
  variant?: 'brand' | 'muted' | 'warn';
  emptyLabel?: string;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) {
    return <div className={styles.empty}>{emptyLabel}</div>;
  }

  const max = Math.max(...entries.map(([, n]) => n), 1);
  const fillClass =
    variant === 'muted'
      ? styles.barFillMuted
      : variant === 'warn'
        ? styles.barFillWarn
        : '';

  return (
    <div className={styles.bars}>
      {entries.map(([label, count]) => (
        <div key={label} className={styles.barRow}>
          <span className={styles.barLabel} title={label}>
            {humanize(label)}
          </span>
          <span className={styles.barTrack}>
            <span
              className={`${styles.barFill} ${fillClass}`}
              style={{ width: `${Math.max(2, (count / max) * 100)}%` }}
            />
          </span>
          <span className={styles.barValue}>{count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'good' | 'warn' | 'bad' | 'brand';
}) {
  const toneClass = {
    neutral: styles.pillNeutral,
    good: styles.pillGood,
    warn: styles.pillWarn,
    bad: styles.pillBad,
    brand: styles.pillBrand,
  }[tone];

  return <span className={`${styles.pill} ${toneClass}`}>{children}</span>;
}

/** Maps a status string to a colour without every page repeating the mapping. */
export function statusTone(
  status: string,
): 'neutral' | 'good' | 'warn' | 'bad' | 'brand' {
  switch (status) {
    case 'SENT':
      return 'good';
    case 'FAILED':
      return 'bad';
    case 'SUPPRESSED':
    case 'SKIPPED':
    case 'CANCELLED':
      return 'warn';
    case 'PENDING':
    case 'CLAIMED':
      return 'brand';
    default:
      return 'neutral';
  }
}

export function DataTable({
  columns,
  children,
}: {
  columns: string[];
  children: React.ReactNode;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Loading() {
  return (
    <div className={styles.grid}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={styles.skeleton} />
      ))}
    </div>
  );
}

export function ErrorState({ error }: { error: Error & { status?: number } }) {
  const message =
    error.status === 403
      ? 'Your account does not have admin access.'
      : error.message;
  return <div className={styles.error}>Could not load: {message}</div>;
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className={styles.empty}>{children}</div>;
}

export function Banner({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warn';
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.banner} ${tone === 'warn' ? styles.bannerWarn : ''}`}
    >
      {children}
    </div>
  );
}

/** STREAK_AT_RISK → "Streak at risk". Keeps enum noise out of the UI. */
export function humanize(value: string): string {
  const cleaned = value.replace(/^(TEY_|CATEGORY_OPTED_OUT:)/, '');
  const spaced = cleaned.replace(/_/g, ' ').toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function relativeTime(iso: string | null): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export { styles as adminStyles };
