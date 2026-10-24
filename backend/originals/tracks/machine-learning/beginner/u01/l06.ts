import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — Arthur Samuel's checkers: where the name "machine learning" comes from. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Arthur Samuel\'s checkers',
  summary: 'Halima wonders who came up with "machine learning". Miracle sends her a story from the 1950s: a scientist at IBM, a game of checkers, and a program that got better than the person who wrote it.',
  minutes: 11,
  outcomes: [
    'Tell the story of Arthur Samuel\'s checkers program',
    'Explain why it counts as learning',
    'Know where the term "machine learning" was popularised',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The program that played itself',
      html: '<p>In the 1950s, <strong>Arthur Samuel</strong>, a scientist at IBM in the United States, wrote a program to play <strong>checkers</strong> (draughts). Computers then filled whole rooms and were far slower than any phone today.</p><p>Samuel couldn\'t write down every good move: there are far too many. So he did something new. His program:</p><ul><li><strong>scored</strong> each board position (how good does this look for me?),</li><li><strong>remembered</strong> positions it had seen before, and</li><li><strong>played against itself</strong>, again and again, adjusting its scores after each game.</li></ul><p>Over time it played better than Samuel himself. Nobody had typed in the better moves. It found them from experience.</p><p>In <strong>1959</strong> he published a paper called <em>Some Studies in Machine Learning Using the Game of Checkers</em>. It is usually credited with popularising the term <strong>machine learning</strong>.</p><p>His idea is often summed up as giving computers the ability to learn without being explicitly programmed. (That famous line is a later summary, not a quote from his paper.)</p><p><strong>The link to Halima:</strong> Samuel\'s program learned from games, with the result of each game as the answer. Halima\'s model will learn from appointments, with "did they come?" as the answer. It\'s the same idea, nearly 70 years later.</p>',
    },
    {
      kind: 'check',
      question: 'Why does Samuel\'s program count as learning?',
      options: ['It ran on an IBM computer', 'It played a board game', 'It improved from experience, not from moves he typed in'],
      answer: 2,
      explanation: 'The computer and the game don\'t matter. Improving from examples does.',
    },
  ],
  apply: {
    scenario: 'The checkers story.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What game did Arthur Samuel\'s program play?',
        options: [
          { text: 'Checkers (draughts)' },
          { text: 'Chess', why: 'Famous chess computers came decades later. Samuel\'s was checkers.' },
          { text: 'Ludo', why: 'It was checkers.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "How many years from Samuel's 1959 paper to 2026? Print it",
        starter: "paper = 1959\nnow = 2026\n",
        solution: "paper = 1959\nnow = 2026\nprint(now - paper)\n",
        hint: "print(now - paper)",
        checks: [
          { message: "Print 67", outputEquals: "67" },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How did the program get better?',
        options: [
          { text: 'Samuel typed in better moves every night', why: 'Then it would be following his rules, not learning.' },
          { text: 'It copied moves from the internet', why: 'This was the 1950s: no internet.' },
          { text: 'By playing many games, including against itself, and adjusting how it scored positions' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year did Samuel publish his machine learning paper?',
        answers: ['1959'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'True of Samuel\'s program, or not?',
        groups: ['True', 'Not true'],
        items: [
          { text: 'It played better than Samuel', group: 0 },
          { text: 'It learned from experience', group: 0 },
          { text: 'It ran on a smartphone', group: 1 },
          { text: 'Samuel wrote every good move by hand', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Samuel\'s checkers to Halima\'s no-shows.',
        pairs: [
          ['One game', 'One appointment'],
          ['Won or lost', 'Came or missed'],
          ['A better move', 'A better guess'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the sentence that\'s wrong.',
        lines: [
          'Arthur Samuel worked at IBM.',
          'His program played checkers.',
          'His 1959 paper begins with the words "learn without being explicitly programmed".',
          'His paper helped make the term "machine learning" popular.',
        ],
        bug: 2,
        fix: 'His idea is often summed up as "learning without being explicitly programmed".',
        explanation: 'That line is a later summary of his idea, not a quote from the paper. Good habit: check a quote before you repeat it.',
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'So machine learning is older than I am?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'No, it was invented last year.', why: 'It goes back to the 1950s.' },
          { text: 'Much older. The idea is from the 1950s. What changed is how much data and computing power we have now.' },
          { text: 'It started with chatbots.', why: 'Chatbots are a recent, very large use of a 70-year-old idea.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Samuel\'s big idea.',
        template: 'The program got better from [[1]], not from moves he [[2]] in.',
        blanks: [['experience', 'examples'], ['typed']],
        distractors: ['luck', 'deleted'],
      },
      {
        kind: 'mcq',
        prompt: 'Why couldn\'t Samuel just write down every good move?',
        options: [
          { text: 'There are far too many possible positions' },
          { text: 'He didn\'t know the rules of checkers', why: 'He knew the rules. The problem was the huge number of positions.' },
          { text: 'Computers couldn\'t store text', why: 'They could. There were just too many positions to cover.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'A 1950s board game. What does that have to do with clinics?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Nothing. It\'s just history.', why: 'It\'s the same core idea Halima is using.' },
          { text: 'Same idea: learn from past results to make a better choice next time. His examples were games; ours are appointments.' },
          { text: 'We\'ll make patients play checkers.', why: 'Funny, but no.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Samuel\'s program got better than its own author. Is there something you learned from practice that nobody could have written down for you?',
    starters: ['I got better at... by practising', 'Nobody could have told me...'],
  },
  deepen: {
    title: 'Why now?',
    summary: 'The idea is old. It took off in the last 20 years because of three things: far more data, much faster computers, and free tools like the one you\'ll use from Chapter 5.',
  },
  notes: 'Arthur L. Samuel (IBM), "Some Studies in Machine Learning Using the Game of Checkers", IBM Journal of Research and Development, 1959. Program used scoring of positions, rote memory and self-play, and eventually outplayed Samuel. The "without being explicitly programmed" phrasing is a later paraphrase, not a quotation from the paper.',
};

export default lesson;
