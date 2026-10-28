import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 6 — reading Brenda's feedback email. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Brenda\'s feedback',
  summary: 'Brenda replies the next day. Her feedback is five lines long. Clinton reads it three times, first hurt, then curious. Tap each line to see what it really tells him.',
  minutes: 11,
  outcomes: ['Read feedback for what\'s useful', 'Separate the facts from the feelings', 'Spot the opportunities hidden in feedback'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Brenda\'s email',
      text: 'Hi Clinton, thank you for such a gracious reply.\nThe team really liked your offline work and your stories. It was very close.\nWe chose someone who already had experience with our payments stack, which mattered for this role.\nIn the technical round, your answers were strong on ideas but light on testing.\nWe\'re planning more graduate roles later this year. I hope our paths cross again.',
      hotspots: [
        { phrase: 'thank you for such a gracious reply', note: 'His reply worked. This sentence wouldn\'t exist if he\'d sent the angry one.' },
        { phrase: 'It was very close.', note: 'Recruiters don\'t always say this. When they do, it means he was a real contender.' },
        { phrase: 'someone who already had experience with our payments stack', note: 'A reason mostly outside his control: a closer fit for this role. Not "you\'re not good enough".' },
        { phrase: 'light on testing', note: 'The one thing in his control. This is the gold in the email: specific and fixable.' },
        { phrase: 'We\'re planning more graduate roles later this year.', note: 'An open door. Worth writing in his tracker with a date to check back.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In feedback, look for three things: what went well, what\'s in your control, and any open door.',
    },
  ],
  apply: {
    scenario: 'Clinton reads Brenda\'s feedback.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Brenda\'s email in order.',
        lines: ['Thanks for the gracious reply', 'What went well', 'Why they chose someone else', 'What he could improve', 'An open door'],
      },
      {
        kind: 'mcq',
        prompt: 'Which line is the most useful for Clinton to act on?',
        options: [
          { text: '"Experience with our payments stack"', why: 'Mostly outside his control for now.' },
          { text: '"Light on testing"' },
          { text: '"Thank you"', why: 'Nice, but not something to act on.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'In his control, or not?',
        groups: ['In his control', 'Not in his control'],
        items: [
          { text: 'Getting better at testing', group: 0 },
          { text: 'The other candidate\'s experience', group: 1 },
          { text: 'Checking back about future roles', group: 0 },
          { text: 'Which stack Njangi Pay uses', group: 1 },
          { text: 'Learning their stack before next time', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s misreading.',
        lines: ['It was close, so I was a real contender.', 'They said testing, so I\'m a bad developer.', 'They\'re hiring more graduates later.'],
        bug: 1,
        explanation: 'One specific gap isn\'t a judgement on everything. It\'s fixable.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I reply to Brenda\'s feedback?',
        options: [
          { text: 'No, never contact them again.', why: 'A short thank-you keeps the door open.' },
          { text: 'Argue that my testing was fine.', why: 'Thank her and act on it.' },
          { text: 'Yes, two lines: thank her, and say I\'m working on testing and would love to hear about future roles.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it tells Clinton.',
        pairs: [
          ['It was very close', 'He was a real contender'],
          ['Light on testing', 'One fixable gap'],
          ['More graduate roles later', 'An open door'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton put in his tracker?',
        options: [
          { text: 'Njangi Pay: more graduate roles later this year; check back in two months' },
          { text: 'Njangi Pay: never again', why: 'There\'s an open door.' },
          { text: 'Nothing', why: 'Note the open door with a date.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Look for what went well, what\'s in your [[1]], and any open [[2]].',
        blanks: [['control'], ['door']],
        distractors: ['past', 'window', 'wallet'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which skill was Clinton "light on"? (one word)',
        answers: ['testing'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact from the email, or Clinton\'s feeling?',
        groups: ['Fact', 'Feeling'],
        items: [
          { text: 'It was very close', group: 0 },
          { text: 'They hate me', group: 1 },
          { text: 'They chose someone with stack experience', group: 0 },
          { text: 'I\'m useless', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of feedback you\'ve had that hurt. Reread it now: what went well, what was in your control, any open door?',
    starters: ['What went well:', 'In my control:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take any feedback you\'ve received and highlight three things: the praise, the fixable part, the open door.',
  },
  notes: 'Brenda\'s email is fiction; real feedback is often shorter or absent.',
};

export default lesson;
