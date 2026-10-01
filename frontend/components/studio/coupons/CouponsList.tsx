'use client';

/**
 * /creator/coupons — every discount code as a ticket. Filter by where it
 * stands, copy a code in one tap, and open one to see what it brought in.
 * Status comes from the server (CouponsService.deriveCouponStatus).
 */

import Link from 'next/link';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Plus, Tag, TicketPercent } from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import { studioFetch } from '@/lib/creator/studio';
import { EmptyCard, ErrorCard, PageHead, Skel, StatTile, studio as s, useToast } from '../StudioParts';
import { Ticket, endsLabel } from './Ticket';
import { type Coupon, type CouponDerivedStatus } from './shared';
import c from './coupons.module.css';

type Filter = 'live' | 'paused' | 'ended' | 'all';
const FILTERS: { id: Filter; label: string; match: CouponDerivedStatus[] }[] = [
  { id: 'live', label: 'Live', match: ['ACTIVE', 'SCHEDULED'] },
  { id: 'paused', label: 'Paused', match: ['PAUSED'] },
  { id: 'ended', label: 'Ended', match: ['EXPIRED', 'USAGE_LIMIT_REACHED', 'ARCHIVED', 'DISABLED'] },
  { id: 'all', label: 'All', match: [] },
];

export const plansLabel = (plans: { plan: string }[]) =>
  plans
    .filter((p) => p.plan !== 'WEEKLY')
    .map((p) => p.plan.charAt(0) + p.plan.slice(1).toLowerCase())
    .join(' + ') || 'No plans';

export const coursesLabel = (list: { course?: { title: string } }[]) =>
  list.length === 1 ? (list[0].course?.title ?? '1 course') : `${list.length} courses`;

export function CouponsList() {
  useStandaloneSound();
  const { data, error, mutate } = useSWR<Coupon[]>('/api/coupons', studioFetch);
  const [filter, setFilter] = useState<Filter>('live');
  const toast = useToast();

  const counts = useMemo(() => {
    const out: Record<Filter, number> = { live: 0, paused: 0, ended: 0, all: 0 };
    for (const cp of data ?? []) {
      out.all += 1;
      for (const f of FILTERS) if (f.match.includes(cp.derivedStatus)) out[f.id] += 1;
    }
    return out;
  }, [data]);
  const visible = (data ?? []).filter((cp) => {
    const f = FILTERS.find((x) => x.id === filter)!;
    return f.match.length === 0 || f.match.includes(cp.derivedStatus);
  });
  const uses = (data ?? []).reduce((a, cp) => a + cp.successfulRedemptions, 0);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      playSound('select');
      toast.show(`${code} copied`);
    } catch {
      toast.show(`Your code is ${code}`);
    }
  };

  const newButton = (
    <Link href="/creator/coupons/new" className={s.btnPrimary} onClick={() => playSound('start')}>
      <Plus size={16} aria-hidden="true" /> New coupon
    </Link>
  );

  return (
    <div className={s.page}>
      <PageHead title="Coupons" sub="Discount codes that bring learners in. Share one as a link and it applies itself." actions={newButton} />

      {error && !data ? (
        <ErrorCard message={error.message || 'Your coupons didn’t load.'} onRetry={() => void mutate()} />
      ) : !data ? (
        <div className={c.grid} aria-busy="true">
          {[0, 1, 2].map((i) => (
            <Skel key={i} h={132} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <EmptyCard pose="badge" title="Make your first coupon" action={newButton}>
          A limited-time discount is the easiest way to tip learners who finished the free lessons into unlocking your
          course.
        </EmptyCard>
      ) : (
        <>
          <div className={s.stats}>
            <StatTile icon={<TicketPercent size={18} />} label="Live coupons" value={counts.live} />
            <StatTile icon={<Tag size={18} />} tone="var(--success-green)" label="Times used" value={uses} />
          </div>
          <nav className={s.chips} aria-label="Filter coupons">
            {FILTERS.map((f, i) => (
              <button
                key={f.id}
                type="button"
                className={`${s.chip} ${filter === f.id ? s.chipOn : ''}`}
                onClick={() => {
                  setFilter(f.id);
                  playSound('navTap', i);
                }}
              >
                {f.label} <span className={s.hint}>{counts[f.id]}</span>
              </button>
            ))}
          </nav>
          {visible.length === 0 ? (
            <div className={s.empty}>Nothing here.</div>
          ) : (
            <div className={c.grid}>
              {visible.map((cp) => (
                <Ticket
                  key={cp.id}
                  code={cp.code}
                  discountType={cp.discountType}
                  discountValue={cp.discountValue}
                  status={cp.derivedStatus}
                  courses={coursesLabel(cp.eligibleCourses)}
                  plans={plansLabel(cp.eligiblePlans)}
                  ends={endsLabel(cp.expiresAt, cp.startsAt)}
                  used={cp.successfulRedemptions}
                  max={cp.maxRedemptions}
                  href={`/creator/coupons/${cp.id}`}
                  onCopy={() => void copy(cp.code)}
                />
              ))}
            </div>
          )}
        </>
      )}
      {toast.node}
    </div>
  );
}
