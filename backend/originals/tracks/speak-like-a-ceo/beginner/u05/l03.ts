import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Compare: the tough question. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The tough question',
  summary: 'Diego plays the toughest person in finance: "Isn\'t 38% above target just because the target was too low?" Lucía\'s first answer is defensive. Her second is calm.',
  minutes: 12,
  outcomes: [
    'Answer a tough question without getting defensive',
    'Acknowledge, answer with a fact, bridge to the message',
    'Keep your tone steady',
  ],
  learn: [
    {
      kind: 'compare',
      title: '"Wasn\'t the target just too low?"',
      before: {
        label: 'Defensive',
        text: '"No! That\'s really unfair. We worked incredibly hard on this, the whole team did, and honestly I don\'t think finance understands how marketing targets work..."',
      },
      after: {
        label: 'Calm',
        text: '"Fair question. We set the target the same way as our last three launches, and this one beat all three. So the gap isn\'t the target; it\'s what shop owners told us. Which is why I think we should keep listening."',
      },
      notes: [
        '"Fair question" lowers the heat and buys a second.',
        'One fact answers it: same method, beat all three.',
        'The bridge goes back to the message.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Tough question: acknowledge it, answer with one fact, bridge back to your message. Keep your voice level.',
    },
  ],
  apply: {
    scenario: 'The tough question.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with the defensive answer?',
        options: [
          { text: 'It attacks and never answers the question' },
          { text: 'It\'s too short', why: 'It doesn\'t answer.' },
          { text: 'It\'s too calm', why: 'It\'s defensive.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm or defensive?',
        groups: ['Calm', 'Defensive'],
        items: [
          { text: '"Fair question."', group: 0 },
          { text: '"That\'s really unfair."', group: 1 },
          { text: '"Same method as our last three launches."', group: 0 },
          { text: '"Finance doesn\'t understand marketing."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many earlier launches did chili-lime beat?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Lucía\'s calm answer.',
        pairs: [
          ['Acknowledge', '"Fair question."'],
          ['One fact', '"Same method; beat all three."'],
          ['Bridge', '"Which is why we should keep listening."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if the question is actually rude, not just tough?',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Answer the fair part of it, calmly. The room is watching how you respond, and calm wins them over.' },
          { text: 'Be rude back.', why: 'Calm wins the room.' },
          { text: 'Refuse to answer.', why: 'Answer the fair part.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three parts.',
        template: 'Acknowledge, answer with one [[1]], [[2]] back to the message.',
        blanks: [['fact'], ['bridge']],
        distractors: ['joke', 'run'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "Fair question"?',
        options: [
          { text: 'It lowers the heat and buys a second to think' },
          { text: 'To flatter them', why: 'It lowers the heat.' },
          { text: 'To avoid answering', why: 'You still answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s answer slips back into defensive?',
        lines: [
          '"Fair question."',
          '"We set the target the same way as our last three launches."',
          '"Honestly, I\'m surprised anyone would even ask that."',
          '"So the gap is what shop owners told us."',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It turns a fact into a jab.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the calm answer.',
        lines: ['Acknowledge', 'Answer with one fact', 'Explain what it means', 'Bridge to the message'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good bridge or not?',
        groups: ['Good bridge', 'Not a bridge'],
        items: [
          { text: '"Which is why we should keep listening."', group: 0 },
          { text: '"Next question."', group: 1 },
          { text: '"That\'s the whole point of the talk."', group: 0 },
          { text: '"Anyway, moving on, whatever."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take your toughest question. Write a calm answer: acknowledge, one fact, bridge.',
    starters: ['Acknowledge:...', 'Fact:...', 'Bridge:...'],
  },
  deepen: {
    title: 'The room is the audience',
    summary: 'When someone asks a tough question, everyone else is watching your response more than the answer. A calm reply often earns more trust than the perfect fact.',
  },
  notes: 'Acknowledge-answer-bridge: common media and presentation training technique. Fictional scenario.',
};

export default lesson;
