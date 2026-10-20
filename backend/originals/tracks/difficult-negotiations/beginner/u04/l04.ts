import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Chat with Tey: their alternatives, and the "three quotes". */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Their alternatives',
  summary: '"Three other quotes around £30,000." Arjun can\'t check that directly. Tey shows him how to think through what Harlow & Finch\'s alternatives really cost them, and how to test the claim politely.',
  minutes: 12,
  outcomes: [
    'Estimate the other side\'s BATNA',
    'Work out what switching would cost them',
    'Test a claim about competitors without accusing anyone',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'If they drop you, what happens? A new agency needs a few weeks to understand the shops and tills. Their board approved your demo, not theirs.', replies: ['And spring?'] },
        { tey: 'A new team starting late may miss the spring sale. If the app drives even a small lift in repeat visits across 60 shops, a missed season costs them far more than £2,000.', replies: ['But they said three quotes.'] },
        { tey: 'Test it politely: "Happy to compare like for like. Do the other quotes include till integration and launch in 12 weeks?" Real quotes have answers. Vague ones don\'t.', replies: ['And if they really are cheaper?'] },
        { tey: 'Then you know something real, and you can decide calmly. Either way, a cheaper quote that misses spring isn\'t really cheaper for them.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask what their alternative really costs them: time, risk, a missed deadline. Test competitor claims by comparing like for like.',
    },
  ],
  apply: {
    scenario: 'Their side of the table.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A cost to Harlow & Finch of switching agency, or not?',
        groups: ['Cost of switching', 'Not a cost'],
        items: [
          { text: 'A new team learning the tills', group: 0 },
          { text: 'Possibly missing the spring sale', group: 0 },
          { text: 'Arjun\'s commute', group: 1 },
          { text: 'Re-explaining everything to a new board audience', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way to test "three other quotes"?',
        options: [
          { text: '"Do the other quotes include till integration and a 12-week launch?"' },
          { text: '"I don\'t believe you."', why: 'An accusation, not a test.' },
          { text: '"Send me copies."', why: 'They won\'t; ask about like-for-like instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'What if the other quotes are real and cheaper?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Then you\'ve learned something real and can decide calmly. A cheaper quote that misses spring isn\'t cheaper for them.' },
          { text: 'Then match the cheapest.', why: 'Check it against your walk-away first.' },
          { text: 'Then they\'re lying.', why: 'Real quotes exist; compare them.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it reveals.',
        pairs: [
          ['"Do they include till integration?"', 'Whether it\'s like for like'],
          ['"Could they launch in 12 weeks?"', 'Whether they\'d meet spring'],
          ['"Have they seen your shops?"', 'How much setup they\'d need'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Testing a claim.',
        template: 'Compare like for [[1]]. Real quotes have [[2]].',
        blanks: [['like'], ['answers', 'details']],
        distractors: ['love', 'logos'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun\'s walk-away is £37,000. Pryce offers £35,000. What\'s the gap, in pounds?',
        answers: ['2000', '2,000', '£2,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the board having seen Arjun\'s demo important?',
        options: [
          { text: 'Switching means explaining a different, unseen app to the same board' },
          { text: 'It isn\'t important', why: 'It raises their cost of switching.' },
          { text: 'Boards love variety', why: 'They approved one demo.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s plan for the call is an accusation?',
        lines: [
          'Ask what the other quotes include.',
          'Ask if they could launch in 12 weeks.',
          'Say "I know you\'re making those quotes up."',
          'Explain what our phase one includes.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'He can\'t prove it, and it embarrasses Pryce.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to estimate their BATNA.',
        lines: ['Imagine they walk away', 'List what switching costs them', 'Test claims like for like', 'Compare with your offer'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong sign the quotes are real, or a sign they\'re vague?',
        groups: ['Real', 'Vague'],
        items: [
          { text: 'Pryce names what each one includes', group: 0 },
          { text: '"Around £30,000, you know, roughly"', group: 1 },
          { text: 'Clear timelines from each agency', group: 0 },
          { text: 'Changing the subject when asked', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'In your negotiation, what would it really cost the other side to walk away from you?',
    starters: ['If they walked away, they would...', 'That would cost them...'],
  },
  deepen: {
    title: 'Their BATNA is a guess',
    summary: 'You rarely know the other side\'s alternative for sure. Estimate it, test it with questions, and update as you learn. Overestimating it is one of the most common mistakes.',
  },
  notes: 'Estimating the other side\'s BATNA: Getting to Yes; Malhotra & Bazerman, Negotiation Genius (2007). Fictional: 60 shops, spring sale, board saw Arjun\'s demo.',
};

export default lesson;
