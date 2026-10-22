import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: the pause rule. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The pause rule',
  summary: 'The single most useful tool in the course: a set waiting time before any unplanned purchase. Twenty-four hours for small things, thirty days for big ones. Step by step, here\'s how Kofi\'s works.',
  minutes: 11,
  outcomes: [
    'Set your own pause rule for small and big purchases',
    'Use a wishlist so nothing is "lost"',
    'Decide calmly when the pause ends',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Kofi\'s pause rule',
      steps: [
        { title: '1. Set your line', body: 'Pick an amount that separates small from big. For Kofi: GH₵200. Under it is small; over it is big.' },
        { title: '2. Small: 24 hours', body: 'Anything unplanned under GH₵200 waits a day. Most urges fade overnight, as his log showed.' },
        { title: '3. Big: 30 days', body: 'Anything unplanned over GH₵200 waits 30 days. A month lets the "want" settle, and gives time to save for it properly if it\'s still wanted.' },
        { title: '4. Screenshot it to a wishlist', body: 'Nothing is lost: screenshot it into a "Wishlist" album with the date. That tiny step calms the fear of missing out.' },
        { title: '5. When the pause ends, ask three questions', body: 'Do I still want it? Does it fit my budget, from a planned line? Is the price fair against the usual price? Three yeses: buy it, happily.' },
        { title: '6. Planned items skip the pause', body: 'Things already on your list (like the interface) don\'t need it. They\'ve already had their pause.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Small unplanned buys wait 24 hours; big ones wait 30 days. Screenshot to a wishlist. Then three questions: still want it, fits the budget, fair price?',
    },
  ],
  apply: {
    scenario: 'Pausing.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the pause rule.',
        lines: ['Notice an unplanned urge', 'Check: small or big?', 'Screenshot to the wishlist', 'Wait 24 hours or 30 days', 'Ask the three questions'],
      },
      {
        kind: 'sortGroups',
        prompt: 'With Kofi\'s GH₵200 line: 24 hours or 30 days?',
        groups: ['24 hours', '30 days'],
        items: [
          { text: 'A GH₵60 jersey', group: 0 },
          { text: 'A GH₵450 speaker', group: 1 },
          { text: 'A GH₵15 phone stand', group: 0 },
          { text: 'A GH₵1,200 microphone', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the audio interface skip the pause?',
        options: [
          { text: 'It\'s planned: on his list and saved for over 18 weeks' },
          { text: 'It\'s on sale', why: 'Being on sale isn\'t a reason to skip the pause.' },
          { text: 'It\'s expensive', why: 'Expensive unplanned things get the 30-day pause.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three questions.',
        template: 'Still [[1]] it? Fits the [[2]]? Fair [[3]]?',
        blanks: [['want'], ['budget'], ['price']],
        distractors: ['need', 'friend'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'But if I wait 30 days, the sale will be over!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'True, buy now.', why: 'That\'s the urgency trick.' },
          { text: 'Then never buy it.', why: 'The pause isn\'t a ban.' },
          { text: 'Then it wasn\'t planned. If you still want it in 30 days, another sale will come, and you\'ll have saved for it.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why screenshot it to a wishlist?',
        options: [
          { text: 'To show friends', why: 'It\'s for you.' },
          { text: 'It calms the fear of losing it, so waiting is easier' },
          { text: 'To buy it faster later', why: 'It\'s to make waiting easier.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Yaw\'s pause rule defeats the point?',
        lines: [
          'Line: GH₵150.',
          'Small things wait a day.',
          'Big things wait 30 days, unless there\'s a countdown.',
        ],
        bug: 2,
        fix: 'Big things wait 30 days. Countdowns don\'t count.',
        explanation: 'The exception is exactly the trick the rule exists to beat.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s wishlist has 10 items from last month. After the pause, he still wanted 2. How many faded?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each answer at the end of the pause to the next step.',
        pairs: [
          ['Still want it, fits, fair price', 'Buy it happily'],
          ['Don\'t want it any more', 'Delete from the wishlist'],
          ['Want it, but doesn\'t fit the budget', 'Start a savings goal for it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happened to most items on Kofi\'s wishlist?',
        options: [
          { text: 'The want faded during the pause' },
          { text: 'He bought them all', why: 'Only 2 of 10.' },
          { text: 'They sold out', why: 'Most were still there; he just didn\'t want them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Set your own pause rule. What\'s your line between small and big? How long will each wait?',
    starters: ['My line is...', 'Small things wait...', 'Big things wait...'],
  },
  deepen: {
    title: 'The 30-day rule',
    summary: 'Versions of the 30-day rule are widely recommended by personal finance writers. It works for the same reason the urge log does: the "want" signal peaks before buying and fades with time. Waiting lets the calm part of you decide.',
  },
  notes: 'Pause rule thresholds personal (Kofi GH₵200). Wishlist 10 → 2 (fictional). Mechanism links to Knutson et al. (2007) anticipation (Ch1 L3).',
};

export default lesson;
