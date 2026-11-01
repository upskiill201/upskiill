import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Chat with Tey: building confidence (Bandura's four sources of self-efficacy). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Building confidence',
  summary: 'Halima is brilliant with clinics, and she still says "I\'m not really a tech person" twice a day. A Kano clinic asked her to train their whole staff next week. She wants to say no. Miracle asks Tey how to help without just saying "you\'ll be fine".',
  minutes: 11,
  outcomes: [
    'Know the four sources of confidence (self-efficacy)',
    'Build someone\'s confidence in ways that last',
    'Avoid empty reassurance',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What have you said to Halima so far?',
          replies: ['"You\'ll be fine!"', '"You\'re great at this."'],
        },
        {
          tey: "Kind, and true. But reassurance alone rarely sticks. Psychologist Albert Bandura studied self-efficacy: our belief that we can do a specific thing. He found it comes from four sources. The strongest is having done it before.",
          replies: ['What are the four?'],
        },
        {
          tey: "One: mastery experiences, actually succeeding. Two: seeing someone like you succeed. Three: encouragement from someone you trust. Four: how your body feels, because nerves get read as \"I can't\". Words are number three. Experience is number one.",
          replies: ['So how do I use that with Halima?'],
        },
        {
          tey: "Build a small win first: have her train one nurse on Monday before the whole staff. Let her watch Bisi run a group session. Then encourage her, specifically: \"You trained Kano clinics in Hausa when nobody else could.\" And tell her nerves are normal, even for Bisi.",
          replies: ['What if she still says no?'],
        },
        {
          tey: "Then make it smaller, not bigger. \"Would you co-run it with Bisi?\" Confidence grows step by step. Pushing too far too fast can knock it back.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Confidence comes from: doing it (strongest), seeing someone like you do it, specific encouragement, and reading nerves as normal. Build small wins first.',
    },
  ],
  apply: {
    scenario: 'Tey and Miracle, about Halima.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the strongest source of self-efficacy?',
        options: [
          { text: 'Being told "you\'ll be fine"', why: 'Encouragement helps, but less.' },
          { text: 'Reading about it', why: 'Not one of the four.' },
          { text: 'Mastery experiences: actually succeeding at it' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which source of confidence is it?',
        groups: ['Doing it', 'Seeing others', 'Encouragement'],
        items: [
          { text: 'Halima trains one nurse first', group: 0 },
          { text: 'Halima watches Bisi run a session', group: 1 },
          { text: '"You trained Kano clinics in Hausa."', group: 2 },
          { text: 'Her first two Kano clinics went live', group: 0 },
          { text: 'Another ex-nurse who now leads training', group: 1 },
          { text: 'A trusted colleague saying "you can"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'I\'m not really a tech person. I can\'t train a whole clinic.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You\'ve trained two Kano clinics already, in Hausa. How about one nurse on Monday first, then co-run the big one with Bisi?' },
          { text: 'You\'ll be fine!', why: 'Kind, but it doesn\'t build real confidence.' },
          { text: 'You have to, they asked for you.', why: 'Pressure on low confidence can backfire.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Belief that you can do a specific thing: self-___. (one word)',
        answers: ['efficacy', 'Efficacy'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to Halima\'s plan.',
        pairs: [
          ['Mastery experience', 'Train one nurse Monday'],
          ['Seeing someone like you', 'Watch Bisi\'s session'],
          ['Reading nerves as normal', '"Even Bisi gets nervous."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'If Halima still says no, what should Miracle do?',
        options: [
          { text: 'Insist', why: 'Pushing too fast can knock confidence back.' },
          { text: 'Make the step smaller, like co-running it with Bisi' },
          { text: 'Give the job to someone else forever', why: 'She\'s capable. Help her build up to it.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s confidence plan. Which line won\'t help much?',
        lines: [
          'Monday: Halima trains one nurse.',
          'Tell her every day that she\'s amazing.',
          'Wednesday: she watches Bisi run a group session.',
        ],
        bug: 1,
        fix: 'Tell her one specific thing she did well after Monday.',
        explanation: 'Constant general praise wears thin. Specific encouragement after real wins lasts.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building confidence in order.',
        lines: ['A small first win', 'Watch someone like you', 'Specific encouragement', 'A slightly bigger step'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Confidence comes from [[1]] it, not from being [[2]] you can.',
        blanks: [['doing'], ['told']],
        distractors: ['reading', 'paid'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the smaller step.',
        tiles: ['Train', 'one', 'nurse', 'first.'],
        distractors: ['everyone'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you don\'t feel confident about? Which of the four sources could help you build it?',
    starters: ['I don\'t feel confident about...', 'What could help: ...'],
  },
  deepen: {
    title: 'Make it smaller',
    summary: 'If someone you lead is scared of a big task, break off a small first step they can win this week. Then point out what they did.',
  },
  notes: 'Albert Bandura (1977), "Self-efficacy: Toward a unifying theory of behavioral change", Psychological Review 84(2); Self-Efficacy: The Exercise of Control (1997): mastery experiences, vicarious experiences, verbal persuasion, physiological and emotional states. Fictional details.',
};

export default lesson;
