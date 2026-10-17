import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 19 — Clean every name: one recipe for every name that comes in. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Clean every name',
  summary: 'Ada writes down one recipe that every name goes through on the way in, typed or pasted, from the bank or the chat. After this, "  ngozi   OKAFOR " and "Ngozi Okafor" are the same person.',
  minutes: 12,
  outcomes: [
    'Clean a name in one recipe: spaces, inner spaces, capitals',
    'Apply the same recipe to both sides of a comparison',
    'Explain each step of the recipe',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The name recipe',
      steps: [
        {
          title: '1. Split on spaces',
          body: '.split() with no argument breaks on any run of spaces, and drops spaces at the ends too.',
          code: 'raw = "  ngozi   OKAFOR "\nparts = raw.split()  # [\'ngozi\', \'OKAFOR\']',
          language: 'python',
        },
        {
          title: '2. Join with one space',
          body: 'Now there\'s exactly one space between words, and none at the ends.',
          code: 'tidy = " ".join(parts)  # \'ngozi OKAFOR\'',
          language: 'python',
        },
        {
          title: '3. Fix the capitals',
          body: '.title() gives a capital at the start of each word.',
          code: 'clean = tidy.title()  # \'Ngozi Okafor\'',
          language: 'python',
        },
        {
          title: '4. All in one line',
          body: 'The same recipe, chained. Use it on every name that comes in.',
          code: 'clean = " ".join(raw.split()).title()',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The recipe on messy names',
      caption: 'Three messy versions, one clean result.',
      code: 'a = "  ngozi   OKAFOR "\nb = "Ngozi Okafor"\nc = "NGOZI okafor  "\n\nprint(" ".join(a.split()).title())\nprint(" ".join(b.split()).title())\nprint(" ".join(c.split()).title())\n',
      challenge: 'Print whether a and c are the same person after cleaning both.',
    },
  ],
  apply: {
    scenario: 'One recipe for every name.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("  tunde   bakare ".split())',
        language: 'python',
        options: [
          { text: "['tunde', 'bakare']" },
          { text: "['', 'tunde', '', 'bakare', '']", why: 'With no argument, split() ignores runs of spaces.' },
          { text: 'tunde bakare', why: 'split() gives a list.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Clean the name with the full recipe and print it',
        starter: 'raw = "  ngozi   OKAFOR "\n',
        solution: 'raw = "  ngozi   OKAFOR "\nprint(" ".join(raw.split()).title())\n',
        hint: '" ".join(raw.split()).title()',
        checks: [
          { message: 'Print Ngozi Okafor', outputEquals: 'Ngozi Okafor' },
          { message: 'Use split and join', codeIncludes: '.join(' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the recipe.',
        lines: ['Split on any spaces', 'Join with single spaces', 'Title-case the result', 'Compare or store it'],
      },
      {
        kind: 'writeCode',
        prompt: 'Clean both names with the recipe and print whether they match',
        starter: 'a = "  ngozi   OKAFOR "\nb = "NGOZI okafor"\n',
        solution: 'a = "  ngozi   OKAFOR "\nb = "NGOZI okafor"\nprint(" ".join(a.split()).title() == " ".join(b.split()).title())\n',
        hint: 'Apply the recipe to a and to b, then ==.',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'After the recipe, is it "Tunde Bakare"?',
        groups: ['Yes', 'No'],
        items: [
          { text: '"  TUNDE   bakare"', group: 0 },
          { text: '"tunde bakare "', group: 0 },
          { text: '"Tunde B."', group: 1 },
          { text: '"tundebakare"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step leaves the double space inside the name?',
        language: 'python',
        lines: ['raw = "Ngozi   Okafor"', 'clean = raw.strip().title()', 'clean = " ".join(raw.split()).title()'],
        bug: 1,
        fix: 'clean = " ".join(raw.split()).title()',
        explanation: '.strip() only removes spaces at the ends. split-then-join also fixes the middle.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The one-line name recipe.',
        language: 'python',
        template: 'clean = " ".[[1]](raw.[[2]]()).[[3]]()',
        blanks: [['join'], ['split'], ['title']],
        distractors: ['strip', 'upper'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it fixes.',
        pairs: [
          ['.split()', 'Spaces at the ends and in between'],
          ['" ".join(...)', 'Exactly one space between words'],
          ['.title()', 'The capitals'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Would the recipe treat "Tunde B." and "Tunde Bakare" as the same?',
        prompt: "Ada's honest answer?",
        options: [
          { text: 'Yes, it\'s magic.', why: 'It only cleans; it doesn\'t guess.' },
          { text: 'No. The recipe fixes spacing and capitals, not abbreviations. Those need a human, or a members list to check against (Chapter 6).' },
          { text: 'It crashes.', why: 'It runs; they just come out different.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(" ".join("  kemi   ADE ".split()).title()) show?',
        answers: ['Kemi Ade'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'A recipe applied to everything on the way in beats fixing things one by one. What recipe would you write for your own messy data?',
    starters: ['My recipe would...', 'Step one would be...'],
  },
  deepen: {
    title: 'Functions make recipes reusable',
    summary: 'Right now Ada copies the recipe line each time. In Chapter 8 it becomes clean_name(raw): written once, used everywhere.',
  },
  notes: 'str.split() with no sep splits on runs of whitespace and discards leading/trailing whitespace (String Methods). " ".join(...).title() normalises internal spacing and case. "  kemi   ADE " → "Kemi Ade".',
};

export default lesson;
