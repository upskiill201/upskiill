import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: staying motivated. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'When saving gets boring',
  summary: 'Week 14. The excitement is gone. The jar grows by the same GH₵125 every week. Kofi is tired of saying no. Tey shares what keeps people going on the long middle stretch of a goal.',
  minutes: 11,
  outcomes: [
    'Recognise saving fatigue',
    'Use milestones and visible progress',
    'Plan small, planned rewards along the way',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Week 14. Kofi says: "I\'m so tired of this jar." Normal? Very. The start of a goal is exciting and the end is exciting. The middle is just... Tuesday.', replies: ['How do people keep going?'] },
        { tey: 'First: break it into milestones. Not "GH₵3,500", but GH₵2,000, GH₵2,500, GH₵3,000. Each one is a small win, and you get one every week or two instead of one at the end.', replies: ['And seeing progress?'] },
        { tey: 'Second: make progress visible. Kofi colours in his door jar every Sunday. Seeing how far you\'ve come, not just how far there is to go, keeps people going.', replies: ['Can I reward myself?'] },
        { tey: 'Third: yes, planned rewards. At each milestone, something small from the fun line: kelewele with Efua at GH₵2,500, a match-night stew party at GH₵3,000. Planned, so they don\'t break the plan.', replies: ['What if I want to quit?'] },
        { tey: 'Fourth: remember why. Kofi\'s lock screen: the laptop, and next semester\'s timetable with the programming module. Fifth: talk about it. Telling Efua and Miracle each milestone makes it real.', replies: ['Anything else?'] },
        { tey: 'Fresh starts help. Researchers found people are more likely to start or restart goals at "new beginnings": a new week, a new month, a birthday (Dai, Milkman and Riis, 2014). If a week goes badly, Monday is a fresh start.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Milestones, visible progress, small planned rewards, a reason you can see, and people who know. That\'s how the boring middle gets done.',
    },
  ],
  apply: {
    scenario: 'Week 14, saving fatigue.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to what it does.',
        pairs: [
          ['Milestones', 'Small wins every week or two'],
          ['Colouring the jar', 'See how far you\'ve come'],
          ['Planned rewards', 'Fun without breaking the plan'],
          ['Fresh start', 'A new week to restart'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the middle of a goal the hardest part?',
        options: [
          { text: 'The excitement of starting has gone, and the finish still feels far away' },
          { text: 'Because money runs out', why: 'The money is steady. Motivation dips.' },
          { text: 'It isn\'t; the end is hardest', why: 'The middle is usually where people quit.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s milestones.',
        lines: ['GH₵2,000', 'GH₵2,500', 'GH₵3,000', 'Laptop'],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I\'m so tired of saving. Maybe one big night out to reset?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, spend big.', why: 'An unplanned big night can undo weeks of saving.' },
          { text: 'Reset, yes, with a planned reward at your next milestone, from the fun line. Kelewele with Efua at GH₵2,500?' },
          { text: 'No fun until the laptop.', why: 'Zero fun is how plans break.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rewards that work.',
        template: 'Small, [[1]], and from the [[2]] line.',
        blanks: [['planned'], ['fun']],
        distractors: ['huge', 'laptop'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps motivation going, or risks the plan?',
        groups: ['Keeps it going', 'Risks the plan'],
        items: [
          { text: 'Colouring the jar each Sunday', group: 0 },
          { text: 'An unplanned GH₵200 night out', group: 1 },
          { text: 'Telling Efua at each milestone', group: 0 },
          { text: 'Hiding the jar so he stops thinking about it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did the "fresh start" research find?',
        options: [
          { text: 'Fresh food helps saving', why: 'A fun guess, but no.' },
          { text: 'Starting over is a sign of failure', why: 'It\'s a natural restart point.' },
          { text: 'People are more likely to start goals at new beginnings like a new week or month' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which reward plan will break the budget?',
        lines: [
          'GH₵2,500: kelewele with Efua (fun line).',
          'GH₵3,000: stew party in the hall kitchen (fun line).',
          'GH₵3,000: also new sneakers from the laptop jar.',
        ],
        bug: 2,
        fix: 'Rewards only from the fun line, never the jar.',
        explanation: 'A reward paid from the goal moves the goal further away.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Jar at week 12 was GH₵1,480, plus GH₵200 Christmas money, plus 2 weeks at GH₵125. What\'s in it now, at week 14?',
        answers: ['1930', '1,930', 'GH₵1,930', 'GH₵1930'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Efua and Miracle at each milestone?',
        options: [
          { text: 'So they\'ll pay for the rewards', why: 'Rewards come from his fun line.' },
          { text: 'Sharing progress makes it feel real and keeps you accountable' },
          { text: 'It doesn\'t help', why: 'Sharing progress is a well-known motivator.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Break your own goal into three milestones. What small, planned reward goes with each?',
    starters: ['Milestone 1:... reward:...', 'Milestone 2:...', 'Milestone 3:...'],
  },
  deepen: {
    title: 'The fresh start effect',
    summary: 'Dai, Milkman and Riis (2014) found that searches for "diet", gym visits and commitments to goals rose at the start of weeks, months, years and after birthdays. People use dates to draw a line under the past. You can use any Monday.',
  },
  notes: 'Dai, H., Milkman, K. L., & Riis, J. (2014). The fresh start effect. Management Science, 60(10). Progress monitoring: Harkin et al. (2016). Week 14 jar: 1,480 + 200 + 250 = 1,930 (beat money arrives across weeks 13–16, counted at the end).',
};

export default lesson;
