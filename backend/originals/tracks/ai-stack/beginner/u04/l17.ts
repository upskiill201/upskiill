import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 17 — Common model-choice mistakes, and what to do instead. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common model-choice mistakes',
  summary: 'Arjun asks Joel to write down every mistake the team nearly made this week, next to what they did instead. It\'s a short list, and most teams make all of it.',
  minutes: 11,
  outcomes: [
    'Name the common mistakes when choosing a model',
    'Say what to do instead for each',
    'Write a minimum-score check in Python',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Nearly did vs did',
      before: {
        label: 'Nearly did',
        text: 'Picked the biggest model because it\'s famous.\nTrusted a leaderboard for a shop job.\nPasted the whole product list into every prompt.\nTied Ask Rao to one provider with no backup.\nForgot the licence.',
      },
      after: {
        label: 'Did instead',
        text: 'Tested all three on our own 30 questions.\nUsed the leaderboard only for a shortlist.\nSent only the matching lines.\nKept model-b ready as a backup.\nChecked the licence of the exact model version.',
      },
      notes: [
        'The one rule behind all five: decide with evidence from your own job, at your own volume.',
        'Write the pass mark down BEFORE testing (for example, "at least 20 of 30"), so the result can\'t be argued after.',
        'Re-test when a provider releases a new version: names stay the same, behaviour changes.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A pass mark',
      caption: 'Decide the bar first, then compare.',
      code: 'pass_mark = 20\nscores = {"model-a": 20, "model-b": 20, "model-c": 20}\nmonthly = {"model-a": 54.0, "model-b": 5.4, "model-c": 1.08}\n\npassing = [m for m in scores if scores[m] >= pass_mark]\nchoice = min(passing, key=lambda m: monthly[m])\nprint("Passing:", passing)\nprint("Choose:", choice)\n',
      challenge: 'Raise the pass mark to 21. What happens, and what should the team do?',
    },
  ],
  apply: {
    scenario: 'Not making the usual mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the list of models that score at least the pass mark',
        starter: 'pass_mark = 20\nscores = {"model-a": 20, "model-b": 20, "model-c": 20, "practice-tiny": 17}\n',
        solution: 'pass_mark = 20\nscores = {"model-a": 20, "model-b": 20, "model-c": 20, "practice-tiny": 17}\nprint([m for m in scores if scores[m] >= pass_mark])\n',
        hint: '[m for m in scores if scores[m] >= pass_mark]',
        checks: [{ message: "Print ['model-a', 'model-b', 'model-c']", outputEquals: "['model-a', 'model-b', 'model-c']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the pass mark down before testing?',
        options: [
          { text: 'Providers require it', why: 'It\'s for your team\'s honesty, not the provider.' },
          { text: 'So nobody moves the bar after seeing which model they like wins' },
          { text: 'It makes the models score higher', why: 'It changes the decision, not the scores.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mistake or good practice?',
        groups: ['Mistake', 'Good practice'],
        items: [
          { text: 'One provider and no backup', group: 0 },
          { text: 'Re-test when a new version comes out', group: 1 },
          { text: 'Choose by leaderboard rank alone', group: 0 },
          { text: 'Check the exact licence version', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to the fix.',
        pairs: [
          ['Famous model by default', 'Test on our 30 questions'],
          ['Whole product list in every prompt', 'Send only matching lines'],
          ['No backup provider', 'Keep model-b ready'],
          ['Forgot the licence', 'Read it for the exact version'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'The provider updated model-c last night. Same name, so nothing to do, right?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Right, nothing changes.', why: 'Providers change behaviour under the same name.' },
          { text: 'Switch to model-a to be safe.', why: 'Re-test first; don\'t guess.' },
          { text: 'Same name, maybe different behaviour. Run the 30 questions again before we trust it.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'monthly = {"model-b": 5.4, "model-c": 1.08}\nprint(min(monthly, key=lambda m: monthly[m]))',
        language: 'python',
        options: [
          { text: 'model-c' },
          { text: 'model-b', why: 'min picks the lowest monthly cost.' },
          { text: '1.08', why: 'It returns the key, the model name.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'From the passing models, print the one with the lowest monthly cost',
        starter: 'passing = ["model-a", "model-b", "model-c"]\nmonthly = {"model-a": 54.0, "model-b": 5.4, "model-c": 1.08}\n',
        solution: 'passing = ["model-a", "model-b", "model-c"]\nmonthly = {"model-a": 54.0, "model-b": 5.4, "model-c": 1.08}\nprint(min(passing, key=lambda m: monthly[m]))\n',
        hint: 'min(passing, key=lambda m: monthly[m])',
        checks: [{ message: 'Print model-c', outputEquals: 'model-c' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The one rule.',
        template: 'Decide with evidence from your own [[1]], at your own [[2]].',
        blanks: [['job', 'questions'], ['volume']],
        distractors: ['leaderboard', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'This picks the most expensive passing model. Which line?',
        language: 'python',
        lines: ['passing = [m for m in scores if scores[m] >= 20]', 'choice = max(passing, key=lambda m: monthly[m])', 'print(choice)'],
        bug: 1,
        fix: 'choice = min(passing, key=lambda m: monthly[m])',
        explanation: 'Among models that pass, pick the cheapest.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What score out of 30 did the team set as the pass mark?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five mistakes do you think you\'d be most likely to make? Why?',
    starters: ['I\'d probably...', 'Because...'],
  },
  deepen: {
    title: 'Pinning versions',
    summary: 'Many APIs let you call a dated version of a model instead of the latest. Pin a version in production and move to the new one only after it passes your test.',
  },
  notes: 'Scores from teyro_ai: 20/30 for model-a, b, c with full help page; practice-tiny 17/30 with k=2 retrieval (20 with k=3). Monthly 54.0 / 5.4 / 1.08. Many providers offer dated model snapshots and change aliases over time.',
};

export default lesson;
