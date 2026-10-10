import { Prisma, PrismaClient } from '@prisma/client';

/**
 * Course URLs: teyro.app/courses/<slug>, the slug made from the title —
 * "Python for Absolute Beginners" → "python-for-absolute-beginners". Readable,
 * keyword-bearing, and stable enough to rank: when the title changes, the old
 * slug is kept in `slugHistory` so every old link 301s to the new one.
 *
 * Collisions get "-2", "-3"… — never a random hash, which is what the old
 * generator appended to every course ("…-962d48").
 */

const MAX_LEN = 80;

export function slugifyTitle(title: string): string {
  const base = (title || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // accents: "Café" → "Cafe"
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+\+/g, ' plus plus ') // "C++"
    .replace(/#/g, ' sharp ') // "C#"
    .replace(/['’]/g, '') // "Beginner's" → "beginners"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!base) return 'course';
  if (base.length <= MAX_LEN) return base;
  // Cut at a word boundary so a slug never ends mid-word.
  const cut = base.slice(0, MAX_LEN);
  const lastDash = cut.lastIndexOf('-');
  return (lastDash > 20 ? cut.slice(0, lastDash) : cut).replace(/-+$/g, '');
}

/** True when `slug` is exactly what `title` produces (allowing a -N suffix). */
export function slugMatchesTitle(slug: string, title: string): boolean {
  const base = slugifyTitle(title);
  return slug === base || new RegExp(`^${base}-\\d+$`).test(slug);
}

type Db = PrismaClient | Prisma.TransactionClient;

/**
 * The first free slug for `title`: free means no other course uses it as its
 * slug or as a past slug (a redirect must never point at two courses).
 */
export async function uniqueCourseSlug(db: Db, title: string, excludeCourseId?: string): Promise<string> {
  const base = slugifyTitle(title);
  const candidates = [base, ...Array.from({ length: 49 }, (_, i) => `${base}-${i + 2}`)];
  // One read: every course whose slug starts with the base, or whose history
  // holds one of the first fifty candidates.
  const taken = await db.course.findMany({
    where: {
      ...(excludeCourseId ? { id: { not: excludeCourseId } } : {}),
      OR: [{ slug: { startsWith: base } }, { slugHistory: { hasSome: candidates } }],
    },
    select: { slug: true, slugHistory: true },
  });
  const used = new Set<string>();
  for (const c of taken ?? []) {
    used.add(c.slug);
    for (const s of c.slugHistory ?? []) used.add(s);
  }
  const free = candidates.find((c) => !used.has(c));
  // Fifty courses with one title is not a real case; stay unique regardless.
  return free ?? `${base}-${Date.now().toString(36)}`;
}

/**
 * The data to write so a course's slug follows its title: nothing when it
 * already does, else the new slug with the old one pushed into history.
 */
export async function slugUpdateFor(
  db: Db,
  course: { id: string; slug: string; title: string; slugHistory?: string[] | null },
  title = course.title,
): Promise<{ slug: string; slugHistory: string[] } | null> {
  if (slugMatchesTitle(course.slug, title)) return null;
  const slug = await uniqueCourseSlug(db, title, course.id);
  if (slug === course.slug) return null;
  const history = [course.slug, ...(course.slugHistory ?? []).filter((s) => s !== course.slug && s !== slug)].slice(0, 20);
  return { slug, slugHistory: history };
}
