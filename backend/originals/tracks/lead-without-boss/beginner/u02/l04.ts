import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Reading: give first (reciprocity; Grant's givers, takers and matchers). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Give first',
  summary: 'Felix said "maybe". Then he mentioned, almost in passing, that he\'s drowning in a spreadsheet of 400 broken customer records. Zanele hears this and her eyes light up. On the way home, Remi reads about why that matters.',
  minutes: 12,
  outcomes: [
    'Know why giving first builds influence',
    'Know the difference between givers, takers and matchers',
    'Give generously without burning out',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The favour that comes back',
      html: "<p>Psychologist <strong>Robert Cialdini</strong> lists <strong>reciprocity</strong> as one of the most powerful principles of influence: when someone helps us, we feel a strong pull to help them back. It shows up across cultures. Notice the order: help first, ask later.</p><h3>Givers, takers and matchers</h3><p>Wharton professor <strong>Adam Grant</strong>, in <em>Give and Take</em>, describes three styles at work:</p><ul><li><strong>Takers</strong> try to get more than they give.</li><li><strong>Matchers</strong> keep score: I'll help you if you help me.</li><li><strong>Givers</strong> help others without keeping score.</li></ul><p>His surprising finding: givers are over-represented at the <strong>bottom</strong> of success measures (they get exhausted and used), <em>and</em> at the <strong>top</strong>. The difference: successful givers help in ways that don't sink their own work, and they don't keep giving to obvious takers.</p><h3>What it looks like for Remi</h3><p>Zanele can clean Felix's 400 broken records in an afternoon. It costs her little and saves Felix days. That's a smart gift: big for him, small for her. It isn't a trade (\"we'll fix yours if you fix ours\"). It's just help. But Felix will remember who helped when he was drowning.</p><h3>Give honestly</h3><p>Reciprocity works best when it's genuine. Gifts with strings attached feel like bribes, and people notice.</p>",
    },
    {
      kind: 'check',
      question: 'What makes givers successful instead of burnt out, according to Grant?',
      options: ['They help in ways that don\'t sink their own work', 'They give to everyone, always', 'They keep careful score'],
      answer: 0,
      explanation: 'Generous, with boundaries. Smart gifts: big for them, small for you.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Help first, ask later. Give smart gifts: big for them, small for you. No strings. Don\'t keep giving to takers.',
    },
  ],
  apply: {
    scenario: 'The matatu home, reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is reciprocity?',
        options: [
          { text: 'Always splitting work 50-50', why: 'That\'s more like matching.' },
          { text: 'When someone helps us, we feel pulled to help them back' },
          { text: 'Paying people for help', why: 'It\'s about favours, not pay.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the style to the behaviour.',
        pairs: [
          ['Taker', 'Gets more than they give'],
          ['Matcher', 'Keeps score'],
          ['Giver', 'Helps without keeping score'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Smart gift or bad gift?',
        groups: ['Smart gift', 'Bad gift'],
        items: [
          { text: 'Zanele cleans 400 records in an afternoon', group: 0 },
          { text: 'Remi does Felix\'s job for a week', group: 1 },
          { text: 'Sharing a useful refund report with Pauline', group: 0 },
          { text: '"I\'ll help if you sign this first."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Should I tell Felix we\'ll clean his records only if he gives us the two days?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Yes, make it a deal.', why: 'Strings make a gift feel like a bribe.' },
          { text: 'Don\'t help; it\'s not our job.', why: 'A small gift could change everything.' },
          { text: 'No strings. Just help him. He\'ll remember who helped when he was drowning.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Adam Grant\'s book: Give and ___. (one word)',
        answers: ['Take', 'take'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Where do givers end up, according to Grant?',
        options: [
          { text: 'Both at the bottom and at the top' },
          { text: 'Always at the top', why: 'Many burn out at the bottom.' },
          { text: 'Always at the bottom', why: 'The most successful are often givers too.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s giving plan. Which line is a burnout trap?',
        lines: [
          'Zanele cleans Felix\'s records one afternoon.',
          'I\'ll say yes to every favour anyone asks, all six weeks.',
          'Share the refund report with Pauline.',
        ],
        bug: 1,
        fix: 'I\'ll help where it\'s big for them and small for me.',
        explanation: 'Giving without limits sinks your own work, and then you can\'t help anyone.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put smart giving in order.',
        lines: ['Notice what they\'re struggling with', 'Find a gift that\'s small for you', 'Give it with no strings', 'Ask for help later, separately'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] first, ask [[2]]. Big for them, [[3]] for you.',
        blanks: [['Help', 'Give', 'help'], ['later'], ['small']],
        distractors: ['now', 'huge'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Zanele\'s message to Felix.',
        tiles: ['Send', 'me', 'the', 'records.', 'I\'ll', 'clean', 'them.'],
        distractors: ['if'],
      },
    ],
  },
  reflect: {
    prompt: 'Are you more of a giver, taker or matcher at work or school? What\'s one smart gift (big for them, small for you) you could give this week?',
    starters: ['I\'m mostly a...', 'A smart gift could be...'],
  },
  deepen: {
    title: 'One five-minute favour',
    summary: 'Adam Grant suggests the "five-minute favour": something that takes you five minutes and helps someone a lot, like an introduction or a quick tip. Do one today.',
  },
  notes: 'Robert B. Cialdini, Influence: The Psychology of Persuasion (1984; new and expanded ed. 2021): reciprocity. Adam Grant, Give and Take (2013): givers, takers, matchers; givers over-represented at both bottom and top; "otherish" givers; five-minute favour (after Adam Rifkin). Fictional figures (400 records).',
};

export default lesson;
