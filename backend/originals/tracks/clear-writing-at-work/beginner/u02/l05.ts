import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: plain words',
  summary: 'Know your reader, why plain works, the swap list and active voice. A quick check before Zanele rewrites Brian\'s notice.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Swap jargon for plain words', 'Write active, short sentences'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday',
      beats: [
        { speaker: 'zanele', text: 'I caught myself writing "commence" in a text to my mother. Swap list is working.' },
        { speaker: 'achieng', text: 'Good. Now the hard part: telling Brian his notice needs rewriting.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: plain words.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its plain swap.',
        pairs: [
          ['utilise', 'use'],
          ['commence', 'start'],
          ['prior to', 'before'],
          ['touch base', 'talk'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Active or passive?',
        groups: ['Active', 'Passive'],
        items: [
          { text: '"Emeka sent the data."', group: 0 },
          { text: '"The data was sent."', group: 1 },
          { text: '"We decided to open Saturdays."', group: 0 },
          { text: '"It was decided."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first question to ask before writing?',
        options: [
          { text: 'How can I sound impressive?', why: 'Start with the reader.' },
          { text: 'How long should it be?', why: 'Start with the reader.' },
          { text: 'Who will read this, on what, in what language?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A suggested average sentence length is 15 to how many words?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Why rewrite my notice? It\'s very comprehensive.',
        prompt: "Zanele's best reply?",
        options: [
          { text: 'It is. I\'d like the drivers to understand it on their phones in one read, so I\'ve put dates, pay and contacts first in plain words. Can I show you?' },
          { text: 'Because nobody understands you.', why: 'Kind and specific works better.' },
          { text: 'It\'s fine, I\'ll send it.', why: 'The drivers won\'t understand.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Plain language.',
        template: 'Writing your reader understands the [[1]] time they [[2]] it.',
        blanks: [['first'], ['read']],
        distractors: ['tenth', 'delete'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this sentence list hides the doer?',
        lines: [
          'Mrs Mwangi will send rotas.',
          'Drivers will be paid time and a half.',
          'It has been decided by stakeholders that this is optimal.',
          'Call Mrs Mwangi with questions.',
        ],
        bug: 2,
        fix: 'Mr Kamau decided to open on Saturdays.',
        explanation: 'Who are "stakeholders"? Name the decision-maker.',
      },
      {
        kind: 'mcq',
        prompt: 'When should you keep a technical term?',
        options: [
          { text: 'Always', why: 'Only when the reader knows it.' },
          { text: 'Never', why: 'Sometimes it\'s the right word.' },
          { text: 'When your reader knows it and it\'s the most precise word' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the plain swap for "endeavour"?',
        answers: ['try'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Plain or complex?',
        groups: ['Plain', 'Complex'],
        items: [
          { text: '"Saturday shifts start 6 May."', group: 0 },
          { text: '"Weekend throughput will be operationalised."', group: 1 },
          { text: '"Call me if you have questions."', group: 0 },
          { text: '"Please do not hesitate to reach out."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one sentence from your last email in plain, active words.',
    starters: ['Before:...', 'After:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4.',
};

export default lesson;
