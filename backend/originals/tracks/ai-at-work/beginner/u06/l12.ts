import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 12 — helping a new colleague get set up. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Helping a new colleague get set up',
  summary: 'Tolu keeps asking Ada the same questions. Instead of answering one at a time, she uses AI to turn her answers into a simple "first two weeks" guide.',
  minutes: 12,
  outcomes: [
    'Turn scattered answers into a starter guide',
    'Organise a guide by what a newcomer needs first',
    'Keep it short and keep it updated',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Tolu has asked Ada "where\'s the shared drive?" three times. Not his fault: nobody wrote it down.', replies: ['So write it down?'] },
        { tey: 'Yes, and AI makes it quick. Ada pastes her chat answers to Tolu and asks: "Turn these into a one-page guide for a new colleague\'s first two weeks."', replies: ['How should it be organised?'] },
        { tey: 'By when you need it: day one (logins, people), week one (tools, how we work), week two (the project). Plus "who to ask for what".', replies: ['Anything to watch out for?'] },
        { tey: 'Two things. Never paste passwords into the AI or the guide; link to how to request access instead. And check every link and name before sharing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Turn repeated answers into a guide, organised by day one, week one, week two, and "who to ask". No passwords. Check every link.',
    },
  ],
  apply: {
    scenario: 'Ada writes a starter guide for Tolu.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the guide by when Tolu needs it.',
        lines: ['Day one: logins and people', 'Week one: tools and how we work', 'Week two: the project', 'Who to ask for what'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Put in the guide, or never?',
        groups: ['In the guide', 'Never'],
        items: [
          { text: 'How to request drive access', group: 0 },
          { text: 'The shared drive password', group: 1 },
          { text: 'Who approves expenses', group: 0 },
          { text: 'A customer\'s ID number', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best guide?',
        options: [
          { text: 'Write an onboarding guide.', why: 'Generic; doesn\'t know your company.' },
          { text: 'Here are my answers to a new colleague\'s questions. Turn them into a one-page guide: day one, week one, week two, and who to ask for what. Mark anything I need to check.' },
          { text: 'Write a 30-page handbook.', why: 'Too long to use.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could your guide work for new people on my team too?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, send it to them as is.', why: 'Different company, different details.' },
          { text: 'The structure will. The details are ours, so swap in your own tools and people. Happy to share the template.' },
          { text: 'No, it\'s secret.', why: 'The structure is easy to share.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'No [[1]] in the guide. Check every [[2]] before sharing.',
        blanks: [['passwords'], ['link']],
        distractors: ['headings', 'joke'],
      },
      {
        kind: 'mcq',
        prompt: 'Why organise the guide by "when you need it"?',
        options: [
          { text: 'It looks nicer', why: 'It\'s about what they need first.' },
          { text: 'Alphabetical is confusing', why: 'Timing is the point.' },
          { text: 'A newcomer can follow it in order without feeling overwhelmed' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line must come out of the guide?',
        lines: [
          'Day one: request laptop access from IT',
          'Day one: meet Tobi (manager) and Ada (buddy)',
          'Week one: the bank portal login is pilot2024!',
          'Week two: read the pilot brief',
        ],
        bug: 2,
        fix: 'Week one: ask IT for your own bank portal login.',
        explanation: 'Never put passwords in a shared doc or an AI tool.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to who to ask.',
        pairs: [
          ['Expenses', 'Tobi'],
          ['Pilot research', 'Ada'],
          ['Laptop and logins', 'IT'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times had Tolu asked about the shared drive?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the guide\'s title.',
        tiles: ['Your', 'first', 'two', 'weeks'],
        distractors: ['forever'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Day one or week two?',
        groups: ['Day one', 'Week two'],
        items: [
          { text: 'Get your laptop and logins', group: 0 },
          { text: 'Read the pilot brief', group: 1 },
          { text: 'Meet your manager and buddy', group: 0 },
          { text: 'Plan the shop visits', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do after Tolu\'s first two weeks?',
        options: [
          { text: 'Ask what was missing, and update the guide' },
          { text: 'Delete it', why: 'The next newcomer needs it.' },
          { text: 'Nothing', why: 'Guides go stale.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What question do new people always ask you? Write the answer once, for everyone.',
    starters: ['They always ask...', 'The answer:'],
  },
  deepen: { title: 'Try it today', summary: 'Collect three questions you\'ve answered more than once and ask AI to turn them into a short guide.' },
  notes: 'Fictional password shown only as an example of what never to share.',
};

export default lesson;
