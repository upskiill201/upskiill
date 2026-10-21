import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the pause list v4, the pressure rules. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The pause list v4: the pressure rules',
  summary: 'After the night with Yaw, Kofi adds a new section to his pause list: rules for when the pressure comes from people, not shops. Tap through it.',
  minutes: 11,
  outcomes: [
    'Read a set of personal pressure rules',
    'See how each rule links to a lesson',
    'Write your own pressure rules',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s pause list v4: the pressure rules',
      text: 'RULE 1: Pay later is still borrowing. Only if I could pay in full today, and never more than one plan. RULE 2: If I want it because others have it, I wait a week. RULE 3: Group plans: suggest the cheaper option on day one. RULE 4: Contributions come from my people line (GH₵30 a month). Give what fits, add effort. RULE 5: My savings are not a friend\'s emergency fund. I help with time and a plan. RULE 6: A short, honest no. A relaxed repeat if teased. RULE 7: Money worries get said out loud, to Efua, Miracle or Mum, within a day.',
      hotspots: [
        { phrase: 'RULE 1: Pay later is still borrowing.', note: 'From Yaw\'s nine payments across three apps. The test: could I pay the full price today?' },
        { phrase: 'RULE 2: If I want it because others have it, I wait a week.', note: 'Keeping up with highlight reels. A week lets the comparison fade.' },
        { phrase: 'RULE 3: Group plans: suggest the cheaper option on day one.', note: 'Early suggestions shape the plan; late ones feel like backing out.' },
        { phrase: 'RULE 4: Contributions come from my people line', note: 'Predictable group costs get a budget line, so they never come from food or savings.' },
        { phrase: 'RULE 5: My savings are not a friend\'s emergency fund.', note: 'The hardest rule, and the one that let him help Yaw properly.' },
        { phrase: 'RULE 6: A short, honest no.', note: 'Warm, short, no debt story needed, relaxed if teased.' },
        { phrase: 'RULE 7: Money worries get said out loud', note: 'The antidote to shame. Yaw hid for three weeks; it cost GH₵80 and a lot of sleep.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write your pressure rules before the pressure comes. In the moment, you won\'t have time to think; you\'ll only have time to remember.',
    },
  ],
  apply: {
    scenario: 'The pressure rules.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to the lesson behind it.',
        pairs: [
          ['Pay later is still borrowing', 'How pay later really works'],
          ['Wait a week if others have it', 'Keeping up with everyone'],
          ['People line for contributions', 'Group spending'],
          ['Say money worries out loud', 'Shame makes it worse'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write pressure rules in advance?',
        options: [
          { text: 'In the moment you won\'t have time to think, only to remember' },
          { text: 'To show friends', why: 'They\'re for Kofi.' },
          { text: 'They don\'t help', why: 'Rules decided calmly protect you in pressured moments.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which rule fits each situation?',
        groups: ['Rule 1: pay later', 'Rule 3: suggest early', 'Rule 5: savings'],
        items: [
          { text: '"Pay in 4!" at checkout', group: 0 },
          { text: 'The team is choosing a dinner venue', group: 1 },
          { text: 'A friend asks for your interface fund', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Can I copy your rules?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Copy them, then change them to fit you. Your log knows your triggers better than mine.' },
          { text: 'No, they\'re mine.', why: 'Sharing helps. Personalising helps more.' },
          { text: 'You don\'t need rules.', why: 'He\'s the one who needs them most right now.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule 1\'s test.',
        template: 'Only if I could pay in [[1]] today, and never more than [[2]] plan.',
        blanks: [['full'], ['one']],
        distractors: ['part', 'three'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rule 4: GH₵30 a month in the people line. How much over 6 months?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which of Yaw\'s draft rules will fail him?',
        lines: [
          'One pay-later plan at most, only if I could pay today.',
          'Wait a week if I want it because others have it.',
          'I\'ll just be careful around sneaker drops.',
        ],
        bug: 2,
        fix: 'Sneaker drops: screenshot, wait a week, check my budget.',
        explanation: '"Be careful" isn\'t a rule. A specific action is.',
      },
      {
        kind: 'mcq',
        prompt: 'Rule 5 says savings aren\'t a friend\'s emergency fund. How did Kofi still help Yaw?',
        options: [
          { text: 'With time, a plan, and not judging' },
          { text: 'He didn\'t help', why: 'He spent a whole night on Plan B.' },
          { text: 'By lending secretly', why: 'He didn\'t lend.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pause list versions.',
        lines: ['v1: count the urges', 'v2: map triggers and swaps', 'v3: spot the tricks', 'v4: the pressure rules'],
      },
      {
        kind: 'mcq',
        prompt: 'Rule 7: say money worries out loud within a day. Why "within a day"?',
        options: [
          { text: 'Before shame turns into weeks of hiding' },
          { text: 'Because lenders require it', why: 'It\'s for Kofi\'s own good.' },
          { text: 'No reason', why: 'Speed stops avoidance from setting in.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write three pressure rules for yourself: one about credit, one about friends, one about saying worries out loud.',
    starters: ['Credit rule:...', 'Friends rule:...', 'Worry rule:...'],
  },
  deepen: {
    title: 'Rules, not willpower',
    summary: 'Personal rules ("I don\'t use pay later", "I wait a week") work because they remove the decision from the moment. Research on self-control suggests people with clear personal rules face fewer hard decisions, and make fewer they regret.',
  },
  notes: 'Pause list v4 rules (fictional). Personal rules and self-control: e.g. Ainslie (1992) on personal rules; stated generally.',
};

export default lesson;
