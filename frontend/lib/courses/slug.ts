/**
 * The course-URL rule, mirrored from backend/src/course/course-slug.util.ts
 * (slugifyTitle) so the course builder can preview the URL a title will get.
 * The server is the authority — a collision gets "-2", "-3"… there.
 */
const MAX_LEN = 80;

export function slugifyTitle(title: string): string {
  const base = (title || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+\+/g, ' plus plus ')
    .replace(/#/g, ' sharp ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!base) return 'course';
  if (base.length <= MAX_LEN) return base;
  const cut = base.slice(0, MAX_LEN);
  const lastDash = cut.lastIndexOf('-');
  return (lastDash > 20 ? cut.slice(0, lastDash) : cut).replace(/-+$/g, '');
}
