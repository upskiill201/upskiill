import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Card deck: talking about money with family. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Talking money at home',
  summary: 'Two calls in one week. Mum wants an update. A cousin in Accra asks Kofi to "help small" with GH₵200. Money talk with family can be the hardest part of any budget. Here\'s how to make it easier.',
  minutes: 11,
  outcomes: [
    'Share your money plans with family calmly',
    'Ask for advice, not just money',
    'Respond to family requests in a way your budget can survive',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Why it\'s hard.</strong> In many families, money is tied up with love, respect and duty. Asking for help can feel like failure. Saying no can feel like betrayal. That\'s why Kofi said "everything\'s fine" in Chapter 1.</p><p>But hiding money problems from people who support you usually makes them bigger.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Talking to someone who supports you</strong> (like Kofi and Mum):</p><ul><li><strong>Bring the sheet, not just the problem.</strong> "Here\'s my plan, here\'s what happened, here\'s what I\'m changing."</li><li><strong>Ask for advice as well as money.</strong> Mum has managed a stall\'s money for 20 years. Her ideas are worth more than an extra GH₵100.</li><li><strong>Share wins too.</strong> If the only money calls are emergencies, money talk always feels bad.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>When family asks you for money:</strong></p><ul><li><strong>Decide in advance.</strong> Some people keep a small "family" line in their budget. Help comes from there, so it never comes from food or savings.</li><li><strong>Give what fits, warmly.</strong> "I can send GH₵30 this month. I wish it were more." That\'s generous and honest.</li><li><strong>Don\'t borrow to give.</strong> Taking a loan to send money passes the problem to your future self.</li></ul>',
    },
    {
      kind: 'check',
      question: 'A cousin asks for GH₵200. Kofi has no family line and GH₵200 is in savings. What\'s a good response?',
      options: ['Send all GH₵200 from savings', 'Ignore the message', 'Send what fits from a flexible line, warmly, and consider a small family line in future'],
      answer: 2,
      explanation: 'Giving what you can, without draining savings or ignoring family, keeps both your budget and the relationship healthy.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Bring the sheet, ask for advice, share wins. And if family asks you for money, give what fits from a line meant for it.',
    },
  ],
  apply: {
    scenario: 'Two family calls.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Kofi tell Mum "everything\'s fine" in Chapter 1?',
        options: [
          { text: 'Because everything was fine', why: 'He had GH₵63 for 18 days.' },
          { text: 'Because money talk felt tied to pride and respect' },
          { text: 'Because Mum doesn\'t care', why: 'She asked twice. She cares a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the money conversation, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Showing your plan', group: 0 },
          { text: 'Only calling in emergencies', group: 1 },
          { text: 'Asking for advice', group: 0 },
          { text: 'Saying "fine" when it isn\'t', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Mum, quick update: month 3 is on track. GH₵200 saved again. Can I ask you something? How do you plan for slow months at the stall?',
        prompt: 'Why is this a strong message?',
        options: [
          { text: 'It shares a win and asks for her advice, not just money' },
          { text: 'It asks for more money politely', why: 'It doesn\'t ask for money at all.' },
          { text: 'It\'s short', why: 'Short helps, but the win and the question are the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A family line of GH₵30 a month. How much is that over a 9-month academic year?',
        answers: ['270', 'GH₵270', '270 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Talking to someone who supports you.',
        template: 'Bring the [[1]], ask for [[2]], share [[3]].',
        blanks: [['sheet', 'plan'], ['advice'], ['wins']],
        distractors: ['excuses', 'loans'],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'My cousin wants GH₵200. I have it in savings, but that\'s for future me.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Send it all; family comes first.', why: 'Family matters. So does not draining the one safety net you\'ve built.' },
          { text: 'Send what fits warmly, like GH₵30 from fun or clothes this month, and add a small family line from next month.' },
          { text: 'Pretend you didn\'t see the message.', why: 'Silence hurts more than a small, kind amount.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which response passes the problem to Kofi\'s future self?',
        lines: [
          'Send GH₵30 from this month\'s flexible lines.',
          'Take a GH₵200 loan to send the full amount.',
          'Offer to help with the cousin\'s budget.',
        ],
        bug: 1,
        fix: 'Give what fits from the budget, not from borrowing.',
        explanation: 'Borrowing to give means paying back GH₵240 later for a GH₵200 gift.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['Family asks for money', 'Give what fits from a family line'],
          ['You need help', 'Bring your plan'],
          ['Things are going well', 'Share the win'],
          ['Tempted to borrow to give', 'Don\'t'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why share wins with family, not just problems?',
        options: [
          { text: 'To show off', why: 'It\'s about making money talk normal, not boasting.' },
          { text: 'So money talk isn\'t always bad news, and it\'s easier when problems come' },
          { text: 'So they stop sending money', why: 'Nothing to do with that.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good money call home.',
        lines: ['Share a win', 'Show the plan', 'Say what\'s changing', 'Ask for advice'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your family could you talk to about money? What would you share first: a win, a plan, or a question?',
    starters: ['I could talk to...', 'I\'d start with...'],
  },
  deepen: {
    title: 'Different families, different rules',
    summary: 'In many cultures, sending money to family is a duty and an honour, and it can be a large part of a young person\'s budget. There\'s no single right amount. What helps everywhere is making it a planned line, not an unplanned drain.',
  },
  notes: 'Fictional: cousin\'s request GH₵200; family line GH₵30/month × 9 = 270. Borrow-to-give example uses Ch2 L6 20%/month (200 → 240). Remittance/family obligation norms vary widely; stated respectfully, no judgement.',
};

export default lesson;
