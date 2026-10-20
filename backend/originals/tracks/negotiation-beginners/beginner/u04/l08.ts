import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: win-win myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Win-win myths',
  summary: 'Remi thinks win-win means "everyone gives a bit". Ngozi thinks it means being nice. Both miss the point. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know what win-win really means',
    'Tell compromise from creating value',
    'See that win-win still needs firm goals',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Win-win means both sides give up half.',
          isFact: false,
          explain: 'Myth. That\'s compromise. Win-win means finding trades so both sides get more of what they care about, like the spare room.',
        },
        {
          text: 'Being nice is enough to get a win-win deal.',
          isFact: false,
          explain: 'Myth. Nice people often give away value. Win-win needs questions, trades and a clear goal. Kind and firm.',
        },
        {
          text: 'Most negotiations involve more than one issue, even if they look like they\'re only about price.',
          isFact: true,
          explain: 'Fact. Rent looked like one number; it had four issues: amount, lease length, repairs and payment timing.',
        },
        {
          text: 'You can create value for both sides and still try to get a good share of it.',
          isFact: true,
          explain: 'Fact. Ada made the deal bigger with the lease and the lock, and still aimed for a low rent. Both happen in every good negotiation.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Win-win isn\'t meeting in the middle or being nice. It\'s making the deal bigger, then still claiming your fair share.',
    },
  ],
  apply: {
    scenario: 'Win-win myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Win-win means both give up half', group: 0 },
          { text: 'Being nice is enough', group: 0 },
          { text: 'Most negotiations have several issues', group: 1 },
          { text: 'You can create value and claim it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between compromise and win-win?',
        options: [
          { text: 'Compromise splits; win-win trades so both get more of what they value' },
          { text: 'There\'s no difference', why: 'One divides; the other adds value.' },
          { text: 'Win-win means one side wins twice', why: 'Both sides gain.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many issues did the rent negotiation turn out to have?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Win-win = both give half"', 'Win-win = trade to gain more'],
          ['"Just be nice"', 'Be kind and firm'],
          ['"It\'s only about price"', 'There are usually more issues'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'If you care about win-win, shouldn\'t you just accept less?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No. I make the deal bigger for both of us, and I still aim for a good rent. Both at once.' },
          { text: 'Yes, accept less.', why: 'Win-win isn\'t giving in.' },
          { text: 'Win-win is a myth.', why: 'It\'s real when you trade issues.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two jobs.',
        template: 'Make the deal [[1]], then claim your fair [[2]].',
        blanks: [['bigger'], ['share']],
        distractors: ['smaller', 'apology'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Making the deal bigger, or claiming a share?',
        groups: ['Bigger deal', 'Claiming a share'],
        items: [
          { text: 'Adding a two-year lease', group: 0 },
          { text: 'Opening at ₦1,300,000', group: 1 },
          { text: 'Offering to fix the lock', group: 0 },
          { text: 'Using the market range', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s win-win advice is a myth?',
        lines: [
          'Ask what they really need.',
          'Look for more than one issue.',
          'Always meet exactly in the middle.',
          'Trade what you care less about.',
        ],
        bug: 2,
        fix: 'Trade to find a deal better than the middle.',
        explanation: 'The middle is compromise, not win-win.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can very nice negotiators get worse deals?',
        options: [
          { text: 'They give things away without asking for anything back' },
          { text: 'People dislike them', why: 'People like them; they just give too much.' },
          { text: 'They don\'t', why: 'Niceness without goals often gives value away.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a win-win negotiation.',
        lines: ['Set a clear goal', 'Ask about interests', 'Add issues and trade', 'Claim a fair share'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever compromised when a trade would have been better for both sides?',
    starters: ['I compromised on...', 'A trade could have been...'],
  },
  deepen: {
    title: 'Creating and claiming',
    summary: 'Negotiation scholars Lax and Sebenius described every negotiation as both creating value (making the deal bigger) and claiming value (dividing it). Good negotiators do both.',
  },
  notes: 'Creating vs claiming value: Lax & Sebenius, The Manager as Negotiator (1986). Compromise vs integrative solutions: Pruitt (1981).',
};

export default lesson;
