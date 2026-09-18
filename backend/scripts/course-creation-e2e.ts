/**
 * End-to-end proof for CourseCreationService (AI Course Importer, Phase 1)
 * against the REAL database .env points at — not mocks. Follows the pattern
 * of scripts/tey-e2e.ts / scripts/shop-smoke.ts: boots the real Nest app,
 * exercises real services, creates a throwaway instructor to own the course.
 *
 * Builds a full course tree (course -> 2 modules -> 3 lessons) using nothing
 * but CourseCreationService's public API — the exact same CourseService /
 * LessonService the manual Course Builder's controllers call underneath, so
 * this proves an imported course is indistinguishable from a manual one.
 * One lesson ("Posting Cadence") is deliberately left with no content, to
 * prove partial/incomplete work is reported honestly rather than silently
 * marked done.
 *
 * Run:  npx ts-node scripts/course-creation-e2e.ts [--cleanup]
 *
 * By default the created course is left in place so you can open it in the
 * real Course Builder / Admin Center and see it render like a manually
 * built course. Pass --cleanup to delete the course (and the throwaway
 * instructor) automatically once the checks finish.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { CourseCreationService } from '../src/course-creation/course-creation.service';
import {
  CourseTreeResult,
  CourseTreeSpec,
} from '../src/course-creation/course-creation.types';

const ok = (label: string, pass: boolean, detail = '') => {
  console.log(
    `${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`,
  );
  if (!pass) process.exitCode = 1;
};

function buildSpec(): CourseTreeSpec {
  return {
    course: {
      title: `[E2E] How to Create Great Content ${Date.now()}`,
      category: 'Marketing',
    },
    sections: [
      {
        title: 'Getting Started',
        lessons: [
          {
            title: 'Writing Hooks',
            content: {
              description:
                'Why hooks matter and how to write one that stops the scroll.',
              learnBlocks: [
                {
                  type: 'videoUrl',
                  value: 'https://pub-xyz.r2.dev/lessons/hook.mp4',
                },
                {
                  type: 'text',
                  value: 'A hook is the first 3 seconds of your video.',
                },
                {
                  type: 'whatYouWillLearn',
                  value: ['Write a scroll-stopping hook'],
                },
              ],
              applyBlocks: [
                {
                  type: 'mcqActivity',
                  value: {
                    scenario:
                      'You are opening a 30-second video about pricing.',
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
                          },
                          {
                            id: 'opt_b',
                            text: 'I lost $10,000 pricing this wrong. Here is the fix.',
                          },
                        ],
                        correctOptionId: 'opt_b',
                        explanation:
                          'Specific stakes create tension in the first second.',
                      },
                    ],
                  },
                },
              ],
              reflectBlocks: [
                {
                  type: 'reflectActivity',
                  value: {
                    prompt:
                      'Write a hook for your next video using what you learned.',
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
            },
            resources: [
              {
                type: 'pdf',
                title: 'Hook Cheat Sheet',
                storageUrl: 'https://pub-xyz.r2.dev/resources/hooks.pdf',
              },
            ],
          },
          {
            title: 'Editing Basics',
            content: {
              learnBlocks: [
                {
                  type: 'text',
                  value: 'Cut every 3-5 seconds to hold attention.',
                },
              ],
              applyBlocks: [
                {
                  type: 'mcqActivity',
                  value: {
                    scenario: 'A 60-second talking-head video.',
                    passingScore: 70,
                    allowRetries: true,
                    difficultyLevel: 'easy',
                    questions: [
                      {
                        id: 'q_1',
                        questionText: 'How often should you cut?',
                        options: [
                          { id: 'opt_a', text: 'Every 3-5 seconds' },
                          { id: 'opt_b', text: 'Never' },
                        ],
                        correctOptionId: 'opt_a',
                        explanation: 'Keeps pace with short attention spans.',
                      },
                    ],
                  },
                },
              ],
              reflectBlocks: [
                {
                  type: 'reflectActivity',
                  value: {
                    prompt: 'What is your biggest editing habit to fix?',
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
            },
          },
        ],
      },
      {
        title: 'Growth',
        // Deliberately no content — proves the engine reports an honest
        // "created but incomplete" state instead of pretending it's done.
        lessons: [{ title: 'Posting Cadence' }],
      },
    ],
  };
}

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });
  const prisma = app.get(PrismaService);
  const courseCreation = app.get(CourseCreationService);
  const cleanup = process.argv.includes('--cleanup');

  const email = `course-import-e2e-${Date.now()}@teyro.test`;
  const instructor = await prisma.user.create({
    data: {
      email,
      fullName: 'Course Import E2E',
      role: 'INSTRUCTOR',
      password: 'not-a-real-credential',
    },
  });

  let result: CourseTreeResult | undefined;
  try {
    result = await courseCreation.createFullCourseTree(
      instructor.id,
      { id: instructor.id, role: instructor.role },
      buildSpec(),
    );
    console.log(JSON.stringify(result, null, 2));

    ok('course created', result.status === 'created', result.error);
    ok(
      'module 1 ("Getting Started") created',
      result.sections[0]?.status === 'created',
    );
    ok(
      'both lessons in module 1 created',
      result.sections[0]?.lessons.every((l) => l.status === 'created'),
    );
    ok('module 2 ("Growth") created', result.sections[1]?.status === 'created');
    ok(
      'the deliberately empty lesson was still created (just left as a draft)',
      result.sections[1]?.lessons[0]?.status === 'created',
    );

    if (result.courseId) {
      const validation = await courseCreation.validateCourseDraft(
        instructor.id,
        result.courseId,
      );
      ok(
        'readiness check honestly reports NOT ready ("Posting Cadence" has no content, was never published)',
        validation.ready === false,
        JSON.stringify(validation.errors),
      );

      console.log(
        `\nOpen in Course Builder:  http://localhost:3000/creator/courses/${result.courseId}`,
      );
      console.log(
        `Open in Admin Center:    http://localhost:3000/admin/courses/${result.courseId}`,
      );
      console.log(`Throwaway instructor:    ${instructor.id} (${email})`);
    }
  } finally {
    if (cleanup) {
      if (result?.courseId)
        await prisma.course
          .delete({ where: { id: result.courseId } })
          .catch(() => undefined);
      await prisma.user
        .delete({ where: { id: instructor.id } })
        .catch(() => undefined);
      console.log('\nCleaned up course + throwaway instructor.');
    } else {
      console.log(
        '\nLeft in place for manual inspection. Re-run with --cleanup to delete the course and throwaway instructor automatically, or remove them yourself from the Admin Center once done.',
      );
    }
    await app.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
