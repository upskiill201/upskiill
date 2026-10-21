import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: the hedonic treadmill. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The treadmill',
  summary: 'Ada is spending ₦100,000 more a month than before her raise. Is she ₦100,000 a month happier? Psychology has a name for why she isn\'t: the hedonic treadmill.',
  minutes: 12,
  outcomes: [
    'Explain the hedonic treadmill',
    'See why upgrades stop feeling like upgrades',
    'Use the treadmill to your advantage',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Running to stay still',
      html: '<p>In the 1970s, psychologists Philip Brickman and Donald Campbell described something odd: when good things happen to people, they get happier, and then, over time, they drift back towards how happy they were before. They called it the <strong>hedonic treadmill</strong>. You keep running, and you stay in the same place.</p><p>Ada\'s rides felt wonderful in week one: air conditioning, no crowds. By month three they\'re just how she gets to work. The <em>pleasure</em> faded. The <em>cost</em> didn\'t.</p><p><strong>Why it matters for needs and wants:</strong></p><ul><li>Each upgrade lifts you for a while, then becomes your new normal.</li><li>Your new normal costs more than your old one.</li><li>To feel the lift again, you need the next upgrade. That\'s the treadmill.</li></ul><p><strong>Using it to your advantage:</strong></p><ol><li><strong>Upgrade slowly.</strong> One upgrade at a time lets you notice whether it really made life better.</li><li><strong>Keep some things occasional.</strong> A ride on a rainy day still feels like a treat. A ride every day doesn\'t.</li><li><strong>Spend where the lift lasts.</strong> Things you use for something you love, time with people, and experiences tend to fade more slowly.</li><li><strong>Remember it works backwards too.</strong> Going back to the bus will feel harder for a week or two, then you\'ll adapt to that too.</li></ol>',
    },
    {
      kind: 'check',
      question: 'Why did Ada\'s rides stop feeling special?',
      options: ['She adapted: they became her new normal', 'The rides got worse', 'She stopped taking them'],
      answer: 0,
      explanation: 'That\'s the hedonic treadmill: the pleasure fades as the upgrade becomes normal.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Upgrades lift you, then become normal, and the cost stays. Upgrade slowly, keep treats occasional, and spend where the lift lasts.',
    },
  ],
  apply: {
    scenario: 'Ada on the treadmill.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the hedonic treadmill?',
        options: [
          { text: 'Getting used to good changes, so happiness drifts back while costs stay' },
          { text: 'A type of gym machine', why: 'It\'s a metaphor from psychology.' },
          { text: 'Spending to get fit', why: 'It\'s about adapting to good things.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the treadmill.',
        lines: ['An upgrade', 'A lift in happiness', 'The upgrade becomes normal', 'Happiness drifts back', 'The cost stays'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Speeds up the treadmill, or slows it down?',
        groups: ['Speeds up', 'Slows down'],
        items: [
          { text: 'Five upgrades at once', group: 0 },
          { text: 'Keeping treats occasional', group: 1 },
          { text: 'One upgrade at a time', group: 1 },
          { text: 'Daily treats that feel normal', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If I go back to the bus, I\'ll be miserable forever.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'It\'ll feel worse for a week or two. Then you\'ll adapt, the same way you adapted to rides. The treadmill works both ways.' },
          { text: 'Yes, forever.', why: 'Adaptation works backwards too.' },
          { text: 'You\'re overreacting.', why: 'Her feeling is real at first. It fades.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The treadmill in one line.',
        template: 'The [[1]] faded. The [[2]] didn\'t.',
        blanks: [['pleasure'], ['cost']],
        distractors: ['price', 'joy'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tip to what it does.',
        pairs: [
          ['Upgrade slowly', 'Notice if it really helped'],
          ['Keep some things occasional', 'They stay treats'],
          ['Spend where the lift lasts', 'Slower fade'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan keeps Ada on the treadmill?',
        lines: [
          'Rides on rainy days only.',
          'Delivery on Fridays as a treat.',
          'When the new phone feels boring, upgrade again.',
        ],
        bug: 2,
        fix: 'Keep the phone until it actually stops working well.',
        explanation: 'Upgrading because the last upgrade feels normal is the treadmill itself.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rides on rainy days only: about 8 rides a month at ₦3,000 extra each. How much is that?',
        answers: ['24000', '24,000', '₦24,000', '₦24000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Who first described the hedonic treadmill?',
        options: [
          { text: 'Psychologists Brickman and Campbell, in the 1970s' },
          { text: 'A fitness company', why: 'It\'s from psychology research.' },
          { text: 'Ada', why: 'She\'s living it, not naming it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Where does the lift tend to last longest?',
        options: [
          { text: 'Experiences, time with people, and tools for things you love' },
          { text: 'The newest phone', why: 'Phones become normal fast.' },
          { text: 'Daily delivery', why: 'Daily treats fade fastest.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What upgrade did you love at first and now barely notice? Is it still worth what it costs?',
    starters: ['I loved...', 'Now...', 'Worth it? ...'],
  },
  deepen: {
    title: 'Not everything fades',
    summary: 'Research suggests some changes resist adaptation: a long commute, noise, or chronic pain stay unpleasant; close relationships and meaningful activities stay rewarding. That\'s another reason to spend on what lasts, and to avoid upgrades that just become background.',
  },
  notes: 'Brickman, P., & Campbell, D. T. (1971). Hedonic relativism and planning the good society. Frederick & Loewenstein (1999), Hedonic adaptation. Commute as resisting adaptation: Stutzer & Frey (2008). Rainy-day rides 8 × 3,000 = 24,000 (fictional).',
};

export default lesson;
