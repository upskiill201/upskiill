import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Compare: report vs recommendation. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Recommend, don\'t report',
  summary: 'Lucía rewrites her five minutes. The facts don\'t change. What changes is the first sentence, and what every sentence after it is for.',
  minutes: 12,
  outcomes: [
    'Turn a report into a recommendation',
    'Put the ask first and the evidence after',
    'Offer a clear yes or no',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Lucía\'s five minutes',
      before: {
        label: 'Report',
        text: '"In week one, sales were 92,000 bags. In week two, they rose to 110,000. Guadalajara performed strongly. Week three saw a stock issue. By week nine we were 38% above target. So that\'s where we are."',
      },
      after: {
        label: 'Recommendation',
        text: '"I recommend two things: make chili-lime permanent, and take it to 1,200 convenience stores in Monterrey from October.\nWhy: 38% above target for nine weeks, our best launch in three years.\nRisk: the Toluca plant is at 85%. We\'d add a Saturday shift.\nWe also looked at a national launch; it\'s too fast for the plant.\nCan I have a yes today?"',
      },
      notes: [
        'The report ends with "that\'s where we are". The recommendation starts with what to do.',
        'Every sentence after the first supports it: why, risk, options.',
        'It ends with a yes/no question and a time.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Recommendation: what to do, why, the risk and plan, what else you considered, then ask for a yes.',
    },
  ],
  apply: {
    scenario: 'Recommend, don\'t report.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How does the report end?',
        options: [
          { text: '"So that\'s where we are."' },
          { text: 'With a clear ask', why: 'That\'s the recommendation.' },
          { text: 'With the risk', why: 'It doesn\'t mention a plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Report or recommendation?',
        groups: ['Report', 'Recommendation'],
        items: [
          { text: '"In week one, sales were 92,000 bags."', group: 0 },
          { text: '"I recommend two things."', group: 1 },
          { text: '"Guadalajara performed strongly."', group: 0 },
          { text: '"Can I have a yes today?"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many convenience stores in Monterrey?',
        answers: ['1200', '1,200'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to the line.',
        pairs: [
          ['What to do', '"Make chili-lime permanent"'],
          ['The risk and plan', '"Add a Saturday shift"'],
          ['What else', '"A national launch is too fast"'],
          ['The ask', '"Can I have a yes today?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Asking for a yes in the room feels pushy.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'It\'s clear, not pushy. She can say no, or "not yet". Without the ask, she has to work out what you want.' },
          { text: 'Then don\'t ask.', why: 'The ask makes it a decision.' },
          { text: 'Demand an answer.', why: 'Ask, don\'t demand.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The difference.',
        template: 'A report tells them what [[1]]. A recommendation tells them what to [[2]].',
        blanks: [['happened'], ['do']],
        distractors: ['costs', 'read'],
      },
      {
        kind: 'mcq',
        prompt: 'From when does Lucía propose entering Monterrey?',
        options: [
          { text: 'October' },
          { text: 'Next year', why: 'October.' },
          { text: 'Spring', why: 'That\'s mango-chili.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the recommendation is really a report?',
        lines: [
          '"I recommend we make chili-lime permanent."',
          '"Why: 38% above target for nine weeks."',
          '"In week four, sales were 118,000, and in week five..."',
          '"Can I have a yes today?"',
        ],
        bug: 2,
        fix: 'Delete it, or keep it for questions.',
        explanation: 'Week-by-week detail is report, not support.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s recommendation.',
        lines: ['What to do', 'Why', 'Risk and plan', 'What else we considered', 'The ask'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bags were sold in week one?',
        answers: ['92000', '92,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Take an update you usually give as a report. Rewrite the first sentence as a recommendation.',
    starters: ['Report:...', 'Recommendation:...'],
  },
  deepen: {
    title: 'Judgement is the value',
    summary: 'Anyone can read a sales chart. What leaders need from the person closest to the work is judgement: what should we do? A recommendation shows it.',
  },
  notes: 'Fictional: weekly sales (92,000 bags week 1, 110,000 week 2), 1,200 Monterrey convenience stores, Toluca plant at 85%.',
};

export default lesson;
