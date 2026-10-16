import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Myth or Fact: clear, specific goals beat "do your best" (Locke & Latham goal-setting theory). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Clear goals beat "do your best"',
  summary: 'Lucía\'s first draft goal for the campaign: "Let\'s all do our best this summer!" Tey: "That\'s the single most researched bad goal in management. Let\'s play myth or fact."',
  minutes: 11,
  outcomes: [
    'Know what decades of goal research found',
    'Know why "do your best" is a weak goal',
    'Write a goal that\'s specific and challenging, but realistic',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"Do your best" is a good goal because it doesn\'t pressure anyone.', isFact: false, explain: 'Myth. Psychologists Edwin Locke and Gary Latham reviewed decades of studies: specific, challenging goals consistently led to better performance than vague "do your best" goals. "Do your best" has no finish line, so people often stop early.' },
        { text: 'A specific, challenging goal usually leads to better results than an easy one.', isFact: true, explain: 'Fact, as long as people have the skills and commit to it. Harder goals pull more effort and focus, up to the point where they feel impossible.' },
        { text: 'The harder the goal, the better. Always.', isFact: false, explain: 'Myth. If a goal feels impossible, people give up. The research says challenging but achievable, with the skills and resources to get there.' },
        { text: 'People commit more to goals they understand the reason for.', isFact: true, explain: 'Fact. Commitment is a key part of goal-setting research. Explaining why the goal matters, or setting it together, helps people own it.' },
        { text: 'Feedback on progress makes goals work better.', isFact: true, explain: 'Fact. Locke and Latham found goals work best with regular feedback, so people can see how they\'re doing and adjust.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Specific and challenging, but achievable. Explain why. Show progress. "Do your best" isn\'t a goal.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Locke and Latham find about "do your best" goals?',
        options: [
          { text: 'They\'re the best kind of goal', why: 'The opposite.' },
          { text: 'Specific, challenging goals usually beat them' },
          { text: 'Goals don\'t matter', why: 'They matter a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: '"Do your best" works best', group: 0 },
          { text: 'Feedback on progress helps', group: 1 },
          { text: 'Harder is always better', group: 0 },
          { text: 'Knowing why builds commitment', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Okay. "Let\'s all do our best this summer!" Better version?',
        prompt: 'What does Tey suggest?',
        options: [
          { text: '"Launch the chili-lime campaign June 17, with 5,000 pre-orders by July 1."' },
          { text: '"Let\'s REALLY do our best this summer!"', why: 'Louder, still vague.' },
          { text: '"Sell a million bags by Friday."', why: 'Specific, but impossible.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Locke and Latham\'s research is called goal-___ theory. (one word)',
        answers: ['setting', 'Setting'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the goal to the problem.',
        pairs: [
          ['"Do your best"', 'No finish line'],
          ['"A million bags by Friday"', 'Impossible, so people give up'],
          ['"5,000 pre-orders by July 1"', 'Specific and challenging'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why explain WHY a goal matters?',
        options: [
          { text: 'To make the meeting longer', why: 'One sentence is enough.' },
          { text: 'It doesn\'t matter', why: 'Commitment is a key part of the research.' },
          { text: 'People commit more to goals they understand' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s goal plan. Which line breaks the research?',
        lines: [
          'Goal: 5,000 pre-orders by July 1.',
          'Why: it decides whether chili-lime stays in shops.',
          'We\'ll check the numbers once, at the end.',
        ],
        bug: 2,
        fix: 'We\'ll check progress every Monday.',
        explanation: 'Goals work best with regular feedback on progress.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building a good goal in order.',
        lines: ['Make it specific', 'Make it challenging but achievable', 'Explain why it matters', 'Track progress regularly'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Specific and [[1]], but [[2]]. With regular [[3]].',
        blanks: [['challenging'], ['achievable', 'realistic'], ['feedback']],
        distractors: ['easy', 'vague'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s verdict.',
        tiles: ['Do', 'your', 'best', 'isn\'t', 'a', 'goal.'],
        distractors: ['great'],
      },
    ],
  },
  reflect: {
    prompt: 'Write one goal you\'re working on as "do my best". Then rewrite it so it\'s specific, challenging and achievable.',
    starters: ['Vague: ...', 'Clear: ...'],
  },
  deepen: {
    title: 'Add a number and a date',
    summary: 'Take one goal for your week and add a number and a date to it. Notice if it feels more real.',
  },
  notes: 'Edwin A. Locke & Gary P. Latham (2002), "Building a Practically Useful Theory of Goal Setting and Task Motivation: A 35-Year Odyssey", American Psychologist 57(9): specific, difficult goals outperform "do your best"; moderators include commitment, feedback, ability, task complexity. Fictional targets (5,000 pre-orders).',
};

export default lesson;
