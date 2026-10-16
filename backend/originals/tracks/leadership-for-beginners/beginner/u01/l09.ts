import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Lucía's Day-1 message to the team, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: Lucía\'s first message',
  summary: 'Before the team meeting, Lucía posted a message in the team chat. Twenty minutes later, Sofía (who never replies to anything) replied: "Thank you for asking." Tap through to see why it worked.',
  minutes: 11,
  outcomes: [
    'See every Chapter 1 tool in one short message',
    'Write a first message to a team you lead',
    'Spot what makes people feel safe to reply',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía, in the team chat, Day 3',
      text: 'Hi all. This is new for all of us: last week I sat where you\'re sitting. Nothing about how we work changes this month. First I want to understand it. In tomorrow\'s meeting I\'ll ask three things: what\'s working, what slows you down, and what you\'d change if you were me. I\'ll also book 30 minutes with each of you this week. And yes, we\'re finally fixing the shared drive.',
      hotspots: [
        { phrase: 'This is new for all of us', note: 'She names the change instead of pretending it isn\'t awkward. That relaxes everyone.' },
        { phrase: 'Nothing about how we work changes this month.', note: 'It answers the question in everyone\'s head: "what happens to me?"' },
        { phrase: 'First I want to understand it.', note: 'Listening before changing. Influence is earned, not issued with the title.' },
        { phrase: 'what you\'d change if you were me', note: 'An invitation to bring ideas: the start of commitment, not just compliance.' },
        { phrase: 'I\'ll also book 30 minutes with each of you this week.', note: 'A clear next step: one-on-ones, which Chapter 2 is all about.' },
        { phrase: 'we\'re finally fixing the shared drive', note: 'An early win the team already cared about: small, visible, fast.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good first message: name the change, say what won\'t change, ask for their ideas, give the next step, and promise one small fix.',
    },
  ],
  apply: {
    scenario: 'Line check, Day 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did quiet Sofía reply this time?',
        options: [
          { text: 'Because it was long', why: 'It\'s short.' },
          { text: 'Because Lucía is the boss now', why: 'Titles don\'t make people reply. Invitations do.' },
          { text: 'The message asked for her views and felt safe to answer' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool is it?',
        groups: ['Name the change', 'Listen first', 'Early win'],
        items: [
          { text: 'This is new for all of us', group: 0 },
          { text: 'First I want to understand it', group: 1 },
          { text: 'Fixing the shared drive', group: 2 },
          { text: 'What would you change if you were me?', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the message in order.',
        lines: ['Name the change', 'Say what won\'t change', 'Invite their ideas', 'Give the next step', 'Promise one small fix'],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'Nice message. Bold of you to touch the shared drive. Nobody has survived that before.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Ha! I\'ll need your twelve years of knowledge. Help me with it?' },
          { text: 'I don\'t need help.', why: 'A missed chance to include Diego.' },
          { text: 'Please take this seriously.', why: 'He\'s joking. Joke back, and invite him in.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each one-on-one is ___ minutes. (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s first draft. Which line would make people nervous?',
        lines: [
          'This is new for all of us.',
          'Big changes are coming, details soon.',
          'I\'ll book 30 minutes with each of you.',
        ],
        bug: 1,
        fix: 'Nothing about how we work changes this month.',
        explanation: '"Big changes, details soon" makes everyone anxious and quiet.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "fixing the shared drive" do for Lucía?',
        options: [
          { text: 'Nothing, it\'s too small', why: 'Small and visible is the point.' },
          { text: 'Shows the team she listens and gets things done, fast' },
          { text: 'Makes her look busy', why: 'It\'s about trust, not looking busy.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Doer trap', 'Doing instead of leading'],
          ['Commitment', 'Comes from trust'],
          ['Project Oxygen', 'What great managers do'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The middle of the message.',
        template: 'Nothing about how we work [[1]] this month. First I want to [[2]] [[3]].',
        blanks: [['changes'], ['understand'], ['it']],
        distractors: ['control', 'everything'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the opening.',
        tiles: ['This', 'is', 'new', 'for', 'all', 'of', 'us.'],
        distractors: ['me.'],
      },
    ],
  },
  reflect: {
    prompt: 'Draft a short first message to a team (real or imagined). Include: name the change, what won\'t change, a question, the next step, one small fix.',
    starters: ['Hi all...', 'I\'d like to ask...', 'This week...'],
  },
  deepen: {
    title: 'Send fewer, better messages',
    summary: 'Next time you message a group you lead, check it has a question in it. Messages that ask get replies; messages that announce get silence.',
  },
  notes: 'Synthesis of Chapter 1 tools. Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
