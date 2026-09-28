'use client';

/**
 * The Creator Guide's pictures — small, faithful drawings of the Studio
 * screens each article explains. Pure CSS, token colours, so they stay sharp
 * and follow the theme. Decorative: every one has a caption and the article
 * text says the same thing in words.
 */

import type { CSSProperties, ReactNode } from 'react';
import {
  BarChart3,
  BookOpen,
  Check,
  CircleAlert,
  Clock,
  Code2,
  Home,
  ImageIcon,
  Lightbulb,
  Lock,
  MessageCircleQuestion,
  MessagesSquare,
  Mic,
  Pin,
  Play,
  Send,
  TicketPercent,
  Trophy,
  Type,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { GuideVisual } from '@/lib/creator/guide';
import g from './guide.module.css';

const tone = (t: string) => ({ '--tone': t }) as CSSProperties;

function Frame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className={g.frame} aria-hidden="true">
      {label && (
        <div className={g.frameBar}>
          <i />
          <i />
          <i />
          <span>{label}</span>
        </div>
      )}
      <div className={g.frameBody}>{children}</div>
    </div>
  );
}

function Tile({ icon: Icon, t, size = 18 }: { icon: LucideIcon; t: string; size?: number }) {
  return (
    <span className={g.tile} style={tone(t)}>
      <Icon size={size} strokeWidth={2.5} />
    </span>
  );
}

/* ── individual pictures ──────────────────────────────────────────────── */

function StudioMap() {
  const groups: { label: string | null; items: { icon: LucideIcon; name: string; t: string; dot?: number; on?: boolean }[] }[] = [
    { label: null, items: [{ icon: Home, name: 'Home', t: 'var(--color-brand)', on: true }] },
    { label: 'Build', items: [{ icon: BookOpen, name: 'Courses', t: 'var(--success-green)' }] },
    {
      label: 'Grow',
      items: [
        { icon: Users, name: 'Learners', t: 'var(--brand-purple)', dot: 3 },
        { icon: MessagesSquare, name: 'Community', t: 'var(--warning)', dot: 2 },
        { icon: BarChart3, name: 'Analytics', t: 'var(--color-brand)' },
      ],
    },
    {
      label: 'Earn',
      items: [
        { icon: Wallet, name: 'Earnings', t: 'var(--success-green)' },
        { icon: TicketPercent, name: 'Coupons', t: 'var(--error-red)' },
      ],
    },
  ];
  return (
    <Frame label="Teyro Studio">
      <div className={g.map}>
        {groups.map((grp, i) => (
          <div key={i} className={g.mapGroup}>
            {grp.label && <span className={g.mapLabel}>{grp.label}</span>}
            {grp.items.map((it) => (
              <span key={it.name} className={`${g.mapRow} ${it.on ? g.mapRowOn : ''}`}>
                <Tile icon={it.icon} t={it.t} />
                {it.name}
                {it.dot && <span className={g.dot}>{it.dot}</span>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

const PHASES = [
  { name: 'Learn', sub: 'Teach one idea', t: 'var(--color-brand)', w: 34 },
  { name: 'Apply', sub: 'Practise it', t: 'var(--success-green)', w: 38 },
  { name: 'Reflect', sub: 'Own words', t: 'var(--brand-purple)', w: 16 },
  { name: 'Deepen', sub: 'Optional', t: 'var(--warning)', w: 12 },
];

function LessonShape() {
  return (
    <Frame>
      <div className={g.shape}>
        {PHASES.map((p, i) => (
          <span key={p.name} className={`${g.shapeSeg} ${i === 3 ? g.shapeOptional : ''}`} style={{ ...tone(p.t), flexGrow: p.w }}>
            <strong>{p.name}</strong>
            <span>{p.sub}</span>
          </span>
        ))}
      </div>
      <div className={g.shapeFoot}>
        <Clock size={14} strokeWidth={2.75} /> A few minutes, one idea, practice every time
      </div>
    </Frame>
  );
}

function CourseShape() {
  const mods = [
    { name: 'Getting started', lessons: ['What you’ll build', 'Your first lines of code'] },
    { name: 'Core ideas', lessons: ['Variables', 'Loops', 'Functions'] },
  ];
  let n = 0;
  return (
    <Frame>
      <div className={g.course}>
        {mods.map((m, mi) => (
          <div key={m.name} className={g.module}>
            <span className={g.moduleHead}>
              <span className={g.moduleNum}>{mi + 1}</span>
              {m.name}
            </span>
            {m.lessons.map((l) => {
              n += 1;
              return (
                <span key={l} className={g.lessonRow}>
                  <span className={g.lessonNum}>{n}</span>
                  <span className={g.grow}>{l}</span>
                  {n <= 2 ? <span className={g.free}>FREE</span> : <Lock size={14} strokeWidth={2.75} className={g.muted} />}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Wizard() {
  const steps = ['Track', 'Level', 'Title', 'Outline', 'Create'];
  return (
    <Frame>
      <div className={g.wizBar}>
        <span className={g.wizFill} style={{ width: '60%' }} />
      </div>
      <div className={g.wizSteps}>
        {steps.map((s, i) => (
          <span key={s} className={`${g.wizStep} ${i < 3 ? g.wizDone : ''} ${i === 3 ? g.wizNow : ''}`}>
            <span className={g.wizDot}>{i < 3 ? <Check size={14} strokeWidth={4} /> : i + 1}</span>
            {s}
          </span>
        ))}
      </div>
      <div className={g.choices}>
        <span className={`${g.choice} ${g.choiceOn}`}>
          <strong>Start with an outline</strong>
          <span>3 modules with lesson titles to rename</span>
        </span>
        <span className={g.choice}>
          <strong>Start blank</strong>
          <span>An empty course</span>
        </span>
      </div>
    </Frame>
  );
}

function Workspace() {
  return (
    <Frame label="Python for Data">
      <div className={g.wsHero}>
        <span>
          <span className={g.pill} style={tone('var(--text-muted)')}>
            Draft
          </span>
          <strong>6 of 8 lessons ready</strong>
        </span>
        <span className={g.btnMini}>
          Continue <Play size={12} strokeWidth={3} fill="currentColor" />
        </span>
      </div>
      <div className={g.tabs}>
        {['Curriculum', 'Details', 'Review'].map((t, i) => (
          <span key={t} className={`${g.tab} ${i === 0 ? g.tabOn : ''}`}>
            {t}
          </span>
        ))}
      </div>
      <div className={g.lines}>
        <i style={{ width: '82%' }} />
        <i style={{ width: '64%' }} />
        <i style={{ width: '72%' }} />
      </div>
    </Frame>
  );
}

function BuilderLayout() {
  return (
    <Frame label="Lesson builder">
      <div className={g.builder}>
        <div className={g.rail}>
          {PHASES.map((p, i) => (
            <span key={p.name} className={`${g.railItem} ${i === 1 ? g.railOn : ''}`} style={tone(p.t)}>
              <span className={g.railDot}>{i === 0 ? <Check size={11} strokeWidth={4} /> : null}</span>
              {p.name}
            </span>
          ))}
        </div>
        <div className={g.editor}>
          <span className={g.editorKicker}>Find the bug</span>
          <span className={g.codeLine}>for i in range(3)</span>
          <span className={`${g.codeLine} ${g.codeBug}`}>print(i</span>
          <span className={g.editorAdd}>+ Add exercise</span>
        </div>
        <div className={g.phone}>
          <span className={g.phoneBar} />
          <span className={g.phoneQ}>Tap the line with the mistake</span>
          <span className={g.phoneOpt}>for i in range(3)</span>
          <span className={`${g.phoneOpt} ${g.phoneOptOn}`}>print(i</span>
        </div>
      </div>
    </Frame>
  );
}

function LearnCards() {
  const kinds: { icon: LucideIcon; name: string; t: string }[] = [
    { icon: Type, name: 'Explanation', t: 'var(--color-brand)' },
    { icon: Code2, name: 'Code', t: 'var(--color-ink)' },
    { icon: Play, name: 'Video', t: 'var(--error-red)' },
    { icon: Mic, name: 'Audio', t: 'var(--brand-purple)' },
    { icon: ImageIcon, name: 'Image', t: 'var(--success-green)' },
    { icon: Lightbulb, name: 'Tip', t: 'var(--warning)' },
    { icon: Check, name: 'Quick check', t: 'var(--color-brand)' },
  ];
  return (
    <Frame>
      <div className={g.cardsRow}>
        <div className={g.stackCards}>
          <span className={g.stackBack} />
          <span className={g.stackMid} />
          <span className={g.stackTop}>
            <span className={g.editorKicker}>Card 2 of 6</span>
            <strong>A loop repeats code</strong>
            <span className={g.codeLine}>for i in range(3):</span>
          </span>
        </div>
        <div className={g.kinds}>
          {kinds.map((k) => (
            <span key={k.name} className={g.kind}>
              <Tile icon={k.icon} t={k.t} size={14} />
              {k.name}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Exercises() {
  const coding = ['Predict the output', 'Fill in the code', 'Find the bug', 'Put the code in order', 'Multiple choice', 'Match the terms'];
  const ai = ['Pick the better prompt', 'Complete the prompt', 'Spot the problem', 'Order the workflow', 'Multiple choice', 'Match the terms'];
  return (
    <Frame>
      <div className={g.twoCol}>
        {[
          { title: 'Coding', list: coding, t: 'var(--color-brand)' },
          { title: 'AI', list: ai, t: 'var(--brand-purple)' },
        ].map((col) => (
          <div key={col.title} className={g.exCol} style={tone(col.t)}>
            <strong className={g.exTitle}>{col.title}</strong>
            {col.list.map((x) => (
              <span key={x} className={g.exItem}>
                {x}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Reflect() {
  return (
    <Frame>
      <div className={g.twoCol}>
        <div className={g.reflectCard}>
          <span className={g.editorKicker}>Open</span>
          <strong>Where would you use a loop in your own project?</strong>
          <span className={g.starter}>I could use it to…</span>
        </div>
        <div className={g.reflectCard}>
          <span className={g.editorKicker}>Guided</span>
          <span className={g.guided}>1. What did you learn?</span>
          <span className={g.guided}>2. What surprised you?</span>
          <span className={g.guided}>3. What will you try?</span>
        </div>
      </div>
    </Frame>
  );
}

function Checklist() {
  const items = [
    ['A title of at least 5 characters', true],
    ['Track chosen: Coding or AI', true],
    ['A description of at least 40 characters', true],
    ['At least one module', true],
    ['Every module has a lesson', true],
    ['Every lesson marked ready (2 still draft)', false],
  ] as const;
  return (
    <Frame label="Review">
      <div className={g.checks}>
        {items.map(([label, ok]) => (
          <span key={label} className={`${g.check} ${ok ? g.checkOk : ''}`}>
            <span className={g.checkBox}>{ok ? <Check size={12} strokeWidth={4} /> : null}</span>
            {label}
          </span>
        ))}
      </div>
      <span className={`${g.btnMini} ${g.btnOff}`}>
        <Send size={12} strokeWidth={3} /> Submit for review
      </span>
    </Frame>
  );
}

function ReviewFlow() {
  const steps = [
    { name: 'Build', t: 'var(--text-muted)' },
    { name: 'Review', t: 'var(--brand-purple)' },
    { name: 'Approved', t: 'var(--color-brand)' },
    { name: 'Live', t: 'var(--success-green)' },
  ];
  return (
    <Frame>
      <div className={g.flow}>
        {steps.map((s, i) => (
          <span key={s.name} className={g.flowStep} style={tone(s.t)}>
            <span className={g.flowDot}>{i === 3 ? <Trophy size={14} strokeWidth={2.75} /> : i + 1}</span>
            {s.name}
          </span>
        ))}
      </div>
      <div className={g.flowLoop}>
        <CircleAlert size={16} strokeWidth={2.75} /> Changes requested → read the notes, fix, submit again
      </div>
    </Frame>
  );
}

function Pricing() {
  return (
    <Frame>
      <div className={g.price}>
        <span className={g.priceBase}>
          <span className={g.editorKicker}>Your yearly price</span>
          <strong>$60</strong>
        </span>
        <span className={g.priceArrow}>→</span>
        <div className={g.plans}>
          <span className={g.plan}>
            <strong>$60</strong> a year
            <em>you keep $42</em>
          </span>
          <span className={g.plan}>
            <strong>$10</strong> a month
            <em>you keep $7</em>
          </span>
        </div>
      </div>
      <div className={g.shapeFoot}>
        <Lock size={14} strokeWidth={2.75} /> First 2 lessons free, then learners subscribe
      </div>
    </Frame>
  );
}

function Segments() {
  const segs = [
    { name: 'New', t: 'var(--color-brand)', n: 12 },
    { name: 'On fire', t: 'var(--warning)', n: 8 },
    { name: 'Almost done', t: 'var(--brand-purple)', n: 5 },
    { name: 'Struggling', t: 'var(--warning)', n: 3 },
    { name: 'Going quiet', t: 'var(--error-red)', n: 9 },
  ];
  return (
    <Frame label="Learners">
      <div className={g.segs}>
        {segs.map((s) => (
          <span key={s.name} className={g.seg} style={tone(s.t)}>
            {s.name} <strong>{s.n}</strong>
          </span>
        ))}
      </div>
      <div className={g.nudge}>
        <span className={g.face} style={tone('var(--brand-purple)')}>
          T
        </span>
        <span className={g.grow}>
          <strong>Tunde</strong> · quiet 8 days · Lesson 4
        </span>
        <span className={g.btnMini}>Nudge</span>
      </div>
    </Frame>
  );
}

function CommunityAdmin() {
  return (
    <Frame label="Community">
      <div className={g.post}>
        <span className={g.postHead}>
          <Pin size={13} strokeWidth={2.75} /> Announcement · New unit is live
        </span>
      </div>
      <div className={g.post}>
        <span className={g.postHead}>
          <MessageCircleQuestion size={14} strokeWidth={2.75} className={g.warnIcon} /> Ada asked · 12m
          <span className={g.unanswered}>Waiting for you</span>
        </span>
        <span className={g.postBody}>Why does groupby drop missing values?</span>
      </div>
    </Frame>
  );
}

function PathFlags() {
  const rows = [
    { n: 1, pct: 100 },
    { n: 2, pct: 92 },
    { n: 3, pct: 85, flag: 'Hard' },
    { n: 4, pct: 54, flag: 'Drop' },
    { n: 5, pct: 50, flag: 'Slow' },
  ];
  return (
    <Frame label="Analytics">
      <div className={g.funnel}>
        {rows.map((r) => (
          <span key={r.n} className={`${g.fRow} ${r.flag === 'Drop' ? g.fDrop : ''}`}>
            <span className={g.fLabel}>Lesson {r.n}</span>
            <span className={g.fBar}>
              <i style={{ width: `${r.pct}%` }} />
            </span>
            {r.flag ? <span className={g.flag}>{r.flag}</span> : <span className={g.fPct}>{r.pct}%</span>}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function Coupon() {
  return (
    <Frame>
      <div className={g.ticket}>
        <span className={g.ticketLeft}>
          <strong>20%</strong>
          <span>off</span>
        </span>
        <span className={g.ticketRight}>
          <span className={g.code}>LAUNCH20</span>
          <span>Ends in 7 days · 100 uses</span>
          <span className={g.link}>teyro.app/courses/…?code=LAUNCH20</span>
        </span>
      </div>
    </Frame>
  );
}

function Payouts() {
  return (
    <Frame label="Earnings">
      <div className={g.balances}>
        <span>
          <span className={g.editorKicker}>Clearing (14 days)</span>
          <strong>$214.20</strong>
        </span>
        <span>
          <span className={g.editorKicker}>Available</span>
          <strong className={g.good}>$642.30</strong>
        </span>
      </div>
      <div className={g.flow}>
        {['Requested', 'Processing', 'Paid'].map((s) => (
          <span key={s} className={g.flowStep} style={tone('var(--success-green)')}>
            <span className={g.flowDot}><Check size={14} strokeWidth={4} /></span>
            {s}
          </span>
        ))}
      </div>
    </Frame>
  );
}

const MAP: Record<GuideVisual, () => React.JSX.Element> = {
  studioMap: StudioMap,
  lessonShape: LessonShape,
  courseShape: CourseShape,
  wizard: Wizard,
  workspace: Workspace,
  builderLayout: BuilderLayout,
  learnCards: LearnCards,
  exercises: Exercises,
  reflect: Reflect,
  reviewFlow: ReviewFlow,
  checklist: Checklist,
  pricing: Pricing,
  segments: Segments,
  communityAdmin: CommunityAdmin,
  pathFlags: PathFlags,
  coupon: Coupon,
  payouts: Payouts,
};

export function GuideVisualView({ v, caption }: { v: GuideVisual; caption: string }) {
  const V = MAP[v];
  return (
    <figure className={g.figure}>
      <V />
      <figcaption className={g.caption}>{caption}</figcaption>
    </figure>
  );
}
