'use client';

/**
 * Which course the studio page is about. Like the learner's course switcher:
 * the current course sits in a chunky button; tapping it lists every course
 * with its learners. The pick is remembered on this device and shared by
 * Analytics, Learners and Community, and `?course=` in the URL wins.
 */

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { Check, ChevronDown, Users } from 'lucide-react';
import { CourseCover } from '@/components/course/CourseCover';
import { playSound } from '@/lib/audio/lessonSounds';
import { studioFetch, studioKeys, type StudioCourse } from '@/lib/creator/studio';
import { Sheet, studio as s } from './StudioParts';

const STORAGE_KEY = 'teyro:studio:course';

function remembered(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function remember(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* storage blocked: the pick lasts this visit */
  }
}

export function useStudioCourse({ publishedOnly = false }: { publishedOnly?: boolean } = {}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data, error, isLoading, mutate } = useSWR<StudioCourse[]>(studioKeys.courses, studioFetch);
  // A pick made here, else the URL, else this device's last pick.
  const [override, setOverride] = useState<string | null>(null);
  const [stored] = useState(() => (typeof window === 'undefined' ? null : remembered()));
  const picked = override ?? params.get('course') ?? stored;

  const courses = useMemo(() => {
    const list = Array.isArray(data) ? data : [];
    return (publishedOnly ? list.filter((c) => c.published) : list).sort(
      (a, b) => (b._count?.enrollments ?? 0) - (a._count?.enrollments ?? 0) || Number(b.published) - Number(a.published),
    );
  }, [data, publishedOnly]);

  const course = courses.find((c) => c.id === picked) ?? courses[0] ?? null;

  const setCourse = useCallback(
    (id: string) => {
      setOverride(id);
      remember(id);
      const q = new URLSearchParams(params.toString());
      q.set('course', id);
      router.replace(`${pathname}?${q.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  return { courses, course, setCourse, loading: isLoading && !data, error: error as Error | undefined, reload: mutate };
}

export function CourseSwitcher({
  courses,
  course,
  onPick,
}: {
  courses: StudioCourse[];
  course: StudioCourse;
  onPick: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const many = courses.length > 1;
  return (
    <>
      <button
        type="button"
        className={s.btn}
        style={{ height: 'auto', padding: '8px 12px 8px 8px', gap: 10, textTransform: 'none', letterSpacing: 0, maxWidth: '100%' }}
        onClick={() => {
          if (!many) return;
          setOpen(true);
        }}
        aria-haspopup={many ? 'dialog' : undefined}
        aria-label={many ? `Course: ${course.title}. Switch course` : `Course: ${course.title}`}
      >
        <span style={{ width: 44, height: 32, borderRadius: 8, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          <CourseCover id={course.id} category={course.category} thumbnailUrl={course.thumbnailUrl} sizes="44px" glyphSize={14} className={s.fill} />
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: 'var(--color-ink)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          {course.title}
        </span>
        {many && <ChevronDown size={18} aria-hidden="true" style={{ flexShrink: 0 }} />}
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Switch course">
        <div className={s.list}>
          {courses.map((c) => (
            <button
              key={c.id}
              type="button"
              className={s.row}
              onClick={() => {
                onPick(c.id);
                setOpen(false);
                playSound('switchCourse');
              }}
            >
              <span style={{ width: 56, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                <CourseCover id={c.id} category={c.category} thumbnailUrl={c.thumbnailUrl} sizes="56px" glyphSize={16} className={s.fill} />
              </span>
              <span className={s.rowMain}>
                <span className={s.rowTitle}>{c.title}</span>
                <span className={s.rowMeta}>
                  <span>
                    <Users size={13} aria-hidden="true" /> {c._count?.enrollments ?? 0} learners
                  </span>
                  {!c.published && <span>Not live yet</span>}
                </span>
              </span>
              {c.id === course.id && <Check size={20} color="var(--color-brand)" aria-label="Current" />}
            </button>
          ))}
        </div>
      </Sheet>
    </>
  );
}
