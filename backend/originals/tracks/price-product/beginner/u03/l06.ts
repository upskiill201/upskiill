import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Reading: the decoy option. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The decoy option',
  summary: 'Miracle sends Clinton a famous experiment about magazine subscriptions. One option almost nobody chose changed what everyone else picked. Could the same thing happen on WashDay\'s price card?',
  minutes: 12,
  outcomes: [
    'Explain how a decoy option changes choices',
    'Recognise the middle-option effect',
    'Use option design honestly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One option nobody picks',
      html: '<p>Dan Ariely describes a magazine\'s subscription offer:</p><ul><li>Web only: $59</li><li>Print only: $125</li><li>Print and web: $125</li></ul><p>Nobody wants "print only" when "print and web" costs the same. But its presence matters. In Ariely\'s classroom test, with all three options most students chose print and web. When "print only" was removed, most switched to the cheaper web-only option. The useless option, the <strong>decoy</strong>, made print and web look like a bargain.</p><p>A related effect: when there are three options, people often choose the <strong>middle</strong> one. It feels like the safe choice.</p><p>For WashDay:</p><ul><li>Express: 2,500</li><li>Express with ironing: 2,700</li></ul><p>Next to Express, "only 200 more for ironing" feels like great value, and it really is (it costs Clinton just 100). That\'s the honest version: every option is real and worth buying, and the layout helps customers see the value.</p><p>The dishonest version is an option designed to trick, or one you\'d never actually sell. Don\'t do that.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Option design should help customers see real value, not trick them into paying for something they don\'t want.',
    },
  ],
  apply: {
    scenario: 'How options shape choices.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the magazine example, what did the "print only" option do?',
        options: [
          { text: 'Made "print and web" look like a bargain at the same price' },
          { text: 'Sold the most', why: 'Almost nobody chose it.' },
          { text: 'Nothing', why: 'Removing it changed what people chose.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Decoy', 'An option that makes another look better'],
          ['Middle-option effect', 'People pick the option in the middle'],
          ['Honest design', 'Every option is real and worth buying'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Express is 2,500 and Express with ironing is 2,700. How much more is ironing, in FCFA?',
        answers: ['200'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest option design, or a trick?',
        groups: ['Honest', 'Trick'],
        items: [
          { text: 'Showing Express next to Express + ironing', group: 0 },
          { text: 'A "VIP" option you\'d never actually deliver', group: 1 },
          { text: 'Putting Standard in the middle of three real tiers', group: 0 },
          { text: 'Hiding the cheapest option so nobody sees it', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Can I add a fake "Platinum, 5,000" option so 2,500 looks cheap?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Only if it\'s a real service you\'d deliver and someone might want. A fake option is a trick, and students talk.' },
          { text: 'Yes, nobody will know.', why: 'It\'s deceptive and risks trust.' },
          { text: 'Never show more than one option.', why: 'Clear, real options help customers.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Option design should help customers see real [[1]], not [[2]] them.',
        blanks: [['value'], ['trick']],
        distractors: ['logos', 'thank'],
      },
      {
        kind: 'mcq',
        prompt: 'With three tiers (Saver, Standard, Express), which one might many students choose because it\'s in the middle?',
        options: [
          { text: 'Standard' },
          { text: 'Saver', why: 'It\'s the cheapest, not the middle.' },
          { text: 'Express', why: 'It\'s the most expensive.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s price-card draft crosses the line into trickery?',
        lines: [
          'Saver: 1,400.',
          'Standard: 1,800.',
          'Express: 2,500.',
          'Mega Express (always "sold out"): 4,000.',
        ],
        bug: 3,
        fix: 'Delete it: it isn\'t a real option.',
        explanation: 'An option that never exists is only there to manipulate.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ironing costs Clinton 100 and sells for 200. What margin does it add, in FCFA?',
        answers: ['100'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the honest way to design options.',
        lines: ['Start from real customer needs', 'Make every option real and deliverable', 'Lay them out so the value is clear', 'Check none are there just to trick'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at how you present your options. Does the layout help customers see value honestly?',
    starters: ['I show...', 'I could make the value clearer by...'],
  },
  deepen: {
    title: 'Asymmetric dominance',
    summary: 'Researchers call the decoy effect "asymmetric dominance": an option that is clearly worse than one choice, but not another, pushes people towards the one it\'s worse than.',
  },
  notes: 'Decoy example: Dan Ariely, Predictably Irrational (2008), The Economist subscription ($59 web, $125 print, $125 print+web). Asymmetric dominance: Huber, Payne & Puto (1982). Compromise (middle-option) effect: Simonson (1989). WashDay ironing numbers fictional.',
};

export default lesson;
