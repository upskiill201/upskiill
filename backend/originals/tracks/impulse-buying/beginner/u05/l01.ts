import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: two weeks to Black Friday. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Two weeks out',
  summary: 'Fourteen days to the biggest sale of the year. Kofi has GH₵900 saved for the audio interface, a pause list, and a phone that won\'t stop buzzing. How should he go into Black Friday?',
  minutes: 11,
  outcomes: [
    'Plan for a big sale before it starts',
    'Choose between avoiding, winging it and planning',
    'Know what a sale plan includes',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Fourteen days',
      beats: [
        { speaker: 'narrator', text: 'Room 214. Kofi\'s phone, face up on his desk for once. Fourteen days. Black banners on every app.' },
        { speaker: 'narrator', text: 'In his savings: GH₵900 for the audio interface, saved at GH₵50 a week since the laptop. Its usual price at three shops: GH₵880 to GH₵950.' },
        { speaker: 'yaw', text: 'I\'m deleting every app until December. I don\'t trust myself.' },
        { speaker: 'kofi', text: 'I want the interface. If it\'s really cheaper on Black Friday, that\'s a real saving. But if I go in without a plan...' },
        { speaker: 'efua', text: '...you\'ll come out with boots in the wrong size.' },
        { speaker: 'tey', text: 'Three ways into a big sale. Each makes sense for someone. Which is right for Kofi?' },
      ],
      choice: {
        prompt: 'How should Kofi go into Black Friday?',
        options: [
          { text: 'Wing it: browse on the day and see what\'s good.', outcome: 'That\'s exactly what the sale is designed for: anchors, countdowns, "only 2 left" and pay-later, all at once, on a tired, excited brain. Boots, the sequel.' },
          { text: 'Avoid it completely: delete everything, like Yaw.', outcome: 'Right for Yaw, who\'s paying off debt and needs a total break. For Kofi, it means missing a real discount on something he\'s already saved for.' },
          { text: 'Plan it: a list with one item, a price limit, the usual price written down, saved cards removed, and a pause rule for anything else.', outcome: 'Yes. He goes in for one thing, knows what a real deal looks like, and has a rule for everything else. The rest of this chapter builds that plan.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Big sales are where the tricks are strongest. Go in with a list, a price limit and the usual price, or don\'t go in at all.',
    },
  ],
  apply: {
    scenario: 'Fourteen days out.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Part of a good sale plan, or not?',
        groups: ['Part of the plan', 'Not part of it'],
        items: [
          { text: 'A list with the items you\'ve already planned', group: 0 },
          { text: 'The usual price written down', group: 0 },
          { text: 'Browsing everything to "see what\'s good"', group: 1 },
          { text: 'Removing saved cards', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is avoiding the sale right for Yaw but not for Kofi?',
        options: [
          { text: 'Kofi is better than Yaw', why: 'Different situations, not better people.' },
          { text: 'Avoiding is always wrong', why: 'For Yaw right now, it\'s wise.' },
          { text: 'Yaw needs a full break while paying off debt; Kofi has a planned, saved-for item' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi saved GH₵50 a week for the interface and has GH₵900. How many weeks did that take?',
        answers: ['18', 'eighteen'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I\'ll just browse on the day and see what\'s good.',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Good idea.', why: 'Browsing is how the tricks get you.' },
          { text: 'That\'s the sale\'s plan for you. Make your own: one item, a price limit, and a rule for everything else.' },
          { text: 'Never buy anything.', why: 'He has a planned item worth buying.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Going into a big sale.',
        template: 'A [[1]], a price [[2]], and the [[3]] price.',
        blanks: [['list'], ['limit'], ['usual']],
        distractors: ['loan', 'was'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to the right Black Friday approach.',
        pairs: [
          ['Yaw, paying off debt', 'Avoid it completely'],
          ['Kofi, one saved-for item', 'Plan it'],
          ['Someone with no plan', 'Wing it (the risky one)'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Kofi\'s draft plan leaves a door open to tricks?',
        lines: [
          'List: audio interface only.',
          'Usual price: GH₵880 to GH₵950.',
          'Keep my card saved in every app, for speed.',
          'Anything else: wait 24 hours.',
        ],
        bug: 2,
        fix: 'Remove saved cards; type them in for the one planned buy.',
        explanation: 'Saved cards remove the pause. Typing details in is a built-in speed bump.',
      },
      {
        kind: 'mcq',
        prompt: 'What makes Black Friday especially risky?',
        options: [
          { text: 'Shops are closed', why: 'They\'re very open.' },
          { text: 'Prices go up', why: 'Some do, some don\'t. The tricks are the risk.' },
          { text: 'Anchors, countdowns, scarcity and pay-later all at once' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The usual price is GH₵880 to GH₵950. If Black Friday offers GH₵720, how much below the lowest usual price is that?',
        answers: ['160', 'GH₵160', '160 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s two-week prep.',
        lines: ['Write the list', 'Check and note usual prices', 'Set a price limit', 'Remove saved cards', 'Set the pause rule for everything else'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a big sale coming that you\'ll face? Will you avoid it, or plan it? What\'s on your list?',
    starters: ['The sale:...', 'I\'ll avoid / plan it', 'My list:...'],
  },
  deepen: {
    title: 'Are Black Friday deals real?',
    summary: 'Studies of price histories in several countries have found that many Black Friday "deals" were the same or lower at other times of year, while some genuine discounts exist. The only way to know is to check the usual price before the day.',
  },
  notes: 'Course 3 Ch5 per running numbers: interface usual GH₵880–950; Black Friday GH₵720; Kofi has GH₵900 (18 weeks × 50). Black Friday price-history research: e.g. UK consumer group Which? analyses (2019–2023) found most deals cheaper/same at other times; stated qualitatively.',
};

export default lesson;
