import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final Challenge: the review (course finale). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: the review',
  summary: 'Five weeks ago Ada said yes to everything. Now look at her week. The final challenge uses the whole course, and ends with a call from Arjun, who has a much harder negotiation.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use everything from the course together', 'Plan and close a negotiation of your own'],
  learn: [
    {
      kind: 'reading',
      title: 'Five weeks',
      html: '<p><strong>Five weeks ago:</strong> a second project for the same pay, a rent rise accepted in four minutes, a logo for "whatever you think is fair", and all the generator fuel.</p><p><strong>Now:</strong></p><ul><li><strong>Rent:</strong> ₦1,350,000 a year for two years instead of ₦1,500,000. Ada fixed the gate lock.</li><li><strong>Logo:</strong> ₦120,000, half upfront, with a credit on the bakery\'s Instagram.</li><li><strong>Fuel:</strong> split with Ngozi, plus a spare room that works for both of them.</li><li><strong>Pay:</strong> ₦420,000 from 1 November, ₦480,000 in writing for 1 February against two goals, and a ₦150,000 course budget.</li></ul>',
    },
    {
      kind: 'story',
      title: 'A call from Bengaluru',
      beats: [
        { speaker: 'ada', text: 'I asked for things for five weeks. Nobody hated me. Most people said yes.' },
        { speaker: 'arjun', text: 'Ada, I need your ask card. A London client just offered £28,000 for a £48,000 job. And they\'re playing games.' },
        { speaker: 'tey', text: 'That\'s this course: notice, prepare, ask, trade, close. Arjun\'s story is the next one: difficult negotiations.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the review.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s pay went from ₦350,000 to ₦420,000. How much more a month, in naira?',
        answers: ['70000', '70,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'And from ₦350,000 to ₦480,000 after February. How much more a month, in naira?',
        answers: ['130000', '130,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter\'s skill is this?',
        groups: ['Prepare', 'Ask', 'Trade'],
        items: [
          { text: 'Costing the moving fees', group: 0 },
          { text: '"₦150,000 to ₦180,000"', group: 1 },
          { text: 'Two-year lease for a lower rent', group: 2 },
          { text: 'Holding five seconds of silence', group: 1 },
          { text: 'Shelves and a desk in one room', group: 2 },
          { text: 'Setting a private walk-away', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a BATNA?',
        options: [
          { text: 'Your best alternative if there\'s no deal' },
          { text: 'Your opening offer', why: 'That\'s your anchor.' },
          { text: 'The other side\'s limit', why: 'That\'s their walk-away.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'They offered £28,000 for a £48,000 job. Do I just meet them in the middle at £38,000?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, £38,000 is fair.', why: 'Splitting lets their low anchor decide.' },
          { text: 'Accept £28,000; it\'s a big client.', why: 'Check it against his walk-away first.' },
          { text: 'Don\'t split yet. What\'s your walk-away and BATNA? What do they really need? Then trade scope, timing and payment.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chapter to its main lesson.',
        pairs: [
          ['Yes to everything', 'Notice the negotiation'],
          ['Do your homework', 'Goal, walk-away, BATNA'],
          ['Say the number', 'Anchor with a reason'],
          ['Make the pie bigger', 'Trade, don\'t split'],
          ['The review', 'Turn no into a staged deal'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Notice, [[1]], ask, [[2]], close.',
        blanks: [['prepare'], ['trade']],
        distractors: ['panic', 'split'],
      },
      {
        kind: 'mcq',
        prompt: 'Which response to "my budget is lower" did Ada use with Mrs Okon?',
        options: [
          { text: 'Same work, lower price', why: 'That\'s a discount.' },
          { text: 'Keep the price honest and change what\'s included' },
          { text: 'Refuse to talk', why: 'She found a deal.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s advice to Arjun is wrong?',
        lines: [
          'Prepare your walk-away and BATNA first.',
          'Ask what they really need from the app.',
          'Tell them your walk-away so they know your limit.',
          'Put the final deal in writing the same day.',
        ],
        bug: 2,
        fix: 'Keep your walk-away private.',
        explanation: 'Shared walk-aways become the deal.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a full negotiation, start to finish.',
        lines: ['Notice it', 'Prepare goal, BATNA and walk-away', 'Ask with a number and reason', 'Trade issues', 'Close in writing', 'Keep your promises'],
      },
    ],
  },
  reflect: {
    prompt: 'Your final challenge: run one real negotiation this month using ask card v5. What will you negotiate, and what\'s your first line?',
    starters: ['I will negotiate...', 'My first line:...'],
  },
  deepen: {
    title: 'Next: How to Handle Difficult Negotiations',
    summary: 'Some people negotiate hard on purpose: extreme anchors, fake deadlines, "my boss won\'t allow it". In the next course, Arjun learns to spot the tactics, say no to unreasonable requests, and walk away when he should.',
  },
  notes: 'Course finale (fictional): rent ₦1,350,000 × 2 yrs; logo ₦120,000 (₦60,000 upfront); fuel split; pay ₦420,000 from 1 Nov, ₦480,000 on 1 Feb against two goals, ₦150,000 course budget. Hook: Arjun\'s £48,000 quote vs £28,000 offer (How to Handle Difficult Negotiations).',
};

export default lesson;
