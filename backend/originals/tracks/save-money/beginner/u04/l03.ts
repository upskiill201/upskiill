import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Step-by-step: refilling the emergency fund. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Refilling the fund',
  summary: 'The emergency fund did its job. Now it holds GH₵20, and the next emergency won\'t wait. Kofi has to refill it without stopping the laptop jar. Step by step, here\'s how.',
  minutes: 11,
  outcomes: [
    'Make a plan to refill an emergency fund',
    'Balance refilling against a savings goal',
    'Know what to pause, and for how long',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The refill plan',
      steps: [
        { title: '1. Write the gap', body: 'Target GH₵300. Now GH₵20. Gap: GH₵280.' },
        { title: '2. Refill comes first', body: 'Until the fund is back, the next surprise has nowhere to go but the laptop jar or a loan. So refilling jumps the queue.' },
        { title: '3. Pick where the refill comes from', body: 'Kofi redirects the GH₵70 weekly leak money to the emergency fund instead of the jar. The GH₵230 on the 1st still goes to the jar.' },
        { title: '4. Set the timeline', body: 'GH₵280 ÷ GH₵70 = 4 weeks. Weeks 9 to 12. The jar grows more slowly for a month (about GH₵55 a week) but never stops.' },
        { title: '5. Change the automatic transfer', body: 'He switches the Sunday scheduled transfer to the emergency fund for four weeks, with a reminder in week 12 to switch it back.' },
        { title: '6. Switch back', body: 'When the fund hits GH₵300, the GH₵70 goes back to the jar. Done.' },
      ],
    },
    {
      kind: 'check',
      question: 'Gap GH₵150, refilling GH₵50 a week. How many weeks?',
      options: ['5', '3', '2'],
      answer: 1,
      explanation: '150 ÷ 50 = 3.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'After using the emergency fund, refill it first, with a set amount and a set end date. Then switch back to the goal.',
    },
  ],
  apply: {
    scenario: 'Refilling after the fever.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Target GH₵300, now GH₵20. How big is the gap?',
        answers: ['280', 'GH₵280', '280 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵280 at GH₵70 a week. How many weeks to refill?',
        answers: ['4', 'four', '4 weeks'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the refill plan.',
        lines: ['Write the gap', 'Put refilling first', 'Pick where the refill comes from', 'Set the timeline', 'Change the automatic transfer', 'Switch back when full'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does refilling jump ahead of the laptop?',
        options: [
          { text: 'Because the laptop doesn\'t matter', why: 'It matters; the fund protects it.' },
          { text: 'Because banks require it', why: 'It\'s Kofi\'s rule.' },
          { text: 'Until it\'s full, the next surprise would hit the laptop jar or a loan' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'During the refill, how much goes to the laptop jar each week?',
        options: [
          { text: 'About GH₵55 (the budget savings part)' },
          { text: 'GH₵125, same as before', why: 'GH₵70 of it is going to the fund for 4 weeks.' },
          { text: 'Nothing', why: 'The GH₵230 on the 1st still goes to the jar.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Can I skip refilling? I\'ll be careful not to get ill again.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Sure, lightning doesn\'t strike twice.', why: 'Emergencies don\'t take turns.' },
          { text: 'Stop saving for the laptop instead.', why: 'Both can happen; the laptop just slows for a month.' },
          { text: 'You can\'t plan not to have emergencies. Four weeks of refilling protects twelve weeks of laptop saving.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Refill [[1]], with a set amount and a set [[2]] date.',
        blanks: [['first'], ['end']],
        distractors: ['later', 'start'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step will make the refill drag on forever?',
        lines: [
          'Gap: GH₵280.',
          'Refill: "whatever I can spare".',
          'Switch back when full.',
        ],
        bug: 1,
        fix: 'Refill: GH₵70 a week for 4 weeks.',
        explanation: '"Whatever I can spare" is "save what\'s left" again.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Jar at week 8: GH₵1,260. Four weeks at GH₵55. Jar at week 12?',
        answers: ['1480', '1,480', 'GH₵1,480', 'GH₵1480'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each week to where the GH₵70 goes.',
        pairs: [
          ['Weeks 1 to 8', 'Laptop jar'],
          ['Weeks 9 to 12', 'Emergency fund'],
          ['Weeks 13 to 16', 'Laptop jar again'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you used your emergency fund tomorrow, how would you refill it? Amount, source, end date.',
    starters: ['I\'d refill... a week', 'From...', 'Done by...'],
  },
  deepen: {
    title: 'Every refill teaches something',
    summary: 'After each emergency, ask: was the fund big enough? If it barely covered it, raise the target a little once it\'s refilled. Kofi\'s GH₵300 just covered GH₵280. He makes a note: aim for GH₵400 next semester.',
  },
  notes: 'Refill: EF 20 → 300 over weeks 9–12 at 70/week; jar 55/week → week 12 jar 1,480 (running numbers).',
};

export default lesson;
