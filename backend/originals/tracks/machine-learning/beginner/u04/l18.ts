import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SETUP } from './code';

/** Chapter 4 · Lesson 18 — Explaining it to Folake: two slides. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Explaining it to Folake',
  summary: 'Chidi\'s draft slide says "97.5% accurate". Halima\'s says something smaller and truer. Side by side, which one would you trust, and which one would survive the board\'s first question?',
  minutes: 12,
  outcomes: [
    'Compare a misleading slide with an honest one',
    'Explain a test result without jargon',
    'Turn the call-list numbers into a sentence',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two slides for the board',
      before: {
        label: 'Chidi\'s draft',
        text: '"Our AI predicts no-shows with 97.5% accuracy"\nNo baseline\nUses confirmed_on_day, filled in after the appointment\nTested once, no range\nSounds amazing\nFails the first evening it\'s used',
      },
      after: {
        label: 'Halima\'s slide',
        text: '"Bisi\'s 20 evening calls would reach 12 of 37 no-shows, about three times as many as random calls"\nTested on a week the predictor never saw\nUses only what we know the evening before\nRandom weeks: between 6 and 13\nSounds modest\nWorks on real evenings',
      },
      notes: [
        'The first question a board member asks is "compared to what?" Halima\'s slide already answers it.',
        'Translate the score into an action: calls, patients, chairs filled.',
        'Say what it was tested on, in one short phrase.',
        'A modest true number builds trust. A big number that collapses later destroys it.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The slide\'s numbers',
      caption: 'Calls, catches, and what random would do.',
      code: SETUP + '\nt = test.assign(risk=knn_risk(train, test, feats))\ncaught = t.nlargest(20, "risk")["no_show"].sum()\nrandom_calls = 20 * t["no_show"].sum() / len(t)\nprint("Caught:", caught, "of", t["no_show"].sum())\nprint("Random calls would reach about", round(random_calls, 1))\nprint("That\'s", round(caught / random_calls, 1), "times as many")\n',
      challenge: 'Rewrite Halima\'s headline for a clinic nurse instead of the board.',
    },
  ],
  apply: {
    scenario: 'Two slides.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows 20 random week-12 calls would reach on average (20 x no-shows / bookings), rounded to 1 place',
        starter: SETUP,
        solution: SETUP + 'print(round(20 * test["no_show"].sum() / len(test), 1))\n',
        hint: '20 * test["no_show"].sum() / len(test)',
        checks: [{ message: 'Print 3.7', outputEquals: '3.7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Chidi\'s slide or Halima\'s?',
        groups: ['Chidi\'s', 'Halima\'s'],
        items: [
          { text: 'No baseline', group: 0 },
          { text: 'Compared with random calls', group: 1 },
          { text: 'Uses a column from after the appointment', group: 0 },
          { text: 'Gives a range for other weeks', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first question a board member is likely to ask?',
        options: [
          { text: '"Compared to what?"' },
          { text: '"Which font is this?"', why: 'They\'ll ask about the comparison.' },
          { text: '"What\'s k?"', why: 'Boards care about outcomes, not settings.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many times more no-shows the top 20 reaches than random calls, rounded to 1 place',
        starter: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\ncaught = t.nlargest(20, "risk")["no_show"].sum()\nrandom_calls = 20 * t["no_show"].sum() / len(t)\n',
        solution: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\ncaught = t.nlargest(20, "risk")["no_show"].sum()\nrandom_calls = 20 * t["no_show"].sum() / len(t)\nprint(round(caught / random_calls, 1))\n',
        hint: 'caught / random_calls',
        checks: [{ message: 'Print 3.2', outputEquals: '3.2' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '"Three times as many" sounds less exciting than 97.5%.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Fine, use 97.5%.', why: 'It fails on real evenings.' },
          { text: 'It\'s less exciting and it\'s real. Imagine presenting 97.5%, then the first evening it fails. Which would you rather defend?' },
          { text: 'Let\'s say "nearly 100%".', why: 'Rounding up a leak doesn\'t fix it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the slide part to its job.',
        pairs: [
          ['"12 of 37 no-shows"', 'What it does for patients'],
          ['"Three times random"', 'Compared to what'],
          ['"A week it never saw"', 'Tested on what'],
          ['"Between 6 and 13"', 'How sure'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s headline.',
        template: 'Bisi\'s 20 calls would reach [[1]] of 37 no-shows, about [[2]] times as many as random calls.',
        blanks: [['12'], ['three', '3']],
        distractors: ['19', 'ten'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this draft slide is misleading?',
        lines: ['Tested on week 12, never seen in training.', 'Top 20 calls reach 12 of 37 no-shows.', 'Accuracy: 97.5%.'],
        bug: 2,
        fix: 'Accuracy: 82.5% (guessing "everyone comes": 81.5%).',
        explanation: '97.5% came from the leaky column. The honest accuracy is 82.5%, with its baseline.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many no-shows were there in week 12 altogether?',
        answers: ['37', 'thirty-seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does a modest true number build more trust?',
        options: [
          { text: 'Boards prefer small numbers', why: 'They prefer numbers that hold up.' },
          { text: 'It doesn\'t', why: 'A collapsing big number costs far more trust.' },
          { text: 'It still holds when the model is actually used, so people keep believing you' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write Halima\'s headline in your own words, for someone who has never heard of machine learning.',
    starters: ['My headline:'],
  },
  deepen: {
    title: 'Lift',
    summary: '"Three times as many as random" has a name: lift. It\'s one of the clearest ways to explain a ranking model to people who\'ll act on it.',
  },
  notes: 'Week 12: top 20 catches 12 of 37; random 20 expected 3.7; lift 12/3.7 = 3.24, rounded 3.2. Honest accuracy 0.825 vs baseline 0.815.',
};

export default lesson;
