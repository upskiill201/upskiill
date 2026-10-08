import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CourseImportPublishService,
  resourceTypeFor,
} from './course-import-publish.service';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreationService } from '../course-creation/course-creation.service';
import {
  APPLY_QUESTIONS_MAX,
  APPLY_QUESTIONS_MIN,
} from './lesson-content-generation.types';
import { buildRichLesson } from './rich-lesson';
import { editingLessonOutput } from '../../test/fixtures/rich-lesson';

const userId = 'user-1';
const importId = 'import-1';
const user = { id: userId, role: 'ADMIN' };

const baseInput = { title: 'Stick Figure Animation', category: 'Animation' };

/** A lesson is only written into the real course once its content actually
 *  holds up, so fixtures have to be genuinely valid — including a legal
 *  Apply question count. */
function applyBlocks(questionCount = 5) {
  return [
    {
      type: 'mcqActivity',
      value: {
        questions: Array.from({ length: questionCount }, (_, i) => ({
          id: `q_${i}`,
          questionText: `Question ${i + 1}?`,
          options: [
            { id: `opt_${i}_0`, text: 'A' },
            { id: `opt_${i}_1`, text: 'B' },
          ],
          correctOptionId: `opt_${i}_1`,
          explanation: 'Because.',
        })),
      },
    },
  ];
}

function baseImport(overrides: Record<string, unknown> = {}) {
  return {
    id: importId,
    createdById: userId,
    status: 'READY_FOR_REVIEW',
    createdCourseId: null,
    files: [
      {
        id: 'file-doc-1',
        driveFileName: 'Cheat Sheet.pdf',
        category: 'document',
        storageUrl: 'https://cdn.example/cheat-sheet.pdf',
        sizeBytes: BigInt(1024),
      },
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Stick Figure Animation Course',
        orderIndex: 0,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Symbols',
            status: 'GENERATED',
            description: 'Learn about symbols.',
            learnBlocks: [
              { type: 'videoUrl', value: 'https://cdn.example/v.mp4' },
            ],
            applyBlocks: applyBlocks(),
            reflectBlocks: [{ type: 'reflectActivity', value: {} }],
            deepenBlocks: [{ type: 'deepenActivity', value: {} }],
            resourceFileIds: ['file-doc-1'],
            createdLessonId: null,
          },
          {
            id: 'lesson-2',
            title: 'Broken Lesson',
            status: 'FAILED',
            description: null,
            learnBlocks: null,
            applyBlocks: null,
            reflectBlocks: null,
            deepenBlocks: null,
            resourceFileIds: [],
            createdLessonId: null,
          },
        ],
        createdSectionId: null,
      },
    ],
    ...overrides,
  };
}

describe('CourseImportPublishService', () => {
  let service: CourseImportPublishService;
  let prisma: {
    courseImport: { findFirst: jest.Mock; update: jest.Mock };
    courseImportModule: { update: jest.Mock };
    courseImportLesson: { update: jest.Mock };
    course: { findUnique: jest.Mock };
  };
  let courseCreation: {
    createFullCourseTree: jest.Mock;
    createModuleWithLessons: jest.Mock;
    createLessonWithContent: jest.Mock;
  };

  beforeEach(async () => {
    prisma = {
      courseImport: { findFirst: jest.fn(), update: jest.fn() },
      courseImportModule: { update: jest.fn() },
      courseImportLesson: { update: jest.fn() },
      course: { findUnique: jest.fn() },
    };
    courseCreation = {
      createFullCourseTree: jest.fn(),
      createModuleWithLessons: jest.fn(),
      createLessonWithContent: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseImportPublishService,
        { provide: PrismaService, useValue: prisma },
        { provide: CourseCreationService, useValue: courseCreation },
      ],
    }).compile();

    service = module.get(CourseImportPublishService);
  });

  it('404s when the import does not exist or is not owned by this user', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(null);
    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow(NotFoundException);
  });

  // Changed deliberately: a 100+ video course is imported in batches, so
  // waiting for the whole import before any of it is usable is exactly what
  // incremental publishing exists to avoid. What gates a lesson now is
  // whether that lesson's own content is valid, not the import's status.
  it('builds a course from what is ready even while the import is still running', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({ status: 'GENERATING_CONTENT' }),
    );
    courseCreation.createFullCourseTree.mockResolvedValue({
      courseId: 'course-1',
      status: 'created',
      sections: [
        {
          sectionId: 'section-1',
          title: 'Stick Figure Animation Course',
          status: 'created',
          lessons: [
            { lessonId: 'real-lesson-1', title: 'Symbols', status: 'created' },
          ],
        },
      ],
    });

    await expect(
      service.createCourse(user, importId, baseInput),
    ).resolves.toMatchObject({ courseId: 'course-1', appended: false });
  });

  it('refuses when no lesson finished generating', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({
        modules: [
          {
            id: 'module-1',
            title: 'Course',
            orderIndex: 0,
            lessons: [{ id: 'lesson-2', title: 'Broken', status: 'FAILED' }],
          },
        ],
      }),
    );
    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow('nothing to build a course from');
  });

  it('builds a spec from only the GENERATED lessons, attaches resources, and records the created course', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(baseImport());
    courseCreation.createFullCourseTree.mockResolvedValue({
      courseId: 'course-1',
      status: 'created',
      sections: [
        {
          sectionId: 'section-1',
          title: 'Stick Figure Animation Course',
          status: 'created',
          lessons: [
            { lessonId: 'lesson-1', title: 'Symbols', status: 'created' },
          ],
        },
      ],
    });

    const result = await service.createCourse(user, importId, baseInput);

    expect(courseCreation.createFullCourseTree).toHaveBeenCalledWith(
      userId,
      user,
      {
        course: {
          title: 'Stick Figure Animation',
          category: 'Animation',
          creatorTimeWeekly: undefined,
        },
        sections: [
          {
            title: 'Stick Figure Animation Course',
            lessons: [
              {
                title: 'Symbols',
                content: {
                  description: 'Learn about symbols.',
                  learnBlocks: [
                    { type: 'videoUrl', value: 'https://cdn.example/v.mp4' },
                  ],
                  applyBlocks: applyBlocks(),
                  reflectBlocks: [{ type: 'reflectActivity', value: {} }],
                  deepenBlocks: [{ type: 'deepenActivity', value: {} }],
                  // A brand new course is not live yet, so the first batch
                  // is published as part of the build and reviewed whole.
                  publish: true,
                },
                resources: [
                  {
                    type: 'pdf',
                    title: 'Cheat Sheet',
                    storageUrl: 'https://cdn.example/cheat-sheet.pdf',
                    sizeBytes: 1024,
                    originalName: 'Cheat Sheet.pdf',
                    category: 'Reference',
                  },
                ],
              },
              // "Broken Lesson" (FAILED) is skipped entirely.
            ],
          },
        ],
      },
    );
    expect(prisma.courseImport.update).toHaveBeenCalledWith({
      where: { id: importId },
      data: { createdCourseId: 'course-1', status: 'COURSE_CREATED' },
    });
    expect(result).toEqual({
      courseId: 'course-1',
      result: expect.objectContaining({ courseId: 'course-1' }),
      appended: false,
    });
    // The link back to the real lesson is what makes a second call safe —
    // without it an append would have no way to know this was already written.
    expect(prisma.courseImportLesson.update).toHaveBeenCalledWith({
      where: { id: 'lesson-1' },
      data: { createdLessonId: 'lesson-1', addedToCourseAt: expect.any(Date) },
    });
    expect(prisma.courseImportModule.update).toHaveBeenCalledWith({
      where: { id: 'module-1' },
      data: { createdSectionId: 'section-1' },
    });
  });

  it('surfaces a failed course-tree creation as a BadRequestException without recording anything', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(baseImport());
    courseCreation.createFullCourseTree.mockResolvedValue({
      status: 'failed',
      error: 'title already taken',
      sections: [],
    });

    await expect(
      service.createCourse(user, importId, baseInput),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.courseImport.update).not.toHaveBeenCalled();
  });

  it('skips a resource id that has no matching file or no storageUrl', async () => {
    prisma.courseImport.findFirst.mockResolvedValue(
      baseImport({
        modules: [
          {
            id: 'module-1',
            title: 'Course',
            orderIndex: 0,
            lessons: [
              {
                id: 'lesson-1',
                title: 'Symbols',
                status: 'GENERATED',
                description: 'desc',
                learnBlocks: [
                  { type: 'videoUrl', value: 'https://cdn.example/v.mp4' },
                ],
                applyBlocks: applyBlocks(),
                reflectBlocks: [{ type: 'reflectActivity', value: {} }],
                deepenBlocks: [{ type: 'deepenActivity', value: {} }],
                resourceFileIds: ['missing-file', 'file-doc-1'],
                createdLessonId: null,
              },
            ],
          },
        ],
        files: [
          {
            id: 'file-doc-1',
            driveFileName: 'No URL Yet.pdf',
            category: 'document',
            storageUrl: null,
            sizeBytes: null,
          },
        ],
      }),
    );
    courseCreation.createFullCourseTree.mockResolvedValue({
      courseId: 'course-1',
      status: 'created',
      sections: [],
    });

    await service.createCourse(user, importId, baseInput);

    const spec = courseCreation.createFullCourseTree.mock.calls[0][2];
    expect(spec.sections[0].lessons[0].resources).toEqual([]);
  });

  // ── Eligibility: what may reach a course that could already be live ──

  describe('publication eligibility', () => {
    function lessonWith(overrides: Record<string, unknown>) {
      return baseImport({
        modules: [
          {
            id: 'module-1',
            title: 'Course',
            orderIndex: 0,
            createdSectionId: null,
            lessons: [
              {
                id: 'lesson-1',
                title: 'Symbols',
                status: 'GENERATED',
                description: 'desc',
                learnBlocks: [
                  { type: 'videoUrl', value: 'https://cdn.example/v.mp4' },
                ],
                applyBlocks: applyBlocks(),
                reflectBlocks: [{ type: 'reflectActivity', value: {} }],
                deepenBlocks: [{ type: 'deepenActivity', value: {} }],
                resourceFileIds: [],
                createdLessonId: null,
                ...overrides,
              },
            ],
          },
        ],
      });
    }

    const rejected = 'nothing to build a course from';

    it.each([
      [
        `${APPLY_QUESTIONS_MIN - 1} Apply questions`,
        { applyBlocks: applyBlocks(APPLY_QUESTIONS_MIN - 1) },
      ],
      [
        `${APPLY_QUESTIONS_MAX + 1} Apply questions`,
        { applyBlocks: applyBlocks(APPLY_QUESTIONS_MAX + 1) },
      ],
      [
        'no Apply questions array at all',
        { applyBlocks: [{ type: 'mcqActivity', value: {} }] },
      ],
      [
        'a missing video',
        { learnBlocks: [{ type: 'text', value: 'no video here' }] },
      ],
      ['empty Learn content', { learnBlocks: [] }],
      ['empty Reflect content', { reflectBlocks: [] }],
      ['empty Deepen content', { deepenBlocks: [] }],
    ])('withholds a lesson with %s', async (_label, overrides) => {
      prisma.courseImport.findFirst.mockResolvedValue(lessonWith(overrides));
      await expect(
        service.createCourse(user, importId, baseInput),
      ).rejects.toThrow(rejected);
      expect(courseCreation.createFullCourseTree).not.toHaveBeenCalled();
    });

    it.each([APPLY_QUESTIONS_MIN, 8, APPLY_QUESTIONS_MAX])(
      'accepts a lesson with %i Apply questions',
      async (count) => {
        prisma.courseImport.findFirst.mockResolvedValue(
          lessonWith({ applyBlocks: applyBlocks(count) }),
        );
        courseCreation.createFullCourseTree.mockResolvedValue({
          courseId: 'course-1',
          status: 'created',
          sections: [
            {
              sectionId: 's1',
              title: 'Course',
              status: 'created',
              lessons: [],
            },
          ],
        });
        await expect(
          service.createCourse(user, importId, baseInput),
        ).resolves.toMatchObject({ courseId: 'course-1' });
      },
    );

    describe('rich (v2) lessons', () => {
      const created = {
        courseId: 'course-1',
        status: 'created',
        sections: [
          { sectionId: 's1', title: 'Course', status: 'created', lessons: [] },
        ],
      };

      it.each([
        ['with a video card', 422],
        ['with a long video kept in classic Learn', 1800],
      ])(
        'accepts a rich lesson %s, passing its blocks through unchanged',
        async (_l, durationSec) => {
          const rich = buildRichLesson(
            editingLessonOutput(),
            { url: 'https://cdn.example/v.mp4', durationSec },
            null,
          );
          prisma.courseImport.findFirst.mockResolvedValue(
            lessonWith({
              learnBlocks: rich.learnBlocks,
              applyBlocks: rich.applyBlocks,
              reflectBlocks: rich.reflectBlocks,
              deepenBlocks: rich.deepenBlocks,
            }),
          );
          courseCreation.createFullCourseTree.mockResolvedValue(created);
          await service.createCourse(user, importId, baseInput);
          const spec = courseCreation.createFullCourseTree.mock.calls[0][2];
          expect(spec.sections[0].lessons[0].content.applyBlocks).toEqual(
            rich.applyBlocks,
          );
          expect(spec.sections[0].lessons[0].content.learnBlocks).toEqual(
            rich.learnBlocks,
          );
        },
      );

      it('withholds a rich lesson whose exercises no longer pass the publish checks', async () => {
        const rich = buildRichLesson(
          editingLessonOutput(),
          { url: 'https://cdn.example/v.mp4', durationSec: 422 },
          null,
        );
        const apply = JSON.parse(JSON.stringify(rich.applyBlocks));
        apply[0].value.items[0].correctOptionId = 'missing';
        prisma.courseImport.findFirst.mockResolvedValue(
          lessonWith({ learnBlocks: rich.learnBlocks, applyBlocks: apply }),
        );
        await expect(
          service.createCourse(user, importId, baseInput),
        ).rejects.toThrow(rejected);
      });

      it('withholds a rich lesson with no video anywhere', async () => {
        const rich = buildRichLesson(
          editingLessonOutput(),
          { url: 'https://cdn.example/v.mp4', durationSec: 422 },
          null,
        );
        const learn = JSON.parse(JSON.stringify(rich.learnBlocks));
        learn[0].value = learn[0].value.filter(
          (c: { kind: string }) => c.kind !== 'video',
        );
        prisma.courseImport.findFirst.mockResolvedValue(
          lessonWith({ learnBlocks: learn, applyBlocks: rich.applyBlocks }),
        );
        await expect(
          service.createCourse(user, importId, baseInput),
        ).rejects.toThrow(rejected);
      });

      function readingImport() {
        const rich = buildRichLesson(
          editingLessonOutput(),
          {
            kind: 'none',
            url: 'https://cdn.example/notes.pdf',
            durationSec: null,
          },
          null,
        );
        const found = lessonWith({
          primaryFileId: 'notes-1',
          learnBlocks: rich.learnBlocks,
          applyBlocks: rich.applyBlocks,
          reflectBlocks: rich.reflectBlocks,
          deepenBlocks: rich.deepenBlocks,
          resourceFileIds: ['notes-1', 'img-1'],
        }) as unknown as { files: Record<string, unknown>[] };
        found.files = [
          {
            id: 'notes-1',
            driveFileName: 'Notes',
            category: 'document',
            storageKey: 'course-imports/i/notes-1-Notes.pdf',
            storageUrl: 'https://cdn.example/notes.pdf',
            sizeBytes: BigInt(2048),
          },
          {
            id: 'img-1',
            driveFileName: 'diagram.png',
            category: 'image',
            storageKey: 'course-imports/i/img-1-diagram.png',
            storageUrl: 'https://cdn.example/diagram.png',
            sizeBytes: null,
          },
        ];
        return found;
      }

      it('accepts a reading lesson built from a document, offering the document as a download', async () => {
        prisma.courseImport.findFirst.mockResolvedValue(readingImport());
        courseCreation.createFullCourseTree.mockResolvedValue(created);
        await service.createCourse(user, importId, baseInput);
        const lessonSpec =
          courseCreation.createFullCourseTree.mock.calls[0][2].sections[0]
            .lessons[0];
        // The exported Google Doc keeps its real extension; the image is
        // already a Learn card, so it isn't repeated as a download.
        expect(lessonSpec.resources).toEqual([
          expect.objectContaining({
            type: 'pdf',
            title: 'Notes',
            originalName: 'Notes.pdf',
          }),
        ]);
      });

      function splitVideoImport(part1Status: string) {
        const rich = buildRichLesson(
          editingLessonOutput(),
          {
            url: 'https://cdn.example/v.mp4',
            durationSec: 1200,
            startSec: 0,
            endSec: 600,
          },
          null,
        );
        const part = (n: number, status: string) => ({
          id: `part-${n}`,
          title: `Deep Dive (Part ${n} of 2)`,
          status,
          description: 'desc',
          primaryFileId: 'vid-long',
          partIndex: n,
          partCount: 2,
          clipStartSec: (n - 1) * 600,
          clipEndSec: n * 600,
          learnBlocks: rich.learnBlocks,
          applyBlocks: rich.applyBlocks,
          reflectBlocks: rich.reflectBlocks,
          deepenBlocks: rich.deepenBlocks,
          resourceFileIds: [],
          createdLessonId: null,
        });
        return baseImport({
          modules: [
            {
              id: 'module-1',
              title: 'Course',
              orderIndex: 0,
              createdSectionId: null,
              lessons: [part(1, part1Status), part(2, 'GENERATED')],
            },
          ],
        });
      }

      it("holds back a split video's parts until every part is ready", async () => {
        prisma.courseImport.findFirst.mockResolvedValue(
          splitVideoImport('FAILED'),
        );
        await expect(
          service.createCourse(user, importId, baseInput),
        ).rejects.toThrow(rejected);
      });

      it('adds all the parts of a split video together, in order', async () => {
        prisma.courseImport.findFirst.mockResolvedValue(
          splitVideoImport('GENERATED'),
        );
        courseCreation.createFullCourseTree.mockResolvedValue(created);
        await service.createCourse(user, importId, baseInput);
        const [[, , spec]] = courseCreation.createFullCourseTree.mock.calls as [
          [unknown, unknown, { sections: { lessons: { title: string }[] }[] }],
        ];
        expect(spec.sections[0].lessons.map((l) => l.title)).toEqual([
          'Deep Dive (Part 1 of 2)',
          'Deep Dive (Part 2 of 2)',
        ]);
      });

      it('withholds a text-only lesson whose source was a video', async () => {
        const found = readingImport();
        found.files[0].category = 'video';
        prisma.courseImport.findFirst.mockResolvedValue(found);
        await expect(
          service.createCourse(user, importId, baseInput),
        ).rejects.toThrow(rejected);
      });

      it('times a part lesson by its clip, not the whole video', async () => {
        const rich = buildRichLesson(
          editingLessonOutput(),
          {
            url: 'https://cdn.example/v.mp4',
            durationSec: 2400,
            startSec: 600,
            endSec: 1200,
          },
          null,
        );
        prisma.courseImport.findFirst.mockResolvedValue(
          lessonWith({
            clipStartSec: 600,
            clipEndSec: 1200,
            learnBlocks: rich.learnBlocks,
            applyBlocks: rich.applyBlocks,
            reflectBlocks: rich.reflectBlocks,
            deepenBlocks: rich.deepenBlocks,
          }),
        );
        courseCreation.createFullCourseTree.mockResolvedValue(created);
        await service.createCourse(user, importId, baseInput);
        const content =
          courseCreation.createFullCourseTree.mock.calls[0][2].sections[0]
            .lessons[0].content;
        // 10 min of clip + 6 exercises at ~30s each.
        expect(content.durationMinutes).toBe(13);
      });
    });
  });

  describe('resourceTypeFor', () => {
    it.each([
      ['notes.pdf', 'document', 'pdf'],
      ['brief.docx', 'document', 'doc'],
      ['deck.pptx', 'presentation', 'pptx'],
      ['sales.csv', 'file', 'csv'],
      ['model.xlsx', 'file', 'xls'],
      ['starter.zip', 'file', 'zip'],
      ['app.py', 'file', 'source'],
      ['mockup.fig', 'file', 'design'],
    ])('labels %s as %s → %s', (name, category, type) => {
      expect(
        resourceTypeFor({
          category,
          storageKey: `k/${name}`,
          driveFileName: name,
        }),
      ).toBe(type);
    });
  });

  // ── Incremental append into an existing course ──────────────────────────

  describe('appending a later batch', () => {
    function importWithCourse(lessonOverrides: Record<string, unknown> = {}) {
      return baseImport({
        status: 'COURSE_CREATED',
        createdCourseId: 'course-1',
        modules: [
          {
            id: 'module-1',
            title: 'Course',
            orderIndex: 0,
            createdSectionId: 'section-1',
            lessons: [
              {
                id: 'lesson-already',
                title: 'Already Added',
                status: 'GENERATED',
                description: 'd',
                learnBlocks: [
                  { type: 'videoUrl', value: 'https://cdn.example/a.mp4' },
                ],
                applyBlocks: applyBlocks(),
                reflectBlocks: [{ type: 'reflectActivity', value: {} }],
                deepenBlocks: [{ type: 'deepenActivity', value: {} }],
                resourceFileIds: [],
                createdLessonId: 'real-lesson-already',
              },
              {
                id: 'lesson-new',
                title: 'Newly Finished',
                status: 'GENERATED',
                description: 'd',
                learnBlocks: [
                  { type: 'videoUrl', value: 'https://cdn.example/b.mp4' },
                ],
                applyBlocks: applyBlocks(),
                reflectBlocks: [{ type: 'reflectActivity', value: {} }],
                deepenBlocks: [{ type: 'deepenActivity', value: {} }],
                resourceFileIds: [],
                createdLessonId: null,
                ...lessonOverrides,
              },
            ],
          },
        ],
      });
    }

    it('never creates a second course for the same import', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: false,
      });
      courseCreation.createLessonWithContent.mockResolvedValue({
        lessonId: 'real-lesson-new',
        title: 'Newly Finished',
        status: 'created',
      });

      const result = await service.createCourse(user, importId, baseInput);

      expect(courseCreation.createFullCourseTree).not.toHaveBeenCalled();
      expect(result).toMatchObject({ courseId: 'course-1', appended: true });
    });

    it('adds only lessons that were not already written, so a retry cannot duplicate', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: false,
      });
      courseCreation.createLessonWithContent.mockResolvedValue({
        lessonId: 'real-lesson-new',
        title: 'Newly Finished',
        status: 'created',
      });

      await service.createCourse(user, importId, baseInput);

      expect(courseCreation.createLessonWithContent).toHaveBeenCalledTimes(1);
      expect(courseCreation.createLessonWithContent).toHaveBeenCalledWith(
        userId,
        'section-1',
        user,
        expect.objectContaining({ title: 'Newly Finished' }),
      );
    });

    it('adds into the existing section by id, never by matching its title', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: false,
      });
      courseCreation.createLessonWithContent.mockResolvedValue({
        lessonId: 'real-lesson-new',
        title: 'Newly Finished',
        status: 'created',
      });

      await service.createCourse(user, importId, baseInput);

      // Creating a section again would fork a duplicate the moment anyone
      // renamed it in Course Builder.
      expect(courseCreation.createModuleWithLessons).not.toHaveBeenCalled();
    });

    // The safety property that protects learners: a live course must not
    // gain visible lessons that no human has reviewed.
    it('adds lessons as DRAFTS when the course is already published', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: true,
      });
      courseCreation.createLessonWithContent.mockResolvedValue({
        lessonId: 'real-lesson-new',
        title: 'Newly Finished',
        status: 'created',
      });

      await service.createCourse(user, importId, baseInput);

      expect(courseCreation.createLessonWithContent).toHaveBeenCalledWith(
        userId,
        'section-1',
        user,
        expect.objectContaining({
          content: expect.objectContaining({ publish: false }),
        }),
      );
    });

    it('publishes added lessons only while the course is still a draft', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: false,
      });
      courseCreation.createLessonWithContent.mockResolvedValue({
        lessonId: 'real-lesson-new',
        title: 'Newly Finished',
        status: 'created',
      });

      await service.createCourse(user, importId, baseInput);

      expect(courseCreation.createLessonWithContent).toHaveBeenCalledWith(
        userId,
        'section-1',
        user,
        expect.objectContaining({
          content: expect.objectContaining({ publish: true }),
        }),
      );
    });

    it('records the new lesson link so the next append skips it too', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: true,
      });
      courseCreation.createLessonWithContent.mockResolvedValue({
        lessonId: 'real-lesson-new',
        title: 'Newly Finished',
        status: 'created',
      });

      await service.createCourse(user, importId, baseInput);

      expect(prisma.courseImportLesson.update).toHaveBeenCalledWith({
        where: { id: 'lesson-new' },
        data: {
          createdLessonId: 'real-lesson-new',
          addedToCourseAt: expect.any(Date),
        },
      });
    });

    it('says so plainly when there is nothing new to add yet', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importWithCourse({ createdLessonId: 'real-lesson-new' }),
      );
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: true,
      });

      await expect(
        service.createCourse(user, importId, baseInput),
      ).rejects.toThrow('already in the course');
    });

    it('withholds a still-invalid lesson from a live course', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(
        importWithCourse({ applyBlocks: applyBlocks(2) }),
      );
      prisma.course.findUnique.mockResolvedValue({
        id: 'course-1',
        published: true,
      });

      await expect(
        service.createCourse(user, importId, baseInput),
      ).rejects.toThrow('already in the course');
      expect(courseCreation.createLessonWithContent).not.toHaveBeenCalled();
    });

    // Ordering invariant, easy to reverse without noticing. The course row
    // exists before anything links it back to the import; if that link is
    // written last and the process dies in between, a retry sees "no course
    // yet" and builds a whole second course. Claiming the id first means the
    // worst case is a retry that fills in missing lesson links instead.
    it('records the course id before the per-lesson links', async () => {
      const order: string[] = [];
      prisma.courseImport.findFirst.mockResolvedValue(baseImport());
      prisma.courseImport.update.mockImplementation(() => {
        order.push('courseId');
        return Promise.resolve({});
      });
      prisma.courseImportLesson.update.mockImplementation(() => {
        order.push('lessonLink');
        return Promise.resolve({});
      });
      courseCreation.createFullCourseTree.mockResolvedValue({
        courseId: 'course-1',
        status: 'created',
        sections: [
          {
            sectionId: 'section-1',
            title: 'Stick Figure Animation Course',
            status: 'created',
            lessons: [
              { lessonId: 'real-1', title: 'Symbols', status: 'created' },
            ],
          },
        ],
      });

      await service.createCourse(user, importId, baseInput);

      expect(order[0]).toBe('courseId');
      expect(order).toContain('lessonLink');
    });

    it('fails clearly if the course it created has since been deleted', async () => {
      prisma.courseImport.findFirst.mockResolvedValue(importWithCourse());
      prisma.course.findUnique.mockResolvedValue(null);

      await expect(
        service.createCourse(user, importId, baseInput),
      ).rejects.toThrow('no longer exists');
    });
  });
});
