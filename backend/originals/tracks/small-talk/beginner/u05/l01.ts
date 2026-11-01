import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Myth or Fact: beyond the weather — deeper conversations go better than we expect (Kardas, Kumar & Epley 2022). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Beyond the weather',
  summary: 'Grace can do small talk now. But at lunch with Aisha, she notices something: they always stop at the weather. What if they went one step deeper? Grace is scared to try. So, it turns out, is almost everyone.',
  minutes: 11,
  outcomes: [
    'Know what research says about deeper conversations with strangers',
    'See why people stay shallow even when they\'d enjoy going deeper',
    'Choose when to stay light and when to go a little deeper',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Deeper conversations with strangers feel more awkward than people expect.', isFact: false, explain: 'The opposite. In twelve experiments with over 1,800 people, deeper conversations felt LESS awkward and created more connection and happiness than people predicted.' },
        { text: 'People underestimate how interested others are in hearing about them.', isFact: true, explain: 'Yes. That\'s the main reason people stay shallow: they assume the other person doesn\'t want to hear anything real.' },
        { text: 'Small talk is useless; you should always skip straight to deep questions.', isFact: false, explain: 'Small talk builds the trust that makes deeper talk feel safe. It\'s the doorway; you usually go through it first.' },
        { text: 'When people learned that deeper talk goes better than expected, they chose deeper topics more often.', isFact: true, explain: 'Just knowing about the gap changed their choices. Now you know too.' },
        { text: '"Deeper" means very personal or painful topics.', isFact: false, explain: 'Deeper can simply mean more real: what you love about your work, what you\'re looking forward to, what surprised you this year.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'narrator', text: 'Tuesday lunch, week eight. Grace and Aisha. "Grim out there." "Grim." "Again." "Again."' },
        { speaker: 'grace', text: '(We\'ve had this exact conversation nine times. I\'d love to know her properly. But what if she thinks I\'m being weird?)' },
        { speaker: 'tey', text: "Here's the research: Aisha is probably wondering exactly the same thing. People expect deeper talk to be awkward, and it almost never is. The next lesson shows Grace how to take one gentle step." },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'We expect deeper talk to be awkward. It usually isn\'t. Small talk is the doorway; sometimes it\'s worth walking through.',
    },
  ],
  apply: {
    scenario: 'Tuesday lunch, week eight.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the research find about deeper conversations with strangers?',
        options: [
          { text: 'They were as awkward as people feared', why: 'The opposite.' },
          { text: 'They went better than people expected: less awkward, more connection' },
          { text: 'Strangers refused to answer deep questions', why: 'They engaged, and enjoyed it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Small talk, or a step deeper?',
        groups: ['Small talk', 'A step deeper'],
        items: [
          { text: 'Grim out there, isn\'t it?', group: 0 },
          { text: 'What do you love most about design?', group: 1 },
          { text: 'Busy week?', group: 0 },
          { text: 'What\'s something you\'re looking forward to this year?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do people stay shallow even when they\'d enjoy going deeper?',
        options: [
          { text: 'Deep talk is against workplace rules', why: 'There\'s no such rule.' },
          { text: 'Nobody likes real conversations', why: 'People enjoyed them more than expected.' },
          { text: 'They underestimate how interested the other person is' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'So you\'re going to ask your colleague about her deepest fears at lunch? Mum. No.',
        prompt: 'Grace explains.',
        options: [
          { text: 'No! Deeper just means more real. Like what she loves about her job.' },
          { text: 'Yes, I\'m starting with her childhood trauma.', why: 'Deeper doesn\'t mean painful.' },
          { text: 'I\'m going to skip small talk forever.', why: 'Small talk is the doorway.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Small talk is the ___ to deeper conversation. (one word)',
        answers: ['doorway', 'door', 'bridge'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What changed when people learned about this research?',
        options: [
          { text: 'Nothing', why: 'Knowing about the gap changed their choices.' },
          { text: 'They chose deeper topics more often' },
          { text: 'They stopped talking to strangers', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s plan for lunch with Aisha. Which line goes too far, too fast?',
        lines: [
          'Start with the usual "Grim out there."',
          'Then ask what she\'s enjoying most about work at the moment.',
          'Then ask about the worst thing that\'s ever happened to her.',
        ],
        bug: 2,
        fix: 'Then ask what she\'s looking forward to this year.',
        explanation: 'Deeper means more real, not more painful. One gentle step at a time.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Liking gap', 'People like you more than you think'],
          ['Follow-up questions', 'Make people like you more'],
          ['Conversations ending', 'Rarely when both people want'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The big idea.',
        template: 'We expect deeper talk to be [[1]]. It usually [[2]]. Deeper means more [[3]], not more painful.',
        blanks: [['awkward'], ['isn\'t', 'is not'], ['real']],
        distractors: ['fun', 'personal'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a gentle step-deeper question.',
        tiles: ['What', 'are', 'you', 'looking', 'forward', 'to', 'this', 'year?'],
        distractors: ['fear', 'worst'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you have the same small-talk conversation with over and over? What\'s one slightly deeper question you could ask them?',
    starters: ['I always talk to ... about...', 'I could ask...'],
  },
  deepen: {
    title: 'One step deeper',
    summary: 'This week, in one conversation you usually keep light, ask one slightly deeper question: "What\'s been the best part of your week?" or "What got you into this?" Notice what happens.',
  },
  notes: 'Kardas, Kumar & Epley (2022), "Overly shallow?: Miscalibrated expectations create a barrier to deeper conversation", Journal of Personality and Social Psychology 122(3) (published online 2021) — 12 experiments, >1,800 participants; deep conversations less awkward and more connecting than expected; people underestimated partners\' interest; informing people increased choice of deeper topics.',
};

export default lesson;
