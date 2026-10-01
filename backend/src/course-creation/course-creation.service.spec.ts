import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CourseCreationService } from './course-creation.service';
import { CourseService } from '../course/course.service';
import { LessonService } from '../lesson/lesson.service';
import { CourseTreeSpec, LessonContentInput } from './course-creation.types';

const user = { id: 'user-1', role: 'ADMIN' };

// A realistic Learn/Apply/Reflect/Deepen payload, matching the exact block
// shapes the production Lesson Builder sends (buildSavePayload() in
// app/creator/courses/[id]/lesson-builder/[lessonId]/page.tsx) so this test
// doubles as a check that the importer's output will render identically to
// a manually authored lesson.
const sampleContent: LessonContentInput = {
  description: 'Why hooks matter and how to write one that stops the scroll.',
  learnBlocks: [
    {
      type: 'videoUrl',
      value: 'https://pub-xyz.r2.dev/lessons/1/videos/hook.mp4',
    },
    { type: 'audioUrl', value: '' },
    { type: 'text', value: 'A hook is the first 3 seconds of your video.' },
    {
      type: 'whatYouWillLearn',
      value: [
        'Write a scroll-stopping hook',
        'Avoid the 3 most common openers',
      ],
    },
  ],
  applyBlocks: [
    {
      type: 'mcqActivity',
      value: {
        scenario: 'You are opening a 30-second video about pricing.',
        passingScore: 70,
        allowRetries: true,
        difficultyLevel: 'medium',
        questions: [
          {
            id: 'q_1',
            questionText: 'Which opener is the strongest hook?',
            options: [
              {
                id: 'opt_a',
                text: 'Hi everyone, today we will talk about pricing',
                misconception: 'Too slow, no tension.',
              },
              {
                id: 'opt_b',
                text: 'I lost $10,000 pricing this wrong. Here is the fix.',
                misconception: '',
              },
            ],
            correctOptionId: 'opt_b',
            explanation: 'Specific stakes create tension in the first second.',
          },
        ],
      },
    },
  ],
  reflectBlocks: [
    {
      type: 'reflectActivity',
      value: {
        prompt: 'Write a hook for your next video using what you learned.',
        type: 'open',
        openConfig: {
          useStarters: false,
          starters: [],
          minWordCount: 20,
          required: true,
          peerVisibility: false,
          allowComments: false,
          allowAttachments: false,
        },
        guidedConfig: {
          questions: [],
          minWordCountPerQuestion: 10,
          required: true,
          allowAttachments: false,
        },
      },
    },
  ],
  deepenBlocks: [
    {
      type: 'deepenActivity',
      value: {
        collectionTitle: 'Hook templates',
        collectionDescription: '10 proven openers you can adapt.',
        resourceSettings: {
          makeRequired: false,
          trackCompletion: false,
          allowDownloads: true,
          openInNewTab: true,
        },
        recommendedNextStep: { type: 'continue' },
        showLearningPathSuggestions: false,
        learningPathSuggestions: [],
      },
    },
  ],
};

describe('CourseCreationService', () => {
  let service: CourseCreationService;
  let courseService: {
    createCourse: jest.Mock;
    createSection: jest.Mock;
    createLesson: jest.Mock;
    getFullCurriculum: jest.Mock;
    publishCourse: jest.Mock;
    updateCourse: jest.Mock;
  };
  let lessonService: {
    fullSave: jest.Mock;
    fullSaveAndPublish: jest.Mock;
    addLessonResource: jest.Mock;
  };

  beforeEach(async () => {
    courseService = {
      createCourse: jest.fn(),
      createSection: jest.fn(),
      createLesson: jest.fn(),
      getFullCurriculum: jest.fn(),
      // Not used by this service — present so the draft-only test can assert
      // it is never reached, rather than passing only because the mock
      // happens to lack the method.
      publishCourse: jest.fn(),
      updateCourse: jest.fn(),
    };
    lessonService = {
      fullSave: jest.fn(),
      fullSaveAndPublish: jest.fn(),
      addLessonResource: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseCreationService,
        { provide: CourseService, useValue: courseService },
        { provide: LessonService, useValue: lessonService },
      ],
    }).compile();

    service = module.get(CourseCreationService);
  });

  describe('attachLessonContent', () => {
    it('publishes by default via fullSaveAndPublish, deriving completion flags from block presence', async () => {
      lessonService.fullSaveAndPublish.mockResolvedValue({
        ok: true,
        lesson: { id: 'lesson-1', version: 2, status: 'published' },
      });

      await service.attachLessonContent('lesson-1', 1, sampleContent, user);

      expect(lessonService.fullSaveAndPublish).toHaveBeenCalledWith(
        'lesson-1',
        expect.objectContaining({
          learnBlocks: sampleContent.learnBlocks,
          applyBlocks: sampleContent.applyBlocks,
          reflectBlocks: sampleContent.reflectBlocks,
          deepenBlocks: sampleContent.deepenBlocks,
          isLearnCompleted: true,
          isApplyCompleted: true,
          isReflectCompleted: true,
          isDeepenCompleted: true,
          version: 1,
        }),
        user,
      );
      expect(lessonService.fullSave).not.toHaveBeenCalled();
    });

    it('calls fullSave (draft, no publish) when publish is explicitly false', async () => {
      lessonService.fullSave.mockResolvedValue({ ok: true, version: 2 });

      await service.attachLessonContent(
        'lesson-1',
        1,
        { ...sampleContent, publish: false },
        user,
      );

      expect(lessonService.fullSave).toHaveBeenCalledWith(
        'lesson-1',
        expect.objectContaining({ version: 1 }),
        user,
      );
      expect(lessonService.fullSaveAndPublish).not.toHaveBeenCalled();
    });

    it('marks a phase incomplete when its blocks are empty, rather than assuming completion', async () => {
      lessonService.fullSaveAndPublish.mockResolvedValue({
        ok: true,
        lesson: {},
      });

      await service.attachLessonContent(
        'lesson-1',
        1,
        { learnBlocks: sampleContent.learnBlocks },
        user,
      );

      expect(lessonService.fullSaveAndPublish).toHaveBeenCalledWith(
        'lesson-1',
        expect.objectContaining({
          isLearnCompleted: true,
          isApplyCompleted: false,
          isReflectCompleted: false,
          isDeepenCompleted: false,
        }),
        user,
      );
    });
  });

  describe('validateCourseDraft', () => {
    it('reports not-ready with the underlying readiness errors when a lesson is still draft', async () => {
      courseService.getFullCurriculum.mockResolvedValue([
        {
          title: 'Module 1',
          lessons: [{ title: 'Lesson 1', status: 'draft' }],
        },
      ]);

      const result = await service.validateCourseDraft('user-1', 'course-1');

      expect(result.ready).toBe(false);
      expect(result.errors).toEqual([
        'Lesson "Lesson 1" is still a draft. Open it in the Lesson Builder and publish it first.',
      ]);
    });

    it('reports ready when every lesson in every module is published', async () => {
      courseService.getFullCurriculum.mockResolvedValue([
        {
          title: 'Module 1',
          lessons: [{ title: 'Lesson 1', status: 'published' }],
        },
      ]);

      const result = await service.validateCourseDraft('user-1', 'course-1');

      expect(result).toEqual({ ready: true, errors: [] });
    });
  });

  describe('createFullCourseTree', () => {
    const spec: CourseTreeSpec = {
      course: { title: 'How to Create Great Content', category: 'Marketing' },
      sections: [
        {
          title: 'Getting Started',
          lessons: [
            {
              title: 'Writing Hooks',
              content: sampleContent,
              resources: [
                {
                  type: 'pdf',
                  title: 'Cheat sheet',
                  storageUrl: 'https://r2/cheat.pdf',
                },
              ],
            },
            { title: 'Editing Basics', content: sampleContent },
          ],
        },
      ],
    };

    beforeEach(() => {
      courseService.createCourse.mockResolvedValue({ id: 'course-1' });
      courseService.createSection.mockResolvedValue({ id: 'section-1' });
      courseService.createLesson
        .mockResolvedValueOnce({ id: 'lesson-1', version: 1 })
        .mockResolvedValueOnce({ id: 'lesson-2', version: 1 });
      lessonService.addLessonResource.mockResolvedValue({ id: 'resource-1' });
      lessonService.fullSaveAndPublish.mockResolvedValue({
        ok: true,
        lesson: { status: 'published' },
      });
    });

    it('builds the full tree end to end: course -> module -> lessons -> content -> resources', async () => {
      const result = await service.createFullCourseTree('user-1', user, spec);

      expect(result).toEqual({
        courseId: 'course-1',
        status: 'created',
        sections: [
          {
            sectionId: 'section-1',
            title: 'Getting Started',
            status: 'created',
            lessons: [
              {
                lessonId: 'lesson-1',
                title: 'Writing Hooks',
                status: 'created',
              },
              {
                lessonId: 'lesson-2',
                title: 'Editing Basics',
                status: 'created',
              },
            ],
          },
        ],
      });

      expect(courseService.createCourse).toHaveBeenCalledWith(
        'user-1',
        spec.course,
      );

      // Hard product rule: programmatic creation produces a DRAFT and
      // nothing else. Publishing stays a deliberate human action through
      // the existing review workflow, so this service must never reach for
      // it — no matter how complete the generated content looks.
      expect(courseService.publishCourse).not.toHaveBeenCalled();
      expect(courseService.createCourse).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ published: true }),
      );
      expect(courseService.createCourse).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ reviewStatus: expect.anything() }),
      );
      // Lessons DO get published inside that draft — a draft course whose
      // lessons sat in 'draft' would render empty in the player once the
      // course is later approved. Course-level and lesson-level publishing
      // are different things; only the former is forbidden here.
      expect(lessonService.fullSaveAndPublish).toHaveBeenCalled();
      expect(courseService.createSection).toHaveBeenCalledWith(
        'user-1',
        'course-1',
        'Getting Started',
        undefined,
      );
      expect(courseService.createLesson).toHaveBeenCalledTimes(2);
      expect(lessonService.addLessonResource).toHaveBeenCalledWith(
        'lesson-1',
        spec.sections[0].lessons[0].resources![0],
        user,
      );
      expect(lessonService.fullSaveAndPublish).toHaveBeenCalledTimes(2);
    });

    it('isolates a single failed lesson: siblings still succeed, course/module are not rolled back', async () => {
      lessonService.fullSaveAndPublish
        .mockResolvedValueOnce({ ok: true, lesson: { status: 'published' } })
        .mockRejectedValueOnce(
          new ConflictException('This lesson was modified by another session.'),
        );

      const result = await service.createFullCourseTree('user-1', user, spec);

      expect(result.status).toBe('created');
      expect(result.sections[0].status).toBe('created');
      expect(result.sections[0].lessons[0]).toEqual({
        lessonId: 'lesson-1',
        title: 'Writing Hooks',
        status: 'created',
      });
      expect(result.sections[0].lessons[1]).toEqual({
        lessonId: 'lesson-2',
        title: 'Editing Basics',
        status: 'failed',
        error: 'This lesson was modified by another session.',
      });
      // The row exists even though its content save failed — a retry must
      // reattach content to lesson-2, not recreate the lesson.
    });

    it('isolates a failed module: its lessons are skipped (never attempted), other modules are unaffected', async () => {
      const twoSectionSpec: CourseTreeSpec = {
        course: spec.course,
        sections: [
          { title: 'Broken Module', lessons: [{ title: 'Orphaned Lesson' }] },
          { title: 'Getting Started', lessons: spec.sections[0].lessons },
        ],
      };
      courseService.createSection
        .mockRejectedValueOnce(new Error('Module title is required'))
        .mockResolvedValueOnce({ id: 'section-2' });

      const result = await service.createFullCourseTree(
        'user-1',
        user,
        twoSectionSpec,
      );

      expect(result.sections[0]).toEqual({
        title: 'Broken Module',
        status: 'failed',
        error: 'Module title is required',
        lessons: [
          {
            title: 'Orphaned Lesson',
            status: 'failed',
            error: 'Skipped: module creation failed',
          },
        ],
      });
      expect(result.sections[1].status).toBe('created');
      // The broken module's lesson must never reach createLesson.
      expect(courseService.createLesson).toHaveBeenCalledTimes(2);
      expect(courseService.createLesson).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        'Orphaned Lesson',
        undefined,
      );
    });

    it('fails the whole run only when course creation itself fails, before any section/lesson is attempted', async () => {
      courseService.createCourse.mockRejectedValue(new Error('slug clash'));

      const result = await service.createFullCourseTree('user-1', user, spec);

      expect(result).toEqual({
        status: 'failed',
        error: 'slug clash',
        sections: [],
      });
      expect(courseService.createSection).not.toHaveBeenCalled();
      expect(courseService.createLesson).not.toHaveBeenCalled();
    });
  });
});
