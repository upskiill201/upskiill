import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: "I need an app". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"I need an app"',
  summary: 'Clinton has a quote from a developer: 350,000 FCFA and six weeks for a WashDay app. Miracle has a cheaper plan: one WhatsApp post, Mama Rose, a borrowed bicycle and one weekend.',
  minutes: 11,
  outcomes: [
    'See why building first is the expensive way to test',
    'Plan a test you can run this weekend by hand',
    'Know what a test should prove',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Six weeks or one weekend',
      beats: [
        { speaker: 'clinton', text: 'A developer quoted 350,000 FCFA and six weeks for a WashDay app: booking, payments, tracking. Then we launch!' },
        { speaker: 'miracle', text: 'And if nobody books? You\'ve spent six weeks and most of your savings learning that.' },
        { speaker: 'clinton', text: 'So what do I do instead?' },
        { speaker: 'miracle', text: 'Test the riskiest card, "they\'ll pay me for pickup", this weekend. Post the offer in the hostel WhatsApp groups. Take payment on Mobile Money. Ask Mama Rose to wash. Borrow a bicycle. Do the rest by hand.' },
        { speaker: 'narrator', text: 'Mama Rose agrees to wash WashDay bags on Saturday for 1,000 FCFA each: "If you carry them up that hill, child, you can have them." Clinton\'s cousin lends him a bicycle.' },
        { speaker: 'tey', text: 'That\'s the idea of this chapter: before you build anything, find the cheapest way to see if people will actually pay. Often that\'s you, doing it by hand.' },
      ],
      choice: {
        prompt: 'What should Clinton do with the developer\'s quote?',
        options: [
          { text: 'Keep it for later, and test by hand this weekend first.', outcome: 'Right. If the test works, he\'ll know exactly what the app needs to do. If it fails, he\'s saved 350,000 FCFA.', best: true },
          { text: 'Accept it: a real business needs an app.', outcome: 'A real business needs customers first. The app can come once people pay.' },
          { text: 'Ask for a cheaper developer.', outcome: 'Cheaper building is still building before testing.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Before you build, ask: "What\'s the cheapest way to find out if people will pay for this?"',
    },
  ],
  apply: {
    scenario: 'Build or test?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the weekend test trying to prove?',
        options: [
          { text: 'That students will pay Clinton for laundry pickup' },
          { text: 'That Clinton can ride a bike', why: 'He knows that already; it\'s low risk.' },
          { text: 'That the app design is nice', why: 'There\'s no app yet; that\'s the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the weekend test, or building?',
        groups: ['Weekend test', 'Building'],
        items: [
          { text: 'A WhatsApp post in hostel groups', group: 0 },
          { text: 'A booking app with tracking', group: 1 },
          { text: 'Payment by Mobile Money', group: 0 },
          { text: 'A custom payment system', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The developer quoted 350,000 FCFA. Mama Rose washes a bag for 1,000 FCFA. How many bags could she wash for the cost of the app?',
        answers: ['350'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the piece of the test to who provides it.',
        pairs: [
          ['Washing', 'Mama Rose'],
          ['Bicycle', 'Clinton\'s cousin'],
          ['Payments', 'Mobile Money'],
          ['Finding customers', 'Hostel WhatsApp groups'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Doing it by hand feels unprofessional. Won\'t people laugh?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Customers care that their clothes come back clean and on time, not whether there\'s an app. Plenty of big companies started exactly like this.' },
          { text: 'Yes, wait until it\'s perfect.', why: 'Perfect costs six weeks and his savings.' },
          { text: 'Hide that it\'s you.', why: 'Be honest; customers don\'t mind a small start.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mama Rose\'s deal.',
        template: 'She washes each bag for [[1]] FCFA if Clinton [[2]] them up the hill.',
        blanks: [['1,000', '1000'], ['carries']],
        distractors: ['2,400', 'washes'],
      },
      {
        kind: 'mcq',
        prompt: 'Which risk does building the app first take?',
        options: [
          { text: 'Spending six weeks and 350,000 FCFA before knowing anyone will pay' },
          { text: 'None, apps always work', why: 'Apps nobody uses are very common.' },
          { text: 'Getting too many customers', why: 'Not the risk here.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s weekend plan.',
        lines: ['Post the offer in hostel groups', 'Take payments on Mobile Money', 'Collect bags on Saturday morning', 'Mama Rose washes', 'Return bags on Sunday evening'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Clinton\'s plan goes back to building first?',
        lines: [
          'Post the offer this week.',
          'Use Mobile Money for payments.',
          'Pay the developer a deposit, just in case.',
          'Collect and return the bags by hand.',
        ],
        bug: 2,
        fix: 'Wait on the developer until the test shows people pay.',
        explanation: 'The deposit spends money before the evidence.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Cheap to try this weekend, or expensive?',
        groups: ['Cheap', 'Expensive'],
        items: [
          { text: 'A borrowed bicycle', group: 0 },
          { text: 'Renting a shop with washing machines', group: 1 },
          { text: 'A WhatsApp post', group: 0 },
          { text: 'Six weeks of development', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would it cost to build your idea properly? What could you do by hand this weekend instead?',
    starters: ['Building would cost...', 'By hand, I could...'],
  },
  deepen: {
    title: 'Do things that don\'t scale',
    summary: 'A well-known startup saying: early on, do things by hand that couldn\'t possibly work at large size. It\'s how you learn what customers really need before you automate anything.',
  },
  notes: 'Fictional: developer quote 350,000 FCFA / six weeks; Mama Rose washes WashDay bags at 1,000 FCFA each. "Do things that don\'t scale": Paul Graham essay (2013).',
};

export default lesson;
