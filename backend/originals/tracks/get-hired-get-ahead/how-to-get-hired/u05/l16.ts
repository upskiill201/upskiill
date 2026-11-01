import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 16 — negotiation myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Negotiation myths',
  summary: '"Graduates can\'t negotiate." "Whoever says a number first loses." "If you ask, they\'ll cancel the offer." The family WhatsApp group has views. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common negotiation myths', 'Know what\'s actually risky', 'Negotiate calmly and honestly'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Graduates can never negotiate.', isFact: false, explain: 'Many can, politely and with a reason. Some roles have fixed pay; then other parts, like review dates, may still move.' },
        { text: 'Asking politely usually makes them cancel the offer.', isFact: false, explain: 'A calm, reasoned request rarely does. Ultimatums, rudeness and lies are what put offers at risk.' },
        { text: 'Research makes your ask stronger.', isFact: true, explain: 'A number tied to local ranges and your proof is much easier to agree to than a number that "felt right".' },
        { text: 'There\'s one rule that works everywhere, like "never say a number first".', isFact: false, explain: 'Tactics vary. Some advisers say let them go first; others say anchor with a researched number. What matters most is a well-researched, honest ask.' },
        { text: 'You can negotiate more than salary.', isFact: true, explain: 'Review dates, start dates, training and setup are often easier to move than pay.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Research, a reason, one polite ask, honesty. That beats any trick.',
    },
  ],
  apply: {
    scenario: 'Clinton answers the family WhatsApp group.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Research makes your ask stronger', group: 0 },
          { text: 'Graduates can never negotiate', group: 1 },
          { text: 'You can negotiate more than salary', group: 0 },
          { text: 'A polite ask usually cancels the offer', group: 1 },
          { text: 'One trick works everywhere', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My uncle says, "Whoever names a number first loses." True?',
        options: [
          { text: 'Yes, always.', why: 'It\'s not a universal rule.' },
          { text: 'Advice differs. What matters most is a researched, honest number with a reason.' },
          { text: 'So I\'ll never say a number.', why: 'Sometimes you\'ll need to.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What usually puts an offer at risk?',
        options: [
          { text: 'Saying thank you', why: 'Always fine.' },
          { text: 'One reasoned question', why: 'Rarely a risk.' },
          { text: 'Ultimatums, rudeness and lies' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['A review date can be negotiable.', 'Graduates are never allowed to ask anything.', 'Research makes the ask stronger.'],
        bug: 1,
        explanation: 'Many graduates can ask, politely, once.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Graduates can\'t negotiate', 'Many can, politely, with a reason'],
          ['Asking cancels offers', 'Ultimatums and lies do, not polite asks'],
          ['One trick works everywhere', 'Honest research beats tricks'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What beats any negotiation trick?',
        options: [
          { text: 'Research, a reason, one polite ask, honesty' },
          { text: 'Shouting', why: 'Calm and honest wins.' },
          { text: 'A fake offer', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Research, a [[1]], one polite ask, [[2]].',
        blanks: [['reason'], ['honesty']],
        distractors: ['threat', 'tricks', 'luck'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Can you negotiate things other than salary? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to try, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Asking for a review after probation', group: 0 },
          { text: '"Pay more or I leave today"', group: 1 },
          { text: 'A researched number with a reason', group: 0 },
          { text: 'An invented competing offer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My hospital placement pays a fixed national rate. Can I negotiate anything?',
        options: [
          { text: 'Demand more anyway.', why: 'Fixed rates are fixed; try other parts.' },
          { text: 'No, nothing ever.', why: 'Other parts may move.' },
          { text: 'Probably not the pay, but maybe your rotation start date or schedule. Ask politely.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth did you grow up hearing? How has this chapter changed your view?',
    starters: ['I heard...', 'Now I think...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Ask two people in your field how negotiation usually works there. Notice where their advice differs.',
  },
  notes: 'Anchoring advice varies among negotiation experts; kept balanced. Fixed public-sector or scheme pay is common.',
};

export default lesson;
