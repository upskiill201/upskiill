import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Explain cards: finding a fair number. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Finding a fair number',
  summary: 'Ada\'s ₦1,300,000 needs to be more than a wish. She collects real prices for flats on her street, and does the same for her salary before the review.',
  minutes: 12,
  outcomes: [
    'Gather evidence for a fair number',
    'Use a range from real examples',
    'Prepare evidence for a salary conversation',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A number with evidence behind it is hard to dismiss. Ada collects some:</p><table><tr><th>Similar 1-bed flats nearby</th><th>Rent a year</th></tr><tr><td>Two streets away (listing)</td><td>₦1,300,000</td></tr><tr><td>Same estate, newer (agent)</td><td>₦1,450,000</td></tr><tr><td>Her neighbour, renewed last month</td><td>₦1,350,000</td></tr></table><p>The market range is about <strong>₦1,300,000 to ₦1,450,000</strong>. ₦1,500,000 is above all of them. ₦1,300,000 is at the bottom: ambitious, but she can defend it.</p><p>For her salary review, Ada does the same. She asks two designer friends, checks three job posts and asks a recruiter. Junior product designers at similar Lagos startups get roughly <strong>₦400,000 to ₦550,000</strong> a month. She earns ₦350,000.</p><p>Good evidence is recent, similar and from more than one source.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Back your number with evidence: recent, similar examples from more than one source.',
    },
  ],
  apply: {
    scenario: 'Ada\'s evidence.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What range do Ada\'s three flat examples give?',
        options: [
          { text: '₦1,300,000 to ₦1,450,000' },
          { text: '₦1,200,000 to ₦1,500,000', why: 'Those are her old rent and his ask.' },
          { text: '₦1,350,000 only', why: 'That\'s one example.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good evidence or weak evidence?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Neighbour\'s renewal last month', group: 0 },
          { text: 'A flat in another city', group: 1 },
          { text: 'Current listing two streets away', group: 0 },
          { text: 'What rent was in 2019', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada earns ₦350,000. The bottom of the salary range is ₦400,000. How far below is she, in naira a month?',
        answers: ['50000', '50,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to what it gives Ada.',
        pairs: [
          ['Listings', 'Asking prices nearby'],
          ['Neighbour', 'A real renewal price'],
          ['Recruiter', 'Salary ranges for her role'],
          ['Job posts', 'What employers offer'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I say "my friend earns ₦500,000" in my review?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Don\'t name a friend\'s pay. Say "From what I\'ve seen, similar roles in Lagos pay ₦400,000 to ₦550,000."' },
          { text: 'Yes, name her and her salary.', why: 'That shares private information and starts comparisons.' },
          { text: 'Don\'t mention the market at all.', why: 'A market range is strong evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Good evidence.',
        template: 'Recent, [[1]], and from more than one [[2]].',
        blanks: [['similar'], ['source']],
        distractors: ['secret', 'rumour'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is ₦1,300,000 a good goal, not an unfair one?',
        options: [
          { text: 'Real flats nearby rent for that, so she can defend it' },
          { text: 'It\'s the lowest number she can think of', why: 'It\'s backed by a real listing.' },
          { text: 'It\'s exactly in the middle', why: 'It\'s at the bottom of the range: ambitious but defensible.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many flat examples did Ada collect?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s salary evidence is weak?',
        lines: [
          'Two designer friends at similar startups.',
          'Three current job posts in Lagos.',
          'A designer in London earns £3,000 a month.',
          'A recruiter\'s range for junior roles.',
        ],
        bug: 2,
        fix: 'Delete it: a different city and market.',
        explanation: 'Evidence must be similar.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build a fair number.',
        lines: ['Collect recent, similar examples', 'Find the range', 'Pick an ambitious but defensible goal', 'Prepare to explain it'],
      },
    ],
  },
  reflect: {
    prompt: 'For your negotiation, where could you find three recent, similar examples?',
    starters: ['I could check...', 'The range might be...'],
  },
  deepen: {
    title: 'Fair standards',
    summary: 'Using outside standards, such as market prices, published ranges or what others paid, moves the conversation from "my will against yours" to "what\'s fair". More in Chapter 4.',
  },
  notes: 'Fictional figures: flats ₦1,300,000 / ₦1,450,000 / ₦1,350,000; junior product designer range ₦400,000–₦550,000/month at similar Lagos startups (illustrative, not market data). Objective criteria: Getting to Yes, ch. 5.',
};

export default lesson;
