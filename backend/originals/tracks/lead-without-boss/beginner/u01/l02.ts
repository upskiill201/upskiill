import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Reading: where power comes from without a title (French & Raven 1959). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Power without a title',
  summary: 'On the matatu home, Remi messages Brian: "How do I lead people who don\'t work for me?" Brian sends back a photo of a page from his old intern notebook. "Read this. I learned it the hard way."',
  minutes: 12,
  outcomes: [
    'Know the five classic sources of power',
    'Know which ones you have without a title',
    'Start building the kinds of power that last',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five kinds of power',
      html: "<p>In 1959, psychologists <strong>John French</strong> and <strong>Bertram Raven</strong> described five \"bases\" of social power. They're still taught in leadership courses today:</p><ul><li><strong>Legitimate:</strong> power from your position or title. \"I'm the manager.\"</li><li><strong>Reward:</strong> power to give things people want: pay, promotions, good projects.</li><li><strong>Coercive:</strong> power to punish.</li><li><strong>Expert:</strong> power from knowing things others need.</li><li><strong>Referent:</strong> power from being liked, trusted and respected. People help you because of who you are.</li></ul><p>Raven later added a sixth: <strong>informational</strong> power, from having information and explaining it well.</p><h3>What Remi has</h3><p>No title, nothing to hand out, and no way to punish anyone (good). But the last three are open to anyone. Remi can become the person who understands refunds better than anyone (<strong>expert</strong>), who explains them clearly (<strong>informational</strong>), and who people actually like working with (<strong>referent</strong>).</p><h3>The good news</h3><p>Those are the kinds of power that tend to win real commitment, not just compliance. Research has often linked expert and referent power to more willing cooperation, while coercive power tends to breed resentment. People do what a title tells them. They go the extra mile for someone they trust.</p>",
    },
    {
      kind: 'check',
      question: 'Which two bases of power can anyone build, with no title?',
      options: ['Expert and referent', 'Legitimate and reward', 'Coercive and legitimate'],
      answer: 0,
      explanation: 'Knowledge and trust are open to everyone.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'No title? Build expert, informational and referent power: know it, explain it, be someone people want to help.',
    },
  ],
  apply: {
    scenario: 'The matatu home, reading Brian\'s notebook.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who described the five bases of power?',
        options: [
          { text: 'Google, 2008', why: 'That\'s Project Oxygen, about managers.' },
          { text: 'French and Raven, 1959' },
          { text: 'Brian, in his notebook', why: 'He copied it. French and Raven came first.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the power to its source.',
        pairs: [
          ['Legitimate', 'Your title'],
          ['Expert', 'What you know'],
          ['Referent', 'Being liked and trusted'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Remi have it?',
        groups: ['He can build it', 'He doesn\'t have it'],
        items: [
          { text: 'Expert power', group: 0 },
          { text: 'Legitimate power', group: 1 },
          { text: 'Referent power', group: 0 },
          { text: 'Reward power', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So without a title, I basically have no power?',
        prompt: 'What does Brian reply?',
        options: [
          { text: 'You have the best kinds. Know refunds better than anyone, explain them clearly, and be easy to work with.' },
          { text: 'Correct. Wait for a promotion.', why: 'Expert and referent power don\'t need one.' },
          { text: 'Use mine. Tell them I said so.', why: 'Borrowed power runs out fast.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Power from being liked, trusted and respected is called ___ power. (one word)',
        answers: ['referent', 'Referent'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which kind of power tends to breed resentment?',
        options: [
          { text: 'Expert', why: 'People usually welcome expertise.' },
          { text: 'Referent', why: 'People help because they want to.' },
          { text: 'Coercive' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s plan to build power. Which line won\'t work?',
        lines: [
          'Learn the refund process better than anyone.',
          'Remind people I report to Brian, who reports to Kamau.',
          'Explain it simply, in one page.',
        ],
        bug: 1,
        fix: 'Be the person who\'s easiest to work with on this.',
        explanation: 'Name-dropping your boss is borrowed legitimate power, and people resent it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s power-building in order.',
        lines: ['Learn how refunds really work', 'Explain it clearly', 'Help people with their part', 'Earn their trust'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'People do what a [[1]] tells them. They go the extra mile for someone they [[2]].',
        blanks: [['title'], ['trust']],
        distractors: ['fear', 'pay'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s three powers.',
        tiles: ['Know', 'it,', 'explain', 'it,', 'be', 'trusted.'],
        distractors: ['boss'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone with no title whom people listen to anyway. Which kinds of power do they have? Which could you build?',
    starters: ['People listen to them because...', 'I could build...'],
  },
  deepen: {
    title: 'Your power inventory',
    summary: 'Write down one thing you know better than most people around you (expert), and one reason people like working with you (referent). Those are your starting powers.',
  },
  notes: 'John R. P. French & Bertram Raven (1959), "The Bases of Social Power", in D. Cartwright (Ed.), Studies in Social Power; Raven (1965) added informational power. Outcomes of power bases (expert/referent linked to commitment, coercive to resistance): e.g. Yukl & Falbe (1991); hedged as "has often linked".',
};

export default lesson;
