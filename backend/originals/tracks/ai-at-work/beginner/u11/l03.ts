import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 3 — templates with blanks. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Templates with blanks',
  summary: 'A saved prompt is good. A template with blanks is better: the fixed parts stay, and you fill in what changes. Ada turns her summary prompt into one.',
  minutes: 12,
  outcomes: [
    'Turn a prompt into a template with blanks',
    'Decide what stays fixed and what changes',
    'Fill a template in under a minute',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From a prompt to a template',
      steps: [
        { title: '1. Start with a prompt that worked', body: '"Summarise this 40-page report for Lucía, a busy marketing lead, in 5 bullets, with page numbers."' },
        { title: '2. Mark what changes', body: 'Document, reader, length. These become blanks.' },
        { title: '3. Keep what always matters', body: '"With page numbers" and "only use the document" stay fixed: they\'re your quality rules.' },
        { title: '4. Write it with clear blanks', body: '"Summarise [DOCUMENT] for [READER, ROLE] in [NUMBER] bullets. Use only the document, with page numbers. Flag anything unclear."' },
        { title: '5. Test it on a new case', body: 'Fill it for a different report and reader. If the result is good, it\'s ready to share.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Blanks for what changes ([READER], [NUMBER]). Fixed text for your quality rules. Test on a new case before sharing.',
    },
  ],
  apply: {
    scenario: 'Ada makes her summary template.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Start with a prompt that worked', 'Mark what changes', 'Keep the quality rules', 'Write it with blanks', 'Test on a new case'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Blank, or fixed text?',
        groups: ['Blank', 'Fixed'],
        items: [
          { text: 'Who the reader is', group: 0 },
          { text: '"With page numbers"', group: 1 },
          { text: 'Number of bullets', group: 0 },
          { text: '"Use only the document"', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the template\'s first part.',
        tiles: ['Summarise', '[DOCUMENT]', 'for', '[READER]'],
        distractors: ['Lucía'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep "use only the document" as fixed text?',
        options: [
          { text: 'It never changes because it\'s short', why: 'It\'s about quality.' },
          { text: 'It\'s a quality rule that should apply every time' },
          { text: 'No reason', why: 'It prevents made-up content.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I tried your template for a board report and it worked first time!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It only works for me.', why: 'It worked for her.' },
          { text: 'Lucky.', why: 'It\'s the template.' },
          { text: 'Great! That\'s the test. If you change it, tell me what worked better and I\'ll update the shared version.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill the template for Tobi.',
        template: 'Summarise the pilot report for [[1]], our manager, in [[2]] bullets.',
        blanks: [['Tobi'], ['3', 'three']],
        distractors: ['[READER]', 'many'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the template should be fixed, not a blank?',
        lines: [
          'Summarise [DOCUMENT]',
          'for [READER, ROLE]',
          'in [NUMBER] bullets',
          '[WHETHER TO INCLUDE PAGE NUMBERS]',
        ],
        bug: 3,
        fix: 'Always include page numbers.',
        explanation: 'It\'s a quality rule, not a choice.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the blank to an example fill.',
        pairs: [
          ['[DOCUMENT]', 'The 40-page research report'],
          ['[READER, ROLE]', 'Lucía, marketing lead'],
          ['[NUMBER]', '5'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps turn a prompt into a template?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the best template?',
        options: [
          { text: 'Summarise this.', why: 'No blanks or rules.' },
          { text: 'Summarise [DOCUMENT] for [READER, ROLE] in [NUMBER] bullets. Use only the document, with page numbers. Flag anything unclear.' },
          { text: 'Summarise the pilot report for Lucía in 5 bullets.', why: 'A one-off, not a template.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ready to share, or not yet?',
        groups: ['Ready', 'Not yet'],
        items: [
          { text: 'Tested on two different reports', group: 0 },
          { text: 'Never tried', group: 1 },
          { text: 'Clear blanks in capitals', group: 0 },
          { text: 'Blanks no one understands', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write blanks in [CAPITALS]?',
        options: [
          { text: 'They\'re easy to spot and fill' },
          { text: 'AI needs capitals', why: 'It\'s for humans.' },
          { text: 'No reason', why: 'Easy to spot.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Turn one of your saved prompts into a template. What are the blanks? What stays fixed?',
    starters: ['Blanks:', 'Fixed rules:'],
  },
  deepen: { title: 'Try it today', summary: 'Make one template with [BLANKS] and test it on a new case.' },
  notes: 'Content fictional.',
};

export default lesson;
