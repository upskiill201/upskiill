import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Reading: make responding easy. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Make responding easy',
  summary: 'The sixth principle of Writing for Busy Readers is the one most writers forget: make it easy for the reader to do what you asked. Zanele redesigns her asks so they take seconds to answer.',
  minutes: 12,
  outcomes: [
    'Design asks that are quick to answer',
    'Give options, deadlines and next steps',
    'Remove effort from the reader\'s side',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Lower the effort',
      html: '<p>Rogers and Lasky-Fink\'s sixth principle: <strong>make responding easy</strong>. Every bit of effort you leave for the reader (working out what you want, finding a file, choosing between vague options) lowers the chance they\'ll reply.</p><p>Ways to lower the effort:</p><ul><li><strong>Ask a closed question</strong> when you can: "Yes or no?" beats "What do you think?"</li><li><strong>Give options:</strong> "Shall we start Lagos in (a) June or (b) July?" The reader just picks.</li><li><strong>Give a deadline and a reason:</strong> "By Friday, so rotas go out on Monday."</li><li><strong>Include what they need</strong> to answer: the number, the link, the attachment.</li><li><strong>Say what happens if they don\'t reply</strong>, when that\'s fair: "If I don\'t hear by Friday, I\'ll keep the current rota."</li></ul><p>For Emeka, that meant: a template spreadsheet with the exact columns, instead of "could you send some data?"</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Closed questions, clear options, a deadline with a reason, everything they need attached.',
    },
  ],
  apply: {
    scenario: 'Easy to respond.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Easy to respond to, or hard?',
        groups: ['Easy', 'Hard'],
        items: [
          { text: '"Yes or no by Friday?"', group: 0 },
          { text: '"Thoughts?"', group: 1 },
          { text: '"Pick (a) June or (b) July."', group: 0 },
          { text: '"Could you send some data at some point?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Zanele send Emeka to make responding easy?',
        options: [
          { text: 'A template spreadsheet with the exact columns' },
          { text: 'A 900-word explanation', why: 'That adds effort.' },
          { text: 'Nothing, just "send data"', why: 'Too vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the effort to how to remove it.',
        pairs: [
          ['Working out what you want', 'A closed question'],
          ['Choosing between vague ideas', 'Clear options'],
          ['Finding the file', 'Attach it'],
          ['Not knowing when', 'A deadline with a reason'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Thanks for the template! Took me five minutes. Usually these requests take an hour of back and forth.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: '"Took you long enough."', why: 'He was fast.' },
          { text: 'No reply.', why: 'Thank him and close the loop.' },
          { text: '"Thank you, that\'s exactly what I needed. I\'ll share what Lagos could gain by Monday."' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Closed question.',
        template: '"[[1]] or [[2]]?" beats "What do you think?"',
        blanks: [['Yes'], ['no']],
        distractors: ['Maybe', 'later'],
      },
      {
        kind: 'mcq',
        prompt: 'When is it fair to say what happens if they don\'t reply?',
        options: [
          { text: 'Always, as a threat', why: 'Only as a fair default.' },
          { text: 'When there\'s a sensible default that doesn\'t harm them' },
          { text: 'Never', why: 'It can help busy readers.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did the template take Emeka?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line adds effort for the reader?',
        lines: [
          'Please approve the June pilot: yes or no?',
          'Cost and results are in the table below.',
          'The details are somewhere in last month\'s shared drive.',
          'By Friday, so rotas go out Monday.',
        ],
        bug: 2,
        fix: 'Details attached.',
        explanation: '"Somewhere in the shared drive" makes him search.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What number principle is "make responding easy" in the book?',
        answers: ['6', 'six', 'sixth'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to design an easy ask.',
        lines: ['Make it a closed question or options', 'Add a deadline and reason', 'Attach what they need', 'Say the default if fair'],
      },
    ],
  },
  reflect: {
    prompt: 'Take an ask you\'ve sent that got no reply. How could you have made responding easier?',
    starters: ['I asked...', 'I could have...'],
  },
  deepen: {
    title: 'Defaults are powerful',
    summary: 'Behavioural science shows people often stick with defaults. "If I don\'t hear back, I\'ll do X" is useful, as long as X is fair and you\'d be happy with it.',
  },
  notes: 'Rogers & Lasky-Fink (2023), principle 6. Default effects: e.g. Johnson & Goldstein (2003), "Do defaults save lives?", Science 302.',
};

export default lesson;
