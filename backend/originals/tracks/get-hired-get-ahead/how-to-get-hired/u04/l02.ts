import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 2 — why companies say no; reasons that aren't about you. Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why companies say no',
  summary: 'Clinton is sure he was rejected because he\'s not good enough. Miracle has rejected dozens of strong candidates herself. She explains what\'s usually happening on the other side of a "no".',
  minutes: 12,
  outcomes: ['List common reasons for a rejection', 'Tell what you can and can\'t control', 'Read a rejection without over-reading it'],
  learn: [
    {
      kind: 'reading',
      title: 'The other side of a no',
      html:
        '<p>A rejection feels like a verdict on you. Usually, it\'s a decision about <strong>one role, at one moment, among several people</strong>. Miracle\'s list of reasons she has said no to good candidates:</p>' +
        '<ul><li><strong>Someone else was a slightly closer fit</strong>, for example more experience with one specific tool.</li>' +
        '<li><strong>An internal candidate</strong> already knew the team.</li>' +
        '<li><strong>The budget or the role changed</strong> halfway through.</li>' +
        '<li><strong>Timing</strong>: someone could start sooner.</li>' +
        '<li><strong>Something you can improve</strong>: an answer that missed, a gap in a skill.</li></ul>' +
        '<p>Only the last one is fully in your control. That doesn\'t mean ignore it. It means <strong>don\'t treat every no as proof something is wrong with you</strong>.</p>' +
        '<p>Most people hear "no" many times in a job search, including people who go on to great careers. A no to one application is information, not identity. The useful questions are: <em>Is there anything I can learn from this?</em> and <em>What\'s my next step?</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A no is about one role, one moment, among several people. Learn what you can, then take the next step.',
    },
  ],
  apply: {
    scenario: 'Miracle explains why companies say no.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a rejection usually about?',
        options: [
          { text: 'One role, at one moment, among several people' },
          { text: 'Your worth as a person', why: 'It\'s about one role and moment.' },
          { text: 'Nothing at all', why: 'There\'s a reason; it may not be about you.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In Clinton\'s control, or not?',
        groups: ['In his control', 'Not in his control'],
        items: [
          { text: 'An answer that missed', group: 0 },
          { text: 'An internal candidate', group: 1 },
          { text: 'The budget changed', group: 1 },
          { text: 'A skill gap he can work on', group: 0 },
          { text: 'Someone could start sooner', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reason to an example.',
        pairs: [
          ['A closer fit', 'More experience with one tool'],
          ['Internal candidate', 'Already knew the team'],
          ['Timing', 'Could start sooner'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'They said no, so I\'m clearly not good enough for fintech.',
        options: [
          { text: 'That\'s one role at one moment. I\'ll ask what I can learn, then take my next step.' },
          { text: 'True, I\'ll change careers.', why: 'One no isn\'t a verdict.' },
          { text: 'They\'re just stupid.', why: 'Blame doesn\'t help you learn.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the over-reading.',
        lines: ['Someone may have been a closer fit.', 'This proves I\'ll never get a job anywhere.', 'I can ask what to improve.'],
        bug: 1,
        explanation: 'One no is information, not a prediction about every job.',
      },
      {
        kind: 'mcq',
        prompt: 'Which reason is fully in your control?',
        options: [
          { text: 'Something you can improve, like an answer or a skill' },
          { text: 'An internal candidate', why: 'Not in your control.' },
          { text: 'The budget', why: 'Not in your control.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What are the two useful questions after a no?',
        options: [
          { text: 'What can I learn? What\'s my next step?' },
          { text: 'Who\'s to blame? How do I get revenge?', why: 'Neither helps.' },
          { text: 'Why me? Why now?', why: 'Learn and act instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the idea.',
        template: 'A no is [[1]], not identity.',
        blanks: [['information']],
        distractors: ['proof', 'failure', 'forever'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of Miracle\'s five reasons are fully in the candidate\'s control? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful thought, or unhelpful?',
        groups: ['Helpful', 'Unhelpful'],
        items: [
          { text: 'What can I learn from this?', group: 0 },
          { text: 'I\'m worthless', group: 1 },
          { text: 'What\'s my next step?', group: 0 },
          { text: 'Everyone is against me', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a recent no. Which of Miracle\'s reasons might have been behind it? Which part was in your control?',
    starters: ['It might have been...', 'In my control:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down your last no and sort the possible reasons into "in my control" and "not in my control".',
  },
  notes: 'Reasons are common hiring-side explanations; no statistics used.',
};

export default lesson;
