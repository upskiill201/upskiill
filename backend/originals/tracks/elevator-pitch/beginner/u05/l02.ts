import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: end with a clear ask. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'End with a clear ask',
  summary: 'Ada\'s ask is "I\'m looking for a mentor to take it to a hundred offices." Arjun: "Good. Now make it impossible to misunderstand. Who exactly? What exactly? By when?"',
  minutes: 12,
  outcomes: [
    'Make your ask specific: who, what and when',
    'Make it easy to say yes to',
    'Put it where it can\'t be cut off',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Sharpen the ask in four steps',
      steps: [
        {
          title: '1. Make it specific',
          body: 'Not "any support". Say exactly what you want: "a mentor who has grown a product from one office to many", "an interview for the design role", "a 15-minute call next week".',
        },
        {
          title: '2. Make it the right size',
          body: 'Big enough to matter, small enough to say yes to. "Fund my whole company" is too big for a lift. "Could I send you a two-minute demo?" is easy to agree to.',
        },
        {
          title: '3. Say why them',
          body: 'One phrase that shows you chose them on purpose: "You\'ve grown three fintechs from a single office." People respond to being picked for a reason.',
        },
        {
          title: '4. Put it before the final line, and before the time runs out',
          body: 'The ask goes in the last 15 seconds, but never in the last 2. Then one closing line. If the microphone cuts at 60 seconds, your ask is already said.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Ada\'s ask, before and after',
      before: {
        label: 'Before',
        text: '"I\'m looking for a mentor to take it to a hundred offices."',
      },
      after: {
        label: 'After',
        text: '"Ten offices have already signed up for next month. I\'m looking for a mentor who has grown a product from one office to many, to help me reach a hundred by next year. If that\'s you, find me after the show."',
      },
      notes: [
        'Specific: what kind of mentor, and what for.',
        'A deadline: "by next year".',
        'An easy next step: "find me after the show".',
      ],
    },
  ],
  apply: {
    scenario: 'Backstage. Sharpening the ask.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the ask steps in order.',
        lines: ['Make it specific', 'Make it the right size', 'Say why them', 'Place it before the final line'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear ask, or vague ask?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '"Could I send you a two-minute demo?"', group: 0 },
          { text: '"Any support would be great."', group: 1 },
          { text: '"A 15-minute call next week?"', group: 0 },
          { text: '"Let me know your thoughts, maybe."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which ask is the right size for a lift ride?',
        options: [
          { text: '"Will you invest ₦50 million today?"', why: 'Too big for 30 floors.' },
          { text: '"Could I send you a two-minute demo?"' },
          { text: '"Will you think about things?"', why: 'Too vague to act on.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Shouldn\'t the ask be the very last thing I say?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Put it in the last 15 seconds, then one closing line. If the mic cuts, your ask is already out.' },
          { text: 'Yes, at second 59.', why: 'Speaker 4 tried that.' },
          { text: 'Skip the ask; they\'ll work it out.', why: 'They won\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good ask is ___: who, what and when. (one word)',
        answers: ['specific', 'clear'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to a good ask.',
        pairs: [
          ['A recruiter', '"Could we talk about the design role next week?"'],
          ['A judge', '"If you\'ve grown products, find me after the show."'],
          ['A possible customer', '"Could I set it up for your group this month?"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s ask draft. Which line weakens it?',
        lines: [
          'I\'m looking for a mentor who has grown a product from one office to many.',
          'But honestly, any help at all would be fine, whatever you can do.',
          'If that\'s you, find me after the show.',
        ],
        bug: 1,
        fix: 'To help me reach a hundred offices by next year.',
        explanation: '"Any help at all" makes a sharp ask vague again.',
      },
      {
        kind: 'mcq',
        prompt: 'Why add "why them"?',
        options: [
          { text: 'To flatter everyone', why: 'It\'s specific, not flattery.' },
          { text: 'It\'s required', why: 'Not required. It just works.' },
          { text: 'People respond to being chosen for a reason' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s sharpened ask.',
        template: 'I\'m looking for a [[1]] who has grown a product from one office to many, to help me reach a [[2]] by next [[3]].',
        blanks: [['mentor'], ['hundred'], ['year']],
        distractors: ['database', 'million'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the easy next step.',
        tiles: ['If', 'that\'s', 'you,', 'find', 'me', 'after', 'the', 'show.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own ask: specific, the right size, with "why them" and an easy next step.',
    starters: ['I\'m looking for...', 'Because you...', 'The next step: ...'],
  },
  deepen: {
    title: 'The yes test',
    summary: 'Read your ask and imagine the listener wants to help. Do they know exactly what to say yes to, and what happens next? If not, sharpen it.',
  },
  notes: 'Specific, right-sized asks with a clear next step: standard negotiation, networking and pitch guidance. "Ten offices signed up" follows the Chapter 4 CEO sponsorship.',
};

export default lesson;
