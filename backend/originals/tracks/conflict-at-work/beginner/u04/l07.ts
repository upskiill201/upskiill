import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Myth or Fact: criticism myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Criticism myths',
  summary: 'Jayden says unfair criticism should be ignored. Femi says you have to hit back straight away or you look weak. Grace sorts fact from myth before Thursday.',
  minutes: 11,
  outcomes: [
    'Drop beliefs that make criticism harder',
    'Ask for specifics instead of guessing',
    'Know you don\'t have to answer instantly',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Unfair criticism has nothing useful in it.',
          isFact: false,
          explain: 'Myth. Callum\'s comment was badly delivered and partly wrong, and it still pushed Grace to add the usage data that made her case stronger.',
        },
        {
          text: 'You have to answer criticism on the spot, or you look weak.',
          isFact: false,
          explain: 'Myth. "Fair question. Let me come back to you with data" looks thoughtful, not weak.',
        },
        {
          text: 'Asking for specifics makes vague criticism easier to handle.',
          isFact: true,
          explain: 'Fact. "Messy" or "not good enough" is hard to act on. "Which part?" turns it into something you can check.',
        },
        {
          text: 'People often give criticism badly because they\'re under pressure themselves.',
          isFact: true,
          explain: 'Fact. Callum was new, with a launch date he didn\'t set and a team he didn\'t know. That doesn\'t excuse "just opinions", but it explains it.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask for specifics, take time if you need it, and look for the useful part, even in badly delivered criticism.',
    },
  ],
  apply: {
    scenario: 'Criticism myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Unfair criticism is useless', group: 0 },
          { text: 'You must answer on the spot', group: 0 },
          { text: 'Asking for specifics helps', group: 1 },
          { text: 'Bad criticism often comes from pressure', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone says your work is "not good enough". Best first reply?',
        options: [
          { text: '"Yes it is."', why: 'Arguing learns nothing.' },
          { text: '"Which part, specifically?"' },
          { text: '"I\'ll redo all of it."', why: 'Find out what they mean first.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Mum, if it\'s unfair, just ignore him.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Part of it was useful. If I ignore it all, I miss that part, and he decides the launch without my data.' },
          { text: 'You\'re right.', why: 'She\'d miss the useful part.' },
          { text: 'I\'ll ignore him forever.', why: 'They have to work together.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"It\'s useless"', 'Look for the useful part'],
          ['"Answer now or look weak"', 'Taking time looks thoughtful'],
          ['"Guess what they meant"', 'Ask for specifics'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Asking for specifics.',
        template: '"[[1]] part, [[2]]?"',
        blanks: [['Which'], ['specifically']],
        distractors: ['Why', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Does understanding Callum\'s pressure excuse "just opinions"?',
        options: [
          { text: 'Yes, it excuses everything', why: 'It explains, not excuses.' },
          { text: 'No, but it explains it, which makes it easier to respond calmly' },
          { text: 'It\'s irrelevant', why: 'It helps Grace respond.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Femi\'s advice is a myth?',
        lines: [
          'Ask him what he meant by "opinions".',
          'Bring the pilot data.',
          'If you don\'t hit back in the meeting, you\'ve lost.',
          'Suggest a test next week.',
        ],
        bug: 2,
        fix: 'Coming back with data later is fine.',
        explanation: 'Hitting back instantly usually escalates.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many triggers do Stone and Heen describe?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful response to vague criticism, or not?',
        groups: ['Helpful', 'Not'],
        items: [
          { text: '"Which part felt messy?"', group: 0 },
          { text: '"Whatever."', group: 1 },
          { text: '"Can you show me an example?"', group: 0 },
          { text: 'Rewriting everything silently', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the response to vague criticism.',
        lines: ['Breathe', 'Ask for specifics', 'Listen to the example', 'Decide what to change'],
      },
    ],
  },
  reflect: {
    prompt: 'What vague criticism have you heard recently? Write the "which part, specifically?" question you could ask.',
    starters: ['They said...', 'I could ask...'],
  },
  deepen: {
    title: 'Coaching, appreciation, evaluation',
    summary: 'Stone and Heen separate three kinds of feedback: appreciation (thanks), coaching (how to improve) and evaluation (where you stand). Criticism often mixes them; asking which one it is helps.',
  },
  notes: 'Stone & Heen, Thanks for the Feedback (2014): appreciation, coaching, evaluation; asking for specifics. Myth/fact synthesis.',
};

export default lesson;
