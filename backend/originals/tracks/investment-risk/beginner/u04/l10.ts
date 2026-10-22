import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: spreading risk. Cliffhanger: the scheme stops paying. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Vikram asks for help',
  summary: 'Vikram\'s stock is down 40% in a week. For the first time, he asks Arjun for help. Use everything from Chapter 4. Then Joel calls, shaking: his neighbour\'s scheme has stopped paying, and the WhatsApp group has vanished.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Explain diversification to someone who\'s been burnt', 'Build a spread plan for someone else'],
  learn: [
    {
      kind: 'story',
      title: 'Two calls',
      beats: [
        { speaker: 'narrator', text: 'Vikram, quietly, no screenshots this time: "It\'s down 40%. What do I do?"' },
        { speaker: 'arjun', text: 'First, nothing in a panic. Then let\'s look at what you actually own.' },
        { speaker: 'narrator', text: 'Midnight. Joel: "My neighbour\'s scheme stopped paying. The group is deleted. He put in ₹8 lakh. My aunt put in ₹3 lakh."' },
        { speaker: 'joel', text: 'I almost put my ₹3 lakh in. I was one click away.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: one stock vs many, layers of spreading, correlation, fees, funds, rebalancing. The last chapter is about the offers that skip all of this: too good to be true. First, Vikram.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Vikram, 31. All ₹6,00,000 of his long-term savings in one tech stock, now down 40%. He also works for a tech company. No bonds, nothing outside India. He wants to "win it back fast" with options.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₹6,00,000 down 40%. What\'s it worth now?',
        answers: ['360000', '3,60,000', '360,000', '₹3,60,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What gain does ₹3,60,000 need to get back to ₹6,00,000? (Roughly.)',
        options: [
          { text: '40%', why: 'A 40% loss needs about 67% to recover.' },
          { text: '20%', why: 'Much more than that.' },
          { text: 'About 67%' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the Chapter 4 idea.',
        pairs: [
          ['All in one stock', 'Concentration'],
          ['Job and stock both tech', 'Correlation'],
          ['Nothing outside India', 'Missing a layer'],
          ['"Win it back fast" with options', 'Chasing, with leverage'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Vikram wants to use options to win it back by Diwali.',
        prompt: 'What does Grace suggest Arjun say?',
        options: [
          { text: 'Good idea, go big.', why: 'Leverage after a loss is very risky.' },
          { text: 'Trying to win back losses fast is how small losses become big ones. Let\'s make a calm plan instead.' },
          { text: 'You deserve this.', why: 'Unkind and unhelpful.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm plan, or panic?',
        groups: ['Calm plan', 'Panic'],
        items: [
          { text: 'Build an emergency fund first', group: 0 },
          { text: 'Options to win it back by Diwali', group: 1 },
          { text: 'Add new money to a broad spread monthly', group: 0 },
          { text: 'Sell everything tonight in fear', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trap.',
        template: 'Trying to win back [[1]] fast is how small losses become [[2]] ones.',
        blanks: [['losses'], ['big', 'bigger']],
        distractors: ['profits', 'small'],
      },
      {
        kind: 'findBug',
        prompt: 'Vikram\'s new plan. Which line still breaks Chapter 4?',
        lines: [
          'New money goes into a broad, low-cost spread monthly.',
          'Some exposure beyond India and beyond tech.',
          'Keep adding to my one stock "because it\'s cheap now".',
        ],
        bug: 2,
        fix: 'Don\'t add more to the one stock; spread new money.',
        explanation: 'Adding to a concentrated bet deepens the concentration.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a calm plan for Vikram.',
        lines: ['No panic decisions this week', 'Build an emergency fund', 'Spread new money broadly each month', 'Decide calmly about the one stock', 'Rebalance yearly'],
      },
      {
        kind: 'mcq',
        prompt: 'The scheme stopped paying and the group vanished. What kind of risk was that?',
        options: [
          { text: 'Fraud risk' },
          { text: 'Market risk', why: 'Markets didn\'t do this; people took the money.' },
          { text: 'Inflation risk', why: 'It was taken, not shrunk.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Joel\'s neighbour lost ₹8 lakh and his aunt ₹3 lakh. Total, in lakh?',
        answers: ['11', '11 lakh', 'eleven', '1100000', '11,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What saved Joel\'s ₹3 lakh?',
        options: [
          { text: 'Luck alone', why: 'His pause and checks did.' },
          { text: 'Pausing and checking before clicking' },
          { text: 'The scheme refunded him', why: 'He never paid in.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If someone you know lost money on one big bet, how would you help without saying "I told you so"?',
    starters: ['I\'d start by...', 'I\'d avoid...'],
  },
  notes: 'Chapter 4 challenge. 6L × 0.6 = 3.6L; recovery 6/3.6 − 1 ≈ 66.7%. Vikram, neighbour, aunt narrated. Cliffhanger: scheme collapse → Ch5 too good to be true.',
};

export default lesson;
