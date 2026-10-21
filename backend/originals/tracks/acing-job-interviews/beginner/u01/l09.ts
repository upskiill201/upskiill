import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: interview card v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Interview card v1',
  summary: 'Ada tells Remi to keep one page for every interview: his interview card. Version 1 has his answer to "tell me about yourself" and what each interview is checking. Tap each line.',
  minutes: 11,
  outcomes: [
    'Start a one-page interview card',
    'Link each line to a lesson from this chapter',
    'Tailor it to one employer',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s interview card v1',
      text: 'Interviews: Savanna Bank (screen, done), Mtaa Labs (technical), Synergix (final round). Tell me about yourself, about 60 seconds. Present: final-year computer science. Past: booking app, 120 weekly users; coding club data project. Future: why this employer. They\'re checking: can I do it, how I work, working with others, do I want it, will I grow. Rules: relevance, not time order; pause and clarify if needed.',
      hotspots: [
        { phrase: 'Savanna Bank (screen, done)', note: 'Lesson 1: four minutes, two skipped questions.' },
        { phrase: 'about 60 seconds', note: 'Lesson 4: present, past, future.' },
        { phrase: 'booking app, 120 weekly users', note: 'Lesson 6: one number makes it concrete.' },
        { phrase: 'They\'re checking', note: 'Lesson 3: most questions are one of five in disguise.' },
        { phrase: 'relevance, not time order', note: 'Lesson 6: rambling follows time; shaped answers follow relevance.' },
        { phrase: 'pause and clarify if needed', note: 'Lesson 7: both look thoughtful.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One card per interview: the stage, your one-minute answer, and what they\'re checking.',
    },
  ],
  apply: {
    scenario: 'Interview card v1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the card line to the lesson.',
        pairs: [
          ['About 60 seconds', 'Present, past, future'],
          ['120 weekly users', 'Rambling vs shaped'],
          ['They\'re checking', 'What interviewers look for'],
          ['Pause and clarify', 'Interview myths'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many interviews are on Remi\'s card?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What changes on the card for each employer?',
        options: [
          { text: 'The future part (why this employer) and which examples to stress' },
          { text: 'His name and degree', why: 'Those stay the same.' },
          { text: 'Nothing', why: 'Tailor the why and the examples.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'On v1, or coming later?',
        groups: ['On v1', 'Later'],
        items: [
          { text: 'One-minute answer', group: 0 },
          { text: 'STAR stories', group: 1 },
          { text: 'What they\'re checking', group: 0 },
          { text: 'Salary answer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'One page for every interview sounds like a lot of work.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Most of it repeats. You\'ll change a few lines per employer. Twenty minutes for a calmer interview.' },
          { text: 'Skip it.', why: 'It keeps you focused under pressure.' },
          { text: 'Write ten pages instead.', why: 'One page is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The card\'s core.',
        template: 'The stage, your [[1]] answer, and what they\'re [[2]].',
        blanks: [['one-minute', 'one minute', '60-second'], ['checking']],
        distractors: ['four-minute', 'wearing'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the next interview on the card?',
        options: [
          { text: 'Mtaa Labs, a technical interview' },
          { text: 'Savanna Bank again', why: 'That one is done.' },
          { text: 'Synergix', why: 'That\'s the final one.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of the card is wrong?',
        lines: [
          'Tell me about yourself: about 60 seconds.',
          'Present: final-year computer science.',
          'Order: start at age nine and go forward.',
          'Future: why this employer.',
        ],
        bug: 2,
        fix: 'Order: relevance, not time order.',
        explanation: 'That\'s the four-minute mistake.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things does the card say interviewers are checking?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card sections.',
        lines: ['Interviews and stages', 'One-minute answer', 'What they\'re checking', 'Rules'],
      },
    ],
  },
  reflect: {
    prompt: 'Start your own interview card for a job you want: stage, one-minute answer, what they\'re checking.',
    starters: ['Job:...', 'My answer:...'],
  },
  notes: 'Interview card v1 (fictional) is this course\'s recurring device, growing to v5.',
};

export default lesson;
