import { slugifyTitle, slugMatchesTitle, slugUpdateFor, uniqueCourseSlug } from './course-slug.util';

describe('slugifyTitle', () => {
  it.each([
    ['Python for Absolute Beginners', 'python-for-absolute-beginners'],
    ['Build AI Agents & Automations', 'build-ai-agents-and-automations'],
    ['C++ in 30 Days', 'c-plus-plus-in-30-days'],
    ['C# for Game Devs', 'c-sharp-for-game-devs'],
    ["A Beginner's Guide to React", 'a-beginners-guide-to-react'],
    ['Café Coding — Ünïcode!', 'cafe-coding-unicode'],
    ['   ', 'course'],
  ])('%s → %s', (title, slug) => {
    expect(slugifyTitle(title)).toBe(slug);
  });

  it('caps long titles at a word boundary', () => {
    const slug = slugifyTitle('Learn '.repeat(30) + 'Everything');
    expect(slug.length).toBeLessThanOrEqual(80);
    expect(slug.endsWith('-')).toBe(false);
    expect(slug.split('-').every((w) => w === 'learn')).toBe(true);
  });
});

describe('slugMatchesTitle', () => {
  it('accepts the base and a numbered twin, not a random hash', () => {
    expect(slugMatchesTitle('intro-to-python', 'Intro to Python')).toBe(true);
    expect(slugMatchesTitle('intro-to-python-3', 'Intro to Python')).toBe(true);
    expect(slugMatchesTitle('intro-to-python-962d48', 'Intro to Python')).toBe(false);
  });
});

/** A tiny in-memory stand-in for the two Prisma reads the util makes. */
function fakeDb(rows: { id: string; slug: string; slugHistory: string[] }[]) {
  const match = (row: (typeof rows)[number], where: any) => {
    if (where.id?.not && row.id === where.id.not) return false;
    if (where.slugHistory?.has) return row.slugHistory.includes(where.slugHistory.has);
    if (where.OR) {
      return where.OR.some(
        (c: any) =>
          (c.slug?.startsWith && row.slug.startsWith(c.slug.startsWith)) ||
          (c.slugHistory?.hasSome && c.slugHistory.hasSome.some((s: string) => row.slugHistory.includes(s))),
      );
    }
    return true;
  };
  return {
    course: {
      findMany: async ({ where }: any) => rows.filter((r) => match(r, where)),
      findFirst: async ({ where }: any) => rows.find((r) => match(r, where)) ?? null,
    },
  } as any;
}

describe('uniqueCourseSlug', () => {
  it('uses the clean title when free', async () => {
    expect(await uniqueCourseSlug(fakeDb([]), 'Intro to Python')).toBe('intro-to-python');
  });

  it('numbers a collision instead of adding a hash', async () => {
    const db = fakeDb([
      { id: 'a', slug: 'intro-to-python', slugHistory: [] },
      { id: 'b', slug: 'intro-to-python-2', slugHistory: [] },
    ]);
    expect(await uniqueCourseSlug(db, 'Intro to Python')).toBe('intro-to-python-3');
  });

  it("never reuses another course's old slug (its redirect)", async () => {
    const db = fakeDb([{ id: 'a', slug: 'python-basics', slugHistory: ['intro-to-python'] }]);
    expect(await uniqueCourseSlug(db, 'Intro to Python')).toBe('intro-to-python-2');
  });

  it('ignores the course itself', async () => {
    const db = fakeDb([{ id: 'me', slug: 'intro-to-python', slugHistory: [] }]);
    expect(await uniqueCourseSlug(db, 'Intro to Python', 'me')).toBe('intro-to-python');
  });
});

describe('slugUpdateFor', () => {
  it('replaces a hashed slug and keeps the old one for the redirect', async () => {
    const course = { id: 'c1', slug: 'intro-to-python-962d48', title: 'Intro to Python', slugHistory: [] };
    expect(await slugUpdateFor(fakeDb([course]), course)).toEqual({
      slug: 'intro-to-python',
      slugHistory: ['intro-to-python-962d48'],
    });
  });

  it('does nothing when the slug already follows the title', async () => {
    const course = { id: 'c1', slug: 'intro-to-python', title: 'Intro to Python', slugHistory: [] };
    expect(await slugUpdateFor(fakeDb([course]), course)).toBeNull();
  });

  it('follows a new title', async () => {
    const course = { id: 'c1', slug: 'intro-to-python', title: 'Intro to Python', slugHistory: [] };
    expect(await slugUpdateFor(fakeDb([course]), course, 'Python from Zero')).toEqual({
      slug: 'python-from-zero',
      slugHistory: ['intro-to-python'],
    });
  });
});
