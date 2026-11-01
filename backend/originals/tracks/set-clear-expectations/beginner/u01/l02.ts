import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: the curse of knowledge (Newton 1990 tappers and listeners). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The curse of knowledge',
  summary: 'Arjun\'s friend Grace, in Manchester, hears the story on a call and laughs. "You\'ve got the curse of knowledge, love." Arjun has never heard of it. Tey has. Myth or fact?',
  minutes: 11,
  outcomes: [
    'Know what the curse of knowledge is',
    'Know the famous tapping experiment',
    'Use one habit to beat it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'The more you know about something, the easier it is to explain to a beginner.', isFact: false, explain: 'Myth. Often it\'s the opposite. Economists Colin Camerer, George Loewenstein and Martin Weber called it the curse of knowledge (1989): once you know something, it\'s hard to imagine not knowing it, so you leave out the steps that feel obvious.' },
        { text: 'In one famous experiment, people tapping songs expected listeners to guess about half of them. Listeners guessed about 1 in 40.', isFact: true, explain: 'Fact. In Elizabeth Newton\'s 1990 Stanford study, "tappers" tapped the rhythm of well-known songs, like Happy Birthday, on a table. They predicted listeners would name about 50%. Listeners named about 2.5%. The tappers could hear the tune in their heads. The listeners heard only knocking.' },
        { text: 'Experts can fix the curse just by trying harder to be clear.', isFact: false, explain: 'Myth, mostly. Knowing about the curse helps a bit, but it\'s stubborn. What works better is a habit that tests it: ask the other person to explain it back, or show your brief to someone outside the project.' },
        { text: 'Examples and pictures help get past the curse.', isFact: true, explain: 'Fact, broadly. A screenshot of the product page Arjun has in mind says more than a paragraph. Concrete examples carry the details experts forget to say.' },
        { text: 'Only bad communicators suffer from the curse of knowledge.', isFact: false, explain: 'Myth. It affects experts precisely because they\'re experts. Arjun is brilliant at code. That\'s exactly why his brief was four words long.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You can hear the tune; they only hear knocking. Show an example. Ask them to explain it back.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey and Grace.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the curse of knowledge?',
        options: [
          { text: 'Knowing too much makes you unhappy', why: 'Not the research meaning.' },
          { text: 'Once you know something, it\'s hard to imagine not knowing it' },
          { text: 'Experts refuse to share what they know', why: 'They try. They leave out "obvious" steps.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Experts explain best to beginners', group: 0 },
          { text: 'Tappers expected 50%, got about 2.5%', group: 1 },
          { text: 'Trying harder fixes it', group: 0 },
          { text: 'Examples help get past it', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'So you tapped "Happy Birthday" at them and expected them to hear the tune, love.',
        prompt: 'What does Arjun reply?',
        options: [
          { text: 'Ha. Yes. I\'ll send them a screenshot of exactly what I mean, and ask them to say it back.' },
          { text: 'They should have heard it.', why: 'The listeners never can. That\'s the point.' },
          { text: 'I\'ll just tap louder.', why: 'More words of the same kind won\'t help.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Newton\'s study, listeners guessed about ___ in 40 songs. (a number)',
        answers: ['1', 'one', 'One'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the experiment to the brief.',
        pairs: [
          ['The tapper', 'Arjun'],
          ['The listeners', 'Kavya and Joel'],
          ['The tune in his head', 'What "products" really means'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What works better than "trying harder" to be clear?',
        options: [
          { text: 'Writing in capitals', why: 'Louder isn\'t clearer.' },
          { text: 'Longer meetings', why: 'Time doesn\'t fix the blind spot.' },
          { text: 'A habit that tests it: ask them to explain it back' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s fix list. Which line won\'t beat the curse?',
        lines: [
          'Send a screenshot of the product page I imagine.',
          'Re-read my brief myself to check it\'s clear.',
          'Ask each of them to explain the task back.',
        ],
        bug: 1,
        fix: 'Show the brief to Grace, who knows nothing about the project.',
        explanation: 'You can\'t un-know what you know. Re-reading your own brief, you still hear the tune.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put beating the curse in order.',
        lines: ['Write the brief', 'Add an example', 'Ask them to explain it back', 'Fill the gaps they reveal'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'You hear the [[1]]. They only hear [[2]].',
        blanks: [['tune', 'song'], ['knocking', 'tapping']],
        distractors: ['silence', 'music'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s new habit.',
        tiles: ['Show', 'it,', 'then', 'ask', 'them', 'back.'],
        distractors: ['louder'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you know so well that you probably explain it badly? Who could you test your explanation on?',
    starters: ['I know ... so well that...', 'I could test it on...'],
  },
  deepen: {
    title: 'The tapping test',
    summary: 'Tap the rhythm of a famous song for a friend and see if they guess it. You\'ll feel the curse of knowledge in about ten seconds.',
  },
  notes: 'Colin Camerer, George Loewenstein & Martin Weber (1989), "The Curse of Knowledge in Economic Settings", Journal of Political Economy 97(5). Elizabeth L. Newton (1990), doctoral dissertation, Stanford: tappers predicted ~50%, listeners identified ~2.5% (3 of 120). Popularised in Heath & Heath, Made to Stick (2007). Examples aiding comprehension: hedged as "broadly".',
};

export default lesson;
