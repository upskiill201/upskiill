import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18 — The plan to v1.0: one layer per chapter, one version per chapter. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The plan to v1.0',
  summary: 'Arjun turns Joel\'s diagram into a plan: one layer at a time, each ending with a better Ask Rao. The version number on the map tells everyone where they are.',
  minutes: 11,
  outcomes: [
    'See the whole road from v0.1 to v1.0',
    'Know which chapter builds which layer',
    'Know you can jump ahead if you already know a layer',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Arjun\'s plan',
      html: '<p>Each chapter builds one part of Ask Rao, and the map shows the version:</p><ul><li><strong>v0.1</strong>: the stack, sketched (this chapter).</li><li><strong>v0.2 Chips, GPUs and clouds</strong>: where it runs, and the hosting decision.</li><li><strong>v0.3 Inside a model</strong>: tokens, context windows, temperature, and why it makes things up.</li><li><strong>v0.4 Choosing a model</strong>: closed or open-weight, price, speed and licences.</li><li><strong>v0.5 Turning words into numbers</strong>: embeddings and product search by meaning.</li><li><strong>v0.6 Answers from your own data</strong>: retrieval (RAG) done properly.</li><li><strong>v0.7 Tools and agents</strong>: the order tool, chains and a careful agent.</li><li><strong>v0.8 Guardrails</strong>: structured output, blocking injections, protecting data.</li><li><strong>v0.9 From prototype to product</strong>: the API, streaming, caching and cost.</li><li><strong>v0.95 Is it any good?</strong>: an evaluation set, tracing and governance.</li><li><strong>v1.0 Ask Rao 1.0</strong>: the review, and launch.</li></ul><p><strong>Already know a layer?</strong> Every locked chapter has a <strong>Jump here</strong> test, and "Find my level" places you in the right chapter from the start.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Where are we?',
      caption: 'The versions, in order.',
      code: 'versions = ["v0.1", "v0.2", "v0.3", "v0.4", "v0.5", "v0.6",\n            "v0.7", "v0.8", "v0.9", "v0.95", "v1.0"]\nprint(len(versions), "chapters")\nprint("Now:", versions[0], "  Goal:", versions[-1])\n',
      challenge: 'Print the version where guardrails are added (chapter 8).',
    },
  ],
  apply: {
    scenario: 'The road to v1.0.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the version for chapter 6 (position 5 in the list)',
        starter: 'versions = ["v0.1", "v0.2", "v0.3", "v0.4", "v0.5", "v0.6",\n            "v0.7", "v0.8", "v0.9", "v0.95", "v1.0"]\n',
        solution: 'versions = ["v0.1", "v0.2", "v0.3", "v0.4", "v0.5", "v0.6",\n            "v0.7", "v0.8", "v0.9", "v0.95", "v1.0"]\nprint(versions[5])\n',
        hint: 'versions[5]',
        checks: [{ message: 'Print v0.6', outputEquals: 'v0.6' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the version to what it adds.',
        pairs: [
          ['v0.2', 'Where it runs'],
          ['v0.6', 'Answers from the shop\'s own data'],
          ['v0.7', 'The order tool'],
          ['v0.8', 'Guardrails'],
          ['v0.95', 'Evaluation'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order these chapters as the plan does.',
        lines: ['Chips, GPUs and clouds', 'Inside a model', 'Choosing a model', 'Answers from your own data', 'Guardrails', 'Is it any good?'],
      },
      {
        kind: 'mcq',
        prompt: 'You already build RAG systems at work. What can you do?',
        options: [
          { text: 'Nothing: everyone does every lesson', why: 'Tests let you skip ahead when you already know a layer.' },
          { text: 'Take the Jump here test on later chapters, or "Find my level", and skip what you know' },
          { text: 'Skip straight to v1.0', why: 'You jump chapter by chapter by passing each test.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which half of the plan?',
        groups: ['Lower layers (chapters 2–4)', 'Upper layers (chapters 5–10)'],
        items: [
          { text: 'GPUs and hosting', group: 0 },
          { text: 'Vector search', group: 1 },
          { text: 'Choosing a model', group: 0 },
          { text: 'Guardrails', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Can\'t we skip chips and models and go straight to building?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, chips never matter.', why: 'They drive the cost and speed of every answer.' },
          { text: 'We must build our own chips first.', why: 'We rent compute; we just need to understand it.' },
          { text: 'They decide the cost and speed of everything we build. Two chapters now saves a surprise bill later.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The plan in one line.',
        template: 'One [[1]] per chapter, and a better [[2]] of Ask Rao at the end of each.',
        blanks: [['layer'], ['version']],
        distractors: ['logo', 'price'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'versions = ["v0.1", "v0.2", "v0.3"]\nprint(versions[-1])',
        language: 'python',
        options: [
          { text: 'v0.3' },
          { text: 'v0.1', why: '[-1] is the last item.' },
          { text: '3', why: 'It prints the item, not the count.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Kavya\'s plan is in the wrong place?',
        lines: [
          'Chapter 6: answers from the help page.',
          'Chapter 7: the order tool.',
          'Chapter 8: guardrails.',
          'Chapter 9: decide which chips to use.',
        ],
        bug: 3,
        fix: 'Chapter 2: decide where it runs.',
        explanation: 'Hosting is decided early, in Chapter 2. Chapter 9 turns the prototype into a product.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version is Ask Rao at the end of this chapter?',
        answers: ['v0.1', '0.1'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Which chapter of the plan are you most looking forward to, and which one are you tempted to skip?',
    starters: ['I\'m looking forward to...', 'I\'m tempted to skip...'],
  },
  deepen: {
    title: 'Why bottom-up?',
    summary: 'Starting from chips and models means every later choice makes sense: why retrieval saves money, why guardrails sit outside the model, why evaluation never ends.',
  },
  notes: 'Chapter plan per docs/originals/the-ai-stack-outline.md (11 chapters, markers v0.1-v1.0). Jump ahead and Find my level (PLACEMENT_TRACKS includes the-ai-stack).',
};

export default lesson;
