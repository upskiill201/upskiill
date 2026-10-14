import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 with 1–4 mixed in. Story beat: Arjun's code review. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the first code review',
  summary: 'Arjun reviews Ada\'s code for the first time. Strings, printing several things, comments and errors, all mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can print text and numbers together', 'Read and fix simple errors without help'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Arjun has reviewed Ada's welcome screen. His verdict: \"Readable. Commented. One missing quote, already fixed.\"", replies: ['High praise from Arjun'] },
        { tey: 'Very high. Now it is your code review: strings, commas, comments and errors, with some history mixed in. Ready?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the code review.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the summary line',
        starter: '# Print: Members: 10 | Pot: 200000\n',
        solution: 'print("Members:", 10, "| Pot:", 10 * 20000)\n',
        hint: 'Several items with commas between them. Let Python do 10 * 20000.',
        checks: [{ message: 'Print Members: 10 | Pot: 200000', outputIncludes: 'Members: 10 | Pot: 200000' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("10" + "0")',
        language: 'python',
        options: [
          { text: '100' },
          { text: '10', why: 'These are strings, so + joins them.' },
          { text: 'An error', why: 'Joining strings is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops the whole program before anything runs?',
        language: 'python',
        lines: ['print("OFFICE AJO")', "print('Members: 10\")", 'print("Done")'],
        bug: 1,
        fix: "print('Members: 10')",
        explanation: 'The quotes don\'t match, so Python can\'t read the file at all: a SyntaxError.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Runs, or error?',
        groups: ['Runs', 'Error'],
        items: [
          { text: 'print("Ada\'s ajo")', group: 0 },
          { text: 'print(Ada)', group: 1 },
          { text: 'print("A", "B", sep="-")', group: 0 },
          { text: 'prnt("Hi")', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix both bugs',
        starter: 'print("OFFICE AJO)\nPrint("Members:", 10)\n',
        solution: 'print("OFFICE AJO")\nprint("Members:", 10)\n',
        hint: 'One line is missing a quote. The other has a capital letter where it shouldn\'t.',
        checks: [{ message: 'Print OFFICE AJO, then Members: 10', outputEquals: 'OFFICE AJO\nMembers: 10' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: '# print("A")\nprint("B", end="")\nprint("C")',
        language: 'python',
        options: [
          { text: 'BC' },
          { text: 'B then C on separate lines', why: 'end="" keeps C on the same line as B.' },
          { text: 'ABC', why: 'The first line is a comment.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Text needs quotes', 'A string is text in quotes'],
          ['Printing several things', 'Commas, sep and end'],
          ['Comments', '# notes say why'],
          ['Errors are normal', 'Type, line, message'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who created Python? (surname)',
        answers: ['van Rossum', 'Rossum', 'Guido van Rossum'],
        placeholder: 'Surname',
      },
      {
        kind: 'fillBlank',
        prompt: 'Print the names as Ada / Tunde',
        language: 'python',
        template: 'print("Ada", "Tunde", [[1]]=" / ")',
        blanks: [['sep']],
        distractors: ['end', 'join'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: "Your comment says '# prints the title'. Is that a good comment?",
        prompt: "What's the best reply?",
        options: [
          { text: "Not really. The code already says that. I'll comment why instead, or remove it." },
          { text: 'Yes, every line needs one.', why: 'Comments should say why, not repeat what.' },
          { text: 'Comments are ignored, so it doesn\'t matter.', why: 'Python ignores them. People read them.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the error routine.',
        lines: ['Read the type', 'Find the line', 'Read the message', 'Fix that line'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints Pot: 200000 with a comma',
        language: 'python',
        tiles: ['print(', '"Pot:"', ',', '200000', ')'],
        distractors: ['+', '"200000'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of this week\'s ideas (strings, commas, comments, errors) do you feel most confident about? Which needs practice?',
    starters: ['I feel confident about...', 'I want to practise...'],
  },
  deepen: { title: 'Keep going', summary: 'Write a 4-line program with a comment, a sep, and one deliberate error. Then fix the error.' },
  notes: 'Review only. Mismatched quotes ("...\') is a SyntaxError, raised before execution.',
};

export default lesson;
