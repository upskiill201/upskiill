import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 4 — Changing an item: lists can change; strings can't. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Changing an item',
  summary: 'Ngozi gets married and changes her name to Ngozi Okafor. In the list, Ada can change just that one item. It\'s the first time she\'s been able to change something inside a value.',
  minutes: 11,
  outcomes: [
    'Replace an item with list[index] = new_value',
    'Know that lists can be changed, but strings can\'t',
    'Change a number in a list of payments',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'members[4] = "Ngozi Okafor" replaces the fifth member.',
          isFact: true,
          explain: 'Fact. Assigning to a position swaps that one item. The rest of the list stays exactly as it was.',
        },
        {
          text: 'You can change one letter of a string the same way: name[0] = "N".',
          isFact: false,
          explain: 'Myth. Strings can\'t be changed (they\'re immutable): that\'s a TypeError. Lists can be changed (they\'re mutable).',
        },
        {
          text: 'Changing an item makes a new list.',
          isFact: false,
          explain: 'Myth. It changes the same list, in place. Anything that uses members sees the new name.',
        },
        {
          text: 'You can only replace an item at a position that already exists.',
          isFact: true,
          explain: 'Fact. members[20] = "Ola" on a 12-item list is an IndexError. To add a new item, use .append() (lesson 6).',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ngozi\'s new name',
      caption: 'One item changes; the list is the same list.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nprint(members)\n\nmembers[4] = "Ngozi Okafor"\nprint(members)\n',
      challenge: 'Kemi asks to be listed as "Kemi A." Change her item too.',
    },
  ],
  apply: {
    scenario: 'Updating one member.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nmembers[1] = "Tobi"\nprint(members)',
        language: 'python',
        options: [
          { text: "['Tobi', 'Tunde', 'Bisi']", why: '[1] is the second item.' },
          { text: "['Ada', 'Tunde', 'Bisi', 'Tobi']", why: 'Assigning replaces; it doesn\'t add.' },
          { text: "['Ada', 'Tobi', 'Bisi']" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Change Ngozi (position 4) to "Ngozi Okafor", then print the list',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nmembers[4] = "Ngozi Okafor"\nprint(members)\n',
        hint: 'members[4] = "Ngozi Okafor"',
        checks: [
          { message: 'Print the updated list', outputEquals: "['Ada', 'Tunde', 'Bisi', 'Kemi', 'Ngozi Okafor']" },
          { message: 'Change item 4', expr: 'members[4] == "Ngozi Okafor"' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Bisi\'s payment was recorded as 15000 but she paid 30000. Fix it and print the list',
        starter: 'payments = [30000, 30000, 15000]\n',
        solution: 'payments = [30000, 30000, 15000]\npayments[2] = 30000\nprint(payments)\n',
        hint: 'payments[2] = 30000',
        checks: [{ message: 'Print [30000, 30000, 30000]', outputEquals: '[30000, 30000, 30000]' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can it be changed in place?',
        groups: ['Mutable (can change)', 'Immutable (can\'t)'],
        items: [
          { text: 'A list of members', group: 0 },
          { text: 'A string like "Ngozi"', group: 1 },
          { text: 'A list of payments', group: 0 },
          { text: 'The number 30000', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a TypeError?',
        language: 'python',
        lines: ['members = ["Ada", "ngozi"]', 'members[1] = "Ngozi"', 'members[0][0] = "a"'],
        bug: 2,
        fix: 'members[0] = "ada"',
        explanation: 'members[0][0] is the first letter of a string, and strings can\'t be changed. Replace the whole item instead.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Replace the second member.',
        language: 'python',
        template: 'members[[[1]]] = "Tobi"',
        blanks: [['1']],
        distractors: ['2', '0'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what happens.',
        pairs: [
          ['members[0] = "Ada A."', 'Replaces the first item'],
          ['members[50] = "Ola"', 'IndexError'],
          ['name[0] = "N"', 'TypeError'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After members[4] = "Ngozi Okafor", how long is the list?',
        options: [
          { text: 'One longer', why: 'Replacing doesn\'t add an item.' },
          { text: 'The same as before' },
          { text: 'One shorter', why: 'Nothing was removed.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why can lists change but strings can\'t?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Strings are broken.', why: 'It\'s deliberate.' },
          { text: 'They both can.', why: 'name[0] = "N" is a TypeError.' },
          { text: 'Design choice: text is safer when it can\'t change underneath you; a list of members is meant to be edited.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A value you can change in place is called... (one word, starts with m)',
        answers: ['mutable'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Some things should be easy to change (a phone number), others shouldn\'t (a date of birth). Which records in your life are which?',
    starters: ['Should be easy to change:', 'Should never change:'],
  },
  deepen: {
    title: 'Mutable can surprise you',
    summary: 'Because lists change in place, two variables can end up sharing one list. Lesson 14 shows when that bites, and how to copy.',
  },
  notes: 'Lists are mutable; item assignment s[i] = x (Python docs, Mutable Sequence Types). str does not support item assignment (TypeError). Assigning past the end raises IndexError.',
};

export default lesson;
