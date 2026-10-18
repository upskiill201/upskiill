import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11 — Measuring a guess: accuracy = right ÷ total, and comparing with a lazy guess. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Measuring a guess',
  summary: 'Folake asks the question every boss asks: "How good is it?" Halima needs one honest number. Miracle teaches her the first one: accuracy.',
  minutes: 11,
  outcomes: [
    'Work out accuracy: right ÷ total',
    'Show accuracy as a percentage in Python',
    'Compare a rule with the lazy guess "everyone comes"',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How good is the sticky note?',
      steps: [
        {
          title: '1. Count the right guesses',
          body: 'The first rule (wait > 14 and no reminder) was right for 11 of the 12 patients.',
          code: 'right = 11\ntotal = 12',
          language: 'python',
        },
        {
          title: '2. Divide',
          body: 'Accuracy is right ÷ total.',
          code: 'print(right / total)   # 0.9166666666666666',
          language: 'python',
        },
        {
          title: '3. Make it readable',
          body: ':.0% in an f-string shows it as a whole percentage.',
          code: 'print(f"Accuracy: {right / total:.0%}")   # Accuracy: 92%',
          language: 'python',
        },
        {
          title: '4. Compare with a lazy guess',
          body: 'What if we just said "everyone comes"? 7 of the 12 came, so that lazy guess is right 7 times: 58%. The rule beats it by a lot.',
          code: 'print(f"Everyone comes: {7 / 12:.0%}")   # 58%',
          language: 'python',
        },
        {
          title: '5. Always ask "compared with what?"',
          body: 'A score means nothing on its own. 92% sounds great; it\'s only great because the lazy guess gets 58%. Chapter 7 shows a case where the lazy guess scores over 80%.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Score it',
      caption: 'Change right and run it again.',
      code: 'right = 11\ntotal = 12\n\nprint(f"Rule: {right / total:.0%}")\nprint(f"Everyone comes: {7 / total:.0%}")\n',
      challenge: 'The distance rule from lesson 9 got all 12 right. Show its accuracy.',
    },
  ],
  apply: {
    scenario: 'How good is the guess?',
    items: [
      {
        kind: 'mcq',
        prompt: 'A rule is right for 9 of 10 patients. What is its accuracy?',
        options: [
          { text: '90%' },
          { text: '9%', why: '9 ÷ 10 is 0.9, which is 90%.' },
          { text: '10%', why: 'That\'s the share it got wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the accuracy of a rule that got 18 of 20 right, as a percentage like "90%"',
        starter: 'right = 18\ntotal = 20\n',
        solution: 'right = 18\ntotal = 20\nprint(f"{right / total:.0%}")\n',
        hint: 'f"{right / total:.0%}"',
        checks: [
          { message: 'Print 90%', outputEquals: '90%' },
          { message: 'Divide right by total', codeIncludes: 'right / total' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{7 / 12:.0%}")',
        language: 'python',
        options: [
          { text: '58%' },
          { text: '0.58', why: ':.0% shows a percentage.' },
          { text: '7%', why: '7 ÷ 12 is about 0.58, which is 58%.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The accuracy formula.',
        template: 'accuracy = [[1]] ÷ [[2]]',
        blanks: [['right', 'right guesses'], ['total']],
        distractors: ['wrong', 'features'],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '92%! Tell the board it\'s 92% accurate.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'On the 12 patients I built it from. On new patients it could be lower. Let me test it fairly first.' },
          { text: 'Yes, 92% it is.', why: 'That number came from the same page the rule was made from.' },
          { text: 'Accuracy doesn\'t matter.', why: 'It matters; it just has to be measured fairly.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the lazy guess\'s accuracy: 140 of 200 patients came. Show it as "70%"',
        starter: 'came = 140\ntotal = 200\n',
        solution: 'came = 140\ntotal = 200\nprint(f"{came / total:.0%}")\n',
        hint: '"Everyone comes" is right for everyone who came.',
        checks: [{ message: 'Print 70%', outputEquals: '70%' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'The lazy guess gets 70%. Is the rule better or worse?',
        groups: ['Better than lazy', 'Not better'],
        items: [
          { text: 'Rule gets 85%', group: 0 },
          { text: 'Rule gets 65%', group: 1 },
          { text: 'Rule gets 70%', group: 1 },
          { text: 'Rule gets 92%', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to the accuracy.',
        pairs: [
          ['11 of 12 right', '92%'],
          ['7 of 12 right', '58%'],
          ['12 of 12 right', '100%'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why compare with "everyone comes"?',
        options: [
          { text: 'A model is only useful if it beats the easiest possible guess' },
          { text: 'Because patients always come', why: 'They don\'t. It\'s a yardstick, not a belief.' },
          { text: 'To make the model look bad', why: 'To make sure its score actually means something.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A rule is right 3 times out of 4. What is its accuracy, as a percentage?',
        answers: ['75%', '75'],
        placeholder: 'A percentage',
      },
    ],
  },
  reflect: {
    prompt: '"Compared with what?" Think of a number you\'ve heard recently (a score, a price, a statistic). What should it be compared with to mean something?',
    starters: ['I heard...', 'It should be compared with...'],
  },
  deepen: {
    title: 'Error rate',
    summary: 'The flip side of accuracy is the error rate: wrong ÷ total. 92% accuracy means about an 8% error rate. Some teams talk in errors because it keeps everyone humble.',
  },
  notes: '11/12 = 0.9167 -> 92%; 7/12 = 0.5833 -> 58%; 18/20 = 90%; 140/200 = 70%. Python format spec ".0%" multiplies by 100 and adds % (Format Specification Mini-Language).',
};

export default lesson;
