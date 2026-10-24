import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 — notes from a long chapter: chunk it, question it, note it. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Notes from a long chapter',
  summary: "A 30-page History chapter before Friday. Reading it start to finish won't work. Chunk it, question it, then note it.",
  minutes: 13,
  outcomes: [
    'Break a long chapter into chunks',
    'Read each chunk with a question in mind',
    'Write notes from memory after each chunk',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Thirty pages, one evening',
      steps: [
        { title: 'Skim the map (5 minutes)', body: 'Read only the headings, the first line of each section, and the summary at the end. Now you know the shape.' },
        { title: 'Ask the questions (5 minutes)', body: 'Turn each heading into a question. "The road to independence" becomes "What were the main steps to independence, and why?" The AI can help: "Turn these headings into questions a teacher might ask."' },
        { title: 'Read one chunk, then close the book', body: 'Read one section (3 to 5 pages) looking for the answer to its question. Then close the book and write the answer from memory, in your own words.' },
        { title: 'Check and fill', body: 'Open the book, check your notes, and add anything you missed in a different colour. Then the next chunk.' },
        { title: 'Ask the AI for gaps', body: 'At the end: "Here are my notes on this chapter. Based on these headings, what did I miss?"' },
      ],
    },
    {
      kind: 'text',
      html: '<p>This is a version of a well-known study method called <strong>SQ3R</strong> (Survey, Question, Read, Recite, Review). The core idea: <strong>read with a question</strong>, and <strong>write from memory</strong> after each chunk.</p><p>One warning. It\'s tempting to paste the whole chapter into an AI and ask for a summary. You\'ll get a neat page, and you won\'t have read the chapter. Use the AI to make the questions and check your notes. Don\'t use it to replace the reading.</p>',
    },
    {
      kind: 'check',
      question: 'After reading a chunk, what do you do?',
      options: ['Read the next chunk straight away', 'Close the book and write the answer from memory', 'Ask the AI to summarise it'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi tackles a 30-page History chapter.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the long-chapter routine in order.',
        lines: ['Skim the headings and summary', 'Turn headings into questions', 'Read one chunk, close the book, write from memory', 'Check and fill in a different colour', 'Ask the AI what you missed'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best question for the heading "Causes of the 1948 Accra riots"?',
        options: [
          { text: '1948', why: 'A year, not a question.' },
          { text: 'Were there riots?', why: 'Too easy. It does not guide the reading.' },
          { text: 'What caused the 1948 Accra riots, and which cause mattered most?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which use of AI fits this routine?',
        options: [
          { text: '[pastes whole chapter] Summarise this so I don\'t have to read it.', why: 'Replaces the reading.' },
          { text: '[headings] Turn these headings into questions a teacher might ask about this chapter.' },
          { text: 'Write my History notes.', why: 'The notes should come from his memory.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Skim', 'Read and recall', 'Check'],
        items: [
          { text: 'Read only headings and first lines', group: 0 },
          { text: 'Read 4 pages, then write from memory', group: 1 },
          { text: 'Add what you missed in a different colour', group: 2 },
          { text: 'Read the end-of-chapter summary first', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "I just pasted the whole History chapter into the AI and got a one-page summary. Done in 2 minutes.",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Smart move.', why: 'He skipped the learning.' },
          { text: "You've got a summary, but you haven't read it. Use the AI for the questions and to check your notes, not instead of reading." },
          { text: 'Summaries are banned.', why: 'Not banned. Just not a replacement for reading.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages is a good chunk to read before closing the book? Give a number from the lesson\'s range.',
        answers: ['3', '4', '5', 'three', 'four', 'five'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: "Which step in David's plan breaks the routine?",
        lines: ['Skimmed the headings first.', 'Read all 30 pages in one go.', 'Then wrote notes from memory.'],
        bug: 1,
        fix: 'Read one chunk at a time, writing from memory after each.',
        explanation: 'Thirty pages in one go is too much to recall at the end.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match SQ3R to the routine.',
        pairs: [
          ['Survey', 'Skim the headings'],
          ['Question', 'Turn headings into questions'],
          ['Recite', 'Write the answer from memory'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the core idea.',
        template: 'Read with a [[1]], and write from [[2]] after each chunk.',
        blanks: [['question'], ['memory']],
        distractors: ['highlighter', 'the book'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the last-step request.',
        tiles: ['Based', 'on', 'these', 'headings,', 'what', 'did', 'I', 'miss?'],
        distractors: ['summarise', 'everything'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a long chapter you have to read soon. Write its headings as three questions.',
    starters: ['The chapter is...', 'Question 1:', 'Question 2:', 'Question 3:'],
  },
  deepen: {
    title: 'Try it this week',
    summary: 'Use the routine on one long chapter. Time it: it often takes less time than reading everything twice.',
  },
  notes: 'SQ3R: Francis P. Robinson, "Effective Study" (1946). 1948 Accra riots: real event in the then Gold Coast (February 1948), a step on the road to Ghana\'s independence (1957); used only as a heading example, no claims about causes.',
};

export default lesson;
