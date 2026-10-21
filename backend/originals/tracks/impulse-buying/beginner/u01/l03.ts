import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: wanting vs liking, your brain on a sale. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Your brain on a sale',
  summary: 'Why did Kofi feel great for four minutes, then nothing? Brain scans of people shopping help explain it: the "want" signal fires before you buy, and it\'s strongest right before you tap.',
  minutes: 12,
  outcomes: [
    'Explain the difference between wanting and liking',
    'Describe what happens in the brain when you see a product and its price',
    'Use the "anticipation peak" to your advantage',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Wanting is not liking',
      html: '<p>In a well-known study, Brian Knutson and colleagues (2007) scanned people\'s brains while they decided whether to buy products. Two things stood out:</p><ul><li>When people saw a product they wanted, a brain area linked to <strong>anticipating rewards</strong> lit up. The stronger it lit up, the more likely they were to buy.</li><li>When they saw the price, an area linked to <strong>discomfort and pain</strong> became more active, especially when the price felt too high. More of that "ouch", less buying.</li></ul><p>So buying is a tug of war: the "want" signal versus the "ouch" signal.</p><p><strong>Why the good feeling fades.</strong> Neuroscientists distinguish <em>wanting</em> (the pull towards something) from <em>liking</em> (the pleasure of having it). They\'re driven by different systems in the brain. Wanting can be intense even when liking turns out to be small. That\'s the four minutes Kofi felt: the peak of wanting, then not much liking once the box arrived.</p><p><strong>How sellers use this.</strong> A flash sale turns up the "want" (scarcity, a countdown, the captain\'s boots) and turns down the "ouch" (70% off, "was GH₵1,600", one tap, pay later). Phone payments weaken the "ouch" even more, as you saw in Budgeting for Beginners.</p><p><strong>How you can use it:</strong> the want signal is strongest <em>before</em> you buy, and it fades with time. Wait, and the pull drops. Look at the price as hours of work, and the "ouch" comes back.</p>',
    },
    {
      kind: 'check',
      question: 'When does the "want" signal tend to be strongest?',
      options: ['Just before buying', 'A week after buying', 'When you see the price'],
      answer: 0,
      explanation: 'Anticipation peaks before the purchase. That\'s why waiting helps.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Wanting peaks before you buy and fades fast; liking is often smaller than it promised. Waiting lets the want drop, and the price in hours brings the "ouch" back.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s brain at 2:14 a.m.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each signal to what triggers it.',
        pairs: [
          ['"Want" signal', 'Seeing a product you desire'],
          ['"Ouch" signal', 'Seeing a price that feels high'],
          ['Liking', 'The pleasure of actually having it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Knutson\'s study find predicted buying?',
        options: [
          { text: 'A strong "want" response and a weak "ouch" response to the price' },
          { text: 'How rich people were', why: 'The study looked at brain responses, not income.' },
          { text: 'Nothing predictable', why: 'Brain activity predicted choices fairly well.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it turn up the "want", or turn down the "ouch"?',
        groups: ['Turns up the want', 'Turns down the ouch'],
        items: [
          { text: '"Only 3 left"', group: 0 },
          { text: '"70% off"', group: 1 },
          { text: 'A countdown timer', group: 0 },
          { text: '"Pay later"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Why did I feel amazing when I ordered, and nothing when they arrived?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'That was wanting at its peak. Liking is a different system, and it was much smaller than the wanting promised.' },
          { text: 'Because the boots were bad.', why: 'They were fine boots, just the wrong size. The feeling was in his brain, not the boots.' },
          { text: 'You\'re just ungrateful.', why: 'It\'s how everyone\'s brain works.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key idea.',
        template: '[[1]] is not [[2]].',
        blanks: [['Wanting'], ['liking']],
        distractors: ['Buying', 'saving'],
      },
      {
        kind: 'mcq',
        prompt: 'Which action brings the "ouch" back?',
        options: [
          { text: 'Working out the price in hours of work' },
          { text: 'Paying later', why: 'That hides the ouch.' },
          { text: 'Buying quickly', why: 'Speed is how the ouch gets skipped.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which thought misunderstands the brain science?',
        lines: [
          'The want signal is strongest before I buy.',
          'Waiting lets it drop.',
          'If I want something this much, I\'ll definitely love having it.',
        ],
        bug: 2,
        fix: 'Wanting something a lot doesn\'t mean I\'ll like having it as much.',
        explanation: 'Wanting and liking come from different systems. Strong wanting can lead to small liking.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do phone payments make impulse buys easier?',
        options: [
          { text: 'They weaken the "ouch" of paying' },
          { text: 'They\'re cheaper', why: 'Same price. Less pain.' },
          { text: 'They\'re slower', why: 'They\'re faster, which helps impulses.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At GH₵37.50 an hour, how many hours were the GH₵480 boots? (Round to the nearest hour.)',
        answers: ['13', 'thirteen', '13 hours', '12.8'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the tug of war in Kofi\'s brain.',
        lines: ['Sees the boots: want rises', 'Sees "70% off": ouch drops', 'Countdown: want peaks', 'Taps buy', 'Box arrives: little liking'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you wanted badly and then bought. Did you like having it as much as you wanted it?',
    starters: ['I really wanted...', 'Once I had it,...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Knutson, Rick, Wimmer, Prelec and Loewenstein (2007), "Neural Predictors of Purchases", Neuron. On wanting and liking: Kent Berridge\'s research on reward, which shows the two can come apart.',
  },
  notes: 'Knutson, B., Rick, S., Wimmer, G. E., Prelec, D., & Loewenstein, G. (2007). Neural predictors of purchases. Neuron, 53(1), 147–156: nucleus accumbens activation (product) predicted purchase; insula activation (excessive prices) predicted not buying; mesial PFC with price differential. Wanting vs liking: Berridge & Robinson (1998; 2016). Simplified brain-area language ("linked to") kept non-technical.',
};

export default lesson;
