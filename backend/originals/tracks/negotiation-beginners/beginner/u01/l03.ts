import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Explain cards: the cost of not asking. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The cost of not asking',
  summary: 'Ada thinks one unasked question costs nothing. Lucía does the sums with her: one salary she never negotiated, over five years. The number is not small.',
  minutes: 12,
  outcomes: [
    'Work out what not asking costs over time',
    'See why a raise grows other raises',
    'Compare the cost of asking with the cost of not asking',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Ada earns <strong>₦350,000 a month</strong>. Lucía asks: "What if you\'d asked for 7% more when you joined?"</p><table><tr><th></th><th>Didn\'t ask</th><th>Asked for 7% more</th></tr><tr><td>Monthly pay</td><td>₦350,000</td><td>₦374,500</td></tr><tr><td>Difference a month</td><td>-</td><td>₦24,500</td></tr><tr><td>Difference a year</td><td>-</td><td>₦294,000</td></tr><tr><td>Over 5 years (no extra raises)</td><td>-</td><td>₦1,470,000</td></tr></table><p>And it grows. Raises are usually a percentage of your pay. A 10% raise on ₦374,500 is bigger than a 10% raise on ₦350,000, so the gap gets wider every year.</p><p>What did asking risk? A polite "no". That\'s the trade: a few awkward seconds, against more than a million naira.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not asking is a decision too, and it has a price. Small gaps in pay grow because raises are a percentage.',
    },
  ],
  apply: {
    scenario: 'Lucía\'s sums.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '7% of ₦350,000. How much is that a month, in naira?',
        answers: ['24500', '24,500'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦24,500 a month for 12 months. How much a year, in naira?',
        answers: ['294000', '294,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the gap get wider every year?',
        options: [
          { text: 'Raises are a percentage, so a higher base gets bigger raises' },
          { text: 'It doesn\'t; it stays the same', why: 'Percentage raises make it grow.' },
          { text: 'Because of tax', why: 'It\'s about how raises are calculated.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it means.',
        pairs: [
          ['₦24,500', 'The gap each month'],
          ['₦294,000', 'The gap each year'],
          ['₦1,470,000', 'The gap over five years'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But what if I ask and they say no?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Then you\'re where you\'d be anyway, and you\'ve shown you know your value. A polite no costs a few awkward seconds.' },
          { text: 'They might fire you.', why: 'A polite, prepared ask very rarely costs a job.' },
          { text: 'Then never ask again.', why: 'One no isn\'t forever.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A cost of asking, or a cost of not asking?',
        groups: ['Cost of asking', 'Cost of not asking'],
        items: [
          { text: 'A few awkward seconds', group: 0 },
          { text: '₦294,000 a year less', group: 1 },
          { text: 'Maybe hearing "no"', group: 0 },
          { text: 'Smaller raises for years', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Not asking is a [[1]] too, and it has a [[2]].',
        blanks: [['decision', 'choice'], ['price', 'cost']],
        distractors: ['secret', 'reward'],
      },
      {
        kind: 'mcq',
        prompt: 'A 10% raise on ₦374,500, compared with a 10% raise on ₦350,000. Which is bigger, and by how much?',
        options: [
          { text: 'The first, by ₦2,450 a month' },
          { text: 'They\'re the same', why: '10% of a bigger number is bigger.' },
          { text: 'The second', why: 'The second starts lower.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s thinking is the mistake?',
        lines: [
          'I earn ₦350,000 a month.',
          'Asking could have meant ₦24,500 more a month.',
          'Not asking costs nothing.',
          'Next time, I\'ll ask politely, with a reason.',
        ],
        bug: 2,
        fix: 'Not asking cost about ₦294,000 a year.',
        explanation: 'Silence has a price too.',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦294,000 a year for five years, with no other raises. Total, in naira?',
        answers: ['1470000', '1,470,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you didn\'t ask for: pay, a price, a deadline. What has it cost you since?',
    starters: ['I didn\'t ask for...', 'Since then it has cost...'],
  },
  deepen: {
    title: 'Small gaps, big careers',
    summary: 'Researchers who study pay find that differences at the start of a job tend to follow people for years, because future raises and offers are often based on current pay.',
  },
  notes: 'Fictional salary ₦350,000/month. 7% chosen to echo the ~7.4% starting-pay gain from negotiating reported in Babcock & Laschever, Women Don\'t Ask (2003). 7% = 24,500/month = 294,000/yr = 1,470,000 over 5 years without compounding.',
};

export default lesson;
