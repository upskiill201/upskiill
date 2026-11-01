'use client';

/**
 * /teach visuals — the creator's side of the app, each showing a creator
 * *succeeding* on Teyro: money coming in every month, a lesson built, learners
 * coming back, a stuck learner nudged, a question answered, a payout landing.
 *
 * Illustrative data, but every mechanic shown ships today, and the money
 * adds up with the real Pro prices: a yearly Pro learner pays $5.00 a month,
 * half of it is the creators' pool, so one who learns only in your course
 * sends you $2.50 a month (lib/launch.ts).
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import { Pop } from '@/components/homepage/v3/Visuals';
import s from '@/components/homepage/v3/Home.module.css';
import t from './Teach.module.css';

const AVATAR = ['var(--color-brand)', 'var(--brand-purple)', 'var(--success-green)', 'var(--warning)', 'var(--error-red)'];

function Face({ name, i, size = 36 }: { name: string; i: number; size?: number }) {
  return (
    <span className={t.face} style={{ background: AVATAR[i % AVATAR.length], width: size, height: size }}>
      {name.charAt(0)}
    </span>
  );
}

// ─── Hero: the studio home, a good month ────────────────────────────────────

const MONTHS = [
  { m: 'Apr', v: 223 },
  { m: 'May', v: 358 },
  { m: 'Jun', v: 558 },
  { m: 'Jul', v: 752 },
  { m: 'Aug', v: 999 },
  { m: 'Sep', v: 1260 },
];

export function StudioHeroVisual() {
  const max = MONTHS[MONTHS.length - 1].v;
  return (
    <div className={`${s.heroVisual} ${t.heroStage}`}>
      <Pop delay={0.6} className={`${s.float} ${t.floatSale}`}>
        <span className={t.floatIcon} style={{ background: 'var(--success-green)' }}>
          <Glyph name="coinDollar" size={20} strokeWidth={2.55} />
        </span>
        <span>
          <span className={s.floatLabel}>New Pro learner</span>
          <span className={s.floatValue}>+$2.50/mo</span>
        </span>
      </Pop>
      <Pop delay={0.9} className={`${s.float} ${t.floatFinish}`}>
        <span className={t.floatIcon} style={{ background: 'var(--brand-purple)' }}>
          <Glyph name="trophy" size={20} strokeWidth={2.55} />
        </span>
        <span>
          <span className={s.floatLabel}>Kemi finished</span>
          <span className={s.floatValue}>Python for Data!</span>
        </span>
      </Pop>
      <Pop delay={1.2} className={`${s.float} ${t.floatBack}`}>
        <Image src="/Icons/burn.png" alt="" width={32} height={32} />
        <span>
          <span className={s.floatLabel}>Learning today</span>
          <span className={s.floatValue}>63 learners</span>
        </span>
      </Pop>

      <div className={`${s.card} ${t.studio}`} aria-hidden="true">
        <div className={t.studioBar}>
          <span className={t.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={t.studioTitle}>Teyro Studio</span>
        </div>
        <span className={t.kicker}>Earned this month</span>
        <div className={t.bigRow}>
          <span className={t.big}>$1,260.00</span>
          <span className={t.up}>
            <Glyph name="upRight" size={16} strokeWidth={2.8} /> 26%
          </span>
        </div>
        <div className={t.cols}>
          {MONTHS.map((p, i) => (
            <span key={p.m} className={t.colSlot}>
              <motion.span
                className={`${t.col} ${i === MONTHS.length - 1 ? t.colNow : ''}`}
                initial={{ height: '6%' }}
                whileInView={{ height: `${(p.v / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 + i * 0.08 }}
              />
              <span className={t.colLabel}>{p.m}</span>
            </span>
          ))}
        </div>
        <div className={t.courseRow}>
          <span className={t.courseIcon}>{'</>'}</span>
          <span className={t.courseText}>
            <strong>Python for Data</strong>
            <span>504 Pro learners · Teyro Pro pool</span>
          </span>
          <span className={t.livePill}>Live</span>
        </div>
      </div>

      <Image src="/User onbarding Assets/tey/cheering.webp" alt="" width={150} height={174} className={`${s.heroTey} ${t.heroTeyPos}`} priority />
    </div>
  );
}

// ─── Recurring revenue: free lessons → a monthly subscription ───────────────

export function RecurringVisual() {
  const steps = [
    { label: 'Start', sub: 'Free', done: true },
    { label: 'Your lessons', sub: 'Free to try', done: true },
    { label: 'Teyro Pro', sub: '$5.00 a month', now: true },
  ];
  return (
    <div className={`${s.card} ${t.recurring}`} aria-hidden="true">
      <strong className={t.cardTitle}>How a learner pays you</strong>
      <div className={t.steps}>
        {steps.map((st, i) => (
          <Pop key={st.label} delay={0.15 + i * 0.15} className={`${t.step} ${st.now ? t.stepNow : ''}`}>
            <span className={t.stepNode}>{st.done ? <Glyph name="check" size={22} strokeWidth={3.6} /> : <Glyph name="lock" size={20} strokeWidth={2.8} />}</span>
            <strong>{st.label}</strong>
            <span>{st.sub}</span>
          </Pop>
        ))}
      </div>
      <div className={t.keep}>
        {['Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
          <Pop key={m} delay={0.7 + i * 0.12} className={t.keepMonth}>
            <span>{m}</span>
            <strong>+$2.50</strong>
          </Pop>
        ))}
      </div>
      <p className={t.keepNote}>
        <Glyph name="sparkle" size={16} strokeWidth={2.55} /> Your share of the pool, every month they learn with you.
      </p>
    </div>
  );
}

// ─── Builder: a lesson in four steps, with a real exercise ──────────────────

const PHASE_TABS = [
  { name: 'Learn', tone: 'var(--color-brand)' },
  { name: 'Apply', tone: 'var(--success-green)' },
  { name: 'Reflect', tone: 'var(--brand-purple)' },
  { name: 'Deepen', tone: 'var(--warning)' },
];
const KINDS = ['Multiple choice', 'Predict the output', 'Find the bug', 'Put in order', 'Match the pairs'];

export function BuilderVisual() {
  return (
    <div className={`${s.card} ${t.builder}`} aria-hidden="true">
      <div className={t.tabs}>
        {PHASE_TABS.map((p, i) => (
          <span key={p.name} className={`${t.tab} ${i === 1 ? t.tabOn : ''}`} style={{ ['--tone' as string]: p.tone }}>
            {i === 0 ? <Glyph name="check" size={14} strokeWidth={3.6} /> : null}
            {p.name}
          </span>
        ))}
      </div>
      <span className={t.kicker}>
        <Glyph name="help" size={14} strokeWidth={2.8} /> Find the bug
      </span>
      <pre className={t.code}>
        <span>{'def average(nums):'}</span>
        {'\n'}
        <span>{'    total = sum(nums)'}</span>
        {'\n'}
        <span className={t.bugLine}>{'    return total / len(num)'}</span>
      </pre>
      <div className={t.kinds}>
        {KINDS.map((k, i) => (
          <Pop key={k} delay={0.3 + i * 0.08} className={`${t.kind} ${k === 'Find the bug' ? t.kindOn : ''}`}>
            {k}
          </Pop>
        ))}
      </div>
      <Pop delay={1} className={t.published}>
        <Glyph name="verified" size={20} strokeWidth={2.55} /> Lesson published · 5 min · +10 XP
      </Pop>
    </div>
  );
}

// ─── Retention: learners coming back to your course ─────────────────────────

const LEARNERS = [
  { name: 'Kemi A.', streak: 64, pct: 92, note: 'Lesson 22 of 24' },
  { name: 'Daniel O.', streak: 31, pct: 63, note: 'Lesson 15 of 24' },
  { name: 'Priya S.', streak: 18, pct: 41, note: 'Lesson 10 of 24' },
  { name: 'Tunde B.', streak: 9, pct: 25, note: 'Lesson 6 of 24' },
];

export function RetentionVisual() {
  return (
    <div className={t.stack} aria-hidden="true">
      <div className={`${s.card} ${t.retention}`}>
        <div className={t.headRow}>
          <strong className={t.cardTitle}>Your learners</strong>
          <span className={t.greenPill}>
            <Glyph name="flame" size={14} strokeWidth={2.8} /> 63 learning today
          </span>
        </div>
        {LEARNERS.map((l, i) => (
          <Pop key={l.name} delay={0.1 + i * 0.1} className={t.learner}>
            <Face name={l.name} i={i} />
            <span className={t.learnerText}>
              <strong>{l.name}</strong>
              <span className={t.track}>
                <motion.span
                  className={t.trackFill}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.1 }}
                />
              </span>
              <span className={t.learnerNote}>{l.note}</span>
            </span>
            <span className={t.streak}>
              <Glyph name="flame" size={16} strokeWidth={2.55} /> {l.streak}
            </span>
          </Pop>
        ))}
      </div>
      <Pop delay={0.8} className={`${s.card} ${t.toastCard}`}>
        <span className={t.floatIcon} style={{ background: 'var(--warning)' }}>
          <Glyph name="bell" size={18} strokeWidth={2.55} />
        </span>
        <span>
          <strong>Tey reminded Tunde</strong>
          <span>“Keep your 9-day streak alive!” · he came back</span>
        </span>
      </Pop>
    </div>
  );
}

// ─── Insight: where learners stop, and the nudge that brings them back ──────

const FUNNEL = [
  { n: 1, pct: 100 },
  { n: 2, pct: 94 },
  { n: 3, pct: 88 },
  { n: 4, pct: 57, flag: true },
  { n: 5, pct: 52 },
  { n: 6, pct: 49 },
];

export function InsightVisual() {
  return (
    <div className={t.stack} aria-hidden="true">
      <div className={`${s.card} ${t.insight}`}>
        <strong className={t.cardTitle}>Where learners stop</strong>
        <div className={t.funnel}>
          {FUNNEL.map((f, i) => (
            <div key={f.n} className={`${t.fRow} ${f.flag ? t.fFlag : ''}`}>
              <span className={t.fLabel}>Lesson {f.n}</span>
              <span className={t.fBar}>
                <motion.span
                  className={t.fFill}
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${f.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07 }}
                />
              </span>
              <span className={t.fPct}>{f.pct}%</span>
            </div>
          ))}
        </div>
        <Pop delay={0.8} className={t.flagNote}>
          <Glyph name="bubble" size={18} strokeWidth={2.55} />
          <span>
            <strong>Lesson 4 is where most stop.</strong> Exercise 2 is missed by 6 in 10 on the first try.
          </span>
        </Pop>
      </div>
      <Pop delay={1.1} className={`${s.card} ${t.toastCard}`}>
        <span className={t.floatIcon} style={{ background: 'var(--color-brand)' }}>
          <Glyph name="send" size={18} strokeWidth={2.55} />
        </span>
        <span>
          <strong>Nudge sent to 9 quiet learners</strong>
          <span>“Hey Priya, lesson 4 trips everyone up. You’ve got this!”</span>
        </span>
      </Pop>
    </div>
  );
}

// ─── Community: a question, answered by the creator ─────────────────────────

export function CommunityVisual() {
  return (
    <div className={t.stack} aria-hidden="true">
      <Pop delay={0.1} className={`${s.card} ${t.post} ${t.pinned}`}>
        <span className={t.postHead}>
          <Glyph name="pin" size={16} strokeWidth={2.55} /> <strong>Announcement</strong> · from you
        </span>
        <p className={t.postBody}>New unit is live: cleaning messy data with pandas.</p>
      </Pop>
      <div className={`${s.card} ${t.post}`}>
        <span className={t.postHead}>
          <Face name="Ada" i={1} size={32} />
          <span>
            <strong>Ada asked</strong>
            <span className={t.meta}>Python for Data community · 12m</span>
          </span>
        </span>
        <p className={t.postBody}>Why does my groupby drop the rows with missing values?</p>
        <Pop delay={0.6} className={t.reply}>
          <Face name="You" i={0} size={28} />
          <span>
            <span className={t.replyHead}>
              <strong>You</strong> <span className={t.creatorTag}>Creator</span>
            </span>
            <span>Pass dropna=False and they stay in. Great question!</span>
          </span>
        </Pop>
        <span className={t.postStats}>
          <Image src="/art/ui/like.svg" alt="" width={18} height={18} /> 31 · 6 replies ·
          <span className={t.answered}>
            <Glyph name="check" size={14} strokeWidth={3.6} /> Answered
          </span>
        </span>
      </div>
    </div>
  );
}

// ─── Payouts: requested → processing → paid ─────────────────────────────────

export function PayoutVisual() {
  const steps = [
    { label: 'Requested', sub: 'Sep 30' },
    { label: 'Processing', sub: 'Oct 1' },
    { label: 'Paid', sub: 'Oct 2' },
  ];
  return (
    <div className={`${s.card} ${t.payout}`} aria-hidden="true">
      <span className={t.kicker}>Available to withdraw</span>
      <span className={t.big}>$1,142.80</span>
      <div className={t.method}>
        <span className={t.methodIcon}>
          <Glyph name="phone" size={18} strokeWidth={2.55} />
        </span>
        <span>
          <strong>Mobile money</strong>
          <span>•••• 4821</span>
        </span>
        <span className={t.methodAlt}>
          <Glyph name="bank" size={16} strokeWidth={2.55} /> or bank
        </span>
      </div>
      <div className={t.timeline}>
        {steps.map((st, i) => (
          <Pop key={st.label} delay={0.3 + i * 0.25} className={t.tStep}>
            <span className={t.tDot}>
              <Glyph name="check" size={16} strokeWidth={3.6} />
            </span>
            <strong>{st.label}</strong>
            <span>{st.sub}</span>
          </Pop>
        ))}
      </div>
      <Pop delay={1.1} className={t.paid}>
        <Image src="/Icons/Coin.png" alt="" width={28} height={28} /> $1,142.80 paid out
      </Pop>
    </div>
  );
}
