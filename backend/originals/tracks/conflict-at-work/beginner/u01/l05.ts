import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: what conflict is',
  summary: 'Quiet conflict, the five modes, avoiding vs addressing, and task vs relationship conflict. A quick check before Grace finds out what her own default is.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Name conflict modes and when they fit', 'Tell task from relationship conflict'],
  learn: [
    {
      kind: 'story',
      title: 'Friday afternoon',
      beats: [
        { speaker: 'narrator', text: 'Grace and Femi spend an hour on step 3. It\'s awkward for five minutes, then it\'s just work.' },
        { speaker: 'grace', text: 'Three days of dread, for five awkward minutes. I need to remember that.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what conflict is.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the mode to when it fits.',
        pairs: [
          ['Competing', 'Emergencies and safety'],
          ['Collaborating', 'Important issue and relationship'],
          ['Avoiding', 'Trivial issues'],
          ['Accommodating', 'It matters more to them'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Task or relationship conflict?',
        groups: ['Task', 'Relationship'],
        items: [
          { text: '"Which font for the button?"', group: 0 },
          { text: '"He thinks he\'s better than us."', group: 1 },
          { text: '"Launch on the 14th or the 21st?"', group: 0 },
          { text: '"She\'s so negative."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does avoiding an important conflict usually do?',
        options: [
          { text: 'Makes it grow and spread to the team' },
          { text: 'Solves it', why: 'Nothing has been said.' },
          { text: 'Nothing', why: 'It quietly costs more.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'A colleague keeps taking credit for my slides. Should I let it go?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'It affects your work and reputation, so it\'s worth addressing: early, privately and briefly.' },
          { text: 'Yes, avoid it.', why: 'It\'s too important to avoid.' },
          { text: 'Call them out in the all-hands.', why: 'Start privately.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Addressing a conflict.',
        template: 'What [[1]], how it felt, what you\'d like [[2]].',
        blanks: [['happened'], ['next']],
        distractors: ['failed', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes was the conversation awkward before it became "just work"?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this opener goes personal?',
        lines: [
          'Have you got a minute?',
          'In the meeting, you presented my slides as yours.',
          'You\'re such a credit thief.',
          'Next time, could we present them together?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It labels the person.',
      },
      {
        kind: 'mcq',
        prompt: 'Which mode is "Let\'s find a way that works for both of us"?',
        options: [
          { text: 'Collaborating' },
          { text: 'Compromising', why: 'That\'s "each give a bit".' },
          { text: 'Accommodating', why: 'That\'s "your way".' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Address it, or let it go?',
        groups: ['Address', 'Let go'],
        items: [
          { text: 'Repeated public blame', group: 0 },
          { text: 'A one-off grumpy "morning"', group: 1 },
          { text: 'Being left off key emails', group: 0 },
          { text: 'A different taste in music', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a short, private opener.',
        lines: ['Ask for a moment', 'Say what happened', 'Say how it felt', 'Suggest what\'s next'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one conflict you\'ll address this week, early, privately and briefly?',
    starters: ['I will talk to...', 'I\'ll say...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4.',
};

export default lesson;
