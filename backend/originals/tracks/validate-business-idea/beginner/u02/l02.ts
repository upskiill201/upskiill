import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Before/After: good questions vs bad questions. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Good questions, bad questions',
  summary: 'Clinton reads his question list to David: "Would you use a laundry service? How much would you pay?" David winces. "Those questions can only get you lies. Nice lies, but lies."',
  minutes: 11,
  outcomes: [
    'Spot questions that invite polite guesses',
    'Rewrite them as questions about past behaviour',
    'Ask for specifics: when, what, how much',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Clinton\'s list, before and after',
      before: {
        label: 'Bad questions',
        text: '"Would you use a laundry service?"\n"How much would you pay for it?"\n"Do you think it\'s a good idea?"\n"Do you hate doing laundry?"\nAll about the future, opinions or yes/no. Easy to answer kindly; useless as evidence.',
      },
      after: {
        label: 'Good questions',
        text: '"When did you last do laundry? Walk me through it."\n"How long did it take?"\n"Have you ever paid someone to do it? How much?"\n"What have you tried to make it easier?"\nAll about the past and specifics. Hard to fake.',
      },
      notes: [
        'People are bad at predicting what they\'ll do, and good at remembering what they did.',
        '"Would you...?" invites a guess. "When did you last...?" invites a fact.',
        'Specifics (when, how long, how much) turn a story into evidence.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Turn every "would you" into "when did you last".',
    },
  ],
  apply: {
    scenario: 'Fixing Clinton\'s question list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good question or bad question?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"When did you last do laundry?"', group: 0 },
          { text: '"Would you pay for a laundry service?"', group: 1 },
          { text: '"How much did you pay Mama Rose last time?"', group: 0 },
          { text: '"Do you think it\'s a good idea?"', group: 1 },
          { text: '"What have you tried to make it easier?"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "How much would you pay?" a weak question?',
        options: [
          { text: 'People guess, often too high, because the money isn\'t real' },
          { text: 'It\'s rude to talk about money', why: 'Asking what they DID pay is fine and useful.' },
          { text: 'It\'s a great question', why: 'Hypothetical prices are unreliable (Chapter 1).' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bad question to its better version.',
        pairs: [
          ['"Would you use it?"', '"When did you last do it?"'],
          ['"How much would you pay?"', '"What did you pay last time?"'],
          ['"Do you hate laundry?"', '"How long did it take on Saturday?"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The swap.',
        template: 'Turn every "[[1]] you" into "when did you [[2]]".',
        blanks: [['would'], ['last']],
        distractors: ['could', 'never'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'But I need to know if they\'d pay. How can I find out without asking?',
        prompt: "David's best reply?",
        options: [
          { text: 'Ask what they\'ve already paid for it, and later, ask them to actually pay. Past payments and real payments beat guesses.' },
          { text: 'Just ask "would you pay?" anyway.', why: 'That gets the polite guess again.' },
          { text: 'You can\'t ever know.', why: 'Past spending and real payments tell you a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which question is most likely to get a fact?',
        options: [
          { text: '"Walk me through the last time you washed clothes."' },
          { text: '"Would a pickup service help you?"', why: 'Future and yes/no: a guess.' },
          { text: '"Isn\'t laundry the worst?"', why: 'It leads them to agree.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which question in Clinton\'s list leads the student to agree?',
        lines: [
          'When did you last do laundry?',
          'How long did it take?',
          'Laundry in rainy season is terrible, isn\'t it?',
          'What did you do when the clothes didn\'t dry?',
        ],
        bug: 2,
        fix: 'What\'s laundry like for you in the rainy season?',
        explanation: '"Isn\'t it?" pushes them to say yes.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good line of questions, from opening to most specific.',
        lines: ['When did you last do laundry?', 'Walk me through it.', 'How long did it take?', 'Have you ever paid someone to do it? How much?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Questions about the past or the future: which get more reliable answers?',
        answers: ['past', 'the past'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Past behaviour or future guess?',
        groups: ['Past behaviour', 'Future guess'],
        items: [
          { text: '"I paid Mama Rose 2,400 FCFA last month."', group: 0 },
          { text: '"I\'d definitely use it every week."', group: 1 },
          { text: '"Last Saturday it took me three hours."', group: 0 },
          { text: '"I might try it someday."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write three questions about your idea\'s problem that start with "When did you last..." or "Walk me through...".',
    starters: ['When did you last...', 'Walk me through...'],
  },
  deepen: {
    title: 'Why the past is reliable',
    summary: 'Predicting our own future behaviour is notoriously hard: we\'re optimistic about what we\'ll do. What we actually did, recently and specifically, is far more trustworthy.',
  },
  notes: 'Question rules adapted from Rob Fitzpatrick, The Mom Test (2013): talk about specifics in the past instead of generics or the future. Amounts (e.g. 2,400 FCFA to Mama Rose) are fictional.',
};

export default lesson;
