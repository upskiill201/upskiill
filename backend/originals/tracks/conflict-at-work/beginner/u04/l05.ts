import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: hearing criticism',
  summary: 'The sting, the three triggers, what\'s right in it, and reacting vs responding. A quick check before Grace learns how to disagree calmly to Callum\'s face.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Name your trigger and find the fair part', 'Respond instead of reacting'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 9:30',
      beats: [
        { speaker: 'narrator', text: 'Callum replies to Grace\'s email: "Thanks, that data is useful. Thursday at 2?"' },
        { speaker: 'grace', text: 'Monday-night me would have started a war. Tuesday-morning me got a meeting.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: hearing criticism.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which trigger?',
        groups: ['Truth', 'Relationship', 'Identity'],
        items: [
          { text: '"That\'s just not accurate."', group: 0 },
          { text: '"How dare she say that to me?"', group: 1 },
          { text: '"I\'m clearly bad at my job."', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best first question to ask about unfair criticism?',
        options: [
          { text: '"How can I prove them wrong?"', why: 'Find the fair part first.' },
          { text: '"What might be right in this?"' },
          { text: '"Who else agrees with me?"', why: 'Look at the content first.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trigger to how to handle it.',
        pairs: [
          ['Truth', 'Check the facts'],
          ['Relationship', 'Raise delivery privately'],
          ['Identity', 'Steady yourself'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'My code review said "this is messy". I want to reply "so is yours".',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Send it.', why: 'That\'s a reaction.' },
          { text: 'Rewrite all your code.', why: 'Find out what they meant first.' },
          { text: 'Write that in a draft and don\'t send it. Tomorrow, ask what specifically looked messy.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Content and delivery.',
        template: 'Answer the [[1]] in writing; raise the [[2]] in person.',
        blanks: [['content'], ['delivery']],
        distractors: ['insult', 'salary'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pilot data: 38% of over-65s vs 12% of younger patients drop out. How many percentage points higher for over-65s?',
        answers: ['26', '26%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this reply to criticism is a reaction?',
        lines: [
          'Thanks for the feedback.',
          'You\'re right that the report is long.',
          'But clearly you didn\'t bother reading it.',
          'I\'ll add a one-page summary.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A dig in the middle of a good response.',
      },
      {
        kind: 'mcq',
        prompt: 'What is switchtracking?',
        options: [
          { text: 'Changing jobs', why: 'It\'s about two conversations mixing.' },
          { text: 'Answering a point about the content with a complaint about the person' },
          { text: 'Taking a break', why: 'It\'s mixing truth and relationship.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day did Callum suggest meeting?',
        answers: ['Thursday', 'thursday'],
        placeholder: 'A day',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the handling of unfair criticism.',
        lines: ['Notice the sting', 'Name the trigger', 'Find what\'s right', 'Respond with evidence', 'Raise delivery privately'],
      },
    ],
  },
  reflect: {
    prompt: 'For criticism you\'re still carrying, write down: the trigger, the fair part, and your calm response.',
    starters: ['Trigger:...', 'Fair part:...', 'Response:...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. 38 − 12 = 26 percentage points.',
};

export default lesson;
