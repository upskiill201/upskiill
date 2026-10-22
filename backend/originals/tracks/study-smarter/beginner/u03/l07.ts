import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 — mind maps from your notes: showing how ideas connect. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Mind maps from your notes',
  summary: 'Notes show ideas one after another. A mind map shows how they connect, and connections are what exam questions test.',
  minutes: 12,
  outcomes: [
    'Build a mind map from your notes',
    'Label the links between ideas, not just the ideas',
    'Ask the AI which connections you missed',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Kofi's mind map: how substances move in and out of cells. Tap each part.",
      text: 'In the centre: MOVEMENT IN AND OUT OF CELLS. Branch 1: DIFFUSION, labelled "high to low concentration, no energy". Branch 2: OSMOSIS, labelled "a special kind of diffusion, water only". Branch 3: ACTIVE TRANSPORT, labelled "low to high, needs energy". A link from OSMOSIS to DIFFUSION, labelled "same idea, but water across a membrane".',
      hotspots: [
        { phrase: 'MOVEMENT IN AND OUT OF CELLS', note: 'The centre is the big topic. Everything else branches from it.' },
        { phrase: '"high to low concentration, no energy"', note: 'Each branch has a label: the one thing that defines it.' },
        { phrase: 'ACTIVE TRANSPORT', note: 'The opposite direction (low to high), which is why it needs energy. Putting it next to diffusion makes the contrast obvious.' },
        { phrase: 'A link from OSMOSIS to DIFFUSION', note: 'The most valuable part: a cross-link with a label. Exam questions often test exactly these connections.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>A mind map is only useful if you <strong>build it yourself</strong> and <strong>label the links</strong>. An arrow with no label says "these are related". An arrow labelled "osmosis is diffusion of water" says <em>how</em>.</p><p>Build it from memory first, then check: <em>"Here is my mind map of [topic], written as a list of branches and links. Which important connections are missing? Which link labels are wrong?"</em></p><p>Most AI chat tools work in text, so describe your map as a list. You keep the drawn version on paper.</p>',
    },
    {
      kind: 'check',
      question: 'What is the most valuable part of a mind map?',
      options: ['The colours', 'Labelled links between ideas', 'How big it is'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi maps how things move in and out of cells.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each branch to its label.',
        pairs: [
          ['Diffusion', 'High to low concentration, no energy'],
          ['Osmosis', 'Diffusion of water across a membrane'],
          ['Active transport', 'Low to high concentration, needs energy'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does active transport need energy?',
        options: [
          { text: 'It is faster', why: 'Speed is not the reason.' },
          { text: 'It only moves water', why: 'That is osmosis.' },
          { text: 'It moves substances against the concentration gradient, from low to high' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs energy from the cell, or not?',
        groups: ['Needs energy', 'No energy'],
        items: [
          { text: 'Diffusion', group: 1 },
          { text: 'Osmosis', group: 1 },
          { text: 'Active transport', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has drawn his map. Which request is best?',
        options: [
          { text: 'Make me a mind map of cell transport.', why: 'He should build his own. This one is already done.' },
          { text: 'Here is my mind map as a list of branches and links. Which important connections are missing? Are any link labels wrong?' },
          { text: 'Is my mind map pretty?', why: 'Pretty is not the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Which link in Clinton's map is wrong?",
        lines: ['Osmosis → diffusion: "osmosis is diffusion of water".', 'Active transport → diffusion: "same direction, no energy".', 'Diffusion → cells: "how oxygen gets into cells".'],
        bug: 1,
        fix: 'Active transport → diffusion: "opposite direction, needs energy".',
        explanation: 'Active transport goes against the gradient and needs energy. That contrast is the point.',
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "I don't do mind maps. They take forever and look messy.",
        prompt: 'What could Kofi say that is fair to Efua?',
        options: [
          { text: 'You are wrong, mind maps are always best.', why: 'They are one tool. Her method already links ideas.' },
          { text: "Your notes already have arrows between ideas, which is the important part. A map just puts all the links on one page." },
          { text: 'You should copy mine.', why: 'Building your own is what helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An arrow between two ideas is only useful if it has a ... (one word)',
        answers: ['label'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the mind map routine in order.',
        lines: ['Put the big topic in the centre', 'Add branches from memory', 'Label each link', 'Ask the AI which connections are missing'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] it yourself, and [[2]] the links.',
        blanks: [['Build', 'Draw'], ['label']],
        distractors: ['Print', 'colour'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the label for osmosis.',
        tiles: ['Diffusion', 'of', 'water', 'across', 'a', 'membrane'],
        distractors: ['energy', 'sugar'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a topic with several connected ideas. Write the centre, three branches, and one labelled cross-link.',
    starters: ['Centre:', 'Branches:', 'Cross-link:'],
  },
  deepen: {
    title: 'Map it tonight',
    summary: 'Draw a mind map of one topic from memory, with labelled links. Describe it to the AI as a list and ask what connections are missing.',
  },
  notes: 'Active transport: movement against a concentration gradient using energy (ATP) and carrier proteins. Concept mapping with labelled links (Novak) stated generally.',
};

export default lesson;
