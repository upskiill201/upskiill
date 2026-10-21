import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Myth or fact: speaking clearly. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: speaking clearly',
  summary: 'Marta says confident speakers are born, not made. Four common beliefs about speaking. Which hold up?',
  minutes: 11,
  outcomes: [
    'Separate speaking myths from facts',
    'See speaking as a learnable skill',
    'Use what the research supports',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Confident speakers are born that way.',
          isFact: false,
          explain: 'Myth. Structure, practice and feedback improve speaking for most people. Many skilled speakers were once nervous beginners.',
        },
        {
          text: '"Um" and "uh" carry information for listeners.',
          isFact: true,
          explain: 'Fact. Clark and Fox Tree (2002) argued they signal a delay is coming, which is why a few are normal.',
        },
        {
          text: 'More detail always makes you sound more credible.',
          isFact: false,
          explain: 'Myth. Too much detail buries the point. A clear headline, with detail on request, usually sounds more in control.',
        },
        {
          text: 'Listeners can only hold a few points in mind at once.',
          isFact: true,
          explain: 'Fact. Cowan (2001) concluded working memory holds about four chunks, which is why three points work well.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Speaking is a skill: structure, practice, feedback. Few points, headline first.',
    },
  ],
  apply: {
    scenario: 'Speaking myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Confident speakers are born', group: 0 },
          { text: 'Fillers signal a delay', group: 1 },
          { text: 'More detail always helps', group: 0 },
          { text: 'Working memory is small', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes most people better speakers?',
        options: [
          { text: 'Structure, practice and feedback' },
          { text: 'Being born confident', why: 'It\'s learnable.' },
          { text: 'Speaking louder', why: 'Structure and practice.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'You\'re a natural now. I could never do that.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Two weeks ago I took four minutes and said 23 ums. It\'s practice: a headline, three points, and recording myself.' },
          { text: 'You\'re right, some people just can\'t.', why: 'It\'s learnable.' },
          { text: 'It\'s magic.', why: 'It\'s practice.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many chunks does working memory hold, per Cowan? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the better idea.',
        pairs: [
          ['"Speakers are born"', 'Speaking can be learned'],
          ['"More detail is more credible"', 'Headline first, detail on request'],
          ['"Never say um"', 'Reduce, don\'t ban'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Speaking is a [[1]]: structure, [[2]], feedback.',
        blanks: [['skill'], ['practice']],
        distractors: ['gift', 'luck'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do three points work well?',
        options: [
          { text: 'They fit comfortably in working memory' },
          { text: 'Three is lucky', why: 'It\'s about memory.' },
          { text: 'They don\'t', why: 'They fit working memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in this list is the myth?',
        lines: [
          'Fillers signal thinking.',
          'Listeners hold only a few points.',
          'You\'re either a good speaker or you\'re not.',
          'A clear headline sounds in control.',
        ],
        bug: 2,
        fix: 'Speaking improves with practice.',
        explanation: 'It\'s a learnable skill.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Lucía improved in two weeks.',
        lines: ['Got blunt notes from Diego', 'Wrote her headline', 'Cut to three points', 'Recorded and counted'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many statements in this lesson were myths?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What have you believed about your own speaking that might be a myth?',
    starters: ['I believed...', 'Actually...'],
  },
  deepen: {
    title: 'Deliberate practice',
    summary: 'Getting better at anything is faster with clear goals and feedback. For speaking, that means a checklist and a recording: you can\'t improve what you can\'t hear.',
  },
  notes: 'Clark & Fox Tree (2002); Cowan (2001). "Speaking is learnable": general skill-acquisition evidence; no claim of a single study.',
};

export default lesson;
