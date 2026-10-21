import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: fever, and who pays. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Fever',
  summary: 'Week 9. The clinic\'s test is positive: malaria. Treatment is quick and works, but the visit, tests and medicine not covered come to GH₵280. Three places the money could come from. You choose.',
  minutes: 12,
  outcomes: [
    'Pay for a real emergency from the right place',
    'See what an emergency fund protects',
    'Stay calm about money when you\'re unwell',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The clinic',
      beats: [
        { speaker: 'narrator', text: 'The campus clinic, 7 a.m. A finger-prick test. Twenty minutes later: malaria, caught early. The nurse explains the medicine and says to rest and drink plenty.' },
        { speaker: 'narrator', text: 'Student health cover pays part of it. The rest, for the visit, extra tests and the medicine not covered: GH₵280.' },
        { speaker: 'kofi', text: 'GH₵280. Today.' },
        { speaker: 'efua', text: 'Don\'t think. Just tell me where it\'s coming from.' },
        { speaker: 'narrator', text: 'On his phone, three places. The laptop jar: GH₵1,260. The emergency fund: GH₵300. And an ad, as if it knew: "Medical bills? Get cash in 5 minutes."' },
        { speaker: 'tey', text: 'This is the moment Miracle built the emergency fund for. Pick.' },
      ],
      choice: {
        prompt: 'Where should the GH₵280 come from?',
        options: [
          { text: 'The emergency fund.', outcome: 'Yes. This is exactly its job: urgent, necessary, unexpected. The laptop jar doesn\'t move a cedi. Kofi pays, takes his medicine and sleeps for most of two days.', best: true },
          { text: 'The laptop jar: it has more in it.', outcome: 'It would work today, and push the laptop GH₵280 further away. The emergency fund exists so this never has to happen.' },
          { text: 'The 5-minute cash ad.', outcome: 'He\'d pay fees on money he already has, at the moment he\'s least able to read small print. Never borrow for something your emergency fund can cover.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Health first. If you think you might have malaria or any serious illness, get tested and treated quickly. Money decisions can wait an hour; health can\'t.',
    },
  ],
  apply: {
    scenario: 'Week 9, the clinic.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Emergency fund GH₵300, clinic bill GH₵280. How much is left in the fund?',
        answers: ['20', 'GH₵20', '20 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is malaria treatment an emergency-fund cost?',
        options: [
          { text: 'It\'s urgent, necessary and unexpected' },
          { text: 'Because it\'s expensive', why: 'Size isn\'t the test. The three questions are.' },
          { text: 'It isn\'t; it should come from the laptop jar', why: 'The jar is for the planned laptop.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place to pay from, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'The emergency fund', group: 0 },
          { text: 'The laptop jar', group: 1 },
          { text: 'A 5-minute loan app', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Should I take a loan so I don\'t touch the emergency fund?',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'You built that fund for today. Use it. That\'s not failure, that\'s the plan working.' },
          { text: 'Yes, protect the fund.', why: 'Borrowing so as not to use an emergency fund in an emergency costs fees for nothing.' },
          { text: 'Use the laptop jar instead.', why: 'Then the laptop slips, and the fund sits unused.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three questions.',
        template: 'Is it [[1]], [[2]] and unexpected?',
        blanks: [['urgent'], ['necessary']],
        distractors: ['fun', 'cheap'],
      },
      {
        kind: 'mcq',
        prompt: 'The ad appeared right when Kofi needed money. What should that make him think?',
        options: [
          { text: 'Ads target moments of stress; that\'s a reason to slow down, not to tap' },
          { text: 'It\'s a sign', why: 'It\'s targeting, not fate.' },
          { text: 'Ads are always helpful', why: 'They\'re designed to sell, especially in stressful moments.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Emergency fund', 'Laptop untouched, plan intact'],
          ['Laptop jar', 'Laptop GH₵280 further away'],
          ['Loan app', 'Fees on money he already has'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is unhelpful while Kofi is ill?',
        lines: [
          'Get tested and treated today.',
          'Pay from the emergency fund.',
          'Wait a few days to see if it passes, to save money.',
        ],
        bug: 2,
        fix: 'Get tested and treated today; the fund covers it.',
        explanation: 'Delaying treatment to save money can cost far more, in health and money.',
      },
      {
        kind: 'mcq',
        prompt: 'How does Kofi feel paying the GH₵280?',
        options: [
          { text: 'Calm: the money was there for exactly this' },
          { text: 'Panicked', why: 'Month 1 Kofi would have been. Now he has a fund.' },
          { text: 'Guilty', why: 'Using a fund for its purpose isn\'t something to feel guilty about.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If the GH₵280 had come from the laptop jar (GH₵1,260), what would be left in the jar?',
        answers: ['980', 'GH₵980', '980 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If a GH₵280-sized emergency happened to you tomorrow, where would the money come from?',
    starters: ['It would come from...', 'I\'d like it to come from...'],
  },
  deepen: {
    title: 'Malaria: test and treat early',
    summary: 'The World Health Organization recommends confirming suspected malaria with a test and treating it promptly. Fever, chills, headache and body aches are common early signs. If you live in or travel to a malaria area, don\'t wait it out.',
  },
  notes: 'Story numbers (fictional): clinic bill GH₵280 after student health cover. EF 300 → 20. Health info: WHO malaria guidance (test before treat; prompt treatment). Kept non-clinical; no drug names (playbook §9 health guidance).',
};

export default lesson;
