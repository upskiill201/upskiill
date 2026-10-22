import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: why plain language works. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why plain language works',
  summary: 'Brian worries plain words will sound "basic". Mrs Achieng sends him the evidence: governments, courts and companies have tested plain language for decades, and it keeps winning.',
  minutes: 12,
  outcomes: [
    'Know what plain language is',
    'Know the evidence that it works',
    'Explain it to someone who prefers jargon',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Plain language, tested',
      html: '<p><strong>Plain language</strong> is writing your reader can understand the first time they read it: common words, short sentences, the point first, and a clear structure.</p><p>It\'s not just a style choice:</p><ul><li>In 2010 the United States passed the <strong>Plain Writing Act</strong>, requiring federal agencies to write public documents clearly.</li><li>Legal-writing professor Joseph Kimble gathered decades of studies in <em>Writing for Dollars, Writing to Please</em> (2012). Again and again, plain versions of letters, forms and legal documents were understood better, preferred by readers, and saved time and money, for example through fewer calls asking "what does this mean?".</li><li>Daniel Oppenheimer\'s experiments (Chapter 1) showed that needless complexity makes writers seem <em>less</em> intelligent.</li></ul><p>Plain language works for experts too. Specialists still prefer clear writing; they just know more technical terms. Use a technical term when your reader knows it and it\'s the most precise word. Drop the rest.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Plain language: understood the first time. It\'s tested, preferred and cheaper, for experts too.',
    },
  ],
  apply: {
    scenario: 'Plain language.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is plain language?',
        options: [
          { text: 'Writing with no long words ever', why: 'It\'s about the reader understanding.' },
          { text: 'Writing your reader understands the first time they read it' },
          { text: 'Writing for children', why: 'For any reader.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did the US pass the Plain Writing Act?',
        answers: ['2010'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'What did plain versions tend to do in Kimble\'s collected studies?',
        groups: ['Plain versions did', 'Didn\'t'],
        items: [
          { text: 'Get understood better', group: 0 },
          { text: 'Get preferred by readers', group: 0 },
          { text: 'Confuse experts', group: 1 },
          { text: 'Save time and money', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to what it shows.',
        pairs: [
          ['Plain Writing Act (2010)', 'Governments require clarity'],
          ['Kimble (2012)', 'Plain saves time and money'],
          ['Oppenheimer (2006)', 'Complexity makes writers seem less smart'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Plain words are fine for drivers, but for executives we need sophistication.',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'You\'re right, executives love jargon.', why: 'The evidence says otherwise.' },
          { text: 'Executives don\'t read.', why: 'They do, briefly.' },
          { text: 'Mr Kamau reads two lines of everything. Executives are the busiest readers of all. Plain is how you get read.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Technical terms.',
        template: 'Use a technical term when your reader [[1]] it and it\'s the most [[2]] word.',
        blanks: [['knows'], ['precise', 'accurate']],
        distractors: ['fears', 'impressive'],
      },
      {
        kind: 'mcq',
        prompt: 'Do experts prefer complex writing?',
        options: [
          { text: 'No. Specialists also prefer clear writing; they just know more terms' },
          { text: 'Yes, always', why: 'Studies show they prefer clarity too.' },
          { text: 'Experts never read', why: 'They do, and prefer clarity.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Brian\'s style guide is a myth?',
        lines: [
          'Know who the reader is.',
          'Put the point first.',
          'Use complex words for senior readers.',
          'Keep sentences short.',
        ],
        bug: 2,
        fix: 'Use plain words for every reader.',
        explanation: 'Senior readers are the busiest.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Kimble\'s "Writing for Dollars, Writing to Please" published?',
        answers: ['2012'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the parts of the plain-language definition in this lesson.',
        lines: ['Common words', 'Short sentences', 'The point first', 'A clear structure'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a confusing letter or form you received. What would the plain version say?',
    starters: ['It said...', 'Plainly:...'],
  },
  deepen: {
    title: 'Plain language around the world',
    summary: 'Many countries, from the UK to New Zealand, have plain-language guidance for public writing, and an international standard for plain language was published in 2023.',
  },
  notes: 'US Plain Writing Act of 2010. Kimble, Writing for Dollars, Writing to Please: The Case for Plain Language in Business, Government, and Law (2012). Oppenheimer (2006). ISO 24495-1:2023 (plain language, part 1).',
};

export default lesson;
