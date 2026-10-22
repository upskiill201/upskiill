import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Reading: meet future you. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Meet future you',
  summary: 'Why is it so hard to save for someone you\'ve never met? Because "future you" feels like a stranger. A famous experiment with age-progressed photos, and how Kofi uses the idea for his laptop and beyond.',
  minutes: 11,
  outcomes: [
    'Explain why future-you feels like a stranger',
    'Use simple ways to connect with your future self',
    'Write a note from your future self',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The stranger in the mirror',
      html: '<p>When people think about themselves ten years from now, brain scans suggest it looks a little like thinking about <em>someone else</em>. No wonder saving feels like giving money away: in a sense, you are, to a stranger called future-you.</p><p>In a set of experiments, psychologist Hal Hershfield and colleagues (2011) showed some participants an <strong>age-progressed image</strong> of themselves, their own face aged to about 70. Then they were asked how they\'d split money between spending now and saving for retirement. Those who\'d met their older selves put aside more.</p><p>Future-you became someone real, someone you\'d want to look after.</p><p><strong>Three ways to meet future-you, no photo app needed:</strong></p><ol><li><strong>Write a letter from them.</strong> Kofi writes from week 16: "It\'s the first day of semester. The programming lab is full of people on borrowed laptops. I\'m on mine. Thank you for every Sunday."</li><li><strong>Picture a specific day.</strong> Not "the future": the first day of the programming module, the seat, the screen.</li><li><strong>Give them a name and a need.</strong> "Third-year Kofi needs a laptop that still works." "Thirty-year-old Kofi wants his own studio."</li></ol><p>This works for short goals like a laptop, and much more for long ones like a first home or retirement, where future-you is decades away.</p>',
    },
    {
      kind: 'check',
      question: 'In Hershfield\'s experiments, what made people save more?',
      options: ['Being paid more', 'Being told to save', 'Seeing an aged image of their own face'],
      answer: 2,
      explanation: 'Meeting their future selves made saving feel like caring for someone real.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make future-you real: a letter from them, a specific day, a name and a need.',
    },
  ],
  apply: {
    scenario: 'Meeting week-16 Kofi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does saving feel like giving money away?',
        options: [
          { text: 'Future-you can feel like a stranger' },
          { text: 'Because it is giving money away', why: 'It\'s giving to yourself, later.' },
          { text: 'Because banks keep it', why: 'The money is still yours.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each technique to an example.',
        pairs: [
          ['Letter from future-you', '"Thank you for every Sunday."'],
          ['A specific day', 'First day of the programming module'],
          ['A name and a need', '"Third-year Kofi needs a laptop."'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes future-you feel real, or vague?',
        groups: ['Real', 'Vague'],
        items: [
          { text: '"Someday I\'ll be glad"', group: 1 },
          { text: 'A letter dated week 16', group: 0 },
          { text: '"The future"', group: 1 },
          { text: 'Picturing the lab seat and the screen', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Writing letters to yourself? That\'s strange, chale.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You\'re right, it\'s silly.', why: 'There\'s research behind it.' },
          { text: 'Only weird people do it.', why: 'Not true, and not kind.' },
          { text: 'A bit. But researchers found people who "met" their future selves saved more. And it works on me.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'Make [[1]]-you someone [[2]], someone you\'d look after.',
        blanks: [['future'], ['real']],
        distractors: ['past', 'rich'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s letter is too vague to help?',
        lines: [
          'It\'s the first day of semester.',
          'I\'m in the programming lab, on my own laptop.',
          'Things will be better somehow.',
        ],
        bug: 2,
        fix: 'Thank you for every Sunday. The jar was worth it.',
        explanation: '"Somehow" is vague. Specific details are what make future-you real.',
      },
      {
        kind: 'mcq',
        prompt: 'When does connecting with future-you matter most?',
        options: [
          { text: 'Only for laptops', why: 'It helps most for long goals.' },
          { text: 'For long goals, like retirement, where future-you is decades away' },
          { text: 'Never', why: 'Research suggests it helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Kofi is 18 now, how old is "thirty-year-old Kofi" in years from now?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to write a letter from future-you.',
        lines: ['Pick the date', 'Describe the day in detail', 'Say what made it possible', 'Say thank you'],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Kofi keep his letter?',
        options: [
          { text: 'Next to the jar on the door, or as a note he reads on Sundays' },
          { text: 'Hidden forever', why: 'It works by being seen.' },
          { text: 'Posted online', why: 'Private is fine. It just needs to be seen by him.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write three lines from future-you, on the day your goal is reached. What do they say to you?',
    starters: ['It\'s...', 'I\'m...', 'Thank you for...'],
  },
  deepen: {
    title: 'Read the study',
    summary: 'Hershfield, Goldstein, Sharpe, Fox, Yeykelis, Carstensen and Bailenson (2011), "Increasing Saving Behavior Through Age-Progressed Renderings of the Future Self", Journal of Marketing Research.',
  },
  notes: 'Hershfield, H. E., et al. (2011). JMR, 48(SPL), S23–S37. Neural similarity of future self to other: Ersner-Hershfield et al. (2009). Kept qualitative.',
};

export default lesson;
