import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or fact: documents. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: documents',
  summary: 'Brian still has doubts about the one-pager. Four things people believe about reports and documents. Which hold up?',
  minutes: 11,
  outcomes: [
    'Separate document myths from facts',
    'Answer the "short looks lazy" worry',
    'Know what makes a document look credible',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A longer report looks more serious, so readers trust it more.',
          isFact: false,
          explain: 'Myth, mostly. Length isn\'t what readers judge. Oppenheimer (2006) found needlessly complex writing made authors seem less intelligent, not more.',
        },
        {
          text: 'Many readers scan headings and first lines before deciding what to read.',
          isFact: true,
          explain: 'Fact. Eye-tracking research from the Nielsen Norman Group shows scanning patterns like the F-shape and the layer cake.',
        },
        {
          text: 'If something isn\'t on page one, it\'s lost.',
          isFact: false,
          explain: 'Myth. The appendix keeps it for readers who need it. Page one just makes sure the decision doesn\'t depend on them reading it.',
        },
        {
          text: 'Specific numbers in headings help readers remember the message.',
          isFact: true,
          explain: 'Fact, as a widely used practice. "Late deliveries fell to 21%" gives readers something concrete to carry away.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Length isn\'t credibility. Clear headings, specific numbers and an appendix for the detail are.',
    },
  ],
  apply: {
    scenario: 'Document myths.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Oppenheimer (2006) find about needlessly complex writing?',
        options: [
          { text: 'It made authors seem less intelligent' },
          { text: 'It made authors seem smarter', why: 'The opposite.' },
          { text: 'It had no effect', why: 'It hurt how the author was judged.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Longer reports are always trusted more', group: 0 },
          { text: 'Readers scan headings first', group: 1 },
          { text: 'Anything off page one is lost', group: 0 },
          { text: 'Numbers in headings help memory', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'The board will think a one-pager is lazy.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'The appendices show the work. Page one shows we know what matters. That usually reads as confident, not lazy.' },
          { text: 'Let\'s pad it to twelve pages.', why: 'Length isn\'t credibility.' },
          { text: 'The board doesn\'t care.', why: 'Answer the worry.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Length isn\'t [[1]]. Clear headings and specific [[2]] are.',
        blanks: [['credibility'], ['numbers']],
        distractors: ['boring', 'adjectives'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Oppenheimer\'s study published?',
        answers: ['2006'],
        placeholder: 'A year',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the worry to the answer.',
        pairs: [
          ['"Short looks lazy"', 'The appendix shows the work'],
          ['"They\'ll miss the detail"', 'It\'s kept in the appendix'],
          ['"Nobody reads headings"', 'Scanners read little else'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does page one guarantee?',
        options: [
          { text: 'The decision doesn\'t depend on reading the rest' },
          { text: 'Nobody reads the appendix', why: 'Some will.' },
          { text: 'The report is shorter overall', why: 'The detail is still there.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Brian\'s list is the myth?',
        lines: [
          'Readers scan headings first.',
          'An appendix can hold the full data.',
          'A longer report is always more credible.',
          'Numbers make headings memorable.',
        ],
        bug: 2,
        fix: 'Clear, specific writing is more credible.',
        explanation: 'Length isn\'t what readers judge.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Zanele answers Brian\'s worry.',
        lines: ['Agree the work matters', 'Point to the appendices', 'Show page one', 'Offer to walk the board through it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many statements in this lesson were facts?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever padded a document to look serious? What would a one-pager have said?',
    starters: ['I padded...', 'One page would say...'],
  },
  deepen: {
    title: 'Confidence on the page',
    summary: 'A short page one says "I know what matters". Readers often take that as a sign of expertise, especially when the detail is one page away.',
  },
  notes: 'Oppenheimer (2006), Applied Cognitive Psychology, "Consequences of erudite vernacular utilized irrespective of necessity". Nielsen (2006) F-pattern; Pernice (NN/g) layer-cake.',
};

export default lesson;
