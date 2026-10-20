import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 7 — learning a new job fast. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Learning fast',
  summary: 'Njangi Pay has hundreds of files, dozens of acronyms and a meeting called "PSR" that nobody explains. Clinton feels like he\'s drinking from a fire hose. Tey shows him how to learn a new workplace faster.',
  minutes: 11,
  outcomes: ['Map a new workplace quickly', 'Keep a glossary of unknown words', 'Check your understanding by explaining it back'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'In a new job, almost everything is unfamiliar at once. Trying to learn it all equally is exhausting. Where would you start?',
          replies: ['With the code', 'I don\'t know'],
        },
        {
          tey: 'Start with a map: what the product does for customers, how money and data flow through it, and which team owns what. Draw it on one page. Details make sense once you have the map.',
          replies: ['And all the acronyms?'],
        },
        {
          tey: 'Keep a glossary. Every time you hear a word you don\'t know, like "PSR", write it down and find out what it means. Clinton\'s glossary hits 40 words in two weeks. PSR turns out to mean "payment status report".',
          replies: ['How do I know I really understand?'],
        },
        {
          tey: 'Explain it back. "So, when a driver confirms offline, the phone stores it, and the sync service sends it when data returns. Is that right?" If you can explain it simply, you understand it. If not, you\'ve found your next question.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Draw the map first. Keep a glossary. Explain it back to check you understand.',
    },
  ],
  apply: {
    scenario: 'Clinton learns Njangi Pay fast.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should Clinton start learning?',
        options: [
          { text: 'A one-page map of how the product and teams fit together' },
          { text: 'Every file, in alphabetical order', why: 'Map first, details later.' },
          { text: 'Nowhere, wait for training', why: 'Start the map yourself.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the learning approach in order.',
        lines: ['Draw a one-page map', 'Keep a glossary of unknown words', 'Learn the details of your part', 'Explain it back to check'],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the map, or a detail for later?',
        groups: ['Map', 'Detail'],
        items: [
          { text: 'What the product does for customers', group: 0 },
          { text: 'The exact name of every function', group: 1 },
          { text: 'Which team owns what', group: 0 },
          { text: 'How money flows through the system', group: 0 },
          { text: 'The colour of every button', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best way to check understanding.',
        from: 'clinton',
        message: 'How do I check I\'ve understood the sync flow?',
        options: [
          { text: '"So the phone stores it and the sync service sends it when data returns. Is that right?"' },
          { text: 'Nod in meetings.', why: 'Explain it back instead.' },
          { text: 'Assume I get it.', why: 'Check by explaining it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that slows learning.',
        lines: ['Writing unknown words in a glossary.', 'Pretending to know what "PSR" means.', 'Drawing a one-page map.'],
        bug: 1,
        explanation: 'Pretending hides your gaps. Write it down and find out.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to why it helps.',
        pairs: [
          ['One-page map', 'Details make sense later'],
          ['Glossary', 'No more mystery words'],
          ['Explain it back', 'Shows what you really understand'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does PSR mean at Njangi Pay?',
        options: [
          { text: 'Payment status report' },
          { text: 'Paul\'s secret rules', why: 'Ha. Payment status report.' },
          { text: 'Nobody knows', why: 'Clinton found out: payment status report.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Draw the [[1]] first. Explain it [[2]].',
        blanks: [['map'], ['back']],
        distractors: ['code', 'away', 'twice'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many words were in Clinton\'s glossary after two weeks? (a number)',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Speeds up learning, or slows it?',
        groups: ['Speeds up', 'Slows'],
        items: [
          { text: 'Asking what an acronym means', group: 0 },
          { text: 'Trying to learn everything equally', group: 1 },
          { text: 'Explaining a flow back to Paul', group: 0 },
          { text: 'Hiding what you don\'t know', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last new thing you had to learn quickly. Would a map, a glossary or explaining it back have helped?',
    starters: ['I was learning...', 'What would have helped:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Draw a one-page map of where you work or study: what it does, how things flow, who owns what. Start a glossary on the back.',
  },
  notes: 'Explaining back is a form of retrieval and self-explanation, both well-supported learning strategies (see Study Smarter with AI). Kept as practical advice.',
};

export default lesson;
