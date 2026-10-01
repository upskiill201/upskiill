'use client';

/**
 * The studio home — the first thing a creator sees. It answers three
 * questions in order:
 *
 *   What needs me?        Tey names the most important thing and its button
 *                         sits right in the bubble; the rest queue below.
 *   What happened?        This week against last, day by day, and a live
 *                         feed of learners joining, finishing, buying, asking.
 *   Where are my courses? Every course with its stage, and for live ones the
 *                         learners, momentum and what's waiting.
 *
 * One call: GET /analytics/instructor/home (studio-home.service.ts).
 */

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import useSWR from 'swr';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  CircleDollarSign,
  Flame,
  MessageCircleQuestion,
  Plus,
  Send,
  Share2,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { CourseCover } from '@/components/course/CourseCover';
import type { TeyPose } from '@/components/lesson/TeySays';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { courseStage } from '@/lib/creator/courseStatus';
import {
  ago,
  compact,
  courseShareUrl,
  firstName,
  money,
  studioFetch,
  studioKeys,
  type HomeActivity,
  type HomeCourse,
  type HomeTodo,
  type StudioHome as Home,
} from '@/lib/creator/studio';
import { getCachedUser } from '@/lib/user-cache';
import { Columns } from '../Charts';
import {
  Bar,
  Delta,
  EmptyCard,
  ErrorCard,
  Faces,
  PersonAvatar,
  Pill,
  Section,
  Skel,
  StatTile,
  TeyLine,
  useToast,
  studio as s,
} from '../StudioParts';
import { useHydrated } from '../useHydrated';
import h from './home.module.css';

/* ── copy ─────────────────────────────────────────────────────────────── */

function greeting() {
  const hr = new Date().getHours();
  return hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
}

const TODO_ICON: Record<HomeTodo['kind'], LucideIcon> = {
  fix_review: Send,
  questions: MessageCircleQuestion,
  nudge: Users,
  publish: Sparkles,
  submit: Send,
  continue_draft: BookOpen,
  share: Share2,
  profile: Users,
  payouts: Wallet,
  first_course: Plus,
};

const TONE: Record<HomeTodo['tone'], string> = {
  bad: 'var(--error-red)',
  warn: 'var(--warning)',
  good: 'var(--success-green)',
  info: 'var(--color-brand)',
};

/** What Tey says, and how Tey stands, given the week. */
function teyRead(home: Home, name: string | null): { pose: TeyPose; line: string } {
  const hi = name ? `${greeting()}, ${name}!` : `${greeting()}!`;
  const top = home.todos[0];
  const waiting = home.todos.filter((t) => t.kind === 'questions' || t.kind === 'nudge').reduce((n, t) => n + (t.count ?? 0), 0);
  const lessons = home.week.lessonsFinished;
  if (home.totals.courses === 0) return { pose: 'welcome', line: `${hi} Welcome to your studio. Let’s make your first course together.` };
  if (top?.kind === 'fix_review') return { pose: 'thinking', line: `${hi} ${top.title}. Fix the notes and we’ll look again.` };
  if (top?.kind === 'publish') return { pose: 'cheering', line: `${hi} ${top.title}! One tap and learners can start.` };
  if (waiting > 0 && lessons.value > 0)
    return {
      pose: 'pointing',
      line: `${hi} Learners finished ${lessons.value} lesson${lessons.value === 1 ? '' : 's'} this week, and ${waiting} ${waiting === 1 ? 'thing is' : 'things are'} waiting on you.`,
    };
  if (waiting > 0) return { pose: 'pointing', line: `${hi} ${waiting} ${waiting === 1 ? 'learner is' : 'learners are'} waiting on you. Start here.` };
  if (lessons.value > 0)
    return {
      pose: 'cheering',
      line: `${hi} Learners finished ${lessons.value} lesson${lessons.value === 1 ? '' : 's'} this week${lessons.deltaPct > 0 ? `, up ${lessons.deltaPct}%` : ''}. Nice work!`,
    };
  if (top?.kind === 'continue_draft' || top?.kind === 'submit') return { pose: 'tablet', line: `${hi} Your course is coming along. Let’s keep building.` };
  if (home.totals.liveCourses > 0) return { pose: 'searching', line: `${hi} It’s a quiet week. Share your course to bring new learners in.` };
  return { pose: 'waving', line: `${hi} Here’s where your studio stands.` };
}

/* ── the page ─────────────────────────────────────────────────────────── */

export function StudioHome() {
  useStandaloneSound();
  const { data, error, isLoading, mutate } = useSWR<Home>(studioKeys.home, studioFetch, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
  });
  const hydrated = useHydrated();
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const cached = getCachedUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cached?.fullName) setName(firstName(cached.fullName));
  }, []);

  // Tey's arrival cue once per visit when something is waiting.
  const cued = useRef(false);
  useEffect(() => {
    if (!data || cued.current) return;
    cued.current = true;
    if (data.todos.some((t) => t.tone === 'warn' || t.tone === 'bad' || t.kind === 'publish')) playSound('arrive');
  }, [data]);

  if (hydrated && error && !data) {
    return (
      <div className={s.page}>
        <ErrorCard message="Your studio home didn’t load." onRetry={() => void mutate()} />
      </div>
    );
  }
  if (!hydrated || isLoading || !data) return <HomeSkeleton />;

  const fresh = data.totals.courses === 0;
  const tey = teyRead(data, name);
  const [top, ...rest] = data.todos;

  return (
    <div className={s.page}>
      <h1 className={s.srOnly}>Studio home</h1>

      {/* What needs me */}
      <div className={h.hero}>
        <TeyLine pose={tey.pose}>
          <span className={h.heroLine}>{tey.line}</span>
          {top && <FocusTodo todo={top} />}
        </TeyLine>
      </div>

      <div className={s.split}>
        <div className={h.mainCol}>
          {rest.length > 0 && <TodoList todos={rest} />}

          {!fresh && <ThisWeek home={data} />}

          <CoursesSection courses={data.courses} />
        </div>

        <aside className={s.rail} aria-label="Activity and setup">
          <Checklist home={data} />
          {!fresh && <ActivityFeed items={data.activity} hasLive={data.totals.liveCourses > 0} />}
        </aside>
      </div>
    </div>
  );
}

/* ── the one thing ────────────────────────────────────────────────────── */

function FocusTodo({ todo }: { todo: HomeTodo }) {
  const Icon = TODO_ICON[todo.kind];
  return (
    <span className={h.focus} style={{ '--tone': TONE[todo.tone] } as CSSProperties}>
      <span className={h.focusMeta}>
        <span className={h.focusIcon} aria-hidden="true">
          <Icon size={18} strokeWidth={2.6} />
        </span>
        <span className={h.focusText}>
          <strong>{todo.title}</strong>
          <span>{todo.body}</span>
        </span>
        {todo.faces && todo.faces.length > 0 && <Faces faces={todo.faces} total={todo.count} />}
      </span>
      <TodoAction todo={todo} big />
    </span>
  );
}

function TodoAction({ todo, big = false }: { todo: HomeTodo; big?: boolean }) {
  const toast = useToast();
  const cls = `${big ? s.btnPrimary : `${s.btn} ${s.btnSm}`}`;
  if (todo.kind === 'share' && todo.courseId) {
    const courseId = todo.courseId;
    return (
      <>
        <button
          type="button"
          className={cls}
          onClick={async () => {
            const url = courseShareUrl(courseId);
            try {
              if (navigator.share) await navigator.share({ url });
              else {
                await navigator.clipboard.writeText(url);
                toast.show('Course link copied');
              }
              playSound('like');
            } catch {
              /* share sheet dismissed */
            }
          }}
        >
          <Share2 size={16} aria-hidden="true" /> {todo.cta}
        </button>
        {toast.node}
      </>
    );
  }
  return (
    <Link href={todo.href} className={cls} onClick={() => playSound(big ? 'start' : 'navTap', 2)}>
      {todo.cta} <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

/* ── what else is waiting ─────────────────────────────────────────────── */

const SHOW = 4;

function TodoList({ todos }: { todos: HomeTodo[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? todos : todos.slice(0, SHOW);
  return (
    <Section title="Also waiting" note={`${todos.length} thing${todos.length === 1 ? '' : 's'} to do`}>
      <ul className={h.todos}>
        {shown.map((t) => {
          const Icon = TODO_ICON[t.kind];
          return (
            <li key={t.id} className={h.todo} style={{ '--tone': TONE[t.tone] } as CSSProperties}>
              <span className={h.todoIcon} aria-hidden="true">
                <Icon size={20} strokeWidth={2.4} />
                {t.count !== undefined && t.count > 0 && <span className={h.todoCount}>{t.count > 99 ? '99+' : t.count}</span>}
              </span>
              <span className={h.todoText}>
                <strong>{t.title}</strong>
                <span>{t.body}</span>
              </span>
              {t.faces && t.faces.length > 0 && (
                <span className={h.todoFaces}>
                  <Faces faces={t.faces} total={t.count} />
                </span>
              )}
              <TodoAction todo={t} />
            </li>
          );
        })}
      </ul>
      {todos.length > SHOW && (
        <button type="button" className={`${s.btnGhost} ${h.moreBtn}`} onClick={() => setAll((v) => !v)}>
          {all ? 'Show less' : `Show ${todos.length - SHOW} more`}
          <ChevronDown size={16} aria-hidden="true" style={{ transform: all ? 'rotate(180deg)' : undefined }} />
        </button>
      )}
    </Section>
  );
}

/* ── this week ────────────────────────────────────────────────────────── */

function ThisWeek({ home }: { home: Home }) {
  const w = home.week;
  const points = useMemo(
    () =>
      w.days.map((d) => {
        const date = new Date(`${d.day}T12:00:00Z`);
        return {
          key: d.day,
          axis: date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 3),
          label: date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
          value: d.lessons,
        };
      }),
    [w.days],
  );
  const hasEarnings = w.earnedMinor.value !== 0 || w.earnedMinor.prev !== 0 || w.sales > 0;
  return (
    <Section
      title="This week"
      note="Last 7 days, against the 7 before"
      side={
        <Link href="/creator/analytics" className={`${s.btnGhost} ${h.sideLink}`}>
          <BarChart3 size={16} aria-hidden="true" /> Analytics
        </Link>
      }
    >
      <div className={s.stats}>
        <StatTile
          icon={<UserPlus size={18} />}
          label="New learners"
          value={w.newLearners.value}
          foot={<Delta pct={w.newLearners.deltaPct} />}
          tone="var(--color-brand)"
        />
        <StatTile
          icon={<Flame size={18} />}
          label="Lessons finished"
          value={w.lessonsFinished.value}
          foot={<Delta pct={w.lessonsFinished.deltaPct} />}
          tone="var(--warning)"
        />
        <StatTile
          icon={<Users size={18} />}
          label="Active learners"
          value={w.activeLearners.value}
          foot={<>of {compact(home.totals.learners)} total</>}
          tone="var(--brand-purple)"
        />
        {hasEarnings ? (
          <StatTile
            icon={<CircleDollarSign size={18} />}
            label="Earned"
            value={money(w.earnedMinor.value)}
            foot={
              <>
                <Delta pct={w.earnedMinor.deltaPct} />
                {w.sales > 0 && <span>· {w.sales} sale{w.sales === 1 ? '' : 's'}</span>}
              </>
            }
            tone="var(--success-green)"
          />
        ) : (
          <StatTile
            icon={<Star size={18} />}
            label="Rating"
            value={home.totals.rating.avg !== null ? home.totals.rating.avg.toFixed(1) : '—'}
            foot={home.totals.rating.count > 0 ? `${home.totals.rating.count} review${home.totals.rating.count === 1 ? '' : 's'}` : 'No reviews yet'}
            tone="var(--warning)"
          />
        )}
      </div>
      <div className={s.card}>
        <div className={h.chartHead}>
          <strong>Lessons finished each day</strong>
          <span>{w.lessonsFinished.value} this week</span>
        </div>
        <Columns
          points={points}
          unit={(n) => `${n} lesson${n === 1 ? '' : 's'}`}
          caption="Lessons finished by your learners each day this week"
          height={132}
        />
      </div>
    </Section>
  );
}

/* ── courses ──────────────────────────────────────────────────────────── */

const STAGE_REVIEW: Record<HomeCourse['stage'], string | null> = {
  live: null,
  draft: 'DRAFT',
  in_review: 'UNDER_REVIEW',
  changes: 'CHANGES_REQUESTED',
  approved: 'APPROVED',
  rejected: 'REJECTED',
};

function CoursesSection({ courses }: { courses: HomeCourse[] }) {
  return (
    <Section
      title="Your courses"
      note={courses.length > 0 ? `${courses.length} course${courses.length === 1 ? '' : 's'}` : undefined}
      side={
        courses.length > 0 ? (
          <Link href="/creator/courses" className={`${s.btnGhost} ${h.sideLink}`}>
            All courses <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : undefined
      }
    >
      {courses.length === 0 ? (
        <EmptyCard
          pose="tablet"
          title="No courses yet"
          action={
            <Link href="/creator/create" className={s.btnPrimary} onClick={() => playSound('start')}>
              <Plus size={16} aria-hidden="true" /> Create a course
            </Link>
          }
        >
          Teyro courses are short lessons with real practice. The wizard helps you plan yours.
        </EmptyCard>
      ) : (
        <ul className={h.courses}>
          {courses.slice(0, 6).map((c) => (
            <CourseCard key={c.id} c={c} />
          ))}
        </ul>
      )}
    </Section>
  );
}

function CourseCard({ c }: { c: HomeCourse }) {
  const info = courseStage(STAGE_REVIEW[c.stage], c.stage === 'live');
  const live = c.stage === 'live';
  const readyPct = c.lessons.total > 0 ? (c.lessons.published / c.lessons.total) * 100 : 0;
  return (
    <li className={h.course}>
      <Link href={`/creator/courses/${c.id}`} className={h.courseLink}>
        <CourseCover id={c.id} category={c.category} thumbnailUrl={c.thumbnailUrl} sizes="96px" glyphSize={28} className={h.cover} />
        <span className={h.courseBody}>
          <span className={h.courseTop}>
            <Pill tone={info.tone}>{info.label}</Pill>
            {live && (c.waiting.questions > 0 || c.waiting.quiet > 0) && (
              <span className={h.waitChip}>
                {c.waiting.questions > 0 && (
                  <>
                    <MessageCircleQuestion size={13} aria-hidden="true" /> {c.waiting.questions}
                  </>
                )}
                {c.waiting.quiet > 0 && (
                  <>
                    <Users size={13} aria-hidden="true" /> {c.waiting.quiet}
                  </>
                )}
                <span className={s.srOnly}>waiting on you</span>
              </span>
            )}
          </span>
          <strong className={h.courseTitle}>{c.title}</strong>
          {live ? (
            <span className={h.courseStats}>
              <span>
                <Users size={14} aria-hidden="true" /> {compact(c.learners)} learner{c.learners === 1 ? '' : 's'}
              </span>
              {c.newThisWeek > 0 && <span className={h.up}>+{c.newThisWeek} this week</span>}
              <span>
                <Trophy size={14} aria-hidden="true" /> {c.completionPct}% finish
              </span>
              {c.rating.avg !== null && (
                <span>
                  <Star size={14} aria-hidden="true" /> {c.rating.avg.toFixed(1)}
                </span>
              )}
            </span>
          ) : (
            <span className={h.courseDraft}>
              <Bar pct={readyPct} tone={info.tone} label={`${c.lessons.published} of ${c.lessons.total} lessons ready`} />
              <span>
                {c.lessons.total === 0 ? 'No lessons yet' : `${c.lessons.published}/${c.lessons.total} lessons ready`} · edited {ago(c.updatedAt)}
              </span>
            </span>
          )}
        </span>
        <ArrowRight size={18} className={h.courseArrow} aria-hidden="true" />
      </Link>
    </li>
  );
}

/* ── setup checklist ──────────────────────────────────────────────────── */

function Checklist({ home }: { home: Home }) {
  const steps = [
    { done: home.totals.courses > 0, label: 'Create your first course', href: '/creator/create' },
    { done: home.setup.hasAvatar, label: 'Add a profile photo', href: '/creator/profile' },
    { done: home.setup.hasBio, label: 'Write a short bio', href: '/creator/profile' },
    { done: home.totals.liveCourses > 0, label: 'Get a course live', href: '/creator/courses' },
    { done: home.totals.learners > 0, label: 'Welcome your first learner', href: '/creator/students' },
  ];
  const done = steps.filter((x) => x.done).length;
  if (done === steps.length) return null;
  return (
    <div className={s.card}>
      <div className={h.checkHead}>
        <strong>Set up your studio</strong>
        <span>
          {done}/{steps.length}
        </span>
      </div>
      <Bar pct={(done / steps.length) * 100} tone="var(--success-green)" label="Studio setup" />
      <ol className={h.checks}>
        {steps.map((x) => (
          <li key={x.label}>
            <Link href={x.href} className={`${h.check} ${x.done ? h.checkDone : ''}`} aria-disabled={x.done}>
              <span className={h.checkBox} aria-hidden="true">
                {x.done && <Check size={14} strokeWidth={3.4} />}
              </span>
              <span>{x.label}</span>
              {x.done && <span className={s.srOnly}>(done)</span>}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── activity ─────────────────────────────────────────────────────────── */

const ACT: Record<HomeActivity['kind'], { icon: LucideIcon; tone: string }> = {
  joined: { icon: UserPlus, tone: 'var(--color-brand)' },
  lesson: { icon: Flame, tone: 'var(--warning)' },
  finished: { icon: Trophy, tone: 'var(--brand-purple)' },
  sale: { icon: CircleDollarSign, tone: 'var(--success-green)' },
  question: { icon: MessageCircleQuestion, tone: 'var(--warning)' },
};

function activityLine(a: HomeActivity) {
  switch (a.kind) {
    case 'joined':
      return <>joined <em>{a.courseTitle}</em></>;
    case 'lesson':
      return <>finished <em>{a.detail ?? 'a lesson'}</em></>;
    case 'finished':
      return <>finished the whole course <em>{a.courseTitle}</em></>;
    case 'sale':
      return <>bought <em>{a.courseTitle}</em>{a.detail ? ` · you earned $${a.detail}` : ''}</>;
    case 'question':
      return <>asked “{a.detail}”</>;
  }
}

function ActivityFeed({ items, hasLive }: { items: HomeActivity[]; hasLive: boolean }) {
  return (
    <div className={s.card} style={{ padding: 0 }}>
      <div className={h.feedHead}>
        <strong>Live activity</strong>
        <span className={h.liveDot} aria-hidden="true" />
      </div>
      {items.length === 0 ? (
        <p className={h.feedEmpty}>
          {hasLive
            ? 'No learner activity in the last two weeks. A post in your community can wake things up.'
            : 'When your course is live, you’ll see learners join, finish lessons and ask questions here.'}
        </p>
      ) : (
        <ul className={h.feed}>
          {items.map((a) => {
            const k = ACT[a.kind];
            const Icon = k.icon;
            return (
              <li key={a.id}>
                <Link href={a.href} className={h.feedRow} style={{ '--tone': k.tone } as CSSProperties}>
                  <span className={h.feedAvatar}>
                    <PersonAvatar face={a.who} size={36} />
                    <span className={h.feedBadge} aria-hidden="true">
                      <Icon size={11} strokeWidth={2.8} />
                    </span>
                  </span>
                  <span className={h.feedText}>
                    <span>
                      <strong>{firstName(a.who.fullName)}</strong> {activityLine(a)}
                    </span>
                    <span className={h.feedTime}>{ago(a.at)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── loading ──────────────────────────────────────────────────────────── */

function HomeSkeleton() {
  return (
    <div className={s.page} aria-busy="true" aria-label="Loading your studio">
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        <Skel h={116} w={96} r={24} />
        <Skel h={132} r={18} />
      </div>
      <div className={s.split}>
        <div className={h.mainCol}>
          <Skel h={24} w={180} r={8} />
          <Skel h={84} r={18} />
          <Skel h={84} r={18} />
          <div className={s.stats}>
            {Array.from({ length: 4 }, (_, i) => (
              <Skel key={i} h={112} r={18} />
            ))}
          </div>
          <Skel h={200} r={20} />
        </div>
        <div className={s.rail}>
          <Skel h={220} r={20} />
          <Skel h={320} r={20} />
        </div>
      </div>
    </div>
  );
}
