import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 19 — the learner's career plan (kit piece 4). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your career plan',
  summary: 'Your turn. Build your own one-page career plan from evidence about yourself, not guesses. It takes an evening to write and a few minutes a quarter to keep alive.',
  minutes: 12,
  outcomes: ['Write your own one-page career plan', 'Ground it in evidence', 'Set it up to be reviewed'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 4: your career plan',
      steps: [
        { title: '1. Gather evidence', body: 'Two weeks of energy audit, your honest top five values, and feedback you\'ve had.' },
        { title: '2. Explore', body: 'Talk to three people in roles you\'re curious about. Try one small piece of the work.' },
        { title: '3. Write the direction and why', body: 'Two or three years, roughly. "Probably" is allowed. Name the evidence.' },
        { title: '4. Skills, experiences, next three months', body: 'Two skills with real work and a reviewer. One stretch experience. Two or three concrete steps.' },
        { title: '5. Share and schedule', body: 'Two lines to your manager or mentor. A repeating quarterly review in your calendar.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Evidence, exploration, direction and why, skills and steps, share and schedule.',
    },
  ],
  apply: {
    scenario: 'You write your career plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the kit steps in order.',
        lines: ['Gather evidence', 'Explore', 'Write the direction and why', 'Skills, experiences, next three months', 'Share and schedule'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence about yourself, or not?',
        groups: ['Evidence', 'Not evidence'],
        items: [
          { text: 'Energy audit', group: 0 },
          { text: 'What\'s trending online', group: 1 },
          { text: 'Honest values ranking', group: 0 },
          { text: 'Feedback you\'ve received', group: 0 },
          { text: 'A friend\'s dream job', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is "probably" allowed in your direction?',
        options: [
          { text: 'Yes: honest uncertainty is fine' },
          { text: 'No, you must be certain', why: 'Honest uncertainty is fine.' },
          { text: 'Only for experts', why: 'For everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner is still at school. Can they write a career plan?',
        options: [
          { text: 'Yes: energy audit from school and hobbies, values, a few conversations, and next-three-month steps.' },
          { text: 'No, too young.', why: 'It works at any stage.' },
          { text: 'Only if they know their job title.', why: 'A direction is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak plan step.',
        lines: ['Two skills with a reviewer.', 'Review it when I feel like it.', 'Share two lines with a mentor.'],
        bug: 1,
        explanation: 'Schedule it, or it dies in a drawer.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to an example.',
        pairs: [
          ['Evidence', 'Two weeks of energy notes'],
          ['Explore', 'Three conversations, one small task'],
          ['Schedule', 'Quarterly review reminder'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How many people should you talk to while exploring?',
        options: [
          { text: 'About three' },
          { text: 'None', why: 'About three.' },
          { text: 'Fifty', why: 'About three is enough to start.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the kit.',
        template: 'Evidence, [[1]], direction, skills, [[2]].',
        blanks: [['exploration', 'explore'], ['schedule', 'review']],
        distractors: ['guessing', 'quitting', 'luck'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many skills should the plan focus on? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the plan, or not?',
        groups: ['In it', 'Not'],
        items: [
          { text: 'A review date', group: 0 },
          { text: 'A title chosen to impress', group: 1 },
          { text: 'Next three-month steps', group: 0 },
          { text: 'Seventeen skills', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your direction line now, with one piece of evidence behind it.',
    starters: ['Direction:', 'Because:'],
  },
  deepen: {
    title: 'Your kit, piece 4',
    summary: 'Write your one-page career plan. Share two lines with your manager or mentor, and set a quarterly review.',
  },
  notes: 'Kit piece 4 of How to Get Ahead at Work.',
};

export default lesson;
