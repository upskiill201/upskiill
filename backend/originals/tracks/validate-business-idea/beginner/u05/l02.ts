import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: finding customers 11 to 30. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Finding the next customers',
  summary: 'Clinton\'s first customers came from three group posts. To keep testing, he needs more, without spending money on ads. Miracle gives him five steps that cost almost nothing.',
  minutes: 12,
  outcomes: [
    'Find early customers without paid ads',
    'Use happy customers to find more',
    'Track where each customer came from',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five free ways to find customers',
      steps: [
        { title: '1. Go where the problem happens', body: 'Saturday mornings in the hostel washing areas, and outside Mama Rose\'s stand when she has to turn people away. People with wet laundry in their hands don\'t need convincing.' },
        { title: '2. Ask happy customers for one name', body: '"Who else in your hostel loses their Saturday to laundry?" Brenda gives three names; two book.' },
        { title: '3. Work with gatekeepers', body: 'Hostel caretakers and WhatsApp group admins decide what gets seen. Clinton offers one free bag to each caretaker who shares the post.' },
        { title: '4. Make the offer easy to pass on', body: 'One short message with the price, the pickup time and how to pay. If a customer can forward it in one tap, they will.' },
        { title: '5. Track where every customer came from', body: 'Next to each name: group post, referral, washing area, Mama Rose\'s stand. After a few weekends, you know which way works best.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Your first customers are your best salespeople. Ask each happy one for one name.',
    },
  ],
  apply: {
    scenario: 'More customers, no ads.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Go where the problem happens', 'Ask happy customers for one name', 'Work with gatekeepers', 'Make the offer easy to pass on', 'Track where each customer came from'],
      },
      {
        kind: 'mcq',
        prompt: 'Why stand near the hostel washing areas on Saturday morning?',
        options: [
          { text: 'People are living the problem right then' },
          { text: 'It\'s the quietest place', why: 'It\'s where the pain is.' },
          { text: 'To check Mama Rose\'s prices', why: 'He knows them already.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Free way to find customers, or costs money?',
        groups: ['Free or almost free', 'Costs money'],
        items: [
          { text: 'Asking Brenda for names', group: 0 },
          { text: 'Radio advertising', group: 1 },
          { text: 'A forwardable WhatsApp message', group: 0 },
          { text: 'Paid social media ads', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brenda gives three names and two of them book. How many new customers is that?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I spend 20,000 FCFA on social media ads to get more customers?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Not yet. Free ways still work, and you\'re near Mama Rose\'s 25-bag limit anyway. Fix capacity first.' },
          { text: 'Yes, ads always work.', why: 'He can\'t serve many more yet.' },
          { text: 'Never advertise, ever.', why: 'Ads can make sense later.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the gatekeeper to what they control.',
        pairs: [
          ['Hostel caretaker', 'Who sees notices in the hostel'],
          ['Group admin', 'What gets posted in the chat'],
          ['Mama Rose', 'Students she has to turn away'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The referral question.',
        template: '"Who else in your [[1]] loses their [[2]] to laundry?"',
        blanks: [['hostel'], ['Saturday']],
        distractors: ['family', 'money'],
      },
      {
        kind: 'mcq',
        prompt: 'Why track where each customer came from?',
        options: [
          { text: 'To learn which way of finding customers works best' },
          { text: 'To charge some people more', why: 'It\'s about learning, not pricing.' },
          { text: 'It isn\'t useful', why: 'It shows where to spend effort.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s offer message makes it hard to pass on?',
        lines: [
          'WashDay: laundry pickup from your hostel room.',
          '1,500 FCFA a bag, picked up Saturday from 9 a.m.',
          'For details, come and find me at the library sometime.',
          'Pay on Mobile Money to book.',
        ],
        bug: 2,
        fix: 'Book: send "WASH" on WhatsApp to this number.',
        explanation: 'An easy-to-forward message needs a one-step way to book.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which source did this customer come from?',
        groups: ['Referral', 'Washing area', 'Group post'],
        items: [
          { text: 'Brenda\'s roommate', group: 0 },
          { text: 'Met him wringing jeans on Saturday', group: 1 },
          { text: 'Saw the post in the hostel chat', group: 2 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where does your idea\'s problem happen? Name one place and one gatekeeper who could help you find customers.',
    starters: ['The problem happens at...', 'A gatekeeper is...'],
  },
  deepen: {
    title: 'Word of mouth',
    summary: 'Early on, personal recommendations are often the best channel: trusted, free and targeted. If nobody recommends you, that\'s evidence too.',
  },
  notes: 'Customer-finding steps are this course\'s teaching device. Fictional: Brenda refers 3, 2 book; one free bag offered to caretakers who share the post.',
};

export default lesson;
