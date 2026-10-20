import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Reading: anchors. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Anchors',
  summary: 'Students compare WashDay with something. If it\'s the free bucket, 1,800 sounds steep. If it\'s Mama Rose\'s 2,400, it sounds like a bargain. Clinton learns to choose the comparison.',
  minutes: 12,
  outcomes: [
    'Explain what a price anchor is',
    'See how the comparison changes how a price feels',
    'Present your price next to the right anchor, honestly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What are they comparing you with?',
      html: '<p>People rarely judge a price on its own. They compare it with the first relevant number in their head: the <strong>anchor</strong>. Psychologists Tversky and Kahneman showed that even unrelated numbers can pull people\'s estimates up or down.</p><p>WashDay has two possible anchors:</p><ul><li><strong>The free bucket.</strong> Next to zero, any price feels like a cost.</li><li><strong>Mama Rose\'s 2,400</strong> for a basket you carry yourself. Next to that, 1,800 with pickup feels like a deal.</li></ul><p>Clinton\'s old post said: "WashDay: 1,500 FCFA." Nothing to compare with, so students compared with the bucket.</p><p>His new post says: "<strong>Less than the 2,400 at the stand, and we carry it for you.</strong> 1,800 FCFA a bag, picked up from your room."</p><p>Also useful: <strong>per item</strong>. A 12-item bag at 1,800 is 150 FCFA an item, against 200 at the stand.</p><p>Anchors must be <strong>true and fair</strong>. Comparing with a real price customers know is honest. Inventing a fake "was 3,000, now 1,800" is not.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Use real anchors customers already know. Fake "was" prices break trust and can break consumer-protection rules.',
    },
  ],
  apply: {
    scenario: 'Choosing the comparison.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a price anchor?',
        options: [
          { text: 'The number people compare a price with' },
          { text: 'The lowest price allowed', why: 'That\'s the floor.' },
          { text: 'A discount code', why: 'It\'s a comparison point.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which anchor makes 1,800 FCFA feel like a good deal?',
        groups: ['Good deal', 'Feels expensive'],
        items: [
          { text: 'Mama Rose\'s 2,400 basket', group: 0 },
          { text: 'The free bucket', group: 1 },
          { text: '200 FCFA an item at the stand', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 12-item bag at 1,800 FCFA. What is that per item, in FCFA?',
        answers: ['150'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the post to what students compare it with.',
        pairs: [
          ['"WashDay: 1,500 FCFA."', 'The free bucket'],
          ['"Less than the 2,400 at the stand"', 'Mama Rose\'s price'],
          ['"150 FCFA an item"', '200 an item at the stand'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Could I write "Was 3,000, now only 1,800!"?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Only if it really was 3,000. It never was. Fake "was" prices are dishonest, and students would see through it. Use the real 2,400 at the stand.' },
          { text: 'Yes, everyone does it.', why: 'It\'s misleading, and may break consumer rules.' },
          { text: 'Write "was 10,000".', why: 'Even more misleading.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The new post.',
        template: 'Less than the [[1]] at the stand, and we [[2]] it for you.',
        blanks: [['2,400', '2400'], ['carry']],
        distractors: ['1,000', 'wash'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Clinton\'s old post ("WashDay: 1,500 FCFA.") make students think of the bucket?',
        options: [
          { text: 'It gave no comparison, so they compared with what they do now: wash for free' },
          { text: 'It was too long', why: 'It was short; it had no anchor.' },
          { text: 'It mentioned buckets', why: 'It didn\'t; that was their default.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the new post is a dishonest anchor?',
        lines: [
          'Pickup from your room, back Sunday.',
          'Less than the 2,400 at the stand.',
          'Usually 4,000, today only 1,800!',
          '150 FCFA an item.',
        ],
        bug: 2,
        fix: 'Delete it: WashDay never charged 4,000.',
        explanation: 'A made-up "usual" price misleads customers.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At the stand it\'s 200 an item; WashDay at 1,800 a bag is 150 an item. How much cheaper per item, in FCFA?',
        answers: ['50'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to present a price.',
        lines: ['Find the real alternative customers know', 'Show your price next to it', 'Add what you do that it doesn\'t', 'Check every comparison is true'],
      },
    ],
  },
  reflect: {
    prompt: 'What do your customers compare your price with? Is there a fairer, more accurate anchor you could show them?',
    starters: ['They compare me with...', 'A better anchor is...'],
  },
  deepen: {
    title: 'The anchoring classic',
    summary: 'In a famous experiment, Tversky and Kahneman spun a wheel of numbers before asking people to estimate a percentage. A higher random number led to higher estimates. Numbers stick, even irrelevant ones.',
  },
  notes: 'Anchoring and adjustment: Tversky & Kahneman (1974), Science 185. Fictional: 1,800/12 = 150 per item vs 200 at Mama Rose\'s stand. Fake reference prices can breach consumer-protection rules in many countries.',
};

export default lesson;
