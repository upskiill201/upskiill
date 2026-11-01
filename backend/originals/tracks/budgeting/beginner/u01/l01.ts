import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: day 12, GH₵63 left. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'GH₵63',
  summary: 'Kofi\'s first month at university. Mum sent GH₵1,500 on the 1st. On day 12 he checks his balance: GH₵63. He hasn\'t bought anything big. So where did it go?',
  minutes: 11,
  outcomes: [
    'Meet Kofi, Yaw, Efua and Miracle',
    'See why "I don\'t know where it went" is the real problem',
    'Decide the first move when money runs short',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 12',
      beats: [
        { speaker: 'narrator', text: 'Kumasi, the first month of the semester. Kofi Mensah, 18, first-year Biomedical Engineering at KNUST, is buying kelewele outside his hall. The seller\'s mobile money prompt pops up on his phone.' },
        { speaker: 'narrator', text: 'Under it, his balance. GH₵63.' },
        { speaker: 'kofi', text: 'Sixty-three? Mum sent GH₵1,500 on the 1st. It\'s the 12th. I haven\'t bought anything big. Not one thing.' },
        { speaker: 'yaw', text: 'Chale, relax. Money comes, money goes. Come, I\'ll buy you a Malta.' },
        { speaker: 'narrator', text: 'Yaw Boateng, his roommate from Takoradi. New sneakers every other week. Buys kelewele for the whole corridor. Still owes Kofi GH₵200 from day 3.' },
        { speaker: 'kofi', text: 'Eighteen days left. GH₵63. That\'s... GH₵3.50 a day.' },
        { speaker: 'narrator', text: 'His phone buzzes. A voice note from Mum, recorded at her cloth stall in Makola Market, Accra. Traffic and trading in the background.' },
        { speaker: 'narrator', text: '"Kofi. You are settling well? Study hard, eh. How is the money holding?"' },
        { speaker: 'tey', text: 'Right. This is a missing-money case, and you and I are the detectives. Nothing big was bought, and still GH₵1,437 vanished in twelve days. By the end of this chapter, we\'ll know exactly where it went.' },
      ],
      choice: {
        prompt: 'What should Kofi do first?',
        options: [
          { text: 'Find out exactly where the GH₵1,437 went.', outcome: 'Yes. You can\'t fix a leak you can\'t see. Any plan he makes without this is a guess.', best: true },
          { text: 'Ask Mum for more money tonight.', outcome: 'Maybe later, but more money poured into the same leaks disappears the same way. And he still won\'t know why.' },
          { text: 'Wait for Yaw to pay back the GH₵200.', outcome: 'That helps a little, if it comes. It doesn\'t explain the other GH₵1,237.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring your own money to this course: an allowance, a salary, side-hustle money, whatever comes in. Every lesson ends by turning the idea onto yours.',
    },
  ],
  apply: {
    scenario: 'The case of the missing cedis.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Mum sent GH₵1,500. Kofi has GH₵63 left. How many cedis are missing?',
        answers: ['1437', '1,437', 'GH₵1,437', 'GH₵1437', '1437 cedis'],
        placeholder: 'A number',
        explanation: '1,500 − 63 = 1,437. That\'s the case.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to who they are.',
        pairs: [
          ['Kofi', 'First-year student with GH₵63 left'],
          ['Yaw', 'Generous roommate who owes GH₵200'],
          ['Mum', 'Sends money from her stall in Makola'],
          ['Tey', 'Your partner on the case'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is Kofi\'s real problem right now?',
        options: [
          { text: 'He spent GH₵1,437 on one big thing', why: 'He didn\'t buy anything big. That\'s what makes it a mystery.' },
          { text: 'He doesn\'t know where his money went' },
          { text: 'Mum didn\'t send enough', why: 'Maybe, maybe not. He can\'t tell until he knows where it went.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'GH₵63 for 18 days is about how much a day?',
        options: [
          { text: 'GH₵10', why: '18 × 10 = 180. He has 63.' },
          { text: 'GH₵6', why: '18 × 6 = 108. Still too much.' },
          { text: 'GH₵3.50' },
        ],
        answer: 2,
        explanation: '63 ÷ 18 = 3.5. Not enough for one plate of food a day.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of these is a fact Kofi knows, and which is a guess?',
        groups: ['Fact', 'Guess'],
        items: [
          { text: 'GH₵1,500 came in on the 1st', group: 0 },
          { text: '"I didn\'t really spend much"', group: 1 },
          { text: 'Yaw owes him GH₵200', group: 0 },
          { text: '"It must be the food"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Chale, money comes, money goes. Why are you stressing?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Because I have GH₵63 for 18 days and no idea where GH₵1,437 went. I need to find out.' },
          { text: 'You\'re right, I\'ll stop thinking about it.', why: 'Ignoring it means day 12 happens again next month.' },
          { text: 'Because you owe me GH₵200 and it\'s all your fault.', why: 'Yaw owes him GH₵200, not GH₵1,437. Blaming one person skips the real search.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The detective\'s rule.',
        template: 'You can\'t fix a [[1]] you can\'t [[2]].',
        blanks: [['leak'], ['see']],
        distractors: ['friend', 'pay'],
      },
      {
        kind: 'findBug',
        prompt: 'Kofi\'s plan for next month. Which line will cause day 12 to happen again?',
        lines: [
          'Mum sends GH₵1,500 on the 1st.',
          'I spend it the same way as this month.',
          'I check my balance only when a payment fails.',
          'I hope it lasts.',
        ],
        bug: 2,
        fix: 'Check where the money is going every week, before it runs out.',
        explanation: 'Checking only when it\'s gone means finding out on day 12 again. Spending "the same way" is a problem too, but he can\'t change it until he can see it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the detective\'s steps for this case.',
        lines: ['Find out what came in', 'Find every payment that went out', 'Group the payments', 'Find the biggest leaks', 'Then make a plan'],
      },
      {
        kind: 'mcq',
        prompt: 'Mum asks, "How is the money holding?" Which answer is honest without panicking her?',
        options: [
          { text: '"It\'s fine, Mum."', why: 'It isn\'t, and he knows it. Small lies about money tend to grow.' },
          { text: '"Please send GH₵1,000 more, it\'s an emergency."', why: 'He doesn\'t know what\'s going on yet, so he can\'t say what he needs.' },
          { text: '"It\'s going faster than I planned. I\'m working out why, and I\'ll tell you what I find."' },
        ],
        answer: 2,
        explanation: 'Honest, calm, and it buys him time to solve the case. Whether Kofi actually says it is another story.',
      },
    ],
  },
  reflect: {
    prompt: 'Think about your last month. If someone asked you where your money went, how much of it could you explain without checking?',
    starters: ['I could explain about...', 'The part I\'m not sure about is...'],
  },
  deepen: {
    title: 'You\'re not bad with money',
    summary: 'Running out before the end of the month is one of the most common money experiences there is, at every income level. It\'s rarely about one big mistake. It\'s about not being able to see the money while it\'s moving. This course fixes the seeing first.',
  },
  notes: 'Story numbers are fictional: allowance GH₵1,500 by mobile money on the 1st; day 12 balance GH₵63; GH₵1,437 spent; 18 days left = GH₵3.50/day. Setting: KNUST, Kumasi, Ghana. Kofi per CAST.md (after Study Smarter with AI); Yaw Boateng new course-only character (Takoradi); Mum narrated, sells cloth at Makola Market, Accra. "Chale" = Ghanaian slang for friend. Malta = popular malt drink.',
};

export default lesson;
