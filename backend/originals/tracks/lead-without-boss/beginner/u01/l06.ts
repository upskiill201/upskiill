import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Card deck: the stakeholder map (Mendelow power/interest grid). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Map the people',
  summary: 'Remi has twelve names in his notebook: the five teams, their bosses, Brian, Kamau, Mama Mboga Fresh. He can\'t give everyone the same attention. Zanele draws a square on the whiteboard. "Tey taught me this one."',
  minutes: 11,
  outcomes: [
    'Draw a simple stakeholder map',
    'Decide how much attention each person needs',
    'Spot who could quietly block you',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>A <strong>stakeholder</strong> is anyone who affects your project or is affected by it. A popular tool, often credited to <strong>Aubrey Mendelow</strong>, sorts them on two questions: how much <strong>power</strong> do they have over the outcome, and how much <strong>interest</strong> do they have in it? Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: High power, high interest: work closely</h3><p>Wanjiku (she approves refunds) and Felix (he changes the system). Involve them early and often. They can make or break it.</p><h3>Card 2: High power, low interest: keep satisfied</h3><p>Wanjiku's boss, the Finance Director. Busy, not focused on refunds, but can say no. Short, clear updates. No surprises.</p><h3>Card 3: Low power, high interest: keep informed</h3><p>The customer service team, who answer the angry calls. They care a lot. Keep them in the loop, and listen: they know what customers say.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Low power, low interest: keep an eye on</h3><p>Light touch. Don't flood them with updates.</p><h3>Card 5: Power isn't the same as title</h3><p>Njeri has no fancy title, but if the warehouse doesn't change the signature form, nothing changes. On Remi's map, she's high power.</p><h3>Card 6: People move</h3><p>Redraw the map every couple of weeks. A quiet person can become very interested the day the project touches their work.</p>",
    },
    {
      kind: 'check',
      question: 'Where does Njeri go on the map?',
      options: ['High power, high interest', 'Low power, low interest', 'Off the map'],
      answer: 0,
      explanation: 'No big title, but the warehouse step can block everything, and she cares.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Power and interest. Work closely with the high-high group. Keep powerful people satisfied and interested people informed. Redraw it often.',
    },
  ],
  apply: {
    scenario: 'Zanele\'s whiteboard square.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What two questions sort the stakeholder map?',
        options: [
          { text: 'How much power, and how much interest?' },
          { text: 'How old, and how senior?', why: 'Neither is on the map.' },
          { text: 'Friend or not?', why: 'Liking matters, but it\'s not the map.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Where do they go?',
        groups: ['Work closely', 'Keep satisfied', 'Keep informed'],
        items: [
          { text: 'Wanjiku, who approves refunds', group: 0 },
          { text: 'The busy Finance Director', group: 1 },
          { text: 'Customer service, who take angry calls', group: 2 },
          { text: 'Felix, who changes the system', group: 0 },
          { text: 'The Head of IT, rarely involved', group: 1 },
          { text: 'Sales reps who get customer complaints', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Should we send everyone on the map the same weekly update?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Yes, same long email for all twelve.', why: 'The busy ones stop reading.' },
          { text: 'No updates; it\'s faster.', why: 'Surprises make powerful people say no.' },
          { text: 'Different for each group: close work with Wanjiku and Felix, short notes for the Director, a loop for customer service.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Anyone who affects or is affected by your project is a ___. (one word)',
        answers: ['stakeholder', 'Stakeholder'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the group to what you do.',
        pairs: [
          ['High power, high interest', 'Work closely'],
          ['High power, low interest', 'Keep satisfied'],
          ['Low power, high interest', 'Keep informed'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Njeri high power, without a big title?',
        options: [
          { text: 'She\'s been there longest', why: 'Seniority isn\'t the reason here.' },
          { text: 'She\'s friends with Kamau', why: 'Not in this story.' },
          { text: 'If the warehouse step doesn\'t change, nothing changes' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s map notes. Which one is a mistake?',
        lines: [
          'Wanjiku: work closely, weekly.',
          'Njeri: low power, she\'s just the warehouse.',
          'Finance Director: short updates, no surprises.',
        ],
        bug: 1,
        fix: 'Njeri: high power. The signature form is hers.',
        explanation: 'Power is about what someone can block or unblock, not their job title.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put making the map in order.',
        lines: ['List everyone involved', 'Rate their power', 'Rate their interest', 'Decide how to work with each group'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Power isn\'t the same as [[1]]. [[2]] the map often.',
        blanks: [['title'], ['Redraw', 'Update', 'redraw']],
        distractors: ['Ignore', 'age'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first map question.',
        tiles: ['Who', 'could', 'block', 'this?'],
        distractors: ['love'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw a stakeholder map for something you\'re working on. Who\'s in "work closely"? Is there anyone you\'d forgotten?',
    starters: ['Work closely: ...', 'I\'d forgotten...'],
  },
  deepen: {
    title: 'The hidden blocker',
    summary: 'Look at your map and ask: who has no big title but could quietly stop this? Talk to that person this week.',
  },
  notes: 'Power/interest stakeholder grid: commonly attributed to Aubrey L. Mendelow (1991), "Environmental Scanning: The Impact of the Stakeholder Concept", ICIS proceedings; widely used in project management. Stakeholder definition after Freeman (1984).',
};

export default lesson;
