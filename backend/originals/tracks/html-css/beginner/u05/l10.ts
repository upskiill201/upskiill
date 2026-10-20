import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (contrast, WCAG, rem, type scale). Story beat: Grandma's phone. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Grandma approves',
  summary: 'Kofi hands his phone to Grandma, big text and all. This time the page grows with her setting, and she can read every word. "Book me," she reads out loud, and laughs. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Fix colour pairs that fail contrast', 'Set sizes in rem', 'Use a small type scale'],
  learn: [
    {
      kind: 'story',
      title: 'Big text, readable page',
      beats: [
        { speaker: 'narrator', text: 'Grandma holds the phone at arm\'s length. The text is big. Nothing is cut off. The Book me button is dark text on orange.' },
        { speaker: 'kofi', text: 'She can read it. Ama can read it in the sun. That\'s everyone I asked.' },
        { speaker: 'tey', text: 'Readable colours, sizes that follow the reader. One more style job, fonts, and then we put it online.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: readable for everyone.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix the button so it passes: night blue #14213D text on the orange #FF9600, and size it 1rem',
        starter: '<style>\n  p { background-color: #FF9600; color: white; font-size: 12px; }\n</style>\n<p>Book me</p>\n',
        solution: '<style>\n  p { background-color: #FF9600; color: #14213D; font-size: 1rem; }\n</style>\n<p>Book me</p>\n',
        hint: 'Change white to #14213D and 12px to 1rem.',
        checks: [
          { message: 'Night blue text', dom: { selector: 'p', style: 'color', styleValue: '#14213D' } },
          { message: 'Still orange', dom: { selector: 'p', style: 'background-color', styleValue: '#FF9600' } },
          { message: 'Size in rem', dom: { selector: 'p', style: 'font-size', styleValue: '1rem' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes for normal text (4.5 to 1), or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Cream on night blue', group: 0 },
          { text: 'White on orange', group: 1 },
          { text: 'Night blue on orange', group: 0 },
          { text: 'Pink on white', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With the usual 16px root, how big is this?',
        code: 'h1 { font-size: 2.5rem; }',
        language: 'css',
        options: [
          { text: '40px' },
          { text: '25px', why: '2.5 × 16 = 40.' },
          { text: '2.5px', why: 'rem multiplies the root size.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the size that ignores the reader\'s setting.',
        language: 'css',
        lines: ['body { font-size: 1rem; }', 'h2 { font-size: 24px; }', 'small { font-size: 0.875rem; }'],
        bug: 1,
        explanation: 'px is fixed. Use 1.5rem to match the scale and follow the reader.',
        fix: 'h2 { font-size: 1.5rem; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'The pink looks so good on night blue. Can the small "Free to listen" line be pink?',
        options: [
          { text: 'It\'s just under 4.5 to 1, so too faint for small text. Keep pink for a big label; small print stays cream.' },
          { text: 'Sure, it looks good.', why: 'Small print needs 4.5 to 1.' },
          { text: 'Make it even smaller.', why: 'Smaller needs more contrast.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to what it means.',
        pairs: [
          ['Contrast ratio', 'How different two colours look'],
          ['rem', 'A size that follows the reader'],
          ['WCAG', 'The web\'s accessibility guidelines'],
          ['Type scale', 'A few planned sizes'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why shouldn\'t colour be the only thing that shows a link?',
        options: [
          { text: 'Some people can\'t see the colour difference' },
          { text: 'Links can\'t have colours', why: 'They can. Just don\'t rely only on colour.' },
          { text: 'It makes pages slow', why: 'It\'s about people who can\'t see the difference.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s scale.',
        language: 'css',
        template: 'body { font-size: [[1]]rem; }\nh2 { font-size: 1.5[[2]]; }',
        blanks: [['1'], ['rem']],
        distractors: ['16', 'px', 'pt'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What contrast ratio does normal text need, at least? (a number, to 1)',
        answers: ['4.5', '4.5 to 1', '4.5:1'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps for checking a colour pair in order.',
        lines: ['Copy the text and background codes', 'Paste them into a contrast checker', 'Read the ratio', 'Fix the pair if it\'s under 4.5 to 1'],
      },
    ],
  },
  reflect: {
    prompt: 'Hand your page to someone else today. What did they struggle to read?',
    starters: ['They struggled with...', 'I\'ll fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every colour pair on your page with a contrast checker, and switch every px font size to rem.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
