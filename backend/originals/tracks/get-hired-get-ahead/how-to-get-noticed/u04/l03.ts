import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 3 — generic vs specific. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Generic vs. specific',
  summary: 'Miracle plays a game: she covers the company name in Clinton\'s letter and asks, "Which company is this for?" He can\'t tell. If you can swap the name and nothing breaks, the letter isn\'t really for anyone.',
  minutes: 11,
  outcomes: ['Use the "swap the name" test', 'Replace generic sentences with specific ones', 'Make a letter clearly about one company'],
  learn: [
    {
      kind: 'compare',
      title: 'The swap-the-name test',
      before: { label: 'Generic', text: 'I am excited to apply to [Company]. [Company] is an innovative leader in its industry, and I admire its commitment to excellence. I am a motivated team player and I believe I would be a great fit for your dynamic team.\n\nSwap in any company name: a bank, a bakery, a phone company. Every sentence still "works". That means it says nothing about this company, or about Clinton.' },
      after: { label: 'Specific', text: 'Njangi Pay turns the exercise books that savings groups have always used into something everyone can trust. My mum\'s njangi argued every month about who had paid until I built them a one-page tracker. Seeing 12 women stop arguing made me want to build that for 200,000 groups.\n\nSwap in "a bank" and it falls apart. That\'s the point: it could only be about Njangi Pay, and only be written by Clinton.' },
      notes: [
        'Test: cover the company name. If the letter still works for anyone, it\'s generic.',
        'Specific beats impressive: one real detail about them, one real story about you.',
        'Words like "innovative", "leader" and "commitment to excellence" say nothing. Name what they actually do.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If you can swap the company name and nothing breaks, rewrite it.',
    },
  ],
  apply: {
    scenario: 'Clinton plays Miracle\'s game.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Passes the swap-the-name test, or fails?',
        groups: ['Specific (passes)', 'Generic (fails)'],
        items: [
          { text: 'Your company is an innovative leader.', group: 1 },
          { text: 'Njangi Pay turns njangi exercise books into something everyone can trust.', group: 0 },
          { text: 'I admire your commitment to excellence.', group: 1 },
          { text: 'Your app sends a reminder before each contribution is due, the exact thing my mum\'s group needed.', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the swap-the-name test check?',
        options: [
          { text: 'Whether you spelled the name right', why: 'Spelling matters too, but this test is about being specific.' },
          { text: 'Whether the letter is really about this company' },
          { text: 'Whether the letter is long enough', why: 'Length isn\'t the test.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the generic sentence.',
        lines: ['My mum\'s njangi argued every month about who had paid.', 'I would be a great fit for your dynamic team.', 'Njangi Pay is building that for 200,000 groups.'],
        bug: 1,
        explanation: 'Works for any company. Replace it with something about Njangi Pay.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'I\'ve covered the name. Which company is your letter for?',
        options: [
          { text: 'Any of them, that\'s the beauty of it!', why: 'That\'s the problem, not the beauty.' },
          { text: 'It\'s for whoever hires me.', why: 'Then it\'s for no one in particular.' },
          { text: 'Fair, you can\'t tell. I\'ll add what Njangi Pay actually does and why it matters to me.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each generic phrase to a specific replacement.',
        pairs: [
          ['An innovative leader', 'Turns njangi exercise books into a trusted app'],
          ['A great fit for your team', 'I\'ve built a small version of what you build'],
          ['Commitment to excellence', 'Reminders before each contribution is due'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence only Clinton could write?',
        options: [
          { text: '"I am passionate about technology."', why: 'Anyone could write it.' },
          { text: '"Seeing 12 women stop arguing over an exercise book made me want to build this for 200,000 groups."' },
          { text: '"I believe in hard work."', why: 'Anyone could write it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Specific beats [[1]]: one real detail about them, one real [[2]] about you.',
        blanks: [['impressive'], ['story']],
        distractors: ['short', 'adjective', 'grade'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle\'s test: cover or swap the company ___. (one word)',
        answers: ['name'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Empty phrase, or real detail?',
        groups: ['Empty phrase', 'Real detail'],
        items: [
          { text: 'Industry leader', group: 0 },
          { text: 'Used by 200,000 savings groups', group: 1 },
          { text: 'World-class', group: 0 },
          { text: 'Launched contribution reminders this year', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "specific" more convincing than "impressive"?',
        options: [
          { text: 'It shows you really know them and really did the thing' },
          { text: 'It\'s shorter', why: 'Not always. It\'s about being real.' },
          { text: 'Recruiters dislike big words', why: 'They dislike empty ones. Specific details prove you mean it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write one sentence about a company you like that would break if you swapped in another name.',
    starters: ['___ is the only company that...', 'It matters to me because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take any cover letter (yours or an example online), cover the company name, and highlight every sentence that would still work for another company. Rewrite one.',
  },
  notes: 'The "swap the name" test is a common careers-coach heuristic for tailoring. Njangi Pay\'s features (reminders, 200,000 groups) are fictional.',
};

export default lesson;
