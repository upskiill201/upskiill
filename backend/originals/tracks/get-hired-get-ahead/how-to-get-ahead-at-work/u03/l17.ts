import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 17 — story choice: a peer gets promoted first. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When a peer goes first',
  summary: 'Amadou, who joined Njangi Pay the same month as Clinton on the payments team, is promoted to Developer in February. The announcement gets 40 celebration reactions. Clinton\'s stomach twists. He\'s happy for Amadou. Mostly.',
  minutes: 11,
  outcomes: ['Handle a peer\'s promotion gracefully', 'Learn from others\' paths without comparing yourself to death', 'Keep your own plan'],
  learn: [
    {
      kind: 'story',
      title: 'The announcement',
      beats: [
        { speaker: 'narrator', text: 'February. A company-wide post: "Congratulations to Amadou, now Developer on Payments!" Forty reactions. Clinton started the same month.' },
        { speaker: 'clinton', text: '(to himself) Why him first? Is my plan even real?' },
        { speaker: 'tey', text: 'Feeling a sting when a peer moves first is human. What you do with it matters: it can become resentment, or useful information.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Congratulate Amadou sincerely, then ask him over coffee what made the difference.',
            outcome: 'Amadou: "I wrote three design docs and led the card-retry project. Same stuff you\'re doing, I just started earlier." Clinton\'s plan suddenly feels very real.',
            best: true,
          },
          {
            text: 'Say nothing, and complain to Kemi that it\'s unfair.',
            outcome: 'Kemi feels awkward. Word gets around that Clinton is bitter. Not the reputation you want a month before your own case.',
          },
          {
            text: 'Message Ngozi: "Why did Amadou get promoted and not me?"',
            outcome: 'Ngozi: "Amadou\'s promotion isn\'t about you. Your plan is on track for 1 March." He feels foolish.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Congratulate sincerely. Ask what made the difference. Keep your own plan. Comparison is information, not a verdict.',
    },
  ],
  apply: {
    scenario: 'Amadou is promoted first.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Is feeling a sting when a peer goes first normal?',
        options: [
          { text: 'Yes; what matters is what you do with it' },
          { text: 'No, it means you\'re a bad person', why: 'It\'s human.' },
          { text: 'Only for managers', why: 'It\'s human for anyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Graceful or bitter?',
        groups: ['Graceful', 'Bitter'],
        items: [
          { text: 'Sincere congratulations', group: 0 },
          { text: 'Complaining it\'s unfair', group: 1 },
          { text: 'Asking what made the difference', group: 0 },
          { text: '"Why him and not me?" to the manager', group: 1 },
          { text: 'Keeping his own plan', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Amadou.',
        from: 'clinton',
        message: 'What do I send Amadou?',
        options: [
          { text: '"Congratulations, well deserved! Coffee this week? I\'d love to hear what made the difference."' },
          { text: '"Lucky you."', why: 'Sincere congratulations.' },
          { text: 'Nothing.', why: 'Congratulate him.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the response that hurts Clinton\'s reputation.',
        lines: ['Congratulates Amadou.', 'Tells Kemi the promotion was unfair.', 'Asks Amadou over coffee.'],
        bug: 1,
        explanation: 'Word gets around. Bitterness hurts your own case.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Congratulate and ask', 'His plan feels real'],
          ['Complain to Kemi', 'A bitter reputation'],
          ['Ask Ngozi "why him?"', 'He feels foolish'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s response in order.',
        lines: ['Notice the sting', 'Congratulate sincerely', 'Ask what made the difference', 'Return to his own plan'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Amadou\'s path show Clinton?',
        options: [
          { text: 'The same steps he\'s taking, started earlier' },
          { text: 'That it\'s hopeless', why: 'It showed his plan works.' },
          { text: 'That Amadou cheated', why: 'Same steps, earlier.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Comparison is [[1]], not a [[2]].',
        blanks: [['information'], ['verdict']],
        distractors: ['failure', 'gift', 'rule'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many design docs did Amadou write? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful comparison, or harmful?',
        groups: ['Useful', 'Harmful'],
        items: [
          { text: 'What did he do that I could learn from?', group: 0 },
          { text: 'I\'m worse than everyone', group: 1 },
          { text: 'His path confirms my plan', group: 0 },
          { text: 'Life is unfair to me', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone near you moved ahead first. How did you react? What could you have learned from them?',
    starters: ['When...', 'I could have learned...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Congratulate someone on a recent win, sincerely. If it\'s relevant to you, ask what made the difference.',
  },
  notes: 'Amadou is a named extra (developer on the payments team).',
};

export default lesson;
