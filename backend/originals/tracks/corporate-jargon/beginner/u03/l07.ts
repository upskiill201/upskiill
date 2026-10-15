import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Reading: money words — revenue vs profit, costs, margin, P&L, budget, the bottom line, in the red/black. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Money words: revenue, profit, P&L',
  summary: 'Wanjiku from Finance gives Remi ten minutes and a whiteboard. By the end, he knows why "revenue is up" can still be bad news.',
  minutes: 13,
  outcomes: [
    'Know the difference between revenue and profit',
    'Decode P&L, margin, budget, forecast, bottom line, in the red/black',
    'Explain a simple money sentence in plain words',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Wanjiku\'s ten-minute money lesson',
      html: "<p>Wednesday, 2 p.m. Wanjiku draws a box on the whiteboard. \"Every business is this,\" she says. \"Money comes in. Money goes out. What's left over is what matters.\"</p><h3>Money in: revenue</h3><p><strong>Revenue</strong> is all the money a company earns from selling things before anything is taken off. In British English it's also called <strong>turnover</strong>, and people say <strong>sales</strong> or the <strong>top line</strong>, because it's the first line of the accounts.</p><h3>Money out: costs</h3><p><strong>Costs</strong> (or <strong>expenses</strong>) are everything the company pays: salaries, rent, couriers, refunds.</p><h3>What's left: profit</h3><p><strong>Profit</strong> = revenue minus costs. It's the <strong>bottom line</strong>, literally the last line of the accounts. That's why people say \"what's the impact on the bottom line?\" when they mean \"does this make or lose us money?\"</p><p>\"So,\" says Wanjiku, \"revenue can go up 8%, and if costs go up 20%, profit goes DOWN. Revenue up is not always good news.\"</p><h3>The P&L</h3><p>A <strong>P&L</strong> (profit and loss statement) is the report that shows revenue, costs and profit for a period, like a quarter. \"Who owns the P&L?\" means: who is responsible for whether this part of the business makes money?</p><h3>Margin</h3><p><strong>Margin</strong> is profit as a share of revenue. If you sell something for KSh 100 and it costs you KSh 70, your margin is 30%. \"Thin margins\" means very little profit on each sale.</p><h3>In the red, in the black</h3><p><strong>In the red</strong> = losing money. <strong>In the black</strong> = making money. (From old accounting books, where losses were written in red ink.)</p><h3>Budget and forecast</h3><p>A <strong>budget</strong> is the plan for how much a team can spend. A <strong>forecast</strong> is the best guess of what WILL happen. \"We're over budget\" = we've spent more than the plan allowed.</p>",
    },
    {
      kind: 'check',
      question: 'Revenue is up 8%. Costs are up 20%. What probably happened to profit?',
      options: ['It went up a lot', 'It went down', 'Nothing'],
      answer: 1,
      explanation: 'Costs grew faster than revenue, so less is left over.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Revenue = money in. Costs = money out. Profit = what\'s left (the bottom line). Margin = profit as a share of revenue.',
    },
  ],
  apply: {
    scenario: 'Wednesday, 2 p.m. Wanjiku\'s whiteboard.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the money words.',
        pairs: [
          ['Revenue', 'All the money coming in from sales'],
          ['Profit', 'What\'s left after costs'],
          ['Margin', 'Profit as a share of revenue'],
          ['Budget', 'The plan for what can be spent'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"What\'s the impact on the bottom line?" What is Mr Kamau asking?',
        options: [
          { text: 'Will it make or lose us money, in the end?' },
          { text: 'What\'s at the bottom of the slide?', why: 'The bottom line of the ACCOUNTS: profit.' },
          { text: 'How many people will it affect?', why: 'It\'s about profit.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good news or bad news?',
        groups: ['Good news', 'Bad news'],
        items: [
          { text: 'We\'re in the black', group: 0 },
          { text: 'We\'re over budget', group: 1 },
          { text: 'Margins are healthy', group: 0 },
          { text: 'We\'re in the red', group: 1 },
          { text: 'Thin margins', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'You sell for KSh 100, it costs you KSh 70. What\'s your margin, in percent? (just the number)',
        answers: ['30', '30%'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Revenue up 8% YoY!! Best news ever! Slide title: "Record success!"',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Agreed, record success!', why: 'Revenue alone doesn\'t say if profit went up.' },
          { text: 'Nice! But let\'s check costs first: if they went up more, profit fell. Maybe "Revenue up 8%" for now?' },
          { text: 'Revenue doesn\'t matter.', why: 'It matters a lot. It\'s just not the whole story.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What does "P&L" stand for?',
        options: [
          { text: 'Plans and logistics', why: 'Good guess for Synergix, but no.' },
          { text: 'Pay and leave', why: 'That\'s HR.' },
          { text: 'Profit and loss' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes from the whiteboard. Which line is wrong?',
        lines: [
          'Revenue: all the money from sales.',
          'Profit: revenue plus costs.',
          'In the red: losing money.',
        ],
        bug: 1,
        fix: 'Profit: revenue minus costs.',
        explanation: 'Costs are taken AWAY from revenue to get profit.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['YoY', 'Compared with last year'],
          ['ROI', 'Was it worth the money?'],
          ['FY', 'The company\'s accounting year'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Translate Wanjiku\'s Finance update.',
        template: '"We\'re over budget and in the red this quarter" = "We\'ve [[1]] more than planned, and we\'re [[2]] money."',
        blanks: [['spent'], ['losing']],
        distractors: ['saved', 'making'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Wanjiku\'s golden rule.',
        tiles: ['Revenue', 'up', 'is', 'not', 'always', 'good', 'news.'],
        distractors: ['profit', 'red'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a business you know well (a shop, a stall, an app, your own side hustle). What\'s its revenue, what are its costs, and is it in the red or the black?',
    starters: ['The business is...', 'Its biggest cost is probably...'],
  },
  deepen: {
    title: 'Read one real P&L',
    summary: 'Many listed companies publish their results for free online. Find one company you know and look at its revenue and profit lines. You don\'t need to understand everything: just find the top line and the bottom line.',
  },
  notes: 'Revenue/turnover/top line, costs/expenses, profit/bottom line, P&L (income statement), margin (profit margin), "in the red/black" (Cambridge; red-ink-for-losses origin widely documented), budget vs forecast. General financial vocabulary only; no advice. Figures fictional.',
};

export default lesson;
