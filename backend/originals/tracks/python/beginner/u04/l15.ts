import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: input(), input is text, converting, escapes. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the tracker asks',
  summary: 'Members now type their own names and amounts into the tracker on Ada\'s phone. It cleans them, converts them and prints a two-line receipt. Quick check before the full receipt.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Ask for input and convert it correctly', 'Print several lines with escapes'],
  learn: [
    {
      kind: 'story',
      title: 'Pay day queue',
      beats: [
        { speaker: 'narrator', text: 'A queue at Ada\'s desk. Each member types their name and amount. The tracker answers: "Name: Kemi / Paid: 30000".' },
        { speaker: 'narrator', text: 'Tunde types "30,000 " with a comma and a space. It still works. He looks almost disappointed.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: asking and converting.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask "Your name: ", clean it with .strip().title(), and print Welcome, Kemi',
        starter: '',
        solution: 'name = input("Your name: ").strip().title()\nprint(f"Welcome, {name}")\n',
        hint: 'input(...).strip().title()',
        stdin: ['  KEMI '],
        checks: [{ message: 'Print Welcome, Kemi', outputIncludes: 'Welcome, Kemi' }],
      },
      {
        kind: 'mcq',
        prompt: 'The user types 30000. What is type(input("? "))?',
        options: [
          { text: "<class 'int'>", why: 'input() always returns text.' },
          { text: "<class 'str'>" },
          { text: "<class 'float'>", why: 'Always str.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Amount: ", clean out commas, convert to int and print it plus 1500',
        starter: '',
        solution: 'amount = int(input("Amount: ").replace(",", ""))\nprint(amount + 1500)\n',
        hint: 'int(input(...).replace(",", ""))',
        stdin: ['30,000'],
        checks: [{ message: 'Print 31500', outputIncludes: '31500' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the result.',
        pairs: [
          ['"A\\nB"', 'Two lines'],
          ['"30" + "0"', '"300"'],
          ['int("30") + 0', '30'],
          ['len("\\t")', '1'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line still treats the answer as text?',
        language: 'python',
        lines: ['months = input("Months: ")', 'total = months * 30000', 'print(total)'],
        bug: 1,
        fix: 'total = int(months) * 30000',
        explanation: 'months is text, so * repeats it 30000 times. Convert first.',
      },
      {
        kind: 'sortGroups',
        prompt: 'int(), float() or neither?',
        groups: ['int()', 'float()', 'Leave as text'],
        items: [
          { text: 'Months paid', group: 0 },
          { text: 'An amount with kobo, like 12500.50', group: 1 },
          { text: 'A member\'s name', group: 2 },
          { text: 'A bank reference', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print a two-line receipt with one print: Name: Kemi, then Paid: 30000',
        starter: 'name = "Kemi"\npaid = 30000\n',
        solution: 'name = "Kemi"\npaid = 30000\nprint(f"Name: {name}\\nPaid: {paid}")\n',
        hint: 'One f-string with \\n in the middle.',
        checks: [{ message: 'Print the two lines', outputEquals: 'Name: Kemi\nPaid: 30000' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ask, clean and convert.',
        language: 'python',
        template: 'amount = [[1]](input("Amount: ").[[2]]())',
        blanks: [['int'], ['strip']],
        distractors: ['str', 'title'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The user types 3. What does the second line print?',
        code: 'n = input("? ")\nprint(n + n)',
        language: 'python',
        options: [
          { text: '33' },
          { text: '6', why: 'n is text, so + joins.' },
          { text: 'An error', why: 'Joining two strings is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde typed "30,000 " and it still worked. Which two methods saved you?',
        prompt: "Ada's answer?",
        options: [
          { text: '.title() and .upper().', why: 'Those change capitals, not spaces or commas.' },
          { text: 'Luck.', why: 'Cleaning on the way in.' },
          { text: '.strip() for the space and .replace(",", "") for the comma, before int().' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for a safe amount.',
        lines: ['Ask with input()', 'Strip the spaces', 'Remove the commas', 'Convert with int()', 'Do the maths'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("Ada\\tTunde") put between the two names?',
        answers: ['tab', 'a tab', 'a tab character'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Tunde tried to break the tracker by typing oddly. Why is it worth testing your own programs the way a cheeky user would?',
    starters: ['A cheeky user would...', 'Testing that way...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 11-14. "  KEMI ".strip().title() = "Kemi"; int("30,000".replace(",", "")) + 1500 = 31500; "3" + "3" = "33".',
};

export default lesson;
