import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: your own line. Ending: Mexico City. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: Mexico City',
  summary: 'Ada lands in Mexico City. The conference, the Nopal booth, Lucía\'s hug, and a moment she\'ll remember for the rest of her life. Then your turn: draw your own line, from creep to values to rules.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Build your own need–want line and values plan', 'Use every tool from the course together', 'Start choosing on purpose this week'],
  learn: [
    {
      kind: 'story',
      title: 'Mexico City',
      beats: [
        { speaker: 'narrator', text: 'Mexico City. A conference hall full of designers from forty countries. The Nopal booth, bright green, chili-lime packets stacked like a tower.' },
        { speaker: 'lucia', text: '¡Ada! You made it. Six months ago you were saving ₦20,000 a month. Look at you.' },
        { speaker: 'narrator', text: 'On day two, a design director from a São Paulo agency stops at the booth, looks at Ada\'s portfolio for a long time, and asks for her email.' },
        { speaker: 'narrator', text: 'That night, on the hotel roof, Ada sends a voice note to Lagos: Mum, Ngozi, Obinna, Chidinma. "I\'m here. I\'m actually here. Thank you."' },
        { speaker: 'narrator', text: 'Ngozi replies first: "Tunde saved ₦30,000 this month. He says it\'s your fault. Bring me chili-lime."' },
        { speaker: 'tey', text: 'That\'s Ada\'s six months: find the creep, draw the line, spend on what matters, make the hard choices, and choose on purpose. Not one thing she loves was cut to get here. Now, your final challenge.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge. Practise on Femi\'s cousin Bola (26, nurse in Ibadan, ₦320,000 a month, got a ₦50,000 raise and is saving less than before). Then build your own line.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Bola\'s plan.',
        lines: ['Compare before and after the raise', 'Draw the need–want line', 'Cut in the right order', 'Find her values', 'Make hard choices with total cost', 'Write rules for the next raise'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bola\'s raise ₦50,000; her saving dropped from ₦40,000 to ₦15,000. How much more is she spending?',
        answers: ['75000', '75,000', '₦75,000', '₦75000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Bola\'s spending: must-have, nice-to-have, or want?',
        groups: ['Must-have', 'Nice-to-have', 'Want'],
        items: [
          { text: 'Transport to night shifts', group: 0 },
          { text: 'Rides on dry afternoons', group: 1 },
          { text: 'A second streaming app', group: 2 },
          { text: 'Food', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Bola\'s night-shift rides: must-have or want?',
        options: [
          { text: 'Must-have: safety at night is never a want' },
          { text: 'Want: she could walk', why: 'Safety first, always.' },
          { text: 'Nice-to-have', why: 'At night, it\'s a safety need.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Bola wants to cut her weekly call-and-cook night with her sisters. It\'s ₦8,000.',
        prompt: 'Your best advice?',
        options: [
          { text: 'Check joy per naira first. If it scores high (family, connection), protect it. Cut what gives nothing.' },
          { text: 'Cut it; every naira counts.', why: 'Cutting joys first breaks plans.' },
          { text: 'Double it.', why: 'Protect, not necessarily double.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Bola\'s problems to the course tool.',
        pairs: [
          ['Raise vanished', 'Before-and-after comparison'],
          ['"I need delivery after shifts"', 'The four questions'],
          ['Spending on things she doesn\'t value', 'Values map and joy per naira'],
          ['A car offer on instalments', 'Total cost and 10/10/10'],
          ['Next raise coming', 'Half to goals, before it lands'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bola\'s next raise will be ₦40,000. Half to goals is how much?',
        answers: ['20000', '20,000', '₦20,000', '₦20000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Bola\'s draft plan. Which line will break it?',
        lines: [
          'Night-shift rides: kept.',
          'Unused gym: cancelled.',
          'Sisters\' cook night: cut, it\'s fun so it must be a want.',
          'Next raise: half to goals.',
        ],
        bug: 2,
        fix: 'Sisters\' cook night: protected (high joy, family).',
        explanation: '"Fun" doesn\'t mean "cut". Values and joy per naira decide.',
      },
      {
        kind: 'mcq',
        prompt: 'Bola\'s aunt asks for help with school fees for a cousin. What\'s the first step?',
        options: [
          { text: 'Listen and understand the need before promising anything' },
          { text: 'Pay it all immediately', why: 'Understand first; check who else can help.' },
          { text: 'Refuse', why: 'Listen first; it might be a must-have.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a good final line, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'A protected base', group: 0 },
          { text: 'Values with amounts', group: 0 },
          { text: '"Whatever\'s left" for savings', group: 1 },
          { text: 'A rule for the next raise', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'Find the [[1]], draw the [[2]], spend on what [[3]], and choose on [[4]].',
        blanks: [['creep'], ['line'], ['matters'], ['purpose']],
        distractors: ['loan', 'sale'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Ada cut that she loved, to get to Mexico City?',
        options: [
          { text: 'Nothing: she cut what gave her nothing, and protected what she loved' },
          { text: 'Her art class', why: 'She kept it.' },
          { text: 'Family support', why: 'Protected throughout.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Your project: draw your own line on one page. Compare a month before and after your last income change. Place every cost on the line with its basic version. Tag each with a value and a joy score. Write one "not now" goal with a number and date, and your rule for the next raise. What\'s the first thing you\'ll cut, and the first thing you\'ll protect?',
    starters: ['I\'ll cut...', 'I\'ll protect...', 'My next-raise rule:...'],
  },
  deepen: {
    title: 'Your project, step by step',
    summary: 'This week: compare two months (Ch1). Run the four questions on your three biggest costs (Ch2). Do Lucía\'s values exercise and score joy per naira (Ch3). Write total costs for any big purchase you\'re considering (Ch4). Write your values-first plan and your raise rule (Ch5). Pin it where you\'ll see it.',
  },
  notes: 'Final challenge. Mexico City conference ending (fictional São Paulo agency director). Bola (practice persona: Femi\'s cousin, nurse in Ibadan; narrated, no speaker id; Femi per CAST is Kinwell\'s Lagos-born developer). Bola numbers fictional.',
};

export default lesson;
