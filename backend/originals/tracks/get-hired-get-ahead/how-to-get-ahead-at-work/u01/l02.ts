import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 2 — free. The first-90-days idea (Watkins, 2003). Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why 90 days?',
  summary: 'Miracle sends Clinton a photo of a well-worn book: The First 90 Days. "Every manager I know has read this," she says. Here\'s the big idea, in plain words, for someone in their very first job.',
  minutes: 12,
  outcomes: ['Explain the idea behind the first 90 days', 'Name four things to focus on early', 'Adapt the idea for a first job'],
  learn: [
    {
      kind: 'reading',
      title: 'The first 90 days',
      html:
        '<p>In 2003, Michael D. Watkins published <em>The First 90 Days</em>, a book about how people moving into new roles can get up to speed faster. It was written mostly for leaders, but the core idea works for anyone starting a job: <strong>the first few months set patterns that are hard to change later</strong>, so it\'s worth being deliberate about them.</p>' +
        '<p>For a first job, four ideas matter most:</p>' +
        '<ul><li><strong>Learn fast, on purpose.</strong> How the product works, how the team works, and who knows what. Keep notes.</li>' +
        '<li><strong>Agree what success looks like.</strong> Ask your manager early and check in regularly, so you\'re never guessing.</li>' +
        '<li><strong>Get a small early win.</strong> Something real, useful and finished, to build trust.</li>' +
        '<li><strong>Build relationships.</strong> Not just with your manager: teammates, other teams, the people who keep things running.</li></ul>' +
        '<p>Ninety days isn\'t magic; it\'s a useful length for a plan. Many companies use a similar window, sometimes with a probation period. The point is to have a plan instead of hoping.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Learn fast, agree what success looks like, get a small early win, build relationships. Plan it; don\'t hope.',
    },
  ],
  apply: {
    scenario: 'Clinton reads about the first 90 days.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who wrote The First 90 Days, and when?',
        options: [
          { text: 'Michael D. Watkins, 2003' },
          { text: 'Ngozi Bate, 2020', why: 'She\'s Clinton\'s manager. It was Michael D. Watkins, 2003.' },
          { text: 'Nobody knows', why: 'Michael D. Watkins, 2003.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the core idea?',
        options: [
          { text: 'The first months set patterns that are hard to change, so be deliberate' },
          { text: 'You must be perfect for 90 days', why: 'Deliberate, not perfect.' },
          { text: 'After 90 days nothing matters', why: 'It\'s about early patterns.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'One of the four early focuses, or not?',
        groups: ['Early focus', 'Not one'],
        items: [
          { text: 'Learn fast, on purpose', group: 0 },
          { text: 'Agree what success looks like', group: 0 },
          { text: 'Rewrite the whole codebase', group: 1 },
          { text: 'A small early win', group: 0 },
          { text: 'Avoid other teams', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each focus to an example for Clinton.',
        pairs: [
          ['Learn fast', 'Notes on how the sync service works'],
          ['Early win', 'Fix one small bug drivers complain about'],
          ['Relationships', 'Lunch with the support team'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The book is for leaders. Does it even apply to a graduate like me?',
        options: [
          { text: 'The core ideas do: learn fast, agree success, a small win, relationships.' },
          { text: 'No, ignore it.', why: 'The core ideas fit any new starter.' },
          { text: 'Yes, so I should lead the team now.', why: 'Use the core ideas, at your level.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misunderstanding.',
        lines: ['Ninety days is a useful plan length.', 'Day 91 is when the real work starts, so I can relax until then.', 'Early patterns are hard to change.'],
        bug: 1,
        explanation: 'The first 90 days are real work, and they shape everything after.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is a good early win for Clinton?',
        options: [
          { text: 'A small, finished fix that drivers notice' },
          { text: 'A huge redesign nobody asked for', why: 'Small, real and finished.' },
          { text: 'Nothing for three months', why: 'Early wins build trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] it; don\'t [[2]].',
        blanks: [['Plan'], ['hope']],
        distractors: ['Fake', 'work', 'rest'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year was The First 90 Days published? (a number)',
        answers: ['2003'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds relationships, or not?',
        groups: ['Builds them', 'Doesn\'t'],
        items: [
          { text: 'Lunch with another team', group: 0 },
          { text: 'Eating alone at his desk every day', group: 1 },
          { text: 'Thanking the support team for their help', group: 0 },
          { text: 'Only talking to his manager', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Of the four focuses, which comes naturally to you, and which will you have to work at?',
    starters: ['Naturally:', 'I\'ll work at:'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Look up a summary of The First 90 Days. Notice which ideas fit a first job and which are for senior leaders.',
  },
  notes: 'Watkins, M. D. (2003). The First 90 Days. Harvard Business School Press (updated edition 2013). Summarised, not quoted. Probation lengths vary by country.',
};

export default lesson;
