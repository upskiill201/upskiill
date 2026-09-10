'use client';

/**
 * Per-student detail sections: Overview / Courses & Lessons / Performance /
 * Journey & Feedback. Rendered from one cached StudentDetailPayload.
 */

import { CheckCircle2, Clock, Circle, CircleDashed } from 'lucide-react';
import {
  DeltaChip, ProgressBar, Stars, timeAgo,
} from '@/components/creator/analytics/bits';
import type { StudentDetailPayload } from './types';
import {
  HourHeatStrip, QuizSparkline, WeekdayBars, WhereTheyStoppedCallout, JourneyTimeline,
} from './bits';
import styles from './students.module.css';

const COURSE_STATUS_LABELS: Record<StudentDetailPayload['courses'][number]['status'], string> = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In progress',
  NEAR_DONE: 'Almost done',
  COMPLETED: 'Completed',
};

function CourseStatusChip({ status }: { status: StudentDetailPayload['courses'][number]['status'] }) {
  const cls =
    status === 'COMPLETED'
      ? styles.segPurple
      : status === 'NEAR_DONE'
        ? styles.segAmber
        : status === 'NOT_STARTED'
          ? styles.segGray
          : styles.segGreen;
  return <span className={`${styles.segChip} ${cls}`}>{COURSE_STATUS_LABELS[status]}</span>;
}

/* ─── OVERVIEW ────────────────────────────────────────────────────────── */

export function DetailOverviewSection({ data }: { data: StudentDetailPayload }) {
  const b = data.behavior;
  return (
    <div className={styles.root}>
      <div className={styles.totalsGrid}>
        <Tile label="Lessons completed" value={data.totals.lessonsCompleted} />
        <Tile label="Learning time" value={`${data.totals.learningTimeMinutes} min`} />
        <Tile label="Avg session" value={`${data.totals.avgSessionMinutes} min`} />
        <Tile label="Current streak" value={`${data.totals.currentStreakDays}d`} sub={`best ${data.totals.longestStreakDays}d`} />
        <Tile
          label="XP"
          value={data.totals.xpPlatform.toLocaleString()}
          sub="all of Teyro — context only"
        />
        <Tile
          label="Last activity"
          value={data.lastActivityAt ? timeAgo(data.lastActivityAt) : 'never'}
          sub={b.daysSinceLastActivity !== null ? `${b.daysSinceLastActivity}d ago` : undefined}
        />
      </div>

      <div className={styles.behaviorGrid}>
        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Learning rhythm</h3>
          <div className={styles.metricRows}>
            <Metric label="Lessons / week" value={String(b.lessonsPerWeek)} />
            <Metric label="Active days / week" value={String(b.activeDaysPerWeek)} />
            <Metric label="Consistency (28d)" value={`${b.consistencyPct}%`} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className={styles.metricRow}>
                <span className={styles.metricValue}>{b.paceChangePct > 0 ? '+' : ''}{b.paceChangePct}%</span>
                pace vs previous two weeks
              </span>
              <DeltaChip pct={b.paceTrend === 'FLAT' ? null : b.paceChangePct} caption={b.paceTrend.toLowerCase()} />
            </div>
          </div>
        </div>

        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Most active days</h3>
          <WeekdayBars data={b.weekdayHeat} />
        </div>

        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Typical study time</h3>
          <HourHeatStrip data={b.hourBuckets} />
          <p className={styles.hourNote}>Approximate windows, UTC — Teyro keeps learner timezones private.</p>
        </div>
      </div>

      <p className={styles.hourNote}>
        Goals &amp; interests appear here once learners share them during onboarding — Teyro never
        shows onboarding answers learners haven&apos;t opted into sharing.
      </p>
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className={styles.totalTile}>
      <span className={styles.totalLabel}>{label}</span>
      <span className={styles.totalValue}>{value}</span>
      {sub && <span className={styles.totalSub}>{sub}</span>}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metricRow}>
      <span className={styles.metricValue}>{value}</span>
      {label}
    </div>
  );
}

/* ─── COURSES & LESSONS ───────────────────────────────────────────────── */

export function DetailCoursesSection({ data }: { data: StudentDetailPayload }) {
  return (
    <div className={styles.root}>
      {data.courses.length === 0 && <p className={styles.emptyMini}>No course activity yet.</p>}
      {data.courses.map((c) => (
        <div key={c.courseId} className={styles.courseCard}>
          <div className={styles.courseHead}>
            <h3 className={styles.courseTitle}>{c.title}</h3>
            <CourseStatusChip status={c.status} />
          </div>
          <ProgressBar pct={c.progressPct} color={c.progressPct >= 100 ? '#ce82ff' : '#58cc02'} />
          <div className={styles.courseMeta}>
            {c.completedLessons}/{c.totalLessons} lessons · {c.timeSpentMinutes} min studied
            {c.avgQuizScore !== null && <> · avg quiz {c.avgQuizScore}%</>} · enrolled{' '}
            {timeAgo(c.enrolledAt)}
          </div>
          <WhereTheyStoppedCallout
            courseTitle={c.title}
            lessonTitle={c.stoppedAtLessonTitle}
            progressPct={c.progressPct}
          />
        </div>
      ))}

      <div className={styles.panelBox}>
        <h3 className={styles.panelTitle}>Lesson-level behavior</h3>
        <div className={styles.lessonTable}>
          {data.lessons.rows.map((l) => (
            <div
              key={l.lessonId}
              className={`${styles.lessonRow} ${l.completed ? styles.lessonRowDone : ''}`}
            >
              <span className={styles.lessonIdx}>{l.index + 1}</span>
              {l.completed ? (
                <CheckCircle2 size={16} color="#58cc02" />
              ) : l.started ? (
                <CircleDashed size={16} color="#ffc800" />
              ) : (
                <Circle size={16} color="#e5e5e5" />
              )}
              <span className={styles.lessonName}>{l.title}</span>
              <span className={styles.lessonMeta}>
                {l.struggleSpot && (
                  <span className={styles.struggleTag} title={(l.struggleWhy ?? []).join(' + ')}>
                    struggling
                  </span>
                )}
                {l.abandoned && (
                  <span className={styles.struggleTag} style={{ background: '#fff4cc', color: '#b45309' }}>
                    stalled
                  </span>
                )}
                {l.quizScore !== null && (
                  <span className={`${styles.scorePill} ${l.passed ? styles.scorePass : styles.scoreFail}`}>
                    {Math.round(l.quizScore)}%
                  </span>
                )}
                {l.attempts !== null && l.attempts > 1 && <span>{l.attempts} tries</span>}
                {l.timeSpentMinutes !== null && (
                  <span className={styles.statLine}>
                    <Clock size={11} /> {l.timeSpentMinutes}m
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        {data.lessons.truncated && (
          <p className={styles.truncNote}>
            Showing the first {data.lessons.rows.length} lessons across your courses.
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── PERFORMANCE ─────────────────────────────────────────────────────── */

export function DetailPerformanceSection({ data }: { data: StudentDetailPayload }) {
  const p = data.performance;
  if (p.quizTimeline.length === 0 && p.struggledLessons.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.panelBox}>
          <p className={styles.emptyMini}>
            No quizzes or scored exercises yet — performance appears once this learner completes
            activities in your courses.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {p.quizTimeline.length > 0 && (
        <div className={styles.panelBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h3 className={styles.panelTitle}>Quiz scores over time</h3>
            <DeltaChip pct={p.improvementTrendPct} caption="second half vs first half" invert />
          </div>
          <QuizSparkline points={p.quizTimeline} />
          <p className={styles.hourNote}>
            Latest: {p.quizTimeline[p.quizTimeline.length - 1].lessonTitle} ·{' '}
            {Math.round(p.quizTimeline[p.quizTimeline.length - 1].score)}%
          </p>
        </div>
      )}

      <div className={styles.twoCol}>
        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Performing well in</h3>
          {p.strongLessons.length === 0 ? (
            <p className={styles.emptyMini}>No cleared quizzes yet.</p>
          ) : (
            <div className={styles.listRows}>
              {p.strongLessons.map((s, i) => (
                <div key={i} className={styles.listRow}>
                  <span className={styles.listRowMain}>{s.title}</span>
                  <span className={`${styles.scorePill} ${styles.scorePass}`}>{s.score}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.panelBox}>
          <h3 className={styles.panelTitle}>Needs another look</h3>
          {p.struggledLessons.length === 0 ? (
            <p className={styles.emptyMini}>Nothing repeated or stalled — smooth sailing so far.</p>
          ) : (
            <div className={styles.listRows}>
              {p.struggledLessons.map((s, i) => (
                <div key={i} className={styles.listRow}>
                  <span className={styles.listRowMain}>{s.title}</span>
                  <span className={styles.listRowSide}>
                    {[s.attempts !== null && s.attempts > 1 ? `${s.attempts} tries` : null, s.minutes !== null ? `${s.minutes}m` : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── JOURNEY & FEEDBACK ──────────────────────────────────────────────── */

export function DetailJourneySection({ data }: { data: StudentDetailPayload }) {
  return (
    <div className={styles.root}>
      <div className={styles.panelBox}>
        <h3 className={styles.panelTitle}>Learner journey</h3>
        {data.journey.events.length === 0 ? (
          <p className={styles.emptyMini}>No activity recorded yet.</p>
        ) : (
          <>
            <JourneyTimeline events={[...data.journey.events].reverse()} />
            {data.journey.truncated && (
              <p className={styles.truncNote}>
                Showing the most recent {data.journey.events.length} milestones.
              </p>
            )}
          </>
        )}
      </div>

      <div className={styles.panelBox}>
        <h3 className={styles.panelTitle}>Their reviews of your courses</h3>
        {data.feedback.length === 0 ? (
          <p className={styles.emptyMini}>No reviews from this learner yet.</p>
        ) : (
          <div className={styles.listRows}>
            {data.feedback.map((f) => (
              <div key={f.reviewId} className={styles.courseCard} style={{ padding: '10px 0', border: 'none' }}>
                <div className={styles.rowLike} style={{ padding: 0 }}>
                  <Stars rating={f.rating} size={14} />
                  <span className={styles.courseRef}>{f.courseTitle}</span>
                  <span className={styles.journeyWhen}>{timeAgo(f.createdAt)}</span>
                </div>
                {f.comment && <p className={styles.reviewComment}>“{f.comment}”</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
