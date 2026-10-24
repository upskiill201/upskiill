import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 7 — .remove() and .pop(): taking members out by name or by position. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '.remove() and .pop()',
  summary: 'Yusuf relocates to Abuja and leaves the ajo. Ada needs to take him out. Then she wants to take the next person off the front of the payout queue. Two different jobs, two different methods.',
  minutes: 11,
  outcomes: [
    'Remove an item by its value with .remove()',
    'Remove an item by its position with .pop()',
    'Know that .pop() gives the item back',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'By name, or by position?',
      before: {
        label: '.remove(value)',
        text: 'members.remove("Yusuf")\n\nFinds the first "Yusuf" and takes it out.\nYou know WHO, not where.\nReturns None.\nValueError if Yusuf isn\'t there.',
      },
      after: {
        label: '.pop(index)',
        text: 'next_up = members.pop(0)\n\nTakes out whoever is at position 0, and gives them back.\nYou know WHERE, not who.\n.pop() with no number takes the last item.\nIndexError if the position doesn\'t exist.',
      },
      notes: [
        '.remove() only removes the first match. If a name appears twice, the second one stays.',
        '.pop() is the only one of the two that hands the item back, so you can store it: next_up = members.pop(0).',
        'Both change the list in place, and the list gets one shorter.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Yusuf leaves',
      caption: 'One removed by name, one popped from the front.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Yusuf", "Kemi"]\n\nmembers.remove("Yusuf")\nprint(members)\n\nnext_up = members.pop(0)\nprint(f"Paying out to: {next_up}")\nprint(members)\n',
      challenge: 'Try members.remove("Femi"). Read the error.',
    },
  ],
  apply: {
    scenario: 'Members leave the list.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Yusuf"]\nmembers.remove("Tunde")\nprint(members)',
        language: 'python',
        options: [
          { text: "['Ada', 'Tunde']", why: '.remove("Tunde") takes Tunde out, not the last item.' },
          { text: "['Ada', 'Yusuf']" },
          { text: 'Tunde', why: '.remove() returns None; the list is printed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove "Yusuf" from the list by name, then print the list',
        starter: 'members = ["Ada", "Tunde", "Yusuf", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Yusuf", "Bisi"]\nmembers.remove("Yusuf")\nprint(members)\n',
        hint: 'members.remove("Yusuf")',
        checks: [
          { message: "Print ['Ada', 'Tunde', 'Bisi']", outputEquals: "['Ada', 'Tunde', 'Bisi']" },
          { message: 'Use .remove()', codeIncludes: '.remove(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Pop the first member into next_up, then print "Paying out to: Ada"',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nnext_up = members.pop(0)\nprint(f"Paying out to: {next_up}")\n',
        hint: 'next_up = members.pop(0)',
        checks: [
          { message: 'Print Paying out to: Ada', outputEquals: 'Paying out to: Ada' },
          { message: 'Ada is out of the list', expr: 'members == ["Tunde", "Bisi"]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it does.',
        pairs: [
          ['members.remove("Bisi")', 'Takes out Bisi, wherever she is'],
          ['members.pop(0)', 'Takes out the first item and returns it'],
          ['members.pop()', 'Takes out the last item and returns it'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'members = ["Ada", "Tunde", "Bisi"]. Works, or error?',
        groups: ['Works', 'Error'],
        items: [
          { text: 'members.remove("Ada")', group: 0 },
          { text: 'members.remove("Femi")', group: 1 },
          { text: 'members.pop(2)', group: 0 },
          { text: 'members.pop(5)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which one hands back the item it removed?',
        options: [
          { text: '.remove()', why: '.remove() returns None.' },
          { text: 'Both', why: 'Only .pop() returns the item.' },
          { text: '.pop()' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with ValueError. Which line?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde", "Yusuf"]', 'members.remove("yusuf")', 'print(members)'],
        bug: 1,
        fix: 'members.remove("Yusuf")',
        explanation: '.remove() looks for an exact match, capitals included. "yusuf" isn\'t in the list.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Take the last member off and keep them.',
        language: 'python',
        template: 'last = members.[[1]]()',
        blanks: [['pop']],
        distractors: ['remove', 'last'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Bisi", "Ada"]\nmembers.remove("Ada")\nprint(members)',
        language: 'python',
        options: [
          { text: "['Bisi', 'Ada']" },
          { text: "['Bisi']", why: '.remove() only takes out the first match.' },
          { text: "['Ada', 'Bisi']", why: 'It removes the first "Ada", not the last.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Yusuf left. Do I .remove() him or .pop() him?',
        prompt: "Arjun's best reply?",
        options: [
          { text: '.pop(), always.', why: 'You\'d have to know his position first.' },
          { text: 'Make a new list without him by hand.', why: 'That\'s what .remove() is for.' },
          { text: '.remove("Yusuf"). You know his name, not his position. Use .pop() when you know where, like the front of the queue.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'members.remove("Femi") when Femi isn\'t in the list. Which error? (one word)',
        answers: ['ValueError'],
        placeholder: 'Error name',
      },
    ],
  },
  reflect: {
    prompt: 'Taking someone out of a group list in real life has feelings attached. What would you want the group to say or do when a member leaves?',
    starters: ['I\'d want...', 'The record should...'],
  },
  deepen: {
    title: 'del',
    summary: 'del members[2] also removes by position, but gives nothing back. Most people use .pop() so they can keep the item if they need it.',
  },
  notes: 'list.remove (ValueError if absent, first match only), list.pop([i]) (IndexError on empty or out of range; defaults to last). Python tutorial §5.1.',
};

export default lesson;
