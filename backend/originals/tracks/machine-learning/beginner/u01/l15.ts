import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: accuracy, AI vs ML, limits, kinds of problems. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the right words',
  summary: 'Halima can now score a rule, explain AI to Folake, say what a model can\'t do, and name the kind of problem in front of her. Quick check before she asks the most important question of all.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Work out accuracy and compare with a lazy guess', 'Name the kind of ML problem and its limits'],
  learn: [
    {
      kind: 'story',
      title: 'A one-page glossary',
      beats: [
        { speaker: 'narrator', text: 'Halima writes a glossary for Folake: model, feature, label, accuracy, classification. Five words on one page.' },
        { speaker: 'folake', text: 'This is the first time "AI" has made sense to me. Keep going.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: measuring and naming.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A rule got 45 of 50 right. Print its accuracy as "90%"',
        starter: 'right = 45\ntotal = 50\n',
        solution: 'right = 45\ntotal = 50\nprint(f"{right / total:.0%}")\n',
        hint: 'f"{right / total:.0%}"',
        checks: [{ message: 'Print 90%', outputEquals: '90%' }],
      },
      {
        kind: 'mcq',
        prompt: '"Everyone comes" scores 80%. Your rule scores 78%. What do you conclude?',
        options: [
          { text: 'The rule is worse than the lazy guess' },
          { text: 'The rule is great: 78% is high', why: 'Compared with 80% for doing nothing, it\'s worse.' },
          { text: 'They\'re the same', why: '78% is below 80%.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of problem?',
        groups: ['Regression', 'Classification', 'Clustering'],
        items: [
          { text: 'Patients next week', group: 0 },
          { text: 'Miss or come', group: 1 },
          { text: 'Groups of similar clinics', group: 2 },
          { text: 'Spam or not', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['Accuracy', 'Right ÷ total'],
          ['AI', 'The big umbrella'],
          ['Machine learning', 'Learning rules from examples'],
          ['Supervised', 'Learning with labels'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'A model finds patterns in examples.',
          'A pattern proves a cause.',
          'Models can go out of date when the world changes.',
          'Always compare a score with a lazy guess.',
        ],
        bug: 1,
        fix: 'A pattern shows things go together, not that one causes the other.',
        explanation: 'Correlation isn\'t causation, in ML as everywhere.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{3 / 4:.0%}")',
        language: 'python',
        options: [
          { text: '75%' },
          { text: '0.75', why: ':.0% shows a percentage.' },
          { text: '3%', why: '3 ÷ 4 = 0.75 = 75%.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Can the model tell us which clinics we\'ll open in 2028?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'No. It predicts from patterns in past bookings. Where to open clinics is a different question, with data it doesn\'t have.' },
          { text: 'Yes, easily.', why: 'It has no examples for that question.' },
          { text: 'Only if we ask nicely.', why: 'It\'s about data, not manners.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s board line.',
        template: 'It\'s a [[1]] model: it predicts a category, miss or [[2]].',
        blanks: [['classification'], ['come']],
        distractors: ['regression', 'clustering'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes Halima\'s model different from a chat AI?',
        options: [
          { text: 'It learns from Afiya\'s bookings and predicts no-shows' },
          { text: 'It isn\'t machine learning', why: 'Both are ML models.' },
          { text: 'It knows everything a chat AI knows', why: 'It knows only patterns in bookings.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print both lines: "Rule: 92%" then "Everyone comes: 58%"',
        starter: 'right = 11\ncame = 7\ntotal = 12\n',
        solution: 'right = 11\ncame = 7\ntotal = 12\nprint(f"Rule: {right / total:.0%}")\nprint(f"Everyone comes: {came / total:.0%}")\n',
        hint: 'Two f-strings with :.0%',
        checks: [{ message: 'Print both lines', outputEquals: 'Rule: 92%\nEveryone comes: 58%' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Learning without labels is called ... learning. (one word)',
        answers: ['unsupervised'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'One number for the board. What do I say?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Not yet. When I have it, it\'ll be a score on patients the model hasn\'t seen, next to what a lazy guess gets.' },
          { text: '92%.', why: 'That was on the page the rule was built from. Not a fair test.' },
          { text: '100%.', why: 'Also on the same page. And no model is 100% on new patients.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Halima refuses to give Folake a number yet. Is that brave or annoying? When have you had to say "not yet" to someone in charge?',
    starters: ['I think it\'s...', 'I once said "not yet" when...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 11-14. 45/50 = 90%; 3/4 = 75%; 11/12 = 92%; 7/12 = 58%.',
};

export default lesson;
