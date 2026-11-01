import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Tap to explore: reading a diff. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What did it actually change?',
  summary: 'Ruth asks to see "the diff" from Tuesday, when Hazel asked for the D.C. message. Two lines nobody asked about changed too. One of them is the bug.',
  minutes: 12,
  outcomes: [
    'Read a diff: red lines out, green lines in',
    'Count which files and lines changed',
    'Spot a change you didn\'t ask for',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tuesday\'s change',
      text:
        'thermometer.html   +4  -1\n\n  function addPledge(name, input) {\n-   pledges.push({ name, amount: Number(input.value) });\n+   pledges.push({ name, amount: input.value });\n  }\n\n+ if (total >= GOAL) {\n+   message.textContent = "WE\'RE GOING TO D.C.!";\n+ }',
      hotspots: [
        { phrase: 'thermometer.html   +4  -1', note: 'The summary: one file changed, 4 lines added, 1 removed. Hazel asked for one message. Why is anything removed?' },
        { phrase: '-   pledges.push({ name, amount: Number(input.value) });', note: 'A line starting with - (shown in red) was taken out. This old line turned the typed amount into a Number.' },
        { phrase: '+   pledges.push({ name, amount: input.value });', note: 'A line starting with + (shown in green) was added. Number(...) is gone, so the amount is now text. That\'s the bug, in a change nobody asked for.' },
        { phrase: 'if (total >= GOAL)', note: 'This is what Hazel asked for: when the total reaches the goal...' },
        { phrase: 'message.textContent = "WE\'RE GOING TO D.C.!";', note: '...show the message. The requested part was fine.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Where to see changes: in Ask mode, Claude Code shows each edit before you approve it. /diff shows what changed. In the desktop app, click the +4 -1 badge. You\'ll meet git diff in Chapter 4.',
    },
  ],
  apply: {
    scenario: 'Reading Tuesday\'s diff.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the diff mark to its meaning.',
        pairs: [
          ['A line starting with +', 'Added'],
          ['A line starting with -', 'Removed'],
          ['A line with neither', 'Unchanged, shown for context'],
          ['+4 -1', 'Lines added and removed'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel asked only for the D.C. message. Which part of the diff should worry her?',
        options: [
          { text: 'The if (total >= GOAL) lines', why: 'That\'s exactly what she asked for.' },
          { text: 'The changed pledges.push line she never asked about' },
          { text: 'The file name', why: 'The right file. The problem is inside it.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that introduced the bug.',
        lines: [
          '  function addPledge(name, input) {',
          '+   pledges.push({ name, amount: input.value });',
          '+ if (total >= GOAL) {',
          '+   message.textContent = "WE\'RE GOING TO D.C.!";',
        ],
        bug: 1,
        fix: 'amount: Number(input.value)',
        explanation: 'Without Number(...), the amount stays as text, so amounts get glued together.',
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A diff says "+4 -1". How many lines were removed?',
        answers: ['1', 'one'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'I can\'t read code. How am I supposed to check a diff?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'You can\'t, so skip it.', why: 'You don\'t need to read every word to spot the big signs.' },
          { text: 'Learn programming first.', why: 'Not needed for the first checks.' },
          { text: 'Start with three questions: which files? how many lines? anything removed I didn\'t expect? Then ask it to explain the rest.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Expected, or a surprise worth asking about?',
        groups: ['Expected', 'Ask about it'],
        items: [
          { text: 'Asked for a message; 3 lines added for it', group: 0 },
          { text: 'Asked for a message; a line removed elsewhere', group: 1 },
          { text: 'Asked to change thermometer.html; index.html changed', group: 1 },
          { text: 'Asked for a heading; the heading line changed', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s three diff questions.',
        template: 'Which [[1]]? How many [[2]]? Anything [[3]] I didn\'t expect?',
        blanks: [['files'], ['lines'], ['removed']],
        distractors: ['colours', 'added safely'],
      },
      {
        kind: 'mcq',
        prompt: 'Where can Hazel see a change before it happens?',
        options: [
          { text: 'In Ask mode, Claude Code shows each edit before she approves it' },
          { text: 'Nowhere: you only see changes after', why: 'Ask mode shows edits first.' },
          { text: 'In her email', why: 'It\'s right there in the tool.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'A diff for "change the heading" shows "+40 -38". What should Hazel think?',
        options: [
          { text: 'Great, lots of work done', why: 'A heading is one line. 78 lines is a surprise.' },
          { text: 'That\'s far more than a heading. Look, or ask why.' },
          { text: 'Diffs are always big', why: 'A small ask should make a small diff.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Hazel\'s question to the AI.',
        tiles: ['You changed the pledges.push line.', 'I didn\'t ask for that.', 'Why?'],
        distractors: ['Good job.', 'Do more.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone "helped" by changing more than you asked (a document, your room, your phone settings). What would a "diff" have shown you?',
  },
  deepen: {
    title: 'On your computer: read a diff',
    summary: 'Ask Claude Code for one small change in your tool. Before approving, read the change it shows: which file, how many lines, anything removed? After, type /diff and read it again.',
  },
  notes: 'Unified diff format (+/- lines). Claude Code (October 2026): Ask/default mode shows edits for approval; /diff command exists; desktop shows a +N -M indicator that opens the diff view.',
};

export default lesson;
