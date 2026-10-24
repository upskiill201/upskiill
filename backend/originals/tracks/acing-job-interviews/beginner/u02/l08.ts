import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: preparation myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Preparation myths',
  summary: 'Remi\'s flatmate says "over-preparing makes you robotic" and "they won\'t care if you know the company". Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop myths that stop people preparing',
    'Know which preparation matters most',
    'Prepare without sounding rehearsed',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Preparing too much makes you sound robotic.',
          isFact: false,
          explain: 'Myth, mostly. Memorising scripts sounds robotic. Preparing facts, stories and questions makes you sound relaxed.',
        },
        {
          text: 'Interviewers notice when you haven\'t researched the company.',
          isFact: true,
          explain: 'Fact. "What do you know about us?" and "why us?" quickly show who looked and who didn\'t.',
        },
        {
          text: 'You need every skill in the job ad to apply.',
          isFact: false,
          explain: 'Myth. Must-haves matter. Nice-to-haves are a wish list. Be honest about gaps.',
        },
        {
          text: 'Small set-up problems on video can shape the first impression.',
          isFact: true,
          explain: 'Fact. Bad light, noise and a dropping connection distract from what you say. They\'re easy to fix in advance.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Prepare facts, stories and questions, not scripts. Research shows; so does set-up.',
    },
  ],
  apply: {
    scenario: 'Preparation myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Preparing makes you robotic', group: 0 },
          { text: 'Interviewers notice no research', group: 1 },
          { text: 'You need every skill in the ad', group: 0 },
          { text: 'Video set-up shapes first impressions', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What kind of preparation sounds robotic?',
        options: [
          { text: 'Knowing your stories', why: 'That sounds relaxed.' },
          { text: 'Researching the company', why: 'That helps.' },
          { text: 'Memorising scripts word for word' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My flatmate says they won\'t care if I know what they do.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Your flatmate is right.', why: 'It\'s asked constantly.' },
          { text: '"What do you know about us?" is one of the most common questions. They\'ll care.' },
          { text: 'Only care if it\'s a big company.', why: 'Startups care too.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Preparing = robotic"', 'Scripts are robotic; preparation isn\'t'],
          ['"Need every skill"', 'Must-haves matter most'],
          ['"Set-up doesn\'t matter"', 'It shapes first impressions'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What to prepare.',
        template: 'Facts, [[1]] and questions, not [[2]].',
        blanks: [['stories'], ['scripts']],
        distractors: ['excuses', 'jokes'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the most useful last-evening preparation?',
        options: [
          { text: 'One focused hour of research, then sleep' },
          { text: 'All-night revision', why: 'Exhaustion hurts.' },
          { text: 'Nothing', why: 'Research changes answers.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the flatmate\'s advice is a myth?',
        lines: [
          'Get a good night\'s sleep.',
          'Use their app before the call.',
          'Don\'t apply unless you have every skill listed.',
          'Bring a couple of questions.',
        ],
        bug: 2,
        fix: 'Apply if you have the must-haves.',
        explanation: 'Nice-to-haves are a wish list.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes should the last-evening research take?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Relaxed preparation or robotic?',
        groups: ['Relaxed', 'Robotic'],
        items: [
          { text: 'Keywords beside the screen', group: 0 },
          { text: 'A full script to read', group: 1 },
          { text: 'Stories you\'ve told out loud', group: 0 },
          { text: 'Memorised paragraphs', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the night before an interview.',
        lines: ['One hour of research', 'Check the video set-up', 'Review your notes', 'Sleep'],
      },
    ],
  },
  reflect: {
    prompt: 'Which preparation myth have you followed? What will you do differently?',
    starters: ['I followed...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Confidence from preparation',
    summary: 'Much of the calm people show in interviews comes from preparation. Knowing your facts and stories frees your attention for listening.',
  },
  notes: 'Myth/fact synthesis.',
};

export default lesson;
