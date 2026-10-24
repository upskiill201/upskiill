import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Unit Challenge: twelve pages to one. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: twelve pages to one',
  summary: 'The board meets on Tuesday. Zanele sends one page and three appendices. Everything from Chapter 4.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Turn a long report into a one-pager', 'Use everything from Chapter 4 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Tuesday\'s board meeting',
      html: '<p><strong>Title:</strong> <em>Saturday dispatch cut late deliveries from 34% to 21%. Roll it out to all three depots.</em></p><p><strong>Box:</strong> Decision needed today: approve rollout to Mombasa and Kisumu from August.</p><p><strong>Headings:</strong> "Late deliveries fell to 21%" · "Refunds fell by a third" · "KES 120,000 a month per depot" · "Main risk: Saturday drivers, and our plan".</p><p><strong>Appendices:</strong> A (method), B (weekly data), C (driver survey).</p><p>Mrs Achieng sits in. One board member reads the title out loud and asks a single question: "How sure are you about the drivers in Mombasa?" The answer is in Appendix C. The board approves the rollout in eleven minutes.</p>',
    },
    {
      kind: 'story',
      title: 'After the board',
      beats: [
        { speaker: 'achieng', text: 'Eleven minutes. Last year a depot paper took an hour and got sent back.' },
        { speaker: 'felix', text: 'Zanele, bad news. Week 9 in Nairobi: late deliveries jumped to 28%. Two Saturday drivers quit.' },
        { speaker: 'tey', text: 'That\'s Chapter 4: page one, scanning, message headings, formatting, appendix or cut. Next: hard messages.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: the one-pager.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How long did the board take to approve the rollout?',
        options: [
          { text: 'An hour', why: 'That was last year\'s paper.' },
          { text: 'Eleven minutes' },
          { text: 'They sent it back', why: 'They approved it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Page one or appendix?',
        groups: ['Page one', 'Appendix'],
        items: [
          { text: 'Decision needed today', group: 0 },
          { text: 'Weekly data', group: 1 },
          { text: '"Refunds fell by a third"', group: 0 },
          { text: 'Driver survey', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did the Week 9 late rate jump to? (a percentage)',
        answers: ['28', '28%'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 4 skill to where Zanele used it.',
        pairs: [
          ['Message title', '"Roll it out to all three depots"'],
          ['Decision in a box', '"Approve rollout from August"'],
          ['Appendix', 'Answered the Mombasa drivers question'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'The board just approved it. Do I really have to tell Mr Kamau about week 9 today?',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Today. Bad news gets worse with age, and he should hear it from you, with a plan, before he hears it from someone else.' },
          { text: 'Wait until it improves.', why: 'Bad news should travel early.' },
          { text: 'Hide it in the next monthly report.', why: 'That\'s how trust is lost.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 in one line.',
        template: 'Page [[1]] decides; the [[2]] holds the detail.',
        blanks: [['one'], ['appendix']],
        distractors: ['eleven', 'title'],
      },
      {
        kind: 'findBug',
        prompt: 'Which heading on the one-pager would have failed check 17?',
        lines: [
          'Late deliveries fell to 21%',
          'Refunds fell by a third',
          'KES 120,000 a month per depot',
          'Other considerations',
        ],
        bug: 3,
        fix: 'Main risk: Saturday drivers, and our plan',
        explanation: '"Other considerations" says nothing.',
      },
      {
        kind: 'mcq',
        prompt: 'Where was the answer to the board member\'s question?',
        options: [
          { text: 'Page 11', why: 'There is no page 11 now.' },
          { text: 'Appendix C' },
          { text: 'Nowhere', why: 'It was in the driver survey.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Saturday drivers quit?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Zanele\'s rebuild of the report.',
        lines: ['Write the message as the title', 'Box the decision', 'Write message headings', 'Move detail to appendices', 'Run checks 16 to 20'],
      },
    ],
  },
  reflect: {
    prompt: 'Turn a long document you wrote into one page and appendices. What changed?',
    starters: ['Page one now says...', 'The appendix holds...'],
  },
  deepen: {
    title: 'Short documents, fast decisions',
    summary: 'A page that lets readers decide quickly saves time for everyone in the room. The detail still matters: it\'s what lets you answer the hard question in seconds.',
  },
  notes: 'Chapter 4 challenge (fictional): board approves rollout to Mombasa and Kisumu from August in 11 minutes. Hook: week 9 Nairobi late rate 28%, two Saturday drivers quit (Ch5 bad-news email).',
};

export default lesson;
