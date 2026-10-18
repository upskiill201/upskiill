import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 — "Patients like this one": the idea behind nearest neighbours. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Patients like this one"',
  summary: 'Bisi reads out a new booking: 19-day wait, no reminder, lives 4 km away. Halima answers without thinking: "Patients like that usually miss." Miracle grins. "That sentence is a machine learning model. Let\'s build it."',
  minutes: 10,
  outcomes: [
    'Explain the nearest-neighbour idea in one sentence',
    'Say what "similar" could mean for two patients',
    'Know that this predictor learns by remembering examples',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Instinct, written down',
      beats: [
        { speaker: 'bisi', text: 'Kunle. Waited 19 days, no reminder, lives 4 km away. Will he come?' },
        { speaker: 'halima', text: 'Patients like that usually miss. I\'ve seen it a hundred times.' },
        { speaker: 'miracle', text: 'How do you know? You compare him with patients you remember who were similar, and you go with what they did.' },
        { speaker: 'halima', text: '...yes. That\'s exactly what I do.' },
        { speaker: 'miracle', text: 'That\'s called nearest neighbours. Find the past patients most similar to the new one, and predict what most of them did. We\'ll write it from scratch, no library, so you see every step.' },
      ],
      choice: {
        prompt: 'What does the predictor need to "remember"?',
        options: [
          { text: 'Past patients: their features and whether they came.', outcome: 'Right. Nearest neighbours keeps every past example, and compares each new patient with them.', best: true },
          { text: 'A rule like "wait > 14 and no reminder".', outcome: 'That was v0.1. This time the computer compares with examples instead of following a rule we wrote.' },
          { text: 'Nothing: it guesses at random.', outcome: 'Random guessing ignores everything Halima knows. Neighbours use the examples.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'The nearest-neighbour idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a nearest-neighbour predictor do?',
        options: [
          { text: 'Finds the most similar past examples and goes with what they did' },
          { text: 'Follows a rule a person wrote', why: 'That was v0.1. Neighbours compare with examples.' },
          { text: 'Asks the patient', why: 'It predicts from past patients only.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'How far apart are Kunle (19 days) and Ireti (18 days) in wait? Print the difference with abs()',
        starter: 'kunle_wait = 19\nireti_wait = 18\n',
        solution: 'kunle_wait = 19\nireti_wait = 18\nprint(abs(kunle_wait - ireti_wait))\n',
        hint: 'abs() turns any difference into a positive number: abs(kunle_wait - ireti_wait)',
        checks: [
          { message: 'Print 1', outputEquals: '1' },
          { message: 'Use abs()', codeIncludes: 'abs(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'More similar to Kunle (19 days, 4 km), or less?',
        groups: ['Very similar', 'Not similar'],
        items: [
          { text: 'Ireti: 18 days, 6 km', group: 0 },
          { text: 'Amina: 3 days, 2 km', group: 1 },
          { text: 'Hauwa: 16 days, 8 km', group: 0 },
          { text: 'Chioma: 30 days, 12 km', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning here.',
        pairs: [
          ['Neighbour', 'A similar past patient'],
          ['Nearest', 'The most similar'],
          ['Prediction', 'What most neighbours did'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Why build it ourselves? A library does this in one line.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Because once you\'ve built it, the one-line version stops being magic. You\'ll know exactly what it does and where it goes wrong.' },
          { text: 'Libraries are banned.', why: 'We\'ll use one from Chapter 5.' },
          { text: 'It\'s faster by hand.', why: 'It\'s slower. We do it to understand it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea in one sentence.',
        template: 'Find the most [[1]] past patients, and predict what [[2]] of them did.',
        blanks: [['similar'], ['most']],
        distractors: ['recent', 'none'],
      },
      {
        kind: 'mcq',
        prompt: 'What does this predictor do at "training" time?',
        options: [
          { text: 'Just stores the past examples' },
          { text: 'Writes a long list of rules', why: 'It doesn\'t write rules; it compares at prediction time.' },
          { text: 'Deletes the old examples', why: 'It needs them all to compare with.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'Nearest neighbours compares a new patient with past ones.',
          'It needs to know whether each past patient came.',
          'It only works if a person writes the rules first.',
          'Halima already does this in her head.',
        ],
        bug: 2,
        fix: 'It works from examples, with no hand-written rules.',
        explanation: 'That\'s the point: the examples are the model.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does abs(3 - 21) give?',
        answers: ['18'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'So the computer will do what Halima does, but for every booking?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, and it remembers every past patient exactly, not just the ones I happen to recall.' },
          { text: 'No, it can only do one booking.', why: 'It can check thousands.' },
          { text: 'It will be better than me at everything.', why: 'It\'s better at remembering. Knowing what matters is still Halima\'s job.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: '"Patients like this one usually..." Where do you make predictions by comparing with similar past cases (people, places, food, weather)?',
    starters: ['I compare...', 'Similar usually means...'],
  },
  deepen: {
    title: 'k-nearest neighbours',
    summary: 'The method\'s full name is k-nearest neighbours, or k-NN. "k" is how many neighbours you ask. You\'ll choose it in lesson 8.',
  },
  notes: 'k-nearest neighbours (k-NN) is a classic instance-based ("lazy") learner. Kunle 19 days, 4 km; Ireti 18 days, 6 km (Chapter 1 notebook).',
};

export default lesson;
