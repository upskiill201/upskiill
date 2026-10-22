import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Chapter Challenge. The whole chapter, harder. Climax: Ajo Tracker v0.1 ships. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ajo Tracker v0.1',
  summary: 'Pay day. Ada shows the office the first version of the Ajo Tracker. Build it with her: everything from Chapter 1, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete, readable welcome screen in Python', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'story',
      title: 'Pay day, the 25th',
      beats: [
        { speaker: 'narrator', text: 'The 25th. Ten colleagues around a desk, envelopes of cash, and one old notebook.' },
        { speaker: 'narrator', text: 'Ada puts her phone in the middle of the table and presses Run.' },
        { speaker: 'narrator', text: 'A banner. The group\'s name. Members: 10. Pot: 200000. Each share: 20000.0. Whose turn it is.' },
        { speaker: 'narrator', text: '"Version 0.1," she says. "Next month it does the money maths properly."' },
        { speaker: 'arjun', text: "(on the phone) Three weeks ago she'd never written a line. Now she's shipping versions." },
        { speaker: 'tey', text: 'Your turn. Build v0.1, then prove you can read, fix and plan code too.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ajo Tracker v0.1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build Ajo Tracker v0.1',
        starter:
          '# Ajo Tracker v0.1\n# Print, in this order:\n# 1. a line of 20 = signs\n# 2. OFFICE AJO v0.1\n# 3. a line of 20 = signs\n# 4. Members: 10\n# 5. Pot: followed by 10 * 20000, worked out by Python\n# 6. This month: Tunde\n',
        solution:
          '# Ajo Tracker v0.1\nprint("=" * 20)\nprint("OFFICE AJO v0.1")\nprint("=" * 20)\nprint("Members:", 10)\nprint("Pot:", 10 * 20000)\nprint("This month: Tunde")\n',
        hint: 'Six print( ) lines. A line of 20 equals signs is "=" * 20. Use a comma between "Pot:" and the sum.',
        checks: [
          {
            message: 'Print the welcome screen exactly, in order',
            outputEquals: '====================\nOFFICE AJO v0.1\n====================\nMembers: 10\nPot: 200000\nThis month: Tunde',
          },
          { message: 'Make the lines with * instead of typing 20 equals signs', codeIncludes: '"=" * 20' },
          { message: 'Let Python work out the pot', codeIncludes: '10 * 20000' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Share:", 200000 / 10, sep=" = ")',
        language: 'python',
        options: [
          { text: 'Share: 20000.0', why: 'sep=" = " replaces the space between the two items.' },
          { text: 'Share: = 20000.0' },
          { text: 'Share: = 20000', why: '/ always gives a decimal.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every mistake in this v0.1 draft',
        starter: 'Print("OFFICE AJO")\n  print("Members:" 10)\nprint("Pot:", 10 * 20000\n',
        solution: 'print("OFFICE AJO")\nprint("Members:", 10)\nprint("Pot:", 10 * 20000)\n',
        hint: 'Run the five-second check: lowercase, quotes, brackets, commas, stray spaces.',
        checks: [{ message: 'Print the three lines', outputEquals: 'OFFICE AJO\nMembers: 10\nPot: 200000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which error would each line cause?',
        groups: ['SyntaxError', 'NameError', 'IndentationError'],
        items: [
          { text: 'print("Pot)', group: 0 },
          { text: 'prnt("Pot")', group: 1 },
          { text: '  print("Pot") at the top', group: 2 },
          { text: 'print("Pot"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: "Where does Python's name come from?",
        options: [
          { text: 'A snake', why: 'Only the logo has snakes.' },
          { text: 'A company', why: 'It was one person\'s hobby project.' },
          { text: "Monty Python's Flying Circus" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Plan and code the goodbye screen',
        starter: '# Plan (as comments), then code:\n# - a line of 20 dashes\n# - Next pay day: the 25th\n',
        solution: '# Line of dashes\nprint("-" * 20)\n# When to pay next\nprint("Next pay day: the 25th")\n',
        hint: '"-" * 20 makes the dashes.',
        checks: [
          { message: 'Print 20 dashes, then Next pay day: the 25th', outputEquals: '--------------------\nNext pay day: the 25th' },
          { message: 'Keep a comment in your code', codeIncludes: '#' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to its job.',
        pairs: [
          ['print()', 'Shows text and numbers'],
          ['#', 'A note for humans'],
          ['sep=', 'What goes between items'],
          ['"=" * 20', 'Repeats text'],
          ['import this', 'Shows the Zen'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: "Order Ada's chapter: from notebook to v0.1.",
        lines: [
          'A notebook and an argument',
          'Her first line: print("Hello, Ajo!")',
          'Her first error, read calmly',
          'A plan in comments and a road map',
          'v0.1 runs on pay day',
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(7 / 2) show?',
        answers: ['3.5'],
        placeholder: 'Output',
      },
      {
        kind: 'findBug',
        prompt: 'This v0.1 should say Pot: 200000. Which line is wrong?',
        language: 'python',
        lines: ['print("=" * 20)', 'print("OFFICE AJO v0.1")', 'print("Pot:", "10 * 20000")'],
        bug: 2,
        fix: 'print("Pot:", 10 * 20000)',
        explanation: 'In quotes, the sum is just text, so Python prints it as it is.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'v0.1 works. What would you do differently next time?',
        prompt: 'Which answer shows the best habits from this chapter?',
        options: [
          { text: 'Plan in comments first, predict the output before running, and do the five-second check.' },
          { text: 'Ask AI to write it all.', why: 'Then Ada learns nothing for v0.2.' },
          { text: 'Nothing, it\'s perfect.', why: 'Every version can be clearer. That\'s how v0.2 happens.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the banner line.',
        language: 'python',
        template: 'print("=" [[1]] [[2]])',
        blanks: [['*'], ['20']],
        distractors: ['+', '"20"'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints This month: Tunde',
        language: 'python',
        tiles: ['print(', '"This month: Tunde"', ')'],
        distractors: ['Print(', 'This month: Tunde'],
      },
      {
        kind: 'mcq',
        prompt: 'What will v0.2 of the Ajo Tracker add, according to the road map?',
        options: [
          { text: 'Who has paid', why: 'That is v0.4.' },
          { text: 'Everything at once', why: 'One feature per version.' },
          { text: 'The money maths' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 1 done. You went from "what is Python?" to a working program. What are you proudest of?',
    starters: ['I am proudest of...', 'Next I want to learn...'],
  },
  deepen: {
    title: 'Next: Chapter 2',
    summary: 'Ada is tired of typing "OFFICE AJO" and 20000 everywhere. Chapter 2: names for things. Variables, and the end of retyping.',
  },
  notes: '10 * 20000 = 200000; 7 / 2 = 3.5; sep=" = " → "Share: = 20000.0". "=" * 20 is 20 characters.',
};

export default lesson;
