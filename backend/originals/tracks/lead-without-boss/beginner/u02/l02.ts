import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Card deck: the currencies people value (Cohen & Bradford, Influence Without Authority). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What people value',
  summary: 'Wednesday. Mrs Achieng finds Remi staring at his stakeholder map. "You\'re thinking about what YOU need from them," she says. "Think about what they\'d want from you." Tey deals out the currency cards.',
  minutes: 11,
  outcomes: [
    'Know the five kinds of "currency" people value at work',
    'Work out which ones each person cares about',
    'Offer something real in return for help',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Management professors <strong>Allan Cohen</strong> and <strong>David Bradford</strong> wrote <em>Influence Without Authority</em> about people like Remi. Their big idea: influence works like an exchange. People help when they get something they value in return. Not bribes: things like recognition, help, learning or a better day at work. They call these <strong>currencies</strong>. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Inspiration currencies</h3><p>A chance to do something that matters. \"Mama Mboga Fresh won't have to wait three weeks to pay its staff.\"</p><h3>Card 2: Task currencies</h3><p>Help with their work: resources, information, time saved. For Felix: fewer angry refund tickets. Refund complaints create about 200 IT tickets a month.</p><h3>Card 3: Position currencies</h3><p>Recognition, visibility, a reputation boost. \"Your name on the fix when Kamau sees it.\"</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Relationship currencies</h3><p>Being listened to, included, supported. Njeri valued this most: \"Finally, someone asks us.\"</p><h3>Card 5: Personal currencies</h3><p>Learning, ownership, feeling good about yourself. Pauline might want to lead the customer messages herself.</p><h3>Card 6: Find their currency by listening</h3><p>You can't guess. You learn it on the listening tour, by asking \"What would this change for you?\" Then you offer that.</p>",
    },
    {
      kind: 'check',
      question: 'What currency does Wanjiku most need?',
      options: ['Task: a process that keeps audit safe and saves her time', 'Position: her name in lights', 'Inspiration: a speech about customers'],
      answer: 0,
      explanation: 'Her worry is audit and workload. A safe, lighter process is what she values.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Inspiration, task, position, relationship, personal. Find each person\'s currency by listening, then offer it honestly.',
    },
  ],
  apply: {
    scenario: 'The stakeholder map, with Mrs Achieng.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s Cohen and Bradford\'s big idea?',
        options: [
          { text: 'You need a title to influence', why: 'The opposite: it\'s for people without one.' },
          { text: 'Influence is an exchange: people help when they get something they value' },
          { text: 'Pay people to help', why: 'Currencies are mostly not money.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which currency is it?',
        groups: ['Task', 'Position', 'Relationship'],
        items: [
          { text: '200 fewer IT tickets a month', group: 0 },
          { text: 'Her name on the fix for Kamau', group: 1 },
          { text: '"Finally, someone asks us."', group: 2 },
          { text: 'Saving Wanjiku three hours a week', group: 0 },
          { text: 'Presenting the result to leadership', group: 1 },
          { text: 'Being included from the start', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'So what does Felix want, young man?',
        prompt: 'Remi\'s best answer?',
        options: [
          { text: 'Fewer refund tickets. About 200 a month land on IT. If refunds work, his queue shrinks.' },
          { text: 'To do what Brian says.', why: 'That\'s not his currency, and Felix doesn\'t report to Brian.' },
          { text: 'No idea. I\'ll just ask nicely.', why: 'Nice helps, but knowing his currency helps more.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Cohen and Bradford call the things people value ___. (one word)',
        answers: ['currencies', 'Currencies'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their likely currency.',
        pairs: [
          ['Njeri', 'Being listened to'],
          ['Felix', 'Fewer tickets'],
          ['Wanjiku', 'Audit-safe, less work'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do you find someone\'s currency?',
        options: [
          { text: 'Guess from their job title', why: 'Two people with the same title can value very different things.' },
          { text: 'Ask their boss', why: 'Ask them.' },
          { text: 'Listen, and ask what the change would mean for them' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s offer list. Which one isn\'t an honest currency?',
        lines: [
          'Felix: fewer refund tickets.',
          'Wanjiku: I\'ll tell audit it\'s their fault, not hers.',
          'Njeri: her team credited in the final report.',
        ],
        bug: 1,
        fix: 'Wanjiku: a sample-check that keeps audit safe and saves her time.',
        explanation: 'Currencies are real value, honestly offered. Not promises you can\'t keep.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put using currencies in order.',
        lines: ['Listen to what they care about', 'Name their currency', 'Shape your ask to offer it', 'Deliver what you offered'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Think about what they\'d [[1]] from you, not just what you [[2]] from them.',
        blanks: [['want', 'value'], ['need', 'want']],
        distractors: ['take', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s pitch to Felix.',
        tiles: ['This', 'means', 'fewer', 'tickets', 'for', 'you.'],
        distractors: ['Brian'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick someone whose help you need. Which of the five currencies do you think they value most? What could you honestly offer?',
    starters: ['They probably value...', 'I could offer...'],
  },
  deepen: {
    title: 'Currency check',
    summary: 'Before your next ask, write one line: "What\'s in it for them?" If you can\'t answer, go back and listen first.',
  },
  notes: 'Allan R. Cohen & David L. Bradford, Influence Without Authority (1989; 3rd ed. 2017): law of reciprocity and the exchange model; currencies grouped as inspiration-, task-, position-, relationship- and personal-related. Fictional figures (200 tickets/month).',
};

export default lesson;
