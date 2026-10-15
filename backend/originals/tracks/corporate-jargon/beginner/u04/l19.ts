import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 19. Before/After: the professional phrasebook — Remi's Monday update vs his Friday update, every tool from the chapter at once. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your professional phrasebook',
  summary: 'Remi finds Monday\'s update to Brian in his sent folder. He reads it with Friday eyes. Every tool from the week can fix one line of it.',
  minutes: 12,
  outcomes: [
    'Spot and fix every register mistake in one message',
    'Build your own phrasebook of professional swaps',
    'Rewrite a casual message in one minute',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi\'s update to Brian: Monday vs Friday',
      before: {
        label: 'Monday',
        text: 'hey bro so sorry sorry for the late update!! gonna finish the tracker stuff tmrw, dunno about the lagos data tho, not my thing. noted on the deadline. thx',
      },
      after: {
        label: 'Friday',
        text: 'Hi Brian, thanks for your patience. I\'ll finish the tracker on Monday. I\'m not sure yet why the Lagos data arrives late, so I\'ll check with Emeka and update you by Tuesday. Thanks, Remi',
      },
      notes: [
        'Greeting: "hey bro" became "Hi Brian".',
        'Apology: "so sorry sorry" became "thanks for your patience".',
        'Slang: "gonna", "stuff", "tmrw", "tho" became plain words and a real day.',
        'Dead end: "dunno, not my thing" became "I\'ll check with Emeka and update you by Tuesday".',
        'Cold word: "noted" disappeared. Sign-off: "thx" became "Thanks, Remi".',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Remi's phrasebook, one page:</strong></p><ul><li>hey bro → <strong>Hi [name]</strong> / <strong>Good morning, Mr [surname]</strong></li><li>send me → <strong>Could you send me...?</strong></li><li>sorry for the delay → <strong>Thanks for your patience</strong></li><li>I don't know → <strong>Let me find out</strong></li><li>not my job → <strong>Let me find who can help</strong></li><li>gonna / wanna / stuff → <strong>going to / would like to / [the actual thing]</strong></li><li>Noted. → <strong>Thanks, that's helpful</strong></li><li>thx → <strong>Thanks / Kind regards</strong></li></ul>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep your phrasebook where you write: in your notes app or on a sticky note by your screen. In two weeks, you won\'t need it.',
    },
  ],
  apply: {
    scenario: 'Friday, 2:45. Monday\'s message, fixed.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Phrasebook: match each to its professional swap.',
        pairs: [
          ['hey bro', 'Hi Brian'],
          ['sorry for the delay', 'Thanks for your patience'],
          ['dunno', 'Let me find out'],
          ['Noted.', 'Thanks, that\'s helpful'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Monday\'s message. Which line is a dead end?',
        lines: [
          'gonna finish the tracker stuff tmrw,',
          'dunno about the lagos data tho, not my thing.',
          'thx',
        ],
        bug: 1,
        fix: 'I\'m not sure yet why the Lagos data is late, so I\'ll check with Emeka.',
        explanation: '"Dunno, not my thing" stops everything. Honest + next step + when.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of fix is it?',
        groups: ['Greeting / sign-off', 'Casual word swap', 'Dead end → next step'],
        items: [
          { text: 'hey bro → Hi Brian', group: 0 },
          { text: 'gonna → I\'ll', group: 1 },
          { text: 'not my thing → I\'ll check with Emeka', group: 2 },
          { text: 'thx → Thanks, Remi', group: 0 },
          { text: 'stuff → the tracker', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What replaced "so sorry sorry for the late update"?',
        options: [
          { text: '"Apologies apologies"', why: 'The same problem in a different word.' },
          { text: '"Thanks for your patience"' },
          { text: 'Nothing at all', why: 'A little acknowledgement is kind.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Can I copy your phrasebook? Mine just says "don\'t say kippy".',
        prompt: 'What does Remi say?',
        options: [
          { text: 'No, it\'s mine.', why: 'Sharing is the Synergix way. Mostly.' },
          { text: 'You don\'t need one.', why: 'Everyone does at first.' },
          { text: 'Of course! And add your own: the best phrasebook is the one with YOUR mistakes on it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Professional swap for "I don\'t know": "Let me find ___." (one word)',
        answers: ['out'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Rebuild Friday\'s message in order.',
        lines: ['Hi Brian, thanks for your patience.', 'I\'ll finish the tracker on Monday.', 'I\'ll check the Lagos data with Emeka and update you by Tuesday.', 'Thanks, Remi'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Monday" better than "tmrw"?',
        options: [
          { text: 'A day can\'t be misread; "tomorrow" depends on when the message is read' },
          { text: 'It\'s shorter', why: 'It\'s actually longer.' },
          { text: 'Brian doesn\'t like the word tomorrow', why: 'It\'s about clarity.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Ms', 'Safe title for any woman'],
          ['How would you like me to address you?', 'Ask if unsure'],
          ['Revert (Indian/African business English)', 'Reply'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Friday\'s first line.',
        tiles: ['Hi', 'Brian,', 'thanks', 'for', 'your', 'patience.'],
        distractors: ['bro', 'sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Find a message you sent this week that you\'d write differently now. Rewrite it using the phrasebook.',
    starters: ['The original: ...', 'Rewritten: ...'],
  },
  deepen: {
    title: 'Make your phrasebook',
    summary: 'Write your own one-page phrasebook: the casual words YOU use, and their professional swaps. Keep it by your screen for two weeks.',
  },
  notes: 'Synthesis lesson for Chapter 4.',
};

export default lesson;
