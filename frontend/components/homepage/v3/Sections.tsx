/**
 * Homepage sections (v3). Coddy's layout — hero, tracks, alternating feature
 * rows, audience, creators, FAQ, final CTA — in Duolingo's chunky style.
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
            Coding, AI, money, leadership, communication and more, in short daily lessons with streaks, leagues and
            friends that keep you coming back until you actually finish.
          </p>
          <ul className={s.heroSkills} aria-label="What you can learn">
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
              {START_LABEL}
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
              <Glyph name="check" size={16} strokeWidth={4} /> Bite-sized lessons
            </span>
            <span>
              <Glyph name="check" size={16} strokeWidth={4} /> No app store needed
            </span>
          </div>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}

export { LaunchBadges };

// ─── Skills ──────────────────────────────────────────────────────────────────
//
// What Teyro teaches today, one card per subject (lib/courses/subjects.ts,
// shared with the /courses catalogue). Coding and AI link to their /learn-*
// hubs; the rest to their section of the catalogue.

const SKILLS = SUBJECTS.map((subject) => ({
  ...subject,
  href: subject.id === 'coding' ? '/learn-coding' : subject.id === 'ai' ? '/learn-ai' : `/courses#${subject.id}`,
}));

export function Tracks() {
  return (
    <section className={s.band} id="tracks" aria-labelledby="tracks-title">
      <div className={s.wrap}>
        <Reveal className={s.sectionHead}>
          <span className={s.eyebrow}>What you can learn</span>
          <h2 id="tracks-title" className={`${s.display} ${s.h2}`}>
            Way more than code. <em>Pick a skill and go.</em>
          </h2>
          <p className={s.lead}>
            Every course is built the Teyro way: short lessons, real practice from the first minute, and a streak that
            keeps you going.
          </p>
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
                      <Glyph name="book" size={16} strokeWidth={2.75} />
                      {course}
                    </li>
                  ))}
                </ul>
                <span className={s.skillCta}>
                  See courses <Glyph name="arrow" size={18} strokeWidth={3} />
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
      copy="Complete every lesson of any Teyro course and you earn a certificate of achievement: your real name, the skills you practised, your XP and best streak, and a credential ID anyone can check."
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
      'Yes, you can start free. Many courses are free end to end; paid courses let you try the first two lessons free before you decide.',
  },
  {
    question: 'What can I learn?',
    answer:
      'Coding, AI, data, personal finance, leadership, communication, negotiation, business and career skills. Teyro Originals cover each of these, and new courses arrive all the time.',
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
      'Yes. Finish every lesson of a course and you get a certificate with your name, the skills you practised and a credential ID anyone can verify. Download it, print it or add it to LinkedIn.',
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
