import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: case methods, strip, replace, in. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: one Tunde',
  summary: 'For the first time, March\'s three Tundes come out as one: "Tunde". Amounts like "N30,000" turn into 30000. Quick check before the tracker starts asking questions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Clean names and amounts with string methods', 'Search text with in'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, cleaning day',
      beats: [
        { speaker: 'narrator', text: 'Ada runs every name through .strip().title(). "TUNDE ", "tunde" and " Tunde" all come out "Tunde".' },
        { speaker: 'narrator', text: 'In the group chat, Tunde: "So I only paid once?" Ada: "Yes. Once."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: cleaning text.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Clean the name with .strip().title() and print whether it equals "Tunde"',
        starter: 'raw = "  tUNDE "\n',
        solution: 'raw = "  tUNDE "\nprint(raw.strip().title() == "Tunde")\n',
        hint: 'raw.strip().title() == "Tunde"',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("ngozi okafor".title())',
        language: 'python',
        options: [
          { text: 'Ngozi okafor', why: '.title() capitalises every word.' },
          { text: 'Ngozi Okafor' },
          { text: 'NGOZI OKAFOR', why: 'That\'s .upper().' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Turn "N25,500" into the number 25500 and print it',
        starter: 'note = "N25,500"\n',
        solution: 'note = "N25,500"\nprint(int(note.replace("N", "").replace(",", "")))\n',
        hint: 'Two .replace() calls, then int().',
        checks: [{ message: 'Print 25500', outputEquals: '25500' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the job to the method.',
        pairs: [
          ['Remove spaces at the ends', '.strip()'],
          ['Swap text for other text', '.replace()'],
          ['Make every letter small', '.lower()'],
          ['Capital at each word', '.title()'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'note = "AJO MARCH KEMI". True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '"kemi" in note.lower()', group: 0 },
          { text: '"kemi" in note', group: 1 },
          { text: '"KEMI" in note', group: 0 },
          { text: '"april" in note.lower()', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line forgets to keep the cleaned name?',
        language: 'python',
        lines: ['name = " Bisi "', 'name.strip()', 'print(len(name))'],
        bug: 1,
        fix: 'name = name.strip()',
        explanation: 'Methods return a new string; store it, or len() still sees the spaces (6).',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(" Ada ".strip().upper())',
        language: 'python',
        options: [
          { text: ' ADA ', why: '.strip() ran first and removed the spaces.' },
          { text: 'ADA' },
          { text: 'Ada', why: '.upper() makes all capitals.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Clean a name for storing.',
        language: 'python',
        template: 'name = raw.[[1]]().[[2]]()',
        blanks: [['strip'], ['title']],
        distractors: ['upper', 'replace'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether the note mentions bisi, whatever the capitals',
        starter: 'note = "Ajo April BISI"\n',
        solution: 'note = "Ajo April BISI"\nprint("bisi" in note.lower())\n',
        hint: '"bisi" in note.lower()',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde asks: "So I only paid once?" How do you explain the three Tundes?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'The bank kept what people typed: TUNDE, tunde, Tunde. Python saw three names. Cleaned, it\'s one Tunde, one payment.' },
          { text: 'Python made a mistake.', why: 'Python was exact. The names needed cleaning.' },
          { text: 'You paid three times!', why: 'He paid once; the name was written three ways.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the amount clean-up.',
        language: 'python',
        lines: ['note = "N30,000"', 'digits = note.replace("N", "")', 'digits = digits.replace(",", "")', 'amount = int(digits)', 'print(amount + 1500)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("  KEMI".strip().title()) show?',
        answers: ['Kemi'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'The "three Tundes" weren\'t anyone\'s fault: data just arrives messy. Where has messy data caused an argument you\'ve seen?',
    starters: ['The argument was about...', 'Cleaning would have...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 6-9. "  tUNDE ".strip().title() == "Tunde"; "N25,500" -> 25500; len(" Bisi ") = 6.',
};

export default lesson;
