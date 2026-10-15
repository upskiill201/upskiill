import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 with earlier material. Story beat: the swap pays off. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the swap',
  summary: 'Efua now quizzes herself with AI; Kofi now writes Cornell notes. Cornell, mind maps, flashcards and long chapters, all mixed.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can use four note formats well', 'Pick the right format for the job'],
  learn: [
    {
      kind: 'story',
      title: 'Halfway through the swap',
      beats: [
        { speaker: 'efua', text: "Fine. Your AI quiz thing found three gaps in my Biology. Three. In MY notes." },
        { speaker: 'kofi', text: "And your cue column found eleven in mine. So we're even. Ish." },
        { speaker: 'tey', text: "This is the best kind of study partnership: different strengths, swapped. Let's check you've picked up both." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the swap.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the job to the best format.',
        pairs: [
          ['Turning notes into a quiz as you write', 'Cornell notes'],
          ['Seeing how ideas connect', 'Mind map'],
          ['Drilling single facts', 'Flashcards'],
          ['A 30-page chapter', 'Chunk, question, recall'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good flashcard or weak flashcard?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Front: "Osmosis". Back: 60 words', group: 1 },
          { text: 'Front: "Which process needs energy: diffusion or active transport?"', group: 0 },
          { text: 'Front: "Water moves from ___ to ___ in osmosis"', group: 0 },
          { text: 'An AI card nobody checked', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In Cornell notes, how do you revise?',
        options: [
          { text: 'Cover the notes column and answer the cue questions' },
          { text: 'Reread the notes column', why: 'That is rereading again.' },
          { text: 'Copy the summary', why: 'Answering the cues is the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which link in Kofi's mind map is wrong?",
        lines: ['Osmosis → diffusion: "diffusion of water".', 'Active transport → diffusion: "opposite direction, needs energy".', 'Osmosis → active transport: "both need energy".'],
        bug: 2,
        fix: 'Osmosis → active transport: "osmosis needs no energy; active transport does".',
        explanation: 'Osmosis is passive. Only active transport needs energy.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has 25 History pages tonight. Which first step is best?',
        options: [
          { text: 'Skim the headings and summary, then turn the headings into questions.' },
          { text: 'Paste it all into the AI for a summary.', why: 'Replaces the reading.' },
          { text: 'Read all 25 pages, then write notes.', why: 'Too much to recall at once.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Flashcard: "Diffusion: particles spread from a high to a ___ concentration." (one word)',
        answers: ['low', 'lower'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Should I use the AI to write my cue questions? It\'s faster.',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Write them yourself first, then ask it which key points are missing a question.' },
          { text: 'Yes, always let it write them.', why: 'Writing them is part of the learning.' },
          { text: 'Never use AI for notes.', why: 'It is useful for checking.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the flashcard routine in order.',
        lines: ['Write your own notes', 'Ask the AI for cards, with the rules', 'Check and fix every card', 'Study one at a time'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the Cornell layout.',
        template: 'Notes on the [[1]], [[2]] on the left, summary at the bottom.',
        blanks: [['right'], ['questions', 'cues']],
        distractors: ['top', 'doodles'],
      },
      {
        kind: 'mcq',
        prompt: 'Why should every link on a mind map have a label?',
        options: [
          { text: 'The label says HOW the ideas are connected, which is what exams test' },
          { text: 'To fill space', why: 'Labels carry the meaning.' },
          { text: 'Teachers count them', why: 'The point is your understanding.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the long-chapter rule.',
        tiles: ['Read', 'with', 'a', 'question,', 'write', 'from', 'memory'],
        distractors: ['highlight', 'copy'],
      },
      {
        kind: 'sortGroups',
        prompt: 'You first, or AI first?',
        groups: ['You first', 'AI first'],
        items: [
          { text: 'Write cues, then ask what is missing', group: 0 },
          { text: 'Ask for a mind map, then save it', group: 1 },
          { text: 'Read a chunk, write from memory, then check', group: 0 },
          { text: 'Paste the chapter for a summary', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four formats (Cornell, mind map, flashcards, chunking) fits the subject you find hardest? Why?',
    starters: ['For... I would use...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Use two different formats on two subjects this week, and notice which one you remember better a few days later.' },
  notes: 'Review only.',
};

export default lesson;
