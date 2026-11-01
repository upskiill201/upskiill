import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD, SETUP } from './code';

/** Chapter 4 · Lesson 5 — Checkpoint 1: memorising, train/test, random splits, peeking. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: a fair test',
  summary: 'Miracle writes four words on the whiteboard: "Test once. Test new." Check you can split a table, score a predictor on the right bookings, and spot when a score is too hopeful.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Split data and score a predictor on unseen bookings', 'Spot memorising and peeking'],
  learn: [
    {
      kind: 'story',
      title: 'Four words',
      beats: [
        { speaker: 'miracle', text: '"Test once. Test new." If a score breaks either rule, it doesn\'t go on a slide.' },
        { speaker: 'halima', text: 'So Emmanuel\'s table breaks "new", and Chidi\'s five tries break "once".' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: a fair test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Split at random with frac=0.8 and random_state=42. Print the length of the test set',
        starter: LOAD,
        solution: LOAD + 'train = df.sample(frac=0.8, random_state=42)\ntest = df.drop(train.index)\nprint(len(test))\n',
        hint: 'df.sample(frac=0.8, random_state=42), then df.drop(train.index)',
        checks: [{ message: 'Print 480', outputEquals: '480' }],
      },
      {
        kind: 'mcq',
        prompt: 'A predictor scores 99% on its training bookings and 73% on week 12. Which number describes it?',
        options: [
          { text: '99%', why: 'That\'s memory, not prediction.' },
          { text: '73%, the score on bookings it has never seen' },
          { text: '86%, the average', why: 'Averaging in a memory score doesn\'t make it honest.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which rule does it break?',
        groups: ['Breaks "test new"', 'Breaks "test once"'],
        items: [
          { text: 'Scoring on training bookings', group: 0 },
          { text: 'Choosing k by the week-12 score', group: 1 },
          { text: 'A lookup table judged on what it memorised', group: 0 },
          { text: 'Rerunning until the test score looks good', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A fair random split.',
        language: 'python',
        template: 'train = df.sample(frac=0.9, [[1]]=42)\ntest = df.drop(train.[[2]])',
        blanks: [['random_state'], ['index']],
        distractors: ['seed', 'rows'],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'My table is 93% right on the past. Why won\'t you use it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Because 84 of the 200 new bookings aren\'t in it at all. We need something that can answer bookings it has never seen.' },
          { text: 'Tables are always wrong.', why: 'It\'s right on what it remembers. That\'s the problem: only on what it remembers.' },
          { text: 'Make it bigger.', why: 'A bigger memory is still stuck on new bookings.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Score v0.3 (k = 15) on week 12 and print the share it gets right',
        starter: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\n',
        solution: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\nprint(((t["risk"] > 0.5).astype(int) == t["no_show"]).mean())\n',
        hint: '((t["risk"] > 0.5).astype(int) == t["no_show"]).mean()',
        checks: [{ message: 'Print 0.825', outputEquals: '0.825' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['Training set', 'What the predictor learns from'],
          ['Test set', 'Locked away until the end'],
          ['random_state', 'The same split every run'],
          ['Peeking', 'Choosing by the test score'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes this a memory test?',
        language: 'python',
        lines: ['train = df[df["week"] <= 11]', 'test = df[df["week"] == 12]', 'risks = knn_risk(train, train.head(200), feats)'],
        bug: 2,
        fix: 'risks = knn_risk(train, test, feats)',
        explanation: 'It scores bookings from the training set.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'v0.3 is right on 82.5% of week 12. "Everyone comes" is right on 81.5%. By how many percentage points does v0.3 win?',
        answers: ['1', '1%', '1.0'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: why did the call list use the top 20 by risk instead of the 0.5 vote?',
        options: [
          { text: 'The vote is illegal', why: 'It\'s fine, just less useful for her job.' },
          { text: 'Bisi can make about 20 calls, so she needs the riskiest first' },
          { text: 'Risks can\'t be compared', why: 'They can: that\'s how the list is sorted.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a fair test.',
        lines: ['Split into training and test sets', 'Learn from the training set only', 'Choose settings without the test set', 'Score on the test set once'],
      },
    ],
  },
  reflect: {
    prompt: 'Write Miracle\'s four words in your own words. Which rule do you think beginners break most?',
    starters: ['Test once means...', 'Test new means...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. frac=0.8 random_state=42: 1,920 train, 480 test. v0.3 week 12 accuracy 0.825 (165/200) vs 0.815 baseline.',
};

export default lesson;
