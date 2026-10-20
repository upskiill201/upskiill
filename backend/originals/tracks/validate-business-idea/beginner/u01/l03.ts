import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Step-by-step: problem first, solution second. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Problem first',
  summary: 'Clinton describes CampusEats for ten minutes: the app, the menu screen, the delivery bikes. Miracle stops him. "You told me the solution. What\'s the problem?"',
  minutes: 11,
  outcomes: [
    'Describe an idea as a problem before a solution',
    'Write a problem statement: who, what pain, how often',
    'Check that the problem is worth solving',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From solution to problem',
      steps: [
        { title: '1. Notice you started with a solution', body: '"An app that delivers food to hostels" is a solution. Most first ideas are. That\'s fine, but you have to find the problem underneath.' },
        { title: '2. Ask "who?"', body: 'Which people, exactly? "Students" is too broad. "First-year students in the hostels near campus" is a group you can find and talk to.' },
        { title: '3. Ask "what\'s painful?"', body: 'What goes wrong for them today? Clinton\'s guess: "Getting food is a hassle." That\'s a guess until students say so.' },
        { title: '4. Ask "how often, and how much does it hurt?"', body: 'A problem people meet every day and already spend money or time on is worth more than one they meet once a term.' },
        { title: '5. Write the problem statement', body: '"[Who] struggles with [what] about [how often], and today they [what they do about it]." The last part matters most: what people already do shows the problem is real.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Fall in love with the problem, not your solution. Solutions change; a real problem keeps paying.',
    },
  ],
  apply: {
    scenario: 'What\'s the problem?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Problem or solution?',
        groups: ['Problem', 'Solution'],
        items: [
          { text: 'An app that delivers food to hostels', group: 1 },
          { text: 'Students waste an hour a day queuing for food', group: 0 },
          { text: 'Delivery bikes for campus', group: 1 },
          { text: 'Hostel kitchens close at 8 p.m. and students go hungry', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with the problem, not the solution?',
        options: [
          { text: 'If the problem isn\'t real, no solution will sell' },
          { text: 'Problems are easier to build', why: 'You don\'t build a problem; you check it\'s real.' },
          { text: 'Investors like long problem statements', why: 'It\'s about whether customers care.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps from solution to problem.',
        lines: ['Notice you started with a solution', 'Ask who, exactly', 'Ask what\'s painful', 'Ask how often and how much', 'Write the problem statement'],
      },
      {
        kind: 'fillBlank',
        prompt: 'A problem statement.',
        template: '[[1]]-year students in the hostels struggle to get food after 8 p.m. most nights, and today they [[2]] instant noodles.',
        blanks: [['First'], ['buy', 'eat']],
        distractors: ['Last', 'deliver'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'The problem is "students need food". Done!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Everyone needs food. Which students, what goes wrong today, how often? And what do they already do about it?' },
          { text: 'Perfect problem statement.', why: 'Too broad to test or act on.' },
          { text: 'Problems don\'t matter; build it.', why: 'The problem decides whether anyone pays.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it pins down.',
        pairs: [
          ['Who?', 'A group you can find'],
          ['What\'s painful?', 'What goes wrong today'],
          ['How often?', 'How much it matters'],
          ['What do they do now?', 'Proof the problem is real'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which problem is most worth solving?',
        options: [
          { text: 'One people meet every week and already spend money on' },
          { text: 'One people meet once a year and shrug at', why: 'Rare, mild problems rarely pay.' },
          { text: 'One only you have noticed', why: 'Check that others have it too.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this problem statement is too vague?',
        lines: [
          'Who: students.',
          'Pain: the hostel kitchen closes at 8 p.m.',
          'How often: most weeknights.',
          'Today: they buy noodles from the shop by the gate.',
        ],
        bug: 0,
        fix: 'Who: first-year students in the hostels near campus.',
        explanation: '"Students" is too broad to find and talk to.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should you fall in love with: the problem or the solution?',
        answers: ['problem', 'the problem'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific enough to test, or too vague?',
        groups: ['Specific', 'Too vague'],
        items: [
          { text: 'First-year students in the Molyko hostels', group: 0 },
          { text: 'Young people', group: 1 },
          { text: 'Students who cook in shared hostel kitchens', group: 0 },
          { text: 'Everyone who eats', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the problem behind your idea: who, what\'s painful, how often, and what they do about it today.',
    starters: ['[Who] struggles with...', 'Today they...'],
  },
  deepen: {
    title: 'Get out of the building',
    summary: 'Steve Blank\'s advice to founders: your idea is a set of guesses until you leave your desk and check them with real customers. That starts with the problem.',
  },
  notes: 'Problem-first framing from customer development (Steve Blank, The Four Steps to the Epiphany, 2005). Molyko is the student neighbourhood next to the University of Buea. Problem statement template is a teaching device.',
};

export default lesson;
