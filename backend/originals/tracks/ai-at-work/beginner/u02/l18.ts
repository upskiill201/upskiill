import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 18 — getting useful feedback from AI: a specific reader, specific questions, your judgement. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Feedback on your own writing',
  summary: '"Is this good?" gets you "Yes, great!". Ask the right way and the AI becomes a sharp first reader.',
  minutes: 13,
  outcomes: [
    'Ask for feedback as a specific reader would give it',
    'Ask for the one most important change, plus what works',
    'Decide which feedback to accept',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The proposal review',
      beats: [
        { speaker: 'narrator', text: "Ada has written her dark-mode proposal for the director. It's due at 4pm." },
        { speaker: 'ada', text: 'Is this proposal good?' },
        { speaker: 'narrator', text: 'The AI replies: "This is a great proposal! It is clear and well structured." Ada feels nice for about four seconds.' },
        { speaker: 'tey', text: "That told you nothing. AI tools tend to be encouraging when you ask 'is it good?'. Ask it to read like the person who matters." },
        { speaker: 'narrator', text: 'Ada tries again: "Read this as a busy, sceptical director. What would confuse you? What is missing? What is the one change that matters most?"' },
        { speaker: 'narrator', text: 'This time: "I don\'t see the cost of option B. And I\'d ask whether customers have actually requested dark mode."' },
      ],
      choice: {
        prompt: 'The AI also suggests adding three charts. Ada thinks charts would make it too long. What should she do?',
        options: [
          {
            text: 'Add the cost of option B and the customer-request numbers, but skip the charts.',
            outcome: 'The director replies: "Clear. Approved, option A." The two changes Ada accepted were exactly the ones that mattered.',
            best: true,
          },
          {
            text: 'Accept every suggestion, including the charts.',
            outcome: 'The proposal doubles in length. The director skims it, misses option B, and asks for a meeting.',
          },
          {
            text: 'Ignore all the feedback. The first AI said it was great.',
            outcome: 'The director asks "what does option B cost?" and "do customers want this?" Two days lost.',
          },
        ],
      },
    },
    {
      kind: 'reading',
      title: 'How to ask for feedback that helps',
      html:
        '<ol>' +
        '<li><strong>Name the reader.</strong> "Read this as a sceptical director" or "as a new customer who has never heard of us".</li>' +
        '<li><strong>Ask specific questions.</strong> What is unclear? What is missing? What would make you say no?</li>' +
        '<li><strong>Ask for priorities.</strong> "What is the ONE change that matters most?" stops a list of twenty nitpicks.</li>' +
        '<li><strong>Ask what works, too.</strong> So you do not accidentally edit out your strongest part.</li>' +
        '<li><strong>You decide.</strong> Feedback is advice. Accept what serves the reader and the goal; skip the rest.</li>' +
        '</ol>' +
        '<p>AI feedback is fast and available at 11pm. For the things that really matter, also ask a colleague. Humans notice things AI tools miss, like office politics and history.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"Is this good?" gets encouragement. "Read it as X: what is missing?" gets feedback.',
    },
    {
      kind: 'check',
      question: 'Why ask for the ONE most important change?',
      options: ['Because AI can only give one', 'To stop a long list of nitpicks hiding what matters', 'To save electricity'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is getting feedback on her writing.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What usually happens when you ask an AI tool "Is this good?"',
        options: [
          { text: 'It gives a harsh, detailed critique', why: 'Usually the opposite, unless you ask for one.' },
          { text: 'It refuses to answer', why: 'It will answer, just not usefully.' },
          { text: 'It tends to be encouraging, which is not very useful' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the feedback routine.',
        lines: ['Name the reader', 'Ask specific questions', 'Ask for the one most important change', 'Ask what works', 'Decide what to accept'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful feedback request, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Is this good?', group: 1 },
          { text: 'Read as a sceptical director: what is missing?', group: 0 },
          { text: 'Tell me it is great.', group: 1 },
          { text: 'What is the one change that matters most?', group: 0 },
          { text: 'What would make a new customer stop reading?', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the priority question.',
        tiles: ['What', 'is', 'the', 'one', 'change', 'that', 'matters', 'most?'],
        distractors: ['twenty'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Before we send our press release, could your AI give it a critical read? Be tough.",
        prompt: 'Which request should Ada use?',
        options: [
          { text: 'Is this press release good?', why: 'Will get encouragement, not critique.' },
          { text: "Read this as a busy journalist who gets 100 press releases a day. Would you stop reading? Where? What's missing? Top 3 changes, most important first." },
          { text: 'Make it perfect.', why: 'A rewrite, not feedback.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to what they would check.',
        pairs: [
          ['Sceptical director', 'Cost and risk'],
          ['New customer', 'Is it clear what this is?'],
          ['Busy journalist', 'Is there a story?'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the feedback Ada should probably skip.',
        lines: ['Add the cost of option B.', 'Add how many customers asked for dark mode.', 'Add three charts and a 2-page appendix.', 'Keep the recommendation in the first line.'],
        bug: 2,
        explanation: 'It would double the length for a director who reads in seconds. You decide what serves the reader.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Feedback is advice. Who decides what to accept? (one word)',
        answers: ['you', 'me', 'ada', 'the writer'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s feedback request.',
        template: 'Read this as a [[1]] director. What is [[2]]? What is the one change that matters [[3]]?',
        blanks: [['sceptical', 'busy'], ['missing', 'unclear'], ['most']],
        distractors: ['sleepy', 'great', 'least'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful feedback on a job application cover letter?',
        options: [
          { text: 'Is my cover letter good?', why: 'Encouragement, not feedback.' },
          { text: 'Read this as a hiring manager with 200 applications. Where would you stop reading? What is the strongest line? What is the one change that matters most?' },
          { text: 'Rewrite my cover letter.', why: 'A rewrite replaces your voice; ask for feedback first.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'AI feedback is enough, or ask a colleague too?',
        groups: ['AI is enough', 'Ask a colleague too'],
        items: [
          { text: 'A quick team chat message', group: 0 },
          { text: 'A proposal that touches office politics', group: 1 },
          { text: 'Checking clarity of a how-to note', group: 0 },
          { text: 'A sensitive message to a client who is upset', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The AI gave me 25 suggestions on my one-page plan. I'm drowning.",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Do all 25.', why: 'Most will be nitpicks; it may get worse.' },
          { text: 'Do none of them.', why: 'Some may matter. Ask for priorities.' },
          { text: 'Ask for the top 3, most important first, and what already works.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Also ask what ... so you do not edit out your best part (one word)',
        answers: ['works', 'is working', 'is good'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feedback question to what it finds.',
        pairs: [
          ['What is unclear?', 'Confusing parts'],
          ['What is missing?', 'Gaps the reader will ask about'],
          ['What would make you say no?', 'Weak arguments'],
          ['What works?', 'Parts to keep'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What can a human colleague notice that an AI tool often cannot?',
        options: [
          { text: 'Office politics, history and unwritten rules' },
          { text: 'Spelling mistakes', why: 'AI tools are good at those.' },
          { text: 'Nothing', why: 'Colleagues know context the AI never saw.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What are you writing soon that deserves a critical first read? Which reader would you ask the AI to be?',
    starters: ['I am writing...', 'I would ask it to read as...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask for "top 3 changes plus what works" on your next important draft.' },
  notes: 'AI tendency toward encouraging responses is described generally ("tend to"). "100 press releases" and "200 applications" are illustrative in prompts.',
};

export default lesson;
