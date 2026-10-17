import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6 — .upper(), .lower(), .title(): consistent capitals, and methods return new strings. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: '.upper(), .lower(), .title()',
  summary: '"TUNDE", "tunde" and "Tunde" are one person written three ways. Ada\'s first cleaning tool: make the capitals the same before comparing.',
  minutes: 11,
  outcomes: [
    'Change capitals with .upper(), .lower() and .title()',
    'Compare names whatever their capitals',
    'Know that a method gives back a new string',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Before and after',
      before: {
        label: 'As typed',
        text: '"TUNDE", "tunde", "Tunde". Three different strings: == says False.',
      },
      after: {
        label: 'After .lower()',
        text: '"tunde", "tunde", "tunde". Identical: == says True. Or use .title() for display: "Tunde".',
      },
      notes: [
        'A method is a function that belongs to a value. You call it with a dot: name.lower().',
        '.upper() makes ALL CAPITALS, .lower() makes all small letters, .title() makes A Capital At The Start Of Each Word.',
        'Methods don\'t change the original: strings can\'t be changed. name.lower() gives you a new string. Store it if you want to keep it: name = name.lower().',
      ],
    },
    {
      kind: 'tryIt',
      title: 'One Tunde',
      caption: 'Lowercase both, then compare.',
      code: 'from_bank = "TUNDE"\nfrom_chat = "tunde"\n\nprint(from_bank == from_chat)\nprint(from_bank.lower() == from_chat.lower())\nprint(from_bank.title())\n',
      challenge: 'Try "ngozi okafor".title(). What happens to the second word?',
    },
  ],
  apply: {
    scenario: 'Making the capitals agree.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("bisi".upper())',
        language: 'python',
        options: [
          { text: 'BISI' },
          { text: 'Bisi', why: 'That\'s .title().' },
          { text: 'bisi', why: '.upper() makes every letter a capital.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the bank\'s name as Title Case: Tunde',
        starter: 'from_bank = "TUNDE"\n',
        solution: 'from_bank = "TUNDE"\nprint(from_bank.title())\n',
        hint: 'from_bank.title()',
        checks: [
          { message: 'Print Tunde', outputEquals: 'Tunde' },
          { message: 'Use .title()', codeIncludes: '.title()' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the result.',
        pairs: [
          ['"ada".upper()', 'ADA'],
          ['"BISI".lower()', 'bisi'],
          ['"kemi ade".title()', 'Kemi Ade'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether the two names match when both are lowercased',
        starter: 'a = "TUNDE"\nb = "Tunde"\n',
        solution: 'a = "TUNDE"\nb = "Tunde"\nprint(a.lower() == b.lower())\n',
        hint: 'a.lower() == b.lower()',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Use .lower()', codeIncludes: '.lower()' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "BISI"\nname.lower()\nprint(name)',
        language: 'python',
        options: [
          { text: 'bisi', why: '.lower() gave back a new string, but it wasn\'t stored.' },
          { text: 'BISI' },
          { text: 'Bisi', why: 'Nothing was stored, so name is unchanged.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants name to stay lowercase. Which line forgets to store the result?',
        language: 'python',
        lines: ['name = "TUNDE"', 'name.lower()', 'print(name)'],
        bug: 1,
        fix: 'name = name.lower()',
        explanation: 'Strings can\'t change. The method returns a new one; store it.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which method?',
        groups: ['.upper()', '.lower()', '.title()'],
        items: [
          { text: 'Shouting heading: OFFICE AJO', group: 0 },
          { text: 'Comparing names fairly', group: 1 },
          { text: 'Showing a name nicely: Ngozi Okafor', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lowercase both names before comparing.',
        language: 'python',
        template: 'print(a.[[1]]() == b.[[2]]())',
        blanks: [['lower'], ['lower']],
        distractors: ['upper', 'title'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I store names lowercase or in title case?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Pick one rule for storing and comparing, like title case, and apply it to every name that comes in.' },
          { text: 'Store them however people type them.', why: 'That\'s how the three Tundes happened.' },
          { text: 'Always uppercase.', why: 'Fine for comparing, but SHOUTY on member cards.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("ada lovelace".title()) show?',
        answers: ['Ada Lovelace'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'A rule like "always store names in title case" prevents a whole class of problems. What simple rule would prevent mistakes in your work?',
    starters: ['A simple rule would be...', 'It would stop...'],
  },
  deepen: {
    title: '.casefold()',
    summary: 'For comparing text in any language, Python has .casefold(): a stronger .lower(). The German ß, for example, casefolds to "ss".',
  },
  notes: 'str.upper(), str.lower(), str.title(), str.casefold() (Python docs, String Methods). Strings are immutable; methods return new strings. "ß".casefold() == "ss".',
};

export default lesson;
