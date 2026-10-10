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

export function setHomeCourse(courseId: string): void {
  try {
    localStorage.setItem(HOME_COURSE_KEY, courseId);
  } catch {
    // Storage blocked — home falls back to the course you're partway through.
  }
}

/**
 * Home, showing this course's path. The only course map there is — every
 * "go to the course" link lands here (home reads ?course= and remembers it).
 */
export function courseHomeHref(courseId: string): string {
  return `/dashboard?course=${encodeURIComponent(courseId)}`;
}
