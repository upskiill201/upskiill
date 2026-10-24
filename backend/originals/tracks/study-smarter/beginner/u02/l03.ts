import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 — analogies that stick, and where every analogy breaks. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Analogies that stick',
  summary: 'An analogy gets you in the door fast. But every analogy breaks somewhere, and knowing where is part of understanding.',
  minutes: 12,
  outcomes: [
    'Ask for an analogy from your own world',
    'Ask where the analogy breaks',
    'Know when to let go of the analogy',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Mole ratio: two ways in',
      before: {
        label: 'Textbook',
        text: 'The stoichiometric coefficients of a balanced equation give the molar ratio in which reactants combine and products form.',
      },
      after: {
        label: 'Analogy',
        text: 'A football team needs 11 players and 1 ball for a match. 2H₂ + O₂ → 2H₂O is the same: every 2 moles of hydrogen need 1 mole of oxygen, and make 2 moles of water. The recipe ratio is the mole ratio.',
      },
      notes: ['Same idea, but the analogy uses a world Kofi knows.', 'It gives him a picture to reason with.', 'But it is not the full story.'],
    },
    {
      kind: 'text',
      html: '<p>Analogies are a shortcut into a new idea. But here\'s the catch: <strong>every analogy breaks somewhere.</strong> Football players don\'t turn into something new when they join a team, and atoms do rearrange into new substances.</p><p>So after any analogy, ask the AI one more question:</p><p><em>"Where does this analogy break? What does it get wrong about the real thing?"</em></p><p>This does two things. It stops you carrying a wrong idea into the exam. And explaining the difference between the analogy and the real thing is itself a deep way of understanding the topic.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Use the analogy to get in. Then ask where it breaks, so you don\'t get stuck in it.',
    },
    {
      kind: 'check',
      question: 'After an analogy clicks, what should you ask next?',
      options: ['"Give me another analogy"', '"Where does this analogy break?"', '"Make it longer"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi uses analogies without getting trapped by them.',
    items: [
      {
        kind: 'tapBuild',
        prompt: 'Build the follow-up after an analogy.',
        tiles: ['Where', 'does', 'this', 'analogy', 'break?'],
        distractors: ['perfectly', 'always'],
      },
      {
        kind: 'mcq',
        prompt: 'Where does the football analogy for 2H₂ + O₂ → 2H₂O break?',
        options: [
          { text: 'It does not break anywhere', why: 'Every analogy breaks somewhere.' },
          { text: 'Football has two teams', why: 'True, but that is not the important difference.' },
          { text: 'Players stay players, but atoms rearrange into a new substance' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '2H₂ + O₂ → 2H₂O. If you use 4 moles of H₂, how many moles of O₂ do you need?',
        answers: ['2', 'two'],
        placeholder: 'Number',
        explanation: 'The ratio is 2 H₂ : 1 O₂. Double the H₂, double the O₂.',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'The AI said electric current is like water in a pipe. Now I think electricity leaks out if you cut a wire.',
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Ask it where the water analogy breaks. That leaking idea is exactly where.' },
          { text: 'Then electricity does leak.', why: 'That is the analogy breaking, not physics.' },
          { text: 'Stop using analogies.', why: 'They help. You just need to know their limits.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good analogy request, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Explain mole ratios with a football team', group: 0 },
          { text: 'Explain it with an analogy', group: 1 },
          { text: 'Use cooking, I cook at home a lot', group: 0 },
          { text: 'Use an analogy from rocket science', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the analogy to the idea.',
        pairs: [
          ['A dozen eggs', 'A mole is a fixed number of things'],
          ['A recipe', 'A balanced equation'],
          ['Running out of tomatoes', 'Limiting reagent'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi plays football every day. Which request is best?',
        options: [
          { text: 'Explain mole ratios with any analogy.', why: '"Any" might be from a world he doesn\'t know.' },
          { text: 'Explain mole ratios with three analogies at once.', why: 'One good analogy, then its limits.' },
          { text: 'Explain mole ratios with a football analogy, then tell me where the analogy breaks.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: "Which line in Clinton's notes is the analogy breaking?",
        lines: ['A mole is like a dozen: a fixed number.', 'A dozen is 12, a mole is 6.022 × 10²³.', 'So a mole of anything weighs the same, like a dozen of anything.'],
        bug: 2,
        fix: 'A mole of different things weighs different amounts, like a dozen eggs vs a dozen grapes.',
        explanation: 'A dozen eggs and a dozen grapes weigh different amounts too. Same count, different mass.',
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's tip.",
        template: 'Use the analogy to get [[1]]. Then ask where it [[2]].',
        blanks: [['in'], ['breaks']],
        distractors: ['out', 'shines'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the analogy routine in order.',
        lines: ['Ask for an analogy from your world', 'Use it to get the idea', 'Ask where it breaks', 'Learn the real idea in proper terms'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an analogy a teacher once gave you. Where does it break?',
    starters: ['The analogy was...', 'It breaks because...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask for an analogy for a hard topic from something you love, then ask where it breaks. Write both in your notes.',
  },
  notes: 'Analogy limits: standard teaching point. Water-pipe analogy for current is widely used and widely critiqued.',
};

export default lesson;
