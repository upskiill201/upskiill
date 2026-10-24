import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, IMPORTS, TEST_BASE, V9 } from './code';

const BOTH = TEST_BASE + V9 + FOREST + 'v9.fit(train[feats], train["no_show"])\nforest.fit(train[feats], train["no_show"])\n';

/** Chapter 10 · Lesson 20 — Chapter Challenge: the board's drivers slide. Cliffhanger: kinds of clinics (Chapter 11). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the drivers slide',
  summary: 'The board wants two answers: "Is there a better model?" and "What predicts a no-show?" Use the whole chapter. Then Bisi asks a question with no right answers to learn from.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Answer the board with evidence from two models', 'Use every Chapter 10 skill together'],
  learn: [
    {
      kind: 'story',
      title: 'Two answers',
      beats: [
        { speaker: 'folake', text: 'Two questions from the board. Is there a better model than ours? And what predicts a no-show?' },
        { speaker: 'halima', text: 'No: forests and boosting lose to v0.9 over 11 weeks. And past misses predict most, in both models; reminders go with fewer misses, worth testing properly.' },
        { speaker: 'narrator', text: 'The slide takes two minutes. Afterwards, Bisi lingers with a spreadsheet from head office: 300 clinics across the region.' },
        { speaker: 'bisi', text: 'These aren\'t our eight. Head office wants a reminder plan for all 300. But they\'re not all the same: some are huge and busy, some tiny, some miles from anywhere.' },
        { speaker: 'halima', text: 'And there\'s no "answer" column to learn from. Nobody\'s labelled what kind of clinic each one is.' },
        { speaker: 'miracle', text: 'Then we let the data find the kinds.' },
        { speaker: 'tey', text: 'That\'s Chapter 10: wobbly trees, forests, how many trees, importance, cause, boosting, size, tuning, simplicity and choosing for the clinic. Chapter 11 learns without labels: finding groups.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 10 challenge: the board\'s drivers slide.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Slide line 1: print v0.9\'s strongest predictor (largest coefficient by size)',
        starter: BOTH + 'weights = pd.Series(v9[-1].coef_[0], index=feats)\n',
        solution: BOTH + 'weights = pd.Series(v9[-1].coef_[0], index=feats)\nprint(weights.abs().idxmax())\n',
        hint: 'weights.abs().idxmax()',
        checks: [{ message: 'Print previous_no_shows', outputEquals: 'previous_no_shows' }],
      },
      {
        kind: 'mcq',
        prompt: 'The board asks "Is there a better model?" What\'s the honest answer?',
        options: [
          { text: 'Not on our data: forests and boosting lost to v0.9 over 11 weeks' },
          { text: 'Yes, forests', why: 'They lost.' },
          { text: 'We didn\'t check', why: 'We checked thoroughly.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Slide line 2: print the forest\'s most important feature, to show the models agree',
        starter: BOTH,
        solution: BOTH + 'print(pd.Series(forest.feature_importances_, index=feats).idxmax())\n',
        hint: 'pd.Series(forest.feature_importances_, index=feats).idxmax()',
        checks: [{ message: 'Print previous_no_shows', outputEquals: 'previous_no_shows' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the slide, or off it?',
        groups: ['On the slide', 'Off the slide'],
        items: [
          { text: '"What predicts a missed appointment"', group: 0 },
          { text: 'v0.9 beat forests over 11 weeks', group: 0 },
          { text: '"Why patients miss"', group: 1 },
          { text: 'The forest won one lucky split', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Bisi\'s new file: load clinic_visits.csv and print how many clinics it has',
        starter: IMPORTS,
        solution: IMPORTS + 'clinics = pd.read_csv("clinic_visits.csv")\nprint(len(clinics))\n',
        hint: 'pd.read_csv("clinic_visits.csv"), then len',
        checks: [{ message: 'Print 300', outputEquals: '300' }],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'There\'s no answer column. Can machine learning still help?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'No, we need labels.', why: 'Unsupervised learning needs none.' },
          { text: 'Make up the labels.', why: 'Let the data find the groups.' },
          { text: 'Yes, differently: instead of predicting a label, we ask the data which clinics are alike. That\'s clustering, next chapter.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 10 idea to the slide.',
        pairs: [
          ['Cross-validation', 'v0.9 beats forests over 11 weeks'],
          ['Feature importance', 'Forest agrees on past misses'],
          ['Importance isn\'t cause', '"Predicts", not "causes"'],
          ['Choosing for the clinic', 'Small, explainable, best'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Many trees steady one tree, but on [[1]] data a [[2]] model can still win.',
        blanks: [['small'], ['simple']],
        distractors: ['huge', 'random'],
      },
      {
        kind: 'findBug',
        prompt: 'Which slide line overclaims?',
        lines: ['Past misses predict most, in two different models.', 'Reminders go with fewer missed appointments.', 'Reminders halve no-shows.'],
        bug: 2,
        fix: 'Reminders are worth a fair test.',
        explanation: 'A link isn\'t a measured effect.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many clinics are in head office\'s spreadsheet?',
        answers: ['300', 'three hundred'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 10 done: you tested the "fancier" models honestly. What did losing teach you?',
    starters: ['I learned...'],
  },
  notes: 'Chapter 10 challenge. v0.9 strongest predictor previous_no_shows (0.607); RF importance top previous_no_shows. clinic_visits.csv: 300 clinics (patients_per_week, avg_wait_days, sms_rate, avg_distance_km, no_show_rate). Cliffhanger: kinds of clinics, no labels -> Chapter 11 clustering.',
};

export default lesson;
