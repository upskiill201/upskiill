'use client';

/**
 * /teach/how-it-works visuals — Teyro Studio, drawn from the real screens,
 * one per step of a creator's journey. Illustrative people and numbers, but
 * every mechanic shown ships (lib/creator/guide.ts is the reference), and the
 * money always comes from the real pricing engine.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Code2,
  Copy,
  Crown,
  FileText,
  Flame,
  HelpCircle,
  Lightbulb,
  Link2,
  Send,
  Sparkles,
  Ticket,
  UserPlus,
  Video,
} from 'lucide-react';
import { Pop } from '@/components/homepage/v3/Visuals';
import s from '@/components/homepage/v3/Home.module.css';
import h from './HowVisuals.module.css';
import { EXAMPLE_COURSE_PRICE, EXAMPLE_KEEP_MONTHLY, EXAMPLE_MONTHLY, EXAMPLE_YEARLY } from './howPricing';
const money = (n: number) => `$${n.toFixed(2)}`;

function Studio({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`${s.card} ${h.studio} ${className}`} aria-hidden="true">
      <div className={h.bar}>
        <span className={h.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={h.barTitle}>{title}</span>
      </div>
      {children}
    </div>
  );
}

// ─── Hero: a first course, from idea to income ──────────────────────────────

const MILESTONES = [
  { when: 'Day 1', what: 'Plan ready with Tey' },
  { when: 'Week 2', what: '8 lessons built' },
  { when: 'Week 3', what: 'Approved and live' },
  { when: 'Launch day', what: 'Coupon shared with followers' },
  { when: 'Every month', what: 'Paid for every learner who stays' },
];

export function JourneyHeroVisual() {
  return (
    <div className={`${s.heroVisual} ${h.heroStage}`}>
      <Pop delay={0.7} className={`${s.float} ${h.floatA}`}>
        <span className={h.floatIcon} style={{ background: 'var(--warning)' }}>
          <Crown size={18} strokeWidth={2.75} />
        </span>
        <span>
          <span className={s.floatLabel}>Status</span>
          <span className={s.floatValue}>Founding creator</span>
        </span>
      </Pop>
      <Pop delay={1} className={`${s.float} ${h.floatB}`}>
        <span className={h.floatIcon} style={{ background: 'var(--success-green)' }}>
          <Sparkles size={18} strokeWidth={2.75} />
        </span>
        <span>
          <span className={s.floatLabel}>New subscriber</span>
          <span className={s.floatValue}>+{money(EXAMPLE_KEEP_MONTHLY)}/mo</span>
        </span>
      </Pop>

      <Studio title="Your first course">
        <div className={h.milestones}>
          {MILESTONES.map((m, i) => (
            <Pop key={m.when} delay={0.15 + i * 0.12} className={h.milestone}>
              <span className={`${h.mNode} ${i === MILESTONES.length - 1 ? h.mNodeNow : ''}`}>
                {i === MILESTONES.length - 1 ? <Sparkles size={16} strokeWidth={3} /> : <Check size={16} strokeWidth={4} />}
              </span>
              <span className={h.mText}>
                <span className={h.mWhen}>{m.when}</span>
                <strong>{m.what}</strong>
              </span>
            </Pop>
          ))}
        </div>
      </Studio>
      <Image
        src="/User onbarding Assets/tey/cheering.webp"
        alt=""
        width={140}
        height={162}
        className={`${s.heroTey} ${h.heroTey}`}
        priority
      />
    </div>
  );
}

// ─── Step 1: Tey plans your first course ────────────────────────────────────

export function OnboardingVisual() {
  const chips = [
    { label: 'Recorded videos', on: true },
    { label: 'A full course', on: false },
    { label: 'Notes, slides or PDFs', on: true },
    { label: 'A community', on: true },
  ];
  return (
    <div className={h.stack} aria-hidden="true">
      <div className={`${s.card} ${h.chat}`}>
        <div className={h.teyRow}>
          <Image src="/User onbarding Assets/tey/thinking.webp" alt="" width={56} height={64} />
          <span className={h.bubble}>What do you already have to teach from?</span>
        </div>
        <div className={h.chips}>
          {chips.map((c, i) => (
            <Pop key={c.label} delay={0.2 + i * 0.1} className={`${h.chip} ${c.on ? h.chipOn : ''}`}>
              {c.on && <Check size={14} strokeWidth={4} />} {c.label}
            </Pop>
          ))}
        </div>
      </div>
      <Pop delay={0.8} className={`${s.card} ${h.plan}`}>
        <span className={h.kicker}>Your plan</span>
        <strong className={h.planBig}>First course in 4 weeks</strong>
        <span className={h.planSub}>8 lessons · 2 a week · 3 to 5 hours a week</span>
      </Pop>
    </div>
  );
}

// ─── Step 2: the course wizard's starter outline ────────────────────────────

const OUTLINE = [
  { module: 'Get Python running', lessons: ['Your first line of code', 'Variables that make sense'] },
  { module: 'Work with real data', lessons: ['Lists and loops', 'Reading a CSV'] },
  { module: 'Build a mini project', lessons: ['Clean the data', 'Chart your results'] },
];

export function WizardVisual() {
  const steps = ['Track', 'Level', 'Title', 'Outline', 'Create'];
  return (
    <Studio title="New course">
      <div className={h.wizSteps}>
        {steps.map((st, i) => (
          <span key={st} className={`${h.wizStep} ${i < 4 ? h.wizDone : h.wizNow}`}>
            {i < 4 ? <Check size={12} strokeWidth={4} /> : null} {st}
          </span>
        ))}
      </div>
      <div className={h.courseHead}>
        <span className={h.trackPill}>
          <Code2 size={14} strokeWidth={3} /> Coding · Beginner
        </span>
        <strong className={h.courseTitle}>Python for Data</strong>
      </div>
      {OUTLINE.map((m, i) => (
        <Pop key={m.module} delay={0.2 + i * 0.12} className={h.module}>
          <span className={h.moduleName}>
            Module {i + 1}: {m.module}
          </span>
          {m.lessons.map((l) => (
            <span key={l} className={h.lesson}>
              {l}
              {/* The first two lessons of every paid course are free to try. */}
              {i === 0 && <span className={h.freeTag}>FREE</span>}
            </span>
          ))}
        </Pop>
      ))}
    </Studio>
  );
}

// ─── Step 3: the lesson builder, with its live phone preview ────────────────

const CARDS = [
  { icon: <FileText size={16} strokeWidth={2.75} />, label: 'Explanation' },
  { icon: <Code2 size={16} strokeWidth={2.75} />, label: 'Code' },
  { icon: <Video size={16} strokeWidth={2.75} />, label: 'Video · 1:40' },
  { icon: <HelpCircle size={16} strokeWidth={2.75} />, label: 'Quick check' },
];

export function LessonBuilderVisual() {
  const phases = ['Learn', 'Apply', 'Reflect', 'Deepen'];
  return (
    <Studio title="Lesson builder · Lists and loops" className={h.builderWide}>
      <div className={h.builder}>
        <div className={h.phaseCol}>
          {phases.map((p, i) => (
            <span key={p} className={`${h.phase} ${i === 0 ? h.phaseOn : ''} ${i === 3 ? h.phaseOpt : ''}`}>
              {i < 2 ? <Check size={12} strokeWidth={4} /> : null}
              {p}
              {i === 3 && <em>optional</em>}
            </span>
          ))}
        </div>
        <div className={h.cardCol}>
          {CARDS.map((c, i) => (
            <Pop key={c.label} delay={0.15 + i * 0.1} className={h.cardRow}>
              <span className={h.cardIcon}>{c.icon}</span>
              {c.label}
            </Pop>
          ))}
          <span className={h.saved}>
            <Check size={12} strokeWidth={4} /> Saved
          </span>
        </div>
        <div className={h.phone}>
          <span className={h.phoneBar} />
          <span className={h.phoneKicker}>Learn</span>
          <span className={h.phoneText}>A loop repeats code for every item in a list.</span>
          <pre className={h.phoneCode}>{'for n in nums:\n    print(n)'}</pre>
          <span className={h.phoneBtn}>Continue</span>
        </div>
      </div>
    </Studio>
  );
}

// ─── Step 4: one price → monthly and yearly plans ───────────────────────────

export function PricingVisual() {
  return (
    <Studio title="Course details · Pricing">
      <span className={h.kicker}>Your yearly price</span>
      <div className={h.priceInput}>
        <span>$</span>
        <strong>{EXAMPLE_COURSE_PRICE}</strong>
      </div>
      <div className={h.planRow}>
        <Pop delay={0.2} className={h.planCard}>
          <span className={h.kicker}>Yearly</span>
          <strong>${EXAMPLE_YEARLY}</strong>
          <span>a year</span>
        </Pop>
        <Pop delay={0.35} className={h.planCard}>
          <span className={h.kicker}>Monthly</span>
          <strong>{money(EXAMPLE_MONTHLY)}</strong>
          <span>a month</span>
        </Pop>
      </div>
      <Pop delay={0.6} className={h.keepRow}>
        <Sparkles size={16} strokeWidth={2.75} /> You keep {money(EXAMPLE_KEEP_MONTHLY)} of every monthly payment
      </Pop>
      <span className={h.freeNote}>Lessons 1 and 2 are always free to try</span>
    </Studio>
  );
}

// ─── Step 5: the review checklist and the road to live ──────────────────────

export function ReviewVisual() {
  const checks = ['Every lesson published', 'Title, level and description', 'Outcomes and requirements', 'Cover image', 'Price set'];
  const flow = ['Build', 'Review', 'Approved', 'Live'];
  return (
    <Studio title="Review">
      <div className={h.checklist}>
        {checks.map((c, i) => (
          <Pop key={c} delay={0.1 + i * 0.1} className={h.checkItem}>
            <span className={h.checkDot}>
              <Check size={14} strokeWidth={4} />
            </span>
            {c}
          </Pop>
        ))}
      </div>
      <div className={h.flow}>
        {flow.map((f, i) => (
          <span key={f} className={h.flowItem}>
            <span className={`${h.flowPill} ${i === flow.length - 1 ? h.flowLive : ''}`}>{f}</span>
            {i < flow.length - 1 && <ArrowRight size={14} strokeWidth={3} />}
          </span>
        ))}
      </div>
      <Pop delay={0.8} className={h.approved}>
        <BadgeCheck size={20} strokeWidth={2.75} /> Approved · live in Explore
      </Pop>
    </Studio>
  );
}

// ─── Step 6: launch to your audience ────────────────────────────────────────

export function LaunchVisual() {
  return (
    <div className={h.stack} aria-hidden="true">
      <div className={`${s.card} ${h.profile}`}>
        <span className={h.avatar}>A</span>
        <span className={h.profileText}>
          <strong>Ada Okafor</strong>
          <span className={h.founding}>
            <Crown size={12} strokeWidth={2.75} /> Founding creator
          </span>
          <span className={h.meta}>Coding · Python for Data</span>
        </span>
        <span className={h.follow}>
          <UserPlus size={14} strokeWidth={3} /> Follow
        </span>
      </div>
      <Pop delay={0.4} className={`${s.card} ${h.coupon}`}>
        <span className={h.couponHead}>
          <Ticket size={18} strokeWidth={2.75} /> <strong>LAUNCH20</strong>
          <span className={h.couponOff}>20% off</span>
        </span>
        <span className={h.meta}>First payment · ends in 7 days · 100 uses</span>
        <span className={h.linkRow}>
          <Link2 size={14} strokeWidth={3} />
          <span className={h.link}>teyro.app/courses/python-for-data?code=LAUNCH20</span>
          <Copy size={14} strokeWidth={3} />
        </span>
      </Pop>
      <Pop delay={0.8} className={`${s.card} ${h.toast}`}>
        <span className={h.floatIcon} style={{ background: 'var(--success-green)' }}>
          <Sparkles size={16} strokeWidth={2.75} />
        </span>
        <span>
          <strong>12 learners joined on launch day</strong>
          <span className={h.meta}>Your course community just started</span>
        </span>
      </Pop>
    </div>
  );
}

// ─── Step 7: every learner, grouped so you know who needs what ──────────────

const SEGMENTS = [
  { label: 'New', n: 18, tone: 'var(--color-brand)' },
  { label: 'On fire', n: 41, tone: 'var(--warning)' },
  { label: 'Almost done', n: 12, tone: 'var(--success-green)' },
  { label: 'Struggling', n: 7, tone: 'var(--brand-purple)' },
  { label: 'Going quiet', n: 9, tone: 'var(--error-red)' },
];

export function SegmentsVisual() {
  return (
    <div className={h.stack} aria-hidden="true">
      <Studio title="Learners">
        <div className={h.segments}>
          {SEGMENTS.map((sg, i) => (
            <Pop key={sg.label} delay={0.1 + i * 0.08} className={h.segment}>
              <span className={h.segDot} style={{ background: sg.tone }} />
              <span>{sg.label}</span>
              <strong>{sg.n}</strong>
            </Pop>
          ))}
        </div>
        <div className={h.compose}>
          <span className={h.kicker}>Nudge · Going quiet (9)</span>
          <span className={h.composeText}>
            Hey <mark>{'{first}'}</mark>, lesson 4 trips a lot of people up. You&apos;ve got this!
          </span>
          <span className={h.sendBtn}>
            <Send size={14} strokeWidth={3} /> Send
          </span>
        </div>
      </Studio>
      <Pop delay={0.9} className={`${s.card} ${h.toast}`}>
        <span className={h.floatIcon} style={{ background: 'var(--warning)' }}>
          <Flame size={16} strokeWidth={2.75} fill="currentColor" />
        </span>
        <span>
          <strong>Priya is back</strong>
          <span className={h.meta}>Finished lesson 4 an hour after your nudge</span>
        </span>
      </Pop>
    </div>
  );
}

// ─── Outcome: what one course can become (clearly an example) ───────────────

const GROWTH = [
  { m: 'Nov', subs: 25 },
  { m: 'Dec', subs: 55 },
  { m: 'Jan', subs: 90 },
  { m: 'Feb', subs: 120 },
  { m: 'Mar', subs: 160 },
  { m: 'Apr', subs: 200 },
];

export function OutcomeVisual() {
  const max = GROWTH[GROWTH.length - 1].subs;
  const last = GROWTH[GROWTH.length - 1];
  return (
    <Studio title="Earnings · example">
      <span className={h.kicker}>Earned in {last.m}</span>
      <strong className={h.bigMoney}>${(last.subs * EXAMPLE_KEEP_MONTHLY).toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
      <span className={h.planSub}>
        {last.subs} subscribers × {money(EXAMPLE_KEEP_MONTHLY)}
      </span>
      <div className={h.cols}>
        {GROWTH.map((g, i) => (
          <span key={g.m} className={h.colSlot}>
            <motion.span
              className={`${h.col} ${i === GROWTH.length - 1 ? h.colNow : ''}`}
              initial={{ height: '6%' }}
              whileInView={{ height: `${(g.subs / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 + i * 0.08 }}
            />
            <span className={h.colLabel}>{g.m}</span>
          </span>
        ))}
      </div>
      <span className={h.freeNote}>
        <Lightbulb size={14} strokeWidth={2.75} /> An example of one {`$${EXAMPLE_COURSE_PRICE}`} course, not a promise
      </span>
    </Studio>
  );
}
