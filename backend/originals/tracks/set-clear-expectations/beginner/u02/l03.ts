import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Card deck: give the intent, not just the instruction (commander's intent). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Give the intent',
  summary: 'Day 7. Arjun\'s instruction to Joel: "Add a coupon box to the cart." Joel adds it. It\'s perfect. It also hides the "Pay" button on small phones. Arjun never said WHY Mr Rao wanted coupons. Tey deals out the cards on intent.',
  minutes: 11,
  outcomes: [
    'Know what "commander\'s intent" means',
    'Give the purpose and the end result, not just the steps',
    'Let people adapt when plans meet reality',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Armies learned long ago that detailed plans break as soon as reality changes. So the US Army teaches leaders to give <strong>commander's intent</strong>: a short statement of the <em>purpose</em> of a task and what success looks like at the end. If the plan stops working, people can still act in the spirit of what was wanted. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Say why</h3><p>\"Add a coupon box\" is an instruction. \"Mr Rao wants Diwali coupons to bring back old customers, without slowing anyone down at checkout\" is intent.</p><h3>Card 2: Say what success looks like at the end</h3><p>\"A returning customer uses a code and pays in under a minute.\" Now Joel can judge any design choice against it.</p><h3>Card 3: Say what must not break</h3><p>\"Nothing should hide or delay the Pay button.\" The guardrail. With it, Joel would have spotted the problem himself.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Keep it short</h3><p>Intent is two or three sentences, not a page. If people can't remember it, they can't use it.</p><h3>Card 5: Let them adapt</h3><p>With intent, Joel could have made the coupon box a small link that opens a field. Different from the instruction, better for the purpose. Intent gives people permission to use their judgement.</p><h3>Card 6: Check they can say the intent back</h3><p>\"Why are we adding coupons?\" If Joel can answer that, he can make a hundred small decisions you'll never have to.</p>",
    },
    {
      kind: 'check',
      question: 'What would have helped Joel spot the hidden Pay button himself?',
      options: ['The guardrail: "nothing should hide the Pay button"', 'A longer instruction', 'A bigger coupon box'],
      answer: 0,
      explanation: 'Knowing what must not break lets people check their own work.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Intent: why, what success looks like at the end, what must not break. Two or three sentences. Then let them adapt.',
    },
  ],
  apply: {
    scenario: 'The coupon box.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is commander\'s intent?',
        options: [
          { text: 'A detailed step-by-step plan', why: 'Intent is what survives when the plan breaks.' },
          { text: 'An order from a senior officer', why: 'It\'s the "why" behind orders.' },
          { text: 'The purpose of a task and what success looks like at the end' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Instruction or intent?',
        groups: ['Instruction', 'Intent'],
        items: [
          { text: '"Add a coupon box."', group: 0 },
          { text: '"Bring back old customers for Diwali."', group: 1 },
          { text: '"Put it under the total."', group: 0 },
          { text: '"Nothing should slow down paying."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'The coupon box pushes the Pay button off small screens. Should I keep it there anyway?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, I said a box.', why: 'Sticking to the instruction breaks the purpose.' },
          { text: 'Great catch. The point is old customers coming back without slowing payment. Do whatever serves that, even if it\'s not a box.' },
          { text: 'Ask Mr Rao.', why: 'Joel can decide this with the intent.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The army calls it commander\'s ___. (one word)',
        answers: ['intent', 'Intent'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the line.',
        pairs: [
          ['Why', '"Bring back old customers."'],
          ['End result', '"Pays in under a minute."'],
          ['Guardrail', '"Never hide the Pay button."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does intent let people adapt?',
        options: [
          { text: 'They can judge new choices against the purpose' },
          { text: 'It gives them less to do', why: 'It gives them better judgement.' },
          { text: 'It doesn\'t; they should follow steps', why: 'Steps break when reality changes.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s next brief. Which line is an instruction pretending to be intent?',
        lines: [
          'Why: help shoppers find Diwali gifts fast.',
          'Intent: add a red banner at the top, 80 pixels high.',
          'Must not break: the page loading in under 3 seconds.',
        ],
        bug: 1,
        fix: 'Success: a shopper finds a gift in two taps.',
        explanation: 'Pixels are an instruction. Intent says what success looks like.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put writing intent in order.',
        lines: ['Why we\'re doing it', 'What success looks like', 'What must not break', 'Check they can say it back'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Give the [[1]], not just the [[2]].',
        blanks: [['intent', 'why', 'purpose'], ['instruction', 'steps']],
        distractors: ['blame', 'deadline'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the check question.',
        tiles: ['Why', 'are', 'we', 'adding', 'coupons?'],
        distractors: ['How'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an instruction you gave or got recently. What was the intent behind it? Would knowing it have changed anything?',
    starters: ['The instruction was...', 'The intent was...'],
  },
  deepen: {
    title: 'Add one line of why',
    summary: 'For your next three requests, add one line that starts "The point is..." Watch how often people make a better choice than you asked for.',
  },
  notes: 'Commander\'s intent: US Army doctrine (ADP 6-0, Mission Command, 2019): a clear, concise expression of the purpose of the operation and the desired end state. Popularised for business by Heath & Heath, Made to Stick (2007). Fictional details.',
};

export default lesson;
