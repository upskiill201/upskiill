import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 13 — Checking input is valid: .isdigit() and empty answers, before int(). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Checking input is valid',
  summary: 'Tunde types "thirty thousand" into the amount box, just to see. The tracker crashes with a ValueError. Ada decides it should check the answer first and say something helpful instead.',
  minutes: 12,
  outcomes: [
    'Check text is all digits with .isdigit()',
    'Catch empty answers before using them',
    'Only call int() once the text is safe',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: '"30000".isdigit() is True.',
          isFact: true,
          explain: 'Fact. .isdigit() is True when every character is a digit. Then int() is safe.',
        },
        {
          text: '"30,000".isdigit() is True.',
          isFact: false,
          explain: 'Myth. The comma isn\'t a digit. Clean it with .replace(",", "") first, then check.',
        },
        {
          text: '"".isdigit() is True, because there are no non-digits.',
          isFact: false,
          explain: 'Myth. The empty string gives False. That\'s handy: an empty answer fails the check too.',
        },
        {
          text: 'Checking before converting lets the program explain the problem instead of crashing.',
          isFact: true,
          explain: 'Fact. "Please type the amount in numbers, like 30000" is much kinder than a ValueError. (Chapter 10 has another way: try and except.)',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Check, then convert',
      caption: 'Tunde types "thirty thousand".',
      code: 'raw = input("Amount paid: ").strip().replace(",", "")\n\nif raw.isdigit():\n    amount = int(raw)\n    print(f"Recorded {amount}")\nelse:\n    print("Please type the amount in numbers, like 30000")\n',
      stdin: ['thirty thousand'],
      challenge: 'Change the answer to "30,000". Does it pass now?',
    },
  ],
  apply: {
    scenario: 'Answers that aren\'t numbers.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'What does .isdigit() say?',
        groups: ['True', 'False'],
        items: [
          { text: '"30000"', group: 0 },
          { text: '"30,000"', group: 1 },
          { text: '""', group: 1 },
          { text: '"007"', group: 0 },
          { text: '"N500"', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'If the answer is all digits, print Recorded and the number; otherwise print Numbers only, please',
        starter: 'raw = input("Amount paid: ").strip()\n',
        solution: 'raw = input("Amount paid: ").strip()\nif raw.isdigit():\n    print(f"Recorded {int(raw)}")\nelse:\n    print("Numbers only, please")\n',
        hint: 'if raw.isdigit(): ... else: ...',
        stdin: ['thirty'],
        checks: [
          { message: 'Print Numbers only, please', outputIncludes: 'Numbers only, please' },
          { message: 'Use .isdigit()', codeIncludes: '.isdigit()' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("12500.50".isdigit())',
        language: 'python',
        options: [
          { text: 'True', why: 'The dot isn\'t a digit.' },
          { text: 'False' },
          { text: '12500.5', why: '.isdigit() gives True or False.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Clean the commas first, then check and convert. Print Recorded 30000',
        starter: 'raw = input("Amount paid: ").strip()\n',
        solution: 'raw = input("Amount paid: ").strip().replace(",", "")\nif raw.isdigit():\n    print(f"Recorded {int(raw)}")\nelse:\n    print("Numbers only, please")\n',
        hint: 'Add .replace(",", "") before checking.',
        stdin: ['30,000'],
        checks: [{ message: 'Print Recorded 30000', outputIncludes: 'Recorded 30000' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line can still crash on bad input?',
        language: 'python',
        lines: ['raw = input("Amount: ").strip()', 'amount = int(raw)', 'if raw.isdigit():', '    print(f"Recorded {amount}")'],
        bug: 1,
        fix: 'Move amount = int(raw) inside the if',
        explanation: 'int() runs before the check. Check first, convert inside the if.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the safe amount check.',
        language: 'python',
        lines: ['raw = input("Amount: ").strip()', 'if raw.isdigit():', '    amount = int(raw)', '    print(f"Recorded {amount}")', 'else:', '    print("Numbers only, please")'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Only convert when it\'s safe.',
        language: 'python',
        template: 'if raw.[[1]]():\n    amount = [[2]](raw)',
        blanks: [['isdigit'], ['int']],
        distractors: ['isnumber', 'str'],
      },
      {
        kind: 'mcq',
        prompt: 'The user just presses Enter. raw is "". What happens with the check?',
        options: [
          { text: 'It crashes', why: 'The check catches it first.' },
          { text: 'It records 0', why: 'Nothing is recorded: the else runs.' },
          { text: '"".isdigit() is False, so they get the helpful message' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde typed "thirty thousand" on purpose. Annoying?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Useful! He found a crash before a real member did. Now the tracker explains what to type.' },
          { text: 'Very. Ban him from typing.', why: 'Someone else would do it by accident.' },
          { text: 'It\'s his fault, not the program\'s.', why: 'Programs should handle how people really type.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("2026".isdigit()) show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'A helpful error message ("numbers only, like 30000") beats a crash. What\'s the most helpful error message you\'ve ever seen, and the worst?',
    starters: ['The best was...', 'The worst was...'],
  },
  deepen: {
    title: 'Asking again',
    summary: 'Right now a bad answer just gets a message. In Chapter 7, a while loop keeps asking until the answer is valid.',
  },
  notes: 'str.isdigit() returns True if all characters are digits and there is at least one character (Python docs, String Methods). "".isdigit() is False; "12500.50".isdigit() is False.',
};

export default lesson;
