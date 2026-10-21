import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 2 — formulas, explained. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Formulas, explained',
  summary: 'Tolu\'s old sheet is full of formulas nobody understands. AI is excellent at explaining them in plain words, piece by piece.',
  minutes: 12,
  outcomes: [
    'Ask AI to explain a formula piece by piece',
    'Understand SUM, COUNTIF and SUMIF',
    'Check an explanation with a tiny test',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Here\'s a formula from Tolu\'s sheet: =SUMIF(E:E,"completed",C:C). Looks scary?', replies: ['Very'] },
        { tey: 'Ask AI: "Explain this formula piece by piece, in plain words." You\'ll get: look down column E; wherever it says "completed", add up the number in column C on that row.', replies: ['Oh. That\'s simple.'] },
        { tey: 'Most formulas are. A few to know: SUM adds a range. COUNTIF counts rows that match a rule. SUMIF adds only the rows that match.', replies: ['How do I know the explanation is right?'] },
        { tey: 'Test it on three rows you can check in your head. If the formula gives what you expect, you understand it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask "Explain this formula piece by piece, in plain words", then test it on a few rows you can check yourself.',
    },
  ],
  apply: {
    scenario: 'Ada is decoding Tolu\'s old sheet.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the function to what it does.',
        pairs: [
          ['SUM', 'Adds up a range'],
          ['COUNTIF', 'Counts rows matching a rule'],
          ['SUMIF', 'Adds only rows matching a rule'],
          ['AVERAGE', 'The mean of a range'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does =SUMIF(E:E,"completed",C:C) do?',
        options: [
          { text: 'Adds column C where column E says "completed"' },
          { text: 'Counts completed rows', why: 'That would be COUNTIF.' },
          { text: 'Adds all of column E', why: 'E is the rule column; C is added.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request explains a formula best?',
        options: [
          { text: 'What is this?', why: 'Too vague.' },
          { text: 'Explain this formula piece by piece, in plain words. My column C is Amount and column E is Status.' },
          { text: 'Rewrite this formula.', why: 'First understand it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Three rows: 100 completed, 50 failed, 200 completed. What does the SUMIF for "completed" give?',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What does the "COUNTIF" in your sheet count?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It counts how many payments have Status "failed", so we can see the failure rate.' },
          { text: 'I\'m not sure, the AI wrote it.', why: 'She should understand her own formulas.' },
          { text: 'Everything.', why: 'It counts matching rows.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Explain it piece by [[1]], then [[2]] it on a few rows.',
        blanks: [['piece'], ['test']],
        distractors: ['page', 'delete'],
      },
      {
        kind: 'sortGroups',
        prompt: 'SUMIF or COUNTIF?',
        groups: ['SUMIF', 'COUNTIF'],
        items: [
          { text: 'Total GHS from Makola shops', group: 0 },
          { text: 'How many payments failed', group: 1 },
          { text: 'Total of completed payments', group: 0 },
          { text: 'How many shops paid by card', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which explanation of =COUNTIF(E:E,"failed") is wrong?',
        lines: [
          'Looks down column E',
          'Finds rows that say "failed"',
          'Adds up the amounts in those rows',
          'Gives the number of failed payments',
        ],
        bug: 2,
        fix: 'Counts those rows',
        explanation: 'COUNTIF counts; it doesn\'t add amounts.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s request.',
        tiles: ['Explain', 'this', 'formula', 'piece', 'by', 'piece'],
        distractors: ['quickly'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to understand a mystery formula.',
        lines: ['Copy the formula', 'Say what the columns hold', 'Ask for a piece-by-piece explanation', 'Test it on three rows'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rows: failed, completed, failed, failed. What does COUNTIF for "failed" give?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why tell the AI what each column holds?',
        options: [
          { text: 'So the explanation uses your real meaning, not just "column C"' },
          { text: 'It can\'t read letters', why: 'It\'s about meaningful explanations.' },
          { text: 'No reason', why: 'It makes the explanation useful.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find one formula you use but don\'t fully understand. Ask AI to explain it, then test it.',
    starters: ['The formula:', 'It actually means...'],
  },
  deepen: { title: 'Try it today', summary: 'Pick the scariest formula in a sheet you use. Ask AI for a piece-by-piece explanation.' },
  notes: 'Formula syntax shown works in Microsoft Excel and Google Sheets.',
};

export default lesson;
