import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8 — .replace(): swap one piece of text for another, everywhere it appears. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '.replace()',
  summary: 'Some members type amounts as "30,000" or "N30000" in the payment note. Ada needs just the digits before int() can turn them into numbers. .replace() swaps out the bits she doesn\'t want.',
  minutes: 11,
  outcomes: [
    'Swap text with .replace(old, new)',
    'Remove characters by replacing them with ""',
    'Clean an amount before int()',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><code>text.replace(old, new)</code> gives a new string with <strong>every</strong> <code>old</code> swapped for <code>new</code>.</p><p><code>"30,000".replace(",", "")</code> replaces each comma with nothing, so you get <code>"30000"</code>. Then <code>int("30000")</code> works. Without the replace, <code>int("30,000")</code> is a ValueError.</p>',
    },
    {
      kind: 'text',
      html: '<p>You can chain replaces: <code>"N30,000".replace("N", "").replace(",", "")</code> is <code>"30000"</code>. And like every string method, <code>.replace()</code> doesn\'t change the original: store the result.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Cleaning an amount',
      caption: 'Text in, number out.',
      code: 'note = "N30,000"\n\ndigits = note.replace("N", "").replace(",", "")\nprint(digits)\nprint(int(digits) + 1500)\n',
      challenge: 'Try int("30,000") on its own. Read the error.',
    },
  ],
  apply: {
    scenario: 'Cleaning payment notes.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("30,000".replace(",", ""))',
        language: 'python',
        options: [
          { text: '30000' },
          { text: '30,000', why: '.replace() removed the comma.' },
          { text: '30 000', why: 'It was replaced with "", nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the comma, turn it into a number with int(), and print it',
        starter: 'amount = "30,000"\n',
        solution: 'amount = "30,000"\nprint(int(amount.replace(",", "")))\n',
        hint: 'int(amount.replace(",", ""))',
        checks: [
          { message: 'Print 30000', outputEquals: '30000' },
          { message: 'Use .replace()', codeIncludes: '.replace(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the result.',
        pairs: [
          ['"N500".replace("N", "")', '500'],
          ['"a-b-c".replace("-", "")', 'abc'],
          ['"AJO 2026".replace(" ", "-")', 'AJO-2026'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Clean "N30,000" into the number 30000 and print it',
        starter: 'note = "N30,000"\n',
        solution: 'note = "N30,000"\nprint(int(note.replace("N", "").replace(",", "")))\n',
        hint: 'Two replaces, then int().',
        checks: [{ message: 'Print 30000', outputEquals: '30000' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives a ValueError?',
        language: 'python',
        lines: ['amount = "30,000"', 'print(int(amount))', 'print(int(amount.replace(",", "")))'],
        bug: 1,
        fix: 'print(int(amount.replace(",", "")))',
        explanation: 'int() can\'t read the comma. Remove it first.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Will int() accept it?',
        groups: ['Yes', 'ValueError'],
        items: [
          { text: '"30000"', group: 0 },
          { text: '"30,000"', group: 1 },
          { text: '"N30000"', group: 1 },
          { text: '" 30000 "', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remove every comma.',
        language: 'python',
        template: 'digits = amount.replace([[1]], [[2]])',
        blanks: [['","'], ['""']],
        distractors: ['" "', '"."'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Tunde Tunde".replace("Tunde", "Bisi"))',
        language: 'python',
        options: [
          { text: 'Bisi Tunde', why: '.replace() swaps every match, not just the first.' },
          { text: 'Bisi Bisi' },
          { text: 'Tunde Tunde', why: 'It returns the replaced string.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'int(" 30000 ") works but int("30,000") doesn\'t. Why?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'int() hates commas.', why: 'Sort of. The point is: clean it with .replace().' },
          { text: 'It\'s random.', why: 'int() follows clear rules.' },
          { text: 'int() ignores spaces at the ends, but a comma is inside the number, so it has to be replaced first.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("2026-03".replace("-", "/")) show?',
        answers: ['2026/03'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'People write the same amount many ways (₦30k, 30,000, N30000). What other data comes in "creative" formats?',
    starters: ['People write...', 'I\'d clean it by...'],
  },
  deepen: {
    title: 'Limit the replacements',
    summary: '.replace() takes an optional count: "a-b-c".replace("-", "", 1) only replaces the first: "ab-c".',
  },
  notes: 'str.replace(old, new[, count]) replaces all occurrences by default (Python docs, String Methods). int() accepts surrounding whitespace but not commas (Built-in Functions: int). "N" is a common plain-text stand-in for the naira sign.',
};

export default lesson;
