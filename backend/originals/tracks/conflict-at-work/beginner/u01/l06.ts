import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Chat with Tey: your default style. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Your default style',
  summary: 'Grace avoids at work, but at home she competes: ask Jayden about the car keys. Tey helps her see why people have different defaults in different places, and how to choose instead.',
  minutes: 12,
  outcomes: [
    'Find your default conflict mode in different settings',
    'Understand where defaults come from',
    'Practise choosing a mode on purpose',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'At work you avoid. What about at home with Jayden?', replies: ['Ha. I win. Every time.'] },
        { tey: 'So: avoiding at work, competing at home. Very common. We often compete where we feel safe and avoid where we feel unsure.', replies: ['Where do defaults come from?'] },
        { tey: 'Family, culture, past jobs. On the ward, there was a clear hierarchy and clear rules, so competing in emergencies felt natural. A new office has neither yet.', replies: ['So how do I change it?'] },
        { tey: 'Before you react, ask two questions: how important is this issue, and how important is this relationship? Both high? Collaborate, even when you want to hide.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before reacting, ask: how important is the issue? How important is the relationship? Then choose the mode on purpose.',
    },
  ],
  apply: {
    scenario: 'Grace\'s defaults.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to Grace\'s default.',
        pairs: [
          ['Kinwell', 'Avoiding'],
          ['Home with Jayden', 'Competing ("I win. Every time.")'],
          ['The ward, in emergencies', 'Competing, with clear rules'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do people often compete at home but avoid at work?',
        options: [
          { text: 'They feel safe at home and unsure at work' },
          { text: 'Work is less important', why: 'It\'s about feeling safe, not importance.' },
          { text: 'They don\'t', why: 'It\'s a common pattern.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Where can defaults come from?',
        groups: ['A source of defaults', 'Not really'],
        items: [
          { text: 'Family habits', group: 0 },
          { text: 'Past workplaces', group: 0 },
          { text: 'The weather today', group: 1 },
          { text: 'Culture', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Jayden borrowed the car again without asking. I want to shout.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Issue: important. Relationship: very important. That says collaborate: tell him why it matters and agree a rule together.' },
          { text: 'Shout. You\'re the parent.', why: 'Competing may win today and lose the relationship.' },
          { text: 'Say nothing.', why: 'It\'s too important to avoid.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two questions.',
        template: 'How important is the [[1]]? How important is the [[2]]?',
        blanks: [['issue'], ['relationship']],
        distractors: ['weather', 'salary'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Issue and relationship both high, or not?',
        groups: ['Both high: collaborate', 'Not both'],
        items: [
          { text: 'Step 3 with Femi', group: 0 },
          { text: 'Jayden and the car', group: 0 },
          { text: 'Which café for the team lunch', group: 1 },
          { text: 'A stranger pushing in a queue', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did competing feel natural on the ward?',
        options: [
          { text: 'Clear hierarchy and clear rules in emergencies' },
          { text: 'Nurses are aggressive', why: 'It was about structure and urgency.' },
          { text: 'It didn\'t', why: 'In emergencies it did.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Tey suggest asking before reacting?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s new rule is a mistake?',
        lines: [
          'Notice my default.',
          'Ask how important the issue is.',
          'Ask how important the relationship is.',
          'Then always do what I did last time.',
        ],
        bug: 3,
        fix: 'Then choose the mode that fits.',
        explanation: 'That\'s just the default again.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tey\'s choose-a-mode routine.',
        lines: ['Notice the urge (hide or win)', 'Ask about the issue', 'Ask about the relationship', 'Choose a mode on purpose'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your default at work, and at home? When does each one serve you badly?',
    starters: ['At work I...', 'At home I...'],
  },
  deepen: {
    title: 'Culture and conflict',
    summary: 'Research on culture finds that some cultures prefer direct conflict and others prefer indirect, harmony-keeping styles. Neither is wrong; knowing both helps in mixed teams like Kinwell\'s.',
  },
  notes: 'Default styles: Thomas-Kilmann. Cultural differences in conflict styles: Ting-Toomey\'s face-negotiation theory (1988); Erin Meyer, The Culture Map (2014). Fictional examples.',
};

export default lesson;
