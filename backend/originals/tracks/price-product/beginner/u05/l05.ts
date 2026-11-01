import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: say it and defend it',
  summary: '"Compared with what?", no hidden fees, value-based answers to objections, and fair rates with suppliers. Quick check before Clinton finds out if the new prices really worked.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Answer price objections without notes', 'Spot hidden fees and unfair supplier deals'],
  learn: [
    {
      kind: 'story',
      title: 'Month end',
      beats: [
        { speaker: 'narrator', text: '30 November. The new prices have run for a month. Joseph uses Saver. Bih has her 8 bags every Saturday.' },
        { speaker: 'david', text: 'Now the real question: did it work? I\'ve got the numbers.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: say it and defend it.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A customer says "too expensive". What\'s the first step?',
        options: [
          { text: 'Lower the price', why: 'Understand the objection first.' },
          { text: 'Ask what they\'re comparing with' },
          { text: 'Ignore them', why: 'Objections are information.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear pricing or hidden pricing?',
        groups: ['Clear', 'Hidden'],
        items: [
          { text: 'Total shown before payment', group: 0 },
          { text: '"Small extra charges may apply"', group: 1 },
          { text: 'Hill fee on the price list', group: 0 },
          { text: 'Fee added in the Sunday message', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A supplier cuts their rate from 2,000 to 1,900 for guaranteed weekly orders of 10. What do you save each week, in FCFA?',
        answers: ['1000', '1,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the objection to the response.',
        pairs: [
          ['"It\'s cheaper elsewhere"', 'Compare the full offer, honestly'],
          ['"I can do it myself"', 'Ask what their time is worth'],
          ['"Why did it go up?"', 'Give the real reason'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'A student wants to pay 1,500 because her friend got 1,500 last month.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Give her 1,500 too.', why: 'Then every customer has a different price.' },
          { text: 'Tell her the friend is lying.', why: 'The friend was right about last month.' },
          { text: 'Last month\'s price changed for everyone, with notice. If money\'s tight, Saver is 1,400. Same rules for all.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Supplier deals.',
        template: 'Offer suppliers what they [[1]] in return for a better [[2]].',
        blanks: [['value'], ['rate', 'price']],
        distractors: ['fear', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this reply to an objection is the discount reflex?',
        lines: [
          'Thanks, fair question.',
          'Compared with the stand, it\'s 600 less and comes to you.',
          'But fine, take it for 1,300.',
          'Saver is 1,400 if you pass the stand.',
        ],
        bug: 2,
        fix: 'Delete it: offer Saver, not a below-Saver discount.',
        explanation: '1,300 is below every option, and barely above cost.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill student books Saver. Saver is dropped at the stand, so is there a hill fee? Type the total in FCFA.',
        answers: ['1400', '1,400'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good answer to "too expensive".',
        lines: ['Thank them', 'Ask "compared with what?"', 'Answer with facts or value', 'Offer the option that fits'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Bih accept 1,050 instead of 1,100?',
        options: [
          { text: 'Clinton threatened her', why: 'It was a fair trade.' },
          { text: 'Guaranteed bags and same-day payment are worth more to her than 50 a bag' },
          { text: 'She had no choice', why: 'She chose the steadier deal.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Practise your answer to "that\'s too expensive" out loud. Which part do you find hardest to say?',
    starters: ['My answer is...', 'The hard part is...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. Saver has no hill fee because students drop bags at the stand themselves.',
};

export default lesson;
