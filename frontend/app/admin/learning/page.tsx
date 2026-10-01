'use client';

/**
 * Teyro HQ — Learning. How learners actually use Teyro: how many show up,
 * how far new people get, who comes back (day 1 / 7 / 30 and weekly
 * cohorts), how much they learn, and the habits that keep them (streaks,
 * leagues, tracks, the courses they're taking).
 */

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Flame, GraduationCap, Sparkles, Users } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminUI';
import {
  Bars,
  CohortGrid,
  Funnel,
  Hero,
  LoadError,
  Panel,
  RangeSwitch,
  SeriesChart,
  Skeleton,
  Tile,
  compact,
  hq as h,
  type Range,
  type Stat,
} from '@/components/admin/hq/HQ';

interface Learning {
  range: Range;
  learners: number;
  pulse: { dau: number; wau: number; mau: number; stickinessPct: number };
  activeSeries: { day: string; active: number }[];
  activation: { key: string; label: string; count: number; pctOfSignups: number }[];
  cohorts: { week: string; size: number; weeks: (number | null)[] }[];
  retention: { day: number; eligible: number; pct: number }[];
  engagement: {
    lessons: number;
    minutes: number;
    xp: number;
    learnerDays: number;
    lessonsPerLearnerDay: number;
    minutesPerLearnerDay: number;
    series: { day: string; lessons: number; minutes: number }[];
    lessonsStat: Stat;
    minutesStat: Stat;
  };
  streaks: { bucket: string; count: number }[];
  leagues: { tier: string; count: number }[];
  tracks: { track: string; count: number }[];
  topCourses: { id: string; title: string; lessons: number; learners: number }[];
}

const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export default function AdminLearningPage() {
  const [range, setRange] = useState<Range>(30);
  const { data, error, mutate } = useAdminData<Learning>(`/api/admin/insights/learning?range=${range}`);

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const e = data.engagement;
  const period = `last ${range} days`;
  const d1 = data.retention.find((r) => r.day === 1);

  return (
    <div className={h.page}>
      <Hero
        pose="flame"
        title="The learning side"
        sub={`${compact(data.learners)} learners. Who shows up, who comes back, and how much they learn.`}
        right={<RangeSwitch value={range} onChange={setRange} />}
      />

      <div className={h.tiles}>
        <Tile icon={<Users size={19} />} tone="var(--brand-purple)" label="Active this month" value={compact(data.pulse.mau)} foot={<>{compact(data.pulse.wau)} this week · {compact(data.pulse.dau)} today</>} />
        <Tile icon={<Sparkles size={19} />} tone="var(--color-brand)" label="Stickiness" value={`${data.pulse.stickinessPct}%`} foot="of monthly learners show up on a given day" />
        <Tile icon={<GraduationCap size={19} />} tone="var(--success-green)" label="Lessons finished" value={compact(e.lessons)} stat={e.lessonsStat} />
        <Tile icon={<Clock size={19} />} tone="var(--warning)" label="Minutes learned" value={compact(e.minutes)} stat={e.minutesStat} />
      </div>

      <SeriesChart
        title={`Every day, ${period}`}
        tabs={[
          { key: 'active', label: 'Active', tone: 'var(--brand-purple)', summary: (ps) => `${compact(Math.max(0, ...ps.map((x) => x.value)))} on the busiest day`, unit: (n) => `${compact(n)} active`, points: data.activeSeries.map((p) => ({ day: p.day, value: p.active })) },
          { key: 'lessons', label: 'Lessons', tone: 'var(--success-green)', unit: (n) => `${compact(n)} lessons`, points: e.series.map((p) => ({ day: p.day, value: p.lessons })) },
          { key: 'minutes', label: 'Minutes', tone: 'var(--warning)', unit: (n) => `${compact(n)} min`, points: e.series.map((p) => ({ day: p.day, value: p.minutes })) },
        ]}
      />

      <div className={h.grid2}>
        <Panel title="How far new people get" note={`Everyone who signed up in the ${period}`}>
          <Funnel steps={data.activation} />
        </Panel>

        <Panel title="Who comes back" note="Of people old enough, the share active exactly that many days after signing up">
          <div className={h.bigNums}>
            {data.retention.map((r) => (
              <span key={r.day} className={h.bigNum}>
                <strong>{r.pct}%</strong>
                <span>Day {r.day}</span>
                <em>of {r.eligible}</em>
              </span>
            ))}
          </div>
          <p className={h.note}>
            Day 1 is the earliest signal: it shows whether the first session made people want a second.
            {d1 && d1.eligible < 30 ? ' With this few people, expect these to move a lot.' : ''} Active means they opened
            the app or finished a lesson that day.
          </p>
        </Panel>
      </div>

      <Panel title="Weekly cohorts" note="People grouped by the week they signed up, and the share who were active in each week after. Greener is better.">
        <CohortGrid rows={data.cohorts} />
      </Panel>

      <div className={h.grid3}>
        <Panel title="How much they learn" note="On days a learner finishes a lesson">
          <div className={h.bigNums} style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--success-green)' }}>{e.lessonsPerLearnerDay}</strong>
              <span>Lessons</span>
              <em>per learning day</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--warning)' }}>{e.minutesPerLearnerDay}</strong>
              <span>Minutes</span>
              <em>per learning day</em>
            </span>
          </div>
          <p className={h.note}>
            {compact(e.learnerDays)} learning days · {compact(e.xp)} XP earned
          </p>
        </Panel>

        <Panel title="Streaks right now" note="Every learner's current streak">
          <Bars tone="var(--warning)" rows={data.streaks.map((s) => ({ label: s.bucket === '0' ? 'No streak' : `${s.bucket} days`, value: s.count }))} />
        </Panel>

        <Panel title="Leagues" note="Where learners sit this week">
          {data.leagues.length === 0 ? (
            <p className={h.empty}>No one in a league yet.</p>
          ) : (
            <Bars tone="var(--brand-purple)" rows={data.leagues.map((l) => ({ label: title(l.tier), value: l.count }))} />
          )}
        </Panel>
      </div>

      <div className={h.grid2}>
        <Panel title="What they came to learn" note="The track chosen during onboarding">
          <Bars tone="var(--color-brand)" rows={data.tracks.map((t) => ({ label: title(t.track), value: t.count }))} />
        </Panel>

        <Panel title="Most-learned courses" note={`By lessons finished, ${period}`} flush>
          {data.topCourses.length === 0 ? (
            <p className={h.empty}>No lessons finished in this period.</p>
          ) : (
            <ul className={h.list}>
              {data.topCourses.map((c, i) => (
                <li key={c.id}>
                  <Link href={`/admin/courses/${c.id}`} className={h.row}>
                    <span className={h.rowSide} style={{ width: 22, color: 'var(--text-muted)' }}>
                      {i + 1}
                    </span>
                    <span className={h.rowMain}>
                      <span className={h.rowTitle}>{c.title}</span>
                      <span className={h.rowMeta}>
                        {compact(c.learners)} learner{c.learners === 1 ? '' : 's'}
                      </span>
                    </span>
                    <span className={h.rowSide}>
                      <Flame size={14} aria-hidden="true" style={{ color: 'var(--warning)', verticalAlign: '-2px' }} /> {compact(c.lessons)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
