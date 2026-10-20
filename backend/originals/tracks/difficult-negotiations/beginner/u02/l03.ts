import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Chat with Tey: good cop, bad cop. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Good cop, bad cop',
  summary: 'Joel is half in love with Ms Okafor-Lane\'s warmth. Tey explains the oldest routine in negotiation, why it works, and the one thing that makes it stop working.',
  minutes: 12,
  outcomes: [
    'Recognise good cop / bad cop',
    'Treat both sides the same way',
    'Use the "good cop" to learn real interests',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'One person is tough, the other kind. The kind one seems to be on your side, so their "smaller" ask feels like a gift.', replies: ['Is that what\'s happening?'] },
        { tey: 'Maybe, maybe not. Ms Okafor-Lane may genuinely love the demo. Either way, the answer is the same: treat them as one team.', replies: ['Does the routine actually work?'] },
        { tey: 'In a study by Brodt and Tuchinsky (2000), it did help the people using it. It works best when you don\'t notice it. Once you see it, the "kind" offer is just another offer.', replies: ['So how do I use it?'] },
        { tey: 'Ask the good cop real questions: "What does success look like for your team in spring?" If she\'s genuine, she\'ll tell you what she really needs. That\'s gold either way.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Treat the good cop and the bad cop as one team. Judge every offer on its numbers, not on who said it.',
    },
  ],
  apply: {
    scenario: 'Two voices on the call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How does good cop / bad cop work?',
        options: [
          { text: 'The kind one\'s smaller ask feels like a favour after the tough one' },
          { text: 'They argue with each other for real', why: 'It\'s usually a coordinated routine.' },
          { text: 'The kind one always gives you a better deal', why: 'Often it\'s the same deal, delivered warmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good cop or bad cop?',
        groups: ['Good cop', 'Bad cop'],
        items: [
          { text: '"I love your demo."', group: 0 },
          { text: '"£48,000? Wow."', group: 1 },
          { text: '"I really want this to work."', group: 0 },
          { text: '"Finance won\'t go higher."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'She said "Between us, £32,000 might fly." That\'s a gift, right?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'It\'s an offer, still below your walk-away. Thank her, and judge it on the numbers like any other.' },
          { text: 'Yes, grab it.', why: '£32,000 is below the £36,000 walk-away.' },
          { text: 'Tell her she\'s manipulating you.', why: 'She may be genuine; just judge the offer.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to Arjun\'s answer.',
        pairs: [
          ['Bad cop pushes hard', 'Stay polite and firm'],
          ['Good cop offers "a favour"', 'Judge it on the numbers'],
          ['Good cop seems genuine', 'Ask about her real needs'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The answer to the routine.',
        template: 'Treat them as one [[1]]. Judge every offer on its [[2]].',
        blanks: [['team'], ['numbers', 'merits']],
        distractors: ['enemy', 'smile'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Brodt and Tuchinsky publish their good cop / bad cop study?',
        answers: ['2000'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'When does good cop / bad cop work best?',
        options: [
          { text: 'When the other side doesn\'t notice it' },
          { text: 'When everyone knows it\'s happening', why: 'Then it loses its power.' },
          { text: 'Never', why: 'Research found it can work.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Joel\'s plan falls for the routine?',
        lines: [
          'Thank both of them.',
          'Ask Ms Okafor-Lane what success looks like.',
          'Accept her £32,000 because she\'s on our side.',
          'Send options by Thursday.',
        ],
        bug: 2,
        fix: 'Judge £32,000 against the walk-away.',
        explanation: '"She\'s on our side" is exactly the routine.',
      },
      {
        kind: 'typeAnswer',
        prompt: '£32,000 against a £36,000 walk-away. How far short, in pounds?',
        answers: ['4000', '4,000', '£4,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle good cop / bad cop.',
        lines: ['Notice the two roles', 'Treat them as one team', 'Ask the good cop real questions', 'Judge each offer on numbers'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been softened up by a "kind" person after a "tough" one? What happened?',
    starters: ['The tough one...', 'Then the kind one...'],
  },
  deepen: {
    title: 'Contrast',
    summary: 'Good cop / bad cop uses contrast: after something harsh, something less harsh feels generous. The same effect is used in sales, where a big price makes a smaller one feel like a bargain.',
  },
  notes: 'Brodt & Tuchinsky (2000), "Working together but in opposition: An examination of the \'good-cop/bad-cop\' negotiating team tactic", OBHDP 81(2). Fictional £32,000 from the good cop.',
};

export default lesson;
