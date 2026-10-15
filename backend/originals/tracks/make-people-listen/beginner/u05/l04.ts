import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Step-by-step: find what you both want (positions vs interests, Getting to Yes). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Find what you both want',
  summary: 'Miracle and Tey spread a big sheet of paper on the studio desk. Left side: what Miracle wants. Right side: what her parents want. Tey: "Now, producer, find the overlap."',
  minutes: 12,
  outcomes: [
    'Separate positions (what people say) from interests (what they need)',
    'Find the shared interests under a disagreement',
    'Build options that meet both sides\' needs',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Find the overlap in four steps',
      steps: [
        {
          title: '1. Write down the positions',
          body: 'Miracle: "Lagos." Parents: "The bank." These are positions: the answers each side has already chosen. Arguing positions goes in circles.',
        },
        {
          title: '2. Dig for the interests underneath',
          body: 'Ask "why?" for each side. Miracle wants to learn fast, do meaningful work, and grow. Her parents want her safe, financially secure, and not alone. These are interests: the needs behind the positions.',
        },
        {
          title: '3. Circle what you share',
          body: 'Look closely. Everyone wants Miracle to be secure, to grow, and to stay close as a family. Those shared interests are the bridge.',
        },
        {
          title: '4. Build options that meet both',
          body: 'Not "Lagos or bank", but options: a six-month savings buffer before moving; checking the startup\'s funding; a cousin in Lagos she can stay with at first; a video call every Sunday; a promise to review after a year.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Arguing positions vs meeting interests',
      before: {
        label: 'Positions',
        text: 'Miracle: "Lagos." Papa: "The bank." Miracle: "LAGOS." Papa: "THE BANK." (Papa leaves the table.)',
      },
      after: {
        label: 'Interests',
        text: 'Miracle: "You want me safe and not alone. I want that too. What if I save six months of money first, stay with Auntie Ngozi\'s family to start, and we call every Sunday?"',
      },
      notes: [
        'It names their interest first: safety, not being alone.',
        'It shows that interest is shared.',
        'It offers specific options that answer their worries.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Positions clash. Interests often overlap. Dig under "what" to find "why", then build options for both.',
    },
  ],
  apply: {
    scenario: 'Tey FM. The big sheet of paper.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a position and an interest?',
        options: [
          { text: 'They\'re the same thing', why: 'The difference is the whole lesson.' },
          { text: 'A position is the answer someone chose; an interest is the need behind it' },
          { text: 'Interests are about money only', why: 'Interests include safety, family, growth, meaning.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Position, or interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"Take the bank job."', group: 0 },
          { text: 'Wanting Miracle to be financially secure', group: 1 },
          { text: '"I\'m going to Lagos."', group: 0 },
          { text: 'Wanting meaningful work and fast learning', group: 1 },
          { text: 'Wanting the family to stay close', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Write down the positions', 'Dig for the interests underneath', 'Circle what you share', 'Build options that meet both'],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Isn\'t offering options like "save six months first" giving in?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, never compromise.', why: 'These options cost her little and answer their fears.' },
          { text: 'Then just take the bank job.', why: 'That\'s not the only alternative.' },
          { text: 'No: you still choose. You\'re just answering their real worries, which is how they can say yes.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Positions clash. Interests often ___. (one word)',
        answers: ['overlap', 'match', 'align'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which of these is a shared interest for Miracle and her parents?',
        options: [
          { text: 'Miracle being secure and the family staying close' },
          { text: 'Working at the bank', why: 'That\'s her parents\' position.' },
          { text: 'Moving to Lagos', why: 'That\'s Miracle\'s position.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s option list. Which one doesn\'t answer any of her parents\' worries?',
        lines: [
          'Save six months of money before moving.',
          'Stay with Auntie Ngozi\'s family at first.',
          'Buy a nicer phone so I look successful.',
          'Call home every Sunday.',
        ],
        bug: 2,
        fix: 'Check the startup\'s funding and share it with Papa.',
        explanation: 'Their worries are money, safety and distance. A nicer phone answers none of them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the worry to an option.',
        pairs: [
          ['"Startups fail"', 'Check the funding; save six months first'],
          ['"Who will look after you?"', 'Stay with Auntie Ngozi at first'],
          ['"We\'ll never see you"', 'A call every Sunday, home at Christmas'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s bridge sentence.',
        template: 'You want me [[1]] and not alone. I want that [[2]]. What if I save six [[3]] of money first?',
        blanks: [['safe'], ['too'], ['months']],
        distractors: ['rich', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the bridge.',
        tiles: ['You', 'want', 'me', 'safe.', 'I', 'want', 'that', 'too.'],
        distractors: ['Lagos'],
      },
    ],
  },
  reflect: {
    prompt: 'Take a disagreement you\'re in. What are the two positions? What interests might be underneath each? What do you share?',
    starters: ['The positions: ...', 'Their interest: ...', 'What we share: ...'],
  },
  deepen: {
    title: 'The sheet of paper',
    summary: 'Before a hard conversation, draw two columns: your interests and theirs (your best guess). Circle anything in both. Start the conversation from the circle.',
  },
  notes: 'Positions vs interests and inventing options for mutual gain: Fisher, Ury & Patton, Getting to Yes (1981). Auntie Ngozi is a named extra.',
};

export default lesson;
