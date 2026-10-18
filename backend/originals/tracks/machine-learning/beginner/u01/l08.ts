import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 — A model is a guess-maker: inputs in, a prediction out, never certain. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'A model is a guess-maker',
  summary: 'Halima keeps hearing the word "model" and pictures something complicated. Tey explains it the simple way: a model is anything that takes clues in and gives a guess out. Her sticky note is one.',
  minutes: 10,
  outcomes: [
    'Explain what a model is: inputs in, prediction out',
    'Know that predictions are guesses, never certainties',
    'Read a prediction given as a chance ("7 in 10")',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A model is a guess-maker. You give it the features of one example, and it gives you a prediction. Halima\'s sticky note is a model: wait and reminder go in, "likely to miss" comes out.', replies: ['That simple?'] },
        { tey: 'That simple. Bigger models use more features and more complicated patterns, but the shape is always the same: features in, prediction out.', replies: ['Is the prediction always right?'] },
        { tey: 'No, and it never will be. A patient with every warning sign might still come; one with none might get sick and miss. A model says what\'s LIKELY, based on what happened to similar patients before.', replies: ['Can it say how sure it is?'] },
        { tey: 'Many can. Instead of just "miss", a model can say "7 in 10 chance of missing" (0.7). That\'s more useful: Bisi can call the 0.9s before the 0.6s.' },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      caption: 'Every model has this shape.',
      code: 'features in             model             prediction out\nwait 21, no reminder  ->  [ guess-maker ]  ->  "likely to miss" (0.8)',
    },
  ],
  apply: {
    scenario: 'What a model really is.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a model do?',
        options: [
          { text: 'Takes features in and gives a prediction out' },
          { text: 'Stores every appointment ever made', why: 'That\'s a database. A model makes guesses.' },
          { text: 'Tells the future for certain', why: 'It says what\'s likely, not what\'s certain.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "The model says 0.8. Print how many out of 10 patients like this would miss: chance * 10",
        starter: "chance = 0.8\n",
        solution: "chance = 0.8\nprint(chance * 10)\n",
        hint: "print(chance * 10)",
        checks: [
          { message: "Print 8.0", outputEquals: "8.0" },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A model says a patient has a 0.8 chance of missing. What does that mean?',
        options: [
          { text: 'Out of 10 patients like this, about 8 would miss' },
          { text: 'The patient will definitely miss', why: '0.8 is likely, not certain.' },
          { text: 'The patient is 80% late', why: 'It\'s the chance of missing, not lateness.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Input to the model, or output?',
        groups: ['Input (feature)', 'Output (prediction)'],
        items: [
          { text: 'Waited 21 days', group: 0 },
          { text: '"Likely to miss"', group: 1 },
          { text: 'No reminder', group: 0 },
          { text: '0.8 chance of missing', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'The model said Musa would miss, and he came. So it\'s broken?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Not broken: it\'s a guess. What matters is how often it\'s right over many patients. We\'ll measure that.' },
          { text: 'Yes, delete it.', why: 'One wrong guess doesn\'t make a model useless.' },
          { text: 'Musa must have done something wrong.', why: 'Patients aren\'t wrong for surprising a model.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chance to the words.',
        pairs: [
          ['0.9', 'Very likely'],
          ['0.5', 'Could go either way'],
          ['0.1', 'Unlikely'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Bisi can make 3 calls. Who should she call first?',
        options: [
          { text: 'The patients with the highest chance of missing' },
          { text: 'The patients with the lowest chance', why: 'They\'ll probably come anyway.' },
          { text: 'Random patients', why: 'The chances tell her where a call helps most.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The shape of every model.',
        template: '[[1]] in, [[2]] out.',
        blanks: [['features', 'Features'], ['prediction', 'a prediction']],
        distractors: ['answers', 'labels'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'Halima\'s sticky note is a simple model.',
          'Bigger models use more features.',
          'A good model never makes a wrong prediction.',
          'Some models say how likely something is.',
        ],
        bug: 2,
        fix: 'A good model is right often, and we know how often.',
        explanation: 'All models are sometimes wrong. Good ones are wrong less, and we measure it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A chance of 7 in 10, written as a decimal.',
        answers: ['0.7', '.7'],
        placeholder: 'A decimal',
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'I don\'t want "likely". I want "will".',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Nobody can promise "will": people get sick, buses break down. "Likely" is honest, and it still tells us who to help first.' },
          { text: 'OK, I\'ll make it say "will".', why: 'That would be dishonest: it\'s still a guess.' },
          { text: 'Then we can\'t use machine learning.', why: 'Likely is useful. It just isn\'t certain.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Weather apps say "70% chance of rain". Do you treat that as "it will rain"? How should Folake treat a 0.7 no-show chance?',
    starters: ['When I see 70%, I...', 'Folake should...'],
  },
  deepen: {
    title: '"All models are wrong..."',
    summary: 'The statistician George Box wrote that all models are wrong, but some are useful. The goal isn\'t a perfect model; it\'s a useful one, with its mistakes known.',
  },
  notes: 'George E. P. Box: "All models are wrong, but some are useful" (paraphrased from Box 1976/1979 and Box & Draper 1987; the short form is the well-known version). Probabilities as "out of 10 like this".',
};

export default lesson;
