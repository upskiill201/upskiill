import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Aïcha's review. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Aïcha\'s review',
  summary: 'Aïcha reads Clinton\'s first user-research summary and leaves one comment: "Strong. You actually listened to the drivers. Most engineers don\'t." Before the next one, a quiz. Values, trade-offs, exploring and skills.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Rank values honestly', 'Handle value trade-offs', 'Explore a direction and plan skills'],
  learn: [
    {
      kind: 'story',
      title: 'One comment',
      beats: [
        { speaker: 'narrator', text: 'Aïcha\'s comment on the summary: "Strong. You actually listened to the drivers. Most engineers don\'t."' },
        { speaker: 'clinton', text: '(to himself) Energy up. Very up.' },
        { speaker: 'miracle', text: '(on video) That\'s data. Quiz, then let\'s keep testing.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: after Aïcha\'s review.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the exploration steps in order.',
        lines: ['Talk to three people who do it', 'Ask what the work is really like', 'Try a small piece of the work', 'Notice how it feels'],
      },
      {
        kind: 'mcq',
        prompt: 'What should you do first when two values clash?',
        options: [
          { text: 'Look for options that satisfy both' },
          { text: 'Pick one forever', why: 'Look for both first.' },
          { text: 'Ignore it', why: 'Name it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Value or constraint?',
        groups: ['Value', 'Constraint'],
        items: [
          { text: 'Building things people rely on', group: 0 },
          { text: 'Staying in Cameroon', group: 1 },
          { text: 'Learning from better people', group: 0 },
          { text: 'Supporting his mum', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak skills plan.',
        lines: ['Interview 10 drivers by June.', 'Learn seventeen skills this quarter.', 'Aïcha reviews my summaries.'],
        bug: 1,
        explanation: 'Too many. Two skills, real work.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'What does Aïcha\'s comment tell you?',
        options: [
          { text: 'That I might be good at the part of product I enjoy most. One data point; I\'ll keep testing.' },
          { text: 'That I should quit tomorrow.', why: 'Keep testing.' },
          { text: 'Nothing.', why: 'It\'s useful data.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to an example.',
        pairs: [
          ['Value clash', 'Lagos role vs staying near family'],
          ['Small experiment', 'User-research summary'],
          ['Honest ranking', 'Title ranked last'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes a skills plan work?',
        options: [
          { text: 'Two skills, real work, a reviewer, a sign of progress' },
          { text: 'Many courses', why: 'Two skills with real work.' },
          { text: 'A long list', why: 'Two skills.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Aïcha\'s comment.',
        template: 'You actually [[1]] to the [[2]].',
        blanks: [['listened'], ['drivers']],
        distractors: ['talked', 'managers', 'code'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did Aïcha say "most engineers don\'t" do? Listen to the ___. (one word)',
        answers: ['drivers', 'users'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Small experiment or big leap?',
        groups: ['Small', 'Big leap'],
        items: [
          { text: 'Write one spec', group: 0 },
          { text: 'Resign to go into product', group: 1 },
          { text: 'Sit in on planning', group: 0 },
          { text: 'Move to Lagos tomorrow', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write down why you chose a trade-off?',
        options: [
          { text: 'So later you can see it was reasonable' },
          { text: 'To show off', why: 'It\'s for you.' },
          { text: 'No reason', why: 'It helps later.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one piece of "data" about yourself you\'ve gathered recently from trying something new?',
    starters: ['I tried...', 'I learned...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask for a review of one piece of work in a direction you\'re curious about. Treat the feedback as data.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
