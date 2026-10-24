import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 14 — Copying vs sharing: two names for one list, and .copy(). */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Copying vs sharing',
  summary: 'Ada makes a board list for Kemi with board = members, then sorts the board. The payout order is alphabetical again, and she never touched members. What happened?',
  minutes: 12,
  outcomes: [
    'Know that board = members shares one list',
    'Make a real copy with .copy()',
    'Spot when sharing causes a bug',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'board = members doesn\'t copy anything. It gives the SAME list a second name. One list, two labels. Change it through either name, and both see it.', replies: ['So board.sort() sorted members?'] },
        { tey: 'Yes. There was only ever one list. Numbers and strings never surprise you like this, because they can\'t change. Lists can, so sharing matters.', replies: ['How do I get a real copy?'] },
        { tey: 'board = members.copy(). Now there are two lists with the same names in them. Sort board, and members stays in payout order. (sorted(members) also gives a new list, which is why it was safe in lesson 9.)', replies: ['How can I check?'] },
        { tey: 'board is members is True when they\'re one list, False when they\'re separate. == only checks the items look the same.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One list or two?',
      caption: 'Run it, then swap in .copy().',
      code: 'members = ["Tunde", "Ada", "Bisi"]\nboard = members\nboard.sort()\n\nprint("Board:", board)\nprint("Members:", members)\nprint(board is members)\n',
      challenge: 'Change line 2 to board = members.copy() and run it again.',
    },
  ],
  apply: {
    scenario: 'One list, or two?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde"]\nother = members\nother.append("Ola")\nprint(members)',
        language: 'python',
        options: [
          { text: "['Ada', 'Tunde']", why: 'other and members are the same list.' },
          { text: "['Ada', 'Tunde', 'Ola']" },
          { text: 'An error', why: 'It runs. That\'s the surprise.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde"]\nother = members.copy()\nother.append("Ola")\nprint(members)',
        language: 'python',
        options: [
          { text: "['Ada', 'Tunde', 'Ola']", why: '.copy() made a separate list.' },
          { text: 'None', why: '.copy() returns a new list.' },
          { text: "['Ada', 'Tunde']" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make board a real copy of members, sort board, then print members',
        starter: 'members = ["Tunde", "Ada", "Bisi"]\nboard = members\nboard.sort()\nprint(members)\n',
        solution: 'members = ["Tunde", "Ada", "Bisi"]\nboard = members.copy()\nboard.sort()\nprint(members)\n',
        hint: 'board = members.copy()',
        checks: [
          { message: "Print ['Tunde', 'Ada', 'Bisi']", outputEquals: "['Tunde', 'Ada', 'Bisi']" },
          { message: 'Board is sorted', expr: 'board == ["Ada", "Bisi", "Tunde"]' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'After this line, is it one list or two?',
        groups: ['One list (shared)', 'Two lists (copy)'],
        items: [
          { text: 'board = members', group: 0 },
          { text: 'board = members.copy()', group: 1 },
          { text: 'board = members[:]', group: 1 },
          { text: 'board = sorted(members)', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The payout order changed. Which line caused it?',
        language: 'python',
        lines: ['members = ["Tunde", "Ada", "Bisi"]', 'backup = members', 'members.sort()', 'print("Original:", backup)'],
        bug: 1,
        fix: 'backup = members.copy()',
        explanation: 'backup was the same list, so it got sorted too. A backup has to be a copy.',
      },
      {
        kind: 'matchPairs',
        prompt: 'a = ["Ada"]; b = a; c = a.copy(). Match the test to its value.',
        pairs: [
          ['a is b', 'True: the same list'],
          ['a is c', 'False: separate lists'],
          ['a == c', 'True: same items'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A real backup of the member list.',
        language: 'python',
        template: 'backup = members.[[1]]()',
        blanks: [['copy']],
        distractors: ['clone', 'share'],
      },
      {
        kind: 'writeCode',
        prompt: 'Keep a copy called before, then append "Ola" to members, then print len(before)',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nbefore = members.copy()\nmembers.append("Ola")\nprint(len(before))\n',
        hint: 'Copy first, then append.',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Ola is in members', expr: '"Ola" in members' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So should I .copy() every list, just in case?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, always.', why: 'Copying everywhere wastes memory and hides which list is the real one.' },
          { text: 'No. Copy when you\'re about to change one version and need the other to stay as it was. Otherwise sharing is fine.' },
          { text: 'Never copy lists.', why: 'Backups and boards need copies.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword tests whether two names point to the very same list? (two letters)',
        answers: ['is'],
        placeholder: 'Keyword',
      },
    ],
  },
  reflect: {
    prompt: 'A shared document and a downloaded copy behave just like this. When did you edit the "wrong" one, or surprise someone by editing a shared one?',
    starters: ['I once edited...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Shallow copies',
    summary: '.copy() copies the outer list only. In a ledger of rows, the copy shares the same rows. For lists inside lists, look up copy.deepcopy() later.',
  },
  notes: 'Assignment binds a name to the same object; list.copy() and [:] make a shallow copy (Python docs, Mutable Sequence Types; copy module). is tests identity, == tests equality.',
};

export default lesson;
