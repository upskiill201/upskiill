import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Step-by-step: disagreeing upward. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Disagreeing upward',
  summary: 'Carmen wants to launch mango-chili in October too. Lucía thinks it\'s too soon. Disagreeing with your boss in front of the CEO is risky. Saying nothing is riskier.',
  minutes: 12,
  outcomes: [
    'Disagree with someone senior respectfully',
    'Lead with the shared goal',
    'Offer an alternative, not just an objection',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to disagree upward',
      steps: [
        { title: '1. Ask first, if you can', body: 'Before the meeting: "Can I raise a concern about October?" No one likes a surprise in front of the CEO.' },
        { title: '2. Start with the shared goal', body: '"We both want mango-chili to do as well as chili-lime."' },
        { title: '3. Give your concern with one fact', body: '"The plant is at 85%. Two launches in October would push it past capacity."' },
        { title: '4. Offer an alternative', body: '"Launch it in spring, when the Monterrey rollout is settled."' },
        { title: '5. Accept the decision', body: '"It\'s your call. If it\'s October, here\'s what we\'d need." Disagree, then commit.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Disagree upward: ask first, shared goal, one fact, an alternative, then accept the call.',
    },
  ],
  apply: {
    scenario: 'Disagreeing with Carmen.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Ask first', 'Shared goal', 'Concern with one fact', 'An alternative', 'Accept the decision'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask before the meeting if you can?',
        options: [
          { text: 'To avoid ever disagreeing', why: 'It\'s to avoid surprises.' },
          { text: 'It doesn\'t matter', why: 'Surprises put people on the defensive.' },
          { text: 'No one likes a surprise in front of the CEO' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the disagreement, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: '"We both want mango-chili to succeed."', group: 0 },
          { text: '"That\'s a terrible idea."', group: 1 },
          { text: '"The plant is at 85%."', group: 0 },
          { text: 'Sulking after the decision', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s line.',
        pairs: [
          ['Shared goal', '"We both want it to do well."'],
          ['One fact', '"The plant is at 85%."'],
          ['Alternative', '"Launch it in spring."'],
          ['Accept', '"It\'s your call."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if Carmen still says October?',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Keep arguing until she changes her mind.', why: 'Disagree, then commit.' },
          { text: 'Then you commit and make it work. You said your piece clearly; that\'s your job done. Now help it succeed.' },
          { text: 'Quietly do spring anyway.', why: 'Commit to the decision.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]], then commit. Offer an [[2]], not just an objection.',
        blanks: [['Disagree'], ['alternative']],
        distractors: ['Agree', 'apology'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which season does Lucía suggest for mango-chili?',
        answers: ['spring', 'Spring'],
        placeholder: 'A season',
      },
      {
        kind: 'mcq',
        prompt: 'Why open with the shared goal?',
        options: [
          { text: 'To flatter her', why: 'It shows you\'re aligned.' },
          { text: 'To delay the concern', why: 'It frames it.' },
          { text: 'It shows you\'re on the same side' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the five steps?',
        lines: [
          '"We both want mango-chili to do well."',
          '"The plant is at 85%."',
          '"Honestly, you always rush launches."',
          '"Spring would give it a better chance."',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It\'s about Carmen, not the launch.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Concern or alternative?',
        groups: ['Concern', 'Alternative'],
        items: [
          { text: '"Two launches would push the plant past capacity."', group: 0 },
          { text: '"Launch it in spring."', group: 1 },
          { text: '"The team is on Monterrey until December."', group: 0 },
          { text: '"Run a small test in one city first."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you disagree with at work but haven\'t said. Write the five steps for it.',
    starters: ['Shared goal:...', 'Alternative:...'],
  },
  deepen: {
    title: 'Disagree and commit',
    summary: 'Many companies use the phrase "disagree and commit": argue your case clearly before the decision, then back it fully after. It keeps both honesty and speed.',
  },
  notes: '"Disagree and commit": widely used management phrase (associated with Intel and Amazon). Steps: practical framework.',
};

export default lesson;
