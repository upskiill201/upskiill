import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: the leadership meeting. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The leadership meeting',
  summary: 'Lucía joins Carmen\'s leadership meeting for the first time, with the CEO, Señora Ibarra. She has five minutes on chili-lime. Ten seconds in, the CEO asks: "So what do you want us to do?"',
  minutes: 11,
  outcomes: [
    'See how senior meetings differ from team meetings',
    'Know why leaders want a recommendation',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 4 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Lucía opens with nine weeks of sales charts. Ten seconds in, Señora Ibarra, the CEO, raises a hand.' },
        { speaker: 'narrator', text: '"Lovely numbers. So what do you want us to do?"' },
        { speaker: 'lucia', text: 'I... think we should keep chili-lime going? Maybe more stores?' },
        { speaker: 'carmen', text: 'Afterwards: she wasn\'t being rude. She has nine decisions today. Give her one, with a reason.' },
        { speaker: 'tey', text: 'This chapter: what leaders listen for, recommending not reporting, speaking up, and disagreeing upward.' },
      ],
      choice: {
        prompt: 'What should Lucía have opened with?',
        options: [
          { text: '"I recommend we make chili-lime permanent and take it to Monterrey."', outcome: 'Yes. A clear recommendation she can say yes or no to.', best: true },
          { text: 'Nine weeks of sales charts', outcome: 'That\'s a report. The CEO asked "so what?" in ten seconds.' },
          { text: '"Thank you so much for having me."', outcome: 'Polite, but it uses the ten seconds she had.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Senior people need a decision, not a tour. Bring a recommendation they can say yes or no to.',
    },
  ],
  apply: {
    scenario: 'The leadership meeting.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds in did the CEO interrupt?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Señora Ibarra ask?',
        options: [
          { text: '"Can you show more charts?"', why: 'She wanted a decision.' },
          { text: '"So what do you want us to do?"' },
          { text: '"Who are you?"', why: 'She asked "so what?".' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Recommendation or report?',
        groups: ['Recommendation', 'Report'],
        items: [
          { text: '"I recommend we take chili-lime to Monterrey."', group: 0 },
          { text: '"Here are nine weeks of sales."', group: 1 },
          { text: '"Make it permanent, starting October."', group: 0 },
          { text: '"Here\'s what happened each week."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I thought she\'d want to see all the data first.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'She does. Show more next time.', why: 'She asked for a decision.' },
          { text: 'She doesn\'t care about data.', why: 'She does, as support.' },
          { text: 'She trusts us with the data. She wants our judgement: what to do, and why. Data on request.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their role.',
        pairs: [
          ['Señora Ibarra', 'Nopal\'s CEO'],
          ['Carmen', 'Marketing director, Lucía\'s boss'],
          ['Lucía', 'Leads the chili-lime team'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Senior people need a [[1]], not a [[2]].',
        blanks: [['decision'], ['tour']],
        distractors: ['chart', 'joke'],
      },
      {
        kind: 'mcq',
        prompt: 'How many decisions does the CEO have to make today?',
        options: [
          { text: 'One', why: 'Nine.' },
          { text: 'Nine' },
          { text: 'None', why: 'Nine.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which opening line wastes Lucía\'s ten seconds?',
        lines: [
          '"I recommend we make chili-lime permanent."',
          '"And take it to Monterrey from October."',
          '"So, let me start with week one, back in June..."',
          '"It\'s 38% above target, so the risk is low."',
        ],
        bug: 2,
        fix: 'Start with the recommendation.',
        explanation: 'Week one is history, not a decision.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['What leaders listen for', 'Recommend, don\'t report', 'Speaking up', 'Disagreeing upward'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did Lucía have?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you spoke to someone senior. Did you bring a decision, or a tour?',
    starters: ['I brought...', 'Next time...'],
  },
  deepen: {
    title: 'Why leaders interrupt',
    summary: 'Senior people often interrupt to steer, not to be rude: they have many decisions and little time. A recommendation up front gives them what they\'re steering towards.',
  },
  notes: 'Fictional: Señora Ibarra (Nopal CEO, narrator-only, not in CAST). Chili-lime 38% above target after nine weeks.',
};

export default lesson;
