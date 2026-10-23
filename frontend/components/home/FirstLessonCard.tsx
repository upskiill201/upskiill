'use client';

/**
 * FirstLessonCard — top of home until lesson 1 of the course is finished.
 *
 * Enrolled-but-never-started is where Teyro loses most learners, so home
 * says it plainly: lesson 1's real title, its real length, one big START,
 * and Tey getting progressively cheekier the longer it waits (days since
 * enrolling). Nothing here is invented — the title and minutes are the
 * course's own.
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Glyph } from '@/components/art/Glyph';
import { lessonHref, type LearningPath } from '@/hooks/useCourse';
import { buildPathModel } from '@/lib/path/model';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';

const DAY = 86_400_000;

/** Tey, by how long lesson 1 has been waiting. */
export function firstLessonLine(daysWaiting: number, opened: boolean): string {
  if (opened) return 'You started it and left. I saved your spot. I also noticed.';
  if (daysWaiting <= 0) return "You're in! Now the fun part. It's short, I promise.";
  if (daysWaiting === 1) return "It's been a day. Lesson 1 is starting to think you don't like it.";
  if (daysWaiting <= 3) return "I'm not mad. I'm disappointed. It's just one short lesson.";
  return "Still here. Still waiting. Still believing in you. Mostly.";
}

export function FirstLessonCard({
  path,
  enrolledAt,
  opened = false,
}: {
  path: LearningPath;
  enrolledAt?: string | null;
  /** They opened lesson 1 before and left. */
  opened?: boolean;
}) {
  // When the card mounted; how long lesson 1 has waited is counted from it.
  const [now] = useState(() => Date.now());
  const model = buildPathModel(path);
  if (model.doneCount > 0 || !model.current || model.current.number !== 1) return null;
  const { lesson, sectionIndex } = model.current;
  const days = enrolledAt ? Math.floor((now - Date.parse(enrolledAt)) / DAY) : 0;
  const minutes = lesson.durationMinutes && lesson.durationMinutes > 0 ? lesson.durationMinutes : null;

  return (
    <section
      aria-label="Your first lesson"
      className="relative mb-5 rounded-[20px] border-2 border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5"
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      <div className="flex items-start gap-3">
        <div className="relative w-[64px] h-[72px] shrink-0">
          <Image
            src="/User onbarding Assets/tey/pointing.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="64px"
            className="object-contain object-bottom"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-extrabold uppercase tracking-wider text-[var(--color-brand)]">
            {opened ? 'Finish lesson 1' : 'Your first lesson'}
          </p>
          <h2 className="mt-0.5 text-[18px] md:text-[20px] leading-tight font-extrabold text-ink truncate">
            {lesson.title}
          </h2>
          <p className="mt-1 text-[15px] leading-snug font-semibold text-[var(--text-secondary)]">
            {firstLessonLine(days, opened)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Link
          href={lessonHref(path.course.id, sectionIndex, lesson.id)}
          onClick={() => {
            playSound('start');
            playHaptic('medium', false);
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-[14px] bg-[var(--success-green)] text-white text-[16px] font-extrabold uppercase tracking-wide active:translate-y-[2px] transition-transform"
          style={{ boxShadow: '0 4px 0 color-mix(in srgb, var(--success-green) 70%, var(--color-ink))' }}
        >
          <Glyph name="play" size={20} strokeWidth={2.4} />
          {opened ? 'Continue lesson 1' : 'Start lesson 1'}
        </Link>
        {minutes && (
          <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[var(--text-secondary)]">
            <Glyph name="clock" size={16} strokeWidth={2.4} />
            {minutes} min
          </span>
        )}
      </div>
    </section>
  );
}
