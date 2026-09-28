'use client';

/**
 * Home for a learner with no course yet. Three honest outcomes:
 *
 *   A live course exists for their track → its path, lesson 1 glowing.
 *     START enrolls them and opens lesson 1. No browsing, no course page.
 *   Nothing live for their track yet → their track's coming-soon path, with
 *     Explore one tap away.
 *   Track unknown (skipped onboarding, older account) → an invitation to
 *     Explore.
 *
 * Which course: `findTrackCourse` — the same rule the onboarding completion
 * screen uses, so the two never point at different courses.
 */

import Image from 'next/image';
import { useSWRConfig } from 'swr';
import CurrentQuestCard from '@/components/dashboard/v2/CurrentQuestCard';
import { TeyBubble } from '@/components/onboarding/TeyBubble';
import { CATEGORIES } from '@/lib/onboarding/catalog';
import type { LearningCategory } from '@/lib/onboarding/types';
import { useTrackCourse } from '@/lib/path/trackCourse';
import { enrollmentsKey, useLearningPath } from '@/hooks/useCourse';
import { ComingSoonPath, ComingSoonTeaser } from './ComingSoonPath';
import { LearningPath } from './LearningPath';
import { PathSkeleton } from './PathSkeleton';

export function NewLearnerHome({
  track,
  stickyTop,
  previewCourse,
}: {
  track: LearningCategory | null;
  stickyTop: string;
  /**
   * Development preview only: pretend this course is the track's pick, to
   * see the "a course exists" state on data that has none.
   */
  previewCourse?: { id: string; isWarmUp: boolean };
}) {
  const { mutate } = useSWRConfig();
  const found = useTrackCourse(previewCourse ? null : track);
  const course = previewCourse ?? found.course;
  const findingCourse = previewCourse ? false : found.isLoading;
  const { path, error: pathError } = useLearningPath(course?.id ?? null);

  if (!track) {
    return (
      <div className="pt-4">
        <CurrentQuestCard enrollment={null} />
      </div>
    );
  }

  if (findingCourse || (course && !path && !pathError)) return <PathSkeleton />;

  if (!course || !path || pathError) {
    return <ComingSoonPath track={track} stickyTop={stickyTop} />;
  }

  const label = CATEGORIES[track].label;

  return (
    <div>
      {/* Tey hands over: this is where the learner's path begins. */}
      <div className="mt-2 mb-2 flex items-center gap-3">
        <div className="relative shrink-0 w-[84px] h-[100px] md:w-[108px] md:h-[130px]">
          <Image
            src="/User onbarding Assets/tey/pointing.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="108px"
            className="object-contain object-bottom"
          />
        </div>
        <TeyBubble tail="left" className="flex-1 min-w-0 ml-1.5">
          <p className="text-[16px] md:text-[18px] leading-snug font-extrabold text-ink">
            {`Your ${label} path starts here! Tap the glowing lesson to begin.`}
          </p>
        </TeyBubble>
      </div>

      <LearningPath
        path={path}
        stickyTop={stickyTop}
        beforeStart={async () => {
          // Enroll on START (idempotent; the first ever enrollment also pays
          // the welcome bonus). Refresh enrollments so home switches to the
          // learner's own path when they come back.
          await fetch(`/api/courses/${path.course.id}/enroll`, { method: 'POST', credentials: 'include' });
          void mutate(enrollmentsKey);
        }}
        footer={course.isWarmUp ? <ComingSoonTeaser track={track} /> : undefined}
      />
    </div>
  );
}

export default NewLearnerHome;
