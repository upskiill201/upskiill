import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Before/After: pricing what you pay (agreeing rates with suppliers). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Agreeing rates with suppliers',
  summary: 'Pricing works both ways. Clinton has only ever accepted whatever Mama Rose and Auntie Bih said. David shows him how to agree a rate that\'s better for both sides.',
  minutes: 12,
  outcomes: [
    'See supplier prices as something you can agree, not just accept',
    'Offer suppliers what they value, not just less money',
    'Work out what a better rate does to your margin',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Accepting vs agreeing',
      before: {
        label: 'Accepting',
        text: 'Mama Rose: 1,000 a bag. Auntie Bih: 1,100 a bag.\nBags arrive whenever, in any number.\nClinton pays "when I can".\nNobody plans anything.',
      },
      after: {
        label: 'Agreeing',
        text: 'Auntie Bih: guaranteed 8 bags every Saturday, paid the same day she hands them back. In return: 1,050 a bag.\nMama Rose: stays at 1,000, and gets bags sorted and tagged so she works faster.\nBoth know what\'s coming; Clinton\'s cost falls.',
      },
      notes: [
        'Suppliers value more than price: steady work, quick payment, less hassle.',
        'Bih\'s 50 FCFA less a bag isn\'t a squeeze: she gets 8 certain bags and same-day cash.',
        'Keep the relationship fair. A washer who feels squeezed is a washer who stops answering.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Offer suppliers what they value (steady work, prompt payment, less hassle) in return for a better rate.',
    },
  ],
  apply: {
    scenario: 'Talking to the washers.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Bih\'s rate falls from 1,100 to 1,050. A Bih bag\'s full cost was 1,225. What is it now, in FCFA?',
        answers: ['1175', '1,175'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'At 1,800, what margin does a Bih bag earn at the new rate (cost 1,175)?',
        options: [
          { text: '625 FCFA' },
          { text: '575 FCFA', why: 'That was at the old 1,100 rate.' },
          { text: '675 FCFA', why: 'That\'s a Mama Rose bag.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something a supplier values, or not really?',
        groups: ['Values it', 'Not really'],
        items: [
          { text: 'Guaranteed bags every week', group: 0 },
          { text: 'Same-day payment', group: 0 },
          { text: 'Being told to work faster for less', group: 1 },
          { text: 'Bags sorted and tagged in advance', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Clinton offers to what he gets.',
        pairs: [
          ['8 guaranteed bags', 'A 50 FCFA lower rate from Bih'],
          ['Same-day payment', 'A happy, reliable washer'],
          ['Sorted, tagged bags', 'Faster washing from Mama Rose'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I push Mama Rose down to 800 a bag?',
        prompt: "David's best reply?",
        options: [
          { text: 'She gave you your start and she\'s your biggest washer. Squeeze her and she\'ll find other work. Make her job easier instead.' },
          { text: 'Yes, squeeze everyone.', why: 'A squeezed supplier stops being reliable.' },
          { text: 'Pay her more than she asks.', why: 'Fair is the goal, not extremes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What suppliers value.',
        template: 'Steady [[1]], prompt [[2]], and less hassle.',
        blanks: [['work'], ['payment']],
        distractors: ['threats', 'complaints'],
      },
      {
        kind: 'typeAnswer',
        prompt: '8 Bih bags a week, each 50 FCFA cheaper. How much does Clinton save per week, in FCFA?',
        answers: ['400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why might same-day payment matter so much to Auntie Bih?',
        options: [
          { text: 'She buys soap and charcoal with it, and waiting costs her' },
          { text: 'It doesn\'t matter to anyone', why: 'Cash timing matters to every small business.' },
          { text: 'It\'s a legal rule', why: 'It\'s about her cash needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s supplier plan will cause trouble?',
        lines: [
          'Bih: 8 guaranteed bags, same-day payment, 1,050 a bag.',
          'Mama Rose: 1,000, bags sorted and tagged.',
          'Pay both "when I can".',
          'Review rates together every few months.',
        ],
        bug: 2,
        fix: 'Pay both on the day the clean bags come back.',
        explanation: 'It breaks the same-day promise that earned the lower rate.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a fair supplier conversation.',
        lines: ['Understand what they value', 'Offer it clearly', 'Agree a rate in return', 'Keep your promises', 'Review together later'],
      },
    ],
  },
  reflect: {
    prompt: 'Who supplies you (people, tools, services)? What could you offer them in return for a better rate?',
    starters: ['My supplier is...', 'I could offer...'],
  },
  deepen: {
    title: 'And when you have to pay',
    summary: 'Clinton promised to pay Bih on the same day, but students pay on Sunday and plan money arrives on the 1st. When money comes in and goes out matters. That\'s the next course.',
  },
  notes: 'Fictional: Auntie Bih 1,050 FCFA/bag for 8 guaranteed bags weekly with same-day payment (was 1,100); Bih bag cost 1,175, margin 625 at 1,800; saving 400/week. Mama Rose stays 1,000 with sorted, tagged bags.',
};

export default lesson;
