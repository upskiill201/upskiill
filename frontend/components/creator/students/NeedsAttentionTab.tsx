'use client';

/**
 * Students hub → Needs Attention. Auto-surfaced learners grouped by WHY
 * they need attention, each row linking to the learner's page.
 */

import React from 'react';
import Link from 'next/link';
import { AlarmClock, AlertTriangle, CheckCircle2, Flag, Target } from 'lucide-react';
import { Avatar } from '@/components/creator/analytics/bits';
import type { AttentionReason, NeedsAttentionPayload } from './types';
import { ATTENTION_LABELS, AttentionChip } from './bits';
import styles from './students.module.css';

const GROUPS: {
  key: AttentionReason;
  icon: React.ReactNode;
  blurb: string;
}[] = [
  {
    key: 'ALMOST_THERE',
    icon: <Flag size={16} color="#e6b000" />,
    blurb: 'Within 10% of finishing a course — a nudge could land the completion.',
  },
  {
    key: 'STUCK_LESSON',
    icon: <AlertTriangle size={16} color="#ea2b2b" />,
    blurb: 'Started a lesson but haven\'t finished it for days.',
  },
  {
    key: 'GONE_QUIET',
    icon: <AlarmClock size={16} color="#ea2b2b" />,
    blurb: 'Were learning, then stopped returning.',
  },
  {
    key: 'FAILING_QUIZ',
    icon: <Target size={16} color="#b45309" />,
    blurb: 'Repeatedly retrying the same quiz without clearing it.',
  },
];

export function NeedsAttentionTab({ data }: { data: NeedsAttentionPayload }) {
  if (data.totalFlagged === 0) {
    return (
      <div className={styles.allClearBox}>
        <CheckCircle2 size={22} />
        All caught up — no learner currently needs attention.
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.attGrid}>
        {GROUPS.map(({ key, icon, blurb }) => {
          const items = data.groups[key] ?? [];
          return (
            <div key={key} className={styles.attPanel}>
              <div className={styles.attPanelTitle}>
                {icon}
                <h3 className={styles.attPanelName}>{ATTENTION_LABELS[key]}</h3>
                {items.length > 0 && <span className={styles.attPanelCount}>{items.length}</span>}
              </div>
              <p className={styles.attContext}>{blurb}</p>

              {items.length === 0 ? (
                <p className={styles.attEmpty}>Nobody in this group right now.</p>
              ) : (
                items.map((s) => (
                  <Link
                    key={`${key}-${s.id}`}
                    href={`/creator/students/${s.id}`}
                    className={styles.attRow}
                  >
                    <Avatar src={s.avatarUrl} name={s.fullName} size={34} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                      <span className={styles.name}>{s.fullName}</span>
                      <span className={styles.attContext}>{describe(key, s.context)}</span>
                    </div>
                    <span style={{ marginLeft: 'auto' }}>
                      <AttentionChip reason={key} />
                    </span>
                  </Link>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function describe(
  key: AttentionReason,
  ctx: NeedsAttentionPayload['groups'][AttentionReason][number]['context'],
): string {
  switch (key) {
    case 'GONE_QUIET':
      return `Quiet ${ctx.daysQuiet ?? '?'} day${(ctx.daysQuiet ?? 0) === 1 ? '' : 's'}${ctx.courseTitle ? ` · ${ctx.courseTitle}` : ''}`;
    case 'STUCK_LESSON':
      return `“${ctx.lessonTitle ?? 'Lesson'}”${ctx.courseTitle ? ` · ${ctx.courseTitle}` : ''}`;
    case 'FAILING_QUIZ':
      return `${ctx.attempts ?? '?'} tries on “${ctx.lessonTitle ?? 'quiz'}” · best ${Math.round(ctx.quizScore ?? 0)}%`;
    case 'ALMOST_THERE':
      return `${ctx.progressPct ?? '?'}% through${ctx.courseTitle ? ` ${ctx.courseTitle}` : ''}`;
  }
}
