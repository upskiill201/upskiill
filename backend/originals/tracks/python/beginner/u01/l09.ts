import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 — errors are normal: reading SyntaxError and NameError calmly. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Errors are normal',
  summary: "Ada's code breaks for the first time, in red. Here's the secret: the error message is Python trying to help, and it nearly always says where to look.",
  minutes: 13,
  outcomes: [
    'Read an error message: the type, the line, the message',
    'Fix a missing quote or bracket (SyntaxError)',
    'Fix a misspelled name (NameError)',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The first red message',
      beats: [
        { speaker: 'narrator', text: 'Tuesday night. Ada adds a line to her welcome screen and presses Run. Nothing prints. Just red text.' },
        { speaker: 'ada', text: "SyntaxError: unterminated string literal. I broke it. I've broken Python." },
        { speaker: 'arjun', text: "You can't break Python. Read me the whole message. Slowly." },
        { speaker: 'ada', text: 'Line 3. Unterminated string literal. And there\'s a little arrow under my text.' },
        { speaker: 'arjun', text: "Unterminated means it never ends. Look at line 3. Where does your text end?" },
        { speaker: 'narrator', text: 'Ada looks. print("Monthly share: 20000) . The closing quote is missing.' },
        { speaker: 'tey', text: "That's the whole skill: don't panic, read the type, find the line, read the message. Professional programmers see errors all day long." },
      ],
      choice: {
        prompt: 'What should Ada do next time she sees red?',
        options: [
          {
            text: 'Read the error type, find the line number, read the message, then look at that line',
            outcome: 'Most errors are fixed in under a minute this way. The message nearly always points to the exact line.',
            best: true,
          },
          { text: 'Delete the whole program and start again', outcome: 'She loses ten good lines to fix one missing quote.' },
          { text: 'Change random things until it works', outcome: 'It might work by accident, and she learns nothing about why.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Two errors you\'ll meet this week</strong></p><ul><li><strong>SyntaxError:</strong> Python can\'t even read the code. A missing quote, a missing bracket. Python checks the whole file first, so <em>nothing</em> runs, not even the lines before it.</li><li><strong>NameError:</strong> Python reads the code fine, but meets a name it doesn\'t know, like <code>prnt</code> or <code>Print</code>. Lines before it already ran. Python often suggests the right name: "Did you mean: \'print\'?"</li></ul><p>Teyro also explains each error in plain words above the real message. Read both: learning to read real error messages is part of learning Python.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Break it, then fix it',
      caption: 'This code has the same mistake as Ada\'s. Press Run and read the error first.',
      code: 'print("OFFICE AJO")\nprint("Members: 10")\nprint("Monthly share: 20000)\n',
      challenge: 'Find the missing quote on line 3, add it, and run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Ada learns to read errors.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the error-reading routine in order.',
        lines: ['Read the error type', 'Find the line number', 'Read the message', 'Look at that line and fix it'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the missing quote',
        starter: 'print("Pay day is the 25th)\n',
        solution: 'print("Pay day is the 25th")\n',
        hint: 'The text starts with " but never ends. Add a " before the closing bracket.',
        checks: [{ message: 'Print Pay day is the 25th', outputIncludes: 'Pay day is the 25th' }],
      },
      {
        kind: 'mcq',
        prompt: 'A program has a SyntaxError on line 3. Do lines 1 and 2 run?',
        options: [
          { text: 'Yes, only line 3 fails', why: 'That is true for errors that happen while running, like NameError. A SyntaxError stops everything.' },
          { text: 'Only line 1', why: 'With a SyntaxError, none of them run.' },
          { text: 'No. Python checks the whole file first, so nothing runs' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'SyntaxError or NameError?',
        groups: ['SyntaxError', 'NameError'],
        items: [
          { text: 'print("Hello)', group: 0 },
          { text: 'prnt("Hello")', group: 1 },
          { text: 'print("Hello"', group: 0 },
          { text: 'Print("Hello")', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the misspelled name',
        starter: 'print("OFFICE AJO")\nprnt("Members: 10")\n',
        solution: 'print("OFFICE AJO")\nprint("Members: 10")\n',
        hint: 'Python will suggest the right spelling in the error message.',
        checks: [{ message: 'Print OFFICE AJO, then Members: 10', outputEquals: 'OFFICE AJO\nMembers: 10' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does "unterminated string literal" mean?',
        options: [
          { text: 'The program ran too long', why: 'That would be a time-out, not this.' },
          { text: "A piece of text starts with a quote but never ends" },
          { text: 'A number is too big', why: 'This message is about text and quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The error says line 2. Tap the line to fix.',
        language: 'python',
        lines: ['print("Welcome")', 'print("Members:", 10', 'print("Done")'],
        bug: 1,
        fix: 'print("Members:", 10)',
        explanation: 'The bracket opened after print is never closed.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: "Arjun, do professional programmers still get errors?",
        prompt: "What is Arjun's honest answer?",
        options: [
          { text: 'No, only beginners get errors.', why: 'Everyone gets errors. Experts are just quick at reading them.' },
          { text: 'Only when the computer is broken.', why: 'Errors come from code, not broken computers.' },
          { text: 'All day, every day. The difference is they read the message calmly and fix it fast.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which error type do you get when Python meets a name it does not know? (one word)',
        answers: ['NameError', 'name error'],
        placeholder: 'Error type',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of an error to what it tells you.',
        pairs: [
          ['SyntaxError', 'What kind of problem'],
          ['line 3', 'Where to look'],
          ['unterminated string literal', 'What exactly went wrong'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How did you feel the first time you saw a red error in this course? What will you do next time?',
    starters: ['At first I felt...', 'Next time I will...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Break one of your earlier programs on purpose in two ways (remove a quote, misspell print), and read both error messages.',
  },
  notes:
    'Python 3.12 messages: missing closing quote → "SyntaxError: unterminated string literal (detected at line N)"; prnt → "NameError: name \'prnt\' is not defined. Did you mean: \'print\'?" (suggestions since 3.10). SyntaxErrors are raised at compile time, so no statement in the file runs. The Try it live card is expectError: it is meant to fail until the learner fixes it.',
};

export default lesson;
