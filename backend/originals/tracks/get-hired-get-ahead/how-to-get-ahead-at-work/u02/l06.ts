import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 6 — reading a team goals doc. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The goals doc',
  summary: 'Clinton finally opens "Q3 Offline Goals". It\'s five lines long, and he\'d never read it. Tap each line to see what it tells him about where to spend his time.',
  minutes: 11,
  outcomes: ['Read a team goals document', 'Find the number that matters most', 'Spot where your work fits'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Q3 Offline Goals',
      text: 'Goal 1: Cut failed driver confirmations from 8% to 4%.\nGoal 2: Reduce "where is my confirmation?" support calls by a third.\nGoal 3: Support phones with less than 2 GB of memory.\nNot this quarter: the new driver app design.\nOwner: Ngozi. Reviewed every two weeks.',
      hotspots: [
        { phrase: 'Cut failed driver confirmations from 8% to 4%.', note: 'The number everyone watches. Any work that moves this is high value.' },
        { phrase: 'Reduce "where is my confirmation?" support calls by a third.', note: 'Sync status already moved this. Clinton can now say his work hit a team goal.' },
        { phrase: 'Support phones with less than 2 GB of memory.', note: 'The old-phones problem from Kmer, again. Clinton has real experience here, which is a rare skill on this team.' },
        { phrase: 'Not this quarter: the new driver app design.', note: 'The most useful line. It tells him what NOT to spend time on, however exciting.' },
        { phrase: 'Reviewed every two weeks.', note: 'A rhythm. If he brings progress on these goals to those reviews, his work gets noticed.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Find the number, find where you fit, and read the "not this quarter" line twice.',
    },
  ],
  apply: {
    scenario: 'Clinton reads the goals doc.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line tells Clinton what NOT to work on?',
        options: [
          { text: '"Not this quarter: the new driver app design."' },
          { text: 'Goal 1', why: 'That\'s what to work on.' },
          { text: 'The owner line', why: 'The "not this quarter" line.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fits a Q3 goal, or not this quarter?',
        groups: ['Fits a goal', 'Not this quarter'],
        items: [
          { text: 'Reduce failed confirmations', group: 0 },
          { text: 'Redesign the driver app', group: 1 },
          { text: 'Lighter sync for 2 GB phones', group: 0 },
          { text: 'Sync status for support', group: 0 },
          { text: 'New animations for the app', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each goal to Clinton\'s connection.',
        pairs: [
          ['Fewer support calls', 'Sync status already helped'],
          ['Phones under 2 GB', 'His Kmer experience'],
          ['Failed confirmations 8% to 4%', 'His next big target'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I had a great idea for the new app design. But it says "not this quarter". What now?',
        options: [
          { text: 'I\'ll write it down for later and focus on the Q3 goals now.' },
          { text: 'Build it anyway, in secret.', why: 'Respect the priorities; save the idea.' },
          { text: 'Delete the idea.', why: 'Save it for later.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s misreading.',
        lines: ['Goal 1 is the number everyone watches.', 'The goals doc is just for managers.', 'My old-phone experience fits Goal 3.'],
        bug: 1,
        explanation: 'It\'s for everyone on the team, to guide where they spend time.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s reading in order.',
        lines: ['Find the main number', 'Find where his work fits', 'Read the "not this quarter" line', 'Note when goals are reviewed'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What rare skill does Clinton bring?',
        options: [
          { text: 'Building for phones with little memory and no data' },
          { text: 'App design', why: 'That\'s not this quarter; his rare skill is old phones.' },
          { text: 'None', why: 'His Kmer experience is rare here.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the goal.',
        template: 'Cut failed confirmations from [[1]]% to [[2]]%.',
        blanks: [['8'], ['4']],
        distractors: ['50', '0', '100'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How often are the goals reviewed? Every ___ weeks. (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful to know from a goals doc, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'The main number', group: 0 },
          { text: 'What\'s not this quarter', group: 0 },
          { text: 'The font it\'s written in', group: 1 },
          { text: 'Who owns it', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your team had a "not this quarter" line, what would be on it? Are you spending time there?',
    starters: ['Not this quarter:', 'I\'m spending time on...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find your team\'s or organisation\'s goals document. If there isn\'t one, ask: "What are our top three goals right now?"',
  },
  notes: 'Goal numbers are story details.',
};

export default lesson;
