import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Reading: present bias. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Why "now" always wins',
  summary: 'GH₵30 for suya tonight, or GH₵30 toward a laptop in 16 weeks? Tonight wins almost every time, for everyone. Here\'s why our brains favour now, and three ways to give "later" a fair fight.',
  minutes: 12,
  outcomes: [
    'Explain present bias in plain words',
    'See why saving feels like losing',
    'Use three tricks to make "later" feel real',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Present bias',
      html: '<p>Ask people: "GH₵100 today, or GH₵110 in a week?" Many take GH₵100 today. Ask: "GH₵100 in a year, or GH₵110 in a year and a week?" Most wait the extra week for GH₵110.</p><p>It\'s the same one-week wait for the same GH₵10. But when one option is <em>now</em>, it pulls much harder. Economists call this <strong>present bias</strong>: we value things today far more than the same things later (Laibson, 1997; O\'Donoghue and Rabin, 1999).</p><p><strong>Why it makes saving hard:</strong> spending gives you something <em>now</em>: suya, a jersey, a night out. Saving gives you something <em>later</em>: a laptop in 16 weeks. In the moment, later loses.</p><p>It also explains Yaw\'s laptop deal. "Take it home today" wins over "save for 16 weeks", even at GH₵2,260 extra.</p><p><strong>Three tricks to give later a fair fight:</strong></p><ol><li><strong>Decide in advance.</strong> Choose the saving amount on Sunday, not at the suya stand. In advance, both options are "later", so you choose more wisely.</li><li><strong>Make later visible.</strong> A photo of the laptop as your phone background. A progress number you see every day. Later feels more real when you can see it.</li><li><strong>Move it before you see it.</strong> Saving that happens automatically on payday never has to win a fight against suya. (Chapter 3 builds this.)</li></ol>',
    },
    {
      kind: 'check',
      question: 'Why does "GH₵100 today" beat "GH₵110 in a week", but not when both are a year away?',
      options: ['Because "now" pulls much harder than any later time', 'Because people can\'t count', 'Because GH₵10 doesn\'t matter'],
      answer: 0,
      explanation: 'That extra pull of "now" is present bias.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Now always pulls harder than later. So decide in advance, make later visible, and move savings before you see them.',
    },
  ],
  apply: {
    scenario: 'Now vs later.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is present bias?',
        options: [
          { text: 'Valuing things now much more than the same things later' },
          { text: 'Liking presents', why: 'A fun guess, but no.' },
          { text: 'Preferring cash to mobile money', why: 'That\'s a different idea (pain of paying).' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it help "later" win, or help "now" win?',
        groups: ['Helps later', 'Helps now'],
        items: [
          { text: 'Deciding savings on Sunday', group: 0 },
          { text: 'Deciding at the suya stand', group: 1 },
          { text: 'A laptop photo as phone background', group: 0 },
          { text: '"Take it home today!"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each trick to what it does.',
        pairs: [
          ['Decide in advance', 'Both options feel like "later"'],
          ['Make later visible', 'The goal feels real'],
          ['Move it before you see it', 'No daily fight with temptation'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I know I should save the GH₵30, but suya tonight feels SO much better.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'That\'s just weak willpower.', why: 'Everyone\'s brain does this. It\'s present bias, not weakness.' },
          { text: 'Of course it does: that\'s present bias. Did Sunday-you plan suya this week? If yes, enjoy it. If not, the laptop gets it.' },
          { text: 'Never buy suya again.', why: 'A ban breaks. A plan decided in advance holds.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three tricks.',
        template: 'Decide in [[1]]. Make later [[2]]. Move it before you [[3]] it.',
        blanks: [['advance'], ['visible'], ['see']],
        distractors: ['secret', 'spend'],
      },
      {
        kind: 'findBug',
        prompt: 'Which habit leaves every saving decision to "now"?',
        lines: [
          'Set the week\'s saving on Sunday.',
          'Laptop progress on my lock screen.',
          'Decide whether to save each time I\'m about to buy something.',
        ],
        bug: 2,
        fix: 'Save first on Sunday; spend what\'s left of the week\'s money.',
        explanation: 'Deciding in the moment means "now" gets a vote every time, and it usually wins.',
      },
      {
        kind: 'mcq',
        prompt: 'How does present bias explain Yaw\'s laptop deal?',
        options: [
          { text: '"Today" feels worth paying a lot extra for, even GH₵2,260' },
          { text: 'It doesn\'t; the deal is fair', why: 'The total is 65% higher. "Today" is what sells it.' },
          { text: 'Laptops lose value', why: 'True, but not what present bias explains.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵30 of suya, three times a week, for 16 weeks. How much is that?',
        answers: ['1440', '1,440', 'GH₵1,440', 'GH₵1440'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s new Sunday routine.',
        lines: ['Check the week', 'Move the saving first', 'Update the laptop number on his lock screen', 'Spend from what\'s left'],
      },
      {
        kind: 'mcq',
        prompt: 'Who does present bias affect?',
        options: [
          { text: 'People with no self-control', why: 'It\'s a near-universal pattern.' },
          { text: 'Almost everyone' },
          { text: 'Only students', why: 'Everyone, at every age and income.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When does "now" win against your savings most often? Which trick would help most at that moment?',
    starters: ['"Now" wins when...', 'The trick I\'ll use is...'],
  },
  deepen: {
    title: 'The marshmallow myth',
    summary: 'You may have heard that children who waited for a second marshmallow did better in life. Later studies found that family circumstances explained much of it: waiting is easier when you trust the reward will come. That\'s why making later visible and certain helps so much.',
  },
  notes: 'Laibson, D. (1997). Golden eggs and hyperbolic discounting. QJE. O\'Donoghue, T., & Rabin, M. (1999). Doing it now or later. AER. Example adapted from Thaler (1981) style preference-reversal questions. Marshmallow: Mischel et al.; Watts, Duncan & Quan (2018), Psychological Science, found smaller associations once background controlled. Suya 30 × 3 × 16 = 1,440.',
};

export default lesson;
