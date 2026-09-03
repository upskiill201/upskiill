const STUDENT_EXPERIENCE_PREFIXES = ['/dashboard', '/courses', '/learn'];

/** True only while the user is inside the Student experience (not Creator Studio, blog, or other public pages). */
export function isStudentExperienceRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return STUDENT_EXPERIENCE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
