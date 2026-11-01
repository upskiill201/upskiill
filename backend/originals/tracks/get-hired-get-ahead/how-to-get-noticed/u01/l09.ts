import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 9 — show, don't claim: adjectives vs a two-line proof. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Show, don\'t claim',
  summary: 'Clinton\'s first "About me" is a pile of adjectives: hardworking, passionate, dynamic, team player. Miracle reads it out loud in a robot voice. Then she shows him what one true sentence does instead.',
  minutes: 11,
  outcomes: ['Replace adjectives with proof', 'Write a two-line skill statement', 'Spot empty words that recruiters skip'],
  learn: [
    {
      kind: 'compare',
      title: 'Adjectives vs. proof',
      before: { label: 'Claims', text: 'I am a hardworking, passionate and dynamic team player with excellent communication skills.\n\nEvery word is a claim. Recruiters see this sentence hundreds of times a week, so their eyes slide straight past it. Nothing here is Clinton\'s.' },
      after: { label: 'Proof', text: 'I keep a 300-student department group organised, posting one clear update a day. Last year I grew our campus tech meet-up from 6 to 40 members.\n\nNo adjectives at all, and you can see a hardworking communicator and team player. The reader decides he\'s those things, which is far more convincing than him saying so.' },
      notes: [
        'Adjectives are claims. Actions and results are proof.',
        'Let the reader draw the conclusion: show "grew to 40 members", and they think "leader".',
        'Words to cut on sight: passionate, dynamic, hardworking, team player, go-getter, results-driven.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Don\'t tell them you\'re a great communicator. Show them something you communicated, and what happened.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his "About me".',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Claim or proof?',
        groups: ['Claim', 'Proof'],
        items: [
          { text: 'Passionate about technology', group: 0 },
          { text: 'Built a fixtures sheet the whole faculty now uses', group: 1 },
          { text: 'Excellent team player', group: 0 },
          { text: 'Grew a meet-up from 6 to 40 members', group: 1 },
          { text: 'Dynamic go-getter', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence makes Brenda think "he\'s a good communicator" without him saying it?',
        options: [
          { text: '"I have excellent communication skills."', why: 'A claim she can\'t check.' },
          { text: '"I\'m a communication expert."', why: 'A bigger claim, still no proof.' },
          { text: '"I write the daily update for a 300-student group, and questions in the chat dropped by half."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the empty sentence.',
        lines: ['I captain the CS football team.', 'I am a hardworking and dynamic individual.', 'I fix phones at my aunt\'s stall every Saturday.'],
        bug: 1,
        explanation: 'Two adjectives, no proof. The other two lines show work without saying "hardworking".',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: '"Passionate, dynamic team player." I\'ve read that sentence 40 times this week. What\'s one thing only YOU could write?',
        options: [
          { text: 'I grew our campus tech meet-up from 6 to 40 members in a year.' },
          { text: 'I\'m extremely passionate.', why: 'Still an adjective. Show something.' },
          { text: 'I\'ll add more adjectives so I stand out.', why: 'More adjectives, same problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each claim to the proof that replaces it.',
        pairs: [
          ['Hardworking', 'Run the meet-up every week for two years'],
          ['Good with customers', 'Calm angry customers at the phone stall'],
          ['Leader', 'Turned a losing run into four wins in five'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is proof more convincing than adjectives?',
        options: [
          { text: 'It\'s longer', why: 'Not about length. It\'s about letting the reader decide for themselves.' },
          { text: 'The reader draws the conclusion themselves, so they believe it' },
          { text: 'Recruiters don\'t know what adjectives mean', why: 'They do. They just see the same ones all day.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Adjectives are [[1]]. Actions and results are [[2]].',
        blanks: [['claims'], ['proof']],
        distractors: ['opinions', 'grades', 'lies'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a proof sentence for Clinton.',
        tiles: ['I', 'grew', 'our', 'tech', 'meet-up', 'from', '6', 'to', '40', 'members'],
        distractors: ['passionate', 'dynamic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one word from the "cut on sight" list. (one word)',
        answers: ['passionate', 'dynamic', 'hardworking', 'hard-working', 'go-getter', 'gogetter', 'results-driven'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it or cut it in Clinton\'s About me?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Final-year Computer Science student, University of Buea', group: 0 },
          { text: 'Results-driven self-starter', group: 1 },
          { text: 'I organise a 40-member tech meet-up', group: 0 },
          { text: 'Passionate about everything', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the two-sentence version of "what you can do", using no adjectives at all. Only actions and results.',
    starters: ['I...', 'Last year, I...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find your current CV, profile or bio, if you have one. Highlight every adjective. For each one, write the proof that could replace it.',
  },
  notes: '"Show, don\'t tell" applied to applications; the cut-on-sight list mirrors LinkedIn\'s past "most overused buzzwords" lists (e.g. passionate, motivated, creative) without quoting a specific year\'s ranking.',
};

export default lesson;
