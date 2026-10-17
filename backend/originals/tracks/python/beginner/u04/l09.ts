import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9 — in for text: does one string contain another? */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'in for text',
  summary: 'Bank notes say things like "Ajo March TUNDE" or "tunde ajo". Ada doesn\'t care where the name is, only whether it\'s there. Python has a one-word answer: in.',
  minutes: 11,
  outcomes: [
    'Check whether text contains a piece with in',
    'Use not in for the opposite',
    'Lowercase both sides first so capitals don\'t matter',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Is the name in the note?',
      steps: [
        {
          title: '1. Ask with in',
          body: '"Tunde" in note gives True if those characters appear anywhere in note, in that order.',
          code: 'note = "Ajo March Tunde"\nprint("Tunde" in note)  # True',
          language: 'python',
        },
        {
          title: '2. Capitals still count',
          body: 'in compares exactly, like ==. "tunde" is not in "Ajo March TUNDE".',
          code: 'print("tunde" in "Ajo March TUNDE")  # False',
          language: 'python',
        },
        {
          title: '3. Lowercase both sides',
          body: 'Clean first, then search. Now it works however people typed it.',
          code: 'note = "Ajo March TUNDE"\nprint("tunde" in note.lower())  # True',
          language: 'python',
        },
        {
          title: '4. not in',
          body: 'The opposite question: is it missing?',
          code: 'print("Bisi" not in note)  # True',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Whose payment is it?',
      caption: 'Change the note and see which names it finds.',
      code: 'note = "tunde ajo MARCH"\nclean = note.lower()\n\nprint("tunde" in clean)\nprint("bisi" in clean)\nprint("march" in clean)\n',
      challenge: 'Check whether the note does NOT mention "april".',
    },
  ],
  apply: {
    scenario: 'Finding names in payment notes.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Kemi" in "Ajo payment from Kemi")',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '"Kemi" appears at the end of the note.' },
          { text: 'Kemi', why: 'in gives True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether "tunde" is in the note, ignoring capitals',
        starter: 'note = "Ajo March TUNDE"\n',
        solution: 'note = "Ajo March TUNDE"\nprint("tunde" in note.lower())\n',
        hint: '"tunde" in note.lower()',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Use in', codeIncludes: ' in ' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'note = "ajo march bisi". True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '"bisi" in note', group: 0 },
          { text: '"Bisi" in note', group: 1 },
          { text: '"march" in note', group: 0 },
          { text: '"tunde" in note', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether the note does NOT mention april',
        starter: 'note = "ajo march bisi"\n',
        solution: 'note = "ajo march bisi"\nprint("april" not in note)\n',
        hint: '"april" not in note',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Use not in', codeIncludes: 'not in' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The note is "AJO MARCH TUNDE". Which line wrongly prints False?',
        language: 'python',
        lines: ['print("TUNDE" in note)', 'print("tunde" in note)', 'print("tunde" in note.lower())'],
        bug: 1,
        fix: 'print("tunde" in note.lower())',
        explanation: 'in is exact: lowercase the note before searching for a lowercase name.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the code.',
        pairs: [
          ['Does it mention Tunde?', '"tunde" in note'],
          ['Is April missing?', '"april" not in note'],
          ['Exactly the same text?', 'note == "tunde"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Search after cleaning.',
        language: 'python',
        template: 'print("bisi" [[1]] note.[[2]]())',
        blanks: [['in'], ['lower']],
        distractors: ['==', 'upper'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("ade" in "Ademola")',
        language: 'python',
        options: [
          { text: 'True', why: 'Capital A: "Ade" is in it, "ade" isn\'t.' },
          { text: 'False' },
          { text: 'An error', why: 'in works on any two strings.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Careful: "ada" in "Adaeze sent 30000" is True after lowercasing. Problem?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'No, it\'s always right.', why: 'Adaeze isn\'t Ada.' },
          { text: 'in is broken.', why: 'It\'s doing exactly what it says: finding a piece.' },
          { text: 'Yes: in finds pieces of words, so short names can match longer ones. It\'s a clue, not proof.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("x" not in "ajo") show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Searching for a word can find it inside other words. Have you ever searched for something and got surprising matches?',
    starters: ['I searched for...', 'It also found...'],
  },
  deepen: {
    title: '.startswith() and .endswith()',
    summary: 'ref.startswith("AJO") checks only the beginning: no surprise matches in the middle. .endswith() checks the end.',
  },
  notes: 'Membership test "in" for substrings (Python Language Reference §6.10.2). str.startswith/endswith (String Methods). "ade" in "Ademola" is False (case-sensitive).',
};

export default lesson;
