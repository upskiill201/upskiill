import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Before/After: scarcity and countdown timers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Only 3 left! (Are there?)',
  summary: 'That evening Kofi opens the boots page again. The countdown says 04:59, exactly as it did weeks ago. He refreshes. 04:59 again. Real scarcity vs fake scarcity, side by side.',
  minutes: 11,
  outcomes: [
    'Explain why scarcity makes things feel more valuable',
    'Spot fake countdowns and fake stock warnings',
    'Test a scarcity claim before believing it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Fake scarcity vs real scarcity',
      before: {
        label: 'Fake scarcity',
        text: '"Ends in 04:59" that restarts every time you refresh\n"Only 3 left!" on every product, every day\n"12 people are looking at this right now" with no way to check\n"Sale ends tonight!" and the same sale next week\nDesigned to make you buy before you think',
      },
      after: {
        label: 'Real scarcity',
        text: 'Concert tickets for one night, with a fixed number of seats\nA limited print run with the number stated\nMum\'s last bolt of an old print she won\'t restock, said honestly\nA real deadline you can check, like exam registration\nScarce, but with time and information to decide',
      },
      notes: [
        'Scarcity works on us: things seem more valuable when they seem rare or about to disappear (Cialdini calls it one of the main levers of persuasion).',
        'Fake countdowns that reset are one of the most common tricks found on shopping websites.',
        'Test it: refresh the page, come back tomorrow, check another seller. Fake scarcity usually fails the test.',
        'Even real scarcity isn\'t a reason to buy something you don\'t want. Missing out on a thing you didn\'t need costs nothing.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Test any "only X left" or countdown: refresh, wait a day, check elsewhere. If it\'s still there, the scarcity wasn\'t real.',
    },
  ],
  apply: {
    scenario: 'The countdown that never ends.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fake scarcity or real scarcity?',
        groups: ['Fake', 'Real'],
        items: [
          { text: 'A countdown that restarts on refresh', group: 0 },
          { text: 'Concert seats for one night', group: 1 },
          { text: '"Only 3 left!" on every item, every day', group: 0 },
          { text: 'Exam registration closing on a fixed date', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi refreshes and the timer says 04:59 again. What does that tell him?',
        options: [
          { text: 'The countdown is fake: there\'s no real deadline' },
          { text: 'He got lucky', why: 'It restarts every time.' },
          { text: 'The sale is ending soon', why: 'It never ends.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to test a scarcity claim.',
        lines: ['Notice the claim', 'Refresh the page', 'Wait a day', 'Check another seller', 'Decide calmly'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'The site says 12 people are looking at these sneakers RIGHT NOW. I have to buy!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Can you check that? Neither can I. Screenshot it and look again tomorrow. I bet it still says 12.' },
          { text: 'Quick, buy them!', why: 'An unverifiable number designed to rush him.' },
          { text: 'Sneakers are bad.', why: 'The sneakers aren\'t the problem; the pressure is.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: '[[1]], wait a [[2]], check [[3]].',
        blanks: [['Refresh'], ['day'], ['elsewhere']],
        distractors: ['Buy', 'hour'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does scarcity make things feel more valuable?',
        options: [
          { text: 'We tend to want things more when they seem rare or about to disappear' },
          { text: 'Scarce things are always better quality', why: 'Rarity doesn\'t mean quality.' },
          { text: 'It doesn\'t', why: 'It\'s one of the most studied levers of persuasion.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which claim on this sale page can\'t be checked?',
        lines: [
          'Size 44, black, rubber studs.',
          'Price: GH₵480.',
          'Hurry! 47 people bought this in the last hour.',
          'Returns: not accepted on sale items.',
        ],
        bug: 2,
        fix: 'Ignore claims you can\'t check.',
        explanation: 'You have no way to verify "47 people in the last hour". It\'s there to make you hurry.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each claim to the best test.',
        pairs: [
          ['Countdown timer', 'Refresh the page'],
          ['"Sale ends tonight"', 'Check again next week'],
          ['"Only 3 left"', 'Look again tomorrow'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Concert tickets really are scarce. Should Kofi buy them because of that?',
        options: [
          { text: 'Only if he really wants to go and it fits his budget' },
          { text: 'Yes, scarcity means buy', why: 'Missing something you didn\'t want costs nothing.' },
          { text: 'Never buy scarce things', why: 'If he wants to go and can afford it, fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The boots\' 04:59 countdown resets every time. How many minutes does Kofi really have to decide? (Type "unlimited" or a number.)',
        answers: ['unlimited', 'infinite', 'as long as he likes', 'no limit'],
        placeholder: 'Your answer',
      },
    ],
  },
  reflect: {
    prompt: 'Next time you see "only X left" or a countdown, test it. What happened?',
    starters: ['I saw...', 'When I tested it,...'],
  },
  deepen: {
    title: 'Scarcity research',
    summary: 'In a classic study, people rated cookies from a jar with two cookies as more desirable than identical cookies from a jar with ten (Worchel, Lee and Adewole, 1975). Same cookies. Fewer of them. More wanted.',
  },
  notes: 'Cialdini, R. B. Influence (scarcity principle). Worchel, Lee & Adewole (1975), JPSP: cookie jar study. Fake countdown timers documented in Mathur et al. (2019) dark-patterns crawl (see L06).',
};

export default lesson;
