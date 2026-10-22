import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13 — What ML can't do: no data, no pattern, a changing world. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'What ML can\'t do',
  summary: 'Folake\'s list of things the model will do keeps growing: "...and predict which clinics will open next year, and why patients feel unwell." Halima needs to explain, kindly, what machine learning can\'t do.',
  minutes: 10,
  outcomes: [
    'Name the limits of machine learning',
    'Spot when there isn\'t enough data or no pattern to learn',
    'Know that a model can\'t explain WHY on its own',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A model can predict things it has never seen any examples of.',
          isFact: false,
          explain: 'Myth. It only knows patterns from its examples. With no past data on new clinics, it can\'t say much about them.',
        },
        {
          text: 'If there\'s no real pattern in the data, a model can still "find" one.',
          isFact: true,
          explain: 'Fact, and it\'s a danger. Models can fit noise. That\'s why we always test on examples they haven\'t seen.',
        },
        {
          text: 'A model that shows long waits go with no-shows has proved long waits CAUSE no-shows.',
          isFact: false,
          explain: 'Myth. It shows a pattern, not a cause. Maybe the clinics with long waits are also the hardest to reach. Finding causes needs more care.',
        },
        {
          text: 'A model trained before a big change (a new bus route, a strike) can get worse after it.',
          isFact: true,
          explain: 'Fact. It learned the old world. When the world changes, its patterns go out of date.',
        },
        {
          text: 'More data always fixes a bad model.',
          isFact: false,
          explain: 'Myth. More of the wrong data, or data missing the key clue, doesn\'t help. Good features and fair tests matter more.',
        },
      ],
    },
  ],
  apply: {
    scenario: 'Limits of machine learning.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Could the no-show model do this, or not?',
        groups: ['Could do', 'Can\'t do'],
        items: [
          { text: 'Flag bookings likely to be missed', group: 0 },
          { text: 'Explain why a patient feels unwell', group: 1 },
          { text: 'Rank tomorrow\'s list by risk', group: 0 },
          { text: 'Predict no-shows at a clinic type it has no data for', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "If there are fewer than 100 examples, print \"Not enough examples\", otherwise \"Ready to train\"",
        starter: "examples = 12\n",
        solution: "examples = 12\nif examples < 100:\n    print(\"Not enough examples\")\nelse:\n    print(\"Ready to train\")\n",
        hint: "if examples < 100:",
        checks: [
          { message: "Print Not enough examples", outputEquals: "Not enough examples" },
          { message: "Use if", codeIncludes: "if " },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The model finds that patients who wait long miss more. What can Halima say?',
        options: [
          { text: 'Long waits cause no-shows: proven', why: 'A pattern isn\'t proof of cause.' },
          { text: 'Nothing at all', why: 'The pattern is real and useful, just not proof of cause.' },
          { text: 'Long waits go with more no-shows' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Can it predict no-shows at the clinics we open next year?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, exactly.', why: 'It has never seen those clinics.' },
          { text: 'Only roughly. It has no examples from those clinics yet. Once they have a few months of bookings, we can check.' },
          { text: 'Never, under any circumstances.', why: 'With data from them later, it could.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'A new bus route opens near Yaba clinic. What might happen to the model?',
        options: [
          { text: 'It automatically knows about the bus', why: 'It only knows what was in its examples.' },
          { text: 'Nothing can change a model', why: 'The world changing makes a model\'s patterns stale.' },
          { text: 'Its patterns for Yaba may go out of date' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong claim in Folake\'s draft.',
        lines: [
          'The model learns from past bookings.',
          'It flags bookings likely to be missed.',
          'It proves what causes patients to miss.',
          'We will check it again as things change.',
        ],
        bug: 2,
        fix: 'It shows which patterns go with missed bookings.',
        explanation: 'Patterns aren\'t causes. Saying "proves" would mislead the board.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the limit to an example.',
        pairs: [
          ['No examples', 'Clinics that don\'t exist yet'],
          ['No real pattern', 'Guessing from the patient\'s shirt colour'],
          ['The world changed', 'A new bus route'],
          ['Pattern, not cause', 'Long waits go with no-shows'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi trains a model on shirt colours and it scores well on the training data. What\'s the likely truth?',
        options: [
          { text: 'It found a pattern in noise that won\'t hold for new patients' },
          { text: 'Shirt colour predicts no-shows', why: 'With no real reason behind it, the "pattern" is almost certainly chance.' },
          { text: 'Scoring well on training data proves it works', why: 'Training scores can fool you. Test on new data.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key caution.',
        template: 'A model finds a [[1]], not a [[2]].',
        blanks: [['pattern'], ['cause']],
        distractors: ['robot', 'feature'],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Let\'s just give it ten times more data and it\'ll be perfect.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, more data always wins.', why: 'Not if the key clue is missing or the data is biased.' },
          { text: 'Data doesn\'t matter.', why: 'It matters a lot. It just isn\'t magic.' },
          { text: 'More data helps only if it has the clues that matter. Ten times more of the wrong columns won\'t fix anything.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: a pattern in data is not proof of a...',
        answers: ['cause', 'causation'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which limit worries you most for a health model: missing examples, fake patterns, or the world changing? Why?',
    starters: ['The one that worries me is...', 'Because in a clinic...'],
  },
  deepen: {
    title: 'Saying "I don\'t know"',
    summary: 'A good ML builder says what the model can\'t do as clearly as what it can. Halima will write those limits into a model card in Chapter 13.',
  },
  notes: 'Standard ML limitations: extrapolation beyond training data, overfitting to noise, correlation vs causation, distribution shift/drift. Shirt-colour example is a made-up illustration.',
};

export default lesson;
