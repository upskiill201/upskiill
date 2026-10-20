import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 6 — reading the associate PM job description. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The APM advert',
  summary: 'The internal advert goes up: Associate Product Manager, Offline. Clinton reads it the way he learned to read adverts a year and a half ago. Tap each line.',
  minutes: 11,
  outcomes: ['Read a role description for must-haves', 'Match your evidence to each line', 'Spot what to prepare'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the advert',
      text: 'Associate Product Manager, Offline (internal applicants welcome).\nYou\'ll talk to drivers, merchants and support every week.\nYou\'ll turn what you learn into clear priorities and specs.\nYou\'ll work closely with engineering and say no to good ideas.\nNice to have: experience building for low-connectivity users.',
      hotspots: [
        { phrase: '(internal applicants welcome)', note: 'An open door for him. Internal candidates often have an advantage: people know their work.' },
        { phrase: 'talk to drivers, merchants and support every week', note: 'His energy audit\'s top item, as the core of the job. A strong sign of fit.' },
        { phrase: 'clear priorities and specs', note: 'Specs: he has two. Priorities: his current experiment. He\'ll have evidence for both.' },
        { phrase: 'say no to good ideas', note: 'Aïcha\'s "half my time" warning, in writing. His honest gap; he should mention how he\'s practising.' },
        { phrase: 'experience building for low-connectivity users', note: 'Nice to have, and it\'s exactly his year of work. Most product candidates won\'t have this.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Read every line. Match evidence to each. Note the gap you\'ll talk about honestly, and the "nice to have" you uniquely bring.',
    },
  ],
  apply: {
    scenario: 'Clinton reads the APM advert.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Strong evidence, or the honest gap?',
        groups: ['Strong evidence', 'Honest gap'],
        items: [
          { text: 'Talking to drivers and support', group: 0 },
          { text: 'Saying no to good ideas often', group: 1 },
          { text: 'Building for low connectivity', group: 0 },
          { text: 'Writing specs', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "internal applicants welcome" matter?',
        options: [
          { text: 'Internal candidates are welcome, and people already know his work' },
          { text: 'It means only externals', why: 'It welcomes internals.' },
          { text: 'It doesn\'t', why: 'It\'s an open door.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each advert line to Clinton\'s evidence.',
        pairs: [
          ['Talk to drivers weekly', 'Bafoussam workshop'],
          ['Priorities and specs', 'Two specs and a priority draft'],
          ['Low-connectivity users', 'A year of offline sync'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I hide that I\'m weak at saying no?',
        options: [
          { text: 'No: I\'ll name it, and say how I\'m practising with the feature-request reviews.' },
          { text: 'Yes, never mention it.', why: 'Honest gap plus action is stronger.' },
          { text: 'Say I\'m the best at it.', why: 'Overclaiming backfires.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s misreading.',
        lines: ['The core is talking to users.', '"Nice to have" means it doesn\'t matter.', 'Saying no is a real part of the job.'],
        bug: 1,
        explanation: 'It\'s a differentiator, and he has it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s reading method in order.',
        lines: ['Read every line', 'Match evidence to each', 'Note the honest gap', 'Note what he uniquely brings'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does Clinton uniquely bring?',
        options: [
          { text: 'Experience building for low-connectivity users' },
          { text: 'An MBA', why: 'He doesn\'t have one; his offline work is unique.' },
          { text: 'Nothing', why: 'His offline work.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Match [[1]] to each line. Name the [[2]] gap.',
        blanks: [['evidence'], ['honest']],
        distractors: ['excuses', 'hidden', 'fake'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does APM stand for? Associate Product ___. (one word)',
        answers: ['manager'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the APM job, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Weekly user conversations', group: 0 },
          { text: 'Writing all the code alone', group: 1 },
          { text: 'Saying no to good ideas', group: 0 },
          { text: 'Ignoring engineering', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Find an advert for a role you\'re curious about. What line would be your strongest? Your honest gap?',
    starters: ['Strongest:', 'Gap:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Read one advert for a role you\'d like next, line by line, and write your evidence beside each line.',
  },
  notes: 'Echoes the advert-reading in How to Get Noticed (CV and cover letter chapters).',
};

export default lesson;
