import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Myth or Fact: shame makes it worse. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Shame makes it worse',
  summary: 'For three weeks, Yaw hid his phone face down and didn\'t open the apps. The debt grew. Why does shame make money problems worse, and what helps instead? Five myths, tested.',
  minutes: 10,
  outcomes: [
    'Explain how shame leads to avoidance',
    'Replace shame with simple next steps',
    'Know that free help exists',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Feeling ashamed of debt motivates people to fix it.',
          isFact: false,
          explain: 'Myth, often. Shame tends to make people hide and avoid: not opening messages, not checking balances. Avoidance is how late fees pile up.',
        },
        {
          text: 'Talking to someone about money problems usually makes them easier to deal with.',
          isFact: true,
          explain: 'Fact. Saying it out loud turns a fear into a list, and a list into a plan. Yaw\'s night with Kofi did more than three weeks of hiding.',
        },
        {
          text: 'People in debt are bad people.',
          isFact: false,
          explain: 'Myth. Debt happens to careful people too: illness, job loss, easy credit, pressure. It\'s a situation, not a character.',
        },
        {
          text: 'Many lenders will agree a payment plan if you contact them early.',
          isFact: true,
          explain: 'Fact, often. Lenders usually prefer getting paid slowly to not getting paid. Contacting them before things get worse gives you more options.',
        },
        {
          text: 'If a lender messages your friends and family, you just have to accept it.',
          isFact: false,
          explain: 'Myth. In many countries, contacting people in your phonebook or harassing them is against the rules. Keep records and report it to the financial regulator or consumer protection body.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Face down',
      beats: [
        { speaker: 'yaw', text: 'I kept the phone face down for three weeks. If I didn\'t look, it wasn\'t real.' },
        { speaker: 'kofi', text: 'And?' },
        { speaker: 'yaw', text: 'It was real. And GH₵80 more in late fees.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Shame says hide. Hiding makes debt grow. Swap shame for one small step: open the app, write the number, tell one person.',
    },
  ],
  apply: {
    scenario: 'Face down.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Shame motivates people to fix debt', group: 0 },
          { text: 'Talking about it makes it easier to deal with', group: 1 },
          { text: 'People in debt are bad people', group: 0 },
          { text: 'Lenders often agree plans if contacted early', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did three weeks of hiding cost Yaw?',
        options: [
          { text: 'Nothing', why: 'The debt grew while he hid.' },
          { text: 'GH₵80 in late fees, and more stress' },
          { text: 'It saved him money', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each shame response to a better step.',
        pairs: [
          ['Phone face down', 'Open the app and write the number'],
          ['Telling nobody', 'Tell one trusted person'],
          ['Avoiding the lender', 'Contact them early about a plan'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I\'m such an idiot. Who gets into GH₵2,900 of debt for sneakers?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yeah, it was dumb.', why: 'True or not, shame makes it harder to act.' },
          { text: 'Don\'t worry about it at all.', why: 'He does need to act. Kindly.' },
          { text: 'Lots of people, with apps designed to make it easy. You\'re not an idiot. You\'re in a situation, and we\'re fixing it tonight.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The swap.',
        template: 'Shame says [[1]]. Swap it for one small [[2]].',
        blanks: [['hide'], ['step']],
        distractors: ['save', 'loan'],
      },
      {
        kind: 'mcq',
        prompt: 'A lender has messaged Yaw\'s contacts. What should he do?',
        options: [
          { text: 'Screenshot the messages and report it to the financial regulator or consumer body' },
          { text: 'Nothing; it\'s allowed', why: 'In many places it isn\'t.' },
          { text: 'Change his number and hide', why: 'Hiding makes things worse. Report it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step is shame, not progress?',
        lines: [
          'Write every debt on one page.',
          'Call App 1 to ask about a payment plan.',
          'Delete the apps and hope they forget.',
        ],
        bug: 2,
        fix: 'Keep the apps until the debts are settled; delete after.',
        explanation: 'Deleting the app doesn\'t delete the debt. Hiding lets fees grow.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'App 1 was GH₵1,150 before late fees of GH₵80. What is it now?',
        answers: ['1230', '1,230', 'GH₵1,230', 'GH₵1230'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the small steps out of shame.',
        lines: ['Turn the phone over', 'Open each app', 'Write the numbers down', 'Tell one person', 'Contact the lender'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do many lenders agree payment plans?',
        options: [
          { text: 'They\'re charities', why: 'They\'re businesses.' },
          { text: 'They never do', why: 'Many do, especially if contacted early.' },
          { text: 'They\'d rather be paid slowly than not at all' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a money message or bill you\'ve been avoiding? What\'s the smallest step you could take today?',
    starters: ['I\'ve been avoiding...', 'The smallest step:...'],
  },
  deepen: {
    title: 'Free debt help',
    summary: 'Many countries have free, independent debt advice: charities, consumer bodies or university welfare offices. They can help list debts, talk to lenders and spot unfair practices. Avoid anyone who charges upfront fees to "fix" your debt.',
  },
  notes: 'Shame and avoidance in financial behaviour: e.g. Gladstone et al. (2021), "Financial shame spirals", Journal of Personality and Social Psychology; stated qualitatively. Digital lender contact harassment: regulated/prohibited in several markets (e.g. Kenya, Nigeria, India guidance); stated generally. Late fees GH₵80 (fictional): App 1 1,150 → 1,230.',
};

export default lesson;
