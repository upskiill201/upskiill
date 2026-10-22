import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Reading: decoding a job ad. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Decoding the job ad',
  summary: 'Remi reads the Mtaa Labs ad properly for the first time. Ada shows him how a job ad is a cheat sheet: it tells you most of what they\'ll ask about.',
  minutes: 12,
  outcomes: [
    'Separate must-haves from nice-to-haves',
    'Predict interview topics from the ad',
    'Plan evidence for each key skill',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The ad is a cheat sheet',
      html: '<p>The Mtaa Labs ad, shortened:</p><blockquote><p><strong>Developer intern (12 weeks).</strong> You\'ll build features for 3,000 shop owners. <strong>Must have:</strong> JavaScript, Git, clear communication. <strong>Nice to have:</strong> React Native, SQL. <strong>You\'ll love it here if</strong> you\'re curious about small businesses and like solving problems with real users.</p></blockquote><p>How to read it:</p><ul><li><strong>Must-haves</strong> are likely interview topics. Prepare evidence for each: JavaScript (his booking app), Git (the coding club repo), communication (his club presentations).</li><li><strong>Nice-to-haves</strong> often aren\'t required. Remi has used SQL a little; he\'ll say so honestly. He hasn\'t used React Native, so he\'ll say he\'s keen to learn it.</li><li><strong>The "you\'ll love it here" line</strong> describes the person they want. Curious about small businesses? The uncle\'s shop. Real users? The 120 people using his app.</li><li><strong>Repeated words</strong> matter: "real users" appears twice. Expect a question about it.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Must-haves become questions. Prepare one piece of evidence for each. Be honest about nice-to-haves.',
    },
  ],
  apply: {
    scenario: 'The Mtaa Labs ad.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Must-have or nice-to-have in the ad?',
        groups: ['Must-have', 'Nice-to-have'],
        items: [
          { text: 'JavaScript', group: 0 },
          { text: 'React Native', group: 1 },
          { text: 'Git', group: 0 },
          { text: 'SQL', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the must-have to Remi\'s evidence.',
        pairs: [
          ['JavaScript', 'His booking app'],
          ['Git', 'The coding club repo'],
          ['Clear communication', 'His club presentations'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi hasn\'t used React Native. What should he say if asked?',
        options: [
          { text: '"Yes, loads."', why: 'Never claim skills you don\'t have.' },
          { text: '"No." and stop there', why: 'Add what\'s close and your interest.' },
          { text: '"Not yet, but I\'ve used JavaScript a lot and I\'m keen to learn it."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks is the Mtaa Labs internship?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I don\'t have every nice-to-have. Should I have applied?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No, withdraw.', why: 'Nice-to-haves usually aren\'t required.' },
          { text: 'Yes. Nice-to-haves are a wish list. You have the must-haves and real users. That\'s why you got the interview.' },
          { text: 'Pretend you have them.', why: 'Honesty matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading the ad.',
        template: 'Must-haves become [[1]]. Prepare one piece of [[2]] for each.',
        blanks: [['questions'], ['evidence']],
        distractors: ['excuses', 'gossip'],
      },
      {
        kind: 'mcq',
        prompt: '"Real users" appears twice in the ad. What should Remi expect?',
        options: [
          { text: 'Nothing; it\'s just filler', why: 'Repeated words signal priorities.' },
          { text: 'A question about his grades', why: 'Repetition points to real users.' },
          { text: 'A question about working with real users' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s ad notes is a mistake?',
        lines: [
          'JavaScript: booking app.',
          'Git: coding club repo.',
          'React Native: say I\'m an expert.',
          'Real users: 120 people use my app.',
        ],
        bug: 2,
        fix: 'React Native: not yet; keen to learn.',
        explanation: 'Overclaiming skills gets found out fast.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to decode a job ad.',
        lines: ['Highlight the must-haves', 'Note the nice-to-haves', 'Find the "person we want" line', 'Spot repeated words', 'Match evidence to each'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence Remi has, or a gap to be honest about?',
        groups: ['Has evidence', 'Honest gap'],
        items: [
          { text: 'JavaScript', group: 0 },
          { text: 'React Native', group: 1 },
          { text: 'Working with real users', group: 0 },
          { text: 'Years of professional work', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take a job ad you like. List the must-haves and your evidence for each. Where are your honest gaps?',
    starters: ['Must-have:... Evidence:...', 'My honest gap:...'],
  },
  deepen: {
    title: 'Apply anyway',
    summary: 'Job ads often list more than the employer strictly needs. If you have most must-haves and real evidence, it\'s usually worth applying.',
  },
  notes: 'Fictional Mtaa Labs ad. Advice on must-haves vs nice-to-haves is common recruiting guidance.',
};

export default lesson;
