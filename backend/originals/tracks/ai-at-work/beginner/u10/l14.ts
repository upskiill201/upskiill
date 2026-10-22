import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 14 — asking IT the right questions. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Asking IT the right questions',
  summary: 'Ada wants to try a new AI tool for the team. Instead of "is this OK?", she asks IT six clear questions and gets a clear answer in a day.',
  minutes: 12,
  outcomes: [
    'Ask IT clear questions about a new AI tool',
    'Know what IT and legal need to decide',
    'Get a fast, useful answer',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Ada\'s six questions for any new AI tool:</p>' +
        '<table><tr><th>Question</th><th>Why it matters</th></tr>' +
        '<tr><td><strong>What will we use it for?</strong></td><td>IT can\'t judge risk without the use case.</td></tr>' +
        '<tr><td><strong>What data would go in?</strong></td><td>Public text is low risk; customer data is high.</td></tr>' +
        '<tr><td><strong>Is our data used for training?</strong></td><td>And can we turn it off?</td></tr>' +
        '<tr><td><strong>Where is data stored, and for how long?</strong></td><td>Some laws care which country it\'s in.</td></tr>' +
        '<tr><td><strong>Is there a business plan?</strong></td><td>Often with stronger data terms and admin controls.</td></tr>' +
        '<tr><td><strong>Who has access?</strong></td><td>One person, the team, or a client too?</td></tr></table>' +
        '<p>Ask AI to help draft the request: <em>"Help me write a short request to IT to approve [tool] for [use], covering these six questions."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Use, data, training, storage, plan, access. Six questions get a faster, clearer answer than "Is this OK?"',
    },
  ],
  apply: {
    scenario: 'Ada asks IT about a new transcription tool.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the six questions.',
        lines: ['What will we use it for?', 'What data would go in?', 'Is data used for training?', 'Where is it stored?', 'Is there a business plan?', 'Who has access?'],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell IT the use case first?',
        options: [
          { text: 'To sound busy', why: 'Risk depends on use.' },
          { text: 'They can\'t judge the risk without knowing what you\'ll do with it' },
          { text: 'They don\'t need it', why: 'They do.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Low-risk data, or high-risk data?',
        groups: ['Low risk', 'High risk'],
        items: [
          { text: 'Public news articles', group: 0 },
          { text: 'Recorded calls with customers', group: 1 },
          { text: 'Ada\'s own meeting agenda', group: 0 },
          { text: 'Shop owners\' ID documents', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request to IT is best?',
        options: [
          { text: 'Is this tool OK?', why: 'Too vague.' },
          { text: 'Can we use [tool] to transcribe internal team meetings? Data: internal discussions, no customer data. Questions: is data used for training, where is it stored and for how long, is there a business plan, and who\'d have access?' },
          { text: 'I\'ve started using a tool, FYI.', why: 'Ask before, not after.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Our team just started using a new AI note-taker. Should we have asked IT?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No, it\'s fine.', why: 'Call recordings may include sensitive data.' },
          { text: 'Delete everything and panic.', why: 'Pause and ask.' },
          { text: 'Yes, ideally before. Pause it for client calls and send IT the six questions today.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the six-question summary.',
        template: 'Use, [[1]], training, storage, plan, [[2]].',
        blanks: [['data'], ['access']],
        distractors: ['colour', 'price'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s IT request is the weakest?',
        lines: [
          'Use: transcribe internal team meetings',
          'Data: internal only, no customer calls',
          'Questions: whatever you think matters',
          'Access: our team of five',
        ],
        bug: 2,
        fix: 'Questions: training use, storage location and time, business plan.',
        explanation: 'Specific questions get specific answers.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to why it matters.',
        pairs: [
          ['Training?', 'Whether your data improves their model'],
          ['Storage?', 'Which country and how long'],
          ['Business plan?', 'Stronger data terms and controls'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first question.',
        tiles: ['What', 'will', 'we', 'use', 'it', 'for?'],
        distractors: ['Whatever'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Ada ask IT?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask before using, or fine to just try?',
        groups: ['Ask first', 'Fine to try'],
        items: [
          { text: 'A tool that records client calls', group: 0 },
          { text: 'A public AI chat for a general question, no data', group: 1 },
          { text: 'A tool that connects to the company drive', group: 0 },
          { text: 'An approved tool already in use', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask before starting, not after?',
        options: [
          { text: 'Data already shared can\'t be taken back' },
          { text: 'IT likes paperwork', why: 'Data can\'t be un-shared.' },
          { text: 'It doesn\'t matter', why: 'It does.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there an AI tool you want to use at work? Write the six questions for it.',
    starters: ['The tool:', 'Use:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to help you draft a short IT request for a tool you want to try, covering the six questions.' },
  notes: 'General guidance; IT and legal processes vary.',
};

export default lesson;
