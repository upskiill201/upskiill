import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: "That's too expensive". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"That\'s too expensive"',
  summary: 'The new card has been live for a week. Then Joseph messages: "1,800? That\'s too expensive, bro." Clinton\'s thumb hovers over "OK, 1,500 for you." Miracle stops him.',
  minutes: 11,
  outcomes: [
    'See why a quick discount is the wrong first answer',
    'Find out what "too expensive" really means',
    'Know the four jobs of this chapter',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thumb on the button',
      beats: [
        { speaker: 'narrator', text: 'Friday night. A message from Joseph, a second-year who used WashDay twice: "1,800? That\'s too expensive, bro."' },
        { speaker: 'clinton', text: 'I\'ll just give him 1,500. He\'s a nice guy.' },
        { speaker: 'miracle', text: 'Wait. "Too expensive" compared with what? Ask him. Then you\'ll know if he needs a cheaper option, or a better explanation.' },
        { speaker: 'narrator', text: 'Clinton asks. Joseph: "Compared with last month. I only have a few shirts, though. And I walk past the stand anyway."' },
        { speaker: 'clinton', text: 'So he doesn\'t need a discount. He needs Saver.' },
        { speaker: 'tey', text: 'This last chapter: say your prices clearly, answer objections with value, agree fair rates with your suppliers, and check that the new prices really work.' },
      ],
      choice: {
        prompt: 'What should Clinton reply to Joseph?',
        options: [
          { text: '"Fair! Since you pass the stand, Saver is 1,400: drop it there, back in two days."', outcome: 'Right. The right option, not a discount, and Joseph saves 400.', best: true },
          { text: '"OK, 1,500 for you."', outcome: 'A secret discount: unfair to everyone paying 1,800, and it trains people to complain.' },
          { text: '"Take it or leave it."', outcome: 'He might leave. Understand the objection first.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When someone says "too expensive", ask: "Compared with what?" The answer tells you what to do.',
    },
  ],
  apply: {
    scenario: 'Joseph\'s message.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Clinton ask first when Joseph says "too expensive"?',
        options: [
          { text: '"Compared with what?"' },
          { text: '"How much do you want to pay?"', why: 'That invites haggling.' },
          { text: '"Why are you so cheap?"', why: 'That\'s rude and learns nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Joseph moves from Standard (1,800) to Saver (1,400). How much does he save, in FCFA?',
        answers: ['400'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to "too expensive", or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: 'Ask what they\'re comparing with', group: 0 },
          { text: 'Give a secret discount straight away', group: 1 },
          { text: 'Offer the option that fits them', group: 0 },
          { text: '"Take it or leave it"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what "too expensive" really meant to the right answer.',
        pairs: [
          ['"Compared with last month"', 'Explain the reasons'],
          ['"I only have a few shirts"', 'Suggest Saver'],
          ['"Compared with Mama Rose"', 'Show it\'s 600 cheaper'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why not just give Joseph 1,500? It\'s only one person.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, one discount doesn\'t matter.', why: 'Secret discounts spread and feel unfair.' },
          { text: 'Ban Joseph.', why: 'He\'s a customer with a fair point; serve him well.' },
          { text: 'Everyone else pays 1,800. If word spreads that complaining gets 1,500, everyone complains. Saver gives him a real saving that\'s fair to all.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The first question.',
        template: '"Too expensive" compared with [[1]]? The answer tells you what to [[2]].',
        blanks: [['what'], ['do']],
        distractors: ['whom', 'charge'],
      },
      {
        kind: 'mcq',
        prompt: 'Saver still earns Clinton 275 a bag. Why is that better than a 1,500 Standard for Joseph?',
        options: [
          { text: 'It earns more per bag', why: '1,500 Standard would earn 375; Saver is better for other reasons.' },
          { text: 'It\'s fair to everyone, takes Clinton less time, and doesn\'t set a "complain to save" pattern' },
          { text: 'It isn\'t better', why: 'It\'s fairer and uses less of Clinton\'s time.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s reply to Joseph is the mistake?',
        lines: [
          'Thanks for telling me!',
          'Since you pass the stand, Saver might suit you: 1,400.',
          'Or for you only, 1,500 for Standard, don\'t tell anyone.',
          'Either way, back in good time.',
        ],
        bug: 2,
        fix: 'Delete it: same prices for everyone.',
        explanation: 'Secret deals are unfair and spread.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good response to "too expensive".',
        lines: ['Thank them for saying so', 'Ask what they\'re comparing with', 'Explain the value or reasons', 'Offer the option that fits'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of this chapter\'s jobs is this?',
        groups: ['Say it clearly', 'Defend it', 'Check it worked'],
        items: [
          { text: 'A price list with no hidden fees', group: 0 },
          { text: 'Answer "too expensive" with value', group: 1 },
          { text: 'Compare November with September', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When someone tells you your price is too high, what do you usually do? What would "compared with what?" have told you?',
    starters: ['I usually...', 'Asking would have shown...'],
  },
  deepen: {
    title: 'Objections are information',
    summary: 'A price objection tells you how a customer sees the value. Sometimes the fix is a better explanation, sometimes a better-fitting option, and only rarely a lower price.',
  },
  notes: 'Fictional: Joseph (second-year, from course 1 interviews) moves from Standard 1,800 to Saver 1,400 (saves 400; Saver margin 275).',
};

export default lesson;
