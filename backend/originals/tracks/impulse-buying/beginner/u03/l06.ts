import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Card deck: dark patterns. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Dark patterns',
  summary: 'Some tricks aren\'t in the words; they\'re in the design. A pre-ticked box, a "No thanks, I don\'t like saving money" button, a fee that appears at the last step. Researchers have a name for these: dark patterns.',
  minutes: 11,
  outcomes: [
    'Explain what a dark pattern is',
    'Recognise the most common types',
    'Know what to do when you spot one',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Dark patterns</strong> are design tricks in websites and apps that push you into doing things you didn\'t mean to: buying more, signing up, sharing data, or not cancelling.</p><p>In 2019, researchers at Princeton University scanned about 11,000 shopping websites and found dark patterns on more than 1,200 of them, roughly 1 in 10 (Mathur and colleagues, 2019).</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Common types:</strong></p><ul><li><strong>Sneaking:</strong> an extra item or "protection plan" quietly added to your basket.</li><li><strong>Hidden costs:</strong> fees that appear only at the final step.</li><li><strong>Fake urgency and scarcity:</strong> countdowns and stock warnings that aren\'t real.</li><li><strong>Fake social proof:</strong> "Ama in Kumasi just bought this!" pop-ups you can\'t check.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>More types:</strong></p><ul><li><strong>Confirmshaming:</strong> the "no" button guilt-trips you: "No thanks, I don\'t want to save money."</li><li><strong>Pre-ticked boxes:</strong> already signed up for emails, insurance or a subscription unless you notice.</li><li><strong>Hard to cancel:</strong> one tap to join, a maze to leave.</li><li><strong>Saved card, one tap:</strong> payment so easy you skip thinking. Not always a trick, but it removes your pause.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>What to do:</strong> slow down at checkout. Read every line in the basket. Untick boxes you didn\'t tick. Ignore guilt-trip buttons. If fees appear at the last step, compare the full total with another shop. And if a site keeps tricking you, leave it.</p>',
    },
    {
      kind: 'check',
      question: 'At checkout, "Phone protection: GH₵25" is already in your basket. You didn\'t add it. What dark pattern is this?',
      options: ['Sneaking', 'Confirmshaming', 'Fake scarcity'],
      answer: 0,
      explanation: 'Something quietly added to your basket that you didn\'t choose.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Slow down at checkout: read the basket, untick boxes, ignore guilt buttons, check the final total. Design can trick you; reading can\'t be tricked.',
    },
  ],
  apply: {
    scenario: 'A checkout full of tricks.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each dark pattern to its example.',
        pairs: [
          ['Sneaking', 'Protection plan added to your basket'],
          ['Hidden costs', 'Service fee at the last step'],
          ['Confirmshaming', '"No thanks, I hate saving money"'],
          ['Pre-ticked box', 'Already signed up for emails'],
          ['Hard to cancel', 'One tap to join, ten steps to leave'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'About how many shopping sites had dark patterns in the Princeton study?',
        options: [
          { text: 'Roughly 1 in 10' },
          { text: 'Almost none', why: 'More than 1,200 of about 11,000.' },
          { text: 'All of them', why: 'About 1 in 10 in that study.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Dark pattern, or fair design?',
        groups: ['Dark pattern', 'Fair'],
        items: [
          { text: 'Full price, including fees, shown from the start', group: 1 },
          { text: 'A "no" button that insults you', group: 0 },
          { text: 'Easy "cancel subscription" button', group: 1 },
          { text: '"Ama in Kumasi just bought this!" with no way to check', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'The site says "No thanks, I don\'t like great deals." I feel bad clicking it.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'That\'s confirmshaming. The guilt is the trick. Click it, you\'re fine.' },
          { text: 'Better take the deal then.', why: 'The guilt is designed to make you say yes.' },
          { text: 'Close your phone forever.', why: 'Just recognise the trick and click no.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'At checkout.',
        template: 'Read the [[1]], untick [[2]], check the final [[3]].',
        blanks: [['basket'], ['boxes'], ['total']],
        distractors: ['ads', 'reviews'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Item GH₵150. At the last step: service fee GH₵18 and "protection" GH₵25 you didn\'t add. If you remove the protection, what\'s the total?',
        answers: ['168', 'GH₵168', '168 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this checkout is the hidden cost?',
        lines: [
          'Sneakers: GH₵300.',
          'Delivery: GH₵20 (shown on the product page).',
          '"Processing fee": GH₵35 (first shown here).',
        ],
        bug: 2,
        fix: 'Compare the full total with other shops before paying.',
        explanation: 'A fee that only appears at the end is designed so you\'re too committed to walk away.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can saved card details lead to more impulse buys?',
        options: [
          { text: 'They remove the pause of typing your details' },
          { text: 'They charge more', why: 'Same price. Less friction.' },
          { text: 'They don\'t', why: 'One-tap buying skips your thinking time.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a safe checkout.',
        lines: ['Read every line in the basket', 'Remove anything you didn\'t add', 'Untick pre-ticked boxes', 'Check the full total', 'Compare if fees appeared late'],
      },
      {
        kind: 'mcq',
        prompt: 'A site keeps adding things to your basket and hiding fees. What\'s the best move?',
        options: [
          { text: 'Leave and shop somewhere fairer' },
          { text: 'Keep using it but be careful', why: 'A site designed to trick you will keep trying.' },
          { text: 'Buy more to get your money\'s worth', why: 'That\'s exactly what it wants.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Next time you check out online, look for one dark pattern. Which did you find?',
    starters: ['I found...', 'It was trying to...'],
  },
  deepen: {
    title: 'The name and the law',
    summary: 'The term "dark patterns" was coined by designer Harry Brignull in 2010. Regulators in several regions now treat some of them, like hidden fees and fake urgency, as unfair practices. Where you live, a consumer protection body may accept complaints.',
  },
  notes: 'Mathur, A., Acar, G., Friedman, M. J., et al. (2019). Dark patterns at scale: Findings from a crawl of 11K shopping websites. Proc. ACM HCI, 3(CSCW): 1,818 instances on 1,254 websites (~11.1%). Brignull (2010) coined term. "Ama in Kumasi" pop-up example fictional. Regulation stated generally.',
};

export default lesson;
