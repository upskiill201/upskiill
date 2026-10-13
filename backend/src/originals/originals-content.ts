import { createHash } from 'crypto';
import type {
  AuthoredCard,
  AuthoredExercise,
  OriginalLesson,
  OriginalLevel,
  OriginalTrackDef,
  OriginalUnit,
} from './originals-authoring.types';

/**
 * Turns a written Original (originals-authoring.types.ts) into exactly what
 * the lesson player reads (`Lesson.contentBlocks`, the same block shapes the
 * course importer writes — course-import/rich-lesson.ts).
 *
 * Every id is derived from the file's stable keys, so loading the same file
 * twice produces the same rows: learner progress (completedLessons holds
 * lesson ids) survives every edit except renaming a key.
 */

/** A UUID-shaped id derived from a name (sha1, v5 layout). */
export function stableId(name: string): string {
  const h = createHash('sha1').update(`teyro-originals:${name}`).digest('hex');
  const variant = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${variant}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

/** The names every id is derived from. */
export const keys = {
  track: (t: OriginalTrackDef) => `track:${t.slug}`,
  course: (t: OriginalTrackDef, l: OriginalLevel) => `course:${t.slug}:${l.level}`,
  unit: (t: OriginalTrackDef, l: OriginalLevel, u: OriginalUnit) => `unit:${t.slug}:${l.level}:${u.key}`,
  lesson: (t: OriginalTrackDef, l: OriginalLevel, u: OriginalUnit, lesson: OriginalLesson) =>
    `lesson:${t.slug}:${l.level}:${u.key}:${lesson.key}`,
};

/** Short, readable ids for cards/exercises/options inside one lesson. */
function localId(lessonKey: string, part: string): string {
  return `${part}_${createHash('sha1').update(`${lessonKey}:${part}`).digest('hex').slice(0, 10)}`;
}

export function buildCard(card: AuthoredCard, lessonKey: string, i: number): Record<string, unknown> {
  const id = localId(lessonKey, `c${i}`);
  if (card.kind === 'check') {
    const { answer, ...rest } = card;
    return { id, ...rest, correctIndex: answer };
  }
  return { id, ...card };
}

export function buildExercise(ex: AuthoredExercise, lessonKey: string, i: number): Record<string, unknown> {
  const id = localId(lessonKey, `e${i}`);
  const optionsOf = (options: { text: string; why?: string }[]) =>
    options.map((o, j) => ({
      id: localId(lessonKey, `e${i}o${j}`),
      text: o.text,
      ...(o.why ? { misconception: o.why } : {}),
    }));
  const base = { id, prompt: ex.prompt, ...(ex.explanation ? { explanation: ex.explanation } : {}) };

  switch (ex.kind) {
    case 'mcq': {
      const options = optionsOf(ex.options);
      return {
        ...base,
        kind: 'mcq',
        variant: ex.variant ?? 'standard',
        ...(ex.code ? { code: ex.code, language: ex.language ?? 'plaintext' } : {}),
        options,
        correctOptionId: options[ex.answer]?.id ?? '',
      };
    }
    case 'chatReply': {
      const options = optionsOf(ex.options);
      return {
        ...base,
        kind: 'mcq',
        variant: 'chat',
        character: ex.from,
        message: ex.message,
        options,
        correctOptionId: options[ex.answer]?.id ?? '',
      };
    }
    case 'fillBlank':
      return {
        ...base,
        kind: 'fillBlank',
        ...(ex.language ? { language: ex.language } : {}),
        template: ex.template,
        blanks: ex.blanks.map((answers, j) => ({ id: localId(lessonKey, `e${i}b${j}`), answers })),
        distractors: ex.distractors ?? [],
      };
    case 'findBug':
      return {
        ...base,
        kind: 'findBug',
        ...(ex.language ? { language: ex.language } : {}),
        lines: ex.lines,
        bugLine: ex.bug,
        ...(ex.fix ? { fix: ex.fix } : {}),
      };
    case 'orderLines':
      return { ...base, kind: 'orderLines', ...(ex.language ? { language: ex.language } : {}), lines: ex.lines };
    case 'matchPairs':
      return {
        ...base,
        kind: 'matchPairs',
        pairs: ex.pairs.map(([left, right], j) => ({ id: localId(lessonKey, `e${i}p${j}`), left, right })),
      };
    case 'tapBuild':
      return {
        ...base,
        kind: 'tapBuild',
        ...(ex.language ? { language: ex.language } : {}),
        tiles: ex.tiles,
        distractors: ex.distractors ?? [],
      };
    case 'typeAnswer':
      return { ...base, kind: 'typeAnswer', answers: ex.answers, ...(ex.placeholder ? { placeholder: ex.placeholder } : {}) };
    case 'sortGroups': {
      const groups = ex.groups.map((label, j) => ({ id: localId(lessonKey, `e${i}g${j}`), label }));
      return {
        ...base,
        kind: 'sortGroups',
        groups,
        items: ex.items.map((it, j) => ({
          id: localId(lessonKey, `e${i}i${j}`),
          text: it.text,
          groupId: groups[it.group]?.id ?? '',
        })),
      };
    }
  }
}

/** `Lesson.contentBlocks` for one written lesson. */
export function buildContentBlocks(lesson: OriginalLesson, lessonKey: string) {
  return {
    learn: [
      { type: 'learnCards', value: lesson.learn.map((c, i) => buildCard(c, lessonKey, i)) },
      { type: 'whatYouWillLearn', value: lesson.outcomes },
    ],
    apply: [
      {
        type: 'exercises',
        value: {
          scenario: lesson.apply.scenario ?? '',
          items: lesson.apply.items.map((e, i) => buildExercise(e, lessonKey, i)),
        },
      },
    ],
    reflect: [
      {
        type: 'reflectActivity',
        value: {
          prompt: lesson.reflect.prompt,
          type: 'open',
          openConfig: {
            useStarters: (lesson.reflect.starters?.length ?? 0) > 0,
            starters: lesson.reflect.starters ?? [],
            minWordCount: 20,
            required: true,
            peerVisibility: false,
            allowComments: false,
            allowAttachments: false,
          },
          guidedConfig: { questions: [], minWordCountPerQuestion: 10, required: true, allowAttachments: false },
        },
      },
    ],
    deepen: [
      {
        type: 'deepenActivity',
        value: {
          collectionTitle: lesson.deepen?.title ?? 'Go deeper',
          collectionDescription: lesson.deepen?.summary ?? 'Take this lesson one step further.',
          resourceSettings: { makeRequired: false, trackCompletion: false, allowDownloads: true, openInNewTab: true },
          recommendedNextStep: { type: 'continue' },
          showLearningPathSuggestions: false,
          learningPathSuggestions: [],
        },
      },
    ],
  };
}

/** XP for a lesson: authored, or 10 (20 for a Checkpoint / Unit Challenge). */
export function lessonXp(lesson: OriginalLesson): number {
  return lesson.xp ?? (lesson.milestone ? 20 : 10);
}
