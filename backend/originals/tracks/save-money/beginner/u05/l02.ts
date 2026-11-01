import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: windfalls and the split rule. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Windfalls: the split rule',
  summary: 'Uncle Kwesi\'s GH₵300 says "buy yourself something nice." The laptop jar says "please." A windfall is where good plans quietly go to die, unless you split it on purpose. Step by step.',
  minutes: 11,
  outcomes: [
    'Plan for windfalls before they arrive',
    'Split a windfall between goals and enjoyment',
    'Respect the giver\'s wishes and your goal at once',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Splitting a windfall',
      steps: [
        { title: '1. Don\'t touch it for a day', body: 'A windfall feels like "extra", so it gets spent fast (mental accounting\'s found-money trap). Leave it 24 hours.' },
        { title: '2. Check what\'s urgent', body: 'Is any pot below target? Emergency fund: full. Debts: none. Laptop: GH₵1,520 short, four weeks left.' },
        { title: '3. Pick a split', body: 'Kofi\'s usual split rule is 50/25/25. With a deadline close, he chooses two-thirds to the goal and one third to enjoy: GH₵200 to the laptop, GH₵100 to enjoy.' },
        { title: '4. Honour the giver', body: 'Uncle Kwesi said "something nice". The GH₵100 is for exactly that. Kofi buys a cloth for Mum and suya for the corridor, and tells his uncle about the laptop.' },
        { title: '5. Move it the same day', body: 'The GH₵200 goes to the jar right after the 24 hours. No "later".' },
        { title: '6. Say thank you, with the story', body: 'Kofi sends his uncle a photo of the jar: "Your GH₵200 is in here. And Mum loves the cloth."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Windfalls: wait a day, check what\'s urgent, split on purpose, honour the giver, move it the same day.',
    },
  ],
  apply: {
    scenario: 'Uncle Kwesi\'s GH₵300.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the windfall steps.',
        lines: ['Wait a day', 'Check what\'s urgent', 'Pick a split', 'Honour the giver', 'Move it the same day', 'Say thank you, with the story'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵300 split two-thirds to the goal. How much goes to the laptop?',
        answers: ['200', 'GH₵200', '200 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why wait a day before using a windfall?',
        options: [
          { text: 'Found money feels like "extra" and gets spent fast; a day lets the rush pass' },
          { text: 'Banks hold gifts for a day', why: 'It\'s about the feeling, not the bank.' },
          { text: 'To see if more arrives', why: 'Not the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Windfall or regular income?',
        groups: ['Windfall', 'Regular'],
        items: [
          { text: 'Christmas money from an uncle', group: 0 },
          { text: 'Mum\'s monthly GH₵1,500', group: 1 },
          { text: 'A tax refund', group: 0 },
          { text: 'A monthly salary', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Your uncle said buy something nice. Putting it in a jar is disrespectful!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll spend it all.', why: 'Honouring the giver doesn\'t mean spending every cedi.' },
          { text: 'He doesn\'t get a say.', why: 'Honouring his wish matters, and a split does both.' },
          { text: 'A third is for something nice: a cloth for Mum and suya. The rest goes to the laptop. I\'ll send him a photo. He\'ll love it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trap.',
        template: 'Found money feels [[1]], so it gets spent [[2]].',
        blanks: [['free', 'extra'], ['fast']],
        distractors: ['heavy', 'slowly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to a sensible split.',
        pairs: [
          ['Emergency fund empty', 'Most to the fund first'],
          ['Goal with a close deadline', 'Most to the goal'],
          ['All pots full', 'Bigger share to enjoy or long-term saving'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step lets the windfall leak?',
        lines: [
          'Wait 24 hours.',
          'Decide GH₵200 to the laptop.',
          'Leave the GH₵200 in my spending wallet until next week.',
          'Spend GH₵100 on something nice.',
        ],
        bug: 2,
        fix: 'Move the GH₵200 to the jar the same day.',
        explanation: 'Money that sits where you spend gets spent.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Gap GH₵1,520 minus the GH₵200 windfall. New gap?',
        answers: ['1320', '1,320', 'GH₵1,320', 'GH₵1320'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why send the uncle a photo of the jar?',
        options: [
          { text: 'To ask for more', why: 'It\'s a thank-you, not a request.' },
          { text: 'It honours the gift and shows what it\'s helping with' },
          { text: 'To show off', why: 'It\'s gratitude with a story.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What would you do with an unexpected GH₵300 (or the same in your currency) tomorrow? Write your split now, before it happens.',
    starters: ['I\'d put ... toward...', 'And ... to enjoy on...'],
  },
  deepen: {
    title: 'Plan the split in advance',
    summary: 'Write your windfall split in your notes today: for example "half to savings, a quarter to debts or goals, a quarter to enjoy". When money arrives, you follow the rule instead of deciding in the moment.',
  },
  notes: 'Christmas money 300 → 200 jar, 100 enjoy (cloth for Mum, suya). Gap 1,520 → 1,320.',
};

export default lesson;
