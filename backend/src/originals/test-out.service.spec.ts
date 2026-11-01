import { ConflictException } from '@nestjs/common';
import {
  TestOutService,
  allocate,
  exercisesOf,
  unitPool,
} from './test-out.service';

const ex = (id: string) => ({
  id,
  kind: 'mcq',
  prompt: id,
  options: [],
  correctOptionId: 'a',
});
const blocks = (...ids: string[]) => ({
  apply: [{ type: 'exercises', value: { items: ids.map(ex) } }],
});

function unit(id: string, n = 10) {
  return {
    id,
    title: `Unit ${id}`,
    lessons: Array.from({ length: n }, (_, i) => ({
      id: `${id}-l${i + 1}`,
      milestone:
        i + 1 === n
          ? 'UNIT_CHALLENGE'
          : (i + 1) % 5 === 0
            ? 'CHECKPOINT'
            : null,
      contentBlocks: blocks(
        `${id}-l${i + 1}-a`,
        `${id}-l${i + 1}-b`,
        `${id}-l${i + 1}-c`,
        `${id}-l${i + 1}-d`,
      ),
    })),
  };
}

function service(opts: {
  units: ReturnType<typeof unit>[];
  trackSlug?: string;
  enrollment?: any;
}) {
  const prisma: any = {
    course: {
      findFirst: jest.fn().mockResolvedValue({
        id: 'c1',
        published: true,
        isOriginal: true,
        track: { slug: opts.trackSlug ?? 'data-science-for-beginners' },
        sections: opts.units,
      }),
    },
    enrollment: {
      findUnique: jest.fn().mockResolvedValue(opts.enrollment ?? null),
      update: jest.fn().mockResolvedValue({}),
    },
  };
  return { svc: new TestOutService(prisma), prisma };
}

const noShuffle = () => 0.999;

describe('test-out helpers', () => {
  it('reads Apply exercises from content blocks, also as a JSON string', () => {
    expect(exercisesOf(blocks('a', 'b')).map((e) => e.id)).toEqual(['a', 'b']);
    expect(exercisesOf(JSON.stringify(blocks('a')))).toHaveLength(1);
    expect(exercisesOf({})).toEqual([]);
    expect(exercisesOf('not json')).toEqual([]);
  });

  it('pools a unit from its Unit Challenge first, then Checkpoints, with unique ids', () => {
    const pool = unitPool(unit('u1'));
    expect(pool[0].id).toBe('u1-l10:u1-l10-a');
    expect(pool.map((e) => e.id.split(':')[0])).toEqual([
      ...Array(4).fill('u1-l10'),
      ...Array(4).fill('u1-l5'),
    ]);
  });

  it('falls back to ordinary lessons when a unit has no milestones', () => {
    const u = {
      id: 'x',
      title: 'X',
      lessons: [{ id: 'x1', milestone: null, contentBlocks: blocks('q') }],
    };
    expect(unitPool(u).map((e) => e.id)).toEqual(['x1:q']);
  });

  it('spreads questions with the extra going to the most recent units', () => {
    expect(allocate(1, 12)).toEqual([12]);
    expect(allocate(5, 12)).toEqual([2, 2, 2, 3, 3]);
    expect(allocate(20, 12)).toHaveLength(20);
    expect(allocate(0, 12)).toEqual([]);
  });
});

describe('TestOutService', () => {
  const units = [unit('u1'), unit('u2'), unit('u3'), unit('u4')];

  it('builds a Jump ahead test covering every chapter before the target', async () => {
    const { svc } = service({
      units,
      enrollment: { id: 'e1', completedLessons: [], testedOutLessons: [] },
    });
    const t = await svc.jumpTest('user', 'c1', 'u3', noShuffle);
    expect(t.covers.map((c) => c.sectionId)).toEqual(['u1', 'u2']);
    expect(t.exercises).toHaveLength(12);
    expect(new Set(t.exercises.map((e) => e.id.split('-')[0]))).toEqual(
      new Set(['u1', 'u2']),
    );
    expect(t.passMark).toBe(0.8);
  });

  it('refuses to test a chapter that is already open', async () => {
    const done = units[0].lessons.map((l) => l.id);
    const { svc } = service({
      units,
      enrollment: { id: 'e1', completedLessons: done, testedOutLessons: [] },
    });
    await expect(svc.jumpTest('user', 'c1', 'u2')).rejects.toBeInstanceOf(
      ConflictException,
    );
    await expect(svc.jumpTest('user', 'c1', 'u3')).resolves.toBeTruthy();
  });

  it('marks earlier lessons tested out on a pass, keeping completed ones completed', async () => {
    const { svc, prisma } = service({
      units,
      enrollment: {
        id: 'e1',
        completedLessons: ['u1-l1', 'u1-l2'],
        testedOutLessons: [],
      },
    });
    const r = await svc.submit('user', 'c1', {
      mode: 'jump',
      targetSectionId: 'u3',
      correct: 10,
      total: 12,
    });
    expect(r).toMatchObject({
      passed: true,
      testedOut: 18,
      firstLessonId: 'u3-l1',
    });
    const saved =
      prisma.enrollment.update.mock.calls[0][0].data.testedOutLessons;
    expect(saved).not.toContain('u1-l1');
    expect(saved).toContain('u2-l10');
    expect(saved).not.toContain('u3-l1');
  });

  it('does nothing below the pass mark', async () => {
    const { svc, prisma } = service({
      units,
      enrollment: { id: 'e1', completedLessons: [], testedOutLessons: [] },
    });
    const r = await svc.submit('user', 'c1', {
      mode: 'jump',
      targetSectionId: 'u3',
      correct: 9,
      total: 12,
    });
    expect(r.passed).toBe(false);
    expect(prisma.enrollment.update).not.toHaveBeenCalled();
  });

  it('needs an enrolment to record a result', async () => {
    const { svc } = service({ units });
    await expect(
      svc.submit('user', 'c1', {
        mode: 'jump',
        targetSectionId: 'u2',
        correct: 12,
        total: 12,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('offers placement only on placement tracks, never testing the last chapter', async () => {
    const off = service({ units }).svc;
    await expect(off.placementTest('c1')).rejects.toThrow('no placement test');
    const on = service({ units, trackSlug: 'python-for-beginners' }).svc;
    const p = await on.placementTest('c1', noShuffle);
    expect(p.units.map((u) => u.sectionId)).toEqual(['u1', 'u2', 'u3']);
    expect(p.units.every((u) => u.exercises.length === 3)).toBe(true);
    expect(p.passPerUnit).toBe(2);
    expect(p.finalSectionId).toBe('u4');
  });
});
