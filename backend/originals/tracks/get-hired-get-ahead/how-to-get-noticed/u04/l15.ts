import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Brenda's inbox. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Brenda\'s inbox',
  summary: 'Brenda posts on LinkedIn: "Read 60 cover letters today. 40 sounded like the same AI. 6 had another company\'s name in. 3 I\'ll remember." Clinton wants to be one of the three. AI, format, tone and the master letter, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use AI without losing your voice or honesty', 'Format and address a letter correctly', 'Keep a confident tone and tailor quickly without slips'],
  learn: [
    {
      kind: 'story',
      title: '60 letters',
      beats: [
        { speaker: 'narrator', text: 'Friday. Brenda Fon posts on LinkedIn: "Read 60 cover letters today. 40 sounded like the same AI. 6 had another company\'s name in. 3 I\'ll remember. Be one of the 3."' },
        { speaker: 'clinton', text: '(to Miracle) Is she talking about me?' },
        { speaker: 'miracle', text: 'Not if you\'ve done what we\'ve practised. Let\'s check.' },
        { speaker: 'tey', text: 'Let\'s make sure Clinton is one of Brenda\'s three.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: get into Brenda\'s three.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did 40 of Brenda\'s letters "sound like the same AI"?',
        options: [
          { text: 'They were written by one person', why: 'Different people, same tool, no personal story.' },
          { text: 'They were AI-written without the applicants\' own stories, so they all used the same polished phrases' },
          { text: 'They were too short', why: 'Length wasn\'t the issue. Sameness was.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good AI use or crossing the line?',
        groups: ['Good use', 'Crossing the line'],
        items: [
          { text: 'Asking AI to cut your own paragraph shorter', group: 0 },
          { text: 'Sending an AI letter with claims you can\'t back up', group: 1 },
          { text: 'Asking AI to find typos', group: 0 },
          { text: 'Letting AI invent your experience', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reuse slip Brenda would spot.',
        lines: ['Dear Ms Fon,', 'I\'d love to help Mbanga Bakeries grow.', 'Kind regards, Clinton Ndi'],
        bug: 1,
        explanation: 'Another company\'s name. One of Brenda\'s six.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which email subject line?',
        options: [
          { text: '(no subject)', why: 'Easy to miss and looks careless.' },
          { text: 'Please read!!', why: 'Says nothing and looks desperate.' },
          { text: 'Graduate Developer application: Clinton Ndi' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Apologetic, cocky, or confident?',
        groups: ['Apologetic', 'Cocky', 'Confident'],
        items: [
          { text: 'I hope I might be considered, if possible.', group: 0 },
          { text: 'You won\'t find anyone better.', group: 1 },
          { text: 'I built a tracker 42 people use.', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: '(in a comment) What makes a letter one of my three?',
        options: [
          { text: 'A real story only that person could tell, a real reason they want you, and two proofs that match your advert.' },
          { text: 'Lots of adjectives.', why: 'Adjectives are what the 40 had.' },
          { text: 'Being three pages long.', why: 'Short and specific wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each way of sending to its rule.',
        pairs: [
          ['Form box', 'Plain text paragraphs'],
          ['Attachment', 'One-page PDF named with your name'],
          ['Email', 'A clear subject line'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which paragraph of a master letter is always written new?',
        options: [
          { text: 'The sign-off', why: 'The sign-off can be reused.' },
          { text: 'The proofs', why: 'Proofs are chosen and adapted. Why them is new.' },
          { text: 'Why them' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the honest-AI rule.',
        template: 'Your story, your draft, your [[1]]. You check every [[2]].',
        blanks: [['facts'], ['change']],
        distractors: ['photo', 'grade', 'name'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many letters out of 60 did Brenda say she\'d remember? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Last check: read your letter aloud. Does it sound like you?',
        options: [
          { text: 'It sounds like a robot, but a smart one.', why: 'Then it\'s one of the 40. Rewrite in your own voice.' },
          { text: 'Yes: my stories, my words, and no apologies or big claims.' },
          { text: 'I didn\'t read it, I trust the AI.', why: 'Always read it. Every word goes out with your name.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If Brenda read your letter, would it be one of her 40, her 6, or her 3? Why?',
    starters: ['It would be one of her...', 'To be in the 3, I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Run Brenda\'s three tests on your letter: does it sound like you, is every company name right, and would she remember one line?',
  },
  notes: 'Checkpoint 3 of Chapter 4 reviews l11–l14. Brenda\'s LinkedIn numbers are her fictional post, not a statistic. These exercises double as Jump ahead / placement questions.',
};

export default lesson;
