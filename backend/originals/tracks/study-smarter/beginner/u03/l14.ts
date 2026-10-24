import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14 — organising a whole term's notes so revision is easy. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Organising a whole term',
  summary: "Clinton's notes are in four notebooks, two apps and a WhatsApp chat with himself. Here's a system that takes 10 minutes a week.",
  minutes: 12,
  outcomes: [
    'Organise notes by subject and syllabus line',
    'Keep an index so you can find anything in a minute',
    'Run a 10-minute weekly tidy',
  ],
  learn: [
    {
      kind: 'reading',
      title: "Clinton's notes, everywhere",
      html: `<p>Thursday call. Miracle asks everyone to find their notes on one topic. Clinton takes nine minutes. They're split across a Maths notebook, a "general" notebook, his phone's notes app, and a WhatsApp chat with himself.</p>
<p>"I'm organised," he says, "in my own way."</p>
<p>"Then show me your notes on vectors," says Miracle. He can't.</p>
<h3>A simple system</h3>
<ul>
<li><strong>One home per subject.</strong> One folder or notebook per subject, paper or digital, not both mixed. Photos of handwritten notes go in that subject's folder, not your camera roll.</li>
<li><strong>Ordered by syllabus line, not by date.</strong> Revision follows the syllabus, so your notes should too. Put a syllabus line at the top of each page.</li>
<li><strong>An index page.</strong> The first page of each subject: every syllabus line, its traffic-light colour (Chapter 1), and where the notes are.</li>
<li><strong>A "questions" page.</strong> Every question mark from your notes goes here until it's answered.</li>
</ul>
<h3>The 10-minute weekly tidy (Sunday)</h3>
<ol>
<li>File anything loose (photos, phone notes) into the right subject.</li>
<li>Update the index: new pages, new colours.</li>
<li>Answer one or two items on the questions page, with the AI or a teacher.</li>
</ol>
<p>The AI can help set up an index: paste your syllabus and ask <em>"Turn this into an index table: syllabus line, colour, page."</em> But you fill in the colours and pages.</p>`,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One home per subject. Order by syllabus. An index up front. Ten minutes every Sunday.',
    },
    {
      kind: 'check',
      question: 'How should notes inside a subject be ordered?',
      options: ['By date', 'By syllabus line', 'By how neat they are'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Clinton gets his notes into one system.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why order notes by syllabus line instead of by date?',
        options: [
          { text: 'Dates are hard to read', why: 'Not the reason.' },
          { text: 'Teachers check the order', why: 'It is for you, at revision time.' },
          { text: 'Revision follows the syllabus, so you can find each topic instantly' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the Sunday tidy in order.',
        lines: ['File anything loose into the right subject', 'Update the index', 'Answer one or two questions from the questions page'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the system, or not?',
        groups: ['Part of the system', 'Not part of it'],
        items: [
          { text: 'An index page per subject', group: 0 },
          { text: 'Notes in a chat with yourself', group: 1 },
          { text: 'A questions page', group: 0 },
          { text: 'Photos left in the camera roll', group: 1 },
          { text: 'Syllabus line at the top of each page', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Clinton set up his index?',
        options: [
          { text: 'Organise my life.', why: 'Too vague, and not something it can do.' },
          { text: '[syllabus] Turn this into an index table with columns: syllabus line, colour, page.' },
          { text: 'Fill in my colours for me.', why: 'Only he knows how well he knows each line.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "Fine. But 10 minutes every Sunday? That's a lot.",
        prompt: 'What could Kofi point out?',
        options: [
          { text: 'You just spent 9 minutes looking for one topic. Ten minutes a week saves you that every time.' },
          { text: 'You are right, skip it.', why: 'He would be back to nine-minute searches.' },
          { text: 'Do it every day for two hours.', why: 'Ten minutes is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every question mark from your notes goes on the ... page (one word)',
        answers: ['questions', 'question'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: "Which part of David's set-up breaks the system?",
        lines: ['Physics folder with an index page.', 'Chemistry notes split between the Physics folder and his phone.', 'A questions page at the back of each folder.'],
        bug: 1,
        fix: 'One home for Chemistry: its own folder, with phone notes filed into it.',
        explanation: 'One home per subject is the first rule.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to what it does.',
        pairs: [
          ['Index page', 'Find any topic in a minute'],
          ['Questions page', 'Holds what you still need to ask'],
          ['Sunday tidy', 'Keeps it all up to date'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the system.',
        template: 'One [[1]] per subject. Order by [[2]]. An index up front.',
        blanks: [['home', 'folder'], ['syllabus']],
        distractors: ['date', 'colour'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Name the weekly habit.',
        tiles: ['Ten', 'minutes', 'every', 'Sunday'],
        distractors: ['hours', 'never'],
      },
    ],
  },
  reflect: {
    prompt: 'How long would it take you to find your notes on one topic from last month? Where are your notes right now?',
    starters: ['It would take me...', 'My notes are in...'],
  },
  deepen: {
    title: 'Set it up this Sunday',
    summary: 'Make an index page for one subject with the AI\'s help, fill in your colours, and start a questions page.',
  },
  notes: 'Organisational system is general study-skills guidance; no claims.',
};

export default lesson;
