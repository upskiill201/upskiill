import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: Monday, round two. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Monday, round two',
  summary: 'A week later, Lucía gives her update again. Talk card in her pocket. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Give a clear two-minute update', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Monday, 9:05 a.m.',
      html: '<p><em>"Chili-lime is still 38% above target, now after nine weeks. Three things.</em></p><p><em>First, it\'s our best launch in three years. Second, Guadalajara has ten days of stock. Third, I need a yes on a bigger reorder by Thursday.</em></p><p><em>That\'s it."</em></p><p>One minute twenty. Two ums. Then Carmen asks: "What if the reorder\'s too big?" Lucía pauses, then: "Then we hold four extra weeks of stock, which keeps fine for months. Low risk."</p><p>Carmen says yes to the reorder before the next person speaks.</p>',
    },
    {
      kind: 'story',
      title: 'After the meeting',
      beats: [
        { speaker: 'carmen', text: 'That\'s how I want them. Next Tuesday you\'re in my leadership meeting. Bring a recommendation, not a report.' },
        { speaker: 'diego', text: 'Leadership meeting? Someone will ask "so what?" in the first ten seconds. Get ready.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: headline first, 30 seconds, fillers, three points, answer first. Next: in the room with leaders.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Monday, round two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How long did Lucía\'s update take this time?',
        options: [
          { text: 'One minute twenty' },
          { text: 'Four minutes', why: 'That was last time.' },
          { text: 'Ten minutes', why: 'One minute twenty.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 skill is this?',
        groups: ['Headline first', 'Rule of three'],
        items: [
          { text: '"Chili-lime is still 38% above target."', group: 0 },
          { text: '"Three things."', group: 1 },
          { text: 'Saying the result before anything else', group: 0 },
          { text: '"First... Second... Third..."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ums this time?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the skill.',
        pairs: [
          ['"That\'s it."', 'Stop'],
          ['A pause before answering Carmen', 'Pause instead of um'],
          ['"Then we hold four extra weeks..."', 'Answer first'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'A recommendation, not a report? What\'s the difference?',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'A report tells me what happened. A recommendation tells me what to do and why. Bring the second.' },
          { text: 'There\'s no difference.', why: 'There is.' },
          { text: 'A recommendation is longer.', why: 'It says what to do.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 in one line.',
        template: '[[1]] first, three points, then [[2]].',
        blanks: [['Headline'], ['stop']],
        distractors: ['Background', 'repeat everything'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line from last week\'s update would fail the talk card?',
        lines: [
          'Chili-lime is 38% above target.',
          'I need a yes on the reorder by Thursday.',
          'Before that, let me tell you about the photo shoot...',
          'That\'s it.',
        ],
        bug: 2,
        fix: 'Delete it, or send it in writing.',
        explanation: 'It buries the headline.',
      },
      {
        kind: 'mcq',
        prompt: 'When did Carmen say yes to the reorder?',
        options: [
          { text: 'Before the next person spoke' },
          { text: 'A week later', why: 'Straight away.' },
          { text: 'She said no', why: 'She said yes.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day is the leadership meeting?',
        answers: ['Tuesday', 'tuesday'],
        placeholder: 'A day',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s update.',
        lines: ['The headline', '"Three things"', 'First, second, third', '"That\'s it."', 'Answer Carmen\'s question'],
      },
    ],
  },
  reflect: {
    prompt: 'Give your next update using your talk card. Record it. How long, and how many fillers?',
    starters: ['It took...', 'Next time...'],
  },
  deepen: {
    title: 'Short is a courtesy',
    summary: 'A short, clear update gives everyone in the room time back. People notice, and they listen more closely next time.',
  },
  notes: 'Chapter 1 challenge (fictional): 1:20 update, two ums; Carmen approves the reorder. Hook: Tuesday leadership meeting, "a recommendation, not a report".',
};

export default lesson;
