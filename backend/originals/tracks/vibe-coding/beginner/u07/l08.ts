import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 8. Tap to explore: packages, real, fake and look-alike. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Real, fake and look-alike packages',
  summary: 'The AI wants to install "supabase-auth-helperz" to fix a login warning. Ruth asks: "Who wrote it? Who uses it?" Nobody. It was published four days ago. Here\'s how to check a package in sixty seconds.',
  minutes: 12,
  outcomes: [
    'Explain what a package is, and why installing one is a trust decision',
    'Check a package on npmjs.com before installing',
    'Spot invented and look-alike names',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Checking a package on npmjs.com',
      text:
        'Package: supabase-auth-helperz\nWeekly downloads: 12\nPublished: 4 days ago\nRepository: (none)\nMaintainer: dev7781\n\nCompare: @supabase/supabase-js\nWeekly downloads: millions\nRepository: github.com/supabase/supabase-js\nMaintainer: supabase',
      hotspots: [
        { phrase: 'supabase-auth-helperz', note: 'A look-alike name: close to a real one, with a twist ("z"). Attackers register names like this, hoping someone (or an AI) installs them by mistake.' },
        { phrase: 'Weekly downloads: 12', note: 'Almost nobody uses it. Real, well-known packages are used by many people.' },
        { phrase: 'Published: 4 days ago', note: 'Brand new and unknown: a warning sign, especially when an AI suggests it.' },
        { phrase: 'Repository: (none)', note: 'No public code to look at. Real projects usually link to their code.' },
        { phrase: '@supabase/supabase-js', note: 'The real one: published under the company\'s own name (the @supabase part), linked from Supabase\'s docs.' },
        { phrase: 'github.com/supabase/supabase-js', note: 'Its code is public and comes from the company that makes the service.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'AI tools sometimes suggest packages that don\'t exist, or get a name slightly wrong. Attackers watch for those names and publish harmful packages under them. Installing a package runs someone else\'s code on your computer. Check first.',
    },
  ],
  apply: {
    scenario: 'The helperz package.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is installing a package a trust decision?',
        options: [
          { text: 'It runs someone else\'s code on your computer and in your app' },
          { text: 'It costs money', why: 'Most are free. The risk is the code.' },
          { text: 'It isn\'t, packages are always safe', why: 'Harmful packages exist.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good sign or warning sign?',
        groups: ['Good sign', 'Warning sign'],
        items: [
          { text: 'Millions of weekly downloads', group: 0 },
          { text: 'Published 4 days ago, nobody uses it', group: 1 },
          { text: 'Linked from the official docs', group: 0 },
          { text: 'A name one letter off a famous one', group: 1 },
          { text: 'No repository link', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The AI\'s install command. Which package is the look-alike?',
        lines: [
          'npm install @supabase/supabase-js',
          'npm install vite',
          'npm install supabase-auth-helperz',
        ],
        bug: 2,
        fix: 'Don\'t install it. Ask why it\'s needed, and what the official option is.',
        explanation: 'A near-copy of a real name, new and unused: classic look-alike.',
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'The AI suggested it, so it must be legit, right?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Right, the AI knows everything.', why: 'AI tools sometimes invent or misspell package names.' },
          { text: 'AIs sometimes invent package names, and attackers publish under them. We check it on npmjs.com first.' },
          { text: 'Install it and see what happens.', why: 'Seeing what happens means running unknown code.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Where to check a package.',
        template: 'Look it up on [[1]].com: downloads, age, [[2]] link.',
        blanks: [['npmjs'], ['repository']],
        distractors: ['google', 'colour'],
      },
      {
        kind: 'orderLines',
        prompt: 'Checking a new package, in order.',
        lines: [
          'Ask the AI why it\'s needed',
          'Look it up on npmjs.com',
          'Check downloads, age and repository',
          'Check the official docs name it',
          'Only then approve the install',
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which website do you use to check JavaScript packages?',
        answers: ['npmjs.com', 'npmjs', 'npm'],
        placeholder: 'Website',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best CLAUDE.md rule for packages?',
        options: [
          { text: 'Install whatever you need', why: 'That\'s how helperz gets in.' },
          { text: 'Never use packages', why: 'Real apps need some. Check them.' },
          { text: 'Don\'t add new packages without asking me first. Say why it\'s needed and link its npm page.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trick to what it is.',
        pairs: [
          ['Invented name', 'A package that never existed until an attacker made it'],
          ['Look-alike name', 'One letter off a famous package'],
          ['Brand-new unknown', 'Published days ago, used by nobody'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: where should install lines and downloads come from?',
        options: [
          { text: 'Official sources only' },
          { text: 'Any forum with lots of likes', why: 'Likes don\'t make a download safe.' },
          { text: 'Wherever the AI says', why: 'Check the source first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'How many packages does your app use? Open package.json and look: do you recognise every name?',
  },
  deepen: {
    title: 'On your computer: check your packages',
    summary: 'Open package.json in your app. For every name under "dependencies", look it up on npmjs.com: downloads, age, repository. Add the packages rule to CLAUDE.md.',
  },
  notes: '"Slopsquatting" (attackers registering package names hallucinated by AI tools) and typosquatting are documented supply-chain risks (security research, 2024–2026). "supabase-auth-helperz" is a made-up example name. npm package pages show weekly downloads, publish dates and repository links.',
};

export default lesson;
