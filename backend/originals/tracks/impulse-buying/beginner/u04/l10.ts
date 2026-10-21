import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: Yaw's way out. Cliffhanger: two weeks to Black Friday. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Yaw\'s way out',
  summary: 'Six weeks into Plan B. Yaw\'s debt is falling, and a cousin in Takoradi asks him for help with her own pay-later mess. Help Yaw help her, with everything from Chapter 4. Then Kofi\'s phone lights up: "BLACK FRIDAY IS COMING."',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a debt and pressure plan for someone else', 'Use pay-later knowledge, comparison, group spending and shame together'],
  learn: [
    {
      kind: 'story',
      title: 'Six weeks later',
      beats: [
        { speaker: 'narrator', text: 'Six weeks into Plan B. Parcels returned. App 2 paid off. App 1 on a payment plan, and the messages to his contacts have stopped since he reported them. App 3 nearly done.' },
        { speaker: 'yaw', text: 'GH₵2,900 to GH₵1,330. And I haven\'t bought anything on pay later since. Not one thing.' },
        { speaker: 'narrator', text: 'Yaw\'s phone buzzes. His cousin Akua in Takoradi: "Yaw, you\'re good with money now? I owe GH₵1,600 on two apps. My friends want me on a GH₵800 trip. Help."' },
        { speaker: 'yaw', text: '...Me? Good with money? Kofi, help me help her.' },
        { speaker: 'narrator', text: 'That night, every app on Kofi\'s phone changes colour at once. Black banners. Countdowns. "BLACK FRIDAY: 14 DAYS. Biggest deals of the year. Up to 80% off."' },
        { speaker: 'tey', text: 'That\'s Chapter 4: pay later, comparison, group spending, saying no, and swapping shame for a plan. Chapter 5: the biggest sale of the year, and whether everything Kofi has learned holds. First, Akua.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Akua owes GH₵1,600 on two pay-later apps (App X GH₵1,000, two payments late; App Y GH₵600, on time). Her friends want her on a GH₵800 trip. She has GH₵400 a month she could put towards debt.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Akua\'s first steps.',
        lines: ['Stop new pay-later today', 'List both debts on one page', 'Check for returnable items', 'Call App X about a plan', 'Pay a realistic amount every month'],
      },
      {
        kind: 'mcq',
        prompt: 'Which app should Akua deal with first?',
        options: [
          { text: 'App X: it\'s late and adding fees' },
          { text: 'App Y: it\'s smaller', why: 'Smaller, but on time. The late one costs more every week.' },
          { text: 'Neither until after the trip', why: 'Waiting adds fees.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At GH₵400 a month, how many months to clear GH₵1,600 (ignoring fees)?',
        answers: ['4', 'four', '4 months'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Akua\'s friends want her on the GH₵800 trip. What do I tell her to say?',
        prompt: 'Kofi\'s best suggestion?',
        options: [
          { text: '"I\'m out for this one, I\'m saving. Let\'s do something when you\'re back." Short, honest, no debt story needed.' },
          { text: 'Go on pay later, it\'s just one more.', why: 'That would make it GH₵2,400.' },
          { text: 'Tell them everything about her debts.', why: 'She doesn\'t owe them her story.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Akua went on the trip with pay later, what would she owe in total?',
        answers: ['2400', '2,400', 'GH₵2,400', 'GH₵2400'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good advice for Akua, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A stop rule on new pay-later', group: 0 },
          { text: 'Hide the messages and hope', group: 1 },
          { text: 'Tell one trusted person (Yaw)', group: 0 },
          { text: 'Borrow from a new app to pay the old ones', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 4 idea to Akua\'s situation.',
        pairs: [
          ['Pay later is borrowing', 'GH₵1,600 on two apps'],
          ['Keeping up', 'Friends\' GH₵800 trip'],
          ['Shame makes it worse', 'She waited until two payments were late'],
          ['Call the lender early', 'App X payment plan'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Akua\'s draft plan. Which line will keep her in debt?',
        lines: [
          'Pay App X first, after agreeing a plan.',
          'Keep App Y\'s normal payments.',
          'Use a new app to "pay off" the old ones.',
          'No new pay later until both are paid.',
        ],
        bug: 2,
        fix: 'Pay from her budget, not from new borrowing.',
        explanation: 'Moving debt to a new app rarely reduces it, and often adds fees.',
      },
      {
        kind: 'fillBlank',
        prompt: 'What Yaw tells Akua, from experience.',
        template: 'Turn the phone [[1]], write the numbers [[2]], and tell one [[3]].',
        blanks: [['over'], ['down'], ['person']],
        distractors: ['off', 'app'],
      },
      {
        kind: 'mcq',
        prompt: 'Yaw went from GH₵2,900 to GH₵1,330 in six weeks. Which move made the biggest single difference?',
        options: [
          { text: 'Returning the unopened parcels (GH₵900)' },
          { text: 'Deleting his social media', why: 'Helpful, but the returns cut the most debt at once.' },
          { text: 'Working double shifts', why: 'He didn\'t; he used a realistic budget.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Black Friday: "Up to 80% off." Which tricks will Kofi probably meet?',
        options: [
          { text: 'Anchors, countdowns, scarcity and pay-later offers, all at once' },
          { text: 'None; Black Friday is honest', why: 'It\'s the biggest trick season of the year.' },
          { text: 'Only real discounts', why: 'Some are real. Many use the tricks from Chapter 3.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days until Black Friday, according to the banners?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Who could you help with what you\'ve learned? What would you say first?',
    starters: ['I could help...', 'I\'d start by saying...'],
  },
  notes: 'Chapter 4 challenge. Yaw at week 6 of Plan B: 2,900 → 1,330 (returns 900; App 2 paid off 150; payments on App 1 and 3; fictional). Akua (Yaw\'s cousin, narrated, Takoradi): App X 1,000 late, App Y 600; trip 800. Cliffhanger: Black Friday in 14 days.',
};

export default lesson;
