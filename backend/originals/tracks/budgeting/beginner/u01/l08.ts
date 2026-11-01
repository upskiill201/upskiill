import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: why we don't notice where money goes. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why money slips away unnoticed',
  summary: 'Kofi isn\'t careless. His brain is doing exactly what everyone\'s does. Three quiet forces make money disappear without anyone noticing, and you can work with all three.',
  minutes: 12,
  outcomes: [
    'Name three reasons spending goes unnoticed',
    'Explain why paying by phone feels cheaper than cash',
    'Pick one habit that makes spending visible again',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Three quiet forces',
      html: '<p><strong>1. Paying by phone doesn\'t hurt.</strong> Handing over notes feels like losing something. Tapping "confirm" doesn\'t. Researchers call this the <em>pain of paying</em>. In a well-known experiment at MIT, people offered noticeably more for the same sports tickets when they were told they\'d pay by card instead of cash (Prelec and Simester, 2001). Mobile money works the same way: the money leaves, but nothing leaves your hand.</p><p><strong>2. Small payments don\'t trigger alarms.</strong> We pay attention to big numbers. A GH₵300 shoe makes us stop and think. Thirty GH₵10 payments don\'t, even though they\'re the same money. Each one is too small to feel like a decision.</p><p><strong>3. Memory edits the story.</strong> When Kofi thinks back on his month, he remembers the course pack and the party: the big, unusual things. The everyday payments blur into "just normal life". So he honestly believes he "didn\'t spend much".</p><p><strong>None of this means you\'re bad with money.</strong> It means money needs to be made visible on purpose. Three habits do it:</p><ul><li><strong>Look before you guess.</strong> Check your history weekly, not when a payment fails.</li><li><strong>Name the habit, not the payment.</strong> Think "my GH₵300-a-month bundle habit", not "GH₵10".</li><li><strong>Add a moment of friction.</strong> A one-second pause before you confirm, "Is this in the plan?", brings some of the pain of paying back.</li></ul>',
    },
    {
      kind: 'check',
      question: 'Why can paying by phone lead to spending more?',
      options: ['It doesn\'t feel like losing anything, so we pay with less thought', 'Phone payments cost more', 'Shops charge more for phone payments'],
      answer: 0,
      explanation: 'The pain of paying is weaker, so spending decisions get easier, and bigger.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The goal isn\'t to make paying painful. It\'s to make it visible. Visible money gets spent on purpose.',
    },
  ],
  apply: {
    scenario: 'Why Kofi didn\'t see it coming.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the force to what it does.',
        pairs: [
          ['Pain of paying', 'Phone payments feel like nothing'],
          ['Small payments', 'Too small to feel like decisions'],
          ['Memory', 'Remembers the big, forgets the everyday'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the MIT study, what changed when people were told they\'d pay by card?',
        options: [
          { text: 'They offered less', why: 'The opposite: paying by card made them offer more.' },
          { text: 'They offered noticeably more for the same tickets' },
          { text: 'They refused to buy', why: 'They bought. They just valued the same tickets higher.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make spending more visible, or less?',
        groups: ['More visible', 'Less visible'],
        items: [
          { text: 'Checking your history every Sunday', group: 0 },
          { text: 'Saved card details everywhere', group: 1 },
          { text: 'Pausing to ask "is this in the plan?"', group: 0 },
          { text: 'Only checking when a payment fails', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'So I should go back to paying cash for everything?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, phones are the problem.', why: 'Phone payments are safe and useful. The aim is visibility, not giving them up.' },
          { text: 'No, just ignore it.', why: 'Ignoring it is how he got to GH₵63.' },
          { text: 'You don\'t have to. Keep using your phone, but check your history weekly and pause before you confirm.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The aim.',
        template: 'Not to make paying [[1]], but to make it [[2]].',
        blanks: [['painful'], ['visible']],
        distractors: ['cheaper', 'harder'],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Kofi\'s thoughts is memory editing the story?',
        lines: [
          'I paid for a course pack: GH₵180.',
          'I didn\'t spend much on food; I just ate normally.',
          'The party was GH₵150.',
        ],
        bug: 1,
        fix: 'Food was GH₵660, the biggest category, spread over many small payments.',
        explanation: '"I just ate normally" hides 40-plus payments. Everyday spending blurs in memory.',
      },
      {
        kind: 'mcq',
        prompt: 'Thirty GH₵10 payments vs one GH₵300 payment. Which is Kofi more likely to notice?',
        options: [
          { text: 'The single GH₵300 one' },
          { text: 'The thirty GH₵10 ones', why: 'Each one feels too small to notice, even though the total is the same.' },
          { text: 'Both equally', why: 'Same money, but big single payments get far more attention.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'The one-second pause. Put it in order.',
        lines: ['The payment prompt pops up', 'Pause', 'Ask "is this in the plan?"', 'Confirm or cancel'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the healthiest way for Kofi to think about this?',
        options: [
          { text: '"I\'m terrible with money."', why: 'Everyone\'s brain works this way. Blaming himself won\'t help him see the money.' },
          { text: '"It\'s my phone\'s fault."', why: 'The phone is just a tool. He can change how he uses it.' },
          { text: '"Everyone\'s brain hides small spending. I need to make mine visible."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name the effect: handing over cash feels like a loss, tapping confirm doesn\'t. It\'s the "pain of ..."',
        answers: ['paying', 'payment', 'pain of paying'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three forces caught you most? What\'s one habit from this lesson you\'ll try this week?',
    starters: ['The one that catches me is...', 'This week I\'ll...'],
  },
  deepen: {
    title: 'Read more: "The red and the black"',
    summary: 'Prelec and Loewenstein\'s 1998 paper explains why paying feels painful, and why separating paying from consuming (cards, phones, "pay later") changes how much we spend. Course 3 in this set, How to Stop Impulse Buying, goes deeper.',
  },
  notes: 'Prelec, D., & Simester, D. (2001). Always leave home without it: A further investigation of the credit-card effect on willingness to pay. Marketing Letters, 12(1), 5–12 (MIT students; card condition bids substantially higher for sports tickets). Prelec, D., & Loewenstein, G. (1998). The red and the black: Mental accounting of savings and debt. Marketing Science, 17(1), 4–28. Claims kept qualitative ("noticeably more").',
};

export default lesson;
