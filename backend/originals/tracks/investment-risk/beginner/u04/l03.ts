import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Reading: correlation. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Things that fall together',
  summary: 'Kavya proudly shows Arjun her "diversified" crypto: ten coins. Then the whole market drops in a day and all ten turn red together. Correlation, and why the number of things you own matters less than how differently they move.',
  minutes: 12,
  outcomes: [
    'Explain correlation in plain words',
    'Spot "diversification" that isn\'t',
    'Look for things that don\'t all move together',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Correlation',
      html: '<p><strong>Correlation</strong> describes how much two things tend to move together. If they usually rise and fall at the same time, they\'re highly correlated. If one often holds steady while the other falls, they\'re less correlated.</p><p><strong>Kavya\'s ten coins:</strong> one Tuesday, crypto prices drop sharply. All ten of her coins fall 20 to 35% the same day. She owned ten things, but they behaved like one.</p><p><strong>Hidden correlation is everywhere:</strong></p><ul><li>Five tech stocks often move together.</li><li>A tech job in Bengaluru, a flat in Bengaluru and shares in Bengaluru tech companies can all suffer at once if the tech industry slumps.</li><li>A shopkeeper whose savings are in her own shop\'s stock depends twice on one business.</li></ul><p><strong>What helps:</strong> mixing things that respond differently to events. Broad shares across many industries, some bonds, some cash, some exposure beyond one country. They won\'t always move apart, but they move apart more often than ten coins do.</p><p><strong>A warning:</strong> in a big crisis, correlations often rise. Things that usually move differently can fall together for a while. That\'s why an emergency fund and the right time horizon matter even with a good spread.</p>',
    },
    {
      kind: 'check',
      question: 'Kavya owns ten coins that all fell together. How diversified was she?',
      options: ['Very: ten is a lot', 'Barely: they\'re highly correlated', 'Perfectly'],
      answer: 1,
      explanation: 'Ten things that move together are close to one basket.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'It\'s not how many things you own; it\'s how differently they move. And in a crisis, even different things can fall together for a while.',
    },
  ],
  apply: {
    scenario: 'Kavya\'s ten coins.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "highly correlated" mean?',
        options: [
          { text: 'They\'re owned by the same person', why: 'It\'s about how they move.' },
          { text: 'They never move', why: 'It\'s about moving together.' },
          { text: 'They tend to rise and fall together' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Usually highly correlated, or less so?',
        groups: ['Highly correlated', 'Less correlated'],
        items: [
          { text: 'Ten crypto coins', group: 0 },
          { text: 'Shares and government bonds', group: 1 },
          { text: 'Five tech stocks', group: 0 },
          { text: 'Shares in India and shares abroad', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'But I own ten different coins!',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Ten coins that fall on the same Tuesday are one basket with ten labels.' },
          { text: 'That\'s perfectly diversified.', why: 'They moved together.' },
          { text: 'Buy twenty coins.', why: 'More of the same doesn\'t help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key idea.',
        template: 'It\'s not how [[1]] things you own; it\'s how [[2]] they move.',
        blanks: [['many'], ['differently']],
        distractors: ['expensive', 'fast'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each setup to its hidden correlation.',
        pairs: [
          ['Tech job, Bengaluru flat, tech shares', 'All hit by a tech slump'],
          ['Shop savings in the shop\'s stock', 'Double dependence on one business'],
          ['Ten coins', 'All follow crypto prices'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Correlations can rise in a crisis.',
          'Mixing assets that respond differently helps.',
          'Owning many things always means you\'re diversified.',
        ],
        bug: 2,
        fix: 'Owning many things that move together isn\'t diversified.',
        explanation: 'Correlation, not count, is what matters.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kavya\'s ₹1,00,000 in coins all fall 30% together. Value after?',
        answers: ['70000', '70,000', '₹70,000', '₹70000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does an emergency fund still matter with a good spread?',
        options: [
          { text: 'It doesn\'t', why: 'Correlations rise in crises.' },
          { text: 'It earns more', why: 'It protects; it doesn\'t outperform.' },
          { text: 'In a crisis, even different assets can fall together for a while' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to check whether you\'re really spread.',
        lines: ['List what you own', 'Ask what would make each fall', 'Group things that fall for the same reason', 'Add things that respond differently'],
      },
      {
        kind: 'mcq',
        prompt: 'Arjun is a tech freelancer in Bengaluru. Which would add the most diversification for him?',
        options: [
          { text: 'More tech shares', why: 'That concentrates him further.' },
          { text: 'Assets not tied to the tech industry' },
          { text: 'A Bengaluru flat', why: 'Also tied to the same city\'s tech economy.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which parts of your life (job, home, savings) depend on the same thing?',
    starters: ['My job and my... both depend on...', 'To spread that, I could...'],
  },
  deepen: {
    title: 'Correlation is a number',
    summary: 'Correlation is measured from −1 (always move opposite) to +1 (always move together). Most real assets sit somewhere in between, and the number changes over time.',
  },
  notes: 'Correlation framing general; crisis correlation increase is well documented. Kavya per CAST.',
};

export default lesson;
