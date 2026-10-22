import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: the "I deserve it" trap. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The "I deserve it" trap',
  summary: '"I worked so hard for that raise. I deserve nice things." Ada isn\'t wrong. So why does "I deserve it" so often end with less money and no more happiness? Tey talks it through.',
  minutes: 11,
  outcomes: [
    'Spot "I deserve it" thinking',
    'Separate rewarding yourself from spending without limits',
    'Plan rewards that don\'t eat the raise',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada says: "I negotiated hard. I deserve nice things." Is she wrong?', replies: ['No, she does deserve it.'] },
        { tey: 'Agreed. The problem isn\'t the deserving. It\'s that "I deserve it" has no limit. It justifies the ride, the delivery, the phone, the gym. Every one, every day.', replies: ['So what should she do?'] },
        { tey: 'Turn "I deserve it" into a planned reward with a size. "I deserve a celebration for my raise: one dinner out with Ngozi, ₦30,000." Generous, specific, finished.', replies: ['And after that?'] },
        { tey: 'Then a regular "upgrade budget" from the raise. Say half the raise, ₦30,000 a month, for upgrades she chooses on purpose. The other half goes to savings and goals.', replies: ['What if she wants more than ₦30,000 of upgrades?'] },
        { tey: 'She picks. That\'s the point. Maybe rides on rainy days and the art class, not daily delivery and a gym she skips. Choosing makes each upgrade feel better, because it\'s a decision, not a drift.', replies: ['Does that really feel better?'] },
        { tey: 'Usually, yes. A reward you planned feels like a reward. A reward you take every day just feels like normal life, and normal life doesn\'t feel like a treat.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"I deserve it" is true, and it has no limit. Give your rewards a size: one celebration, then a monthly upgrade budget you choose from on purpose.',
    },
  ],
  apply: {
    scenario: '"I deserve it."',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with "I deserve it"?',
        options: [
          { text: 'Ada doesn\'t deserve it', why: 'She does. The issue is the limit.' },
          { text: 'Rewards are always bad', why: 'Rewards are good with a size.' },
          { text: 'It has no limit, so it can justify everything, every day' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Half of Ada\'s ₦60,000 raise as an upgrade budget. How much a month?',
        answers: ['30000', '30,000', '₦30,000', '₦30000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A reward with a size, or "I deserve it" with no limit?',
        groups: ['Reward with a size', 'No limit'],
        items: [
          { text: 'One celebration dinner, ₦30,000', group: 0 },
          { text: 'Delivery every night "because I work hard"', group: 1 },
          { text: 'Rides on rainy days, from the upgrade budget', group: 0 },
          { text: 'Whatever I feel like, I\'ve earned it', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I deserve rides every day. I\'m exhausted after work.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Exhaustion is real. Which rides help most: the late nights and rainy days? Put those in your upgrade budget and bus the rest.' },
          { text: 'Then ride every day.', why: 'No limit, no plan.' },
          { text: 'Exhaustion isn\'t real.', why: 'It is. Plan for the worst days.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn it into a plan.',
        template: 'Give your rewards a [[1]]: one [[2]], then a monthly upgrade budget.',
        blanks: [['size', 'limit'], ['celebration']],
        distractors: ['loan', 'excuse'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each feeling to a sized reward.',
        pairs: [
          ['Proud of the raise', 'One celebration dinner'],
          ['Tired after late nights', 'Rides on late nights only'],
          ['Wants to grow as a designer', 'The weekend art class'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Ada\'s plan has no limit?',
        lines: [
          'Celebration: one dinner, ₦30,000.',
          'Upgrade budget: ₦30,000 a month.',
          'Plus anything else on days I feel I deserve it.',
        ],
        bug: 2,
        fix: 'Anything else comes from the upgrade budget, or waits.',
        explanation: 'The "plus anything else" brings back the no-limit problem.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does a planned reward often feel better than a daily one?',
        options: [
          { text: 'Planned rewards are more expensive', why: 'Not necessarily.' },
          { text: 'They don\'t', why: 'Most people find planned treats feel more special.' },
          { text: 'Daily rewards become normal; planned ones still feel like rewards' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If ₦30,000 of the raise goes to upgrades, how much is left of the ₦60,000 for savings and goals?',
        answers: ['30000', '30,000', '₦30,000', '₦30000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s new approach to the raise.',
        lines: ['One sized celebration', 'Half the raise to savings and goals', 'Half to an upgrade budget', 'Choose upgrades on purpose'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you tell yourself you "deserve"? What would a sized version of that reward look like?',
    starters: ['I tell myself I deserve...', 'A sized version:...'],
  },
  deepen: {
    title: 'Licensing',
    summary: 'Psychologists describe "licensing": after doing something good (working hard, getting a raise), people feel licensed to indulge. It\'s natural. Planning the indulgence in advance keeps it from quietly becoming every day.',
  },
  notes: 'Self-licensing: e.g. Khan & Dhar (2006), "Licensing effect in consumer choice", JMR; stated generally. Upgrade budget = half of raise (teaching device).',
};

export default lesson;
