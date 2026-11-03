/**
 * Hot courses: the ones we're pushing right now. They carry the HOT badge in
 * onboarding and Explore, and onboarding lists them first. Keyed by slug so a
 * course lights up the moment it's published; add or remove slugs here only.
 */

export const HOT_COURSE_SLUGS: ReadonlySet<string> = new Set([
  'win-and-influence-people', // docs/originals/win-and-influence-people-outline.md
]);

export function isHotCourse(course: { slug?: string | null }): boolean {
  return !!course.slug && HOT_COURSE_SLUGS.has(course.slug);
}
