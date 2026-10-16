import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6 — else: what to do when the condition is False. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'else',
  summary: 'The tracker says "Paid in full" or nothing at all. Silence worries people. Ada adds the other half of the decision: else, for everyone the if didn\'t cover.',
  minutes: 11,
  outcomes: [
    'Add an else to an if',
    'Know that exactly one of the two blocks runs',
    'Make a program always give an answer',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'if paid >= SHARE: covers people who paid. For everyone else, add else: at the same indent as the if, with its own colon and its own indented block.', replies: ['Does else need a condition?'] },
        { tey: 'No. else means "otherwise": it runs exactly when the if\'s condition is False. Python checks the condition once, and runs one block or the other, never both, never neither.', replies: ['Show me'] },
        { tey: 'if paid >= SHARE:\n    print("Paid in full")\nelse:\n    print("Not yet")\nNow every member gets an answer.', replies: ['Where does the else go?'] },
        { tey: 'Lined up with its if, not indented. else: on its own, under the if\'s block, always with a colon.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Always an answer',
      caption: 'Change paid between 30000 and 15000.',
      code: 'SHARE = 30000\npaid = 15000\n\nif paid >= SHARE:\n    print("Paid in full")\nelse:\n    print(f"Not yet: {SHARE - paid} to go")\n',
      challenge: 'Make it print "Paid in full" for 30000 and "Not yet" for 29999.',
    },
  ],
  apply: {
    scenario: 'Every member gets an answer.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 15000. What does this print?',
        code: 'if paid >= 30000:\n    print("Paid")\nelse:\n    print("Not yet")',
        language: 'python',
        options: [
          { text: 'Paid', why: '15000 >= 30000 is False, so else runs.' },
          { text: 'Not yet' },
          { text: 'Paid then Not yet', why: 'Only one of the two blocks ever runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Paid in full if paid covers SHARE, otherwise print Not yet',
        starter: 'SHARE = 30000\npaid = 20000\n',
        solution: 'SHARE = 30000\npaid = 20000\nif paid >= SHARE:\n    print("Paid in full")\nelse:\n    print("Not yet")\n',
        hint: 'if ...: block, then else: block.',
        checks: [
          { message: 'Print Not yet', outputEquals: 'Not yet' },
          { message: 'Use else', codeIncludes: 'else:' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the if/else.',
        language: 'python',
        lines: ['if day > 25:', '    print("Late")', 'else:', '    print("On time")'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a SyntaxError?',
        language: 'python',
        lines: ['if paid >= 30000:', '    print("Paid")', 'else', '    print("Not yet")'],
        bug: 2,
        fix: 'else:',
        explanation: 'else needs its colon too.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Late if day is after PAY_DAY, otherwise On time',
        starter: 'PAY_DAY = 25\nday = 25\n',
        solution: 'PAY_DAY = 25\nday = 25\nif day > PAY_DAY:\n    print("Late")\nelse:\n    print("On time")\n',
        hint: 'if day > PAY_DAY: ... else: ...',
        checks: [{ message: 'Print On time', outputEquals: 'On time' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'paid = 30000. Which block runs?',
        groups: ['The if block', 'The else block'],
        items: [
          { text: 'if paid >= 30000:', group: 0 },
          { text: 'if paid > 30000:', group: 1 },
          { text: 'if paid == 30000:', group: 0 },
          { text: 'if paid < 30000:', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the else line.',
        language: 'python',
        template: '[[1]][[2]]\n    print("Not yet")',
        blanks: [['else'], [':']],
        distractors: ['otherwise', 'elif'],
      },
      {
        kind: 'mcq',
        prompt: 'With an if and an else, how many of the two blocks run?',
        options: [
          { text: 'Exactly one' },
          { text: 'Both', why: 'else runs only when the if didn\'t.' },
          { text: 'Possibly neither', why: 'Without else that can happen; with else, one always runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Can else have its own condition, like else paid < 30000?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, any condition.', why: 'else takes no condition; that\'s a SyntaxError.' },
          { text: 'Only for numbers.', why: 'Never: else has no condition.' },
          { text: 'No: else means "every other case". For another condition, use elif, next lesson.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word means "otherwise" in Python? (four letters)',
        answers: ['else', 'else:'],
        placeholder: 'Keyword',
      },
    ],
  },
  reflect: {
    prompt: '"Not yet: 5000 to go" is kinder and more useful than silence. Where would you like a system to tell you what\'s left, not just "no"?',
    starters: ['I\'d like to know...', 'Instead of just "no"...'],
  },
  deepen: {
    title: 'A one-line if/else',
    summary: 'status = "Paid" if paid >= SHARE else "Not yet" picks one of two values in a single line. Handy, but only for short choices.',
  },
  notes: 'if ... else (Python Language Reference §8.1). Conditional expression x if c else y (§6.13).',
};

export default lesson;
