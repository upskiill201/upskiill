import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: phone across the room',
  summary: 'Night three of the new rule. 10:30 p.m., the phone is charging by the door, and Kofi is making a beat on his old speaker. Check what you know: patterns, HALT + BS, retail therapy and triggers.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Name your trigger', 'Meet the real need behind an urge'],
  learn: [
    {
      kind: 'story',
      title: '10:30 p.m.',
      beats: [
        { speaker: 'yaw', text: 'Why is your phone by the door?' },
        { speaker: 'kofi', text: 'Because my bed is a shop after 10. Not any more.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the feelings underneath.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each HALT + BS feeling to its fix.',
        pairs: [
          ['Hungry', 'Eat'],
          ['Lonely', 'Contact a person'],
          ['Tired', 'Sleep'],
          ['Bored', 'Make something'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Kofi change first?',
        options: [
          { text: 'He deleted every app forever', why: 'Bans alone tend to snap back.' },
          { text: 'He only buys cheap things at night', why: 'That keeps the habit running.' },
          { text: 'The moment: phone across the room after 10, something else for bad nights' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact about retail therapy?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'It can lift mood briefly', group: 1 },
          { text: 'It fixes what caused the bad day', group: 0 },
          { text: 'It can become a habit', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the trigger steps.',
        lines: ['Gather two weeks', 'Count each detail', 'Find combinations', 'Name the trigger', 'Rank and pick one'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Bad day. I\'m going to buy something. It\'s therapy.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'HALT check first. Hungry? Let\'s eat. Then if you still want it tomorrow, fine.' },
          { text: 'Sure, therapy.', why: 'Six things on Tuesday says it\'s a habit now.' },
          { text: 'You\'re hopeless.', why: 'Unkind and unhelpful.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The heart of it.',
        template: 'The urge is about a [[1]], in a [[2]].',
        blanks: [['feeling'], ['moment']],
        distractors: ['price', 'shop'],
      },
      {
        kind: 'findBug',
        prompt: 'Which trigger sentence is complete?',
        lines: [
          'Sometimes I buy things.',
          'Shopping is bad.',
          'When I\'m in bed after 10, bored, I scroll shops.',
        ],
        bug: 0,
        fix: 'When [time/place], feeling [feeling], I [action].',
        explanation: 'The first line is too vague to catch. (The third is the good example.)',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Urges after 10 p.m. drop from 7 a week to 2. Over 4 weeks, how many fewer late-night urges?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what are the five costs of an impulse buy?',
        options: [
          { text: 'Only money', why: 'There are four more.' },
          { text: 'Money and delivery fees', why: 'Think wider: time, goals, feelings, habits.' },
          { text: 'Money, time, the next goal, the feeling, the habit' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: why does the good feeling after buying fade fast?',
        options: [
          { text: 'The product breaks', why: 'Often it\'s fine. The feeling was the want.' },
          { text: 'Wanting peaks before buying; liking is often smaller' },
          { text: 'It doesn\'t fade', why: 'Kofi\'s lasted four minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the T in HALT stand for?',
        answers: ['tired', 'tiredness'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What one change to your "danger moment" could you try tonight?',
    starters: ['My danger moment is...', 'Tonight I\'ll...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with Chapter 1 review. findBug here marks the vague line (index 0) as the problem; the explanation notes line 3 is the model.',
};

export default lesson;
