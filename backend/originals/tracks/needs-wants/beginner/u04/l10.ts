import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: hard choices. Cliffhanger: Mum's freezer. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the hard choices',
  summary: 'Ngozi is deciding whether to rent a shop for her fabric business: ₦1.5 million a year. Help her decide, with everything from Chapter 4. Then Ada\'s mum calls: her shop freezer has died, and she needs ₦200,000.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Help someone make a big money decision', 'Use total cost, opportunity cost, 10/10/10 and regret together'],
  learn: [
    {
      kind: 'story',
      title: 'Two calls',
      beats: [
        { speaker: 'narrator', text: 'Ngozi, pacing: "A shop in Yaba. ₦1.5 million a year. My customers could visit. Or I keep selling online from my room. Help me decide properly."' },
        { speaker: 'ada', text: 'Total cost. Opportunity cost. 10/10/10. Let\'s go.' },
        { speaker: 'narrator', text: 'An hour later, Ada\'s phone rings. Mum. She never calls this late.' },
        { speaker: 'narrator', text: '"Ada, my freezer has died. All the fish and the drinks. The repair man says it can\'t be fixed. A new one is ₦200,000. I don\'t want to ask you, but I don\'t know who else to ask."' },
        { speaker: 'ada', text: '₦200,000. Mexico is ₦55,000 short as it is.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: total cost, opportunity cost, 10/10/10, "would I buy it again?", regret, and value over cheap. Now the hardest choice of all: family, or the trip. Chapter 5. First, help Ngozi.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Ngozi\'s shop. Rent ₦1.5 million a year, plus shelves ₦200,000 once, plus electricity and security about ₦40,000 a month. She currently sells online from her room.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Rent ₦1,500,000 + shelves ₦200,000 + running costs ₦40,000 × 12. First-year total?',
        answers: ['2180000', '2,180,000', '₦2,180,000', '₦2180000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should Ngozi find out before deciding?',
        options: [
          { text: 'Whether the shop would bring enough extra sales to cover ₦2.18 million' },
          { text: 'What colour to paint it', why: 'First, whether it pays.' },
          { text: 'Whether her friends have shops', why: 'That\'s comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada helps Ngozi decide.',
        lines: ['Write the choice', 'Find the total first-year cost', 'Name the opportunity cost', 'Run 10/10/10', 'Decide: now, later or never'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the shop\'s total cost, or not?',
        groups: ['Part of total cost', 'Not part of it'],
        items: [
          { text: 'Rent', group: 0 },
          { text: 'Shelves', group: 0 },
          { text: 'Electricity and security', group: 0 },
          { text: 'How proud she\'d feel', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Ngozi, what could ₦2.18 million do instead?',
        prompt: 'Why is this a good question?',
        options: [
          { text: 'It\'s the opportunity cost: more stock, ads, or a safety fund might grow the business more' },
          { text: 'It\'s rude', why: 'It\'s helpful.' },
          { text: 'It doesn\'t matter', why: 'It\'s the heart of the decision.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Ngozi\'s 10/10/10 for the shop. Match each time to a likely feeling.',
        pairs: [
          ['10 minutes', 'Excited: a real shop!'],
          ['10 months', 'Depends on whether sales grew'],
          ['10 years', 'Proud if it grew, stressed if it didn\'t'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What could Ngozi try first, to test the idea cheaply?',
        options: [
          { text: 'A stall at a weekend market for a month, to see if in-person sales are real' },
          { text: 'Sign the lease today', why: 'Test first; it\'s a ₦2 million decision.' },
          { text: 'Never try', why: 'A cheap test is the smart middle.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ngozi\'s thinking ignores total cost?',
        lines: [
          'The shop is ₦1.5 million a year.',
          'Plus shelves and running costs.',
          'So it\'s only ₦125,000 a month, easy.',
        ],
        bug: 2,
        fix: 'It\'s about ₦180,000 a month with everything, in the first year.',
        explanation: '₦1.5m ÷ 12 is only the rent. The total is ₦2.18m.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 tools.',
        template: 'Total [[1]], opportunity cost, 10/10/[[2]], and "would I buy it [[3]]?"',
        blanks: [['cost'], ['10'], ['again']],
        distractors: ['price', 'now'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mum needs ₦200,000. Ada\'s Mexico gap is already ₦55,000. If she gave all ₦200,000 from the fund, how far short would Mexico be?',
        answers: ['255000', '255,000', '₦255,000', '₦255000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which of Ada\'s values are in tension now?',
        options: [
          { text: 'Family (her top value) and adventure (Mexico City)' },
          { text: 'Growth and comfort', why: 'The tension is family vs the trip.' },
          { text: 'None', why: 'Two top values clash.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Could help Ada with Mum\'s freezer without abandoning Mexico, or not?',
        groups: ['Could help', 'Won\'t help'],
        items: [
          { text: 'Asking her siblings to share the cost', group: 0 },
          { text: 'A freelance design job', group: 0 },
          { text: 'A 5-minute loan app', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have two of your values ever pulled against each other with money? What did you do?',
    starters: ['My values...', 'I chose...'],
  },
  notes: 'Chapter 4 challenge. Ngozi\'s shop (fictional): 1,500,000 + 200,000 + 480,000 = 2,180,000 first year (~181,700/month). Mum\'s freezer ₦200,000 (narrated): cliffhanger into Ch5 (family vs Mexico).',
};

export default lesson;
