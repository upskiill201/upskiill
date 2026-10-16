import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: Arjun's four-word brief, and two "Got it!"s. Why obvious isn't obvious. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The four-word brief',
  summary: 'Day 1, Bengaluru, 9:05 a.m. Arjun has 30 days to build Mr Rao\'s online shop before the Diwali sale, and two juniors he\'s never worked with. His brief: "Kavya: products. Joel: cart." Both reply "Got it!" in under a minute.',
  minutes: 11,
  outcomes: [
    'See why a brief that\'s clear to you can be unclear to everyone else',
    'Know that "Got it!" isn\'t the same as understanding',
    'Know this course\'s goal: expectations people can actually meet',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 1, 9:05 a.m., a video call',
      beats: [
        { speaker: 'arjun', text: 'Welcome, both. Thirty days, Diwali sale, Mr Rao\'s shop. Kavya: products. Joel: cart. Usual stack. Questions?' },
        { speaker: 'kavya', text: 'Got it! Starting now.' },
        { speaker: 'joel', text: 'Got it.' },
        { speaker: 'narrator', text: 'In Arjun\'s head, "products" means a mobile-first product page in English and Hindi, with size options, using his own design system. "Cart" means guest checkout with UPI. He has thought about this for a week. Kavya and Joel have thought about it for nine seconds.' },
      ],
      choice: {
        prompt: 'What should Arjun do before they start?',
        options: [
          {
            text: '"Before you start, could each of you tell me in your own words what you\'re going to build first?"',
            outcome: 'Kavya: "A product grid, desktop first?" Joel: "A cart with login?" Two wrong guesses, found in two minutes instead of three days.',
            best: true,
          },
          {
            text: 'End the call. They said "Got it", and they\'re developers.',
            outcome: 'Three days of fast, careful work, on the wrong things.',
          },
          {
            text: 'Send them his 40-page notes document instead.',
            outcome: 'Kavya skims it. Joel reads all 40 pages and still doesn\'t know what to build first.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Arjun isn't careless. He's an expert, and experts have a blind spot: once you know something, it's very hard to imagine not knowing it. Gallup's research has found that only about <strong>half</strong> of employees strongly agree they know what's expected of them at work. <strong>This course:</strong> how to set expectations people can meet, from the first brief to roles, quality, priorities, changes and what to do when they're missed. Arjun has 30 days. You'll learn alongside him.</p>",
    },
  ],
  apply: {
    scenario: 'Day 1, the first call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why was "Kavya: products. Joel: cart." unclear?',
        options: [
          { text: 'Kavya and Joel weren\'t listening', why: 'They heard every word. There were only four.' },
          { text: 'All the detail was in Arjun\'s head, not in the brief' },
          { text: 'It was too long', why: 'It was far too short.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the brief, or only in Arjun\'s head?',
        groups: ['In the brief', 'Only in his head'],
        items: [
          { text: 'Kavya does products', group: 0 },
          { text: 'Mobile first', group: 1 },
          { text: 'Joel does the cart', group: 0 },
          { text: 'Guest checkout with UPI', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Got it! Starting now.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Great, see you Friday!', why: '"Got it" isn\'t proof of understanding.' },
          { text: 'Are you sure you got it?', why: 'A yes/no question gets "yes".' },
          { text: 'Brilliant. Quick check first: what will you build today, in your own words?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Gallup found only about ___ of employees strongly agree they know what\'s expected of them. (one word)',
        answers: ['half', 'Half', '50%'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a better first call in order.',
        lines: ['Say what and why', 'Describe what done looks like', 'Ask them to say it back', 'Fix the gaps'],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t a 40-page document fix it?',
        options: [
          { text: 'Too much detail hides what matters first' },
          { text: 'Juniors don\'t read', why: 'Joel read every page.' },
          { text: 'It does fix it', why: 'Joel still didn\'t know what to build first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s message after the call. Which line assumes too much?',
        lines: [
          'Kavya: product pages, Hindi and English.',
          'Joel: cart, you know how I like it.',
          'Check in with me at 4 p.m. today.',
        ],
        bug: 1,
        fix: 'Joel: cart with guest checkout and UPI, no login.',
        explanation: '"You know how I like it" only works if they\'ve worked with you before. They haven\'t.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to the role.',
        pairs: [
          ['Arjun', 'The lead'],
          ['Mr Rao', 'The client'],
          ['Kavya and Joel', 'The new juniors'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Set expectations people can actually [[1]]. "Got it" isn\'t [[2]].',
        blanks: [['meet'], ['understanding', 'proof']],
        distractors: ['ignore', 'rude'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s best question.',
        tiles: ['What', 'will', 'you', 'build', 'first?'],
        distractors: ['Okay?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you gave someone a short instruction that seemed obvious, and they did something different. What was only in your head?',
    starters: ['I said...', 'In my head, I meant...'],
  },
  deepen: {
    title: 'Say it back',
    summary: 'Next time you ask someone to do something, ask them to describe it back in their own words. Notice how often something small is different.',
  },
  notes: 'Story setup. Gallup Q12 item 1 ("I know what is expected of me at work"); Gallup reports roughly half of employees strongly agree (e.g. Gallup 2015–2024 workplace reports), hedged as "about half". Curse of knowledge: Camerer, Loewenstein & Weber (1989). Fictional project.',
};

export default lesson;
