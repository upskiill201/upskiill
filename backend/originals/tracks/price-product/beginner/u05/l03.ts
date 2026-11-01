import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: answering price objections with value. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Answering price objections',
  summary: 'Joseph was easy. The next three are harder: "Mama Rose is cheaper", "I can wash it myself", and "Why did it go up?" Tey gives Clinton an answer for each, none of them a discount.',
  minutes: 12,
  outcomes: [
    'Answer common price objections with value',
    'Match each objection to the right response',
    'Stay calm and honest instead of discounting',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '"Mama Rose is cheaper." She isn\'t: 2,400 a basket you carry, against 1,800 to your door. Facts answer that one.', replies: ['"I can wash it myself."'] },
        { tey: 'True, and free in money. So talk about time: "It\'s about three hours every Saturday. Is your Saturday worth 1,800?" Some will say no, and that\'s fine.', replies: ['"Why did it go up?"'] },
        { tey: 'Be honest and short: "We now pay two washers fairly, so no bag is ever turned away, and you get a photo when we collect." Reasons, not apologies.', replies: ['And if they still say no?'] },
        { tey: 'Let them go kindly, and offer the cheapest option that still earns: Saver. Not every customer has to be yours. A discount that kills your margin keeps the customer and loses the business.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Answer price objections with facts, value, reasons or a better-fitting option. Discount last, if ever.',
    },
  ],
  apply: {
    scenario: 'Three objections.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the objection to the best answer.',
        pairs: [
          ['"Mama Rose is cheaper"', 'Show it\'s 600 cheaper, delivered'],
          ['"I can wash it myself"', 'Ask what three hours are worth'],
          ['"Why did it go up?"', 'Give the honest reason'],
          ['"I just can\'t afford it"', 'Offer Saver'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A student says, "I can wash it myself." What\'s the best response?',
        options: [
          { text: 'Tell them they\'re wrong', why: 'They\'re right that it\'s free in money.' },
          { text: 'Agree it\'s free in money, and ask what three hours of their Saturday are worth' },
          { text: 'Offer 50% off', why: 'That\'s below cost and doesn\'t answer the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mama Rose: 2,400 a basket. WashDay Standard: 1,800. How much cheaper is WashDay, in FCFA?',
        answers: ['600'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Value-based answer, or a discount reflex?',
        groups: ['Value-based', 'Discount reflex'],
        items: [
          { text: '"It comes to your door, 600 less than the stand"', group: 0 },
          { text: '"OK, OK, 1,500 then"', group: 1 },
          { text: '"Saver is 1,400 if you pass the stand"', group: 0 },
          { text: '"Fine, first bag free"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'What if they still say no after all that?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Keep lowering until they say yes.', why: 'That ends below the floor.' },
          { text: 'Argue until they give in.', why: 'Pressure loses trust.' },
          { text: 'Let them go kindly. Not every student has to be your customer. Keeping a price that pays you is how WashDay survives.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Answer with facts, [[1]], reasons or a better option. [[2]] last, if ever.',
        blanks: [['value'], ['Discount']],
        distractors: ['anger', 'Apologise'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "we pay two washers fairly" a good answer to "why did it go up?"',
        options: [
          { text: 'It\'s an honest reason tied to a real cost and a better service' },
          { text: 'It makes them feel guilty', why: 'It explains; it doesn\'t guilt-trip.' },
          { text: 'It\'s not a good answer', why: 'Cost-based reasons feel fair.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Clinton\'s reply to "Mama Rose is cheaper" is wrong?',
        lines: [
          'Thanks for asking!',
          'At the stand it\'s 2,400 a basket and you carry it.',
          'You\'re right, she\'s cheaper, so 1,200 for you.',
          'WashDay is 1,800 and comes to your room.',
        ],
        bug: 2,
        fix: 'Delete it: she isn\'t cheaper, and 1,200 is a loss-making discount.',
        explanation: 'He agrees with a false claim and discounts anyway.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s objection routine.',
        lines: ['Listen to the objection', 'Answer with facts or value', 'Offer the option that fits', 'If still no, let them go kindly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many hours of a Saturday does hand-washing take?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write the three price objections you hear most, and a value-based answer for each.',
    starters: ['Objection:...', 'My answer:...'],
  },
  deepen: {
    title: 'Not every customer is yours',
    summary: 'Some customers will always choose the cheapest option, including doing it themselves. Serving them at a loss isn\'t kindness; it puts the whole business at risk.',
  },
  notes: 'Fictional objections and answers; values from earlier chapters (Mama Rose 2,400; Standard 1,800; Saver 1,400; ~3 hours of hand-washing).',
};

export default lesson;
