import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 16 — cross-cultural communication. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Cross-cultural communication',
  summary: 'Ada works with Lucía in Mexico City, shops in Accra and a bank in Lagos. The same message can land very differently. Tap to see how she adapts one email.',
  minutes: 12,
  outcomes: [
    'Notice how communication styles differ',
    'Adapt a message without stereotyping',
    'Use AI to check how a message might land',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One message, adapted',
      text: 'Original: "Need the shop list by Friday." Adapted for a new partner: "Hope your week is going well. Could you send the shop list by Friday? It helps us plan next week\'s visits. Thank you!"',
      hotspots: [
        { phrase: 'Need the shop list by Friday.', note: 'Very direct. Fine with a close colleague who likes it short; it can read as rude to someone you don\'t know well.' },
        { phrase: 'Hope your week is going well.', note: 'A short warm opener. In many places, relationship comes before the task.' },
        { phrase: 'Could you send', note: 'A request, not an order. Same deadline, softer shape.' },
        { phrase: 'It helps us plan next week\'s visits.', note: 'A reason. People are more willing when they know why.' },
        { phrase: 'Thank you!', note: 'Small, but it changes how the whole message reads.' },
      ],
    },
    {
      kind: 'reading',
      title: 'Styles, not stereotypes',
      html:
        '<p>Researchers describe communication styles on scales. Anthropologist Edward Hall described <strong>low-context</strong> styles (say it explicitly) and <strong>high-context</strong> styles (much is understood from relationship and setting). Erin Meyer\'s <em>The Culture Map</em> (2014) adds scales like direct vs indirect feedback.</p>' +
        '<p>These describe tendencies, not individuals. The best guide is the person: notice how they write to you, and mirror it. Ask AI: <em>"How might this message read to a new partner who doesn\'t know me? Suggest a warmer version with the same request."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Styles differ; people differ more. Mirror how each person writes to you, and add warmth and a reason when you\'re not sure.',
    },
  ],
  apply: {
    scenario: 'Ada adapts messages for different people.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "low-context" communication mean?',
        options: [
          { text: 'Not saying much', why: 'It means explicit.' },
          { text: 'Saying things explicitly, not relying on shared understanding' },
          { text: 'Being rude', why: 'It\'s a style, not rudeness.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Adds warmth and clarity, or makes it colder?',
        groups: ['Warmer and clearer', 'Colder'],
        items: [
          { text: 'A short friendly opener', group: 0 },
          { text: '"ASAP!!!"', group: 1 },
          { text: 'Giving a reason', group: 0 },
          { text: 'No greeting or thanks', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best checks how a message will land?',
        options: [
          { text: 'Make this Ghanaian.', why: 'Stereotypes a whole country.' },
          { text: 'How might this message read to a new partner who doesn\'t know me? Suggest a warmer version with the same request and deadline.' },
          { text: 'Make it formal.', why: 'Formal isn\'t always warm.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your emails to me are so short now. Are you upset?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Short is efficient.', why: 'She felt it was curt; adapt.' },
          { text: 'Yes.', why: 'She isn\'t upset.' },
          { text: 'Not at all, just a busy week! Sorry they felt curt. I\'ll add a line of context so they read better.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] how each person writes to you. Add [[2]] and a reason when unsure.',
        blanks: [['Mirror'], ['warmth']],
        distractors: ['Ignore', 'pressure'],
      },
      {
        kind: 'findBug',
        prompt: 'Which assumption is a stereotype?',
        lines: [
          'Lucía prefers a warm opener; she always starts with one',
          'The bank manager replies in one line, so short is fine',
          'Everyone from Ghana dislikes direct emails',
          'A new partner: add a greeting and a reason',
        ],
        bug: 2,
        fix: 'Notice how each person writes, and mirror it.',
        explanation: 'People vary far more than national averages.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its source.',
        pairs: [
          ['High vs low context', 'Edward Hall'],
          ['The Culture Map', 'Erin Meyer'],
          ['Mirroring style', 'The person in front of you'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s warmer request.',
        tiles: ['Could', 'you', 'send', 'the', 'list', 'by', 'Friday?'],
        distractors: ['ASAP'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was The Culture Map published?',
        answers: ['2014'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good adaptation, or stereotype?',
        groups: ['Good adaptation', 'Stereotype'],
        items: [
          { text: 'Matching Lucía\'s warm style', group: 0 },
          { text: '"Nigerians are always direct"', group: 1 },
          { text: 'Adding a reason for a new contact', group: 0 },
          { text: '"Mexicans never mind delays"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada adapts a message.',
        lines: ['Notice how they write', 'Mirror the tone', 'Keep the request and deadline clear', 'Add a reason and thanks'],
      },
      {
        kind: 'mcq',
        prompt: 'What stays the same when Ada adds warmth?',
        options: [
          { text: 'The request and the deadline' },
          { text: 'Nothing', why: 'The ask stays clear.' },
          { text: 'Only the greeting', why: 'The ask stays.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you work with across a culture or language. How do they write to you? How could you mirror it?',
    starters: ['They write...', 'I\'ll...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI how one of your messages might read to someone who doesn\'t know you. Adjust it.' },
  notes: 'Hall, Beyond Culture (1976); Meyer, The Culture Map (2014). Scales describe tendencies, not individuals.',
};

export default lesson;
