import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Reading: fake jobs and task scams. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The job that pays you to pay',
  summary: 'Jayden\'s friend Ella got a WhatsApp from a "recruiter": £300 a day from home, rating products and liking videos. By day four she\'d paid them £400. Fake jobs and task scams, explained.',
  minutes: 12,
  outcomes: [
    'Recognise fake job offers',
    'Explain how task scams work',
    'Check a job before giving details or money',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Ella\'s "job"',
      html: '<p>The message arrived out of nowhere: "Hi! I\'m a recruiter. We have flexible remote work: rate products and like videos, £200 to £300 a day. Interested?"</p><p><strong>Day 1:</strong> Ella is added to a group with other "workers" posting their earnings. She completes 30 easy tasks and her online "account" shows £85. She\'s even allowed to withdraw £20. It feels real.</p><p><strong>Day 2:</strong> A new level: "premium tasks" pay more, but first she must "top up" her account with £50 of her own money. Everyone in the group says they did it.</p><p><strong>Day 3–4:</strong> Each level needs a bigger top-up: £100, then £250. Her balance shows £1,200. To withdraw, she must complete "one final combination task", which needs another £600.</p><p>That\'s a <strong>task scam</strong>: small real payments to build trust, then ever-bigger deposits to "unlock" earnings that don\'t exist. The other "workers" in the group are often fake accounts.</p><p><strong>Other fake jobs to watch for:</strong></p><ul><li><strong>"Payment processing agent"</strong> or "finance assistant" roles that mean moving money: money muling.</li><li><strong>Reshipping</strong> jobs: receive parcels at home and post them on. Usually stolen goods.</li><li><strong>Upfront fees</strong> for training, uniforms, background checks or equipment.</li></ul><p><strong>Real jobs:</strong> pay you; don\'t make you pay them. Have an interview with real people. Don\'t need your bank login. Can be checked: search the company\'s official website and contact details yourself.</p>',
    },
    {
      kind: 'check',
      question: 'A "job" asks Ella to top up £50 of her own money to unlock higher-paying tasks. What is it?',
      options: ['A normal job', 'A task scam', 'A training course'],
      answer: 1,
      explanation: 'Real jobs pay you. They don\'t make you pay to work.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Real jobs pay you, never the other way round. Unexpected job messages, pay-to-work "top-ups" and jobs that move money or parcels are scams.',
    },
  ],
  apply: {
    scenario: 'Ella\'s "job".',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how Ella\'s task scam unfolded.',
        lines: ['An unexpected recruiter message', 'Easy tasks and a small real withdrawal', 'A "top-up" to unlock premium tasks', 'Bigger top-ups', 'A "final task" to withdraw'],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Ella allowed to withdraw £20 on day 1?',
        options: [
          { text: 'Because it was a real job', why: 'It was bait.' },
          { text: 'By mistake', why: 'It was deliberate.' },
          { text: 'To build trust before asking for bigger deposits' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ella topped up £50, then £100, then £250. How much had she paid in?',
        answers: ['400', '£400'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real job, or fake job sign?',
        groups: ['Real job', 'Fake job sign'],
        items: [
          { text: 'An interview with real people', group: 0 },
          { text: 'Pay to unlock tasks', group: 1 },
          { text: 'Receive and post on parcels', group: 1 },
          { text: 'Paid into your account, no fees asked', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Ella says everyone in the group is earning loads though.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Those "workers" are often fake accounts run by the scammers. Tell her to stop paying and report it.' },
          { text: 'Then it must be real.', why: 'Group members are often fake.' },
          { text: 'Tell her to pay the final £600.', why: 'There\'ll be another.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Real jobs [[1]] you; they never make you [[2]] them.',
        blanks: [['pay'], ['pay']],
        distractors: ['charge', 'thank'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fake job to what it really is.',
        pairs: [
          ['"Payment processing agent"', 'Money muling'],
          ['Reshipping parcels', 'Moving stolen goods'],
          ['Rating products with top-ups', 'Task scam'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which check doesn\'t really check the job?',
        lines: [
          'Find the company\'s official website myself.',
          'Call their number from that site.',
          'Ask the recruiter on WhatsApp if the job is real.',
        ],
        bug: 2,
        fix: 'Check through official contact details found yourself.',
        explanation: 'The recruiter is the scammer.',
      },
      {
        kind: 'mcq',
        prompt: 'What does the "final combination task" really do?',
        options: [
          { text: 'Releases her money', why: 'There\'s no money to release.' },
          { text: 'Completes her training', why: 'It\'s another payment.' },
          { text: 'Takes another deposit; the earnings never existed' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which upfront fee should make you suspicious?',
        options: [
          { text: 'None of them', why: 'Upfront fees are a classic sign.' },
          { text: 'Any fee for training, uniforms or checks before starting' },
          { text: 'Only fees over £1,000', why: 'Any upfront fee is suspicious.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever had an unexpected job offer by message? What made it seem real?',
    starters: ['I got...', 'It seemed real because...'],
  },
  deepen: {
    title: 'Task scams are growing',
    summary: 'UK police and banks have warned about a rise in task-based job scams, often starting on messaging apps. Some victims are asked to pay in crypto, which is harder to trace.',
  },
  notes: 'Task scams: Action Fraud/UK Finance warnings 2023–24. Ella narrated. 50 + 100 + 250 = 400.',
};

export default lesson;
