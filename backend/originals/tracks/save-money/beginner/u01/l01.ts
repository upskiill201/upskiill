import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: the dead laptop and Yaw's offer. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The dead laptop',
  summary: 'The laptop is dead. Next semester\'s programming module needs one: GH₵3,500 for a used one that meets the spec, in 16 weeks. Then Yaw has an idea: "small small payments". You decide.',
  minutes: 12,
  outcomes: [
    'Meet the goal: GH₵3,500 in 16 weeks',
    'Compare saving up with paying in instalments',
    'Choose the path that costs least in the end',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Click, then silence',
      beats: [
        { speaker: 'narrator', text: 'Kumasi, the morning after. Kofi carries his dead laptop to a repair stall at Adum. The technician opens it, sniffs, and shakes his head.' },
        { speaker: 'narrator', text: '"Motherboard. Repair is more than it\'s worth. Maybe GH₵250 for parts."' },
        { speaker: 'narrator', text: 'Kofi checks the department\'s list for next semester\'s programming module. The cheapest used laptop that meets it, at three shops: about GH₵3,500. Next semester starts in 16 weeks.' },
        { speaker: 'kofi', text: 'I have GH₵790 in total. And GH₵150 of the bus fund that\'s already spoken for.' },
        { speaker: 'yaw', text: 'Chale, easy! My cousin\'s shop does laptops on small small payments. GH₵480 a month, you take it home today. No stress.' },
        { speaker: 'tey', text: 'Ooh. Two roads: save up for 16 weeks, or take it home today and pay monthly. Let\'s see which one Kofi takes.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          { text: 'Take the laptop today at GH₵480 a month.', outcome: 'He\'d have it today. But how many months? Twelve. That\'s GH₵5,760 for a GH₵3,500 laptop, and GH₵480 a month is a third of his allowance. Lesson 4 does the full sum.' },
          { text: 'Save up for 16 weeks and buy it in cash.', outcome: 'Harder, slower, and it saves him over GH₵2,000. He borrows Efua\'s old laptop on evenings for this semester\'s assignments. This is what he does.', best: true },
          { text: 'Give up on the programming module.', outcome: 'It\'s a required module. Giving up on his degree to avoid a savings goal is the most expensive choice of all.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring your own savings goal to this course: something you need or want that costs more than you have. Every lesson helps you reach it.',
    },
  ],
  apply: {
    scenario: 'GH₵3,500 in 16 weeks.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵480 a month for 12 months. What\'s the total?',
        answers: ['5760', '5,760', 'GH₵5,760', 'GH₵5760'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How much more than the cash price is the payment plan?',
        options: [
          { text: 'GH₵260', why: '5,760 − 3,500 = 2,260.' },
          { text: 'GH₵2,260' },
          { text: 'Nothing; it\'s the same laptop', why: 'Same laptop, GH₵2,260 more.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each road to what it really means.',
        pairs: [
          ['Save for 16 weeks', 'GH₵3,500, paid once'],
          ['Pay monthly for 12 months', 'GH₵5,760 in total'],
          ['Give up the module', 'Lose the degree path'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'GH₵480 a month is nothing! You take it home today!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'GH₵480 is a third of my allowance, for 12 months. That\'s GH₵5,760. I\'ll save for it instead.' },
          { text: 'True, sign me up.', why: 'He hasn\'t added up the total yet.' },
          { text: 'Payment plans are always scams.', why: 'Not always. This one just costs far more than saving.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵480 is what fraction of GH₵1,500? Write it as a decimal to two places.',
        answers: ['0.32', '.32', '0,32'],
        placeholder: 'A decimal',
      },
      {
        kind: 'sortGroups',
        prompt: 'Saving up vs paying monthly: which is which?',
        groups: ['Saving up', 'Paying monthly'],
        items: [
          { text: 'Have it today', group: 1 },
          { text: 'Pay the cash price only', group: 0 },
          { text: 'Wait 16 weeks', group: 0 },
          { text: 'Owe money for a year', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The question Tey always asks about monthly payments.',
        template: 'How many [[1]], and what\'s the [[2]]?',
        blanks: [['months'], ['total']],
        distractors: ['colours', 'brand'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s thinking is the trap?',
        lines: [
          'I need a laptop in 16 weeks.',
          'GH₵480 a month sounds small.',
          'Efua might lend me hers on evenings until then.',
        ],
        bug: 1,
        fix: 'GH₵480 a month for 12 months is GH₵5,760.',
        explanation: 'Monthly prices are designed to sound small. The total is what you really pay.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The repair stall offers GH₵250 for the dead laptop\'s parts. If Kofi sells, how much does he have in total? (He had GH₵790.)',
        answers: ['1040', '1,040', 'GH₵1,040', 'GH₵1040'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Kofi keep the dead laptop for now instead of selling it today?',
        options: [
          { text: 'It still has his files on it; he\'ll get them out first and sell the parts later' },
          { text: 'He hopes it\'ll come back to life', why: 'The technician was clear: it won\'t.' },
          { text: 'GH₵250 isn\'t worth having', why: 'It\'s worth a lot to his goal. He\'ll sell once his files are safe.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What are you saving for, or what should you be? Write the thing and roughly what it costs.',
    starters: ['I want to save for...', 'It costs about...'],
  },
  deepen: {
    title: 'Buy now, pay more',
    summary: 'Instalment plans, hire purchase and "buy now, pay later" can be useful when something is urgent and the total cost is fair. Often, though, they cost much more than the cash price. Always multiply the monthly payment by the number of months, and compare.',
  },
  notes: 'Course 2 running numbers in tracks/save-money.ts. Payment plan (fictional, Yaw\'s cousin\'s shop): GH₵480 × 12 = 5,760 vs ~3,500 cash. Dead laptop parts GH₵250 (sold in Ch5). Efua lends her old laptop on evenings.',
};

export default lesson;
