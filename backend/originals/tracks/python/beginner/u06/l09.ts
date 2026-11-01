import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 9 — Sorting: sorted() gives a new list, .sort() changes the list, reverse=True. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Sorting',
  summary: 'Kemi wants the member list in alphabetical order for the group\'s notice board. But the tracker\'s list IS the payout order. Sorting it in place would change who gets paid when.',
  minutes: 12,
  outcomes: [
    'Get a sorted copy with sorted()',
    'Sort a list in place with .sort()',
    'Sort from biggest to smallest with reverse=True',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Two ways to sort',
      steps: [
        {
          title: '1. sorted() makes a new list',
          body: 'The original stays in payout order. Use this for Kemi\'s notice board.',
          code: 'members = ["Tunde", "Ada", "Bisi"]\nboard = sorted(members)\nprint(board)    # [\'Ada\', \'Bisi\', \'Tunde\']\nprint(members)  # [\'Tunde\', \'Ada\', \'Bisi\']',
          language: 'python',
        },
        {
          title: '2. .sort() changes the list',
          body: 'Like .append(), it changes the list in place and returns None.',
          code: 'payments = [30000, 15000, 25000]\npayments.sort()\nprint(payments)  # [15000, 25000, 30000]',
          language: 'python',
        },
        {
          title: '3. Biggest first',
          body: 'Both accept reverse=True.',
          code: 'print(sorted(payments, reverse=True))  # [30000, 25000, 15000]',
          language: 'python',
        },
        {
          title: '4. Pick the right one',
          body: 'If the order matters (the payout queue), use sorted() and keep the original. If you don\'t need the old order, .sort() is fine.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Capitals sort before small letters: "Zara" comes before "ada". Clean names with .title() first so they sort the way people expect.',
    },
    {
      kind: 'tryIt',
      title: 'The notice board',
      caption: 'The payout order survives.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n\nprint("Notice board:", sorted(members))\nprint("Payout order:", members)\n',
      challenge: 'Print the notice board in reverse alphabetical order.',
    },
  ],
  apply: {
    scenario: 'Sorting without breaking the payout order.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Tunde", "Ada", "Bisi"]\nboard = sorted(members)\nprint(members)',
        language: 'python',
        options: [
          { text: "['Ada', 'Bisi', 'Tunde']", why: 'sorted() makes a new list; members is unchanged.' },
          { text: 'None', why: 'sorted() returns a list, and members is printed anyway.' },
          { text: "['Tunde', 'Ada', 'Bisi']" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the members in alphabetical order without changing members',
        starter: 'members = ["Tunde", "Ada", "Kemi", "Bisi"]\n',
        solution: 'members = ["Tunde", "Ada", "Kemi", "Bisi"]\nprint(sorted(members))\n',
        hint: 'sorted(members)',
        checks: [
          { message: "Print ['Ada', 'Bisi', 'Kemi', 'Tunde']", outputEquals: "['Ada', 'Bisi', 'Kemi', 'Tunde']" },
          { message: 'Keep the payout order', expr: 'members == ["Tunde", "Ada", "Kemi", "Bisi"]' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Sort payments from biggest to smallest in place, then print it',
        starter: 'payments = [15000, 30000, 25000]\n',
        solution: 'payments = [15000, 30000, 25000]\npayments.sort(reverse=True)\nprint(payments)\n',
        hint: 'payments.sort(reverse=True)',
        checks: [
          { message: 'Print [30000, 25000, 15000]', outputEquals: '[30000, 25000, 15000]' },
          { message: 'Use .sort()', codeIncludes: '.sort(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'board is None. Which line?',
        language: 'python',
        lines: ['members = ["Tunde", "Ada"]', 'board = members.sort()', 'print(board)'],
        bug: 1,
        fix: 'board = sorted(members)',
        explanation: '.sort() returns None. sorted() returns the new list. (And .sort() would have changed the payout order too.)',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['sorted(members)', 'A new sorted list; original unchanged'],
          ['members.sort()', 'Sorts the list itself; returns None'],
          ['sorted(payments, reverse=True)', 'A new list, biggest first'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes the original list, or not?',
        groups: ['Changes it', 'Leaves it alone'],
        items: [
          { text: 'members.sort()', group: 0 },
          { text: 'sorted(members)', group: 1 },
          { text: 'members.append("Ola")', group: 0 },
          { text: 'len(members)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(sorted(["bisi", "Ada", "Tunde"]))',
        language: 'python',
        options: [
          { text: "['Ada', 'bisi', 'Tunde']", why: 'Capitals sort before small letters.' },
          { text: "['Ada', 'Tunde', 'bisi']" },
          { text: "['bisi', 'Ada', 'Tunde']", why: 'Small letters come after all the capitals.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A new list of payments, biggest first.',
        language: 'python',
        template: 'top = [[1]](payments, reverse=[[2]])',
        blanks: [['sorted'], ['True']],
        distractors: ['sort', 'False'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I ran members.sort() for Kemi\'s board. Now Amaka collects in month 2 instead of Tunde. Help!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Run .sort() again to undo it.', why: 'Sorting a sorted list keeps it sorted.' },
          { text: 'Tell the group Amaka goes first now.', why: 'The payout order is the group\'s agreement, not the code\'s.' },
          { text: '.sort() changed the real list. Put the original order back from your notes, and use sorted(members) for the board.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function gives a sorted COPY and leaves the list alone? (one word)',
        answers: ['sorted', 'sorted()'],
        placeholder: 'Function name',
      },
    ],
  },
  reflect: {
    prompt: 'Some orders carry meaning (a queue, a payout order), others are just convenient (alphabetical). Which orders in your life carry meaning?',
    starters: ['The order of... matters because', 'Alphabetical is fine for...'],
  },
  deepen: {
    title: 'Sorting by something else',
    summary: 'sorted(members, key=len) sorts by name length. key= takes any function. You\'ll use it more once you write your own functions in Chapter 8.',
  },
  notes: 'sorted() returns a new list; list.sort() sorts in place and returns None; both accept reverse and key (Python Sorting HOW TO). Default string order is by code point, so uppercase letters sort before lowercase.',
};

export default lesson;
