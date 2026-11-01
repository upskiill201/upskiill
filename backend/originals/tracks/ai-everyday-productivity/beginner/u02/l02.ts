import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: why AI research goes wrong. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why AI research goes wrong',
  summary: 'The AI tells Lucía a "2023 city study" rates Narvarte the quietest area near the centre. She can\'t find the study anywhere. Read the five ways AI research slips, and the three checks that catch them.',
  minutes: 13,
  outcomes: [
    'Name five ways AI research goes wrong',
    'Use three checks: source, date, second source',
    'Ask questions that don\'t lead the AI to agree with you',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five ways it slips, three ways to catch it',
      html: '<p>"According to a 2023 city study, Narvarte is the quietest neighbourhood near the centre." Lucía searched for that study for twenty minutes. It doesn\'t seem to exist.</p><p>That doesn\'t make AI useless for research. It makes it a fast assistant who sometimes fills gaps with things that <em>sound</em> right. Here\'s where the gaps usually are.</p><h3>Five ways AI research slips</h3><ol><li><strong>Made-up facts.</strong> A smooth sentence with a number or a name that isn\'t real.</li><li><strong>Invented sources.</strong> A study, a quote or a link that doesn\'t exist, or doesn\'t say what the AI claims.</li><li><strong>Old information.</strong> Prices, rules and opening hours change. The tool may not know.</li><li><strong>Thin local knowledge.</strong> Big, well-written topics are covered well. Your street, your town\'s bus route or a small venue in Oaxaca, much less.</li><li><strong>Agreeing with you.</strong> Ask "Isn\'t Narvarte the quietest?" and it may lean towards yes. Leading questions get leaning answers.</li></ol><h3>Three checks</h3><ul><li><strong>Source:</strong> "Where does that come from?" If it shows a link, open it and find the sentence yourself.</li><li><strong>Date:</strong> Is this from this year? For prices and rules, it needs to be.</li><li><strong>Second source:</strong> Does somewhere independent say the same? A listing, an official site, a person who lives there.</li></ul><blockquote>The bigger the decision, the more checks. A music idea needs none. A rent, a fee or a medical fact needs all three.</blockquote><p>And ask open questions: "Which neighbourhoods near Colonia Juárez are known for being quiet, and how could I check?" beats "Isn\'t Narvarte the quietest?"</p>',
    },
    {
      kind: 'check',
      question: 'The AI quotes a study Lucía can\'t find anywhere. What\'s the best move?',
      options: [
        'Use it anyway; it sounded official',
        'Ask the AI if it\'s sure, and trust the answer',
        'Treat it as unverified and look for a source she can open herself',
      ],
      answer: 2,
      explanation: 'An unfindable source might not exist. "Are you sure?" isn\'t a check; opening a real source is.',
    },
  ],
  apply: {
    scenario: 'Checking AI research.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each slip to an example.',
        pairs: [
          ['Invented source', 'A "2023 city study" nobody can find'],
          ['Old information', 'Last year\'s bus fare'],
          ['Thin local knowledge', 'Wrong details about a small Oaxaca venue'],
          ['Agreeing with you', '"Yes, Narvarte is definitely the quietest!"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which question is least likely to lead the AI into agreeing?',
        options: [
          { text: 'Isn\'t Narvarte the quietest area?', why: 'It invites a yes.' },
          { text: 'Which areas near Colonia Juárez are known for being quiet, and how could I check?' },
          { text: 'Narvarte is the quietest, right?', why: 'Even more leading.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three checks.',
        template: 'Source, [[1]], second [[2]].',
        blanks: [['date'], ['source']],
        distractors: ['price', 'opinion'],
      },
      {
        kind: 'sortGroups',
        prompt: 'How much checking does it need?',
        groups: ['Check carefully', 'Little or none'],
        items: [
          { text: 'The deposit rule in a lease', group: 0 },
          { text: 'Ideas for a housewarming playlist', group: 1 },
          { text: 'A neighbourhood\'s safety', group: 0 },
          { text: 'Names for a cat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'I opened the AI\'s link about Narvarte. The page is about parks. It doesn\'t mention noise at all.',
        prompt: 'What does Lucía learn?',
        options: [
          { text: 'A link isn\'t proof. You have to open it and find the sentence yourself.' },
          { text: 'Parks are noisy.', why: 'The point is the link didn\'t support the claim.' },
          { text: 'Links are always fake.', why: 'Many are real; they just need opening.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Tomás\'s research isn\'t a real check?',
        lines: [
          'Asked the AI "are you sure?" and it said yes.',
          'Opened the source link.',
          'Compared with a second, independent source.',
        ],
        bug: 0,
        fix: 'Open a source you can read yourself.',
        explanation: '"Are you sure?" just asks it to repeat itself. It can say yes to something false.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check asks: "Is this from this year?" (One word.)',
        answers: ['date', 'the date'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why might the AI know a lot about Paris but little about a small venue in Oaxaca?',
        options: [
          { text: 'It doesn\'t like Oaxaca', why: 'It has no likes; it has more or less text to learn from.' },
          { text: 'Small venues are secret', why: 'There\'s just much less written about them.' },
          { text: 'Much more has been written about Paris, so it learned much more' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the checks for the AI\'s noise claim.',
        lines: ['Ask where it comes from', 'Open the source', 'Check the date', 'Find a second source', 'Visit the street at night'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the honest summary of AI for research?',
        options: [
          { text: 'Useless: it makes things up', why: 'It\'s fast and often right; it just needs checking.' },
          { text: 'A fast assistant for a first picture; check what matters before you decide' },
          { text: 'Perfect for anything with a link', why: 'Links can be wrong too.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a decision you made recently based on something you read online. Which of the three checks did you do? Which did you skip?',
    starters: ['I decided...', 'I checked... but skipped...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool a question about your own neighbourhood or town and ask for sources. Open every link. Does each page actually say what the AI claimed?',
  },
  notes: 'Failure modes: fabricated facts and citations (widely documented, e.g. court cases with made-up citations in 2023), training cut-offs, weaker coverage of low-resource local topics, and sycophancy (models tending to agree with the user\'s framing; studied by Anthropic and others). The "2023 city study" is fictional, as a demonstration of a fabricated source.',
};

export default lesson;
