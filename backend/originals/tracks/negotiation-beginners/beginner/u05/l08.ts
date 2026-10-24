import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Explain cards: after the deal. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'After the deal',
  summary: 'Ada thinks the hard part is over. Lucía says the next three months decide whether she gets ₦480,000 in February. Here\'s Ada\'s plan for after the deal.',
  minutes: 12,
  outcomes: [
    'Keep your side of an agreement visibly',
    'Track the conditions you agreed',
    'Prepare the next review from day one',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Lucía\'s rule: <strong>a deal is a promise both ways.</strong> Ada\'s plan for November to February:</p><table><tr><th>When</th><th>What Ada does</th></tr><tr><td>Today</td><td>Summary sent and confirmed ("Matches my notes").</td></tr><tr><td>Every 2 weeks</td><td>A three-line update to Tobi: progress on the design system and the onboarding flow.</td></tr><tr><td>December</td><td>Books the design course with the ₦150,000 budget, and shares one idea from it with the team.</td></tr><tr><td>Mid-January</td><td>Checks both goals are on track. If something is slipping, she tells Tobi early, with a plan.</td></tr><tr><td>Late January</td><td>Sends a short "review pack": the two goals, done, with links, plus the agreed ₦480,000.</td></tr></table><p>The same goes for the rent: she fixes the gate lock in the first week, and pays on the 1st. The bakery logo: delivered on time, both rounds of changes done.</p><p>Kept promises are the best preparation for the next negotiation.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep your promises where people can see them, track the conditions, and prepare your next review from day one.',
    },
  ],
  apply: {
    scenario: 'November to February.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why send a short update every two weeks?',
        options: [
          { text: 'To annoy him', why: 'Three short lines aren\'t annoying.' },
          { text: 'Tobi sees the progress, so February\'s decision is easy' },
          { text: 'It\'s not needed', why: 'Visible progress makes the raise easy to justify.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s plan.',
        lines: ['Summary confirmed', 'Updates every two weeks', 'Book the course', 'Check goals mid-January', 'Send the review pack'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which deal does this promise belong to?',
        groups: ['Rent', 'Review', 'Logo'],
        items: [
          { text: 'Fix the gate lock', group: 0 },
          { text: 'Ship the design system', group: 1 },
          { text: 'Two rounds of changes', group: 2 },
          { text: 'Pay on the 1st', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The onboarding flow might be late because of another team. Should I keep quiet?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Tell Tobi early, with a plan. Surprises in January hurt more than honesty in December.' },
          { text: 'Keep quiet and hope.', why: 'Late surprises damage trust.' },
          { text: 'Blame the other team loudly.', why: 'Bring a plan, not blame.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s rule.',
        template: 'A deal is a [[1]] both [[2]].',
        blanks: [['promise'], ['ways']],
        distractors: ['secret', 'times'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines should each update to Tobi be?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the action to why it matters.',
        pairs: [
          ['Updates every 2 weeks', 'Progress is visible'],
          ['Early warning', 'No January surprises'],
          ['Review pack', 'An easy yes in February'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should go in the late-January review pack?',
        options: [
          { text: 'A new, bigger ask', why: 'First, close the deal you made.' },
          { text: 'Both goals, done, with links, and the agreed ₦480,000' },
          { text: 'Nothing; he\'ll remember', why: 'Make the decision easy.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s after-deal plan will cause trouble?',
        lines: [
          'Fix the gate lock in the first week.',
          'Send three-line updates every two weeks.',
          'Wait until February to mention any delays.',
          'Use the course budget in December.',
        ],
        bug: 2,
        fix: 'Flag any delay early, with a plan.',
        explanation: 'Late surprises damage trust.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What raise will the review pack ask Tobi to confirm, in naira a month?',
        answers: ['480000', '480,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'For an agreement you\'ve made, write what you\'ll do in the next month to keep your side visibly.',
    starters: ['I promised...', 'I will show it by...'],
  },
  deepen: {
    title: 'Your next negotiation starts now',
    summary: 'Every negotiation is shaped by your reputation from the last one. People who keep their promises find the next "yes" easier to get.',
  },
  notes: 'Fictional plan: updates every two weeks; ₦150,000 course in December; review pack late January for ₦480,000 on 1 February.',
};

export default lesson;
