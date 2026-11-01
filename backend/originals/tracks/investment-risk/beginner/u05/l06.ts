import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: a too-good offer vs a real investment. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Spot the difference',
  summary: 'Arjun puts the scheme\'s pitch side by side with what a real, regulated long-term investment tells you. Once you see them together, the differences are impossible to miss.',
  minutes: 11,
  outcomes: [
    'Compare a scam pitch with a real investment',
    'Use the differences as a checklist',
    'Explain them to family',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two offers',
      before: {
        label: 'The scheme',
        text: 'Returns: "3% a month, guaranteed"\nRisk: "None"\nWhere returns come from: "trading" or "projects", no details\nRegulated: claims it, not on the official list\nGetting out: locked for a year; withdrawals "delayed"\nSelling: friends, screenshots, recruitment bonuses, "limited slots"',
      },
      after: {
        label: 'A real, regulated long-term investment',
        text: 'Returns: vary; past results shown with "not a guarantee"\nRisk: explained; can fall\nWhere returns come from: what it holds is published\nRegulated: on the official list, checkable\nGetting out: clear rules and timelines\nSelling: no pressure, no recruitment bonus, fees disclosed',
      },
      notes: [
        'Real investments are honest about risk. Scams deny it.',
        'Real investments show what they hold. Scams tell stories.',
        'Real investments can be checked on the regulator\'s list. Scams borrow names.',
        'Real investments don\'t pay you to recruit. Scams need recruits to survive.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Real investments admit risk, show holdings, can be checked, let you out on clear terms, and never pay you to recruit. Scams do the opposite.',
    },
  ],
  apply: {
    scenario: 'Spot the difference.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Scheme or real investment?',
        groups: ['Scheme', 'Real investment'],
        items: [
          { text: '"Risk: none"', group: 0 },
          { text: 'Holdings published', group: 1 },
          { text: 'Recruitment bonuses', group: 0 },
          { text: 'On the official regulator list', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do real investments say about past returns?',
        options: [
          { text: 'They will repeat', why: 'Real providers say the opposite.' },
          { text: 'They aren\'t a guarantee of future returns' },
          { text: 'Nothing', why: 'They include the warning.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each scheme feature to the real-investment version.',
        pairs: [
          ['"Guaranteed 3% a month"', 'Returns vary'],
          ['"No risk"', 'Risk explained'],
          ['Locked, withdrawals "delayed"', 'Clear rules for getting out'],
          ['Recruitment bonus', 'No pressure to recruit'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'How do I explain this to my uncle in one line?',
        prompt: 'Arjun\'s best one-liner?',
        options: [
          { text: 'All investments are scams.', why: 'Untrue and unhelpful.' },
          { text: 'Trust whoever your friends trust.', why: 'That\'s how schemes spread.' },
          { text: 'Real investments admit they can fall. Anything that swears it can\'t is lying.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The biggest difference.',
        template: 'Real investments are honest about [[1]]; scams [[2]] it.',
        blanks: [['risk'], ['deny', 'hide']],
        distractors: ['fees', 'admit'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feature of an offer should stop you immediately?',
        lines: [
          'Fees are listed clearly.',
          'Past returns shown with a warning.',
          'You earn a bonus for each friend who joins.',
        ],
        bug: 2,
        fix: 'Real investments don\'t pay you to recruit.',
        explanation: 'Recruitment bonuses mean new money is what keeps it alive.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do scams need recruits?',
        options: [
          { text: 'To grow the business', why: 'There\'s usually no real business.' },
          { text: 'New money pays old members' },
          { text: 'They don\'t', why: 'They depend on new money.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many differences does Arjun list in the notes? (A number.)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a quick check of any offer.',
        lines: ['Does it admit risk?', 'Does it show what it holds?', 'Is it on the official list?', 'Are the exit terms clear?', 'Does it pay me to recruit?'],
      },
      {
        kind: 'mcq',
        prompt: 'An offer passes four checks but pays a recruitment bonus. What then?',
        options: [
          { text: 'Join; four out of five is fine', why: 'Recruitment bonuses are a defining Ponzi sign.' },
          { text: 'Recruit only one friend', why: 'Still walk away.' },
          { text: 'Walk away: that one sign is serious enough' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Take an offer you\'ve seen recently. How does it score on the five checks?',
    starters: ['The offer...', 'It failed on...'],
  },
  deepen: {
    title: 'Regulators\' warning lists',
    summary: 'Many regulators publish lists of entities they\'ve warned about. A quick search of the regulator\'s own site for the scheme\'s name can save lakhs.',
  },
  notes: 'General comparison; no providers named.',
};

export default lesson;
