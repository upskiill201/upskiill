import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 3 — writing a formula from words. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Writing a formula from words',
  summary: 'Ada knows what she wants: "total payments from Makola shops in September". She doesn\'t know the formula. Describe it in words, and check what comes back.',
  minutes: 12,
  outcomes: [
    'Describe a calculation precisely in words',
    'Get a working formula from AI',
    'Check the formula gives the right answer',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From words to a working formula',
      steps: [
        { title: '1. Name your tool', body: '"Google Sheets" or "Excel": formulas are similar, but not always identical.' },
        { title: '2. Describe the columns', body: '"A: Date, B: Shop ID, C: Amount (GHS), D: Market, E: Status."' },
        { title: '3. Say exactly what you want', body: '"Total of column C where D is Makola, E is completed, and the date is in September 2024."' },
        { title: '4. Ask for an explanation too', body: '"Give the formula, and explain each part in one line." Now you can check it.' },
        { title: '5. Test it', body: 'Filter the sheet by hand for a few rows and check the formula agrees. If not, tell the AI what\'s wrong.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Tool, columns, exact rule, ask for an explanation, then test it against a few rows you\'ve checked by hand.',
    },
  ],
  apply: {
    scenario: 'Ada needs September\'s Makola total.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Name your tool', 'Describe the columns', 'Say exactly what you want', 'Ask for an explanation', 'Test it'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the right formula first time?',
        options: [
          { text: 'Makola total formula?', why: 'Missing tool, columns and conditions.' },
          { text: 'In Google Sheets, columns are A Date, C Amount, D Market, E Status. Give me a formula for the total of C where D is "Makola", E is "completed" and A is in September 2024, and explain each part.' },
          { text: 'Do the maths for me.', why: 'A formula is better than a guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Precise description, or vague?',
        groups: ['Precise', 'Vague'],
        items: [
          { text: 'Total of C where E is "completed"', group: 0 },
          { text: 'The money stuff', group: 1 },
          { text: 'Count rows where D is "Makola"', group: 0 },
          { text: 'How did we do?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The formula gives 0 but Ada knows there are Makola sales. What\'s a likely cause?',
        options: [
          { text: 'There are no sales', why: 'She knows there are.' },
          { text: 'The text doesn\'t match exactly, e.g. "makola" vs "Makola" or extra spaces' },
          { text: 'Spreadsheets can\'t add', why: 'They can; the rule didn\'t match.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Is the Makola total right? It seems low.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The AI wrote it, so yes.', why: 'Test it.' },
          { text: 'Probably wrong.', why: 'Check it, then say.' },
          { text: 'I tested it against 10 rows I checked by hand and it matched. I\'ll also check for spelling differences in the Market column.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request.',
        template: 'Give the formula, and [[1]] each part in one [[2]].',
        blanks: [['explain'], ['line']],
        distractors: ['hide', 'essay'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Ada\'s description is too vague?',
        lines: [
          'Tool: Google Sheets',
          'Columns: A Date, C Amount, D Market, E Status',
          'Want: the good payments from recently',
          'Also: explain each part',
        ],
        bug: 2,
        fix: 'Want: total of C where E is "completed" and A is in September 2024',
        explanation: '"Good" and "recently" need exact rules.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the words to the formula idea.',
        pairs: [
          ['"Only completed payments"', 'A condition on column E'],
          ['"From Makola"', 'A condition on column D'],
          ['"Add up the amounts"', 'Sum column C'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the exact rule.',
        tiles: ['where', 'Status', 'is', '"completed"'],
        distractors: ['maybe', 'good'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Makola completed rows: 120, 80, 50 GHS. What should the formula return?',
        answers: ['250'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good test, or not a test?',
        groups: ['Good test', 'Not a test'],
        items: [
          { text: 'Filter 10 rows by hand and compare', group: 0 },
          { text: 'It looks about right', group: 1 },
          { text: 'Check one row you know the answer for', group: 0 },
          { text: 'The AI said it\'s correct', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why name your spreadsheet tool?',
        options: [
          { text: 'Formulas are similar but not always identical between tools' },
          { text: 'Brand loyalty', why: 'It\'s about formula syntax.' },
          { text: 'It doesn\'t matter', why: 'Some functions differ.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write, in words, a calculation you need at work. Make it precise enough that AI can\'t misunderstand.',
    starters: ['I want the...', 'where...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for one formula from a precise description. Test it on rows you check by hand.' },
  notes: 'Exact formulas vary by tool (e.g. SUMIFS with date criteria). Data fictional.',
};

export default lesson;
