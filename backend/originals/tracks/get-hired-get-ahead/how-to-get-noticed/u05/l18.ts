import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 18 — read a great graduate profile: Ngum's. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Read a great graduate profile',
  summary: 'Ngum landed her accounting job last year. Recruiters started messaging her before she\'d even applied anywhere. She lets Clinton read her profile, top to bottom. Tap each part to see why it worked.',
  minutes: 12,
  outcomes: ['Recognise every part of a strong graduate profile', 'See how the parts work together', 'Borrow the structure for your own'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Ngum\'s profile',
      text: 'Photo: Ngum by a window, smiling, plain wall.\nHeadline: Accounting graduate · Excel & Sage · Ran a club\'s accounts to a 40,000-franc surplus\nAbout: I keep money organised and honest, for clubs, families and now businesses. As treasurer of my netball club, I built our first cash book and cut overdue fees from 14 to 2. I\'m looking for a junior accounting role in Douala.\nFeatured: "How we fixed our club\'s money" (a short case study, names removed)\nExperience: Treasurer, UB Netball Club · Sept to May\nRecommendation: "Ngum turned three notebooks and a WhatsApp chat into one clean cash book. Every payment traceable." (Club coach)\nLink: linkedin.com/in/ngumfru',
      hotspots: [
        { phrase: 'Ngum by a window, smiling, plain wall', note: 'A clear, friendly photo taken on a phone. Nothing fancy needed.' },
        { phrase: 'Accounting graduate · Excel & Sage · Ran a club\'s accounts to a 40,000-franc surplus', note: 'The headline formula: who she is, the words recruiters search, one proof.' },
        { phrase: 'I keep money organised and honest, for clubs, families and now businesses.', note: 'A first-person hook that earns the "see more" click.' },
        { phrase: 'I\'m looking for a junior accounting role in Douala.', note: 'She says what she wants and where, so recruiters searching "junior accountant Douala" find her.' },
        { phrase: 'a short case study, names removed', note: 'Featured proof, with privacy handled.' },
        { phrase: 'Every payment traceable.', note: 'A specific recommendation from someone who saw her work. Worth more than fifty endorsements.' },
        { phrase: 'linkedin.com/in/ngumfru', note: 'A clean link she can put on her CV and email signature.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Notice how every part says the same thing: organised, honest, good with money. One clear story, told seven ways.',
    },
  ],
  apply: {
    scenario: 'Clinton studies Ngum\'s profile.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Ngum\'s profile to the lesson it shows.',
        pairs: [
          ['Headline with a proof', 'The headline'],
          ['"I keep money organised and honest"', 'The About section'],
          ['The club coach\'s two lines', 'Skills and recommendations'],
          ['linkedin.com/in/ngumfru', 'A link you\'re proud of'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did recruiters find Ngum before she applied?',
        options: [
          { text: 'Her headline and About used the words they search for, like "junior accounting" and "Douala"' },
          { text: 'She paid for ads', why: 'A free profile with the right words did it.' },
          { text: 'Luck', why: 'Searchable words and clear proof did it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'On Ngum\'s profile, or left out on purpose?',
        groups: ['On her profile', 'Left out'],
        items: [
          { text: 'A specific recommendation', group: 0 },
          { text: 'Her home address', group: 1 },
          { text: 'A case study with names removed', group: 0 },
          { text: 'Inflated title "CFO"', group: 1 },
          { text: 'What role she wants, and where', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line would weaken Ngum\'s profile if she added it?',
        lines: ['Treasurer, UB Netball Club · Sept to May', 'CFO & Founder, Ngum Financial Group', 'Excel & Sage'],
        bug: 1,
        explanation: 'An inflated title for a company that doesn\'t exist. Her real treasurer role is stronger.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Ngum\'s whole profile tells one story. What\'s mine?',
        options: [
          { text: 'I build small, useful tools and explain them simply. Every section should say that.' },
          { text: 'I can do everything.', why: 'Too broad. One clear story works.' },
          { text: 'I don\'t have one.', why: 'He does: tools people use, explained simply.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton borrow from Ngum?',
        options: [
          { text: 'Saying what role he wants and where, and a specific recommendation' },
          { text: 'Her headline, word for word', why: 'Structure, not words.' },
          { text: 'Her photo background', why: 'Any plain background works.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngum\'s About.',
        template: 'I keep money [[1]] and honest. I\'m looking for a junior accounting role in [[2]].',
        blanks: [['organised', 'organized'], ['Douala']],
        distractors: ['hidden', 'Paris', 'anywhere'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ngum\'s recommendation came from her club\'s ___. (one word)',
        answers: ['coach'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the parts of Ngum\'s profile in the order people see them.',
        lines: ['Photo and headline', 'About', 'Featured', 'Experience', 'Recommendations'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Tey say every part of Ngum\'s profile does?',
        options: [
          { text: 'Tells the same clear story: organised, honest, good with money' },
          { text: 'Lists different random skills', why: 'The opposite: one consistent story.' },
          { text: 'Shows off as much as possible', why: 'It shows proof, consistently.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the one clear story your whole profile should tell? Write it in one sentence.',
    starters: ['My story is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every section of your profile against your one-sentence story. Change anything that tells a different one.',
  },
  notes: 'Ngum Fru is a named extra (classmate; Ch3 l18 CV). Her profile is fictional and consistent with her CV.',
};

export default lesson;
