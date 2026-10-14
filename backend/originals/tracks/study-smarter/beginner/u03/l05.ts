import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Kofi rewrites one Biology topic. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one page, not forty',
  summary: 'Kofi rewrites his osmosis notes from 4 pages to 1. Copied vs processed, you first, three lengths and definitions, all mixed.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can turn copied notes into your own', 'Use summaries and definitions that earn marks'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Kofi just turned 4 pages of copied osmosis notes into 1 page of his own. Efua checked it. Her review: \"Fine. Annoyingly fine.\"", replies: ['Ha'] },
        { tey: "High praise from Efua. Your turn: copied vs processed, you first, three lengths and definitions. Let's see it." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: one page, not forty.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Copied or processed?',
        groups: ['Copied', 'Processed'],
        items: [
          { text: 'The slide, word for word', group: 0 },
          { text: 'Own words with a question mark', group: 1 },
          { text: 'An arrow linking two ideas', group: 1 },
          { text: 'AI-made notes saved as yours', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the notes routine in order.',
        lines: ['Write your own notes', 'AI lists what is missing or wrong', 'Add fixes in a different colour', 'Quiz yourself on the coloured bits'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has written his notes on diffusion. Which request is best?',
        options: [
          { text: 'Write better notes on diffusion.', why: 'Replaces his work instead of checking it.' },
          { text: "Here are my diffusion notes for final-year Biology. What's missing or wrong? Don't rewrite them, list the problems." },
          { text: 'Are these good?', why: 'Gets praise, not problems.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Osmosis: water moves across a partially permeable membrane from a dilute solution to a more ... one. (one word)',
        answers: ['concentrated'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "Summary from memory is so slow. I'll just shorten my notes while looking at them.",
        prompt: 'What should Kofi say?',
        options: [
          { text: "With your notes open it's copying, just shorter. From memory is what makes it stick." },
          { text: 'Good shortcut.', why: 'It skips the thinking.' },
          { text: 'Skip summaries completely.', why: 'They work, when done from memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the summary length to its use.',
        pairs: [
          ['One paragraph', 'Do I remember the whole topic?'],
          ['Three bullets', 'What matters most?'],
          ['One sentence', 'Flashcard fronts'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which line of Kofi's new notes needs fixing?",
        lines: ['Diffusion: particles spread from high to low concentration.', 'Osmosis: a type of diffusion, for water, across a membrane.', 'Both need energy from the cell.'],
        bug: 2,
        fix: 'Neither needs energy from the cell: both are passive.',
        explanation: 'Diffusion and osmosis are passive. Active transport is the one that needs energy.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add the AI\'s fixes in a different colour?',
        options: [
          { text: 'The coloured bits show exactly what you didn\'t know' },
          { text: 'It looks nicer', why: 'Maybe, but the point is spotting weak points.' },
          { text: 'Teachers require it', why: 'It is a revision trick, not a rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the definition rule.',
        template: 'Your own [[1]], but keep the key [[2]].',
        blanks: [['words'], ['terms']],
        distractors: ['slides', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: "Efua's rule: write what you understood, and put a ... mark next to what you didn't (one word)",
        answers: ['question'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the order.',
        tiles: ['You', 'write,', 'AI', 'checks,', 'you', 'fix'],
        distractors: ['copy,', 'sleeps,'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Diffusion or osmosis?',
        groups: ['Diffusion', 'Osmosis'],
        items: [
          { text: 'Perfume across a room', group: 0 },
          { text: 'Water into plant roots', group: 1 },
          { text: 'Any particles, high to low concentration', group: 0 },
          { text: 'Only water, across a membrane', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take one topic of copied notes and plan how you would turn it into one page of your own. What goes, what stays?',
    starters: ['The topic is...', 'I would keep...', 'I would cut...'],
  },
  deepen: { title: 'Keep going', summary: 'Turn one topic of copied notes into one page of your own this week, then get the AI to list what is missing.' },
  notes: 'Diffusion and osmosis are passive processes; active transport requires energy (ATP).',
};

export default lesson;
