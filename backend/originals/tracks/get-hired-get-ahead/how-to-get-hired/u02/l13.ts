import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 13 — feedback makes it real: asking users, improving, showing before/after. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Feedback makes it real',
  summary: 'The treasurer loves the tracker, but two members still can\'t find their own row. Clinton is tempted to say "they\'ll get used to it". Tey shows him why feedback is the most valuable part of any portfolio piece.',
  minutes: 11,
  outcomes: ['Ask users for useful feedback', 'Improve something based on what people say', 'Show the improvement as proof'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'After the meeting, two members tell Clinton they can\'t find their own name on the tracker. His first thought: "They\'ll get used to it." What\'s wrong with that?',
          replies: ['He\'s not listening', 'Maybe they will?'],
        },
        {
          tey: 'If two of twelve are lost, that\'s one in six people. That\'s not them, it\'s the design. And here\'s the good news: this feedback is gold for his portfolio.',
          replies: ['Gold? It\'s a complaint.'],
        },
        {
          tey: 'A complaint you fix becomes a story: "Two members couldn\'t find their row, so I sorted names alphabetically and added a search box. Next meeting, everyone found theirs in seconds." That shows you listen and improve. Employers want both.',
          replies: ['How do I ask for feedback?'],
        },
        {
          tey: 'Ask specific questions, not "Do you like it?" (everyone says yes). Try: "What was confusing?", "What did you try to do that didn\'t work?", "What would make you stop using it?" Then watch someone use it without helping. Where they hesitate is where to improve.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A complaint you fix is a story you can tell. Ask specific questions and watch people use it.',
    },
  ],
  apply: {
    scenario: 'Clinton asks the njangi for feedback.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question gets the most useful feedback?',
        options: [
          { text: '"Do you like it?"', why: 'Most people say yes to be kind. You learn nothing.' },
          { text: '"What was confusing when you tried to find your payment?"' },
          { text: '"It\'s good, right?"', why: 'A leading question. People just agree.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful feedback question, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'What did you try to do that didn\'t work?', group: 0 },
          { text: 'Isn\'t it great?', group: 1 },
          { text: 'What would make you stop using it?', group: 0 },
          { text: 'You like the colours, yes?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Two members can\'t find their row. They\'ll get used to it, right?',
        options: [
          { text: 'One in six people lost means it\'s the design. Sort the names and add a search, then ask them again.' },
          { text: 'Yes, ignore them.', why: 'Ignoring users is how tools stop being used.' },
          { text: 'Tell them to try harder.', why: 'If people struggle, the design should change.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the feedback loop in order.',
        lines: ['Watch someone use it without helping', 'Ask specific questions', 'Fix the biggest problem', 'Ask again to check it worked'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns feedback into a weak story.',
        lines: ['Two members couldn\'t find their row.', 'I made some changes.', 'Next meeting, everyone found their name in seconds.'],
        bug: 1,
        fix: 'I sorted names alphabetically and added a search box.',
        explanation: '"Some changes" hides the decision. Say exactly what you changed.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a fixed complaint good for a portfolio?',
        options: [
          { text: 'It shows you listen to users and improve your work' },
          { text: 'It isn\'t, hide all complaints', why: 'Fixed complaints are some of the best proof there is.' },
          { text: 'It makes the case study longer', why: 'Length isn\'t the point. It shows a valuable habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each feedback to a fix.',
        pairs: [
          ['Can\'t find my name', 'Sort names and add a search'],
          ['Don\'t know whose turn it is', 'Show next collector at the top'],
          ['Text is too small on my phone', 'Make the text bigger'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s advice.',
        template: 'Ask [[1]] questions, and [[2]] people use it.',
        blanks: [['specific'], ['watch']],
        distractors: ['leading', 'stop', 'make'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two lost members out of twelve is one in how many? (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Where should Clinton look when he watches someone use the tracker?',
        options: [
          { text: 'Where they hesitate or get stuck: that\'s what to fix' },
          { text: 'At their face, to see if they\'re impressed', why: 'Look for where they get stuck.' },
          { text: 'Nowhere, he should help them through it', why: 'Helping hides the problems. Watch first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you made or did that someone criticised. What would a "fixed it" version of that story sound like?',
    starters: ['Someone said...', 'I could fix it by...', 'The story would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Show your portfolio idea (even a sketch) to one person. Ask "What\'s confusing?" and "What would make you not use it?" Write their answers down word for word.',
  },
  notes: 'User-testing basics (watch, don\'t help; ask open, specific questions; avoid leading questions) follow common usability practice (e.g. Nielsen Norman Group guidance on usability testing), simplified.',
};

export default lesson;
