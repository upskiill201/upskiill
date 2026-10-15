import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Myth or Fact: business-model letters — B2B, B2C, D2C, SaaS — and the elusive "what does Synergix do?". */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'B2B, B2C and SaaS',
  summary: 'At lunch, Zanele asks Remi the question nobody can answer: "So what does Synergix actually DO?" Remi says "B2B logistics solutions." Zanele says "Which means?" Silence.',
  minutes: 11,
  outcomes: [
    'Decode B2B, B2C, D2C and SaaS',
    'Describe who a business sells to, in plain words',
    'Bust a few myths about business models',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"B2B" means a business that sells to other businesses.', isFact: true, explain: 'Business to business. Synergix moves goods for shops and factories, not for individual people.' },
        { text: '"B2C" means a business that sells mainly to companies.', isFact: false, explain: 'B2C = business to consumer: selling to ordinary people. A supermarket, a phone network, a food app.' },
        { text: '"SaaS" means software you rent online, usually by subscription, instead of buying and installing it.', isFact: true, explain: 'Software as a service. Email services, accounting apps, and Teyro itself all work this way.' },
        { text: 'A company can be both B2B and B2C.', isFact: true, explain: 'Many are. A bank lends to businesses AND to people. A courier delivers for companies AND for you.' },
        { text: '"D2C" means "delivered to customers".', isFact: false, explain: 'Close! D2C = direct to consumer: a brand selling straight to people, without shops in between.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'So. "B2B logistics solutions." In plain words.' },
        { speaker: 'remi', text: 'Other companies pay us to move their goods from where they\'re made to where they\'re sold.' },
        { speaker: 'zanele', text: 'That\'s it? Then why does the website say "end-to-end synergistic solutions"?' },
        { speaker: 'remi', text: 'I... genuinely don\'t know.' },
        { speaker: 'tey', text: "Keep that question. It comes back at the very end of the course. For now: you can describe any business with two plain questions. Who pays? For what?" },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Any business model in plain words: WHO pays, and FOR WHAT? "Shops pay us to deliver their stock." Done.',
    },
  ],
  apply: {
    scenario: 'Wednesday lunch. "What does Synergix actually do?"',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the business-model letters.',
        pairs: [
          ['B2B', 'Sells to other businesses'],
          ['B2C', 'Sells to ordinary people'],
          ['D2C', 'A brand selling straight to people'],
          ['SaaS', 'Software you rent online'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'B2B or B2C?',
        groups: ['B2B', 'B2C'],
        items: [
          { text: 'A company that cleans other companies\' offices', group: 0 },
          { text: 'A phone shop selling to the public', group: 1 },
          { text: 'Synergix moving stock for supermarkets', group: 0 },
          { text: 'A food delivery app for hungry students', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which one is SaaS?',
        options: [
          { text: 'A delivery van', why: 'That\'s a physical thing. SaaS is software.' },
          { text: 'A one-off box of software discs', why: 'You buy that once. SaaS is rented, usually by subscription.' },
          { text: 'An accounting app a company pays for every month' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So what does your company actually do? Your LinkedIn says "B2B end-to-end solutions" lol',
        prompt: 'Remi answers his friend Ada in plain words.',
        options: [
          { text: 'Ha. Other companies pay us to move their goods from factories to shops.' },
          { text: 'We leverage synergies across the value chain.', why: 'Ada will reply "translation??". Again.' },
          { text: 'No idea, honestly.', why: 'Remi knows now: who pays, for what.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'SaaS = software as a ... (one word)',
        answers: ['service'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Can one company be both B2B and B2C?',
        options: [
          { text: 'No, it has to choose', why: 'Many companies sell to both.' },
          { text: 'Yes, like a bank that lends to businesses and to people' },
          { text: 'Only if it\'s SaaS', why: 'Any kind of company can do both.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s notes. Which one is wrong?',
        lines: [
          'B2B: business to business.',
          'B2C: business to consumer.',
          'D2C: delivered to customers.',
        ],
        bug: 2,
        fix: 'D2C: direct to consumer.',
        explanation: 'D2C is about selling directly, with no shop in between.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['CFO', 'Chief financial officer'],
          ['Line manager', 'The person you report to'],
          ['Margin', 'Profit as a share of revenue'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Describe Synergix in plain words.',
        template: 'WHO pays: other [[1]]. FOR WHAT: moving their [[2]] from factories to [[3]].',
        blanks: [['companies', 'businesses'], ['goods', 'stock'], ['shops', 'stores']],
        distractors: ['synergies', 'solutions'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the two plain questions for any business.',
        tiles: ['Who', 'pays,', 'and', 'for', 'what?'],
        distractors: ['synergy', 'leverage'],
      },
    ],
  },
  reflect: {
    prompt: 'Describe your own workplace, school or a business you love in one plain sentence: who pays, and for what?',
    starters: ['... pay(s) us/them to...'],
  },
  deepen: {
    title: 'The plain-words test',
    summary: 'Read the "About us" page of three companies. Can you say who pays them, for what, in one sentence? If their website can\'t, that\'s a jargon problem, not your problem.',
  },
  notes: 'B2B, B2C, D2C (direct-to-consumer), SaaS (software as a service) — Cambridge Business English / Investopedia definitions. Teyro is a subscription web app (SaaS-like) per live pricing. The "what does Synergix do" running gag pays off in Chapter 12.',
};

export default lesson;
