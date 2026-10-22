import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Before/After: avoiding vs addressing. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Avoiding vs addressing',
  summary: 'Three days of avoiding Femi felt safe. Grace adds up what it actually cost: messages, delays and a team walking on eggshells. Then she imagines a five-minute conversation.',
  minutes: 12,
  outcomes: [
    'See the hidden costs of avoiding a conflict',
    'Picture a short, calm way to address it',
    'Choose to address important conflicts early',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Three days of avoiding vs five minutes of addressing',
      before: {
        label: 'Avoiding',
        text: 'Grace writes to Femi only in the team channel, formally.\nShe skips the step 3 design review "because she\'s busy".\nFemi rebuilds step 3 without her research notes, and gets part of it wrong.\nPriya notices. The team tiptoes.\nNothing about the original comment has been said.',
      },
      after: {
        label: 'Addressing',
        text: 'Grace: "Femi, have you got five minutes? What you said in stand-up stung. I know the delay is stressful. Can we work out step 3 together so it doesn\'t happen again?"\nFemi: "Yeah... I shouldn\'t have said that in front of everyone. I\'m stressed about the 14th."\nThey book an hour on step 3 that afternoon.',
      },
      notes: [
        'Avoiding feels safe today and costs more every day after.',
        'Address it early, privately, and briefly: what happened, how it felt, what you want next.',
        'Focus on the shared goal: the launch, the patients.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Address important conflicts early, privately and briefly: what happened, how it felt, what you\'d like next.',
    },
  ],
  apply: {
    scenario: 'Avoid or address?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A cost of avoiding, or a benefit of addressing?',
        groups: ['Cost of avoiding', 'Benefit of addressing'],
        items: [
          { text: 'Step 3 rebuilt without her notes', group: 0 },
          { text: 'An hour booked together on step 3', group: 1 },
          { text: 'The team tiptoeing', group: 0 },
          { text: 'Femi explaining his stress', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What went wrong while Grace was avoiding Femi?',
        options: [
          { text: 'Nothing', why: 'The work suffered.' },
          { text: 'He rebuilt step 3 without her notes and got part of it wrong' },
          { text: 'He apologised', why: 'Nothing was said.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Grace\'s opener to its job.',
        pairs: [
          ['"Have you got five minutes?"', 'Private and brief'],
          ['"What you said stung."', 'How it felt'],
          ['"I know the delay is stressful."', 'Shows understanding'],
          ['"Can we work out step 3 together?"', 'What she wants next'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'What if raising it makes things worse?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'It will. Never raise it.', why: 'Avoiding is already costing the team.' },
          { text: 'Raise it in stand-up tomorrow.', why: 'Private is better.' },
          { text: 'Raised calmly and privately, it usually makes things better. Left alone, it\'s already making things worse.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'How to address it.',
        template: 'Early, [[1]], and [[2]].',
        blanks: [['privately'], ['briefly']],
        distractors: ['publicly', 'loudly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention the shared goal (the launch, the patients)?',
        options: [
          { text: 'To change the subject', why: 'It reframes the problem.' },
          { text: 'It reminds both of them they\'re on the same side' },
          { text: 'It isn\'t useful', why: 'Shared goals lower the temperature.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s opener would start a fight?',
        lines: [
          'Femi, have you got five minutes?',
          'What you said in stand-up stung.',
          'You always blame everyone else.',
          'Can we work out step 3 together?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '"Always" turns one moment into an attack on his character.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did Grace ask Femi for?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Grace\'s opener.',
        lines: ['Ask for a private moment', 'Say what happened', 'Say how it felt', 'Show you understand their side', 'Suggest a next step'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth addressing, or fine to let go?',
        groups: ['Address it', 'Let it go'],
        items: [
          { text: 'Public blame for a delay', group: 0 },
          { text: 'A colleague humming at their desk once', group: 1 },
          { text: 'Being left out of a design review', group: 0 },
          { text: 'Someone took the last biscuit', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-minute opener for a conflict you\'ve been avoiding: what happened, how it felt, what you want next.',
    starters: ['Have you got five minutes?...', 'What I\'d like is...'],
  },
  deepen: {
    title: 'Conflict debt',
    summary: 'Unresolved conflicts behave like debt: the longer they wait, the more "interest" they collect, in misunderstanding, gossip and lost work.',
  },
  notes: 'Fictional dialogue. Avoidance and escalation: common finding in conflict research (e.g. Thomas-Kilmann; Stone, Patton & Heen, Difficult Conversations).',
};

export default lesson;
