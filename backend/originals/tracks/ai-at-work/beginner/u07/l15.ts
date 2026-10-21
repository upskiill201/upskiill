import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 15 — Checkpoint 3. Costs, plain numbers, percentages, privacy. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: costs, words and privacy',
  summary: 'Cost tables, plain-English numbers, percentages done right, and data kept private. Show you can handle numbers people will trust.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can explain costs and percentages clearly', 'Show you can use data with AI safely'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. 2am. Nearly there.', replies: ['Ready'] },
        { tey: 'Warm-up: 60% to 75%. How much up?', replies: ['15 points, 25% change'] },
        { tey: 'Say which one. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: 2am, the night before.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Pilot cost 20,000 GHS for 50 shops. Cost per shop?',
        answers: ['400'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Often forgotten, or obvious cost?',
        groups: ['Often forgotten', 'Obvious'],
        items: [
          { text: 'Staff time', group: 0 },
          { text: 'Flyers', group: 1 },
          { text: 'Refunds', group: 0 },
          { text: 'Banner', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which cost line needs a label?',
        lines: ['Flyers: 600 (invoiced)', 'Banner: 400 (paid)', 'Bank fee: 4,000', 'Total: =SUM(B2:B4)'],
        bug: 2,
        fix: 'Bank fee: 4,000 (estimate)',
        explanation: 'Not invoiced yet.',
      },
      {
        kind: 'mcq',
        prompt: 'What comes first when explaining numbers to Carmen?',
        options: [
          { text: 'What they mean' },
          { text: 'Sample sizes', why: 'Meaning first.' },
          { text: 'Jargon', why: 'Plain words.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to plain words.',
        pairs: [
          ['+50%', 'Grew by half'],
          ['4%', 'About 1 in 25'],
          ['+100%', 'Doubled'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Failure rate fell from 5% to 4%. Most precise?',
        options: [
          { text: 'Down 1 percentage point (a fifth)' },
          { text: 'Down 1%', why: 'Ambiguous.' },
          { text: 'Down 4%', why: 'Wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '250 payments to 300. Percent change? (number)',
        answers: ['20', '20%'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the percent change formula.',
        lines: ['New minus old', 'Divide by old', 'Multiply by 100'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Remove before pasting, or keep?',
        groups: ['Remove', 'Keep'],
        items: [
          { text: 'Owner phone', group: 0 },
          { text: 'Shop ID', group: 1 },
          { text: 'ID card number', group: 0 },
          { text: 'Weekly payments', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can the AI write a thank-you to each shop owner by name?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It can write a template with a [name] blank; we\'ll fill names in our own system, so their details stay private.' },
          { text: 'Sure, I\'ll paste the full list.', why: 'Personal data.' },
          { text: 'AI can\'t do thank-yous.', why: 'It can, with a template.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which explanation request is best?',
        options: [
          { text: 'Explain this.', why: 'No audience.' },
          { text: 'Explain this table to a busy marketing director in three plain sentences. Don\'t change any figures.' },
          { text: 'Make it sound big.', why: 'Spin.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Label [[1]]. Use IDs instead of [[2]].',
        blanks: [['estimates'], ['names']],
        distractors: ['jokes', 'numbers'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s notes is wrong?',
        lines: ['400 to 600: up 50%', '60% to 75%: up 15 points', '60% to 75%: up 15%', '5% to 4%: down 1 point'],
        bug: 2,
        fix: '60% to 75%: up 25%',
        explanation: '15 points on 60 is 25%.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the privacy rule.',
        tiles: ['Strip', 'personal', 'details', 'first'],
        distractors: ['never'],
      },
      {
        kind: 'mcq',
        prompt: 'Why use SUM formulas for totals?',
        options: [
          { text: 'They update when costs change' },
          { text: 'They look fancy', why: 'They stay correct.' },
          { text: 'No reason', why: 'Typed totals go stale.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these skills will you use first: costs, plain words, percentages or privacy?',
    starters: ['First:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 7 lessons 11-14.',
};

export default lesson;
