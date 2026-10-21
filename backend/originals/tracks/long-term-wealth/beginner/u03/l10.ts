import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: make time work. Cliffhanger: the bank offer and the Lekki flat. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: make time work',
  summary: 'Bisi wants to understand why her savings "never grow". Use everything from Chapter 3. Then a recruiter messages Miracle: a bank job at ₦1.5 million a month. Her friends are already picking her new Lekki apartment.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Explain compounding, inflation and debt to someone else', 'Match money to time horizons'],
  learn: [
    {
      kind: 'story',
      title: 'The message',
      beats: [
        { speaker: 'bisi', text: 'I\'ve saved for four years. It never grows. What am I doing wrong?' },
        { speaker: 'miracle', text: 'Let\'s look: where is it, what does it pay, and what are prices doing?' },
        { speaker: 'narrator', text: 'That Friday, a message from a recruiter. A bank, the same one that tried to hire her three years ago: "Head of Digital Operations. ₦1.5 million a month."' },
        { speaker: 'narrator', text: 'Her friends\' group chat, minutes after she mentions it: "LEKKI. Sea view. You deserve it." "New car!" "Finally, Miracle the big woman."' },
        { speaker: 'miracle', text: '₦600,000 more a month. And everyone already has a plan for it except me.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: compounding, inflation, real returns, the rule of 72, debt against you, and matching money to time. Now the biggest wealth lever of all: what happens to income growth. Chapter 4: grow the gap. First, Bisi.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Bisi, 30. ₦1,200,000 saved over four years, all in a basic account paying 4%. Inflation has been far higher. No debts. She plans to retire in 30 years.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Bisi feel her savings "never grow"?',
        options: [
          { text: 'They grow slower than prices, so their buying power shrinks' },
          { text: 'The bank stole it', why: 'The number grew; inflation shrank its value.' },
          { text: 'She hasn\'t saved', why: 'She has ₦1.2 million.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Her account pays 4%; inflation is 15%. Real return, roughly, in percent?',
        answers: ['-11', '−11', '-11%', '−11%'],
        placeholder: 'A percent',
      },
      {
        kind: 'sortGroups',
        prompt: 'For Bisi: keep safe, or give it a chance to grow?',
        groups: ['Keep safe', 'Give it a chance to grow'],
        items: [
          { text: 'Three months of must-haves', group: 0 },
          { text: 'Money for retirement in 30 years', group: 1 },
          { text: 'Next month\'s rent', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Bisi\'s plan.',
        lines: ['Keep an emergency fund safe', 'Learn the basics of long-term investing', 'Check fees and regulation', 'Move long-term money into a spread-out plan', 'Add monthly, check quarterly'],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'A man at church says his scheme pays 5% a month, guaranteed.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Guaranteed high monthly returns are a classic warning sign. Check if it\'s regulated, and please don\'t put money in until you do.' },
          { text: 'Sounds great.', why: 'It\'s a red flag.' },
          { text: 'Put a little in to test.', why: 'Scams often pay early "tests" to draw you in.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At an example 8% a year, about how many years for money to double? (Rule of 72.)',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 3 idea to Bisi\'s situation.',
        pairs: [
          ['Inflation', 'Her ₦1.2m buys less each year'],
          ['Real return', '4% minus 15%'],
          ['Time horizon', '30 years to retirement'],
          ['Red flag', '"5% a month guaranteed"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Miracle tells Bisi.',
        template: 'Emergency money [[1]]; long-term money needs to [[2]] faster than prices.',
        blanks: [['safe'], ['grow']],
        distractors: ['invested', 'shrink'],
      },
      {
        kind: 'findBug',
        prompt: 'Bisi\'s draft plan. Which line will hurt her?',
        lines: [
          'Keep three months safe.',
          'Learn before investing.',
          'Move everything, including the emergency fund, into one company\'s shares.',
        ],
        bug: 2,
        fix: 'Emergency fund safe; long-term money spread out.',
        explanation: 'Concentrated and no emergency fund: two risks at once.',
      },
      {
        kind: 'mcq',
        prompt: 'The bank job pays ₦600,000 more a month. What\'s the biggest risk?',
        options: [
          { text: 'That spending rises to match, and the extra disappears' },
          { text: 'That she earns too much', why: 'Earning more is great with a plan.' },
          { text: 'None', why: 'Lifestyle creep is the big risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '₦1,500,000 − ₦900,000. How much more would the bank job pay each month?',
        answers: ['600000', '600,000', '₦600,000', '₦600000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Her friends already have plans for her raise. Whose plan should decide?',
        options: [
          { text: 'Hers, made before the money arrives' },
          { text: 'Her friends\'', why: 'Their plans spend it.' },
          { text: 'Nobody\'s', why: 'No plan means creep.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If your income went up a lot tomorrow, what would the people around you expect you to buy?',
    starters: ['They\'d expect...', 'I\'d actually want to...'],
  },
  notes: 'Chapter 3 challenge. Bisi per CAST (Afiya). Numbers fictional; "5% a month guaranteed" as a red-flag example (Scams course). Cliffhanger: bank offer ₦1.5M/month (callback to Make People Listen: Miracle chose Afiya over a bank job) and Lekki apartment pressure → Ch4.',
};

export default lesson;
