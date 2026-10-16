import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Card deck: catalysts and nourishers (Amabile & Kramer, The Progress Principle). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'What makes a good workday',
  summary: 'Miracle notices that the team\'s mood swings day to day. Tuesday was brilliant. Wednesday was flat. Same people, same work. Tey: "Two Harvard researchers read 12,000 diary entries to find out why." The cards.',
  minutes: 11,
  outcomes: [
    'Know what makes the best and worst workdays',
    'Spot catalysts and inhibitors in your team',
    'Add nourishers and remove toxins',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p><strong>Teresa Amabile</strong> and <strong>Steven Kramer</strong> asked 238 people to write a short diary every workday: almost 12,000 entries. On the best days, one thing stood out above all: <strong>making progress on meaningful work</strong>, even small progress. They also found two kinds of everyday events that shape progress. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Progress is the big one</h3><p>Bisi's seven clinics in a day. Chidi's caching working. Small wins on work that matters made more of a difference to people's inner work life than anything else in the diaries.</p><h3>Card 2: Catalysts help the work</h3><p>Clear goals, autonomy, resources, enough time, help with problems, learning from failure. Getting Chidi a Kaduna clinic was a catalyst.</p><h3>Card 3: Inhibitors block it</h3><p>The opposite: unclear goals, a crashing ticket system, no time, constant interruptions. Wednesday's flatness? IT went down for three hours.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Nourishers help the person</h3><p>Respect, encouragement, emotional support, recognition, friendship. Bisi writing \"MY CLINICS\" and the team cheering.</p><h3>Card 5: Toxins hurt the person</h3><p>Disrespect, discouragement, ignoring emotions, conflict. One sarcastic comment in a meeting can poison a whole afternoon.</p><h3>Card 6: The leader's daily job</h3><p>Amabile and Kramer's advice for managers is simple: every day, ask what you can do to help your team make progress, add catalysts and nourishers, and remove inhibitors and toxins.</p>",
    },
    {
      kind: 'check',
      question: 'What stood out most on people\'s best workdays?',
      options: ['Making progress on meaningful work', 'Free lunch', 'Short meetings'],
      answer: 0,
      explanation: 'Even small progress, if the work mattered.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Progress on meaningful work makes the best days. Add catalysts (help the work) and nourishers (help the person). Remove inhibitors and toxins.',
    },
  ],
  apply: {
    scenario: 'Why Tuesday was great and Wednesday was flat.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Amabile and Kramer call the main driver of good workdays?',
        options: [
          { text: 'The pizza principle', why: 'Folake would like that.' },
          { text: 'The progress principle' },
          { text: 'The bonus principle', why: 'Not money.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Catalyst, inhibitor or nourisher?',
        groups: ['Catalyst', 'Inhibitor', 'Nourisher'],
        items: [
          { text: 'A Kaduna test clinic for Chidi', group: 0 },
          { text: 'IT down for three hours', group: 1 },
          { text: 'The team cheering Bisi', group: 2 },
          { text: 'A clear goal', group: 0 },
          { text: 'Constant interruptions', group: 1 },
          { text: 'Encouragement on a hard day', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Wednesday was rubbish. The ticket system died and I got nothing done.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'That\'s an inhibitor, and it\'s on me to chase. I\'ll ask IT what failed. Tomorrow, want to start with Dr Bello\'s follow-up? An easy win.' },
          { text: 'Everyone had the same problem.', why: 'True, and it doesn\'t help.' },
          { text: 'You should have found other work.', why: 'Blames him for an inhibitor.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Things that help the person (respect, encouragement) are ___. (one word)',
        answers: ['nourishers', 'Nourishers'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its opposite.',
        pairs: [
          ['Catalysts', 'Inhibitors'],
          ['Nourishers', 'Toxins'],
          ['Progress', 'Setbacks'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many diary entries did Amabile and Kramer study?',
        options: [
          { text: 'About 12', why: 'Many more.' },
          { text: 'Almost 12,000' },
          { text: 'One million', why: 'Fewer than that.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s daily habit. Which line adds a toxin?',
        lines: [
          'Ask each morning: what\'s blocking you today?',
          'Make a sarcastic joke when someone\'s slow, to keep things light.',
          'Point out one small win every afternoon.',
        ],
        bug: 1,
        fix: 'Say thanks for one specific thing every day.',
        explanation: 'Sarcasm about someone can poison a whole afternoon.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the leader\'s daily job in order.',
        lines: ['Ask what\'s blocking progress', 'Clear an inhibitor', 'Add a nourisher', 'Point out a small win'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Help the [[1]]. Help the [[2]].',
        blanks: [['work'], ['person', 'people']],
        distractors: ['boss', 'client'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the daily question.',
        tiles: ['What\'s', 'blocking', 'you', 'today?'],
        distractors: ['tomorrow?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your best workday or study day this month. What progress did you make? What catalysts and nourishers were there?',
    starters: ['My best day was...', 'What helped was...'],
  },
  deepen: {
    title: 'One inhibitor a day',
    summary: 'For one week, ask one person each day what\'s blocking them. Remove one inhibitor every day if you can.',
  },
  notes: 'Teresa M. Amabile & Steven J. Kramer, The Progress Principle (2011): ~12,000 daily diary entries from 238 employees; progress in meaningful work as the strongest positive event; catalysts/inhibitors (affect the work) and nourishers/toxins (affect the person).',
};

export default lesson;
