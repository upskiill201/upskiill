import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 17 — research on a deadline. Story: the 45-minute question. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Research on a deadline',
  summary: 'Friday, 2:15. Lucía needs one answer before a 3pm call. Ada has 45 minutes. Here\'s how to research fast without cutting the corners that matter.',
  minutes: 12,
  outcomes: [
    'Plan a 45-minute research sprint',
    'Decide which checks you can\'t skip',
    'Report a fast answer with its confidence level',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The 45-minute question',
      beats: [
        { speaker: 'narrator', text: 'Friday, 2:15. Lucía: "Before my 3pm call: do we need a local company to operate in Ghana? Yes or no."' },
        { speaker: 'ada', text: 'Five minutes with the AI to understand the options. Then straight to the regulator\'s site.' },
        { speaker: 'narrator', text: '2:40. She finds the official guidance, reads the relevant section, and writes a three-line answer.' },
        { speaker: 'ada', text: 'Likely yes, based on the regulator\'s guidance (link). I haven\'t confirmed with a lawyer, so treat it as "probably", not final.' },
        { speaker: 'tey', text: 'Fast and honest. She skipped reading everything. She didn\'t skip the official source, or saying how sure she was.' },
      ],
      choice: {
        prompt: 'With only 45 minutes, what can Ada safely skip?',
        options: [
          { text: 'Reading every article; she can\'t skip the official source or stating her confidence', outcome: 'Yes. Cut breadth, not the checks that matter.', best: true },
          { text: 'The official source; the AI answer is enough', outcome: 'This is exactly the check that can\'t be skipped on a legal question.' },
          { text: 'Saying how sure she is', outcome: 'Without it, Lucía might treat "probably" as "definitely".' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'On a deadline: AI to orient (5 minutes), one strong source for the key fact, and say how sure you are. Cut breadth, not checks.',
    },
  ],
  apply: {
    scenario: 'Ada has 45 minutes before Lucía\'s call.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s 45-minute sprint.',
        lines: ['5 minutes: AI to understand the options', 'Find the official source', 'Read the relevant section', 'Write a short answer with confidence level'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Skip it on a deadline, or never skip?',
        groups: ['Can skip', 'Never skip'],
        items: [
          { text: 'Reading every article', group: 0 },
          { text: 'The official source for a legal question', group: 1 },
          { text: 'A long background section', group: 0 },
          { text: 'Saying how sure you are', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Ada say "probably", not "yes"?',
        options: [
          { text: 'She hadn\'t confirmed with a lawyer, so it wasn\'t final' },
          { text: 'She was nervous', why: 'She was being accurate about confidence.' },
          { text: 'The regulator was unclear', why: 'She hadn\'t had expert confirmation.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I only need a yes or no for the call. Can you drop the "probably"?',
        prompt: 'Best reply?',
        options: [
          { text: 'Say "likely yes, based on the regulator\'s guidance; we\'ll confirm with a lawyer". It\'s still clear, and nobody gets surprised later.' },
          { text: 'OK: yes, definitely.', why: 'Overstates what she knows.' },
          { text: 'I can\'t answer at all.', why: 'She has a useful, honest answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Cut [[1]], not [[2]].',
        blanks: [['breadth'], ['checks']],
        distractors: ['corners', 'sources'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s confidence line.',
        tiles: ['Treat', 'it', 'as', '"probably",', 'not', 'final'],
        distractors: ['definitely'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which 5-minute AI request is best on a deadline?',
        options: [
          { text: 'Do we need a local company in Ghana?', why: 'Gets an answer to check, but not the map.' },
          { text: 'In plain words: what are the usual ways a foreign payments company can operate in Ghana, and which official body\'s guidance decides it?' },
          { text: 'Write a full legal report.', why: 'No time, and not reliable as law.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s answer is the problem?',
        lines: [
          'Likely yes: a local entity is needed.',
          'Source: regulator guidance (link).',
          'Confirmed 100% by our lawyer.',
          'Next: full legal check next week.',
        ],
        bug: 2,
        fix: 'Not yet confirmed by a lawyer.',
        explanation: 'She hasn\'t asked a lawyer; never overstate.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the time budget to the task.',
        pairs: [
          ['First 5 minutes', 'AI to orient'],
          ['Next 25 minutes', 'Find and read the official source'],
          ['Last 5 minutes', 'Write the answer'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did Ada have?',
        answers: ['45', 'forty-five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good fast answer, or risky fast answer?',
        groups: ['Good', 'Risky'],
        items: [
          { text: '"Likely yes (regulator link); lawyer to confirm"', group: 0 },
          { text: '"Yes, the AI said so"', group: 1 },
          { text: '"Not sure yet; I\'ll know by Monday"', group: 0 },
          { text: '"Definitely no" with no source', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a fast answer trustworthy?',
        options: [
          { text: 'One strong source and an honest confidence level' },
          { text: 'Sounding certain', why: 'Certainty isn\'t evidence.' },
          { text: 'Lots of sources skimmed', why: 'One strong source beats many skimmed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When did you last have to answer something fast? What did you skip, and should you have?',
    starters: ['I had to answer...', 'I skipped...'],
  },
  deepen: { title: 'Try it today', summary: 'Next time you\'re rushed, add one line: "How sure I am: high / medium / low, because..."' },
  notes: 'Scenario fictional; legal content illustrative, not advice.',
};

export default lesson;
