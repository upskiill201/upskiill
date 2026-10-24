import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT, TREE_BASE } from './code';

/** Chapter 6 · Lesson 13 — Which is easier to explain? */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Which is easier to explain?',
  summary: 'Mrs Okonkwo at Yaba asks: "Why is this patient on my call list?" With logistic regression Halima can answer in one sentence. With a 93-leaf tree, she can\'t. Tey talks through what "explainable" really means.',
  minutes: 12,
  outcomes: [
    'Explain a single prediction in plain words',
    'Compare how explainable different models are',
    'Decide when explainability matters most',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Mrs Okonkwo wants to know why A12323 is first on the list. With logistic regression, you can just look at the clues. Want to try?', replies: ['Go on.'] },
        { tey: 'A12323: 4 past misses (the strongest push up), no reminder (no push down), 15 km. In one sentence: "She has missed four times before and didn\'t get a text."', replies: ['And with the deep tree?'] },
        { tey: 'Her booking falls through up to eight questions into one of 93 leaves. You could print the path, but each patient has a different one. Explaining the whole tree is hopeless; explaining one prediction is possible but clumsy.', replies: ['And the depth-2 tree?'] },
        { tey: 'Easiest of all: "3 or more past misses and over 8.5 km". But it ranks less finely, as you saw.', replies: ['So explainability costs accuracy?'] },
        { tey: 'Sometimes. Here the cost is small: on validation, 28 vs 24 of the top 40. When a nurse has to act on a list, or a patient asks why, being able to explain can be worth more than a few extra catches.', replies: ['Is this a real rule?'] },
        { tey: 'In health, many organisations expect decisions about people to be explainable. Chapter 12 comes back to this. For now: it\'s a legitimate thing to put in your decision rule.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Why is she first?',
      caption: 'The riskiest booking and the clues behind it.',
      code: LR_FIT + '\nt = test.assign(p=model.predict_proba(test[feats])[:, 1])\ntop = t.nlargest(1, "p")\nprint(top[["appointment_id", "clinic"] + feats + ["p"]].round(3).to_string(index=False))\nfor name, c in zip(feats, model.coef_[0]):\n    print(name, "pushes", "up" if c > 0 else "down")\n',
      challenge: 'Write the one-sentence reason for Mrs Okonkwo.',
    },
  ],
  apply: {
    scenario: 'Explaining a prediction.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the appointment_id of the riskiest week-12 booking',
        starter: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n',
        solution: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\nprint(t.nlargest(1, "p")["appointment_id"].iloc[0])\n',
        hint: 't.nlargest(1, "p")["appointment_id"].iloc[0]',
        checks: [{ message: 'Print A12323', outputEquals: 'A12323' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which model is easiest to explain for one patient?',
        options: [
          { text: 'The 93-leaf tree', why: 'Each patient takes a different long path.' },
          { text: 'None can be explained', why: 'Simple models can be explained clearly.' },
          { text: 'The depth-2 tree or logistic regression: a sentence each' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many past no-shows the riskiest booking has',
        starter: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\ntop = t.nlargest(1, "p")\n',
        solution: LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\ntop = t.nlargest(1, "p")\nprint(top["previous_no_shows"].iloc[0])\n',
        hint: 'top["previous_no_shows"].iloc[0]',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to explain, or hard?',
        groups: ['Easy', 'Hard'],
        items: [
          { text: 'Four coefficients', group: 0 },
          { text: '93 leaves', group: 1 },
          { text: 'Two yes/no questions', group: 0 },
          { text: 'Hundreds of trees voting', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why do we care if it\'s explainable? It catches more.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Nurses act on this list and patients may ask why they were called. If we can\'t say why, they won\'t trust it, and the extra catches don\'t happen.' },
          { text: 'We don\'t.', why: 'People acting on it need reasons.' },
          { text: 'Explainable models are always better.', why: 'Not always. It\'s a trade-off to weigh.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to how you\'d explain it.',
        pairs: [
          ['Logistic regression', 'Which clues push up or down'],
          ['Depth-2 tree', 'Two questions'],
          ['Depth-8 tree', 'A long path through 93 leaves'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trade-off.',
        template: 'Sometimes being able to [[1]] a model is worth more than a few extra [[2]].',
        blanks: [['explain'], ['catches']],
        distractors: ['hide', 'leaves'],
      },
      {
        kind: 'findBug',
        prompt: 'Which explanation to Mrs Okonkwo is unhelpful?',
        lines: ['She has missed four times before.', 'She didn\'t get a reminder text.', 'Her logit is 1.01.'],
        bug: 2,
        fix: 'Leave the maths out; give reasons a nurse can act on.',
        explanation: 'Reasons should be in the clinic\'s language, not the model\'s.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which clinic is the riskiest week-12 booking at?',
        answers: ['Gumel', 'gumel'],
        placeholder: 'A clinic',
      },
      {
        kind: 'mcq',
        prompt: 'Applying Miracle\'s rule ("best validation score, unless managers can\'t understand it"), which model wins?',
        options: [
          { text: 'The depth-8 tree', why: 'It fails the agreed "unless".' },
          { text: 'The depth-2 tree', why: 'Its validation score is far lower (18).' },
          { text: 'Logistic regression: the 93-leaf tree fails the "understand it" part' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If a computer put you on a call list, what explanation would you want to hear?',
    starters: ['I\'d want to know...'],
  },
  deepen: {
    title: 'Explaining complex models',
    summary: 'There are tools that explain individual predictions of complex models, by showing which features pushed the result most. Chapter 12 introduces the idea. They help, but a simple model you can read directly is still the clearest explanation.',
  },
  notes: 'Riskiest week-12 booking by LR: A12323 (Gumel, wait 7, 15 km, 4 previous no-shows, no sms; p = 0.733; missed). Validation top 40: LR 24, depth-8 tree 28 (93 leaves). Decision rule from lesson 12 -> LR for v0.6.',
};

export default lesson;
