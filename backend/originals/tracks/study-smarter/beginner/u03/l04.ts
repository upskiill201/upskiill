import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 — key terms and definitions: definitions that are short, yours, and testable. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Key terms and definitions',
  summary: 'Exams love definitions. Here is how to write ones that are short, accurate, in your words, and still get the mark.',
  minutes: 12,
  outcomes: [
    'Write short definitions that keep the key words',
    'Check your definition against the mark-worthy words',
    'Turn definitions into two-way flashcards',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Exam papers often ask for definitions. \"Define diffusion.\" Two marks. Easy marks, if your notes are set up right.", replies: ['What goes wrong?'] },
        { tey: "Two things. Some people copy a 40-word textbook definition they can't remember. Others write a lovely own-words version that misses the words the mark scheme looks for." },
        { tey: 'The trick is both: your own short words, BUT keep the key terms. For diffusion: "particles spreading from high concentration to low concentration". "High to low concentration" is probably the bit that earns the mark.', replies: ['How do I know the key terms?'] },
        { tey: 'Ask: "What are the key terms a definition of diffusion must include to get full marks at final-year level?" Then check those against your textbook. AI is a good guesser here, but your textbook and mark schemes are the real source.' },
        { tey: "Last trick: make each definition a two-way flashcard. Term to definition. AND definition to term. Exams ask both ways.", replies: ['Got it'] },
      ],
    },
    {
      kind: 'compare',
      title: 'Diffusion',
      before: { label: 'Own words only', text: 'Diffusion is when stuff spreads out.' },
      after: { label: 'Own words + key terms', text: 'Diffusion: particles spreading from a HIGH concentration to a LOW concentration, until evenly spread. (e.g. perfume across a room)' },
      notes: ['Still short and in his words.', 'Keeps the words that earn the mark.', 'An example to remember it by.'],
    },
    {
      kind: 'check',
      question: 'What should a good definition in your notes keep?',
      options: ['Every word from the textbook', 'Your own words plus the key terms', 'Only an example'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi writes definitions that earn marks.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which definition of diffusion is best for Kofi\'s notes?',
        options: [
          { text: 'Stuff spreads out.', why: 'Misses the key terms.' },
          { text: 'A 45-word textbook definition copied exactly', why: 'Hard to remember, and copying again.' },
          { text: 'Particles spreading from a high to a low concentration, until evenly spread.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request finds the mark-worthy words?',
        options: [
          { text: 'Define diffusion for me.', why: 'He gets a definition, not the key terms to check his own.' },
          { text: 'What key terms must a definition of diffusion include to get full marks at final-year level?' },
          { text: 'Is diffusion important?', why: 'Not a definition question.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Diffusion: particles move from a ... concentration to a low concentration. (one word)',
        answers: ['high', 'higher'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Diffusion or osmosis?',
        groups: ['Diffusion', 'Osmosis'],
        items: [
          { text: 'Any particles spreading from high to low concentration', group: 0 },
          { text: 'Specifically water, across a partially permeable membrane', group: 1 },
          { text: 'Perfume spreading across a room', group: 0 },
          { text: 'Plant roots taking in water', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I wrote all my Physics definitions in my own words, but I lost marks on every one in the quiz.",
        prompt: 'What is probably missing?',
        options: [
          { text: 'They were too short.', why: 'Short is fine if the key terms are there.' },
          { text: 'He should copy the textbook instead.', why: 'Own words plus key terms is better than copying.' },
          { text: 'The key terms the mark scheme looks for. Keep your words, but put those terms back in.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: "Which of Clinton's definitions is missing its key term?",
        lines: ['Osmosis: water moving across a partially permeable membrane, dilute to concentrated.', 'Diffusion: things moving around.', 'Photosynthesis: plants making glucose using light energy.'],
        bug: 1,
        fix: 'Diffusion: particles spreading from high to low concentration.',
        explanation: '"Moving around" misses "high to low concentration".',
      },
      {
        kind: 'matchPairs',
        prompt: 'Two-way flashcards: match each definition to its term.',
        pairs: [
          ['Particles spreading from high to low concentration', 'Diffusion'],
          ['Water crossing a partially permeable membrane', 'Osmosis'],
          ['Plants making glucose using light', 'Photosynthesis'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI lists key terms for a definition. What should Kofi check them against?',
        options: [
          { text: 'His textbook or past mark schemes' },
          { text: 'Nothing, the AI is always right', why: 'It is a good guesser, not the real source.' },
          { text: "A friend's guess", why: 'The textbook and mark schemes are the real source.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the definition rule.',
        template: 'Your own [[1]], but keep the key [[2]].',
        blanks: [['words'], ['terms', 'words']],
        distractors: ['handwriting', 'examples'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the two-way flashcard rule.',
        tiles: ['Term', 'to', 'definition,', 'and', 'definition', 'to', 'term'],
        distractors: ['never', 'copy'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one key term from your subjects. Write its definition in your own words, keeping the key terms.',
    starters: ['The term is...', 'My definition:'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Write five definitions for your next test, ask the AI which key terms each needs, check against your textbook, and make two-way flashcards.',
  },
  notes: 'Diffusion: net movement of particles from higher to lower concentration. Mark-scheme key terms vary by exam board; learners are told to check textbook/mark schemes.',
};

export default lesson;
