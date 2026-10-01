import { z } from 'zod';

/** Hard product rule: every lesson's Apply step carries 5-15 questions.
 *  Declared once and referenced by all three places that must agree — the
 *  Zod schema (what we validate), the JSON Schema (what the model is told),
 *  and the system prompt (what the model is asked in prose). Those three
 *  drifting apart is not hypothetical: `maxItems` missing from the JSON
 *  Schema is exactly why Groq once returned 6 whatYouWillLearn items
 *  against a Zod max of 5. */
export const APPLY_QUESTIONS_MIN = 5;
export const APPLY_QUESTIONS_MAX = 15;

/** Same reasoning as the Apply bounds above, and learned the same way: a
 *  live run returned 6 outcomes against a JSON-Schema `maxItems: 5`,
 *  because an OpenAI-compatible provider in json_object mode treats the
 *  schema as a shape hint, not a contract. Every array bound the model has
 *  to respect must also be stated in prose in the system prompt. */
export const WHAT_YOU_WILL_LEARN_MIN = 2;
export const WHAT_YOU_WILL_LEARN_MAX = 5;

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
    .min(WHAT_YOU_WILL_LEARN_MIN)
    .max(WHAT_YOU_WILL_LEARN_MAX)
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
    .min(APPLY_QUESTIONS_MIN)
    .max(APPLY_QUESTIONS_MAX)
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
 *  responseSchema, not a Zod type.
 *
 *  Every bound here (minLength/maxLength/minItems/maxItems) must mirror the
 *  Zod schema's own min()/max() calls exactly — this is the only copy of
 *  those numbers a model actually reads. Confirmed live: without
 *  `maxItems: 5` here, Groq had no reason not to return 6 whatYouWillLearn
 *  items, which then failed our own stricter Zod validation on a field
 *  the model was never told had a limit. A `type`-only schema tells a
 *  provider "produce valid JSON," not "produce JSON that will pass our
 *  validation" — those aren't the same ask. */
export const AI_LESSON_CONTENT_JSON_SCHEMA = {
  type: 'object',
  properties: {
    description: { type: 'string', minLength: 20, maxLength: 1000 },
    whatYouWillLearn: {
      type: 'array',
      items: { type: 'string', minLength: 3, maxLength: 150 },
      minItems: WHAT_YOU_WILL_LEARN_MIN,
      maxItems: WHAT_YOU_WILL_LEARN_MAX,
    },
    applyQuestions: {
      type: 'array',
      minItems: APPLY_QUESTIONS_MIN,
      maxItems: APPLY_QUESTIONS_MAX,
      items: {
        type: 'object',
        properties: {
          questionText: { type: 'string', minLength: 5, maxLength: 300 },
          options: {
            type: 'array',
            items: { type: 'string', minLength: 1, maxLength: 150 },
            minItems: 2,
            maxItems: 4,
          },
          correctOptionIndex: { type: 'integer', minimum: 0 },
          explanation: { type: 'string', minLength: 5, maxLength: 300 },
        },
        required: [
          'questionText',
          'options',
          'correctOptionIndex',
          'explanation',
        ],
      },
    },
    reflectPrompt: { type: 'string', minLength: 10, maxLength: 400 },
    deepenTitle: { type: 'string', minLength: 3, maxLength: 100 },
    deepenSummary: { type: 'string', minLength: 10, maxLength: 400 },
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

/**
 * The top-level string limits, written out for the prompt and derived from
 * the JSON Schema rather than retyped.
 *
 * The array bounds above had to be stated in prose because an
 * OpenAI-compatible provider in json_object mode treats the schema as a
 * hint. String `maxLength` behaves exactly the same way — a live run failed
 * with SCHEMA_MISMATCH:reflectPrompt because the model wrote a reflection
 * prompt longer than its 400-character limit, which the schema stated and
 * the prompt did not. Generating this from the schema means a future field
 * cannot be added to one without the other.
 */
const STRING_LENGTH_RULE = Object.entries(
  AI_LESSON_CONTENT_JSON_SCHEMA.properties,
)
  .filter(
    ([, schema]) =>
      (schema as { type?: string }).type === 'string' &&
      (schema as { maxLength?: number }).maxLength !== undefined,
  )
  .map(([field, schema]) => {
    const { minLength, maxLength } = schema as {
      minLength: number;
      maxLength: number;
    };
    return `${field} ${minLength}-${maxLength} characters`;
  })
  .join('; ');

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
- Length limits are hard. Every one of these is rejected if exceeded, so \
write to fit rather than trusting a long answer to be trimmed: \
${STRING_LENGTH_RULE}
- Give between ${WHAT_YOU_WILL_LEARN_MIN} and ${WHAT_YOU_WILL_LEARN_MAX} \
whatYouWillLearn outcomes. Never more than ${WHAT_YOU_WILL_LEARN_MAX}; pick \
the most important ones rather than listing everything.
- Generate between ${APPLY_QUESTIONS_MIN} and ${APPLY_QUESTIONS_MAX} Apply \
questions. Never fewer than ${APPLY_QUESTIONS_MIN}, never more than \
${APPLY_QUESTIONS_MAX}. If the transcript is thin, write broader questions \
about what it does cover rather than dropping below ${APPLY_QUESTIONS_MIN}.
- Apply questions must test practical application of what THIS lesson \
taught, not generic trivia about the topic.
- Every Apply question must be distinct. Never ask the same fact twice in \
different words, and never ask about material the transcript never covers.
- Exactly one option per question is correct. The wrong options must be \
plausible but unambiguously wrong — never two defensible answers, never a \
trick question, never "all of the above".
- The Reflect prompt must ask the learner to connect the lesson to their own \
situation, make a decision, or plan an action — never a generic "what did \
you learn today?"
- Deepen must extend this specific lesson (a related challenge, a deeper \
technique, a next step) — never generic "learn more" filler.
- Return ONLY the JSON object described by the schema. No prose, no markdown.`;
