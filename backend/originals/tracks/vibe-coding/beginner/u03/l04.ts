import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Before / After: check it against the brief. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Check it against the brief',
  summary: 'The gig-fee calculator is "done". Hazel\'s check: she clicks around, it seems fine. Ruth\'s check: she takes the brief card and ticks every line. Two lines fail.',
  minutes: 11,
  outcomes: [
    'Turn your brief into a checklist',
    'Check each line with a real example',
    'Report what failed in one clear message',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to check "done"',
      before: { label: 'Clicking around', text: 'Opened gigs.html. Typed 2 hours. Got a number. Looks fine!' },
      after: {
        label: 'Ticking the brief',
        text: '[pass] $400 first hour: 1 hour shows $400\n[pass] $150 each extra hour: 3 hours shows $700\n[FAIL] $2 a mile outside the city: 10 miles adds $0\n[FAIL] Limit "don\'t touch index.html": index.html changed\n[pass] Done when: 3 hours shows $700',
      },
      notes: [
        'Every line of the brief becomes one check, with a number she can compare.',
        'Clicking around found nothing. Ticking the brief found two failures in two minutes.',
        'Limits get checked too: "don\'t touch index.html" is a promise, and it was broken.',
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Two things don\'t match my brief:\n1. 10 miles should add $20. It adds $0.\n2. You changed index.html. Undo that change; my brief says not to touch it.\nFix only these two. Keep everything else the same.',
      caption: 'Hazel\'s report: what she tried, what she expected, what happened.',
    },
  ],
  apply: {
    scenario: 'Ticking the brief.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "clicking around" miss the mileage bug?',
        options: [
          { text: 'She never tried miles, because she had no list of what to check' },
          { text: 'The bug was invisible', why: '10 miles showing $0 is easy to see once you try it.' },
          { text: 'Clicking is broken', why: 'Clicking was fine. The list was missing.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "$2 a mile outside the city" into a check.',
        tiles: ['Type 10 miles,', 'expect $20 more', 'than with 0 miles'],
        distractors: ['looks okay', 'probably'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Pass or fail? (Brief: $400 first hour, $150 extra hours, $2 a mile.)',
        groups: ['Pass', 'Fail'],
        items: [
          { text: '1 hour, 0 miles: $400', group: 0 },
          { text: '2 hours, 0 miles: $800', group: 1 },
          { text: '3 hours, 0 miles: $700', group: 0 },
          { text: '1 hour, 5 miles: $400', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A good bug report.',
        template: 'I [[1]] 10 miles. I expected $20 more. It [[2]] $0.',
        blanks: [['typed', 'tried', 'entered'], ['added', 'showed']],
        distractors: ['hoped', 'felt'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Just tell it "the calculator is broken, fix it"?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'It doesn\'t know what\'s broken. I\'ll say what I tried, what I expected and what happened, for each failure.' },
          { text: 'Yes, that\'s enough.', why: 'It will guess what\'s broken and maybe change working parts.' },
          { text: 'I\'ll fix it myself by deleting lines.', why: 'A clear report is faster.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'The brief\'s limits say "don\'t touch index.html". How does Hazel check that?',
        options: [
          { text: 'She can\'t', why: 'Diffs show which files changed.' },
          { text: 'Look at which files the diff says changed' },
          { text: 'Ask Benny', why: 'Look at the change itself.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '2 hours, 0 miles. What should the calculator show? (Number only.)',
        answers: ['550', '$550'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s report will confuse the AI?',
        lines: [
          '10 miles should add $20. It adds $0.',
          'Also it\'s kind of off somehow.',
          'Fix only this. Keep everything else the same.',
        ],
        bug: 1,
        fix: 'Delete it, or say exactly what\'s off.',
        explanation: '"Off somehow" invites random changes.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brief part to how you check it.',
        pairs: [
          ['Goal', 'Does it do the main job?'],
          ['Limits', 'Did it stay inside them?'],
          ['Done when', 'Run that exact example'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review: before checking a change, what\'s the quickest first look?',
        options: [
          { text: 'Read every line of code', why: 'Start with the summary.' },
          { text: 'Skip it', why: 'Ten seconds is worth it.' },
          { text: 'The diff summary: which files, how many lines' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Turn your Chapter 2 brief into a checklist. How many lines does it have? Which one are you least sure passes?',
  },
  deepen: {
    title: 'On your computer: tick your brief',
    summary: 'Write each line of your brief.md as a check with a real example and the expected result. Run every check on your tool. For any failure, send one report: what you tried, what you expected, what happened.',
  },
  notes: 'Acceptance testing against requirements. Fee maths: 2h = $400 + $150 = $550.',
};

export default lesson;
