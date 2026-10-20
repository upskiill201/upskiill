import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Paul's comment. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Paul\'s comment',
  summary: 'Paul\'s review of the retry-service design doc arrives: twelve comments, and at the end, "Clear trade-offs, well argued. Ship it." Clinton reads that line four times. Then a quiz. Outside offers, sponsors, pay and the case.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle outside interest honestly', 'Understand mentors, sponsors and pay bands', 'Build a promotion case'],
  learn: [
    {
      kind: 'story',
      title: 'Twelve comments',
      beats: [
        { speaker: 'narrator', text: 'Paul\'s review: twelve comments. The last one: "Clear trade-offs, well argued. Ship it."' },
        { speaker: 'paul', text: '(in the team chat) Clinton\'s retry design is the clearest doc we\'ve had this year. Read it.' },
        { speaker: 'clinton', text: '(to himself) Paul just sponsored me. In public.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: after Paul\'s review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Paul\'s team-chat message an example of?',
        options: [
          { text: 'Sponsorship: speaking up for Clinton' },
          { text: 'Mentoring', why: 'He spoke up publicly; that\'s sponsorship.' },
          { text: 'Nothing', why: 'It was sponsorship.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the promotion case in order.',
        lines: ['The ask', 'Criteria and evidence', 'The gaps you closed', 'What others say', 'What you\'ll do next'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or manipulative?',
        groups: ['Honest', 'Manipulative'],
        items: [
          { text: 'It\'s not the right fit for me now', group: 0 },
          { text: 'Promote me or I leave (not meant)', group: 1 },
          { text: 'I have a real offer I\'m weighing', group: 0 },
          { text: 'Inventing a second offer', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak case line.',
        lines: ['Led the retry rebuild with Kemi.', 'I\'ve been here a long time.', 'Paul: "Clear trade-offs, well argued."'],
        bug: 1,
        explanation: 'Time isn\'t evidence.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer.',
        from: 'miracle',
        message: 'What will you ask Ngozi about pay if you\'re promoted?',
        options: [
          { text: 'What my pay would be in the Developer range, and when it would change.' },
          { text: 'What Paul earns.', why: 'Ask about your own level.' },
          { text: 'Nothing.', why: 'Asking is fair.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their role.',
        pairs: [
          ['Miracle', 'Mentor'],
          ['Ngozi', 'Main sponsor'],
          ['Paul', 'New sponsor'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should you compare in an outside offer?',
        options: [
          { text: 'The whole job: learning, team, work, pay, growth' },
          { text: 'Only the title', why: 'The whole job.' },
          { text: 'Only the logo', why: 'The whole job.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Paul\'s comment.',
        template: 'Clear [[1]], well argued. [[2]] it.',
        blanks: [['trade-offs', 'tradeoffs'], ['Ship']],
        distractors: ['excuses', 'Delete', 'Hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many comments did Paul leave? (a number)',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Mentor or sponsor?',
        groups: ['Mentor', 'Sponsor'],
        items: [
          { text: 'Gives advice on a career choice', group: 0 },
          { text: 'Recommends you for a promotion', group: 1 },
          { text: 'Helps you think through a problem', group: 0 },
          { text: 'Praises your work in front of leaders', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does a promotion always mean the top of the next pay band?',
        options: [
          { text: 'No: usually you move into the band, not to the top' },
          { text: 'Yes, always', why: 'Usually into the band.' },
          { text: 'There are no bands', why: 'Many companies have them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Has anyone ever spoken up for you when you weren\'t there? What work of yours did they see?',
    starters: ['Someone who spoke up for me...', 'They\'d seen...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Speak up for someone else this week: praise a colleague\'s or classmate\'s good work in front of others.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
