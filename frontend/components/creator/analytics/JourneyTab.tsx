'use client';

import { motion } from 'framer-motion';
import {
  Users, Play, BookOpen, Lock, Crown, AlertTriangle,
} from 'lucide-react';
import { ProgressBar } from './bits';
import styles from './tabs.module.css';

interface Stage {
  key: string;
  label: string;
  count: number;
  icon: string;
  conversionFromPrev?: number;
}

interface Milestone {
  key: string;
  label: string;
  count: number;
  lost: number;
  conversionFromPrev?: number;
}

interface RetentionLesson {
  id: string;
  index: number;
  title: string;
  sectionTitle: string;
  reached: number;
  completed: number;
  leak: number;
}

interface JourneyData {
  stages: Stage[];
  paywallLost: number;
  subscribedTotal: number;
  retention: RetentionLesson[];
  milestones?: Milestone[];
  biggestDropoff?: { label: string; lost: number; lostPct: number } | null;
}

const STAGE_ICONS: Record<string, { icon: React.ReactNode; cls: string }> = {
  ENROLLED: { icon: <Users size={22} />, cls: styles.stageBlue },
  STARTED: { icon: <Play size={20} />, cls: styles.stageGreen },
  FINISHED_PREVIEW: { icon: <BookOpen size={20} />, cls: styles.stageGreen },
  HIT_PAYWALL: { icon: <Lock size={20} />, cls: styles.stageAmber },
  SUBSCRIBED_FROM_PAYWALL: { icon: <Crown size={20} />, cls: styles.stageGold },
};

export function JourneyTab({ data }: { data: JourneyData }) {
  const worstLeak = Math.max(0, ...data.retention.map((r) => r.leak));

  return (
    <div className={styles.journeyRoot}>
      {/* ── FUNNEL STAGES ── */}
      <h3 className={styles.sectionHeading}>The Learner Journey</h3>
      <p className={styles.sectionSub}>
        How students move from enrolling to subscribing — and where they stop.
      </p>

      <div className={styles.funnelStack}>
        {data.stages.map((stage, i) => {
          const meta = STAGE_ICONS[stage.key] ?? STAGE_ICONS.ENROLLED;
          const nextCount = i < data.stages.length - 1 ? data.stages[i + 1].count : null;
          return (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className={`${styles.stageRow} ${meta.cls}`}>
                <div className={styles.stageIconCircle}>{meta.icon}</div>
                <span className={styles.stageLabel}>{stage.label}</span>
                <span className={styles.stageCount}>{stage.count.toLocaleString()}</span>
              </div>

              {/* Connector between this stage and the next */}
              {nextCount !== null && (
                <div className={styles.stageConnector}>
                  <span className={styles.connectorLine} />
                  {stage.count > 0 && (
                    <span
                      className={`${styles.connectorPill} ${
                        nextCount / stage.count >= 0.6
                          ? styles.pillGood
                          : nextCount / stage.count >= 0.3
                            ? styles.pillMid
                            : styles.pillBad
                      }`}
                    >
                      {Math.round((nextCount / stage.count) * 100)}% continue
                    </span>
                  )}
                  {stage.count - nextCount > 0 && (
                    <span className={styles.lostPill}>{stage.count - nextCount} stopped here</span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* PAYWALL SUMMARY */}
      {data.stages[3]?.count > 0 && (
        <div className={styles.paywallSummary}>
          <Crown size={18} />
          <span>
            Of the learners who finished the free lessons,{' '}
            <strong>{data.subscribedTotal} subscribed</strong>
            {data.paywallLost > 0 && (
              <> — <strong>{data.paywallLost}</strong> stopped right at the paywall</>
            )}
            .
          </span>
        </div>
      )}

      {/* ── MILESTONE FUNNEL ── */}
      {(data.milestones?.length ?? 0) > 0 && (
        <>
          <h3 className={styles.sectionHeading}>How Far Learners Get</h3>
          <p className={styles.sectionSub}>
            The share of enrolled learners who make it to each milestone of the
            material itself.
          </p>

          {data.biggestDropoff && data.biggestDropoff.lost > 0 && (
            <div className={styles.dropoffCallout}>
              <AlertTriangle size={17} />
              <span>
                <strong>Biggest drop-off:</strong> {data.biggestDropoff.lost}{' '}
                learner{data.biggestDropoff.lost === 1 ? '' : 's'} (
                {data.biggestDropoff.lostPct}%) never reached{' '}
                <strong>{data.biggestDropoff.label}</strong>.
              </span>
            </div>
          )}

          <div className={styles.funnelStack}>
            {data.milestones!.map((m, i) => {
              const base = i === 0 ? data.stages[0]?.count ?? m.count : data.milestones![0].count;
              const pctOfAll = base > 0 ? Math.round((m.count / base) * 100) : 0;
              return (
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div
                    className={`${styles.stageRow} ${
                      pctOfAll >= 50
                        ? styles.stageGreen
                        : pctOfAll >= 25
                          ? styles.stageAmber
                          : styles.stageBlue
                    }`}
                  >
                    <div className={styles.stageIconCircle}>{m.count.toLocaleString()}</div>
                    <span className={styles.stageLabel}>
                      {m.label}
                      {i > 0 && (
                        <span className={styles.milestoneLost}>
                          {' '}
                          ({m.conversionFromPrev}% from previous)
                        </span>
                      )}
                    </span>
                    <span className={styles.stageCount}>{pctOfAll}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* ── PER-LESSON RETENTION STRIP ── */}
      <h3 className={styles.sectionHeading}>Lesson-by-Lesson Retention</h3>
      <p className={styles.sectionSub}>
        Solid green = completed. Faded = not there yet. The flag marks lessons losing the most learners.
      </p>

      {data.retention.length === 0 ? (
        <div className={styles.retentionEmpty}>No published lessons yet.</div>
      ) : (
        <div className={styles.retentionStrip}>
          {data.retention.map((lesson, i) => {
            const reachPct = lesson.reached > 0 ? Math.round((lesson.completed / lesson.reached) * 100) : 0;
            const isWorst = worstLeak > 0 && lesson.leak === worstLeak;
            return (
              <motion.div
                key={lesson.id}
                className={styles.lessonCard}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                title={lesson.title}
              >
                <div className={styles.lessonIndexBubble}>{lesson.index + 1}</div>

                <span className={styles.lessonTitle}>{lesson.title || `Lesson ${lesson.index + 1}`}</span>
                <span className={styles.lessonSection}>{lesson.sectionTitle}</span>

                <div className={styles.lessonBarsWrap}>
                  <ProgressBar pct={100} color="#e5e5e5" />
                  <ProgressBar pct={reachPct} color="#58cc02" />
                </div>

                <div className={styles.lessonCounts}>
                  <span>{lesson.reached} reached</span>
                  <span>{lesson.completed} done</span>
                </div>

                {isWorst ? (
                  <span className={styles.worstFlag}>
                    <AlertTriangle size={11} />
                    Loses {lesson.leak}
                  </span>
                ) : lesson.leak > 0 ? (
                  <span className={styles.leakBadge}>-{lesson.leak}</span>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
