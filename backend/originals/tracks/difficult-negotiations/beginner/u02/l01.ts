import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: the phone call. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The phone call',
  summary: 'Wednesday, 2 p.m. UK time. Thirty minutes with Mr Pryce and Ms Okafor-Lane. Kavya keeps a tally on a sticky note. By the end, it has five marks on it.',
  minutes: 11,
  outcomes: [
    'Notice several tactics used in one conversation',
    'See that tactics are moves, not facts',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thirty minutes, five marks',
      beats: [
        { speaker: 'narrator', text: 'Arjun explains the quote. Mr Pryce breathes in sharply: "£48,000? For an app? Wow." Kavya makes a mark.' },
        { speaker: 'narrator', text: 'Ms Okafor-Lane is warm: "I love your demo. I really want this to work. Pryce just has rules." Another mark.' },
        { speaker: 'narrator', text: 'Pryce: "Our finance director won\'t sign above £30,000. I\'d love to help, but it\'s out of my hands." Mark.' },
        { speaker: 'narrator', text: '"And we need an answer by Friday. Three other agencies are very keen." Two more marks.' },
        { speaker: 'kavya', text: '(whispering) Five tactics in half an hour. I\'m almost impressed.' },
        { speaker: 'tey', text: 'This chapter: the classic tactics, how to spot each one, and a calm answer for each.' },
      ],
      choice: {
        prompt: 'How should Arjun end the call?',
        options: [
          { text: '"Thank you both. Let me look at what\'s possible and send you options by Thursday."', outcome: 'Good. He doesn\'t accept anything under pressure, and sets his own next step.', best: true },
          { text: '"OK, £30,000 then, before Friday."', outcome: 'Five tactics, five wins for them. He\'s below his walk-away.' },
          { text: '"I know exactly what you\'re doing, and it won\'t work."', outcome: 'True, but it embarrasses them and turns the call into a fight.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A tactic is a move designed to change your behaviour. Spotting it takes away most of its power.',
    },
  ],
  apply: {
    scenario: 'Kavya\'s sticky note.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many tactics did Kavya count on the call?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the tactic.',
        pairs: [
          ['"£48,000? Wow."', 'The flinch'],
          ['"I love your demo. Pryce just has rules."', 'Good cop'],
          ['"Finance won\'t sign above £30,000."', 'Higher authority'],
          ['"Answer by Friday."', 'Deadline'],
          ['"Three other agencies are keen."', 'Competition'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a tactic, in negotiation?',
        options: [
          { text: 'A move designed to change your behaviour' },
          { text: 'A fact about the deal', why: 'Tactics are moves, not facts.' },
          { text: 'A lie, always', why: 'Some tactics are true; they\'re still moves.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to end the call, or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"I\'ll send options by Thursday."', group: 0 },
          { text: '"OK, £30,000 then."', group: 1 },
          { text: '"Thank you both for your time."', group: 0 },
          { text: '"I know what you\'re doing."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Ms Okafor-Lane is lovely. Maybe she\'ll get us a better deal?',
        prompt: "Kavya's best reply?",
        options: [
          { text: 'Maybe she\'s genuine. But she and Pryce are on the same side. Treat them both the same: polite and firm.' },
          { text: 'Yes, trust her completely.', why: 'Warmth can be part of the routine.' },
          { text: 'She\'s lying, ignore her.', why: 'She may be genuine; just don\'t rely on it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Taking away the power.',
        template: 'Spotting a [[1]] takes away most of its [[2]].',
        blanks: [['tactic'], ['power']],
        distractors: ['client', 'price'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pryce says finance won\'t go above £30,000. Arjun\'s walk-away is £36,000. How far below, in pounds?',
        answers: ['6000', '6,000', '£6,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I know exactly what you\'re doing" risky?',
        options: [
          { text: 'It embarrasses them, and people who lose face dig in' },
          { text: 'It\'s too weak', why: 'It\'s confrontational.' },
          { text: 'It\'s never risky', why: 'Calling people out publicly backfires.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Joel\'s call notes treats a tactic as a fact?',
        lines: [
          'Pryce flinched at £48,000.',
          'Okafor-Lane loved the demo.',
          'So £48,000 must be far too high.',
          'They want an answer by Friday.',
        ],
        bug: 2,
        fix: 'A flinch is a move, not market data.',
        explanation: 'Flinches are designed to make you doubt your price.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a calm end to a pressure call.',
        lines: ['Thank them', 'Accept nothing under pressure', 'Say what you\'ll send', 'Say when you\'ll send it'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time someone pressured you to agree. Which tactics can you spot now?',
    starters: ['They said...', 'That was a...'],
  },
  deepen: {
    title: 'Hardball tactics',
    summary: 'Harvard\'s Program on Negotiation lists common hardball tactics: extreme demands, the flinch, good cop/bad cop, deadlines, "my boss won\'t allow it", nibbling and take-it-or-leave-it.',
  },
  notes: 'Fictional call. Tactic list follows Harvard PON summaries of hardball tactics and Ury, Getting Past No.',
};

export default lesson;
