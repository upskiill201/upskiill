import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Reading: your alternative (BATNA), worked out honestly. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your alternative: BATNA',
  summary: 'Ada finds a flat near work for ₦1,350,000. Cheaper! She\'s about to walk out on Mr Adeyemi. Then Lucía makes her add up what moving really costs over two years.',
  minutes: 12,
  outcomes: [
    'Know what a BATNA is and why it gives you power',
    'Work out your alternative\'s real cost',
    'Set your walk-away from your BATNA',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The best alternative',
      html: '<p>In <em>Getting to Yes</em>, Roger Fisher and William Ury named the most important thing to know before any negotiation: your <strong>BATNA</strong>, the <strong>B</strong>est <strong>A</strong>lternative <strong>T</strong>o a <strong>N</strong>egotiated <strong>A</strong>greement. It\'s what you\'ll actually do if you don\'t agree.</p><p>Your BATNA is your power. The better it is, the less you need this deal. But you have to cost it honestly.</p><table><tr><th>Over two years</th><th>Stay at ₦1,500,000</th><th>Move to the new flat</th></tr><tr><td>Rent, year 1</td><td>₦1,500,000</td><td>₦1,350,000</td></tr><tr><td>Rent, year 2</td><td>₦1,500,000</td><td>₦1,350,000</td></tr><tr><td>Agent, legal fees and moving</td><td>₦0</td><td>₦200,000</td></tr><tr><td><strong>Total</strong></td><td><strong>₦3,000,000</strong></td><td><strong>₦2,900,000</strong></td></tr></table><p>Moving saves only ₦100,000 over two years, plus a stressful week. So Ada\'s walk-away is about <strong>₦1,450,000 a year</strong> (₦2,900,000 ÷ 2). Below that, staying is better. Above it, she moves.</p><p>The new flat is a real option, which gives her confidence. But it\'s not as good as it first looked.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Know your BATNA, what you\'ll do if there\'s no deal, and cost it honestly. Your walk-away comes from it.',
    },
  ],
  apply: {
    scenario: 'Costing the new flat.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'What does BATNA stand for? Type the first word.',
        answers: ['best', 'Best'],
        placeholder: 'One word',
      },
      {
        kind: 'typeAnswer',
        prompt: 'New flat: ₦1,350,000 × 2 years + ₦200,000 fees. Total, in naira?',
        answers: ['2900000', '2,900,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Over two years, how much does moving save compared with staying at ₦1,500,000?',
        options: [
          { text: '₦100,000' },
          { text: '₦300,000', why: 'That forgets the ₦200,000 in fees.' },
          { text: '₦150,000', why: 'That\'s one year\'s rent gap.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the new flat\'s real cost, or not?',
        groups: ['Real cost', 'Not a cost'],
        items: [
          { text: 'Agent and legal fees', group: 0 },
          { text: 'Hiring a van', group: 0 },
          { text: 'The view from the window', group: 1 },
          { text: 'Two years of rent', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So should I tell Mr Adeyemi about the new flat?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'You can mention you\'ve looked around, calmly and truthfully. Don\'t use it as a threat, and don\'t exaggerate it.' },
          { text: 'Tell him you\'re leaving tomorrow.', why: 'Untrue, and it damages trust.' },
          { text: 'Never mention it.', why: 'A real alternative, said calmly, can help.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['BATNA', 'What you\'ll do if there\'s no deal'],
          ['Walk-away', 'The worst deal you\'ll accept'],
          ['Goal', 'The result you aim for'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Where power comes from.',
        template: 'The better your [[1]], the less you [[2]] this deal.',
        blanks: [['BATNA', 'alternative'], ['need']],
        distractors: ['goal', 'fear'],
      },
      {
        kind: 'typeAnswer',
        prompt: '₦2,900,000 over two years. What\'s that per year, in naira?',
        answers: ['1450000', '1,450,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Mr Adeyemi offers ₦1,480,000. What should Ada do, based on her walk-away?',
        options: [
          { text: 'It\'s above her walk-away, so moving is better unless he improves it' },
          { text: 'Accept, it\'s below ₦1,500,000', why: 'Below his ask, but above her walk-away.' },
          { text: 'Walk out angrily', why: 'Say calmly that it doesn\'t work yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s BATNA working is wrong?',
        lines: [
          'New flat rent: ₦1,350,000 a year.',
          'Two years: ₦2,700,000.',
          'Moving costs: nothing really.',
          'Walk-away: about ₦1,450,000 a year.',
        ],
        bug: 2,
        fix: 'Moving costs: about ₦200,000.',
        explanation: 'Leaving out costs makes a BATNA look better than it is.',
      },
    ],
  },
  reflect: {
    prompt: 'For your own negotiation: what will you really do if there\'s no deal? What would it cost?',
    starters: ['If there\'s no deal, I will...', 'That would cost...'],
  },
  deepen: {
    title: 'Improve your BATNA',
    summary: 'You can make your BATNA stronger before you negotiate: get another quote, apply for another job, look at more flats. A better BATNA makes you calmer and harder to push.',
  },
  notes: 'BATNA: Fisher, Ury & Patton, Getting to Yes (1981/2011). Fictional: stay at ₦1,500,000 × 2 = ₦3,000,000; move ₦1,350,000 × 2 + ₦200,000 = ₦2,900,000 → walk-away ≈ ₦1,450,000/yr.',
};

export default lesson;
