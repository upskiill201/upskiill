import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: Ada's line v3, the values map. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ada\'s line v3: the values map',
  summary: 'Ada\'s line gets a new layer: every spending line tagged with the value it serves, and its joy score. Tap through her values map.',
  minutes: 11,
  outcomes: [
    'Read a spending plan organised by values',
    'See where money serves no value',
    'Build your own values map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s line v3: the values map',
      text: 'FAMILY (score 10): Support to Mum ₦40,000. Aso-ebi ₦55,000 (once). GROWTH (score 10): Art class ₦15,000. Laptop fix ₦40,000 (once). CONNECTION (score 9): Friday dinners ₦32,000. Send-forth ₦15,000 (once). GIVING (score 8): Church ₦20,000. ADVENTURE (score 10): Mexico City fund ₦125,000 a month. NO VALUE (cut or trimmed): Online shopping ₦35,000 to ₦10,000. Clothes and beauty ₦45,000 to ₦30,000. Gym ₦12,000 to ₦0. Team trip ₦60,000, said no. STILL TO FIND: ₦25,000 a month.',
      hotspots: [
        { phrase: 'FAMILY (score 10)', note: 'Her top value, fully funded, even in a saving year. The aso-ebi was done the smart way.' },
        { phrase: 'Art class ₦15,000', note: 'Growth. Protected through every cut, and backed by her mum.' },
        { phrase: 'Friday dinners ₦32,000', note: 'Connection. Kept because it scores 9: a treat, not a daily habit.' },
        { phrase: 'ADVENTURE (score 10): Mexico City fund ₦125,000 a month', note: 'Saving is spending on a value too. Up from ₦20,000 three chapters ago.' },
        { phrase: 'NO VALUE (cut or trimmed)', note: 'Everything that served none of her values. This is where the money came from.' },
        { phrase: 'Team trip ₦60,000, said no', note: 'An assumed expectation, not a real obligation. A warm no.' },
        { phrase: 'STILL TO FIND: ₦25,000 a month', note: 'Close. The last piece needs hard choices: Chapter 4.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Tag every spending line with the value it serves. Anything with no tag is your next saving.',
    },
  ],
  apply: {
    scenario: 'Reading the values map.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its value.',
        pairs: [
          ['Support to Mum', 'Family'],
          ['Art class', 'Growth'],
          ['Friday dinners', 'Connection'],
          ['Mexico City fund', 'Adventure'],
          ['Church', 'Giving'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Serves a value, or no value?',
        groups: ['Serves a value', 'No value'],
        items: [
          { text: 'Send-forth for a close colleague', group: 0 },
          { text: 'Gym she never used', group: 1 },
          { text: 'Random online shopping', group: 1 },
          { text: 'Laptop fix for work', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the Mexico City fund listed under "adventure"?',
        options: [
          { text: 'It\'s a mistake', why: 'It\'s deliberate.' },
          { text: 'Saving for something you value is spending on that value, later' },
          { text: 'Because it\'s risky', why: 'It\'s about her value of travel.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saving was ₦20,000 three chapters ago, now ₦125,000. How much more each month?',
        answers: ['105000', '105,000', '₦105,000', '₦105000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'m ₦25,000 a month short. Should I cut Friday dinners?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, cut them.', why: 'High-scoring lines are protected.' },
          { text: 'Give up on Mexico.', why: 'She\'s ₦25,000 away.' },
          { text: 'They score 9. Look for one more thing with no value tag first, or a bigger choice. Next chapter is about exactly that.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The map rule.',
        template: 'Anything with no [[1]] is your next [[2]].',
        blanks: [['tag', 'value'], ['saving']],
        distractors: ['loan', 'treat'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v3 is tagged wrongly?',
        lines: [
          'Family: support to Mum.',
          'Growth: art class.',
          'Adventure: random online shopping.',
        ],
        bug: 2,
        fix: 'No value: random online shopping.',
        explanation: 'It scored 2 and serves none of her values.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At ₦125,000 a month for 6 months, how much would Ada have?',
        answers: ['750000', '750,000', '₦750,000', '₦750000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s different about v3 compared with v1 and v2?',
        options: [
          { text: 'It\'s organised by values, not just need or want' },
          { text: 'It has fewer numbers', why: 'It adds a layer: values.' },
          { text: 'Nothing', why: 'The values layer is new.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s line versions.',
        lines: ['v1: where the raise went', 'v2: the first ₦65,000', 'v3: the values map'],
      },
    ],
  },
  reflect: {
    prompt: 'Make your own values map: tag each spending line with a value. Which lines have no tag?',
    starters: ['Family:...', 'Growth:...', 'No tag:...'],
  },
  deepen: {
    title: 'Your map will look different',
    summary: 'Someone who values security might have a big emergency fund line. Someone who values health might spend generously on good food and a gym they use. The map is a mirror of you, not a model to copy.',
  },
  notes: 'Ada\'s line v3 per running numbers: saving 125,000/month; still to find 25,000.',
};

export default lesson;
