import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 — Cornell notes, with AI helping on the cue questions and the check. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Cornell notes with AI',
  summary: "Efua's secret isn't talent. It's a page layout from the 1950s, with a question column that turns every page of notes into a quiz.",
  minutes: 13,
  outcomes: [
    'Set up a page in the Cornell layout',
    'Write cue questions that turn notes into a quiz',
    'Use AI to check your cues and summary',
  ],
  learn: [
    {
      kind: 'reading',
      title: "Efua's page layout",
      html: `<p>Efua slides a page across the desk. It's split into three parts. "My cousin at university showed me. It's called Cornell notes."</p>
<p>The <strong>Cornell note-taking system</strong> was developed by Walter Pauk, an education professor at Cornell University in the United States. Generations of students have used it, because it builds testing straight into your notes.</p>
<h3>The three parts of the page</h3>
<ul>
<li><strong>Notes (the big right column):</strong> what you write during the lesson, in your own words.</li>
<li><strong>Cues (a narrow left column):</strong> after the lesson, write a <em>question</em> next to each chunk of notes. "Which way does water move in osmosis?"</li>
<li><strong>Summary (a strip across the bottom):</strong> two or three sentences on the whole page, from memory.</li>
</ul>
<h3>Why it works</h3>
<p>To revise, you cover the notes column and answer the cue questions out loud. Every page becomes a quiz. That's retrieval practice, built into how you take notes.</p>
<h3>Where AI helps</h3>
<p>Write your cues yourself first. Then ask: <em>"Here are my notes and my cue questions. Are any important points missing a question? Are any of my questions too easy?"</em> You can also have it quiz you from your cue column, one question at a time.</p>`,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Notes on the right, questions on the left, summary at the bottom. Cover the right, answer the left.',
    },
    {
      kind: 'check',
      question: 'What goes in the narrow left column?',
      options: ['The teacher\'s exact words', 'Questions about each chunk of notes', 'Doodles'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi tries Efua\'s layout.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the page to what goes in it.',
        pairs: [
          ['Notes column', 'What you learned, in your own words'],
          ['Cue column', 'A question for each chunk'],
          ['Summary strip', 'Two or three sentences on the page'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the Cornell routine in order.',
        lines: ['Take notes in the right column during the lesson', 'After the lesson, write cue questions on the left', 'Write the summary at the bottom from memory', 'Revise: cover the notes, answer the cues'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best cue question for a chunk of notes about osmosis?',
        options: [
          { text: 'Which way does water move in osmosis, and why?' },
          { text: 'Osmosis', why: 'A heading, not a question.' },
          { text: 'Is osmosis in Biology?', why: 'Too easy to test anything.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has written his notes and cues. Which request is best?',
        options: [
          { text: 'Write cue questions for my notes.', why: 'Write your own first. That is part of the learning.' },
          { text: 'Here are my notes and cue questions. Are any key points missing a question? Are any of my questions too easy?' },
          { text: 'Summarise my notes.', why: 'The summary should come from his memory.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'To revise with Cornell notes, you cover the notes column and answer the ... (one word)',
        answers: ['cues', 'cue', 'questions'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'I tried Cornell notes. Took notes on the right, then never wrote the questions on the left.',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'That is fine, the layout is what matters.', why: 'The layout is useless without the cues.' },
          { text: 'The questions are what make it work. Without them it is just normal notes with an empty column.' },
          { text: 'Ask the AI to fill in the column.', why: 'Write them yourself first.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good cue question, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Why does a plant cell not burst in water?', group: 0 },
          { text: 'Plant cells', group: 1 },
          { text: 'What is the difference between diffusion and osmosis?', group: 0 },
          { text: 'Page 3', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which step in Clinton's Cornell routine is off?",
        lines: ['Notes on the right during the lesson.', 'Cue questions on the left after.', 'Summary copied from the textbook.'],
        bug: 2,
        fix: 'Summary written from memory.',
        explanation: 'A copied summary skips the thinking.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the layout rule.',
        template: 'Notes on the [[1]], questions on the [[2]], summary at the [[3]].',
        blanks: [['right'], ['left'], ['bottom']],
        distractors: ['top', 'back'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the revision move.',
        tiles: ['Cover', 'the', 'right,', 'answer', 'the', 'left'],
        distractors: ['read', 'copy'],
      },
    ],
  },
  reflect: {
    prompt: 'Take one page of your existing notes. Write three cue questions for it.',
    starters: ['Page topic:', 'Cue 1:', 'Cue 2:', 'Cue 3:'],
  },
  deepen: {
    title: 'Set up a page',
    summary: 'Rule your next page into the Cornell layout before the lesson. After it, write your cues and summary, then ask the AI what is missing.',
  },
  notes: 'Cornell note-taking system: developed by Walter Pauk, Cornell University (described in "How to Study in College", first published 1962; system devised in the 1950s). Plant cells do not burst due to the cell wall.',
};

export default lesson;
