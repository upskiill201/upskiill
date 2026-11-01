import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SETUP } from './code';

/** Chapter 4 · Lesson 14 — Reporting a score honestly. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Reporting a score honestly',
  summary: 'A number on a slide gets repeated, quoted and remembered. Before Halima writes one down, she checks four things: compared to what, tested on what, how sure, and what it means for a person.',
  minutes: 12,
  outcomes: [
    'Report a score next to a baseline',
    'Say what it was tested on and how sure you are',
    'Turn a score into what it means for the clinic',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Four questions before any number',
      html: '<p>"82.5% accurate" sounds good. On its own, it\'s almost meaningless. Halima checks four things before a number goes on a slide.</p><p><strong>1. Compared to what?</strong> Always show a baseline. "Everyone comes" is right 81.5% of the time on week 12. So 82.5% is only 1 point better. That\'s the honest headline.</p><p><strong>2. Tested on what?</strong> Say which bookings: "week 12, 200 bookings the predictor never saw, with the leak removed and settings chosen on weeks 10 and 11".</p><p><strong>3. How sure?</strong> One small test set is partly luck. On random splits the same predictor\'s top 20 ranged from 6 to 13 no-shows. Say so.</p><p><strong>4. What does it mean for a person?</strong> Accuracy hides the useful part. The predictor flags 16 bookings as "will miss", and 9 of them do. Its top 20 catches 12 no-shows, where 20 random calls would reach about 4. That\'s what Bisi\'s evening looks like.</p><p>Put together: <em>"On a week it had never seen, v0.4\'s 20 riskiest bookings included 12 of the 37 no-shows, about three times as many as random calls. Overall accuracy is barely above guessing, because most patients come anyway."</em></p>',
    },
    {
      kind: 'check',
      question: 'Which is the most honest report?',
      options: ['82.5% accurate', '97.5% accurate', '82.5% vs 81.5% for "everyone comes", on an unseen week'],
      answer: 2,
      explanation: 'A number with its baseline and its test set.',
    },
    {
      kind: 'tryIt',
      title: 'The numbers behind the sentence',
      caption: 'Baseline, accuracy, and the call list.',
      code: SETUP + '\nt = test.assign(risk=knn_risk(train, test, feats))\nprint("Everyone comes:", round(1 - t["no_show"].mean(), 3))\nprint("v0.4 accuracy:", ((t["risk"] > 0.5).astype(int) == t["no_show"]).mean())\nflagged = t[t["risk"] > 0.5]\nprint("Flagged:", len(flagged), "of whom missed:", flagged["no_show"].sum())\nprint("Top 20 caught:", t.nlargest(20, "risk")["no_show"].sum(), "of", t["no_show"].sum())\n',
      challenge: 'Write the one-sentence report in your own words.',
    },
  ],
  apply: {
    scenario: 'An honest slide.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the "everyone comes" baseline for week 12, rounded to 3 places',
        starter: SETUP,
        solution: SETUP + 'print(round(1 - test["no_show"].mean(), 3))\n',
        hint: '1 - test["no_show"].mean(), rounded',
        checks: [{ message: 'Print 0.815', outputEquals: '0.815' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Halima\'s four questions.',
        lines: ['Compared to what?', 'Tested on what?', 'How sure?', 'What does it mean for a person?'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 bookings the predictor flags (risk above 0.5)',
        starter: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\n',
        solution: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\nprint(len(t[t["risk"] > 0.5]))\n',
        hint: 'len(t[t["risk"] > 0.5])',
        checks: [{ message: 'Print 16', outputEquals: '16' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does 82.5% accuracy sound better than it is?',
        options: [
          { text: 'Guessing "everyone comes" already gets 81.5%' },
          { text: '82.5% is low', why: 'It sounds high. The baseline shows it\'s barely better than guessing.' },
          { text: 'It\'s from the training set', why: 'It\'s from week 12. The problem is the missing baseline.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the report, or not?',
        groups: ['In the report', 'Leave out'],
        items: [
          { text: 'The baseline', group: 0 },
          { text: 'The training score', group: 1 },
          { text: 'What it was tested on', group: 0 },
          { text: 'The leaky 97.5%', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Just say 82.5%. Nobody will ask about baselines.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Fine, 82.5% it is.', why: 'Without the baseline it misleads.' },
          { text: 'Let\'s say 90% to be safe.', why: 'Never round up a score.' },
          { text: 'Someone will, and then we look like we hid it. Better: "12 of the 37 no-shows in the 20 calls Bisi makes, three times random." That\'s the real win.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to its answer for v0.4.',
        pairs: [
          ['Compared to what?', '"Everyone comes": 81.5%'],
          ['Tested on what?', 'Week 12, never seen'],
          ['How sure?', 'Random splits: 6 to 13 of 20'],
          ['What does it mean?', '12 of 37 no-shows in 20 calls'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Never report a score without its [[1]] and its [[2]] set.',
        blanks: [['baseline'], ['test']],
        distractors: ['training', 'best'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The predictor flags 16 bookings and 9 of them miss. How many flagged bookings came after all?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which sentence would Bisi find most useful?',
        options: [
          { text: '"The model is 82.5% accurate."', why: 'True, but it doesn\'t tell her what her evening looks like.' },
          { text: '"Your 20 calls will reach about 12 people who\'d miss, instead of about 4."' },
          { text: '"k = 15 with min-max scaling."', why: 'Accurate, but it\'s for Miracle, not Bisi.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Find a number in a news story or advert. Does it say what it\'s compared to?',
    starters: ['The number was...', 'It is / isn\'t compared to...'],
  },
  deepen: {
    title: 'Chapter 7 goes deeper',
    summary: 'Flagged, caught, missed: these have proper names (precision and recall) and a neat table (the confusion matrix). Chapter 7 is all about choosing the right number for the job.',
  },
  notes: 'Week 12, v0.4 (k = 15, 4 features, trained on weeks 1-11): baseline 0.815; accuracy 0.825; flags 16 (risk > 0.5), 9 missed; top 20 catches 12 of 37; random 20 expected 3.7. Random-split range (frac 0.9, five seeds): 6 to 13.',
};

export default lesson;
