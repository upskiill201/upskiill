import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Card deck: four cheap tests. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Four cheap tests',
  summary: 'Miracle sends Clinton four kinds of cheap test that founders use before building, with a famous example of each. He has to pick the one that fits WashDay.',
  minutes: 12,
  outcomes: [
    'Describe four cheap ways to test an idea',
    'Know a famous example of each',
    'Pick the right test for a question',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Fake door (smoke test).</strong> Offer something that doesn\'t fully exist yet and count who tries to get it. Dropbox famously posted a short demo video before the product was ready; sign-ups for the waiting list showed the demand. <em>Be honest:</em> tell people it\'s coming, and never take money you can\'t refund.</p><p><strong>2. Concierge.</strong> Deliver the service by hand to a few customers. No technology, just you. You learn exactly what people need.</p><p><strong>3. "Wizard of Oz".</strong> Customers see what looks like a finished service, but behind it you do the work by hand. Zappos\' founder tested selling shoes online by photographing shoes in local shops and buying them only when someone ordered.</p><p><strong>4. Pre-sale.</strong> Take real payment before the product exists, with a clear date and a refund promise. Strongest evidence of all: money.</p><p>WashDay\'s weekend is a <strong>concierge test with a pre-sale</strong>: students pay first on Mobile Money, and Clinton and Mama Rose do everything by hand.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Cheap tests must still be honest: say what\'s coming when, and refund anyone you can\'t serve.',
    },
  ],
  apply: {
    scenario: 'Picking a test.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the test to its description.',
        pairs: [
          ['Fake door', 'Count who tries to get it'],
          ['Concierge', 'Do it by hand for a few'],
          ['Wizard of Oz', 'Looks automatic, done by hand'],
          ['Pre-sale', 'Take payment before it exists'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which test gives the strongest evidence?',
        options: [
          { text: 'Pre-sale: people pay real money' },
          { text: 'Fake door: people click', why: 'Clicking costs nothing; paying does.' },
          { text: 'A survey', why: 'Opinions, not behaviour.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which test is this?',
        groups: ['Fake door', 'Concierge', 'Pre-sale'],
        items: [
          { text: '"Reply YES to hear when WashDay launches"', group: 0 },
          { text: 'Clinton personally collects five bags', group: 1 },
          { text: '"Pay 1,500 FCFA now for Saturday pickup"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Can I just post WashDay as if it\'s a big company with machines?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Keep it honest: say it\'s a new pickup service with Mama Rose washing. Misleading people breaks trust you\'ll need later.' },
          { text: 'Yes, fake it till you make it.', why: 'Misleading customers isn\'t a test; it\'s a risk.' },
          { text: 'Don\'t mention Mama Rose ever.', why: 'Her reputation may even help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'WashDay\'s test.',
        template: 'A [[1]] test with a [[2]]: pay first, done by hand.',
        blanks: [['concierge'], ['pre-sale', 'presale']],
        distractors: ['survey', 'logo'],
      },
      {
        kind: 'mcq',
        prompt: 'What did the Zappos example test?',
        options: [
          { text: 'Whether people would buy shoes online, before stocking any' },
          { text: 'How to build a warehouse', why: 'No warehouse; shoes were bought only after orders.' },
          { text: 'Which shoes look best', why: 'It tested demand, not style.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this fake-door test is a problem?',
        lines: [
          'Post: "WashDay launches next month. Reply YES to be first."',
          'Count the YES replies.',
          'Take 1,500 FCFA from everyone with no date and no refunds.',
          'Thank everyone and share the launch date.',
        ],
        bug: 2,
        fix: 'Only take money with a clear date and a refund promise.',
        explanation: 'Taking money you may not honour isn\'t a test; it\'s unfair.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did Dropbox use to test demand before the product was ready? (one word)',
        answers: ['video', 'a video', 'demo'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these tests from weakest to strongest evidence.',
        lines: ['A survey', 'A fake door (sign-ups)', 'A concierge trial', 'A pre-sale (real payment)'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest test, or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: '"Launching next month; refund if we don\'t"', group: 0 },
          { text: 'Taking payment with no plan to deliver', group: 1 },
          { text: '"Small new service, Mama Rose washes"', group: 0 },
          { text: 'Claiming hundreds of happy customers on day one', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four tests fits your idea best? What would you post or offer this week?',
    starters: ['The best test for me is...', 'I\'d offer...'],
  },
  deepen: {
    title: 'Ethics of cheap tests',
    summary: 'Cheap tests work because they\'re real. Keep them honest: clear dates, refunds for anyone you can\'t serve, and no fake reviews or claims.',
  },
  notes: 'Dropbox demo video (2007-2008) and Zappos (Nick Swinmurn photographing shoes in local stores) are classic MVP stories retold in The Lean Startup (Ries, 2011) and elsewhere. "Wizard of Oz" and "concierge" MVP terms from lean startup practice.',
};

export default lesson;
