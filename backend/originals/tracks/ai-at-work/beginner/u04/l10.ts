import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 10 — Checkpoint 2. Out-of-date answers, bias, fluency, second opinions. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: stale, slanted and smooth',
  summary: 'Old facts, biased drafts, answers that only sound right, and second opinions. Show you can handle all four.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can catch stale and biased answers', 'Show you can test a fluent answer'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. Stale facts, bias, smooth answers and second opinions.', replies: ['Let\'s go'] },
        { tey: 'Warm-up: two AI tools give the same fee. Proof?', replies: ['No', 'Check the provider\'s page'] },
        { tey: 'Right on both. Agreement points you nowhere new. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the Ghana plan review.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Check today\'s version, or fairly stable?',
        groups: ['Check today', 'Stable'],
        items: [
          { text: 'Transfer fees', group: 0 },
          { text: 'Exchange rate', group: 0 },
          { text: 'Ghana\'s capital', group: 1 },
          { text: 'How to calculate a percentage', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might an AI give last year\'s fee?',
        options: [
          { text: 'Its training data stops at a cut-off date' },
          { text: 'It prefers old numbers', why: 'It simply doesn\'t know newer ones.' },
          { text: 'Fees never change', why: 'They do.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which persona line fails the swap test?',
        lines: [
          'Kofi, 40, pays rent by phone',
          'Ama, 28, runs a fabric stall',
          'Esi, 52, is too old to learn apps',
          'Yaw, 23, studies in Kumasi',
        ],
        bug: 2,
        fix: 'Esi, 52, pays school fees by phone.',
        explanation: 'An age stereotype. Base personas on real users.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trap to the fix.',
        pairs: [
          ['Stale fact', 'Check the official current page'],
          ['Biased draft', 'Swap test and real data'],
          ['Fluent but unchecked', 'Would I bet on this?'],
          ['Agrees with me', 'Ask for the opposite view'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'This AI summary says exactly what I hoped. Ship it?',
        prompt: 'Best reply?',
        options: [
          { text: 'Let\'s ask for the strongest case against first, then check the key facts.' },
          { text: 'Yes, it agrees with you.', why: 'That\'s when to be most careful.' },
          { text: 'No, delete it.', why: 'Test it rather than throw it away.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the follow-up for a changing fact.',
        tiles: ['When', 'was', 'this', 'true?'],
        distractors: ['Why?'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: '[[1]] is not true. [[2]] between answers is not proof.',
        blanks: [['Fluent'], ['Agreement']],
        distractors: ['Short', 'Silence'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the second-opinion routine.',
        lines: ['New chat', 'Flip the question', 'Self-critique', 'Check where answers differ'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives fairer personas?',
        options: [
          { text: 'Make typical customers.', why: '"Typical" invites stereotypes.' },
          { text: 'Make personas from this real user summary. Match its mix of age, gender, region and language. No stereotypes about ability.' },
          { text: 'Make personas quickly.', why: 'Speed doesn\'t help fairness.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence or persuasive words?',
        groups: ['Evidence', 'Persuasive'],
        items: [
          { text: '"Obviously"', group: 1 },
          { text: '"Central bank report, p.12"', group: 0 },
          { text: '"Experts agree"', group: 1 },
          { text: '"Our pilot: 70% weekly active"', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Easy-to-read information feels truer: processing ... (one word)',
        answers: ['fluency'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Two answers disagree on one point. Which should Ada check first?',
        lines: ['Both: Accra first', 'A: licence needed / B: no licence', 'Both: 6 months', 'Both: $40,000'],
        bug: 1,
        fix: 'Check licensing with an official source or expert.',
        explanation: 'Disagreement plus high stakes.',
      },
      {
        kind: 'mcq',
        prompt: 'Who might be missing from personas that "all live in Accra"?',
        options: [
          { text: 'Users in other regions, like Kumasi or Tamale' },
          { text: 'Nobody', why: 'Ghana is bigger than Accra.' },
          { text: 'Only children', why: 'Other regions are missing.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Our AI tool can browse the web, so its fees are current, right?',
        prompt: 'Best reply?',
        options: [
          { text: 'Probably closer, but let\'s check the date on the page it used.' },
          { text: 'Yes, always.', why: 'Web pages can be old.' },
          { text: 'Browsing makes it less accurate.', why: 'It helps, but still check dates.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth a second opinion?',
        groups: ['Worth it', 'Not needed'],
        items: [
          { text: 'A licensing rule', group: 0 },
          { text: 'A cost estimate for the CEO', group: 0 },
          { text: 'A friendly sign-off', group: 1 },
          { text: 'A team lunch message', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which trap are you most likely to fall into: stale facts, bias, fluency or agreement?',
    starters: ['Most likely for me:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 4 lessons 6-9. All figures and personas fictional.',
};

export default lesson;
