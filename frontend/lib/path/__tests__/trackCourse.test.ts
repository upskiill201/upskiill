import { findTrackCourse, isLearningTrack, WARMUP_SLUG_PREFIX } from '../trackCourse';

type Listed = { id: string; slug: string | null; title: string; lessonsCount: number; category?: string };

/** Mocks GET /api/courses?category=… with a list per category. */
function mockCatalog(byCategory: Record<string, Listed[] | 'fail'>) {
  global.fetch = jest.fn(async (url: string) => {
    const category = decodeURIComponent(new URL(url, 'http://x').searchParams.get('category') ?? '');
    const list = byCategory[category] ?? [];
    if (list === 'fail') throw new Error('offline');
    return { ok: true, json: async () => list } as Response;
  }) as unknown as typeof fetch;
}

const course = (id: string, lessonsCount: number, slug: string | null = id): Listed => ({
  id,
  slug,
  title: id.toUpperCase(),
  lessonsCount,
});

describe('findTrackCourse', () => {
  it('never recommends a course with no published lessons', async () => {
    mockCatalog({ Development: [course('empty', 0), course('real', 5)] });
    expect((await findTrackCourse('coding'))?.id).toBe('real');
  });

  it('prefers a Teyro warm-up course over everything else in the track', async () => {
    mockCatalog({
      Development: [course('big-course', 30)],
      'IT & Software': [course('warm', 3, `${WARMUP_SLUG_PREFIX}-coding`)],
    });
    const found = await findTrackCourse('coding');
    expect(found?.id).toBe('warm');
    expect(found?.isWarmUp).toBe(true);
  });

  it('otherwise keeps catalog category priority', async () => {
    mockCatalog({
      Development: [course('first', 4)],
      'IT & Software': [course('second', 9)],
    });
    expect((await findTrackCourse('coding'))?.id).toBe('first');
  });

  it("returns null when the track has nothing live — the caller shows coming soon", async () => {
    mockCatalog({ 'Artificial Intelligence': [course('draftish', 0)] });
    expect(await findTrackCourse('ai')).toBeNull();
  });

  it('survives one category request failing', async () => {
    mockCatalog({ Development: 'fail', 'IT & Software': [course('ok', 2)] });
    expect((await findTrackCourse('coding'))?.id).toBe('ok');
  });

  it('queries every track category at once, not one after another', async () => {
    mockCatalog({});
    await findTrackCourse('coding');
    expect((global.fetch as jest.Mock).mock.calls).toHaveLength(3);
  });
});

describe('isLearningTrack', () => {
  it('accepts only the launch tracks', () => {
    expect(isLearningTrack('coding')).toBe(true);
    expect(isLearningTrack('ai')).toBe(true);
    expect(isLearningTrack('design')).toBe(false);
    expect(isLearningTrack(undefined)).toBe(false);
  });
});
