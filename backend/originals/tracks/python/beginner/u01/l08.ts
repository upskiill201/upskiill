import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 — comments: notes for humans, and switching lines off. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Comments: notes for humans',
  summary: "Arjun sends Ada some code with no notes at all. Nobody, including Arjun, can tell what it does. A # fixes that.",
  minutes: 11,
  outcomes: [
    'Write comments with #',
    'Use a comment to switch a line off',
    'Write comments that explain why, not just what',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Arjun sent Ada this: print(200000 // 10). No note, nothing. What do you think it means?', replies: ['No idea', 'Something about money?'] },
        { tey: "Exactly. Code tells Python what to do. It doesn't tell humans WHY. That's what comments are for." },
        { tey: 'A comment starts with #. Python ignores everything from the # to the end of the line. It is a note for people.', replies: ['Show me'] },
        { tey: '# Each member\'s share of the pot\nprint(200000 // 10)\n\nNow it makes sense. The comment says why the line is there.' },
        { tey: 'Second trick: put # in front of a line of code and Python skips it. Programmers call this commenting out. Great for testing.', replies: ['Should I comment every line?'] },
        { tey: "No. print(\"Hello\") doesn't need a note saying \"prints hello\". Comment the WHY and the surprising bits, not the obvious." },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Python skips comments',
      caption: 'Three lines start with #. Press Run and see which ones print.',
      code: '# The office ajo, version 0.0\nprint("OFFICE AJO")\n# print("This line is switched off")\nprint("Members:", 10)  # a comment can go at the end of a line too\n',
      challenge: 'Remove the # in front of the switched-off line and run it again.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Good comments say WHY. The code already says WHAT.',
    },
  ],
  apply: {
    scenario: "Ada makes Arjun's code readable.",
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: '# print("A")\nprint("B")',
        language: 'python',
        options: [
          { text: 'B' },
          { text: 'A then B', why: 'The first line is a comment, so Python skips it.' },
          { text: 'Nothing', why: 'The second line still runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a comment above the line, then run it',
        starter: 'print("Pay day is the 25th")\n',
        solution: '# When everyone pays in\nprint("Pay day is the 25th")\n',
        hint: 'Start a new line above it with # and a short note.',
        checks: [
          { message: 'Add a comment with #', codeIncludes: '#' },
          { message: 'Still print Pay day is the 25th', outputIncludes: 'Pay day is the 25th' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which symbol starts a comment in Python?',
        options: [
          { text: '#' },
          { text: '//', why: 'That starts a comment in JavaScript and some other languages, not Python.' },
          { text: '--', why: 'That is a comment in SQL, not Python.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful comment, or not needed?',
        groups: ['Helpful', 'Not needed'],
        items: [
          { text: "# Each member's share of the pot", group: 0 },
          { text: '# prints hello', group: 1 },
          { text: '# Pay day moved to the 25th in 2026', group: 0 },
          { text: '# this is a line of code', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Switch off the test line without deleting it',
        starter: 'print("OFFICE AJO")\nprint("TEST - delete me later")\nprint("Members: 10")\n',
        solution: 'print("OFFICE AJO")\n# print("TEST - delete me later")\nprint("Members: 10")\n',
        hint: 'Put # at the start of the TEST line.',
        checks: [
          { message: 'Print OFFICE AJO, then Members: 10, and nothing else', outputEquals: 'OFFICE AJO\nMembers: 10' },
          { message: 'Keep the test line in the code, commented out', codeIncludes: 'TEST' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: "Why do you keep adding comments to my code? It works.",
        prompt: "What is Ada's best reply?",
        options: [
          { text: 'It works, but nobody can tell WHY it does what it does. In six months, that includes you.' },
          { text: 'Comments make code run faster.', why: 'Python ignores comments completely.' },
          { text: 'Every line needs a comment.', why: 'Only the why and the surprising bits do.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line will Python try to run as code, and fail?',
        language: 'python',
        lines: ['# Ajo tracker by Ada', 'Ajo tracker version 0.0', 'print("OFFICE AJO")'],
        bug: 1,
        fix: '# Ajo tracker version 0.0',
        explanation: 'Without a #, Python reads the note as code and can\'t understand it.',
      },
      {
        kind: 'mcq',
        prompt: 'What does Python do with print("A")  # show the first letter ?',
        options: [
          { text: 'Prints A and ignores the comment after #' },
          { text: 'Prints the whole line', why: 'Everything after # is ignored.' },
          { text: 'Skips the whole line', why: 'Only the part from # onwards is skipped.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Switch the second line off.',
        language: 'python',
        template: 'print("Hello")\n[[1]] print("Old version")',
        blanks: [['#']],
        distractors: ['//', '--'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the use to the example.',
        pairs: [
          ['Explain why', "# Each member's share"],
          ['Switch a line off', '# print("test")'],
          ['Note at the end of a line', 'print(10)  # members'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a recipe or a set of instructions you know. Where would a "why" note help someone following it?',
    starters: ['A step that needs a why is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Go back to a program you wrote earlier in this chapter and add one comment that explains why, not what.',
  },
  notes: '# starts a comment to end of line (Python reference, lexical analysis). 200000 // 10 = 20000 (floor division, taught properly in Chapter 3).',
};

export default lesson;
