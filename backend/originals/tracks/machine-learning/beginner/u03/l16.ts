import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16 — Why it works (and when it doesn't): the assumption behind nearest neighbours. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Why it works, and when it doesn\'t',
  summary: 'The predictor works because of one assumption: patients who look alike tend to behave alike. Miracle asks Halima to think of every way that assumption could break before Folake does.',
  minutes: 11,
  outcomes: [
    'State the assumption behind nearest neighbours',
    'Name the situations where it breaks',
    'Read a risk score as "share of similar patients"',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Nearest neighbours works because similar patients tend to behave similarly.',
          isFact: true,
          explain: 'Fact. That\'s the whole assumption. When it holds, neighbours are a good guide.',
        },
        {
          text: 'Adding a feature that has nothing to do with no-shows can\'t hurt.',
          isFact: false,
          explain: 'Myth. A useless feature (say, the booking\'s ID number) still changes every distance, so the "nearest" patients become nearest in a meaningless way.',
        },
        {
          text: 'If a new patient is unlike anyone in the training data, the neighbours are still close.',
          isFact: false,
          explain: 'Myth. The "nearest" patients might be very far away and not similar at all. The predictor will answer anyway, with no warning.',
        },
        {
          text: 'The risk score is the share of similar past patients who missed.',
          isFact: true,
          explain: 'Fact. A risk of 0.6 with 15 neighbours means 9 of the 15 most similar patients missed. It\'s easy to explain to a clinic.',
        },
        {
          text: 'With very little data, nearest neighbours still works well.',
          isFact: false,
          explain: 'Myth. With 12 patients, even the nearest can be quite different. It needs enough examples for real neighbours to exist.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A risk you can explain',
      caption: 'Change misses and k.',
      code: 'misses = 9\nk = 15\nrisk = misses / k\nprint(f"{misses} of the {k} most similar patients missed: risk {risk:.2f}")\n',
      challenge: 'What risk does 3 out of 15 give?',
    },
  ],
  apply: {
    scenario: 'When neighbours help, and when they don\'t.',
    items: [
      {
        kind: 'writeCode',
        prompt: '9 of a patient\'s 15 nearest neighbours missed. Print the risk rounded to 2 places',
        starter: 'misses = 9\nk = 15\n',
        solution: 'misses = 9\nk = 15\nprint(round(misses / k, 2))\n',
        hint: 'round(misses / k, 2)',
        checks: [{ message: 'Print 0.6', outputEquals: '0.6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does nearest neighbours work well here, or struggle?',
        groups: ['Works well', 'Struggles'],
        items: [
          { text: 'Lots of past patients like the new one', group: 0 },
          { text: 'A new kind of clinic, nobody similar', group: 1 },
          { text: 'Features that really relate to no-shows', group: 0 },
          { text: 'A meaningless feature like booking ID', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why would the booking ID number make the predictor worse?',
        options: [
          { text: 'IDs are text', why: 'Even as a number, it\'s meaningless for similarity.' },
          { text: 'It wouldn\'t', why: 'Every feature affects the distance, useful or not.' },
          { text: 'It changes every distance without telling us anything about no-shows' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'We\'re opening a clinic in Maiduguri. Use the predictor there from day one?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Carefully. Its patients may not resemble anyone in our data, so its "nearest" neighbours could be far from similar. Collect a few weeks first, then check.' },
          { text: 'Yes, it works anywhere.', why: 'It only knows patients like the ones it has seen.' },
          { text: 'Never, ever.', why: 'Once there\'s data from the new clinic, it can learn.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to what it means (15 neighbours).',
        pairs: [
          ['0.0', 'None of the 15 missed'],
          ['0.2', '3 of the 15 missed'],
          ['0.6', '9 of the 15 missed'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The assumption.',
        template: 'Patients who look [[1]] tend to behave [[2]].',
        blanks: [['alike', 'similar'], ['alike', 'similarly']],
        distractors: ['different', 'randomly'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence in the board note.',
        lines: [
          'The predictor compares each booking with similar past bookings.',
          'Its risk is the share of those who missed.',
          'It will work just as well at clinics we haven\'t opened yet.',
          'It found 12 of the 20 riskiest bookings in a test week.',
        ],
        bug: 2,
        fix: 'At new clinics, we\'ll check it on their own data first.',
        explanation: 'It knows only patients like the ones it has seen.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s one big strength of nearest neighbours for a clinic?',
        options: [
          { text: 'It\'s never wrong', why: 'It\'s often wrong. Its strength is that it\'s explainable.' },
          { text: 'It\'s the fastest model there is', why: 'It\'s slow on big data.' },
          { text: 'Its reasons are easy to explain: "most similar past patients missed"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'A patient asked why she got an extra call. What do I say?',
        prompt: "Halima's best reply?",
        options: [
          { text: '"The AI says you\'re unreliable."', why: 'Untrue and hurtful. The score is about similar bookings, not her character.' },
          { text: '"Patients with a similar booking, like a long wait and no reminder, sometimes find it hard to come, so we check in." Kind, true, and no blame.' },
          { text: 'Don\'t answer.', why: 'People deserve a simple, honest reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '3 of the 15 nearest missed. What is the risk, as a decimal?',
        answers: ['0.2', '.2'],
        placeholder: 'A decimal',
      },
    ],
  },
  reflect: {
    prompt: '"Patients who look alike behave alike." When is that a fair assumption about people, and when does it slide into stereotyping?',
    starters: ['It\'s fair when...', 'It becomes stereotyping when...'],
  },
  deepen: {
    title: 'The curse of dimensionality',
    summary: 'With many features (say, 100), every patient ends up far from every other, and "nearest" stops meaning much. That\'s one reason to choose features carefully (Chapter 8).',
  },
  notes: 'k-NN assumes locality (similar inputs, similar outputs); sensitive to irrelevant features and to out-of-distribution inputs; needs enough data. Maiduguri is used as an illustrative new-clinic location, not an Afiya fact.',
};

export default lesson;
