'use client';

/**
 * /creator/coupons/new — make a coupon in four quick steps, with the ticket
 * and the new prices updating as you go:
 *   1 how much off   2 which courses   3 which plans   4 code, end date, limit
 * Then a "share it" screen with the code and a link that applies it.
 * The server re-checks everything (max discount, ownership, code format).
 */

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { ArrowLeft, Check, Copy, Link2, Shuffle } from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic } from '@/lib/haptics';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';
import { courseShareUrl, studioFetch, studioKeys, studioSend } from '@/lib/creator/studio';
import { EmptyCard, ErrorCard, PageHead, Segmented, Sheet, Skel, TeyLine, studio as s, useToast } from '../StudioParts';
import { Ticket } from './Ticket';
import type { AccessPlan, CouponDiscountType } from './shared';
import c from './coupons.module.css';

interface PricedCourse {
  id: string;
  title: string;
  price: number;
  published: boolean;
}

const PERCENTS = [10, 20, 30, 50];
const ENDS = [
  { id: '7', label: '7 days', days: 7 },
  { id: '30', label: '30 days', days: 30 },
  { id: 'none', label: 'No end', days: null },
  { id: 'date', label: 'Pick a date', days: null },
] as const;
const LIMITS = [
  { id: 'none', label: 'No limit', n: null },
  { id: '25', label: '25 uses', n: 25 },
  { id: '100', label: '100 uses', n: 100 },
  { id: 'custom', label: 'Custom', n: null },
] as const;

function randomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

const money = (n: number) => `$${n.toFixed(2)}`;

export function CouponBuilder() {
  useStandaloneSound();
  const router = useRouter();
  const params = useSearchParams();
  const { data: all, error, mutate } = useSWR<PricedCourse[]>(studioKeys.courses, studioFetch);
  const courses = useMemo(() => (all ?? []).filter((x) => x.price > 0), [all]);

  const [discountType, setDiscountType] = useState<CouponDiscountType>('PERCENTAGE');
  const [value, setValue] = useState('20');
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [plans, setPlans] = useState<AccessPlan[]>(['MONTHLY', 'YEARLY']);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [ends, setEnds] = useState<(typeof ENDS)[number]['id']>('30');
  const [endDate, setEndDate] = useState('');
  const [limit, setLimit] = useState<(typeof LIMITS)[number]['id']>('none');
  const [customLimit, setCustomLimit] = useState('50');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [made, setMade] = useState<{ id: string; code: string } | null>(null);
  const toast = useToast();

  // Pre-pick the course from ?course= (Analytics' "make a coupon"), else a lone course.
  useEffect(() => {
    if (courseIds.length || courses.length === 0) return;
    const wanted = params.get('course');
    const pick = courses.find((x) => x.id === wanted) ?? (courses.length === 1 ? courses[0] : null);
    if (pick) setCourseIds([pick.id]);
  }, [courses, params, courseIds.length]);

  const n = Number(value);
  const valid =
    Number.isFinite(n) &&
    n > 0 &&
    (discountType === 'PERCENTAGE' ? n <= 100 : true) &&
    courseIds.length > 0 &&
    plans.length > 0 &&
    /^[A-Z0-9-]{3,32}$/.test(code) &&
    (ends !== 'date' || !!endDate) &&
    (limit !== 'custom' || Number(customLimit) >= 1);

  const endsText =
    ends === 'none'
      ? 'No end date'
      : ends === 'date'
        ? endDate
          ? `Ends ${new Date(endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
          : 'Pick an end date'
        : `Ends in ${ENDS.find((x) => x.id === ends)!.days} days`;
  const picked = courses.filter((x) => courseIds.includes(x.id));
  const coursesText = picked.length === 0 ? 'Pick a course' : picked.length === 1 ? picked[0].title : `${picked.length} courses`;
  const plansText = plans.map((p) => (p === 'MONTHLY' ? 'Monthly' : 'Yearly')).join(' + ') || 'Pick a plan';

  const discounted = (price: number) =>
    Math.max(0, discountType === 'PERCENTAGE' ? price * (1 - (Number.isFinite(n) ? n : 0) / 100) : price - (Number.isFinite(n) ? n : 0));

  const create = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setErr(null);
    try {
      const expiresAt =
        ends === 'none'
          ? null
          : ends === 'date'
            ? new Date(`${endDate}T23:59:59`).toISOString()
            : new Date(Date.now() + (ENDS.find((x) => x.id === ends)!.days as number) * 86400000).toISOString();
      const maxRedemptions = limit === 'none' ? null : limit === 'custom' ? Math.round(Number(customLimit)) : LIMITS.find((x) => x.id === limit)!.n;
      const created = await studioSend<{ id: string; code: string }>('/api/coupons', 'POST', {
        code,
        internalName: name.trim() || undefined,
        discountType,
        discountValue: n,
        courseIds,
        plans,
        expiresAt,
        maxRedemptions,
      });
      setMade({ id: created.id, code: created.code ?? code });
      playSound('couponMade');
      celebrationHaptic('win');
    } catch (e) {
      playSound('wrong');
      setErr(e instanceof Error ? e.message : 'The coupon wasn’t made.');
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
        <ErrorCard message="Your courses didn’t load." onRetry={() => void mutate()} />
      </div>
    );
  }
  if (!all) {
    return (
      <div className={s.page} aria-busy="true">
        <Skel h={20} w={100} />
        <Skel h={48} w="50%" />
        <Skel h={420} />
      </div>
    );
  }
  if (courses.length === 0) {
    return (
      <div className={s.page}>
        {back}
        <PageHead title="New coupon" />
        <EmptyCard pose="thinking" title="Coupons are for paid courses">
          All your courses are free right now. Set a price on a course (Details in the course workspace) and you can make
          coupons for it.
        </EmptyCard>
      </div>
    );
  }

  return (
    <div className={s.page}>
      {back}
      <PageHead title="New coupon" sub="Four quick steps. The ticket on the right shows what learners get." />

      <div className={c.builder}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <section className={c.step}>
            <span className={c.stepHead}>
              <span className={c.stepNum}>1</span> How much off?
            </span>
            <Segmented
              label="Discount type"
              value={discountType}
              onChange={(t) => {
                setDiscountType(t);
                setValue(t === 'PERCENTAGE' ? '20' : '2');
              }}
              options={[
                { value: 'PERCENTAGE', label: 'Percent' },
                { value: 'FIXED_AMOUNT', label: 'Dollars' },
              ]}
            />
            <div className={s.chips}>
              {discountType === 'PERCENTAGE' &&
                PERCENTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`${s.chip} ${value === String(p) ? s.chipOn : ''}`}
                    onClick={() => {
                      setValue(String(p));
                      playSound('select');
                    }}
                  >
                    {p}%
                  </button>
                ))}
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={s.srOnly}>Custom amount</span>
                <input
                  className={s.input}
                  style={{ width: 110 }}
                  inputMode="decimal"
                  value={value}
                  onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
                />
                <strong>{discountType === 'PERCENTAGE' ? '%' : 'USD'}</strong>
              </label>
            </div>
          </section>

          <section className={c.step}>
            <span className={c.stepHead}>
              <span className={c.stepNum}>2</span> Which courses?
            </span>
            {courses.map((x) => {
              const on = courseIds.includes(x.id);
              return (
                <button
                  key={x.id}
                  type="button"
                  className={`${c.pick} ${on ? c.pickOn : ''}`}
                  aria-pressed={on}
                  onClick={() => {
                    setCourseIds((ids) => (on ? ids.filter((i) => i !== x.id) : [...ids, x.id]));
                    playSound(on ? 'toggleOff' : 'toggleOn');
                  }}
                >
                  <span className={c.check}>{on && <Check size={16} strokeWidth={3} />}</span>
                  <strong style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.title}</strong>
                  {!x.published && <span className={s.hint}>Not live yet</span>}
                </button>
              );
            })}
          </section>

          <section className={c.step}>
            <span className={c.stepHead}>
              <span className={c.stepNum}>3</span> Which plans?
            </span>
            {(['MONTHLY', 'YEARLY'] as const).map((plan) => {
              const on = plans.includes(plan);
              const ref = picked[0] ?? courses[0];
              const ladder = calculateCoursePricingLadder(ref.price);
              const price = plan === 'MONTHLY' ? ladder.monthly.price : ladder.yearly.price;
              return (
                <button
                  key={plan}
                  type="button"
                  className={`${c.pick} ${on ? c.pickOn : ''}`}
                  aria-pressed={on}
                  onClick={() => {
                    setPlans((ps) => (on ? ps.filter((p) => p !== plan) : [...ps, plan]));
                    playSound(on ? 'toggleOff' : 'toggleOn');
                  }}
                >
                  <span className={c.check}>{on && <Check size={16} strokeWidth={3} />}</span>
                  <strong>{plan === 'MONTHLY' ? 'Monthly' : 'Yearly'}</strong>
                  <span className={c.price}>
                    <span className={c.was}>{money(price)}</span>
                    <span className={c.now}>{money(discounted(price))}</span>
                  </span>
                </button>
              );
            })}
            {picked.length > 1 && <span className={s.hint}>Prices shown for {picked[0].title}.</span>}
            <span className={s.hint}>The discount applies to the first payment.</span>
          </section>

          <section className={c.step}>
            <span className={c.stepHead}>
              <span className={c.stepNum}>4</span> Code and limits
            </span>
            <label className={s.label}>
              Code
              <span style={{ display: 'flex', gap: 8 }}>
                <input
                  className={s.input}
                  style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', fontWeight: 800, letterSpacing: '0.06em' }}
                  value={code}
                  maxLength={32}
                  placeholder="e.g. LAUNCH20"
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))}
                />
                <button
                  type="button"
                  className={s.iconBtn}
                  style={{ width: 46, height: 46 }}
                  aria-label="Make up a code"
                  onClick={() => {
                    setCode(randomCode());
                    playSound('select');
                  }}
                >
                  <Shuffle size={18} />
                </button>
              </span>
              <span className={s.hint}>3–32 letters, numbers or hyphens.</span>
            </label>

            <span className={s.label}>Ends</span>
            <div className={s.chips}>
              {ENDS.map((x) => (
                <button key={x.id} type="button" className={`${s.chip} ${ends === x.id ? s.chipOn : ''}`} onClick={() => setEnds(x.id)}>
                  {x.label}
                </button>
              ))}
            </div>
            {ends === 'date' && (
              <input
                type="date"
                className={s.input}
                style={{ maxWidth: 220 }}
                min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            )}

            <span className={s.label}>How many uses?</span>
            <div className={s.chips}>
              {LIMITS.map((x) => (
                <button key={x.id} type="button" className={`${s.chip} ${limit === x.id ? s.chipOn : ''}`} onClick={() => setLimit(x.id)}>
                  {x.label}
                </button>
              ))}
            </div>
            {limit === 'custom' && (
              <input
                className={s.input}
                style={{ maxWidth: 160 }}
                inputMode="numeric"
                value={customLimit}
                onChange={(e) => setCustomLimit(e.target.value.replace(/\D/g, ''))}
              />
            )}

            <label className={s.label}>
              Name <span className={s.hint}>Just for you, e.g. “Launch week”</span>
              <input className={s.input} value={name} maxLength={80} onChange={(e) => setName(e.target.value)} />
            </label>
          </section>
        </div>

        <aside className={c.sticky}>
          <span className={s.statLabel}>Preview</span>
          <Ticket
            code={code}
            discountType={discountType}
            discountValue={Number.isFinite(n) ? n : 0}
            courses={coursesText}
            plans={plansText}
            ends={endsText}
          />
          {err && (
            <div className={s.errorBox} role="alert">
              <span>{err}</span>
            </div>
          )}
          <button type="button" className={s.btnPrimary} disabled={!valid || busy} onClick={() => void create()}>
            {busy ? 'Making it…' : 'Create coupon'}
          </button>
          {!valid && (
            <span className={s.hint}>
              {courseIds.length === 0
                ? 'Pick at least one course.'
                : plans.length === 0
                  ? 'Pick at least one plan.'
                  : !/^[A-Z0-9-]{3,32}$/.test(code)
                    ? 'Add a code (or tap shuffle).'
                    : 'Check the discount, end date and limit.'}
            </span>
          )}
        </aside>
      </div>

      <Sheet open={!!made} onClose={() => made && router.push(`/creator/coupons/${made.id}`)} title="Your coupon is live!">
        {made && (
          <>
            <TeyLine pose="cheering">Share it where your learners are. The link opens the course with the code ready to go.</TeyLine>
            <Ticket code={made.code} discountType={discountType} discountValue={n} courses={coursesText} plans={plansText} ends={endsText} />
            <div style={{ display: 'grid', gap: 8 }}>
              <button type="button" className={s.btnPrimary} onClick={() => void copy(made.code, 'Code')}>
                <Copy size={16} aria-hidden="true" /> Copy code
              </button>
              {picked.map((x) => (
                <button key={x.id} type="button" className={s.btn} onClick={() => void copy(courseShareUrl(x.id, made.code), 'Link')}>
                  <Link2 size={16} aria-hidden="true" /> Copy link{picked.length > 1 ? ` · ${x.title}` : ''}
                </button>
              ))}
              <button type="button" className={s.btnGhost} onClick={() => router.push(`/creator/coupons/${made.id}`)}>
                Done
              </button>
            </div>
          </>
        )}
      </Sheet>
      {toast.node}
    </div>
  );
}
