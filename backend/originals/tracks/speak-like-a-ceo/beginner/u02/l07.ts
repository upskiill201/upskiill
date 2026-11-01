import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat: when the CEO cuts in. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'When the CEO cuts in',
  summary: 'Lucía is worried Señora Ibarra will cut in again. Tey explains how to handle it: answer the question, then decide whether to go on.',
  minutes: 11,
  outcomes: [
    'Answer a senior question mid-talk',
    'Skip ahead without losing your place',
    'Stay calm when you\'re redirected',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'When a senior person cuts in, it\'s usually a question. Answer it first, in one or two sentences.', replies: ['Then go back to my next slide?'] },
        { tey: 'Not always. Ask yourself: did that question skip ahead? If she asked about risk, jump to your risk point now.', replies: ['What if she says "just get to the ask"?'] },
        { tey: 'Then give the ask. "I\'m asking for a yes on Monterrey from October." Your preparation still helps: it\'s there for her questions.', replies: ['It feels like failing when I don\'t finish.'] },
        { tey: 'Finishing isn\'t the goal. A decision is. A short meeting that ends in a yes is a success.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Cut in? Answer first, skip to what they want, and remember: the goal is a decision, not finishing your slides.',
    },
  ],
  apply: {
    scenario: 'When the CEO cuts in.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a cut-in.',
        lines: ['Listen to the question', 'Answer in one or two sentences', 'Decide: skip ahead?', 'Continue or give the ask'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the goal of a senior meeting?',
        options: [
          { text: 'Finishing every slide', why: 'A decision.' },
          { text: 'A decision' },
          { text: 'Talking for the full time', why: 'A decision.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to a cut-in, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Answer, then jump to the risk point', group: 0 },
          { text: '"I\'ll get to that on slide 9."', group: 1 },
          { text: 'Give the ask when asked for it', group: 0 },
          { text: 'Start again from slide 1', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the cut-in to the best move.',
        pairs: [
          ['"What\'s the risk?"', 'Jump to the risk point'],
          ['"Just get to the ask."', 'Give the ask now'],
          ['"How sure are you?"', 'Answer with one number'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'She cut me off and I never showed my best chart.',
        prompt: "Tey\'s best reply?",
        options: [
          { text: 'Ask to start again.', why: 'The goal was the decision.' },
          { text: 'Complain to Carmen.', why: 'It went fine.' },
          { text: 'Did you get the yes? Then the chart did its job by being ready. Send it after, if it helps.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Answer [[1]], then skip to what they [[2]].',
        blanks: [['first'], ['want', 'need']],
        distractors: ['later', 'fear'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I\'ll get to that on slide 9" a weak answer?',
        options: [
          { text: 'It makes the senior person wait for what they asked' },
          { text: 'Slide 9 is too far', why: 'It delays their question.' },
          { text: 'It isn\'t weak', why: 'It delays the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which response to "How sure are you?" is the mistake?',
        lines: [
          '"Very: nine weeks at 38% above target."',
          '"Fairly sure; the plant is the one risk."',
          '"Let me finish my slides first, then I\'ll say."',
          '"Sure enough to test Monterrey first."',
        ],
        bug: 2,
        fix: '"Very: nine weeks at 38% above target."',
        explanation: 'Answer the question when it\'s asked.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'From which month does Lucía ask for Monterrey?',
        answers: ['October', 'october'],
        placeholder: 'A month',
      },
      {
        kind: 'sortGroups',
        prompt: 'Success or failure?',
        groups: ['Success', 'Failure'],
        items: [
          { text: 'A 3-minute meeting that ends in a yes', group: 0 },
          { text: 'All slides shown, no decision', group: 1 },
          { text: 'Questions answered clearly', group: 0 },
          { text: 'Questions pushed to "later"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you were cut off. What did they actually want from you?',
    starters: ['I was cut off when...', 'They wanted...'],
  },
  deepen: {
    title: 'Prepared to be flexible',
    summary: 'The better you know your material, the easier it is to jump around in it. Preparation isn\'t a script you must finish; it\'s a map you can move through.',
  },
  notes: 'Handling senior interruptions as questions: practical coaching advice. Distinct from Make People Listen (holding the floor with peers).',
};

export default lesson;
