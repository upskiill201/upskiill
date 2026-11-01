import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: grow the gap. Cliffhanger: the fall and Dad's letter. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: grow the gap',
  summary: 'Emmanuel just got a raise and a "pre-approved" car loan letter. Use everything from Chapter 4. Then a bad week: Miracle\'s long-term pot drops sharply, and Dad\'s retirement letter arrives with a pension far smaller than he expected.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Plan a raise for someone else', 'Spot creep and status debt'],
  learn: [
    {
      kind: 'story',
      title: 'A bad week',
      beats: [
        { speaker: 'emmanuel', text: 'Raise! ₦450,000 to ₦600,000. And look, I\'m pre-approved for a car.' },
        { speaker: 'miracle', text: 'Congratulations. Before anything else: where does the ₦150,000 go?' },
        { speaker: 'narrator', text: 'Thursday. Markets fall hard. Miracle\'s long-term pot is down 15% in a month. Her screen is red.' },
        { speaker: 'narrator', text: 'Friday. A photo from Dad on WhatsApp: his retirement letter. The monthly pension is much smaller than he was told, and the first payment may be late.' },
        { speaker: 'miracle', text: 'My investments are falling, Dad\'s pension is shrinking, and my uncle has just asked to borrow money. What do I do first?' },
        { speaker: 'tey', text: 'That\'s Chapter 4: the gap, creep, savings rates, splitting raises, housing, skills and status debt. The last chapter is the long game: staying calm in falls, protecting what you\'ve built, and helping family without sinking. First, Emmanuel.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Emmanuel, 26. Take-home up from ₦450,000 to ₦600,000. Saves ₦30,000 now. Must-haves ₦280,000. A ₦9 million car loan offer at 28%. He also earns about ₦120,000 a month from design.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How big is Emmanuel\'s raise?',
        answers: ['150000', '150,000', '₦150,000', '₦150000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using Miracle\'s rule, how much of the raise goes to future Emmanuel?',
        answers: ['75000', '75,000', '₦75,000', '₦75000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'With the raise rule and half his design income, how much does Emmanuel save a month? (₦30,000 + ₦75,000 + ₦60,000)',
        options: [
          { text: '₦105,000', why: 'Add the ₦60,000 from design too.' },
          { text: '₦30,000', why: 'That\'s his old amount.' },
          { text: '₦165,000' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'For Emmanuel: grows the gap, or shrinks it?',
        groups: ['Grows the gap', 'Shrinks it'],
        items: [
          { text: 'Half the raise saved on payday', group: 0 },
          { text: 'The ₦9 million car loan', group: 1 },
          { text: 'Half the design income saved', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'The car payment is "only" a bit each month.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Ask what you pay back altogether. At 28%, it doubles in under three years. And a car loses value every year.' },
          { text: 'Then take it.', why: 'Monthly payments hide the total.' },
          { text: 'Get a bigger one.', why: 'Status debt.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 4 idea to Emmanuel\'s situation.',
        pairs: [
          ['Half the raise', '₦75,000 to future him'],
          ['Status debt', 'The car loan'],
          ['Growing the top line', 'His design work'],
          ['Savings rate', 'Saved ÷ take-home'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Miracle tells Emmanuel.',
        template: 'Give the raise its [[1]] before it lands, and ask any lender for the [[2]] cost.',
        blanks: [['job'], ['total']],
        distractors: ['name', 'monthly'],
      },
      {
        kind: 'findBug',
        prompt: 'Emmanuel\'s draft plan. Which line breaks Chapter 4?',
        lines: [
          'Half the raise saved automatically.',
          'Half the design income saved.',
          'Take the car loan; I\'ll save less for a few years.',
        ],
        bug: 2,
        fix: 'No car loan now; save for a modest car if needed.',
        explanation: 'The loan would swallow the gap he just built.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Emmanuel\'s plan.',
        lines: ['Split the raise before payday', 'Set up the automatic transfer', 'Save half the design income', 'Say no to the car loan for now'],
      },
      {
        kind: 'mcq',
        prompt: 'Miracle\'s pot is down 15% in a month. What should she do first?',
        options: [
          { text: 'Sell everything today', why: 'That turns a fall into a real loss.' },
          { text: 'Borrow to buy more', why: 'Never borrow to invest in a panic.' },
          { text: 'Nothing hasty: she won\'t need it for 30 years, and falls are normal' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₦2,000,000 pot falls 15%. What\'s it worth now?',
        answers: ['1700000', '1,700,000', '₦1,700,000', '₦1700000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Dad\'s pension, the fall and her uncle all hit in one week. Which money protects Miracle from making bad decisions?',
        options: [
          { text: 'Her long-term pot', why: 'It\'s down; selling now locks in the loss.' },
          { text: 'Her emergency fund, which is safe and untouched' },
          { text: 'A new loan', why: 'Debt adds pressure.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If several money problems arrived in the same week, which would you deal with first, and why?',
    starters: ['First I\'d...', 'Because...'],
  },
  notes: 'Chapter 4 challenge. Emmanuel per CAST: 30,000 + 75,000 + 60,000 = 165,000. 2,000,000 × 0.85 = 1,700,000 (her long-term pot is illustrative). Cliffhanger: market fall, Dad\'s smaller pension, uncle\'s request → Ch5.',
};

export default lesson;
