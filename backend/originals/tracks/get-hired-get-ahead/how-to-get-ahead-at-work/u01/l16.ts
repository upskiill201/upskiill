import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 16 — first-job myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'First-job myths',
  summary: '"Never admit you don\'t know." "Work late to show you\'re serious." "Your manager will tell you if something\'s wrong." Clinton\'s graduate WhatsApp group is full of first-job advice. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common first-job myths', 'Know what actually builds trust', 'Avoid habits that burn you out'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Admitting you don\'t know something makes you look weak.', isFact: false, explain: 'New people aren\'t expected to know everything. Asking good questions, after trying, usually builds trust.' },
        { text: 'Working very late every night is the best way to impress.', isFact: false, explain: 'Reliability and results matter more than hours. Constant late nights lead to tired mistakes.' },
        { text: 'Telling people quickly when you break something builds trust.', isFact: true, explain: 'Clinton\'s 7:15am message led to a ten-minute rollback and praise from Ngozi.' },
        { text: 'Your manager will always tell you if something\'s wrong.', isFact: false, explain: 'Many managers are busy or avoid awkward talks. Ask for feedback regularly, so you\'re never surprised.' },
        { text: 'Relationships outside your team can make your job easier.', isFact: true, explain: 'Support, QA and others often help most when things go wrong.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask questions, own mistakes fast, ask for feedback regularly, build relationships. Hours don\'t impress; reliability does.',
    },
  ],
  apply: {
    scenario: 'Clinton answers the graduate group.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Owning mistakes fast builds trust', group: 0 },
          { text: 'Asking questions looks weak', group: 1 },
          { text: 'Late nights impress most', group: 1 },
          { text: 'Other teams can help a lot', group: 0 },
          { text: 'Managers always tell you what\'s wrong', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'m staying at the hospital until 11pm every night so they see I\'m serious.',
        options: [
          { text: 'Rest matters. Being reliable and careful impresses more than hours, especially in medicine.' },
          { text: 'Stay until midnight.', why: 'Tired people make mistakes.' },
          { text: 'Never go in.', why: 'Balance, not extremes.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why ask your manager for feedback regularly?',
        options: [
          { text: 'Many managers won\'t raise problems unless asked' },
          { text: 'To fill time', why: 'So you\'re never surprised.' },
          { text: 'It\'s the law', why: 'It\'s just wise.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Ask after trying first.', 'Pretend to know everything.', 'Flag mistakes quickly.'],
        bug: 1,
        explanation: 'Pretending hides gaps. New people aren\'t expected to know everything.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Questions look weak', 'Good questions build trust'],
          ['Late nights impress', 'Reliability impresses'],
          ['Managers will tell you', 'Ask for feedback regularly'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What impresses more than long hours?',
        options: [
          { text: 'Reliability and results' },
          { text: 'Longer hours', why: 'Reliability and results.' },
          { text: 'Never asking questions', why: 'Reliability and results.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Hours don\'t [[1]]; reliability [[2]].',
        blanks: [['impress'], ['does']],
        distractors: ['matter', 'fails', 'hides'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should new people be expected to know everything? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Healthy habit, or burnout risk?',
        groups: ['Healthy', 'Burnout risk'],
        items: [
          { text: 'Leaving at a normal time most days', group: 0 },
          { text: 'Answering messages at 2am', group: 1 },
          { text: 'Taking lunch breaks', group: 0 },
          { text: 'Never taking leave', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says, "Never tell your boss about mistakes." What do I say?',
        options: [
          { text: 'My 7:15am message got a ten-minute rollback and praise. Hiding it would have made it worse.' },
          { text: 'True, hide everything.', why: 'Hidden problems grow.' },
          { text: 'Only tell if caught.', why: 'Tell fast.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which first-job myth have you heard most? How would following it hurt someone?',
    starters: ['I\'ve heard...', 'It would hurt because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone a few years into their career: "What first-job advice turned out to be wrong?"',
  },
  notes: 'Myths reflect common advice; kept qualitative. Long hours and fatigue increase errors, well established in safety research; not quantified here.',
};

export default lesson;
