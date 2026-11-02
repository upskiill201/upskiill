/**
 * Homepage sections (v3). Hero, how it works, topics, alternating feature
 * rows, get the app, audience, creators, FAQ, final CTA. The job: a visitor
 * understands what Teyro is and starts a lesson without scrolling far.
 *
 * Framing (founder, 2026-11-02): the learner picks a topic and their course
 * is built for them, around their goal and level. Never present a shelf of
 * ready-made courses here: no catalogue grid, no "see courses".
 *
 * Tactile rule (founder, 2026-10-29): only buttons that do something get the
 * 3D bottom edge. Cards, chips and badges are flat.
 *
 * Copy rule: say what Teyro does for the learner (finish what you start),
 * and only claim what ships. No invented user counts, ratings or quotes.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Art, type ArtName } from '@/components/art/Art';
import { SUBJECTS } from '@/lib/courses/subjects';
import Accordion from '@/components/ui/Accordion';
import { Glyph } from '@/components/art/Glyph';
import LaunchBadges from '@/components/homepage/v2/LaunchBadges';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { APP_LAUNCHES, LEARNER_ENTRY, STUDIO_OPENS } from '@/lib/launch';
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

// While the app is gated (lib/launch.ts) these point at the notify-me form.
export const START_HREF = LEARNER_ENTRY.href;
export const LOGIN_HREF = '/login?mode=signin';
const START_LABEL = LEARNER_ENTRY.label;
/** The hero's button says exactly what happens next once the app is open. */
const HERO_START_LABEL = LEARNER_ENTRY.gated ? LEARNER_ENTRY.label : 'Start learning free';

// ─── Hero ────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          {LEARNER_ENTRY.gated && (
            <span className={s.eyebrow} style={{ marginBottom: 0 }}>
              Launching {APP_LAUNCHES}
            </span>
          )}
          <h1 id="hero-title" className={`${s.display} ${s.h1}`}>
            The fun and <em>effective</em> way to learn skills.
          </h1>
          <p className={s.lead}>
            Pick a topic and Teyro builds your course around you: your goal, your level, your time. Short lessons you
            play like a game, with streaks, leagues and friends that bring you back tomorrow.
          </p>
          <ul className={s.heroSkills} aria-label="Topics you can learn">
            {SKILLS.map((skill) => (
              <li key={skill.id}>
                <a href={`#skill-${skill.id}`} className={s.heroSkill}>
                  <Art name={skill.art} size={24} />
                  {skill.short}
                </a>
              </li>
            ))}
          </ul>
          <div className={s.heroActions}>
            <Link href={START_HREF} className={s.btn}>
              {HERO_START_LABEL}
            </Link>
            {LEARNER_ENTRY.gated ? (
              <a href="#how-it-works" className={s.btnGhost}>
                See how it works
              </a>
            ) : (
              <Link href={LOGIN_HREF} className={s.btnGhost}>
                I already have an account
              </Link>
            )}
          </div>
          <div className={s.heroNote}>
            <span>
              <Glyph name="check" size={16} strokeWidth={4} /> Free to start
            </span>
            <span>
              <Glyph name="check" size={16} strokeWidth={4} /> Lessons in minutes
            </span>
            <Link href="/download" className={s.heroNoteLink}>
              <Glyph name="check" size={16} strokeWidth={4} /> On phone and computer
            </Link>
          </div>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}

export { LaunchBadges };

// ─── How it works: what Teyro is, in three steps ─────────────────────────────
//
// Right under the hero, so someone who has never heard of Teyro knows what it
// is before they scroll past one screen: pick a topic, tell Tey about you, get
// a course built around your answers. Laid out as the app's own learning path (dotted trail,
// numbered stops) rather than a row of feature cards.

const STEPS: { art: ArtName; title: string; line: string }[] = [
  {
    art: 'target',
    title: 'Pick a topic',
    line: 'Coding, AI, money, leadership, speaking up and more. Choose what you want to get better at.',
  },
  {
    art: 'signpost',
    title: 'Tell Tey about you',
    line: 'Your goal, what you already know and how much time you have each day. That is all it takes.',
  },
  {
    art: 'trophy',
    title: 'Get your course',
    line: 'Built around your answers and starting where you are, in short lessons you play like a game.',
  },
];

export function HowItWorks() {
  return (
    <section className={`${s.band} ${s.tint}`} id="how-it-works" aria-labelledby="how-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>How Teyro works</span>
          <h2 id="how-title" className={`${s.display} ${s.h2}`}>
            Your course, <em>built for you.</em>
          </h2>
          <p className={s.lead}>
            Teyro is a learning app that shapes every course around the person taking it. You practise from the first
            minute, and streaks, leagues and friends keep you coming back until you finish.
          </p>
        </Reveal>
        <ol className={s.steps}>
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className={s.step}>
              <span className={s.stepArt}>
                <Art name={step.art} size={56} />
                <span className={s.stepNum}>{i + 1}</span>
              </span>
              <h3 className={`${s.display} ${s.h3}`}>{step.title}</h3>
              <p>{step.line}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className={s.center} delay={0.2}>
          <Link href={START_HREF} className={s.btn} style={{ marginTop: 48 }}>
            {HERO_START_LABEL}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
//
// The topics a learner can pick, one card per subject (lib/courses/subjects.ts).
// Each card starts learning rather than opening a catalogue: the course is
// built after the learner picks.

const SKILLS = SUBJECTS.map((subject) => ({
  ...subject,
  href: START_HREF,
}));

export function Tracks() {
  return (
    <section className={s.band} id="tracks" aria-labelledby="tracks-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Topics</span>
          <h2 id="tracks-title" className={`${s.display} ${s.h2}`}>
            Way more than code. <em>Pick a topic and go.</em>
          </h2>
          <p className={s.lead}>Whichever you pick, your course is built around your goal and your level.</p>
        </Reveal>
        <div className={s.skills}>
          {SKILLS.map((skill, i) => (
            <Reveal key={skill.id} delay={(i % 3) * 0.08}>
              <Link href={skill.href} id={`skill-${skill.id}`} className={s.skill}>
                <span className={s.skillHead}>
                  <span className={s.skillArt}>
                    <Art name={skill.art} size={48} />
                  </span>
                  <span>
                    <h3 className={s.skillTitle}>{skill.title}</h3>
                    <p className={s.skillSub}>{skill.sub}</p>
                  </span>
                </span>
                <ul className={s.skillCourses}>
                  {skill.examples.map((course) => (
                    <li key={course}>
                      <Glyph name="check" size={16} strokeWidth={3} />
                      {course}
                    </li>
                  ))}
                </ul>
                <span className={s.skillCta}>
                  Start this topic <Glyph name="arrow" size={18} strokeWidth={3} />
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

// ─── Stay relevant: the vision ──────────────────────────────────────────────
//
// Teyro's purpose, said plainly: people stay relevant as work changes. Copy
// rule (same as everywhere on this page): no job guarantees, no invented
// statistics, nothing Teyro doesn't do (there is no job placement). What it
// does do is teach practical skills through daily practice.

const RELEVANT = [
  {
    art: '/User onbarding Assets/tey/thinking.webp',
    title: 'Learn what work needs now',
    line: 'AI is changing how a lot of jobs get done. Learn to use it, and build the people, money and communication skills it can’t replace.',
  },
  {
    art: '/User onbarding Assets/tey/tablet.webp',
    title: 'Practise, don’t just watch',
    line: 'Every lesson has you use the idea straight away, so you come away able to do something, not just knowing about it.',
  },
  {
    art: '/User onbarding Assets/tey/flame.webp',
    title: 'Keep up as it keeps changing',
    line: 'New tools will keep arriving. A daily streak turns keeping up into a habit, instead of a panic every few years.',
  },
];

export function StayRelevant() {
  return (
    <section className={s.band} id="stay-relevant" aria-labelledby="relevant-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>Learn for the job market</span>
          <h2 id="relevant-title" className={`${s.display} ${s.h2}`}>
            Work is changing fast. <em>Keep your skills up with it.</em>
          </h2>
          <p className={s.lead}>
            AI is changing which skills matter and how jobs get done. Teyro exists so you stay relevant: build the practical
            skills that keep you useful as your work changes, a few minutes a day, without starting over.
          </p>
        </Reveal>
        <div className={s.pillars}>
          {RELEVANT.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={s.pillar}>
              <span className={`${s.pillarArt} ${s.pillarArtTall}`}>
                <Image src={p.art} alt="" width={112} height={144} style={{ objectFit: 'contain' }} />
              </span>
              <h3 className={`${s.display} ${s.h3}`}>{p.title}</h3>
              <p>{p.line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={s.center} delay={0.2}>
          <p className={s.lead} style={{ margin: '40px auto 24px', maxWidth: 640 }}>
            Our goal is simple: nobody should be left behind when the way we work changes.
          </p>
          <Link href={START_HREF} className={s.btn}>
            {START_LABEL}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

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
                  <Glyph name="check" size={16} strokeWidth={4} />
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

// ─── Certificates ────────────────────────────────────────────────────────────
//
// Every course ends in a certificate (backend/src/certificate): issued on
// completing every published lesson, printed with the real name the learner
// confirms first, verifiable at teyro.app/c/<code>, with a one-tap LinkedIn
// add. The picture is the real renderer's output (the Gold Medal design,
// /c/SAMPLE23/image in dev) saved as public/certificate-sample.webp.

export function Certificates() {
  return (
    <Split
      id="certificates"
      eyebrow="Certificates"
      title={
        <>
          Finish it. <em>Prove it.</em>
        </>
      }
      copy="Finish your course and you earn a certificate of achievement: your real name, the skills you practised, your XP and best streak, and a credential ID anyone can check."
      points={[
        'Your real name, confirmed by you before it prints',
        'A QR code and link that verify it in seconds',
        'Add it to LinkedIn, download it or print it',
      ]}
      visual={
        <div className={s.certVisual}>
          <Image
            src="/certificate-sample.webp"
            alt="A Teyro certificate of achievement for Python for Beginners, with a gold medal, the learner's stats and a credential ID"
            width={1200}
            height={848}
            sizes="(max-width: 768px) 92vw, 560px"
            className={s.certImg}
          />
          <span className={s.certBadge}>
            <Glyph name="shieldCheck" size={18} strokeWidth={2.6} />
            Verified by Teyro
          </span>
        </div>
      }
      flip
      tint
    />
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
        copy="Every lesson has you using the skill within minutes: fixing real code, drafting the email, making the money call. Every answer gets instant feedback."
        points={['Real practice, checked instantly', 'Hearts keep you careful, not scared', 'Every right answer earns XP']}
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
    </>
  );
}

// ─── Get the app ─────────────────────────────────────────────────────────────
//
// One band that says Teyro is on every device and sends each visitor to
// /download, which shows the install for the device they're holding.

const DEVICES = [
  { id: 'ios', label: 'iPhone & iPad', icon: <FaApple size={26} /> },
  { id: 'android', label: 'Android', icon: <FaAndroid size={26} /> },
  { id: 'desktop', label: 'Computer', icon: <Art name="laptop" size={30} /> },
];

export function GetTheApp() {
  return (
    <section className={s.band} id="app" aria-labelledby="app-title">
      <div className={`${s.wrap} ${s.split}`}>
        <Reveal className={s.splitCopy}>
          <span className={s.eyebrow}>Get the app</span>
          <h2 id="app-title" className={`${s.display} ${s.h2}`}>
            Teyro on every <em>screen you own.</em>
          </h2>
          <p className={s.lead}>
            Install Teyro on your phone or computer in a few seconds, straight from your browser. It opens in a tap,
            works offline and reminds you before your streak runs out.
          </p>
          <ul className={s.devices} aria-label="Devices Teyro runs on">
            {DEVICES.map((d) => (
              <li key={d.id}>
                <Link href={`/download#${d.id}`} className={s.device}>
                  {d.icon}
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/download" className={s.btn}>
            <Glyph name="download" size={20} strokeWidth={3} /> Get the app
          </Link>
        </Reveal>
        <Reveal delay={0.1} className={s.splitVisual}>
          <RemindersVisual />
        </Reveal>
      </div>
    </section>
  );
}

// ─── Who it's for ────────────────────────────────────────────────────────────

const PERSONAS = [
  {
    art: 'cap' as ArtName,
    title: 'Students',
    line: 'Pick up the skills school skips, like coding, money and speaking up, a few minutes a day.',
    outcome: 'A skill you practise daily, not once a term.',
  },
  {
    art: 'briefcase' as ArtName,
    title: 'People at work',
    line: 'Lead a team, negotiate a raise, put AI to work or switch careers, around a full-time job.',
    outcome: 'Steady progress toward your next role.',
  },
  {
    art: 'target' as ArtName,
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
              <span className={s.personaIcon}>
                <Art name={p.art} size={40} />
              </span>
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
      'Yes, you can start learning for free.',
  },
  {
    question: 'What can I learn?',
    answer:
      'Coding, AI, data, personal finance, leadership, communication, negotiation, business and career skills. Pick a topic, tell Tey your goal and level, and your course is built around you.',
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
    question: 'Do I get a certificate?',
    answer:
      'Yes. Finish your course and you get a certificate with your name, the skills you practised and a credential ID anyone can verify. Download it, print it or add it to LinkedIn.',
  },
  {
    question: 'How do I get the app?',
    answer:
      'Open teyro.app/download on your iPhone, Android phone or computer and it shows the install for that device. It takes a few seconds, there is no app store to go through, and you can also just learn in your browser.',
  },
  {
    question: 'Can I teach on Teyro?',
    answer:
      'Yes. Creators build courses in Teyro Studio, publish them free or paid, and get a community and analytics for every course.',
  },
];

// Answered first while the app is closed — it is also what search and AI
// answer engines will quote for "when does Teyro launch".
const LAUNCH_FAQ = {
  question: 'When does Teyro launch?',
  answer: `The learner app launches in ${APP_LAUNCHES}, and Teyro Studio for creators opens in ${STUDIO_OPENS}. Leave your email on this page and we’ll tell you the day it opens.`,
};

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
          <Accordion items={LEARNER_ENTRY.gated ? [LAUNCH_FAQ, ...FAQ] : FAQ} />
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
          {LEARNER_ENTRY.gated ? (
            <>
              Be first in <em>when we launch.</em>
            </>
          ) : (
            <>
              Start your streak <em>today.</em>
            </>
          )}
        </h2>
        <p className={s.lead}>
          {LEARNER_ENTRY.gated
            ? `Teyro launches in ${APP_LAUNCHES}. Get notified the day the doors open.`
            : 'Your first lesson takes a few minutes. Your future self will thank you.'}
        </p>
        <Link href={START_HREF} className={s.btn}>
          {START_LABEL}
        </Link>
      </div>
      <div className={s.finalStage} aria-hidden="true">
        <Image src="/User onbarding Assets/tey/cheering.webp" alt="" width={220} height={256} />
      </div>
    </section>
  );
}
