import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: spend more on what you love. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Spend more on what you love',
  summary: 'Here\'s the surprise in Lucía\'s method: it doesn\'t only cut. It also tells you where to spend more. Four cards on spending lavishly on what matters and cutting hard on what doesn\'t.',
  minutes: 10,
  outcomes: [
    'Explain values-based spending',
    'Decide where you\'d happily spend more',
    'Cut hard on what doesn\'t matter to you',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Values-based spending</strong> means your spending follows your values: generous where it matters to you, ruthless where it doesn\'t.</p><p>Personal finance writer Ramit Sethi puts it as: spend extravagantly on the things you love, and cut costs mercilessly on the things you don\'t.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>It can mean spending more.</strong> Ada\'s number-two value is growth. She spends ₦15,000 on it. Lucía\'s question: "If design matters this much, should you spend more on it, and less on things that don\'t matter at all?"</p><p>After Mexico, Ada plans to add a ₦10,000-a-month online design course. Paid for by cutting things that score 2.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Ruthless where it doesn\'t matter.</strong> Ada doesn\'t care about brand-name toiletries, the latest phone or random online "finds". So those get the cheapest version that works. No guilt, no debate.</p><p><strong>Everyone\'s list is different.</strong> Ngozi spends lavishly on fabric and good scissors, and nothing on rides. Lucía spends on food and flights, and wears the same three jackets.</p>',
    },
    {
      kind: 'check',
      question: 'Ada values growth highly. What does values-based spending suggest?',
      options: ['Spend more on growth, less on things that score low', 'Cut growth to save more', 'Spend the same on everything'],
      answer: 0,
      explanation: 'Generous where it matters, ruthless where it doesn\'t.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Generous where it matters, ruthless where it doesn\'t. Saving more and enjoying more can happen at the same time.',
    },
  ],
  apply: {
    scenario: 'Generous and ruthless.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'For Ada: generous, or ruthless?',
        groups: ['Generous', 'Ruthless'],
        items: [
          { text: 'Design courses', group: 0 },
          { text: 'Brand-name toiletries', group: 1 },
          { text: 'Family', group: 0 },
          { text: 'Random online finds', group: 1 },
          { text: 'Travel', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes values-based spending different from just cutting?',
        options: [
          { text: 'It can mean spending more on what you love, as well as cutting what you don\'t' },
          { text: 'It cuts everything equally', why: 'It cuts unevenly, on purpose.' },
          { text: 'It never cuts anything', why: 'It cuts ruthlessly where things don\'t matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to where they spend lavishly.',
        pairs: [
          ['Ngozi', 'Fabric and good scissors'],
          ['Lucía', 'Food and flights'],
          ['Ada', 'Family, design and travel'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is it okay to spend MORE on design when I\'m trying to save?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'After Mexico, yes, if it comes from cutting things you don\'t care about. That\'s the whole point.' },
          { text: 'Never spend more on anything.', why: 'Values-based spending moves money towards what matters.' },
          { text: 'Spend more on everything.', why: 'Only on what matters, by cutting elsewhere.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] where it matters, [[2]] where it doesn\'t.',
        blanks: [['Generous'], ['ruthless']],
        distractors: ['Cheap', 'generous'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada adds a ₦10,000 design course and cuts ₦25,000 of online shopping. Net change in spending?',
        answers: ['15000', '15,000', '₦15,000', '₦15000', '-15000', '−15000'],
        placeholder: 'A number (how much less)',
      },
      {
        kind: 'findBug',
        prompt: 'Which choice goes against Ada\'s values?',
        lines: [
          'Cheapest toiletries that work.',
          'Keep the art class.',
          'Cut family support to buy a designer bag.',
        ],
        bug: 2,
        fix: 'Keep family support; skip the bag.',
        explanation: 'Family is her top value. The bag scores low.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is Ngozi\'s list different from Ada\'s?',
        options: [
          { text: 'Everyone values different things' },
          { text: 'Ngozi is wrong', why: 'Her values fit her life.' },
          { text: 'They earn different amounts', why: 'Values, not income, shape the list.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order values-based spending.',
        lines: ['Know your top values', 'Spend generously there', 'Be ruthless everywhere else', 'Check the plan still saves enough'],
      },
      {
        kind: 'mcq',
        prompt: 'Can Ada save more and enjoy more at the same time?',
        options: [
          { text: 'Yes: moving money from low-joy to high-joy lines does both' },
          { text: 'No, saving always means enjoying less', why: 'Not when you cut what you don\'t enjoy.' },
          { text: 'Only if she earns more', why: 'Reallocating is enough.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where would you happily spend more? Where could you be ruthless?',
    starters: ['Generous on...', 'Ruthless on...'],
  },
  deepen: {
    title: 'A conscious spending plan',
    summary: 'Sethi\'s "conscious spending plan" splits money into fixed costs, investments, savings and guilt-free spending, and asks you to spend the guilt-free part on what you love. The details differ from Teyro\'s approach; the idea is the same.',
  },
  notes: 'Sethi, R. (2009/2019). I Will Teach You to Be Rich. Paraphrased, not quoted. Ada plans a ₦10,000/month online course after Mexico (not counted in the 6-month numbers).',
};

export default lesson;
