import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Reading: keeping up with everyone. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Keeping up with everyone',
  summary: '"Everyone back home has new sneakers on their posts." That one sentence explains a lot of Yaw\'s GH₵2,900. Why do we compare, why does it make us spend, and what can we do about it?',
  minutes: 12,
  outcomes: [
    'Explain social comparison in plain words',
    'See how online comparison drives spending',
    'Use three ways to compare less',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Comparing, and buying to keep up',
      html: '<p>Psychologist Leon Festinger (1954) suggested that people judge themselves by comparing with others. We do it without trying: who has more, who\'s doing better, who has the new thing.</p><p><strong>It drives spending.</strong> When the people around us buy more, we tend to want more too, even if our own life hasn\'t changed. There\'s an old phrase for it: "keeping up with the Joneses". Economists have long noted that people often care about how much they have compared with others, not just how much they have.</p><p><strong>Social media turns it up.</strong> Yaw doesn\'t see his Takoradi friends\' whole lives. He sees their best photos: new sneakers, trips, phones. He compares his everyday with their highlight reel, and feels behind. Buying feels like catching up.</p><p><strong>What he doesn\'t see:</strong> who paid in cash, who used pay later, who borrowed, who\'s now in trouble too. Debt doesn\'t show up in photos.</p><p><strong>Three ways to compare less:</strong></p><ol><li><strong>Notice the comparison.</strong> "I want this because Kwame has it" is worth saying out loud.</li><li><strong>Change what you see.</strong> Mute accounts that always leave you wanting. Follow people who make things, not just buy them.</li><li><strong>Compare with your past self.</strong> Kofi on day 12 with GH₵63, and Kofi now with a paid-off laptop. That\'s a comparison worth making.</li></ol>',
    },
    {
      kind: 'check',
      question: 'Yaw sees friends\' new sneakers online. What doesn\'t he see?',
      options: ['How they paid, and whether they\'re in debt', 'The sneakers', 'Their faces'],
      answer: 0,
      explanation: 'Debt and money stress don\'t show up in photos.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You\'re comparing your everyday with other people\'s highlights. Debt doesn\'t show up in photos. Compare with your past self instead.',
    },
  ],
  apply: {
    scenario: 'Keeping up.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is social comparison?',
        options: [
          { text: 'Judging ourselves by comparing with others' },
          { text: 'Comparing prices', why: 'That\'s price comparison. This is about people.' },
          { text: 'A type of loan', why: 'It\'s a psychological habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it make comparison worse, or better?',
        groups: ['Worse', 'Better'],
        items: [
          { text: 'Scrolling friends\' highlight reels at night', group: 0 },
          { text: 'Muting accounts that leave you wanting', group: 1 },
          { text: 'Comparing with your past self', group: 1 },
          { text: 'Buying to catch up', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its meaning.',
        pairs: [
          ['Keeping up with the Joneses', 'Buying to match others'],
          ['Highlight reel', 'Only the best moments shown'],
          ['Past self', 'A healthier comparison'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Everyone has new sneakers. I\'d look like the poor one.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You see their photos, not their debts. Maybe some of them are where you are now. You don\'t need to keep up with a highlight reel.' },
          { text: 'True, buy more.', why: 'That\'s how GH₵2,900 happened.' },
          { text: 'They\'re all fake.', why: 'Some may be fine. The point is we can\'t see.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The hidden part.',
        template: '[[1]] doesn\'t show up in [[2]].',
        blanks: [['Debt'], ['photos', 'posts']],
        distractors: ['Money', 'shops'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is comparison driving the purchase?',
        lines: [
          'I need new boots; mine are torn.',
          'I want the GH₵800 ones because my whole team has them.',
          'I\'ll check what I actually need for my position.',
        ],
        bug: 1,
        fix: 'I\'ll buy boots that fit my needs and budget.',
        explanation: '"Because my whole team has them" is the comparison talking, not the need.',
      },
      {
        kind: 'mcq',
        prompt: 'Which comparison is healthiest for Kofi?',
        options: [
          { text: 'Kofi on day 12 with GH₵63 vs Kofi now with a paid-off laptop' },
          { text: 'Kofi vs a famous footballer', why: 'That just makes anyone feel behind.' },
          { text: 'Kofi vs Yaw\'s sneakers', why: 'That\'s what got Yaw in trouble.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw mutes 5 accounts that always make him want to buy. If each caused about 2 urges a week, how many fewer urges a week might he have?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the three ways to compare less.',
        lines: ['Notice the comparison', 'Change what you see', 'Compare with your past self'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does buying to "catch up" rarely work?',
        options: [
          { text: 'There\'s always someone with something newer, so the gap never closes' },
          { text: 'Shops run out', why: 'The gap is the problem, not stock.' },
          { text: 'It always works', why: 'Yaw\'s GH₵2,900 says otherwise.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Whose posts most often make you want to buy something? What would comparing with your past self look like instead?',
    starters: ['Posts that make me want to buy:...', 'Compared with my past self, I...'],
  },
  deepen: {
    title: 'Relative income',
    summary: 'Economists such as Richard Easterlin noticed that as whole countries got richer, people didn\'t always report being happier, partly because people compare their income with others\'. If everyone gets new sneakers, nobody feels ahead for long.',
  },
  notes: 'Festinger, L. (1954). A theory of social comparison processes. Human Relations, 7(2). Relative income and happiness: Easterlin (1974; 1995), Luttmer (2005). Social media upward comparison and wellbeing: e.g. Vogel et al. (2014); stated qualitatively.',
};

export default lesson;
