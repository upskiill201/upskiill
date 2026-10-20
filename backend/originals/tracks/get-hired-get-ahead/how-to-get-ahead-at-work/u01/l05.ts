import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: end of week one. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Friday, week one',
  summary: 'End of week one. Clinton\'s notes doc has 23 pages, his plan is on the wall, and Paul said "good question" once. Miracle calls for a quick quiz. Day one, the 90-day idea, the first chat and the plan.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose a smart first week', 'Explain the first-90-days idea', 'Write and use a 30-60-90 plan'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 6pm',
      beats: [
        { speaker: 'narrator', text: 'Friday, 6pm. Week one done. 23 pages of notes. A plan taped above his desk at home.' },
        { speaker: 'clinton', text: 'And Paul said "good question" today. Out loud. To me.' },
        { speaker: 'miracle', text: 'Big week. Quick quiz before you celebrate.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: end of week one.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the aim of the first weeks?',
        options: [
          { text: 'Learn fast and understand what "good" looks like' },
          { text: 'Ship something big', why: 'That often backfires.' },
          { text: 'Stay invisible', why: 'Quiet, not invisible.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the 30-60-90 phases in order.',
        lines: ['Learn', 'Contribute', 'Own'],
      },
      {
        kind: 'sortGroups',
        prompt: 'One of the four early focuses, or not?',
        groups: ['Focus', 'Not one'],
        items: [
          { text: 'Learn fast, on purpose', group: 0 },
          { text: 'A small early win', group: 0 },
          { text: 'Rewrite everything', group: 1 },
          { text: 'Build relationships', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak first-chat opener.',
        lines: ['What does success look like at 90 days?', 'Let me know if you need anything!', 'How would you like updates?'],
        bug: 1,
        explanation: 'Polite but vague. Ask about success and updates.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'Paul said "good question". Why do you think he finally answered?',
        options: [
          { text: 'I\'d read the docs first, so my question was specific and showed I\'d tried.' },
          { text: 'Luck.', why: 'Homework made it a good question.' },
          { text: 'I asked loudly.', why: 'It was specific, after reading the docs.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its source.',
        pairs: [
          ['The First 90 Days', 'Michael D. Watkins, 2003'],
          ['Success at 30/60/90', 'Clinton\'s chat with Ngozi'],
          ['Tuesday 1:1s', 'How Ngozi likes updates'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton do with his plan each week?',
        options: [
          { text: 'Bring it to the Tuesday 1:1 and update it' },
          { text: 'Keep it in a drawer', why: 'Use it weekly.' },
          { text: 'Rewrite it every day', why: 'Weekly is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s summary.',
        template: 'Learn fast, agree [[1]], get a small [[2]], build relationships.',
        blanks: [['success'], ['win']],
        distractors: ['salary', 'promotion', 'title'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages of notes did Clinton write in week one? (a number)',
        answers: ['23', 'twenty-three', 'twenty three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Days 1–30 or days 31–60?',
        groups: ['Days 1–30', 'Days 31–60'],
        items: [
          { text: 'Learn the sync service', group: 0 },
          { text: 'Ship one small fix', group: 1 },
          { text: 'Meet the team', group: 0 },
          { text: 'Review Paul\'s pull requests', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Clinton send after his first chat with Ngozi?',
        options: [
          { text: 'A three-line summary to check he understood' },
          { text: 'Nothing', why: 'A summary avoids misunderstandings.' },
          { text: 'A complaint about Paul', why: 'A short summary of what was agreed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing from this week you\'ll use in your own job, course or project?',
    starters: ['I\'ll use...', 'Starting...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Share your 30-60-90 plan with your manager, teacher or mentor and ask: "Does this match what you\'d want from me?"',
  },
  notes: 'Checkpoint 1 = last free lesson of How to Get Ahead at Work. Reviews l01–l04. Doubles as Jump ahead / placement questions.',
};

export default lesson;
