'use client';

/**
 * One lesson up close: how many opened and finished it, where the ones who
 * left stopped (Learn card, exercise, Reflect), which exercises learners miss
 * on the first try (with a jump straight to that exercise in the builder),
 * who is stuck on it right now (nudge them), and what learners asked about it.
 */

import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  DoorOpen,
  MessageCircle,
  PencilLine,
  Target,
  Trophy,
} from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  ago,
  EXERCISE_KIND_LABEL,
  studioFetch,
  studioKeys,
  type Face,
  type LessonInsight,
} from '@/lib/creator/studio';
import { BarList } from '../Charts';
import { NudgeSheet } from '../NudgeSheet';
import {
  Bar,
  EmptyCard,
  ErrorCard,
  PageHead,
  PersonAvatar,
  Pill,
  Section,
  Skel,
  StatTile,
  TeyLine,
  studio as s,
} from '../StudioParts';

const NUDGE_COOLDOWN_MS = 72 * 3600_000;

function summary(d: LessonInsight): string {
  const worst = [...d.exercises].filter((e) => e.missRatePct !== null).sort((a, b) => (b.missRatePct ?? 0) - (a.missRatePct ?? 0))[0];
  const topStop = [...d.stops].sort((a, b) => b.count - a.count)[0];
  if (d.funnel.opened === 0) return 'Nobody has opened this lesson yet. Check back once learners reach it.';
  const parts: string[] = [];
  if (d.funnel.stuckNow > 0) {
    parts.push(
      `${d.funnel.stuckNow} ${d.funnel.stuckNow === 1 ? 'learner opened this and hasn’t' : 'learners opened this and haven’t'} finished${topStop ? `. Most stop at ${topStop.label}` : ''}.`,
    );
  }
  if (worst && (worst.missRatePct ?? 0) >= 40 && worst.attempts >= 3) {
    parts.push(`Exercise ${worst.number} is missed first time by ${worst.missRatePct}%. Check its wording or add a hint.`);
  }
  if (d.timing.medianMinutes && d.timing.estMinutes && d.timing.medianMinutes > d.timing.estMinutes * 2) {
    parts.push(`It takes about ${Math.round(d.timing.medianMinutes)} min, twice what you planned.`);
  }
  return parts.length ? parts.join(' ') : 'This lesson is working well. Learners get through it and get it right.';
}

export function LessonInsightView({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  useStandaloneSound();
  const { data, error, isLoading, mutate } = useSWR<LessonInsight>(studioKeys.lesson(courseId, lessonId), studioFetch);
  const [nudge, setNudge] = useState<{ ids: string[]; faces: Face[] } | null>(null);
  // When the page opened: what "nudged recently" is measured from.
  const [now] = useState(() => Date.now());
  const backHref = `/creator/analytics?course=${courseId}`;
  const builderHref = (q = '') => `/creator/courses/${courseId}/lesson-builder/${lessonId}${q}`;

  if (error) {
    return (
      <div className={s.page}>
        <Link href={backHref} className={s.back}>
          <ArrowLeft size={16} aria-hidden="true" /> Analytics
        </Link>
        <ErrorCard message={error.message || 'This lesson’s insights didn’t load.'} onRetry={() => void mutate()} />
      </div>
    );
  }
  if (isLoading || !data) {
    return (
      <div className={s.page} aria-busy="true">
        <Skel h={20} w={120} />
        <Skel h={64} w="70%" />
        <Skel h={96} />
        <div className={s.stats}>
          {[0, 1, 2, 3].map((i) => (
            <Skel key={i} h={112} r={18} />
          ))}
        </div>
        <Skel h={220} />
      </div>
    );
  }

  const { lesson, funnel, timing, accuracy } = data;
  const nudgeable = data.stuck.filter((l) => !l.lastNudgedAt || now - Date.parse(l.lastNudgedAt) > NUDGE_COOLDOWN_MS);

  return (
    <div className={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <Link href={backHref} className={s.back}>
          <ArrowLeft size={16} aria-hidden="true" /> {data.course.title}
        </Link>
        <span style={{ display: 'flex', gap: 8 }}>
          {lesson.prev && (
            <Link
              href={`/creator/analytics/${courseId}/lessons/${lesson.prev.id}`}
              className={s.iconBtn}
              aria-label={`Previous lesson: ${lesson.prev.title}`}
              onClick={() => playSound('cardBack')}
            >
              <ChevronLeft size={18} />
            </Link>
          )}
          {lesson.next && (
            <Link
              href={`/creator/analytics/${courseId}/lessons/${lesson.next.id}`}
              className={s.iconBtn}
              aria-label={`Next lesson: ${lesson.next.title}`}
              onClick={() => playSound('cardNext')}
            >
              <ChevronRight size={18} />
            </Link>
          )}
        </span>
      </div>

      <PageHead
        title={lesson.title}
        sub={
          <>
            Lesson {lesson.index + 1} of {lesson.total} · {lesson.unitTitle}
            {lesson.isFree && (
              <>
                {' '}
                <Pill tone="var(--success-green)">Free</Pill>
              </>
            )}
          </>
        }
        actions={
          <Link href={builderHref()} className={s.btn}>
            <PencilLine size={16} aria-hidden="true" /> Edit lesson
          </Link>
        }
      />

      <TeyLine pose={funnel.stuckNow > 0 ? 'thinking' : 'cheering'}>{summary(data)}</TeyLine>

      <div className={s.stats}>
        <StatTile
          icon={<DoorOpen size={18} />}
          label="Opened"
          value={funnel.opened}
          foot={`${funnel.reached} reached it${funnel.reopens > 0 ? ` · ${funnel.reopens} came back` : ''}`}
        />
        <StatTile
          icon={<Trophy size={18} />}
          tone="var(--success-green)"
          label="Finished"
          value={funnel.finished}
          foot={funnel.finishRatePct !== null ? `${funnel.finishRatePct}% of those who opened it` : '—'}
        />
        <StatTile
          icon={<Clock size={18} />}
          tone="var(--brand-purple)"
          label="Time to finish"
          value={timing.medianMinutes !== null ? `${Math.round(timing.medianMinutes)} min` : '—'}
          foot={timing.estMinutes ? `You planned ${timing.estMinutes} min` : timing.samples > 0 ? `Median of ${timing.samples}` : 'No finishes yet'}
        />
        <StatTile
          icon={<Target size={18} />}
          tone="var(--warning)"
          label="First-try right"
          value={accuracy.avgPct !== null ? `${accuracy.avgPct}%` : '—'}
          foot={accuracy.perfectPct !== null ? `${accuracy.perfectPct}% got every exercise first time` : 'No exercises answered yet'}
        />
      </div>

      <div className={s.grid2}>
        <Section title="Where they stop" note="Learners who left part-way and haven’t finished yet, by the step they left on.">
          {data.stops.length === 0 ? (
            <div className={s.empty}>Nobody has left this lesson part-way.</div>
          ) : (
            <div className={s.card}>
              <BarList
                caption="Where unfinished learners stopped"
                rows={data.stops.map((x) => ({
                  key: x.key,
                  label: x.label,
                  value: x.count,
                  tone: x.phase === 'apply' ? 'var(--warning)' : 'var(--color-brand)',
                }))}
              />
            </div>
          )}
        </Section>

        <Section title="Stuck here now" side={nudgeable.length > 1 && (
          <button
            type="button"
            className={`${s.btnPrimary} ${s.btnSm}`}
            onClick={() => setNudge({ ids: nudgeable.map((l) => l.id), faces: nudgeable.slice(0, 5) })}
          >
            Nudge all {nudgeable.length}
          </button>
        )}>
          {data.stuck.length === 0 ? (
            <div className={s.empty}>Nobody is stuck on this lesson.</div>
          ) : (
            <div className={s.list}>
              {data.stuck.slice(0, 12).map((l) => {
                const recent = l.lastNudgedAt && now - Date.parse(l.lastNudgedAt) < NUDGE_COOLDOWN_MS;
                return (
                  <div key={l.id} className={s.row}>
                    <PersonAvatar face={l} size={40} />
                    <Link href={`/creator/students/${l.id}`} className={s.rowMain} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <span className={s.rowTitle}>{l.fullName}</span>
                      <span className={s.rowMeta}>
                        <span>Opened {ago(l.openedAt)}</span>
                        {l.stoppedAt && <span>Left at {l.stoppedAt}</span>}
                        {l.opens > 1 && <span>{l.opens} tries</span>}
                      </span>
                    </Link>
                    {recent ? (
                      <span className={s.hint}>Nudged {ago(l.lastNudgedAt)}</span>
                    ) : (
                      <button
                        type="button"
                        className={`${s.btn} ${s.btnSm}`}
                        onClick={() => setNudge({ ids: [l.id], faces: [l] })}
                      >
                        Nudge
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </div>

      <Section
        title="Exercises"
        note={
          accuracy.samples > 0
            ? `How often each exercise is missed on the first try, from ${accuracy.samples} ${accuracy.samples === 1 ? 'learner' : 'learners'}.`
            : 'Miss rates appear once learners finish this lesson.'
        }
      >
        {data.exercises.length === 0 ? (
          <EmptyCard
            pose="pointing"
            title="No exercises in this lesson"
            action={
              <Link href={builderHref('?phase=apply')} className={s.btnPrimary}>
                Add exercises
              </Link>
            }
          >
            Practice is where learning sticks. Add a few to the Apply step.
          </EmptyCard>
        ) : (
          <div className={s.list}>
            {data.exercises.map((e) => {
              const miss = e.missRatePct;
              const tone = miss === null ? undefined : miss >= 50 ? 'var(--error-red)' : miss >= 30 ? 'var(--warning)' : 'var(--success-green)';
              return (
                <div key={e.id} className={`${s.row} ${s.rowWrap}`}>
                  <span className={s.statIcon} style={{ width: 36, height: 36, fontWeight: 800 }} aria-hidden="true">
                    {e.number}
                  </span>
                  <span className={s.rowMain}>
                    <span className={s.rowTitle} style={{ whiteSpace: 'normal' }}>
                      {e.prompt || 'Untitled exercise'}
                    </span>
                    <span className={s.rowMeta}>
                      <span>{EXERCISE_KIND_LABEL[e.kind] ?? e.kind}</span>
                      {miss !== null && (
                        <span style={{ color: tone, fontWeight: 800 }}>
                          {miss}% missed first time
                        </span>
                      )}
                    </span>
                    {miss !== null && <Bar pct={miss} tone={tone} label={`Exercise ${e.number} first-try miss rate`} />}
                  </span>
                  <span className={s.rowSide}>
                    <Link href={builderHref(`?phase=apply&block=${encodeURIComponent(e.id)}`)} className={`${s.btn} ${s.btnSm}`}>
                      <PencilLine size={14} aria-hidden="true" /> {miss !== null && miss >= 40 ? 'Fix' : 'Edit'}
                    </Link>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <Section title="Questions about this lesson" note="Posts learners linked to this lesson in your community.">
        {data.questions.length === 0 ? (
          <div className={s.empty}>No posts about this lesson yet.</div>
        ) : (
          <div className={s.list}>
            {data.questions.map((q) => (
              <Link
                key={q.id}
                href={`/creator/community?course=${courseId}&post=${q.id}`}
                className={`${s.row} ${s.rowWrap}`}
              >
                <PersonAvatar face={q.author} size={36} />
                <span className={s.rowMain}>
                  <span className={s.rowTitle}>{q.title || q.excerpt}</span>
                  <span className={s.rowMeta}>
                    <span>{q.author.fullName}</span>
                    <span>{ago(q.createdAt)}</span>
                    <span>
                      <MessageCircle size={13} aria-hidden="true" /> {q.commentCount}
                    </span>
                  </span>
                </span>
                <span className={s.rowSide}>
                  {q.answeredByYou ? (
                    <Pill tone="var(--success-green)">Answered</Pill>
                  ) : (
                    <Pill tone="var(--error-red)">Needs you</Pill>
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      {nudge && (
        <NudgeSheet
          open
          kind="NUDGE"
          courseId={courseId}
          courseTitle={data.course.title}
          learnerIds={nudge.ids}
          faces={nudge.faces}
          onClose={() => setNudge(null)}
          onSent={() => void mutate()}
        />
      )}
    </div>
  );
}
