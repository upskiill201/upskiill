import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 2 — what a cover letter is for. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a cover letter is for',
  summary: 'Clinton thinks a cover letter is "a CV in sentences". Miracle explains what it\'s really for, who reads it, and when it matters most, so he can write one that does its job in under a minute.',
  minutes: 11,
  outcomes: ['Explain the job a cover letter does', 'Say who reads it and when', 'Know when a letter matters most'],
  learn: [
    {
      kind: 'reading',
      title: 'A bridge, not a copy',
      html:
        '<p>A CV is a list of proof. A cover letter is the <strong>bridge</strong> between that proof and one particular job. It answers two questions the CV can\'t:</p>' +
        '<ul><li><strong>Why them?</strong> Why this company and this role, not just any job.</li>' +
        '<li><strong>Why you?</strong> Which of your proof matters most for what they need, and why it fits.</li></ul>' +
        '<p><strong>Who reads it?</strong> Often a recruiter like Brenda first, then the hiring manager who\'ll actually work with you. Both are busy. A good letter is short: around <strong>250 to 400 words</strong>, comfortably under one page.</p>' +
        '<p><strong>When does it matter most?</strong></p>' +
        '<ul><li>When your CV doesn\'t obviously match: you\'re a graduate, changing fields, or your proof comes from clubs and family business.</li>' +
        '<li>When the company asks for one, or says "we read them".</li>' +
        '<li>When two CVs look similar, and someone has to decide who gets the interview.</li></ul>' +
        '<p>Some employers barely read letters; others read every one. You rarely know which, so a short, specific letter is a safe bet. A long generic one never is.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A cover letter is a bridge: from your proof to their need. If a sentence could be in anyone\'s letter, it isn\'t building the bridge.',
    },
  ],
  apply: {
    scenario: 'Miracle explains cover letters.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What two questions does a cover letter answer?',
        options: [
          { text: 'Why them, and why you' },
          { text: 'Your age and your hobbies', why: 'Neither. Why them and why you.' },
          { text: 'What salary and what holidays', why: 'Too early for that.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'About how long should a cover letter be?',
        options: [
          { text: 'Around 250 to 400 words, under one page' },
          { text: 'Three pages', why: 'Too long for busy readers.' },
          { text: 'Two sentences', why: 'Too short to answer both questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'When does a cover letter matter most?',
        groups: ['Matters a lot', 'Matters less'],
        items: [
          { text: 'You\'re changing fields', group: 0 },
          { text: 'The company says "we read them"', group: 0 },
          { text: 'Your CV is an exact match and they say no letter needed', group: 1 },
          { text: 'Your proof comes from clubs, not jobs', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So a cover letter is just my CV in sentences?',
        options: [
          { text: 'No: it\'s the bridge from my proof to their need. Why them, and why me.' },
          { text: 'Yes, copy the CV out.', why: 'That wastes the letter. They already have the CV.' },
          { text: 'It\'s a list of my hobbies.', why: 'No. Why them and why you.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each document to its job.',
        pairs: [
          ['CV', 'A list of proof'],
          ['Cover letter', 'The bridge from your proof to one job'],
          ['Portfolio', 'The proof itself, to look at'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that doesn\'t build the bridge.',
        lines: ['Njangi Pay is solving the problem my mum\'s group had.', 'I am a team player who works well under pressure.', 'The tracker I built is a small version of what you do.'],
        bug: 1,
        explanation: 'Could be in anyone\'s letter, for any job. The others connect Clinton to Njangi Pay.',
      },
      {
        kind: 'mcq',
        prompt: 'Who often reads a cover letter?',
        options: [
          { text: 'A recruiter first, then the hiring manager' },
          { text: 'Nobody, ever', why: 'Many read them, especially when they ask for them.' },
          { text: 'Only the CEO', why: 'Usually a recruiter and the hiring manager.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the idea.',
        template: 'A cover letter is a [[1]] from your proof to their [[2]].',
        blanks: [['bridge'], ['need', 'needs']],
        distractors: ['wall', 'salary', 'copy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A cover letter should fit on one ___. (one word)',
        answers: ['page'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'You don\'t know if they read letters. What\'s the safe bet?',
        options: [
          { text: 'A short, specific letter' },
          { text: 'A long generic letter', why: 'Long and generic is never a safe bet.' },
          { text: 'No letter, ever', why: 'Sometimes fine, but you lose a chance to stand out.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For a role you want, answer the two questions in one sentence each: why them, and why you?',
    starters: ['Why them: ...', 'Why me: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one real company you\'d like to work for. Write one sentence on why you want them specifically, and one on what you\'d bring.',
  },
  notes: 'Purpose and length guidance (250 to 400 words, under a page; answer "why us, why you") follows common university careers-service advice. Employer practice on reading letters varies; no percentage claimed.',
};

export default lesson;
