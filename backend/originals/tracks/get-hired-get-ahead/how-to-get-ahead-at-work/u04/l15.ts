import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Ngozi says yes to the experiment. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: "Let\'s try it"',
  summary: 'Clinton tells Ngozi about product. She\'s quiet, then says: "I\'d rather you grow here than leave. Take the user research for the split, and join Aïcha\'s planning once a month." Then Miracle quizzes him. Family, skills, telling your manager, reviews.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle family expectations', 'Build skills through stretch work', 'Share and review your plan'],
  learn: [
    {
      kind: 'story',
      title: 'Ngozi\'s answer',
      beats: [
        { speaker: 'ngozi', text: 'I\'d rather you grow here than leave. Take the user research for the split, and join Aïcha\'s planning once a month. Keep your engineering work strong.' },
        { speaker: 'clinton', text: 'Thank you. I will.' },
        { speaker: 'miracle', text: '(later) You told her, and she helped. Quiz.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: Ngozi said yes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Ngozi offer?',
        options: [
          { text: 'A product manager job now', why: 'A small experiment.' },
          { text: 'User research for the split, and monthly product planning' },
          { text: 'Nothing', why: 'Two specific things.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the quarterly review in order.',
        lines: ['Put it in the calendar', 'Look at the evidence', 'Check the direction', 'Update skills and steps', 'Share the update'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Stretch work, people, or course?',
        groups: ['Stretch work', 'People'],
        items: [
          { text: 'Leading user research', group: 0 },
          { text: 'Aïcha\'s feedback', group: 1 },
          { text: 'Writing a real spec', group: 0 },
          { text: 'Monthly planning with Aïcha', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the response that ignores a family concern.',
        lines: ['What worries you most?', 'You don\'t understand anything about my world.', 'Here\'s my contract and savings.'],
        bug: 1,
        explanation: 'Dismissive. Find and address the concern.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'Why do you think Ngozi said yes?',
        options: [
          { text: 'Luck.', why: 'The framing and the ask helped.' },
          { text: 'I threatened to leave.', why: 'He didn\'t.' },
          { text: 'I framed it as growth, committed to my current work, and asked for something small and specific.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the skill.',
        pairs: [
          ['Mum\'s bank job', 'Find the concern behind it'],
          ['Telling Ngozi', 'Frame it as growth'],
          ['Quarterly review', 'Update with evidence'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does "70-20-10" remind you?',
        options: [
          { text: 'Experience first, then people, then courses' },
          { text: 'Courses first', why: 'Courses are the smallest part.' },
          { text: 'It\'s a proven formula', why: 'A rule of thumb.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngozi\'s line.',
        template: 'I\'d rather you [[1]] here than [[2]].',
        blanks: [['grow'], ['leave']],
        distractors: ['stay', 'quit', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How often will Clinton join product planning? Once a ___. (one word)',
        answers: ['month'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Growth framing or escape framing?',
        groups: ['Growth', 'Escape'],
        items: [
          { text: 'I\'d love to test product here', group: 0 },
          { text: 'I\'m done with engineering', group: 1 },
          { text: 'I\'ll keep my work strong', group: 0 },
          { text: 'Get me off this team', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why share your plan update with people?',
        options: [
          { text: 'To show off', why: 'So they can help.' },
          { text: 'No reason', why: 'So they can help.' },
          { text: 'They can spot chances for you' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What small experiment could your manager or teacher help you run in a direction you\'re curious about?',
    starters: ['The experiment:', 'I\'d ask them...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask for one small, specific experiment in your current role. Frame it as growth.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
