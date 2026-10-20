import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 19 — the learner builds their own profile (career kit, piece 5). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your profile',
  summary: 'The last piece of your career kit. Everything you need is already in your CV, portfolio and evidence bank. One evening, seven steps, and you\'re findable.',
  minutes: 13,
  outcomes: ['Build a complete, honest professional profile', 'Make it match your CV', 'Make it safe and findable'],
  learn: [
    {
      kind: 'steps',
      title: 'Your profile in seven steps',
      steps: [
        { title: '1. Photo', body: 'By a window, plain background, head and shoulders, dressed like the job. Recent.' },
        { title: '2. Headline', body: 'Who you are · key skills · one proof. Use words people search for.' },
        { title: '3. About', body: 'Five short first-person lines: hook, proof, what you\'re like to work with, what you want next and where, an invitation.' },
        { title: '4. Experience and Projects', body: 'Every real role, paid or not, with honest titles, matching dates and one or two achievement bullets. Your portfolio piece in Projects.' },
        { title: '5. Featured, skills and a recommendation', body: 'Pin your case study. List skills you could be tested on, top three first. Ask one person who saw your work for two specific lines.' },
        { title: '6. Link and safety', body: 'Set a clean custom link and add it to your CV. Professional email only; no personal number, address or ID.' },
        { title: '7. Check it as a stranger', body: 'Open it logged out. Does it match your CV? Would a recruiter remember your story in five seconds?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t wait for perfect. A clear, honest profile today beats a perfect one next month.',
    },
  ],
  apply: {
    scenario: 'You build your profile.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the seven steps in order.',
        lines: ['Photo', 'Headline', 'About', 'Experience and Projects', 'Featured, skills and a recommendation', 'Link and safety', 'Check it as a stranger'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ready, or fix first?',
        groups: ['Ready', 'Fix first'],
        items: [
          { text: 'Headline with skills and a proof', group: 0 },
          { text: 'Dates that don\'t match the CV', group: 1 },
          { text: 'Case study pinned in Featured', group: 0 },
          { text: 'Personal phone number in Contact', group: 1 },
          { text: 'Clean custom link', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does your profile content come from?',
        options: [
          { text: 'Your CV, portfolio and evidence bank' },
          { text: 'Someone else\'s profile', why: 'Borrow structure, not content.' },
          { text: 'Your imagination', why: 'Only what\'s real.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step this learner skipped.',
        lines: ['Photo: by a window, plain wall.', 'Headline: Student.', 'About: five lines with a hook and a proof.'],
        bug: 1,
        fix: 'Headline: Final-year Business student · Excel · Ran a 30-person trip on budget',
        explanation: 'The headline is the default. Use the formula.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'How will you check your profile before you share it?',
        options: [
          { text: 'Open it logged out, compare it to my CV, and see what I remember in five seconds.' },
          { text: 'I won\'t, it\'s fine.', why: 'Always check it as a stranger.' },
          { text: 'Ask the AI if it\'s good.', why: 'Check it yourself as a stranger first.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each career-kit piece to where it shows on your profile.',
        pairs: [
          ['Skills inventory', 'Headline and Skills'],
          ['Portfolio case study', 'Featured and Projects'],
          ['CV bullets', 'Experience'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which About ending is best?',
        options: [
          { text: '"I\'m looking for a junior marketing role in Nairobi, and I\'d love to hear from people working in fintech."' },
          { text: '"Thank you for reading my profile."', why: 'Fine, but says nothing about what you want.' },
          { text: '"Hire me now."', why: 'Too pushy.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'A clear, honest profile [[1]] beats a perfect one next [[2]].',
        blanks: [['today'], ['month']],
        distractors: ['tomorrow', 'year', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Step 7: check your profile as a ___. (one word)',
        answers: ['stranger', 'recruiter'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of step 6 (link and safety), or not?',
        groups: ['Step 6', 'Not step 6'],
        items: [
          { text: 'Set a custom link', group: 0 },
          { text: 'Remove your home address', group: 0 },
          { text: 'Write the About', group: 1 },
          { text: 'Add the link to your CV', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which step will take you longest, and when will you do it this week?',
    starters: ['The longest step is...', 'I\'ll do it on...'],
  },
  deepen: {
    title: 'Your career kit, piece 5',
    summary: 'Build or rebuild your profile with all seven steps, then share your link with one person who can give honest feedback. Your career kit is complete.',
  },
  notes: 'Learner\'s career kit, piece 5 (outline engagement point 1): the final piece of Level 1.',
};

export default lesson;
