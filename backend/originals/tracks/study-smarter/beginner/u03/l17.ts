import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17 — one-page revision sheets, built from memory and checked with AI. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'One-page revision sheets',
  summary: 'A whole topic on one page: the sheet you look at the night before the exam. Building it is the revision. Here is how.',
  minutes: 14,
  outcomes: [
    'Build a one-page revision sheet for a topic',
    'Decide what earns a place on the page',
    'Use the AI to check it against the syllabus',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building a one-page sheet: cell transport',
      steps: [
        { title: 'Blank page, from memory (10 minutes)', body: 'Write everything you remember about the topic on one page. No notes. Leave gaps where you are unsure.' },
        { title: 'Check against your notes (5 minutes)', body: 'Open your notes and syllabus. Add what you missed in a different colour. These are your weak spots.' },
        { title: 'Shape it (10 minutes)', body: 'Rewrite it neatly in sections: key definitions, one diagram, one worked example, your "do not confuse" pairs, and the classic mistakes.' },
        { title: 'AI check', body: '"Here is my revision sheet for [syllabus lines]. What is missing that the syllabus expects? Is anything wrong? Don\'t rewrite it."' },
        { title: 'Use it', body: 'Cover sections and recall them. The night before, it\'s the one page you look at.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>The magic is in step 1. Starting from a <strong>blank page, from memory</strong>, is retrieval practice. The coloured additions in step 2 show you exactly what you didn\'t know.</p><p>What earns a place on a one-page sheet? Things that are <strong>examined</strong> (check the syllabus), things you <strong>get wrong</strong>, and things that <strong>connect</strong> ideas. Background detail doesn\'t make the cut.</p><p>A sheet the AI made for you would look better, and teach you almost nothing. The value is in building it.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Blank page first. The colour you add afterwards is your revision list.',
    },
    {
      kind: 'check',
      question: 'What is step 1 of a revision sheet?',
      options: ['Ask the AI to make one', 'Write everything you remember on a blank page, without notes', 'Copy your notes onto one page'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi builds sheets for the mocks.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the revision-sheet steps in order.',
        lines: ['Blank page, from memory', 'Check against notes, add in colour', 'Shape it into sections', 'Ask the AI to check against the syllabus', 'Cover sections and recall'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Earns a place on the sheet, or not?',
        groups: ['On the sheet', 'Leave it off'],
        items: [
          { text: 'A definition that is on the syllabus', group: 0 },
          { text: 'A mistake you keep making', group: 0 },
          { text: 'Background trivia not in the syllabus', group: 1 },
          { text: 'A "do not confuse" pair', group: 0 },
          { text: 'A long paragraph copied from the textbook', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which AI request fits the revision sheet routine?',
        options: [
          { text: 'Make me a revision sheet on cell transport.', why: 'It looks great and teaches almost nothing.' },
          { text: "Here is my revision sheet for these syllabus lines. What's missing that the syllabus expects? Is anything wrong? Don't rewrite it." },
          { text: 'Make my sheet prettier.', why: 'Looks are not the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "Can't I just copy my notes onto one page in small writing?",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Yes, smaller writing fits more.', why: 'Still copying, just smaller.' },
          { text: "That's copying. Start from a blank page and memory. What you can't remember is exactly what to revise." },
          { text: 'Use a bigger page.', why: 'The size is not the issue.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The things you add in a different colour in step 2 are your weak ... (one word)',
        answers: ['spots', 'points', 'areas'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each section of the sheet to what it holds.',
        pairs: [
          ['Definitions', 'Key terms, own words'],
          ['Diagram', 'One drawn process'],
          ['Do not confuse', 'Look-alike pairs'],
          ['Classic mistakes', 'Traps to check for'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which step in David's sheet plan skips the point?",
        lines: ['Wrote what he remembered about electricity on a blank page.', 'Asked the AI to write the rest for him.', 'Covered sections and recalled them.'],
        bug: 1,
        fix: 'Checked his notes and added the gaps himself, in colour.',
        explanation: 'Adding the gaps himself is how they get learned.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a sheet you built worth more than a better-looking one the AI made?',
        options: [
          { text: 'Building it from memory is the revision itself' },
          { text: 'AI sheets are always wrong', why: 'They can be right. They just teach you less.' },
          { text: 'Teachers check who made it', why: 'This is about learning, not checking.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] page first. The colour you add afterwards is your [[2]] list.',
        blanks: [['Blank', 'Empty'], ['revision']],
        distractors: ['Full', 'shopping'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what earns a place on the sheet.',
        tiles: ['Examined,', 'often', 'wrong,', 'or', 'connecting'],
        distractors: ['pretty,', 'long,'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a topic for your next test. What would go in each section of its one-page sheet?',
    starters: ['Topic:', 'Definitions:', 'Diagram:', 'Do not confuse:', 'Classic mistakes:'],
  },
  deepen: {
    title: 'Build one this week',
    summary: 'Build one revision sheet from a blank page. Ask the AI to check it against the syllabus, and keep it for the night before your test.',
  },
  notes: 'Blank-page recall ("brain dump") is a form of free-recall retrieval practice; stated generally.',
};

export default lesson;
