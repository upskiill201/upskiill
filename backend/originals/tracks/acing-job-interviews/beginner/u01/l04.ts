import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Chat with Tey: present, past, future. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Present, past, future',
  summary: 'Remi needs a new answer to "tell me about yourself". Tey gives him a three-part shape that works for almost any job, and helps him fit it into about a minute.',
  minutes: 12,
  outcomes: [
    'Build a 60–90 second answer to "tell me about yourself"',
    'Use the present, past, future shape',
    'Point the answer at the role',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Three parts. Present: who you are now. Past: one or two things you\'ve done that fit this role. Future: why you want this job.', replies: ['Give me an example.'] },
        { tey: 'Present: "I\'m a final-year computer science student at the University of Nairobi."', replies: ['Past?'] },
        { tey: '"Last year I built a booking app for my church\'s youth group; 120 people use it every week. And I lead the coding club\'s data project."', replies: ['Future?'] },
        { tey: '"I want this internship because I\'d like to use data to fix real business problems, and Synergix does that across East Africa." About 45 seconds out loud. Add a little detail and you\'re at a minute.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Present (who you are now), past (one or two things that fit), future (why this job). About a minute.',
    },
  ],
  apply: {
    scenario: 'Remi\'s new answer.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the three parts.',
        lines: ['Present: who you are now', 'Past: things that fit the role', 'Future: why this job'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its part.',
        pairs: [
          ['"I\'m a final-year computer science student."', 'Present'],
          ['"I built a booking app 120 people use."', 'Past'],
          ['"I want to use data to fix business problems."', 'Future'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people use Remi\'s church booking app every week?',
        answers: ['120'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the "past" part, or not?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'The booking app he built', group: 0 },
          { text: 'His favourite football team', group: 1 },
          { text: 'Leading the coding club\'s data project', group: 0 },
          { text: 'His first computer, aged nine', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Should I use the same answer for the bank and for Mtaa Labs?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Same shape, different details. Pick the past examples and the future reason that fit each role.' },
          { text: 'Yes, word for word.', why: 'Tailor the details.' },
          { text: 'Make up a new life for each.', why: 'Same true facts, different emphasis.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Timing.',
        template: 'Aim for about [[1]] to [[2]] seconds.',
        blanks: [['60', 'sixty'], ['90', 'ninety']],
        distractors: ['5', '600'],
      },
      {
        kind: 'mcq',
        prompt: 'Why end with the future part?',
        options: [
          { text: 'It connects you to this job and invites the next question' },
          { text: 'To sound ambitious', why: 'It\'s about fit and flow.' },
          { text: 'It doesn\'t matter where it goes', why: 'Ending on the role links everything.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the shape?',
        lines: [
          'I\'m a final-year computer science student.',
          'I built a booking app 120 people use weekly.',
          'I also once won a dance competition in Form 2.',
          'I want this internship to use data on real problems.',
        ],
        bug: 2,
        fix: 'I lead the coding club\'s data project.',
        explanation: 'It doesn\'t fit the role.',
      },
      {
        kind: 'mcq',
        prompt: 'About how long is Tey\'s example out loud, before adding detail?',
        options: [
          { text: 'About 45 seconds' },
          { text: 'About 4 minutes', why: 'That was Remi\'s first answer.' },
          { text: 'About 5 seconds', why: 'It\'s three full parts.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part is this?',
        groups: ['Present', 'Future'],
        items: [
          { text: '"I\'m studying computer science."', group: 0 },
          { text: '"I\'d love to learn how strategy teams work."', group: 1 },
          { text: '"I\'m in my final year."', group: 0 },
          { text: '"That\'s why I applied here."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own present, past, future answer. Say it out loud and time it.',
    starters: ['Present:...', 'Past:...', 'Future:...'],
  },
  deepen: {
    title: 'Practise, don\'t memorise',
    summary: 'Learn the three parts and the examples, not every word. Then it sounds like you talking, not like you reciting.',
  },
  notes: 'Present-past-future is a widely taught structure for "tell me about yourself". Fictional details: booking app, 120 weekly users.',
};

export default lesson;
