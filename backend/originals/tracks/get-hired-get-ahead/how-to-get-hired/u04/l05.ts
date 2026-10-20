import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: football, day two. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: football, day two',
  summary: 'Day two. Football on the dusty campus pitch. Clinton scores, misses three more, and feels a little more like himself. On the walk home, David quizzes him. Waiting before you reply, why companies say no, gracious replies and the first 48 hours.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Respond to a rejection without regret', 'Explain why companies say no', 'Use the 48-hour plan'],
  learn: [
    {
      kind: 'story',
      title: 'The walk home',
      beats: [
        { speaker: 'narrator', text: 'Day two. One goal, three misses, a lot of laughing. Walking home in the evening heat.' },
        { speaker: 'david', text: 'You look human again. Did you send the reply?' },
        { speaker: 'clinton', text: 'This morning. Four lines. No arguing.' },
        { speaker: 'david', text: 'Good. Now I quiz you, like you always do to me.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: David\'s quiz.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the gracious reply in order.',
        lines: ['Thank them', 'Accept, with honest disappointment', 'Ask for feedback', 'Keep the door open'],
      },
      {
        kind: 'mcq',
        prompt: 'When should you reply to a rejection?',
        options: [
          { text: 'After some time to calm down, often the next day' },
          { text: 'Within one minute', why: 'That\'s when regret happens.' },
          { text: 'Never', why: 'A gracious reply keeps the door open.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In his control, or not?',
        groups: ['In his control', 'Not'],
        items: [
          { text: 'An answer he can improve', group: 0 },
          { text: 'An internal candidate', group: 1 },
          { text: 'A skill he can build', group: 0 },
          { text: 'A budget change', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that closes the door.',
        lines: ['Thank you for letting me know.', 'Can you reconsider? You\'ve made a mistake.', 'I\'d love to stay in touch.'],
        bug: 1,
        explanation: 'Arguing with the decision closes the door.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to David.',
        from: 'david',
        message: 'What are the five steps for the first 48 hours?',
        options: [
          { text: 'Let it hurt, talk to one person, no big decisions, one normal thing, then one small step.' },
          { text: 'Reply angrily, then sleep.', why: 'Wait first.' },
          { text: 'Pretend it never happened.', why: 'Feel it, then act.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reason to an example.',
        pairs: [
          ['Closer fit', 'More experience with one tool'],
          ['Timing', 'Could start sooner'],
          ['Something to improve', 'An answer that missed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What is a no to one application?',
        options: [
          { text: 'Information, not identity' },
          { text: 'Proof you\'re not good enough', why: 'One role, one moment.' },
          { text: 'The end of your career', why: 'Far from it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete David\'s summary.',
        template: 'Feel it, [[1]] someone, then one [[2]] step.',
        blanks: [['tell'], ['small']],
        distractors: ['blame', 'huge', 'angry'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many days should you avoid big decisions? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Gracious or bitter?',
        groups: ['Gracious', 'Bitter'],
        items: [
          { text: 'I enjoyed meeting the team', group: 0 },
          { text: 'Who did you hire instead?', group: 1 },
          { text: 'I\'d be grateful for feedback', group: 0 },
          { text: 'Your process is a joke', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Low feelings have lasted for weeks. What should Clinton do?',
        options: [
          { text: 'Talk to someone he trusts or a health professional' },
          { text: 'Keep it secret', why: 'Talking to someone is a strong step.' },
          { text: 'Work harder and ignore it', why: 'Get support.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What from this week would you want to remember the next time you get bad news?',
    starters: ['I want to remember...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Tell a friend your 48-hour plan, so they know what to do when you get bad news.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
