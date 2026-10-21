import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Card deck: what comes after the goal. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'After the goal',
  summary: 'The laptop is nearly paid for. Then what? The weekly GH₵125 habit is the most valuable thing Kofi built this semester. Four cards on what to do with a saving habit once the goal is reached.',
  minutes: 10,
  outcomes: [
    'Redirect a saving habit to new jobs',
    'Choose a next goal',
    'Grow your emergency fund in stages',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Keep the habit running.</strong> The scheduled transfers stay on. The day after the goal, they point somewhere new. If you stop them "for a month", you\'ll often never restart.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Grow the emergency fund.</strong> Kofi\'s next stage: GH₵400, then one month of essentials (GH₵900). GH₵50 a week gets him to GH₵400 in two weeks, and to GH₵900 in about three months.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Pick the next goal.</strong> Kofi\'s: an audio interface for recording, about GH₵900, so his beats sound professional and he can charge more. GH₵50 a week: about 18 weeks. A goal that can earn money back is a great second goal.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Let life get a little easier.</strong> After a hard semester, some of the weekly amount can go back to living: GH₵25 a week more fun. A plan you enjoy is a plan you keep.</p>',
    },
    {
      kind: 'check',
      question: 'The goal is reached. What should happen to the automatic transfers?',
      options: ['Point them at the next job straight away', 'Stop them for a few months', 'Cancel them forever'],
      answer: 0,
      explanation: 'Paused habits often never restart. Redirect, don\'t stop.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Goal reached? Redirect the habit the next day: emergency fund, next goal, and a little more life.',
    },
  ],
  apply: {
    scenario: 'After the laptop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why redirect the transfers instead of pausing them?',
        options: [
          { text: 'Paused habits often never restart' },
          { text: 'Banks require it', why: 'It\'s about the habit, not the bank.' },
          { text: 'To avoid fees', why: 'Not the main reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Emergency fund GH₵300, target GH₵400, adding GH₵50 a week. How many weeks?',
        answers: ['2', 'two', '2 weeks'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Audio interface GH₵900 at GH₵50 a week. How many weeks?',
        answers: ['18', 'eighteen', '18 weeks'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of the habit after the goal, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Growing the emergency fund', group: 0 },
          { text: 'A next goal that can earn money', group: 0 },
          { text: 'Stopping all transfers to "take a break"', group: 1 },
          { text: 'A bit more fun, on purpose', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Should my next goal be new sneakers or the audio interface?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Both can happen. The interface first: it helps you earn more. Sneakers from the fun line when they fit.' },
          { text: 'Sneakers, you deserve them.', why: 'Maybe! But the interface pays back.' },
          { text: 'Neither, save forever.', why: 'Goals are for using.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'After the goal.',
        template: '[[1]] the habit, don\'t [[2]] it.',
        blanks: [['Redirect'], ['stop', 'pause']],
        distractors: ['Spend', 'start'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each new job to its weekly amount.',
        pairs: [
          ['Emergency fund', 'GH₵50 a week, toward GH₵400 then GH₵900'],
          ['Audio interface', 'GH₵50 a week for about 18 weeks'],
          ['More fun', 'GH₵25 a week, on purpose'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which after-goal plan wastes the habit?',
        lines: [
          'Day after the laptop: transfers point to the fund and the interface.',
          'GH₵25 a week extra fun.',
          'Turn off all transfers until "next semester".',
        ],
        bug: 2,
        fix: 'Keep the transfers on, pointed at new jobs.',
        explanation: '"Until next semester" usually becomes "never".',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the audio interface a good second goal?',
        options: [
          { text: 'It could help Kofi earn more from beats' },
          { text: 'It\'s expensive', why: 'Price isn\'t the reason.' },
          { text: 'Yaw recommended it', why: 'It\'s about what it does for Kofi.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s next steps after paying for the laptop.',
        lines: ['Redirect the transfers the next day', 'Grow the fund to GH₵400', 'Start the interface goal', 'Add a little more fun'],
      },
    ],
  },
  reflect: {
    prompt: 'When you reach your current goal, where will your saving habit point next?',
    starters: ['After my goal, I\'ll redirect to...', 'My next goal:...'],
  },
  deepen: {
    title: 'Long-term saving',
    summary: 'Once your emergency fund covers a few months and short goals are steady, part of your habit can go toward long-term goals: further study, a business, a home, retirement. Money Habits That Build Long-Term Wealth, another course in this set, covers that.',
  },
  notes: 'After-goal plan (fictional): EF +50/wk to 400 (2 wks) then toward 900; audio interface ~GH₵900 (Course 3 Black Friday purchase), 18 weeks at 50; fun +25/wk.',
};

export default lesson;
