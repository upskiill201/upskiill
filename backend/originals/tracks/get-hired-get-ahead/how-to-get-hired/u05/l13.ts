import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 13 — when they say no, or meet you halfway. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'When they say "not quite"',
  summary: 'Brenda calls back: "We can\'t do 330,000. We can do 315,000, and a review after probation." Clinton freezes. Is that a yes? A no? Should he push again? Tey talks him through it.',
  minutes: 11,
  outcomes: ['Respond to a counter-offer calmly', 'Decide whether to accept, ask once more, or walk away', 'Close on good terms either way'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Brenda moved: 300,000 to 315,000, plus the review you asked for. That\'s a real effort. How do you feel?',
          replies: ['Happy, mostly', 'A bit disappointed'],
        },
        {
          tey: 'Both are normal. Now compare it with your plan: your range was 280–340k, your target 330k, your walk-away point below Kmer\'s whole offer. Where does 315k plus a review sit?',
          replies: ['Inside my range, above walk-away'],
        },
        {
          tey: 'So it\'s a good outcome. You could accept with thanks, or make one small extra ask if something really matters, like the training budget. What you shouldn\'t do is keep pushing on salary until the goodwill runs out.',
          replies: ['What if they\'d said a flat no?'],
        },
        {
          tey: 'Then thank them, and decide using your table. A no to your ask isn\'t a no to you. "I understand, thank you for checking" keeps everything warm, whatever you decide.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Compare the counter-offer with your plan. Accept with thanks, or one small extra ask. Don\'t push until goodwill runs out.',
    },
  ],
  apply: {
    scenario: 'Brenda makes a counter-offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Brenda offer back?',
        options: [
          { text: '330,000', why: 'She couldn\'t do 330k. She offered 315k plus a review.' },
          { text: '315,000 and a review after probation' },
          { text: 'Nothing', why: 'She moved: 315k plus a review.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to the counter-offer, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Thank you, that\'s really helpful', group: 0 },
          { text: 'Still too low, try again', group: 1 },
          { text: 'Could a training budget be included too?', group: 0 },
          { text: 'Pushing on salary three more times', group: 1 },
          { text: 'Compare it with my plan', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply to Brenda.',
        from: 'brenda',
        message: 'We can\'t do 330,000, but we can do 315,000 and a review after probation.',
        options: [
          { text: '"No. 330 or nothing."', why: 'It\'s inside his range. Don\'t push until goodwill runs out.' },
          { text: '"Er... I don\'t know... maybe?"', why: 'He has a plan. Use it and respond clearly.' },
          { text: '"Thank you, I really appreciate that. That works for me. Could you send the updated offer in writing?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that burns goodwill.',
        lines: ['Thank you for checking.', 'You can surely find 15,000 more, come on, ask again.', 'Could you send it in writing?'],
        bug: 1,
        explanation: 'She already moved. Pushing again risks the goodwill.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s thinking in order.',
        lines: ['Notice how he feels', 'Compare with his range, target and walk-away', 'Decide: accept, one small ask, or walk away', 'Respond with thanks'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to a good response.',
        pairs: [
          ['They meet you halfway', 'Accept with thanks, or one small extra ask'],
          ['A flat no', '"I understand, thank you for checking"'],
          ['Below your walk-away', 'Thank them, choose your alternative'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Where does 315k plus a review sit in Clinton\'s plan?',
        options: [
          { text: 'Inside his range, above his walk-away point' },
          { text: 'Below his walk-away point', why: 'It\'s above.' },
          { text: 'Above his whole range', why: 'His range topped at 340k.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s point.',
        template: 'A no to your [[1]] isn\'t a no to [[2]].',
        blanks: [['ask'], ['you']],
        distractors: ['job', 'them', 'money'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What salary did Brenda offer back, in francs? (a number)',
        answers: ['315000', '315,000', '315 000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps things warm, or not?',
        groups: ['Warm', 'Cold'],
        items: [
          { text: 'Thank you for checking', group: 0 },
          { text: 'That\'s disappointing and frankly unfair', group: 1 },
          { text: 'I really appreciate the effort', group: 0 },
          { text: 'Silence for three days', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If someone met you halfway in a negotiation, how would you decide whether to accept?',
    starters: ['I\'d compare it with...', 'I\'d accept if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a one-line reply for each outcome: they say yes, they meet you halfway, they say no.',
  },
  notes: 'Counter-offer handling: common negotiation guidance. Numbers are story details.',
};

export default lesson;
