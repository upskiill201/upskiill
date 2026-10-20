import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 6 — the About section. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The About section',
  summary: 'Recruiters who click on a profile read the About section next, if the first lines are worth it. Clinton\'s new About is five short lines. Tap each one to see what it does.',
  minutes: 11,
  outcomes: ['Write a short, first-person About section', 'Lead with a hook, prove it, say what you want next', 'Use search words naturally'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Clinton\'s About',
      text: 'I build small tools that solve real problems for real people.\nMy mum\'s savings group used to argue every month about who had paid. I built them a one-page tracker in JavaScript; the arguments stopped, and a second group of 30 now uses it too.\nI also run a 40-member campus tech meet-up and fix phones at my aunt\'s stall on Saturdays, so I\'m used to explaining technical things in plain words.\nI\'m graduating in Computer Science from the University of Buea in June and looking for a graduate developer role, ideally in fintech.\nMy projects are on GitHub (link in Featured), and I\'d love to hear from people building for savings groups.',
      hotspots: [
        { phrase: 'I build small tools that solve real problems for real people.', note: 'The hook. LinkedIn shows only the first lines before "see more", so the opening has to earn the click.' },
        { phrase: 'the arguments stopped, and a second group of 30 now uses it too', note: 'Proof with a result, in the first person. About sections are written as "I", not like a CV.' },
        { phrase: 'so I\'m used to explaining technical things in plain words', note: 'A skill from his life, linked to what employers want. No adjectives needed.' },
        { phrase: 'looking for a graduate developer role, ideally in fintech', note: 'What he wants next, plainly. Recruiters who search "graduate developer fintech" now find a match.' },
        { phrase: 'I\'d love to hear from people building for savings groups.', note: 'A friendly invitation. It tells people why they might message him.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'About = hook, proof, what you\'re like to work with, what you want next, an invitation. First person, short lines.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his About.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s About in order.',
        lines: ['A one-line hook', 'Proof with a result', 'What he\'s like to work with', 'What he wants next', 'An invitation'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the first line of the About matter so much?',
        options: [
          { text: 'Only the first lines show before "see more", so they must earn the click' },
          { text: 'It\'s the only line anyone can read', why: 'They can read more, if the first lines are worth it.' },
          { text: 'It doesn\'t matter', why: 'It decides whether they read the rest.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in an About section, or not?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'A project with a result', group: 0 },
          { text: 'What role you\'re looking for', group: 0 },
          { text: 'Your phone number and home address', group: 1 },
          { text: 'A paragraph of adjectives', group: 1 },
          { text: 'An invitation to connect', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that wastes the About.',
        lines: ['I build small tools that solve real problems.', 'I am a passionate, dynamic, results-driven individual.', 'My tracker ended my mum\'s njangi\'s monthly arguments.'],
        bug: 1,
        explanation: 'Adjectives where a story should be.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should my About be written like my CV, in third person?',
        options: [
          { text: 'No: About is first person, like talking to someone. "I build small tools..."' },
          { text: 'Yes: "Clinton is a dynamic student..."', why: 'Third person sounds odd on your own profile.' },
          { text: 'Just paste the CV.', why: 'Different job: About tells your story in your voice.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['I build small tools that solve real problems', 'Hook'],
          ['A second group of 30 now uses it', 'Proof'],
          ['Looking for a graduate developer role', 'What he wants next'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which About opening is best for Ngum?',
        options: [
          { text: '"I keep money organised and honest, for clubs, families and soon, businesses."' },
          { text: '"Welcome to my profile!"', why: 'Wastes the first line.' },
          { text: '"Accounting."', why: 'Too thin to hook anyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s line.',
        template: 'I\'m looking for a graduate [[1]] role, ideally in [[2]].',
        blanks: [['developer'], ['fintech']],
        distractors: ['manager', 'farming', 'anything'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About sections are written in which person: first or third?',
        answers: ['first', 'first person'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first line or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'I build small tools that solve real problems.', group: 0 },
          { text: 'Hi, thanks for visiting my profile.', group: 1 },
          { text: 'I turn messy club accounts into clean ones.', group: 0 },
          { text: 'Student.', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the first line of your own About: one sentence that says what you do, in a way that makes someone want to read more.',
    starters: ['I...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your full About in five short lines: hook, proof, what you\'re like to work with, what you want next, invitation. Keep it under 150 words.',
  },
  notes: 'LinkedIn truncates the About section after the first few lines with "see more" (platform behaviour; exact length varies by device). First-person About sections are standard LinkedIn guidance.',
};

export default lesson;
