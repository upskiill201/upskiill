/**
 * Homepage sections (v3). Coddy's layout — hero, tracks, alternating feature
 * rows, audience, creators, FAQ, final CTA — in Duolingo's chunky style.
 *
 * Copy rule: say what Teyro does for the learner (finish what you start),
 * and only claim what ships. No invented user counts, ratings or quotes.
 */

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Briefcase,
  Check,
  CodeXml,
  GraduationCap,
  Laptop,
  Repeat,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import LaunchBadges from '@/components/homepage/v2/LaunchBadges';
import {
  FriendsVisual,
  HeroPhone,
  LeagueVisual,
  LessonVisual,
  MethodVisual,
  RemindersVisual,
  Reveal,
  RewardsVisual,
  StreakVisual,
} from './Visuals';
import s from './Home.module.css';

export const START_HREF = '/start';
export const LOGIN_HREF = '/login?mode=signin';

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <h1 id="hero-title" className={`${s.display} ${s.h1}`}>
            The fun way to <em>finish</em> learning coding and AI.
          </h1>
          <p className={s.lead}>
            Short daily lessons in coding and AI, with streaks, leagues and friends that keep you coming back until you
            actually finish.
          </p>
          <div className={s.heroActions}>
            <Link href={START_HREF} className={s.btn}>
              Get started
            </Link>
            <Link href={LOGIN_HREF} className={s.btnGhost}>
              I already have an account
            </Link>
          </div>
          <div className={s.heroNote}>
            <span>
              <Check size={16} strokeWidth={4} aria-hidden="true" /> Free to start
            </span>
            <span>
              <Check size={16} strokeWidth={4} aria-hidden="true" /> Bite-sized lessons
            </span>
            <span>
              <Check size={16} strokeWidth={4} aria-hidden="true" /> No app store needed
            </span>
          </div>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}

export { LaunchBadges };

// ─── Tracks ──────────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: 'coding',
    title: 'Coding',
    sub: 'From your first line to real apps.',
    tone: s.toneBlue,
    icon: <CodeXml size={32} strokeWidth={2.5} />,
    topics: [
      { label: 'Web development', icon: <Laptop size={18} strokeWidth={2.75} /> },
      { label: 'Mobile apps', icon: <Smartphone size={18} strokeWidth={2.75} /> },
      { label: 'Programming fundamentals', icon: <CodeXml size={18} strokeWidth={2.75} /> },
      { label: 'Software development', icon: <Repeat size={18} strokeWidth={2.75} /> },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    sub: 'Put AI to work, then build with it.',
    tone: s.tonePurple,
    icon: <BrainCircuit size={32} strokeWidth={2.5} />,
    topics: [
      { label: 'Use AI tools', icon: <Sparkles size={18} strokeWidth={2.75} /> },
      { label: 'Build AI agents', icon: <Bot size={18} strokeWidth={2.75} /> },
      { label: 'Create automations', icon: <Workflow size={18} strokeWidth={2.75} /> },
    ],
  },
];

export function Tracks() {
  return (
    <section className={s.band} id="tracks" aria-labelledby="tracks-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Pick your track</span>
          <h2 id="tracks-title" className={`${s.display} ${s.h2}`}>
            Coding or AI. <em>Start where you want to go.</em>
          </h2>
          <p className={s.lead}>Tell Tey your goal and level, and your path is ready in under two minutes.</p>
        </Reveal>
        <div className={s.tracks}>
          {TRACKS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <Link href={START_HREF} className={`${s.track} ${t.tone}`}>
                <span className={s.trackHead}>
                  <span className={s.trackIcon}>{t.icon}</span>
                  <span>
                    <h3 className={s.trackTitle}>{t.title}</h3>
                    <p className={s.trackSub}>{t.sub}</p>
                  </span>
                </span>
                <ul className={s.topics}>
                  {t.topics.map((topic) => (
                    <li key={topic.label} className={s.topic}>
                      {topic.icon}
                      {topic.label}
                    </li>
                  ))}
                </ul>
                <span className={s.trackCta}>
                  Start the {t.title} track <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why it works ────────────────────────────────────────────────────────────

const PILLARS = [
  {
    art: '/User onbarding Assets/tey/clock.webp',
    title: 'Lessons you can finish',
    line: 'Bite-sized lessons you can do on a bus ride. Small wins every day add up to a finished course.',
  },
  {
    art: '/User onbarding Assets/tey/flame.webp',
    title: 'Habits that stick',
    line: 'Streaks, daily quests and reminders turn “I should study” into something you just do.',
  },
  {
    art: '/User onbarding Assets/tey/podium.webp',
    title: 'People who notice',
    line: 'Leagues, friends and a course community make showing up feel good, and skipping feel like missing out.',
  },
];

export function WhyItWorks() {
  return (
    <section className={`${s.band} ${s.tint}`} id="how-it-works" aria-labelledby="why-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Why Teyro works</span>
          <h2 id="why-title" className={`${s.display} ${s.h2}`}>
            Most people quit online courses. <em>Teyro learners come back.</em>
          </h2>
          <p className={s.lead}>
            Teyro turns courses into short, daily, habit-forming lessons, so the skill you start is the skill you finish.
          </p>
        </Reveal>
        <div className={s.pillars}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={s.pillar}>
              <span className={s.pillarArt}>
                <Image src={p.art} alt="" width={112} height={112} style={{ objectFit: 'contain' }} />
              </span>
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

export function Features() {
  return (
    <>
      <Split
        id="lessons"
        eyebrow="Learn by doing"
        title={
          <>
            Practise. <em>Don&apos;t just watch.</em>
          </>
        }
        copy="Every lesson has you writing and fixing real code within minutes, with instant feedback on every answer."
        points={['Real code questions, checked instantly', 'Hearts keep you careful, not scared', 'Every right answer earns XP']}
        visual={<LessonVisual />}
      />
      <Split
        eyebrow="The Teyro method"
        title={
          <>
            Learn it. Use it. <em>Keep it.</em>
          </>
        }
        copy="Each lesson runs in four short steps, so a new idea goes from explained to used to remembered in one sitting."
        points={['Learn one idea at a time', 'Apply it right away', 'Reflect so it sticks, then go deeper when you want']}
        visual={<MethodVisual />}
        flip
        tint
      />
      <Split
        id="streaks"
        eyebrow="Streaks"
        title={
          <>
            Build a streak <em>you&apos;ll protect.</em>
          </>
        }
        copy="Watch the days add up. A freeze covers a busy day, and a repair saves a slip, so one bad day never undoes months of work."
        points={['A calendar of every day you showed up', 'Freezes and repairs for real life', 'Join the Streak Society at 7 days']}
        visual={<StreakVisual />}
      />
      <Split
        id="leagues"
        eyebrow="Leagues"
        title={
          <>
            A little competition <em>goes a long way.</em>
          </>
        }
        copy="Every week you race real learners for a spot at the top. Finish high to move up a league; every lesson moves you up the board."
        points={['Weekly leagues with real learners', 'Climb live after every lesson', 'Move up from Bronze all the way to Diamond']}
        visual={<LeagueVisual />}
        flip
        tint
      />
      <Split
        id="community"
        eyebrow="Friends and community"
        title={
          <>
            Learning is better <em>with friends.</em>
          </>
        }
        copy="Follow friends and see their streaks. After two lessons you join your course's community, where classmates answer questions and cheer your wins."
        points={['Follow friends and race their streaks', 'Ask questions, share wins, get cheered on', 'Level up in your course community']}
        visual={<FriendsVisual />}
      />
      <Split
        id="rewards"
        eyebrow="Rewards"
        title={
          <>
            Every day <em>pays off.</em>
          </>
        }
        copy="Three daily quests, chests to open, coins to spend and levels to climb: proof you're getting somewhere, every single day."
        points={['Three fresh quests every day', 'Chests, coins and a shop to spend them in', 'Level up as your XP grows']}
        visual={<RewardsVisual />}
        flip
        tint
      />
      <Split
        id="app"
        eyebrow="On your phone"
        title={
          <>
            Tey keeps you <em>on track.</em>
          </>
        }
        copy="Put Teyro on your Home Screen in one tap, with no app store. It opens instantly and reminds you before your streak runs out."
        points={['Installs to your Home Screen on iPhone and Android', 'A friendly nudge on days you haven’t practised', 'Opens in a tap, works offline']}
        visual={<RemindersVisual />}
      />
    </>
  );
}

// ─── Who it's for ────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    icon: <GraduationCap size={28} strokeWidth={2.5} />,
    title: 'Students',
    line: 'Keep up with coding outside class, a few minutes a day, instead of cramming the night before.',
    outcome: 'A skill you practise daily, not once a term.',
  },
  {
    icon: <Briefcase size={28} strokeWidth={2.5} />,
    title: 'Career switchers',
    line: 'Learn to code or work with AI around a full-time job, with a clear path that tells you what’s next.',
    outcome: 'Steady progress toward a new role.',
  },
  {
    icon: <Repeat size={28} strokeWidth={2.5} />,
    title: 'Course restarters',
    line: 'Bought courses you never finished? Teyro is built to get you over the line this time.',
    outcome: 'Your first finished course.',
  },
];

export function Audience() {
  return (
    <section className={s.band} aria-labelledby="who-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Who it&apos;s for</span>
          <h2 id="who-title" className={`${s.display} ${s.h2}`}>
            Built for people who start, <em>and want to finish.</em>
          </h2>
        </Reveal>
        <div className={s.audience}>
          {PERSONAS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={s.persona}>
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

// ─── Creators ────────────────────────────────────────────────────────────────

export function Creators() {
  return (
    <section className={s.band} id="teach" aria-labelledby="teach-title">
      <div className={s.wrap}>
        <Reveal className={s.creator}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
            <span className={s.eyebrow} style={{ color: 'var(--bg-card)', opacity: 0.85 }}>
              For creators
            </span>
            <h2 id="teach-title" className={`${s.display} ${s.h2}`}>
              Teach a course people actually finish.
            </h2>
            <p>
              Build your course in Teyro Studio and every learner gets streaks, leagues and a community around it, so
              more of them reach the end.
            </p>
            <Link href="/teach" className={s.btnWhite}>
              Teach on Teyro
            </Link>
          </div>
          <div className={s.creatorStats}>
            {[
              ['Course builder', 'Lessons in four steps'],
              ['Your community', 'Learners join after 2 lessons'],
              ['Real analytics', 'See how learners progress'],
              ['Earn from it', 'Free or paid courses'],
            ].map(([t, sub]) => (
              <div key={t} className={s.creatorStat}>
                <strong>{t}</strong>
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    question: 'Is Teyro free?',
    answer:
      'Yes, you can start free. Many courses are free end to end; paid courses let you try the first two lessons free before you decide.',
  },
  {
    question: 'What can I learn?',
    answer:
      'Coding (web development, mobile apps, programming fundamentals and software development) and AI (using AI tools, building agents and automations). Creators add new courses all the time.',
  },
  {
    question: 'Do I need any experience?',
    answer: 'No. You tell Tey your level during setup, from complete beginner up, and your path starts where you are.',
  },
  {
    question: 'How much time does it take?',
    answer:
      'As little as a few minutes a day. You pick a daily goal when you start, and Teyro reminds you to keep your streak going.',
  },
  {
    question: 'Do I need to download an app?',
    answer:
      'No app store needed. Teyro runs in your browser and installs to your Home Screen on iPhone and Android in one tap, where it opens instantly and works offline.',
  },
  {
    question: 'Can I teach on Teyro?',
    answer:
      'Yes. Creators build courses in Teyro Studio, publish them free or paid, and get a community and analytics for every course.',
  },
];

export function Faq() {
  return (
    <section className={`${s.band} ${s.tint}`} id="faq" aria-labelledby="faq-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <h2 id="faq-title" className={`${s.display} ${s.h2}`}>
            Questions? <em>Answers.</em>
          </h2>
        </Reveal>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Accordion items={FAQ} />
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

export function FinalCta() {
  return (
    <section className={s.final} aria-labelledby="final-title">
      <div className={`${s.wrap} ${s.finalInner}`}>
        <h2 id="final-title" className={`${s.display} ${s.h2}`}>
          Start your streak <em>today.</em>
        </h2>
        <p className={s.lead}>Your first lesson takes a few minutes. Your future self will thank you.</p>
        <Link href={START_HREF} className={s.btn}>
          Get started
        </Link>
      </div>
      <div className={s.finalStage} aria-hidden="true">
        <Image src="/User onbarding Assets/tey/cheering.webp" alt="" width={220} height={256} />
      </div>
    </section>
  );
}
