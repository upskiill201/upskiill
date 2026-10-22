import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: answering Callum. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: answering Callum',
  summary: 'Thursday at 2. Grace sits down with Callum: the content first, then the delivery. By 2:25 there\'s a plan, and a surprising admission from him. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Respond to unfair criticism face to face', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Thursday, 2 p.m.',
      html: '<p>Grace: <em>"Thanks for making time. Can I check your concern? You\'re worried we\'d delay launch on too little evidence?"</em> Callum: <em>"Exactly."</em></p><p><em>"You\'re right that six sessions can\'t show how many patients are affected. Where I see it differently is "just opinions": these are recordings of what patients did. And the pilot data shows the scale: 38% of over-65s drop out at step 3, against 12% of younger patients."</em></p><p>Callum studies the chart. <em>"OK. That\'s real. What do you suggest?"</em></p><p><em>"Test Femi\'s fix with the pilot surgery next week, and decide on the 14th with the numbers."</em> Agreed.</p><p>Then Grace adds, softly: <em>"One more thing. Monday felt quite public. Could we raise concerns about each other\'s work one-to-one first? I\'d get you better answers that way."</em></p><p>Callum pauses. <em>"Fair. I was nervous about my first launch and came in too hard. Sorry."</em></p>',
    },
    {
      kind: 'story',
      title: '2:25 p.m.',
      beats: [
        { speaker: 'grace', text: 'He apologised. I didn\'t even ask him to.' },
        { speaker: 'priya', text: 'You gave him the data and a way to save face. That makes apologising easy.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: triggers, the useful part, responding, calm disagreement, public criticism. Next: boundaries.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: answering Callum.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the meeting.',
        lines: ['Check his concern', 'Agree with what\'s true', 'Say where she sees it differently', 'Show the data', 'Propose a test', 'Raise the delivery softly'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Callum say was behind his Monday comment?',
        options: [
          { text: 'He was nervous about his first launch and came in too hard' },
          { text: 'He thinks research is useless', why: 'He accepted the data.' },
          { text: 'He doesn\'t like Grace', why: 'It was nerves.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the chapter lesson.',
        pairs: [
          ['"You\'re right that six can\'t show scale"', 'What\'s right in it'],
          ['"Where I see it differently is..."', 'Disagreeing calmly'],
          ['"Monday felt quite public"', 'Delivery in private'],
          ['The Tuesday email', 'Reacting vs responding'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Content or delivery in the meeting?',
        groups: ['Content', 'Delivery'],
        items: [
          { text: 'The 38% chart', group: 0 },
          { text: '"One-to-one first"', group: 1 },
          { text: 'The pilot test next week', group: 0 },
          { text: '"Monday felt quite public"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Should I have asked him to apologise?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Yes, demand it.', why: 'Demanded apologies rarely feel real.' },
          { text: 'No. You named the impact and asked for a better habit. That gave him room to apologise himself, which means more.' },
          { text: 'You shouldn\'t have mentioned Monday.', why: 'Raising it softly helped.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did the meeting take (2:00 to 2:25)?',
        answers: ['25', 'twenty-five'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Raising the delivery.',
        template: '"Could we raise concerns about each other\'s work [[1]] first? I\'d get you [[2]] answers."',
        blanks: [['one-to-one', 'privately'], ['better']],
        distractors: ['publicly', 'fewer'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Grace frame the delivery request as helping him?',
        options: [
          { text: 'To manipulate him', why: 'It\'s true: she would answer better.' },
          { text: 'No reason', why: 'It saved his face.' },
          { text: 'It makes the change easy to accept, without blame' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line would have spoiled the meeting?',
        lines: [
          'You\'re right that six can\'t show scale.',
          'Here\'s the pilot data.',
          'And frankly, you embarrassed yourself on Monday.',
          'Could we raise concerns one-to-one first?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It humiliates him and invites a fight.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the pilot data, what percentage of over-65s drop out at step 3?',
        answers: ['38', '38%'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Plan a meeting with someone who criticised you unfairly: their concern, what\'s right, where you differ, your evidence, a next step, and the delivery.',
    starters: ['Their concern:...', 'Where I see it differently:...'],
  },
  deepen: {
    title: 'Making apology easy',
    summary: 'People apologise more readily when they don\'t feel cornered. Naming impact without accusation, and offering a better habit, gives them a dignified way to say sorry.',
  },
  notes: 'Chapter 4 challenge (fictional): Thursday 2:00–2:25; data 38% vs 12%; pilot test next week; Callum apologises for Monday.',
};

export default lesson;
