import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: five-part preparation. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Five-part preparation',
  summary: 'Lucía sends Ada the five questions she answers before every negotiation. Ada fills them in for the rent, one at a time. Twenty minutes, and she feels different.',
  minutes: 12,
  outcomes: [
    'Prepare a negotiation in five steps',
    'Tell a goal from a walk-away point',
    'Write down your alternative before you talk',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Prepare in five steps',
      steps: [
        { title: '1. Your goal', body: 'An ambitious but realistic result. Ada: "₦1,300,000 a year, the low end of what similar flats cost."' },
        { title: '2. Your reasons', body: 'Why that matters to you. Ada: "I want to stay near work, keep my budget, and not pay to move."' },
        { title: '3. Your alternative', body: 'What you\'ll do if there\'s no deal. Ada: "A flat near work at ₦1,350,000, plus about ₦200,000 in fees to move."' },
        { title: '4. Your walk-away', body: 'The worst deal you\'ll still accept. It comes from your alternative. Ada: "Above ₦1,450,000 a year, moving is cheaper."' },
        { title: '5. Their side', body: 'What he wants, why, and his alternative. Ada: "He wants more money and a reliable tenant. If I leave, the flat may sit empty."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Goal, reasons, alternative, walk-away, their side. Write them down before you talk.',
    },
  ],
  apply: {
    scenario: 'Ada\'s preparation.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Your goal', 'Your reasons', 'Your alternative', 'Your walk-away', 'Their side'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Ada\'s answer.',
        pairs: [
          ['Goal', '₦1,300,000 a year'],
          ['Alternative', 'A flat at ₦1,350,000 plus fees'],
          ['Walk-away', 'Above ₦1,450,000, move'],
          ['Their side', 'He wants a reliable tenant'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does Ada\'s walk-away number come from?',
        options: [
          { text: 'Her feelings on the day', why: 'Feelings move under pressure.' },
          { text: 'What her friends pay', why: 'Useful context, but her alternative decides it.' },
          { text: 'Her alternative: what moving would really cost' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'A goal or a walk-away?',
        groups: ['Goal', 'Walk-away'],
        items: [
          { text: 'What you hope to get', group: 0 },
          { text: 'The worst you\'ll still accept', group: 1 },
          { text: '₦1,300,000', group: 0 },
          { text: '₦1,450,000', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why do I need a goal and a walk-away? Isn\'t one number enough?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'The goal keeps you aiming high. The walk-away stops you saying yes to a bad deal. You need both.' },
          { text: 'One is fine.', why: 'With only a walk-away, people aim too low.' },
          { text: 'Only the goal matters.', why: 'Without a walk-away, you can be pushed anywhere.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s walk-away is ₦1,450,000 and her goal is ₦1,300,000. What\'s the gap, in naira?',
        answers: ['150000', '150,000'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Two numbers.',
        template: 'The [[1]] keeps you aiming high; the [[2]] stops a bad yes.',
        blanks: [['goal'], ['walk-away', 'walkaway']],
        distractors: ['fear', 'rumour'],
      },
      {
        kind: 'mcq',
        prompt: 'Why think about his side at all?',
        options: [
          { text: 'To feel sorry for him', why: 'It\'s about finding the deal.' },
          { text: 'It doesn\'t help', why: 'His needs and alternative shape the deal.' },
          { text: 'Knowing what he needs shows where a deal might be' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in this preparation is wrong?',
        lines: [
          'Goal: ₦1,300,000.',
          'Reasons: stay near work, keep my budget.',
          'Walk-away: whatever he says.',
          'Their side: he wants a reliable tenant.',
        ],
        bug: 2,
        fix: 'Walk-away: above ₦1,450,000, I move.',
        explanation: '"Whatever he says" isn\'t a walk-away.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many minutes did Ada\'s preparation take?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Fill in the five steps for a negotiation of your own.',
    starters: ['Goal:...', 'Walk-away:...'],
  },
  deepen: {
    title: 'Target and reservation point',
    summary: 'In negotiation research, your goal is called a target, and your walk-away is your reservation point. People who set ambitious, specific targets tend to get better results.',
  },
  notes: 'Fictional figures: goal ₦1,300,000; alternative flat ₦1,350,000 + ~₦200,000 fees; walk-away ₦1,450,000/yr (worked out in Lesson 4). Specific, ambitious goals improve outcomes: goal-setting research (e.g. Locke & Latham) applied to negotiation (Thompson).',
};

export default lesson;
