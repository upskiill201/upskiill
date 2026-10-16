import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Myth or Fact: scope creep. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Scope creep',
  summary: 'Mr Rao chose option B. Then, by email, one line each: "Also a WhatsApp button?" "Also a gift message box?" "Small thing: can the logo spin?" Each one is tiny. Kavya laughs. Joel doesn\'t. Myth or fact about creep.',
  minutes: 11,
  outcomes: [
    'Know what scope creep is and why it\'s dangerous',
    'Spot small requests that add up',
    'Handle them without sounding difficult',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Small changes are basically free.', isFact: false, explain: 'Myth. Each one takes time to build, test and check in Hindi and English. Ten "small things" can add up to days. That slow growth of a project, one small yes at a time, is called scope creep.' },
        { text: 'Scope creep is one of the most common reasons projects run late.', isFact: true, explain: 'Fact, broadly. Project-management surveys regularly list changing or growing requirements among the top causes of projects missing deadlines or budgets.' },
        { text: 'Saying yes to every request keeps clients happiest.', isFact: false, explain: 'Myth. It keeps them happy until the launch slips or breaks. What clients value most is a shop that works on time. Protecting that is serving the client.' },
        { text: 'People often don\'t know what they want until they see it.', isFact: true, explain: 'Fact. That\'s why requests arrive late: Mr Rao saw the demo and started imagining more. It\'s normal, not a character flaw. The answer is a simple place for new ideas to go.' },
        { text: 'A "later list" for new ideas makes clients feel ignored.', isFact: false, explain: 'Myth, if you use it well. "Great idea, it\'s on the January list" tells them it was heard and has a home. Silence, or a vague "maybe", is what feels like being ignored.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Small changes aren\'t free. Ten small yeses can sink a launch. New ideas are normal, so give them a home: the later list.',
    },
  ],
  apply: {
    scenario: 'Three one-line emails.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is scope creep?',
        options: [
          { text: 'A client being creepy', why: 'Not quite.' },
          { text: 'Cutting features', why: 'The opposite.' },
          { text: 'A project slowly growing, one small yes at a time' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Small changes are free', group: 0 },
          { text: 'Growing requirements often delay projects', group: 1 },
          { text: 'Saying yes always pleases clients', group: 0 },
          { text: 'People often want more once they see it', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The spinning logo would take me 20 minutes! Can I just do it?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Sure, it\'s tiny.', why: 'That\'s exactly how creep works.' },
          { text: 'Ha, I believe you. But 20 minutes here, an hour there, and Diwali slips. It goes on the January list, and I\'ll tell Mr Rao.' },
          { text: 'Never. Spinning logos are terrible.', why: 'Maybe, but that\'s not why it waits.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A place for new ideas that aren\'t for now: the ___ list. (one word)',
        answers: ['later', 'Later', 'January', 'parking'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to the best home.',
        pairs: [
          ['WhatsApp button', 'January list'],
          ['Gift message box', 'January list, or swap with a should'],
          ['Broken Hindi on checkout', 'Fix now: it\'s a must'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do requests often arrive after a demo?',
        options: [
          { text: 'Seeing it makes people imagine more. It\'s normal' },
          { text: 'The client is being difficult', why: 'It\'s how people think.' },
          { text: 'The demo was bad', why: 'Good demos cause it too.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s reply to Mr Rao. Which line causes creep?',
        lines: [
          'Great ideas! WhatsApp and gift messages are on the January list.',
          'And sure, we\'ll squeeze in the spinning logo.',
          'Diwali launch stays as planned.',
        ],
        bug: 1,
        fix: 'If one matters more than coupons, we can swap them.',
        explanation: '"Squeeze in" is the sound of scope creeping.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put handling a small request in order.',
        lines: ['Thank them for the idea', 'Check it against the musts', 'Put it on the later list, or swap', 'Tell them where it went'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Small changes aren\'t [[1]]. Give new ideas a [[2]].',
        blanks: [['free'], ['home', 'place']],
        distractors: ['bad', 'deadline'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s line.',
        tiles: ['Great', 'idea:', 'it\'s', 'on', 'the', 'January', 'list.'],
        distractors: ['no.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a project that grew one small request at a time. What would a later list have saved?',
    starters: ['The project was...', 'A later list would have...'],
  },
  deepen: {
    title: 'Start a later list',
    summary: 'For one project, keep a "later list". Every new idea goes on it first. Review it once a week and decide what, if anything, swaps in.',
  },
  notes: 'Scope creep: standard project-management term; changing/poorly defined requirements regularly cited as a leading cause of project failure (e.g. PMI Pulse of the Profession reports), hedged as "broadly". Users discovering requirements on seeing prototypes: common in requirements engineering. Fictional details.',
};

export default lesson;
