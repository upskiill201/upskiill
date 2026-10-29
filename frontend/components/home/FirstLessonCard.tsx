'use client';

/**
 * FirstLessonCard — "Start here", the one card on top of home until lesson 1
 * of the course is finished (founder, 2026-10-23: it used to be two stacked
 * cards, "Finish lesson 1" and "Already know some of this?", competing with
 * each other and with the path's own START).
 *
 *   - Tey says one honest line, by how long lesson 1 has waited.
 *   - Lesson 1's real title and length, and where they stopped if they
 *     started it (the onboarding taste saves the spot), with one big button.
 *   - For courses with a placement test, a quieter second row inside the same
 *     card: already know some of it? Find your level. Hidden once they've
 *     finished or tested out of anything.
 *
 * Nothing is invented: titles, minutes and the saved spot are real.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Art } from '@/components/art/Art';
import { Glyph } from '@/components/art/Glyph';
import { lessonHref, type LearningPath } from '@/hooks/useCourse';
import { buildPathModel } from '@/lib/path/model';
import { hasPlacementTest, placementHref } from '@/lib/path/testOut';
import { readSpot, type LessonSpot } from '@/lib/lesson/resume';
import { topicOf } from '@/lib/onboarding/v3/lines';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';

const DAY = 86_400_000;

/** Tey, by how long lesson 1 has been waiting. Warm, never guilt. */
export function firstLessonLine(daysWaiting: number, opened: boolean): string {
  if (opened) return "You've already started. Let's pick up right where you stopped.";
  if (daysWaiting <= 0) return "You're in! Lesson 1 is short. Let's go.";
  if (daysWaiting === 1) return 'Lesson 1 is still waiting for you. A few minutes is all it takes.';
  if (daysWaiting <= 3) return "Just one short lesson to get going. I'll be right here.";
  return 'Still here, still cheering you on. Lesson 1 takes a few minutes.';
}

function spotLabel(spot: LessonSpot | null): string | null {
  if (!spot) return null;
  return spot.phase === 'apply' ? 'Questions next' : `Back to card ${spot.card + 1}`;
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
  const router = useRouter();
  // When the card mounted; how long lesson 1 has waited is counted from it.
  const [now] = useState(() => Date.now());
  const model = buildPathModel(path);
  const current = model.doneCount === 0 && model.current?.number === 1 ? model.current : null;
  const lessonId = current?.lesson.id ?? null;

  // The saved spot lives on this device: read it after mount.
  const [spot, setSpot] = useState<LessonSpot | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage after mount, so server and client agree
    if (lessonId) setSpot(readSpot(lessonId));
  }, [lessonId]);

  if (!current) return null;
  const { lesson, sectionIndex } = current;
  const started = opened || !!spot;
  const days = enrolledAt ? Math.floor((now - Date.parse(enrolledAt)) / DAY) : 0;
  const minutes = lesson.durationMinutes && lesson.durationMinutes > 0 ? lesson.durationMinutes : null;
  const where = spotLabel(spot);

  // Placement needs a chapter to place into, and only makes sense before any progress.
  const canPlace =
    hasPlacementTest(path.original?.trackSlug) &&
    model.units.length >= 2 &&
    path.completedLessons.length === 0 &&
    (path.testedOutLessons ?? []).length === 0;
  const topic = topicOf(path.course.title) ?? 'this';

  return (
    <section
      aria-label="Start here"
      className="relative mb-5 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)]"
    >
      <div className="p-4 md:p-5">
        <div className="flex items-end gap-3">
          <div className="relative w-[60px] h-[68px] shrink-0">
            <Image
              src={started ? '/User onbarding Assets/tey/cheering.webp' : '/User onbarding Assets/tey/pointing.webp'}
              alt=""
              aria-hidden="true"
              fill
              sizes="60px"
              className="object-contain object-bottom"
            />
          </div>
          <p
            className="relative mb-2 flex-1 rounded-[16px] border-2 border-[var(--border)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[15px] leading-snug font-bold text-ink"
          >
            {firstLessonLine(days, started)}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wider text-[var(--color-brand)]">
          <span>Lesson 1</span>
          {minutes && (
            <span className="inline-flex items-center gap-1 text-[var(--text-secondary)]">
              · <Glyph name="clock" size={13} strokeWidth={2.6} /> {minutes} min
            </span>
          )}
          {where && (
            <span className="ml-auto rounded-full bg-[var(--lesson-select-bg)] px-2 py-0.5 normal-case tracking-normal text-[12px] font-bold">
              {where}
            </span>
          )}
        </div>
        <h2 className="mt-1 text-[19px] md:text-[21px] leading-tight font-extrabold text-ink">{lesson.title}</h2>

        <Link
          href={lessonHref(path.course.id, sectionIndex, lesson.id)}
          onClick={() => {
            playSound('start');
            playHaptic('medium', false);
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 h-[52px] rounded-[14px] bg-[var(--success-green)] text-white text-[16px] font-extrabold uppercase tracking-wide active:translate-y-[2px] transition-transform"
          style={{ boxShadow: '0 4px 0 color-mix(in srgb, var(--success-green) 70%, var(--color-ink))' }}
        >
          <Glyph name="play" size={20} strokeWidth={2.4} />
          {started ? 'Continue lesson 1' : 'Start lesson 1'}
        </Link>
      </div>

      {canPlace && (
        <button
          type="button"
          onClick={() => {
            playSound('nodeTap');
            playHaptic('light', false);
            router.push(placementHref(path.course.id));
          }}
          className="flex w-full items-center gap-3 border-t border-[var(--border)] bg-[var(--bg-section)] px-4 py-3 text-left transition-colors hover:bg-[var(--lesson-select-bg)] md:px-5"
        >
          <Art name="compass" size={40} />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-extrabold text-ink">Already know some {topic}?</span>
            <span className="block text-[13px] font-semibold text-[var(--text-secondary)]">
              Take a short test and skip what you know.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-extrabold uppercase tracking-wide text-[var(--color-brand)]">
            Find my level <Glyph name="chevron" size={16} strokeWidth={3} />
          </span>
        </button>
      )}
    </section>
  );
}
