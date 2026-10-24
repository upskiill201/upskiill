import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first payslip',
  summary: 'Payday. ₦1,250,000 lands, and ₦355,000 leaves for saving before Miracle opens her banking app. Check what you know about the gap, lifestyle creep, savings rates and splitting raises.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Work out a savings rate and split a raise', 'Spot lifestyle creep'],
  learn: [
    {
      kind: 'story',
      title: 'Payday',
      beats: [
        { speaker: 'narrator', text: 'A notification: ₦1,250,000 in. Two minutes later: ₦355,000 out, to pension and the long-term pots.' },
        { speaker: 'miracle', text: 'I didn\'t even have to be strong. It was gone before I could argue with myself.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: grow the gap.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Take-home ₦600,000; saves ₦90,000. Savings rate, in percent?',
        answers: ['15', '15%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'What builds wealth?',
        options: [
          { text: 'A high salary alone', why: 'A high salary can be spent entirely.' },
          { text: 'An expensive lifestyle', why: 'That shrinks the gap.' },
          { text: 'The gap between earning and spending, kept for years' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Creep or plan?',
        groups: ['Creep', 'Plan'],
        items: [
          { text: 'Upgrades that "just happened"', group: 0 },
          { text: 'Half the raise saved on payday', group: 1 },
          { text: 'A car loan because of your title', group: 0 },
          { text: 'A chosen ₦50,000 rent upgrade', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₦300,000 bonus. Half to future you. How much?',
        answers: ['150000', '150,000', '₦150,000', '₦150000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its meaning.',
        pairs: [
          ['Lifestyle creep', 'Upgrades that become the new normal'],
          ['Savings rate', 'Share of take-home you keep'],
          ['Half the raise', 'Split extra money before it lands'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I earn more than Ifeoma did. Why would she end up richer?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'She wouldn\'t.', why: 'She did.' },
          { text: 'Because she kept a 30% gap for twenty years. It\'s what you keep, not what you earn.' },
          { text: 'Luck.', why: 'It was habit.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lifestyle creep.',
        template: 'Many small [[1]] that become the new [[2]].',
        blanks: [['upgrades'], ['normal']],
        distractors: ['savings', 'budget'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this raise plan lets creep in?',
        lines: [
          'Split decided before payday.',
          'Saving transfer set for payday.',
          'The "now" half: no plan, I\'ll see.',
        ],
        bug: 2,
        fix: 'Plan the "now" half too.',
        explanation: 'Unplanned money tends to drift into creeping upgrades.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what\'s a real return?',
        options: [
          { text: 'The advertised rate', why: 'That\'s before inflation.' },
          { text: 'A guaranteed return', why: 'Nothing is guaranteed.' },
          { text: 'Growth after inflation' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 3: rule of 72 at 6%. Years to double?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: why automate saving?',
        options: [
          { text: 'So it happens without willpower, before you can spend it' },
          { text: 'To pay fees', why: 'It\'s about willpower.' },
          { text: 'Because it earns more', why: 'It earns the same; it just happens.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would "gone before I could argue with myself" look like for your money?',
    starters: ['On payday...', 'I\'d set up...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 2 and 3 review. ₦355,000 = previous ₦230,000 + ₦125,000.',
};

export default lesson;
