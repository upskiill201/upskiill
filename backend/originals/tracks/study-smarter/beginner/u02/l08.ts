import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 — diagrams in words: ask for a diagram you can draw (the stoichiometry bridge). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Diagrams in words',
  summary: 'A chat AI often gives you text, not pictures. But it can describe a diagram so clearly that you can draw it yourself, and drawing it is what helps you remember.',
  minutes: 12,
  outcomes: [
    'Ask for a diagram described in words',
    'Draw it yourself from the description',
    'Use the diagram to solve problems',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The stoichiometry bridge. Tap each part.',
      text: 'Draw two boxes on the left, one above the other: GRAMS OF A on top, MOLES OF A below. Draw the same on the right for B. Arrow down on the left: ÷ molar mass of A. Arrow across the bottom: × mole ratio (B over A). Arrow up on the right: × molar mass of B.',
      hotspots: [
        { phrase: 'GRAMS OF A on top, MOLES OF A below', note: 'You start where the question starts: usually with a mass in grams.' },
        { phrase: '÷ molar mass of A', note: 'Going DOWN from grams to moles, you divide.' },
        { phrase: '× mole ratio (B over A)', note: 'The bridge. You can only cross between substances in moles, using the equation\'s coefficients.' },
        { phrase: '× molar mass of B', note: 'Going UP from moles to grams, you multiply.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>A diagram like this turns four steps into one picture you can hold in your head: <strong>down, across, up</strong>.</p><p>To get one from a chat AI, ask: <em>"Describe a simple diagram of [topic] that I could draw in 1 minute: boxes, arrows and labels only."</em></p><p>Then draw it yourself. Put it at the top of your notes, and every time you solve a problem, trace your finger along it.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Down, across, up. Divide, ratio, multiply.',
    },
    {
      kind: 'check',
      question: 'On the bridge, which way do you go to turn grams into moles?',
      options: ['Up, multiplying', 'Down, dividing by molar mass', 'Across'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi draws the bridge.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Trace the bridge for a mass-to-mass question.',
        lines: ['Start at grams of A', 'Down: divide by molar mass of A', 'Across: multiply by the mole ratio', 'Up: multiply by molar mass of B'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets Kofi a diagram he can draw?',
        options: [
          { text: 'Show me a picture of stoichiometry.', why: 'A chat AI may not draw, and "a picture" is vague.' },
          { text: 'Describe a simple diagram of the stoichiometry method I could draw in 1 minute: boxes, arrows and labels only.' },
          { text: 'Explain stoichiometry in a long paragraph.', why: 'That is the opposite of a diagram.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each arrow to its operation.',
        pairs: [
          ['Down (grams to moles)', '÷ molar mass'],
          ['Across (A to B)', '× mole ratio'],
          ['Up (moles to grams)', '× molar mass'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Use the bridge. 2Mg + O₂ → 2MgO. Mg = 24, MgO = 40. What mass of MgO comes from 12 g of Mg? (grams)',
        answers: ['20', '20g', '20 g'],
        placeholder: 'Number',
        explanation: 'Down: 12 ÷ 24 = 0.5 mol. Across: 1 : 1, 0.5 mol. Up: 0.5 × 40 = 20 g.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'The AI described the diagram really well. I\'ll just keep its description in my notes.',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Draw it yourself from the description. Drawing it is what makes it stick.' },
          { text: 'Good idea.', why: 'Text about a diagram is not a diagram.' },
          { text: 'Ask it for 5 more descriptions.', why: 'One drawn diagram beats five descriptions.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Multiply or divide?',
        groups: ['Multiply', 'Divide'],
        items: [
          { text: 'Grams to moles', group: 1 },
          { text: 'Moles to grams', group: 0 },
          { text: 'Moles of A to moles of B (by the ratio)', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Spot David's wrong turn on the bridge.",
        lines: ['Start: 32 g of O₂.', 'Down: 32 × 32 = 1024 moles.', 'Across: use the ratio.'],
        bug: 1,
        fix: 'Down: 32 ÷ 32 = 1 mole.',
        explanation: 'Going down (grams to moles) you divide, not multiply.',
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's memory line.",
        template: '[[1]], across, up. Divide, [[2]], multiply.',
        blanks: [['Down'], ['ratio']],
        distractors: ['Left', 'guess'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a diagram you drew yourself easier to remember than a paragraph?',
        options: [
          { text: 'You process it twice: as words and as a picture you made' },
          { text: 'It has fewer facts', why: 'It has the same facts, in a second form.' },
          { text: 'Teachers prefer diagrams', why: 'Maybe, but that is not why it helps you.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the diagram request.',
        tiles: ['Boxes,', 'arrows', 'and', 'labels', 'only'],
        distractors: ['paragraphs', 'essays'],
      },
    ],
  },
  reflect: {
    prompt: 'Which method or process in your subjects would be easier as a diagram? Sketch it in words here.',
    starters: ['The process is...', 'My diagram: boxes...'],
  },
  deepen: {
    title: 'Draw it tonight',
    summary: 'Ask for a 1-minute diagram of one process you are learning, draw it on paper, and put it at the top of your notes.',
  },
  notes: 'Mg 12 g = 0.5 mol → 0.5 mol MgO × 40 = 20 g. "Bridge"/"mole map" diagrams are common in school chemistry teaching.',
};

export default lesson;
