'use client';

/**
 * Hub → Feedback. Ratings and written reviews across the creator's courses.
 * Reviewers are shown with in-app identity only (name, avatar, username) —
 * never emails or phone numbers.
 */

import { motion } from 'framer-motion';
import { Avatar, Stars, DistBars, timeAgo } from '../bits';
import styles from './hubtabs.module.css';

interface FeedbackPayload {
  isEmpty?: boolean;
  avgRating?: number | null;
  totalRatings?: number;
  distribution?: number[]; // [1..5]
  perCourse?: { courseId: string; title: string; count: number; avg: number | null }[];
  reviews?: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    courseTitle: string;
    studentName: string;
    avatarUrl: string | null;
    username: string | null;
  }[];
}

export function FeedbackTab({ data }: { data: FeedbackPayload }) {
  if (data.isEmpty || (data.totalRatings ?? 0) === 0) {
    return (
      <div className={styles.emptyBox}>
        No ratings yet. Reviews appear here as soon as students rate your
        courses — and strong ratings are the best marketing you have.
      </div>
    );
  }

  const dist = data.distribution ?? [0, 0, 0, 0, 0];
  const distItems = [5, 4, 3, 2, 1].map((n) => ({
    label: `${n} star${n === 1 ? '' : 's'}`,
    count: dist[n - 1],
    color: n >= 4 ? '#58cc02' : n === 3 ? '#ffc800' : '#ff9600',
  }));

  return (
    <div className={styles.hubTabRoot}>
      <h3 className={styles.sectionHeading}>Feedback &amp; Quality</h3>
      <p className={styles.sectionSub}>
        What learners think of your courses. Reviews use in-app names only.
      </p>

      <div className={styles.ratingHead}>
        <div>
          <div className={styles.ratingBigNumber}>
            {data.avgRating != null ? data.avgRating.toFixed(1) : '—'}
          </div>
          <div className={styles.ratingOutOf}>out of 5</div>
        </div>
        <div className={styles.ratingSideInfo}>
          <Stars rating={data.avgRating ?? null} size={20} />
          <span className={styles.ratingCountLine}>
            {data.totalRatings} rating{data.totalRatings === 1 ? '' : 's'} across your courses
          </span>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panelBox}>
          <span className={styles.panelTitle}>Rating distribution</span>
          <DistBars items={distItems} />
        </div>
        {(data.perCourse?.length ?? 0) > 0 && (
          <div className={styles.panelBox}>
            <span className={styles.panelTitle}>By course</span>
            <div className={styles.retList}>
              {data.perCourse!.map((c) => (
                <div key={c.courseId} className={styles.retRow}>
                  <span className={styles.retLabel} style={{ width: 'auto', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.title}
                  </span>
                  <Stars rating={c.avg} size={13} />
                  <span className={styles.retCohort}>{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <h3 className={styles.sectionHeading}>Recent Reviews</h3>
      <div className={styles.reviewList}>
        {(data.reviews ?? []).map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.25) }}
            className={styles.reviewCard}
          >
            <Avatar src={r.avatarUrl} name={r.studentName} size={42} />
            <div className={styles.reviewBody}>
              <div className={styles.reviewNameRow}>
                <span className={styles.reviewName}>{r.studentName}</span>
                {r.username && <span className={styles.reviewUsername}>@{r.username}</span>}
                <span className={styles.reviewCoursePill}>{r.courseTitle}</span>
              </div>
              <Stars rating={r.rating} size={13} />
              {r.comment ? (
                <p className={styles.reviewComment}>{r.comment}</p>
              ) : (
                <span className={styles.reviewNoComment}>Rated without a written review</span>
              )}
            </div>
            <span className={styles.reviewWhen}>{timeAgo(r.createdAt)}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
