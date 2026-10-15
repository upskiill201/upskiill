import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 9 — comparing two documents: versions (what changed) and options (side by side on your criteria). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Comparing two documents',
  summary: '"What changed in version 2?" and "Which of these two proposals is better?" are two different jobs. Learn both.',
  minutes: 14,
  outcomes: [
    'Find what changed between two versions of a document',
    'Compare two options side by side on criteria you choose',
    'Make sure numbers are compared like for like',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Job 1: what changed between versions?',
      steps: [
        { title: 'Paste both versions, clearly labelled', body: '"VERSION 1:" ... "VERSION 2:" ... so the AI cannot mix them up.' },
        {
          title: 'Ask for the changes only',
          body: 'Not a summary of either document.',
          code: 'List every change from Version 1 to Version 2: added, removed, and changed. Quote the before and after wording for each. Most important first.',
          language: 'plaintext',
        },
        { title: 'Check the important ones yourself', body: 'Especially numbers, dates and anything that changes what you must do or pay.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Job 2: which option is better?',
      steps: [
        { title: 'Choose the criteria yourself', body: 'Price, speed, risk, support... You know what matters; the AI does not.' },
        {
          title: 'Ask for a side-by-side table',
          body: 'Same criteria, both options, with where each fact comes from.',
          code: 'Compare Proposal A and Proposal B in a table on: total price per year, delivery time, support hours, and cancellation terms. Say "not stated" if a document does not say. Cite the section for each.',
          language: 'plaintext',
        },
        { title: 'Make it like for like', body: 'Monthly vs yearly prices, hours vs days. Ask for everything in the same units.' },
        { title: 'Decide yourself', body: 'Ask for trade-offs, not a winner. "What would I give up by choosing A?"' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: '"Not stated" is an important answer. A proposal that does not mention cancellation terms is telling you something.',
    },
    {
      kind: 'check',
      question: 'Who should choose the comparison criteria?',
      options: ['The AI', 'You, because you know what matters', 'Whoever wrote proposal A'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is comparing documents for her team.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which job is this?',
        groups: ['What changed (versions)', 'Which is better (options)'],
        items: [
          { text: 'The client sent contract v2. What is different?', group: 0 },
          { text: 'Two agencies sent proposals. Which one?', group: 1 },
          { text: 'Lucía edited the brief. What did she change?', group: 0 },
          { text: 'Three laptops for Grace. Which fits best?', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the "which is better" routine.',
        lines: ['Choose your criteria', 'Ask for a side-by-side table', 'Make it like for like', 'Look at trade-offs and decide'],
      },
      {
        kind: 'mcq',
        prompt: 'Why quote the before and after wording for each change?',
        options: [
          { text: 'So you can see exactly what changed and check it' },
          { text: 'To make the list longer', why: 'It is about precision.' },
          { text: 'Lawyers require it', why: 'It just makes checking easy.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the like-for-like instruction.',
        tiles: ['Show', 'all', 'prices', 'per', 'year'],
        distractors: ['some', 'maybe'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the comparison that is not like for like.',
        lines: ['Agency A: $2,000 per month', 'Agency B: $18,000 per year', 'So A is cheaper because 2,000 is less than 18,000.'],
        bug: 2,
        fix: 'A is $24,000 per year, so B is cheaper.',
        explanation: 'Monthly vs yearly. Convert to the same units first.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "We sent you contract v2. It's basically the same as v1, just tidied up!",
        prompt: 'What should Ada do before signing?',
        options: [
          { text: 'Ask the AI to list every change from v1 to v2 with before and after wording, then check the important ones herself.' },
          { text: "Trust that it's the same.", why: '"Basically the same" can hide important changes.' },
          { text: 'Read only v2 and hope.', why: 'Comparing is how you see changes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the comparison request.',
        template: 'Compare A and B in a [[1]] on price, delivery time and support. Say "not [[2]]" if a document does not say. [[3]] the section for each.',
        blanks: [['table'], ['stated'], ['Cite']],
        distractors: ['poem', 'invented', 'Hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ask for trade-offs, not a ... (one word)',
        answers: ['winner', 'verdict', 'decision'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the change type to an example.',
        pairs: [
          ['Added', 'A new late-payment fee'],
          ['Removed', 'The free support hours'],
          ['Changed', 'Payment due in 15 days, not 30'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request compares two laptop options for Grace best?',
        options: [
          { text: 'Which laptop is better?', why: 'Better for what? It will pick its own criteria.' },
          { text: 'Compare these two laptops in a table on: price, weight, battery life, and screen size. Same units. Then tell me the main trade-off for a designer.' },
          { text: 'Describe both laptops.', why: 'Descriptions, not a comparison.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth checking yourself, or fine to trust at a glance?',
        groups: ['Check yourself', 'Glance is fine'],
        items: [
          { text: 'A changed payment amount', group: 0 },
          { text: 'A fixed typo', group: 1 },
          { text: 'A new cancellation fee', group: 0 },
          { text: 'A reworded greeting', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Proposal B doesn't mention cancellation at all. Does that matter?",
        prompt: "What's Ada's answer?",
        options: [
          { text: "Yes: 'not stated' is a red flag. Ask them about it before deciding." },
          { text: 'No, silence means it is free.', why: 'It may mean the opposite.' },
          { text: 'Ignore it, focus on price.', why: 'Cancellation terms can cost more than the price difference.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If a document does not say, the table should say "not ..." (one word)',
        answers: ['stated', 'mentioned', 'specified'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to the fix.',
        pairs: [
          ['Mixed up versions', 'Label VERSION 1 and VERSION 2'],
          ['Monthly vs yearly', 'Same units'],
          ['AI picks what matters', 'Choose criteria yourself'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a better question than "which one should I choose?"',
        options: [
          { text: '"What would I give up by choosing A?"' },
          { text: '"Which one is the best ever?"', why: 'Still asks it to decide for you.' },
          { text: 'No question; just pick', why: 'Trade-offs help you decide well.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What are you comparing at the moment (tools, offers, versions)? Write the criteria that actually matter to you.',
    starters: ['I am comparing...', 'My criteria:'],
  },
  deepen: { title: 'Try it today', summary: 'Next time you get a "v2" of anything, ask for the change list with before/after quotes.' },
  notes: 'Prices and terms are fictional examples. Not legal advice; contract review is covered in Lesson 11.',
};

export default lesson;
