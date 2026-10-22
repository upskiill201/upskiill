import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Compare: page one, before and after. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Page one, before and after',
  summary: 'Zanele puts the old page one next to the new one. Same report, same facts. One tells a board member what to decide; the other tells them the report has started.',
  minutes: 12,
  outcomes: [
    'Build a page one that stands alone',
    'Use a recommendation box and a short results line',
    'Move detail to an appendix without losing it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The board report, page one',
      before: {
        label: 'Old page one',
        text: '"1. Introduction\nThis report sets out the background, methodology, findings and discussion relating to the Saturday dispatch pilot undertaken at the Nairobi depot. Section 2 describes the history of weekend operations at Synergix. Section 3 outlines the data sources used, including the order export..." (the recommendation is on page 11)',
      },
      after: {
        label: 'New page one',
        text: 'Saturday dispatch cut late deliveries from 34% to 21%. Roll it out to all three depots.\n[Box] Decision needed at this meeting: approve rollout to Mombasa and Kisumu from August.\nResults: late deliveries 34% to 21%; refunds down by a third.\nCost: KES 120,000 a month per depot.\nMain risk: finding Saturday drivers (31 of 40 signed up in Nairobi).\nDetail: Appendix A (method), B (weekly data), C (driver survey).',
      },
      notes: [
        'The title is the message, not "Pilot Report".',
        'The decision is in a box, with when it\'s needed.',
        'All 12 pages of detail still exist, in the appendices.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Page one: the message as the title, the decision in a box, key results, cost, main risk, and where the detail is.',
    },
  ],
  apply: {
    scenario: 'The new page one.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the title of the new page one?',
        options: [
          { text: '"Pilot Report"', why: 'That\'s a label.' },
          { text: 'The main result and the recommendation' },
          { text: '"Introduction"', why: 'That was the old one.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Old page one or new page one?',
        groups: ['Old', 'New'],
        items: [
          { text: 'History of weekend operations', group: 0 },
          { text: 'Decision needed, in a box', group: 1 },
          { text: '"This report sets out..."', group: 0 },
          { text: 'Cost per depot', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many drivers in Nairobi signed up for Saturdays?',
        answers: ['31', 'thirty-one', 'thirty one'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the appendix to what it holds.',
        pairs: [
          ['Appendix A', 'Method'],
          ['Appendix B', 'Weekly data'],
          ['Appendix C', 'Driver survey'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Where did the other eleven pages go?',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'I deleted them.', why: 'They moved to the appendices.' },
          { text: 'Nobody needs them.', why: 'Some readers do, so they\'re kept.' },
          { text: 'They\'re all in the appendices. Page one gives the decision; anyone who wants the depth can turn the page.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The box.',
        template: 'Put the [[1]] needed in a box, and say [[2]] it\'s needed.',
        blanks: [['decision'], ['when']],
        distractors: ['history', 'why'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong on page one?',
        lines: [
          'Roll out Saturday dispatch to all three depots.',
          'Cost: KES 120,000 a month per depot.',
          'Section 2 describes the history of weekend operations.',
          'Main risk: finding Saturday drivers.',
        ],
        bug: 2,
        fix: 'Move it to an appendix, or delete it.',
        explanation: 'It describes the report instead of saying something.',
      },
      {
        kind: 'mcq',
        prompt: 'From when does the new page one propose the rollout?',
        options: [
          { text: 'August' },
          { text: 'Next year', why: 'From August.' },
          { text: 'It doesn\'t say', why: 'It says August.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new page one.',
        lines: ['Message as the title', 'Decision in a box', 'Key results', 'Cost and main risk', 'Where the detail is'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which page was the recommendation in the old report?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite page one of a document you wrote so it stands alone.',
    starters: ['Title:...', 'Decision:...'],
  },
  deepen: {
    title: 'Executive summaries',
    summary: 'Many organisations call this an executive summary. The test is the same: if it were the only page read, could the reader decide?',
  },
  notes: 'Fictional board report. Figures consistent with earlier chapters (34% to 21%, KES 120,000/month, 31 of 40 drivers).',
};

export default lesson;
