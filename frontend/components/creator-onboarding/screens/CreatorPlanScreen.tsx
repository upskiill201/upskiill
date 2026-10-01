'use client';

/**
 * "Here's your plan" — everything the creator told Tey, turned into what
 * happens next. Every line is a fact about how Teyro works today (first two
 * lessons free, 70% default share, the community after two lessons, the
 * four-phase lesson) plus a pace estimate from their weekly hours. Rows land
 * one by one with a climbing tick.
 */

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Dumbbell, Lightbulb, Microscope, Rocket, Users, PiggyBank, TrendingUp, HandHeart } from 'lucide-react';
import { trackLabel, topicLabel } from '@/lib/creator/categories';
import {
  DEFAULT_CREATOR_SHARE_PCT,
  FIRST_COURSE_LESSONS,
  LESSONS_PER_WEEK,
  weeksToFirstCourse,
  type CreatorAnswers,
  type CreatorGoal,
} from '@/lib/creator-onboarding/catalog';
import { playSound } from '@/lib/audio/lessonSounds';
import { creatorIcon } from '../creatorIcons';
import styles from '../CreatorOnboarding.module.css';

const PHASES = [
  { label: 'Learn', Icon: BookOpen, text: 'Short videos, text or audio' },
  { label: 'Apply', Icon: Dumbbell, text: 'Practice right away' },
  { label: 'Reflect', Icon: Lightbulb, text: 'Lock it in' },
  { label: 'Deepen', Icon: Microscope, text: 'Extra resources' },
];

const GOAL_LINE: Record<CreatorGoal, { Icon: typeof Users; title: string; text: string }> = {
  earn: {
    Icon: PiggyBank,
    title: `You keep ${DEFAULT_CREATOR_SHARE_PCT}% of every sale`,
    text: 'Learners try your first 2 lessons free, then subscribe to keep going.',
  },
  audience: {
    Icon: TrendingUp,
    title: 'New learners find you',
    text: 'Learners browsing your track find your course in Explore, not just your followers.',
  },
  impact: {
    Icon: HandHeart,
    title: 'Built so learners finish',
    text: 'Streaks, leagues and reminders from Tey keep your learners coming back every day.',
  },
  community: {
    Icon: Users,
    title: 'Your own community',
    text: 'Every course gets a community. Learners join after their second lesson, and you run it.',
  },
};

export function CreatorPlanScreen({ answers }: { answers: CreatorAnswers }) {
  const reduce = useReducedMotion() ?? false;
  const track = answers.track;
  const trackArt = track ? creatorIcon('track', track) : undefined;
  const topics = (answers.topics ?? []).map((t) => topicLabel(track, t)).filter(Boolean);
  const perWeek = LESSONS_PER_WEEK[answers.weeklyHours ?? '3-5'];
  const weeks = weeksToFirstCourse(answers.weeklyHours);
  const goal = GOAL_LINE[answers.goal ?? 'impact'];

  useEffect(() => {
    playSound('creatorPlan');
    if (reduce) return;
    const timers = [0, 1, 2].map((i) => window.setTimeout(() => playSound('statTick', i), 450 + i * 260));
    return () => timers.forEach(window.clearTimeout);
  }, [reduce]);

  const row = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { type: 'spring' as const, stiffness: 380, damping: 26, delay: 0.25 + i * 0.26 },
        };

  return (
    <div className={styles.plan}>
      <motion.section className={styles.planCard} {...row(0)}>
        <span className={styles.planKicker}>You&apos;ll teach</span>
        <div className={styles.planTrack}>
          {trackArt && (
            <span
              className={styles.planTile}
              style={{ color: trackArt.tone, background: `color-mix(in srgb, ${trackArt.tone} 13%, var(--bg-card))` }}
              aria-hidden="true"
            >
              <trackArt.Icon size={26} strokeWidth={2.25} />
            </span>
          )}
          <strong>{trackLabel(track) || 'Coding or AI'}</strong>
        </div>
        {topics.length > 0 && (
          <ul className={styles.chips} aria-label="Your topics">
            {topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </motion.section>

      <motion.section className={styles.planCard} {...row(1)}>
        <span className={styles.planKicker}>Every lesson, four steps</span>
        <ol className={styles.phases}>
          {PHASES.map(({ label, Icon, text }) => (
            <li key={label}>
              <span className={styles.phaseIcon} aria-hidden="true">
                <Icon size={20} strokeWidth={2.4} />
              </span>
              <strong>{label}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </motion.section>

      <motion.section className={styles.planCard} {...row(2)}>
        <span className={styles.planKicker}>Your first course</span>
        <div className={styles.planFacts}>
          <span className={styles.planTile} aria-hidden="true">
            <Rocket size={24} strokeWidth={2.25} />
          </span>
          <div>
            <strong>
              {FIRST_COURSE_LESSONS} lessons in about {weeks} {weeks === 1 ? 'week' : 'weeks'}
            </strong>
            <p>
              At your pace that&apos;s about {perWeek} {perWeek === 1 ? 'lesson' : 'lessons'} a week, built one at a
              time in the lesson builder.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section className={`${styles.planCard} ${styles.planHighlight}`} {...row(3)}>
        <div className={styles.planFacts}>
          <span className={styles.planTile} aria-hidden="true">
            <goal.Icon size={24} strokeWidth={2.25} />
          </span>
          <div>
            <strong>{goal.title}</strong>
            <p>{goal.text}</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default CreatorPlanScreen;
