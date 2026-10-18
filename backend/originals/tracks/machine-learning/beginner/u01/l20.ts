import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Chapter Challenge. Climax: Predictor v0.1 meets four patients it has never seen. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Predictor v0.1',
  summary: 'A new week, a new notebook page, four patients the rules have never seen. Miracle: "Now we find out what your rules are really worth." Everything from Chapter 1, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Test a rule on examples it has never seen', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'story',
      title: 'Four new patients',
      beats: [
        { speaker: 'narrator', text: 'Next week\'s page. Kunle: 19 days, no reminder, 4 km, missed. Rita: 6 days, reminder, 16 km, came. Sade: 22 days, reminder, 3 km, came. Yemi: 11 days, no reminder, 7 km, missed.' },
        { speaker: 'halima', text: 'The first rule gets Kunle, Rita and Sade right. 3 of 4. The rule with the distance clue gets Rita wrong too: 2 of 4.' },
        { speaker: 'miracle', text: 'The distance clue made the old page perfect, and the new page worse. You bent the rule to fit Obi. That\'s the most important lesson in machine learning, and you found it in week one.' },
        { speaker: 'tey', text: 'Your turn: test Predictor v0.1.' },
      ],
      choice: {
        prompt: 'Which rule should be Predictor v0.1?',
        options: [
          {
            text: 'The first rule (wait > 14 and no reminder): 75% on new patients, against 50% for "everyone comes".',
            outcome: 'Right. Judge a rule on patients it hasn\'t seen. Four patients is still very few, so Chapter 4 builds a proper test.',
            best: true,
          },
          {
            text: 'The distance rule: it was 100% on the first page.',
            outcome: '100% on the page it was built from, 50% on new patients: no better than guessing "everyone comes".',
          },
          {
            text: 'Neither: 3 of 4 isn\'t perfect.',
            outcome: 'No model is perfect. 75% beats the lazy guess\'s 50%, and that\'s a real start.',
          },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Predictor v0.1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Write Predictor v0.1 for Kunle: print "Likely to miss" if wait_days > 14 and no reminder, otherwise "Likely to come"',
        starter: 'wait_days = 19\nreminder = False\n# Write the rule here\n',
        solution: 'wait_days = 19\nreminder = False\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'if wait_days > 14 and not reminder:',
        checks: [
          { message: 'Print Likely to miss for Kunle', outputEquals: 'Likely to miss' },
          { message: 'Use if', codeIncludes: 'if ' },
          { message: 'Use else', codeIncludes: 'else' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'The first rule (wait > 14 and no reminder) on the new patients: right or wrong?',
        groups: ['Right', 'Wrong'],
        items: [
          { text: 'Kunle: 19 days, no reminder, missed', group: 0 },
          { text: 'Rita: 6 days, reminder, came', group: 0 },
          { text: 'Sade: 22 days, reminder, came', group: 0 },
          { text: 'Yemi: 11 days, no reminder, missed', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print both scores on the new patients: "Rule: 75%" then "Everyone comes: 50%"',
        starter: 'right = 3\ncame = 2\ntotal = 4\n',
        solution: 'right = 3\ncame = 2\ntotal = 4\nprint(f"Rule: {right / total:.0%}")\nprint(f"Everyone comes: {came / total:.0%}")\n',
        hint: 'f"Rule: {right / total:.0%}"',
        checks: [{ message: 'Print both lines', outputEquals: 'Rule: 75%\nEveryone comes: 50%' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the distance rule do worse on the new page?',
        options: [
          { text: 'It was bent to fit one patient (Obi) on the old page' },
          { text: 'Distance never matters', why: 'It may matter. One example wasn\'t enough to learn the right rule.' },
          { text: 'The new patients lied', why: 'The rule was fit too closely to the old page.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to the Chapter 1 idea.',
        pairs: [
          ['Feature', 'wait_days'],
          ['Label', 'missed'],
          ['Training', 'Finding the rule from old patients'],
          ['Predicting', 'Using it on new patients'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence in Halima\'s report.',
        lines: [
          'Predictor v0.1 is a hand-made rule.',
          'On four new patients it was right 3 times.',
          '"Everyone comes" was right 2 times.',
          'So v0.1 will be right 75% of the time, at every clinic, for ever.',
        ],
        bug: 3,
        fix: 'Four patients is too few to be sure; we need a bigger, fair test.',
        explanation: 'A score from four examples is a hint, not a promise. Chapter 4 builds a proper test.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of problem?',
        groups: ['Regression', 'Classification', 'Clustering'],
        items: [
          { text: 'Will Kunle miss?', group: 1 },
          { text: 'How many patients on Monday?', group: 0 },
          { text: 'Which clinics are alike?', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So, can I tell the board it\'s 75%?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Tell them we have a first rule that beats guessing on new patients, and that a proper test on thousands of bookings is next.' },
          { text: 'Yes: 75%, guaranteed.', why: 'Four patients can\'t guarantee anything.' },
          { text: 'Tell them it\'s 100%.', why: 'That was the old page, and the distance rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson of the week.',
        template: 'Judge a rule on examples it has [[1]] seen, and compare with a [[2]] guess.',
        blanks: [['never', 'not'], ['lazy', 'simple']],
        distractors: ['already', 'perfect'],
      },
      {
        kind: 'mcq',
        prompt: 'What should a clinic do with a "likely to miss" flag?',
        options: [
          { text: 'Offer more help: a reminder call or a nearer slot' },
          { text: 'Cancel the booking', why: 'Never less care because of a guess.' },
          { text: 'Double-book the slot', why: 'If the model is wrong, a patient who came pays for it.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps Halima followed this chapter.',
        lines: ['Ask a clear question', 'Find a rule from examples', 'Write it in Python', 'Measure its accuracy', 'Test it on new patients'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Predictor v0.1 was right for how many of the 4 new patients?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The distance rule looked perfect and did worse on new patients. Where else does "perfect on practice, worse for real" happen (exams, sport, interviews)?',
    starters: ['It happens in...', 'The fix is...'],
  },
  notes: 'Chapter 1 challenge. New page: Kunle (19, no, 4 km, missed), Rita (6, yes, 16 km, came), Sade (22, yes, 3 km, came), Yemi (11, no, 7 km, missed). Rule 1 right for Kunle, Rita, Sade (3/4 = 75%). Distance rule (or km > 12) also flags Rita: 2/4 = 50%. "Everyone comes": Rita and Sade, 2/4 = 50%. Sets up Chapter 4 (fair tests) and Chapter 9 (overfitting).',
};

export default lesson;
