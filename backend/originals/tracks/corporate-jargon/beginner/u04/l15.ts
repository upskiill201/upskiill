import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 plus earlier. Story beat: Remi meets the board. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Remi meets the board',
  summary: 'Thursday, 4:00. Five board members walk onto the fourth floor with Mr Kamau. He stops at Remi\'s desk. "This is Remi, one of our interns." Thirty seconds. Go.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Introduce yourself, make small talk and thank people under pressure', 'Choose the right register for very senior people'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 4:00 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The board walks through the office once a quarter. Today, five of them, in very good suits, with Mr Kamau and Mrs Achieng. The whole floor is suddenly very busy typing.' },
        { speaker: 'kamau', text: 'And this is Remi, one of our interns. He built the delivery tracker I mentioned.' },
        { speaker: 'narrator', text: 'A board member, a tall woman with silver glasses, smiles at Remi. "Tell me about it."' },
        { speaker: 'remi', text: '(Name. Role. What I\'m working on. A link. Slowly.)' },
        { speaker: 'tey', text: "Four days ago: \"Yo.\" Today: the board. You've got this." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3. The board visit.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The board member says, "Tell me about it." Remi\'s opening?',
        options: [
          { text: '"Yo, so basically it\'s a spreadsheet thing..."', why: 'Two problems in five words.' },
          { text: '"Um, it\'s nothing really."', why: 'Mr Kamau just mentioned it. Don\'t undersell it.' },
          { text: '"Good afternoon. I\'m Remi, an intern in Strategy and Operations. The tracker shows why our Mombasa deliveries are late."' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Remi\'s 30 seconds, in order.',
        lines: ['Good afternoon, I\'m Remi,', 'an intern in Strategy and Operations.', 'The tracker shows why Mombasa deliveries are late.', 'Would you like to see this week\'s numbers?'],
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'Remi has been here four weeks. How are you finding Synergix?',
        prompt: 'Small talk in front of the board. Remi\'s answer?',
        options: [
          { text: 'Really well, thank you. Everyone has been very generous with their time, especially Brian and Mrs Achieng.' },
          { text: 'Lit, honestly.', why: 'The register has left the building.' },
          { text: 'Fine.', why: 'One word, in front of the board.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to say to a board member, or not?',
        groups: ['Safe', 'Avoid'],
        items: [
          { text: 'How was your trip in today?', group: 0 },
          { text: 'How much do board members get paid?', group: 1 },
          { text: 'Would you like to see the tracker?', group: 0 },
          { text: 'Between us, Brian\'s jargon is a lot.', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The four parts of an introduction: name, role, what you\'re working on, and a ___ to them. (one word)',
        answers: ['link'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'The board member asks something Remi can\'t answer: "What will this save us per year?" Best reply?',
        options: [
          { text: '"Millions, probably."', why: 'A guess in front of the board is dangerous.' },
          { text: '"I\'m not sure yet. Let me work it out with Finance and send it to Mr Kamau\'s office this week."' },
          { text: '"Not my job."', why: 'In front of the board. No.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s thank-you to Mrs Achieng afterwards. Which line is too vague?',
        lines: [
          'Dear Mrs Achieng,',
          'Thanks for stuff.',
          'Kind regards, Remi',
        ],
        bug: 1,
        fix: 'Thank you for preparing me for the board visit. Your thirty-second rule worked.',
        explanation: 'A specific thank-you: what she did, and why it mattered.',
      },
      {
        kind: 'mcq',
        prompt: 'As the board moves on, how does Remi close?',
        options: [
          { text: '"Bye!"', why: 'A little abrupt for the board.' },
          { text: 'Nothing; he turns back to his screen', why: 'A short close is kinder.' },
          { text: '"Lovely to meet you. Thank you for your time."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier in the chapter.',
        pairs: [
          ['Could you...?', 'Everyday polite request'],
          ['Own it, fix it, prevent it', 'A professional apology'],
          ['gonna', 'going to'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['B2B', 'Sells to other businesses'],
          ['Hard stop', 'Must leave at a fixed time'],
          ['FYI', 'For your information'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s message to Brian afterwards.',
        template: 'Hi Brian, the board asked what the tracker will [[1]] per year. I\'ll work it out with [[2]] and send it to Mr Kamau\'s office by [[3]].',
        blanks: [['save'], ['Finance', 'Wanjiku'], ['Friday', 'Wednesday']],
        distractors: ['lol', 'stuff'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s close.',
        tiles: ['Lovely', 'to', 'meet', 'you.', 'Thank', 'you', 'for', 'your', 'time.'],
        distractors: ['Yo', 'bye'],
      },
    ],
  },
  reflect: {
    prompt: 'Imagine the most senior person you could meet in your field walks past. What\'s your 30-second introduction, and how would you close?',
    starters: ['I\'d say...', 'I\'d close with...'],
  },
  deepen: {
    title: 'Be ready for the corridor',
    summary: 'Keep your 30-second introduction ready in your head. The best opportunities often arrive unplanned: in a lift, a corridor, a canteen.',
  },
  notes: 'Review of lessons 11–14 plus earlier. Board member unnamed.',
};

export default lesson;
