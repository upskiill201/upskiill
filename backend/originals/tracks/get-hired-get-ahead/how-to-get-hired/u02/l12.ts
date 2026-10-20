import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 12 — five habits that make a graduate stand out. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'How graduates stand out',
  summary: 'Every year Miracle\'s team takes on new graduates. She tells Clinton the ones she remembers years later weren\'t always the cleverest. They had five habits. None needs experience.',
  minutes: 11,
  outcomes: ['Name five habits that make new graduates stand out', 'Choose one to practise this week', 'Show reliability in small things'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Reliable in small things.</strong> On time. Replies the same day. Does what they said, when they said. Nothing makes a manager trust you faster than never having to chase you.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Own a problem, not just tasks.</strong> "I\'ll make sure drivers can confirm offline" beats "I did the tasks you gave me". Owning means you notice what\'s missing and fix it or flag it.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. Communicate early.</strong> Short updates, risks flagged before they\'re disasters, "I don\'t understand" said out loud. Surprises are what managers dislike most.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton realises he\'ll miss Friday\'s deadline. When should he say so?',
      options: ['Friday evening', 'As soon as he knows', 'Never, just work faster'],
      answer: 1,
      explanation: 'Early news is a plan. Late news is a surprise.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Learn out loud.</strong> Ask good questions, write down answers so you never ask twice, and share what you learn ("I wrote up how sync works, in case it helps").</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. Be kind to everyone.</strong> The drivers, the cleaner, the other interns. People notice how you treat those who can\'t help your career, and small teams talk.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Reliable, owns problems, communicates early, learns out loud, kind to everyone. All five work from day one.',
    },
  ],
  apply: {
    scenario: 'Clinton picks habits to practise.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which habit is this?',
        groups: ['Reliable', 'Communicates early'],
        items: [
          { text: 'Replies the same day', group: 0 },
          { text: 'Flags a risk on Tuesday', group: 1 },
          { text: 'Does what he said, when he said', group: 0 },
          { text: 'Says "I don\'t understand" out loud', group: 1 },
          { text: 'Always on time', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between owning a problem and doing tasks?',
        options: [
          { text: 'Owning means noticing what\'s missing and fixing or flagging it' },
          { text: 'There\'s no difference', why: 'Owners notice gaps; task-doers wait to be told.' },
          { text: 'Owning means doing everyone\'s work', why: 'It means owning your problem fully.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to an action.',
        pairs: [
          ['Own a problem', 'Notices old phones and plans a lighter version'],
          ['Learn out loud', 'Writes up how sync works for the team'],
          ['Be kind to everyone', 'Thanks the drivers after each test'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I\'m going to miss Friday\'s deadline by a day. Should I just stay quiet and rush?',
        options: [
          { text: 'No: I\'ll tell Mr Tamba today, with a new date and what\'s causing it.' },
          { text: 'Yes, maybe he won\'t notice.', why: 'He will. Early news is a plan.' },
          { text: 'Blame Samuel.', why: 'Own it, explain, give a new date.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that would hurt Clinton.',
        lines: ['Writes down answers so he never asks twice.', 'Ignores the drivers because they can\'t hire him.', 'Replies the same day.'],
        bug: 1,
        explanation: 'People notice how you treat everyone, and small teams talk.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which habit builds trust fastest, according to Miracle?',
        options: [
          { text: 'Being reliable, so nobody has to chase you' },
          { text: 'Being the loudest in meetings', why: 'Reliability builds trust fastest.' },
          { text: 'Working weekends', why: 'Reliability, not hours.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s point.',
        template: 'Early news is a [[1]]. Late news is a [[2]].',
        blanks: [['plan'], ['surprise']],
        distractors: ['gift', 'secret', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many habits does Miracle list? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs experience, or works from day one?',
        groups: ['Day one', 'Needs years'],
        items: [
          { text: 'Being on time', group: 0 },
          { text: 'Leading a 50-person team', group: 1 },
          { text: 'Flagging risks early', group: 0 },
          { text: 'Being kind to everyone', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write down answers to your questions?',
        options: [
          { text: 'So you never have to ask the same thing twice' },
          { text: 'To look busy', why: 'It saves everyone\'s time.' },
          { text: 'It\'s required by law', why: 'It\'s just a good habit.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five habits is already your strength? Which one will you practise this week?',
    starters: ['My strength is...', 'This week I\'ll practise...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one habit. Write one specific action for each day this week, like "reply to every message the same day".',
  },
  notes: 'Habits reflect common manager feedback on graduate hires; no statistics used. Miracle\'s view is a story voice, not a survey.',
};

export default lesson;
