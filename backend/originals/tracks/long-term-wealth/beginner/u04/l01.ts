import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: the offer. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The offer',
  summary: 'The bank offers ₦1.5 million a month. Her friends have already picked her Lekki flat. Miracle has a decision to make, and a bigger one hiding behind it: whatever she earns next, where does the extra go?',
  minutes: 12,
  outcomes: [
    'See why income alone doesn\'t build wealth',
    'Plan what a raise is for before it arrives',
    'Make a career choice that isn\'t only about money',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday morning',
      beats: [
        { speaker: 'narrator', text: 'Monday. Miracle knocks on Folake\'s door with the bank\'s offer letter in her bag.' },
        { speaker: 'miracle', text: 'I\'m not trying to bargain. I just want to be honest with you. I love this work. But ₦1.5 million is a lot.' },
        { speaker: 'folake', text: 'Thank you for telling me. We can\'t match it. We can do ₦1,250,000 and the operations lead role. And you\'d keep your evenings for that course you\'re doing.' },
        { speaker: 'narrator', text: 'That night the group chat is still going: "Lekki or nothing." "Get the car first."' },
        { speaker: 'tey', text: 'Two choices here. Which job? And, whichever she picks, what happens to the extra money? The second one decides her wealth far more than the first.' },
      ],
      choice: {
        prompt: 'What should Miracle do?',
        options: [
          { text: 'Take the bank job, move to Lekki, and finance a car the same month.', outcome: 'A ₦600,000 raise, spent before it lands. In a year she\'d earn far more and keep almost nothing extra. A bigger income with a bigger lifestyle leaves the same gap.' },
          { text: 'Stay at Afiya at ₦1,250,000, and decide before the first payslip exactly where the extra ₦250,000 goes: half to future her, half to enjoying life now.', outcome: 'Yes. She chooses the work she loves and the evenings she needs, and she plans the raise before her lifestyle can quietly swallow it. The gap grows, and so does her life.', best: true },
          { text: 'Stay, and change nothing about her plan. Let the extra money sit in her current account.', outcome: 'Money with no job in a current account usually gets spent without anyone deciding to. Within a few months it will have "disappeared".' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Wealth isn\'t how much you earn. It\'s the gap between what you earn and what you spend, kept for a long time. A raise only builds wealth if some of it stays in the gap.',
    },
  ],
  apply: {
    scenario: 'The offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the "Lekki, car, bank job" plan leave Miracle no richer?',
        options: [
          { text: 'Bank jobs pay badly', why: 'It pays ₦1.5 million; the problem is spending.' },
          { text: 'Her spending grows as fast as her income, so the gap stays the same' },
          { text: 'Lekki is unsafe', why: 'It\'s about the gap, not the area.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle\'s take-home goes from ₦1,000,000 to ₦1,250,000. How big is the raise?',
        answers: ['250000', '250,000', '₦250,000', '₦250000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Grows the gap, or shrinks it?',
        groups: ['Grows the gap', 'Shrinks it'],
        items: [
          { text: 'Saving half of every raise', group: 0 },
          { text: 'A car loan the month the raise lands', group: 1 },
          { text: 'Keeping must-haves steady', group: 0 },
          { text: 'A flat that costs the whole raise', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'You turned down ₦1.5 million?! Are you okay?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'I\'m going to regret it.', why: 'She made a reasoned choice.' },
          { text: 'Money doesn\'t matter.', why: 'It matters; it\'s just not the only thing.' },
          { text: 'I got a raise anyway, kept work I love, and kept my evenings. And I\'ve already decided where the extra goes.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Wealth.',
        template: 'Wealth is the [[1]] between what you earn and what you [[2]], kept for a long time.',
        blanks: [['gap'], ['spend']],
        distractors: ['sum', 'owe'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each option to what happens.',
        pairs: [
          ['Bank job and Lekki and car', 'Bigger income, same gap'],
          ['Stay, plan the raise', 'Bigger gap, better life'],
          ['Stay, no plan', 'Extra money quietly disappears'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Miracle\'s raise plan is the weak one?',
        lines: [
          'Half of the raise goes to future me, automatically.',
          'Half goes to enjoying life now.',
          'I\'ll decide where it goes once it\'s been in my account a few months.',
        ],
        bug: 2,
        fix: 'I\'ll decide before the first payslip.',
        explanation: 'Money without a job gets spent before you notice.',
      },
      {
        kind: 'mcq',
        prompt: 'What else did Miracle weigh besides money?',
        options: [
          { text: 'Work she loves, and evenings for her course' },
          { text: 'Nothing else', why: 'She weighed her work and time too.' },
          { text: 'Her friends\' opinions', why: 'She heard them, but decided herself.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Half of the ₦250,000 raise goes to future Miracle. How much is that?',
        answers: ['125000', '125,000', '₦125,000', '₦125000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s decision.',
        lines: ['Be honest with Folake', 'Weigh the work, not just the pay', 'Choose the job', 'Plan the raise before the first payslip'],
      },
    ],
  },
  reflect: {
    prompt: 'The last time your income went up, even a little, where did the extra go?',
    starters: ['It went on...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Pay is one part of a job',
    summary: 'Hours, learning, the people you work with and room to grow all affect your long-term earning power. A slightly lower salary that builds your skills can be worth more over a career than a higher one that doesn\'t.',
  },
  notes: 'Running numbers: take-home ₦1,000,000 after Ch3 raise → ₦1,250,000 (Afiya counter). Callback: Make People Listen (Miracle chose Afiya over a bank job). Friends\' pressure → L6 Lekki compare.',
};

export default lesson;
