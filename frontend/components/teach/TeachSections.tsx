/**
 * /teach sections — the homepage's layout and chunky style (v3), told from
 * the creator's side: why a course on Teyro becomes a business, what the
 * creator gets, what their learners get, and what it could earn.
 *
 * Copy rule (same as the homepage): only claim what ships. The facts every
 * line leans on: learners start free, then Teyro Pro opens every course;
 * creators are paid from the Pro pool, 50% of each Pro learner's payment shared
 * by minutes, the same for Founding Creators (lib/launch.ts, backend
 * src/pro/pool); payouts go to bank or mobile money after a 14-day clearing
 * window, from $50; launch tracks are Coding and AI.
 * No invented platform numbers, ratings or testimonials.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Glyph } from '@/components/art/Glyph';
import Accordion from '@/components/ui/Accordion';
import { Reveal } from '@/components/homepage/v3/Visuals';
import s from '@/components/homepage/v3/Home.module.css';
import {
  BuilderVisual,
  CommunityVisual,
  InsightVisual,
  PayoutVisual,
  RecurringVisual,
  RetentionVisual,
  StudioHeroVisual,
} from './TeachVisuals';
import { EarningsCalculator } from './EarningsCalculator';
import { APP_LAUNCHES, CREATOR_POOL_PCT, FOUNDING_OPEN, PRO_MONTHLY_USD, PRO_YEARLY_USD, STUDIO_ENTRY, STUDIO_OPENS } from '@/lib/launch';
import t from './Teach.module.css';

// While Teyro Studio is closed (lib/launch.ts) these point at the apply form.
export const TEACH_HREF = STUDIO_ENTRY.href;
export const TEACH_LABEL = STUDIO_ENTRY.label;
export const CREATOR_LOGIN_HREF = '/creator/login';

// ─── Hero ────────────────────────────────────────────────────────────────────

export function TeachHero() {
  return (
    <section className={s.hero} aria-labelledby="teach-hero-title">
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <span className={s.eyebrow} style={{ marginBottom: 0 }}>
            {STUDIO_ENTRY.gated ? `Teyro Studio opens ${STUDIO_OPENS}` : FOUNDING_OPEN ? 'Founding Creators wanted' : 'Teyro for creators'}
          </span>
          <h1 id="teach-hero-title" className={`${s.display} ${s.h1}`}>
            Teach coding or AI. <em>Earn every month</em> they keep learning.
          </h1>
          <p className={s.lead}>
            Build your course in Teyro Studio. Learners start free, then Teyro Pro opens every course, and our streaks,
            leagues and community keep them coming back. Each month {CREATOR_POOL_PCT}% of every Pro learner’s payment is
            shared among the creators they learn with, by minutes, so the longer they learn with you, the more you earn.
          </p>
          <div className={s.heroActions}>
            <Link href={TEACH_HREF} className={s.btn}>
              {TEACH_LABEL}
            </Link>
            {STUDIO_ENTRY.gated ? (
              <Link href="/teach/how-it-works" className={s.btnGhost}>
                See how it works
              </Link>
            ) : (
              <Link href={CREATOR_LOGIN_HREF} className={s.btnGhost}>
                I already teach on Teyro
              </Link>
            )}
          </div>
          <div className={s.heroNote}>
            <span>
              <Glyph name="check" size={16} strokeWidth={3.6} /> Free to publish
            </span>
            <span>
              <Glyph name="check" size={16} strokeWidth={3.6} /> {CREATOR_POOL_PCT}% creator pool
            </span>
            <span>
              <Glyph name="check" size={16} strokeWidth={3.6} /> Paid to bank or mobile money
            </span>
          </div>
        </div>
        <StudioHeroVisual />
      </div>
    </section>
  );
}

// ─── Why Teyro, not another course site ─────────────────────────────────────

const COMPARE = [
  ['Paid once, then the learner is gone', 'Paid every month a learner keeps learning'],
  ['Most learners drift off after a few videos', 'Streaks, leagues and reminders bring them back daily'],
  ['You can’t tell who’s stuck, or where', 'See the lesson they stop at, and nudge them in one tap'],
  ['A comment box under each video', 'A course community you run, with your learners in it'],
  ['Learners pay up front, before they trust you', 'They start free, so they reach your lessons before they ever pay'],
];

export function WhyTeyro() {
  return (
    <section className={`${s.band} ${s.tint}`} id="why" aria-labelledby="why-teach-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Why teach on Teyro</span>
          <h2 id="why-teach-title" className={`${s.display} ${s.h2}`}>
            Most courses sell once. <em>Teyro courses keep earning.</em>
          </h2>
          <p className={s.lead}>
            Most people quit online courses, and a learner who quits never pays again. Teyro is built so they come back.
          </p>
        </Reveal>
        <Reveal className={t.compare}>
          <div className={t.compareHead} aria-hidden="true">
            <span>A typical course site</span>
            <span className={t.compareUs}>Teaching on Teyro</span>
          </div>
          <ul className={t.compareList}>
            {COMPARE.map(([them, us]) => (
              <li key={us} className={t.compareRow}>
                <span className={t.them}>
                  <span className={t.xDot} aria-hidden="true">
                    <Glyph name="close" size={14} strokeWidth={3.6} />
                  </span>
                  <span className={t.srOnly}>Elsewhere: </span>
                  {them}
                </span>
                <span className={t.us}>
                  <span className={s.tick} aria-hidden="true">
                    <Glyph name="check" size={16} strokeWidth={3.6} />
                  </span>
                  <span className={t.srOnly}>On Teyro: </span>
                  {us}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ─── The loop ────────────────────────────────────────────────────────────────

const LOOP = [
  {
    art: '/User onbarding Assets/tey/flame.webp',
    title: 'Learners come back',
    line: 'Streaks, daily quests and Tey’s reminders turn your course into something they open every day.',
  },
  {
    art: '/User onbarding Assets/tey/podium.webp',
    title: 'More of them finish',
    line: 'Short lessons, instant feedback and a community around your course carry them to the last lesson.',
  },
  {
    art: '/User onbarding Assets/tey/badge.webp',
    title: 'You keep earning',
    line: 'Every month learners keep learning with you, you’re paid again from Teyro Pro. Finished learners come back for your next course.',
  },
];

export function Loop() {
  return (
    <section className={s.band} aria-labelledby="loop-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>How it becomes a business</span>
          <h2 id="loop-title" className={`${s.display} ${s.h2}`}>
            When learners win, <em>you win.</em>
          </h2>
        </Reveal>
        <div className={`${s.pillars} ${t.loop}`}>
          {LOOP.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={s.pillar}>
              <span className={`${s.pillarArt} ${s.pillarArtTall}`}>
                <Image src={p.art} alt="" width={112} height={144} style={{ objectFit: 'contain' }} />
              </span>
              <span className={t.loopNum}>{i + 1}</span>
              <h3 className={`${s.display} ${s.h3}`}>{p.title}</h3>
              <p>{p.line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Feature rows ────────────────────────────────────────────────────────────

function Split({
  id,
  eyebrow,
  title,
  copy,
  points,
  visual,
  flip = false,
  tint = false,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  points: string[];
  visual: React.ReactNode;
  flip?: boolean;
  tint?: boolean;
}) {
  return (
    <section className={`${s.band} ${tint ? s.tint : ''}`} id={id}>
      <div className={`${s.wrap} ${s.split} ${flip ? s.splitFlip : ''}`}>
        <Reveal className={s.splitCopy}>
          <span className={s.eyebrow}>{eyebrow}</span>
          <h2 className={`${s.display} ${s.h2}`}>{title}</h2>
          <p className={s.lead}>{copy}</p>
          <ul className={s.points}>
            {points.map((p) => (
              <li key={p}>
                <span className={s.tick} aria-hidden="true">
                  <Glyph name="check" size={16} strokeWidth={3.6} />
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

export function Features() {
  return (
    <>
      <Split
        id="revenue"
        eyebrow="Recurring revenue"
        title={
          <>
            Get paid again <em>every month.</em>
          </>
        }
        copy={`Learners pay one subscription, Teyro Pro, for every course. Each month ${CREATOR_POOL_PCT}% of every Pro learner's payment is shared among the creators they learned with, by the minutes they spent in each, so your income grows with every learner who keeps learning with you.`}
        points={[`${CREATOR_POOL_PCT}% of every Pro learner's payment goes to creators, by minutes`, 'The same deal for every creator, Founding Creators included', 'Free courses welcome too, to grow your audience first']}
        visual={<RecurringVisual />}
      />
      <Split
        id="studio"
        eyebrow="Teyro Studio"
        title={
          <>
            Build lessons <em>people actually do.</em>
          </>
        }
        copy="A guided wizard plans your course, and every lesson runs in four short steps: Learn, Apply, Reflect, Deepen. Learners practise with real exercises, not just watch."
        points={['Video, text or audio to teach the idea', 'Seven exercise types, from multiple choice to find the bug', 'A quick quality review before your course goes live']}
        visual={<BuilderVisual />}
        flip
        tint
      />
      <Split
        id="retention"
        eyebrow="Learners who stay"
        title={
          <>
            Your course, <em>with a streak.</em>
          </>
        }
        copy="Every lesson in your course earns XP, keeps a streak alive and climbs a weekly league. Tey reminds learners before their streak runs out, so your course is the thing they open today."
        points={['Streaks, leagues and daily quests, built in', 'Reminders that bring quiet learners back', 'Lessons short enough to finish on a bus ride']}
        visual={<RetentionVisual />}
      />
      <Split
        id="analytics"
        eyebrow="See and step in"
        title={
          <>
            Know who&apos;s stuck, <em>and help them.</em>
          </>
        }
        copy="See how learners move through your course, lesson by lesson: where they stop, which exercise trips them up, and who has gone quiet. Then reach them in one tap."
        points={['The lesson most learners stop at, flagged for you', 'The exercises missed most on the first try', 'Nudge or cheer learners, personalised with their name']}
        visual={<InsightVisual />}
        flip
        tint
      />
      <Split
        id="community"
        eyebrow="Your community"
        title={
          <>
            A classroom <em>you run.</em>
          </>
        }
        copy="Every course gets its own community. Learners join after two lessons, ask questions and share wins, and you're the admin: answer, pin announcements and set challenges."
        points={['Questions waiting for you, flagged in your Studio', 'Announcements and challenges reach every member', 'Moderation tools to keep it friendly']}
        visual={<CommunityVisual />}
      />
      <Split
        id="payouts"
        eyebrow="Get paid"
        title={
          <>
            Your money, <em>where you want it.</em>
          </>
        }
        copy="Watch your monthly Teyro Pro share land in your earnings, course by course. Once it clears, request a payout to your bank or mobile money and follow it from requested to paid."
        points={['Bank or mobile money payouts', 'Sales clear after 14 days, then they’re yours to withdraw', 'Withdraw from $50, with statements to download']}
        visual={<PayoutVisual />}
        flip
        tint
      />
    </>
  );
}

// ─── Calculator ──────────────────────────────────────────────────────────────

export function Calculator() {
  return (
    <section className={s.band} id="earnings" aria-labelledby="calc-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>What could you earn?</span>
          <h2 id="calc-title" className={`${s.display} ${s.h2}`}>
            Do the maths <em>on your course.</em>
          </h2>
          <p className={s.lead}>Pick how many Pro learners take your course and how much of their learning happens in it. These are Teyro Pro’s real prices.</p>
        </Reveal>
        <Reveal>
          <EarningsCalculator />
        </Reveal>
      </div>
    </section>
  );
}

// ─── Both sides win ──────────────────────────────────────────────────────────

const SIDES = [
  {
    art: '/User onbarding Assets/tey/cheering.webp',
    who: 'Your learners get',
    tone: t.sideLearners,
    items: [
      'A free start before they pay a thing',
      'Short daily lessons they can finish',
      'Streaks, leagues and quests that make practice fun',
      'A community and a creator who answers',
      'A skill they actually finish',
    ],
  },
  {
    art: '/User onbarding Assets/tey/tablet.webp',
    who: 'You get',
    tone: t.sideYou,
    items: [
      `A share of the Teyro Pro pool every month they learn with you`,
      'A studio to build, review and publish',
      'Analytics that show who’s stuck and why',
      'Your own community and public creator page',
      'Coupons to launch and reward your audience',
    ],
  },
];

export function BothSides() {
  return (
    <section className={`${s.band} ${s.tint}`} aria-labelledby="sides-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>One course, two kinds of winners</span>
          <h2 id="sides-title" className={`${s.display} ${s.h2}`}>
            Good for learners. <em>Good for business.</em>
          </h2>
        </Reveal>
        <div className={t.sides}>
          {SIDES.map((side, i) => (
            <Reveal key={side.who} delay={i * 0.1} className={`${t.side} ${side.tone}`}>
              <div className={t.sideHead}>
                <Image src={side.art} alt="" width={84} height={98} style={{ objectFit: 'contain' }} />
                <h3 className={`${s.display} ${s.h3}`}>{side.who}</h3>
              </div>
              <ul className={s.points}>
                {side.items.map((it) => (
                  <li key={it}>
                    <span className={s.tick} aria-hidden="true">
                      <Glyph name="check" size={16} strokeWidth={3.6} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── From idea to first payout ───────────────────────────────────────────────

const STEPS = [
  { title: 'Tell Tey what you teach', line: 'A few quick questions about your topic, your learners and your time. Your plan is ready in minutes.' },
  { title: 'Build it in Studio', line: 'The wizard lays out your units and lessons. Add your teaching and exercises, and preview it as a learner.' },
  { title: 'Get reviewed, go live', line: 'Teyro checks every course before launch, so learners trust what they find. Then publish.' },
  { title: 'Share, grow, get paid', line: 'Share your link or a coupon, answer your community, and watch subscriptions turn into payouts.' },
];

export function Steps() {
  return (
    <section className={s.band} id="how-it-works" aria-labelledby="steps-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>How it works</span>
          <h2 id="steps-title" className={`${s.display} ${s.h2}`}>
            From idea <em>to first payout.</em>
          </h2>
        </Reveal>
        <ol className={t.steps4}>
          {STEPS.map((st, i) => (
            <Reveal key={st.title} delay={i * 0.08} className={t.step4}>
              <span className={t.step4Num}>{i + 1}</span>
              <h3 className={t.step4Title}>{st.title}</h3>
              <p>{st.line}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className={t.stepsCta}>
          <Link href={TEACH_HREF} className={s.btn}>
            {TEACH_LABEL} <Glyph name="arrow" size={18} strokeWidth={2.8} />
          </Link>
          <Link href="/teach/how-it-works" className={s.btnGhost}>
            See every step in detail
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Who it's for ────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    icon: <Glyph name="code" size={28} strokeWidth={2.3} />,
    title: 'Developers',
    line: 'Turn what you do every day into a course, from your first language to shipping real apps.',
    outcome: 'Income from skills you already use.',
  },
  {
    icon: <Glyph name="sparkle" size={28} strokeWidth={2.3} />,
    title: 'AI builders',
    line: 'Teach people to use AI tools, build agents and automate their work while demand is exploding.',
    outcome: 'Be the teacher people find first.',
  },
  {
    icon: <Glyph name="cap" size={28} strokeWidth={2.3} />,
    title: 'Teachers and trainers',
    line: 'Take what works in your classroom or bootcamp online, with practice built into every lesson.',
    outcome: 'Reach learners beyond your room.',
  },
  {
    icon: <Glyph name="video" size={28} strokeWidth={2.3} />,
    title: 'Content creators',
    line: 'Already teaching on YouTube or social? Give your audience a course they finish, and a reason to pay.',
    outcome: 'Monthly income beyond ads.',
  },
];

export function Audience() {
  return (
    <section className={`${s.band} ${s.tint}`} aria-labelledby="teach-who-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Who teaches on Teyro</span>
          <h2 id="teach-who-title" className={`${s.display} ${s.h2}`}>
            If you can teach it, <em>Teyro can grow it.</em>
          </h2>
          <p className={s.lead}>Teyro launches with two tracks: Coding and AI.</p>
        </Reveal>
        <div className={t.audience}>
          {PERSONAS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={s.persona}>
              <span className={s.personaIcon}>{p.icon}</span>
              <h3 className={`${s.display} ${s.h3}`}>{p.title}</h3>
              <p>{p.line}</p>
              <span className={s.quote}>{p.outcome}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const TEACH_FAQ = [
  {
    question: 'When does Teyro Studio open?',
    answer: STUDIO_ENTRY.gated
      ? `Teyro Studio opens to creators in ${STUDIO_OPENS}, a month before the learner app launches in ${APP_LAUNCHES}. Apply as a Founding Creator on this page and we’ll invite you the day it opens.`
      : `Teyro Studio is open. Everyone who joins before the learner app launches in ${APP_LAUNCHES} is a Founding Creator, with a Founding badge and founding benefits in Studio.`,
  },
  {
    question: 'Does it cost anything to teach on Teyro?',
    answer: 'No. Building and publishing a course is free. Teyro earns from Teyro Pro subscriptions, and shares them with creators every month.',
  },
  {
    question: 'How much do I earn?',
    answer:
      `Each month, ${CREATOR_POOL_PCT}% of every Pro learner’s payment (after card fees, tax and refunds) is shared among the creators whose courses they learned in, by the minutes they spent in each. Every creator is paid this way, Founding Creators included. You’re paid again every month for as long as learners keep learning with you.`,
  },
  {
    question: 'How do learners pay for my course?',
    answer:
      `They don’t pay per course: learners start free, then Teyro Pro opens every course, yours included, at ${PRO_MONTHLY_USD} a month or ${PRO_YEARLY_USD} a year, with a 7-day free trial. You can also publish free courses.`,
  },
  {
    question: 'When and how do I get paid?',
    answer:
      'Your Teyro Pro pool share lands in your earnings every month and clears after 14 days. From $50 available, you can request a payout to your bank account or mobile money and follow it until it’s paid.',
  },
  {
    question: 'What can I teach?',
    answer:
      'Teyro launches with two tracks: Coding (web, mobile, programming fundamentals, software development) and AI (using AI tools, building agents, automations).',
  },
  {
    question: 'Do I need to record videos?',
    answer:
      'No. Each lesson teaches with video, text or audio, whichever suits you, then moves learners into practice with exercises you set up in the Studio.',
  },
  {
    question: 'Is there a review before my course goes live?',
    answer:
      'Yes. Every course gets a quality review before launch, so learners trust what they find. If something needs fixing, you get clear notes in your Studio.',
  },
  {
    question: 'Can I talk to my learners?',
    answer:
      'Yes. Your course has its own community where you’re the admin, and your Studio shows who’s gone quiet so you can send a nudge or a cheer.',
  },
];

export function Faq() {
  return (
    <section className={s.band} id="faq" aria-labelledby="teach-faq-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <h2 id="teach-faq-title" className={`${s.display} ${s.h2}`}>
            Questions? <em>Answers.</em>
          </h2>
        </Reveal>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Accordion items={TEACH_FAQ} />
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

export function FinalCta() {
  return (
    <section className={s.final} aria-labelledby="teach-final-title">
      <div className={`${s.wrap} ${s.finalInner}`}>
        <h2 id="teach-final-title" className={`${s.display} ${s.h2}`}>
          Your knowledge. Their streak. <em>Your income.</em>
        </h2>
        <p className={s.lead}>Your first lesson can be ready this week. Tey will walk you through it.</p>
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
