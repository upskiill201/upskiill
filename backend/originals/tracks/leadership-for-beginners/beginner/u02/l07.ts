import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Side by side: blame vs learn (blameless reviews). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Blame vs learn',
  summary: 'Monday. Carmen wants to know what happened with the newsletter. Lucía could write "Tomás made an error." Or she could find out why the error was so easy to make. Two versions of the same email.',
  minutes: 11,
  outcomes: [
    'Tell a blaming review from a learning review',
    'Ask "what made this easy to get wrong?" instead of "who did it?"',
    'Fix the system, not just the person',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Lucía\'s email to Carmen',
      before: { label: 'Blame version', text: 'The newsletter error was caused by Tomás, who entered the wrong code and didn\'t report it. I\'ve spoken to him. It won\'t happen again.' },
      after: { label: 'Learn version', text: 'The wrong code went out Tuesday to Friday. What happened: one person types the code, nobody checks it, and there\'s no test send. Fixes: a second pair of eyes on every code, a test send to the team, and a "spot a problem, say it" rule. Cost so far: about 300 orders at the bigger discount.' },
      notes: [
        'Blame names a person. Learn names what made the mistake easy.',
        '"It won\'t happen again" is a hope. A checklist is a plan.',
        'The learn version tells Carmen something she can actually use.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Hospitals, airlines and software teams use <strong>blameless reviews</strong>: after something goes wrong, they ask what in the <em>system</em> allowed it, not just who touched it last. This isn't letting people off the hook. People still own their part. It's that if one tired person can break the newsletter with one typo, the next tired person will too, unless you change the process.</p><p>And remember Edmondson: when blame is the default, people stop reporting. Then you find out on Friday at 4:40.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the main question in a blameless review?',
      options: ['What made this easy to get wrong?', 'Who did it?', 'How do we punish it?'],
      answer: 0,
      explanation: 'Fix the conditions, and the next person won\'t repeat it.',
    },
  ],
  apply: {
    scenario: 'Monday, the email to Carmen.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Blame or learn?',
        groups: ['Blame', 'Learn'],
        items: [
          { text: '"Who did this?"', group: 0 },
          { text: '"What made this easy to get wrong?"', group: 1 },
          { text: '"It won\'t happen again."', group: 0 },
          { text: '"Add a second check before sending."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does a blameless review mean nobody is responsible?',
        options: [
          { text: 'Yes, nobody is ever responsible', why: 'Blameless isn\'t careless.' },
          { text: 'No. People still own their part, but you fix the system too' },
          { text: 'Yes, the leader takes all the blame', why: 'That\'s not it either.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'So whose fault was it?',
        prompt: 'Lucía\'s best answer?',
        options: [
          { text: 'Tomás made the typo, and he told me. The bigger issue is that nothing caught it. Here\'s what we\'ve changed.' },
          { text: 'Tomás. Completely Tomás.', why: 'True in one sense, and it fixes nothing.' },
          { text: 'Mine. All mine. I\'m so sorry.', why: 'Over-taking blame hides the real fix too.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Reviews that focus on the system rather than the person are called ___ reviews. (one word)',
        answers: ['blameless', 'Blameless'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a learning review in order.',
        lines: ['What happened?', 'What made it easy to get wrong?', 'What will we change?', 'Who does what, by when?'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "it won\'t happen again" weak?',
        options: [
          { text: 'It\'s too short', why: 'Length isn\'t the problem.' },
          { text: 'It\'s a hope, not a change to how the work is done' },
          { text: 'It\'s rude', why: 'It\'s polite, just empty.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s fix list. Which one is blame dressed up as a fix?',
        lines: [
          'A second person checks every discount code.',
          'Tomás is banned from touching the newsletter.',
          'A test send to the team before every campaign.',
        ],
        bug: 1,
        fix: 'Anyone who spots a problem says it the same day.',
        explanation: 'Banning one person leaves the same trap for the next one.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Edmondson', 'Psychological safety'],
          ['Rogelberg', 'One-on-ones'],
          ['Deci & Ryan', 'Three needs'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Fix the [[1]], not just the [[2]].',
        blanks: [['system', 'process'], ['person']],
        distractors: ['blame', 'email'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the learning question.',
        tiles: ['What', 'made', 'it', 'easy', 'to', 'get', 'wrong?'],
        distractors: ['Who'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a mistake at work or school that got blamed on one person. What in the system made it easy to make? What would have prevented it?',
    starters: ['The mistake was...', 'What made it easy was...'],
  },
  deepen: {
    title: 'One process, one check',
    summary: 'Pick one thing you do regularly where a single slip would cause trouble. Add one simple check, like a second look or a test run.',
  },
  notes: 'Blameless post-incident review practice (aviation, healthcare, software: e.g. Google SRE "blameless postmortem" culture). Link between blame and under-reporting: Edmondson (1996, 1999). Fictional figures (about 300 orders).',
};

export default lesson;
