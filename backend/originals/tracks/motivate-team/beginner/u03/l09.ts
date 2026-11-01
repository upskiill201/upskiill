import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: "How we run Clinic Success", the team's own page, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: how we run',
  summary: 'Week 4, Friday. Bisi suggests the team write its own one-page "How we run". Miracle only adds one line. Tap through to see every Chapter 3 tool on it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 3 tool on one team page',
    'Let a team write its own way of working',
    'Keep the guardrails short and clear',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'How we run Clinic Success (written by the team)',
      text: 'Fixed: patient data rules, and medical wording checked by Halima. Everything else is ours: how we onboard, which language, our call order. Bisi owns the script; anyone can suggest changes. New problems get a learning goal before a target. Stuck over a day? Tell Miracle. Check-ins are once, agreed, and end with "What can I clear?" When an idea works, it goes on the board with a name. When it doesn\'t, we write what we learned.',
      hotspots: [
        { phrase: 'Fixed: patient data rules, and medical wording checked by Halima.', note: 'Few, clear guardrails, with reasons. Safety without control.' },
        { phrase: 'Everything else is ours', note: 'Autonomy, said out loud. People take freedom when they\'re told they have it.' },
        { phrase: 'Bisi owns the script; anyone can suggest changes.', note: 'Ownership, not a ₦5,000 bounty. Intrinsic motivation, protected.' },
        { phrase: 'New problems get a learning goal before a target.', note: 'Mastery: Seijts and Latham, in the team\'s own words.' },
        { phrase: 'Check-ins are once, agreed, and end with "What can I clear?"', note: 'Checking in, not checking up.' },
        { phrase: 'it goes on the board with a name', note: 'Progress made visible: the progress principle and a nourisher.' },
        { phrase: 'When it doesn\'t, we write what we learned.', note: 'Learning from failure is a catalyst. And it\'s about to be tested.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A team page that motivates: few clear guardrails, freedom said out loud, ownership, learning goals, real check-ins, visible wins and safe failure.',
    },
  ],
  apply: {
    scenario: 'Line check, the team\'s page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Miracle only add one line?',
        options: [
          { text: 'She was busy', why: 'It was on purpose.' },
          { text: 'She didn\'t care', why: 'She cared enough to let go.' },
          { text: 'A page the team writes is a page the team owns' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool is it?',
        groups: ['Autonomy', 'Mastery', 'Progress'],
        items: [
          { text: '"Everything else is ours"', group: 0 },
          { text: 'Learning goal before a target', group: 1 },
          { text: 'Wins go on the board with a name', group: 2 },
          { text: 'Bisi owns the script', group: 0 },
          { text: 'Write what we learned', group: 1 },
          { text: '"What can I clear?"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Which line did you add?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: '"Stuck over a day? Tell Miracle." The rest is all yours.' },
          { text: 'I rewrote most of it.', why: 'Not true, and it would undo the ownership.' },
          { text: 'I\'ll approve it next week.', why: 'It\'s their page, not a submission.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Learning from failure is a ___ in Amabile\'s terms. (one word)',
        answers: ['catalyst', 'Catalyst'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why write "When it doesn\'t, we write what we learned"?',
        options: [
          { text: 'To blame people', why: 'It\'s learning, not blame.' },
          { text: 'It makes trying safe, so people keep trying' },
          { text: 'For audit', why: 'It\'s for the team.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'A draft line Folake suggested. Which one breaks Chapter 3?',
        lines: [
          'Fixed: patient data rules.',
          'Every script change needs COO sign-off first.',
          'Bisi owns the script.',
        ],
        bug: 1,
        fix: 'Medical wording in any change is checked by Halima.',
        explanation: 'COO sign-off on every change takes ownership back and slows everything.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the page in order.',
        lines: ['What\'s fixed', 'What\'s ours', 'Who owns what', 'How we check in', 'How we handle wins and failures'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['Learning goal first', 'Seijts and Latham'],
          ['Wins on the board', 'Amabile and Kramer'],
          ['Ownership, not bounties', 'Deci, Koestner and Ryan'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A page the team [[1]] is a page the team [[2]].',
        blanks: [['writes'], ['owns']],
        distractors: ['ignores', 'hates'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the freedom line.',
        tiles: ['Everything', 'else', 'is', 'ours.'],
        distractors: ['hers.'],
      },
    ],
  },
  reflect: {
    prompt: 'If your team or group wrote its own "How we run" page, what would be on it? What would the leader add?',
    starters: ['We\'d write...', 'The leader would add...'],
  },
  deepen: {
    title: 'Let them write it',
    summary: 'If you lead a team, ask them to write a one-page "How we run". Add one line yourself, at most. See what they decide.',
  },
  notes: 'Synthesis of Chapter 3 tools: guardrails and autonomy (Deci & Ryan; Pink), ownership over bounties (Deci, Koestner & Ryan), learning goals (Seijts & Latham), check-ins, progress principle and learning from failure (Amabile & Kramer). Fictional page.',
};

export default lesson;
