import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Myth or Fact: "never go first" and other asking myths. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '"Never go first"?',
  summary: 'Ngozi says you should never name a number first. Remi says always go first. Ada\'s about to quote Mrs Okon. Who\'s right? It depends on one thing.',
  minutes: 11,
  outcomes: [
    'Know when going first helps and when it doesn\'t',
    'Avoid extreme offers that damage trust',
    'Ask for more than you expect, with a reason',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You should never name a number first.',
          isFact: false,
          explain: 'Myth, mostly. When you know the market, going first sets the anchor. When you have no idea of the value, let them go first, or ask questions first.',
        },
        {
          text: 'An extreme first offer always gets you more.',
          isFact: false,
          explain: 'Myth. A wildly high or low number with no reason can insult the other side and end the talk. Ambitious, but defensible.',
        },
        {
          text: 'It\'s normal to ask for a bit more than you expect to get.',
          isFact: true,
          explain: 'Fact. Most negotiations involve some movement. Starting a little above your goal leaves room to move and still reach it.',
        },
        {
          text: 'Your first number should be backed by a reason.',
          isFact: true,
          explain: 'Fact. A reason turns "what I want" into "what\'s fair". Ada\'s logo quote will show the hours and what similar logos cost.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Go first when you know the range. Aim a little above your goal, and give a reason.',
    },
  ],
  apply: {
    scenario: 'Who goes first?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Never name a number first', group: 0 },
          { text: 'Extreme offers always win', group: 0 },
          { text: 'Ask for a bit more than you expect', group: 1 },
          { text: 'Back your number with a reason', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should Ada let the other side name a number first?',
        options: [
          { text: 'When she has no idea what the thing is worth' },
          { text: 'Always', why: 'When prepared, going first anchors.' },
          { text: 'Never', why: 'If she doesn\'t know the value, asking first is safer.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'For Ada\'s logo quote: ambitious and defensible, or extreme?',
        groups: ['Ambitious', 'Extreme'],
        items: [
          { text: '₦150,000, with hours and examples', group: 0 },
          { text: '₦1,000,000 for a small bakery', group: 1 },
          { text: '₦170,000 including two revisions', group: 0 },
          { text: '₦5,000, "just to get the job"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Logos for small businesses here go for ₦80,000 to ₦200,000. Should I go first?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes. You know the range. Quote above your goal with a reason: your hours and what\'s included.' },
          { text: 'No, wait for her to say ₦20,000.', why: 'Then her low anchor pulls everything down.' },
          { text: 'Quote ₦1,000,000 to be safe.', why: 'Extreme offers damage trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['You know the range', 'Go first, a bit above your goal'],
          ['You have no idea of the value', 'Ask questions first'],
          ['They anchored first', 'Counter with your number and evidence'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ambitious offers.',
        template: 'Aim a little [[1]] your goal, and give a [[2]].',
        blanks: [['above'], ['reason']],
        distractors: ['below', 'threat'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can an extreme first offer backfire?',
        options: [
          { text: 'It can insult the other side and end the conversation' },
          { text: 'It never backfires', why: 'Extreme offers can lose deals.' },
          { text: 'It\'s against the rules', why: 'There are no rules; it\'s about trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The logo range is ₦80,000 to ₦200,000. What\'s the middle, in naira?',
        answers: ['140000', '140,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s quote plan is a myth?',
        lines: [
          'I know the range: ₦80,000 to ₦200,000.',
          'I\'ll quote a bit above my goal.',
          'I\'ll explain my hours and what\'s included.',
          'But I must wait for her number first.',
        ],
        bug: 3,
        fix: 'I\'ll go first, since I know the range.',
        explanation: 'Prepared people benefit from going first.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s decision about going first.',
        lines: ['Check if I know the range', 'If yes, go first', 'Aim a little above my goal', 'Give my reason'],
      },
    ],
  },
  reflect: {
    prompt: 'In your negotiation, do you know the range well enough to go first? What would your first number be?',
    starters: ['I do / don\'t know the range...', 'My first number would be...'],
  },
  deepen: {
    title: 'When not to go first',
    summary: 'Research on first offers suggests the advantage shrinks when you\'re unsure of the value, because you might anchor too low. Ask questions until you can estimate the range.',
  },
  notes: 'Fictional logo range for small Lagos businesses: ₦80,000–₦200,000 (illustrative). First-mover advantage with information: Galinsky & Mussweiler (2001); limits when uncertain discussed in Loschelder, Trötschel, Swaab, Friese & Galinsky (2016), JPSP.',
};

export default lesson;
