import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Step-by-step: a hook that makes them curious (Loewenstein 1994 information-gap theory). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A hook that makes them curious',
  summary: 'Ada\'s pitch starts: "Hello, my name is Ada and my app is Ajo Tracker." Arjun: "That\'s a name badge, not a hook. Give them a reason to lean in."',
  minutes: 12,
  outcomes: [
    'Know why curiosity grabs attention',
    'Open with a gap people want closed',
    'Close the gap quickly, so it never feels like a trick',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Build a hook in four steps',
      steps: [
        {
          title: '1. Know why curiosity works',
          body: 'Psychologist George Loewenstein described curiosity as an "information gap": when we notice a small gap in what we know, we feel a pull to close it. A good hook opens a small gap in the first few seconds.',
        },
        {
          title: '2. Pick a hook type',
          body: 'A surprising fact ("Ten colleagues. ₦200,000 a month. One notebook."), a question they\'ve lived ("Has anyone here ever sworn they\'d already paid?"), or a moment in the middle of the action ("Tunde swore he\'d paid in March.").',
        },
        {
          title: '3. Keep it short and relevant',
          body: 'One or two sentences, connected to your point. A random shocking fact gets attention and then loses trust when it doesn\'t connect.',
        },
        {
          title: '4. Close the gap quickly',
          body: 'Within a few sentences, answer the question you opened: "...so I built an app that ended the argument." Leaving people hanging too long feels like clickbait.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Name badge vs hook',
      before: {
        label: 'Name badge',
        text: '"Hello, my name is Ada and my app is called Ajo Tracker."',
      },
      after: {
        label: 'Hook',
        text: '"Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong?"',
      },
      notes: [
        'Specific numbers create a picture.',
        'The question opens a gap: everyone wants to know what went wrong.',
        'Her name can come right after, once they\'re listening.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Open a small gap. Keep it relevant. Close it fast.',
    },
  ],
  apply: {
    scenario: 'Arjun: "That\'s a name badge."',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does Loewenstein\'s "information gap" idea say about curiosity?',
        options: [
          { text: 'People are only curious about money', why: 'Curiosity is much broader.' },
          { text: 'Curiosity can\'t be triggered on purpose', why: 'A hook does exactly that.' },
          { text: 'When we notice a gap in what we know, we want to close it' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the hook steps in order.',
        lines: ['Open a small gap', 'Keep it connected to your point', 'Close the gap within a few sentences', 'Then give the rest of your pitch'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which hook type is it?',
        groups: ['Surprising fact', 'Question', 'Mid-action moment'],
        items: [
          { text: 'Ten colleagues. ₦200,000 a month. One notebook.', group: 0 },
          { text: 'Has anyone here sworn they\'d already paid?', group: 1 },
          { text: 'Tunde swore he\'d paid in March.', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if I open with "Nigeria loses billions to fraud every year!"? It\'s dramatic!',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Perfect, the bigger the number the better.', why: 'Relevance beats size.' },
          { text: 'Make it even scarier.', why: 'Fear without connection loses trust.' },
          { text: 'Dramatic but disconnected: your app isn\'t about fraud. Use a hook that leads straight to your point.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good hook opens a small ___ in what people know. (one word)',
        answers: ['gap'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why close the gap quickly?',
        options: [
          { text: 'To save time for features', why: 'To keep trust.' },
          { text: 'Leaving people hanging too long feels like clickbait and loses trust' },
          { text: 'You shouldn\'t close it', why: 'An open gap at the end feels like a trick.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s opening. Which line kills the hook?',
        lines: [
          'Ten colleagues. ₦200,000 a month. One notebook.',
          'What could possibly go wrong?',
          'Before I answer, let me explain my technical architecture for five minutes.',
        ],
        bug: 2,
        fix: 'Every month, someone swore they\'d already paid.',
        explanation: 'Close the gap with the answer, not a detour.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Rhyme-as-reason', 'Rhymes feel truer'],
          ['Pixar pitch', 'A six-sentence story'],
          ['Information gap', 'Why hooks work'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s hook.',
        template: 'Ten [[1]]. Two hundred thousand naira a [[2]]. One [[3]].',
        blanks: [['colleagues'], ['month'], ['notebook']],
        distractors: ['database', 'year'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the hook\'s question.',
        tiles: ['What', 'could', 'possibly', 'go', 'wrong?'],
        distractors: ['Hello,'],
      },
    ],
  },
  reflect: {
    prompt: 'Write two hooks for your pitch: one surprising fact and one question your listeners have lived. Which opens a better gap?',
    starters: ['Fact hook: ...', 'Question hook: ...'],
  },
  deepen: {
    title: 'Steal from headlines',
    summary: 'Look at five headlines that made you click this week. What gap did each open? Try writing your hook the same way, but make sure you close the gap honestly.',
  },
  notes: 'Loewenstein (1994), Psychological Bulletin 116(1): "The psychology of curiosity: a review and reinterpretation" — information-gap theory. ₦200,000 = 10 × ₦20,000 monthly contributions.',
};

export default lesson;
