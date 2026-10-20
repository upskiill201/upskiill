import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: three small asks. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: three small asks',
  summary: 'Lucía sets Ada a challenge: three small, polite asks before Monday. A delivery fee, the fuel bill and her lunch order. Low stakes, real practice. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Make small asks to build confidence', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Three asks by Monday',
      html: '<p><strong>Ask 1:</strong> the market seller who delivers Ada\'s foodstuffs charges ₦1,500 delivery. Ada asks: "I order every week. Could you do ₦1,000 if I order before Thursday?" <strong>He says yes.</strong></p><p><strong>Ask 2:</strong> Ngozi wanted Ada to cover all the generator fuel this month, ₦40,000. Ada asks: "We both use it. Could we split it, and take turns next month?" <strong>Ngozi says yes, slightly embarrassed.</strong></p><p><strong>Ask 3:</strong> at lunch, Ada asks if she can swap rice for extra plantain. <strong>The answer is no.</strong> Nothing bad happens.</p><p>Two yeses, one no, and no damage.</p>',
    },
    {
      kind: 'story',
      title: 'Monday',
      beats: [
        { speaker: 'ada', text: 'Two out of three! And the no didn\'t even hurt.' },
        { speaker: 'lucia', text: 'Now the real ones. Before you speak to your landlord, you need to know your walk-away number.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: notice, count the cost, tame the nerves, ask politely. Chapter 2: prepare.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: three small asks.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Delivery went from ₦1,500 to ₦1,000. Ada orders weekly. How much does she save in 4 weeks, in naira?',
        answers: ['2000', '2,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fuel is ₦40,000. Split equally, how much does Ada pay this month, in naira?',
        answers: ['20000', '20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Ada offer the seller in return for a lower fee?',
        options: [
          { text: 'Ordering before Thursday, every week' },
          { text: 'Nothing', why: 'She offered something that helps him plan.' },
          { text: 'A threat to stop ordering', why: 'She stayed friendly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of Ada\'s asks is this?',
        groups: ['Delivery', 'Fuel', 'Lunch'],
        items: [
          { text: '"Could you do ₦1,000?"', group: 0 },
          { text: '"Could we split it?"', group: 1 },
          { text: '"Extra plantain instead of rice?"', group: 2 },
          { text: '"We both use it."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The lunch place said no. Was that a failure?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'No. You asked, heard no, and nothing bad happened. That\'s exactly the lesson.' },
          { text: 'Yes, never ask there again.', why: 'A no is information, not failure.' },
          { text: 'Argue until they agree.', why: 'Some nos should just be accepted.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 1 lesson to the idea.',
        pairs: [
          ['Four yeses', 'Notice negotiations'],
          ['Cost of not asking', 'Silence has a price'],
          ['Why it feels awkward', 'Call it excitement'],
          ['Accept vs ask', 'Reopen the door politely'],
          ['Asking myths', 'Kind and firm go together'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s fuel ask.',
        template: '"We both [[1]] it. Could we [[2]] it?"',
        blanks: [['use'], ['split', 'share']],
        distractors: ['hate', 'skip'],
      },
      {
        kind: 'mcq',
        prompt: 'Why practise with small, low-stakes asks first?',
        options: [
          { text: 'Each ask makes the next one feel more normal, before the big ones' },
          { text: 'Small asks are worth more', why: 'They\'re practice, not the main prize.' },
          { text: 'There\'s no reason', why: 'Practice builds confidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s message to Ngozi could cause a fight?',
        lines: [
          'Hey! About the fuel.',
          'We both use the generator.',
          'You always make me pay for everything.',
          'Could we split it, and take turns next month?',
        ],
        bug: 2,
        fix: 'Delete it: stick to this month\'s bill.',
        explanation: '"Always" turns one ask into an attack.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good small ask.',
        lines: ['Notice the chance', 'Give a reason', 'Ask politely', 'Accept the answer calmly'],
      },
    ],
  },
  reflect: {
    prompt: 'Your challenge: make three small, polite asks this week. Write down what you asked and what happened.',
    starters: ['Ask 1:...', 'What happened:...'],
  },
  deepen: {
    title: 'Practice makes asking normal',
    summary: 'Many negotiation teachers suggest practising with small, low-stakes requests. Each yes, and each harmless no, makes the next ask feel more normal.',
  },
  notes: 'Chapter 1 challenge (fictional): delivery ₦1,500 → ₦1,000 weekly (₦2,000 per 4 weeks); fuel ₦40,000 split (₦20,000 each); lunch swap refused.',
};

export default lesson;
