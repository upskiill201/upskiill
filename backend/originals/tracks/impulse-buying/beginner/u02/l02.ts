import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Card deck: hungry, angry, lonely, tired (and bored, stressed). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Hungry, angry, lonely, tired',
  summary: 'A simple check used for decades in habit recovery: before acting on an urge, ask "am I hungry, angry, lonely or tired?" Kofi adds two of his own. Four cards.',
  minutes: 10,
  outcomes: [
    'Use the HALT check before buying',
    'Add your own personal triggers',
    'Meet the real need instead of buying',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>HALT</strong> is a simple check that comes from addiction-recovery groups and is now widely used for all kinds of habits: before you act on an urge, ask if you\'re <strong>H</strong>ungry, <strong>A</strong>ngry, <strong>L</strong>onely or <strong>T</strong>ired.</p><p>Each of these makes quick fixes feel more urgent. And each has a real fix that isn\'t buying something.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The real fixes:</strong></p><ul><li><strong>Hungry:</strong> eat something. Never shop (or scroll shops) hungry; everything looks better.</li><li><strong>Angry:</strong> move, walk, talk it out. Anger wants action; buying is a fast, expensive action.</li><li><strong>Lonely:</strong> contact a person, not a shop. A voice note, a knock on a door.</li><li><strong>Tired:</strong> sleep. Decisions made exhausted are worse decisions.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>Kofi adds two:</strong> <strong>B</strong>ored and <strong>S</strong>tressed. His log says those are his biggest. So his check is <strong>HALT + BS</strong>. ("Yes," says Efua, "it is BS.")</p><ul><li><strong>Bored:</strong> make something: a beat, a meal, a walk.</li><li><strong>Stressed:</strong> do ten minutes of the thing you\'re stressed about, then rest.</li></ul>',
    },
    {
      kind: 'check',
      question: 'Kofi wants new headphones at 1 a.m. after a long day of exams. Which HALT letter fits best?',
      options: ['H: hungry', 'T: tired', 'A: angry'],
      answer: 1,
      explanation: 'Exhausted after exams, at 1 a.m. The fix is sleep, then decide.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before you buy: am I hungry, angry, lonely, tired, bored or stressed? Fix that first. If you still want it tomorrow, it\'s a real want.',
    },
  ],
  apply: {
    scenario: 'HALT + BS.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each feeling to its real fix.',
        pairs: [
          ['Hungry', 'Eat something'],
          ['Angry', 'Move or talk it out'],
          ['Lonely', 'Contact a person'],
          ['Tired', 'Sleep'],
          ['Bored', 'Make something'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the A in HALT stand for?',
        answers: ['angry', 'anger'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real fix, or buying as a fix?',
        groups: ['Real fix', 'Buying as a fix'],
        items: [
          { text: 'Lonely: call a friend', group: 0 },
          { text: 'Bored: scroll a sale', group: 1 },
          { text: 'Tired: go to sleep', group: 0 },
          { text: 'Stressed: buy a "treat"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why should you avoid shopping when hungry?',
        options: [
          { text: 'Shops close at mealtimes', why: 'Not the reason.' },
          { text: 'It doesn\'t matter', why: 'Hunger makes quick fixes feel more urgent.' },
          { text: 'Hunger makes things look more appealing, so you buy more' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'It\'s midnight, I\'m stressed about anatomy, and I want to buy a new hoodie.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Buy it, you deserve a treat.', why: 'A treat for stress, at midnight, is the pattern itself.' },
          { text: 'HALT + BS says stressed and tired. Ten minutes of anatomy flashcards, then sleep. Screenshot the hoodie; check it tomorrow.' },
          { text: 'Never buy hoodies.', why: 'The hoodie isn\'t the problem; the moment is.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Kofi\'s check.',
        template: 'HALT + [[1]]: hungry, angry, lonely, tired, bored, [[2]].',
        blanks: [['BS'], ['stressed']],
        distractors: ['sad', 'happy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "fix" doesn\'t meet the real need?',
        lines: [
          'Lonely: knock on Yaw\'s door.',
          'Angry: go for a walk.',
          'Tired: buy an energy drink and keep scrolling.',
        ],
        bug: 2,
        fix: 'Tired: put the phone away and sleep.',
        explanation: 'The need is rest. An energy drink keeps him in the danger zone longer.',
      },
      {
        kind: 'mcq',
        prompt: 'Where does the HALT check come from?',
        options: [
          { text: 'A shopping app', why: 'Quite the opposite.' },
          { text: 'A bank', why: 'It comes from recovery groups.' },
          { text: 'Addiction-recovery groups, now used for many habits' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If you still want it tomorrow, after fixing the feeling, it\'s probably a real... what?',
        answers: ['want', 'need', 'want or need'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the check when an urge hits.',
        lines: ['Feel the urge', 'Run HALT + BS', 'Fix the feeling', 'Decide about the item tomorrow'],
      },
    ],
  },
  reflect: {
    prompt: 'Which HALT + BS feelings show up most in your own urges? What\'s the real fix for each?',
    starters: ['Mine is mostly...', 'The real fix is...'],
  },
  deepen: {
    title: 'Your own letters',
    summary: 'HALT is a starting point. Kofi added B and S from his log. Yours might be "after payday", "after a fight" or "on Sunday evenings". Your log will tell you which letters to add.',
  },
  notes: 'HALT: widely used in 12-step and recovery settings; general habit tool, not clinical advice.',
};

export default lesson;
