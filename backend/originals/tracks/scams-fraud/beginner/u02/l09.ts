import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the scam file v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The scam file v2',
  summary: 'Three new cases go into Grace\'s notebook: Femi\'s platform, Maureen\'s romance, and Tyler\'s gifting circle. A pattern is emerging. Tap through version 2.',
  minutes: 11,
  outcomes: [
    'Compare several scam cases side by side',
    'Spot patterns across different scams',
    'Add investment scams to your own file',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s scam file v2',
      text: 'CASE 2: Femi. Channel: Instagram. Mask: "mentor". Ask: £500, then a £400 "release fee". Hook: fake profits. Outcome: £500 lost, fee refused, reported. CASE 3: Maureen (from memory). Channel: social app. Mask: "David", a lonely engineer. Ask: crypto platform, £38,000. Hook: months of affection. Outcome: lost, no video call ever. CASE 4: Tyler\'s gifting circle. Channel: group chat. Mask: friends. Ask: £100 plus two recruits. Hook: "get £800". Outcome: Jayden said no. PATTERN: big promise, small start, the money only flows one way. CHECKS ADDED: regulator\'s register and warning list. Never pay to withdraw. Cold contact = warning.',
      hotspots: [
        { phrase: 'then a £400 "release fee"', note: 'The wall: paying to get your own money. Always a scam.' },
        { phrase: 'Hook: months of affection', note: 'The slowest, cruellest hook. Trust that feels earned.' },
        { phrase: 'no video call ever', note: 'The warning sign that was there from the start.' },
        { phrase: 'Ask: £100 plus two recruits', note: 'If the money comes from new joiners, most people lose.' },
        { phrase: 'Jayden said no', note: 'The first case where the scam file protected someone before any money moved.' },
        { phrase: 'the money only flows one way', note: 'In every case: in is easy, out is impossible.' },
        { phrase: 'Never pay to withdraw', note: 'A new house rule, in capitals in the notebook.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Across investment scams the pattern repeats: big promise, small start, money that only flows one way. Add each new check to your file as you learn it.',
    },
  ],
  apply: {
    scenario: 'Reading file v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each case to its hook.',
        pairs: [
          ['Femi', 'Fake profits'],
          ['Maureen', 'Months of affection'],
          ['Tyler\'s circle', '"Get £800"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What pattern does Grace see across the cases?',
        options: [
          { text: 'Big promise, small start, money that only flows one way' },
          { text: 'They were all on the same app', why: 'Different channels.' },
          { text: 'They all targeted old people', why: 'Ages varied.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which case?',
        groups: ['Femi', 'Maureen'],
        items: [
          { text: 'A "mentor" on Instagram', group: 0 },
          { text: '"David" on a rig', group: 1 },
          { text: '£400 release fee', group: 0 },
          { text: '£38,000 lost', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'I\'m in the file now? As a hero?',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'No, you\'re a victim.', why: 'He said no; he lost nothing.' },
          { text: 'You\'re not in it.', why: 'Case 4 is his.' },
          { text: 'As the first case where nobody lost anything. That\'s the best kind of hero.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'New house rule.',
        template: 'Never [[1]] to [[2]].',
        blanks: [['pay'], ['withdraw']],
        distractors: ['save', 'invest'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many cases are in the file now (including case 1)?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v2 is wrong?',
        lines: [
          'Case 2: £500 lost, fee refused.',
          'Case 4: Jayden said no.',
          'Case 3: Maureen video called David weekly.',
        ],
        bug: 2,
        fix: 'Case 3: no video call ever.',
        explanation: 'The lack of video calls was a key warning sign.',
      },
      {
        kind: 'mcq',
        prompt: 'Which new check was added to the file?',
        options: [
          { text: 'Follower counts', why: 'Those prove nothing.' },
          { text: 'The regulator\'s register and warning list' },
          { text: 'Website design quality', why: 'Looks prove nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cases by when they happened in the course.',
        lines: ['Case 1: "Hi Mum"', 'Case 2: Femi\'s platform', 'Case 3: Maureen remembered', 'Case 4: Tyler\'s circle'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "in is easy, out is impossible" describe?',
        options: [
          { text: 'How money moves in investment scams' },
          { text: 'A real savings account', why: 'Real accounts let you withdraw.' },
          { text: 'A gym membership', why: 'It\'s about scams.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Add one investment or money-making scam you\'ve seen to your own file. What was the hook?',
    starters: ['Case:... Channel:... Hook:...'],
  },
  deepen: {
    title: 'Patterns beat details',
    summary: 'Scam details change constantly: new apps, new coins, new stories. The patterns barely change. Learning the patterns protects you from versions that haven\'t been invented yet.',
  },
  notes: 'Scam file v2 (fictional). Maureen, Tyler narrated.',
};

export default lesson;
