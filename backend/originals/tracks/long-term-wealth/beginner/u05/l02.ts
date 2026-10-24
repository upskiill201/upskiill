import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: a plan for bad years, written in good ones. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Write the bad-year plan in a good year',
  summary: 'Folake keeps a single page in her drawer called "When it falls". She wrote it on a calm day, so panicking-Folake doesn\'t have to think. Step by step, Miracle writes hers.',
  minutes: 11,
  outcomes: [
    'Write a short plan for market falls in advance',
    'Know which money is for what during a fall',
    'Use a review schedule instead of reacting',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Miracle\'s "When it falls" page',
      steps: [
        { title: '1. Why this money exists', body: '"My long-term pot is for when I\'m 55 to 60. I won\'t need it for 30 years."' },
        { title: '2. What protects it', body: '"My emergency fund covers three months of must-haves. If something goes wrong, I use that, never the long-term pot."' },
        { title: '3. What I keep doing', body: '"Keep the monthly transfers going. Lower prices mean my money buys more."' },
        { title: '4. What I don\'t do', body: '"No selling in the first month of a fall. No borrowing to invest. No new hot tips."' },
        { title: '5. When I look', body: '"Quarterly, on my map review day. Not daily."' },
        { title: '6. Who I talk to', body: '"Folake, or a qualified adviser. Not the group chat."' },
        { title: '7. Sign it', body: 'She signs and dates it. On the red-screen morning, she reads it instead of deciding from scratch.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make decisions on calm days so you don\'t have to make them on scary ones. One page: why the money exists, what protects it, what you keep doing, what you don\'t do, when you look.',
    },
  ],
  apply: {
    scenario: 'The "When it falls" page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the page.',
        lines: ['Why this money exists', 'What protects it', 'What I keep doing', 'What I don\'t do', 'When I look'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the plan on a calm day?',
        options: [
          { text: 'Banks require it', why: 'It\'s a habit trick.' },
          { text: 'So scared-you follows calm-you\'s decisions instead of panicking' },
          { text: 'To predict the next fall', why: 'Nobody can predict falls reliably.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs on the "do" list or the "don\'t" list?',
        groups: ['Do', 'Don\'t'],
        items: [
          { text: 'Keep monthly transfers going', group: 0 },
          { text: 'Borrow to invest', group: 1 },
          { text: 'Review quarterly', group: 0 },
          { text: 'Follow new hot tips', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Isn\'t writing a plan for a fall just expecting the worst?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It\'s like a fire drill. You hope you never need it, but you\'re glad it exists.' },
          { text: 'Yes, it\'s pessimistic.', why: 'It\'s preparation.' },
          { text: 'Falls never happen.', why: 'They happen regularly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'Make decisions on [[1]] days so you don\'t have to make them on [[2]] ones.',
        blanks: [['calm'], ['scary']],
        distractors: ['busy', 'paydays'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its purpose.',
        pairs: [
          ['"I won\'t need it for 30 years"', 'Reminds her of the time horizon'],
          ['"I use the emergency fund"', 'Means she never has to sell'],
          ['"Quarterly, not daily"', 'Stops panic checking'],
          ['"Folake, not the group chat"', 'Gets calm advice'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Emmanuel\'s draft page undoes the point?',
        lines: [
          'This money is for retirement.',
          'My emergency fund protects it.',
          'If it falls more than 10%, I\'ll decide what to do then.',
        ],
        bug: 2,
        fix: 'If it falls, I keep the monthly amount going and review quarterly.',
        explanation: 'The page exists so you don\'t decide in the moment.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If she reviews quarterly, how many reviews is that a year?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does Miracle do on the red-screen morning?',
        options: [
          { text: 'Writes a new plan', why: 'The old one was written for this.' },
          { text: 'Reads her page instead of deciding from scratch' },
          { text: 'Asks the group chat', why: 'Her page says: not the group chat.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why is "no borrowing to invest" on the list?',
        options: [
          { text: 'It\'s always illegal', why: 'It\'s risky, not illegal.' },
          { text: 'It isn\'t important', why: 'It can turn a fall into a disaster.' },
          { text: 'Debt adds pressure and can force selling at the worst time' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write one line of your own "When it falls" page. What would calm-you want scared-you to remember?',
    starters: ['When it falls, I will...', 'Calm me wants me to remember...'],
  },
  deepen: {
    title: 'An investment policy statement',
    summary: 'Professional investors often write an "investment policy statement": goals, time horizon, rules and what to do in a fall. Miracle\'s one page is a simple personal version.',
  },
  notes: 'Pre-commitment device. IPS: standard professional practice.',
};

export default lesson;
