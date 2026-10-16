import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Myth or Fact: pressure, long hours and stress (Pencavel 2014; Crum, Salovey & Achor 2013). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Pressure myths',
  summary: 'Folake, on the phone: "Make them stay till midnight. Fear of missing rollout will focus them." Miracle doesn\'t believe it, but she isn\'t sure why. Tey runs a quick round of myth or fact.',
  minutes: 11,
  outcomes: [
    'Know what research says about long hours',
    'Know how fear and stress affect performance',
    'Use pressure without breaking people',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Working much longer hours always gets more done.', isFact: false, explain: 'Myth. Economist John Pencavel (2014) studied munitions workers\' records and found output per hour fell as weekly hours rose past about 50. Beyond around 55 hours, extra hours added very little. Tired people also make more mistakes, and Afiya\'s mistakes reach patients.' },
        { text: 'Fear is the best way to motivate people under pressure.', isFact: false, explain: 'Myth. Fear can produce a short burst, but it tends to narrow thinking and drive mistakes and hiding problems. Chapter 2 of Leadership for Beginners covered why: people hide bad news when they\'re scared.' },
        { text: 'How people see stress can change how it affects them.', isFact: true, explain: 'Fact, broadly. In studies by Alia Crum, Peter Salovey and Shawn Achor (2013), people who were shown that stress can be helpful (a "stress-is-enhancing" mindset) reported better health and work performance. Framing a hard week as a challenge, not a threat, can help.' },
        { text: 'Short breaks during intense work can help people keep going.', isFact: true, explain: 'Fact, broadly. Research on recovery suggests short breaks, especially real ones away from screens, can help restore energy during demanding work. Skipping all breaks to save time usually costs more later.' },
        { text: 'A team will always be grateful if the leader makes them work all night.', isFact: false, explain: 'Myth. Some all-nighters are remembered fondly. Many are remembered as the moment people decided to leave. It depends on whether it was their choice, rare, and genuinely needed.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Past about 50 hours a week, extra hours add little. Fear narrows thinking. Frame it as a challenge. Keep breaks. All-nighters, if ever, must be rare and chosen.',
    },
  ],
  apply: {
    scenario: 'Myth or fact: "make them stay till midnight".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Pencavel find about long hours?',
        options: [
          { text: 'More hours always means more output', why: 'Not past about 50.' },
          { text: 'Output per hour fell past about 50 hours; extra hours added little' },
          { text: 'Hours don\'t matter at all', why: 'They do, up to a point.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Longer hours always get more done', group: 0 },
          { text: 'Stress mindset can change outcomes', group: 1 },
          { text: 'Fear is the best motivator', group: 0 },
          { text: 'Short breaks help during intense work', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Make them stay till midnight. Fear of missing rollout will focus them.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'They\'re already focused. The research says tired people make more mistakes, and ours reach patients. We\'ll do 13 a day in normal hours and update you at 6.' },
          { text: 'Okay, midnight it is.', why: 'More mistakes, and burnout in Week 9.' },
          { text: 'That\'s a terrible idea.', why: 'Lead with evidence and a plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Framing a hard week as a ___, not a threat, can help. (one word)',
        answers: ['challenge', 'Challenge'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to the researchers.',
        pairs: [
          ['Hours and output', 'John Pencavel'],
          ['Stress mindset', 'Crum, Salovey and Achor'],
          ['Fear makes people hide problems', 'Amy Edmondson'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is fear especially risky at Afiya?',
        options: [
          { text: 'Folake is scary enough', why: 'Ha. The patients are the real reason.' },
          { text: 'It isn\'t', why: 'Mistakes in health data are serious.' },
          { text: 'Scared, tired people make and hide mistakes, and those reach patients' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s rollout-week plan. Which line breaks the research?',
        lines: [
          '13 clinics a day, in normal hours.',
          'No breaks until all 300 are live.',
          'A real lunch away from screens, every day.',
        ],
        bug: 1,
        fix: 'Short breaks every two hours.',
        explanation: 'Skipping all breaks costs energy and accuracy later.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put using pressure well in order.',
        lines: ['Frame it as a challenge', 'Make the plan doable', 'Keep breaks and normal hours', 'Save extra effort for genuine emergencies'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Past about [[1]] hours a week, extra hours add [[2]].',
        blanks: [['50', 'fifty'], ['little', 'nothing']],
        distractors: ['30', 'everything'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s plan.',
        tiles: ['Thirteen', 'a', 'day,', 'in', 'normal', 'hours.'],
        distractors: ['midnight'],
      },
    ],
  },
  reflect: {
    prompt: 'When have you worked the longest hours? Were those your best hours, or your most tired ones? What would you do differently?',
    starters: ['My longest hours were...', 'Next time I\'d...'],
  },
  deepen: {
    title: 'Count your real hours',
    summary: 'Count how many hours you actually worked or studied last week. If it was over 50, look at which hours produced your best work.',
  },
  notes: 'John Pencavel (2014), "The Productivity of Working Hours", The Economic Journal 125(589): output–hours relationship non-linear above ~50 hours/week (British munitions workers, WWI). Alia J. Crum, Peter Salovey & Shawn Achor (2013), "Rethinking stress: The role of mindsets", J. Personality & Social Psychology 104(4). Breaks and recovery: e.g. Sonnentag; Albulescu et al. (2022) meta-analysis on micro-breaks, hedged.',
};

export default lesson;
