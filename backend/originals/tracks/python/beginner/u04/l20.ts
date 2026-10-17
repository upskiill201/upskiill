import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 20 — Chapter Challenge. Climax: Ajo Tracker v0.3, clean names and a receipt, every time. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ajo Tracker v0.3',
  summary: 'Pay day. Eleven members type their names and amounts however they like. The tracker cleans every one and prints a lined-up receipt. Build v0.3: everything from Chapter 4, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Ask for, clean and convert user input', 'Print a neat receipt from messy text'],
  learn: [
    {
      kind: 'story',
      title: 'Pay day, the 25th',
      beats: [
        { speaker: 'narrator', text: 'Tunde types "  TUNDE   bakare ". Kemi types "kemi". Bisi types "30,000" with a comma, just to see.' },
        { speaker: 'narrator', text: 'Every receipt comes out the same: name in title case, amounts lined up on the right.' },
        { speaker: 'narrator', text: 'Kemi: "That\'s the first receipt I\'ve ever got from an ajo."' },
        { speaker: 'arjun', text: '(on the call) Version 0.3. It reads people now.' },
        { speaker: 'tey', text: 'Your turn: build v0.3.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ajo Tracker v0.3.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the v0.3 receipt',
        starter:
          '# 1. Ask "Your name: " and clean it with the name recipe\n# 2. Ask "Amount paid: ", remove commas, convert to int\n# 3. Print, exactly:\n#    OFFICE AJO v0.3\n#    Name: Tunde Bakare\n#    Paid: 30,000\n',
        solution:
          'name = " ".join(input("Your name: ").split()).title()\namount = int(input("Amount paid: ").replace(",", ""))\nprint("OFFICE AJO v0.3")\nprint(f"Name: {name}")\nprint(f"Paid: {amount:,}")\n',
        hint: 'The name recipe is " ".join(text.split()).title(). For the amount: int(text.replace(",", "")).',
        stdin: ['  TUNDE   bakare ', '30,000'],
        checks: [
          { message: 'Print the receipt', outputIncludes: 'OFFICE AJO v0.3 Name: Tunde Bakare Paid: 30,000' },
          { message: 'Store the amount as a number', expr: 'amount == 30000' },
          { message: 'Store the clean name', expr: 'name == "Tunde Bakare"' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'ref = "AJO-2026-05-KEMI"\nprint(ref[-4:].title())',
        language: 'python',
        options: [
          { text: 'Kemi' },
          { text: 'KEMI', why: '.title() fixed the capitals.' },
          { text: '-KEMI', why: 'The last 4 characters are KEMI.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every bug in this draft',
        starter: 'raw = "  bisi "\nraw.strip().title()\namount = "30,000"\nprint(f"{raw} paid {int(amount)}")\n',
        solution: 'raw = "  bisi "\nraw = raw.strip().title()\namount = "30,000"\nprint(f"{raw} paid {int(amount.replace(\',\', \'\'))}")\n',
        hint: 'Store the cleaned name, and remove the comma before int().',
        checks: [{ message: 'Print Bisi paid 30000', outputEquals: 'Bisi paid 30000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool fixes it?',
        groups: ['.strip()', '.replace()', '.title()'],
        items: [
          { text: '"Kemi " has a trailing space', group: 0 },
          { text: '"30,000" has a comma', group: 1 },
          { text: '"KEMI" is shouting', group: 2 },
          { text: '"N30000" has an N', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print a lined-up receipt line: Paid padded to 8, then 30000 right-aligned in 8 with commas',
        starter: 'amount = 30000\n',
        solution: 'amount = 30000\nprint(f"{\'Paid\':<8}{amount:>8,}")\n',
        hint: 'f"{\'Paid\':<8}{amount:>8,}"',
        checks: [{ message: 'Print Paid      30,000 (aligned)', outputEquals: 'Paid      30,000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Strings are sequences', 'Compared character by character'],
          ['input()', 'Always returns text'],
          ['[start:stop]', 'A slice'],
          ['" ".join(x.split())', 'Tidy the spaces'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes 300001500?',
        language: 'python',
        lines: ['paid = input("Paid: ")', 'fee = 1500', 'print(paid + str(fee))'],
        bug: 2,
        fix: 'print(int(paid) + fee)',
        explanation: 'Both are text, so + joins them. Convert paid to int and add the number.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("ajo" in "OFFICE AJO".lower())',
        language: 'python',
        options: [
          { text: 'False', why: 'Both are lowercase after .lower().' },
          { text: 'ajo', why: 'in gives True or False.' },
          { text: 'True' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: "Order Ada's chapter.",
        lines: ['Three Tundes in the bank export', 'len() finds a hidden space', 'Slicing bank references', '.strip().title()', 'input() and int()', 'v0.3 receipts on pay day'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ask for an amount, safely.',
        language: 'python',
        template: 'amount = [[1]](input("Amount: ").[[2]](",", ""))',
        blanks: [['int'], ['replace']],
        distractors: ['str', 'strip'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'v0.3 cleans everything people type. What\'s the big lesson of Chapter 4?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Always use .upper().', why: 'One tool among several.' },
          { text: 'Never let people type.', why: 'The point is to handle how they type.' },
          { text: 'Text from people is messy. Clean it on the way in, the same way every time, and convert numbers before maths.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the name recipe.',
        language: 'python',
        tiles: ['clean', '=', '" ".join(raw.split())', '.title()'],
        distractors: ['.upper()', 'raw.join(" ")'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(len("Ajo")) show?',
        answers: ['3'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 4 done. The tracker reads what people actually type. What messy text in your life would you clean first?',
    starters: ['I\'d clean...', 'It would save...'],
  },
  deepen: {
    title: 'Next: Chapter 5',
    summary: 'The tracker can read a payment. Now it needs to decide: paid or not? Late or on time? Chapter 5: who\'s paid, with if, elif and else.',
  },
  notes: 'Chapter Challenge for Chapter 4. Name recipe: " ".join("  TUNDE   bakare ".split()).title() = "Tunde Bakare". f"{\'Paid\':<8}{30000:>8,}" = "Paid" + 4 spaces + "  30,000". Runner echoes input lines after their prompts.',
};

export default lesson;
