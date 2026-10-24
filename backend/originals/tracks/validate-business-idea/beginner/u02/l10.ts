import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: find the real problem. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: find the real problem',
  summary: 'Miracle asks Clinton to send five of his interview notes so she can check his thinking. Read them as she would: tag them, count them, and say what the real problem is. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Read interview notes like an investor', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Five pages from Clinton\'s notebook',
      html: '<p><strong>1. Ama</strong> (first-year, hostel, washes by hand): "Lost my whole Saturday again. Three hours. My jeans were still wet on Monday." Paid Mama Rose 2,400 FCFA during exams. "I\'m broke till month end."</p><p><strong>2. Joseph</strong> (second-year, hostel): Irons shirts to dry them. "I\'d use a pickup service, sounds cool."</p><p><strong>3. Brenda</strong> (first-year, hostel): Pays Mama Rose twice a month. "She\'s good but slow: three days, and I have to carry the basket up the hill."</p><p><strong>4. Kevin</strong> (third-year, lives at home): "Laundry? My mum does it." Spends nothing.</p><p><strong>5. Esther</strong> (first-year, hostel): Bought extra underwear "so I only wash every two weeks." Asked: "If someone collected it from my room, how much would it be?"</p>',
    },
    {
      kind: 'story',
      title: 'Miracle reads them',
      beats: [
        { speaker: 'miracle', text: 'Good notes. Real words, real numbers. Now: who has the problem, what do they already do, and what\'s the strongest sign in here?' },
        { speaker: 'tey', text: 'That\'s Chapter 2: ask about yesterday, listen instead of pitching, find what they already spend, keep honest notes. Chapter 3: how many people like Ama, Brenda and Esther are there?' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: find the real problem.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In one sentence, what is the real problem?',
        options: [
          { text: 'Students are hungry at night', why: 'That was CampusEats; the notes say laundry.' },
          { text: 'Students hate their mums doing laundry', why: 'Only Kevin mentions his mum, and he has no problem.' },
          { text: 'Hostel students lose hours to laundry in rainy season, and paying Mama Rose is too slow or costly to do every week' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Has the problem, or doesn\'t?',
        groups: ['Has the problem', 'Doesn\'t'],
        items: [
          { text: 'Ama', group: 0 },
          { text: 'Brenda', group: 0 },
          { text: 'Kevin', group: 1 },
          { text: 'Esther', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each student to their best line of evidence.',
        pairs: [
          ['Ama', 'Three hours, jeans wet till Monday'],
          ['Brenda', 'Pays twice a month, wants faster'],
          ['Esther', 'Bought extra underwear to wash less'],
          ['Joseph', '"Sounds cool" (only an opinion)'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the five students have paid Mama Rose?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Joseph said he\'d use a pickup service. That\'s my strongest evidence, right?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, he said he\'d use it.', why: 'Future opinions are the weakest evidence.' },
          { text: 'That\'s an opinion. Your strongest is Brenda: she already pays twice a month and told you exactly what\'s wrong with the current option.' },
          { text: 'Kevin is your strongest.', why: 'Kevin doesn\'t have the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Which line is a buying signal, not just a complaint?',
        options: [
          { text: 'Esther asking "how much would it be?" for collection from her room' },
          { text: 'Kevin saying his mum does it', why: 'That\'s a sign he isn\'t a customer.' },
          { text: 'Joseph saying it sounds cool', why: 'A compliment, not a signal.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s summary to Miracle is wrong?',
        lines: [
          '4 of 5 have the laundry problem; Kevin lives at home.',
          'Brenda and Ama have paid Mama Rose.',
          'Brenda\'s complaints: three days, carrying the basket uphill.',
          'Joseph\'s opinion proves students will pay me.',
        ],
        bug: 3,
        fix: 'Joseph only gave an opinion; payment is still untested.',
        explanation: 'An opinion can\'t prove payment.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Brenda\'s complaints about Mama Rose.',
        template: 'Too [[1]] (three days), and she has to [[2]] the basket up the hill.',
        blanks: [['slow'], ['carry']],
        distractors: ['cheap', 'wash'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tag the line.',
        groups: ['FACT', 'OPINION', 'DOUBT'],
        items: [
          { text: 'Ama paid 2,400 FCFA during exams', group: 0 },
          { text: '"Sounds cool"', group: 1 },
          { text: '"I\'m broke till month end"', group: 2 },
          { text: 'Esther bought extra underwear', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order these from strongest to weakest evidence.',
        lines: ['Brenda pays twice a month', 'Esther changed what she buys to wash less', 'Ama lost three hours on Saturday', 'Joseph says it sounds cool'],
      },
      {
        kind: 'mcq',
        prompt: 'What two things does Brenda tell Clinton a better service must do?',
        options: [
          { text: 'Be cheaper than free, and add food', why: 'She didn\'t say either.' },
          { text: 'Be faster than three days, and collect so she doesn\'t carry the basket' },
          { text: 'Nothing; she\'s happy', why: 'She named two clear frustrations.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which student lives at home and isn\'t a likely customer?',
        answers: ['Kevin', 'kevin'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Read your own interview notes the way Miracle did: who has the problem, what do they already spend, and what\'s your strongest piece of evidence?',
    starters: ['The people with the problem are...', 'My strongest evidence is...'],
  },
  notes: 'Chapter 2 challenge. Fictional notes for five students (Ama, Joseph, Brenda, Kevin, Esther); 4 of 5 have the problem, 2 have paid Mama Rose, Esther shows a buying signal, Brenda names two frustrations (slow, carrying the basket).',
};

export default lesson;
