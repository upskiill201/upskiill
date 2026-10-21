import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: your own savings plan. Cliffhanger: money coming in, ads everywhere. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: your own plan',
  summary: 'The shop in Adum, the first day of next semester. Yaw haggles, Kofi pays in cash, and the programming lab gets one more laptop. Then your turn: a complete savings plan for your own goal. And in Kofi\'s pocket, his phone buzzes. And buzzes.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Build a complete savings plan for your own goal', 'Use every tool from the course together', 'Start saving this week'],
  learn: [
    {
      kind: 'story',
      title: 'Adum, 9 a.m.',
      beats: [
        { speaker: 'narrator', text: 'A computer shop in Adum, Kumasi. Efua\'s brother found it: the same spec as the department\'s list, a better battery, GH₵3,200.' },
        { speaker: 'yaw', text: 'Boss, GH₵3,200? For a student? Look at his face. Cash, today. GH₵2,800.' },
        { speaker: 'narrator', text: 'Twenty minutes of laughing, sighing and walking towards the door later: GH₵2,850.' },
        { speaker: 'narrator', text: 'Kofi counts it out. The shopkeeper checks it. Hands him the bag.' },
        { speaker: 'kofi', text: 'Paid in full. No payments. No loans. GH₵30 left, and the emergency fund is full.' },
        { speaker: 'narrator', text: 'He sends Mum a photo. Her reply: a voice note of the whole Makola row cheering.' },
        { speaker: 'narrator', text: 'That afternoon, the beat orders keep coming. GH₵150, GH₵150, GH₵200. For the first time in his life, money is coming in every week.' },
        { speaker: 'narrator', text: 'And on his phone, between the orders: "Flash sale! 70% off boots! 3 left!" "You deserve this." "Buy now, pay later."' },
        { speaker: 'tey', text: 'That\'s the course: emergency fund first, find the leaks, make it automatic, protect it, earn a little more, and keep the habit. Next, in How to Stop Impulse Buying: what happens when the money comes in, and everything on your phone wants it. First, your final challenge.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge. Practise on Ama (23, phone shop, Accra, GH₵2,400 take-home) who wants GH₵2,000 for a short course in 20 weeks. Then build your own.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ama\'s savings plan.',
        lines: ['Name and price the goal', 'Build a starter emergency fund', 'Work out the weekly target', 'Hunt for leaks', 'Automate the saving', 'Plan milestones and rewards'],
      },
      {
        kind: 'mcq',
        prompt: 'Ama has GH₵0 saved. What comes first?',
        options: [
          { text: 'A small emergency fund, then the course goal' },
          { text: 'All money straight to the course', why: 'One emergency would then wipe out her course money.' },
          { text: 'A loan for the course', why: 'Saving first costs far less.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ama needs GH₵2,000 in 20 weeks. What\'s the weekly target?',
        answers: ['100', 'GH₵100', '100 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Ama\'s spending: leak or choice?',
        groups: ['Leak', 'Choice'],
        items: [
          { text: 'A video app she hasn\'t opened in 2 months', group: 0 },
          { text: 'Sunday lunch with her grandmother', group: 1 },
          { text: 'Daily small cash-outs', group: 0 },
          { text: 'Her weekly dance class', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Ama keeps forgetting to move her savings on payday. What should she do?',
        prompt: 'Your best advice?',
        options: [
          { text: 'Schedule an automatic transfer on payday into a separate, named pot. Then forgetting doesn\'t matter.' },
          { text: 'Try harder to remember.', why: 'Memory fails. Systems don\'t need it.' },
          { text: 'Save at the end of the month instead.', why: 'That\'s "save what\'s left".' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'In week 8, Ama\'s phone is stolen. Replacement: GH₵400. Where should it come from?',
        options: [
          { text: 'Her emergency fund, then refill it' },
          { text: 'The course pot', why: 'That\'s exactly what the emergency fund protects.' },
          { text: 'A 5-minute loan', why: 'She has a fund for this.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ama gets a GH₵600 bonus. She splits two-thirds to the course. How much?',
        answers: ['400', 'GH₵400', '400 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the course tool.',
        pairs: [
          ['The goal feels impossible', 'Weekly target and a tracker'],
          ['Money leaks away', 'The leak hunt'],
          ['Forgetting to save', 'Automatic transfers'],
          ['An emergency', 'The emergency fund'],
          ['Boredom in week 12', 'Milestones and rewards'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ama\'s draft plan. Which line will break it?',
        lines: [
          'Emergency fund: GH₵400, separate.',
          'Course pot: GH₵100 a week, automatic on payday.',
          'Rewards at GH₵500, GH₵1,000, GH₵1,500, from the fun line.',
          'If I\'m short on lunch money, I\'ll take from the course pot.',
        ],
        bug: 3,
        fix: 'If I\'m short on lunch money, I rebalance my budget lines.',
        explanation: 'A goal pot that pays for everyday shortfalls never fills.',
      },
      {
        kind: 'mcq',
        prompt: 'Ama reaches GH₵2,000. What should happen to her GH₵100 a week?',
        options: [
          { text: 'Redirect it the next day: emergency fund, next goal, a bit more fun' },
          { text: 'Stop it: the goal is done', why: 'The habit is the real prize.' },
          { text: 'Spend it on a celebration every week', why: 'One celebration, planned. Then redirect.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'Emergency fund [[1]], find the [[2]], make it [[3]], protect it, earn a little [[4]], and keep the [[5]].',
        blanks: [['first'], ['leaks'], ['automatic'], ['more'], ['habit']],
        distractors: ['last', 'loan'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s phone is now full of sales and "pay later" offers. Why might that be a new risk?',
        options: [
          { text: 'With money coming in weekly, impulse spending can quietly undo the habit' },
          { text: 'It isn\'t; ads don\'t work', why: 'Ads are designed by experts to work.' },
          { text: 'Because sales are always scams', why: 'Not always. But they\'re built to make you buy now.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Your project: write your own savings plan on one page. Goal (exact thing, price, date), emergency fund, weekly target, two leaks to plug, your automatic transfer, three milestones. Then set up the transfer this week. What\'s your goal?',
    starters: ['My goal:...', 'Weekly target:...', 'My automatic transfer:...', 'Milestones:...'],
  },
  deepen: {
    title: 'Your project, step by step',
    summary: 'Tonight: name and price your goal and set the date (Ch1). Put aside a starter emergency fund. Hunt three months of history for leaks (Ch2). Schedule the transfer for payday and name the pot (Ch3). Write your emergency rules (Ch4). Pick milestones and rewards, and write a letter from future-you (Ch5).',
  },
  notes: 'Final challenge. Kofi\'s purchase per running numbers. Ama practice persona (from Budgeting final). New beat orders (150, 150, 200) and ads set up Course 3 (How to Stop Impulse Buying: "Kofi vs the Cart", opening 2:14 a.m. boots after the inter-hall final).',
};

export default lesson;
