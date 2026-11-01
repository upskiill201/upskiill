import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: 42 slides. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '42 slides',
  summary: 'Lucía has three weeks and 15 minutes for the Encuentro. Her first draft has 42 slides and everything the team did since March. Carmen asks one question that breaks it.',
  minutes: 11,
  outcomes: [
    'See why a talk needs one message',
    'Know why more slides isn\'t more clarity',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The first draft',
      beats: [
        { speaker: 'narrator', text: '42 slides: research, recipes, packaging, the photo shoot, weekly sales, Monterrey, the plant, the team.' },
        { speaker: 'carmen', text: 'When the 300 are on the bus home, what one thing should they remember?' },
        { speaker: 'lucia', text: 'That... chili-lime did well? And the packaging? And Monterrey?' },
        { speaker: 'carmen', text: 'That\'s three things, and none of them is why it did well. Find the one message first. Then the slides.' },
        { speaker: 'tey', text: 'This chapter: one message, structure, slides that help, signposts, and mixing a story with the numbers.' },
      ],
      choice: {
        prompt: 'What should Lucía do first?',
        options: [
          { text: 'Write the one message in a sentence, before touching the slides', outcome: 'Yes. The message decides which slides stay.', best: true },
          { text: 'Make the slides prettier', outcome: 'Prettier slides with no message are still 42 slides.' },
          { text: 'Add slides about the plant', outcome: 'That\'s slide 43.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Message first, slides last. If you can\'t say it in one sentence, the audience can\'t either.',
    },
  ],
  apply: {
    scenario: '42 slides.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many slides were in Lucía\'s first draft?',
        answers: ['42', 'forty-two', 'forty two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What was Carmen\'s question?',
        options: [
          { text: 'Can you add more slides?', why: 'She asked for one message.' },
          { text: 'What one thing should they remember on the bus home?' },
          { text: 'Which font are you using?', why: 'The bus-home question.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'One message, or a list of topics?',
        groups: ['One message', 'A list of topics'],
        items: [
          { text: '"Chili-lime worked because we listened to buyers."', group: 0 },
          { text: '"Packaging, sales, Monterrey"', group: 1 },
          { text: '"Listening to shop owners made our best launch."', group: 0 },
          { text: '"Research, recipes, the team"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'But if I cut slides, people won\'t see all the work.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'They\'ll remember one thing anyway. Make sure it\'s the right one. The work shows in how clear the message is.' },
          { text: 'Then keep all 42.', why: 'They\'ll remember almost none.' },
          { text: 'Show the work in a 40-page handout.', why: 'Find the message first.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the detail to the Encuentro.',
        pairs: [
          ['Audience', '300 people'],
          ['Length', '15 minutes'],
          ['Time left', 'Three weeks'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: '[[1]] first, slides [[2]].',
        blanks: [['Message'], ['last']],
        distractors: ['Fonts', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'What was missing from Lucía\'s three things?',
        options: [
          { text: 'More numbers', why: 'The why was missing.' },
          { text: 'Why chili-lime did well' },
          { text: 'Nothing', why: 'The why.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s plan is the mistake?',
        lines: [
          'Write the one message in a sentence.',
          'Pick only the slides that support it.',
          'Start by designing all 42 slides beautifully.',
          'Rehearse with Carmen.',
        ],
        bug: 2,
        fix: 'Delete it; slides come after the message.',
        explanation: 'Design before message means polishing what you\'ll cut.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['One message', 'Structure', 'Slides that help', 'Signposts', 'Story and data'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is the talk?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'For a talk you\'ve given or will give: what one thing should people remember on the way home?',
    starters: ['They should remember...'],
  },
  deepen: {
    title: 'The bus-home test',
    summary: 'Ask: if they remember only one sentence tomorrow, which one? It\'s the quickest way to find a talk\'s message, and to see when a talk doesn\'t have one.',
  },
  notes: 'Fictional: 42-slide draft; Encuentro 15 minutes, 300 people, three weeks away. Bus-home test: common presentation heuristic.',
};

export default lesson;
