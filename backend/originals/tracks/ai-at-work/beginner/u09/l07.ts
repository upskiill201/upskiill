import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 7 — giving feedback kindly (SBI). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Giving feedback kindly',
  summary: 'Tolu missed the outage for 40 minutes because his phone was on silent. Ada needs to give him feedback without crushing him. A simple model helps, and AI can help her word it.',
  minutes: 12,
  outcomes: [
    'Give feedback with Situation, Behaviour, Impact',
    'Keep it about actions, not personality',
    'Use AI to soften wording without losing the point',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Situation, Behaviour, Impact',
      html:
        '<p>The Center for Creative Leadership teaches a simple feedback model, SBI:</p>' +
        '<ul>' +
        '<li><strong>Situation:</strong> when and where. "On Monday morning, during the outage..."</li>' +
        '<li><strong>Behaviour:</strong> what you saw, not what you think about them. "...your phone was on silent, so we couldn\'t reach you for 40 minutes."</li>' +
        '<li><strong>Impact:</strong> what it caused. "Shops waited longer for help, and I had to guess the bank contact."</li>' +
        '</ul>' +
        '<p>Then ask, don\'t tell: <em>"What would help next time?"</em></p>' +
        '<p>Ask AI to check your wording: <em>"Here\'s my feedback. Is it about behaviour, not personality? Make it kinder without making it vague."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Situation, behaviour, impact, then a question. About what happened, never "you\'re careless". Kind, but clear.',
    },
  ],
  apply: {
    scenario: 'Ada gives Tolu feedback.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order SBI feedback.',
        lines: ['Situation', 'Behaviour', 'Impact', 'Ask what would help'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Behaviour, or a judgement about the person?',
        groups: ['Behaviour', 'Judgement'],
        items: [
          { text: 'Your phone was on silent for 40 minutes', group: 0 },
          { text: 'You\'re careless', group: 1 },
          { text: 'You didn\'t reply to the team chat', group: 0 },
          { text: 'You don\'t care about the shops', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who teaches the SBI model?',
        options: [
          { text: 'The Center for Creative Leadership' },
          { text: 'The bank', why: 'CCL.' },
          { text: 'Tobi', why: 'CCL.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best checks Ada\'s feedback?',
        options: [
          { text: 'Make this nicer.', why: 'Might make it vague.' },
          { text: 'Here\'s my feedback for a colleague. Check it\'s about behaviour, not personality, and make it kinder without making it vague.' },
          { text: 'Make it harsher.', why: 'Not the goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'How do you give feedback to someone new without upsetting them?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Say what happened, what it caused, and ask what would help. Keep it about the action, not who they are.' },
          { text: 'Don\'t give feedback to new people.', why: 'They need it most.' },
          { text: 'Tell them they\'re doing badly.', why: 'Too vague and harsh.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete SBI.',
        template: 'Situation, [[1]], [[2]].',
        blanks: [['behaviour', 'behavior'], ['impact']],
        distractors: ['blame', 'attitude'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s feedback should change?',
        lines: [
          'On Monday, during the outage,',
          'your phone was on silent for 40 minutes,',
          'which shows you\'re not serious about this job.',
          'What would help next time?',
        ],
        bug: 2,
        fix: 'so shops waited longer and I had to guess the bank contact.',
        explanation: 'That\'s a judgement about Tolu, not the impact.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the SBI part to Ada\'s words.',
        pairs: [
          ['Situation', 'Monday, during the outage'],
          ['Behaviour', 'Phone on silent for 40 minutes'],
          ['Impact', 'Shops waited longer for help'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many minutes was Tolu unreachable?',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s closing question.',
        tiles: ['What', 'would', 'help', 'next', 'time?'],
        distractors: ['Why'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind and clear, or vague?',
        groups: ['Kind and clear', 'Vague'],
        items: [
          { text: '"We couldn\'t reach you for 40 minutes"', group: 0 },
          { text: '"Maybe be a bit more around?"', group: 1 },
          { text: '"Shops waited longer for help"', group: 0 },
          { text: '"Things weren\'t ideal"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why end with a question?',
        options: [
          { text: 'It invites Tolu to solve it, so the fix is his, not just Ada\'s order' },
          { text: 'To be polite only', why: 'It builds ownership.' },
          { text: 'To avoid the point', why: 'The point is already made.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of feedback you need to give. Write it as situation, behaviour, impact and a question.',
    starters: ['Situation:', 'Impact:'],
  },
  deepen: { title: 'Try it today', summary: 'Write one piece of feedback with SBI and ask AI to check it\'s about behaviour, not personality.' },
  notes: 'SBI (Situation-Behavior-Impact) is a model from the Center for Creative Leadership.',
};

export default lesson;
