import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Step-by-step: set the pass mark first. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Set the pass mark first',
  summary: 'Before posting anything, David makes Clinton write down what "success" means, with numbers, and sign it. "Otherwise whatever happens, you\'ll call it a success."',
  minutes: 12,
  outcomes: [
    'Write a pass mark before running a test',
    'Choose numbers that show real behaviour',
    'Decide in advance what you\'ll do if it passes or fails',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps before you test',
      steps: [
        { title: '1. Name the assumption', body: '"Hostel students will pay 1,500 FCFA for laundry pickup."' },
        { title: '2. Choose what you\'ll measure', body: 'Paid bookings, not likes or "interested" replies. Plus one thing about delivery: bags returned on time.' },
        { title: '3. Write the pass mark', body: 'The post reaches about 300 students in three hostel groups. Pass: at least 10 paid bookings, at least half from people Clinton doesn\'t know, and at least 80% of bags back on time.' },
        { title: '4. Write what happens next', body: 'Pass: run a second weekend. Fail: go back to interviews and find out why. Decided now, not later.' },
        { title: '5. Share it', body: 'Clinton sends the pass mark to David and Miracle before the post goes up. Now he can\'t quietly move it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If you set the pass mark after you see the results, you\'ll always pass.',
    },
  ],
  apply: {
    scenario: 'Writing the pass mark.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps before a test.',
        lines: ['Name the assumption', 'Choose what to measure', 'Write the pass mark', 'Write what happens next', 'Share it before starting'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the pass mark BEFORE the test?',
        options: [
          { text: 'So you can\'t move it to match whatever happens' },
          { text: 'So the test takes longer', why: 'It\'s about honesty, not time.' },
          { text: 'It doesn\'t matter when', why: 'Afterwards, you\'ll be tempted to call anything a success.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good thing to measure, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Paid bookings', group: 0 },
          { text: 'Likes on the post', group: 1 },
          { text: 'Bags returned on time', group: 0 },
          { text: '"Interested!" replies', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The post reaches about 300 students and the pass mark is 10 paid bookings. What percentage is that, roughly? (whole number)',
        answers: ['3', '3%'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why do I have to send the pass mark to you two first?',
        prompt: "David's best reply?",
        options: [
          { text: 'Because on Sunday, if you get 6 bookings, you\'ll want to say 6 was the plan. If we\'ve seen it, you can\'t.' },
          { text: 'No reason.', why: 'Sharing it stops the goalposts moving.' },
          { text: 'So we can take credit.', why: 'It\'s about keeping the test honest.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pass mark.',
        template: 'At least [[1]] paid bookings, at least half from [[2]].',
        blanks: [['10', 'ten'], ['strangers']],
        distractors: ['40', 'friends'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to the decision made in advance.',
        pairs: [
          ['Pass', 'Run a second weekend'],
          ['Fail', 'Back to interviews to find out why'],
          ['Bags late', 'Fix collection before scaling'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why "at least half from people Clinton doesn\'t know"?',
        options: [
          { text: 'Friends might pay to support him, not because they need the service' },
          { text: 'Friends aren\'t allowed to pay', why: 'They can; they just count less as evidence.' },
          { text: 'Strangers pay more', why: 'Same price; the point is honest demand.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s pass mark is too vague?',
        lines: [
          'Assumption: students will pay 1,500 FCFA for pickup.',
          'Measure: paid bookings.',
          'Pass: "a good number" of bookings.',
          'Next: if pass, a second weekend.',
        ],
        bug: 2,
        fix: 'Pass: at least 10 paid bookings, half from strangers.',
        explanation: '"A good number" can be stretched to fit any result.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Written before the test, or after?',
        groups: ['Before', 'After'],
        items: [
          { text: 'The pass mark', group: 0 },
          { text: 'The actual number of bookings', group: 1 },
          { text: 'What you\'ll do if it fails', group: 0 },
          { text: 'What customers said on Sunday', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the pass mark for your own test: what you\'ll measure, the number, and what you\'ll do if it passes or fails.',
    starters: ['I\'ll measure...', 'It passes if...'],
  },
  deepen: {
    title: 'Pre-registration',
    summary: 'Scientists "pre-register" their studies: they write down what they\'ll measure and what counts as success before collecting data. Founders can borrow the same habit.',
  },
  notes: 'Fictional pass mark: post reaches ~300 students in three hostel groups; pass = at least 10 paid bookings (~3%), at least half from strangers, at least 80% of bags back on time. Pre-registration is standard practice in experimental science.',
};

export default lesson;
