import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: the emergency rules. Cliffhanger: Christmas money and beat buyers. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the emergency rules',
  summary: 'Kofi writes his emergency rules on one card for Abena, who has just started saving. Use everything from Chapter 4. Then two messages arrive in one evening: an uncle sends GH₵300 for Christmas, and three rappers ask for beats.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write emergency rules for yourself or someone else', 'Use the test, refilling, sizing and lending rules together'],
  learn: [
    {
      kind: 'story',
      title: 'Two messages',
      beats: [
        { speaker: 'efua', text: 'Abena wants your emergency rules. On one card. She says your laptop jar is famous now.' },
        { speaker: 'kofi', text: 'One card. Okay.' },
        { speaker: 'narrator', text: 'That evening, two messages, ten minutes apart.' },
        { speaker: 'narrator', text: 'Uncle Kwesi in Takoradi: "Merry Christmas, my nephew. GH₵300 sent. Buy yourself something nice."' },
        { speaker: 'narrator', text: 'Then the hall rapper\'s group chat: "Kofi, three of us need beats before the inter-hall showcase. Can you do them?"' },
        { speaker: 'kofi', text: 'GH₵300. Three beats. Four weeks. GH₵1,520 gap.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: the test, the fund, the refill, borrowing well, lending carefully, and expecting the unexpected. Chapter 5: the last four weeks. A windfall, a chance to earn more, and the laptop.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Abena\'s emergency rules card.',
    items: [
      {
        kind: 'fillBlank',
        prompt: 'Rule 1, the test.',
        template: 'An emergency is urgent, [[1]] and [[2]].',
        blanks: [['necessary'], ['unexpected']],
        distractors: ['fun', 'cheap'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Abena\'s week. Emergency fund, sinking fund, or neither?',
        groups: ['Emergency fund', 'Sinking fund', 'Neither'],
        items: [
          { text: 'Glasses broken, can\'t read the board', group: 0 },
          { text: 'Hall dues next month', group: 1 },
          { text: 'Shoes on a flash sale', group: 2 },
          { text: 'Clinic visit for a fever', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Abena has GH₵1,200 a month and no one depending on her. What\'s a good first fund target?',
        options: [
          { text: 'One typical surprise, about GH₵300' },
          { text: 'Six months of costs', why: 'A great long-term goal, but too far for a start.' },
          { text: 'Nothing; she\'s young', why: 'Young people have emergencies too, as Kofi found.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Abena uses GH₵150 of her GH₵300 fund. She refills at GH₵50 a week. How many weeks?',
        answers: ['3', 'three', '3 weeks'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Abena\'s friend wants to borrow GH₵200 from her fund. Thoughts?',
        prompt: 'Kofi\'s best advice for the card?',
        options: [
          { text: 'Sure, friends first.', why: 'Then Abena\'s own emergency has nowhere to go.' },
          { text: 'Never help friends.', why: 'Help from spare money, or in other ways, is fine.' },
          { text: 'The fund is for her own emergencies. Lend only what she could afford to lose, from spare money.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rules card for when an emergency hits.',
        lines: ['Health and safety first', 'Check the three questions', 'Pay from the emergency fund', 'Refill: amount and end date', 'Ask if the target should grow'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the rule.',
        pairs: [
          ['No fund, real emergency', 'Payment plan, family, school support'],
          ['Fund used', 'Refill first'],
          ['Fund barely covered it', 'Raise the target later'],
          ['Friend wants a loan', 'Only what you could lose'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Abena\'s draft card. Which rule is wrong?',
        lines: [
          'Use the fund only for real emergencies.',
          'Refill it as soon as it\'s used.',
          'Keep it locked so I can\'t reach it for a year.',
          'Never lend it out.',
        ],
        bug: 2,
        fix: 'Keep it separate and reachable within a day.',
        explanation: 'Emergencies don\'t wait a year.',
      },
      {
        kind: 'mcq',
        prompt: 'Uncle Kwesi\'s GH₵300 is a windfall. What does Kofi\'s split rule from Budgeting say?',
        options: [
          { text: 'Spend it all: it\'s a gift', why: 'Gifts are real money. The rule gives part to enjoy.' },
          { text: 'Give it jobs straight away: most to the goal, some to enjoy' },
          { text: 'Put it all in the emergency fund', why: 'The fund is already full again.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s gap is GH₵1,520. If GH₵200 of the Christmas money goes to the jar, what\'s the new gap?',
        answers: ['1320', '1,320', 'GH₵1,320', 'GH₵1320'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 in one line.',
        template: 'Not fewer emergencies, fewer [[1]]: pay from the [[2]], then [[3]] it.',
        blanks: [['crises'], ['fund'], ['refill']],
        distractors: ['loans', 'jar'],
      },
      {
        kind: 'mcq',
        prompt: 'Three beat requests with four weeks left. What could that mean for the gap?',
        options: [
          { text: 'Extra income that could close a big part of it' },
          { text: 'Nothing; beat money doesn\'t count', why: 'It\'s real income. The split rule gives it jobs.' },
          { text: 'He should say no and rest', why: 'Rest matters. But paid work that fits could close the gap.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own emergency rules card: the test, where the money comes from, how you\'ll refill, and your lending rule.',
    starters: ['My test:...', 'I pay from...', 'I refill by...', 'I lend only...'],
  },
  notes: 'Chapter 4 challenge. Uncle Kwesi (narrated, Takoradi) sends GH₵300 (200 to jar in Ch5). Three beat requests (Ch5 earns ~450 extra). Gap 1,520 → 1,320 after Christmas money.',
};

export default lesson;
