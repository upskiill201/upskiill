/**
 * The one structural quality gate a course must clear before it can move
 * forward — originally inline inside CourseService#publishCourse, extracted
 * here so CourseReviewService#submitForReview can apply the EXACT same
 * check rather than inventing a second, possibly-drifting definition of
 * "ready." Both callers fetch the same shape (sections with their lessons'
 * id/title/status) and pass it straight through.
 */
export interface ReadinessCourse {
  sections: {
    title: string;
    lessons: { title: string; status: string }[];
  }[];
}

export function assessCourseReadiness(course: ReadinessCourse): string[] {
  const errors: string[] = [];

  if (course.sections.length === 0) {
    errors.push('Add at least one module before publishing.');
  }

  for (const section of course.sections) {
    if (section.lessons.length === 0) {
      errors.push(`Module "${section.title}" has no lessons yet.`);
      continue;
    }
    for (const lesson of section.lessons) {
      if (lesson.status !== 'published') {
        errors.push(
          `Lesson "${lesson.title}" is still a draft. Open it in the Lesson Builder and publish it first.`,
        );
      }
    }
  }

  return errors;
}

/** Teyro launches with two tracks; a course must belong to one to go live. */
export const LAUNCH_CATEGORIES = ['Coding', 'AI'];

/**
 * The course-level details a reviewer needs before a course can be
 * submitted: a real title, a launch track, and a description learners can
 * decide from. Applied on submit-for-review only, so courses that are
 * already live aren't affected.
 */
export function assessCourseDetails(course: {
  title: string;
  category: string | null;
  description: string | null;
}): string[] {
  const errors: string[] = [];
  if ((course.title ?? '').trim().length < 5) {
    errors.push('Give the course a title of at least 5 characters.');
  }
  if (!LAUNCH_CATEGORIES.includes(course.category ?? '')) {
    errors.push('Choose the course track: Coding or AI.');
  }
  const description = (course.description ?? '').replace(/<[^>]*>/g, '').trim();
  if (description.length < 40 || description === 'New Course Draft') {
    errors.push('Write a course description of at least 40 characters.');
  }
  return errors;
}
