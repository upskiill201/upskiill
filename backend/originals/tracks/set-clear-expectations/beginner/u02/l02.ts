import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: who does what (RACI; diffusion of responsibility). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'One owner, written down',
  summary: 'Arjun\'s list has 14 pieces and 14 names. Kavya asks: "But who do I ask before I change the colours? And who needs to know when I do?" A name isn\'t quite enough. Tey sends a short read.',
  minutes: 12,
  outcomes: [
    'Know why "everyone owns it" means nobody does',
    'Use the RACI roles to make ownership clear',
    'Keep a responsibility list light enough to use',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Who does it, who decides, who knows',
      html: "<p>In a famous 1968 experiment, psychologists <strong>John Darley</strong> and <strong>Bibb Latané</strong> found that people were less likely to help in an emergency when they believed others were also there to help. They called it <strong>diffusion of responsibility</strong>: when a job seems to belong to everyone, each person feels less responsible for it. Teams fall into the same trap. \"We'll all keep an eye on order emails\" means nobody will.</p><h3>RACI: four roles</h3><p>Project managers often use a simple grid called <strong>RACI</strong>. For each piece of work:</p><ul><li><strong>R, Responsible:</strong> does the work. (Kavya builds the product page.)</li><li><strong>A, Accountable:</strong> the one person who owns the outcome and signs it off. Only ever one. (Arjun approves it.)</li><li><strong>C, Consulted:</strong> asked for input before. (Joel, because the page hands off to his cart.)</li><li><strong>I, Informed:</strong> told after. (Mr Rao, when it's live.)</li></ul><h3>Keep it light</h3><p>A RACI chart can become a giant spreadsheet nobody reads. For a small team, one line per piece is enough: \"Product page: Kavya does it, Arjun approves, ask Joel about the handoff, tell Mr Rao when live.\"</p><h3>The most important letter</h3><p>If you only do one thing, make sure every piece has exactly one <strong>A</strong>: one person who can say \"this is done\" and \"this is how we'll do it\". Two A's is how you get two checkouts.</p>",
    },
    {
      kind: 'check',
      question: 'How many people should be Accountable for each piece of work?',
      options: ['Exactly one', 'Everyone involved', 'At least two, as backup'],
      answer: 0,
      explanation: 'One person owns the outcome. Two owners is how two checkouts happen.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Everyone owns it means nobody does. For each piece: who does it, the one who owns it, who to ask, who to tell.',
    },
  ],
  apply: {
    scenario: 'Kavya\'s question, and the reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is diffusion of responsibility?',
        options: [
          { text: 'Sharing work equally', why: 'It\'s about responsibility getting thinner.' },
          { text: 'When a job seems to belong to everyone, each person feels less responsible' },
          { text: 'Delegating everything', why: 'Not quite.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the RACI letter to its meaning.',
        pairs: [
          ['Responsible', 'Does the work'],
          ['Accountable', 'Owns the outcome, signs off'],
          ['Informed', 'Told after'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'For the product page, which role?',
        groups: ['Responsible', 'Consulted', 'Informed'],
        items: [
          { text: 'Kavya, who builds it', group: 0 },
          { text: 'Joel, because it hands off to his cart', group: 1 },
          { text: 'Mr Rao, when it goes live', group: 2 },
          { text: 'Kavya writing the Hindi labels', group: 0 },
          { text: 'A Hindi speaker checking the labels', group: 1 },
          { text: 'Mr Rao\'s shop staff, after launch', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Who do I ask before changing the colours? And who needs to know after?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Ask me before (I approve design). Tell Joel after, because the cart uses the same colours.' },
          { text: 'Whoever\'s around.', why: 'That\'s diffusion of responsibility.' },
          { text: 'Nobody, just do it.', why: 'Then Joel\'s cart doesn\'t match.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every piece needs exactly one ___ person (the A in RACI). (one word)',
        answers: ['accountable', 'Accountable'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep RACI light on a small team?',
        options: [
          { text: 'RACI is only for big companies', why: 'One line per piece works for any size.' },
          { text: 'It doesn\'t matter how long it is', why: 'Unread charts change nothing.' },
          { text: 'A giant spreadsheet nobody reads doesn\'t clarify anything' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'A line from Arjun\'s list. Which part breaks RACI?',
        lines: [
          'Order emails: Joel does it.',
          'Arjun and Kavya both approve it.',
          'Tell Mr Rao when it\'s live.',
        ],
        bug: 1,
        fix: 'Arjun approves it.',
        explanation: 'Two approvers means two A\'s, and two people saying different things.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put writing one RACI line in order.',
        lines: ['Name the piece', 'Who does it', 'Who approves it', 'Who to ask, who to tell'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'When [[1]] owns it, [[2]] owns it.',
        blanks: [['everyone', 'everybody'], ['nobody', 'no one']],
        distractors: ['somebody', 'Arjun'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the most important rule.',
        tiles: ['One', 'piece,', 'one', 'owner.'],
        distractors: ['two'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one shared task in your life. Write its RACI line: who does it, who owns it, who to ask, who to tell.',
    starters: ['Task: ...', 'Does it: ...', 'Owns it: ...'],
  },
  deepen: {
    title: 'Find the double A',
    summary: 'Look at a project you\'re in. Is there any piece with two people who both think they decide? Agree one, today.',
  },
  notes: 'John M. Darley & Bibb Latané (1968), "Bystander intervention in emergencies: Diffusion of responsibility", J. Personality & Social Psychology 8(4). RACI (Responsible, Accountable, Consulted, Informed): responsibility assignment matrix from project-management practice (e.g. PMI PMBOK). Applying bystander findings to teams is an analogy, hedged.',
};

export default lesson;
