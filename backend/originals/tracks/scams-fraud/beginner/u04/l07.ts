import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Chat with Tey: talking to young people about scams. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'How to talk to a teenager about this',
  summary: 'Grace knows a lecture won\'t work on Jayden. She asks Tey how to talk about scams so a 17-year-old actually listens, and what to do if he\'s already in trouble.',
  minutes: 12,
  outcomes: [
    'Talk about scams without lecturing',
    'Make it easy for young people to come forward',
    'Know what to do if someone\'s already involved',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Lectures tend to bounce off. Curiosity works better. Want some approaches?', replies: ['Please. He rolls his eyes at everything.'] },
        { tey: 'Ask, don\'t tell. "Have you seen any easy-money offers online?" Most young people have. Let him explain what he\'s seen. He may know more than you about the latest tricks.', replies: ['Then what?'] },
        { tey: 'Treat him as an expert. Ask him to spot the scam in a few messages, like he did with you. People remember what they work out themselves.', replies: ['What about consequences?'] },
        { tey: 'Be honest, not scary. Explain the fraud marker in practical terms: "It could stop you getting a phone contract, a car loan or even a bank account." That lands better than "you\'ll go to prison".', replies: ['What if he\'s already done something?'] },
        { tey: 'Make it safe to tell you. Say clearly: "If you ever get mixed up in something, tell me. I\'ll be on your side, and we\'ll sort it out." Fear of trouble is what keeps young people quiet while it gets worse.', replies: ['And if he does tell me?'] },
        { tey: 'Stay calm. Stop any more money moving. Contact the bank together and report it. Getting help early, and being honest, is the best way to limit the damage.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask, don\'t lecture. Treat them as the expert. Explain real-life consequences honestly. Make it safe to come to you, and if they do, stay calm and act together.',
    },
  ],
  apply: {
    scenario: 'Talking to Jayden.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Tey\'s approach.',
        lines: ['Ask what they\'ve seen', 'Treat them as the expert', 'Explain consequences honestly', 'Make it safe to tell you'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "ask, don\'t tell" work better?',
        options: [
          { text: 'People remember what they work out and say themselves' },
          { text: 'It\'s quicker', why: 'It\'s about engagement.' },
          { text: 'Teenagers know nothing', why: 'They often know a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the conversation, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: '"Have you seen any easy-money offers?"', group: 0 },
          { text: '"You\'d be an idiot to fall for that."', group: 1 },
          { text: '"Tell me, I\'ll be on your side."', group: 0 },
          { text: '"If you mess up, you\'re on your own."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'What if I\'d already done the £500 thing? Would you kill me?',
        prompt: 'Grace\'s best answer?',
        options: [
          { text: 'Yes.', why: 'Fear keeps young people quiet.' },
          { text: 'You\'d have to deal with it alone.', why: 'Support helps limit damage.' },
          { text: 'I\'d be worried, not angry. We\'d stop it, call the bank together, and sort it out. Always tell me.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key message.',
        template: 'If you ever get mixed up in something, [[1]] me. I\'ll be on your [[2]].',
        blanks: [['tell'], ['side']],
        distractors: ['hide', 'case'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each consequence to how to explain it.',
        pairs: [
          ['Fraud marker', '"Could stop you getting a phone contract"'],
          ['Account closed', '"Your wages could have nowhere to go"'],
          ['Prosecution', '"It\'s a real crime, even if you didn\'t mean it"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step, if Jayden had already got involved, would make things worse?',
        lines: [
          'Stop any more money moving.',
          'Contact the bank together.',
          'Keep it quiet and hope nobody notices.',
        ],
        bug: 2,
        fix: 'Report it early and honestly.',
        explanation: 'Early honesty limits the damage; hiding it usually makes it worse.',
      },
      {
        kind: 'mcq',
        prompt: 'What keeps young people quiet while things get worse?',
        options: [
          { text: 'Not owning phones', why: 'Fear of trouble.' },
          { text: 'Fear of getting into trouble' },
          { text: 'Too much support', why: 'Fear, not support.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many approaches does Tey suggest before "if they tell you"?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'If a young person tells you they\'re involved, what\'s the first thing to do?',
        options: [
          { text: 'Stay calm and stop any more money moving' },
          { text: 'Shout at them', why: 'Stay calm.' },
          { text: 'Confiscate their phone and say nothing', why: 'Act together and report.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a young person in your life you could have this conversation with? What would your first question be?',
    starters: ['I could talk to...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Schools and youth campaigns',
    summary: 'Banks, police and fraud prevention groups run campaigns aimed at students about money muling and online scams. Sharing those materials can help start the conversation.',
  },
  notes: 'Communication guidance general; consistent with Cifas/Don\'t Be Fooled campaign framing (not named). Jayden per CAST.',
};

export default lesson;
