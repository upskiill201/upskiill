import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: why one-on-ones matter (Rogelberg). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why one-on-ones matter',
  summary: 'Lucía realises she found out about the newsletter by accident. "If we\'d had a proper one-on-one on Wednesday, he\'d have told me." Tey hands her some research to read on the Metro home.',
  minutes: 12,
  outcomes: [
    'Know what research says about one-on-one meetings',
    'Know how often to meet, and for how long',
    'Know who should drive the conversation',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The meeting that matters most',
      html: "<p>A <strong>one-on-one</strong> is a regular, private meeting between a leader and each person on their team. Not a status report. A conversation about how they're doing, what's in their way, and how you can help.</p><h3>What the research says</h3><p>Organisational psychologist <strong>Steven Rogelberg</strong> has studied one-on-ones for years (his book is called <em>Glad We Met</em>). Some findings:</p><ul><li>Employees whose managers meet with them regularly are much more likely to feel engaged. Some research puts it at roughly <strong>three times</strong> as likely.</li><li>Employees rate nearly <strong>half</strong> of their one-on-ones as not very good, and managers tend to think theirs go better than they do.</li><li>The clearest warning sign of a bad one-on-one: <strong>the manager talks too much</strong>.</li><li>A good default rhythm is <strong>weekly, about 30 minutes</strong>. Every two weeks for 45–60 minutes can work too. Much less often, and it's hard to build trust or catch problems early.</li></ul><h3>Whose meeting is it?</h3><p>Rogelberg's advice: the <strong>employee</strong> should drive the agenda. The leader's job is to ask good questions, listen, and help. \"What's on your mind?\" beats \"Let me tell you about the summer plan.\"</p><h3>Back to Tomás</h3><p>A weekly half hour on Wednesday, with a question like \"Anything worrying you this week?\", would very likely have surfaced the newsletter three days earlier.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the clearest warning sign of a bad one-on-one, according to Rogelberg?',
      options: ['The manager talks too much', 'It runs five minutes over', 'It happens every week'],
      answer: 0,
      explanation: 'When the manager dominates, it stops being the employee\'s meeting.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Weekly, about 30 minutes, their agenda. You ask, listen and help. You talk less.',
    },
  ],
  apply: {
    scenario: 'The Metro home, reading Rogelberg.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s a one-on-one for?',
        options: [
          { text: 'A status report on tasks', why: 'Status updates can happen elsewhere.' },
          { text: 'How the person is doing, what\'s in their way, and how you can help' },
          { text: 'Telling them what they did wrong', why: 'Feedback can come up, but it isn\'t the purpose.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding.',
        pairs: [
          ['Best default rhythm', 'Weekly, about 30 minutes'],
          ['Who drives the agenda', 'The employee'],
          ['Biggest warning sign', 'The manager talks too much'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good one-on-one, or bad one?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"What\'s on your mind this week?"', group: 0 },
          { text: 'The manager talks for 25 of the 30 minutes', group: 1 },
          { text: 'Cancelled three weeks in a row', group: 1 },
          { text: '"What\'s one thing I could do to help?"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Weekly feels like a lot. Six people, every week?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Three hours a week to know your team, catch problems early and help people grow. That IS the job.' },
          { text: 'Yes, do it once a year instead.', why: 'Too rare to build trust.' },
          { text: 'Do them all at once in a group.', why: 'Then they\'re not one-on-ones.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rogelberg\'s book on one-on-ones is called "Glad We ___". (one word)',
        answers: ['Met', 'met'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Employees rate about how many of their one-on-ones as not very good?',
        options: [
          { text: 'Almost none', why: 'Much more than that.' },
          { text: 'All of them', why: 'Not that bad.' },
          { text: 'Nearly half' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s one-on-one plan. Which line breaks the research?',
        lines: [
          'Weekly, 30 minutes, with each person.',
          'I\'ll prepare a 20-minute update on my plans to open each one.',
          'Start with "What\'s on your mind?"',
        ],
        bug: 1,
        fix: 'Let them bring the topics; I\'ll keep my updates to two minutes.',
        explanation: 'A 20-minute speech turns their meeting into hers.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good one-on-one in order.',
        lines: ['"What\'s on your mind?"', 'Listen and ask follow-ups', '"How can I help?"', 'Agree next steps'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Weekly, about [[1]] minutes, [[2]] agenda. You ask, [[3]] and help.',
        blanks: [['30', 'thirty'], ['their'], ['listen']],
        distractors: ['my', 'talk'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the best opening question.',
        tiles: ['What\'s', 'on', 'your', 'mind', 'this', 'week?'],
        distractors: ['plan'],
      },
    ],
  },
  reflect: {
    prompt: 'If you have one-on-ones (as a leader or team member), how do they go? Who talks most? What would make them better?',
    starters: ['Our one-on-ones are...', 'They\'d be better if...'],
  },
  deepen: {
    title: 'Count the talking',
    summary: 'In your next one-on-one (either side), notice roughly what share of the time each person talks. If you lead, aim for them talking most of it.',
  },
  notes: 'Steven G. Rogelberg, Glad We Met: The Art and Science of 1:1 Meetings (2024): employees rate nearly half of 1:1s as suboptimal; managers overestimate quality; manager over-talking is a key failure sign; employee should drive the agenda; weekly ~30 min (or biweekly 45–60) suggested; regular 1:1s linked to markedly higher engagement (reported as roughly 3x; hedged as "some research puts it at").',
};

export default lesson;
