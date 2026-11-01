import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 — Choosing k: too few is jumpy, too many says the same thing to everyone. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Choosing k',
  summary: 'Chidi\'s question from lesson 6 is a good one: if 3 neighbours beat 1, why not ask all 12? Halima tries k = 1, 3, 5 and 12 on the four new patients. The results go up, then down.',
  minutes: 11,
  outcomes: [
    'See how the choice of k changes predictions',
    'Explain why a huge k always gives the majority answer',
    'Choose k by testing, not by guessing',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Halima\'s results on the four new patients (Kunle, Rita, Sade, Yemi):</p><ul><li><strong>k = 1:</strong> 1 of 4 right. Jumpy: copies one patient, quirks and all.</li><li><strong>k = 3:</strong> 3 of 4. The best here.</li><li><strong>k = 5:</strong> 1 of 4. With only 12 patients, five neighbours reach too far: patients who aren\'t really similar get a vote.</li><li><strong>k = 12:</strong> every patient in the notebook votes, every time. 5 missed and 7 came, so the answer is always "likely to come": 2 of 4.</li></ul><p>So a small k <strong>follows the noise</strong>, and a huge k <strong>ignores the patient</strong> in front of you. The best k sits between, and the only way to find it is to <strong>test</strong> on patients the predictor hasn\'t seen.</p><p>Two habits: pick an <strong>odd</strong> k so votes can\'t tie, and remember that with more data (2,400 bookings instead of 12) the best k is usually bigger.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Everyone votes',
      caption: 'With k = 12, the whole notebook votes.',
      code: 'misses = 5   # of the 12 notebook patients\nk = 12\n\nif misses > k / 2:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
      challenge: 'Does the answer depend on the new patient at all when k = 12?',
    },
  ],
  apply: {
    scenario: 'How many neighbours?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'With k = 12, all 12 notebook patients vote (5 missed). Print the prediction',
        starter: 'misses = 5\nk = 12\n',
        solution: 'misses = 5\nk = 12\nif misses > k / 2:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'if misses > k / 2:',
        checks: [{ message: 'Print Likely to come', outputEquals: 'Likely to come' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match k to the score on the 4 new patients.',
        pairs: [
          ['k = 1', '1 of 4'],
          ['k = 3', '3 of 4'],
          ['k = 12', '2 of 4'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'With k = 12 on a 12-patient notebook, what happens?',
        options: [
          { text: 'It\'s the most accurate possible', why: 'It ignores the new patient completely.' },
          { text: 'It crashes', why: 'It runs. It just stops being useful.' },
          { text: 'Every new patient gets the same prediction: the majority answer' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Too small a k, or too big?',
        groups: ['Too small', 'Too big'],
        items: [
          { text: 'Copies one odd patient', group: 0 },
          { text: 'Gives everyone the same answer', group: 1 },
          { text: 'Jumpy, changes with every quirk', group: 0 },
          { text: 'Lets very different patients vote', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'So k = 3 is the best k, full stop.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, 3 forever.', why: 'The best k depends on the data. Test it.' },
          { text: 'Best for 12 patients tested on 4. With 2,400 bookings the best k will probably be bigger. We test to find out.' },
          { text: 'k doesn\'t matter.', why: 'It changed the score from 1 to 3 of 4.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why choose an odd k?',
        options: [
          { text: 'Odd numbers are luckier', why: 'It\'s about ties, not luck.' },
          { text: 'Python only accepts odd k', why: 'Any k works. Odd k just avoids ties.' },
          { text: 'With two possible answers, an odd number of votes can\'t tie' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson in one line.',
        template: 'A small k follows the [[1]]; a huge k ignores the [[2]].',
        blanks: [['noise'], ['patient']],
        distractors: ['rules', 'clinic'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'k is how many neighbours vote.',
          'An odd k avoids ties.',
          'The best k can be found without testing.',
          'With more data, the best k is often bigger.',
        ],
        bug: 2,
        fix: 'The best k is found by testing on unseen patients.',
        explanation: 'You only learn which k works by trying it on patients the predictor hasn\'t seen.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'misses = 2\nk = 3\nprint(misses > k / 2)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '2 > 1.5 is True.' },
          { text: '1.5', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With k = 12 on the notebook, what is predicted for every new patient: miss or come?',
        answers: ['come', 'likely to come'],
        placeholder: 'miss or come',
      },
    ],
  },
  reflect: {
    prompt: 'Too little advice and you follow one odd opinion; too much and you hear only the crowd. How many people do you ask before a big decision?',
    starters: ['I usually ask...', 'Too many opinions...'],
  },
  deepen: {
    title: 'A setting you choose',
    summary: 'k isn\'t learned from the data; you choose it. Settings like that are called hyperparameters. Chapter 9 shows how to choose them fairly.',
  },
  notes: 'Notebook k-NN on Kunle, Rita, Sade, Yemi (2 features): k=1 1/4, k=3 3/4, k=5 1/4, k=12 always "come" (5 of 12 missed) -> 2/4 (Rita, Sade).',
};

export default lesson;
