import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: pass or fail (the second weekend). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: pass or fail?',
  summary: 'Weekend two. Clinton writes a new pass mark, posts in five hostel groups, and runs it all by hand again. Judge the results line by line, honestly. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Judge a test against its pass mark', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Weekend two',
      html: '<p><strong>Pass mark (sent to David and Miracle on Thursday):</strong></p><ul><li>At least 15 paid bookings.</li><li>At least 5 repeat customers from weekend one.</li><li>At least 80% of bags back on time.</li></ul><p><strong>What happened:</strong> the post reached about 450 students in five hostel groups. 52 replied "interested". 19 paid. 6 of them had used WashDay the weekend before. 17 of the 19 bags came back on time; 2 were late because Clinton couldn\'t carry them all up the hill in one trip. Mama Rose washed all 19, and said: "Twenty-five is my limit, child. After that, find another washer."</p>',
    },
    {
      kind: 'story',
      title: 'Sunday night',
      beats: [
        { speaker: 'clinton', text: 'Nineteen! And six came back!' },
        { speaker: 'david', text: 'Check every line. Then tell me the two late bags, and what Mama Rose said about 25.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: test by hand, take real money, set the pass mark first, read the results honestly. Chapter 5: go on, change, or stop?' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: pass or fail?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Pass or fail?',
        groups: ['Pass', 'Fail'],
        items: [
          { text: '19 paid (needed 15)', group: 0 },
          { text: '6 repeat customers (needed 5)', group: 0 },
          { text: '17 of 19 on time (needed 80%)', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '17 of 19 bags came back on time. What percentage is that, to the nearest whole number?',
        answers: ['89', '89%', '89.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '52 said "interested" and 19 paid. About what share paid?',
        options: [
          { text: 'About 19%', why: '19 of 52 is about 37%.' },
          { text: 'About 63%', why: 'That\'s the share who didn\'t pay.' },
          { text: 'About 37%' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it means.',
        pairs: [
          ['450', 'Saw the post'],
          ['52', 'Said "interested"'],
          ['19', 'Paid'],
          ['6', 'Came back from weekend one'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Everything passed. Next weekend I\'ll post in ten groups and aim for 50 bags!',
        prompt: "David's best reply?",
        options: [
          { text: 'Mama Rose can do 25, and two bags were late at 19 because of the hill. Fix washing and carrying before you chase 50.' },
          { text: 'Yes, 50 bags!', why: 'He\'s already near both limits.' },
          { text: 'Stop at 19 forever.', why: 'Growth is possible once the limits are solved.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What caused the two late bags?',
        options: [
          { text: 'Mama Rose was slow', why: 'She washed all 19 in time.' },
          { text: 'Customers weren\'t home', why: 'The cause was carrying capacity.' },
          { text: 'Clinton couldn\'t carry all the bags up the hill in one trip' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two limits Clinton is close to.',
        template: 'Mama Rose can wash about [[1]] bags, and one bicycle can\'t carry them all up the [[2]].',
        blanks: [['25'], ['hill']],
        distractors: ['50', 'road'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s weekend-two report isn\'t honest?',
        lines: [
          '19 paid (pass mark 15).',
          '6 repeat customers (pass mark 5).',
          'All bags on time.',
          'Mama Rose\'s limit is about 25 a Saturday.',
        ],
        bug: 2,
        fix: '17 of 19 on time; 2 late because of carrying.',
        explanation: 'Two bags were late; leaving them out hides a real limit.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Clinton\'s weekend two, the way Chapter 4 teaches.',
        lines: ['Write the new pass mark', 'Send it to David and Miracle', 'Post and take payments', 'Collect and return by hand', 'Compare results line by line'],
      },
      {
        kind: 'typeAnswer',
        prompt: '19 bags at 1,500 FCFA. How much came in, in FCFA?',
        answers: ['28500', '28,500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does six repeat customers tell Clinton?',
        options: [
          { text: 'Proof the business will succeed', why: 'Early sign, not proof.' },
          { text: 'An early sign WashDay solves a real, repeating problem' },
          { text: 'Nothing', why: 'Coming back and paying again is strong evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What the test proved, or what it revealed as a new problem?',
        groups: ['Proved', 'New problem'],
        items: [
          { text: 'Students pay again', group: 0 },
          { text: 'Mama Rose\'s 25-bag limit', group: 1 },
          { text: 'One bike can\'t carry 19 bags in one trip', group: 1 },
          { text: 'Strangers keep booking', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Plan a second test for your idea: what would your new pass mark be, and what limit might you hit?',
    starters: ['My new pass mark is...', 'The limit I might hit is...'],
  },
  notes: 'Chapter 4 challenge (fictional weekend 2): pass mark ≥15 paid, ≥5 repeats, ≥80% on time; results ~450 reached, 52 interested, 19 paid (≈37% of interested), 6 repeats, 17/19 on time (≈89%); 28,500 FCFA in; Mama Rose limit ~25 bags per Saturday.',
};

export default lesson;
