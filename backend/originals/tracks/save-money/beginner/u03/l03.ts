import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Reading: out of sight, separate places, commitment. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Out of sight, out of reach',
  summary: 'Why does money in a separate place get saved, while money "set aside" in your main wallet doesn\'t? A famous study in the Philippines, and three simple ways to put a little distance between you and your savings.',
  minutes: 12,
  outcomes: [
    'Explain why separate places help saving',
    'Describe a commitment savings account in plain words',
    'Choose the right amount of friction for your savings',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Distance helps',
      html: '<p>In 2006, economists Nava Ashraf, Dean Karlan and Wendy Yin worked with a bank in the Philippines. They offered some customers a special savings account: you chose a goal or a date, and you couldn\'t take the money out until you reached it.</p><p>Not everyone wanted it. But the people who were offered it saved noticeably more after a year than similar customers who weren\'t. Many of them <em>chose</em> to tie their own hands, because they knew that money within reach gets spent.</p><p>That\'s called a <strong>commitment device</strong>: something you set up today that makes it harder for future-you to undo a good plan.</p><p><strong>Three levels of distance:</strong></p><ol><li><strong>A separate pot.</strong> A different wallet, account or envelope, named for the goal. Low friction: easy to reach in an emergency, but not mixed with spending money.</li><li><strong>Not linked to spending.</strong> No card, no app connection, no "pay from savings" option. Taking money out takes several steps and a little time.</li><li><strong>Locked until a date or amount.</strong> Some savings products don\'t allow withdrawals until a set date. Strongest, but only for money you\'re sure you won\'t need. Never lock your emergency fund.</li></ol><p><strong>Kofi\'s set-up:</strong> emergency fund in a separate pot he can reach in a day. Laptop jar in a place not linked to any app he pays with, and he\'s told Efua: "If I ask to take money out of the laptop jar, ask me why."</p>',
    },
    {
      kind: 'check',
      question: 'Why should the emergency fund never be locked until a date?',
      options: ['Emergencies don\'t wait for dates; you need to reach it when it happens', 'Locked money earns less', 'Banks don\'t allow it'],
      answer: 0,
      explanation: 'Distance for goals, reachability for emergencies.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Goal savings: put some distance in. Emergency fund: separate, but reachable within a day.',
    },
  ],
  apply: {
    scenario: 'How far away should savings be?',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the Philippines study, what happened to people offered the commitment account?',
        options: [
          { text: 'They saved noticeably more after a year than similar customers' },
          { text: 'They saved less', why: 'The opposite.' },
          { text: 'Nothing changed', why: 'There was a clear difference.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each level of distance to what it is.',
        pairs: [
          ['Separate pot', 'Named, not mixed with spending'],
          ['Not linked to spending', 'No card or app connection'],
          ['Locked', 'No withdrawals until a date or amount'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'How should each be kept?',
        groups: ['Reachable within a day', 'Some distance or locked'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Laptop jar', group: 1 },
          { text: 'Money for a trip in 6 months', group: 1 },
          { text: 'Money for urgent medicine', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A commitment device.',
        template: 'Something you set up [[1]] that makes it harder for [[2]]-you to undo a good plan.',
        blanks: [['today', 'now'], ['future']],
        distractors: ['yesterday', 'past'],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Should I lock the emergency fund too, so I can\'t touch it?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'No. Emergencies don\'t wait. Keep it separate and named, but reachable within a day.' },
          { text: 'Yes, lock everything.', why: 'A locked emergency fund fails exactly when it\'s needed.' },
          { text: 'Keep it in your spending wallet.', why: 'Then it gets spent on Thursdays.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which set-up is risky?',
        lines: [
          'Laptop jar: not linked to spending apps.',
          'Emergency fund: locked until next year.',
          'Efua asks "why?" before any laptop withdrawal.',
        ],
        bug: 1,
        fix: 'Emergency fund: separate, reachable within a day.',
        explanation: 'A fever in week 9 can\'t wait until next year.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Kofi ask Efua to ask "why?" before withdrawals?',
        options: [
          { text: 'A small social check adds friction without handing her his money' },
          { text: 'He wants her to control his money', why: 'He keeps control; she just asks a question.' },
          { text: 'So she can borrow it', why: 'Not part of the plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Many people in the study turned down the locked account. What does that tell us?',
        options: [
          { text: 'Commitment devices suit some people and some goals, not everyone' },
          { text: 'Locked accounts never work', why: 'They worked for those who used them.' },
          { text: 'Nobody wants to save', why: 'They wanted to save; not everyone wanted a lock.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the levels from least to most distance.',
        lines: ['Mixed with spending money', 'A separate named pot', 'Not linked to spending apps', 'Locked until a date'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many levels of distance does the lesson describe? (A number.)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'How close is your savings to your spending right now? What one step would add a little distance?',
    starters: ['My savings are...', 'One step:...'],
  },
  deepen: {
    title: 'Read the study',
    summary: 'Ashraf, Karlan and Yin (2006), "Tying Odysseus to the Mast", Quarterly Journal of Economics. The title refers to the Greek story of Odysseus, who had himself tied to his ship\'s mast so he couldn\'t steer towards the singing Sirens.',
  },
  notes: 'Ashraf, N., Karlan, D., & Yin, W. (2006). Tying Odysseus to the mast: Evidence from a commitment savings product in the Philippines. QJE, 121(2), 635–672. Treatment group savings balances rose substantially (reported ~81 percentage points relative to control after 12 months); kept qualitative ("noticeably more"). Many offered declined (take-up ~28%).',
};

export default lesson;
