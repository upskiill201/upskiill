import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 9 — a clean profile link and contact info. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'A link you\'re proud of',
  summary: 'Clinton\'s profile link is "linkedin.com/in/clinton-ndi-8a7b3c21b". It goes on his CV, his email signature and his cover letter. Two minutes in settings makes it something he\'d say out loud.',
  minutes: 11,
  outcomes: ['Set a clean, custom profile link', 'Put your link everywhere it helps', 'Share contact details safely'],
  learn: [
    {
      kind: 'compare',
      title: 'Messy link vs. clean link',
      before: { label: 'Default link', text: 'linkedin.com/in/clinton-ndi-8a7b3c21b\n\nRandom letters and numbers. Hard to type, hard to remember, and it looks like nobody set it up. It also takes space on his one-page CV.' },
      after: { label: 'Custom link', text: 'linkedin.com/in/clintonndi\n\nSet in two minutes in profile settings. Clean on a CV, easy to say, and it matches his GitHub (github.com/clintonndi), so his online presence looks consistent.' },
      notes: [
        'Set a custom profile URL using your name (add a middle initial or field if it\'s taken).',
        'Use the same handle on your other professional profiles if you can.',
        'Put the link on your CV, email signature and cover letter.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Contact details on a public profile: a professional email is fine. Keep your personal phone number and home address off it.',
    },
  ],
  apply: {
    scenario: 'Clinton cleans up his links.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Clean link or messy link?',
        groups: ['Clean', 'Messy'],
        items: [
          { text: 'linkedin.com/in/clintonndi', group: 0 },
          { text: 'linkedin.com/in/clinton-ndi-8a7b3c21b', group: 1 },
          { text: 'linkedin.com/in/ngumfru', group: 0 },
          { text: 'linkedin.com/in/coolboy-clint-99', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Clinton put his profile link?',
        options: [
          { text: 'Nowhere, people should search', why: 'Make it one tap. Put it everywhere it helps.' },
          { text: 'On his CV, email signature and cover letter' },
          { text: 'Only on WhatsApp', why: 'It belongs on his application documents.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the contact detail that shouldn\'t be on a public profile.',
        lines: ['Email: clinton.ndi@email.com', 'Profile: linkedin.com/in/clintonndi', 'Home: 14 Rue du Marché, Molyko, Buea'],
        bug: 2,
        explanation: 'A home address on a public profile is a safety risk. Leave it off.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: '"clintonndi" is taken! What now?',
        options: [
          { text: 'Use "clintonndi12345678".', why: 'Too messy. A short variation works.' },
          { text: 'Use "bestdeveloper".', why: 'Not his name, and overclaims. Use his name.' },
          { text: 'Try a small variation, like "clinton-ndi" or "clintonndi-dev", and use it everywhere.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each place to Clinton\'s handle.',
        pairs: [
          ['LinkedIn', 'linkedin.com/in/clintonndi'],
          ['GitHub', 'github.com/clintonndi'],
          ['Email', 'clinton.ndi@email.com'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use the same handle on different profiles?',
        options: [
          { text: 'It looks consistent and makes you easy to find' },
          { text: 'It\'s required', why: 'Not required, just helpful.' },
          { text: 'To confuse recruiters', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which email signature is best?',
        options: [
          { text: '"Sent from my phone"', why: 'Misses the chance to share your link.' },
          { text: 'A long quote about success', why: 'Keep it professional and short.' },
          { text: '"Clinton Ndi · Final-year CS, University of Buea · linkedin.com/in/clintonndi"' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the link.',
        template: 'linkedin.com/[[1]]/[[2]]',
        blanks: [['in'], ['clintonndi']],
        distractors: ['me', 'user', 'coolboy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does it take to set a custom profile link? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to show on a public profile, or keep private?',
        groups: ['Safe', 'Keep private'],
        items: [
          { text: 'A professional email', group: 0 },
          { text: 'Your city', group: 0 },
          { text: 'Your personal phone number', group: 1 },
          { text: 'Your ID number', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What does your current profile link look like? Where would you put a clean one?',
    starters: ['My link is...', 'I\'d put it on...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Set your custom LinkedIn URL today, then add it to your CV and your email signature.',
  },
  notes: 'LinkedIn allows editing the public profile URL in settings (platform feature, 2026). The address in the findBug is fictional. Privacy guidance consistent with Ch2 l12.',
};

export default lesson;
