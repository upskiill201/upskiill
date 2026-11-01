import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: the message about Yaw. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The message',
  summary: 'Kofi shows Yaw the message his contacts received. Yaw goes quiet, then tells him everything: GH₵2,900 owed across three pay-later apps. The sneakers, the watch, the six parcels. What does a friend do now?',
  minutes: 12,
  outcomes: [
    'See how pay-later debt builds up quietly',
    'Choose a response that helps without hurting you',
    'Know the first step out of debt',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Room 214, midnight',
      beats: [
        { speaker: 'kofi', text: 'Yaw. This came to my phone. And probably to your mum\'s.' },
        { speaker: 'narrator', text: 'Yaw reads it. For a long time he says nothing. Then he turns his phone over and opens three apps.' },
        { speaker: 'yaw', text: 'This one, GH₵1,150. Two payments missed. That\'s the one messaging people. This one, GH₵1,050. This one, GH₵700. GH₵2,900.' },
        { speaker: 'kofi', text: 'How?' },
        { speaker: 'yaw', text: 'Small small. GH₵150 here, four payments. GH₵200 there. Everyone back home has new sneakers on their posts. I just... didn\'t want to be the one who didn\'t. And it never felt like real money.' },
        { speaker: 'yaw', text: 'Chale, you have the interface fund. GH₵900. Can you lend me GH₵1,150 so the messages stop? Please.' },
        { speaker: 'tey', text: 'This is the hardest kind of money moment: someone you love, in real trouble, asking for your savings. Think it through with Kofi.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          { text: 'Give Yaw the interface fund and borrow the rest from somewhere.', outcome: 'The messages might stop for a month. But Yaw still owes GH₵1,750 elsewhere, nothing has changed about why it happened, and Kofi has lost his fund and maybe borrowed too. Two people in trouble instead of one.' },
          { text: 'Tell Yaw it\'s his problem.', outcome: 'It is his debt. But Yaw is scared, ashamed and alone with it, which is exactly when people make it worse. A friend can help without paying.' },
          { text: 'Say no to the loan, and yes to sitting down together tonight to list everything and make a plan.', outcome: 'Yes. Kofi keeps his fund and offers what Yaw actually needs: a clear head, a plan, and someone in his corner. They start with the six unopened parcels.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When a friend is in debt, your savings usually aren\'t the answer. Your time, a plan and not judging them often are.',
    },
  ],
  apply: {
    scenario: 'Yaw\'s three apps.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵1,150 + GH₵1,050 + GH₵700. What does Yaw owe in total?',
        answers: ['2900', '2,900', 'GH₵2,900', 'GH₵2900'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the debt feel "not like real money" to Yaw?',
        options: [
          { text: 'Because it wasn\'t real', why: 'It\'s very real now.' },
          { text: 'Because he never bought anything', why: 'He bought a lot.' },
          { text: 'Pay later split each buy into small payments and pushed the "ouch" into the future' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Yaw, or makes things worse?',
        groups: ['Helps', 'Makes it worse'],
        items: [
          { text: 'Sitting down together to list every debt', group: 0 },
          { text: 'Kofi emptying his savings to cover one app', group: 1 },
          { text: 'Not judging him', group: 0 },
          { text: 'Ignoring the messages and buying more', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Please, just lend me GH₵1,150. Then it\'s over.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'It wouldn\'t be over: there\'s GH₵1,750 more. I can\'t lend you my fund, but I\'m here all night. Let\'s list everything and start with those six parcels.' },
          { text: 'Fine, here.', why: 'It solves one app for a while and puts Kofi at risk.' },
          { text: 'That\'s your problem.', why: 'True, but cold. He needs a plan and a friend.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What helps most.',
        template: 'Your [[1]], a [[2]] and not judging them.',
        blanks: [['time'], ['plan']],
        distractors: ['savings', 'loan'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each app to what Yaw owes.',
        pairs: [
          ['App 1 (messaging contacts)', 'GH₵1,150, two missed'],
          ['App 2', 'GH₵1,050'],
          ['App 3', 'GH₵700'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Yaw\'s story shows the social trigger?',
        lines: [
          'GH₵150 here, four payments.',
          'Everyone back home has new sneakers on their posts.',
          'Two payments missed.',
        ],
        bug: 1,
        fix: 'Notice: comparing with friends\' posts was driving the buying.',
        explanation: 'Keeping up with what others show online is one of the strongest spending triggers. Lesson 3 is about it.',
      },
      {
        kind: 'mcq',
        prompt: 'Why start with the six unopened parcels?',
        options: [
          { text: 'To sell them for profit', why: 'Returning for a refund is better if possible.' },
          { text: 'To open them for fun', why: 'Opening them may lose the return option.' },
          { text: 'Unopened items may still be returnable, which could cut the debt fast' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Kofi lent GH₵1,150 from his GH₵900 fund, how much would he need to borrow on top?',
        answers: ['250', 'GH₵250', '250 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Kofi does tonight.',
        lines: ['Show Yaw the message calmly', 'Listen without judging', 'Say no to the loan, kindly', 'Offer to make a plan together', 'Start with the unopened parcels'],
      },
    ],
  },
  reflect: {
    prompt: 'If a close friend told you they owed a lot of money, what would you say first?',
    starters: ['I\'d say...', 'I wouldn\'t say...'],
  },
  deepen: {
    title: 'You\'re not their bank',
    summary: 'Helping a friend in debt doesn\'t mean paying it. Paying often removes the pressure to change and can put you at risk. Listening, helping make a plan, and pointing to free debt advice usually helps more.',
  },
  notes: 'Course 3 running numbers: Yaw owes 2,900 = 1,150 (App 1, 2 missed, contacting contacts) + 1,050 (App 2) + 700 (App 3). No apps named (playbook §9). Kofi\'s interface fund GH₵900.',
};

export default lesson;
