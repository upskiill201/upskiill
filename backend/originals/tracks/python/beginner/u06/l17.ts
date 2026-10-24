import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 17 — Common list bugs: the four mistakes everyone makes with lists. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common list bugs',
  summary: 'Arjun reviews Ada\'s tracker and finds four list bugs, each one a classic. None of them crashed straight away. Two of them would have changed who gets paid.',
  minutes: 12,
  outcomes: [
    'Spot the four most common list bugs',
    'Fix each one with a single change',
    'Know which bugs crash and which ones stay silent',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada\'s draft, and Arjun\'s fixes',
      before: {
        label: 'The draft',
        text: 'members = members.append("Ola")\nlast = members[len(members)]\nboard = members\nboard.sort()',
      },
      after: {
        label: 'Fixed',
        text: 'members.append("Ola")\nlast = members[-1]\nboard = sorted(members)\n',
      },
      notes: [
        'Bug 1: assigning the result of .append() (or .sort(), .remove()). They return None, so members becomes None.',
        'Bug 2: off by one. members[len(members)] is one past the end: IndexError. The last item is [-1] or [len(members) - 1].',
        'Bug 3: sharing instead of copying. board = members is the same list, so sorting board reorders the payout. Silent.',
        'Bug 4: sorting the real list. Even without sharing, members.sort() changes the payout order. Use sorted() for display. Silent too.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The silent bugs are the dangerous ones. A crash tells you something is wrong; a reordered list just pays the wrong person.',
    },
    {
      kind: 'tryIt',
      title: 'Find them yourself',
      caption: 'This runs, but the payout order is wrong at the end. Fix it so members keeps its order.',
      code: 'members = ["Tunde", "Ada", "Bisi"]\nboard = members\nboard.sort()\n\nprint("Board:", board)\nprint("Payout:", members)\n',
      challenge: 'Make the payout order print as Tunde, Ada, Bisi.',
    },
  ],
  apply: {
    scenario: 'Bug hunt.',
    items: [
      {
        kind: 'findBug',
        prompt: 'members is None afterwards. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'members = members.append("Ola")', 'print(len(members))'],
        bug: 1,
        fix: 'members.append("Ola")',
        explanation: '.append() returns None. Call it on its own line.',
      },
      {
        kind: 'findBug',
        prompt: 'IndexError. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde", "Bisi"]', 'last = members[len(members)]', 'print(last)'],
        bug: 1,
        fix: 'last = members[-1]',
        explanation: 'Positions go up to len - 1. members[-1] is the safe way to get the last item.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix both bugs so this prints Bisi',
        starter: 'members = ["Ada", "Tunde"]\nmembers = members.append("Bisi")\nprint(members[len(members)])\n',
        solution: 'members = ["Ada", "Tunde"]\nmembers.append("Bisi")\nprint(members[-1])\n',
        hint: 'Don\'t assign .append(); use [-1] for the last item.',
        checks: [{ message: 'Print Bisi', outputEquals: 'Bisi' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the bug crash, or stay silent?',
        groups: ['Crashes', 'Silent'],
        items: [
          { text: 'members[len(members)]', group: 0 },
          { text: 'board = members, then board.sort()', group: 1 },
          { text: 'members.remove("Femi") when he isn\'t there', group: 0 },
          { text: 'members.sort() on the payout list', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the board sorted while keeping the payout order. Then print members',
        starter: 'members = ["Tunde", "Ada", "Bisi"]\nboard = members\nboard.sort()\nprint(board)\nprint(members)\n',
        solution: 'members = ["Tunde", "Ada", "Bisi"]\nboard = sorted(members)\nprint(board)\nprint(members)\n',
        hint: 'board = sorted(members) makes a new sorted list.',
        checks: [{ message: 'Print the sorted board, then the original order', outputEquals: "['Ada', 'Bisi', 'Tunde']\n['Tunde', 'Ada', 'Bisi']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why are silent bugs worse than crashes here?',
        options: [
          { text: 'They\'re slower', why: 'Speed isn\'t the issue. Wrong results are.' },
          { text: 'Nobody notices, and the wrong person gets paid' },
          { text: 'They aren\'t worse', why: 'A crash is loud and gets fixed. A silent bug spreads.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its fix.',
        pairs: [
          ['members = members.sort()', 'members.sort() on its own line'],
          ['members[len(members)]', 'members[-1]'],
          ['backup = members', 'backup = members.copy()'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The month 1 collector is wrong. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde", "Bisi"]', 'month = 1', 'print(members[month])'],
        bug: 2,
        fix: 'print(members[month - 1])',
        explanation: 'Off by one again: month 1 is position 0.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Four bugs. I feel like a bad programmer.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'You should be faster by now.', why: 'Unhelpful. These trip up experienced people too.' },
          { text: 'Lists are just hard; avoid them.', why: 'Lists are everywhere. Learn the traps instead.' },
          { text: 'These four are so common they have names. Knowing them means you\'ll catch them in other people\'s code too.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does members.sort() return? (one word)',
        answers: ['None'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four bugs do you think you\'re most likely to make? What will you check for from now on?',
    starters: ['I\'d most likely...', 'I\'ll check...'],
  },
  deepen: {
    title: 'Changing a list while reading it',
    summary: 'The fifth classic bug: removing items from a list while looping over it skips some. You\'ll meet loops in Chapter 7, and this bug with them.',
  },
  notes: 'In-place list methods return None (Python docs FAQ: "Why doesn\'t list.sort() return the sorted list?"). Valid indices are 0..len-1. Assignment shares the object.',
};

export default lesson;
