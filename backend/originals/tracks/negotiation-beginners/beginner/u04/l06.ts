import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: several offers at once (MESOs). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Several offers at once',
  summary: 'Ada worries that if her one offer is wrong, the talk stalls. Tey suggests something negotiation researchers have tested: make two or three offers at the same time, and see which one he likes.',
  minutes: 12,
  outcomes: [
    'Make several equal offers at once',
    'Learn the other side\'s priorities from their choice',
    'Build offers that are all fine for you',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Instead of one offer, give him three at once. Each one should be equally good for you, just built differently.', replies: ['Like what?'] },
        { tey: 'A: ₦1,400,000 for one year. B: ₦1,350,000 for two years. C: ₦1,320,000 for two years, and you handle small repairs up to ₦50,000 a year.', replies: ['Why three?'] },
        { tey: 'Researchers call these MESOs: multiple equivalent simultaneous offers. People like having a choice, and they look flexible. Studies found they often lead to better deals for both sides.', replies: ['And his choice tells me something.'] },
        { tey: 'Exactly. If he picks B, the lease length matters most to him. If he picks A, he wants the money now. Either way, you\'re happy, because you built all three.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Offer two or three packages that are equally good for you. Their choice shows you what they value.',
    },
  ],
  apply: {
    scenario: 'Three offers.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the offer to what it gives him.',
        pairs: [
          ['A: ₦1,400,000, one year', 'More money now'],
          ['B: ₦1,350,000, two years', 'No empty months'],
          ['C: ₦1,320,000, two years, repairs', 'Less hassle'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does MESO stand for? Type the first word.',
        answers: ['multiple', 'Multiple'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What should be true of all three offers?',
        options: [
          { text: 'Each is equally acceptable to Ada' },
          { text: 'One is a trick', why: 'All three must be real and fine for her.' },
          { text: 'They\'re all the same', why: 'Same value to her, different shape.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'If he picks this offer, what does he value most?',
        groups: ['Money now', 'Long lease'],
        items: [
          { text: 'He picks A', group: 0 },
          { text: 'He picks B', group: 1 },
          { text: '"I\'d rather the higher rent for one year."', group: 0 },
          { text: '"Two years suits me."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Won\'t three offers look like I\'m desperate?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'They look flexible and well thought out. Desperate is dropping one number again and again.' },
          { text: 'Yes, only ever make one.', why: 'MESOs often get better deals.' },
          { text: 'Make ten.', why: 'Two or three is enough; more confuses.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'MESOs.',
        template: 'Offer packages that are equally good for [[1]]. Their [[2]] shows what they value.',
        blanks: [['you'], ['choice']],
        distractors: ['them', 'anger'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Offer B over two years: ₦1,350,000 × 2. Total rent, in naira?',
        answers: ['2700000', '2,700,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does giving a choice help?',
        options: [
          { text: 'People like choosing, and it reveals their priorities' },
          { text: 'It confuses them into agreeing', why: 'It\'s about information, not confusion.' },
          { text: 'It doesn\'t help', why: 'Research found it often helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Ada\'s offers breaks the MESO rule?',
        lines: [
          'A: ₦1,400,000 for one year.',
          'B: ₦1,350,000 for two years.',
          'C: ₦1,500,000 for one year, which I\'d hate.',
          'Each one works for me.',
        ],
        bug: 2,
        fix: 'C: ₦1,320,000 for two years, with small repairs.',
        explanation: 'Every offer must be one she\'s happy with.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build MESOs.',
        lines: ['Know your own value for each issue', 'Build 2 or 3 packages of equal value to you', 'Offer them together', 'Notice which one they prefer'],
      },
    ],
  },
  reflect: {
    prompt: 'Build two packages for your own negotiation that would both be fine for you.',
    starters: ['Package A:...', 'Package B:...'],
  },
  deepen: {
    title: 'MESOs',
    summary: 'Research by Geoffrey Leonardelli, Adam Galinsky and colleagues found that multiple equivalent simultaneous offers can get better outcomes and make the offer-maker seem more flexible.',
  },
  notes: 'MESOs: Medvec & Galinsky (2005), "Putting more on the table", Negotiation newsletter (Harvard PON); Leonardelli, Gu, McRuer, Medvec & Galinsky (2019), "Multiple equivalent simultaneous offers (MESOs) reduce the negotiator dilemma", OBHDP 152. Fictional offers A/B/C.',
};

export default lesson;
