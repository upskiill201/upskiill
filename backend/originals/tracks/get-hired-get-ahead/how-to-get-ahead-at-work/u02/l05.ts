import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: the next 1:1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one result',
  summary: 'Next Tuesday, Clinton brings Ngozi one line, not eleven: "Sync status shipped; calls down from about 40 to 25 a week." She smiles. Then Miracle checks he knows why that worked. Busy vs valuable, four kinds of value, impact entries, team goals.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Tell busy apart from valuable', 'Write impact entries', 'Connect work to team goals'],
  learn: [
    {
      kind: 'story',
      title: 'One line',
      beats: [
        { speaker: 'narrator', text: 'Tuesday 1:1. Clinton reads one line: "Sync status shipped; calls down from about 40 to 25 a week."' },
        { speaker: 'ngozi', text: 'That\'s the kind of line I can take to my boss. Keep doing that.' },
        { speaker: 'miracle', text: '(later, on video) Good. Now tell me why it worked.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: why one line worked.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did one line beat eleven tasks?',
        options: [
          { text: 'It was shorter', why: 'It showed impact.' },
          { text: 'It showed impact on a team goal, with a number' },
          { text: 'Ngozi was in a good mood', why: 'It showed impact on a goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Activity or impact?',
        groups: ['Activity', 'Impact'],
        items: [
          { text: 'Three meetings', group: 0 },
          { text: 'Calls down from 40 to 25', group: 1 },
          { text: 'Reviewed PRs', group: 0 },
          { text: 'Agents see last sync time', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of value to an example.',
        pairs: [
          ['Reliability', 'Says early when he\'s late'],
          ['Making others better', 'The onboarding notes doc'],
          ['Impact', 'Fewer support calls'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps to find what matters in order.',
        lines: ['Look for the written goals', 'Ask "What are we measured on?"', 'Draw the line from your work', 'Re-rank your week'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the activity-only entry.',
        lines: ['Sync status: calls down to about 25.', 'Worked on sync, had meetings.', 'Support lead: "This saves us hours."'],
        bug: 1,
        explanation: 'No who, no number. Just activity.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'Which two kinds of value can you offer even as a new person?',
        options: [
          { text: 'Only rare skills.', why: 'Those take time.' },
          { text: 'Long hours.', why: 'Not one of the four.' },
          { text: 'Reliability and making others better.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should an impact entry include?',
        options: [
          { text: 'What, who it helped, a number, a quote' },
          { text: 'Only hours worked', why: 'What, who, number, quote.' },
          { text: 'A list of meetings', why: 'What, who, number, quote.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngozi\'s praise.',
        template: 'That\'s the kind of [[1]] I can take to my [[2]].',
        blanks: [['line'], ['boss']],
        distractors: ['excuse', 'lunch', 'party'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many sync calls a week are there now? (a number)',
        answers: ['25', 'twenty-five', 'twenty five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real value, or just feels like it?',
        groups: ['Real', 'Feels like it'],
        items: [
          { text: 'Fewer failed confirmations', group: 0 },
          { text: 'Being in every meeting', group: 1 },
          { text: 'A doc the whole team uses', group: 0 },
          { text: 'Replying to messages at midnight', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the unlock question for team goals?',
        options: [
          { text: '"What\'s for lunch?"', why: 'Ask what you\'re measured on.' },
          { text: '"Who\'s the boss?"', why: 'Ask what you\'re measured on.' },
          { text: '"What are we measured on this quarter?"' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write one impact line you could take to your manager or teacher this week.',
    starters: ['I...', 'Which helped...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Bring one impact line, not a task list, to your next check-in with someone senior.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
