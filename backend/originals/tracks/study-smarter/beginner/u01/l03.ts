import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. Telling the AI your level: year, what you know, where you're stuck. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Tell it your level',
  summary: "Same question, two answers: one for a professor, one for Kofi. The only difference is one sentence about who's asking.",
  minutes: 12,
  outcomes: [
    'Describe your level in one or two sentences',
    'Say what you already know, so it starts from there',
    'Ask it to check the words it uses',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same question about molar mass',
      before: {
        label: 'No level',
        text: 'What is molar mass?\n\nAI: "Molar mass is the mass of one mole of a substance, expressed in g/mol, numerically equal to the relative formula mass Mr, derived from the standard atomic weights of constituent elements..."',
      },
      after: {
        label: 'With his level',
        text: 'I\'m in my last year of school. I know what atoms are and I just learned a mole is 6.022 × 10²³ of something. What is molar mass?\n\nAI: "You know a dozen eggs weighs more than a dozen grapes. Same idea: a mole of carbon weighs 12 grams, a mole of water weighs 18 grams. Molar mass is just how much one mole of something weighs."',
      },
      notes: [
        'Says the year, so it picks school-level words.',
        'Says what he already knows, so it builds on it instead of starting over.',
        'Gets an example that connects to what he just learned.',
      ],
    },
    {
      kind: 'text',
      html: '<p>"Your level" is more than your year at school. It has three parts:</p><ol><li><strong>Your stage:</strong> "final year of secondary school", "first-year university, Biology".</li><li><strong>What you already know:</strong> "I know atoms and the periodic table".</li><li><strong>Words you don\'t know yet:</strong> "I don\'t know what Mr means".</li></ol><p>The middle one matters most. If the AI knows where your knowledge stops, it starts the explanation right there, not three chapters back and not three chapters ahead.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If an answer uses a word you don\'t know, say so: "What does Mr mean? Explain it before you use it." Never nod along to a word you don\'t understand.',
    },
    {
      kind: 'check',
      question: 'Which part of "your level" helps the AI most?',
      options: ['Your age', 'What you already know', 'Your favourite subject'],
      answer: 1,
      explanation: 'It tells the AI where to start.',
    },
  ],
  apply: {
    scenario: 'Kofi is telling his AI study partner where he is.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question tells the AI Kofi\'s level best?',
        options: [
          { text: 'What is molar mass? I\'m 17.', why: 'Age says little about what he knows.' },
          { text: "I'm in my final year of school. I know what a mole is but not how to find molar mass. Explain it." },
          { text: 'What is molar mass? I am a student.', why: '"A student" could mean age 10 or a PhD.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of "your level" is this?',
        groups: ['Your stage', 'What you know', "Words you don't know"],
        items: [
          { text: 'Final year of secondary school', group: 0 },
          { text: 'I can use the periodic table', group: 1 },
          { text: "I don't know what Mr means", group: 2 },
          { text: 'First-year university, Biology', group: 0 },
          { text: 'I know what a mole is', group: 1 },
          { text: "What's a 'relative atomic mass'?", group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'The AI keeps using words like "stoichiometric ratio". I just skip them.',
        prompt: 'David is in Miracle\'s group in Buea. What should Kofi tell him?',
        options: [
          { text: 'Skipping is fine, the rest makes sense.', why: 'That word might be the whole point of the answer.' },
          { text: 'Ask for a longer answer.', why: 'Longer usually means more words he doesn\'t know.' },
          { text: "Don't skip them. Ask it: what does that word mean? Explain it before you use it." },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the sentence that tells it what Kofi already knows.',
        tiles: ['I', 'know', 'what', 'a', 'mole', 'is,', 'but', 'not', 'molar', 'mass'],
        distractors: ['nothing', 'everything'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A mole of carbon weighs 12 g. A mole of water weighs 18 g. How many grams does one mole of water weigh?',
        answers: ['18', '18g', '18 g', 'eighteen'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line will make the answer too advanced for Kofi?',
        lines: [
          "I'm in my last year of school.",
          'I know what atoms are.',
          'Answer as if I already know molar mass.',
        ],
        bug: 2,
        fix: "I don't know molar mass yet. Start from moles.",
        explanation: 'Molar mass is exactly what he is trying to learn.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sentence to what it changes.',
        pairs: [
          ['"I\'m in my final year"', 'The words it chooses'],
          ['"I know what a mole is"', 'Where it starts'],
          ['"What does Mr mean?"', 'Fills a gap in your vocabulary'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI starts three chapters back, explaining what an atom is. What went wrong?',
        options: [
          { text: 'The AI is slow', why: 'It just had no idea where his knowledge stopped.' },
          { text: "Kofi didn't say what he already knows" },
          { text: 'Atoms are part of moles', why: 'True, but he already knows atoms.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Kofi's level sentence.",
        template: "I'm in my [[1]] year of school. I already [[2]] what a mole is. I don't know what [[3]] mass means.",
        blanks: [['final', 'last'], ['know'], ['molar']],
        distractors: ['forgot', 'atomic', 'first'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Kofi\'s question in a good order.',
        lines: ['Say your stage', 'Say what you already know', 'Say what you are stuck on', 'Ask your question'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own level sentence for one subject: your stage, what you already know, and a word or idea you don\'t know yet.',
    starters: ["I'm in...", 'I already know...', "I don't get..."],
  },
  deepen: {
    title: 'Save it',
    summary: 'Save your level sentence for your hardest subject in your phone notes. Paste it at the start of every study chat.',
  },
  notes: 'Molar mass of carbon-12 = 12 g/mol; water H2O = 2(1) + 16 = 18 g/mol (rounded). Example AI answers are illustrative, not quotes from a real tool.',
};

export default lesson;
