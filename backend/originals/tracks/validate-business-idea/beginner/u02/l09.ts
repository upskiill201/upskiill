import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: evidence board v2, the laundry surprise. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Evidence board v2',
  summary: 'Clinton updates his board after fifteen conversations. The food cards are crossed out. New cards appear, about laundry, and two of them already have evidence.',
  minutes: 11,
  outcomes: [
    'Update an evidence board after interviews',
    'Retire assumptions the evidence killed',
    'Pick the new riskiest assumption',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Evidence board v2',
      text: 'Students will pay 500 FCFA for food delivery: killed. Hostel students struggle with laundry in rainy season: supported. They already spend time and money on it: supported. They would pay for a pickup service: untested, risk 25. They can be reached outside Mama Rose\'s stand and in hostel washing areas: untested, risk 8.',
      hotspots: [
        { phrase: 'Students will pay 500 FCFA for food delivery: killed', note: '1 of 10 paid in Chapter 1, and 7 said the stalls are close. Crossing it out isn\'t failure; it saved his savings.' },
        { phrase: 'struggle with laundry in rainy season: supported', note: '9 of 15 raised it without being asked, with detailed stories about last Saturday.' },
        { phrase: 'already spend time and money on it: supported', note: 'About 3 hours every Saturday by hand; 6 of 15 have paid Mama Rose this semester.' },
        { phrase: 'would pay for a pickup service: untested, risk 25', note: 'The new riskiest card. Paying Mama Rose sometimes isn\'t the same as paying Clinton every week.' },
        { phrase: 'can be reached outside Mama Rose\'s stand', note: 'He met his best interviewees there. Lower risk, but still untested at scale.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A killed card is a win: it\'s money you didn\'t spend on a wrong idea.',
    },
  ],
  apply: {
    scenario: 'Updating the board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "students will pay for food delivery" now marked killed?',
        options: [
          { text: 'Clinton got bored of it', why: 'Evidence killed it, not mood.' },
          { text: '1 of 10 paid, and most said the stalls are close' },
          { text: 'Nobody eats', why: 'They eat; they don\'t pay for delivery.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which label on board v2?',
        groups: ['Supported', 'Untested', 'Killed'],
        items: [
          { text: 'Students struggle with laundry in rainy season', group: 0 },
          { text: 'They\'d pay Clinton for pickup', group: 1 },
          { text: 'They\'d pay 500 FCFA for food delivery', group: 2 },
          { text: 'They already spend time and money on laundry', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its evidence.',
        pairs: [
          ['Laundry is a struggle', '9 of 15 raised it unprompted'],
          ['They already spend', '3 hours a Saturday; 6 paid Mama Rose'],
          ['Food delivery', '1 of 10 paid'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Two cards supported! Can I launch WashDay now?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, launch tonight.', why: 'The riskiest card is still untested.' },
          { text: 'No, laundry is a bad idea.', why: 'The evidence for the problem is good.' },
          { text: 'The problem is real. You still don\'t know if they\'d pay YOU, how many there are, or who else they could use. That\'s the next two chapters.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The new riskiest card.',
        template: 'They would [[1]] for a [[2]] service.',
        blanks: [['pay'], ['pickup']],
        distractors: ['like', 'food'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "6 of 15 paid Mama Rose" not the same as "they\'d pay Clinton"?',
        options: [
          { text: 'Paying an existing stand sometimes is different from paying a new service every week' },
          { text: 'It is exactly the same', why: 'Different service, different trust, different price.' },
          { text: 'Mama Rose is free', why: 'They paid her about 2,400 FCFA.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the risk score of the new riskiest card, "they would pay for a pickup service"?',
        answers: ['25', 'twenty-five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which card on Clinton\'s board v2 is over-claimed?',
        lines: [
          'Laundry is a struggle in rainy season: supported (9 of 15)',
          'They spend time and money on it: supported',
          'They would pay me for pickup: supported (they pay Mama Rose)',
          'Food delivery: killed',
        ],
        bug: 2,
        fix: 'They would pay me for pickup: untested',
        explanation: 'Paying Mama Rose isn\'t evidence they\'d pay a new service.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how the board changed this chapter.',
        lines: ['Food delivery card tested and killed', 'Laundry comes up in interviews', 'New laundry cards added', 'Two cards supported by notes', 'New riskiest card picked'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence from this chapter, or still a guess?',
        groups: ['Evidence', 'Still a guess'],
        items: [
          { text: '9 of 15 raised laundry unprompted', group: 0 },
          { text: 'Students will order every week', group: 1 },
          { text: '6 of 15 paid Mama Rose this semester', group: 0 },
          { text: 'WashDay will be popular', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Update your own evidence board after your first conversations. What got supported, what got killed, and what\'s your new riskiest card?',
    starters: ['Supported:...', 'My new riskiest card is...'],
  },
  deepen: {
    title: 'Pivots start here',
    summary: 'Clinton didn\'t "give up" on CampusEats; the evidence moved him. Changing direction based on what customers show you is called a pivot. Chapter 5 covers when to pivot and when to keep going.',
  },
  notes: 'Board v2 summarises Chapters 1-2 (fictional data): food delivery killed (1/10 paid); laundry struggle supported (9/15 unprompted); spending supported (3 h/Saturday, 6/15 paid Mama Rose); pay-for-pickup untested, risk 25; reach via Mama Rose\'s stand and washing areas untested, risk 8.',
};

export default lesson;
