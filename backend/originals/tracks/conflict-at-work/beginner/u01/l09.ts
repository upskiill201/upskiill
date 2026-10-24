import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: ward rules v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ward rules v1',
  summary: 'On the ward, Grace had rules she could follow half-asleep. She starts a one-page "ward rules for the office". Version 1 has five lines. Tap each one.',
  minutes: 11,
  outcomes: [
    'Turn conflict lessons into a few personal rules',
    'Link each rule to a lesson from this chapter',
    'Start your own conflict rules',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s ward rules v1',
      text: 'Rule 1: Silence is not peace. Rule 2: Triage first: risk, issue, relationship, time. Rule 3: Talk early, privately, briefly. Rule 4: Argue about the work, never the person. Rule 5: Five awkward minutes beat three days of dread.',
      hotspots: [
        { phrase: 'Silence is not peace', note: 'Lesson 1: three days of avoiding Femi, and the team noticed.' },
        { phrase: 'Triage first', note: 'Lesson 8: choose the mode that fits, not the default.' },
        { phrase: 'Talk early, privately, briefly', note: 'Lesson 3: what happened, how it felt, what you\'d like next.' },
        { phrase: 'Argue about the work, never the person', note: 'Lesson 4: relationship conflict hurts teams.' },
        { phrase: 'Five awkward minutes beat three days of dread', note: 'Lesson 5: the step 3 conversation.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Short personal rules are easier to follow under stress than long theories.',
    },
  ],
  apply: {
    scenario: 'Ward rules v1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the lesson.',
        pairs: [
          ['Silence is not peace', 'Stand-up'],
          ['Triage first', 'Pick the right mode'],
          ['Talk early, privately', 'Avoiding vs addressing'],
          ['Work, not person', 'Task vs relationship'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rules are on v1?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why write rules instead of remembering the theory?',
        options: [
          { text: 'Theory is wrong', why: 'The rules come from the theory.' },
          { text: 'Short rules are easier to follow under stress' },
          { text: 'To show Priya', why: 'They\'re for Grace.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'On v1, or coming in later chapters?',
        groups: ['On v1', 'Later'],
        items: [
          { text: 'Silence is not peace', group: 0 },
          { text: 'How to calm a raised voice', group: 1 },
          { text: 'Triage first', group: 0 },
          { text: 'How to answer unfair criticism', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Mum, you have RULES for talking to colleagues?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'No, forget it.', why: 'They help her.' },
          { text: 'And you\'re rule one.', why: 'Funny, but not helpful.' },
          { text: 'I had rules for 18 years on the ward and they kept people safe. Why not at work?' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule 5.',
        template: 'Five awkward [[1]] beat three days of [[2]].',
        blanks: [['minutes'], ['dread']],
        distractors: ['hours', 'fun'],
      },
      {
        kind: 'mcq',
        prompt: 'Which rule would Grace use first in any conflict?',
        options: [
          { text: 'Triage first' },
          { text: 'Five awkward minutes', why: 'That\'s encouragement, not the first step.' },
          { text: 'None', why: 'Triage tells her which mode to use.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong on Grace\'s rules?',
        lines: [
          'Silence is not peace.',
          'Triage first.',
          'Win every argument at work.',
          'Argue about the work, never the person.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Competing by default is as bad as avoiding by default.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rules as written.',
        lines: ['Silence is not peace', 'Triage first', 'Talk early, privately, briefly', 'Argue about the work, never the person', 'Five awkward minutes beat three days of dread'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years did Grace follow ward rules as a nurse?',
        answers: ['18', 'eighteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write three short rules for how you want to handle conflict at work.',
    starters: ['Rule 1:...', 'Rule 2:...'],
  },
  notes: 'Ward rules v1 (fictional) is this course\'s recurring device, growing to v5.',
};

export default lesson;
