import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: fix the frustrations first (Herzberg's hygiene factors and motivators). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Fix what\'s broken first',
  summary: 'Thursday. Miracle\'s list from the one-to-ones: broken headsets, clinic calls at 11 p.m., a ticket system that crashes twice a day. Nobody said "I need more inspiration." On the bus home, Tey sends her a classic piece of research.',
  minutes: 12,
  outcomes: [
    'Know the difference between hygiene factors and motivators',
    'Know why fixing frustrations comes first',
    'Know why fixing them isn\'t enough on its own',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two kinds of factors',
      html: "<p>In 1959, psychologist <strong>Frederick Herzberg</strong> and colleagues asked engineers and accountants about times they felt very good, and very bad, about their jobs. The answers fell into two groups.</p><h3>Hygiene factors</h3><p>Things like working conditions, tools, pay, policies and relationships with the boss. When they're bad, people are <strong>dissatisfied</strong>. When they're fixed, people stop being unhappy, but they don't become motivated. Herzberg compared them to hygiene: clean water doesn't make you healthy, but dirty water makes you sick.</p><h3>Motivators</h3><p>Things like achievement, recognition, interesting work, responsibility and growth. These are what make people actually want to do more.</p><h3>Why it helps Miracle</h3><p>Broken headsets, crashing systems and 11 p.m. calls are hygiene problems. No amount of inspiration will cancel out a headset that cuts off clinic doctors mid-sentence. So: <strong>fix the hygiene first</strong>, visibly and fast. Then work on the motivators, or the team will simply stop being angry without starting to care.</p><h3>A word of caution</h3><p>Later researchers questioned parts of Herzberg's method, and the two lists aren't perfectly separate (pay, for example, can be both). But the practical lesson has lasted: remove the frustrations, then build what makes work meaningful.</p>",
    },
    {
      kind: 'check',
      question: 'What happens when you fix hygiene factors?',
      options: ['People stop being unhappy, but aren\'t necessarily motivated', 'People become highly motivated', 'Nothing changes'],
      answer: 0,
      explanation: 'Clean water stops you getting sick. It doesn\'t make you an athlete.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Hygiene factors (tools, conditions, pay, policies) stop the unhappiness. Motivators (achievement, recognition, interesting work, growth) build the caring. Fix hygiene first, then build motivators.',
    },
  ],
  apply: {
    scenario: 'The bus home, reading Herzberg.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Herzberg call them "hygiene" factors?',
        options: [
          { text: 'They\'re about cleanliness at work', why: 'It\'s a metaphor.' },
          { text: 'They\'re the most important', why: 'They stop unhappiness; they don\'t create motivation.' },
          { text: 'Like clean water: missing makes you sick, present doesn\'t make you strong' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Hygiene factor or motivator?',
        groups: ['Hygiene factor', 'Motivator'],
        items: [
          { text: 'Headsets that work', group: 0 },
          { text: 'Seeing a clinic thrive', group: 1 },
          { text: 'A system that doesn\'t crash', group: 0 },
          { text: 'Responsibility for a big clinic', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'So should I do the inspiring stuff first, or the boring fixes?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Inspiration first, then fixes.', why: 'Inspiration bounces off a broken headset.' },
          { text: 'Boring fixes first, fast and visibly. Then the inspiring stuff will land, because they\'ll believe you.' },
          { text: 'Only the fixes.', why: 'Fixes stop the anger. Motivators build caring.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Frederick ___ described hygiene factors and motivators. (one word)',
        answers: ['Herzberg', 'herzberg'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the type.',
        pairs: [
          ['Headsets cut off doctors', 'Hygiene: broken tools'],
          ['Never hearing how clinics do', 'Missing motivator'],
          ['11 p.m. calls', 'Hygiene: working conditions'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why fix hygiene problems visibly and fast?',
        options: [
          { text: 'It shows the team you listened, so they\'ll trust what comes next' },
          { text: 'To impress Folake', why: 'It\'s for the team\'s trust.' },
          { text: 'It doesn\'t matter how fast', why: 'Speed shows you meant it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan. Which line gets the order wrong?',
        lines: [
          'Order six new headsets this week.',
          'Launch a "Clinic Hero of the Month" award before fixing anything.',
          'Ask IT to fix the ticket system crashes.',
        ],
        bug: 1,
        fix: 'Once the basics are fixed, share clinic success stories weekly.',
        explanation: 'An award while headsets are broken feels like a joke to the team.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s plan in order.',
        lines: ['List the frustrations', 'Fix the biggest ones fast', 'Tell the team what you fixed', 'Then build the motivators'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Fix the [[1]] first. Then build the [[2]].',
        blanks: [['hygiene', 'frustrations', 'basics'], ['motivators']],
        distractors: ['speeches', 'pizza'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s first fix.',
        tiles: ['Six', 'new', 'headsets,', 'this', 'week.'],
        distractors: ['pizza'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one "hygiene" problem where you work or study (a tool, a policy, a condition) that drains everyone? Who could fix it?',
    starters: ['The problem is...', 'It could be fixed by...'],
  },
  deepen: {
    title: 'One fix, this week',
    summary: 'If you lead anyone, ask them for the single most annoying thing about their work. Fix one of them this week, and tell them you did.',
  },
  notes: 'Frederick Herzberg, Bernard Mausner & Barbara Snyderman, The Motivation to Work (1959); Herzberg, "One More Time: How Do You Motivate Employees?", HBR (1968). Critiques of the critical-incident method and two-factor separation (e.g. House & Wigdor 1967) noted and hedged.',
};

export default lesson;
