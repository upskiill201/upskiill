import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: the long game. Ending. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: Chidi\'s long game',
  summary: 'Chidi, the friend whose raise disappeared, asks Miracle to help him build his own 40-year map. Use everything from the whole course. Then, a year after that first phone call, Dad calls again.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Build a full long-term plan for someone else', 'Use every habit from the course'],
  learn: [
    {
      kind: 'story',
      title: 'A year later',
      beats: [
        { speaker: 'chidi', text: 'I want what you\'ve got. Not the money. The calm.' },
        { speaker: 'miracle', text: 'Then let\'s start where I started. Your net worth. Don\'t worry, it\'s only a number.' },
        { speaker: 'narrator', text: 'A year after the first call, Sunday evening, Dad again. Behind him, the noise of teenagers packing up maths books.' },
        { speaker: 'narrator', text: '"Twelve students now. And guess what. I opened savings accounts for your two little cousins. Small amounts, every month. I told them: don\'t wait for next year."' },
        { speaker: 'miracle', text: 'Dad. That\'s the whole course.' },
        { speaker: 'tey', text: 'Net worth, paying future you first, compounding, the gap, and the long game. Habits in your twenties decide your sixties, and sometimes they reach your cousins too. Now, Chidi\'s map.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: Chidi, 28. Take-home ₦800,000. Spends ₦790,000. Savings ₦150,000. Car loan ₦2,400,000 left at 28%. Workplace pension he has never checked. Sends money to his mum "whenever she asks".',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Chidi\'s net worth: ₦150,000 savings − ₦2,400,000 car loan (ignore the pension for now). What is it?',
        answers: ['-2250000', '−2,250,000', '-2,250,000', '−2250000', '-₦2,250,000', '−₦2,250,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Chidi\'s first steps.',
        lines: ['Work out his net worth', 'Check his pension statement', 'Build a small emergency buffer', 'Attack the car loan', 'Automate saving on payday'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the car loan come before investing?',
        options: [
          { text: 'Cars are investments', why: 'Cars lose value.' },
          { text: 'At 28% it grows faster than his investments are likely to' },
          { text: 'It doesn\'t', why: 'Expensive debt first.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'For Chidi: keep doing, or change?',
        groups: ['Keep doing', 'Change'],
        items: [
          { text: 'Supporting his mum', group: 0 },
          { text: 'Sending money "whenever she asks"', group: 1 },
          { text: 'Never checking his pension', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I only have ₦10,000 left each month. I can\'t save.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then don\'t bother.', why: 'Starting small is still starting.' },
          { text: 'Cut everything.', why: 'Drastic cuts rarely last.' },
          { text: 'Start with the ₦10,000, automatically. And next raise, half goes to saving. That\'s how I went from 13% to 28%.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Chidi\'s savings rate now: ₦10,000 ÷ ₦800,000, in percent? (One decimal place.)',
        answers: ['1.25', '1.3', '1.25%', '1.3%'],
        placeholder: 'A percent',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each chapter to its habit for Chidi.',
        pairs: [
          ['Chapter 1: time', 'Start now, even small'],
          ['Chapter 2: future you', 'Automate saving on payday'],
          ['Chapter 3: compounding', 'Clear the 28% loan'],
          ['Chapter 4: the gap', 'Half of every raise'],
          ['Chapter 5: the long game', 'A fixed family pot and a falls page'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chidi\'s family plan.',
        template: 'A [[1]] family pot each month, given as [[2]].',
        blanks: [['fixed'], ['gifts']],
        distractors: ['random', 'loans'],
      },
      {
        kind: 'findBug',
        prompt: 'Chidi\'s draft map. Which line will undo the rest?',
        lines: [
          'Save ₦10,000 automatically from this payday.',
          'Pay extra on the car loan every month.',
          'When the loan is done, take a bigger one for a newer car.',
        ],
        bug: 2,
        fix: 'When the loan is done, split its old repayment: half saving, half life.',
        explanation: 'A new status loan restarts the trap.',
      },
      {
        kind: 'mcq',
        prompt: 'A year from now, markets fall 20%. What does Chidi\'s map tell him to do?',
        options: [
          { text: 'Sell everything', why: 'His page says no panic selling.' },
          { text: 'Read his falls page, keep saving, review quarterly' },
          { text: 'Stop saving', why: 'His page says keep going.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rule of 72: the car loan at 28% would double in about how many years if he never paid it? (Round to the nearest year.)',
        answers: ['3', 'three', '2.6'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Dad do for Miracle\'s cousins?',
        options: [
          { text: 'Gave them his pension', why: 'He started small savings for them.' },
          { text: 'Nothing', why: 'He passed the habit on.' },
          { text: 'Opened small monthly savings for them' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What is this whole course really about?',
        options: [
          { text: 'Small habits, kept for decades, that you control' },
          { text: 'Finding the best investment', why: 'No tips here: it\'s about habits.' },
          { text: 'Earning a huge salary', why: 'It\'s about the gap and time.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished Miracle\'s Long Game. Which habit will you start this week, and who might you pass it on to?',
    starters: ['This week I\'ll...', 'I\'d pass it on to...'],
  },
  notes: 'Final challenge (xp 30). Chidi per CAST. 150,000 − 2,400,000 = −2,250,000 (a mirror of Miracle\'s starting ₦2,250,000, positive). 10,000/800,000 = 1.25%. Ending: Dad tutoring 12 students, savings for cousins.',
};

export default lesson;
