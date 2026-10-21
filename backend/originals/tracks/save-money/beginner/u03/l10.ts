import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: the system. Cliffhanger: fever. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the system',
  summary: 'Yaw finally asks for help: "Build me what you built." Design his saving system from scratch with everything from Chapter 3. Then week 9 begins, and Kofi wakes up shaking.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Design an automatic saving system for someone else', 'Use pay-yourself-first, distance, names and commitment together'],
  learn: [
    {
      kind: 'story',
      title: 'Yaw asks',
      beats: [
        { speaker: 'yaw', text: 'Okay. My sneaker fund has been raided nine times. Build me what you built.' },
        { speaker: 'kofi', text: 'First question: when does your money arrive?' },
        { speaker: 'yaw', text: 'My uncle sends GH₵1,800 on the 15th. My weekend job pays GH₵200 every Saturday.' },
        { speaker: 'narrator', text: 'Monday, week 9, 4 a.m. Kofi wakes up shivering under two blankets. His head is pounding. His whole body aches. By 6 a.m. he\'s burning hot.' },
        { speaker: 'efua', text: 'That\'s not a cold. Get dressed. We\'re going to the clinic.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: pay yourself first, keep savings out of reach, name the money, and tie your own hands. Now the system faces a real test. Chapter 4: the emergency. But first, Yaw\'s system.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Yaw\'s system. GH₵1,800 on the 15th; GH₵200 every Saturday from his weekend job.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When should Yaw\'s main saving move?',
        options: [
          { text: 'On the 15th, the day his uncle\'s money arrives' },
          { text: 'At the end of the month', why: 'By then, it\'s "save what\'s left". It won\'t be there.' },
          { text: 'Whenever he remembers', why: 'He raided his fund nine times. Memory isn\'t the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw saves 10% of the GH₵1,800 on the 15th. How much moves?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'His GH₵200 every Saturday is steady. What should happen to it?',
        options: [
          { text: 'A scheduled Saturday transfer of part of it, say GH₵50, to his goal pot' },
          { text: 'Spend it all, it\'s weekend money', why: 'Steady income can be automated too.' },
          { text: 'Keep it in his main wallet for later', why: 'Money that sits where you spend gets spent.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵180 a month plus GH₵50 every Saturday (4 Saturdays). Monthly total saved?',
        answers: ['380', 'GH₵380', '380 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which pots should Yaw have, and how reachable?',
        groups: ['Reachable within a day', 'With distance'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Sneaker fund', group: 1 },
          { text: 'Pay-later debt repayments fund', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Yaw\'s problems to a Chapter 3 fix.',
        pairs: [
          ['Raids after 10 p.m.', '24-hour rule'],
          ['Fund in his main wallet', 'Separate place'],
          ['"Savings 2"', 'A meaningful name'],
          ['Forgets to move money', 'Scheduled transfers'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Can I name the sneaker fund "Sneakers"? That\'s honest.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Honest, yes. Make it specific: "White high-tops for my birthday, March." Specific names are harder to raid.' },
          { text: 'No, sneakers aren\'t a real goal.', why: 'Any goal can be earmarked. Yaw\'s goal is his.' },
          { text: 'Call it "Savings".', why: 'Vague names get raided.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Yaw\'s draft system. Which line will fail?',
        lines: [
          'GH₵180 moves automatically on the 15th.',
          'GH₵50 every Saturday, scheduled.',
          'Sneaker fund kept in the same wallet as my food money.',
          '24-hour wait before withdrawals.',
        ],
        bug: 2,
        fix: 'Sneaker fund in a separate place, not linked to spending.',
        explanation: 'Mixed with food money, the fund gets spent on Thursdays.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'Pay yourself [[1]], keep savings out of [[2]], [[3]] the money, and tie your own hands.',
        blanks: [['first'], ['reach'], ['name']],
        distractors: ['last', 'spend'],
      },
      {
        kind: 'mcq',
        prompt: 'Yaw wants to keep his emergency fund in a locked account "so he can\'t touch it". Good idea?',
        options: [
          { text: 'No: emergencies can\'t wait. Separate and reachable within a day.' },
          { text: 'Yes, lock everything', why: 'A locked emergency fund fails when it\'s needed.' },
          { text: 'He doesn\'t need one', why: 'Everyone does. Kofi\'s is about to be tested.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Yaw\'s set-up.',
        lines: ['Move GH₵180 on the 15th', 'Schedule GH₵50 every Saturday', 'Name each pot', 'Remove spending links', 'Agree the 24-hour rule', 'Check after the first week'],
      },
      {
        kind: 'mcq',
        prompt: 'Week 9: Kofi is ill. Which pot should pay for the clinic?',
        options: [
          { text: 'The emergency fund' },
          { text: 'The laptop jar', why: 'That\'s exactly what the emergency fund exists to prevent.' },
          { text: 'A fast loan', why: 'He has GH₵300 for exactly this.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If a friend asked you "build me what you built", what would your system look like? Write it in five lines.',
    starters: ['1. Money moves on...', '2. To...', '3. Named...', '4. Rules...', '5. Reminder...'],
  },
  notes: 'Chapter 3 challenge. Yaw\'s income (fictional): uncle GH₵1,800 on the 15th; weekend job GH₵200/Saturday. 10% = 180; + 4 × 50 = 380/month. Cliffhanger: Kofi\'s fever, week 9 (malaria, Chapter 4).',
};

export default lesson;
