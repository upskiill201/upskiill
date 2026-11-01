import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1 — Strings are sequences: text is a row of characters, each one countable and reachable. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Strings are sequences',
  summary: 'The bank export lists Tunde three ways: "TUNDE ", "tunde" and " Tunde". To Python those are three different people. Before Ada can clean them, she needs to see what a string really is.',
  minutes: 11,
  outcomes: [
    'See a string as a row of characters',
    'Know that spaces and capitals are characters too',
    'Explain why "Tunde" and "tunde" are different strings',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, the bank export',
      beats: [
        { speaker: 'narrator', text: 'Ada copies March\'s payments from the bank app. Tunde appears three times: "TUNDE ", "tunde" and " Tunde".' },
        { speaker: 'ada', text: 'Python, is "TUNDE " the same as "Tunde"?' },
        { speaker: 'narrator', text: 'print("TUNDE " == "Tunde") prints False.' },
        { speaker: 'arjun', text: '(on a call) To Python a string is a row of characters, compared one by one. T-U-N-D-E-space is not T-u-n-d-e. Every capital and every space counts.' },
      ],
      choice: {
        prompt: 'What should Ada do about the three Tundes?',
        options: [
          {
            text: 'Learn how strings work, then clean every name the same way before comparing.',
            outcome: 'That\'s this chapter. By lesson 20, every name that comes in gets cleaned automatically.',
            best: true,
          },
          {
            text: 'Retype them all by hand each month.',
            outcome: 'Eleven members, every month, forever. And one slip means a member "hasn\'t paid".',
          },
          {
            text: 'Ask the bank to stop it.',
            outcome: 'The bank shows whatever people typed in the transfer note. It isn\'t going to change.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>string</strong> is a <strong>sequence</strong>: characters in a row, in order. <code>"Tunde"</code> is the five characters T, u, n, d, e. A space is a character too, so <code>"Tunde "</code> has six.</p><p>Python compares strings character by character, so <code>"Tunde" == "tunde"</code> is <code>False</code> (capital T vs small t), and <code>"Tunde" == "Tunde "</code> is <code>False</code> (one has an extra space at the end).</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three Tundes',
      caption: 'Each comparison checks every character.',
      code: 'print("Tunde" == "Tunde")\nprint("Tunde" == "tunde")\nprint("Tunde" == "Tunde ")\nprint("TUNDE " == "Tunde")\n',
      challenge: 'Make one of the False lines True by changing just one character.',
    },
  ],
  apply: {
    scenario: 'Three ways of writing Tunde.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Bisi" == "bisi")',
        language: 'python',
        options: [
          { text: 'True', why: 'Capital B and small b are different characters.' },
          { text: 'False' },
          { text: 'Bisi', why: '== gives True or False.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether "Tunde" and "Tunde " (with a space) are equal',
        starter: '',
        solution: 'print("Tunde" == "Tunde ")\n',
        hint: 'print("Tunde" == "Tunde ")',
        checks: [
          { message: 'Print False', outputEquals: 'False' },
          { message: 'Compare with ==', codeIncludes: '==' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Same string as "Tunde", or different?',
        groups: ['Same', 'Different'],
        items: [
          { text: '"Tunde"', group: 0 },
          { text: '"tunde"', group: 1 },
          { text: '"Tunde "', group: 1 },
          { text: '\'Tunde\'', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many characters are in "Tunde " (with one space at the end)?',
        options: [
          { text: '5', why: 'The space is a character too.' },
          { text: '7', why: 'T, u, n, d, e and one space.' },
          { text: '6' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Store the bank\'s version, "TUNDE ", in a variable and print whether it equals "Tunde"',
        starter: 'from_bank = "TUNDE "\n',
        solution: 'from_bank = "TUNDE "\nprint(from_bank == "Tunde")\n',
        hint: 'print(from_bank == "Tunde")',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the string to how many characters it has.',
        pairs: [
          ['"Ada"', '3'],
          ['"Ada "', '4'],
          ['"Tunde"', '5'],
          ['""', '0'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada expects True on every line. Which line prints False?',
        language: 'python',
        lines: ['print("Kemi" == "Kemi")', 'print("Kemi" == \'Kemi\')', 'print("Kemi" == "KEMI")'],
        bug: 2,
        explanation: 'Capitals are different characters. Single or double quotes make no difference.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why does Python care about capitals? People don\'t.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Python compares exactly what\'s there, character by character. If you want "people rules", you clean the text first.' },
          { text: 'Python is being difficult.', why: 'Exact is predictable. Cleaning is your job.' },
          { text: 'It doesn\'t.', why: 'It does: "Tunde" == "tunde" is False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A string is a [[1]] of characters, compared one [[2]] one.',
        template: 'A string is a [[1]] of characters, compared one [[2]] one.',
        blanks: [['sequence', 'row'], ['by']],
        distractors: ['number', 'at'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("Ada" == "Ada") show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Where have two "identical" names or emails failed to match for you (a login, a form, a spreadsheet)?',
    starters: ['It didn\'t match because...', 'The difference was...'],
  },
  deepen: {
    title: 'Characters have numbers',
    summary: 'Every character has a code: ord("T") is 84 and ord("t") is 116. That\'s why Python sees them as different.',
  },
  notes: 'Strings are immutable sequences of Unicode code points (Python docs, Text Sequence Type str). Equality compares code point by code point. ord("T") = 84, ord("t") = 116.',
};

export default lesson;
