import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Card deck: 50/30/20 and when to bend it. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: '50/30/20, and when to bend it',
  summary: 'Miracle sends Kofi the most famous budgeting rule in the world. He tries it on his GH₵1,500, and it doesn\'t fit. Here\'s why, and what to do instead.',
  minutes: 11,
  outcomes: [
    'Explain the 50/30/20 rule',
    'Work out your own needs, wants and savings split',
    'Bend the rule to fit a small income',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The 50/30/20 rule</strong> comes from the book <em>All Your Worth</em> (2005) by Elizabeth Warren and Amelia Warren Tyagi. Split your take-home money three ways:</p><ul><li><strong>50% needs</strong>: housing, food, transport, bills.</li><li><strong>30% wants</strong>: fun, eating out, clothes beyond the basics.</li><li><strong>20% savings</strong>, and paying off debt.</li></ul><p>It\'s popular because it\'s easy to remember and gives you a quick health check.</p>',
    },
    {
      kind: 'text',
      html: '<p>Kofi tries it on GH₵1,500: needs GH₵750, wants GH₵450, savings GH₵300.</p><p>His real needs (data, dues, toiletries, food staples, basic meals on lab days, transport, school) come to about <strong>GH₵860</strong>. That\'s about 57%, not 50%.</p><p>That\'s normal. On a small income, needs take a bigger share, because the basics cost the same whether you earn a lot or a little.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>How to bend it:</strong></p><ul><li>Cover needs first, at their real size.</li><li>Keep <em>some</em> savings, even if it\'s 10% or 5%. The habit matters more than the size.</li><li>Wants get what\'s left, kept small but not zero.</li></ul><p>Kofi\'s month 2: about <strong>57% needs, 30% wants, 13% savings</strong>. Not textbook, but honest, and it works.</p>',
    },
    {
      kind: 'check',
      question: 'Why do needs often take more than 50% on a small income?',
      options: ['Basics like food and data cost the same whatever you earn', 'Small earners waste more', 'The rule is wrong for everyone'],
      answer: 0,
      explanation: 'A plate of rice costs the same for everyone. On a small income, that\'s a bigger share.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Use 50/30/20 as a health check, not a law. If needs are over 50%, keep some savings anyway, even 5%, and keep wants small.',
    },
  ],
  apply: {
    scenario: 'Kofi vs the rule.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the rule to what it covers.',
        pairs: [
          ['50%', 'Needs'],
          ['30%', 'Wants'],
          ['20%', 'Savings and debt'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By the textbook rule, what is 20% of GH₵1,500?',
        answers: ['300', 'GH₵300', '300 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s real needs are GH₵860 of GH₵1,500. What percent is that, roughly?',
        options: [
          { text: 'About 43%', why: 'That would be about GH₵645.' },
          { text: 'About 57%' },
          { text: 'About 86%', why: 'That would be about GH₵1,290.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Need, want or savings?',
        groups: ['Need', 'Want', 'Savings'],
        items: [
          { text: 'Food staples', group: 0 },
          { text: 'Friday kelewele', group: 1 },
          { text: 'GH₵200 put aside', group: 2 },
          { text: 'Data plan for the class portal', group: 0 },
          { text: 'New sneakers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'My needs are 57%. I fail the rule. Should I just give up on saving?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, saving is for when you earn more.', why: 'The habit is worth more than the amount. Start small, now.' },
          { text: 'Cut needs to 50% no matter what.', why: 'Squeezing real needs to hit a number breaks the plan.' },
          { text: 'You don\'t fail. Needs come first at their real size. Keep saving something, even 10%. The habit is what counts.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Use the rule as...',
        template: 'Use 50/30/20 as a health [[1]], not a [[2]].',
        blanks: [['check'], ['law', 'rule']],
        distractors: ['loan', 'goal'],
      },
      {
        kind: 'mcq',
        prompt: 'Someone takes home 3,000 a month and their needs are 1,200. What does the rule suggest for wants and savings?',
        options: [
          { text: 'Wants up to 900 and savings 600, roughly; with needs below 50%, they could save even more' },
          { text: 'Spend the extra on wants', why: 'The rule caps wants at about 30%. Extra room should go to savings.' },
          { text: 'Nothing: the rule only works for students', why: 'It works best at middle incomes, actually.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line misunderstands 50/30/20?',
        lines: [
          'Needs: rent, food, transport.',
          'Wants: eating out, entertainment.',
          'Savings: whatever is left after wants.',
        ],
        bug: 2,
        fix: 'Savings: a set 20% (or what you can), decided up front.',
        explanation: 'The 20% is planned, not a leftover.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi saves GH₵200 of GH₵1,500. About what percent is that? (Round to the nearest whole number.)',
        answers: ['13', '13%', '13 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Who wrote the book that made 50/30/20 famous?',
        options: [
          { text: 'A football coach', why: 'No. Think law professor and her daughter.' },
          { text: 'Elizabeth Warren and Amelia Warren Tyagi' },
          { text: 'A bank\'s advertising team', why: 'It came from a personal finance book.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Roughly what share of your money goes to needs, wants and savings right now? What\'s one small change toward your own healthy split?',
    starters: ['Needs are about...', 'Wants about...', 'Savings about...', 'One change:...'],
  },
  deepen: {
    title: 'Other splits people use',
    summary: 'Some people use 70/20/10 (needs, savings, wants) on tight incomes, or 80/20 (spend 80, save 20 first). The exact numbers matter less than two things: savings decided first, and wants kept on purpose.',
  },
  notes: 'Warren, E., & Warren Tyagi, A. (2005). All Your Worth: The Ultimate Lifetime Money Plan. Kofi needs (fictional) ≈ 860: data 70 + dues 20 + toiletries 40 + staples 240 + basic food out ~270 of 400 + transport 60 + school 100 + ~60 essential personal = 860 → 57%. Wants ≈ 440 (food-out extra 130, fun 120, clothes/haircut extra 40, surprises are buffer; simplified to "30%"). Savings 200 = 13.3%. Lesson presents rounded figures.',
};

export default lesson;
