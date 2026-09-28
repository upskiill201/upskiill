/**
 * Two complete v2 lessons — one Coding, one AI — that exercise every Learn
 * card and every exercise kind. Used by /dev/lesson-blocks, and as the
 * examples the lesson builder can show creators.
 */

import type { ApplyContent, LearnCard } from './blocks';

export interface SampleLesson {
  id: string;
  title: string;
  description: string;
  contentBlocks: Record<string, unknown>;
  resources: never[];
}

function lesson(id: string, title: string, cards: LearnCard[], apply: ApplyContent, reflectPrompt: string): SampleLesson {
  return {
    id,
    title,
    description: '',
    resources: [],
    contentBlocks: {
      learn: [
        { type: 'whatYouWillLearn', value: [] },
        { type: 'learnCards', value: cards },
      ],
      apply: [{ type: 'exercises', value: apply }],
      reflect: [{ type: 'reflectActivity', value: { prompt: reflectPrompt, type: 'open', openConfig: { minWordCount: 10 } } }],
      deepen: [],
    },
  };
}

export const SAMPLE_CODING_LESSON = lesson(
  'sample-coding',
  'Variables in JavaScript',
  [
    { id: 'c1', kind: 'text', html: '<h2>A box with a name</h2><p>A <strong>variable</strong> stores a value so you can use it later. You give it a name, and JavaScript remembers what is inside.</p>' },
    { id: 'c2', kind: 'code', language: 'javascript', code: "let score = 10;\nscore = score + 5;\nconsole.log(score); // 15", caption: 'let makes a variable you can change.' },
    { id: 'c3', kind: 'callout', tone: 'tip', text: 'Use const when the value never changes, and let when it does.' },
    { id: 'c4', kind: 'check', question: 'Which keyword makes a variable you can change later?', options: ['const', 'let'], correctIndex: 1, explanation: 'let can be reassigned; const cannot.' },
  ],
  {
    scenario: 'You are building a game score counter.',
    items: [
      {
        id: 'e1',
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'let lives = 3;\nlives = lives - 1;\nconsole.log(lives);',
        language: 'javascript',
        options: [
          { id: 'a', text: '3' },
          { id: 'b', text: '2', },
          { id: 'c', text: 'lives - 1', misconception: 'The expression is worked out before it is stored.' },
        ],
        correctOptionId: 'b',
        explanation: 'lives starts at 3, then becomes 3 - 1 = 2.',
      },
      {
        id: 'e2',
        kind: 'fillBlank',
        prompt: 'Complete the code so it prints the name.',
        language: 'javascript',
        template: '[[1]] name = "Ada";\nconsole.[[2]](name);',
        blanks: [
          { id: 'b1', answers: ['const', 'let'] },
          { id: 'b2', answers: ['log'] },
        ],
        distractors: ['print', 'var name'],
      },
      {
        id: 'e3',
        kind: 'findBug',
        prompt: 'One line breaks this code. Which one?',
        language: 'javascript',
        lines: ['const total = 10;', 'total = total + 1;', 'console.log(total);'],
        bugLine: 1,
        fix: 'let total = 10; // then total can change',
        explanation: 'A const can never be reassigned.',
      },
      {
        id: 'e4',
        kind: 'orderLines',
        prompt: 'Put the code in order so it prints 20.',
        language: 'javascript',
        lines: ['let price = 10;', 'price = price * 2;', 'console.log(price);'],
      },
      {
        id: 'e5',
        kind: 'matchPairs',
        prompt: 'Match each keyword to what it does.',
        pairs: [
          { id: 'p1', left: 'let', right: 'A variable that can change' },
          { id: 'p2', left: 'const', right: 'A value that stays the same' },
          { id: 'p3', left: 'console.log', right: 'Prints to the console' },
        ],
      },
    ],
  },
  'Where in an app you use would a variable change over time?',
);

export const SAMPLE_AI_LESSON = lesson(
  'sample-ai',
  'Writing a clear prompt',
  [
    { id: 'a1', kind: 'text', html: '<h2>Say exactly what you want</h2><p>An AI model only knows what you tell it. A good prompt says <strong>who</strong> the answer is for, <strong>what</strong> you need, and <strong>how</strong> it should look.</p>' },
    { id: 'a2', kind: 'callout', tone: 'remember', text: 'Role, task, format: three parts of a clear prompt.' },
    { id: 'a3', kind: 'code', language: 'plaintext', code: 'You are a friendly tutor.\nExplain what an API is to a 12-year-old.\nUse 3 short bullet points.', caption: 'Role, then task, then format.' },
  ],
  {
    scenario: 'You are asking an AI to help write product descriptions.',
    items: [
      {
        id: 'x1',
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt will get the better result?',
        options: [
          { id: 'a', text: 'Write about my shoes.', misconception: 'Too vague: no audience, length or style.' },
          { id: 'b', text: 'You are a copywriter. Write a 50-word description of waterproof running shoes for trail runners, in a confident tone.' },
        ],
        correctOptionId: 'b',
        explanation: 'It gives a role, the task, the audience and the format.',
      },
      {
        id: 'x2',
        kind: 'fillBlank',
        prompt: 'Complete the prompt.',
        template: 'You are a [[1]]. Summarise this article in [[2]] bullet points for busy managers.',
        blanks: [
          { id: 'b1', answers: ['business analyst'] },
          { id: 'b2', answers: ['3'] },
        ],
        distractors: ['poet', '300'],
      },
      {
        id: 'x3',
        kind: 'orderLines',
        prompt: 'Order the steps of this automation.',
        lines: ['A new email arrives', 'AI reads and sorts it', 'A reply draft is created', 'You approve and send'],
      },
    ],
  },
  'What task in your week could a clear prompt help with?',
);
