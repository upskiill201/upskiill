import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: "operationalise weekend throughput". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Operationalise weekend throughput"',
  summary: 'Brian Otieno drafts a notice for the 40 drivers at the Nairobi depot about Saturday shifts and asks Zanele to "wordsmith it". Sentence one: "We will leverage cross-functional synergies to operationalise weekend throughput."',
  minutes: 11,
  outcomes: [
    'Spot jargon and complex words',
    'Think about who will actually read the message',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The driver notice',
      beats: [
        { speaker: 'brian', text: 'Zanele, can you wordsmith this before it goes to the depot? Quick win.' },
        { speaker: 'narrator', text: 'The draft: "We will leverage cross-functional synergies to operationalise weekend throughput going forward."' },
        { speaker: 'narrator', text: 'Zanele reads it twice. She still isn\'t sure what it means. The drivers will read it on their phones, mostly in their second language.' },
        { speaker: 'achieng', text: 'Ask yourself what Baraka needs to know on Friday night. Then write that.' },
        { speaker: 'tey', text: 'This chapter: plain words, swaps for jargon, active voice, short sentences, and writing in a second language.' },
      ],
      choice: {
        prompt: 'What does Baraka, a driver, need from the notice?',
        options: [
          { text: 'When he works on Saturdays, how he\'s paid for it, and who to ask', outcome: 'Exactly. Plain facts he can act on.', best: true },
          { text: 'An explanation of cross-functional synergies', outcome: 'He doesn\'t need, or want, that.' },
          { text: 'The full analysis behind the pilot', outcome: 'Interesting to Zanele, not useful for a driver on Friday night.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before you write, ask: who will read this, on what, in what language? Then write what they need, in words they use.',
    },
  ],
  apply: {
    scenario: 'The driver notice.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many drivers will read the notice?',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Jargon or plain?',
        groups: ['Jargon', 'Plain'],
        items: [
          { text: '"Leverage cross-functional synergies"', group: 0 },
          { text: '"From 6 May, some of you will work Saturdays"', group: 1 },
          { text: '"Operationalise weekend throughput"', group: 0 },
          { text: '"Saturday shifts pay time and a half"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What question does Mrs Achieng tell Zanele to ask?',
        options: [
          { text: 'What does Baraka need to know on Friday night?' },
          { text: 'How can I sound like Brian?', why: 'The opposite.' },
          { text: 'How long should it be?', why: 'Start with the reader\'s needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader detail to what it means for the writing.',
        pairs: [
          ['Reads on a phone', 'Short, point first'],
          ['Second language', 'Common words, no idioms'],
          ['Reads on Friday night', 'Clear times and dates'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'My draft sounds professional, no?',
        prompt: "Zanele's best reply?",
        options: [
          { text: 'Yes, perfect.', why: 'They won\'t understand it.' },
          { text: 'It sounds senior, but the drivers need to know when they work and how they\'re paid. Can I put that first, in plain words?' },
          { text: 'It\'s terrible.', why: 'Be kind and specific.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Write what they [[1]], in words they [[2]].',
        blanks: [['need'], ['use', 'know']],
        distractors: ['fear', 'avoid'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "going forward" add nothing?',
        options: [
          { text: 'It\'s a legal term', why: 'It\'s just filler.' },
          { text: 'It adds urgency', why: 'It adds nothing.' },
          { text: 'It\'s filler; the date says when' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the notice is still jargon?',
        lines: [
          'From 6 May, the depot will open on Saturdays.',
          'You will get your Saturday rota by Wednesday.',
          'This will optimise our last-mile value chain.',
          'Questions: call Mrs Mwangi on 0712 000 000.',
        ],
        bug: 2,
        fix: 'This means customers get deliveries faster.',
        explanation: 'Drivers don\'t need "last-mile value chain".',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Plain words', 'Swaps for jargon', 'Active voice', 'Short sentences', 'Writing in a second language'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the driver\'s name Mrs Achieng mentions?',
        answers: ['Baraka', 'baraka'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Who reads your messages, on what device, in what language? How should that change your words?',
    starters: ['My readers...', 'So I should...'],
  },
  deepen: {
    title: 'Know your reader',
    summary: 'Plain-language guides start with the same step: picture the real reader, what they know, and what they need to do. Everything else follows.',
  },
  notes: 'Fictional: driver notice for 40 Nairobi depot drivers; Baraka (driver, from Data Science for Beginners); Brian Otieno\'s jargon (CAST.md). Phone number is a placeholder.',
};

export default lesson;
