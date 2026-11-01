import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Before/After: the "make a difference" family, and why a jargon-stuffed update says nothing. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Move the needle',
  summary: 'Remi tries to sound like a pro and writes an update full of game-changers and value-adds. Brian reads it twice and still doesn\'t know what happened.',
  minutes: 12,
  outcomes: [
    'Decode the "make a difference" family: move the needle, game-changer, impact, add value',
    'Spot when big words are hiding small results',
    'Show impact with facts and numbers instead',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Remi\'s update to Brian, Wednesday 5 p.m.',
      before: {
        label: 'First try',
        text: 'Hi Brian! Today I drove real impact on the supplier workstream. The clean-up is a game-changer and should really move the needle and add value going forward.',
      },
      after: {
        label: 'Second try',
        text: 'Hi Brian! I removed 12 suppliers we haven\'t used in two years from the list. Ordering should be faster, because staff now pick from 40 suppliers instead of 52.',
      },
      notes: [
        '"Drove real impact" became what he actually did: removed 12 suppliers.',
        '"Game-changer" was too big a word for a tidy-up. The second try lets the result speak.',
        '"Move the needle" became a real number: 52 down to 40.',
        '"Add value going forward" became who benefits and how: staff order faster.',
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'brian', text: 'Remi, your first message. What did you actually do?' },
        { speaker: 'remi', text: 'I... removed twelve old suppliers.' },
        { speaker: 'brian', text: 'Then say that! That\'s great. Numbers move the needle. Adjectives don\'t.' },
        { speaker: 'tey', text: "Notice that? Brian speaks jargon all day, but when he reads, he wants facts. Most managers do." },
      ],
    },
    {
      kind: 'text',
      html: "<p>The \"make a difference\" family, decoded:</p><ul><li><strong>Move the needle:</strong> make a difference people can see.</li><li><strong>Game-changer:</strong> something that changes how everything works. Big claim: save it for big things.</li><li><strong>Impact:</strong> the effect your work has. \"What was the impact?\" means \"what changed because of it?\"</li><li><strong>Add value / value-add:</strong> make something more useful or worth more.</li><li><strong>Going forward:</strong> from now on.</li></ul><p>Every one of these is a promise. The listener's next question is always: <em>show me</em>.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Big words make a promise. Facts keep it. Say what you did, the number, and who it helps.',
    },
  ],
  apply: {
    scenario: 'Wednesday evening. Remi rewrites his update.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its meaning.',
        pairs: [
          ['Move the needle', 'Make a visible difference'],
          ['Game-changer', 'Changes how everything works'],
          ['Add value', 'Make something more useful'],
          ['Going forward', 'From now on'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which update tells Brian the most?',
        options: [
          { text: 'Our FAQ page was a game-changer for customer value.', why: 'Big words, no facts. What actually happened?' },
          { text: 'FAQ: impactful work done going forward.', why: 'Brian still can\'t tell what changed.' },
          { text: 'I updated 8 FAQ answers. Customer emails about delivery dropped from 30 to 18 this week.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that says nothing.',
        lines: [
          'I called all 3 suppliers we weren\'t sure about.',
          'Two are still active; one has closed.',
          'This is a real game-changer that adds value going forward.',
        ],
        bug: 2,
        fix: 'So the list is now fully up to date.',
        explanation: 'Every word in that line is a promise with nothing behind it. Say what the result means instead.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Big words or real facts?',
        groups: ['Big words', 'Real facts'],
        items: [
          { text: 'Drove real impact', group: 0 },
          { text: 'Removed 12 old suppliers', group: 1 },
          { text: 'A total game-changer', group: 0 },
          { text: 'Delivery complaints down from 30 to 18', group: 1 },
          { text: 'Adds value going forward', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Nice. What was the impact of the supplier clean-up?',
        prompt: 'What is Brian asking for?',
        options: [
          { text: 'Huge impact! Massive!', why: 'He asked what changed. Bigger adjectives don\'t answer that.' },
          { text: 'Staff now choose from 40 suppliers instead of 52, so ordering should be quicker.' },
          { text: 'No impact, I just tidied it.', why: 'Don\'t undersell it: a tidier list helps every order.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Going forward, please copy me in." What does "going forward" mean? From now ... (one word)',
        answers: ['on'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s formula for showing impact.',
        template: 'Say what you [[1]], the [[2]], and who it [[3]].',
        blanks: [['did'], ['number'], ['helps']],
        distractors: ['promised', 'adjective'],
      },
      {
        kind: 'mcq',
        prompt: 'When is "game-changer" the right word?',
        options: [
          { text: 'Whenever you want your work to sound important', why: 'Used too often, it makes people trust your words less.' },
          { text: 'When something really changes how everything works, and you can show it' },
          { text: 'Never', why: 'It\'s a fine word for genuinely huge changes. Just rare.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "The clean-up really moved the needle" into facts.',
        tiles: ['The', 'list', 'went', 'from', '52', 'suppliers', 'to', '40.'],
        distractors: ['game-changer', 'impactful'],
      },
      {
        kind: 'mcq',
        prompt: 'Zanele\'s update: "My spreadsheet work added significant value across the workstream." What should she add?',
        options: [
          { text: 'More adjectives, like "hugely significant"', why: 'More promises, still no facts.' },
          { text: 'Nothing, it\'s perfect', why: 'Brian will ask "what does that mean?" Better to answer before he asks.' },
          { text: 'What the spreadsheet does and who uses it, with a number if she has one' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you did recently that you\'re proud of. Describe it in one sentence with what you did, a number, and who it helped. No big words allowed.',
    starters: ['I...', 'Which meant...'],
  },
  deepen: {
    title: 'The adjective diet',
    summary: 'Before you send your next update or report, find every big word (huge, game-changing, impactful, significant). For each one, add a fact or delete it.',
  },
  notes: 'Meanings: "move the needle" (Merriam-Webster), "game changer" (Merriam-Webster: a newly introduced element that changes an existing situation significantly), "value-add", "going forward" (Cambridge).',
};

export default lesson;
