import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Side by side: a vague yes vs a real commitment (implementation intentions, Gollwitzer). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Sure" is not a plan',
  summary: 'At the end of last week\'s meeting, everyone said "sure, I\'ll look into it." Remi checks a week later: nothing has happened. Not because anyone lied. Two versions of how that meeting could have ended.',
  minutes: 11,
  outcomes: [
    'Tell a vague yes from a real commitment',
    'Turn "I\'ll look into it" into who, what and when',
    'Make commitments out loud, in front of the group',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'How the meeting ended',
      before: { label: 'Vague yes', text: 'Remi: "So everyone\'s happy to help?" Everyone: "Sure." Felix: "I\'ll look into the screen." Pauline: "I\'ll think about the emails." (A week later: nothing.)' },
      after: { label: 'Real commitment', text: 'Remi: "Felix, what\'s your first step, and when?" Felix: "On Tuesday after stand-up I\'ll add the new refund field." Pauline: "When Wanjiku\'s pilot results arrive, I\'ll draft the email that same day." Remi reads them out and sends them within the hour.' },
      notes: [
        '"Look into it" has no action and no time.',
        '"On Tuesday after stand-up I\'ll..." is a plan.',
        'Said out loud, in front of the group, and written down.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Psychologist <strong>Peter Gollwitzer</strong> studied what he called <strong>implementation intentions</strong>: plans in the form \"When X happens, I will do Y.\" A review of many studies (Gollwitzer and Sheeran, 2006) found these plans made people noticeably more likely to follow through than just intending to do something. Saying when, where and how links the action to a moment in their day.</p><p>Without authority, Remi can't order anyone. But he can ask the question that turns a vague yes into a real plan: <strong>\"What's your first step, and when?\"</strong></p>",
    },
    {
      kind: 'check',
      question: 'Which one is an implementation intention?',
      options: ['"On Tuesday after stand-up, I\'ll add the field."', '"I\'ll look into it."', '"Sure, happy to help."'],
      answer: 0,
      explanation: 'When X, I will do Y: a moment and an action.',
    },
  ],
  apply: {
    scenario: 'The end of the meeting.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Vague yes, or real commitment?',
        groups: ['Vague yes', 'Real commitment'],
        items: [
          { text: '"I\'ll look into it."', group: 0 },
          { text: '"Tuesday after stand-up, I\'ll add the field."', group: 1 },
          { text: '"Sure, happy to help."', group: 0 },
          { text: '"When the results arrive, I\'ll draft it that day."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Gollwitzer and Sheeran\'s review find?',
        options: [
          { text: 'Plans make no difference', why: 'They found a real effect.' },
          { text: 'Only deadlines matter', why: 'Linking the action to a moment matters.' },
          { text: '"When X, I will Y" plans made people noticeably more likely to follow through' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'pauline',
        message: 'Sure, I\'ll think about the emails.',
        prompt: 'Remi\'s best follow-up question?',
        options: [
          { text: 'Thank you! What\'s your first step, and when?' },
          { text: 'Great, thanks!', why: 'That\'s the vague yes, accepted.' },
          { text: 'You need to do it by Friday.', why: 'An order he can\'t give. Ask instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"When X, I will Y" plans are called ___ intentions. (one word)',
        answers: ['implementation', 'Implementation'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague yes to its real version.',
        pairs: [
          ['"I\'ll look into the screen."', '"Tuesday after stand-up, I\'ll add the field."'],
          ['"I\'ll think about the emails."', '"When results arrive, I\'ll draft it that day."'],
          ['"I\'ll ask my team."', '"At Thursday\'s huddle, I\'ll ask them."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why read commitments out loud before people leave?',
        options: [
          { text: 'To embarrass people', why: 'It\'s to make them clear.' },
          { text: 'Public commitments are more likely to be kept, and misunderstandings get caught' },
          { text: 'To fill time', why: 'It takes two minutes and saves a week.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s meeting notes. Which line is a vague yes?',
        lines: [
          'Felix: Tuesday after stand-up, adds the refund field.',
          'Emeka: will try to sort the reference numbers soon.',
          'Pauline: drafts the email the day pilot results arrive.',
        ],
        bug: 1,
        fix: 'Emeka: Monday 9 a.m. Lagos, adds the field to the return form.',
        explanation: '"Try" and "soon" have no action and no time.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put ending a meeting well in order.',
        lines: ['Ask each person: first step, and when?', 'Read the commitments out loud', 'Send them within the hour', 'Check in on the agreed day'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Turn "I\'ll look into it" into a first [[1]] and a [[2]].',
        blanks: [['step', 'action'], ['when', 'time', 'date']],
        distractors: ['excuse', 'maybe'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s question.',
        tiles: ['What\'s', 'your', 'first', 'step,', 'and', 'when?'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you said "I\'ll look into it" about recently. Turn it into "When X, I will Y."',
    starters: ['I said I\'d look into...', 'When..., I will...'],
  },
  deepen: {
    title: 'One when-then plan',
    summary: 'Write one "When X, I will Y" plan for something you\'ve been putting off. Put the X in your calendar.',
  },
  notes: 'Peter M. Gollwitzer (1999), "Implementation Intentions: Strong Effects of Simple Plans", American Psychologist 54(7). Gollwitzer & Paschal Sheeran (2006), meta-analysis (94 studies), Advances in Experimental Social Psychology 38: medium-to-large effect on goal attainment (d ≈ .65), hedged as "noticeably". Public commitment and consistency: Cialdini.',
};

export default lesson;
