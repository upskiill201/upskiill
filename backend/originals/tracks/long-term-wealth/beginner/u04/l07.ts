import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Chat with Tey: growing income through skills and side income. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Grow the top line',
  summary: 'The gap has two sides: spending less and earning more. Emmanuel wants a side hustle. Miracle wonders whether her evening course counts. Tey explains how income really grows over a career.',
  minutes: 12,
  outcomes: [
    'See skills as the biggest long-term investment most people make',
    'Judge a side income idea sensibly',
    'Spot "side hustle" schemes that are really scams',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The gap has two sides. Spending less helps, but there\'s a floor. Earning more has much more room. For most people, the biggest driver of income is skills. Want the three ways income grows?', replies: ['Yes.'] },
        { tey: 'One: get better at your main work. A skill that makes you more valuable can raise your pay for the rest of your career. Miracle\'s evening course in data analysis is exactly that.', replies: ['And two?'] },
        { tey: 'Two: a side income that uses a skill you already have. Emmanuel is good at design; a few small paid projects a month is real money. Keep it legal, declare it for tax, and don\'t let it hurt your main job.', replies: ['And three?'] },
        { tey: 'Three: move to where your skills are paid more, a better-paying role, team or company, when the time is right. Like Miracle\'s honest talk with Folake.', replies: ['What about side hustles online?'] },
        { tey: 'Careful. Anything that asks you to pay to join, recruit others, or promises big money for little work is usually a scam or a pyramid scheme. Real side income comes from doing work people pay for.', replies: ['And the extra money?'] },
        { tey: 'Same rule as a raise: half to future you, automatically. Otherwise more income just becomes more spending.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Skills are usually your biggest long-term investment. Side income should come from work people pay for, never from paying to join. And split extra income like a raise.',
    },
  ],
  apply: {
    scenario: 'Growing income.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each way income grows to its example.',
        pairs: [
          ['Get better at your main work', 'Miracle\'s data course'],
          ['Side income from a skill', 'Emmanuel\'s design projects'],
          ['Move to better-paid work', 'A better role or company'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real side income, or warning sign?',
        groups: ['Real side income', 'Warning sign'],
        items: [
          { text: 'Paid design projects for small businesses', group: 0 },
          { text: '"Pay ₦50,000 to join, then recruit two friends"', group: 1 },
          { text: 'Weekend tutoring', group: 0 },
          { text: '"Earn ₦500,000 a week from your phone, no skills needed"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does earning more have "more room" than spending less?',
        options: [
          { text: 'Spending doesn\'t matter', why: 'It does; it just has a floor.' },
          { text: 'You can only cut spending so far, but skills can raise income a lot over a career' },
          { text: 'Earning is easier', why: 'It\'s about room to grow, not ease.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'A guy online says pay ₦50,000 for his course and I\'ll make ₦1 million a month recruiting people.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Try it, you might get lucky.', why: 'Most people in these schemes lose money.' },
          { text: 'Pay for two courses.', why: 'Double the loss.' },
          { text: 'Pay to join and recruit others? That\'s a pyramid scheme. Your design skills are your real side income.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Real side income.',
        template: 'Real side income comes from doing [[1]] people pay for, never from paying to [[2]].',
        blanks: [['work'], ['join']],
        distractors: ['nothing', 'save'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Emmanuel\'s side income plan needs fixing?',
        lines: [
          'Two design projects a month, evenings only.',
          'Declare the income for tax.',
          'Spend all of it, it\'s just extra.',
        ],
        bug: 2,
        fix: 'Half to future me, automatically.',
        explanation: 'Extra income follows the same split as a raise.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Emmanuel earns ₦120,000 a month from design and saves half. How much does he save in a year?',
        answers: ['720000', '720,000', '₦720,000', '₦720000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What must a side income not do?',
        options: [
          { text: 'Make money', why: 'Making money is the point.' },
          { text: 'Hurt your main job or break your contract' },
          { text: 'Use your skills', why: 'Using your skills is the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Emmanuel starts his side income.',
        lines: ['Pick a skill people pay for', 'Check his contract allows it', 'Find two small clients', 'Save half of what he earns'],
      },
      {
        kind: 'mcq',
        prompt: 'Is Miracle\'s evening course a "wealth habit"?',
        options: [
          { text: 'No, it costs money', why: 'Good skills usually repay their cost many times.' },
          { text: 'Only if it\'s free', why: 'Value matters more than price.' },
          { text: 'Yes: skills raise earning power for decades' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which skill, if you got better at it, would most raise your income over the next five years?',
    starters: ['The skill is...', 'One step this month:...'],
  },
  deepen: {
    title: 'Pyramid schemes',
    summary: 'In a pyramid scheme, money comes mainly from new members joining, not from selling real products or services. Because recruitment can\'t grow forever, most members lose money. The Scams course explains how to spot them.',
  },
  notes: 'General principles only. 60,000 × 12 = 720,000. Pyramid scheme definition: standard consumer-protection framing.',
};

export default lesson;
