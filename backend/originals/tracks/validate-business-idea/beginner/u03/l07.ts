import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: visiting Mama Rose. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Visiting Mama Rose',
  summary: 'Clinton is nervous about visiting his biggest competitor. Tey tells him what to ask, and what he finds at the stand changes the whole plan: Mama Rose has more work than she can handle.',
  minutes: 12,
  outcomes: [
    'Learn from a competitor without spying or fighting',
    'Find what a competitor can\'t do',
    'Spot when a competitor could be a partner',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Competitors know the market better than anyone. Go as a customer first: bring a basket. Watch, and ask about her work, not your idea.', replies: ['What did he find?'] },
        { tey: 'She charges 200 FCFA an item, so about 2,400 FCFA for a basket of twelve. Last Saturday she turned away about fifteen baskets: rainy season, nothing dries fast enough.', replies: ['So she\'s too busy?'] },
        { tey: 'Too busy, and stuck at the stand. She can\'t collect or deliver. Students who can\'t carry baskets up the hill just don\'t come. Brenda\'s complaint, from her side.', replies: ['So Clinton competes with her?'] },
        { tey: 'Maybe not. She washes; he could collect and deliver. A competitor that\'s overloaded and can\'t reach customers might be a partner. That\'s a new assumption to test: "Mama Rose would work with me."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Visit competitors as a customer, watch what goes wrong, and ask about their work. You may find a partner, not an enemy.',
    },
  ],
  apply: {
    scenario: 'At the stand.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Mama Rose charges 200 FCFA an item. What does a basket of 12 items cost?',
        answers: ['2400', '2,400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What was the most important thing Clinton learned at the stand?',
        options: [
          { text: 'She\'s overloaded and can\'t collect or deliver, so students are turned away' },
          { text: 'Her stand is painted blue', why: 'Not useful.' },
          { text: 'She has no customers', why: 'She has more than she can handle.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to learn from a competitor, or a bad one?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Bring a basket and use her service', group: 0 },
          { text: 'Tell her customers she\'s slow', group: 1 },
          { text: 'Ask what her busiest days are like', group: 0 },
          { text: 'Pretend to be an inspector', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Mama Rose can and can\'t do.',
        pairs: [
          ['Washing and ironing', 'She does it well'],
          ['Collecting from hostels', 'She can\'t leave the stand'],
          ['Rainy Saturdays', 'She turns baskets away'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'She turned away 15 baskets. I\'ll steal all her customers!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Or work with her: she washes, you collect and deliver. She gets more baskets, you don\'t need a washing room. Test it.' },
          { text: 'Yes, crush her.', why: 'She has skills and trust he doesn\'t have yet.' },
          { text: 'Give up; she\'s too strong.', why: 'Her weakness is exactly his opportunity.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The partnership idea.',
        template: 'Mama Rose [[1]]; Clinton collects and [[2]].',
        blanks: [['washes'], ['delivers']],
        distractors: ['cooks', 'complains'],
      },
      {
        kind: 'mcq',
        prompt: 'If she turned away 15 baskets at 2,400 FCFA each, how much business was lost that Saturday?',
        options: [
          { text: '36,000 FCFA' },
          { text: '3,600 FCFA', why: '15 × 2,400 = 36,000.' },
          { text: '240,000 FCFA', why: 'That\'s 100 baskets.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s visit plan is a bad idea?',
        lines: [
          'Bring my own basket as a customer.',
          'Watch how many people come and go.',
          'Tell her my plan to replace her.',
          'Ask about her busiest days.',
        ],
        bug: 2,
        fix: 'Ask about her work; save any partnership idea for later.',
        explanation: 'Opening with a threat ends the learning, and any chance of partnership.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s visit.',
        lines: ['Go as a customer with a basket', 'Watch the stand on a busy day', 'Ask about her work', 'Notice what she can\'t do', 'Write the new assumption: she\'d partner with me'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Competitor fact or new assumption?',
        groups: ['Fact', 'New assumption'],
        items: [
          { text: 'She charges 200 FCFA an item', group: 0 },
          { text: 'She would work with Clinton', group: 1 },
          { text: 'She turned away about 15 baskets', group: 0 },
          { text: 'She\'d give him a discount', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who is your strongest competitor? What can\'t they do well, and could that be your opportunity?',
    starters: ['My strongest competitor is...', 'They can\'t...'],
  },
  deepen: {
    title: 'Co-opetition',
    summary: 'Businesses that compete in one way and cooperate in another is common enough to have a name: co-opetition. A delivery partner for an overloaded laundry is a classic example.',
  },
  notes: 'Mama Rose (course-only, narrated): 200 FCFA per item, ~12 items per basket = 2,400 FCFA; turned away ~15 baskets on a rainy Saturday (36,000 FCFA). All fictional. "Co-opetition": Brandenburger & Nalebuff (1996).',
};

export default lesson;
