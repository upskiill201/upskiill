import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: forty fire emojis, zero evidence. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Forty fire emojis',
  summary: 'Clinton posts his big idea, CampusEats, in five group chats. Forty fire emojis come back. He\'s ready to spend his savings. Then Miracle asks one question he can\'t answer.',
  minutes: 11,
  outcomes: [
    'Meet Clinton, David, Miracle and CampusEats',
    'Tell excitement from evidence',
    'Know the one question every idea has to answer',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Genius',
      beats: [
        { speaker: 'narrator', text: 'Buea, the first month of the semester. Clinton, first-year Computer Science, has an idea: CampusEats, food delivered to your hostel room. He posts it in five group chats, about 900 students in all.' },
        { speaker: 'clinton', text: 'Forty fire emojis in one hour! "Bro this is genius." "When can I use it?" I\'m spending my savings on a developer this week.' },
        { speaker: 'david', text: 'How many of them asked how to order?' },
        { speaker: 'clinton', text: '...None yet. But they love it!' },
        { speaker: 'narrator', text: 'That night, a voice note from Miracle, his old study mentor, now working at a startup in Lagos.' },
        { speaker: 'miracle', text: 'Clinton, I\'m proud of you for starting. But forty people said it\'s genius. How many of them would pay you tomorrow?' },
        { speaker: 'tey', text: 'That\'s the question this course answers: will people pay for this? You\'ll find out the way good founders do, before spending money on building anything.' },
      ],
      choice: {
        prompt: 'What should Clinton do with his savings this week?',
        options: [
          { text: 'Keep them, and find out first whether anyone would actually pay.', outcome: 'Right. Finding out costs a few days and almost nothing. Building first costs his savings.', best: true },
          { text: 'Hire the developer: forty people love it.', outcome: 'Forty emojis cost nothing to give. They tell him people like the idea, not that they\'d pay for it.' },
          { text: 'Give up: nobody has ordered.', outcome: 'Nobody can order yet. He hasn\'t tested anything. Too early to quit, and too early to build.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring an idea of your own to this course: a business, a side-hustle, or something you\'d like to sell one day. Every lesson helps you test it.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s big idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "validating" a business idea mean?',
        options: [
          { text: 'Finding evidence that people have the problem and will pay for your solution' },
          { text: 'Getting your friends to say it\'s a good idea', why: 'Friends being kind isn\'t evidence of paying customers.' },
          { text: 'Building the product and hoping', why: 'Validation happens before building.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Excitement or evidence?',
        groups: ['Excitement', 'Evidence'],
        items: [
          { text: 'Forty fire emojis', group: 0 },
          { text: 'A student pays in advance for a delivery', group: 1 },
          { text: '"Bro this is genius"', group: 0 },
          { text: 'Someone asks "how do I order?"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their part.',
        pairs: [
          ['Clinton', 'Has the idea'],
          ['David', 'Asks "how many?"'],
          ['Miracle', 'Mentors by voice note'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the forty students who reacted, how many asked how to order?',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Forty people love it. Isn\'t that proof?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'It\'s proof they like the idea. It isn\'t proof they\'d pay. Let\'s find that out before you spend your savings.' },
          { text: 'Yes, forty is plenty. Build it.', why: 'Liking costs nothing; paying is the real test.' },
          { text: 'No, forty is too few. Wait for a hundred.', why: 'More emojis won\'t answer the paying question either.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'About what share of the 900 students in the chats reacted with a fire emoji?',
        options: [
          { text: 'About 4%' },
          { text: 'About 40%', why: '40 out of 900 is about 4.4%.' },
          { text: 'About 90%', why: 'Only 40 of 900 reacted.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s question.',
        template: 'How many of them would [[1]] you [[2]]?',
        blanks: [['pay'], ['tomorrow']],
        distractors: ['like', 'someday'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Clinton should do, from first to last.',
        lines: ['Write down the idea', 'Find out if people have the problem', 'Find out if they\'d pay', 'Only then build'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Clinton\'s plan is the risky one?',
        lines: [
          'Post the idea in group chats.',
          'Count the reactions.',
          'Spend all my savings on a developer this week.',
          'Launch next month.',
        ],
        bug: 2,
        fix: 'Spend a few days and almost no money finding out if anyone would pay.',
        explanation: 'Reactions aren\'t orders. Building first risks everything on a guess.',
      },
      {
        kind: 'mcq',
        prompt: 'What will Clinton spend most of this course doing?',
        options: [
          { text: 'Collecting evidence about customers before building' },
          { text: 'Learning to code the app', why: 'This course is about testing the idea, not building it.' },
          { text: 'Writing a 40-page business plan', why: 'Evidence first; plans come later.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own idea in one sentence. Has anyone ever paid you for it, or something like it?',
    starters: ['My idea is...', 'So far, people have...'],
  },
  deepen: {
    title: 'Why test first?',
    summary: 'Building something costs money and months. Testing whether people want it can cost a few days and almost nothing. Founders who test first lose less when an idea is wrong, and most first ideas are.',
  },
  notes: 'Story numbers are fictional: 5 group chats, about 900 members, 40 reactions (about 4.4%), 0 order requests. Setting: University of Buea, Cameroon; currency FCFA. Clinton, David and Miracle per CAST.md (after How to Make People Listen to You).',
};

export default lesson;
