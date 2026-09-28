import { CourseImportAutopilotService } from './course-import-autopilot.service';

function setup() {
  const prisma = {
    courseImport: { findMany: jest.fn(), update: jest.fn() },
  };
  const analysis = { analyze: jest.fn() };
  const generation = { tick: jest.fn().mockResolvedValue(undefined) };
  const publish = { createCourse: jest.fn() };
  const service = new CourseImportAutopilotService(
    prisma as any,
    analysis as any,
    publish as any,
  );
  return { prisma, analysis, generation, publish, service };
}

describe('CourseImportAutopilotService', () => {
  it('analyzes an import that finished uploading (generation job picks it up)', async () => {
    const { prisma, analysis, generation, service } = setup();
    prisma.courseImport.findMany
      .mockResolvedValueOnce([{ id: 'i1', createdById: 'a1' }])
      .mockResolvedValueOnce([]);
    const res = await service.tick();
    expect(analysis.analyze).toHaveBeenCalledWith('a1', 'i1');
    // No parallel AI call: generation is left to its own job.
    expect(generation.tick).not.toHaveBeenCalled();
    expect(res).toEqual({ analyzed: 1, built: 0 });
    // Only unanalyzed, autopilot imports that are ready are picked up.
    expect(prisma.courseImport.findMany.mock.calls[0][0].where).toEqual({
      autopilot: true,
      status: 'READY_FOR_GENERATION',
      modules: { none: {} },
    });
  });

  it('builds the draft course with the settings chosen at the start', async () => {
    const { prisma, publish, service } = setup();
    prisma.courseImport.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: 'i2',
          createdById: 'a1',
          courseTitle: 'Python basics',
          courseCategory: 'Coding',
          courseLevel: 'Beginner',
          createdBy: { role: 'ADMIN' },
        },
      ]);
    publish.createCourse.mockResolvedValue({
      courseId: '1234567',
      result: {},
      appended: false,
    });
    const res = await service.tick();
    expect(publish.createCourse).toHaveBeenCalledWith(
      { id: 'a1', role: 'ADMIN' },
      'i2',
      {
        title: 'Python basics',
        category: 'Coding',
        level: 'Beginner',
      },
    );
    expect(res.built).toBe(1);
    expect(
      prisma.courseImport.update.mock.calls[0][0].data.autopilotNote,
    ).toContain('1234567');
  });

  it('never builds a second course (only imports without createdCourseId)', async () => {
    const { prisma, service } = setup();
    prisma.courseImport.findMany.mockResolvedValue([]);
    await service.tick();
    expect(prisma.courseImport.findMany.mock.calls[1][0].where).toMatchObject({
      createdCourseId: null,
      status: 'READY_FOR_REVIEW',
    });
  });

  it('turns itself off and records why when a step fails', async () => {
    const { prisma, analysis, service } = setup();
    prisma.courseImport.findMany
      .mockResolvedValueOnce([{ id: 'i3', createdById: 'a1' }])
      .mockResolvedValueOnce([]);
    analysis.analyze.mockRejectedValue(
      new Error('No uploaded videos to build lessons from.'),
    );
    await service.tick();
    expect(prisma.courseImport.update).toHaveBeenCalledWith({
      where: { id: 'i3' },
      data: {
        autopilot: false,
        autopilotNote:
          "Couldn't analyze the structure: No uploaded videos to build lessons from.",
      },
    });
  });
});
