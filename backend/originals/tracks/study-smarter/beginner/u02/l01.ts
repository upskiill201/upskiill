import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 — opens the chapter. Find the gap: what you need to know BEFORE the new topic. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: "Find the gap: what don't I know?",
  summary: "Stoichiometry. Kofi is lost five minutes into the lesson. The problem isn't today's topic. It's two older ones hiding underneath.",
  minutes: 12,
  outcomes: [
    'Ask the AI what a topic is built on',
    'Test yourself on those building blocks first',
    'Fix the missing block before the new topic',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thirty-six weeks to go',
      beats: [
        { speaker: 'narrator', text: 'Tuesday. Kofi is still enjoying his moles result. Mrs Asante writes a new word on the board: STOICHIOMETRY.' },
        { speaker: 'asante', text: "Using a balanced equation to work out how much product you get. You'll need it in every Chemistry paper from now on." },
        { speaker: 'narrator', text: 'She writes 2H₂ + O₂ → 2H₂O and starts calculating. Five minutes in, Kofi is lost. Not a little lost. Completely.' },
        { speaker: 'narrator', text: 'That night he asks the AI to explain stoichiometry at his level. It does. He still doesn\'t get it.' },
        { speaker: 'tey', text: "Here's something nobody tells you. When a new topic makes no sense at all, the gap usually isn't in the new topic. It's in something older that the new topic is built on." },
      ],
      choice: {
        prompt: 'What should Kofi ask the AI?',
        options: [
          {
            text: '"What do I need to understand BEFORE stoichiometry? List the building blocks, then quiz me with one question on each, one at a time."',
            outcome: 'Moles: right. Molar mass: right. Balancing equations: wrong, twice. He never understood what the big numbers in front mean. That\'s the gap.',
            best: true,
          },
          {
            text: '"Explain stoichiometry again, more slowly."',
            outcome: 'Slower, but still built on the part he never understood. Still lost.',
          },
          {
            text: '"Just give me the formula to memorise."',
            outcome: 'He memorises it. In class the next day, the question is worded differently and the formula is no help.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>Most school topics are built in layers. Stoichiometry sits on top of three older ideas:</p><ul><li><strong>Moles</strong> (Chapter 1: Kofi has these).</li><li><strong>Molar mass</strong> (also done).</li><li><strong>Balanced equations</strong>, especially what the big numbers in front mean (Kofi\'s gap).</li></ul><p>If one layer is missing, everything above it wobbles. AI is very good at listing the building blocks of a topic. Then you <strong>test yourself</strong> on each one, rather than just asking whether you know them. You\'ll often find the real gap is smaller and older than you thought.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: "Totally lost? Look underneath. Ask what the topic is built on, then quiz yourself on each block.",
    },
    {
      kind: 'check',
      question: "Why didn't Kofi understand stoichiometry?",
      options: ['It is too hard for him', 'An older topic underneath (balancing equations) had a gap', 'Mrs Asante explained it badly'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi hunts for the gap under stoichiometry.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request finds the gap fastest?',
        options: [
          { text: 'Explain stoichiometry in more detail.', why: 'More of the same, built on the same gap.' },
          { text: 'What do I need to understand before stoichiometry? Quiz me with one question on each, one at a time.' },
          { text: 'Am I good at chemistry?', why: "It can't know, and it's not a gap-finding question." },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the gap-finding routine in order.',
        lines: ['Ask what the topic is built on', 'Quiz yourself on each building block', 'Find the block you got wrong', 'Fix that block first, then go back to the topic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In 2H₂ + O₂ → 2H₂O, what number is in front of H₂O?',
        answers: ['2', 'two'],
        placeholder: 'Number',
        explanation: 'That big number in front is called a coefficient. It tells you how many molecules (or moles) of H₂O.',
      },
      {
        kind: 'mcq',
        prompt: 'Why test yourself on the building blocks, instead of asking "do I know moles?"',
        options: [
          { text: 'Feeling like you know something is not the same as being able to do it' },
          { text: 'The AI cannot answer yes or no questions', why: 'It can. Your feeling just is not reliable.' },
          { text: 'It takes longer, which is better', why: 'It is not about time. A test shows the real gap.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I'm totally lost on electromagnetism. I've watched three videos on it.",
        prompt: 'What should Kofi suggest?',
        options: [
          { text: "Ask the AI what electromagnetism is built on, then quiz yourself on each part. The gap's probably underneath." },
          { text: 'Watch a fourth video.', why: 'Same topic, same gap underneath.' },
          { text: 'Skip it, it is only one topic.', why: 'Other topics will be built on it too.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Building block of stoichiometry, or not?',
        groups: ['Building block', 'Not needed for it'],
        items: [
          { text: 'Moles', group: 0 },
          { text: 'Molar mass', group: 0 },
          { text: 'Balancing equations', group: 0 },
          { text: 'The history of the periodic table', group: 1 },
          { text: 'Photosynthesis', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's rule.",
        template: 'Totally lost? Look [[1]]. Ask what the topic is [[2]] on.',
        blanks: [['underneath', 'below'], ['built']],
        distractors: ['away', 'written'],
      },
      {
        kind: 'findBug',
        prompt: "Which step in Clinton's plan skips the gap check?",
        lines: ['Ask what quadratic equations are built on.', 'Assume he knows all of it.', 'Start practising quadratics.'],
        bug: 1,
        fix: 'Quiz himself with one question on each building block.',
        explanation: '"Assume" is how gaps hide. A quick quiz finds them.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the gap-finding question.',
        tiles: ['What', 'do', 'I', 'need', 'to', 'know', 'before', 'this?'],
        distractors: ['after', 'skip'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to the likely cause.',
        pairs: [
          ['Lost from the first minute', 'A gap in an older topic'],
          ['Lost at one step', 'A gap in that step'],
          ['Fine in class, lost in tests', 'Feeling it, not testing it'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a topic that made no sense at all. What might it have been built on that you never really understood?',
    starters: ['The topic was...', 'It was probably built on...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Pick your most confusing topic. Ask the AI what it is built on, and get one question on each building block.',
  },
  notes: '2H2 + O2 → 2H2O is the standard balanced equation for the formation of water. Topic layering is a general curriculum observation, no statistics.',
};

export default lesson;
