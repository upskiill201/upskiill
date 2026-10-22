import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: deal sheet v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Deal sheet v1',
  summary: 'Monday night, Arjun builds one page that will grow all course: his deal sheet. Version 1 has the numbers, the people, and how he\'ll keep his head. Tap each line.',
  minutes: 11,
  outcomes: [
    'Read a deal sheet for a hard negotiation',
    'Link each line to a lesson from this chapter',
    'Start a deal sheet of your own',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s deal sheet v1: Harlow & Finch',
      text: 'Our quote: £48,000, 16 weeks. Their offer: £28,000, answer by Wednesday. Our costs: £22,000 for Kavya, Joel, tools and testing. Walk-away (private): £36,000 for the full scope. People: Mr Pryce, measured on savings; Ms Okafor-Lane, needs it live before the spring sale. Rules: pause before replying; soft on people, hard on the problem; questions, not arguments. Next step: ask for a call.',
      hotspots: [
        { phrase: 'Their offer: £28,000, answer by Wednesday', note: 'Lesson 1: the reply that made everyone want to react.' },
        { phrase: 'Walk-away (private): £36,000 for the full scope', note: '£22,000 team costs plus £14,000 for Arjun\'s own 16 weeks.' },
        { phrase: 'Mr Pryce, measured on savings', note: 'Lesson 3: hard on purpose, because that\'s his job.' },
        { phrase: 'needs it live before the spring sale', note: 'Lesson 3: a real constraint, and Arjun\'s biggest opportunity.' },
        { phrase: 'soft on people, hard on the problem', note: 'Lesson 4: no to the number, yes to the conversation.' },
        { phrase: 'questions, not arguments', note: 'Lesson 8: "Help me understand how you got to £28,000."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A deal sheet holds your numbers, the people and your rules in one place, so the pressure doesn\'t decide for you.',
    },
  ],
  apply: {
    scenario: 'Deal sheet v1.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Team costs are £22,000 and Arjun needs £14,000 for his own time. Walk-away, in pounds?',
        answers: ['36000', '36,000', '£36,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At £28,000, after £22,000 in team costs, what\'s left for Arjun\'s 16 weeks, in pounds?',
        answers: ['6000', '6,000', '£6,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does £28,000 mean for Arjun?',
        options: [
          { text: 'It\'s a good deal', why: 'Only £6,000 left for 16 weeks.' },
          { text: 'It\'s far below his walk-away; he\'d earn very little for four months' },
          { text: 'It\'s exactly his walk-away', why: 'His walk-away is £36,000.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson.',
        pairs: [
          ['Pause before replying', 'Go to the balcony'],
          ['Measured on savings', 'Hard on purpose'],
          ['Soft on people', 'People vs problem'],
          ['Questions, not arguments', 'Cooling questions'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Should we put our walk-away in the reply so they know our limit?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, be transparent.', why: 'Share interests, not your limit.' },
          { text: 'Say £20,000 is our limit to trick them.', why: 'Lying destroys trust.' },
          { text: 'No. It\'s private. If they know £36,000 is our limit, that\'s where they\'ll land.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Share with Harlow & Finch, or keep private?',
        groups: ['Share', 'Private'],
        items: [
          { text: 'What the quote includes', group: 0 },
          { text: 'The £36,000 walk-away', group: 1 },
          { text: 'A request for a call', group: 0 },
          { text: 'How much the team costs', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why a deal sheet.',
        template: 'So the [[1]] doesn\'t [[2]] for you.',
        blanks: [['pressure'], ['decide']],
        distractors: ['client', 'smile'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this deal sheet copy is wrong?',
        lines: [
          'Quote: £48,000, 16 weeks.',
          'Walk-away: £36,000, private.',
          'Mr Pryce: a villain who hates us.',
          'Next step: ask for a call.',
        ],
        bug: 2,
        fix: 'Mr Pryce: measured on savings.',
        explanation: 'Villain stories make you react.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is Ms Okafor-Lane\'s deadline an opportunity for Arjun?',
        options: [
          { text: 'She needs a team that can deliver on time, and his team can' },
          { text: 'It isn\'t', why: 'A real need is a reason to choose him.' },
          { text: 'He can charge double', why: 'It\'s a reason to choose him, not to gouge.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the deal sheet sections.',
        lines: ['Quote and offer', 'Costs and walk-away', 'People and what they need', 'Rules', 'Next step'],
      },
    ],
  },
  reflect: {
    prompt: 'Start your own deal sheet: numbers, walk-away, people and what they need, your rules, next step.',
    starters: ['Numbers:...', 'People:...'],
  },
  notes: 'Deal sheet v1 (fictional): team costs £22,000 (Kavya, Joel, tools, testing); Arjun\'s own time £14,000 → walk-away £36,000 for full scope. £28,000 leaves £6,000.',
};

export default lesson;
