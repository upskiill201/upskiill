import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Card deck: "yes, and that means..." (saying yes without overpromising). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Yes, and that means..."',
  summary: 'Arjun has noticed he only knows two words for requests: "sure" and "no". Both have hurt him this month. Tey deals out the cards for the space in between.',
  minutes: 11,
  outcomes: [
    'Say yes without overpromising',
    'Say no without shutting the door',
    'Use a few phrases that keep expectations honest',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Most expectation problems start with a word said too quickly. \"Sure\" promises things nobody checked. \"No\" makes people feel unheard. The phrases in between keep the relationship warm and the expectations true. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: \"Yes, and that means...\"</h3><p>\"Yes, we can add gift messages, and that means coupons move to January.\" A yes with the cost attached.</p><h3>Card 2: \"Yes, if...\"</h3><p>\"Yes, if we can have your product photos by Wednesday.\" A yes with the condition that makes it possible.</p><h3>Card 3: \"Not yet, and here's when\"</h3><p>\"Not for Diwali. It's first on the January list.\" A no with a future, so it doesn't feel like rejection.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: \"Let me check and come back by...\"</h3><p>Buys time honestly. Then come back exactly when you said: that's what makes it trusted.</p><h3>Card 5: \"Which matters more?\"</h3><p>\"Gift messages or coupons: which matters more for Diwali?\" Gives the trade-off back to the person who owns it.</p><h3>Card 6: Never \"I'll try\"</h3><p>\"I'll try\" is heard as \"yes\", and it lets you off the hook if it fails. That combination breaks trust fast.</p>",
    },
    {
      kind: 'check',
      question: 'Why avoid "I\'ll try"?',
      options: ['It\'s heard as yes but promises nothing', 'It\'s rude', 'It\'s too long'],
      answer: 0,
      explanation: 'They hear a promise. You meant a maybe.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Yes, and that means..." "Yes, if..." "Not yet, and here\'s when." "Let me check by..." "Which matters more?" Never "I\'ll try".',
    },
  ],
  apply: {
    scenario: 'The words between "sure" and "no".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "Yes, and that means..." do?',
        options: [
          { text: 'Makes it a no', why: 'It\'s still a yes.' },
          { text: 'Delays the answer', why: 'It answers now, honestly.' },
          { text: 'Attaches the cost to the yes' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps expectations honest, or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: '"Yes, if we get photos by Wednesday."', group: 0 },
          { text: '"I\'ll try."', group: 1 },
          { text: '"Not for Diwali; first in January."', group: 0 },
          { text: '"Sure, no problem!" (unchecked)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(Mr Rao: "Can we also have gift messages?")',
        prompt: 'Arjun\'s best answer?',
        options: [
          { text: 'Yes, and that means coupons move to January. Or gift messages go first on the January list. Which matters more for Diwali?' },
          { text: 'I\'ll try!', why: 'Heard as yes, promises nothing.' },
          { text: 'No.', why: 'True maybe, but it shuts the door.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A no with a future: "Not ___, and here\'s when." (one word)',
        answers: ['yet', 'Yet', 'now'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its job.',
        pairs: [
          ['"Yes, if..."', 'Names the condition'],
          ['"Which matters more?"', 'Gives the trade-off back'],
          ['"Let me check by..."', 'Buys time honestly'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes "Let me check and come back by..." trusted?',
        options: [
          { text: 'Saying it politely', why: 'Keeping the time is what counts.' },
          { text: 'Coming back exactly when you said' },
          { text: 'Never coming back', why: 'That breaks trust fast.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s reply to Rohit. Which phrase breaks the cards?',
        lines: [
          'Not for Diwali, but WhatsApp is on the January list.',
          'And I\'ll try to fit in the banner animation.',
          'If the banner matters more than coupons, tell me by Thursday.',
        ],
        bug: 1,
        fix: 'The banner animation is a "not yet" too.',
        explanation: '"I\'ll try" will be heard as a promise.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good response to a request in order.',
        lines: ['Thank them', 'Check what it costs', 'Answer with "yes, and" or "not yet"', 'Ask which matters more if needed'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Never "I\'ll [[1]]". Say "yes, and that [[2]]..."',
        blanks: [['try'], ['means']],
        distractors: ['see', 'hopes'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the trade-off question.',
        tiles: ['Which', 'matters', 'more', 'for', 'Diwali?'],
        distractors: ['January?'],
      },
    ],
  },
  reflect: {
    prompt: 'Which do you say too often: "sure", "no" or "I\'ll try"? Which card would help you most this week?',
    starters: ['I say ... too often.', 'The card I need is...'],
  },
  deepen: {
    title: 'Ban "I\'ll try"',
    summary: 'For one week, replace every "I\'ll try" with "yes, if...", "not yet, and here\'s when", or "let me check by...". Notice how people respond.',
  },
  notes: 'Conditional commitments and explicit trade-offs: standard negotiation and stakeholder-management practice (e.g. Ury, The Power of a Positive No, 2007). Fictional details.',
};

export default lesson;
