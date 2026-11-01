import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: the rambling answer vs the shaped one. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Rambling vs shaped',
  summary: 'Side by side: what Remi said to Savanna Bank, and what he\'ll say next time. Same person, same facts. One wastes four minutes; one opens a conversation.',
  minutes: 11,
  outcomes: [
    'Spot the signs of a rambling answer',
    'Cut an answer to what the interviewer needs',
    'End with a hook for the next question',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Before and after',
      before: {
        label: 'Rambling (4 minutes)',
        text: '"So, I got my first computer when I was nine, and my uncle had a cyber café, so I used to help there, and then in high school I did a lot of sports, and I was in the drama club for a bit, and then I chose computer science because, well, I like computers, and... (three more minutes)"',
      },
      after: {
        label: 'Shaped (about 60 seconds)',
        text: '"I\'m a final-year computer science student at the University of Nairobi. Last year I built a booking app for my church youth group that 120 people now use weekly, and I lead the coding club\'s data project. I\'m applying to Savanna Bank because I want to work on systems that millions of people rely on every day, and your mobile-banking team does exactly that."',
      },
      notes: [
        'Rambling answers follow time order. Shaped answers follow relevance.',
        'Numbers ("120 people") make a claim concrete.',
        'The last line points at this employer, so the next question follows naturally.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Order by relevance, not by time. Add one number. End on why this employer.',
    },
  ],
  apply: {
    scenario: 'Before and after.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'From the rambling answer or the shaped one?',
        groups: ['Rambling', 'Shaped'],
        items: [
          { text: '"I got my first computer when I was nine."', group: 0 },
          { text: '"120 people use it weekly."', group: 1 },
          { text: '"I was in the drama club for a bit."', group: 0 },
          { text: '"Your mobile-banking team does exactly that."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What order do rambling answers usually follow?',
        options: [
          { text: 'Relevance to the role', why: 'That\'s the shaped answer.' },
          { text: 'Alphabetical', why: 'Time order.' },
          { text: 'Time order: from the start of your life' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to why it helps.',
        pairs: [
          ['"120 people"', 'Makes the claim concrete'],
          ['"Your mobile-banking team"', 'Shows you researched them'],
          ['About 60 seconds', 'Leaves time for questions'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The shaped answer leaves out drama club. Isn\'t that hiding things?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, include everything.', why: 'Relevance isn\'t hiding.' },
          { text: 'No. You choose what\'s relevant. If they ask about hobbies, tell them then.' },
          { text: 'Pretend drama club was coding.', why: 'Never change facts.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Order by [[1]], not by [[2]].',
        blanks: [['relevance'], ['time']],
        distractors: ['length', 'height'],
      },
      {
        kind: 'mcq',
        prompt: 'Why end on "why this employer"?',
        options: [
          { text: 'It flatters them', why: 'It\'s about fit, not flattery.' },
          { text: 'No reason', why: 'It links you to the job.' },
          { text: 'It shows motivation and leads into the next question' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds is the shaped answer?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line slips back into rambling?',
        lines: [
          'I\'m a final-year computer science student.',
          'I built a booking app 120 people use.',
          'Oh, and before that I did athletics, and swimming, and...',
          'I\'m applying because of your mobile-banking work.',
        ],
        bug: 2,
        fix: 'I lead the coding club\'s data project.',
        explanation: 'Time-order detail with no link to the role.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to fix a rambling answer.',
        lines: ['List everything you could say', 'Keep only what fits the role', 'Add one number', 'End on why this employer'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Concrete or vague?',
        groups: ['Concrete', 'Vague'],
        items: [
          { text: '"120 weekly users"', group: 0 },
          { text: '"Quite a few people use it"', group: 1 },
          { text: '"I lead the data project"', group: 0 },
          { text: '"I do a lot of stuff"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own answer. Is it in time order or relevance order? Where could you add one number?',
    starters: ['My answer is ordered by...', 'I could add the number...'],
  },
  deepen: {
    title: 'Concrete beats general',
    summary: 'Interviewers remember specifics. "Built an app 120 people use" sticks; "I\'m passionate about tech" doesn\'t. One number per answer is a good habit.',
  },
  notes: 'Fictional answers. Savanna Bank is fictional.',
};

export default lesson;
