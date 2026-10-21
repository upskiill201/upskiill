import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: save a share of every raise. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'A share of every raise',
  summary: 'Folake tells Miracle a raise is coming next quarter: ₦100,000 more a month. Tey explains the simplest wealth habit of all: decide now what share of it goes to future-you.',
  minutes: 11,
  outcomes: [
    'Decide in advance what share of a raise to save',
    'Raise saving without feeling a pay cut',
    'Use raises to reach long-term goals faster',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Raise next quarter: ₦100,000 more a month. Miracle\'s already saving 20%. What should happen to the extra?', replies: ['Spend it? She deserves it.'] },
        { tey: 'She does, and some of it should be enjoyed. But here\'s a trick: if she decides now to save half of the raise, she\'ll never feel it as a loss. Her take-home still goes up by ₦50,000.', replies: ['Why does deciding now matter?'] },
        { tey: 'Because once she gets used to the bigger number, saving it would feel like a pay cut. Decide before the first bigger payslip, and it feels like a gift to both versions of her.', replies: ['Is this a real thing?'] },
        { tey: 'Very real. Economists Richard Thaler and Shlomo Benartzi designed a programme called Save More Tomorrow: workers agreed in advance to save part of future raises. Their saving rates rose steadily over a few years, and few people dropped out.', replies: ['So what does Miracle do?'] },
        { tey: 'She sets a reminder for the week the raise lands: increase the long-term transfer by ₦50,000. Her saving rate goes from 20% to about 23%. Next raise, the same again.', replies: ['And the other half?'] },
        { tey: 'Hers, on purpose. A trip home to Buea, nicer furniture, a little more for Dad. A raise should feel like a raise.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Decide now what share of every future raise goes to future-you. Half is a good default. Your pay still rises, and so does your saving.',
    },
  ],
  apply: {
    scenario: 'The raise next quarter.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Half of a ₦100,000 raise. How much to long-term saving?',
        answers: ['50000', '50,000', '₦50,000', '₦50000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why decide before the raise arrives?',
        options: [
          { text: 'Once you\'re used to the bigger number, saving it feels like a pay cut' },
          { text: 'HR needs to know', why: 'It\'s about how it feels.' },
          { text: 'It doesn\'t matter when', why: 'Timing changes how it feels.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the raise to its job.',
        pairs: [
          ['₦50,000', 'Long-term saving'],
          ['The other ₦50,000', 'Enjoyed on purpose'],
          ['The reminder', 'Raise the transfer the week it lands'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Save More Tomorrow thinking, or creep?',
        groups: ['Save More Tomorrow', 'Creep'],
        items: [
          { text: 'Half of each raise to saving, decided in advance', group: 0 },
          { text: 'Spend the whole raise, save "later"', group: 1 },
          { text: 'Transfer raised the week the raise lands', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'If I save half the raise, does it still feel like a raise?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Yes: your take-home still goes up ₦50,000. And future-you gets the other half. Both of you win.' },
          { text: 'No, it feels like nothing.', why: '₦50,000 more take-home is real.' },
          { text: 'Save all of it.', why: 'Enjoying part keeps the plan going.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Decide [[1]] what share of every future [[2]] goes to future-you.',
        blanks: [['now'], ['raise']],
        distractors: ['later', 'loan'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saving ₦180,000 + ₦50,000 from the raise. New monthly long-term saving?',
        answers: ['230000', '230,000', '₦230,000', '₦230000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'New salary ₦1,000,000; saving ₦230,000. About what percent?',
        options: [
          { text: 'About 23%' },
          { text: 'About 20%', why: 'That was before.' },
          { text: 'About 30%', why: '230,000 of 1,000,000 is 23%.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which plan lets the raise slip away?',
        lines: [
          'Reminder set for raise week.',
          'Half to long-term saving.',
          'I\'ll decide what to do with it once I see how I feel.',
        ],
        bug: 2,
        fix: 'Decide now: half to saving, half to enjoy.',
        explanation: '"See how I feel" is how raises become lifestyle.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the raise plan.',
        lines: ['Hear about the raise', 'Decide the split now', 'Set a reminder for raise week', 'Raise the transfer', 'Enjoy the rest on purpose'],
      },
    ],
  },
  reflect: {
    prompt: 'What share of your next raise or extra income will go to future-you? Write it down now.',
    starters: ['From my next raise, ...% goes to...'],
  },
  deepen: {
    title: 'Read the study',
    summary: 'Thaler and Benartzi (2004), "Save More Tomorrow: Using Behavioral Economics to Increase Employee Saving", Journal of Political Economy. In their first programme, average saving rates more than tripled over about three years.',
  },
  notes: 'Thaler, R. H., & Benartzi, S. (2004). JPE, 112(S1), S164–S187: saving rates rose from ~3.5% to ~13.6% over ~40 months for participants. Raise next quarter ₦100,000 (fictional); salary to ₦1,000,000.',
};

export default lesson;
