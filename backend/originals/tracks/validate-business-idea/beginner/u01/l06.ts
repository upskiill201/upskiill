import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: compliments vs commitments. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Compliments vs commitments',
  summary: 'Clinton\'s cousin says CampusEats is "the best idea ever" and she\'d "definitely use it". Miracle asks what she gave up to say that. Time? Money? Nothing.',
  minutes: 11,
  outcomes: [
    'Tell a compliment from a commitment',
    'Rank signals from weakest to strongest',
    'Ask for a small commitment instead of an opinion',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'What people say vs what they give',
      before: {
        label: 'Compliments and opinions',
        text: '"Best idea ever!"\n"I\'d definitely use it."\n"You should totally do this."\nThey cost nothing to give, so they prove nothing.',
      },
      after: {
        label: 'Commitments',
        text: 'Time: "Let\'s meet tomorrow so you can show me."\nReputation: "I\'ll introduce you to my hostel\'s WhatsApp admin."\nMoney: "Here\'s 500 FCFA, deliver my dinner on Friday."\nEach one costs them something.',
      },
      notes: [
        'People are kind. A compliment is often just politeness.',
        'A commitment means they gave up something: time, reputation or money.',
        'The stronger the commitment, the stronger the evidence. Money is the strongest.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When someone loves your idea, ask for something small: "Can I deliver your dinner on Friday? It\'s 500 FCFA." Their answer is your evidence.',
    },
  ],
  apply: {
    scenario: 'What did it cost them?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Compliment or commitment?',
        groups: ['Compliment', 'Commitment'],
        items: [
          { text: '"Best idea ever!"', group: 0 },
          { text: 'Pays 500 FCFA for Friday\'s delivery', group: 1 },
          { text: '"I\'d definitely use it"', group: 0 },
          { text: 'Introduces you to her hostel group admin', group: 1 },
          { text: 'Books a time to try it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I\'d definitely use it" weak evidence?',
        options: [
          { text: 'It costs nothing to say, and people are often just being kind' },
          { text: 'People always lie', why: 'Mostly they\'re being polite, not lying.' },
          { text: 'It\'s strong evidence', why: 'Saying is easy; doing is the test.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the signals from weakest to strongest.',
        lines: ['A compliment', 'An opinion ("I\'d use it")', 'Their time', 'Their reputation (an introduction)', 'Their money'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the commitment to what it costs them.',
        pairs: [
          ['Meeting tomorrow to try it', 'Time'],
          ['Introducing you to friends', 'Reputation'],
          ['Paying in advance', 'Money'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My cousin said she\'d definitely use it. That\'s one customer!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Ask her to pay 500 FCFA for a delivery this Friday. If she does, that\'s a customer. If she hesitates, that\'s useful too.' },
          { text: 'Yes, count her.', why: 'An opinion isn\'t a purchase.' },
          { text: 'Family don\'t count at all.', why: 'They can still give real commitments; ask for one.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which is the strongest evidence?',
        options: [
          { text: 'Three students pay in advance for Friday deliveries' },
          { text: 'Thirty students say it\'s a great idea', why: 'Thirty compliments cost nothing.' },
          { text: 'One student shares the post', why: 'A small signal; money is stronger.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three things people can commit.',
        template: 'Time, [[1]] and [[2]].',
        blanks: [['reputation'], ['money']],
        distractors: ['likes', 'emojis'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s evidence log isn\'t evidence?',
        lines: [
          'Ama paid 500 FCFA for Friday.',
          'Joseph booked a time to try it.',
          'My cousin says it\'s the best idea ever.',
          'Brenda introduced me to her hostel admin.',
        ],
        bug: 2,
        fix: 'Ask the cousin for a commitment, then log what she does.',
        explanation: 'A compliment cost her nothing.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of commitment is the strongest evidence?',
        answers: ['money', 'payment', 'paying'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Asking for an opinion, or for a commitment?',
        groups: ['Opinion', 'Commitment'],
        items: [
          { text: '"Do you like the idea?"', group: 0 },
          { text: '"Can I deliver your dinner on Friday for 500 FCFA?"', group: 1 },
          { text: '"Would you use something like this?"', group: 0 },
          { text: '"Could you add me to your hostel group?"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who has said nice things about your idea? What small commitment could you ask them for this week?',
    starters: ['They said...', 'I could ask them to...'],
  },
  deepen: {
    title: 'Commitment currencies',
    summary: 'Rob Fitzpatrick\'s "The Mom Test" calls time, reputation and money the currencies of commitment. If a meeting ends with only compliments, you learned less than it felt like.',
  },
  notes: 'Time / reputation / money as commitment "currencies": Rob Fitzpatrick, The Mom Test (2013). Names and amounts are fictional.',
};

export default lesson;
