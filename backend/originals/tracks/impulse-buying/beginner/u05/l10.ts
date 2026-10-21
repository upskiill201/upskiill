import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: Black Friday. Ending: Makola at Christmas. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: Black Friday',
  summary: 'The day arrives. Every app is screaming. Kofi has one item on his list, Yaw has zero, and both have a plan. Then, a few weeks later, Christmas at Makola, and one last "last one". Your final challenge: your own pause plan.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every tool from the course in a real sale', 'Write your own pause plan', 'Spend on purpose from today'],
  learn: [
    {
      kind: 'story',
      title: 'The day',
      beats: [
        { speaker: 'narrator', text: 'Black Friday, 7 a.m. Kofi opens one app and types one search. Audio interface: GH₵720. He checks two other shops: GH₵890, GH₵910. Below his GH₵800 limit, GH₵160 under the lowest usual price.' },
        { speaker: 'narrator', text: 'A pop-up: "Add a carrying case? Only GH₵99! 2 left!" He closes it. He types his card details in. No pay later. Done. He closes the app.' },
        { speaker: 'narrator', text: 'Across the room, Yaw is at his desk with his phone in a drawer and a revision timetable. "App 1 is nearly paid. I\'m not undoing that for a speaker."' },
        { speaker: 'narrator', text: 'Kofi puts the GH₵180 left from his interface fund towards his emergency fund. Then they go to play football.' },
        { speaker: 'narrator', text: 'Three weeks later. Christmas at Makola. The market is packed. Kofi is helping at Mum\'s stall again when a trader with a phone tray stops him.' },
        { speaker: 'narrator', text: '"My brother! Earbuds, last pair! For you, special price, today only!"' },
        { speaker: 'kofi', text: 'Thank you, boss. Is it really the last pair? ...I\'ll think about it tomorrow.' },
        { speaker: 'narrator', text: 'The trader laughs and moves on. Behind the table, Mum puts down her notebook and laughs too. A big, proud Makola laugh.' },
        { speaker: 'narrator', text: '"Last pair," she says. "He has a whole box under his tray. You\'ve learned, my son."' },
        { speaker: 'tey', text: 'That\'s Kofi\'s year: a missing GH₵1,437, a dead laptop paid in cash, and a pause list he\'ll keep for life. Now, your final challenge.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge. Practise on Ama (23, phone shop, Accra) facing her first Black Friday with GH₵500 saved for a blender she\'s planned for months. Then build your own pause plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ama\'s Black Friday plan.',
        lines: ['List: the blender', 'Note the usual price at three shops', 'Set a price limit', 'Remove saved cards', 'Search, don\'t scroll', 'Buy and close the app'],
      },
      {
        kind: 'mcq',
        prompt: 'The usual price is GH₵520 to GH₵560. Black Friday: "Was GH₵1,200, now GH₵499!" Is it a real deal?',
        options: [
          { text: 'Yes, about GH₵21 below the lowest usual price; the "was" is just an anchor' },
          { text: 'Yes, 58% off!', why: 'Only against the anchor. The real saving is about GH₵21.' },
          { text: 'No, it\'s a scam', why: 'It\'s slightly below usual. A small but real saving.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ama sees these during the sale. Buy, pause, or ignore?',
        groups: ['Buy (planned)', 'Pause', 'Ignore (trick)'],
        items: [
          { text: 'The blender at GH₵499', group: 0 },
          { text: 'A GH₵350 speaker she suddenly wants', group: 1 },
          { text: '"Add warranty?" pre-ticked', group: 2 },
          { text: '"Only 2 left! 09:59"', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'With a GH₵200 line, how many days does the GH₵350 speaker wait?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Ama\'s friend says: "Everyone\'s doing a Black Friday haul. Do yours on pay later!"',
        prompt: 'Your best advice for Ama?',
        options: [
          { text: 'One planned blender, paid in full. A haul on pay later is how Yaw\'s GH₵2,900 started.' },
          { text: 'Do the haul, it\'s once a year.', why: 'Once a year can still mean months of debt.' },
          { text: 'Skip the blender too.', why: 'It\'s planned and saved for. That\'s a good buy.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the course tool.',
        pairs: [
          ['Bored at 1 a.m., scrolling', 'HALT + BS, phone by the door'],
          ['"Was GH₵1,200"', 'Check the usual price'],
          ['"Pay in 4!"', 'Only if I could pay in full'],
          ['Friends\' haul posts', 'Wait a week'],
          ['After buying', 'Close the app'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ama\'s plan. Which line will undo the rest?',
        lines: [
          'List: blender. Limit: GH₵520.',
          'Cards removed. Pay later off.',
          'After buying, browse "recommended for you" for 20 minutes.',
          'Anything unplanned: screenshot to the wishlist.',
        ],
        bug: 2,
        fix: 'After buying, close the app.',
        explanation: 'The recommendations are designed to start the next urge.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ama earns about GH₵15 an hour. The blender at GH₵499 is about how many hours? (Round to the nearest hour.)',
        answers: ['33', 'thirty-three', '33.3'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Ama uses the blender every morning for two years (about 700 uses). Cost per use?',
        options: [
          { text: 'About 70 pesewas' },
          { text: 'About GH₵7', why: '499 ÷ 700 ≈ 0.71.' },
          { text: 'About GH₵70', why: 'Far too high: 499 ÷ 700 is under one cedi.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What did Kofi do with the GH₵180 left in his interface fund?',
        options: [
          { text: 'Moved it to his emergency fund' },
          { text: 'Spent it on the carrying case', why: 'He closed that pop-up.' },
          { text: 'Lent it to Yaw', why: 'Yaw is following his own plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'Know your [[1]], see the [[2]], [[3]] before you buy, and spend on [[4]].',
        blanks: [['triggers'], ['tricks'], ['pause'], ['purpose']],
        distractors: ['debts', 'credit'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Mum laugh at the end?',
        options: [
          { text: 'Kofi used her own rule on a trader: "Is it really the last one?"' },
          { text: 'The trader was funny', why: 'She laughed because of what Kofi did.' },
          { text: 'Kofi bought the earbuds', why: 'He didn\'t.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Your project: write your own one-screen pause plan. Your HALT + BS check, your pause times, your three questions, your top two triggers with swaps, the tricks you fall for, your people rules, and your fun line. Pin it. What\'s the first rule on it?',
    starters: ['My first rule:...', 'My pause times:...', 'My top trigger and swap:...', 'My fun line:...'],
  },
  deepen: {
    title: 'Your project, step by step',
    summary: 'Tonight: start an urge log (Ch1). After a week, map your triggers and write two if-then swaps (Ch2). Annotate one sales page (Ch3). Write your pressure rules (Ch4). Do the 20-minute phone clean-up, set your pause times and pin your list (Ch5). Then compare your urge log in a month.',
  },
  notes: 'Final challenge. Black Friday per running numbers: interface 720 (other shops 890, 910); GH₵180 left of the 900 fund → emergency fund. Yaw buys nothing. Christmas at Makola: trader "last pair" (has a box). Ama practice persona: blender usual 520–560, BF 499; rate GH₵15/h → 33 h; 499/700 ≈ 0.71. Track finale for the Kofi trilogy.',
};

export default lesson;
