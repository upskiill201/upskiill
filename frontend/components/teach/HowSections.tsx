/**
 * /teach/how-it-works — the creator journey, step by step, as a marketing
 * page: what teaching on Teyro means, what creators get, how they build and
 * what success looks like. Also the source page for creator launch videos, so
 * the fact sheet near the end has to stay exact.
 *
 * Copy rule (same as /teach): only claim what ships. Studio mechanics come
 * from lib/creator/guide.ts, money from lib/pricing-engine.ts, the share and
 * payout rules from backend EarningsService. People and numbers inside the
 * visuals are illustrative and labelled that way.
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, Check, Clapperboard, CodeXml, Crown, GraduationCap, Users } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import { Reveal } from '@/components/homepage/v3/Visuals';
import s from '@/components/homepage/v3/Home.module.css';
import { CommunityVisual, PayoutVisual, RetentionVisual } from './TeachVisuals';
import { EXAMPLE_COURSE_PRICE, EXAMPLE_KEEP_MONTHLY, EXAMPLE_MONTHLY, EXAMPLE_YEARLY } from './howPricing';
import {
  JourneyHeroVisual,
  LaunchVisual,
  LessonBuilderVisual,
  OnboardingVisual,
  OutcomeVisual,
  PricingVisual,
  ReviewVisual,
  SegmentsVisual,
  WizardVisual,
} from './HowVisuals';
import { TEACH_HREF, TEACH_LABEL } from './TeachSections';
import { FOUNDING_SHARE_PCT, STANDARD_SHARE_PCT } from '@/lib/launch';
import h from './HowSections.module.css';

const money = (n: number) => `$${n.toFixed(2)}`;
const EXAMPLE_LEARNERS = 200;
const EXAMPLE_MONTH = Math.round(EXAMPLE_LEARNERS * EXAMPLE_KEEP_MONTHLY);

// ─── Hero ────────────────────────────────────────────────────────────────────

export function HowHero() {
  return (
    <section className={s.hero} aria-labelledby="how-hero-title">
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <span className={s.eyebrow} style={{ marginBottom: 0 }}>
            How teaching on Teyro works
          </span>
          <h1 id="how-hero-title" className={`${s.display} ${s.h1}`}>
            From what you know <em>to a course people finish.</em>
          </h1>
          <p className={s.lead}>
            Tey plans your first course with you. You build short, hands-on lessons in Teyro Studio. We review it, you
            launch it to your audience, and Teyro keeps your learners coming back while you keep {STANDARD_SHARE_PCT}% of every payment ({FOUNDING_SHARE_PCT}% for Founding Creators).
          </p>
          <div className={s.heroActions}>
            <Link href={TEACH_HREF} className={s.btn}>
              {TEACH_LABEL}
            </Link>
            <a href="#journey" className={s.btnGhost}>
              See every step
            </a>
          </div>
          <div className={s.heroNote}>
            {['Free to publish', `Keep up to ${FOUNDING_SHARE_PCT}%`, 'No camera needed'].map((n) => (
              <span key={n}>
                <Check size={16} strokeWidth={4} aria-hidden="true" /> {n}
              </span>
            ))}
          </div>
        </div>
        <JourneyHeroVisual />
      </div>
    </section>
  );
}

// ─── At a glance ─────────────────────────────────────────────────────────────

const GLANCE = [
  { big: `${STANDARD_SHARE_PCT}%`, line: `of every payment is yours (${FOUNDING_SHARE_PCT}% for Founding Creators)` },
  { big: '2', line: 'free lessons, then learners subscribe' },
  { big: '4', line: 'short steps in every lesson' },
  { big: '$50', line: 'to withdraw, to bank or mobile money' },
];

export function Glance() {
  return (
    <section className={`${s.band} ${s.tint} ${h.glanceBand}`} aria-label="Teaching on Teyro at a glance">
      <div className={`${s.wrap} ${h.glance}`}>
        {GLANCE.map((g, i) => (
          <Reveal key={g.big} delay={i * 0.06} className={h.glanceItem}>
            <span className={`${s.display} ${h.glanceBig}`}>{g.big}</span>
            <span className={h.glanceLine}>{g.line}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── The journey, as a path ──────────────────────────────────────────────────

export const JOURNEY = [
  { id: 'plan', title: 'Plan with Tey' },
  { id: 'create', title: 'Create your course' },
  { id: 'build', title: 'Build lessons' },
  { id: 'price', title: 'Set one price' },
  { id: 'review', title: 'Get reviewed' },
  { id: 'launch', title: 'Launch' },
  { id: 'grow', title: 'Keep learners going' },
  { id: 'community', title: 'Run your community' },
  { id: 'paid', title: 'Get paid' },
];

export function JourneyPath() {
  return (
    <section className={s.band} id="journey" aria-labelledby="journey-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>The journey</span>
          <h2 id="journey-title" className={`${s.display} ${s.h2}`}>
            Nine steps. <em>Tey walks every one with you.</em>
          </h2>
        </Reveal>
        <nav className={h.path} aria-label="Jump to a step">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.id} delay={i * 0.05} className={h.pathItem}>
              <a href={`#${j.id}`} className={h.pathLink}>
                <span className={h.pathNode}>{i + 1}</span>
                <span className={h.pathTitle}>{j.title}</span>
              </a>
            </Reveal>
          ))}
        </nav>
      </div>
    </section>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step({
  id,
  n,
  title,
  copy,
  points,
  visual,
  flip = false,
  tint = false,
}: {
  id: string;
  n: number;
  title: React.ReactNode;
  copy: string;
  points: string[];
  visual: React.ReactNode;
  flip?: boolean;
  tint?: boolean;
}) {
  return (
    <section className={`${s.band} ${tint ? s.tint : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className={`${s.wrap} ${s.split} ${flip ? s.splitFlip : ''}`}>
        <Reveal className={s.splitCopy}>
          <span className={h.stepTag}>
            <span className={h.stepNum}>{n}</span> Step {n} of {JOURNEY.length}
          </span>
          <h2 id={`${id}-title`} className={`${s.display} ${s.h2}`}>
            {title}
          </h2>
          <p className={s.lead}>{copy}</p>
          <ul className={s.points}>
            {points.map((p) => (
              <li key={p}>
                <span className={s.tick} aria-hidden="true">
                  <Check size={16} strokeWidth={4} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className={s.splitVisual}>
          {visual}
        </Reveal>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <>
      <Step
        id="plan"
        n={1}
        title={
          <>
            Tell Tey what you teach. <em>Get a plan.</em>
          </>
        }
        copy="A few quick questions about you, your topic, your audience and your time. Tey turns the answers into a realistic plan for your first course, sized to the hours you actually have."
        points={[
          'Working engineer, teacher, YouTuber, mentor or first-timer: all welcome',
          'Bring what you already have: videos, notes, slides, a course or a community',
          'A first course of 8 lessons, ready in about 2 to 8 weeks depending on your hours',
        ]}
        visual={<OnboardingVisual />}
      />
      <Step
        id="create"
        n={2}
        title={
          <>
            Five taps, <em>and your course exists.</em>
          </>
        }
        copy="The course wizard asks for your track, level and a working title, then hands you a starter outline of three modules to rename. No blank page."
        points={[
          'Coding or AI, Beginner to Advanced',
          'Start from an outline, or from blank if you prefer',
          'One workspace per course: Curriculum, Details and Review',
        ]}
        visual={<WizardVisual />}
        flip
        tint
      />
      <Step
        id="build"
        n={3}
        title={
          <>
            Build lessons <em>people actually do.</em>
          </>
        }
        copy="Every lesson runs in four short steps. Learn teaches one idea with bite-size cards. Apply puts it to work in exercises checked instantly. Reflect makes it stick. Deepen is there for the curious."
        points={[
          'Seven card types: explanation, code, video, audio, image, tip and quick check',
          'Exercises written for your track, like find the bug or pick the better prompt',
          'A live phone preview beside the editor, and everything autosaves',
          'Video is optional: teach with text, code or audio if you prefer',
        ]}
        visual={<LessonBuilderVisual />}
      />
      <Step
        id="price"
        n={4}
        title={
          <>
            Set a yearly price. <em>Earn on every renewal.</em>
          </>
        }
        copy={`Your price is what a learner pays for a year. Teyro adds a monthly plan at one sixth of it, so a $${EXAMPLE_COURSE_PRICE} course is $${EXAMPLE_YEARLY} a year or ${money(EXAMPLE_MONTHLY)} a month. Learners take two lessons free first, so they subscribe once they trust you.`}
        points={[
          `You keep 70%: ${money(EXAMPLE_KEEP_MONTHLY)} of every ${money(EXAMPLE_MONTHLY)} monthly payment`,
          'Paid again every month a learner keeps learning',
          'Free courses welcome too, to build your audience first',
        ]}
        visual={<PricingVisual />}
        flip
        tint
      />
      <Step
        id="review"
        n={5}
        title={
          <>
            Reviewed, <em>then live.</em>
          </>
        }
        copy="A checklist shows exactly what is left. When it is all ticked, submit. A Teyro reviewer takes your course the way a learner would, and you get clear notes if anything needs fixing."
        points={[
          'Every course is checked, so learners trust what they find',
          'Reviewer notes land in your Studio with a notification',
          'Approved courses go live in Explore when you press publish',
        ]}
        visual={<ReviewVisual />}
      />
      <Step
        id="launch"
        n={6}
        title={
          <>
            Launch it <em>to your people.</em>
          </>
        }
        copy="Your public creator page shows your courses and lets learners follow you. Make a launch coupon, share its link with your audience, and your first learners arrive with the discount already applied."
        points={[
          'Percent or fixed-amount coupons, with an end date and a use limit',
          'Coupon links open your course with the code applied',
          'Founding creators carry a Founding badge on their page',
          'No audience yet? Teyro brings learners to your course too',
        ]}
        visual={<LaunchVisual />}
        flip
        tint
      />
      <Step
        id="grow"
        n={7}
        title={
          <>
            Keep every learner <em>moving.</em>
          </>
        }
        copy="Your Studio groups learners so you know who needs what: new, on fire, almost done, struggling or going quiet. Send a nudge or a cheer in one tap, with each learner's first name in it. Analytics flags the lessons where people drop, struggle or slow down."
        points={[
          'Reach up to 50 learners at once, with built-in limits so nobody gets spammed',
          'See where inside a lesson learners quit, and which exercises they miss',
          'Home tells you when someone has gone quiet for a week',
        ]}
        visual={<SegmentsVisual />}
      />
      <Step
        id="community"
        n={8}
        title={
          <>
            A classroom <em>you run.</em>
          </>
        }
        copy="Every live course gets its own community, with you as admin. Learners join after two lessons, so the people inside are genuinely learning. Answer questions, post announcements and set challenges."
        points={[
          'Unanswered questions flagged on your Studio home',
          'Announcements and challenges reach every member',
          'Mute rule-breakers for 1, 7 or 30 days',
        ]}
        visual={<CommunityVisual />}
        flip
        tint
      />
      <Step
        id="paid"
        n={9}
        title={
          <>
            Your money, <em>wherever you are.</em>
          </>
        }
        copy="Every payment shows in Earnings straight away. After 14 days it clears, and from $50 you can request a payout to your bank or mobile money, in any country, and follow it until it is paid."
        points={[
          '70% of the first payment and every renewal after it',
          'Earnings recorded in US dollars',
          'Statements to download for your records',
        ]}
        visual={<PayoutVisual />}
      />
    </>
  );
}

// ─── The part Teyro does for you ─────────────────────────────────────────────

export function TeyroDoes() {
  return (
    <section className={`${s.band} ${s.tint}`} aria-labelledby="does-title">
      <div className={`${s.wrap} ${s.split}`}>
        <Reveal className={s.splitCopy}>
          <span className={s.eyebrow}>While you teach</span>
          <h2 id="does-title" className={`${s.display} ${s.h2}`}>
            Teyro does <em>the hard part.</em>
          </h2>
          <p className={s.lead}>
            Most learners quit online courses. On Teyro your course lives inside an app built to bring people back every
            day, so you spend your time teaching, not chasing.
          </p>
          <ul className={s.points}>
            {[
              'Streaks, weekly leagues and daily quests on every lesson',
              'Tey reminds learners before their streak runs out',
              'Lessons short enough to finish on a bus ride',
              'Hosting, payments and the learner app, all handled',
            ].map((p) => (
              <li key={p}>
                <span className={s.tick} aria-hidden="true">
                  <Check size={16} strokeWidth={4} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className={s.splitVisual}>
          <RetentionVisual />
        </Reveal>
      </div>
    </section>
  );
}

// ─── What success looks like ─────────────────────────────────────────────────

const WINS = [
  { art: '/User onbarding Assets/tey/badge.webp', title: 'Your first payout', line: 'Money from what you know, landing in your bank or mobile money.' },
  { art: '/User onbarding Assets/tey/podium.webp', title: 'Learners who finish', line: 'People reaching your last lesson, and coming back for your next course.' },
  { art: '/User onbarding Assets/tey/cheering.webp', title: 'A community that knows you', line: 'Questions answered, wins shared, your name on every reply.' },
];

export function Outcome() {
  return (
    <section className={s.band} id="outcome" aria-labelledby="outcome-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>What success looks like</span>
          <h2 id="outcome-title" className={`${s.display} ${s.h2}`}>
            One course. <em>Income every month.</em>
          </h2>
          <p className={s.lead}>
            Here is the maths on one ${EXAMPLE_COURSE_PRICE} course. If {EXAMPLE_LEARNERS} learners stay subscribed
            monthly, you keep about ${EXAMPLE_MONTH.toLocaleString('en-US')} that month, and again the next. It is an
            example, not a promise: your price and your learners decide the real number.
          </p>
        </Reveal>
        <div className={`${s.split} ${h.outcome}`}>
          <Reveal className={s.splitVisual}>
            <OutcomeVisual />
          </Reveal>
          <div className={h.wins}>
            {WINS.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className={h.win}>
                <Image src={w.art} alt="" width={72} height={84} style={{ objectFit: 'contain' }} />
                <span>
                  <strong className={`${s.display} ${h.winTitle}`}>{w.title}</strong>
                  <span className={h.winLine}>{w.line}</span>
                </span>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Link href="/teach#earnings" className={s.btnGhost}>
                Try the earnings calculator <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Founding creators ───────────────────────────────────────────────────────

export function Founding() {
  return (
    <section className={`${s.band} ${s.tint}`} id="founding" aria-labelledby="founding-title">
      <div className={s.wrap}>
        <Reveal className={h.founding}>
          <span className={h.crown} aria-hidden="true">
            <Crown size={36} strokeWidth={2.5} />
          </span>
          <span className={s.eyebrow}>Founding creators</span>
          <h2 id="founding-title" className={`${s.display} ${s.h2}`}>
            Be here <em>on day one.</em>
          </h2>
          <p className={s.lead}>
            Teyro Studio opens to creators in October 2026, a month before the learner app launches in November. Everyone
            who joins before the learner app launches becomes a Founding Creator.
          </p>
          <ul className={`${s.points} ${h.foundingList}`}>
            {[
              `Keep ${FOUNDING_SHARE_PCT}% of every payment (standard creators keep ${STANDARD_SHARE_PCT}%)`,
              'A Founding badge on your public creator page, for good',
              'Founding benefits inside Teyro Studio',
              'Your course ready in Explore when learners arrive',
            ].map((p) => (
              <li key={p}>
                <span className={s.tick} aria-hidden="true">
                  <Check size={16} strokeWidth={4} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link href={TEACH_HREF} className={s.btn}>
            Become a Founding Creator
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Who teaches ─────────────────────────────────────────────────────────────

const WHO = [
  { icon: <CodeXml size={24} strokeWidth={2.5} />, title: 'Working developers' },
  { icon: <BrainCircuit size={24} strokeWidth={2.5} />, title: 'AI builders' },
  { icon: <GraduationCap size={24} strokeWidth={2.5} />, title: 'Teachers and lecturers' },
  { icon: <Clapperboard size={24} strokeWidth={2.5} />, title: 'YouTubers and creators' },
  { icon: <Users size={24} strokeWidth={2.5} />, title: 'Mentors and coaches' },
];

export function Who() {
  return (
    <section className={s.band} aria-labelledby="who-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Who teaches on Teyro</span>
          <h2 id="who-title" className={`${s.display} ${s.h2}`}>
            You know it. <em>Now teach it.</em>
          </h2>
          <p className={s.lead}>
            Two tracks at launch, Coding and AI. With a following, you bring learners on day one. Without one, Teyro
            brings them to you.
          </p>
        </Reveal>
        <div className={h.who}>
          {WHO.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06} className={h.whoItem}>
              <span className={s.personaIcon}>{w.icon}</span>
              <strong>{w.title}</strong>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Fact sheet — exact, for press, partners and launch videos ──────────────

export const FACTS: [string, string][] = [
  ['What Teyro is', 'A gamified learning app for coding and AI — short daily lessons with streaks, leagues and friends — plus Teyro Studio, where creators build the courses.'],
  ['Tracks', 'Coding (web, mobile, programming fundamentals, software development) and AI (AI tools, agents, automations).'],
  ['Lesson format', 'Four steps: Learn (bite-size cards), Apply (instantly checked exercises), Reflect, and an optional Deepen.'],
  ['Pricing', `Free, or a yearly price the creator sets, plus a monthly plan at one sixth of it, so yearly saves learners 50% (a $${EXAMPLE_COURSE_PRICE} course is $${EXAMPLE_YEARLY} a year or ${money(EXAMPLE_MONTHLY)} a month). The first two lessons are free to try.`],
  ['Creator share', `${STANDARD_SHARE_PCT}% of every payment, including every renewal. Founding Creators keep ${FOUNDING_SHARE_PCT}%.`],
  ['Payouts', 'Recorded in USD; each payment clears after 14 days; withdraw from $50 to a bank account or mobile money, in any country.'],
  ['Quality', 'Every course is reviewed before it goes live.'],
  ['Creator tools', 'Course wizard, lesson builder with live phone preview, learner segments, nudges and cheers, analytics, course community, coupons and a public creator page.'],
  ['Founding Creators', `Early creators keep ${FOUNDING_SHARE_PCT}% of every payment instead of ${STANDARD_SHARE_PCT}%, and get a Founding badge and founding benefits in Studio.`],
  ['Dates', 'Creator Studio opens October 2026; the learner app launches November 2026.'],
  ['Apply', 'teyro.app/creator/onboarding'],
];

export function FactSheet() {
  return (
    <section className={s.band} id="facts" aria-labelledby="facts-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>In one page</span>
          <h2 id="facts-title" className={`${s.display} ${s.h2}`}>
            Teyro for creators, <em>the facts.</em>
          </h2>
        </Reveal>
        <Reveal>
          <dl className={h.facts}>
            {FACTS.map(([k, v]) => (
              <div key={k} className={h.fact}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ + final CTA ─────────────────────────────────────────────────────────

export const HOW_FAQ = [
  {
    question: 'How long does it take to make my first course?',
    answer:
      'A first Teyro course is about 8 short lessons. At 3 to 5 hours a week that is roughly 4 weeks; with more time it can be ready in 2. Tey sizes the plan to the hours you tell it.',
  },
  {
    question: 'Can I use my YouTube videos, notes or an existing course?',
    answer:
      'Yes. Bring what you have: a lesson can teach with video, text, code, audio or images. You then add exercises so learners practise, which is what makes Teyro courses get finished.',
  },
  {
    question: 'Do I need an audience?',
    answer:
      'No. Teyro brings learners to courses through its app, streaks and leagues. If you have a following, share a coupon link on launch day and bring them straight into your course and its community.',
  },
  {
    question: 'What happens in the review?',
    answer:
      'A Teyro reviewer takes your course the way a learner would. If something needs fixing you get clear notes in your Studio; fix it, submit again, and publish once approved.',
  },
  {
    question: 'What is a Founding Creator?',
    answer:
      'One of the first creators on Teyro. Founding Creators keep 80% of every payment instead of 70%, get a Founding badge on their public page and founding benefits in Teyro Studio, and their courses are ready when learners arrive.',
  },
  {
    question: 'When can I start?',
    answer: 'Teyro Studio opens to creators in October 2026, and the learner app launches in November 2026. Apply now to be among the first.',
  },
];

export function HowFaq() {
  return (
    <section className={`${s.band} ${s.tint}`} id="faq" aria-labelledby="how-faq-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <h2 id="how-faq-title" className={`${s.display} ${s.h2}`}>
            Questions? <em>Answers.</em>
          </h2>
        </Reveal>
        <div className={h.faq}>
          <Accordion items={HOW_FAQ} />
        </div>
      </div>
    </section>
  );
}

export function HowFinal() {
  return (
    <section className={s.final} aria-labelledby="how-final-title">
      <div className={`${s.wrap} ${s.finalInner}`}>
        <h2 id="how-final-title" className={`${s.display} ${s.h2}`}>
          Your first lesson <em>can be ready this week.</em>
        </h2>
        <p className={s.lead}>Tell Tey what you teach. The plan takes minutes.</p>
        <Link href={TEACH_HREF} className={s.btn}>
          {TEACH_LABEL}
        </Link>
      </div>
      <div className={s.finalStage} aria-hidden="true">
        <Image src="/User onbarding Assets/tey/waving.webp" alt="" width={220} height={256} />
      </div>
    </section>
  );
}
