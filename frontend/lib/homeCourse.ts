/**
 * Which course home's lesson path shows. Home reads it on mount; My Learning
 * writes it when you switch course (Duolingo's course switcher).
 */

export const HOME_COURSE_KEY = 'teyro:home-course';

export function getHomeCourse(): string | null {
  try {
    return typeof window === 'undefined' ? null : localStorage.getItem(HOME_COURSE_KEY);
  } catch {
    return null;
  }
}

/** The last course id the server was told about, so repeat taps cost nothing. */
let syncedFocus: string | null = null;

/**
 * Tell the server which course is the learner's focus. Community push, email
 * and bell follow it (backend common/focus-course.util.ts), and the browser's
 * own choice is invisible to the server. Fire-and-forget: a failed call only
 * means the server keeps its previous focus until the next switch.
 */
function syncFocusCourse(courseId: string): void {
  if (typeof window === 'undefined' || syncedFocus === courseId) return;
  syncedFocus = courseId;
  void fetch('/api/profile/focus-course', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ courseId }),
  }).catch(() => {
    syncedFocus = null; // offline: try again on the next switch
  });
}

export function setHomeCourse(courseId: string): void {
  try {
    localStorage.setItem(HOME_COURSE_KEY, courseId);
  } catch {
    // Storage blocked — home falls back to the course you're partway through.
  }
  syncFocusCourse(courseId);
}

/**
 * Home, showing this course's path. The only course map there is — every
 * "go to the course" link lands here (home reads ?course= and remembers it).
 */
export function courseHomeHref(courseId: string): string {
  return `/dashboard?course=${encodeURIComponent(courseId)}`;
}
