import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–3. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: option B',
  summary: 'Day 22. Mr Rao chose option B: the ₹100 comeback code for Diwali, loyalty points in January. The January list has six ideas on it. Monday and Thursday updates go out at 6 p.m. Mr Rao hasn\'t called once. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use change, scope and upwards tools without notes', 'Connect them to Chapters 1 to 3'],
  learn: [
    {
      kind: 'story',
      title: 'Day 22, 6:05 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Mr Rao replies to Thursday\'s update in four minutes: "Good. B is right. January list is good too." It\'s the longest reply he has ever sent.' },
        { speaker: 'kavya', text: 'He said "good" twice. Is he okay?' },
        { speaker: 'joel', text: 'He knows what\'s coming. That\'s all.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Day 22.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why hasn\'t Mr Rao called since the options?',
        options: [
          { text: 'He\'s lost interest', why: 'He replied in four minutes.' },
          { text: 'He chose the trade-off himself, and a steady rhythm tells him what\'s coming' },
          { text: 'Arjun blocked his number', why: 'Definitely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put handling a change request in order.',
        lines: ['Find the need behind it', 'Size it honestly', 'Build two or three options', 'Show the trade-off for each', 'Let them choose, then write it down'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool?',
        groups: ['Options', 'Scope creep', 'Upwards'],
        items: [
          { text: 'B: comeback code now, points in January', group: 0 },
          { text: 'Spinning logo goes on the January list', group: 1 },
          { text: 'Most important thing in line one', group: 2 },
          { text: 'Each option says what it costs', group: 0 },
          { text: 'Small changes aren\'t free', group: 1 },
          { text: 'Updates Monday and Thursday at 6', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Mr Rao\'s staff asked if we can add gift messages "just quickly".',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Sure, quickly.', why: 'Scope creep, one quick yes at a time.' },
          { text: 'Ignore them.', why: 'Give it a home, and tell them where it went.' },
          { text: 'Thanks for flagging it. It goes on the January list unless Mr Rao wants it more than coupons. I\'ll ask him in Thursday\'s update.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"We can try" is heard as ___. (one word)',
        answers: ['yes', 'Yes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What was the need behind "loyalty points"?',
        options: [
          { text: 'Customers coming back after Diwali' },
          { text: 'A gold level', why: 'One way to meet it.' },
          { text: 'A spinning logo', why: 'Different request.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Thursday\'s update. Which line breaks Chapter 4?',
        lines: [
          'Launch Day 28 on track; comeback code ready Day 24.',
          'We\'ve also quietly added a gift message box.',
          'January list: points, WhatsApp, gift messages.',
        ],
        bug: 1,
        fix: 'Gift messages: January, unless you\'d swap them for coupons.',
        explanation: 'A quiet addition is scope creep and a surprise.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Definition of done', 'Finished means these boxes'],
          ['Commander\'s intent', 'The why behind the task'],
          ['Later list', 'A home for new ideas'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why let the client choose between options?',
        options: [
          { text: 'So Arjun can blame them', why: 'It\'s about ownership, not blame.' },
          { text: 'It\'s their shop, and a choice they made is one they stand behind' },
          { text: 'Arjun doesn\'t care', why: 'He recommended B.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 so far.',
        template: 'Find the [[1]]. Give [[2]]. Most important thing in line [[3]].',
        blanks: [['need'], ['options'], ['one']],
        distractors: ['blame', 'four'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Joel\'s explanation.',
        tiles: ['He', 'knows', 'what\'s', 'coming.'],
        distractors: ['nothing'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life calls or chases you unexpectedly? What steady update rhythm might stop the chasing?',
    starters: ['They chase me about...', 'A rhythm could be...'],
  },
  deepen: {
    title: 'Pick a rhythm',
    summary: 'For one person who often chases you, pick two fixed days and times for updates. Tell them. Then never miss one.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–3.',
};

export default lesson;
