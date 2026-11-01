import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Mr Tamba's written offer arrives. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the offer letter',
  summary: 'Mr Tamba\'s offer arrives by email: role, salary, start date. Clinton has until Friday next week. Before he even opens the salary line, Miracle quizzes him. Offers on a bad week, momentum, family and staying in touch.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Take time with an offer', 'Keep momentum through a search', 'Handle family pressure and stay in touch with past companies'],
  learn: [
    {
      kind: 'story',
      title: 'The email',
      beats: [
        { speaker: 'narrator', text: 'An email from Mr Tamba: "Junior Developer, full-time. Start: two weeks after graduation. Details attached. Please reply by Friday next week."' },
        { speaker: 'miracle', text: 'Don\'t open the attachment yet. Quiz first. Then we read it together, calmly.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: before reading the offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Clinton do when Mr Tamba offered the job?',
        options: [
          { text: 'Said yes on the spot', why: 'He asked for time.' },
          { text: 'Thanked him, showed interest, asked for details and a few days' },
          { text: 'Said no', why: 'He asked for time.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Action or outcome?',
        groups: ['Action', 'Outcome'],
        items: [
          { text: 'Five messages sent', group: 0 },
          { text: 'An offer arriving', group: 1 },
          { text: 'A story practised', group: 0 },
          { text: 'A company replying', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put staying in touch in order.',
        lines: ['Connect, politely', 'Follow the company', 'Share progress, once', 'Apply again when it fits'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the poor reason to accept.',
        lines: ['The work suits him.', 'To stop feeling bad about Njangi Pay.', 'He\'d learn a lot.'],
        bug: 1,
        explanation: 'Accept because it\'s right, not to escape a feeling.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your uncle asks again on Sunday. What will you say?',
        options: [
          { text: 'Mind your business.', why: 'Short and calm works better.' },
          { text: 'I\'ve accepted (not true yet).', why: 'Say the truth.' },
          { text: 'Not yet: I have an offer I\'m considering, and I\'ll decide by Friday next week.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to why it helps.',
        pairs: [
          ['Several doors open', 'One no doesn\'t stop everything'],
          ['Count actions', 'Progress you can see'],
          ['A money plan', 'No panic decisions'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton check in the offer before deciding?',
        options: [
          { text: 'Role, salary, start date, who he\'ll learn from' },
          { text: 'Only the job title', why: 'Check all the basics.' },
          { text: 'Nothing, just sign', why: 'Read it carefully first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s rule.',
        template: 'Several [[1]]. A weekly [[2]]. Count actions.',
        blanks: [['doors'], ['routine']],
        distractors: ['excuses', 'panic', 'posts'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day must Clinton reply to Mr Tamba? (one word)',
        answers: ['friday'],
        placeholder: 'A day',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to stay in touch, or annoying?',
        groups: ['Good', 'Annoying'],
        items: [
          { text: 'One progress update', group: 0 },
          { text: 'Weekly "any roles?" messages', group: 1 },
          { text: 'Following their blog', group: 0 },
          { text: 'Complaining in their comments', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A classmate posts a big job announcement. What helps Clinton most?',
        options: [
          { text: 'Read every post twice', why: 'Comparison drains energy.' },
          { text: 'Leave a jealous comment', why: 'Be kind, then protect your energy.' },
          { text: 'Congratulate them, then mute announcements for a while' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If an offer arrived for you tomorrow, what would you need to know before deciding?',
    starters: ['I\'d need to know...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your "before I accept" checklist, if you haven\'t already. Keep it for Chapter 5.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14. The offer\'s contents are read in Ch5.',
};

export default lesson;
