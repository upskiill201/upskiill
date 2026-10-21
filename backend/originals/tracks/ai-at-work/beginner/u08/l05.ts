import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 5 — Checkpoint 1. Outline, one idea, story, notes. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: outline, idea, story, notes',
  summary: 'An outline first, one idea per slide, a clear story and natural notes. Show you can build a talk with AI.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can plan a deck with AI', 'Show you can make slides and notes that work'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 8, first Checkpoint. Ten days to the founders\' meeting.', replies: ['Ready'] },
        { tey: 'Warm-up: open slides first, or outline first?', replies: ['Outline'] },
        { tey: 'Story first, design last. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: building the founders\' deck.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which outline request is best?',
        options: [
          { text: 'Make a deck.', why: 'No audience, time or goal.' },
          { text: 'From this report, outline a 10-minute talk for our founders. Goal: approval to expand. One line per slide, about 7 slides.' },
          { text: 'Make it long.', why: 'Ten minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Title is the point, or a label?',
        groups: ['The point', 'A label'],
        items: [
          { text: '"It costs 300 GHS per shop"', group: 0 },
          { text: '"Costs"', group: 1 },
          { text: '"The pilot is ahead of plan"', group: 0 },
          { text: '"Update"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the story shape.',
        lines: ['Situation', 'Problem', 'Answer', 'Ask'],
      },
      {
        kind: 'findBug',
        prompt: 'Which slide is in the wrong place?',
        lines: ['1. Shops juggle three apps', '2. Fees confuse shops', '3. Approve a second market', '4. Payments grew by half'],
        bug: 2,
        fix: 'Move it after the results.',
        explanation: 'The ask goes last.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match where things go.',
        pairs: [
          ['Main idea', 'Slide title'],
          ['Evidence', 'One chart'],
          ['Supporting detail', 'Speaker notes'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your notes are just bullets. Won\'t you forget what to say?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The bullets remind me of each point, and I know my first and last lines by heart. Reading full sentences would sound stiff.' },
          { text: 'Probably, yes.', why: 'Bullets work as prompts.' },
          { text: 'I\'ll read a full script instead.', why: 'Reading sounds stiff.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'One [[1]] per slide. Memorise only your first and [[2]] line.',
        blanks: [['idea'], ['last']],
        distractors: ['font', 'every'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the voice instruction.',
        tiles: ['Use', 'short', 'words,', 'no', 'jargon'],
        distractors: ['synergies'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 10-minute talk at about 1.5 minutes a slide. How many slides, roughly?',
        answers: ['7', 'seven', '6', '6-7', '7 slides'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Sounds like Ada, or a robot?',
        groups: ['Ada', 'Robot'],
        items: [
          { text: '"Shops kept coming back"', group: 0 },
          { text: '"Utilisation metrics exhibited momentum"', group: 1 },
          { text: '"Here\'s the surprise"', group: 0 },
          { text: '"It is imperative to note"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does reading only the titles in order test?',
        options: [
          { text: 'Whether the story flows' },
          { text: 'Whether the colours match', why: 'It tests the story.' },
          { text: 'Whether slides are long enough', why: 'It tests the story.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which slide breaks one-idea-per-slide?',
        lines: ['"The pilot is ahead of plan"', '"Shops use it more every week"', '"Costs, risks, team and next steps"', '"It costs 300 GHS per shop"'],
        bug: 2,
        fix: 'Split it or keep the most important idea.',
        explanation: 'Four ideas on one slide.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best fixes a crowded slide?',
        options: [
          { text: 'Fix this.', why: 'Vague.' },
          { text: 'Find the one idea that matters most here, write it as the title, suggest one chart, and move the rest to notes.' },
          { text: 'Smaller font please.', why: 'Worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the notes process.',
        lines: ['Ask for 3 bullets per slide', 'Say how you talk', 'Read them aloud', 'Fix what you\'d never say'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four would most improve your next presentation?',
    starters: ['The one:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 8 lessons 1-4.',
};

export default lesson;
