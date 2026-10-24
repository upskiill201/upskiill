import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: Cape Coast. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Cape Coast',
  summary: 'Yaw\'s birthday trip: beach, castle, GH₵250. Kofi\'s whole fun line for the month is GH₵120. Say yes and wreck the plan? Say no and miss his roommate\'s birthday? There\'s a third way.',
  minutes: 12,
  outcomes: [
    'Handle a big social cost without abandoning the budget',
    'Move money between lines on purpose',
    'Look for the cheaper version of an invitation',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Who\'s in?',
      beats: [
        { speaker: 'yaw', text: 'Two nights in Cape Coast. Bus, guesthouse, the castle, fish at the beach. GH₵250 each. Kofi, you\'re in, right? You\'re my roommate!' },
        { speaker: 'narrator', text: 'Kofi opens his sheet. Fun: GH₵30 a week, GH₵120 for the month. Surprises: GH₵150, untouched. Savings: GH₵200, untouched.' },
        { speaker: 'kofi', text: 'I could take it from savings. It\'s just sitting there...' },
        { speaker: 'efua', text: 'Or you could ask Yaw if there\'s a cheaper way to be there for his birthday.' },
        { speaker: 'tey', text: 'This is where most budgets die. Not from a crisis, but from a fun invitation from someone you love. Let\'s see the options.' },
      ],
      choice: {
        prompt: 'What does Kofi do?',
        options: [
          { text: 'Go for two nights and pay GH₵250 from savings.', outcome: 'He\'d have a great weekend, and his savings would be gone in week 2. Worse, it teaches him that savings are just fun money with a delay. Next invitation, same thing.' },
          { text: 'Say no and stay in Kumasi.', outcome: 'The budget survives. But it\'s Yaw\'s birthday, and Yaw notices. Sometimes "no" is right. Here there\'s a better option.' },
          { text: 'Go for the Saturday only: shared trotro, castle and the beach, back the same night. About GH₵120, paid from fun and clothes, on purpose.', outcome: 'Yes. He\'s there for the birthday, sees the castle, eats the fish, and his savings and surprises stay untouched. He moves GH₵90 from the next three weeks of fun and GH₵30 from clothes, and writes it down.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before yes or no, ask: is there a cheaper version of this I\'d still enjoy? A day instead of a weekend, one meal instead of three, the party but not the after-party.',
    },
  ],
  apply: {
    scenario: 'Yaw\'s birthday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is taking GH₵250 from savings a bad idea?',
        options: [
          { text: 'Because trips are a waste', why: 'Trips can be wonderful. The problem is where the money comes from.' },
          { text: 'It wipes out savings in week 2 and makes savings feel like delayed fun money' },
          { text: 'Because Yaw might cancel', why: 'Possible, but not the real issue.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The day trip costs GH₵120. Kofi moves GH₵90 from fun. How much more does he need from clothes?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine to move money from, for a fun trip, or keep untouched?',
        groups: ['Fine to move from', 'Keep untouched'],
        items: [
          { text: 'Fun line', group: 0 },
          { text: 'Savings', group: 1 },
          { text: 'Haircut and clothes', group: 0 },
          { text: 'Food staples', group: 1 },
          { text: 'Surprises', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Saturday only? Chale, the party is Saturday night!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Fine, I\'ll take it from savings.', why: 'One push and the plan folds. A friendly, firm answer works better.' },
          { text: 'I\'m there all day for the castle, the beach and your birthday lunch. The night bus back is on me, the night is on you.' },
          { text: 'Forget it then, I\'m not coming.', why: 'He\'d lose the birthday over one evening. The day trip still works.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s question before yes or no.',
        template: 'Is there a [[1]] version of this I\'d still [[2]]?',
        blanks: [['cheaper'], ['enjoy']],
        distractors: ['bigger', 'regret'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the invitation to a cheaper version.',
        pairs: [
          ['A weekend trip', 'A day trip'],
          ['Dinner out with ten friends', 'Join for dessert only'],
          ['A concert and after-party', 'The concert only'],
          ['New outfit for the event', 'Borrow or rewear one'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Kofi\'s moves is the mistake?',
        lines: [
          'Move GH₵90 from fun (weeks 2 to 4).',
          'Move GH₵30 from haircut and clothes.',
          'Don\'t write it down; I\'ll remember.',
        ],
        bug: 2,
        fix: 'Write the moves on the sheet straight away.',
        explanation: 'Unwritten moves are how a plan quietly stops matching reality.',
      },
      {
        kind: 'mcq',
        prompt: 'After the trip, Kofi\'s fun line for weeks 2 to 4 is GH₵0. What should he expect?',
        options: [
          { text: 'A quiet three weeks for fun, which he chose on purpose' },
          { text: 'He can still spend GH₵30 a week', why: 'He moved that money to the trip.' },
          { text: 'The plan is ruined', why: 'The plan changed on purpose. That\'s it working.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a big invitation.',
        lines: ['Check the plan', 'Look for a cheaper version', 'Choose which lines to move from', 'Write the moves down', 'Enjoy it'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest lesson of Cape Coast?',
        options: [
          { text: 'Never go on trips while on a budget', why: 'He went. On purpose, at a price that fit.' },
          { text: 'Savings are there for fun emergencies', why: 'A birthday isn\'t an emergency.' },
          { text: 'A budget can bend for life, as long as you move money on purpose' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an invitation coming up. What\'s the cheaper version you\'d still enjoy, and which line would pay for it?',
    starters: ['Coming up:...', 'Cheaper version:...', 'Paid from:...'],
  },
  deepen: {
    title: 'Plan for the season, not just the month',
    summary: 'Birthdays, weddings, festivals and holidays cluster. Look at the next three months and list the ones you already know about. Chapter 4, lesson 2 shows how to save for them a little at a time.',
  },
  notes: 'Fictional: weekend GH₵250; day trip ~GH₵120 (shared trotro, castle entrance, beach lunch, night bus back). Funded: fun weeks 2–4 (3 × 30 = 90) + 30 from haircut/clothes (100 → 70). Cape Coast Castle is a real UNESCO World Heritage site (Ghana Museums and Monuments Board); no ticket price stated.',
};

export default lesson;
