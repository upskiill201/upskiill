import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: the first hour after a scam. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The first hour',
  summary: 'On the ward, Grace learnt that what you do in the first hour matters most. Fraud is the same. Step by step, the first hour after you realise you\'ve been scammed.',
  minutes: 11,
  outcomes: [
    'Know what to do in the first hour after a scam',
    'Act in the right order',
    'Avoid the mistakes that make it worse',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The first hour',
      steps: [
        { title: 'Minute 1: stop', body: 'Don\'t send any more money. Don\'t reply. End the call. Don\'t try to "fix it" with the scammer.' },
        { title: 'Minutes 2–10: call your bank', body: 'Use the number on your card or 159 in the UK. Tell them exactly what happened. They may be able to stop or trace payments, and cancel cards.' },
        { title: 'Minutes 10–20: secure accounts', body: 'If you shared passwords or codes, change them, starting with your email and banking. Turn on two-step checks. If you installed an app for a caller, remove it and get your device checked.' },
        { title: 'Minutes 20–40: save the evidence', body: 'Screenshot messages, note numbers, dates, times, amounts and account details. Don\'t delete anything yet.' },
        { title: 'Minutes 40–60: report it', body: 'Report to the national fraud reporting service, and to the platform where it started. Forward scam texts to 7726.' },
        { title: 'Then: tell someone', body: 'Talk to someone you trust. Being scammed is upsetting; you don\'t have to handle it alone. And watch for "recovery" scams, which often follow.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Stop. Call your bank. Secure accounts. Save evidence. Report. Tell someone. Speed matters most in the first few minutes.',
    },
  ],
  apply: {
    scenario: 'The first hour.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the first hour.',
        lines: ['Stop', 'Call your bank', 'Secure accounts', 'Save the evidence', 'Report it', 'Tell someone'],
      },
      {
        kind: 'mcq',
        prompt: 'Why call the bank so early?',
        options: [
          { text: 'To complain', why: 'To stop the money.' },
          { text: 'They may be able to stop or trace payments before the money moves on' },
          { text: 'It can wait a week', why: 'Speed matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do in the first hour, or don\'t do?',
        groups: ['Do', 'Don\'t do'],
        items: [
          { text: 'Screenshot the messages', group: 0 },
          { text: 'Argue with the scammer', group: 1 },
          { text: 'Change your email password', group: 0 },
          { text: 'Delete everything out of embarrassment', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'If it happens again, should I message the scammer to get my money back?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'No. Stop all contact. Your bank and the police are the only route back.' },
          { text: 'Yes, ask nicely.', why: 'It gives them another chance.' },
          { text: 'Threaten them.', why: 'Stop contact.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The first two steps.',
        template: '[[1]], then call your [[2]].',
        blanks: [['Stop', 'stop'], ['bank']],
        distractors: ['Wait', 'friend'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to an action.',
        pairs: [
          ['Secure accounts', 'Change email and banking passwords'],
          ['Save evidence', 'Screenshot messages and note amounts'],
          ['Report', 'National fraud reporting service'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is in the wrong place?',
        lines: [
          'Stop sending money.',
          'Call my bank.',
          'Wait a few days to see if the scammer gives it back, then call the bank.',
        ],
        bug: 2,
        fix: 'Call the bank immediately.',
        explanation: 'Every minute lets the money move further.',
      },
      {
        kind: 'mcq',
        prompt: 'If you installed an app for a caller, what should you do?',
        options: [
          { text: 'Keep it in case they call back', why: 'It gives them access.' },
          { text: 'Remove it, change passwords, and get your device checked' },
          { text: 'Nothing', why: 'It may give them access.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the UK, what number can you call to reach your bank safely?',
        answers: ['159'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why "tell someone" at the end?',
        options: [
          { text: 'To feel embarrassed', why: 'For support.' },
          { text: 'It\'s required by law', why: 'It\'s for your wellbeing.' },
          { text: 'Being scammed is upsetting, and support helps you avoid recovery scams' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your bank\'s fraud number somewhere you\'ll find it in a panic. Where will you put it?',
    starters: ['I\'ll put it...'],
  },
  deepen: {
    title: 'Why speed matters',
    summary: 'Stolen money is often moved through several accounts within minutes or hours. The faster your bank knows, the better the chance of freezing it somewhere along the chain.',
  },
  notes: 'First-hour steps consistent with UK Finance, Action Fraud and NCSC guidance. 159: Stop Scams UK. Femi per CAST.',
};

export default lesson;
