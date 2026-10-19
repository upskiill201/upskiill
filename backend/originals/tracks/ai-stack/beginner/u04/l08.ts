import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8 — Benchmarks, read honestly. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Benchmarks, read honestly',
  summary: 'Kavya sends a leaderboard screenshot: model-a tops every benchmark. "Case closed." Tey explains what a benchmark score really tells you, and what it can\'t.',
  minutes: 11,
  outcomes: [
    'Explain what a benchmark is',
    'Know three reasons a benchmark score can mislead',
    'Average a set of scores in Python',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A benchmark is a fixed set of test questions that every model answers, so scores can be compared. There are benchmarks for school-style knowledge, maths, coding and more.', replies: ['So the top score is the best model?'] },
        { tey: 'For THAT test. Three catches. One: the test isn\'t your job. A maths benchmark says nothing about answering from Mr Rao\'s help page.', replies: ['Two?'] },
        { tey: 'Two: test questions leak onto the internet, and models may have seen them in training, which inflates scores. Three: small differences, like 85% against 84%, are often noise.', replies: ['So what do we trust?'] },
        { tey: 'Use benchmarks to make a shortlist. Then test the shortlist on YOUR questions: real customer messages, with answers you know. That\'s the next lesson.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Average a set of scores',
      caption: 'Made-up benchmark scores for one model.',
      code: 'scores = {"knowledge": 0.82, "maths": 0.79, "coding": 0.85}\naverage = sum(scores.values()) / len(scores)\nprint(f"Average: {average:.2f}")\nprint("Tells us about shop questions? Not directly.")\n',
      challenge: 'Add a "shop questions" score of 0.67 from our own test. How does the average change?',
    },
  ],
  apply: {
    scenario: 'Reading the leaderboard.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a benchmark?',
        options: [
          { text: 'A fixed set of test questions used to compare models' },
          { text: 'A guarantee that a model will work for you', why: 'It measures one test, not your job.' },
          { text: 'The model\'s price list', why: 'It\'s a test, not prices.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average of these scores, rounded to 2 places',
        starter: 'scores = [0.82, 0.79, 0.85]\n',
        solution: 'scores = [0.82, 0.79, 0.85]\nprint(round(sum(scores) / len(scores), 2))\n',
        hint: 'round(sum(scores) / len(scores), 2)',
        checks: [{ message: 'Print 0.82', outputEquals: '0.82' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good use of benchmarks, or a misuse?',
        groups: ['Good use', 'Misuse'],
        items: [
          { text: 'Building a shortlist', group: 0 },
          { text: 'Choosing the final model without testing', group: 1 },
          { text: 'Spotting models that are far behind', group: 0 },
          { text: 'Treating 85% vs 84% as a clear win', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the catch to its meaning.',
        pairs: [
          ['Not your job', 'The test doesn\'t measure your task'],
          ['Leaked questions', 'The model may have seen the test'],
          ['Noise', 'Tiny differences mean little'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'model-a is #1 on the leaderboard. Why test anything?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'The leaderboard tests school exams and coding, not "is delivery free?". It shortlists models; our own questions choose one.' },
          { text: 'You\'re right, #1 is always best.', why: '#1 on a different task may not help yours.' },
          { text: 'Leaderboards are always fake.', why: 'They\'re useful for shortlists; just not final decisions.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'scores = {"a": 0.9, "b": 0.7}\nprint(round(sum(scores.values()) / len(scores), 1))',
        language: 'python',
        options: [
          { text: '0.8' },
          { text: '1.6', why: 'Divide the sum by the number of scores.' },
          { text: '0.9', why: 'That\'s just the highest.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The benchmark rule.',
        template: 'Benchmarks build the [[1]]; your own questions make the [[2]].',
        blanks: [['shortlist'], ['decision', 'choice']],
        distractors: ['bill', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line reads the benchmark wrongly?',
        lines: [
          'model-a scores 85%, model-b 84% on a knowledge test.',
          'Both are well ahead of an older model at 60%.',
          'So model-a will be clearly better for our shop.',
          'We\'ll test both on our own questions.',
        ],
        bug: 2,
        fix: 'The 1-point gap is likely noise, and the test isn\'t our task.',
        explanation: 'Small gaps on an unrelated test don\'t predict our results.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can leaked test questions inflate a score?',
        options: [
          { text: 'If the model saw the questions in training, it may remember answers rather than work them out' },
          { text: 'Leaks make the test harder', why: 'They make it easier, unfairly.' },
          { text: 'They don\'t affect scores', why: 'Seeing the test in advance helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is a fixed set of test questions used to compare models called?',
        answers: ['benchmark', 'a benchmark'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Exam results don\'t always predict job performance. What would a "benchmark" for your own work look like?',
    starters: ['A test for my work would...', 'It would check...'],
  },
  deepen: {
    title: 'Known benchmarks',
    summary: 'You\'ll see names like MMLU (broad knowledge) and coding or maths suites. Look up what each one actually tests before trusting a headline score.',
  },
  notes: 'Benchmarks: standard test sets (e.g. MMLU for broad multiple-choice knowledge). Caveats: task mismatch, test-set contamination, small differences within noise. Scores in the lesson are made up. Average of [0.82, 0.79, 0.85] = 0.82.',
};

export default lesson;
