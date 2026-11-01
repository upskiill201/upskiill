import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Chapter Challenge: the Finance Director meeting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the Finance Director',
  summary: 'Week 3, Monday. The Finance Director, Mr Mutua, agrees to ten minutes. He has Remi\'s paragraph printed, with three things circled in red pen. Wanjiku sits beside Remi, very quiet. This is the yes that unlocks eight days.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 2 tool in one live moment',
    'Win over a senior sceptic you\'ve never met',
    'Protect your ally while you do it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 3, Monday, 9:00 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Mr Mutua taps the first red circle. "\'One in five.\' Why not one in ten? Why not every one, like now?" He doesn\'t look up.' },
        { speaker: 'wanjiku', text: '(quietly, to Remi) He hates surprises. And he hates being sold to.' },
        { speaker: 'narrator', text: 'Remi has data, a stop rule and Wanjiku\'s idea. He also has ten minutes, and a man who has said no to more projects than Remi has had birthdays.' },
        { speaker: 'narrator', text: 'Mr Mutua finally looks up. "So. Convince me." You\'re with Remi.' },
      ],
    },
  ],
  apply: {
    scenario: 'The Finance Director\'s office, 9:00 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Remi lead with?',
        options: [
          { text: 'What Finance gets: more evidence for audit, three hours back, and a stop rule' },
          { text: 'What Kamau wants', why: 'Borrowed authority with a man who hates being sold to.' },
          { text: 'A long story about Mama Mboga', why: 'Ten minutes. Lead with his interest.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which currency does each line offer Mr Mutua?',
        groups: ['Task', 'Position', 'Inspiration'],
        items: [
          { text: 'Three hours a week back for his team', group: 0 },
          { text: 'Finance seen as part of the fix', group: 1 },
          { text: 'Keeping our biggest customer', group: 2 },
          { text: 'Better audit evidence than today', group: 0 },
          { text: 'His name on a smarter process', group: 1 },
          { text: 'Shops paid on time', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '"Why one in five, not one in ten?"',
        prompt: 'Remi\'s best answer to Mr Mutua?',
        options: [
          { text: 'I just picked it.', why: 'Honest, but it sounds careless.' },
          { text: 'Ten would be fine too, whatever you want.', why: 'Folding at the first question.' },
          { text: 'Wanjiku chose it. One in five catches more than last year\'s error rate would need. Happy to go one in four if you\'d rather.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lead with what\'s in it for ___. (one word)',
        answers: ['them', 'him', 'Finance', 'finance'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s ten minutes in order.',
        lines: ['What Finance gets', 'The small test', 'The stop rule', 'One clear ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Remi say "Wanjiku chose it"?',
        options: [
          { text: 'To hide behind her', why: 'He backs it too. He\'s crediting her.' },
          { text: 'To blame her later', why: 'Credit, not blame.' },
          { text: 'It\'s true, it credits her in front of her boss, and her judgement carries weight' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s closing line. Which version breaks Chapter 2?',
        lines: [
          'Could we start the two-week test tomorrow?',
          'Honestly, Kamau will be disappointed if Finance says no.',
          'Wanjiku and I will bring you the results on day 14.',
        ],
        bug: 1,
        fix: 'If anything goes wrong, we stop and you\'ll hear from us that day.',
        explanation: 'A veiled threat turns a sceptic into an enemy.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Mr Mutua\'s worry to Remi\'s answer.',
        pairs: [
          ['"What if it misses one?"', 'The stop rule'],
          ['"What does Finance get?"', 'Three hours and better evidence'],
          ['"Is this forever?"', 'Two weeks, then review'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mr Mutua says: "Fine. Two weeks. Wanjiku, you own it." What should Remi do next?',
        options: [
          { text: 'Tell Brian he won', why: 'It\'s not a win over anyone.' },
          { text: 'Thank them both, send a one-line summary today, and make sure Wanjiku gets the credit' },
          { text: 'Start planning the full rollout', why: 'It\'s a two-week test. Respect that.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2, in one line.',
        template: 'Find their [[1]]. Give [[2]]. Turn positions into [[3]].',
        blanks: [['currency'], ['first'], ['interests']],
        distractors: ['weakness', 'orders'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Mr Mutua\'s answer.',
        tiles: ['Fine.', 'Two', 'weeks.'],
        distractors: ['Never.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a senior person you\'d need to win over. What do they care about? What would you lead with?',
    starters: ['They care about...', 'I\'d lead with...'],
  },
  deepen: {
    title: 'Next: Week 3',
    summary: 'Five yeses, one by one. Then Remi brings them all into one room, and realises each of them agreed to a different plan. Chapter 3: Make it our idea.',
  },
  notes: 'Chapter 2 challenge. Influencing a senior sceptic with interests, currencies, small tests and credit. Mr Mutua is a narrated named extra (not a cast speaker). Fictional events.',
};

export default lesson;
