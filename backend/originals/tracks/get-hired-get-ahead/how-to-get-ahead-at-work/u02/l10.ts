import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: the two-week goals review. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the goals review',
  summary: 'The two-week goals review. Ngozi puts up the numbers: failed confirmations down from 8% to 6.5%. Then she asks the team a few questions, and looks at Clinton first. Goals docs, priorities, "not now", and visible work.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use a goals doc to choose work', 'Prioritise and say "not now"', 'Make work visible usefully'],
  learn: [
    {
      kind: 'story',
      title: 'The numbers',
      beats: [
        { speaker: 'narrator', text: 'Goals review. A slide: failed confirmations 8% → 6.5%. Support calls down a quarter. Crashes on 2 GB phones down sharply.' },
        { speaker: 'ngozi', text: 'Good progress. Clinton, you first: a few questions on how we\'re choosing work.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the goals review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line of a goals doc tells you what to skip?',
        options: [
          { text: 'Goal 1', why: 'That\'s what to work on.' },
          { text: 'The "not this quarter" line' },
          { text: 'The owner', why: 'The "not this quarter" line.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each box to what to do.',
        pairs: [
          ['Urgent and important', 'Do it now'],
          ['Important, not urgent', 'Schedule it'],
          ['Urgent, not important', 'Handle quickly or hand off'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good "not now" in order.',
        lines: ['Show you understand', 'Be honest about priorities', 'Offer an alternative', 'Escalate if needed', 'Follow up'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful update, or bragging?',
        groups: ['Useful', 'Bragging'],
        items: [
          { text: 'Crashes down; support can stop suggesting restarts', group: 0 },
          { text: 'I\'m the only one who could', group: 1 },
          { text: 'Thanks to Paul for the pattern', group: 0 },
          { text: 'It took me forever, I\'m so dedicated', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the priority mistake.',
        lines: ['Two hours each morning on Goal 1.', 'Builds the "not this quarter" app redesign in secret.', 'Checks messages at 11 and 3.'],
        bug: 1,
        explanation: 'It\'s marked "not this quarter". Save the idea.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Ngozi.',
        from: 'ngozi',
        message: 'Someone asks you for a dashboard that\'s not on our goals. What do you do?',
        options: [
          { text: 'Say yes and work late.', why: 'A resentful yes hurts everyone.' },
          { text: 'Ignore them.', why: 'Kind "not now" with an alternative.' },
          { text: 'Thank them, explain our focus, offer a 20-minute walkthrough, and check with you if they push.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What always breaks a focus block?',
        options: [
          { text: 'A production problem' },
          { text: 'A meeting invite', why: 'That can wait.' },
          { text: 'An interesting article', why: 'That can wait.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the progress.',
        template: 'Failed confirmations: [[1]]% down to [[2]]%.',
        blanks: [['8'], ['6.5']],
        distractors: ['50', '0', '100'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the target for failed confirmations this quarter, in percent? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Important or just urgent-looking?',
        groups: ['Important', 'Urgent-looking'],
        items: [
          { text: 'Failed-confirmation analysis', group: 0 },
          { text: '"URGENT" typo in a slide', group: 1 },
          { text: 'Lighter sync design', group: 0 },
          { text: 'A meeting he doesn\'t need', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who should decide when two priorities clash?',
        options: [
          { text: 'Whoever asks last', why: 'The manager decides trade-offs.' },
          { text: 'Nobody', why: 'The manager.' },
          { text: 'The manager' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one change you\'ll make to how you choose work next week?',
    starters: ['I\'ll...', 'Instead of...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Sort next week\'s tasks into the four boxes. Block time for one important, not urgent task.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
