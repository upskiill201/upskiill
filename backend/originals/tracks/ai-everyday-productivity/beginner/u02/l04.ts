import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Myth or Fact: research myths. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Research myths',
  summary: 'Tomás has a theory for every AI answer: "it gave a link, so it\'s true", "I asked if it was sure". Lucía has two flats to check by Saturday. Sort the myths from the facts.',
  minutes: 11,
  outcomes: [
    'Spot the common myths about AI research',
    'Know what actually counts as checking',
    'Check numbers and dates first',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'If an AI gives you a link, the page says what the AI claims.', isFact: false, explain: 'Links can be real but say something else, or not exist at all. Open it and find the sentence.' },
        { text: 'Asking "Are you sure?" turns an answer into a checked answer.', isFact: false, explain: 'It may repeat itself, or flip to a new answer just as confidently. Neither is a check.' },
        { text: 'Tools that search the web can still summarise a page wrongly.', isFact: true, explain: 'Searching helps with recent information, but the summary can still miss or twist details.' },
        { text: 'AI tools always know today\'s prices.', isFact: false, explain: 'Prices change daily. Without a current source, it may give an old or invented figure.' },
        { text: 'A leading question ("Isn\'t X the best?") can pull the AI towards agreeing.', isFact: true, explain: 'Ask open questions: "What are the pros and cons of X and Y?"' },
        { text: 'Numbers, dates and names are where to check hardest.', isFact: true, explain: 'They\'re easy to get slightly wrong and they drive decisions. Check them first.' },
      ],
    },
    {
      kind: 'story',
      title: 'At Tomás\'s desk',
      beats: [
        { speaker: 'tomas', text: 'I asked it three times if it was sure. Three yeses. That\'s triple-checked.' },
        { speaker: 'sofia', text: 'That\'s one source agreeing with itself three times.' },
        { speaker: 'tey', text: 'Sofía says very little, but when she does, write it down.' },
      ],
    },
  ],
  apply: {
    scenario: 'Research myths at Nopal.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Real check, or not a check?',
        groups: ['Real check', 'Not a check'],
        items: [
          { text: 'Opening the link and finding the sentence', group: 0 },
          { text: 'Asking "are you sure?" three times', group: 1 },
          { text: 'Comparing with an official site', group: 0 },
          { text: 'It sounded confident', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'It said yes three times. Triple-checked!',
        prompt: 'Sofía\'s point, in Lucía\'s words?',
        options: [
          { text: 'Ask it a fourth time to be safe.', why: 'Still the same source.' },
          { text: 'Then it\'s definitely true.', why: 'Repetition isn\'t evidence.' },
          { text: 'That\'s one source agreeing with itself. A check needs something independent.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which question is open, not leading?',
        options: [
          { text: 'What are the pros and cons of Flat 2 and Flat 5 for a quiet sleeper?' },
          { text: 'Flat 5 is better, isn\'t it?', why: 'That invites a yes.' },
          { text: 'Why is Flat 2 the worst?', why: 'It assumes the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Where to check hardest.',
        template: 'Check [[1]], dates and names first: they\'re easy to get slightly [[2]].',
        blanks: [['numbers'], ['wrong']],
        distractors: ['jokes', 'longer'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tomás\'s method is a myth?',
        lines: [
          'Open the link and read the page.',
          'If there\'s a link, the claim is proven.',
          'Check numbers before using them.',
        ],
        bug: 1,
        fix: 'A link proves nothing until you\'ve read it.',
        explanation: 'Links can say something different, or not exist.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the reality.',
        pairs: [
          ['"It gave a link"', 'Open it and find the sentence'],
          ['"I asked if it was sure"', 'Still one source'],
          ['"It searches the web"', 'Summaries can still be wrong'],
          ['"It knows today\'s prices"', 'Check a current source'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An AI that can search the web summarises a page about Flat 5. What should Lucía still do?',
        options: [
          { text: 'Nothing: web search makes it accurate', why: 'Summaries can still miss or twist details.' },
          { text: 'Open the page and check the details that matter to her' },
          { text: 'Ask it if it\'s sure', why: 'That isn\'t a check.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Myth or fact: "A leading question can pull the AI towards agreeing." (Type myth or fact.)',
        answers: ['fact'],
        placeholder: 'myth or fact',
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'So should I never trust anything it says?',
        prompt: 'Lucía\'s balanced answer?',
        options: [
          { text: 'Trust it for ideas and drafts. Check numbers, dates, names and anything you\'ll decide on.' },
          { text: 'Never trust it.', why: 'It\'s useful for lots of things that don\'t need checking.' },
          { text: 'Trust it if it has a link.', why: 'Links need opening.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which claim from the AI would you check first before signing a lease?',
        options: [
          { text: '"Narvarte has lots of taco stands"', why: 'True or not, it won\'t sink her.' },
          { text: '"Ideas for decorating a small flat"', why: 'Ideas don\'t need checking.' },
          { text: '"In Mexico City, deposits are always one month"' },
        ],
        answer: 2,
        explanation: 'It\'s a rule with money attached, and "always" is a warning word. Check the lease itself.',
      },
    ],
  },
  reflect: {
    prompt: 'Which myth were you most likely to believe before today? What will you do differently?',
    starters: ['I used to think...', 'Now I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool a leading question ("Isn\'t X the best?") and then the open version ("What are the pros and cons of X and Y?"). Compare how much the answers lean.',
  },
  notes: 'Sycophancy and citation errors are documented model behaviours; web-enabled tools can still misattribute. Deposit amounts in Mexico City vary by landlord and contract, so "always one month" is a claim to check, not a fact.',
};

export default lesson;
