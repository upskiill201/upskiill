import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 20 — Chapter Challenge. Climax: Ajo Tracker v0.5 manages the member list and answers "whose turn?". */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ajo Tracker v0.5',
  summary: 'The group chat asks three things every month: who\'s in, whose turn it is, and how big the pot is. v0.5 answers all three from one list. Build it: everything from Chapter 6, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a program around one list', 'Use everything from Chapter 6 together'],
  learn: [
    {
      kind: 'story',
      title: 'Three questions, one list',
      beats: [
        { speaker: 'narrator', text: 'Ola joined in month 3. Yusuf left in month 4. Nobody asked Ada whose turn it was: the tracker answered before the question came.' },
        { speaker: 'arjun', text: '(on the call) No member variables, no typed counts, no typed positions. Version 0.5.' },
        { speaker: 'tey', text: 'Your turn: build v0.5.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ajo Tracker v0.5.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the v0.5 monthly report',
        starter:
          'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\n# 1. Ola joins: add him to the end\n# 2. Yusuf leaves: remove him by name\n# 3. Ask "Month: " as an int\n# 4. collector = members[(month - 1) % len(members)]\n# 5. Print "Month 8: Tunde collects 180,000"\n',
        solution:
          'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nmembers.append("Ola")\nmembers.remove("Yusuf")\nmonth = int(input("Month: "))\ncollector = members[(month - 1) % len(members)]\npot = len(members) * SHARE\nprint(f"Month {month}: {collector} collects {pot:,}")\n',
        hint: 'After the changes there are 6 members, so month 8 is (8 - 1) % 6, which is position 1.',
        stdin: ['8'],
        checks: [
          { message: 'Print Month 8: Tunde collects 180,000', outputIncludes: 'Month 8: Tunde collects 180,000' },
          { message: 'Ola joined and Yusuf left', expr: 'members == ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Ola"]' },
          { message: 'Count with len()', codeIncludes: 'len(members)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nmembers.insert(1, "Ola")\nmembers.pop()\nprint(members)',
        language: 'python',
        options: [
          { text: "['Ada', 'Ola', 'Tunde']" },
          { text: "['Ada', 'Tunde', 'Bisi']", why: 'Ola went in at 1, then .pop() took the last item, Bisi.' },
          { text: "['Ola', 'Tunde', 'Bisi']", why: '.insert(1, ...) puts Ola second, not first.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every bug in this draft',
        starter: 'members = ["Tunde", "Ada", "Bisi"]\nmembers = members.append("Ola")\nboard = members\nboard.sort()\nprint(members[len(members)])\n',
        solution: 'members = ["Tunde", "Ada", "Bisi"]\nmembers.append("Ola")\nboard = sorted(members)\nprint(members[-1])\n',
        hint: 'Three bugs: assigning .append(), sorting a shared list, and off by one.',
        checks: [
          { message: 'Print Ola', outputEquals: 'Ola' },
          { message: 'Keep the payout order', expr: 'members == ["Tunde", "Ada", "Bisi", "Ola"]' },
          { message: 'Board is sorted', expr: 'board == ["Ada", "Bisi", "Ola", "Tunde"]' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the month summary: "Collected: 105,000" then "Short by: 15,000"',
        starter: 'SHARE = 30000\npayments = [30000, 15000, 30000, 30000]\n',
        solution: 'SHARE = 30000\npayments = [30000, 15000, 30000, 30000]\nprint(f"Collected: {sum(payments):,}")\nprint(f"Short by: {len(payments) * SHARE - sum(payments):,}")\n',
        hint: 'sum(payments), then len(payments) * SHARE minus it.',
        checks: [{ message: 'Print both lines', outputEquals: 'Collected: 105,000\nShort by: 15,000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]. Match the code to the result.',
        pairs: [
          ['members[1:3]', "['Tunde', 'Bisi']"],
          ['members[(5 - 1) % 4]', 'Ada'],
          ['"Ola" in members', 'False'],
          ['len(members[:2])', '2'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Tunde\'s amount from the ledger, then change it to 30000 and print the ledger',
        starter: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\n',
        solution: 'ledger = [["Ada", 30000], ["Tunde", 15000]]\nprint(ledger[1][1])\nledger[1][1] = 30000\nprint(ledger)\n',
        hint: 'ledger[1][1] reads it; ledger[1][1] = 30000 changes it.',
        checks: [{ message: 'Print 15000, then the updated ledger', outputEquals: "15000\n[['Ada', 30000], ['Tunde', 30000]]" }],
      },
      {
        kind: 'findBug',
        prompt: 'The backup shows Ola too. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'backup = members', 'members.append("Ola")', 'print(backup)'],
        bug: 1,
        fix: 'backup = members.copy()',
        explanation: 'backup = members shares the list. .copy() makes a real backup.',
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Name: ", clean it, and remove that member only if they\'re in the list. Print the list',
        starter: 'members = ["Ada", "Tunde", "Yusuf"]\n',
        solution: 'members = ["Ada", "Tunde", "Yusuf"]\nname = input("Name: ").strip().title()\nif name in members:\n    members.remove(name)\nprint(members)\n',
        hint: 'Clean with .strip().title(), check with in, then .remove().',
        stdin: [' yusuf '],
        checks: [
          { message: "Print ['Ada', 'Tunde']", outputIncludes: "['Ada', 'Tunde']" },
          { message: 'Check with in', codeIncludes: ' in members' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes members, or leaves it alone?',
        groups: ['Changes members', 'Leaves it alone'],
        items: [
          { text: 'members.insert(0, "Ola")', group: 0 },
          { text: 'sorted(members)', group: 1 },
          { text: 'members[2] = "Bisi A."', group: 0 },
          { text: 'members[:3]', group: 1 },
          { text: 'members.pop(0)', group: 0 },
          { text: 'members.copy()', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Whose turn, for any month and any group size.',
        language: 'python',
        template: 'collector = members[(month [[1]] 1) % [[2]](members)]',
        blanks: [['-'], ['len']],
        distractors: ['+', 'sum'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'What\'s the biggest change since v0.4?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'More lines of code.', why: 'Fewer, actually: eleven variables became one list.' },
          { text: 'The tracker knows everyone now. One list, and every count, position and turn comes from it.' },
          { text: 'Nothing much.', why: 'It went from one member at a time to the whole group.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '6 members. Month 7. What position is (7 - 1) % 6?',
        answers: ['0'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'v0.5 still prints one month at a time. Printing every member\'s status means copying the same line twelve times. What do you wish Python could do for you?',
    starters: ['I wish I could...', 'Copying it twelve times would...'],
  },
  notes: 'Chapter 6 challenge. After append Ola / remove Yusuf: ["Ada","Tunde","Bisi","Kemi","Ngozi","Ola"], 6 members, pot 180000; month 8 -> (8-1)%6 = 1 -> Tunde. 30000+15000+30000+30000 = 105000; 4 x 30000 - 105000 = 15000. (5-1)%4 = 0 -> Ada. Sets up Chapter 7 (loops).',
};

export default lesson;
