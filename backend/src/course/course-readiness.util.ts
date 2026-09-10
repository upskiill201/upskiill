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
