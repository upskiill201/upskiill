import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. "Pitch check" (Tap to explore): Pitch v1, the lift disaster, marked up line by line. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Pitch check: v1, the lift disaster',
  summary: 'Ada writes down exactly what she said in the lift, word for word, and sends it to Arjun. He sends it back with seven comments. It\'s painful. It\'s also very useful.',
  minutes: 11,
  outcomes: [
    'Spot every Chapter 1 mistake in one real pitch',
    'Explain why each part loses the listener',
    'Plan Pitch v2',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Pitch v1 (the lift, word for word)',
      text: 'Oh! Um. Hi. So, it\'s built in Python, and I started with a list, then a dictionary, and there\'s a SQLite database now, with a members table and a payments table, and the dates were really hard because everyone types them differently, and Tunde\'s name was stored three ways, and anyway it has reminders and an export button. So yeah. That\'s it.',
      hotspots: [
        { phrase: 'Oh! Um. Hi. So,', note: 'The warm-up. The first ten seconds are the most important, and these are empty.' },
        { phrase: 'it\'s built in Python', note: 'How it\'s built, not what it does. Mrs Adeyemi still doesn\'t know who the app is for.' },
        { phrase: 'a members table and a payments table', note: 'Technical detail nobody asked for. This is the curse of knowledge: Ada forgets the listener doesn\'t care about tables.' },
        { phrase: 'Tunde\'s name was stored three ways', note: 'A story, but the wrong one: it\'s about Ada\'s coding problem, not the user\'s money problem.' },
        { phrase: 'it has reminders and an export button', note: 'Features, with no "so that". What do reminders do for anyone?' },
        { phrase: 'So yeah. That\'s it.', note: 'No ask. The ending fades out. Mrs Adeyemi has nothing to say yes to.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Pitch v1 vs Pitch v2',
      before: {
        label: 'v1 (the lift)',
        text: 'Oh! Um. Hi. So, it\'s built in Python... (databases for 30 floors) ...So yeah. That\'s it.',
      },
      after: {
        label: 'v2 (end of week 1)',
        text: 'I help office savings groups track who\'s paid, so nobody argues about money. Most ajo groups use a notebook, and every month someone swears they paid. My app reminds everyone and keeps a record. My office has used it for four months: ten people, zero arguments. I\'m looking for a mentor to take it to a hundred offices.',
      },
      notes: [
        'One sentence first. No warm-up.',
        'The problem, in words anyone recognises.',
        'Benefits, proof and a clear ask. About 60 words: under 30 seconds.',
      ],
    },
  ],
  apply: {
    scenario: 'Arjun\'s seven comments.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s missing from Pitch v1 entirely?',
        options: [
          { text: 'Technical detail', why: 'There\'s plenty of that.' },
          { text: 'Tunde', why: 'Tunde is very much in it.' },
          { text: 'Who it\'s for, the problem and the ask' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mistake is it?',
        groups: ['Warm-up', 'Features, no benefit', 'No ask'],
        items: [
          { text: 'Oh! Um. Hi. So,', group: 0 },
          { text: 'it has reminders and an export button', group: 1 },
          { text: 'So yeah. That\'s it.', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Pitch v2 in order.',
        lines: ['I help office savings groups track who\'s paid.', 'Most ajo groups use a notebook, and someone always swears they paid.', 'My app reminds everyone and keeps a record.', 'Ten people, zero arguments in four months.', 'I\'m looking for a mentor to reach a hundred offices.'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The Tunde story is funny though! Can\'t I keep it?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Keep a Tunde story, but the money one: "Tunde swore he\'d paid in March." That\'s the user\'s problem, not your code\'s.' },
          { text: 'Yes, keep the three-names story.', why: 'It\'s about your code, not their problem.' },
          { text: 'No stories ever.', why: 'Stories are great (Chapter 3). Pick the right one.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pitch v1 ended with "So yeah. That\'s it." It had no ___. (one word)',
        answers: ['ask'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s draft of v2. Which line slipped back to v1?',
        lines: [
          'I help office savings groups track who\'s paid.',
          'It\'s built in Python with a members table and a payments table.',
          'My office has used it for four months: ten people, zero arguments.',
        ],
        bug: 1,
        fix: 'Most ajo groups use a notebook, and someone always swears they paid.',
        explanation: 'Tables are v1 thinking. The listener needs the problem.',
      },
      {
        kind: 'mcq',
        prompt: 'About how long is Pitch v2?',
        options: [
          { text: 'About 5 minutes', why: 'Much shorter.' },
          { text: 'About 60 words: under 30 seconds' },
          { text: 'About 5 seconds', why: 'That\'s just the first sentence.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each v1 problem to the Chapter 1 lesson that fixes it.',
        pairs: [
          ['Databases first', 'Your one sentence'],
          ['Reminders and export button', 'Features vs benefits'],
          ['"Oh! Um. Hi. So,"', 'The first ten seconds'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Pitch v2, the ending.',
        template: 'I\'m [[1]] for a mentor to take it to a [[2]] [[3]].',
        blanks: [['looking'], ['hundred'], ['offices']],
        distractors: ['database', 'yeah'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Pitch v2\'s opening.',
        tiles: ['I', 'help', 'office', 'savings', 'groups', 'track', 'who\'s', 'paid.'],
        distractors: ['Um.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write down the last time you explained what you do, as closely as you remember. Mark the warm-up, the features and whether there was an ask.',
    starters: ['What I said: ...', 'Warm-up: ...', 'Ask: ...'],
  },
  deepen: {
    title: 'Mark up your own v1',
    summary: 'Write your current pitch down word for word. Underline every warm-up, every feature without a "so that", and check for an ask. That\'s your Pitch v1. You\'ll fix it chapter by chapter.',
  },
  notes: 'Synthesis of Chapter 1 tools on Ada\'s lift pitch. Explore hotspot phrases appear verbatim in the text. "Curse of knowledge" cross-references How to Make People Listen to You.',
};

export default lesson;
