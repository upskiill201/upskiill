'use client';

/**
 * /creator/coupons/:id — one coupon: the ticket, what it brought in, share
 * links, every use, and the controls (pause, change end date or limit, end).
 */

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ArrowLeft, BadgeDollarSign, CircleSlash, Link2, Pause, PencilLine, Play, Tag, Trash2, Wallet } from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import { courseShareUrl, studioFetch, studioSend } from '@/lib/creator/studio';
import { ErrorCard, Pill, Section, Sheet, Skel, StatTile, studio as s, useToast } from '../StudioParts';
import { coursesLabel, plansLabel } from './CouponsList';
import { Ticket, endsLabel } from './Ticket';
import { usd, type CouponDetail } from './shared';

export function CouponDetailView({ id }: { id: string }) {
  useStandaloneSound();
  const router = useRouter();
  const { data: cp, error, mutate } = useSWR<CouponDetail>(`/api/coupons/${encodeURIComponent(id)}`, studioFetch);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const toast = useToast();

  const act = async (action: 'pause' | 'resume' | 'archive' | 'delete') => {
    const confirmText: Partial<Record<typeof action, string>> = {
      archive: 'End this coupon now? Learners won’t be able to use it again.',
      delete: 'Delete this coupon for good?',
    };
    if (confirmText[action] && !window.confirm(confirmText[action])) return;
    setBusy(true);
    try {
      if (action === 'delete') {
        await studioSend(`/api/coupons/${id}`, 'DELETE');
        playSound('cardBack');
        router.push('/creator/coupons');
        return;
      }
      await studioSend(`/api/coupons/${id}/${action}`, 'POST');
      playSound(action === 'resume' ? 'toggleOn' : 'toggleOff');
      toast.show(action === 'pause' ? 'Paused' : action === 'resume' ? 'Live again' : 'Coupon ended');
      await mutate();
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'That didn’t work.');
    } finally {
      setBusy(false);
    }
  };

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      playSound('select');
      toast.show(`${what} copied`);
    } catch {
      toast.show(text);
    }
  };

  const back = (
    <Link href="/creator/coupons" className={s.back}>
      <ArrowLeft size={16} aria-hidden="true" /> Coupons
    </Link>
  );
  if (error) {
    return (
      <div className={s.page}>
        {back}
        <ErrorCard message={error.message || 'This coupon didn’t load.'} onRetry={() => void mutate()} />
      </div>
    );
  }
  if (!cp) {
    return (
      <div className={s.page} aria-busy="true">
        {back}
        <Skel h={140} />
        <div className={s.stats}>
          {[0, 1, 2, 3].map((i) => (
            <Skel key={i} h={112} r={18} />
          ))}
        </div>
      </div>
    );
  }

  const a = cp.analytics;
  const st = cp.derivedStatus;
  const canPause = st === 'ACTIVE' || st === 'SCHEDULED';
  const canResume = st === 'PAUSED';
  const ended = st === 'ARCHIVED' || st === 'DISABLED';

  return (
    <div className={s.page}>
      {back}
      <div style={{ maxWidth: 560 }}>
        <Ticket
          code={cp.code}
          discountType={cp.discountType}
          discountValue={cp.discountValue}
          status={st}
          courses={coursesLabel(cp.eligibleCourses)}
          plans={plansLabel(cp.eligiblePlans)}
          ends={endsLabel(cp.expiresAt, cp.startsAt)}
          used={cp.successfulRedemptions}
          max={cp.maxRedemptions}
          onCopy={() => void copy(cp.code, 'Code')}
        />
      </div>
      {cp.internalName && <span className={s.hint}>{cp.internalName}</span>}

      <div className={s.stats}>
        <StatTile icon={<Tag size={18} />} label="Times used" value={a.redemptions} />
        <StatTile icon={<BadgeDollarSign size={18} />} tone="var(--color-brand)" label="Learners paid" value={usd(a.netUsd)} />
        <StatTile icon={<CircleSlash size={18} />} tone="var(--warning)" label="Discount given" value={usd(a.discountUsd)} />
        <StatTile icon={<Wallet size={18} />} tone="var(--success-green)" label="You earned" value={usd(a.creatorEarningsUsd)} />
      </div>

      {!ended && (
        <Section title="Share it" note="The link opens the course with this code ready at checkout.">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cp.eligibleCourses.map((ec) => (
              <button key={ec.courseId} type="button" className={s.btn} onClick={() => void copy(courseShareUrl(ec.courseId, cp.code), 'Link')}>
                <Link2 size={16} aria-hidden="true" /> {cp.eligibleCourses.length > 1 ? (ec.course?.title ?? 'Course link') : 'Copy link'}
              </button>
            ))}
          </div>
        </Section>
      )}

      <Section title="Uses">
        {cp.redemptions.length === 0 ? (
          <div className={s.empty}>Nobody has used it yet.</div>
        ) : (
          <div className={s.list}>
            {cp.redemptions.map((r) => (
              <div key={r.id} className={s.row}>
                <span className={s.rowMain}>
                  <span className={s.rowTitle}>
                    {r.plan === 'YEARLY' ? 'Yearly' : r.plan === 'MONTHLY' ? 'Monthly' : r.plan} · paid {usd(r.finalPriceUsd)}
                  </span>
                  <span className={s.rowMeta}>
                    <span>{new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>
                      Was {usd(r.originalPriceUsd)}, saved {usd(r.discountAmountUsd)}
                    </span>
                  </span>
                </span>
                <Pill tone={r.outcome === 'APPLIED' ? 'var(--success-green)' : 'var(--text-muted)'}>
                  {r.outcome.charAt(0) + r.outcome.slice(1).toLowerCase()}
                </Pill>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Manage">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {!ended && (
            <button type="button" className={s.btn} disabled={busy} onClick={() => setEditing(true)}>
              <PencilLine size={16} aria-hidden="true" /> End date and limit
            </button>
          )}
          {canPause && (
            <button type="button" className={s.btn} disabled={busy} onClick={() => void act('pause')}>
              <Pause size={16} aria-hidden="true" /> Pause
            </button>
          )}
          {canResume && (
            <button type="button" className={s.btnGood} disabled={busy} onClick={() => void act('resume')}>
              <Play size={16} aria-hidden="true" /> Resume
            </button>
          )}
          {!ended && (
            <button type="button" className={s.btn} disabled={busy} onClick={() => void act('archive')} style={{ color: 'var(--error-red)' }}>
              End coupon
            </button>
          )}
          {cp.successfulRedemptions === 0 && (
            <button type="button" className={s.btnGhost} disabled={busy} onClick={() => void act('delete')}>
              <Trash2 size={16} aria-hidden="true" /> Delete
            </button>
          )}
        </div>
      </Section>

      <EditSheet
        open={editing}
        coupon={cp}
        onClose={() => setEditing(false)}
        onSaved={() => {
          setEditing(false);
          void mutate();
          toast.show('Saved');
        }}
      />
      {toast.node}
    </div>
  );
}

function EditSheet({ open, coupon, onClose, onSaved }: { open: boolean; coupon: CouponDetail; onClose: () => void; onSaved: () => void }) {
  const [endDate, setEndDate] = useState(coupon.expiresAt ? coupon.expiresAt.slice(0, 10) : '');
  const [limit, setLimit] = useState(coupon.maxRedemptions ? String(coupon.maxRedemptions) : '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const save = async () => {
    setBusy(true);
    setErr(null);
    try {
      await studioSend(`/api/coupons/${coupon.id}`, 'PATCH', {
        expiresAt: endDate ? new Date(`${endDate}T23:59:59`).toISOString() : null,
        maxRedemptions: limit ? Math.max(1, Math.round(Number(limit))) : null,
      });
      playSound('profileSaved');
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Didn’t save.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Sheet open={open} onClose={onClose} title="End date and limit">
      <label className={s.label}>
        Ends on <span className={s.hint}>Leave empty for no end date</span>
        <input type="date" className={s.input} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <label className={s.label}>
        Maximum uses <span className={s.hint}>Leave empty for no limit. Used so far: {coupon.successfulRedemptions}</span>
        <input className={s.input} inputMode="numeric" value={limit} onChange={(e) => setLimit(e.target.value.replace(/\D/g, ''))} />
      </label>
      {err && (
        <div className={s.errorBox} role="alert">
          <span>{err}</span>
        </div>
      )}
      <div className={s.sheetActions}>
        <button type="button" className={s.btn} onClick={onClose}>
          Cancel
        </button>
        <button type="button" className={s.btnPrimary} disabled={busy} onClick={() => void save()}>
          {busy ? 'Saving…' : 'Save'}
        </button>
      </div>
    </Sheet>
  );
}
