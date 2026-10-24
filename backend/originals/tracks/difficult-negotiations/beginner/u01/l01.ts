import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: the reply. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The reply',
  summary: 'Arjun quotes £48,000 to build a loyalty app for Harlow & Finch, 60 shops across the UK. The reply: £28,000, an answer in 48 hours, and "our last supplier did it for less". His fingers are already typing.',
  minutes: 11,
  outcomes: [
    'Notice the moment a negotiation turns hard',
    'See why the first reaction is usually the wrong one',
    'Know what this course covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 7 a.m. in Bengaluru',
      beats: [
        { speaker: 'narrator', text: 'Arjun\'s quote to Harlow & Finch, a London homeware chain: a loyalty app, 16 weeks, £48,000.' },
        { speaker: 'narrator', text: 'The reply from Mr Pryce, procurement: "£28,000. Our last supplier did a similar job for less. Answer by Wednesday."' },
        { speaker: 'joel', text: 'Let\'s just say yes! It\'s the biggest client we\'ve ever had.' },
        { speaker: 'kavya', text: '£28,000? That barely covers paying us. He\'s playing games. Tell him where to go.' },
        { speaker: 'grace', text: 'Before you type anything: breathe. He wants a reaction. Don\'t give him one yet.' },
        { speaker: 'tey', text: 'This course: keep your head, name the tactics, say no to unreasonable requests, use your alternatives, and close a tough deal fairly.' },
      ],
      choice: {
        prompt: 'What should Arjun do in the next hour?',
        options: [
          { text: 'Nothing yet. Work out his walk-away and what Harlow & Finch really needs, then ask for a call.', outcome: 'Right. A calm, prepared reply beats a fast one.', best: true },
          { text: 'Reply: "£28,000 is insulting."', outcome: 'It feels good for ten seconds, and turns a negotiation into a fight.' },
          { text: 'Reply: "OK, we can do £28,000."', outcome: 'He\'s accepted their anchor without checking his costs.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When a negotiation turns hard, the first reply you want to send is usually the wrong one. Pause first.',
    },
  ],
  apply: {
    scenario: 'The reply.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Arjun quoted £48,000. Mr Pryce offered £28,000. What\'s the gap, in pounds?',
        answers: ['20000', '20,000', '£20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Who said it?',
        groups: ['Joel', 'Kavya', 'Grace'],
        items: [
          { text: '"Let\'s just say yes!"', group: 0 },
          { text: '"He\'s playing games."', group: 1 },
          { text: '"Breathe. Don\'t react yet."', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "£28,000 is insulting" a poor reply?',
        options: [
          { text: 'It\'s too polite', why: 'It\'s the opposite.' },
          { text: 'It turns a negotiation into a fight, and tells him he got a reaction' },
          { text: 'It\'s a great reply', why: 'It feels good but closes doors.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pressure to what it is.',
        pairs: [
          ['£28,000', 'A very low first offer'],
          ['"Answer by Wednesday"', 'A deadline'],
          ['"Our last supplier did it for less"', 'A comparison to make you doubt'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'If we push back, we\'ll lose them!',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Yes, never push back on a big client.', why: 'A loss-making yes isn\'t a win.' },
          { text: 'Then insult them first.', why: 'That definitely loses them.' },
          { text: 'Maybe. But if £28,000 loses you money, saying yes is worse. Work out your numbers first.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s advice.',
        template: 'He wants a [[1]]. Don\'t give him one [[2]].',
        blanks: [['reaction'], ['yet']],
        distractors: ['discount', 'ever'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shops does Harlow & Finch have?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should Arjun work out before replying?',
        options: [
          { text: 'His walk-away, and what Harlow & Finch really needs' },
          { text: 'The rudest possible reply', why: 'Calm and prepared wins.' },
          { text: 'Nothing, just reply fast', why: 'Fast replies are usually worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s first draft should he delete?',
        lines: [
          'Thank you for your reply.',
          'Frankly, £28,000 is a joke.',
          'Could we set up a call to understand your needs?',
          'I\'m free Tuesday afternoon UK time.',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'It attacks instead of opening a conversation.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this course teaches.',
        lines: ['Keep your head', 'Name the tactics', 'Say no to unreasonable requests', 'Use your alternatives', 'Close fairly'],
      },
    ],
  },
  reflect: {
    prompt: 'Remember a negotiation that suddenly turned hard. What did you want to say first? What happened?',
    starters: ['I wanted to say...', 'What happened was...'],
  },
  deepen: {
    title: 'Hard negotiations',
    summary: 'William Ury\'s Getting Past No (1991) is about negotiating with people who play hardball. Its first rule: don\'t react. Your first reaction is what the tactic is designed to trigger.',
  },
  notes: 'Fictional storyline: Harlow & Finch (fictional London homeware chain, 60 shops); quote £48,000/16 weeks; Mr Pryce (procurement) offers £28,000 with a Wednesday deadline. Ury, Getting Past No (1991).',
};

export default lesson;
