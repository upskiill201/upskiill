import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 18 — read a great graduate CV, part by part. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Read a great graduate CV',
  summary: 'Mrs Ewane keeps one CV in her drawer: from a former student, Ngum Fru, who landed a graduate accounting role in Douala last year. "Every year I show this one." Tap each part to see why.',
  minutes: 12,
  outcomes: ['Recognise every part of a strong graduate CV', 'See how a non-technical CV uses the same rules', 'Borrow the structure for your own'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Ngum\'s CV',
      text: 'NGUM FRU\nDouala · ngum.fru@email.com · linkedin.com/in/ngumfru\nAccounting graduate who keeps money organised and honest. Ran a netball club\'s accounts for a season and closed with a 40,000-franc surplus.\nEDUCATION\nBSc Accounting, University of Buea · graduated June · Final-year project: cash-flow model for a family bakery\nEXPERIENCE\nTreasurer, UB Netball Club · Sept to May\n- Built the club\'s first cash book; every payment traceable for the first time\n- Cut overdue member fees from 14 to 2 by sending monthly reminders\nSKILLS\nExcel (advanced formulas, pivot tables) · Sage (basic) · English (native), French (intermediate)',
      hotspots: [
        { phrase: 'NGUM FRU', note: 'Name first and biggest. No "Curriculum Vitae" title.' },
        { phrase: 'Accounting graduate who keeps money organised and honest.', note: 'A profile, not an objective: who she is, in plain words.' },
        { phrase: 'closed with a 40,000-franc surplus', note: 'Proof with a number in line two. If Brenda stopped here, she\'d still remember it.' },
        { phrase: 'Final-year project: cash-flow model for a family bakery', note: 'Education that adds proof: a real project, not just a degree name.' },
        { phrase: 'Cut overdue member fees from 14 to 2', note: 'The bullet formula: strong verb, what she did, result with before and after.' },
        { phrase: 'Sage (basic)', note: 'An honest level. "Basic" is fine. It\'s true, and it shows she\'s started.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Notice what\'s missing: no photo, no objective, no skill bars, no hobbies, no "references available". Everything left is proof.',
    },
  ],
  apply: {
    scenario: 'Clinton studies Ngum\'s CV.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Ngum\'s CV to the lesson it shows.',
        pairs: [
          ['Two-line profile with a number', 'The top third'],
          ['Cut overdue fees from 14 to 2', 'The bullet formula'],
          ['Sage (basic)', 'Honest skill levels'],
          ['Nothing without proof', 'Simple beats fancy'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Ngum\'s education line stronger than "BSc Accounting"?',
        options: [
          { text: 'It adds a real project: a cash-flow model for a family bakery' },
          { text: 'It\'s longer', why: 'The project is the proof, not the length.' },
          { text: 'It includes her grades', why: 'It doesn\'t list grades. It adds a project.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'On Ngum\'s CV, or missing on purpose?',
        groups: ['On her CV', 'Missing on purpose'],
        items: [
          { text: 'A two-line profile', group: 0 },
          { text: 'A Career Objective', group: 1 },
          { text: 'Achievement bullets with numbers', group: 0 },
          { text: 'A skills wheel', group: 1 },
          { text: 'Hobbies: reading, music', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line would weaken Ngum\'s CV if she added it?',
        lines: ['Built the club\'s first cash book.', 'Detail-oriented, hardworking team player.', 'Excel (advanced formulas, pivot tables).'],
        bug: 1,
        explanation: 'Adjectives. Her bullets already show all three.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Ngum isn\'t in tech. Can I really copy her structure?',
        options: [
          { text: 'Yes: the rules are the same in every field. Proof first, formula bullets, honest levels, clean layout.' },
          { text: 'No, tech CVs are totally different.', why: 'Same rules. Different proof.' },
          { text: 'I\'ll copy her words too.', why: 'Borrow the structure, not the words.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which bullet in Ngum\'s style fits Clinton?',
        options: [
          { text: '"Built a payment tracker for a 12-member savings group, ending monthly disputes; adopted by a second group of 30."' },
          { text: '"Good at apps."', why: 'No verb, no proof.' },
          { text: '"Responsible for a tracker."', why: 'A duty, not an achievement.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngum\'s bullet.',
        template: 'Cut overdue member fees from [[1]] to [[2]] by sending monthly reminders.',
        blanks: [['14', 'fourteen'], ['2', 'two']],
        distractors: ['100', '40', 'zero'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ngum\'s honest level for Sage? (one word)',
        answers: ['basic'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ngum\'s CV sections in order.',
        lines: ['Name and contact', 'Profile', 'Education', 'Experience', 'Skills'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Tey say is left on the page once the clutter is gone?',
        options: [
          { text: 'Only proof' },
          { text: 'Only adjectives', why: 'Adjectives were cut.' },
          { text: 'Mostly white space', why: 'Some space helps, but what\'s left is proof.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of Ngum\'s CV would be easiest for you to copy the structure of? Which would be hardest?',
    starters: ['Easiest: ...', 'Hardest: ... because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write one bullet for your own CV in exactly Ngum\'s style: verb, what you did, a before-and-after number.',
  },
  notes: 'Ngum Fru (classmate from Ch1 l17; surname from Ch3 l14) is a named extra; her CV is fictional. 40,000 XAF surplus and 14→2 overdue fees are story details. Sage is a common accounting software family.',
};

export default lesson;
