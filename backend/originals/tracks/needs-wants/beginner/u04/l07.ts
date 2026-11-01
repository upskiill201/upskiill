import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Reading: regret, action vs inaction. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'What will you regret?',
  summary: 'Ada worries she\'ll regret saying no to the car. Research on regret suggests something surprising about what people really regret years later. It might be the trip, not the car.',
  minutes: 12,
  outcomes: [
    'Explain the difference between short-term and long-term regret',
    'Use regret as a guide for big choices',
    'Avoid the regrets you\'re most likely to feel',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Short-term and long-term regret',
      html: '<p>Psychologists Thomas Gilovich and Victoria Medvec (1995) studied what people regret. They found a pattern:</p><ul><li><strong>In the short term</strong>, people tend to regret things they <em>did</em>: the purchase, the outburst, the wrong turn.</li><li><strong>In the long term</strong>, people tend to regret things they <em>didn\'t do</em>: the trip not taken, the course not started, the chance not seized.</li></ul><p>Why? Over time, we find ways to make peace with our actions ("at least I learned something"). But the things we never tried stay open: "What if?"</p><p><strong>What this means for Ada:</strong></p><ul><li>Saying no to the car might sting for a week. In ten years, she\'s unlikely to think "I wish I\'d bought Emeka-Obi\'s silver car in 2026."</li><li>Saying no to Mexico City, though, is exactly the kind of thing people wonder about for years: the conference, the people, the career that might have followed.</li></ul><p><strong>A useful question:</strong> "Which of these will 40-year-old me wonder about?" It usually points to experiences, growth and people, and away from things.</p><p><strong>A caution:</strong> this isn\'t a licence to say yes to every adventure on credit. Regret about debt is real too. It\'s a tie-breaker between options that fit your plan.</p>',
    },
    {
      kind: 'check',
      question: 'According to the research, what do people tend to regret most in the long run?',
      options: ['Things they didn\'t do', 'Things they did', 'Neither'],
      answer: 0,
      explanation: 'Long-term regrets tend to be about missed chances.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Short term, we regret what we did. Long term, we regret what we didn\'t do. Ask: which will 40-year-old me wonder about?',
    },
  ],
  apply: {
    scenario: 'Car or Mexico City?',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each timeframe to what people tend to regret.',
        pairs: [
          ['Short term', 'Things they did'],
          ['Long term', 'Things they didn\'t do'],
          ['Over time', 'We make peace with our actions'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is 40-year-old Ada more likely to wonder about?',
        options: [
          { text: 'Not buying Emeka-Obi\'s silver car', why: 'Things tend to fade from memory.' },
          { text: 'Not going to the Mexico City conference' },
          { text: 'Neither', why: 'Missed chances often stay with people.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'More likely a long-term regret if missed, or likely forgotten?',
        groups: ['Long-term regret if missed', 'Likely forgotten'],
        items: [
          { text: 'A career-changing conference', group: 0 },
          { text: 'A particular car model', group: 1 },
          { text: 'A course you always wanted to take', group: 0 },
          { text: 'A fourth handbag', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I should say yes to every adventure?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, YOLO.', why: 'Adventures on credit bring their own regret.' },
          { text: 'Never take adventures.', why: 'Missed chances are the long-term regrets.' },
          { text: 'No. Regret about debt is real too. Use it as a tie-breaker between options that fit your plan, like Mexico vs the car.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'Which of these will [[1]]-year-old me [[2]] about?',
        blanks: [['40', 'forty'], ['wonder']],
        distractors: ['20', 'laugh'],
      },
      {
        kind: 'findBug',
        prompt: 'Which use of the regret idea is a mistake?',
        lines: [
          'I\'ll choose Mexico over the car; I\'d regret missing it.',
          'I\'ll take the art course; I\'d wonder "what if".',
          'I\'ll borrow ₦2 million for a holiday; I don\'t want regrets.',
        ],
        bug: 2,
        fix: 'Save for the holiday; debt brings its own regret.',
        explanation: 'The regret idea is a tie-breaker, not a reason to borrow.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do missed chances stay with us longer?',
        options: [
          { text: 'We forget actions instantly', why: 'Not instantly; we just come to terms with them.' },
          { text: 'We make peace with actions over time, but "what if?" stays open' },
          { text: 'They don\'t', why: 'The research suggests they do.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada is 24. How many years until she\'s 40?',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to use regret in a decision.',
        lines: ['Check both options fit your plan', 'Imagine 40-year-old you', 'Ask which you\'d wonder about', 'Use it to break the tie'],
      },
      {
        kind: 'mcq',
        prompt: 'Who did the research on regret described here?',
        options: [
          { text: 'Ada and Lucía', why: 'They\'re using it, not researching it.' },
          { text: 'A car company', why: 'It was psychology research.' },
          { text: 'Gilovich and Medvec (1995)' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you haven\'t done that you might wonder about at 40? What would it take to make it fit your plan?',
    starters: ['I might wonder about...', 'To make it fit, I\'d need...'],
  },
  deepen: {
    title: 'Read the study',
    summary: 'Gilovich and Medvec (1995), "The Experience of Regret: What, When, and Why", Psychological Review. Later research found the pattern isn\'t universal, but it holds for many people and many kinds of decisions.',
  },
  notes: 'Gilovich, T., & Medvec, V. H. (1995). Psychological Review, 102(2), 379–395. Qualifications noted (later work, e.g. on culture and decision type).',
};

export default lesson;
