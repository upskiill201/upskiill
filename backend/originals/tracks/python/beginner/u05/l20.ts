import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 20 — Chapter Challenge. Climax: Ajo Tracker v0.4 answers "Have I paid?" for anyone. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ajo Tracker v0.4',
  summary: '11 p.m. again. Tunde messages: "Have I paid?" This time he runs the checker himself and gets the answer. Build v0.4: everything from Chapter 5, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a program that decides and explains', 'Use everything from Chapter 5 together'],
  learn: [
    {
      kind: 'story',
      title: '11 p.m., a month later',
      beats: [
        { speaker: 'narrator', text: 'Tunde opens the tracker on Ada\'s shared laptop. Name: Tunde. Paid: 30,000. Day: 26.' },
        { speaker: 'narrator', text: '"Tunde: paid, but late. Still owed: 1,500." He sends the 1,500 at 11:04 p.m., without messaging Ada once.' },
        { speaker: 'arjun', text: '(next morning) Version 0.4. It decides now. And it explains itself.' },
        { speaker: 'tey', text: 'Your turn: build v0.4.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ajo Tracker v0.4.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the v0.4 checker',
        starter:
          'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28\n# 1. Ask "Name: " and clean it with .strip().title()\n# 2. Ask "Paid: " (remove commas) and "Day: ", as ints\n# 3. Fee: 0 by PAY_DAY, 5% to GRACE_END, 10% after\n# 4. owed = SHARE + fee - paid\n# 5. Print "Tunde: all settled" or "Tunde: still owed 1,500"\n',
        solution:
          'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28\nname = input("Name: ").strip().title()\npaid = int(input("Paid: ").replace(",", ""))\nday = int(input("Day: "))\nif day <= PAY_DAY:\n    fee = 0\nelif day <= GRACE_END:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nowed = SHARE + fee - paid\nif owed <= 0:\n    print(f"{name}: all settled")\nelse:\n    print(f"{name}: still owed {owed:,}")\n',
        hint: 'Three inputs, the fee chain, then owed and an if/else.',
        stdin: [' tunde', '30,000', '26'],
        checks: [
          { message: 'Print Tunde: still owed 1,500', outputIncludes: 'Tunde: still owed 1,500' },
          { message: 'Work out the fee', expr: 'fee == 1500' },
          { message: 'Use the GRACE_END constant', codeIncludes: 'GRACE_END' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'day = 28. What does this print?',
        code: 'if day <= 25:\n    print("No fee")\nelif day <= 28:\n    print("1,500")\nelse:\n    print("3,000")',
        language: 'python',
        options: [
          { text: '3,000', why: '28 <= 28 is True.' },
          { text: '1,500' },
          { text: 'No fee', why: '28 <= 25 is False.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every bug in this draft',
        starter: 'paid = 30000\nday = 27\nif day <= 25\n    fee = 0\nelif day < 28:\n    fee = 1500\nelse:\n    fee = 3000\nif paid + fee = 31500:\n    print("Correct total")\n',
        solution: 'paid = 30000\nday = 27\nif day <= 25:\n    fee = 0\nelif day <= 28:\n    fee = 1500\nelse:\n    fee = 3000\nif paid + fee == 31500:\n    print("Correct total")\n',
        hint: 'A missing colon, an edge that should be <=, and = where == belongs.',
        checks: [
          { message: 'Print Correct total', outputEquals: 'Correct total' },
          { message: 'Use <= 28 for the edge', codeIncludes: '<= 28' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool?',
        groups: ['and / or / not', 'elif', '.isdigit()'],
        items: [
          { text: 'Late and not excused', group: 0 },
          { text: 'A third possible outcome', group: 1 },
          { text: 'Refuse "thirty thousand"', group: 2 },
          { text: 'On holiday or on sick leave', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Refuse bad input: if the answer isn\'t digits, print Numbers only, please',
        starter: 'raw = input("Paid: ").strip()\n',
        solution: 'raw = input("Paid: ").strip()\nif raw.isdigit():\n    print(f"Recorded {int(raw):,}")\nelse:\n    print("Numbers only, please")\n',
        hint: 'if raw.isdigit(): ... else: ...',
        stdin: ['lots'],
        checks: [{ message: 'Print Numbers only, please', outputIncludes: 'Numbers only, please' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['True and False', 'The bool type'],
          ['Indentation', 'What belongs to the if'],
          ['First True wins', 'Order in elif chains'],
          ['"" counts as False', 'Truthy and falsy'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which branch can never run?',
        language: 'python',
        lines: ['if owed >= 0:', '    print("Settled or owing")', 'elif owed > 1500:', '    print("Owes a lot")', 'else:', '    print("Overpaid")'],
        bug: 2,
        explanation: 'Any owed > 1500 is also >= 0, so the first branch always catches it.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'late = True\non_leave = False\nprint(late and not on_leave)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'not False is True, and True and True is True.' },
          { text: 'An error', why: 'and/not work on bools.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: "Order Ada's chapter.",
        lines: ['Tunde asks "Have I paid?"', 'True, False and comparisons', 'if, else and elif', 'The whiteboard rules', 'Checking input first', 'Testing every edge', 'v0.4 answers for itself'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Rules that override come first.',
        language: 'python',
        template: '[[1]] on_leave:\n    fee = 0\n[[2]] day <= PAY_DAY:\n    fee = 0',
        blanks: [['if'], ['elif']],
        distractors: ['else', 'while'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'v0.4 decides and explains. Biggest lesson of Chapter 5?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Use as many ifs as possible.', why: 'Fewer, clearer decisions are better.' },
          { text: 'Write the rules down, put them in the right order, check the input first, and test every edge.' },
          { text: 'Never let anyone pay late.', why: 'The rules handle lateness; that\'s the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the condition for "late and not excused".',
        language: 'python',
        tiles: ['if', 'late', 'and not', 'excused', ':'],
        distractors: ['or', '=='],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(30000 >= 30000) show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 5 done. Tunde got his answer without messaging Ada. What question do people ask you again and again that a program could answer?',
    starters: ['People keep asking me...', 'A program could...'],
  },
  deepen: {
    title: 'Next: Chapter 6',
    summary: 'The tracker knows one member at a time. Chapter 6: the member list. All eleven names in one place, and whose turn it is.',
  },
  notes: 'Chapter Challenge for Chapter 5. 30000 + 1500 - 30000 = 1500 for day 26. The "never runs" branch: owed > 1500 implies owed >= 0.',
};

export default lesson;
