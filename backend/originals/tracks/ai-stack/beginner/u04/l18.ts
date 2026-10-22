import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 18 — Reading a pricing page: per million, per thousand, and the small print. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a pricing page',
  summary: 'Arjun opens a real-looking pricing page and gets lost: some prices are per thousand tokens, some per million, and there\'s a "batch" discount. Joel walks him through it line by line.',
  minutes: 12,
  outcomes: [
    'Convert prices per thousand to per million',
    'Spot the input price, output price and limits',
    'Know what batch and cached discounts mean',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Line by line',
      html: '<p>Pricing pages look different, but most list the same things:</p><ol><li><strong>Input price</strong> and <strong>output price</strong>, separately.</li><li><strong>The unit</strong>: usually per million tokens (1M), sometimes per thousand (1K). $0.0005 per 1K is the same as <strong>$0.50 per 1M</strong>: multiply by 1,000.</li><li><strong>Context window</strong>: the most tokens per request.</li><li><strong>Rate limits</strong>: how many requests or tokens per minute your account may send.</li><li><strong>Discounts</strong>: <em>batch</em> (send work to be done within hours, for a lower price) and <em>cached input</em> (repeated prompt beginnings cost less).</li></ol><p>A practice pricing line:</p><pre><code>model-b   input $0.50 / 1M   output $1.50 / 1M   context 128K   batch -50%</code></pre><p>Batch suits jobs nobody is waiting for, like tagging 120 products overnight. It never suits live chat: the customer is waiting.</p><p>Always check the page on the day you decide. Prices change, and the page is the source of truth, not a blog post from last year.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Per thousand to per million',
      caption: 'Make every price the same unit before comparing.',
      code: 'per_thousand = {"model-x": 0.0005, "model-y": 0.002}\nfor name, price in per_thousand.items():\n    print(f"{name}: ${price * 1000:.2f} per million")\n',
      challenge: 'Add model-z at $0.00015 per thousand.',
    },
  ],
  apply: {
    scenario: 'Reading the small print.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A price is $0.0005 per thousand tokens. Print it per million',
        starter: 'per_thousand = 0.0005\n',
        solution: 'per_thousand = 0.0005\nprint(per_thousand * 1000)\n',
        hint: 'per_thousand * 1000',
        checks: [{ message: 'Print 0.5', outputEquals: '0.5' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which job suits a batch discount?',
        options: [
          { text: 'Answering a customer who is waiting in the chat', why: 'Batch can take hours; live chat can\'t wait.' },
          { text: 'Writing tags for all 120 products overnight' },
          { text: 'Sorting a message as it arrives', why: 'That needs an answer now.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pricing-page term to its meaning.',
        pairs: [
          ['Context window', 'Most tokens per request'],
          ['Rate limit', 'Most requests per minute'],
          ['Batch', 'Cheaper, but done within hours'],
          ['Cached input', 'Repeated prompt starts cost less'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Live chat or batch?',
        groups: ['Live chat', 'Batch'],
        items: [
          { text: '"Is delivery free?" from a customer', group: 0 },
          { text: 'Summarising last month\'s 300 orders', group: 1 },
          { text: 'A size question while the customer waits', group: 0 },
          { text: 'Translating the help page into Hindi', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'A blog post says model-b costs $1 per million. The page says $0.50. Which do I trust?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'The blog, it\'s easier to read.', why: 'Prices change; the provider\'s page is the source.' },
          { text: 'Average them: $0.75.', why: 'Only one of them is the real price.' },
          { text: 'The pricing page, checked today. Blog posts go out of date.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'price = 1.50\nprint(price * 0.5)',
        language: 'python',
        options: [
          { text: '0.75' },
          { text: '1.5', why: 'It multiplies by 0.5: half price.' },
          { text: '2.0', why: 'That would be adding.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'model-b\'s output price is $1.50 per million. With a 50% batch discount, print the batch price',
        starter: 'output_price = 1.50\ndiscount = 0.5\n',
        solution: 'output_price = 1.50\ndiscount = 0.5\nprint(output_price * (1 - discount))\n',
        hint: 'output_price * (1 - discount)',
        checks: [{ message: 'Print 0.75', outputEquals: '0.75' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Units.',
        template: 'Price per 1K x [[1]] = price per [[2]]',
        blanks: [['1000', '1,000'], ['1M', 'million']],
        distractors: ['100', 'token'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line compares prices in different units?',
        lines: [
          'model-x: $0.0005 per 1K tokens.',
          'model-y: $0.40 per 1M tokens.',
          'model-x is cheaper because 0.0005 is smaller than 0.40.',
          'Convert both to per million before comparing.',
        ],
        bug: 2,
        fix: 'model-x is $0.50 per 1M, so model-y is cheaper.',
        explanation: 'Put both prices in the same unit first.',
      },
      {
        kind: 'typeAnswer',
        prompt: '$0.002 per thousand tokens is how many dollars per million?',
        answers: ['2', '2.0', '$2', '2.00'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Supermarkets show "price per 100 g" so you can compare packs. What would you want every AI pricing page to show?',
    starters: ['I\'d want...', 'It would help me compare...'],
  },
  deepen: {
    title: 'Rate limits grow with use',
    summary: 'New accounts usually get low rate limits that rise as you spend and build history. Check yours before a big launch day.',
  },
  notes: '$0.0005/1K = $0.50/1M; $0.002/1K = $2/1M. Batch APIs (results within up to 24 hours, often about 50% cheaper) and cached-input discounts are offered by several major providers; terms vary, check current pages. Practice pricing line uses teyro_ai model-b values; the batch -50% is illustrative.',
};

export default lesson;
