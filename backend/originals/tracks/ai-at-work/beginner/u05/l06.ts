import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 6 — pros and cons, honestly. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Pros and cons, honestly',
  summary: 'Ask an AI for pros and cons and you\'ll get a tidy, balanced-looking list. Balanced-looking isn\'t the same as honest. Learn to weigh them.',
  minutes: 12,
  outcomes: [
    'Get pros and cons that are specific, not generic',
    'Weigh them instead of counting them',
    'Ask for the strongest case on each side',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If there are more pros than cons, the option is a good one.',
          isFact: false,
          explain: 'One big con ("we can\'t get a licence for two years") can outweigh ten small pros. Weigh, don\'t count.',
        },
        {
          text: 'AI pros-and-cons lists are often generic unless you give your situation.',
          isFact: true,
          explain: '"Large market" and "competition" fit almost any country. Specifics come from your context.',
        },
        {
          text: 'AI lists usually show the same number of pros and cons, which can make options look more balanced than they are.',
          isFact: true,
          explain: 'A neat 5 vs 5 looks fair, but the real picture may be lopsided. Ask what matters most.',
        },
        {
          text: 'Asking for "the strongest case for and against" gives more useful answers than "pros and cons".',
          isFact: true,
          explain: 'It pushes past generic points to the arguments that could actually change your mind.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Weigh, don\'t count. Ask for the strongest case for and against, given your situation, and which single point matters most.',
    },
  ],
  apply: {
    scenario: 'Ada is weighing a Ghana launch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Seven pros, two cons. Is Ghana a good choice?',
        options: [
          { text: 'Yes, more pros', why: 'One con could outweigh them all.' },
          { text: 'You can\'t tell until you weigh them' },
          { text: 'No, any cons mean no', why: 'Weigh them instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific, or generic?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: '"Our partner bank already operates in Accra"', group: 0 },
          { text: '"Large market"', group: 1 },
          { text: '"Licence takes 6-12 months; our runway is 9"', group: 0 },
          { text: '"Competition exists"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most honest analysis?',
        options: [
          { text: 'List the pros and cons of Ghana.', why: 'Tends to be generic and evenly balanced.' },
          { text: 'Given our situation (below), give the strongest case for and against launching in Ghana next, and say which single factor matters most.' },
          { text: 'Tell me why Ghana is great.', why: 'One-sided.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The list looks really balanced: five pros, five cons. So it\'s 50/50?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, it\'s a coin toss.', why: 'Counting isn\'t weighing.' },
          { text: 'Let\'s add more pros.', why: 'More items doesn\'t help.' },
          { text: 'Not necessarily. The licence timeline alone could decide it. Let\'s weigh the big ones, not count them.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]], don\'t [[2]].',
        blanks: [['Weigh'], ['count']],
        distractors: ['Guess', 'check'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the generic point to a specific version.',
        pairs: [
          ['"Large market"', '"About X small shops in Accra use mobile money (source)"'],
          ['"Regulation"', '"Licence 6-12 months vs our 9-month runway"'],
          ['"Competition"', '"Two free apps already lead with small shops"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which "con" is the one that could decide everything?',
        lines: [
          'Need to translate some screens into Twi',
          'Office space costs a bit more',
          'Licence could take longer than our funding lasts',
          'New marketing photos needed',
        ],
        bug: 2,
        fix: 'Find the real licence timeline first.',
        explanation: 'If the licence outlasts the runway, nothing else matters.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s follow-up question.',
        tiles: ['Which', 'single', 'factor', 'matters', 'most?'],
        distractors: ['nice'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s honest pros-and-cons process.',
        lines: ['Give AI the real situation', 'Ask for the strongest case each way', 'Find the deciding factor', 'Check that factor first'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ten small pros, one huge con. Can the con outweigh them? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Big factor or small factor for the launch?',
        groups: ['Big', 'Small'],
        items: [
          { text: 'Licence timeline', group: 0 },
          { text: 'Logo colours', group: 1 },
          { text: 'Whether small shops will switch apps', group: 0 },
          { text: 'Office plants', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can an even 5 vs 5 list mislead?',
        options: [
          { text: 'It looks balanced even when one side is much heavier' },
          { text: 'Odd numbers are better', why: 'It\'s about weight, not count.' },
          { text: 'It can\'t mislead', why: 'Neat lists hide lopsided reality.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a decision you made by counting pros and cons. What single factor should have decided it?',
    starters: ['The decision was...', 'The deciding factor was...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for "the strongest case for and against" a choice you\'re making, then ask which factor matters most.' },
  notes: 'Illustrative; figures and facts about Ghana are placeholders, not market data.',
};

export default lesson;
