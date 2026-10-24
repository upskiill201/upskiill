import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: name the money (earmarking). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Name the money',
  summary: '"Savings 2" is easy to spend. "Laptop for my degree" is not. A study with families in India found that a simple label, even a photo, changed how much people saved. Kofi renames everything.',
  minutes: 10,
  outcomes: [
    'Explain why labelled money is harder to spend',
    'Name each savings pot for its goal',
    'Use reminders and pictures to keep goals real',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Researchers Dilip Soman and Amar Cheema worked with low-income families in rural India who were paid in cash each week. Some families were given envelopes for savings; some envelopes had a photo of the family\'s children on them.</p><p>Families saved more when savings were put aside separately, and more again when the envelope carried their children\'s photo. Spending from it felt like taking from the children.</p>',
    },
    {
      kind: 'text',
      html: '<p>That\'s <strong>earmarking</strong>: giving money a name and a purpose. It\'s mental accounting (from Budgeting for Beginners) used on purpose.</p><p>Kofi renames his pots:</p><ul><li>"Savings" becomes <strong>Laptop for my degree</strong>.</li><li>"Emergency" becomes <strong>Emergency: health, safety, can\'t study without it</strong>.</li><li>"Bus fund" becomes <strong>Bus home to Mum</strong>.</li></ul><p>And he puts a photo of the laptop model as his phone\'s lock screen.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Reminders help too.</strong> In another study, people who got regular reminder messages about their savings goal saved more than those who didn\'t (Karlan and colleagues, 2016). Reminders that mentioned the specific goal worked best.</p><p>Kofi\'s reminder: every Sunday at 8 p.m., his phone says "Laptop: check the jar."</p>',
    },
    {
      kind: 'check',
      question: 'Which pot name will be hardest for Kofi to raid?',
      options: ['Laptop for my degree', 'Savings 2', 'Misc'],
      answer: 0,
      explanation: 'A specific, meaningful name makes spending it feel like breaking a promise to yourself.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name every pot for its purpose. Add a picture or a reminder that mentions the goal.',
    },
  ],
  apply: {
    scenario: 'Naming Kofi\'s money.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the India study, which families saved the most?',
        options: [
          { text: 'Those who kept all money together', why: 'Separating savings helped; the photo helped more.' },
          { text: 'There was no difference', why: 'There was a clear difference.' },
          { text: 'Those whose savings envelope had their children\'s photo on it' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each vague name to a better one.',
        pairs: [
          ['Savings', 'Laptop for my degree'],
          ['Misc', 'Bus home to Mum'],
          ['Other', 'Emergency: health and safety'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The term.',
        template: 'Giving money a name and a [[1]] is called [[2]].',
        blanks: [['purpose', 'job'], ['earmarking']],
        distractors: ['budgeting', 'lending'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong label or weak label?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: '"Laptop for my degree"', group: 0 },
          { text: '"Savings 2"', group: 1 },
          { text: '"Mum\'s birthday in March"', group: 0 },
          { text: '"Stuff"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Naming your money? That\'s a bit much, chale.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, it\'s silly.', why: 'Research says it works.' },
          { text: 'Try it. You\'d spend "Savings 2" on sneakers. Would you spend "Mum\'s hospital fund" on sneakers?' },
          { text: 'Only rich people name money.', why: 'The study was with low-income families.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Which reminder is most likely to help?',
        options: [
          { text: '"Laptop: check the jar. Week 9 of 16."' },
          { text: '"Save money."', why: 'Vague. Reminders naming the goal work better.' },
          { text: 'No reminder; he\'ll remember', why: 'He forgot twice in weeks 5 and 6.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Kofi\'s set-ups weakens the label?',
        lines: [
          'Pot name: Laptop for my degree.',
          'Lock screen: photo of the laptop model.',
          'Spend from the laptop pot "just this once" when short on fun money.',
        ],
        bug: 2,
        fix: 'Fun shortfalls are rebalanced in the budget, never from the laptop pot.',
        explanation: 'Each "just this once" teaches you the label doesn\'t mean anything.',
      },
      {
        kind: 'mcq',
        prompt: 'Earmarking is mental accounting used...',
        options: [
          { text: 'By accident, to waste money', why: 'That\'s the trap side. Earmarking is the helpful side.' },
          { text: 'On purpose, to protect money' },
          { text: 'Only by banks', why: 'Anyone can do it, with a name and a pot.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to earmark a goal.',
        lines: ['Pick a meaningful name', 'Put the money in its own pot', 'Add a picture or reminder', 'Never use it for anything else'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s reminder fires every Sunday for 16 weeks. How many reminders is that?',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rename your savings pots with names that mean something to you. What picture could remind you of your goal?',
    starters: ['My pot names:...', 'My picture:...'],
  },
  deepen: {
    title: 'Read the studies',
    summary: 'Soman and Cheema (2011), "Earmarking and Partitioning: Increasing Saving by Low-Income Households", Journal of Marketing Research. Karlan, McConnell, Mullainathan and Zinman (2016), "Getting to the Top of Mind: How Reminders Increase Saving", Management Science.',
  },
  notes: 'Soman, D., & Cheema, A. (2011). JMR, 48(SPL), S14–S22: rural Indian labourers; partitioned and child-photo envelopes increased savings. Karlan et al. (2016). Management Science, 62(12): reminders increased savings (~6%), goal-specific reminders more effective. Kept qualitative.',
};

export default lesson;
