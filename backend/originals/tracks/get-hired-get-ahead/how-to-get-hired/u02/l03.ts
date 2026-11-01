import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 3 — a vague WhatsApp offer vs. clear written terms. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Get it in writing',
  summary: 'Before he started, Clinton asked Mr Tamba for the details in writing. One of the other interns, Samuel, didn\'t. His offer was a WhatsApp voice note: "Come Monday, we\'ll sort it out." Two weeks later, nobody agrees on his hours.',
  minutes: 11,
  outcomes: ['List what an internship offer should say', 'Ask for missing details politely', 'Spot a vague offer before it causes problems'],
  learn: [
    {
      kind: 'compare',
      title: 'Two offers from Kmer',
      before: { label: 'Samuel\'s voice note', text: '"Come Monday, we\'ll sort it out."\n\nNo dates, no hours, no pay, no tasks, no supervisor. Two weeks later, Samuel thinks he works mornings; Mr Tamba thinks afternoons. Nobody\'s lying. Nothing was written down.' },
      after: { label: 'Clinton\'s email', text: 'Part-time intern, 12 weeks from Monday 3rd. Tuesdays, Thursdays and Saturdays, 9am to 1pm. Monthly allowance: 50,000 francs. Project: offline delivery confirmations. Supervisor: Mr Tamba, weekly 15-minute check-in on Fridays.\n\nShort, clear and easy to plan around exams. Any confusion, they both look at the email.' },
      notes: [
        'An offer should say: dates, hours, pay (if any), tasks, and who supervises you.',
        'A short email is enough for an informal internship. Formal schemes use contracts.',
        'Asking for details in writing is normal and professional, not rude.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Could you send me the details in writing, so I can plan around my exams?" Polite, normal, and it saves arguments later.',
    },
  ],
  apply: {
    scenario: 'Clinton helps Samuel sort out his offer.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Should the offer say this?',
        groups: ['Yes', 'Not needed'],
        items: [
          { text: 'Start and end dates', group: 0 },
          { text: 'Hours and days', group: 0 },
          { text: 'Mr Tamba\'s favourite food', group: 1 },
          { text: 'Who supervises you', group: 0 },
          { text: 'What the other interns earn', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Samuel\'s hours become a problem?',
        options: [
          { text: 'Samuel lied', why: 'Nobody lied. Nothing was written down.' },
          { text: 'Nothing was written down, so each remembered differently' },
          { text: 'Mr Tamba lied', why: 'Nobody lied. They just remembered differently.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best message for Samuel to send.',
        from: 'clinton',
        message: 'Samuel asks how to fix it without annoying Mr Tamba. What should he write?',
        options: [
          { text: '"You never told me anything!"', why: 'Blame won\'t help. Ask to confirm.' },
          { text: 'Say nothing and guess.', why: 'Guessing caused the problem. Confirm it.' },
          { text: '"Could we confirm my days, hours and project in a short email, so I plan it right?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the vague line in this offer.',
        lines: ['Dates: 12 weeks from Monday 3rd.', 'Hours: whenever, we\'ll see.', 'Supervisor: Mr Tamba.'],
        bug: 1,
        explanation: 'Vague hours cause exactly Samuel\'s problem.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Clinton\'s offer to its detail.',
        pairs: [
          ['Dates', '12 weeks from Monday 3rd'],
          ['Hours', 'Tue, Thu, Sat, 9am to 1pm'],
          ['Supervisor', 'Mr Tamba, Friday check-ins'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Is asking for details in writing rude?',
        options: [
          { text: 'No: it\'s normal and professional' },
          { text: 'Yes, it shows distrust', why: 'It shows care. Employers expect it.' },
          { text: 'Only at big companies', why: 'It\'s sensible everywhere.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days a week does Clinton work at Kmer? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s request.',
        template: 'Could you send me the details in [[1]], so I can plan around my [[2]]?',
        blanks: [['writing'], ['exams']],
        distractors: ['secret', 'holiday', 'voice'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: 'Allowance: 50,000 francs a month', group: 0 },
          { text: 'We\'ll sort out money later', group: 1 },
          { text: 'Project: offline delivery confirmations', group: 0 },
          { text: 'You\'ll help with stuff', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where can Clinton check if a 50,000-franc allowance is normal or legal?',
        options: [
          { text: 'A random forum comment', why: 'Check reliable local sources.' },
          { text: 'Nowhere, it doesn\'t matter', why: 'It matters. Check locally.' },
          { text: 'His careers office or his country\'s rules' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever started something (a job, a favour, a project) without the details written down? What happened?',
    starters: ['Once I...', 'Next time I\'ll ask for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "details in writing" checklist: dates, hours, pay, tasks, supervisor. Keep it for your next offer.',
  },
  notes: 'Samuel is a named extra (fellow intern). The 50,000-franc allowance is a story detail, not a benchmark. Where you live: internship pay and contract rules differ; check locally.',
};

export default lesson;
