import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 17 — Common if mistakes: = vs ==, missing colons, x == a or b, comparing types. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common if mistakes',
  summary: 'Ada collects every if mistake she\'s made this chapter into one list for the next learner in the office: Bisi, who has started learning Python too.',
  minutes: 11,
  outcomes: [
    'Spot the five most common if mistakes',
    'Know which ones crash and which are silent',
    'Fix each one',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Mistake 1: if paid = 30000: with one =. Python stops with a SyntaxError. Comparisons need ==.', replies: ['Mistake 2?'] },
        { tey: 'Mistake 2: a missing colon at the end of if, elif or else. Also a SyntaxError, and Python points right at it.', replies: ['Those are loud. Any quiet ones?'] },
        { tey: 'Mistake 3, quiet: if day == 26 or 27:. It\'s always True. Write day == 26 or day == 27. Mistake 4, quiet: comparing text from input() with a number, like if answer == 30000:. "30000" == 30000 is just False.', replies: ['And 5?'] },
        { tey: 'Mistake 5, quiet: the wrong order in an elif chain, so a branch can never run. You traced one last lesson. The quiet ones are why you test.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The quiet one',
      caption: 'The user types 30000. Why doesn\'t it say Exact?',
      code: 'answer = input("Amount: ")\n\nif answer == 30000:\n    print("Exact")\nelse:\n    print("Not exact")\n',
      stdin: ['30000'],
      challenge: 'Fix it with int().',
    },
  ],
  apply: {
    scenario: 'Ada\'s list of if mistakes, for Bisi.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Loud (an error) or quiet (wrong answer)?',
        groups: ['Loud', 'Quiet'],
        items: [
          { text: 'if paid = 30000:', group: 0 },
          { text: 'Missing colon', group: 0 },
          { text: 'if day == 26 or 27:', group: 1 },
          { text: 'Comparing "30000" with 30000', group: 1 },
          { text: 'An elif that can never run', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the quiet bug so typing 30000 prints Exact',
        starter: 'answer = input("Amount: ")\nif answer == 30000:\n    print("Exact")\nelse:\n    print("Not exact")\n',
        solution: 'answer = input("Amount: ")\nif int(answer) == 30000:\n    print("Exact")\nelse:\n    print("Not exact")\n',
        hint: 'Convert answer with int() before comparing.',
        stdin: ['30000'],
        checks: [{ message: 'Print Exact', outputIncludes: '30000 Exact' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("30000" == 30000)',
        language: 'python',
        options: [
          { text: 'True', why: 'Text and a number are never equal.' },
          { text: 'False' },
          { text: 'TypeError', why: '== works between any types; it\'s just False.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the always-True condition so day = 30 prints On time',
        starter: 'day = 30\nif day == 26 or 27:\n    print("Grace period")\nelse:\n    print("On time")\n',
        solution: 'day = 30\nif day == 26 or day == 27:\n    print("Grace period")\nelse:\n    print("On time")\n',
        hint: 'Write day == on both sides of or.',
        checks: [{ message: 'Print On time', outputEquals: 'On time' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a SyntaxError?',
        language: 'python',
        lines: ['if paid >= 30000:', '    print("Full")', 'elif paid > 0', '    print("Part")'],
        bug: 2,
        fix: 'elif paid > 0:',
        explanation: 'elif needs its colon too.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['if paid = 30000:', 'Use =='],
          ['if day == 26 or 27:', 'Repeat day =='],
          ['if answer == 30000: (answer from input)', 'Convert with int()'],
          ['elif that never runs', 'Reorder the chain'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Compare the typed answer fairly.',
        language: 'python',
        template: 'if [[1]](answer) [[2]] 30000:',
        blanks: [['int'], ['==']],
        distractors: ['str', '='],
      },
      {
        kind: 'mcq',
        prompt: 'Why are the quiet mistakes worse than the loud ones?',
        options: [
          { text: 'They crash the computer', why: 'They don\'t crash anything. That\'s the problem.' },
          { text: 'They aren\'t worse', why: 'A loud error gets fixed today; a quiet one can last years.' },
          { text: 'The program runs and gives a believable wrong answer, so nobody notices' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What one tip would you give Bisi for avoiding the quiet ones?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Predict the output for each branch before running, then test one input per branch.' },
          { text: 'Never use if.', why: 'if is how programs decide.' },
          { text: 'Ask AI to check.', why: 'Useful, but testing each branch is the habit that catches them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many = signs does a comparison need in an if?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five mistakes do you think you\'ll make most? Write a reminder to yourself.',
    starters: ['I\'ll probably...', 'My reminder:'],
  },
  deepen: {
    title: 'Bisi\'s turn',
    summary: 'Bisi is learning too. Teaching someone else what you learned is one of the best ways to remember it.',
  },
  notes: '"30000" == 30000 is False (no implicit conversion). day == 26 or 27 is truthy. Missing colon and = in a condition are SyntaxErrors. Teaching others improves recall (the "protégé effect"; e.g. Nestojko et al. 2014, Memory & Cognition).',
};

export default lesson;
