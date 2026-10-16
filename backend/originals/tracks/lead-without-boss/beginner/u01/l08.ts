import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Side by side: the kick-off invite, two ways (respecting people's time; clear purpose). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The first ask',
  summary: 'Thursday afternoon. Remi needs all five people in one room on Monday. They owe him nothing, and each of them already has too many meetings. His first draft invite is ready. Tey puts it next to a second version.',
  minutes: 11,
  outcomes: [
    'Write a first ask that respects people\'s time',
    'Say what\'s in it for them, not just for you',
    'Make it easy to say yes',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The kick-off invite',
      before: { label: 'Draft 1', text: 'Subject: Refund Process Optimisation Initiative. Hi all, please attend a 2-hour workshop on Monday to discuss the refund process transformation roadmap. Attendance is important. Thanks, Remi.' },
      after: { label: 'Draft 2', text: 'Subject: 30 min Monday: cutting refunds from 21 days to 5. Hi all, I visited each of you this week, and you showed me the three real delays. I\'d love 30 minutes to agree which to fix first. Njeri will share the signature story. If Monday doesn\'t work, I\'ll come to you. Remi' },
      notes: [
        'Draft 2 says the goal in the subject line.',
        '30 minutes is easy to say yes to. Two hours isn\'t.',
        'It credits them, and offers a way out.',
      ],
    },
    {
      kind: 'text',
      html: "<p>People without a reason to help you decide fast: is this worth my time? Draft 1 is all about Remi's project, in jargon (Remi would know: he spent his internship decoding it). Draft 2 is about <strong>their</strong> work: what they told him, what they'll decide, and how little time it takes. Making a first ask <strong>small, clear and easy to accept</strong> is a gentle way to start. Bigger asks can come once they've seen it's worth it.</p>",
    },
    {
      kind: 'check',
      question: 'Why ask for 30 minutes instead of two hours?',
      options: ['A small first ask is easy to say yes to', 'Remi is busy', 'Workshops are banned'],
      answer: 0,
      explanation: 'Start small. Earn the bigger asks.',
    },
  ],
  apply: {
    scenario: 'Thursday, the invite.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Draft 1 or Draft 2?',
        groups: ['Draft 1', 'Draft 2'],
        items: [
          { text: '"Transformation roadmap"', group: 0 },
          { text: '"21 days to 5"', group: 1 },
          { text: '"Attendance is important."', group: 0 },
          { text: '"If Monday doesn\'t work, I\'ll come to you."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Draft 2 do that Draft 1 doesn\'t?',
        options: [
          { text: 'Sounds more professional', why: 'Draft 1 sounds more corporate. Draft 2 works better.' },
          { text: 'Mentions the CEO', why: 'Neither does, and that\'s fine.' },
          { text: 'Makes it about their work, and easy to say yes to' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'I\'m in back-to-back meetings Monday. Can I skip?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Of course. Could I grab 10 minutes at your desk Tuesday to catch you up and hear your view?' },
          { text: 'No, attendance is important.', why: 'He doesn\'t report to you.' },
          { text: 'Fine, we\'ll do it without IT.', why: 'Then the system part stalls.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Put the ___ in the subject line: "21 days to 5". (one word)',
        answers: ['goal', 'Goal', 'result', 'point'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Draft 2 line to its job.',
        pairs: [
          ['"30 min Monday"', 'Small ask'],
          ['"You showed me the three delays"', 'Credit to them'],
          ['"I\'ll come to you"', 'Easy way out'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does jargon hurt a first ask?',
        options: [
          { text: 'It\'s too short', why: 'It\'s usually longer.' },
          { text: 'It hides what you actually want and why it matters to them' },
          { text: 'It doesn\'t; it sounds senior', why: 'It sounds like another initiative to ignore.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 3. Which line breaks the advice?',
        lines: [
          'Subject: 30 min Monday: refunds from 21 days to 5.',
          'Please come prepared with a 10-slide presentation each.',
          'Njeri will share the signature story.',
        ],
        bug: 1,
        fix: 'No prep needed. Just bring what you told me this week.',
        explanation: 'Homework turns a small ask into a big one.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good first ask in order.',
        lines: ['The goal, in the subject', 'Credit what they told you', 'A small, clear ask', 'An easy way out'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make the first ask [[1]], [[2]] and easy to [[3]].',
        blanks: [['small'], ['clear'], ['accept', 'say yes to']],
        distractors: ['long', 'refuse'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the subject line.',
        tiles: ['30', 'min:', 'refunds', '21', 'days', 'to', '5'],
        distractors: ['roadmap'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time you asked busy people for their time. Was it closer to Draft 1 or Draft 2? Rewrite it.',
    starters: ['My ask was...', 'Rewritten: ...'],
  },
  deepen: {
    title: 'Halve it',
    summary: 'Next time you invite people to a meeting, halve the time and put the goal in the subject line. See how many more say yes.',
  },
  notes: 'Starting with a small, clear request: consistent with commitment/consistency research (Freedman & Fraser 1966, foot-in-the-door; Cialdini). Plain-language requests: links to Corporate Jargon course. Hedged as "a gentle way to start".',
};

export default lesson;
