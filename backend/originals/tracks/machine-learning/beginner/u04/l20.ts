import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, KNN, LOAD } from './code';

const PILES = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n';

/** Chapter 4 · Lesson 20 — Chapter Challenge: Chidi's rain idea. Cliffhanger: Folake's easier question. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Predictor v0.4',
  summary: 'Chidi has a new idea: add rain. It nudges the validation score up. Is it a better feature or a small leak? Use the whole chapter to decide. Then Folake brings a different question to the next meeting.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Test a new feature with an honest process', 'Decide whether a feature is fair to use'],
  learn: [
    {
      kind: 'story',
      title: 'Chidi\'s rain',
      beats: [
        { speaker: 'chidi', text: 'Rain! Patients miss more when it rains. I added it: validation goes from 24 to 25 of 40. Honest process, no peeking.' },
        { speaker: 'halima', text: 'Good process. One question first: when does the clinic know it rained?' },
        { speaker: 'chidi', text: '...On the day.' },
        { speaker: 'halima', text: 'And Bisi calls the evening before. The forecast would be fair. The real rain is a small leak.' },
        { speaker: 'narrator', text: 'At the next meeting, Folake doesn\'t mention no-shows at all. "Before we predict who misses, I need something simpler for the board: how many patients will each clinic get next week? Yaba had 32 this week. What about next?"' },
        { speaker: 'tey', text: 'That\'s Chapter 4: memorising vs learning, train and test sets, peeking, leaks, splitting by time, duplicates, validation, seeds and honest reports. Folake\'s question needs a number, not a yes or no. That\'s Chapter 5, and scikit-learn. First, Chidi\'s rain.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 4 challenge: Chidi adds rain to v0.4. Decide, with an honest process, whether it stays.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add "rain" to the features and print the top-40 validation score for k = 15',
        starter: LOAD + FEATS + KNN + PILES + 'with_rain = feats + ["rain"]\n',
        solution: LOAD + FEATS + KNN + PILES + 'with_rain = feats + ["rain"]\nv = val.assign(risk=knn_risk(train, val, with_rain, 15))\nprint(v.nlargest(40, "risk")["no_show"].sum())\n',
        hint: 'knn_risk(train, val, with_rain, 15), then the top 40',
        checks: [{ message: 'Print 25', outputEquals: '25' }],
      },
      {
        kind: 'mcq',
        prompt: 'Rain lifts validation from 24 to 25 of 40. Is it fair to use?',
        options: [
          { text: 'Not the actual rain: it\'s only known on the day. A forecast from the evening before would be fair' },
          { text: 'Yes: the process was honest', why: 'An honest process can still use a column from the future.' },
          { text: 'No: rain doesn\'t matter', why: 'It does (21.5% vs 17.2%). The problem is timing.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair feature for Bisi\'s calls, or not?',
        groups: ['Fair', 'Not fair'],
        items: [
          { text: 'Tomorrow\'s rain forecast', group: 0 },
          { text: 'Tomorrow\'s actual rain', group: 1 },
          { text: 'previous_no_shows', group: 0 },
          { text: 'confirmed_on_day', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run the leak check on rain: print the gap between its highest and lowest no-show rate, rounded to 3 places',
        starter: LOAD,
        solution: LOAD + 'rates = df.groupby("rain")["no_show"].mean()\nprint(round(rates.max() - rates.min(), 3))\n',
        hint: 'df.groupby("rain")["no_show"].mean(), then max minus min',
        checks: [{ message: 'Print 0.043', outputEquals: '0.043' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'The leak check says rain\'s gap is tiny. So it can\'t be a leak!',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Right, use it.', why: 'A small gap doesn\'t make a future column fair.' },
          { text: 'Rain is worse than confirmed_on_day.', why: 'Far smaller. It\'s still the same kind of problem.' },
          { text: 'The check catches loud leaks. Quiet ones need the timing question: we don\'t know the real rain the evening before.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the three piles from appointments.csv and print the number of no-shows in the validation weeks',
        starter: LOAD,
        solution: LOAD + PILES + 'print(val["no_show"].sum())\n',
        hint: 'val = df[df["week"].isin([10, 11])], then val["no_show"].sum()',
        checks: [{ message: 'Print 86', outputEquals: '86' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 4 idea to Chidi\'s rain.',
        pairs: [
          ['Validation set', 'Where 24 became 25'],
          ['The timing question', 'Rain is known on the day'],
          ['Leak check', 'Gap of 0.043'],
          ['A fair version', 'The forecast'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The decision.',
        template: 'Use the rain [[1]] from the evening before, not the [[2]] rain.',
        blanks: [['forecast'], ['actual', 'real']],
        distractors: ['average', 'predicted'],
      },
      {
        kind: 'findBug',
        prompt: 'Chidi\'s write-up. Which line is the mistake?',
        lines: ['Process: weeks 1-9 to learn, 10-11 to choose.', 'Rain lifts validation from 24 to 25.', 'So rain is safe: the process was honest.'],
        bug: 2,
        fix: 'Rain is only fair as a forecast: the real rain isn\'t known the evening before.',
        explanation: 'An honest process doesn\'t make a future column fair.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to judge any new feature.',
        lines: ['Ask when it\'s known', 'Run the leak check', 'Compare on validation', 'Test once, if it\'s fair'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Folake\'s new question: Yaba had how many bookings in week 12?',
        answers: ['32', 'thirty-two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '"How many patients will Yaba get next week?" What kind of answer is that?',
        options: [
          { text: 'A yes or no', why: 'It\'s a count: 28, 32, 35...' },
          { text: 'A number, not a yes or no' },
          { text: 'A group', why: 'It\'s a single number to predict.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Chidi\'s idea was good and his process was honest, and the feature still wasn\'t fair. What does that teach you about checking your own good ideas?',
    starters: ['It teaches me...', 'Next time I\'ll...'],
  },
  notes: 'Chapter 4 challenge. Validation (train weeks 1-9, val 10-11), k = 15, top 40: 4 features 24; + rain 25; + confirmed_on_day 39. Test week 12 top 20: + rain 12 (accuracy 0.835). Rain gap 0.043 (0.215 vs 0.172). Validation no-shows 86. Yaba week 12: 32 bookings (weeks 10, 11: 38, 31). Cliffhanger: Folake asks for next week\'s bookings per clinic -> Chapter 5 regression with scikit-learn.',
};

export default lesson;
