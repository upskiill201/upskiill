import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the plan. Cliffhanger: where's GH₵2,130? */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the plan',
  summary: 'Kofi shows the jar to Miracle on a video call. She asks one question: "Where will GH₵2,130 come from?" Use everything from Chapter 1 to build his plan, and see why the answer starts in his own spending.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a full savings plan for a goal', 'Use goals, emergency funds and total-cost thinking together'],
  learn: [
    {
      kind: 'story',
      title: 'One question',
      beats: [
        { speaker: 'miracle', text: 'Good jar. Goal, date, emergency fund, the gap. Now: where will GH₵2,130 come from?' },
        { speaker: 'kofi', text: 'I... don\'t know. My budget\'s already tight.' },
        { speaker: 'miracle', text: 'Is it? Last month you had GH₵210 left over. Your data plan saved you GH₵230 a month when you switched. I bet there are more of those.' },
        { speaker: 'kofi', text: 'More leaks? I thought I\'d plugged them all.' },
        { speaker: 'miracle', text: 'Everyone thinks that. Go hunting. Every cedi you find a week is GH₵16 by week 16.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: a real goal, an emergency fund first, total costs not monthly ones, and the gap in plain numbers. Chapter 2: the leak hunt.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Kofi\'s plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s savings plan.',
        lines: ['Set the goal: GH₵3,500 by week 16', 'Build the emergency fund: GH₵300', 'Put the rest in the jar: GH₵490', 'Work out the gap: GH₵2,130', 'Find ways to close it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'One extra cedi saved every week for 16 weeks. How much is that?',
        answers: ['16', 'GH₵16', '16 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'To close GH₵2,130 in 16 weeks, about how much extra a week does Kofi need, on top of his GH₵55?',
        options: [
          { text: 'About GH₵13', why: '13 × 16 = 208. Far too little.' },
          { text: 'About GH₵500', why: '500 × 16 = 8,000. Far too much.' },
          { text: 'About GH₵133' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which could help close the gap?',
        groups: ['Could help', 'Wouldn\'t help'],
        items: [
          { text: 'Finding more spending leaks', group: 0 },
          { text: 'Earning a little more from beats', group: 0 },
          { text: 'Finding the same laptop cheaper', group: 0 },
          { text: 'Taking the GH₵480-a-month deal', group: 1 },
          { text: 'Emptying the emergency fund', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Should I just move the emergency fund into the jar? It\'s GH₵300 closer.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, emergencies are rare.', why: 'They\'re common. That\'s the point of the fund.' },
          { text: 'No. The day you need it, you\'ll take it from the jar anyway, or borrow. Keep it apart.' },
          { text: 'Move half.', why: 'Half a cushion still leaves him exposed, and the habit of raiding it begins.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 1 idea to its one-liner.',
        pairs: [
          ['Goal', 'Amount, date, weekly target'],
          ['Emergency fund', 'First, separate, do not touch'],
          ['Small payments', 'Multiply out the total'],
          ['Present bias', 'Now pulls harder than later'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A savings goal: GH₵1,200 in 12 weeks, with GH₵0 saved. What\'s the weekly target?',
        answers: ['100', 'GH₵100', '100 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s plan will make the jar fragile?',
        lines: [
          'Emergency fund GH₵300, separate.',
          'Jar GH₵490, saving GH₵55 a week.',
          'If I\'m short on food, I\'ll take from the jar.',
          'Update the jar every Sunday.',
        ],
        bug: 2,
        fix: 'If I\'m short on food, I rebalance my budget lines.',
        explanation: 'A jar that pays for everyday shortfalls never fills. The budget handles food; the jar handles the laptop.',
      },
      {
        kind: 'mcq',
        prompt: 'Which trick against present bias will Kofi use most?',
        options: [
          { text: 'Moving savings on Sunday before he can spend them' },
          { text: 'Deciding at the suya stand', why: 'That gives "now" the vote.' },
          { text: 'Hiding the jar', why: 'He wants it visible, not hidden.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 in one line.',
        template: 'A real [[1]], an emergency fund [[2]], and the [[3]] in plain numbers.',
        blanks: [['goal'], ['first'], ['gap']],
        distractors: ['loan', 'last'],
      },
      {
        kind: 'mcq',
        prompt: 'Where does Miracle say the hunt for GH₵2,130 starts?',
        options: [
          { text: 'In a loan app', why: 'Never.' },
          { text: 'In his own spending: more leaks' },
          { text: 'In asking Mum', why: 'She\'s already giving. The hunt starts with him.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own savings plan: goal, emergency fund, jar, gap. Where do you think your first extra cedis could come from?',
    starters: ['Goal:...', 'Emergency fund:...', 'Gap:...', 'First idea:...'],
  },
  notes: 'Chapter 1 challenge. Gap 2,130; extra per week ≈ 133. Sets up Chapter 2 (leak hunt; finds GH₵70/week).',
};

export default lesson;
