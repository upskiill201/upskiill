'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCourseAutosave, CourseAutosaveResult } from '@/hooks/useCourseAutosave';
import { useLinkNavigationGuard } from '@/hooks/useLinkNavigationGuard';
import { CourseDraft, EMPTY_DRAFT } from './courseDraft';

/**
 * Everything about GETTING and PERSISTING a course draft, kept out of the
 * builder's view component.
 *
 * The page previously owned the fetch, the field mapping, the create-then-
 * patch flow, the optimistic-lock token and the autosave wiring inline,
 * interleaved with ~1,300 lines of JSX. That made the persistence rules —
 * which are the subtle part — very hard to see and impossible to test apart
 * from the UI.
 */

export interface UseCourseDraftResult {
  data: CourseDraft;
  setData: React.Dispatch<React.SetStateAction<CourseDraft>>;
  updateField: <K extends keyof CourseDraft>(field: K, value: CourseDraft[K]) => void;
  loading: boolean;
  /** True only during the explicit create-a-new-course round trip. */
  saving: boolean;
  autosave: CourseAutosaveResult;
  /** Explicit save. Resolves true only when the data is actually persisted,
   *  so navigation can depend on it. */
  saveDraft: () => Promise<boolean>;
  /** Teyro review-workflow status (DRAFT/SUBMITTED/.../APPROVED/REJECTED).
   *  Kept separate from `data` (CourseDraft) so it's never accidentally sent
   *  back in a course-metadata PATCH body. */
  reviewStatus: string | undefined;
  /** Re-fetches just the review status — used after a successful
   *  submit-for-review so the builder's banner reflects the new state
   *  without a full page reload. */
  refetchReviewStatus: () => Promise<void>;
}

/** Maps a server course row onto the form shape, filling sensible defaults. */
export function toCourseDraft(fetched: Record<string, any>): CourseDraft {
  return {
    title: fetched.title || '',
    subtitle: fetched.subtitle || '',
    category: fetched.category || '',
    subcategory: fetched.subcategory || '',
    level: fetched.level || 'Beginner',
    language: fetched.language || 'English',
    shortDescription: fetched.shortDescription || '',
    description: fetched.description || '',
    outcomes:
      Array.isArray(fetched.outcomes) && fetched.outcomes.length > 0
        ? fetched.outcomes
        : ['', '', ''],
    skills: Array.isArray(fetched.skills) ? fetched.skills : [],
    requirements:
      Array.isArray(fetched.requirements) && fetched.requirements.length > 0
        ? fetched.requirements
        : [''],
    thumbnailUrl: fetched.thumbnailUrl || '',
    creatorTimeWeekly: fetched.creatorTimeWeekly,
    price: typeof fetched.price === 'number' ? fetched.price : 0,
  };
}

export function useCourseDraft(
  courseId: string,
  isNew: boolean,
  onLoaded?: () => void | Promise<void>,
): UseCourseDraftResult {
  const router = useRouter();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<CourseDraft>(EMPTY_DRAFT);
  const [courseVersion, setCourseVersion] = useState<number | undefined>(undefined);
  const [reviewStatus, setReviewStatus] = useState<string | undefined>(undefined);

  /** Latches the id of a course created from the 'new' route, so this hook can
   *  never create a second one for the same session. */
  const createdCourseIdRef = useRef<string | null>(null);

  // Autosave is disabled while the course is still 'new', so an empty form can
  // never create a course on its own — creation stays an explicit action.
  const autosave = useCourseAutosave(courseId, data, {
    enabled: !isNew && !loading,
    initialVersion: courseVersion,
  });

  useLinkNavigationGuard(
    !loading && (autosave.isDirty || autosave.status === 'saving' || saving),
    'Your course has changes that are still saving. Leave anyway?',
  );

  // `onLoaded` is called once after the draft lands; hold it in a ref so a
  // caller passing an inline function can't re-trigger the fetch.
  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    if (isNew) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}/draft`, {
          credentials: 'include',
        });
        if (res.ok && !cancelled) {
          const fetched = await res.json();
          setData(toCourseDraft(fetched));
          // Seed the optimistic-lock token so the first autosave carries the
          // version this data was actually read at.
          if (typeof fetched.version === 'number') setCourseVersion(fetched.version);
          if (typeof fetched.reviewStatus === 'string') setReviewStatus(fetched.reviewStatus);
        }
        await onLoadedRef.current?.();
      } catch (err) {
        console.error('Failed to load course data', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [courseId, isNew]);

  const updateField = useCallback(
    <K extends keyof CourseDraft>(field: K, value: CourseDraft[K]) =>
      setData((prev) => ({ ...prev, [field]: value })),
    [],
  );

  const saveDraft = useCallback(async (): Promise<boolean> => {
    // Existing course: hand off to the autosave controller so this explicit
    // save shares the same single-writer lock, version token and retry policy
    // as the background saves. Two independent writers was how a slow
    // background PATCH could land on top of a newer explicit one.
    if (!isNew) return autosave.saveNow();

    // Already created once in this session — never POST again. Re-render
    // timing around the post-create router.replace must not be able to mint a
    // second, duplicate course. Patch the one we made instead.
    if (createdCourseIdRef.current) {
      const patchRes = await fetch(`/api/courses/${createdCourseIdRef.current}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...data, version: courseVersion }),
      });
      if (!patchRes.ok) return false;
      const patched = await patchRes.json().catch(() => null);
      if (typeof patched?.version === 'number') setCourseVersion(patched.version);
      return true;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: data.title || 'Untitled Course',
          category: data.category || "I don't know yet",
        }),
      });
      if (!res.ok) {
        console.error('Failed to create course', res.status, await res.text());
        return false;
      }
      const created = await res.json();
      createdCourseIdRef.current = created.id;

      // Patch with the full form, carrying the version the row was born at.
      const patchRes = await fetch(`/api/courses/${created.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...data, version: created.version ?? 1 }),
      });
      if (!patchRes.ok) {
        console.error('Failed to save course draft', patchRes.status);
        return false;
      }
      const patched = await patchRes.json().catch(() => null);
      if (typeof patched?.version === 'number') setCourseVersion(patched.version);

      // Same route → the component stays mounted, so local step state survives.
      router.replace(`/creator/builder/${created.id}`);
      return true;
    } catch (err) {
      console.error('Save failed', err);
      return false;
    } finally {
      setSaving(false);
    }
  }, [isNew, data, router, autosave, courseVersion]);

  const refetchReviewStatus = useCallback(async () => {
    if (isNew) return;
    try {
      const res = await fetch(`/api/courses/${courseId}/draft`, { credentials: 'include' });
      if (res.ok) {
        const fetched = await res.json();
        if (typeof fetched.reviewStatus === 'string') setReviewStatus(fetched.reviewStatus);
      }
    } catch (err) {
      console.error('Failed to refresh review status', err);
    }
  }, [courseId, isNew]);

  return { data, setData, updateField, loading, saving, autosave, saveDraft, reviewStatus, refetchReviewStatus };
}
