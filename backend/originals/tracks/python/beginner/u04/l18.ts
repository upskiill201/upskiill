import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 18 — Common string bugs: not storing results, cleaning one side, quotes, int() on dirty text. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Common string bugs',
  summary: 'The tracker says Bisi hasn\'t paid. She has a screenshot of the transfer. Ada has four string bugs in twenty lines, and none of them shows an error.',
  minutes: 12,
  outcomes: [
    'Spot the four most common string bugs',
    'Clean both sides of a comparison',
    'Remember to store what a method returns',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Bisi\'s screenshot',
      beats: [
        { speaker: 'narrator', text: 'Bisi shows Ada the transfer: "Ajo April BISI ". The tracker\'s list says she hasn\'t paid.' },
        { speaker: 'ada', text: 'My code lowercases the note. Then compares it to "Bisi". Capital B.' },
        { speaker: 'arjun', text: '(on the call) That\'s bug one: you cleaned one side. Let\'s find the other three before Bisi stops trusting the tracker.' },
      ],
      choice: {
        prompt: 'How should Ada compare names from now on?',
        options: [
          {
            text: 'Clean both sides the same way, every time: a.strip().lower() == b.strip().lower().',
            outcome: 'Bisi shows as paid. Ada adds a comment: # Always clean BOTH sides.',
            best: true,
          },
          {
            text: 'Ask members to type names exactly right.',
            outcome: 'People are people. Phones add spaces. It will happen again.',
          },
          {
            text: 'Fix Bisi\'s row by hand.',
            outcome: 'Bisi is fine this month. Next month it\'s someone else.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Four bugs, no errors',
      caption: 'Every line runs. Fix them one at a time.',
      code: 'note = "Ajo April BISI "\nname = "Bisi"\n\n# Bug 1: only one side cleaned\nprint(name in note.lower())\n\n# Bug 2: result not stored\nnote.strip()\nprint(len(note))\n',
      challenge: 'Fix both, so the first line prints True and the second prints 14.',
    },
  ],
  apply: {
    scenario: 'Finding the four bugs.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Bisi" in "ajo april bisi")',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: 'Capital B vs small b: clean both sides.' },
          { text: 'An error', why: 'It runs; it just gives the wrong answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the comparison by cleaning both sides',
        starter: 'note = "Ajo April BISI "\nname = "Bisi"\nprint(name in note.lower())\n',
        solution: 'note = "Ajo April BISI "\nname = "Bisi"\nprint(name.lower() in note.lower())\n',
        hint: 'Lowercase name too.',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Lowercase both sides', codeIncludes: 'name.lower()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which bug is it?',
        groups: ['Not stored', 'One side cleaned', 'Dirty int()'],
        items: [
          { text: 'name.strip() on its own line', group: 0 },
          { text: '"Bisi" in note.lower()', group: 1 },
          { text: 'int("30,000")', group: 2 },
          { text: 'note.title() with nothing stored', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Store the stripped note so len() prints 14',
        starter: 'note = "Ajo April BISI "\nnote.strip()\nprint(len(note))\n',
        solution: 'note = "Ajo April BISI "\nnote = note.strip()\nprint(len(note))\n',
        hint: 'note = note.strip()',
        checks: [{ message: 'Print 14', outputEquals: '14' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a ValueError?',
        language: 'python',
        lines: ['amount = " 30,000 "', 'print(int(amount.strip().replace(",", "")))', 'print(int(amount.strip()))'],
        bug: 2,
        fix: 'print(int(amount.strip().replace(",", "")))',
        explanation: 'The comma is still there. Strip AND replace before int().',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to the fix.',
        pairs: [
          ['name.strip() not stored', 'name = name.strip()'],
          ['Only the note lowercased', 'Lowercase both sides'],
          ['int("30,000")', 'Replace the comma first'],
          ['"It"s paid"', 'Use single quotes outside'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are string bugs often silent?',
        options: [
          { text: 'Python hides string errors', why: 'Nothing is hidden. The code is doing exactly what it says.' },
          { text: 'A wrong comparison just gives False; nothing crashes' },
          { text: 'They aren\'t; they always error', why: 'Most of today\'s bugs give no error.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Compare two names fairly.',
        language: 'python',
        template: 'print(a.strip().[[1]]() == b.strip().[[2]]())',
        blanks: [['lower'], ['lower']],
        distractors: ['title', 'split'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Bisi almost stopped trusting the tracker over one capital B.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'She\'s overreacting.', why: 'Being told you didn\'t pay when you did is serious.' },
          { text: 'Users should type better.', why: 'Programs should handle how people actually type.' },
          { text: 'That\'s why we test with messy names on purpose. Trust takes months to build and one bug to lose.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(len(" Ada ".strip())) show?',
        answers: ['3'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'A silent bug told Bisi she hadn\'t paid. What\'s the worst silent mistake you\'ve seen a system make?',
    starters: ['A system once told me...', 'It was wrong because...'],
  },
  deepen: {
    title: 'Test with messy data',
    summary: 'Keep a little list of nasty test names: "  TUNDE ", "bisi", "Ngozi  Okafor". Run every change against them.',
  },
  notes: '"Ajo April BISI " has 15 characters; stripped, 14. Case-sensitive membership: "Bisi" in "ajo april bisi" is False.',
};

export default lesson;
