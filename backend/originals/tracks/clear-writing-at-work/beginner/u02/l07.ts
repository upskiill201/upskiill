import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: plain-language myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Plain-language myths',
  summary: 'Brian thinks plain means "dumbing down". Felix thinks technical terms are always jargon. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Answer objections to plain language',
    'Keep technical terms when they help',
    'See that plain writing takes skill',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Plain language means dumbing things down.',
          isFact: false,
          explain: 'Myth. Plain language keeps all the meaning and removes the effort. The driver notice was more specific, not less.',
        },
        {
          text: 'Technical terms are fine when your readers know them.',
          isFact: true,
          explain: 'Fact. Felix writing "CSV" to Zanele is precise. Writing "CSV" to the drivers wouldn\'t be. It depends on the reader.',
        },
        {
          text: 'Writing plainly is easy, so anyone can do it without trying.',
          isFact: false,
          explain: 'Myth. Plain writing takes work: you have to know exactly what you mean and cut everything else.',
        },
        {
          text: 'Readers in their second or third language benefit from plain English.',
          isFact: true,
          explain: 'Fact. Common words, short sentences and no idioms help everyone, especially international teams.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Plain isn\'t dumb. It keeps the meaning, fits the reader, and takes skill.',
    },
  ],
  apply: {
    scenario: 'Plain-language myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Plain means dumbing down', group: 0 },
          { text: 'Technical terms are fine for expert readers', group: 1 },
          { text: 'Plain writing is effortless', group: 0 },
          { text: 'Plain English helps second-language readers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Felix writes "CSV" to Zanele. Is that jargon?',
        options: [
          { text: 'Yes, always', why: 'It depends on the reader.' },
          { text: 'Only on Mondays', why: 'It depends on the reader.' },
          { text: 'No; she knows the term and it\'s precise' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Plain language is for people who can\'t handle complexity.',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'You\'re right.', why: 'Plain helps everyone.' },
          { text: 'Mr Kamau handles complexity all day, and he reads plain messages first. Plain is respect for busy people.' },
          { text: 'You can\'t handle it either.', why: 'Kind and factual is better.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to the right word.',
        pairs: [
          ['Felix (IT)', 'CSV export'],
          ['Drivers', 'Your rota'],
          ['Mr Kamau', 'Late deliveries down to 21%'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'Plain keeps the [[1]] and removes the [[2]].',
        blanks: [['meaning'], ['effort']],
        distractors: ['jargon', 'reader'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is plain writing hard?',
        options: [
          { text: 'It needs a big vocabulary', why: 'It needs clear thinking.' },
          { text: 'It isn\'t hard', why: 'It takes real work.' },
          { text: 'You must know exactly what you mean, then cut everything else' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Felix\'s email to the drivers is the problem?',
        lines: [
          'Your new app shows your Saturday rota.',
          'Open it and tap "Saturday".',
          'If the API returns a 500, clear your cache.',
          'Call Felix if it doesn\'t load.',
        ],
        bug: 2,
        fix: 'If you see an error, close the app and open it again.',
        explanation: 'Drivers don\'t know "API" or "cache".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many languages does Zanele speak, counting English?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Idiom (risky for international readers) or plain?',
        groups: ['Idiom', 'Plain'],
        items: [
          { text: '"Ballpark figure"', group: 0 },
          { text: '"Rough estimate"', group: 1 },
          { text: '"Touch base"', group: 0 },
          { text: '"Talk"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to decide whether to use a technical term.',
        lines: ['Who is reading?', 'Do they know the term?', 'Is it the most precise word?', 'If not, use plain words'],
      },
    ],
  },
  reflect: {
    prompt: 'Which technical terms in your work are fine for colleagues but confusing for others?',
    starters: ['Fine for colleagues:...', 'Confusing for others:...'],
  },
  deepen: {
    title: 'The curse of knowledge',
    summary: 'Psychologists call it the curse of knowledge: once you know something, it\'s hard to imagine not knowing it. It\'s why experts write jargon without noticing.',
  },
  notes: 'Curse of knowledge: Camerer, Loewenstein & Weber (1989), Journal of Political Economy; popularised by Elizabeth Newton\'s "tappers and listeners" study (1990) and Pinker, The Sense of Style (2014).',
};

export default lesson;
