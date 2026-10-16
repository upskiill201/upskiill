import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Miracle's notes from Week 1, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the Week 1 notes',
  summary: 'Sunday night. Miracle turns her week into one page of notes. It\'s the first time anyone has written down what this team needs. Tap through to see every Chapter 1 tool on it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 1 tool on one page',
    'Write motivation notes for your own team',
    'Turn what people said into a plan',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Clinic Success, Week 1 notes',
      text: 'Fixed: headsets. Fixing: ticket system, Wednesday. Bisi stays for the clinics; might leave if ignored; wants to own onboarding. Chidi is bored; needs a hard problem; try the northern clinics. Halima feels like an outsider; her nursing experience is our secret weapon. Emmanuel: not lazy, I think bored too. Ask him more. Pay: checked, fair. Trial: two weeks without the 15-minute sheet, measured on clinics live.',
      hotspots: [
        { phrase: 'Fixed: headsets.', note: 'Hygiene first, fast and visible (Herzberg).' },
        { phrase: 'Bisi stays for the clinics; might leave if ignored', note: 'Straight from the stay interview: why she stays and what might make her go.' },
        { phrase: 'wants to own onboarding', note: 'Autonomy: Bisi\'s hungriest need.' },
        { phrase: 'Chidi is bored; needs a hard problem', note: 'Competence: growth, not more of the same.' },
        { phrase: 'her nursing experience is our secret weapon', note: 'Relatedness: belonging built by valuing what she brings.' },
        { phrase: 'Emmanuel: not lazy, I think bored too.', note: 'Theory Y: question the "lazy" label, find the cause.' },
        { phrase: 'Pay: checked, fair.', note: 'Unfair pay demotivates, so check it. But fair pay is the floor, not the motivator.' },
        { phrase: 'measured on clinics live', note: 'Outcomes, not activity: a fair trial to change a Theory X rule.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Good motivation notes: what you fixed, why each person stays, their hungriest need, the labels you\'re questioning, and how you\'ll measure.',
    },
  ],
  apply: {
    scenario: 'Line check, Week 1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why write "not lazy, I think bored too" about Emmanuel?',
        options: [
          { text: 'To excuse him forever', why: 'It\'s a question to explore, not an excuse.' },
          { text: 'Because he\'s funny', why: 'Funny and bored can go together.' },
          { text: 'To question a Theory X label and look for the real cause' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool is it?',
        groups: ['Hygiene', 'Three needs', 'Theory Y'],
        items: [
          { text: 'Headsets fixed', group: 0 },
          { text: 'Chidi needs a hard problem', group: 1 },
          { text: 'Emmanuel: not lazy', group: 2 },
          { text: 'Ticket system Wednesday', group: 0 },
          { text: 'Bisi owns onboarding', group: 1 },
          { text: 'Measured on clinics live', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'You think my nursing helps? I thought it made me the odd one out.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It\'s why clinics trust you. You speak their language. Nobody else on the team can do that.' },
          { text: 'It\'s fine, everyone\'s different.', why: 'Too vague to build belonging.' },
          { text: 'You\'ll fit in eventually.', why: 'Treats her experience as a problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Halima\'s hungriest need is ___. (one word)',
        answers: ['relatedness', 'Relatedness', 'belonging'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why check pay at all, if pay isn\'t the main motivator?',
        options: [
          { text: 'To give everyone a raise', why: 'Only if it\'s unfair.' },
          { text: 'Unfair pay demotivates, so it has to be fair first' },
          { text: 'It\'s not needed', why: 'Unfair pay is a classic demotivator.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the notes. Which line breaks Chapter 1?',
        lines: [
          'Fixed: headsets.',
          'Emmanuel: lazy. Keep an eye on him.',
          'Chidi: try the northern clinics.',
        ],
        bug: 1,
        fix: 'Emmanuel: maybe bored. Ask him more.',
        explanation: 'A Theory X label before any diagnosis.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the notes in order.',
        lines: ['What\'s fixed', 'Why each person stays', 'Their hungriest need', 'How we\'ll measure'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"Fixed: headsets"', 'Herzberg'],
          ['"Needs a hard problem"', 'Self-determination theory'],
          ['"Not lazy"', 'McGregor\'s Theory Y'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Write down what [[1]] said, then what you\'ll [[2]].',
        blanks: [['people', 'they'], ['do', 'change']],
        distractors: ['Folake', 'guess'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s line about Halima.',
        tiles: ['Her', 'nursing', 'is', 'our', 'secret', 'weapon.'],
        distractors: ['problem.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write five lines of motivation notes about a group you\'re in: what\'s broken, why people stay, each person\'s hungriest need.',
    starters: ['Broken: ...', 'They stay because...'],
  },
  deepen: {
    title: 'One page per team',
    summary: 'If you lead people, keep one page of motivation notes. Update it after every one-to-one. Reread it before every hard decision.',
  },
  notes: 'Synthesis of Chapter 1 tools: hygiene factors (Herzberg), stay interviews (Finnegan), three needs (Deci & Ryan), Theory X/Y (McGregor), fair pay (Judge et al.), outcome measures. Fictional notes.',
};

export default lesson;
