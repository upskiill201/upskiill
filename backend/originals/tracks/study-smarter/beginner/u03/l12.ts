import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12 — fill the gaps in your notes using the syllabus and AI, honestly marked. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Fill the gaps in your notes',
  summary: 'Kofi missed two Biology lessons for a football tournament. Here is how to fill the gaps without copying a friend\'s notes word for word.',
  minutes: 12,
  outcomes: [
    'Find the gaps in your notes using the syllabus',
    'Fill them in your own words, from good sources',
    'Mark what came from where',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Kofi missed two Biology lessons for the inter-schools football tournament. (They lost in the semi-final. We don't talk about it.)", replies: ['Ouch'] },
        { tey: "Now his notes have a hole. Step one: find out exactly how big. Paste the syllabus lines for this topic and your notes, and ask: \"Which syllabus lines do my notes not cover?\"" },
        { tey: "Answer: two lines on enzymes. Now he knows the exact gap, not just a feeling of \"I missed stuff\".", replies: ['Then the AI writes them?'] },
        { tey: "Nope. Fill them from your textbook first, in your own words, then ask Efua what the teacher emphasised. The AI can explain anything that's still confusing." },
        { tey: "And one habit that saves you at revision: mark where each bit came from. A small T for textbook, E for Efua, AI for the AI. If something turns out to be wrong later, you know where to check.", replies: ['Why mark AI bits?'] },
        { tey: "Because AI bits are the ones most worth double-checking. Marking them reminds you." },
      ],
    },
    {
      kind: 'compare',
      title: 'Filling a gap',
      before: { label: 'Copy-fill', text: "Kofi photographs Efua's two pages and sticks them in his folder. Different handwriting, different words, nothing he processed." },
      after: { label: 'Real fill', text: 'Syllabus check finds the 2 missing lines. He reads the textbook pages, writes his own notes, asks Efua what Mrs Asante stressed ("enzymes are denatured, not killed"), and marks each source.' },
      notes: ['Knows the exact size of the gap.', 'Notes in his own words.', 'Sources marked for later checking.'],
    },
    {
      kind: 'check',
      question: 'What is the first step to fill a gap?',
      options: ["Copy a friend's notes", 'Find exactly which syllabus lines your notes miss', 'Ask the AI to write the notes'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi fills the enzymes gap.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the gap-filling routine in order.',
        lines: ['Compare your notes with the syllabus lines', 'Read the textbook for the missing lines', 'Write notes in your own words', 'Ask a classmate what the teacher stressed', 'Mark each source'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request finds the gap?',
        options: [
          { text: 'What did I miss in Biology?', why: 'It cannot know what happened in his class.' },
          { text: '[syllabus lines + my notes] Which syllabus lines do my notes not cover?' },
          { text: 'Write the notes I missed.', why: 'Find the gap first, then fill it yourself.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mrs Asante stresses that at high temperatures, enzymes are not killed, they are ... (one word)',
        answers: ['denatured'],
        placeholder: 'One word',
        explanation: 'Enzymes are proteins, not living things. Heat changes their shape so they stop working: denatured.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which source mark?',
        groups: ['T (textbook)', 'E (Efua)', 'AI'],
        items: [
          { text: 'Read on page 112', group: 0 },
          { text: '"Mrs Asante said this comes up every year"', group: 1 },
          { text: 'An analogy the chat gave him', group: 2 },
          { text: 'A diagram copied from the textbook', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "You can just photograph my notes if you want.",
        prompt: "What is Kofi's best reply?",
        options: [
          { text: "Thanks! Can I use them to check mine after I write my own? And what did Mrs Asante stress most?" },
          { text: 'Great, I will stick them in my folder.', why: 'Then they are her notes, not his learning.' },
          { text: 'No thanks, I will ask the AI.', why: 'Efua knows what the teacher stressed. The AI does not.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why mark which notes came from the AI?',
        options: [
          { text: 'AI notes are banned', why: 'Not banned, but worth checking.' },
          { text: 'Those are the bits most worth double-checking later' },
          { text: 'To show off', why: 'It is for checking, not showing off.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Which line in Kofi's new enzymes notes should he check first?",
        lines: ['(T) Enzymes are biological catalysts.', '(E) Mrs Asante: "denatured, not killed".', '(AI) Every enzyme works best at exactly 37°C.'],
        bug: 2,
        fix: 'Many human enzymes work best around body temperature (about 37°C), but different enzymes have different best temperatures.',
        explanation: 'The AI-marked line overgeneralises. "Every" and "exactly" are warning words.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to what it is best for.',
        pairs: [
          ['Syllabus', 'Finding the exact gap'],
          ['Textbook', 'Filling it accurately'],
          ['A classmate', 'What the teacher stressed'],
          ['The AI', 'Explaining what is still confusing'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's habit.",
        template: 'Mark where each bit came [[1]], so you know where to [[2]] later.',
        blanks: [['from'], ['check', 'look']],
        distractors: ['home', 'copy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the gap-finding question.',
        tiles: ['Which', 'syllabus', 'lines', 'do', 'my', 'notes', 'not', 'cover?'],
        distractors: ['copy', 'pages'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a lesson you missed this term? Which syllabus lines might your notes be missing?',
    starters: ['I missed...', 'The lines I probably miss are...'],
  },
  deepen: {
    title: 'Check one subject',
    summary: 'Compare one subject\'s notes with its syllabus using the AI. Fill any gap from the textbook, in your own words, and mark your sources.',
  },
  notes: 'Enzymes: biological catalysts (proteins); denatured by high temperature (active site changes shape). Many human enzymes have optimum near 37°C; optima vary (e.g., pepsin acidic pH; thermophile enzymes higher temps).',
};

export default lesson;
