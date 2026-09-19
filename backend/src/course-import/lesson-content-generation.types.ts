import { z } from 'zod';

/**
 * What the AI is actually asked to produce — deliberately narrow. Every
 * structural/preference field a real lesson's Apply/Reflect/Deepen blocks
 * carry (passingScore, allowRetries, openConfig toggles, resourceSettings,
 * ...) is an admin/product decision, not something the model has any basis
 * to invent, so it's never in this schema — mapToLessonBlocks() fills those
 * in with the same defaults the manual Lesson Builder's own UI starts from.
 * The model only ever supplies substance: description, learning outcomes,
 * question content, a reflection prompt, a deepen summary.
 */
export const AiLessonContentSchema = z.object({
  description: z
    .string()
    .trim()
    .min(20)
    .max(1000)
    .describe(
      "1-3 sentence Learn description in the instructor's own first-person voice.",
    ),
  whatYouWillLearn: z
    .array(z.string().trim().min(3).max(150))
    .min(2)
    .max(5)
    .describe(
      'Concrete outcomes a learner will be able to do after this lesson.',
    ),
  applyQuestions: z
    .array(
      z.object({
        questionText: z.string().trim().min(5).max(300),
        options: z.array(z.string().trim().min(1).max(150)).min(2).max(4),
        correctOptionIndex: z.number().int().min(0),
        explanation: z.string().trim().min(5).max(300),
      }),
    )
    .min(1)
    .max(3)
    .describe(
      'Practical/application questions grounded in the transcript — never generic trivia.',
    ),
  reflectPrompt: z
    .string()
    .trim()
    .min(10)
    .max(400)
    .describe(
      "Asks the learner to connect this lesson to their own situation — not 'what did you learn?'",
    ),
  deepenTitle: z.string().trim().min(3).max(100),
  deepenSummary: z
    .string()
    .trim()
    .min(10)
    .max(400)
    .describe('What the Deepen section extends beyond the core lesson.'),
});
export type AiLessonContent = z.infer<typeof AiLessonContentSchema>;

/** Hand-written JSON Schema alongside the Zod schema above (not auto-derived
 *  — same split TeyAiService's NUDGE_SCHEMA/NudgeCopySchema uses), since
 *  GeminiAdapter#toGeminiSchema needs a plain JSON-Schema object to send as
 *  responseSchema, not a Zod type. */
export const AI_LESSON_CONTENT_JSON_SCHEMA = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    whatYouWillLearn: { type: 'array', items: { type: 'string' } },
    applyQuestions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          questionText: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          correctOptionIndex: { type: 'integer' },
          explanation: { type: 'string' },
        },
        required: [
          'questionText',
          'options',
          'correctOptionIndex',
          'explanation',
        ],
      },
    },
    reflectPrompt: { type: 'string' },
    deepenTitle: { type: 'string' },
    deepenSummary: { type: 'string' },
  },
  required: [
    'description',
    'whatYouWillLearn',
    'applyQuestions',
    'reflectPrompt',
    'deepenTitle',
    'deepenSummary',
  ],
} as const;

export interface GeneratedLessonBlocks {
  description: string;
  learnBlocks: unknown[];
  applyBlocks: unknown[];
  reflectBlocks: unknown[];
  deepenBlocks: unknown[];
}

/** Maps the AI's narrow content into the exact block shapes the real Lesson
 *  Builder produces (verified live against production — see
 *  frontend/app/creator/courses/[id]/lesson-builder/[lessonId]/page.tsx's
 *  buildSavePayload()). An imported lesson must render identically to a
 *  manually authored one; this is the seam that guarantees it. */
export function mapToLessonBlocks(
  content: AiLessonContent,
  videoUrl: string,
): GeneratedLessonBlocks {
  const learnBlocks = [
    { type: 'videoUrl', value: videoUrl },
    { type: 'audioUrl', value: '' },
    { type: 'text', value: content.description },
    { type: 'whatYouWillLearn', value: content.whatYouWillLearn },
  ];

  const mcqActivity = {
    scenario: '',
    passingScore: 70,
    allowRetries: true,
    difficultyLevel: 'medium' as const,
    questions: content.applyQuestions.map((q, qi) => {
      const optionIds = q.options.map((_, oi) => `opt_${qi}_${oi}`);
      const correctIndex = Math.min(
        Math.max(q.correctOptionIndex, 0),
        q.options.length - 1,
      );
      return {
        id: `q_${qi}`,
        questionText: q.questionText,
        options: q.options.map((text, oi) => ({
          id: optionIds[oi],
          text,
          misconception: '',
        })),
        correctOptionId: optionIds[correctIndex],
        explanation: q.explanation,
      };
    }),
  };
  const applyBlocks = [{ type: 'mcqActivity', value: mcqActivity }];

  const reflectActivity = {
    prompt: content.reflectPrompt,
    type: 'open' as const,
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
  };
  const reflectBlocks = [{ type: 'reflectActivity', value: reflectActivity }];

  const deepenActivity = {
    collectionTitle: content.deepenTitle,
    collectionDescription: content.deepenSummary,
    resourceSettings: {
      makeRequired: false,
      trackCompletion: false,
      allowDownloads: true,
      openInNewTab: true,
    },
    recommendedNextStep: { type: 'continue' as const },
    showLearningPathSuggestions: false,
    learningPathSuggestions: [],
  };
  const deepenBlocks = [{ type: 'deepenActivity', value: deepenActivity }];

  return {
    description: content.description,
    learnBlocks,
    applyBlocks,
    reflectBlocks,
    deepenBlocks,
  };
}

export const COURSE_GENERATION_SYSTEM_PROMPT = `You are Teyro's Course Creation AI.

You turn an existing lesson video's transcript into a Teyro lesson's Apply, \
Reflect, and Deepen sections, plus a short Learn description.

Rules:
- The transcript is the ONLY source of truth. Never invent facts, examples, \
or claims the transcript does not support. If the transcript is too thin to \
write something concrete, keep questions/prompts general rather than making \
something up.
- Preserve the instructor's own voice. If they speak in first person \
("I'll show you..."), write in first person. Never write "the instructor \
says" or "the instructor shows you."
- Apply questions must test practical application of what THIS lesson \
taught, not generic trivia about the topic.
- The Reflect prompt must ask the learner to connect the lesson to their own \
situation, make a decision, or plan an action — never a generic "what did \
you learn today?"
- Deepen must extend this specific lesson (a related challenge, a deeper \
technique, a next step) — never generic "learn more" filler.
- Return ONLY the JSON object described by the schema. No prose, no markdown.`;
