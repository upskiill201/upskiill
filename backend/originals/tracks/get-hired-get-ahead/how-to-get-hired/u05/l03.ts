import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 3 — salary-only thinking vs. whole-offer thinking. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Two offers, one table',
  summary: 'Kmer offers 280,000 francs. Njangi Pay offers 300,000. "Easy," says David. "Take the bigger number." Miracle draws a table instead.',
  minutes: 11,
  outcomes: ['Compare two offers on more than salary', 'Use a simple comparison table', 'Notice what matters to you'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to compare',
      before: { label: 'Bigger number wins', text: 'Kmer: 280,000. Njangi Pay: 300,000. Njangi Pay wins.\n\nFast, but it ignores everything else: who he\'d learn from, the contract, the review date, the commute, what he wants in three years.' },
      after: { label: 'The whole table', text: 'Pay: Kmer 280k, Njangi 300k.\nLearning: Kmer: he\'d be the only developer. Njangi: a team, and Ngozi as manager.\nContract: Kmer: fixed one year. Njangi: permanent, six-month probation.\nReview: Kmer: none mentioned. Njangi: after probation.\nCommute: Kmer 20 min. Njangi 50 min.\n\nNow he can see what he\'s really choosing between.' },
      notes: [
        'Put both offers in one table, row by row.',
        'Include learning, contract, review date and daily life, not just pay.',
        'Mark the rows that matter most to you.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One table, row by row. Pay is one row, not the whole decision.',
    },
  ],
  apply: {
    scenario: 'Clinton compares Kmer and Njangi Pay.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "bigger number wins"?',
        options: [
          { text: 'It ignores learning, contract, growth and daily life' },
          { text: 'Nothing, pay is all that matters', why: 'Pay is one row.' },
          { text: 'Numbers are confusing', why: 'It\'s about what\'s left out.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Better at Kmer, or at Njangi Pay?',
        groups: ['Kmer', 'Njangi Pay'],
        items: [
          { text: 'Shorter commute', group: 0 },
          { text: 'A team to learn from', group: 1 },
          { text: 'Permanent contract', group: 1 },
          { text: 'He knows the boss already', group: 0 },
          { text: 'Salary review after probation', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each row to Njangi Pay\'s entry.',
        pairs: [
          ['Learning', 'A team, and Ngozi as manager'],
          ['Contract', 'Permanent, six-month probation'],
          ['Commute', '50 minutes'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Bro, just take the bigger number. Done.',
        options: [
          { text: 'Pay matters, but so does who I learn from and the contract. Let me do the whole table.' },
          { text: 'You\'re right, done.', why: 'Compare the whole offer.' },
          { text: 'I\'ll take the smaller one to be humble.', why: 'Compare properly.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the row Clinton forgot.',
        lines: ['Pay: 280k vs 300k.', 'Commute: 20 vs 50 minutes.', '(no row for learning or contract)'],
        bug: 2,
        explanation: 'Learning and contract can matter more than 20,000 francs.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the comparison steps in order.',
        lines: ['Put both offers in one table', 'Fill every row', 'Mark the rows that matter most', 'Decide'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which row matters most for Clinton\'s first job?',
        options: [
          { text: 'It depends on him, but learning is a strong candidate' },
          { text: 'Always the commute', why: 'It depends; learning often matters most early on.' },
          { text: 'Always the title', why: 'It depends on what matters to him.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Pay is one [[1]], not the whole [[2]].',
        blanks: [['row'], ['decision']],
        distractors: ['job', 'salary', 'contract'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What monthly salary did Kmer offer, in francs? (a number)',
        answers: ['280000', '280,000', '280 000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth a row in the table, or not?',
        groups: ['Worth a row', 'Not worth it'],
        items: [
          { text: 'Who you\'d learn from', group: 0 },
          { text: 'The office wallpaper', group: 1 },
          { text: 'Contract type', group: 0 },
          { text: 'Review date', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which rows would you add to your own comparison table? Which one would matter most?',
    starters: ['I\'d add...', 'Most important:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Draw a comparison table for any two choices you\'re facing (jobs, courses, places). Mark the three rows that matter most.',
  },
  notes: 'Offer details are story numbers. Contract types and norms vary by country.',
};

export default lesson;
