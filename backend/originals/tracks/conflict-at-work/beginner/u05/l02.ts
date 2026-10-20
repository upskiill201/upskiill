import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Explain cards: what a boundary is. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a boundary is',
  summary: 'Grace thinks boundaries mean telling people what to do. Priya explains the difference: a boundary is about what you will do, not about controlling someone else.',
  minutes: 12,
  outcomes: [
    'Define a healthy boundary',
    'Tell boundaries from rules for other people',
    'Write boundaries about your own actions',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A boundary says what <strong>you</strong> will and won\'t do. It doesn\'t try to control what others do.</p><table><tr><th>Not a boundary (controlling)</th><th>A boundary (about you)</th></tr><tr><td>"You can\'t give me extra work."</td><td>"I\'ll take on new work when we agree what moves."</td></tr><tr><td>"Stop messaging me at night."</td><td>"I don\'t reply after 7 p.m.; I\'ll answer first thing."</td></tr><tr><td>"Jayden, you\'re not allowed the car."</td><td>"I\'ll lend the car when you ask the day before."</td></tr><tr><td>"Don\'t criticise me in meetings."</td><td>"I\'ll answer work concerns best one-to-one first."</td></tr></table><p>Three marks of a healthy boundary:</p><ul><li><strong>It\'s about your actions</strong>, so you can keep it whatever others do.</li><li><strong>It\'s said kindly and clearly</strong>, with the reason if helpful.</li><li><strong>It has a path</strong>: what you <em>will</em> do, not just what you won\'t.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A boundary is about what you will do. Say it kindly, clearly, and with a path.',
    },
  ],
  apply: {
    scenario: 'What a boundary is.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A boundary, or trying to control others?',
        groups: ['Boundary', 'Controlling'],
        items: [
          { text: '"I don\'t reply after 7 p.m."', group: 0 },
          { text: '"Stop messaging me."', group: 1 },
          { text: '"I\'ll lend the car if you ask the day before."', group: 0 },
          { text: '"You\'re banned from the car."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a boundary about?',
        options: [
          { text: 'What you will and won\'t do' },
          { text: 'What others must do', why: 'That\'s a rule for them.' },
          { text: 'Punishing people', why: 'It\'s about your own actions.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the controlling line to its boundary version.',
        pairs: [
          ['"Don\'t give me extra work."', '"I\'ll take it on when we agree what moves."'],
          ['"Stop messaging at night."', '"I reply first thing in the morning."'],
          ['"Don\'t criticise me in meetings."', '"I answer concerns best one-to-one."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'So you\'re banning me from the car?',
        prompt: "Grace's best reply?",
        options: [
          { text: '"No. I\'ll happily lend it when you ask the day before, so I can plan. That\'s all."' },
          { text: '"Yes, forever."', why: 'That\'s a punishment, not a boundary.' },
          { text: '"Do whatever you want."', why: 'That\'s no boundary.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Three marks.',
        template: 'About your [[1]], said kindly, with a [[2]].',
        blanks: [['actions'], ['path']],
        distractors: ['feelings', 'threat'],
      },
      {
        kind: 'mcq',
        prompt: 'Why should a boundary be about your own actions?',
        options: [
          { text: 'You can keep it whatever the other person does' },
          { text: 'It sounds nicer', why: 'It\'s about what you control.' },
          { text: 'It doesn\'t matter', why: 'Rules for others can\'t be enforced by you.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After what time does Grace stop replying to messages? (e.g. 7 pm)',
        answers: ['7', '7 pm', '7pm', '7 p.m.', '19:00'],
        placeholder: 'A time',
      },
      {
        kind: 'findBug',
        prompt: 'Which of these is not a boundary?',
        lines: [
          'I don\'t reply after 7 p.m.',
          'I\'ll lend the car if you ask the day before.',
          'You must stop asking me for things.',
          'I\'ll take on new work when we agree what moves.',
        ],
        bug: 2,
        fix: 'I\'ll say yes to new things when I have room.',
        explanation: 'It\'s a rule for them, not a statement about her.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Has a path, or just a "no"?',
        groups: ['Has a path', 'Just no'],
        items: [
          { text: '"I\'ll answer first thing."', group: 0 },
          { text: '"Not my problem."', group: 1 },
          { text: '"When we agree what moves."', group: 0 },
          { text: '"Never."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to write a boundary.',
        lines: ['Notice the limit', 'Say what you will do', 'Add the reason if it helps', 'Offer the path'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one "rule for others" you\'ve wanted to make into a boundary about your own actions.',
    starters: ['Instead of "you must...", I\'ll say "I will..."'],
  },
  deepen: {
    title: 'Boundaries protect relationships',
    summary: 'Without boundaries, resentment builds quietly. A clear, kind boundary often protects the relationship, because nobody has to guess what you can manage.',
  },
  notes: 'Boundary framing (about one\'s own actions) is standard in counselling and assertiveness training. Fictional examples.',
};

export default lesson;
