import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Chat with Tey: honest stories. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Honest stories',
  summary: 'Remi\'s flatmate says everyone exaggerates in interviews. "Say you led the hackathon team." Tey explains where polishing a story ends and lying begins, and why it matters.',
  minutes: 12,
  outcomes: [
    'Polish a story without changing the facts',
    'Know why exaggeration backfires',
    'Present modest results with confidence',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Polishing is fine: choosing the best story, cutting boring parts, using clear words. Changing facts isn\'t: inventing roles, results or numbers.', replies: ['Everyone exaggerates though.'] },
        { tey: 'And interviewers know it, so they ask follow-ups. "How many were on the team? What did the others do? What would they say about you?" Invented details fall apart fast.', replies: ['And if it\'s not checked?'] },
        { tey: 'References, colleagues, LinkedIn and your first weeks in the job can all check it. Being caught later costs much more than a modest true answer now.', replies: ['My results feel small.'] },
        { tey: 'Small, true and specific is convincing: "two days early", "120 users". Say them clearly, without apologising. Confidence comes from the delivery, not from inflating the numbers.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Polish the telling, never the facts. Small true results, said clearly, beat big ones that fall apart.',
    },
  ],
  apply: {
    scenario: 'Polish or lie?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Polishing, or changing the facts?',
        groups: ['Polishing', 'Changing facts'],
        items: [
          { text: 'Cutting a boring part of the story', group: 0 },
          { text: 'Saying you led a team you didn\'t lead', group: 1 },
          { text: 'Choosing your strongest story', group: 0 },
          { text: 'Turning 120 users into 1,200', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do interviewers often catch exaggeration?',
        options: [
          { text: 'Follow-up questions about details' },
          { text: 'Lie detectors', why: 'Follow-up questions.' },
          { text: 'They never do', why: 'Details fall apart under questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the follow-up to what it tests.',
        pairs: [
          ['"How many were on the team?"', 'Your real role'],
          ['"What did the others do?"', 'Whose actions they were'],
          ['"What would they say about you?"', 'How others saw you'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My flatmate says say I led the hackathon team.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'You didn\'t lead it. Say what you did: you owned the part that failed and fixed it. That\'s a stronger story anyway.' },
          { text: 'Go for it.', why: 'It\'s untrue and checkable.' },
          { text: 'Don\'t mention the hackathon.', why: 'The true version is strong.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Polish the [[1]], never the [[2]].',
        blanks: [['telling', 'story'], ['facts']],
        distractors: ['shoes', 'questions'],
      },
      {
        kind: 'mcq',
        prompt: 'Where does confidence come from with a small result?',
        options: [
          { text: 'Saying it clearly, without apologising' },
          { text: 'Making the number bigger', why: 'That risks being caught.' },
          { text: 'Leaving it out', why: 'Always give a result.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s booking app story changes a fact?',
        lines: [
          'I built a booking app for my church youth group.',
          'It\'s used by over a thousand people every week.',
          'I added reminders after people missed sessions.',
          'Attendance became easier to track.',
        ],
        bug: 1,
        fix: 'It\'s used by 120 people every week.',
        explanation: 'The real number is 120.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people really use Remi\'s app weekly?',
        answers: ['120'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Who can check a story later?',
        groups: ['Can check', 'Can\'t really'],
        items: [
          { text: 'References', group: 0 },
          { text: 'Former teammates', group: 0 },
          { text: 'Your first weeks in the job', group: 0 },
          { text: 'Your horoscope', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to make a modest story strong.',
        lines: ['Keep the facts true', 'Choose the best details', 'Add the real numbers', 'Say it clearly'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a story you\'ve been tempted to exaggerate? Write the true version clearly.',
    starters: ['The true version:...'],
  },
  deepen: {
    title: 'Honesty and trust',
    summary: 'Employers hire people they trust. A small, honest story, told well, builds that trust. A discovered exaggeration can end an offer, or a job.',
  },
  notes: 'Ethics guidance; no statistics claimed about lying rates in interviews.',
};

export default lesson;
