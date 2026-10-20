import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: friends, family and the group chat. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Friends, family and the group chat',
  summary: 'Clinton\'s plan for more evidence: a poll in his class group chat and a call to his mum. David has doubts. Fact or myth: who gives you honest answers?',
  minutes: 11,
  outcomes: [
    'Know when friends and family help, and when they mislead',
    'See why group-chat polls are weak evidence',
    'Find the right people to talk to',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You can never learn anything from friends and family.',
          isFact: false,
          explain: 'Myth. If they have the problem and you ask about their life (not your idea), they can give you real facts. It\'s asking for their opinion of your idea that fails.',
        },
        {
          text: 'People who care about you are the most likely to give you kind answers instead of true ones.',
          isFact: true,
          explain: 'Fact. They don\'t want to hurt you. That\'s why "Mom Test" questions matter most with them.',
        },
        {
          text: 'A group-chat poll ("Would you use a laundry service? Yes/No") is good evidence.',
          isFact: false,
          explain: 'Myth. It\'s an opinion about the future, answered in public, often by people who just want to support you. It costs nothing to tap "Yes".',
        },
        {
          text: 'The best people to talk to are strangers who have the problem.',
          isFact: true,
          explain: 'Fact. No reason to be polite, and they live the problem. Hostel students Clinton doesn\'t know, in the rainy season, are ideal.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask "who has this problem?" before "who can I reach easily?". The easy people are often the wrong people.',
    },
  ],
  apply: {
    scenario: 'Who to ask.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Clinton\'s group-chat poll: "Would you use a laundry service?" 34 yes, 2 no. What does it show?',
        options: [
          { text: 'Very little: it\'s a free, public opinion about the future' },
          { text: 'That 34 people will pay', why: 'Tapping "yes" costs nothing.' },
          { text: 'That the idea is proven', why: 'Opinions aren\'t proof.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good person to learn from, or likely to mislead?',
        groups: ['Good source', 'Likely to mislead'],
        items: [
          { text: 'A stranger in a Molyko hostel during rainy season', group: 0 },
          { text: 'Clinton\'s mum, asked "is my idea good?"', group: 1 },
          { text: 'A student who paid Mama Rose last week', group: 0 },
          { text: 'A friend who just wants to support him', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My mum says WashDay is brilliant. That counts, right?',
        prompt: "David's best reply?",
        options: [
          { text: 'Your mum would call anything you do brilliant. Does she have the problem? If not, find people who do.' },
          { text: 'Yes, mums know best.', why: 'She loves you; that makes her a biased judge.' },
          { text: 'Never talk to your mum again.', why: 'Just don\'t count her opinion as evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to its problem.',
        pairs: [
          ['Mum', 'Wants to be kind'],
          ['Group-chat poll', 'Public, free opinions'],
          ['People without the problem', 'Can only guess'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The best people to ask.',
        template: '[[1]] who [[2]] the problem.',
        blanks: [['Strangers'], ['have']],
        distractors: ['Friends', 'like'],
      },
      {
        kind: 'mcq',
        prompt: 'When CAN a friend give you good evidence?',
        options: [
          { text: 'When they have the problem and you ask about their life, not your idea' },
          { text: 'When you ask them to rate your idea out of 10', why: 'That\'s exactly when they\'re kind instead of honest.' },
          { text: 'Never', why: 'With the right questions, they can.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the poll, 34 voted yes out of 36. How many voted no?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which source in Clinton\'s plan will give the weakest evidence?',
        lines: [
          'Ten strangers in the Molyko hostels.',
          'Students queuing at Mama Rose\'s stand.',
          'A yes/no poll in my class group chat.',
          'The hostel caretaker who sees laundry every day.',
        ],
        bug: 2,
        fix: 'Replace it with conversations about their last laundry day.',
        explanation: 'A public yes/no poll about the future is the weakest kind of evidence.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these sources from strongest to weakest evidence.',
        lines: ['A stranger who paid Mama Rose last week', 'A friend describing last Saturday', 'A group-chat poll', 'Mum saying "brilliant"'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where could Clinton find people with the problem?',
        groups: ['Good place', 'Poor place'],
        items: [
          { text: 'Outside Mama Rose\'s stand', group: 0 },
          { text: 'The hostel washing area on Saturday', group: 0 },
          { text: 'His family WhatsApp group', group: 1 },
          { text: 'Students who live at home with a washing machine', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where do the people with your idea\'s problem actually spend time? How could you meet three of them this week?',
    starters: ['They spend time at...', 'I could meet them by...'],
  },
  deepen: {
    title: 'Go where the problem is',
    summary: 'Clinton gets his best conversations standing near Mama Rose\'s stand and in the hostel washing area on Saturday mornings. Go to where the problem happens, and it comes up on its own.',
  },
  notes: 'Fictional poll: 34 yes, 2 no (36 votes). Guidance on biased sources (friends/family) and opinion polls from The Mom Test (Fitzpatrick, 2013) and customer-development practice.',
};

export default lesson;
