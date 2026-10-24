import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 14 — citing what you found. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Citing what you found',
  summary: 'A citation lets anyone check your work in seconds. Ada\'s simple citation format for work documents: tap each part.',
  minutes: 12,
  outcomes: [
    'Write a simple, useful work citation',
    'Cite sources, not the AI',
    'Make claims easy to check',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One of Ada\'s citations',
      text: '[1] Bank of Ghana, Annual Report 2023, p.41, "mobile money transactions" table. Link: bog.gov.gh (accessed 14 May).',
      hotspots: [
        { phrase: 'Bank of Ghana', note: 'Who published it. The first thing a reader judges.' },
        { phrase: 'Annual Report 2023', note: 'The exact document, so anyone can find it.' },
        { phrase: 'p.41', note: 'The page. Saves your reader ten minutes of searching.' },
        { phrase: '"mobile money transactions" table', note: 'Exactly where in the page. Even better than a page number.' },
        { phrase: 'accessed 14 May', note: 'When you checked it. Pages change; this shows your fact was true on that date.' },
      ],
    },
    {
      kind: 'reading',
      title: 'Cite the source, not the AI',
      html:
        '<p>"Source: ChatGPT" isn\'t a source; it\'s where you heard about it. Cite the document you opened.</p>' +
        '<p>If AI helped you summarise or draft, say so in a note ("AI used for drafting; all figures checked against sources [1]-[4]"), and still cite the real sources.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Who, what document, where in it, link, date checked. Cite what you opened, never "the AI said".',
    },
  ],
  apply: {
    scenario: 'Ada is adding citations to the Ghana brief.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the parts of Ada\'s citation.',
        lines: ['Who published it', 'The document', 'Page or section', 'Link', 'Date checked'],
      },
      {
        kind: 'mcq',
        prompt: 'Is "Source: ChatGPT" a proper citation?',
        options: [
          { text: 'Yes, it\'s where the fact came from', why: 'It\'s where you heard it, not the source.' },
          { text: 'No; cite the document you opened' },
          { text: 'Only for numbers', why: 'Never.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful citation or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Bank of Ghana, Annual Report 2023, p.41', group: 0 },
          { text: '"The internet"', group: 1 },
          { text: 'Survey of 300 traders, Table 2, accessed 14 May', group: 0 },
          { text: '"AI said so"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add the date you checked a page?',
        options: [
          { text: 'It looks formal', why: 'It\'s practical.' },
          { text: 'No reason', why: 'Pages change.' },
          { text: 'Pages change; it shows when your fact was true' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen asked where the 54% comes from. Can you tell her?',
        prompt: 'Best reply, thanks to the citation?',
        options: [
          { text: 'It\'s source [3]: the 2024 trader survey, Table 2, link in the brief. 300 traders in two Accra markets.' },
          { text: 'Somewhere online, I think.', why: 'The citation should answer this in seconds.' },
          { text: 'The AI found it.', why: 'Cite the survey.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Cite what you [[1]], never "the AI [[2]]".',
        blanks: [['opened'], ['said']],
        distractors: ['guessed', 'wrote'],
      },
      {
        kind: 'findBug',
        prompt: 'Which citation needs fixing?',
        lines: [
          '[1] Bank of Ghana, Annual Report 2023, p.41',
          '[2] Partner bank website, "About us", accessed 14 May',
          '[3] AI chat, 13 May',
          '[4] Trader survey 2024, Table 2',
        ],
        bug: 2,
        fix: 'Replace it with the document the AI pointed to, once opened.',
        explanation: 'An AI chat is not a source.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s AI-use note.',
        tiles: ['AI', 'used', 'for', 'drafting;', 'all', 'figures', 'checked'],
        distractors: ['invented'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the citation part to why it helps.',
        pairs: [
          ['Publisher', 'Judge how trustworthy it is'],
          ['Page', 'Find the claim fast'],
          ['Date checked', 'Know when it was true'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which page of the annual report is Ada\'s figure?',
        answers: ['41', 'p.41', 'page 41'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Should this be cited?',
        groups: ['Cite it', 'No need'],
        items: [
          { text: 'A market statistic', group: 0 },
          { text: 'A licence timeline', group: 0 },
          { text: 'Your own recommendation', group: 1 },
          { text: '"We meet on Thursday"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the main purpose of a work citation?',
        options: [
          { text: 'Looking academic', why: 'It\'s about checkability.' },
          { text: 'Making the document longer', why: 'It\'s about checkability.' },
          { text: 'Letting anyone check your claim in seconds' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Look at a recent document you wrote. Could someone check your key facts in under a minute?',
    starters: ['The document:', 'They could / couldn\'t because...'],
  },
  deepen: { title: 'Try it today', summary: 'Add a numbered source list to your next document: who, what, where, link, date checked.' },
  notes: 'Citation format is a simplified work style, not an academic standard. Sources in the example are illustrative.',
};

export default lesson;
