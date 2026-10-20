import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 11 — story choice: the APM offer pays less than Developer, at first. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The pay dip',
  summary: 'Aïcha offers Clinton the associate PM role. Then Brenda explains the pay: the APM band starts slightly below where he is now as a Developer. It\'s a step sideways in money, and forward in direction. What does he do?',
  minutes: 11,
  outcomes: ['Weigh a short-term pay trade-off against long-term direction', 'Negotiate a career-change offer honestly', 'Decide using your values'],
  learn: [
    {
      kind: 'story',
      title: 'The numbers',
      beats: [
        { speaker: 'brenda', text: 'Congratulations, the panel would love you as APM. One honest note: the APM band starts a little below your current Developer pay. We can talk about where you\'d sit in it.' },
        { speaker: 'clinton', text: '(to himself) Less money, for the job I actually want. My mum is going to ask about this.' },
        { speaker: 'tey', text: 'Career changes sometimes mean a short-term dip, because you\'re newer in the new field. It\'s a real cost. Weigh it against your values and plan, and negotiate the details honestly.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Ask to keep his current pay, with his offline expertise as the reason, and a six-month review in the new role.',
            outcome: 'Brenda checks: they can match his current pay within the band, with a review at six months. Same money, his chosen direction, and a clear next step.',
            best: true,
          },
          {
            text: 'Turn it down immediately over the money.',
            outcome: 'He keeps his salary, and loses the role his whole plan pointed to. A year later, he\'s still wondering.',
          },
          {
            text: 'Accept without asking anything.',
            outcome: 'He takes the pay cut he might not have needed to take, and starts the new role a little resentful.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A change can mean a short-term dip. Weigh it against your direction, then negotiate honestly with a reason.',
    },
  ],
  apply: {
    scenario: 'The APM offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why might a career change mean a pay dip?',
        options: [
          { text: 'You\'re newer in the new field' },
          { text: 'The company is unfair', why: 'It\'s because you\'re newer there.' },
          { text: 'It never does', why: 'It sometimes does.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Thank them and show enthusiasm', 'Ask where he\'d sit in the band', 'Give his reason: offline expertise', 'Ask for current pay plus a six-month review'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good negotiation reason, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Offline expertise few PMs have', group: 0 },
          { text: 'My mum will be upset', group: 1 },
          { text: 'I can contribute from week one', group: 0 },
          { text: 'I deserve it', group: 1 },
          { text: 'A year of user research and specs', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to Brenda.',
        from: 'clinton',
        message: 'How do I ask about the pay?',
        options: [
          { text: '"I\'m really excited. Given my offline expertise, could we match my current pay within the band, with a review at six months?"' },
          { text: '"Then no."', why: 'Negotiate first.' },
          { text: '"Fine, whatever." (resentful)', why: 'Ask honestly with a reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would hurt the negotiation.',
        lines: ['I\'m really excited about the role.', 'Pay me double or I stay a developer.', 'Could we review at six months?'],
        bug: 1,
        explanation: 'An ultimatum, far outside the band.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Negotiate with a reason', 'Same pay, his direction'],
          ['Refuse over money', 'Still wondering a year later'],
          ['Accept without asking', 'A cut he might not have needed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which value helps Clinton decide here?',
        options: [
          { text: 'Building things people rely on, with "enough" money' },
          { text: 'An impressive title', why: 'That\'s ranked last.' },
          { text: 'The highest salary possible', why: 'He values "enough".' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Weigh it against your [[1]]. Negotiate with a [[2]].',
        blanks: [['direction', 'values'], ['reason']],
        distractors: ['rival', 'threat', 'mood'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After how many months is the review in the APM role? (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Short-term cost, or long-term benefit?',
        groups: ['Short-term cost', 'Long-term benefit'],
        items: [
          { text: 'Possible pay dip', group: 0 },
          { text: 'Work he finds energising', group: 1 },
          { text: 'Being new again', group: 0 },
          { text: 'Skills in his chosen direction', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Would you accept a short-term pay dip for work that fits your direction? What would you need to feel OK about it?',
    starters: ['I would / wouldn\'t because...', 'I\'d need...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down your "enough" number: the pay you need, not the most you could get. It helps with trade-offs.',
  },
  notes: 'Reuses offer-negotiation skills from How to Get Hired, Ch5. Pay outcome is a story detail; internal moves vary.',
};

export default lesson;
