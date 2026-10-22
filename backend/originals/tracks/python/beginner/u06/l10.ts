import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: append, insert, remove, pop, in, sorting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: people come and go',
  summary: 'Ola joined, Yusuf left, Femi was turned away politely, and Kemi got her alphabetical board without breaking the payout order. Quick check before slicing.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Add, remove and check members without notes', 'Choose between sorted() and .sort()'],
  learn: [
    {
      kind: 'story',
      title: 'A busy week',
      beats: [
        { speaker: 'narrator', text: 'Monday: Ola joins at the back. Wednesday: Yusuf moves to Abuja. Friday: Femi asks for his turn, and the tracker says, kindly, that he isn\'t a member.' },
        { speaker: 'narrator', text: 'The list changed four times. The pot line never needed touching: it still says len(members) * SHARE.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: changing lists.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add "Ola" to the end, remove "Yusuf", then print the list',
        starter: 'members = ["Ada", "Yusuf", "Bisi"]\n',
        solution: 'members = ["Ada", "Yusuf", "Bisi"]\nmembers.append("Ola")\nmembers.remove("Yusuf")\nprint(members)\n',
        hint: '.append("Ola"), then .remove("Yusuf").',
        checks: [{ message: "Print ['Ada', 'Bisi', 'Ola']", outputEquals: "['Ada', 'Bisi', 'Ola']" }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nx = members.pop()\nprint(x)',
        language: 'python',
        options: [
          { text: 'Bisi' },
          { text: 'Ada', why: '.pop() with no number takes the LAST item.' },
          { text: 'None', why: '.pop() returns the item it removed.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the job to the method.',
        pairs: [
          ['Add to the end', '.append()'],
          ['Add at a position', '.insert()'],
          ['Remove by name', '.remove()'],
          ['Remove by position', '.pop()'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'If name is a member print "Your turn is coming", otherwise "Not in this ajo"',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\nname = "Bisi"\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nname = "Bisi"\nif name in members:\n    print("Your turn is coming")\nelse:\n    print("Not in this ajo")\n',
        hint: 'if name in members:',
        checks: [
          { message: 'Print Your turn is coming', outputEquals: 'Your turn is coming' },
          { message: 'Use in', codeIncludes: ' in members' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The payout order is now alphabetical by mistake. Which line?',
        language: 'python',
        lines: ['members = ["Tunde", "Ada", "Bisi"]', 'members.sort()', 'print("Board:", members)'],
        bug: 1,
        fix: 'board = sorted(members)',
        explanation: '.sort() changed the real list. sorted() gives a copy for the board.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Returns None, or returns a value?',
        groups: ['Returns None', 'Returns a value'],
        items: [
          { text: 'members.append("Ola")', group: 0 },
          { text: 'members.pop()', group: 1 },
          { text: 'members.sort()', group: 0 },
          { text: 'sorted(members)', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Insert "Funmi" at position 2, then print the length',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nmembers.insert(2, "Funmi")\nprint(len(members))\n',
        hint: 'members.insert(2, "Funmi")',
        checks: [
          { message: 'Print 5', outputEquals: '5' },
          { message: 'Funmi is at position 2', expr: 'members[2] == "Funmi"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Take the next person off the front of the queue.',
        language: 'python',
        template: 'next_up = members.[[1]]([[2]])',
        blanks: [['pop'], ['0']],
        distractors: ['remove', '-1'],
      },
      {
        kind: 'mcq',
        prompt: 'members.remove("Femi") and Femi isn\'t there. What happens?',
        options: [
          { text: 'Nothing', why: 'It crashes. Check with in first.' },
          { text: 'IndexError', why: 'IndexError is for positions. A missing value is ValueError.' },
          { text: 'ValueError' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Four changes this week, and the pot line didn\'t move. Why?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Luck.', why: 'It\'s by design: one source of truth.' },
          { text: 'Because it counts the list with len(). Whatever the list does, the pot follows.' },
          { text: 'I updated it each time.', why: 'You didn\'t need to.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines: Ola joins, then the first person is paid out.',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'members.append("Ola")', 'next_up = members.pop(0)', 'print(f"Paying out to: {next_up}")'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which method adds an item to the end of a list? (no brackets)',
        answers: ['append', '.append'],
        placeholder: 'Method name',
      },
    ],
  },
  reflect: {
    prompt: 'Which of append, insert, remove and pop do you think you\'ll use most? Why that one?',
    starters: ['I\'ll use... most', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 6 lessons 6-9.',
};

export default lesson;
