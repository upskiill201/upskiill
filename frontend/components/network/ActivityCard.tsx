'use client';

/**
 * One network card: a person's learning moment, with the two actions the
 * network exists for — Cheer them on, and Learn this too.
 *
 * Cheers are optimistic: the count moves on tap and rolls back only if the
 * server says no, so the feed never feels like it's waiting.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { courseHomeHref } from '@/lib/homeCourse';
import { useSWRConfig } from 'swr';
import { NETWORK_KEYS, cheerActivity, timeAgo, trackCard, type ActivityCardData, type NetworkFeed } from '@/lib/network';
import styles from './Network.module.css';

function headline(c: ActivityCardData): React.ReactNode {
  const course = c.course ? <strong>{c.course.title}</strong> : 'a course';
  switch (c.type) {
    case 'COURSE_STARTED':
      return c.inspiredBy ? (
        <>
          started {course} after seeing <strong>{c.inspiredBy.name}</strong>&apos;s progress
        </>
      ) : (
        <>started {course}</>
      );
    case 'COURSE_FINISHED':
      return <>finished the whole of {course}</>;
    case 'WORK_SHARED':
      return (
        <>
          built this in <strong>{c.lessonTitle ?? 'a lesson'}</strong> and it passed every check
        </>
      );
    case 'LESSON_COMPLETED':
      return c.lessonCount > 1 ? (
        <>finished {c.lessonCount} lessons in {course}</>
      ) : (
        <>finished <strong>{c.lessonTitle ?? 'a lesson'}</strong> in {course}</>
      );
    case 'STREAK_MILESTONE':
      return <>hit a {c.streakDays}-day streak</>;
    case 'ACHIEVEMENT_UNLOCKED':
      return <>unlocked <strong>{c.achievement?.name ?? 'an achievement'}</strong></>;
  }
}

function Badge({ c }: { c: ActivityCardData }) {
  if (c.type === 'STREAK_MILESTONE') {
    return (
      <span className={`${styles.badge} ${styles.badgeStreak}`}>
        <Image src="/Icons/burn.png" alt="" width={28} height={28} />
        <span className={styles.badgeNum}>{c.streakDays}</span>
      </span>
    );
  }
  if (c.type === 'WORK_SHARED') {
    return (
      <span className={`${styles.badge} ${styles.badgeWork}`}>
        <Glyph name="code" size={24} strokeWidth={2.4} />
      </span>
    );
  }
  if (c.type === 'COURSE_FINISHED') {
    return (
      <span className={`${styles.badge} ${styles.badgeFinished}`}>
        <Glyph name="cap" size={26} strokeWidth={2.4} />
      </span>
    );
  }
  if (c.type === 'ACHIEVEMENT_UNLOCKED') {
    return (
      <span className={`${styles.badge} ${styles.badgeMedal}`}>
        <Glyph name="medal" size={26} strokeWidth={2.4} />
      </span>
    );
  }
  if (c.course?.thumbnailUrl) {
    return <Image src={c.course.thumbnailUrl} alt="" width={52} height={52} className={styles.badgeThumb} />;
  }
  return (
    <span className={`${styles.badge} ${c.type === 'COURSE_STARTED' ? styles.badgeStart : styles.badgeLesson}`}>
      <Glyph name={c.type === 'COURSE_STARTED' ? 'rocket' : 'checkCircle'} size={24} strokeWidth={2.4} />
    </span>
  );
}

export default function ActivityCard({
  card,
  showAuthor = true,
  position,
}: {
  card: ActivityCardData;
  showAuthor?: boolean;
  /** Slot in the feed; set only where impressions are worth logging. */
  position?: number;
}) {
  const { mutate } = useSWRConfig();
  const ref = React.useRef<HTMLElement>(null);

  // An impression = at least half the card on screen for a moment.
  React.useEffect(() => {
    if (position === undefined || card.isMine || !ref.current || typeof IntersectionObserver === 'undefined') return;
    let shown: ReturnType<typeof setTimeout> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          shown = setTimeout(() => {
            trackCard({ kind: 'IMPRESSION', activityId: card.id, position });
            io.disconnect();
          }, 600);
        } else if (shown) {
          clearTimeout(shown);
          shown = null;
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      if (shown) clearTimeout(shown);
    };
  }, [card.id, card.isMine, position]);
  const [cheer, setCheer] = React.useState({ on: card.cheeredByMe, n: card.cheerCount });
  const [pop, setPop] = React.useState(false);
  // The feed paints from cache first; follow the server when fresh data lands.
  React.useEffect(() => {
    setCheer({ on: card.cheeredByMe, n: card.cheerCount });
  }, [card.cheeredByMe, card.cheerCount]);

  const toggle = async () => {
    const next = { on: !cheer.on, n: cheer.n + (cheer.on ? -1 : 1) };
    setCheer(next);
    if (next.on) {
      setPop(true);
      window.setTimeout(() => setPop(false), 420);
      playSound('toggleOn');
      playHaptic('light', false);
    }
    try {
      const res = await cheerActivity(card.id);
      setCheer({ on: res.cheered, n: res.cheerCount });
      // Keep the cached feed in step, so coming back doesn't show the old state.
      void mutate(
        NETWORK_KEYS.feed,
        (f?: NetworkFeed) =>
          f && { ...f, items: f.items.map((i) => (i.id === card.id ? { ...i, cheeredByMe: res.cheered, cheerCount: res.cheerCount } : i)) },
        { revalidate: false },
      );
    } catch {
      setCheer(cheer);
      playSound('nodeLocked');
    }
  };

  const cta = card.course
    ? card.course.enrolled
      ? { label: 'Continue', href: courseHomeHref(card.course.id) }
      : { label: 'Learn this too', href: `/courses/${card.course.slug ?? card.course.id}` }
    : null;

  return (
    <article className={styles.card} ref={ref}>
      {showAuthor && (
        <header className={styles.cardHead}>
          <Link
            href={`/dashboard/u/${encodeURIComponent(card.author.id)}`}
            className={styles.author}
            onClick={() => {
              playSound('navTap', 1);
              if (!card.isMine) trackCard({ kind: 'PROFILE_OPEN', activityId: card.id, position });
            }}
          >
            <Avatar size="sm" src={card.author.avatar ?? undefined} name={card.author.name} />
            <span className={styles.authorName}>{card.author.name}</span>
          </Link>
          {card.author.isBuddy && <span className={styles.buddyPill}>Buddy</span>}
          <span className={styles.time}>{timeAgo(card.createdAt)}</span>
        </header>
      )}

      <div className={styles.cardBody}>
        <Badge c={card} />
        <p className={styles.headline}>
          {showAuthor ? <span className={styles.firstName}>{card.author.name.split(' ')[0]} </span> : null}
          {headline(card)}
          {!showAuthor && <span className={styles.timeInline}> · {timeAgo(card.createdAt)}</span>}
        </p>
      </div>

      {card.work && <SharedCode work={card.work} />}

      {(!card.isMine || cta) && (
        <footer className={styles.cardActions}>
          {!card.isMine ? (
            <button
              type="button"
              className={`${styles.cheerBtn} ${cheer.on ? styles.cheerOn : ''} ${pop ? styles.cheerPop : ''}`}
              onClick={() => void toggle()}
              aria-pressed={cheer.on}
              aria-label={cheer.on ? 'Remove your cheer' : `Cheer ${card.author.name.split(' ')[0]} on`}
            >
              <Image src={cheer.on ? '/art/ui/cheer.svg' : '/art/ui/cheer-off.svg'} alt="" width={28} height={28} />
              {cheer.n > 0 && <span className={styles.cheerCount}>{cheer.n}</span>}
            </button>
          ) : (
            <span className={styles.cheerReadout}>
              <Image src="/art/ui/cheer.svg" alt="" width={24} height={24} /> {cheer.n} {cheer.n === 1 ? 'cheer' : 'cheers'}
            </span>
          )}
          {cta && !card.isMine && (
            <Link
              href={cta.href}
              className={styles.learnBtn}
              onClick={() => {
                playSound('start');
                // What "started because of you" is attributed from (server-side).
                trackCard({ kind: 'CTA', activityId: card.id, position });
              }}
            >
              {cta.label}
              <Glyph name="chevron" size={16} strokeWidth={2.8} />
            </Link>
          )}
        </footer>
      )}
    </article>
  );
}

const CODE_PREVIEW_LINES = 10;

/** Someone's code, as text (React escapes it; nothing here ever runs). */
function SharedCode({ work }: { work: { language: 'python' | 'sql'; code: string } }) {
  const lines = work.code.split('\n');
  const [open, setOpen] = React.useState(lines.length <= CODE_PREVIEW_LINES);
  return (
    <div className={styles.workBox}>
      <span className={styles.workLang}>{work.language === 'sql' ? 'SQL' : 'Python'}</span>
      <pre className={styles.codeBlock}>{open ? work.code : lines.slice(0, CODE_PREVIEW_LINES).join('\n')}</pre>
      {!open && (
        <button type="button" className={styles.workMore} onClick={() => setOpen(true)}>
          Show all {lines.length} lines
        </button>
      )}
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`} aria-hidden>
      <div className={styles.skelRow}>
        <span className={styles.skelCircle} />
        <span className={styles.skelLine} style={{ width: '40%' }} />
      </div>
      <span className={styles.skelLine} style={{ width: '85%', height: 18 }} />
      <span className={styles.skelLine} style={{ width: '55%' }} />
    </div>
  );
}
