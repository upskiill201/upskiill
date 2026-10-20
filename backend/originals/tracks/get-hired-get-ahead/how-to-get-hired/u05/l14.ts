import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 14 — deciding between two offers. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Choosing between two',
  summary: 'Njangi Pay: 315,000, a team, Ngozi, a review after probation, a 50-minute commute. Kmer: 280,000, Mr Tamba, the only developer, a 20-minute walk. Both are good. Clinton has two days. Here\'s how he decides.',
  minutes: 12,
  outcomes: ['Use a simple method to choose between offers', 'Weigh what matters most to you', 'Check the decision with your gut and with people you trust'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a decision',
      steps: [
        { title: '1. Pick your top three priorities', body: 'Clinton\'s: learning from experienced developers, building payment tools, enough money to help his mum.' },
        { title: '2. Score each offer on those three', body: 'Learning: Njangi 5, Kmer 2. Payments: Njangi 5, Kmer 3. Money: Njangi 4, Kmer 3. The total isn\'t magic, but it shows a clear pattern.' },
        { title: '3. Do the gut check', body: 'Imagine phoning to accept each one. Which call feels like relief? Which feels like a loss? Clinton feels relief at Njangi, and sadness about leaving Mr Tamba, which is not the same as wanting Kmer.' },
        { title: '4. Talk to one or two people', body: 'Miracle and Mrs Ewane. Not to decide for him, but to spot anything he\'s missed. Miracle asks: "Would you regret not learning from a team in your first job?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Top three priorities. Score them. Gut check. Talk to one or two people. Then decide and don\'t look back too hard.',
    },
  ],
  apply: {
    scenario: 'Clinton chooses between Njangi Pay and Kmer.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Pick your top three priorities', 'Score each offer', 'Do the gut check', 'Talk to one or two people'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the gut check?',
        options: [
          { text: 'Imagine accepting each offer, and notice relief or loss' },
          { text: 'Toss a coin', why: 'Imagine accepting each, and notice your reaction.' },
          { text: 'Ask the internet', why: 'It\'s about your own reaction.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Better at Njangi Pay or Kmer, for Clinton\'s priorities?',
        groups: ['Njangi Pay', 'Kmer'],
        items: [
          { text: 'Learning from a team', group: 0 },
          { text: 'A shorter commute', group: 1 },
          { text: 'Building payment tools', group: 0 },
          { text: 'Knowing the boss well', group: 1 },
          { text: 'Higher salary', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the confusion in Clinton\'s gut check.',
        lines: ['Accepting Njangi feels like relief.', 'Feeling sad about Mr Tamba means I must choose Kmer.', 'Leaving someone kind can still be the right choice.'],
        bug: 1,
        explanation: 'Sadness about leaving isn\'t the same as wanting to stay.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Would you regret not learning from a team in your first job?',
        options: [
          { text: 'Yes, I think I would. That\'s my top priority right now.' },
          { text: 'Just tell me what to choose.', why: 'She helps him think; he decides.' },
          { text: 'I\'ll pick whichever is easier to say yes to.', why: 'Use your priorities.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each priority to its scores (Njangi Pay vs Kmer).',
        pairs: [
          ['Learning', '5 vs 2'],
          ['Payments work', '5 vs 3'],
          ['Money', '4 vs 3'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why talk to one or two people?',
        options: [
          { text: 'To spot anything he\'s missed, not to decide for him' },
          { text: 'So they decide', why: 'He decides.' },
          { text: 'To get as many opinions as possible', why: 'One or two trusted people.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the method.',
        template: 'Top three [[1]]. Score them. [[2]] check.',
        blanks: [['priorities'], ['Gut']],
        distractors: ['salaries', 'Coin', 'Friend'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many priorities does Clinton pick? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good priority for a first job, or a weak one?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Learning from experienced people', group: 0 },
          { text: 'Which logo looks cooler', group: 1 },
          { text: 'Work you care about', group: 0 },
          { text: 'Which offer my rival wanted', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would your top three priorities be for your next job right now?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick a decision you\'re facing. Write your top three priorities, score each option, then do the gut check.',
  },
  notes: 'Simple weighted-choice method plus a gut check; not a formula. Scores are Clinton\'s, not objective.',
};

export default lesson;
