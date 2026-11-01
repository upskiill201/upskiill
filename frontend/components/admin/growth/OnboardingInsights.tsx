'use client';

/**
 * Teyro HQ — Onboarding. Who finishes onboarding, where the rest stop and
 * why: the funnel, every screen (reached, stopped, time spent), the reasons
 * people give when they quit, completion by how they heard about Teyro, their
 * goal, course and device, and each device's own journey.
 *
 * Cohorts: devices that STARTED in the range, followed through everything
 * they did since. Data: GET /admin/insights/onboarding (+ /journeys).
 */

import Link from 'next/link';
import { useState } from 'react';
import { Glyph } from '@/components/art/Glyph';
import { Pagination, TabGroup, useAdminData } from '@/components/admin/AdminUI';
import {
  Bars,
  Funnel,
  Hero,
  LoadError,
  Panel,
  RangeSwitch,
  SeriesChart,
  Skeleton,
  Tile,
  ago,
  compact,
  hq as h,
  type Range,
  type Stat,
} from '@/components/admin/hq/HQ';
import g from '@/components/admin/hq/growth.module.css';
import { answerLabel, quitLabel, stepLabel } from '@/lib/admin/growthLabels';

interface Segment {
  key: string;
  label: string;
  people: number;
  signedUp: number;
  completed: number;
  completionPct: number;
}

interface OnboardingInsights {
  range: Range;
  totals: {
    started: Stat;
    lessonStarted: number;
    lessonDone: number;
    signedUp: Stat;
    completed: Stat;
    resumed: number;
    wentPro: number;
    signupPct: number;
    completionPct: number;
    lessonFinishPct: number;
  };
  funnel: { key: string; label: string; count: number; pctOfSignups: number }[];
  screens: { step: string; index: number | null; reached: number; stopped: number; stoppedPct: number; medianSeconds: number | null; backs: number }[];
  quitReasons: { reason: string; count: number }[];
  quitSteps: { step: string; count: number }[];
  bySource: Segment[];
  byGoal: Segment[];
  byCourse: Segment[];
  byDevice: Segment[];
  signupMethods: { method: string; count: number }[];
  paths: { path: string; count: number }[];
  series: { day: string; started: number; completed: number }[];
}

interface Journeys {
  page: number;
  pageSize: number;
  total: number;
  rows: {
    anonymousId: string;
    userId: string | null;
    name: string | null;
    startedAt: string;
    lastSeenAt: string;
    lastStep: string | null;
    signedUp: boolean;
    completed: boolean;
    pro: boolean;
    device: string | null;
    course: string | null;
    quitReason: string | null;
    events: number;
  }[];
}

const FILTERS = ['all', 'completed', 'stopped', 'signed_up'] as const;
const FILTER_LABEL: Record<string, string> = { all: 'Everyone', completed: 'Finished', stopped: 'Stopped', signed_up: 'Signed up' };

/** Completion per segment: the people count first, the finish rate as the bar. */
function SegmentPanel({ title, note, rows, answers = true }: { title: string; note: string; rows: Segment[]; answers?: boolean }) {
  return (
    <Panel title={title} note={note}>
      {rows.length === 0 ? (
        <p className={h.empty}>Nobody yet.</p>
      ) : (
        <Bars
          tone="var(--success-green)"
          unit={(v) => `${v}%`}
          rows={rows.slice(0, 8).map((r) => ({
            label: `${answers && r.key ? answerLabel(r.label) : r.label} · ${compact(r.people)}`,
            value: r.completionPct,
          }))}
        />
      )}
    </Panel>
  );
}

export function OnboardingInsights() {
  const [range, setRange] = useState<Range>(30);
  const [filter, setFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useAdminData<OnboardingInsights>(`/api/admin/insights/onboarding?range=${range}`);
  const journeys = useAdminData<Journeys>(
    `/api/admin/insights/onboarding/journeys?page=${page}${filter === 'all' ? '' : `&status=${filter}`}`,
  );

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const t = data.totals;
  const period = `last ${range} days`;
  const worst = [...data.screens].filter((s) => s.reached >= 3).sort((a, b) => b.stoppedPct - a.stoppedPct).slice(0, 3);
  const hot = new Set(worst.filter((s) => s.stopped > 0).map((s) => s.step));
  const maxStopped = Math.max(1, ...data.screens.map((s) => s.stoppedPct));

  return (
    <div className={h.page}>
      <Hero
        pose="pointing"
        title="Onboarding"
        sub={`${compact(t.started.value)} people opened onboarding in the ${period}. Who finishes, where the rest stop, and why.`}
        right={<RangeSwitch value={range} onChange={setRange} />}
      />

      <div className={h.tiles}>
        <Tile icon={<Glyph name="funnel" size={19} />} tone="var(--color-brand)" label="Started onboarding" value={compact(t.started.value)} stat={t.started} />
        <Tile
          icon={<Glyph name="userCheck" size={19} />}
          tone="var(--brand-purple)"
          label="Saved progress"
          value={compact(t.signedUp.value)}
          stat={t.signedUp}
          foot={<>{t.signupPct}% signed up</>}
        />
        <Tile
          icon={<Glyph name="check" size={19} />}
          tone="var(--success-green)"
          label="Finished onboarding"
          value={compact(t.completed.value)}
          stat={t.completed}
          foot={<>{t.completionPct}% of starters</>}
        />
        <Tile
          icon={<Glyph name="crown" size={19} />}
          tone="var(--warning)"
          label="Started Pro there"
          value={compact(t.wentPro)}
          foot={t.started.value ? <>{Math.round((t.wentPro / t.started.value) * 1000) / 10}% of starters</> : 'No one yet'}
        />
      </div>

      <SeriesChart
        title={`Every day, ${period}`}
        tabs={[
          { key: 'started', label: 'Started', tone: 'var(--color-brand)', unit: (v) => `${compact(v)} started`, points: data.series.map((p) => ({ day: p.day, value: p.started })) },
          { key: 'completed', label: 'Finished', tone: 'var(--success-green)', unit: (v) => `${compact(v)} finished`, points: data.series.map((p) => ({ day: p.day, value: p.completed })) },
        ]}
      />

      <div className={h.grid2}>
        <Panel title="How far people get" note={`Devices that started in the ${period}, followed through everything since`}>
          <Funnel steps={data.funnel} />
        </Panel>

        <Panel title="The first lesson" note="The taste of lesson 1, or the placement test">
          <div className={h.bigNums}>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--color-brand)' }}>{compact(t.lessonStarted)}</strong>
              <span>Started it</span>
              <em>of {compact(t.started.value)} starters</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--success-green)' }}>{t.lessonFinishPct}%</strong>
              <span>Finished it</span>
              <em>{compact(t.lessonDone)} people</em>
            </span>
            <span className={h.bigNum}>
              <strong style={{ color: 'var(--brand-purple)' }}>{compact(t.resumed)}</strong>
              <span>Came back</span>
              <em>resumed later</em>
            </span>
          </div>
          <p className={h.note}>
            {data.paths.length > 0
              ? `Paths chosen: ${data.paths.map((p) => `${answerLabel(p.path)} ${p.count}`).join(' · ')}. `
              : ''}
            {data.signupMethods.length > 0
              ? `Signed up with ${data.signupMethods.map((m) => `${answerLabel(m.method)} ${m.count}`).join(' · ')}.`
              : 'No signups yet.'}
          </p>
        </Panel>
      </div>

      <Panel
        title="Screen by screen"
        note="Reached: people who saw the screen. Stopped: their last screen and they never finished (this includes anyone still on it right now). The three worst are tinted."
      >
        {data.screens.length === 0 ? (
          <p className={h.empty}>No one has started onboarding in this period.</p>
        ) : (
          <div className={g.scroll}>
            <table className={g.table}>
              <thead>
                <tr>
                  <th>Screen</th>
                  <th className={g.num}>Reached</th>
                  <th>Stopped here</th>
                  <th className={g.num}>Median time</th>
                  <th className={g.num}>Went back</th>
                </tr>
              </thead>
              <tbody>
                {data.screens.map((s) => (
                  <tr key={s.step} className={hot.has(s.step) ? g.hot : undefined}>
                    <td>{stepLabel(s.step)}</td>
                    <td className={g.num}>{compact(s.reached)}</td>
                    <td>
                      {s.stopped > 0 ? (
                        <>
                          <span className={g.stopBar} style={{ width: `${Math.max(4, (s.stoppedPct / maxStopped) * 80)}px` }} aria-hidden="true" />
                          {compact(s.stopped)} <span className={g.muted}>({s.stoppedPct}%)</span>
                        </>
                      ) : (
                        <span className={g.muted}>None</span>
                      )}
                    </td>
                    <td className={g.num}>{s.medianSeconds === null ? <span className={g.muted}>–</span> : `${s.medianSeconds}s`}</td>
                    <td className={g.num}>{s.backs > 0 ? compact(s.backs) : <span className={g.muted}>–</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <div className={h.grid2}>
        <Panel title="Why they quit" note="The one-tap answer on Tey's 'wait, don't go' sheet">
          {data.quitReasons.length === 0 ? (
            <p className={h.empty}>No one has quit from the sheet in this period.</p>
          ) : (
            <Bars tone="var(--error-red)" rows={data.quitReasons.map((r) => ({ label: quitLabel(r.reason), value: r.count }))} />
          )}
        </Panel>
        <Panel title="Where they quit" note="The screen they were on when they left from the sheet">
          {data.quitSteps.length === 0 ? (
            <p className={h.empty}>Nothing to show yet.</p>
          ) : (
            <Bars tone="var(--warning)" rows={data.quitSteps.map((r) => ({ label: stepLabel(r.step), value: r.count }))} />
          )}
        </Panel>
      </div>

      <div className={h.grid2}>
        <SegmentPanel title="Finish rate by how they heard" note="Share who finished onboarding · people" rows={data.bySource} />
        <SegmentPanel title="Finish rate by goal" note="Share who finished onboarding · people" rows={data.byGoal} />
      </div>
      <div className={h.grid2}>
        <SegmentPanel title="Finish rate by course" note="The course picked first · people" rows={data.byCourse} answers={false} />
        <SegmentPanel title="Finish rate by device" note="Share who finished onboarding · people" rows={data.byDevice} />
      </div>

      <Panel
        title="Each person's journey"
        note="One row per device, newest activity first. Open one to see every screen, answer and quit."
        action={
          <div className={g.filters}>
            <TabGroup
              options={[...FILTERS]}
              value={filter}
              onChange={(v) => {
                setFilter(v);
                setPage(1);
              }}
              formatLabel={(v) => FILTER_LABEL[v] ?? v}
            />
          </div>
        }
        flush
      >
        {!journeys.data ? (
          journeys.error ? (
            <p className={h.empty}>Couldn&apos;t load journeys. Try again in a moment.</p>
          ) : (
            <p className={h.empty}>Loading…</p>
          )
        ) : journeys.data.rows.length === 0 ? (
          <p className={h.empty}>No one here yet.</p>
        ) : (
          <>
            <ul className={h.list}>
              {journeys.data.rows.map((r) => (
                <li key={r.anonymousId}>
                  <Link href={`/admin/onboarding/${r.anonymousId}`} className={h.row}>
                    <span className={h.rowMain}>
                      <span className={h.rowTitle}>{r.name ?? 'Not signed up'}</span>
                      <span className={h.rowMeta}>
                        {r.course ?? 'No course yet'} · {r.device ? answerLabel(r.device) : 'unknown device'} · started {ago(r.startedAt)}
                        {r.quitReason ? ` · quit: ${quitLabel(r.quitReason)}` : ''}
                      </span>
                    </span>
                    <span className={h.rowSide} style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {r.completed ? (
                        <span className={`${g.pill} ${g.good}`}>Finished</span>
                      ) : (
                        <span className={`${g.pill} ${g.warn}`}>Last: {stepLabel(r.lastStep)}</span>
                      )}
                      {r.signedUp && !r.completed && <span className={`${g.pill} ${g.brand}`}>Signed up</span>}
                      {r.pro && <span className={`${g.pill} ${g.brand}`}>Pro</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ padding: '12px 20px' }}>
              <Pagination page={journeys.data.page} pageSize={journeys.data.pageSize} total={journeys.data.total} onPageChange={setPage} />
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}
