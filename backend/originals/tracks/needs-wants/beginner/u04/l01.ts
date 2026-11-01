import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: the car. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The car',
  summary: 'A shiny silver car, ₦150,000 a month, "no more buses in the rain". Ada has wanted a car since she was 15. Is this a need, a want, or something else? You decide.',
  minutes: 12,
  outcomes: [
    'See that big decisions need the full cost, not the monthly price',
    'Weigh a long-held want against current goals',
    'Choose with numbers, not excitement',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Silver',
      beats: [
        { speaker: 'narrator', text: 'The car sits outside the gate. Clean, air-conditioned, the kind Ada used to point at from the danfo window when she was 15.' },
        { speaker: 'ada', text: 'I\'d save ₦55,000 on transport. So really it\'s only ₦95,000 extra a month.' },
        { speaker: 'narrator', text: 'Ngozi hands her a piece of paper. "My uncle drives in Lagos. These are his costs."' },
        { speaker: 'narrator', text: 'Fuel: ₦90,000 a month in Lagos traffic. Insurance: ₦15,000 a month. Servicing and repairs: about ₦30,000 a month on average. Parking and fines: ₦10,000. Plus the ₦150,000 payment.' },
        { speaker: 'ada', text: '...That\'s ₦295,000 a month. More than half my salary.' },
        { speaker: 'tey', text: 'Big decisions hide their real cost in the running costs. Ada wants this car, and that\'s fine to admit. But what should she do?' },
      ],
      choice: {
        prompt: 'What should Ada decide?',
        options: [
          { text: 'Take the car: she\'s wanted one since she was 15.', outcome: 'A real dream, at ₦295,000 a month. Mexico disappears, saving goes to zero, and one big repair would mean debt. The dream becomes a weight.' },
          { text: 'Say no to this car now, and write "my own car" as a future goal with a real number.', outcome: 'Yes. She doesn\'t pretend she doesn\'t want it. She just sees it doesn\'t fit this year, and gives it a proper place on her goals list for later.', best: true },
          { text: 'Take the car and drive for ride-hailing on weekends to pay for it.', outcome: 'It could earn something, but it turns her weekends into work, adds wear and fuel, and still might not cover ₦295,000. A side hustle should be chosen on its own merits, not to rescue a purchase.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'For big purchases, add every running cost before deciding. The monthly payment is usually the smallest surprise.',
    },
  ],
  apply: {
    scenario: 'The car.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Payment ₦150,000 + fuel ₦90,000 + insurance ₦15,000 + repairs ₦30,000 + parking ₦10,000. Total a month?',
        answers: ['295000', '295,000', '₦295,000', '₦295000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Ada spends ₦55,000 on transport now. How much more would the car cost each month?',
        options: [
          { text: '₦95,000 more', why: 'That forgets fuel, insurance, repairs and parking.' },
          { text: '₦240,000 more' },
          { text: '₦150,000 more', why: 'Only the payment. Running costs add much more.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Payment, or running cost?',
        groups: ['Payment', 'Running cost'],
        items: [
          { text: '₦150,000 a month to Emeka-Obi', group: 0 },
          { text: 'Fuel', group: 1 },
          { text: 'Insurance', group: 1 },
          { text: 'Repairs and servicing', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But I\'ve wanted a car since I was 15!',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Then buy it.', why: '₦295,000 a month doesn\'t fit this year.' },
          { text: 'Forget about cars.', why: 'It\'s a real want; give it a place.' },
          { text: 'Then make it a real goal with a number and a date, for when it fits. Wanting it doesn\'t mean now.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule for big purchases.',
        template: 'Add every [[1]] cost. The monthly [[2]] is usually the smallest surprise.',
        blanks: [['running'], ['payment']],
        distractors: ['hidden', 'saving'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each running cost to its amount.',
        pairs: [
          ['Fuel', '₦90,000'],
          ['Repairs and servicing', '₦30,000'],
          ['Insurance', '₦15,000'],
          ['Parking and fines', '₦10,000'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s first calculation was wrong?',
        lines: [
          'Car payment: ₦150,000.',
          'Transport saved: ₦55,000.',
          'So the car costs only ₦95,000 extra.',
        ],
        bug: 2,
        fix: 'Add fuel, insurance, repairs and parking: about ₦240,000 extra.',
        explanation: 'She compared the payment with transport and forgot every running cost.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "write it as a future goal" do?',
        options: [
          { text: 'It honours the want, without letting it wreck this year\'s plan' },
          { text: 'It means never buying a car', why: 'It means buying one when it fits.' },
          { text: 'It\'s pointless', why: 'Goals with numbers actually happen.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '₦295,000 of Ada\'s ₦480,000 salary. About what percent? (Round to the nearest whole number.)',
        answers: ['61', '61%', '61 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to decide on a big purchase.',
        lines: ['Admit how much you want it', 'Find the total cost', 'Add every running cost', 'Compare with your goals', 'Decide: now, later, or never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something big you\'ve wanted for years. What would it really cost each month, running costs included?',
    starters: ['I\'ve wanted...', 'Every month it would cost...'],
  },
  deepen: {
    title: 'Total cost of ownership',
    summary: 'Businesses use "total cost of ownership" to compare big purchases: price, plus everything it costs to run, fix and eventually replace. For cars, phones, even pets, it\'s often double or more the sticker price.',
  },
  notes: 'Car running costs in Lagos (fictional, illustrative; fuel prices volatile): fuel 90,000, insurance 15,000, repairs 30,000 avg, parking/fines 10,000. Total 295,000/month = 61% of 480,000. Ada\'s current transport 55,000.',
};

export default lesson;
