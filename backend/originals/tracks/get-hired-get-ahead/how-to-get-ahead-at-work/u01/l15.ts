import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: the incident review. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the incident review',
  summary: 'The team holds a short review of the duplicate-confirmation bug. No blame, just "what happened, why, what we\'ll change". Clinton volunteers to write it up. Then Ngozi asks the newest person a few questions: him. Bugs, unwritten rules, 1:1s and relationships.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Own a mistake well', 'Find and follow unwritten rules', 'Use 1:1s and relationships'],
  learn: [
    {
      kind: 'story',
      title: 'The review',
      beats: [
        { speaker: 'narrator', text: 'Thursday. Twenty minutes, whiteboard, no blame. What happened. Why the tests missed it. What changes.' },
        { speaker: 'ngozi', text: 'Clinton flagged it at 7:15am and wrote this up. That\'s exactly what I want. Now, a few questions for our newest person.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: after the incident review.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the "I broke something" message in order.',
        lines: ['What you see', 'What you think caused it', 'What you\'re doing now', 'What you need'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best question for finding unwritten rules?',
        options: [
          { text: '"Anything people usually learn the hard way here?"' },
          { text: '"Are there rules?"', why: 'Too vague.' },
          { text: '"Who\'s in charge?"', why: 'Ask what people learn the hard way.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good 1:1 habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Bringing an agenda', group: 0 },
          { text: 'Turning up with nothing', group: 1 },
          { text: 'A running notes doc', group: 0 },
          { text: 'Only talking about the weather', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks a blameless review.',
        lines: ['The tests didn\'t cover duplicate sync.', 'Clinton is careless.', 'We\'ll add a duplicate test.'],
        bug: 1,
        explanation: 'Reviews focus on what happened and what changes, not blame.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Ngozi.',
        from: 'ngozi',
        message: 'Why did it matter that you flagged it at 7:15 instead of fixing it quietly?',
        options: [
          { text: 'Support was already getting calls. Flagging it fast meant we rolled back in ten minutes and nobody hunted blind.' },
          { text: 'So I wouldn\'t get in trouble later.', why: 'The main reason is the problem was already spreading.' },
          { text: 'It didn\'t matter.', why: 'It mattered a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to what they know.',
        pairs: [
          ['Support lead', 'What drivers complain about'],
          ['QA tester', 'What breaks in releases'],
          ['Paul', 'Payments code standards'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should you meet people outside your team?',
        options: [
          { text: 'Early, before you need them' },
          { text: 'Only in a crisis', why: 'Before you need them.' },
          { text: 'Never', why: 'They often help most.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngozi\'s review rules.',
        template: 'What happened, [[1]], what we\'ll [[2]].',
        blanks: [['why'], ['change']],
        distractors: ['who', 'hide', 'punish'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time did Clinton flag the bug? (for example 7:15)',
        answers: ['7:15', '715', '7.15', '7:15am'],
        placeholder: 'A time',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds trust after a mistake, or not?',
        groups: ['Builds', 'Breaks'],
        items: [
          { text: 'Writing up the incident', group: 0 },
          { text: 'Pretending it was someone else', group: 1 },
          { text: 'Suggesting the missing test', group: 0 },
          { text: 'Getting defensive', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Whose meeting is a 1:1, mostly?',
        options: [
          { text: 'Yours: bring the agenda' },
          { text: 'Only the manager\'s', why: 'Mostly yours.' },
          { text: 'Nobody\'s', why: 'Yours.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from this week would most change how you handle mistakes or meetings?',
    starters: ['The idea is...', 'I\'ll start by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time something goes wrong in a group, suggest a short no-blame review: what happened, why, what changes.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14. Blameless post-incident reviews are common practice in software teams.',
};

export default lesson;
