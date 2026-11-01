import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7 — .strip(): remove spaces from both ends; chaining with .title(). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '.strip()',
  summary: 'After .title(), "Tunde " still doesn\'t match "Tunde". The trailing space survived. Ada meets the tool that removes it, and learns to chain two methods in one go.',
  minutes: 11,
  outcomes: [
    'Remove spaces from both ends with .strip()',
    'Use .lstrip() and .rstrip() for one end',
    'Chain methods: name.strip().title()',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '"Tunde ".title() is still "Tunde ", with the space. .title() changes capitals; it doesn\'t touch spaces. For those there\'s .strip().', replies: ['What does it remove?'] },
        { tey: 'Spaces (and tabs and new lines) at both ends. "  Tunde  ".strip() is "Tunde". Spaces in the middle stay: " Ngozi Okafor ".strip() is "Ngozi Okafor".', replies: ['Can I strip and title at once?'] },
        { tey: 'Yes: chain them. name.strip().title() runs left to right: strip first, then title-case the result. One line, a clean name.', replies: ['One end only?'] },
        { tey: '.lstrip() removes from the left, .rstrip() from the right. Most of the time you just want .strip().' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Strip, then compare',
      caption: 'len() shows the spaces disappearing.',
      code: 'raw = "  tunde  "\n\nprint(len(raw))\nclean = raw.strip().title()\nprint(clean, len(clean))\nprint(clean == "Tunde")\n',
      challenge: 'Try " ngozi okafor ".strip().title(). Which space stays?',
    },
  ],
  apply: {
    scenario: 'Removing hidden spaces.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len("  Bisi ".strip()))',
        language: 'python',
        options: [
          { text: '7', why: 'That\'s before stripping.' },
          { text: '5', why: 'All three spaces are at the ends, so all go.' },
          { text: '4' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Clean the name with .strip() and print it',
        starter: 'raw = "  Kemi   "\n',
        solution: 'raw = "  Kemi   "\nprint(raw.strip())\n',
        hint: 'raw.strip()',
        checks: [
          { message: 'Print Kemi with no spaces', outputEquals: 'Kemi' },
          { message: 'Use .strip()', codeIncludes: '.strip()' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Strip and title-case in one chain, then print the result',
        starter: 'raw = "  TUNDE "\n',
        solution: 'raw = "  TUNDE "\nprint(raw.strip().title())\n',
        hint: 'raw.strip().title()',
        checks: [
          { message: 'Print Tunde', outputEquals: 'Tunde' },
          { message: 'Chain .strip() and .title()', codeIncludes: '.strip().title()' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'raw = "  Ada  ". Match the method to the result.',
        pairs: [
          ['raw.strip()', '"Ada"'],
          ['raw.lstrip()', '"Ada  "'],
          ['raw.rstrip()', '"  Ada"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'After .strip(), is the space still there?',
        groups: ['Removed', 'Still there'],
        items: [
          { text: 'The space in "Tunde "', group: 0 },
          { text: 'The space in "Ngozi Okafor"', group: 1 },
          { text: 'The spaces in "  Bisi"', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This still doesn\'t match "Tunde". Which line is the problem?',
        language: 'python',
        lines: ['raw = "TUNDE "', 'clean = raw.title()', 'print(clean == "Tunde")'],
        bug: 1,
        fix: 'clean = raw.strip().title()',
        explanation: '.title() leaves the trailing space. Strip it too.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Clean a name in one chain.',
        language: 'python',
        template: 'clean = raw.[[1]]().[[2]]()',
        blanks: [['strip'], ['title']],
        distractors: ['trim', 'clean'],
      },
      {
        kind: 'mcq',
        prompt: 'In raw.strip().title(), which happens first?',
        options: [
          { text: '.title()', why: 'The leftmost method runs first, then the next works on its result.' },
          { text: 'Both at once', why: 'One after the other, left to right.' },
          { text: '.strip(): chains run left to right' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Where do these trailing spaces even come from?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Python adds them.', why: 'Python keeps exactly what\'s typed.' },
          { text: 'Phone keyboards add one after a word, and copy-paste grabs extra. You can\'t stop people, so you strip everything that comes in.' },
          { text: 'Only Tunde does it.', why: 'Everyone\'s phone does it sometimes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("  segun ".strip().title()) show?',
        answers: ['Segun'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Cleaning data "on the way in" stops problems later. What would you clean on the way in, if you could (emails, phone numbers, names)?',
    starters: ['I\'d clean...', 'Because...'],
  },
  deepen: {
    title: 'Stripping other characters',
    summary: '.strip() can remove other characters too: "--Tunde--".strip("-") is "Tunde". Useful for bank references with odd padding.',
  },
  notes: 'str.strip(), lstrip(), rstrip() remove leading/trailing whitespace by default, or a given set of characters (Python docs, String Methods). Method chaining evaluates left to right. "  Bisi " has length 7; stripped "Bisi" is 4.',
};

export default lesson;
