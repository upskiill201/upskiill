import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: Esther, the third-years and the hill. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Esther, the third-years and the hill',
  summary: 'Three messages in one evening. Esther: "Is there a cheaper way? I don\'t mind waiting." Two third-years: "Can we get it back the same day?" And the hill hostel: "Do you even come up here when it rains?" One price can\'t answer all three.',
  minutes: 11,
  outcomes: [
    'See why one price can\'t fit every customer',
    'Spot customers who value different things',
    'Know that different jobs cost different amounts',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Three messages',
      beats: [
        { speaker: 'narrator', text: 'Clinton has decided on 1,800 for a standard bag. Then three messages arrive.' },
        { speaker: 'narrator', text: 'Esther, first-year, tight budget: "1,800 is a lot at the end of the month. Is there a cheaper way? I don\'t mind waiting or walking to the gate."' },
        { speaker: 'narrator', text: 'Two third-years with weekend jobs: "Can we get it back the same evening? We\'d pay extra."' },
        { speaker: 'narrator', text: 'A student at the top of the hill: "Do you even come up here when it rains?"' },
        { speaker: 'clinton', text: 'One wants cheaper, two want faster, one costs me more. What price works for all of them?' },
        { speaker: 'tey', text: 'None. That\'s the point of this chapter: different customers value different things, and different jobs cost different amounts. Options let each pay for what they need.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          { text: 'Offer a few clear options: a cheaper slower one, the standard, a faster one, and a fee for the hard-to-reach hostels.', outcome: 'Right. Each option matches a need, and each must still make money.', best: true },
          { text: 'Keep one price and ignore the requests.', outcome: 'Esther may leave, the third-years would pay more and can\'t, and the hill keeps losing money.' },
          { text: 'Lower the price for everyone to please Esther.', outcome: 'Then everyone pays less, including the third-years who\'d happily pay more.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Different customers, different needs, different costs: options let each one pay for what they want.',
    },
  ],
  apply: {
    scenario: 'Three messages.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the customer to what she or they want.',
        pairs: [
          ['Esther', 'Cheaper, happy to wait'],
          ['The third-years', 'Faster, happy to pay'],
          ['The hill hostel', 'Pickup when it rains'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t one price fit all three?',
        options: [
          { text: 'They value different things, and the hill costs more to serve' },
          { text: 'Because 1,800 is wrong', why: 'It may be right for the standard bag; others need something different.' },
          { text: 'Because they\'re rude', why: 'They\'re clear about what they want.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A difference in what customers value, or in what it costs Clinton?',
        groups: ['What they value', 'What it costs'],
        items: [
          { text: 'Esther doesn\'t mind waiting', group: 0 },
          { text: 'The hill needs moto-taxis', group: 1 },
          { text: 'Third-years want it the same day', group: 0 },
          { text: 'Same-day washing costs Mama Rose more', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I just drop to 1,500 for everyone so Esther stays?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Give Esther a cheaper option that costs you less to run, like dropping her bag at the gate. Don\'t lower the price for people who value it more.' },
          { text: 'Yes, lower it for everyone.', why: 'That gives away margin on customers happy at 1,800.' },
          { text: 'Tell Esther to wash by hand.', why: 'She\'s a customer worth keeping with the right option.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why options.',
        template: 'Different customers value different [[1]], and different jobs [[2]] different amounts.',
        blanks: [['things'], ['cost']],
        distractors: ['logos', 'earn'],
      },
      {
        kind: 'mcq',
        prompt: 'What would a cheaper option for Esther need to do?',
        options: [
          { text: 'Cost Clinton less to run, so it still makes money' },
          { text: 'Lose money but keep her happy', why: 'Every option must earn.' },
          { text: 'Be exactly the same as standard but cheaper', why: 'Then everyone would choose it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At the standard 1,800 price, what margin does a nearby bag make (cost 1,125)?',
        answers: ['675'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s first reaction is a mistake?',
        lines: [
          'Esther wants cheaper; she doesn\'t mind waiting.',
          'Third-years want faster; they\'d pay extra.',
          'The hill costs me more in the rain.',
          'So everyone should pay one price, the lowest anyone wants.',
        ],
        bug: 3,
        fix: 'So offer options, each priced for its cost and value.',
        explanation: 'The lowest price for everyone gives away value and still doesn\'t fix the hill.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to design options.',
        lines: ['Notice the different needs', 'Work out what each costs to serve', 'Price each option to earn', 'Keep the list short and clear'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Would this customer choose a cheaper slow option or a faster one?',
        groups: ['Cheaper, slower', 'Faster'],
        items: [
          { text: 'First-year on a tight budget', group: 0 },
          { text: 'Third-year with a Saturday job', group: 1 },
          { text: 'Student before an exam on Monday', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do your customers want different things? Who wants cheaper, who wants faster or better, and who costs more to serve?',
    starters: ['Some want...', 'Others...'],
  },
  deepen: {
    title: 'Versioning',
    summary: 'Economists call offering different versions at different prices "versioning". Airlines, phones and software all do it. It works when each version matches a real need and covers its cost.',
  },
  notes: 'Fictional requests: Esther (cheaper, slower), two third-years (same-day), hill hostel (rainy pickups). Versioning: Shapiro & Varian, Information Rules (1998).',
};

export default lesson;
