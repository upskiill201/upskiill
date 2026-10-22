import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Tap to explore: Brian's KPI slide — KPI, target, YoY, QoQ, ROI, OKR, Q4, FY. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Goals and numbers: KPI, OKR, ROI, YoY',
  summary: 'Brian\'s KPI deck is due Friday, and Remi is building it. The first slide is one table and eight acronyms. If he gets these wrong, the CEO sees it.',
  minutes: 13,
  outcomes: [
    'Decode KPI, target, YoY, QoQ, ROI, OKR, Q1–Q4 and FY',
    'Read a simple performance slide and say what it means',
    'Know the difference between a KPI and an OKR',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Slide 1 of Brian\'s KPI deck (draft)',
      text: 'Q3 KPIs. On-time delivery: 71% (target 90%). Revenue: up 8% YoY. Customer churn: 4%, down 1 point QoQ. ROI on the new courier test: TBC. Our OKR for Q4: on-time delivery above 85%. Synergix\'s FY ends in June.',
      hotspots: [
        { phrase: 'KPIs', note: 'Key performance indicators: the few numbers a team watches to know if it\'s doing well. Synergix\'s delivery team watches on-time delivery.' },
        { phrase: 'target', note: 'The number they\'re aiming for. 71% against a target of 90% means: well short.' },
        { phrase: 'YoY', note: 'Year over year: compared with the same period last year. "Up 8% YoY" = 8% higher than Q3 last year.' },
        { phrase: 'QoQ', note: 'Quarter over quarter: compared with the previous quarter (Q2).' },
        { phrase: 'ROI', note: 'Return on investment: what you get back compared with what you put in. "Was it worth the money?"' },
        { phrase: 'OKR', note: 'Objectives and key results: a goal (objective) plus the measurable results that show you got there. Many companies set them every quarter.' },
        { phrase: 'Q4', note: 'Quarter 4: the year split into four three-month quarters. Whose year? See FY.' },
        { phrase: 'FY', note: 'Financial year (also fiscal year): the company\'s 12-month accounting year. It doesn\'t always match January to December. Synergix\'s runs July to June, so ITS Q4 is April to June. Always check.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Wait. If the financial year ends in June, then "Q4" isn\'t October to December?' },
        { speaker: 'remi', text: '...I\'ve labelled every slide wrong.' },
        { speaker: 'tey', text: "Caught before Friday. That's the whole point of decoding carefully. Quarters follow the company's financial year, not the calendar, unless someone says \"calendar Q4\"." },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'KPI = a number you watch. OKR = a goal plus the numbers that prove you hit it. YoY = vs last year. QoQ = vs last quarter. ROI = was it worth it?',
    },
  ],
  apply: {
    scenario: 'Tuesday, week three. Building slide 1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the numbers words.',
        pairs: [
          ['KPI', 'A key number a team watches'],
          ['YoY', 'Compared with last year'],
          ['QoQ', 'Compared with last quarter'],
          ['ROI', 'What you get back for what you put in'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"On-time delivery: 71% (target 90%)." What does that slide line mean?',
        options: [
          { text: 'Deliveries are doing better than planned', why: '71 is below the 90 they aimed for.' },
          { text: 'Deliveries are well below where the team wants them' },
          { text: '90% of deliveries were on time', why: '90% is the target, not the result.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Synergix\'s financial year runs July to June. When is its Q1?',
        options: [
          { text: 'July to September' },
          { text: 'January to March', why: 'That\'s Q1 of a calendar year. Synergix\'s year starts in July.' },
          { text: 'October to December', why: 'That\'s their Q2.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'For the deck: what\'s the ROI on the courier test so far?',
        prompt: 'What is Brian asking?',
        options: [
          { text: 'How many routes are in the test', why: 'ROI is about return on money or effort.' },
          { text: 'Whether the test has been worth what it cost, so far' },
          { text: 'When the test started', why: 'ROI is about value, not dates.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'OKR stands for objectives and key ... (one word)',
        answers: ['results'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it a KPI (a number you watch) or an OKR (a goal with results)?',
        groups: ['KPI', 'OKR'],
        items: [
          { text: 'On-time delivery rate', group: 0 },
          { text: 'Objective: make deliveries reliable. Result: 85% on time by June', group: 1 },
          { text: 'Monthly customer churn', group: 0 },
          { text: 'Objective: happier customers. Result: complaints halved this quarter', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s slide notes. Which one is wrong?',
        lines: [
          'Revenue up 8% YoY: higher than the same quarter last year.',
          'Churn down 1 point QoQ: fewer customers left than last quarter.',
          'ROI TBC: the return has already been confirmed.',
        ],
        bug: 2,
        fix: 'ROI TBC: the return isn\'t known yet.',
        explanation: 'TBC = to be confirmed. Not known yet.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['EOW', 'End of week'],
          ['NB', 'Pay attention to this'],
          ['Pre-read', 'Read before the meeting'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi explains slide 1 in plain words.',
        template: 'Deliveries are [[1]] the target. Revenue is higher than last [[2]]. Whether the courier test was worth it isn\'t [[3]] yet.',
        blanks: [['below', 'under'], ['year'], ['known', 'confirmed']],
        distractors: ['above', 'quarter'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the safe question when someone says "Q4".',
        tiles: ['Do', 'you', 'mean', 'our', 'financial', 'Q4', 'or', 'calendar', 'Q4?'],
        distractors: ['KPI'],
      },
    ],
  },
  reflect: {
    prompt: 'If you had one KPI for your own week (study, work, health, savings), what would it be, and what would your target be?',
    starters: ['My KPI would be...', 'My target is...'],
  },
  deepen: {
    title: 'Find your company\'s year',
    summary: 'Find out when your organisation\'s financial year starts (or your country\'s government financial year). It explains a lot about when budgets get tight and when everyone is suddenly busy.',
  },
  notes: 'KPI, OKR (objectives and key results; popularised by Intel/Google), ROI, YoY, QoQ, FY (financial/fiscal year; Cambridge). Financial years vary by company and country (e.g. Kenya\'s government FY runs July–June; UK government April–March). Synergix FY is fictional. Figures fictional.',
};

export default lesson;
