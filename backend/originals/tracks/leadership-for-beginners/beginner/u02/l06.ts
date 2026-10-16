import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Chat with Tey: what makes each person tick (individual motivation; self-determination theory). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What makes each person tick',
  summary: 'Lucía tried the same pep talk on everyone. Diego rolled his eyes, Tomás glowed, and Sofía looked at the floor. "Why does the same thing work on one person and flop on the next?" Tey: "Because they\'re different people. Let\'s talk."',
  minutes: 11,
  outcomes: [
    'Know that different people are motivated by different things',
    'Know three needs research says nearly everyone shares',
    'Find out what drives someone by asking, not guessing',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Lucía, what did you say in the pep talk?',
          replies: ['"Great work, keep pushing, big summer ahead!"'],
        },
        {
          tey: "Lovely energy. But think about who heard it. Diego has twelve years here. He doesn't want cheering; he wants his experience to count. Tomás wants to know he's doing okay. Sofía... what do you know about Sofía?",
          replies: ['She has three ideas she\'s told nobody.', 'Honestly, not much.'],
        },
        {
          tey: 'So maybe Sofía wants room to try her own ideas. Psychologists Edward Deci and Richard Ryan found three needs that drive motivation for nearly everyone: autonomy (some say in how I work), competence (I\'m getting better at something), and relatedness (I belong here, people care).',
          replies: ['So everyone needs the same three things?'],
        },
        {
          tey: "Same three needs, different amounts and different shapes. Diego's competence need looks like being the expert. Tomás's looks like learning fast. Sofía's autonomy need might be a project of her own. The trick is finding out which, for whom.",
          replies: ['How do I find out without being weird?'],
        },
        {
          tey: 'Ask, in your one-on-ones: "What\'s the best project you\'ve ever worked on, and why?" and "What kind of recognition do you actually like?" Some people love public praise. Some would rather disappear. Don\'t guess. Ask.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three shared needs: autonomy, competence, relatedness. Each person needs them in a different shape. Ask; don\'t guess.',
    },
  ],
  apply: {
    scenario: 'Tey and Lucía, after the pep talk.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the same pep talk land differently on each person?',
        options: [
          { text: 'They\'re motivated by different things' },
          { text: 'Lucía said it badly', why: 'The words were fine. The audience was three different people.' },
          { text: 'Diego and Sofía don\'t like her', why: 'It\'s about what drives them, not about her.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to its meaning.',
        pairs: [
          ['Autonomy', 'Some say in how I work'],
          ['Competence', 'I\'m getting better at something'],
          ['Relatedness', 'I belong here'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which need does it feed?',
        groups: ['Autonomy', 'Competence', 'Relatedness'],
        items: [
          { text: 'Letting Sofía run her own idea', group: 0 },
          { text: 'Asking Diego to teach Tomás', group: 1 },
          { text: 'Remembering Marta\'s daughter\'s birthday', group: 2 },
          { text: 'Choosing how to hit the deadline', group: 0 },
          { text: 'A course to learn email tools', group: 1 },
          { text: 'A team lunch every month', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Please don\'t thank me in the all-hands. I\'d honestly rather die.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Don\'t be silly, everyone loves praise.', why: 'Not everyone. She just told you.' },
          { text: 'Fine, no thanks at all then.', why: 'She didn\'t say no recognition. Just not public.' },
          { text: 'Got it. How would you like me to recognise good work instead?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'To find out what motivates someone, don\'t guess: ___. (one word)',
        answers: ['ask', 'Ask'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Diego wants his twelve years to count. Which move fits him best?',
        options: [
          { text: 'A sticker that says "Great job!"', why: 'Cheering isn\'t what he\'s after.' },
          { text: 'Give him less to do', why: 'He wants his experience used, not shelved.' },
          { text: 'Ask him to mentor Tomás on the newsletter' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s one-on-one questions. Which one won\'t tell her what motivates people?',
        lines: [
          'What\'s the best project you\'ve ever worked on, and why?',
          'You\'re motivated by money, right?',
          'What kind of recognition do you actually like?',
        ],
        bug: 1,
        fix: 'What makes a work day a good one for you?',
        explanation: 'A leading question gets the answer you planted, not the real one.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s new approach in order.',
        lines: ['Ask what motivates each person', 'Listen for autonomy, competence, relatedness', 'Shape their work to fit', 'Check in to see if it\'s working'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three needs.',
        template: '[[1]], [[2]] and [[3]].',
        blanks: [['Autonomy', 'autonomy'], ['competence', 'Competence'], ['relatedness', 'Relatedness']],
        distractors: ['money', 'fame'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the best motivation question.',
        tiles: ['What', 'makes', 'a', 'good', 'work', 'day', 'for', 'you?'],
        distractors: ['bonus'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three needs (autonomy, competence, relatedness) matters most to you at work or school right now? Is it being met?',
    starters: ['The one that matters most to me is...', 'Right now it\'s...'],
  },
  deepen: {
    title: 'The best project question',
    summary: 'Ask one person: "What\'s the best project you\'ve ever worked on, and why?" Listen for which of the three needs shows up in their answer.',
  },
  notes: 'Self-determination theory: Deci & Ryan (1985; Ryan & Deci 2000, American Psychologist 55(1)): autonomy, competence, relatedness as basic psychological needs underpinning intrinsic motivation. Individual recognition preferences reflect standard manager guidance (e.g. Gallup on individualised recognition).',
};

export default lesson;
