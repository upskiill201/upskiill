import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Card deck: the "very disappointed" test. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The "very disappointed" test',
  summary: 'Miracle suggests one survey question that many startups use to check whether they\'ve built something people really need: "How would you feel if you could no longer use WashDay?"',
  minutes: 12,
  outcomes: [
    'Run the "very disappointed" survey',
    'Work out the score and compare it to 40%',
    'Learn from the people who\'d be very disappointed',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Ask customers who have actually used the service one question:</p><p><strong>"How would you feel if you could no longer use WashDay?"</strong></p><ul><li>Very disappointed</li><li>Somewhat disappointed</li><li>Not disappointed</li></ul><p>Marketer Sean Ellis used this question with many startups and found a rule of thumb: when <strong>40% or more</strong> answer "very disappointed", the product usually has real pull.</p><p>Clinton sends it to all 30 customers. 20 reply:</p><ul><li>Very disappointed: <strong>9</strong></li><li>Somewhat disappointed: <strong>8</strong></li><li>Not disappointed: <strong>3</strong></li></ul><p>9 of 20 is <strong>45%</strong>: above 40%. And the follow-up question is gold: "What\'s the main benefit you get?" The "very disappointed" group mostly says the same thing: <em>"I get my Saturday back."</em> That\'s the message for every future post.</p><p>It\'s a rule of thumb, not a law, and 20 replies is small. But it\'s one more signal pointing the same way.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The people who\'d be very disappointed are your core customers. Build for them, and use their words.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s survey.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '9 of 20 said "very disappointed". What percentage is that?',
        answers: ['45', '45%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does 45% "very disappointed" suggest?',
        options: [
          { text: 'Below 40%: no pull', why: '45 is above 40.' },
          { text: 'Proof the business will succeed', why: 'It\'s a signal, not proof.' },
          { text: 'Above the 40% rule of thumb: a sign of real pull' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the answer to the count.',
        pairs: [
          ['Very disappointed', '9'],
          ['Somewhat disappointed', '8'],
          ['Not disappointed', '3'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good practice for this survey, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Ask people who have used the service', group: 0 },
          { text: 'Ask people who have never tried it', group: 1 },
          { text: 'Ask what the main benefit is', group: 0 },
          { text: 'Count only the happiest answers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Only 9 people said very disappointed. That\'s not many.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'You\'re right, quit.', why: '45% is a good score.' },
          { text: 'It\'s 45% of everyone who replied, above the 40% line. And all 9 told you the same benefit: their Saturday. That\'s your message.' },
          { text: 'Survey again until it\'s 100%.', why: 'Re-asking until you like the result is cheating.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'How would you [[1]] if you could no longer [[2]] WashDay?',
        blanks: [['feel'], ['use']],
        distractors: ['pay', 'rate'],
      },
      {
        kind: 'mcq',
        prompt: 'What did the "very disappointed" group mostly say was the main benefit?',
        options: [
          { text: '"It\'s cheap"', why: 'Price wasn\'t their main point.' },
          { text: '"Nice bags"', why: 'They talked about time.' },
          { text: '"I get my Saturday back"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s survey report is wrong?',
        lines: [
          'Asked 30 customers; 20 replied.',
          'Very disappointed: 9 (45%).',
          'Not disappointed: 3.',
          'So 45% of all 30 customers would be very disappointed.',
        ],
        bug: 3,
        fix: '45% of the 20 who replied; 9 of 30 overall.',
        explanation: 'The percentage is of replies, not of everyone asked.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of 20 replies, 9 very and 8 somewhat disappointed. How many said "not disappointed"?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the survey steps.',
        lines: ['Send the question to people who used it', 'Count very / somewhat / not disappointed', 'Compare "very" with 40%', 'Read what the "very" group says the benefit is'],
      },
    ],
  },
  reflect: {
    prompt: 'If your idea existed, who would be "very disappointed" to lose it? What benefit would they name?',
    starters: ['They\'d be...', 'The benefit they\'d name is...'],
  },
  deepen: {
    title: 'Product-market fit',
    summary: 'The 40% rule is one way to estimate product-market fit: whether something satisfies a real market strongly. Repeat use, referrals and this survey together give a better picture than any one alone.',
  },
  notes: 'Sean Ellis\'s product-market fit survey ("How would you feel if you could no longer use...?"; 40% "very disappointed" benchmark). He recommends surveying people who have used the product recently. Fictional results: 20 replies of 30 asked; 9 very (45%), 8 somewhat, 3 not.',
};

export default lesson;
