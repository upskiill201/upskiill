import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: when they say no. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'When they say no',
  summary: 'Ada asks for ten minutes to think and steps out. She opens Lucía\'s "when they say no" list on her phone. Five steps, and the review isn\'t over yet.',
  minutes: 12,
  outcomes: [
    'Respond to a no calmly and with questions',
    'Turn a no into a conditional or staged deal',
    'Agree a date to come back to it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps after a no',
      steps: [
        { title: '1. Thank them and stay calm', body: '"Thank you for being honest." A calm voice keeps the door open.' },
        { title: '2. Find the real obstacle', body: '"Is it the amount, or the timing?" Tobi: "Both. The quarter\'s budget is set, and I need to justify a big jump."' },
        { title: '3. Ask what would make it possible', body: '"What would you need to see to justify ₦480,000?" Tobi: "The design system shipped, and the new onboarding flow live."' },
        { title: '4. Offer a staged or conditional deal', body: '"Could we do part now and the rest when those two goals are done?"' },
        { title: '5. Agree a date, in writing', body: '"Could we put the goals and a review date in an email today?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'After a no: thank, find the obstacle, ask what would make it possible, offer a staged deal, set a date.',
    },
  ],
  apply: {
    scenario: 'Ten minutes outside.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps after a no.',
        lines: ['Thank them and stay calm', 'Find the real obstacle', 'Ask what would make it possible', 'Offer a staged deal', 'Agree a date in writing'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Tobi\'s obstacle to Ada\'s answer.',
        pairs: [
          ['The quarter\'s budget is set', 'Part now, part next quarter'],
          ['He must justify a big jump', 'Tie the rest to two goals'],
          ['He might forget', 'Put it in an email today'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which question best finds the obstacle?',
        options: [
          { text: '"Is it the amount, or the timing?"' },
          { text: '"Why not?"', why: 'Too blunt; it invites a defence.' },
          { text: '"Are you sure?"', why: 'That just asks him to repeat the no.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good response to a no, or a poor one?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"What would you need to see?"', group: 0 },
          { text: '"Fine, forget it."', group: 1 },
          { text: '"Could we do part now?"', group: 0 },
          { text: '"That\'s so unfair."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is it OK to ask for ten minutes to think, in the middle of a review?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes. "Can I take ten minutes to think about this?" is calm and professional. It beats a rushed answer.' },
          { text: 'No, answer instantly.', why: 'Rushed answers are usually worse.' },
          { text: 'Leave and come back next month.', why: 'Ten minutes is enough here.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The staged deal.',
        template: '"Could we do [[1]] now and the rest when those two [[2]] are done?"',
        blanks: [['part', 'some'], ['goals']],
        distractors: ['nothing', 'friends'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many goals did Tobi name to justify ₦480,000?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why tie the rest of the raise to goals?',
        options: [
          { text: 'It gives Tobi a clear reason to justify it, and Ada a clear path' },
          { text: 'To make Ada work harder for free', why: 'The goals are her job; the raise rewards them.' },
          { text: 'It doesn\'t help', why: 'It removes his main obstacle.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s plan is missing something?',
        lines: [
          'Thank him and stay calm.',
          'Ask if it\'s the amount or the timing.',
          'Offer part now, the rest after two goals.',
          'Agree to "talk again sometime".',
        ],
        bug: 3,
        fix: 'Agree a review date, and confirm it in an email.',
        explanation: '"Sometime" often means never.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Obstacle', 'Possible', 'Date'],
        items: [
          { text: '"Is it the amount or the timing?"', group: 0 },
          { text: '"What would you need to see?"', group: 1 },
          { text: '"Could we put a date in an email?"', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write how you\'d answer a no in your own negotiation, using the five steps.',
    starters: ['Thank you...', 'What would you need...'],
  },
  deepen: {
    title: 'Contingent agreements',
    summary: 'When two sides disagree about the future ("will she deliver?"), a contingent agreement ties part of the deal to what happens. It turns doubt into a plan both can accept.',
  },
  notes: 'Contingent contracts: Bazerman & Gillespie (1999), "Betting on the future: The virtues of contingent contracts", Harvard Business Review. Fictional goals: design system shipped; new onboarding flow live.',
};

export default lesson;
