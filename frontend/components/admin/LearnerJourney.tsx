'use client';

/**
 * LearnerJourney — Teyro HQ's answer to "why hasn't this person started?".
 *
 * One learner, end to end: what they told onboarding, whether Teyro can reach
 * them at all (push devices, email opt-outs), every course and lesson they
 * touched (opened, where they quit, finished), and every nudge and email:
 * sent, blocked with the reason, or still scheduled.
 */

import { useState } from 'react';
import { mutate } from 'swr';
import { BellRing, BookOpen, Compass, Mail, Radio, Send } from 'lucide-react';
import {
  Button,
  Card,
  DataTable,
  Empty,
  Pill,
  adminMutate,
  adminStyles as s,
  humanize,
  relativeTime,
} from '@/components/admin/AdminUI';

export interface LearnerJourneyData {
  onboarding: {
    complete: boolean;
    completedAt: string | null;
    reachedStep: number | null;
    skipped: boolean;
    track: string | null;
    goals: string[] | null;
    experience: string | null;
    dailyMinutes: string | null;
    preferredTime: string | null;
    barriers: string[] | null;
    notifications: unknown;
  };
  reach: {
    pushDevices: number;
    devices: {
      platform: string | null;
      isActive: boolean;
      createdAt: string;
      lastUsedAt: string | null;
      failureCount: number;
      device: string;
    }[];
    installed?: boolean;
    installedAt?: string | null;
    appLastOpenedAt?: string | null;
    permission?: string | null;
    askRequestedAt?: string | null;
    askShownAt?: string | null;
    pushEnabled: boolean;
    dailyReminders: boolean;
    preferredHour: number | null;
    emailOptOuts: string[];
  };
  courses: {
    id: string;
    title: string;
    enrolledAt: string;
    progress: number;
    lessonsDone: number;
    totalLessons: number;
    firstLesson: string | null;
    stage: 'NOT_STARTED' | 'OPENED_NOT_FINISHED' | 'LEARNING';
    lessons: {
      number: number;
      title: string;
      openCount?: number;
      quitCount?: number;
      lastStepId?: string | null;
      progressPercentage?: number;
      completedAt?: string | null;
    }[];
  }[];
  nudges: {
    ruleId: string;
    channel: string;
    status: string;
    skipReason: string | null;
    title: string;
    body: string;
    sentAt: string;
    openedAt: string | null;
  }[];
  emails: {
    templateKey: string;
    status: string;
    skipReason: string | null;
    createdAt: string;
    sentAt: string | null;
    openedAt: string | null;
    clickedAt: string | null;
  }[];
  upcoming: { kind: 'EMAIL' | 'PUSH'; key: string; dueAt: string }[];
}

const STAGE: Record<LearnerJourneyData['courses'][number]['stage'], { label: string; tone: 'bad' | 'warn' | 'good' }> = {
  NOT_STARTED: { label: 'Enrolled, never opened lesson 1', tone: 'bad' },
  OPENED_NOT_FINISHED: { label: 'Opened, not finished', tone: 'warn' },
  LEARNING: { label: 'Learning', tone: 'good' },
};

/** Plain-English reasons a nudge didn't reach a phone. */
const WHY: Record<string, string> = {
  NO_SUBSCRIPTION: 'No push on any device',
  PUSH_OPTED_OUT: 'Turned push off',
  QUIET_HOURS: 'Quiet hours',
  DAILY_CAP: 'Daily limit reached',
  MIN_GAP: 'Too soon after another',
  RULE_COOLDOWN: 'Cooling down',
  KIND_THROTTLED: 'Too soon after another',
  DRY_RUN: 'Delivery switched off (dry run)',
  GLOBALLY_DISABLED: 'Push switched off globally',
  PUSH_FAILED: 'Push service error',
  STARTED: 'Already started',
  LEARNING_ELSEWHERE: 'Busy learning elsewhere',
  UNSUBSCRIBED: 'Unsubscribed from these emails',
};
const why = (r: string | null) => (r ? (WHY[r] ?? (r.startsWith('CATEGORY_OPTED_OUT') ? 'Turned this kind off' : humanize(r))) : '—');

/** "in 3h" / "5m ago" — relativeTime only speaks the past. */
function when(iso: string): string {
  const diff = Date.parse(iso) - Date.now();
  if (diff <= 0) return relativeTime(iso);
  const m = Math.round(diff / 60_000);
  if (m < 60) return `in ${m}m`;
  const h = Math.round(m / 60);
  return h < 48 ? `in ${h}h` : `in ${Math.round(h / 24)}d`;
}

/** learn:3:8 → "Learn card 3 of 8"; apply:<id> → "Questions". */
function where(step: string | null | undefined): string {
  if (!step) return '—';
  const learn = /^learn:(\d+):(\d+)$/.exec(step);
  if (learn) return `Learn card ${learn[1]} of ${learn[2]}`;
  if (step.startsWith('apply')) return 'Questions';
  return humanize(step);
}

const list = (v: unknown) => (Array.isArray(v) && v.length ? v.map((x) => humanize(String(x))).join(', ') : '—');

export function LearnerJourney({ journey, userId }: { journey: LearnerJourneyData; userId: string }) {
  const { onboarding: ob, reach, courses, nudges, emails, upcoming } = journey;
  const reachable = reach.pushDevices > 0 && reach.pushEnabled;
  const ready = reachable && !!reach.installed;
  const [asking, setAsking] = useState(false);
  const [asked, setAsked] = useState<string | null>(null);
  const ask = async () => {
    setAsking(true);
    try {
      await adminMutate('/api/tey/admin/reach/ask', { body: { userIds: [userId] } });
      setAsked('Asked. They’ll see the install + reminders screen on their next app open, plus an email or push now.');
      await mutate(`/api/admin/users/${userId}`);
    } catch (e) {
      setAsked((e as Error).message);
    } finally {
      setAsking(false);
    }
  };

  return (
    <>
      <div className={s.grid}>
        <Card title="Onboarding" icon={<Compass size={15} />}>
          <div className={s.bars}>
            <Row
              label="Status"
              value={
                ob.skipped ? (
                  <Pill tone="warn">Skipped (enrolled from a course page)</Pill>
                ) : ob.complete ? (
                  <Pill tone="good">Finished {relativeTime(ob.completedAt)}</Pill>
                ) : (
                  <Pill tone="warn">Stopped at step {ob.reachedStep ?? '?'}</Pill>
                )
              }
            />
            <Row label="Track" value={ob.track ? humanize(ob.track) : '—'} />
            <Row label="Goals" value={list(ob.goals)} />
            <Row label="Experience" value={ob.experience ? humanize(ob.experience) : '—'} />
            <Row label="Minutes a day" value={ob.dailyMinutes ?? '—'} />
            <Row label="Best time" value={ob.preferredTime ? humanize(ob.preferredTime) : '—'} />
            <Row label="What gets in the way" value={list(ob.barriers)} />
          </div>
        </Card>

        <Card title="Can we reach them?" icon={<Radio size={15} />}>
          <div className={s.bars}>
            <Row
              label="Push"
              value={
                reachable ? (
                  <Pill tone="good">On, {reach.pushDevices} device{reach.pushDevices === 1 ? '' : 's'}</Pill>
                ) : (
                  <Pill tone="bad">{reach.pushEnabled ? 'Never turned on' : 'Turned off'}</Pill>
                )
              }
            />
            <Row
              label="App installed"
              value={
                reach.installed ? (
                  <Pill tone="good">Yes{reach.installedAt ? `, ${relativeTime(reach.installedAt)}` : ''}</Pill>
                ) : (
                  <Pill tone="bad">Not installed</Pill>
                )
              }
            />
            <Row
              label="Browser said"
              value={
                reach.permission === 'denied'
                  ? 'Blocked notifications'
                  : reach.permission === 'granted'
                    ? 'Allowed notifications'
                    : reach.permission
                      ? 'Not asked yet'
                      : 'Unknown (hasn’t opened the app since this shipped)'
              }
            />
            {reach.devices.map((d, i) => (
              <Row
                key={i}
                label={`Device ${i + 1}`}
                value={`${d.device}${d.isActive ? '' : ' (dead)'} · last delivered ${d.lastUsedAt ? relativeTime(d.lastUsedAt) : 'never'}${d.failureCount ? ` · ${d.failureCount} failures` : ''}`}
              />
            ))}
            {reach.devices.length === 0 && <Row label="Devices" value="None" />}
            <Row label="Daily reminders" value={reach.dailyReminders ? 'On' : 'Off'} />
            <Row label="Reminder hour" value={reach.preferredHour !== null ? `${reach.preferredHour}:00` : 'Learned from habit'} />
            <Row
              label="Email opt-outs"
              value={reach.emailOptOuts.length ? reach.emailOptOuts.map(humanize).join(', ') : 'None, all emails on'}
            />
            {reach.askRequestedAt && (
              <Row
                label="Last HQ ask"
                value={`${relativeTime(reach.askRequestedAt)}${reach.askShownAt && reach.askShownAt >= reach.askRequestedAt ? ', seen' : ', not seen yet'}`}
              />
            )}
            {!ready && (
              <div style={{ marginTop: 8 }}>
                <Button size="sm" disabled={asking} onClick={() => void ask()}>
                  <Send size={14} /> Ask to install + turn on reminders
                </Button>
                {asked && <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '6px 0 0' }}>{asked}</p>}
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card title="Courses and lessons" icon={<BookOpen size={15} />}>
        {courses.length === 0 ? (
          <Empty>Not enrolled in any course.</Empty>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {courses.map((c) => (
              <div key={c.id}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>{c.title}</strong>
                  <Pill tone={STAGE[c.stage].tone}>{STAGE[c.stage].label}</Pill>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Enrolled {relativeTime(c.enrolledAt)} · {c.lessonsDone}/{c.totalLessons} lessons
                    {c.firstLesson ? ` · Lesson 1: ${c.firstLesson}` : ''}
                  </span>
                </div>
                {c.lessons.length === 0 ? (
                  <Empty>No lesson opened yet.</Empty>
                ) : (
                  <DataTable columns={['Lesson', 'Opened', 'Quit', 'Stopped at', 'Got to', 'Finished']}>
                    {c.lessons.map((l) => (
                      <tr key={l.number}>
                        <td>
                          {l.number}. {l.title}
                        </td>
                        <td className={s.mono}>{l.openCount ?? 0}×</td>
                        <td className={s.mono}>{l.quitCount ?? 0}×</td>
                        <td>{l.completedAt ? '—' : where(l.lastStepId)}</td>
                        <td className={s.mono}>{l.completedAt ? '100%' : `${Math.round(l.progressPercentage ?? 0)}%`}</td>
                        <td>{l.completedAt ? relativeTime(l.completedAt) : <Pill tone="warn">No</Pill>}</td>
                      </tr>
                    ))}
                  </DataTable>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {upcoming.length > 0 && (
        <Card title="Scheduled next">
          <DataTable columns={['When', 'Channel', 'What']}>
            {upcoming.map((u, i) => (
              <tr key={i}>
                <td className={s.mono} title={u.dueAt}>
                  {when(u.dueAt)}
                </td>
                <td>{u.kind === 'EMAIL' ? 'Email' : 'Push + bell'}</td>
                <td>{humanize(u.key)}</td>
              </tr>
            ))}
          </DataTable>
        </Card>
      )}

      <div className={s.grid}>
        <Card title="Nudges (push + bell)" icon={<BellRing size={15} />}>
          {nudges.length === 0 ? (
            <Empty>Tey hasn&apos;t tried to reach this learner yet.</Empty>
          ) : (
            <DataTable columns={['When', 'Nudge', 'Result', 'Why']}>
              {nudges.map((n, i) => (
                <tr key={i}>
                  <td className={s.mono} title={n.sentAt}>
                    {relativeTime(n.sentAt)}
                  </td>
                  <td title={n.body}>
                    {humanize(n.ruleId)}
                    {n.title ? <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{n.title}</div> : null}
                  </td>
                  <td>
                    <Pill tone={n.status === 'SENT' ? (n.openedAt ? 'good' : 'brand') : 'bad'}>
                      {n.status === 'SENT' ? (n.openedAt ? 'Opened' : 'Delivered') : humanize(n.status)}
                    </Pill>
                  </td>
                  <td>{n.status === 'SENT' ? '—' : why(n.skipReason)}</td>
                </tr>
              ))}
            </DataTable>
          )}
        </Card>

        <Card title="Emails" icon={<Mail size={15} />}>
          {emails.length === 0 ? (
            <Empty>No emails yet.</Empty>
          ) : (
            <DataTable columns={['When', 'Email', 'Result']}>
              {emails.map((e, i) => (
                <tr key={i}>
                  <td className={s.mono} title={e.createdAt}>
                    {relativeTime(e.sentAt ?? e.createdAt)}
                  </td>
                  <td>{humanize(e.templateKey.replace(/\./g, '_'))}</td>
                  <td>
                    <Pill tone={e.clickedAt ? 'good' : e.openedAt ? 'brand' : e.status === 'SENT' ? 'neutral' : 'bad'}>
                      {e.clickedAt ? 'Clicked' : e.openedAt ? 'Opened' : e.status === 'SENT' ? 'Sent' : `${humanize(e.status)}: ${why(e.skipReason)}`}
                    </Pill>
                  </td>
                </tr>
              ))}
            </DataTable>
          )}
        </Card>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>{value}</span>
    </div>
  );
}
