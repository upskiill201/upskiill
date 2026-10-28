import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 18 — Clinton's month-one summary email to Mr Tamba. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The one-month summary',
  summary: 'One month in, Clinton sends Mr Tamba a short summary email, without being asked. Mr Tamba forwards it to his co-founder with one word: "This." Tap each line to see why.',
  minutes: 11,
  outcomes: ['Write a short progress summary', 'Lead with results and numbers', 'End with the next goal and a request'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Clinton\'s summary',
      text: 'Subject: Offline confirmations: month one\nHi Mr Tamba,\nThree drivers now confirm deliveries with no data. Customers get updates by 2pm instead of evening.\nLast week: 112 deliveries confirmed offline, 0 lost when data came back.\nNext month: the text-message fallback with Nadia for the two oldest phones, then all 14 drivers.\nOne request: could I sit with the customer-service team for an hour to hear what customers still ask about?\nThanks for the trust,\nClinton',
      hotspots: [
        { phrase: 'Subject: Offline confirmations: month one', note: 'The subject says what it is. He could find it in six months.' },
        { phrase: 'Three drivers now confirm deliveries with no data.', note: 'The result first. That\'s the project\'s definition of done, nearly met.' },
        { phrase: '112 deliveries confirmed offline, 0 lost when data came back', note: 'Numbers make it real. "0 lost" answers the worry before he asks.' },
        { phrase: 'the text-message fallback with Nadia', note: 'Credit shared, publicly and generously. After lesson 17, this matters.' },
        { phrase: 'could I sit with the customer-service team for an hour', note: 'A small request that shows he cares about the customer, not just the code.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Result first, numbers, next goal, one request. Send it before anyone asks.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his summary.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the summary in order.',
        lines: ['A clear subject', 'The result first', 'Numbers', 'Next goal', 'One request'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "0 lost when data came back" matter?',
        options: [
          { text: 'Zero is a nice number', why: 'It answers the real worry: lost data.' },
          { text: 'It answers Mr Tamba\'s biggest worry before he asks' },
          { text: 'It doesn\'t', why: 'Lost confirmations would be a disaster.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the summary, or not?',
        groups: ['Belongs', 'Leave out'],
        items: [
          { text: '112 deliveries confirmed offline', group: 0 },
          { text: 'Every bug he hit, in detail', group: 1 },
          { text: 'Next month\'s goal', group: 0 },
          { text: 'Complaints about Nadia', group: 1 },
          { text: 'One small request', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that weakens the summary.',
        lines: ['Three drivers now confirm offline.', 'I have been working extremely hard, often late.', '0 lost when data came back.'],
        bug: 1,
        explanation: 'Effort isn\'t a result. Lead with what changed.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Nobody asked for a summary. Is it weird to send one?',
        options: [
          { text: 'Yes, wait until asked.', why: 'Sending one unasked is a standout habit.' },
          { text: 'Send a 10-page report.', why: 'Short. Under 100 words.' },
          { text: 'No: a short, unasked summary shows ownership. I\'ll keep it under 100 words.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['Updates by 2pm', 'Shows the business result'],
          ['With Nadia', 'Shares credit'],
          ['Sit with customer service', 'Shows he cares about customers'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which subject line is best?',
        options: [
          { text: '"Offline confirmations: month one"' },
          { text: '"Hi"', why: 'Say what it is.' },
          { text: '"Please read!!!"', why: 'Say what it is, calmly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Result [[1]], then numbers, next goal, one [[2]].',
        blanks: [['first'], ['request']],
        distractors: ['last', 'complaint', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many deliveries were confirmed offline last week? (a number)',
        answers: ['112'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Result or effort?',
        groups: ['Result', 'Effort'],
        items: [
          { text: 'Updates by 2pm', group: 0 },
          { text: 'Worked late', group: 1 },
          { text: 'Three drivers using it', group: 0 },
          { text: 'Tried really hard', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you sent a one-month summary of something you\'re doing now, what would the first line say?',
    starters: ['My result:', 'My number:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a five-line summary of your last month in any role or course: result, number, next goal, one request. Under 100 words.',
  },
  notes: 'Delivery numbers are story details. Shared credit with Nadia follows l17.',
};

export default lesson;
