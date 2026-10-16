import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: Kamau's question lands on Zanele's desk. First line of Python. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'One in three',
  summary: "5 weeks to Kamau. Synergix's CEO says 1 in 3 deliveries is late and wants to know why. Remi asks Zanele, the spreadsheet genius, to find out. She's never written a line of code. Today she writes her first one.",
  minutes: 10,
  outcomes: [
    'Know the question this course answers: why are deliveries late?',
    'Run your first line of Python',
    'Use print() to show text and numbers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:40 a.m., Synergix, Nairobi',
      beats: [
        { speaker: 'remi', text: 'Kamau just gave me delivery times. 1 in 3 deliveries is late, and customers are noticing. He wants to know why. In five weeks.' },
        { speaker: 'zanele', text: "And you came to me because I'm the spreadsheet genius. Correct. Let's leverage the bandwidth." },
        { speaker: 'remi', text: "That's not what bandwidth means. Felix can export every delivery from March. But I want this done properly: the same steps every week, with the working shown. Brian says that means Python." },
        { speaker: 'zanele', text: "I've never written a line of code in my life." },
        { speaker: 'narrator', text: "Remi pulls a chair over. On the whiteboard behind them, someone has written: 5 WEEKS TO KAMAU." },
      ],
      choice: {
        prompt: 'What should Zanele do first?',
        options: [
          {
            text: 'Write down the exact question before touching any data.',
            outcome: 'She writes: "Why are 1 in 3 deliveries late?" Remi nods. Every lesson in this course comes back to that line.',
            best: true,
          },
          {
            text: 'Open the data and look for something interesting.',
            outcome: 'She could scroll for hours. Without a question, everything looks interesting and nothing gets answered.',
          },
          {
            text: 'Tell Remi the answer is probably the drivers.',
            outcome: 'Emeka thinks that too. Maybe. But a guess isn\'t an answer, and Kamau will ask how she knows.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>Data science</strong> is answering a question with data, honestly. You'll do it in <strong>Python</strong>, the most popular language for data work, and <strong>pandas</strong>, its spreadsheet-in-code library. Everything runs right here in your browser. Your first tool is <code>print()</code>: whatever you put in the brackets appears below. Text goes in quotes; numbers don't.</p>",
    },
    {
      kind: 'tryIt',
      title: "Zanele's first line of Python",
      code: 'print("Why are deliveries late?")\nprint(135)\n',
      caption: 'Press Run. The first line prints text (in quotes). The second prints a number (no quotes).',
      challenge: 'Change the question to your own words and run it again.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Spelling counts in code. print must be lower case, and every opening bracket and quote needs a closing one.',
    },
  ],
  apply: {
    scenario: 'Monday morning: the question, and the first line of code.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is data science, in this course?',
        options: [
          { text: 'Making charts look impressive', why: 'Charts help, but the point is the answer.' },
          { text: 'Answering a question with data, honestly' },
          { text: 'Collecting as much data as possible', why: 'More data without a question answers nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the question Zanele wrote: Why are deliveries late?',
        starter: 'print("")\n',
        solution: 'print("Why are deliveries late?")\n',
        hint: 'Put the words inside the quotes.',
        checks: [{ message: 'Print: Why are deliveries late?', outputIncludes: 'Why are deliveries late?' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(135)',
        language: 'python',
        options: [
          { text: 'print(135)', why: 'print shows what\'s inside the brackets, not the whole line.' },
          { text: 'Nothing', why: 'print always shows something.' },
          { text: '135' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line so it prints the word late.',
        template: '[[1]]("late")',
        blanks: [['print']],
        distractors: ['Print', 'show'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['print("Week 1")', 'Print("5 weeks to Kamau")', 'print(400)'],
        bug: 1,
        fix: 'print("5 weeks to Kamau")',
        explanation: 'Python is case-sensitive: Print with a capital P is not the same as print.',
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Text or number?',
        groups: ['Text (needs quotes)', 'Number (no quotes)'],
        items: [
          { text: '"Nairobi"', group: 0 },
          { text: '400', group: 1 },
          { text: '"late"', group: 0 },
          { text: '135', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the number of late deliveries Kamau quoted: 135 (as a number, no quotes).',
        starter: 'print("Late:")\n',
        solution: 'print("Late:")\nprint(135)\n',
        hint: 'Add a second line: print(135)',
        checks: [
          { message: 'Print 135', outputIncludes: '135' },
          { message: 'Use a number, not text in quotes', codeIncludes: 'print(135)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: "I've never written code. What if I break something?",
        prompt: "Remi's best reply?",
        options: [
          { text: "You can't break anything. It runs in your browser. Mistakes just show an error you can fix." },
          { text: 'Then don\'t try yet. Watch me first.', why: 'You learn code by running it, not watching.' },
          { text: 'Coding is easy, everyone can do it instantly.', why: 'Not true, and not kind when she\'s nervous.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints Hello, Synergix!',
        tiles: ['print(', '"Hello, Synergix!"', ')'],
        distractors: ['Print(', 'Hello'],
        language: 'python',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a data project in order.',
        lines: ['Ask a clear question', 'Get the data', 'Clean it', 'Look for patterns', 'Explain the answer honestly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which Python word shows something on the screen?',
        answers: ['print', 'print()'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a question at your work, school or home that data could answer. Write it in one sentence.',
    starters: ['I want to know why...', 'I wonder how often...'],
  },
  deepen: {
    title: 'Your question',
    summary: 'Write your own question in the Try it card with print(). Keep it: you\'ll sharpen it in lesson 8.',
  },
  notes: 'Story setup. Synergix, Remi, Zanele, Kamau and the delivery-times project follow How to Lead Without Being the Boss (Kamau: "Our delivery times are next"). Python is the most-used language on GitHub (GitHub Octoverse 2024) and pandas is the standard Python data library. Late figure: deliveries_clean.csv has 135 late of 400 (33.75%).',
};

export default lesson;
