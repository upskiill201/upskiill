import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 plus Chapter 1. Story beat: the "quick 15" that lasted an hour. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the quick 15 that lasted an hour',
  summary: 'Zanele books "a quick 15" with Brian and Remi to talk about one tab of her spreadsheet. Sixty-two minutes later, nobody remembers what the tab was.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode meeting types, invite words and agenda words', 'Spot why a meeting runs over, and fix it'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 4:00 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Calendar invite from Zanele: "Quick 15 re: courier tab". No agenda. No purpose. Brian and Remi are required.' },
        { speaker: 'zanele', text: 'Thanks for coming! So, the courier tab. Actually, first, the colours. And then I had a thought about drones...' },
        { speaker: 'narrator', text: '4:15. They\'re on the colours. 4:40. Brian is telling a story about a printer from 2011. 5:02. Brian\'s phone buzzes: he\'s late for his next meeting.' },
        { speaker: 'brian', text: 'Great session! Let\'s circle back. Remi, what did we decide?' },
        { speaker: 'remi', text: '(Nothing. We decided nothing.)' },
        { speaker: 'tey', text: "Every mistake in that meeting is something you've learned this week. Let's find them all." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1. The quick 15, autopsy.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Zanele\'s "quick 15" invite need most?',
        options: [
          { text: 'A longer title', why: 'The title was fine. It needed a reason to exist.' },
          { text: 'A purpose and an agenda' },
          { text: 'More people', why: 'More people usually makes meetings longer.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What was each problem? Sort them.',
        groups: ['No purpose', 'No time limits', 'No parking lot'],
        items: [
          { text: 'Nobody knew what had to be decided', group: 0 },
          { text: 'The colours took 25 minutes', group: 1 },
          { text: 'Drones came up and took over', group: 2 },
          { text: 'The printer story from 2011', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the meeting type.',
        pairs: [
          ['Stand-up', 'Short daily team update'],
          ['Sync', 'Get up to date with each other'],
          ['1:1', 'You and your manager'],
          ['All-hands', 'The whole company'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'That ran a bit long, sorry! Can we do another quick 15 tomorrow?',
        prompt: 'What does Remi suggest?',
        options: [
          { text: 'Sure, same as today!', why: 'Same setup, same result.' },
          { text: 'No more meetings, ever.', why: 'Too far. The meeting can work with a purpose.' },
          { text: 'Yes! Can we write down the one thing we need to decide first, and park the drones?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Remi is "optional" on an invite and has a deadline. What should he do?',
        options: [
          { text: 'Decide whether he can actually help; if not, decline politely and ask for the notes' },
          { text: 'Always go, optional means required', why: 'Optional means it\'s his call.' },
          { text: 'Ignore it', why: 'A short reply is kinder to the organiser.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A time someone must leave, no matter what, is a ___ stop. (one word)',
        answers: ['hard'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s new agenda. Which line still needs work?',
        lines: [
          'Purpose: agree the 3 courier costs we track.',
          '1. Show the courier tab (5 min, Zanele)',
          '2. Colours, drones, anything else (30 min, all)',
          '3. Decide and assign owners (5 min, Brian)',
        ],
        bug: 2,
        fix: 'Parking lot: colours, drones.',
        explanation: 'Colours and drones aren\'t the purpose. They belong in the parking lot.',
      },
      {
        kind: 'mcq',
        prompt: 'A meeting invite says 3:00 p.m. EAT. Zanele\'s colleague is in Lagos, two hours behind. When does he join?',
        options: [
          { text: '5:00 p.m.', why: 'Lagos is behind Nairobi, not ahead.' },
          { text: '3:00 p.m.', why: 'Different time zone.' },
          { text: '1:00 p.m.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Brian\'s rule, written on the whiteboard after the meeting.',
        template: 'No [[1]], no meeting. Every item gets a [[2]]. Everything else goes in the parking [[3]].',
        blanks: [['agenda', 'purpose'], ['time'], ['lot']],
        distractors: ['snack', 'drone'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Circle back', 'Come back to it later'],
          ['Quick win', 'Easy and useful'],
          ['Keep me in the loop', 'Keep me informed'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Brian asks, "What did we decide?" and the answer is nothing. What\'s the most useful thing Remi can say?',
        options: [
          { text: '"We didn\'t quite get there. Shall I send a short note with the one decision we need, so we can do it in 10 minutes tomorrow?"' },
          { text: '"Nothing, that was a waste of time."', why: 'True-ish, but it helps nobody, and Zanele is right there.' },
          { text: '"We decided lots of things!"', why: 'Brian will find out it isn\'t true. Be honest, and helpful.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question that saves any wandering meeting.',
        tiles: ['What', 'do', 'we', 'need', 'to', 'decide', 'today?'],
        distractors: ['drones', 'colours'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the longest "quick" meeting, call or chat you\'ve ever been in? Which of today\'s fixes would have saved it?',
    starters: ['It was...', 'The fix that would have saved it is...'],
  },
  deepen: {
    title: 'The one-question rescue',
    summary: 'Next time a meeting or call drifts, try asking, kindly: "What do we need to decide today?" Watch how quickly everyone refocuses.',
  },
  notes: 'Review of lessons 1–4 plus Chapter 1. EAT (UTC+3) vs Lagos WAT (UTC+1).',
};

export default lesson;
