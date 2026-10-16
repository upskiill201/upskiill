import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Card deck: recognition that works (specific, timely, personal, peer). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Recognition that lands',
  summary: 'Miracle realises she\'s been recognising people the way she\'d want to be recognised: a big "well done" in front of everyone. Halima hates that. Bisi wants her boss to know. Chidi barely notices praise at all. Tey deals out the cards.',
  minutes: 11,
  outcomes: [
    'Make recognition specific, timely and personal',
    'Recognise effort and growth, not just results',
    'Build a team where peers recognise each other',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Recognition is one of the cheapest, strongest tools a leader has. A Gallup and Workhuman study (2023) found that employees who get strong recognition are far less likely to be looking to leave. But not all recognition lands. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Specific</h3><p>\"Nineteen clinics this week, and two of them were the Ogun ones nobody could crack.\" Not \"great job\".</p><h3>Card 2: Soon</h3><p>Friday's stand-up, not the quarterly review. The closer to the moment, the more it means.</p><h3>Card 3: Their way</h3><p>Bisi: in front of Folake. Halima: a private message. Chidi: a harder problem. Ask in a one-to-one: \"How do you like to be thanked?\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Effort and growth too</h3><p>Emmanuel's four clinics included Dr Bello's, the hardest login bug in Abeokuta. Recognise the hard ones and the improvement, not only the biggest number.</p><h3>Card 5: Peers, not just the boss</h3><p>Recognition from colleagues can matter as much as from managers. A two-minute \"shout-outs\" round at Friday stand-up, where anyone can thank anyone, spreads it.</p><h3>Card 6: Never as a sandwich</h3><p>\"Great clinics, but you need to answer faster\" turns praise into a warning. Keep recognition on its own.</p>",
    },
    {
      kind: 'check',
      question: 'How should Miracle find out how each person likes to be thanked?',
      options: ['Ask them in a one-to-one', 'Guess from their personality', 'Treat everyone the same'],
      answer: 0,
      explanation: 'Same as everything else in this course: ask, don\'t assume.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Specific, soon, their way. Recognise effort and growth, not just numbers. Let peers thank each other. Never as a sandwich.',
    },
  ],
  apply: {
    scenario: 'Recognition, card by card.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which recognition lands best for Bisi?',
        options: [
          { text: '"Great job, everyone!"', why: 'Too vague, and too shared.' },
          { text: 'A thank-you in the quarterly review', why: 'Too late.' },
          { text: '"Nineteen clinics, including the two Ogun ones nobody could crack," said in front of Folake' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lands well, or falls flat?',
        groups: ['Lands well', 'Falls flat'],
        items: [
          { text: 'Specific, the same day', group: 0 },
          { text: '"Great job, team!"', group: 1 },
          { text: 'A private note for Halima', group: 0 },
          { text: 'Praise with a "but" attached', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I only did four clinics. Bisi did nineteen.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, you need to catch up.', why: 'He just showed you he cares. Recognise the hard one.' },
          { text: 'One of your four was Dr Bello: the hardest login bug in Abeokuta. Nobody else had cracked it. That counts.' },
          { text: 'It\'s not a competition.', why: 'True, but it skips what he did well.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Recognition should be specific, soon, and done their ___. (one word)',
        answers: ['way', 'Way'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to how they like to be thanked.',
        pairs: [
          ['Bisi', 'In front of Folake'],
          ['Halima', 'A private message'],
          ['Chidi', 'A harder problem'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add peer shout-outs at stand-up?',
        options: [
          { text: 'Recognition from colleagues can matter as much as from the boss' },
          { text: 'To save Miracle time', why: 'It\'s about spreading recognition.' },
          { text: 'It\'s a game', why: 'It\'s a habit that builds a culture.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Friday recognition. Which line is a sandwich?',
        lines: [
          'Bisi: 19 clinics, including the two Ogun ones.',
          'Halima: brilliant Kano week, but your notes need to be shorter.',
          'Emmanuel: cracked Dr Bello\'s login.',
        ],
        bug: 1,
        fix: 'Halima: three Kano clinics live in Hausa, and two nurses trained.',
        explanation: 'A "but" turns the praise into a warning. Give feedback separately.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put good recognition in order.',
        lines: ['Notice what they did', 'Say it specifically', 'Say it soon', 'Say it their way'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Recognise [[1]] and growth, not just the biggest [[2]].',
        blanks: [['effort'], ['number', 'numbers']],
        distractors: ['luck', 'speech'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the one-to-one question.',
        tiles: ['How', 'do', 'you', 'like', 'to', 'be', 'thanked?'],
        distractors: ['paid?'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you like to be thanked? Have you ever told anyone? How do the people around you like it?',
    starters: ['I like to be thanked...', 'I think they like...'],
  },
  deepen: {
    title: 'Ask the thank-you question',
    summary: 'Ask one person: "How do you like to be thanked for good work?" Then do it that way, next time.',
  },
  notes: 'Gallup & Workhuman (2023), "Empowering Workplace Recognition". Peer recognition: Workhuman research on peer-to-peer recognition, hedged. Individualised recognition: Gallup Q12 item 4 ("In the last seven days, I have received recognition or praise for doing good work"). Fictional details.',
};

export default lesson;
