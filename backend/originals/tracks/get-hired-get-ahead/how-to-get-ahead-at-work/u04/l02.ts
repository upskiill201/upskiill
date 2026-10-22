import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 2 — what a career development plan is, and why if-then plans help. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a career plan is',
  summary: 'Clinton imagines a career plan as a ten-year map with every job title written in. Miracle laughs: hers changed four times. Here\'s what a useful plan actually looks like.',
  minutes: 12,
  outcomes: ['Describe a one-page career plan', 'Explain why plans should be updated', 'Use if-then steps to act on a plan'],
  learn: [
    {
      kind: 'reading',
      title: 'A plan, not a prophecy',
      html:
        '<p>A useful career development plan usually fits on <strong>one page</strong> and answers four questions:</p>' +
        '<ul><li><strong>Direction:</strong> roughly where you\'re heading in two or three years, and why.</li>' +
        '<li><strong>Skills:</strong> the two or three skills that would move you that way.</li>' +
        '<li><strong>Experiences:</strong> projects, roles or people that would build those skills.</li>' +
        '<li><strong>Next steps:</strong> what you\'ll do in the next three months.</li></ul>' +
        '<p>It\'s a <strong>hypothesis, not a prophecy</strong>. You\'ll learn things that change it, and that\'s the point. Review it every few months.</p>' +
        '<p>Research on goals offers one practical trick. Psychologist Peter Gollwitzer studied <strong>implementation intentions</strong>: plans written as "If X happens, then I\'ll do Y." Across many studies, people who make if-then plans tend to follow through on their goals more often than people who only state the goal. For example: "If it\'s the first Tuesday of the month, then I\'ll review my plan in my 1:1."</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Direction, skills, experiences, next steps. One page. Update it. Turn steps into "If X, then Y".',
    },
  ],
  apply: {
    scenario: 'Miracle explains career plans.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the plan\'s four parts in order.',
        lines: ['Direction', 'Skills', 'Experiences', 'Next steps'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a career plan a "hypothesis, not a prophecy"?',
        options: [
          { text: 'It must never change', why: 'It should change as you learn.' },
          { text: 'You\'ll learn things that change it, and that\'s expected' },
          { text: 'It\'s a guess you ignore', why: 'You use it and update it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the plan?',
        groups: ['Skills', 'Next steps'],
        items: [
          { text: 'Learn to run user interviews', group: 0 },
          { text: 'Talk to two product managers this month', group: 1 },
          { text: 'Writing clear product specs', group: 0 },
          { text: 'Join one discovery workshop in May', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to an example.',
        pairs: [
          ['Direction', 'Towards building products people rely on'],
          ['Experiences', 'Lead the sync-service split'],
          ['Next steps', 'Two conversations this month'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My plan changed four times, Miracle says hers did too. So what\'s the point?',
        options: [
          { text: 'There\'s no point.', why: 'It guides choices; changing is expected.' },
          { text: 'Never change it.', why: 'Update it as you learn.' },
          { text: 'It guides choices now, and changing it as I learn is how it\'s meant to work.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak plan line.',
        lines: ['Direction: products people rely on.', 'Next steps: be successful.', 'Skills: user interviews, product specs.'],
        bug: 1,
        explanation: 'Too vague to act on. Name what you\'ll do in three months.',
      },
      {
        kind: 'mcq',
        prompt: 'What is an implementation intention?',
        options: [
          { text: 'An "If X, then I\'ll do Y" plan' },
          { text: 'A job title', why: 'An if-then plan.' },
          { text: 'A promise to a manager', why: 'An if-then plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is a good if-then plan?',
        options: [
          { text: '"I\'ll review it sometime."', why: 'No trigger. Use if-then.' },
          { text: '"I hope to grow."', why: 'Not a plan.' },
          { text: '"If it\'s the first Tuesday of the month, then I\'ll review my plan in my 1:1."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the if-then plan.',
        template: '[[1]] it\'s Friday, [[2]] I\'ll write my impact line.',
        blanks: [['If'], ['then']],
        distractors: ['Maybe', 'never', 'Unless'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages should a career plan usually be? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write one "If X, then I\'ll do Y" plan for something you want to do this month.',
    starters: ['If...', 'then I\'ll...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "implementation intentions Gollwitzer". Notice how simple if-then plans help people act on goals.',
  },
  notes: 'Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist 54(7); meta-analysis Gollwitzer & Sheeran (2006). Kept qualitative ("tend to follow through more often").',
};

export default lesson;
