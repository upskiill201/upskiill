import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Chat with Tey: tailor it to who's listening. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Tailor it to who\'s listening',
  summary: 'Ada\'s intro worked on the bus. But next week\'s mixer has a recruiter, an investor and a journalist. "Do I say the same thing to all of them?" Tey: "Same you. Different door."',
  minutes: 11,
  outcomes: [
    'Adjust your pitch to what the listener cares about',
    'Keep the core the same while changing the emphasis',
    'Guess what someone cares about before you speak',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Ada, the bus-stop lady cared about her church group. What do you think a recruiter cares about?",
          replies: ['Whether I\'d be good to hire?', 'My CV?'],
        },
        {
          tey: "Exactly: skills and results. So lead with what you've done: \"I design money apps people actually use, and I built one ten colleagues rely on.\" Now, an investor?",
          replies: ['Whether the app could grow?'],
        },
        {
          tey: "Yes: the size of the problem and proof it's spreading. \"Millions of Nigerians run an office ajo. Mine runs on my app, and a church group of forty just asked for it.\" And a journalist?",
          replies: ['A good story?'],
        },
        {
          tey: "A story and a human angle. \"Every month someone swore they'd paid. So I learned Python and built an app to end the arguments.\" See? Same Ada. Same app. Three different doors into it.",
          replies: ['But how do I know who someone is before I start?'],
        },
        {
          tey: "Ask first! \"What brings you here?\" takes three seconds and tells you which door to open. And if you can't tell, start with your one sentence and watch what they ask. Their question tells you what they care about.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same core, different emphasis. Recruiters: skills and results. Investors: size and proof. Journalists: story. Not sure? Ask first, or follow their question.',
    },
  ],
  apply: {
    scenario: 'Tey\'s three doors.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the listener to what they usually care about most.',
        pairs: [
          ['A recruiter', 'Skills and results'],
          ['An investor', 'The size of the problem and proof it\'s growing'],
          ['A journalist', 'A good human story'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What stays the same when you tailor a pitch?',
        options: [
          { text: 'The core: who you are and what you do' },
          { text: 'Nothing: change everything each time', why: 'Then it\'s not one pitch, it\'s improvising from scratch.' },
          { text: 'The exact wording', why: 'The emphasis changes; the core stays.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which line suits which listener?',
        groups: ['Recruiter', 'Investor', 'Journalist'],
        items: [
          { text: 'I built an app ten colleagues rely on every month', group: 0 },
          { text: 'Millions run an office ajo; a 40-member church group just asked for mine', group: 1 },
          { text: 'Someone always swore they\'d paid, so I learned Python to end the arguments', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Isn\'t tailoring a bit fake? Saying different things to different people?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, so never tailor.', why: 'Then you miss what they care about.' },
          { text: 'Tell each person what they want to hear, true or not.', why: 'Never. Always true.' },
          { text: 'It\'s all true. You\'re choosing which true part matters most to them. That\'s respect, not fakery.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Not sure who they are? ___ first: "What brings you here?" (one word)',
        answers: ['ask'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'You give your one sentence. The listener asks, "How many people use it?" What does that tell you?',
        options: [
          { text: 'They\'re bored', why: 'A question means interest.' },
          { text: 'Nothing useful', why: 'Their question tells you what they care about.' },
          { text: 'They care about growth and proof, so lead with numbers next' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s pitch to a recruiter. Which line is for the wrong listener?',
        lines: [
          'I design money apps people actually understand.',
          'I built one that ten colleagues use every month.',
          'The total addressable market is enormous and I\'m looking for seed funding.',
        ],
        bug: 2,
        fix: 'I\'m interested in design roles at fintechs. What\'s your team like?',
        explanation: 'Funding talk is for investors. A recruiter wants to know about your skills and what you\'re looking for.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the tailoring steps in order.',
        lines: ['Ask "What brings you here?"', 'Listen to their answer', 'Pick the door: skills, size or story', 'Give your pitch with that emphasis'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'Same [[1]], different [[2]]. If you\'re not sure, [[3]] first.',
        blanks: [['core', 'you'], ['emphasis', 'door'], ['ask']],
        distractors: ['lie', 'guess'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first question.',
        tiles: ['What', 'brings', 'you', 'here?'],
        distractors: ['funding'],
      },
    ],
  },
  reflect: {
    prompt: 'Who are the two or three kinds of people you\'re most likely to pitch to? What does each care about most? Write one line for each.',
    starters: ['To a ... I\'d lead with...', 'To a ... I\'d lead with...'],
  },
  deepen: {
    title: 'Two versions, same core',
    summary: 'Write two versions of your intro: one for someone who might hire you, one for a friend of a friend at a party. Same core, different emphasis.',
  },
  notes: 'Audience adaptation is a core principle of persuasion and public-speaking guidance. Listener priorities are typical, not universal; the lesson teaches asking first.',
};

export default lesson;
