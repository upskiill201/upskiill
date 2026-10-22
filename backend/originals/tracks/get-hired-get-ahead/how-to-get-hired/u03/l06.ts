import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 6 — a full STAR answer, part by part. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A STAR answer, up close',
  summary: 'Miracle sends Clinton a recording of the best answer she ever heard to "Tell me about a time you made a mistake." It came from a graduate she hired at Afiya, and it\'s about breaking something. Tap each line.',
  minutes: 11,
  outcomes: ['Recognise each part of a strong STAR answer', 'Answer a "mistake" question honestly', 'Show what you changed afterwards'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of the answer',
      text: 'In my placement at a clinic, I updated the appointment reminders and accidentally sent 200 patients the wrong date.\nIt was my job to fix it, and fast, before people started arriving on the wrong day.\nI told my supervisor within ten minutes, sent a correction with an apology, and phoned the 30 patients booked for the next morning myself.\nOnly two patients came on the wrong day, and we saw both.\nSince then, I always send a test reminder to myself first. I\'ve never sent a wrong date again.',
      hotspots: [
        { phrase: 'accidentally sent 200 patients the wrong date', note: 'A real mistake, said plainly. No minimising, no "my perfectionism".' },
        { phrase: 'It was my job to fix it, and fast', note: 'The task: owning the fix, not blaming the system.' },
        { phrase: 'I told my supervisor within ten minutes', note: 'The key action. Telling quickly is what interviewers most want to hear.' },
        { phrase: 'Only two patients came on the wrong day', note: 'A result with numbers: the damage was contained.' },
        { phrase: 'I always send a test reminder to myself first', note: 'What changed. The best mistake stories end with a habit, not just an apology.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'For a mistake question: a real mistake, owned fast, a contained result, and the habit you changed.',
    },
  ],
  apply: {
    scenario: 'Clinton studies the mistake answer.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the mistake answer in order.',
        lines: ['The mistake, said plainly', 'Owning the fix', 'Telling the supervisor fast', 'The contained result', 'The habit that changed'],
      },
      {
        kind: 'mcq',
        prompt: 'What do interviewers most want to hear in a mistake story?',
        options: [
          { text: 'That it wasn\'t your fault', why: 'Ownership matters more than blame.' },
          { text: 'That you owned it and told someone fast' },
          { text: 'That you\'ve never made a mistake', why: 'Nobody believes that.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak in a mistake answer?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'I told my supervisor within ten minutes', group: 0 },
          { text: 'The software was bad', group: 1 },
          { text: 'I now send a test reminder first', group: 0 },
          { text: 'My only mistake is caring too much', group: 1 },
          { text: 'Only two patients came on the wrong day', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would hurt this answer.',
        lines: ['I sent 200 patients the wrong date.', 'But honestly, it was really my supervisor\'s fault.', 'I phoned the 30 booked for the next morning.'],
        bug: 1,
        explanation: 'Blaming others undoes the whole story. Own it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Which mistake should I use? I once pushed a broken sync to the test phones.',
        options: [
          { text: 'None, I\'ll say I\'m a perfectionist.', why: 'A real mistake, well handled, is stronger.' },
          { text: 'The worst thing I\'ve ever done.', why: 'Pick a real, work-related one with a good ending.' },
          { text: 'That one: I\'ll say what broke, how fast I told Mr Tamba, the result, and what I test now.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its STAR part.',
        pairs: [
          ['Sent 200 patients the wrong date', 'Situation'],
          ['Phoned the 30 booked for tomorrow', 'Action'],
          ['Only two came on the wrong day', 'Result'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should a mistake story end?',
        options: [
          { text: 'With the habit you changed' },
          { text: 'With an apology to the interviewer', why: 'End with what you changed.' },
          { text: 'With who was really to blame', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'A real mistake, [[1]] fast, a contained result, and the [[2]] you changed.',
        blanks: [['owned'], ['habit']],
        distractors: ['hidden', 'boss', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many patients got the wrong date? (a number)',
        answers: ['200', 'two hundred'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good mistake to talk about, or risky?',
        groups: ['Good choice', 'Risky'],
        items: [
          { text: 'A bug you caught and fixed fast', group: 0 },
          { text: 'Something illegal', group: 1 },
          { text: 'A missed deadline you recovered from', group: 0 },
          { text: 'A mistake you never fixed', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a real mistake you made and fixed? What habit did you change afterwards?',
    starters: ['My mistake was...', 'Now I always...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your mistake story in five lines: mistake, owning it, telling someone, result, new habit.',
  },
  notes: 'The clinic example is invented (the speaker is an unnamed former Afiya graduate hire).',
};

export default lesson;
