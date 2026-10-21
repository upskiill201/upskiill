import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final Challenge: the offer (course finale). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: the offer',
  summary: 'Thursday morning, an email from Synergix. Five weeks ago Remi talked for four minutes and got turned down. The final challenge uses the whole course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use everything from the course together', 'Respond well to an offer'],
  learn: [
    {
      kind: 'reading',
      title: 'The email',
      html: '<p><em>"Dear Remi, we\'re delighted to offer you a 12-week internship in our Strategy &amp; Operations team, reporting to Brian Otieno, starting 3 February. The stipend is KES 35,000 a month plus a transport allowance. Please confirm by Friday 24th."</em></p><p>Remi replies:</p><p><em>"Thank you so much, I\'m delighted and I\'d love to accept. Could you confirm the working hours, and whether I\'ll need my own laptop? I\'ll confirm formally once I\'ve read the full offer letter."</em></p><p>The answers come back: 8:30 to 5, a laptop provided. Remi accepts.</p><p>Five weeks: a four-minute ramble and a no; a strong first 20 minutes and second place; three recorded STAR answers; an assessment day; and a yes.</p>',
    },
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'remi', text: 'Ada. I got it. Strategy & Operations. Starting in February.' },
        { speaker: 'ada', text: 'YES! And Zanele?' },
        { speaker: 'remi', text: 'She got the other place. We\'re interns together. Brian\'s first email already says "let\'s touch base offline".' },
        { speaker: 'tey', text: 'That\'s this course. Remi\'s internship, and Synergix\'s jargon, are the next one: Corporate Jargon.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the offer.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'What monthly stipend does Synergix offer, in KES?',
        answers: ['35000', '35,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How does KES 35,000 compare with Remi\'s own range (30,000 to 35,000)?',
        options: [
          { text: 'It\'s the top of his range' },
          { text: 'It\'s below his range', why: 'It\'s at the top.' },
          { text: 'It\'s double his range', why: 'It\'s exactly the top.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter\'s skill is this?',
        groups: ['Ch 1–2', 'Ch 3–4', 'Ch 5'],
        items: [
          { text: 'A 60-second opening', group: 0 },
          { text: 'Six STAR stories', group: 1 },
          { text: 'Bringing Zanele in', group: 2 },
          { text: 'Researching Mtaa Labs', group: 0 },
          { text: 'A researched salary range', group: 1 },
          { text: 'A same-day thank-you', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each interview to what happened.',
        pairs: [
          ['Savanna Bank', 'A no, with useful feedback'],
          ['Mtaa Labs', 'Second place, door left open'],
          ['Synergix', 'The offer'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Should I just say yes immediately?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Say you\'re delighted and want to accept, ask your two questions, and confirm once you\'ve read the letter.' },
          { text: 'Wait a week to seem cool.', why: 'Respond warmly and promptly.' },
          { text: 'Accept without reading anything.', why: 'Check the letter.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The course in one line.',
        template: 'Open well, [[1]], tell true [[2]], handle hard questions, follow up.',
        blanks: [['research'], ['stories']],
        distractors: ['guess', 'lies'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks is the Synergix internship?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s acceptance email is a mistake?',
        lines: [
          'Thank you so much, I\'m delighted.',
          'Could you confirm the working hours?',
          'Also, could you drop the start date to next week? I\'m bored.',
          'I\'ll confirm formally once I\'ve read the letter.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Unprofessional, and not a real need.',
      },
      {
        kind: 'mcq',
        prompt: 'What did the Savanna Bank rejection teach Remi that helped most?',
        options: [
          { text: 'Keep the opening answer to about a minute' },
          { text: 'Never apply to banks', why: 'The lesson was about his answer.' },
          { text: 'Nothing', why: 'The feedback fixed his opening.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s five weeks.',
        lines: ['Savanna Bank screen', 'Mtaa Labs first interview', 'Synergix recorded video', 'Mtaa Labs round two', 'Synergix assessment day', 'The offer'],
      },
    ],
  },
  reflect: {
    prompt: 'Your final challenge: use your interview card for your next real interview. Afterwards, write what went well and one thing to improve.',
    starters: ['Went well:...', 'To improve:...'],
  },
  deepen: {
    title: 'Next: Corporate Jargon',
    summary: 'Remi\'s internship starts with an email full of jargon from Brian Otieno. Corporate Jargon: Speak the Language of Business follows his first weeks at Synergix.',
  },
  notes: 'Course finale (fictional): Synergix 12-week Strategy & Operations internship, KES 35,000/month + transport, start 3 February, reporting to Brian Otieno; Zanele also offered. Leads into Corporate Jargon (CAST.md).',
};

export default lesson;
