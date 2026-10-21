import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Reading: writing for busy readers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Writing for busy readers',
  summary: 'Mrs Achieng hands Zanele a book she keeps on her desk: Writing for Busy Readers. Its authors tested what makes people actually read and respond. Six principles.',
  minutes: 12,
  outcomes: [
    'Know the six principles for busy readers',
    'See why fewer words get more action',
    'Apply the principles to a work update',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Six principles',
      html: '<p>Todd Rogers and Jessica Lasky-Fink study how people read real messages, from school notices to government letters, using experiments with thousands of readers. In <em>Writing for Busy Readers</em> (2023) they distil six principles:</p><ol><li><strong>Less is more:</strong> fewer words, fewer ideas, fewer requests.</li><li><strong>Make reading easy:</strong> short, common words and short sentences.</li><li><strong>Design for easy navigation:</strong> put key information first; use headings.</li><li><strong>Use enough formatting, but no more:</strong> bold or bullets for what matters, not everything.</li><li><strong>Tell readers why they should care:</strong> what\'s in it for them.</li><li><strong>Make responding easy:</strong> say exactly what you need, and make it simple to do.</li></ol><p>Their core finding: busy readers are not lazy; they\'re busy. Messages that respect their time are read more, and acted on more.</p><p>Zanele\'s 900 words broke all six. The rest of this course is about fixing that.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Less is more; easy to read; easy to navigate; enough formatting; why they should care; easy to respond.',
    },
  ],
  apply: {
    scenario: 'Six principles.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the six principles as the book lists them.',
        lines: ['Less is more', 'Make reading easy', 'Design for easy navigation', 'Use enough formatting, but no more', 'Tell readers why they should care', 'Make responding easy'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the principle to what it means.',
        pairs: [
          ['Less is more', 'Fewer words, ideas and requests'],
          ['Make reading easy', 'Short, common words'],
          ['Easy navigation', 'Key information first'],
          ['Easy to respond', 'Say exactly what you need'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do the authors say about busy readers?',
        options: [
          { text: 'They\'re not lazy, they\'re busy' },
          { text: 'They\'re lazy', why: 'The opposite.' },
          { text: 'They read everything carefully', why: 'They skim.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Follows the principles, or breaks them?',
        groups: ['Follows', 'Breaks'],
        items: [
          { text: 'One clear request', group: 0 },
          { text: 'Five requests in one email', group: 1 },
          { text: 'Result in the first line', group: 0 },
          { text: 'Every sentence in bold', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Six principles is a lot to remember.',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Start with one: less is more. Most of the others follow once you cut.' },
          { text: 'Memorise all six tonight.', why: 'Start with one.' },
          { text: 'Ignore them.', why: 'They work.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Principle 1.',
        template: 'Less is more: fewer words, fewer [[1]], fewer [[2]].',
        blanks: [['ideas'], ['requests']],
        distractors: ['readers', 'greetings'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Writing for Busy Readers published?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'Which principle did "the result in paragraph five" break most?',
        options: [
          { text: 'Design for easy navigation (key information first)' },
          { text: 'Use enough formatting', why: 'It was about position.' },
          { text: 'None', why: 'It buried the key information.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Zanele\'s new rules misreads the book?',
        lines: [
          'Fewer words, fewer ideas.',
          'Key information first.',
          'Bold every important-looking sentence.',
          'Say exactly what I need.',
        ],
        bug: 2,
        fix: 'Bold only what matters most.',
        explanation: '"Enough formatting, but no more."',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which principle is this?',
        groups: ['Why care', 'Easy to respond'],
        items: [
          { text: '"This cuts refunds by a third."', group: 0 },
          { text: '"Reply yes or no by Thursday."', group: 1 },
          { text: '"This affects your depot."', group: 0 },
          { text: '"Just click approve."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the six principles do you break most often?',
    starters: ['I most often break...'],
  },
  deepen: {
    title: 'Evidence from the field',
    summary: 'Rogers and Lasky-Fink ran real-world experiments, for example with school messages and public-service letters, measuring whether people read and responded. Simpler versions usually won.',
  },
  notes: 'Rogers & Lasky-Fink, Writing for Busy Readers: Communicate More Effectively in the Real World (2023): six principles (less is more; make reading easy; design for easy navigation; use enough formatting but no more; tell readers why they should care; make responding easy).',
};

export default lesson;
