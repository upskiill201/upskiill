import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13 — notes for different subjects (card deck). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Notes for different subjects',
  summary: 'Maths notes, History notes and language notes need different shapes. One format for everything is why some subjects never stick.',
  minutes: 12,
  outcomes: [
    'Match the note format to the subject',
    'Ask the AI to suggest a format for a new subject',
    'Keep what works across all of them',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Maths and Physics: methods</strong></p><p>Notes are <strong>worked examples with reasons</strong>, plus a "mistakes I make" list. A formula alone isn\'t a note. A formula with when to use it, one example and the trap is.</p><p><em>Ask the AI:</em> "Give me a similar question with different numbers for this example."</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Biology and Chemistry: processes and definitions</strong></p><p>Notes are <strong>diagrams you drew</strong>, step-by-step processes, and definitions with key terms. Cornell layout works well here.</p><p><em>Ask the AI:</em> "Describe this process as numbered steps I could draw as a flow chart."</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>History and Government: events and arguments</strong></p><p>Notes are a <strong>timeline</strong> plus <strong>cause → event → effect</strong> chains, and both sides of each big argument.</p><p><em>Ask the AI:</em> "What are the strongest arguments on each side of this question? Then I\'ll check them in my textbook." Check dates and names especially.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Languages and Literature: phrases and evidence</strong></p><p>Languages: notes are <strong>useful phrases in sentences</strong>, not lists of single words. Literature: notes are <strong>short quotes with what they show</strong>.</p><p><em>Ask the AI:</em> "Quiz me: give me the English, I\'ll give the French." For literature, use your own copy of the text for quotes. AI can misquote.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Across every subject: your own words, questions you can test yourself with, and sources marked.',
    },
    {
      kind: 'check',
      question: 'What should Maths notes mostly be?',
      options: ['Lists of formulas', 'Worked examples with reasons, plus a mistakes list', 'Timelines'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi and the group set up notes for every subject.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the subject to its note shape.',
        pairs: [
          ['Maths', 'Worked examples with reasons'],
          ['Biology', 'Drawn diagrams and processes'],
          ['History', 'Timelines and cause-effect chains'],
          ['French', 'Phrases in sentences'],
          ['Literature', 'Short quotes with what they show'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are History notes better as cause → event → effect chains?',
        options: [
          { text: 'History questions usually ask why things happened and what they led to' },
          { text: 'They are shorter', why: 'Maybe, but that is not the main reason.' },
          { text: 'Dates do not matter', why: 'Dates matter. Chains show how they connect.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My French notes are a list of 300 single words. I still can\'t say anything.',
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Learn useful phrases in full sentences instead, and get the AI to quiz you English to French.' },
          { text: 'Learn 300 more words.', why: 'More single words, same problem.' },
          { text: 'French is too hard.', why: 'The note format is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good note or weak note?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Maths: a formula with when to use it and one example', group: 0 },
          { text: 'Maths: the formula, alone', group: 1 },
          { text: 'Literature: a short quote and what it shows', group: 0 },
          { text: 'Literature: a long quote the AI gave, not checked', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'David starts Economics, a subject he has never studied. Which request helps him set up his notes?',
        options: [
          { text: "I'm starting Economics at final-year level. What note format suits it best, and why? Show me one example page." },
          { text: 'Write my Economics notes.', why: 'He needs a format, not someone else\'s notes.' },
          { text: 'Is Economics hard?', why: 'Not helpful for notes.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which part of Kofi's Literature notes needs checking?",
        lines: ['A quote from his own copy of the book, with the page number.', 'A quote the AI gave him, with no page number.', 'What each quote shows about the character.'],
        bug: 1,
        fix: 'Find the quote in his own copy, with the page number, or remove it.',
        explanation: 'AI can misquote or invent quotes. Use your own copy of the text.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'History notes link events in chains of cause, event and ... (one word)',
        answers: ['effect', 'effects', 'consequence'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule for every subject.',
        template: 'Your own [[1]], questions you can [[2]] yourself with, and sources [[3]].',
        blanks: [['words'], ['test', 'quiz'], ['marked']],
        distractors: ['handwriting', 'copied'],
      },
      {
        kind: 'mcq',
        prompt: 'In which subject should you be most careful about AI-given dates and names?',
        options: [
          { text: 'History' },
          { text: 'Maths', why: 'Maths has its own traps, but dates and names are a History risk.' },
          { text: 'Art', why: 'Possible, but History is full of dates and names.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the Biology request.',
        tiles: ['Describe', 'this', 'process', 'as', 'numbered', 'steps'],
        distractors: ['a', 'poem'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick your two hardest subjects. What shape should notes take in each? What shape are they now?',
    starters: ['Subject 1:', 'Subject 2:'],
  },
  deepen: {
    title: 'Reshape one subject',
    summary: 'Take the subject whose notes help you least and redo one page in the right shape for it.',
  },
  notes: 'Subject-specific note formats are standard study-skills guidance. AI misquotation of literary texts is a known risk.',
};

export default lesson;
