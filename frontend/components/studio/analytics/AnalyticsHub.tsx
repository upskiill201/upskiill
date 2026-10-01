'use client';

/**
 * /creator/analytics — one course at a time, the way its learners move
 * through it. Top to bottom: Tey's read (what needs you, with the action),
 * the numbers for the chosen range, the annotated course path, activity,
 * when learners study, and reviews. The rail holds the community and the
 * course link.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import {
  BookOpenCheck,
  CheckCircle2,
  Copy,
  Flame,
  MessageCircleQuestion,
  Plus,
  Star,
  Target,
  Users,
  Wallet,
} from 'lucide-react';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import {
  courseShareUrl,
  studioFetch,
  studioKeys,
  type Callout,
  type CoursePulse,
  type Face,
} from '@/lib/creator/studio';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { Columns, BarList, type ColumnPoint } from '../Charts';
import { CourseSwitcher, useStudioCourse } from '../CourseSwitcher';
import { NudgeSheet, type NudgeKind } from '../NudgeSheet';
import {
  Delta,
  EmptyCard,
  ErrorCard,
  PageHead,
  PersonAvatar,
  Section,
  Segmented,
  Skel,
  StatTile,
  TeyLine,
  studio as s,
  useToast,
} from '../StudioParts';
import { Callouts } from './Callouts';
import { CoursePathMap } from './CoursePathMap';

type Range = 7 | 30 | 90;
const RANGES: { value: Range; label: string }[] = [
  { value: 7, label: '7D' },
  { value: 30, label: '30D' },
  { value: 90, label: '90D' },
];

export function AnalyticsHub() {
  useStandaloneSound();
  const router = useRouter();
  const { courses, course, setCourse, loading: coursesLoading, error: coursesError, reload } = useStudioCourse();
  const [range, setRange] = useState<Range>(30);
  const { data: pulse, error, isLoading, mutate } = useSWR<CoursePulse>(
    course ? studioKeys.pulse(course.id, range) : null,
    studioFetch,
    { keepPreviousData: true },
  );
  const [nudge, setNudge] = useState<{ kind: NudgeKind; ids: string[]; faces: Face[] } | null>(null);
  const toast = useToast();

  const copyLink = async () => {
    if (!course) return;
    try {
      await navigator.clipboard.writeText(courseShareUrl(course.id));
      playSound('select');
      toast.show('Course link copied');
    } catch {
      toast.show('Couldn’t copy. The link is teyro.app/courses/' + course.id);
    }
  };

  const onAction = (c: Callout) => {
    const a = c.action;
    if (!a || !course) return;
    playHaptic('light', false);
    if (a.kind === 'lesson' && a.lessonId) router.push(`/creator/analytics/${course.id}/lessons/${a.lessonId}`);
    else if ((a.kind === 'nudge' || a.kind === 'cheer') && a.learnerIds?.length)
      setNudge({ kind: a.kind === 'nudge' ? 'NUDGE' : 'CHEER', ids: a.learnerIds, faces: a.faces ?? [] });
    else if (a.kind === 'community') router.push(`/creator/community?course=${course.id}`);
    else if (a.kind === 'coupon') router.push(`/creator/coupons/new?course=${course.id}`);
    else if (a.kind === 'share') void copyLink();
  };

  /* ── states ── */
  if (coursesError) {
    return (
      <div className={s.page}>
        <PageHead title="Analytics" />
        <ErrorCard message="Your courses didn’t load." onRetry={() => void reload()} />
      </div>
    );
  }
  if (coursesLoading) return <AnalyticsSkeleton />;
  if (!course) {
    return (
      <div className={s.page}>
        <PageHead title="Analytics" />
        <EmptyCard
          pose="tablet"
          title="Your first course starts here"
          action={
            <Link href="/creator/create" className={s.btnPrimary}>
              <Plus size={16} aria-hidden="true" /> Create a course
            </Link>
          }
        >
          Once learners are on it, you’ll see how they move through every lesson.
        </EmptyCard>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <PageHead
        title="Analytics"
        sub="How learners move through your course, and where they need you."
        actions={
          <>
            <CourseSwitcher courses={courses} course={course} onPick={setCourse} />
            <Segmented label="Time range" value={range} options={RANGES} onChange={setRange} />
          </>
        }
      />

      {error && !pulse ? (
        <ErrorCard message={error.message || 'Analytics didn’t load.'} onRetry={() => void mutate()} />
      ) : !pulse || (isLoading && pulse.course.id !== course.id) ? (
        <AnalyticsBody.Skeleton />
      ) : (
        <AnalyticsBody pulse={pulse} range={range} onAction={onAction} onCopyLink={copyLink} />
      )}

      {nudge && (
        <NudgeSheet
          open
          kind={nudge.kind}
          courseId={course.id}
          courseTitle={course.title}
          learnerIds={nudge.ids}
          faces={nudge.faces}
          onClose={() => setNudge(null)}
        />
      )}
      {toast.node}
    </div>
  );
}

function headline(p: CoursePulse): string {
  const urgent = p.callouts.filter((c) => c.tone === 'bad' || c.tone === 'warn').length;
  if (p.totals.learners === 0) return 'No learners yet. Let’s get your course in front of people.';
  if (urgent >= 2) return `${urgent} things need you. Start at the top.`;
  if (urgent === 1) return 'One thing needs you. Everything else is on track.';
  if (p.callouts.length > 0) return 'Things look good. Here’s where you can make them better.';
  return 'All quiet. Your learners are keeping pace.';
}

function AnalyticsBody({
  pulse,
  range,
  onAction,
  onCopyLink,
}: {
  pulse: CoursePulse;
  range: Range;
  onAction: (c: Callout) => void;
  onCopyLink: () => void;
}) {
  const router = useRouter();
  const [series, setSeries] = useState<'finished' | 'joined'>('finished');
  const t = pulse.totals;
  const vs = range === 7 ? 'vs last week' : `vs prior ${range}d`;

  const points: ColumnPoint[] = useMemo(() => {
    const pts = pulse.series.points;
    const weekly = pulse.series.bucketDays > 1;
    return pts.map((pt, i) => {
      const d = new Date(`${pt.start}T00:00:00Z`);
      const day = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
      const wd = d.toLocaleDateString(undefined, { weekday: 'short', timeZone: 'UTC' });
      const every = pts.length <= 8 ? 1 : weekly ? 3 : 5;
      const showAxis = (pts.length - 1 - i) % every === 0;
      return {
        key: pt.start,
        // Short enough to fit a bar's slot: weekday for a week, else the day number.
        axis: showAxis ? (pts.length <= 8 ? wd : weekly ? day.split(' ').reverse().join(' ') : String(d.getUTCDate())) : '',
        label: weekly ? `Week of ${day}` : `${wd} ${day}`,
        value: series === 'finished' ? pt.finished : pt.joined,
      };
    });
  }, [pulse.series, series]);

  const peakDaypart = [...pulse.when.dayparts].sort((a, b) => b.count - a.count)[0];
  const peakDay = [...pulse.when.weekdays].sort((a, b) => b.count - a.count)[0];

  return (
    <>
      <TeyLine pose={pulse.callouts.some((c) => c.tone === 'bad') ? 'thinking' : 'pointing'}>{headline(pulse)}</TeyLine>

      {pulse.callouts.length > 0 && <Callouts callouts={pulse.callouts} onAction={onAction} />}

      <div className={s.stats}>
        <StatTile
          icon={<Users size={18} />}
          label="Learners"
          value={t.learners}
          foot={
            <>
              +{t.newLearners.value} new <Delta pct={t.newLearners.deltaPct} vs={vs} />
            </>
          }
          onClick={() => router.push(`/creator/students?course=${pulse.course.id}`)}
        />
        <StatTile
          icon={<Flame size={18} />}
          tone="var(--warning)"
          label={`Active · ${range}d`}
          value={t.activeLearners}
          foot={t.learners > 0 ? `${Math.round((t.activeLearners / t.learners) * 100)}% of learners` : 'No learners yet'}
        />
        <StatTile
          icon={<BookOpenCheck size={18} />}
          tone="var(--success-green)"
          label="Lessons finished"
          value={t.lessonsFinished.value}
          foot={<Delta pct={t.lessonsFinished.deltaPct} vs={vs} />}
        />
        <StatTile
          icon={<CheckCircle2 size={18} />}
          tone="var(--brand-purple)"
          label="Finished course"
          value={t.finishedCourse}
          foot={t.startedLearners > 0 ? `${t.completionRatePct}% of those who started` : 'Nobody has started yet'}
        />
      </div>

      <div className={s.split}>
        <div className={s.section} style={{ gap: 32 }}>
          <Section
            title="Course path"
            note="Every lesson as learners see it. Tap one to see where they stop and what trips them up."
          >
            <CoursePathMap pulse={pulse} />
          </Section>

          <Section
            title="Activity"
            side={
              <Segmented
                label="Show"
                value={series}
                onChange={setSeries}
                options={[
                  { value: 'finished', label: 'Lessons finished' },
                  { value: 'joined', label: 'New learners' },
                ]}
              />
            }
          >
            <div className={s.card}>
              <Columns
                points={points}
                unit={(n) => `${n} ${series === 'finished' ? (n === 1 ? 'lesson' : 'lessons') : n === 1 ? 'learner' : 'learners'}`}
                caption={series === 'finished' ? 'Lessons finished' : 'New learners'}
                tone={series === 'finished' ? 'var(--success-green)' : 'var(--color-brand)'}
              />
            </div>
          </Section>

          <Section
            title="When they learn"
            note={
              pulse.when.sample > 0
                ? `From ${pulse.when.sample} lessons in the last 90 days, in each learner’s own time.`
                : 'Shows up once learners finish lessons.'
            }
          >
            {pulse.when.sample > 0 ? (
              <div className={s.grid2}>
                <div className={s.card}>
                  <Columns
                    points={pulse.when.weekdays.map((w) => ({ key: w.label, axis: w.label, label: w.label, value: w.count }))}
                    unit={(n) => `${n} ${n === 1 ? 'lesson' : 'lessons'}`}
                    caption="Lessons by weekday"
                    height={120}
                  />
                </div>
                <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <BarList
                    caption="Lessons by time of day"
                    rows={pulse.when.dayparts.map((d) => ({ key: d.key, label: d.label, value: d.count, title: d.hours }))}
                  />
                  {peakDaypart && peakDaypart.count > 0 && (
                    <p className={s.sectionNote} style={{ color: 'var(--text-secondary)' }}>
                      <strong>Tip:</strong> most learning happens {peakDay ? `on ${peakDay.label}s, ` : ''}in the{' '}
                      {peakDaypart.label.toLowerCase()} ({peakDaypart.hours}). Post announcements just before.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className={s.empty}>No finished lessons yet.</div>
            )}
          </Section>

          <Section title="Reviews">
            <Reviews pulse={pulse} />
          </Section>
        </div>

        <aside className={s.rail}>
          <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className={s.statLabel}>First-try accuracy</span>
            <span className={s.statValue} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Target size={22} color="var(--color-brand)" aria-hidden="true" />
              {t.avgAccuracyPct === null ? '—' : `${t.avgAccuracyPct}%`}
            </span>
            <span className={s.sectionNote}>Right answers before “fix your mistakes”, across Apply exercises this period.</span>
          </div>

          <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className={s.statLabel}>Community</span>
            {pulse.community ? (
              <>
                <span style={{ fontSize: 15, fontWeight: 700 }}>
                  {pulse.community.members} members · {pulse.community.postsInRange} posts in {range}d
                </span>
                {pulse.community.unanswered > 0 ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, color: 'var(--error-red)' }}>
                    <MessageCircleQuestion size={18} aria-hidden="true" /> {pulse.community.unanswered} waiting for your answer
                  </span>
                ) : (
                  <span className={s.sectionNote}>Every question has your answer.</span>
                )}
                <Link href={`/creator/community?course=${pulse.course.id}`} className={s.btn}>
                  Open community
                </Link>
              </>
            ) : (
              <span className={s.sectionNote}>The community opens when the course goes live.</span>
            )}
          </div>

          {pulse.course.isPaid && (
            <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className={s.statLabel}>Paying learners</span>
              <span className={s.statValue}>{t.paidLearners}</span>
              <span className={s.sectionNote}>
                of {t.learners} learners. The first {pulse.course.freeLessons} lessons are free.
              </span>
              <Link href="/creator/earnings" className={s.btn}>
                <Wallet size={16} aria-hidden="true" /> Earnings
              </Link>
            </div>
          )}

          {pulse.course.published && (
            <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className={s.statLabel}>Bring more learners</span>
              <span className={s.sectionNote}>Share the course. Anyone can start the free lessons.</span>
              <button type="button" className={s.btnPrimary} onClick={onCopyLink}>
                <Copy size={16} aria-hidden="true" /> Copy course link
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

function Reviews({ pulse }: { pulse: CoursePulse }) {
  const { rating } = pulse.totals;
  if (rating.count === 0) {
    return <div className={s.empty}>No reviews yet. Learners can rate the course after a few lessons.</div>;
  }
  return (
    <div className={s.grid2}>
      <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className={s.statValue} style={{ fontSize: 40 }}>
            {rating.avg?.toFixed(1)}
          </span>
          <Star size={22} fill="var(--warning)" color="var(--warning)" aria-hidden="true" />
          <span className={s.sectionNote}>
            {rating.count} {rating.count === 1 ? 'review' : 'reviews'}
          </span>
        </span>
        <BarList
          caption="Reviews by stars"
          rows={pulse.ratingBreakdown.map((r) => ({ key: String(r.stars), label: `${r.stars} star`, value: r.count, tone: 'var(--warning)' }))}
        />
      </div>
      <div className={s.list}>
        {pulse.reviews.length === 0 && <div className={s.row}>Ratings only so far, no written reviews.</div>}
        {pulse.reviews.map((r) => (
          <div key={r.id} className={s.row} style={{ alignItems: 'flex-start' }}>
            <PersonAvatar face={r.author} size={36} />
            <span className={s.rowMain}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <strong style={{ fontSize: 14.5 }}>{r.author.fullName}</strong>
                <span aria-label={`${r.rating} stars`} style={{ display: 'inline-flex' }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={13}
                      aria-hidden="true"
                      fill={i < r.rating ? 'var(--warning)' : 'none'}
                      color={i < r.rating ? 'var(--warning)' : 'var(--border-strong)'}
                    />
                  ))}
                </span>
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-secondary)' }}>{r.comment}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

AnalyticsBody.Skeleton = function AnalyticsBodySkeleton() {
  return (
    <div aria-busy="true" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Skel h={96} />
      <Skel h={84} />
      <div className={s.stats}>
        {[0, 1, 2, 3].map((i) => (
          <Skel key={i} h={112} r={18} />
        ))}
      </div>
      <div className={s.split}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Skel h={64} r={18} />
          {[0, 1, 2, 3].map((i) => (
            <Skel key={i} h={104} r={18} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Skel h={140} />
          <Skel h={180} />
        </div>
      </div>
    </div>
  );
};

function AnalyticsSkeleton() {
  return (
    <div className={s.page}>
      <Skel h={56} w="60%" />
      <AnalyticsBody.Skeleton />
    </div>
  );
}
