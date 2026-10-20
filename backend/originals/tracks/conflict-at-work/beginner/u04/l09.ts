import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: ward rules v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ward rules v4',
  summary: 'On the ward, consultants sometimes criticised nurses in front of patients. Grace learned to stay calm and follow up after. Now she writes it down. Tap each new rule.',
  minutes: 11,
  outcomes: [
    'Add criticism rules to your own list',
    'Link each rule to a lesson from this chapter',
    'Use the rules before, during and after criticism',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s ward rules v4',
      text: 'Rules 1 to 15, plus: Rule 16: Name the trigger: truth, relationship or identity. Rule 17: Ask what might be right in it. Rule 18: React in a draft, respond in the email. Rule 19: "Where I see it differently is..." Rule 20: In public: calm, acknowledge, follow up. Delivery goes in private.',
      hotspots: [
        { phrase: 'Name the trigger', note: 'Lesson 2: all three fired at once on Monday.' },
        { phrase: 'Ask what might be right in it', note: 'Lesson 3: the sample-size question made her case stronger.' },
        { phrase: 'React in a draft, respond in the email', note: 'Lesson 4: Monday 11 p.m. vs Tuesday 9 a.m.' },
        { phrase: '"Where I see it differently is..."', note: 'Lesson 6: agree with what\'s true, then differ.' },
        { phrase: 'Delivery goes in private', note: 'Lesson 8: content in writing, delivery in person.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v4 adds: name the trigger, find what\'s right, draft then respond, differ calmly, and keep delivery private.',
    },
  ],
  apply: {
    scenario: 'Ward rules v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the lesson.',
        pairs: [
          ['Name the trigger', 'Your three triggers'],
          ['What might be right', 'What\'s right in it?'],
          ['Draft, then respond', 'Reacting vs responding'],
          ['Where I see it differently', 'Disagreeing calmly'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rules are on v4 in total?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does Rule 18 mean in practice?',
        options: [
          { text: 'Write the angry version without sending it, then write the real reply later' },
          { text: 'Never write emails', why: 'Write, but send the calm version.' },
          { text: 'Send both versions', why: 'Only the response.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'During criticism, or after?',
        groups: ['During', 'After'],
        items: [
          { text: 'Calm, acknowledge, promise follow-up', group: 0 },
          { text: 'Email the evidence', group: 1 },
          { text: 'Name the trigger in your head', group: 0 },
          { text: 'Raise the delivery privately', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Rule 17 is the hardest. I hate admitting critics might be right.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Me too. But it\'s what turned "just opinions" into a meeting with data. It\'s a weapon, not a surrender.' },
          { text: 'Then skip it.', why: 'It\'s one of the most useful rules.' },
          { text: 'Critics are always right.', why: 'Only some parts may be.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule 20.',
        template: 'In public: calm, acknowledge, follow up. [[1]] goes in [[2]].',
        blanks: [['Delivery'], ['private']],
        distractors: ['Anger', 'public'],
      },
      {
        kind: 'mcq',
        prompt: 'Which trigger does Rule 16 help with most when criticism is public?',
        options: [
          { text: 'Identity: it feels like a verdict on who you are' },
          { text: 'None', why: 'Identity is strongest with an audience.' },
          { text: 'Only truth', why: 'Public settings fire identity especially.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of v4 is wrong?',
        lines: [
          'Name the trigger.',
          'Ask what might be right in it.',
          'Respond instantly so nobody thinks I\'m weak.',
          '"Where I see it differently is..."',
        ],
        bug: 2,
        fix: 'React in a draft, respond in the email.',
        explanation: 'Instant replies are usually reactions.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time did Grace send the response email? (e.g. 9 am)',
        answers: ['9', '9 am', '9am', '9 a.m.', '09:00'],
        placeholder: 'A time',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new rules as written.',
        lines: ['Name the trigger', 'Ask what might be right', 'Draft, then respond', 'Where I see it differently', 'Calm in public, delivery in private'],
      },
    ],
  },
  reflect: {
    prompt: 'Add two criticism rules to your list. Which would have helped with criticism you\'ve had?',
    starters: ['Rule:...', 'It would have helped when...'],
  },
  notes: 'Ward rules v4 (fictional) adds Chapter 4 rules.',
};

export default lesson;
