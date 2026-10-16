import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Reading: getting better at something (learning goals, Seijts & Latham 2001; deliberate practice; stretch). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Getting better at something',
  summary: 'Chidi\'s power-cut fix for the northern clinics is a problem nobody has solved. He\'s energised, and also stuck. Miracle wonders whether to set him a hard target, or something else. On the bus, Tey sends her a read on mastery.',
  minutes: 12,
  outcomes: [
    'Know why getting better at something motivates people',
    'Know when a learning goal beats a performance target',
    'Stretch people without snapping them',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Mastery: the need to grow',
      html: "<p>The second of Chapter 1's three needs is <strong>competence</strong>: feeling good at something and getting better. Chidi was bored because he'd mastered the job. Nothing left to learn. The northern clinics gave him a problem worth growing into.</p><h3>Learning goals vs performance goals</h3><p>For new, complex problems, a hard performance target (\"fix 30 clinics by Friday\") can backfire: people panic and stick to what they know. Researchers <strong>Gerard Seijts</strong> and <strong>Gary Latham</strong> (2001) found that on complex tasks, <strong>learning goals</strong> (\"find three ways to keep clinics logged in through a power cut\") often led to better performance than performance goals. Learning first, then targets.</p><h3>Stretch, not snap</h3><p>Growth happens just beyond what someone can already do. Too easy is boring (old Chidi). Too hard is overwhelming. The sweet spot is a stretch with support: a hard problem, plus time, a buddy and permission to try things that might not work.</p><h3>Practice with feedback</h3><p>Research on expertise, led by <strong>Anders Ericsson</strong>, found that people improve fastest through focused practice with feedback, not just repetition. For Clinic Success, that might mean listening back to one onboarding call a week, together, and picking one thing to try differently.</p><h3>Show the growth</h3><p>People often can't see their own progress. Point it out: \"In Week 1 you took an hour per Kano clinic. Now it's 35 minutes.\"</p>",
    },
    {
      kind: 'check',
      question: 'For a new, complex problem, which goal often works better?',
      options: ['A learning goal: find three ways to solve it', 'A hard performance target', 'No goal'],
      answer: 0,
      explanation: 'Learning first, then targets.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People need to grow. For complex new problems, set learning goals first. Stretch with support. Practise with feedback. Show people their progress.',
    },
  ],
  apply: {
    scenario: 'The bus home, reading about mastery.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why was Chidi bored before the northern clinics?',
        options: [
          { text: 'He\'s lazy', why: 'He\'s the best on the team.' },
          { text: 'He\'d mastered the job; nothing left to grow into' },
          { text: 'The pay', why: 'Boredom was the real reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Learning goal or performance goal?',
        groups: ['Learning goal', 'Performance goal'],
        items: [
          { text: 'Find three ways to survive power cuts', group: 0 },
          { text: 'Fix 30 clinics by Friday', group: 1 },
          { text: 'Test two onboarding styles in Kano', group: 0 },
          { text: 'Hit 95% uptime this week', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Should I promise all 40 northern clinics fixed by next week?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, aim high!', why: 'A hard target on an unsolved problem can backfire.' },
          { text: 'Just do your best.', why: 'Too vague. A learning goal is specific.' },
          { text: 'Not yet. First, find three ways to keep them logged in through a power cut. Test them on five clinics. Then we set the target.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Feeling good at something and getting better: ___. (one word)',
        answers: ['competence', 'Competence', 'mastery'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researchers to the idea.',
        pairs: [
          ['Seijts and Latham', 'Learning goals for complex tasks'],
          ['Anders Ericsson', 'Focused practice with feedback'],
          ['Deci and Ryan', 'Competence as a basic need'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the sweet spot for growth?',
        options: [
          { text: 'A stretch just beyond current skill, with support' },
          { text: 'Something easy, to build confidence forever', why: 'That\'s how Chidi got bored.' },
          { text: 'Something impossible, to push them', why: 'That overwhelms people.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s growth plan for Halima. Which line will overwhelm her?',
        lines: [
          'Listen back to one onboarding call a week, together.',
          'Take all 40 northern clinics too, starting Monday.',
          'Show her how her time per clinic has dropped.',
        ],
        bug: 1,
        fix: 'Try one new technique on two Kano clinics this week.',
        explanation: 'Stretch, not snap. Forty new clinics at once isn\'t a stretch.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building mastery in order.',
        lines: ['Pick a stretch problem', 'Set a learning goal first', 'Practise with feedback', 'Show the progress'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] first, then targets. Stretch, not [[2]].',
        blanks: [['Learning', 'learning'], ['snap']],
        distractors: ['Speed', 'sleep'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the learning goal.',
        tiles: ['Find', 'three', 'ways', 'to', 'try.'],
        distractors: ['fail'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you\'d like to get better at? What would a learning goal for it look like, instead of a target?',
    starters: ['I\'d like to get better at...', 'A learning goal: ...'],
  },
  deepen: {
    title: 'Show someone their growth',
    summary: 'Pick one person you work with. Find one concrete way they\'ve improved in the last month, and tell them: "In Week 1 you... now you..."',
  },
  notes: 'Gerard H. Seijts & Gary P. Latham (2001), "The effect of distal learning, outcome, and proximal goals on a moderately complex task", J. Organizational Behavior 22(3); Winters & Latham (1996). K. Anders Ericsson, Ralf Krampe & Clemens Tesch-Römer (1993), "The role of deliberate practice", Psychological Review 100(3). Competence need: Deci & Ryan.',
};

export default lesson;
