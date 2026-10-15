import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: features vs benefits. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Features vs benefits',
  summary: 'Ada writes out what her app can do: reminders, a payment log, a monthly summary, an export button. Arjun reads it and says: "Lovely list. Why would anyone care?"',
  minutes: 11,
  outcomes: [
    'Tell a feature from a benefit',
    'Turn features into benefits with "so that..."',
    'Lead with benefits, mention features only as proof',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same app, two ways',
      before: {
        label: 'Features',
        text: 'It has automatic reminders, a payment log, a monthly summary and an export button.',
      },
      after: {
        label: 'Benefits',
        text: 'Nobody forgets to pay, because the app reminds them. Nobody argues, because every payment is on record. And the organiser saves about two hours a month.',
      },
      notes: [
        'A feature is what it HAS. A benefit is what it DOES for the person.',
        'Each benefit still mentions the feature, as the reason it works.',
        '"Saves about two hours a month" is a benefit people can feel.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>The \"so that\" trick.</strong> Take any feature and add \"so that...\". Keep going until you reach something the listener actually cares about.</p><ul><li>Automatic reminders → <em>so that</em> nobody forgets → <em>so that</em> the pot is always full on payday.</li><li>A payment log → <em>so that</em> there's a record → <em>so that</em> nobody argues.</li></ul><p>It works for people too. \"I know Figma\" is a feature. \"I design screens people understand without a manual\" is a benefit.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Features tell. Benefits sell. Add "so that..." until you reach what they care about.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s red pen.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Feature, or benefit?',
        groups: ['Feature', 'Benefit'],
        items: [
          { text: 'Automatic reminders', group: 0 },
          { text: 'Nobody forgets to pay', group: 1 },
          { text: 'An export button', group: 0 },
          { text: 'The organiser saves two hours a month', group: 1 },
          { text: 'Nobody argues about money', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a feature and a benefit?',
        options: [
          { text: 'A feature is what it has; a benefit is what it does for the person' },
          { text: 'They\'re the same', why: 'The whole lesson is the difference.' },
          { text: 'Benefits are more technical', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Follow the "so that" chain.',
        lines: ['Automatic reminders', 'so that nobody forgets to pay', 'so that the pot is full on payday'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I should never mention the reminders feature?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Never, features are banned.', why: 'Features are proof. Lead with benefits.' },
          { text: 'List all the features first.', why: 'That\'s the "lovely list" problem.' },
          { text: 'Mention it as the reason the benefit works: "Nobody forgets, because it sends reminders."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Add "so ___..." to a feature until you reach a benefit. (one word)',
        answers: ['that'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to its benefit.',
        pairs: [
          ['Payment log', 'Nobody argues'],
          ['Monthly summary', 'The organiser saves time'],
          ['Reminders', 'Nobody forgets to pay'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s new pitch. Which line is still a feature list?',
        lines: [
          'I help office savings groups track who\'s paid, so nobody argues about money.',
          'It has reminders, a log, a summary, an export button and a settings page.',
          'My office has used it for four months with zero arguments.',
        ],
        bug: 1,
        fix: 'Nobody forgets to pay, because it reminds them.',
        explanation: 'A list of features, with no "so that". Turn one into a benefit instead.',
      },
      {
        kind: 'mcq',
        prompt: 'A job seeker says "I know Excel." What\'s a benefit version?',
        options: [
          { text: '"I know Excel very well."', why: 'Still a feature.' },
          { text: '"I have Excel installed."', why: 'Definitely a feature.' },
          { text: '"I turn messy spreadsheets into reports managers can read in a minute."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s benefit line.',
        template: 'Nobody forgets to [[1]], because the app [[2]] them. Nobody [[3]], because every payment is on record.',
        blanks: [['pay'], ['reminds'], ['argues']],
        distractors: ['exports', 'codes'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s rule.',
        tiles: ['Features', 'tell.', 'Benefits', 'sell.'],
        distractors: ['lists'],
      },
    ],
  },
  reflect: {
    prompt: 'List three "features" of your pitch (skills, product features, qualifications). Turn each into a benefit with "so that..."',
    starters: ['Feature: ... so that...', 'Feature: ... so that...'],
  },
  deepen: {
    title: 'Rewrite your bio',
    summary: 'Look at your CV summary, bio or product description. Circle every feature. Rewrite one sentence so it says what that feature does for someone.',
  },
  notes: 'Features vs benefits is foundational sales and marketing guidance; "two hours a month" is a fictional figure for Ada\'s app.',
};

export default lesson;
