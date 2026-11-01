import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: closing myths for hard deals. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Closing myths',
  summary: 'Kavya thinks a hard negotiator will be a nightmare client. Joel thinks the last £500 matters most. Grace sorts fact from myth as the kick-off approaches.',
  minutes: 11,
  outcomes: [
    'Avoid common mistakes at the end of a hard deal',
    'Know that hard negotiators can be good partners',
    'Stop fighting for the last pound',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Someone who negotiated hard will be a terrible client.',
          isFact: false,
          explain: 'Myth. Negotiation behaviour often comes from targets and roles. Many tough buyers are fair, reliable partners once a deal is signed.',
        },
        {
          text: 'Fighting for the last £500 is usually worth it.',
          isFact: false,
          explain: 'Myth. At the end, small amounts rarely matter more than goodwill, speed and a clean start. Know your walk-away, then let small things go.',
        },
        {
          text: 'A clear written deal reduces conflict later.',
          isFact: true,
          explain: 'Fact. Most later fights are about what was "meant". The statement of work answers those questions before they\'re asked.',
        },
        {
          text: 'Delivering early wins builds trust faster than words.',
          isFact: true,
          explain: 'Fact. A smooth kick-off and a clear first demo do more than any thank-you email.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'At the end of a hard deal: let small things go, write the big things down, and earn trust with early wins.',
    },
  ],
  apply: {
    scenario: 'Closing myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Hard negotiators make terrible clients', group: 0 },
          { text: 'The last £500 is usually worth fighting for', group: 0 },
          { text: 'Clear written deals reduce later conflict', group: 1 },
          { text: 'Early wins build trust faster than words', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Mr Pryce be a fine client after signing?',
        options: [
          { text: 'His hard behaviour came from his role and targets, which are now met' },
          { text: 'He won\'t be', why: 'Roles explain much of it.' },
          { text: 'Because he\'ll forget the deal', why: 'Because his job changes once it\'s signed.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Pryce wants the first invoice at 45 days, not 30. Should we fight it?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Fight it to the end.', why: 'It may not be worth the goodwill.' },
          { text: 'Agree to 120 days.', why: 'That\'s a big change, not a small one.' },
          { text: 'Check cash flow. If 15 more days on one invoice is fine, let it go with a smile. Save firmness for what matters.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Tough buyers are nightmares"', 'Many become fair partners'],
          ['"Win every last pound"', 'Let small things go'],
          ['"Words build trust"', 'Early wins build it faster'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The closing rule.',
        template: 'Let [[1]] things go. Write the [[2]] things down.',
        blanks: [['small'], ['big']],
        distractors: ['all', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'From 30-day to 45-day invoices is how many extra days?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When is it right to stay firm on a small point?',
        options: [
          { text: 'Always', why: 'Not every point deserves a fight.' },
          { text: 'When it affects something that really matters, like paying the team' },
          { text: 'Never', why: 'Some small points protect big things.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Kavya\'s plan is a myth?',
        lines: [
          'Prepare a smooth kick-off.',
          'Deliver a clear first demo.',
          'Expect Pryce to cause trouble every week.',
          'Log every change request.',
        ],
        bug: 2,
        fix: 'Treat Pryce as a partner now.',
        explanation: 'Expecting trouble often creates it.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Let it go, or stay firm?',
        groups: ['Let it go', 'Stay firm'],
        items: [
          { text: 'Kick-off on Tuesday instead of Monday', group: 0 },
          { text: 'Starting before the first payment', group: 1 },
          { text: 'Meeting by video instead of phone', group: 0 },
          { text: 'Free changes for anything "small"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good end to a hard deal.',
        lines: ['Check small asks against what matters', 'Let small things go', 'Sign clear terms', 'Deliver an early win'],
      },
    ],
  },
  reflect: {
    prompt: 'What small point have you fought for that wasn\'t worth it? What would you let go now?',
    starters: ['I fought for...', 'Now I would...'],
  },
  deepen: {
    title: 'Pick your battles',
    summary: 'Experienced negotiators save firmness for issues that protect their interests. Giving way gracefully on small things buys goodwill for the moments when you need to hold the line.',
  },
  notes: 'Myth/fact synthesis (Getting to Yes; subjective value research by Curhan et al.). Fictional: 45-day invoice request.',
};

export default lesson;
