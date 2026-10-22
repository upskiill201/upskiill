import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 18 — Ada's trust-but-verify routine. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your trust-but-verify routine',
  summary: 'Everything in this unit, folded into one short routine Ada runs on anything AI helped with. Tap each step.',
  minutes: 12,
  outcomes: [
    'Use a five-step trust-but-verify routine',
    'Link each step to a lesson in this unit',
    'Adjust the routine to the stakes',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s trust-but-verify routine',
      text: '1. Stakes: what happens if this is wrong? 2. Sources: open every source, find every claim. 3. Numbers and dates: recalculate and check the calendar. 4. Fresh and fair: is it current, and does it pass the swap test? 5. Pre-send: names, numbers, dates, promises, leftovers, tone.',
      hotspots: [
        { phrase: 'what happens if this is wrong?', note: 'Lesson 12: match the check to the stakes.' },
        { phrase: 'open every source', note: 'Lessons 1 and 2: a citation is a lead, not proof.' },
        { phrase: 'recalculate', note: 'Lessons 3 and 4: redo the maths and ask for the working.' },
        { phrase: 'swap test', note: 'Lessons 6 and 7: stale facts and bias.' },
        { phrase: 'leftovers', note: 'Lesson 11: the six pre-send checks.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Stakes, sources, numbers, fresh and fair, pre-send. Low stakes: steps 1 and 5. High stakes: all five, plus an expert.',
    },
  ],
  apply: {
    scenario: 'Ada runs her routine on three tasks.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the routine.',
        lines: ['Stakes', 'Sources', 'Numbers and dates', 'Fresh and fair', 'Pre-send'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the lesson.',
        pairs: [
          ['Stakes', 'High-stakes vs low-stakes'],
          ['Sources', 'Made-up facts and fake sources'],
          ['Fresh and fair', 'Out-of-date answers and bias'],
          ['Pre-send', 'What to always check before sending'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which steps does this task need?',
        groups: ['Steps 1 and 5 only', 'All five'],
        items: [
          { text: 'A thank-you message to a colleague', group: 0 },
          { text: 'The launch budget for Lucía\'s CEO', group: 1 },
          { text: 'A team lunch poll', group: 0 },
          { text: 'Market figures for the board', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does step 4, "fresh and fair", check?',
        options: [
          { text: 'Whether the font is modern', why: 'Currency and fairness.' },
          { text: 'Whether it\'s current, and whether it passes the swap test' },
          { text: 'Whether it\'s short', why: 'Currency and fairness.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your routine sounds slow. Do you do all five for every email?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, every single one.', why: 'Match the effort to the stakes.' },
          { text: 'No, I skip it when I\'m busy.', why: 'Busy is when mistakes happen.' },
          { text: 'No. Quick messages get steps 1 and 5, about ten seconds. The full routine is for things people will rely on.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the routine.',
        template: 'Stakes, [[1]], numbers, fresh and [[2]], pre-send.',
        blanks: [['sources'], ['fair']],
        distractors: ['fonts', 'fast'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s notes for the board figures. Which step went wrong?',
        lines: ['Stakes: high', 'Sources: skipped, no time today', 'Numbers: recalculated', 'Pre-send: done'],
        bug: 1,
        fix: 'Sources: every source opened, every claim found.',
        explanation: 'For high stakes, sources can\'t be skipped.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the routine\'s first question.',
        tiles: ['What', 'happens', 'if', 'this', 'is', 'wrong?'],
        distractors: ['Who'],
      },
      {
        kind: 'mcq',
        prompt: 'What extra step do high-stakes tasks need?',
        options: [
          { text: 'A qualified human expert' },
          { text: 'A second AI tool only', why: 'Agreement isn\'t proof.' },
          { text: 'Nothing extra', why: 'High stakes need an expert.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step catches this?',
        groups: ['Sources', 'Pre-send'],
        items: [
          { text: 'A report that doesn\'t exist', group: 0 },
          { text: '"[Insert name]" left in an email', group: 1 },
          { text: 'A quote nobody said', group: 0 },
          { text: 'A promise nobody approved', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are in Ada\'s routine?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why fold everything into one routine?',
        options: [
          { text: 'To impress Tobi', why: 'It\'s about using it daily.' },
          { text: 'It replaces thinking', why: 'It supports thinking.' },
          { text: 'A short routine is easy to remember and use every day' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own version of the routine for your job. Which step will matter most for you?',
    starters: ['My routine:', 'The step that matters most:'],
  },
  deepen: { title: 'Try it today', summary: 'Put the five steps somewhere you\'ll see them: a sticky note, a phone note, or your email signature drafts.' },
  notes: 'Summary of Unit 4.',
};

export default lesson;
