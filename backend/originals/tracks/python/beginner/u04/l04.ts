import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4 — Slicing: [start:stop] takes a piece of a string. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Slicing',
  summary: 'Bank references look like "AJO-2026-03-TUNDE". Ada needs just the month, "03". One character won\'t do: she needs a slice.',
  minutes: 12,
  outcomes: [
    'Take a piece of a string with [start:stop]',
    'Know the stop position is not included',
    'Leave out start or stop to go from the beginning or to the end',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'ref[4:8] includes the character at position 8.',
          isFact: false,
          explain: 'Myth. A slice stops just before the stop position. ref[4:8] is positions 4, 5, 6 and 7: four characters.',
        },
        {
          text: 'ref[:3] means "the first three characters".',
          isFact: true,
          explain: 'Fact. Leave out the start and the slice starts at 0. "AJO-2026-03-TUNDE"[:3] is "AJO".',
        },
        {
          text: 'ref[-5:] means "the last five characters".',
          isFact: true,
          explain: 'Fact. Negative start counts from the end, and no stop means "to the end": "TUNDE".',
        },
        {
          text: 'Slicing past the end of a string is an IndexError.',
          isFact: false,
          explain: 'Myth. Slices are forgiving: "Ada"[0:50] is just "Ada". Only single indexes like "Ada"[50] fail.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Taking the reference apart',
      caption: 'AJO-2026-03-TUNDE: positions 0 to 16.',
      code: 'ref = "AJO-2026-03-TUNDE"\n\nprint(ref[:3])\nprint(ref[4:8])\nprint(ref[9:11])\nprint(ref[-5:])\n',
      challenge: 'Print the year and month together: "2026-03".',
    },
  ],
  apply: {
    scenario: 'Reading bank references.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Tunde"[0:3])',
        language: 'python',
        options: [
          { text: 'Tun' },
          { text: 'Tund', why: 'The stop, 3, is not included: positions 0, 1, 2.' },
          { text: 'und', why: 'It starts at 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the month from the reference: 03',
        starter: 'ref = "AJO-2026-03-TUNDE"\n',
        solution: 'ref = "AJO-2026-03-TUNDE"\nprint(ref[9:11])\n',
        hint: 'The month is at positions 9 and 10: ref[9:11].',
        checks: [
          { message: 'Print 03', outputEquals: '03' },
          { message: 'Use a slice', codeIncludes: ':' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'ref = "AJO-2026-03-TUNDE". Match the slice to the result.',
        pairs: [
          ['ref[:3]', 'AJO'],
          ['ref[4:8]', '2026'],
          ['ref[-5:]', 'TUNDE'],
          ['ref[4:11]', '2026-03'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the member\'s name from the end of the reference with a negative slice',
        starter: 'ref = "AJO-2026-03-BISI"\n',
        solution: 'ref = "AJO-2026-03-BISI"\nprint(ref[-4:])\n',
        hint: 'The name is the last 4 characters: ref[-4:].',
        checks: [
          { message: 'Print BISI', outputEquals: 'BISI' },
          { message: 'Use a negative start', codeIncludes: '[-4:]' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'name = "Ngozi". What does each give?',
        groups: ['"Ngo"', '"ozi"'],
        items: [
          { text: 'name[:3]', group: 0 },
          { text: 'name[2:]', group: 1 },
          { text: 'name[0:3]', group: 0 },
          { text: 'name[-3:]', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The first three characters.',
        language: 'python',
        template: 'prefix = ref[[[1]]3]',
        blanks: [[':', '0:']],
        distractors: ['3:', '-3'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants the year, 2026. Which slice gives "202"?',
        language: 'python',
        lines: ['ref = "AJO-2026-03-TUNDE"', 'print(ref[4:8])', 'print(ref[4:7])'],
        bug: 2,
        fix: 'print(ref[4:8])',
        explanation: 'The stop isn\'t included, so 4:7 is only three characters. Use 4:8.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Ada"[0:50])',
        language: 'python',
        options: [
          { text: 'IndexError', why: 'Slices are forgiving past the end.' },
          { text: 'Ada' },
          { text: 'Nothing', why: 'It gives everything there is: "Ada".' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why do you think the stop isn\'t included?',
        prompt: "Ada's best guess?",
        options: [
          { text: 'To confuse beginners.', why: 'It makes slice lengths easy to work out.' },
          { text: 'Because Python counts from 1.', why: 'Python counts from 0.' },
          { text: 'So ref[4:8] is exactly 8 - 4 = 4 characters, and ref[:3] plus ref[3:] gives the whole string back.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("Kemi"[1:3]) show?',
        answers: ['em'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'References, account numbers and dates often hide useful pieces in fixed positions. What code in your life could you slice up?',
    starters: ['The code is...', 'The useful piece is...'],
  },
  deepen: {
    title: 'A step, too',
    summary: 'Slices take an optional step: "Tunde"[::2] is "Tne", every second character. "Tunde"[::-1] reverses it: "ednuT".',
  },
  notes: 'Slicing s[start:stop] excludes stop; omitted start = 0, omitted stop = len (Python tutorial §3.1.2). Out-of-range slices are truncated, not errors. "AJO-2026-03-TUNDE": AJO 0-2, 2026 4-7, 03 9-10, TUNDE 12-16. "Kemi"[1:3] = "em".',
};

export default lesson;
