import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 9 (Pressure) — Rule 27 when progress is slow: specific beats sweet. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `Specific Beats Sweet`,
  summary: `A psychologist compared praise to sunlight: we can't grow without it. Yet most of us find it far easier to give the cold wind of criticism. How do you keep praising when progress is painfully slow?`,
  minutes: 12,
  outcomes: [
    `Keep praising when progress is slow`,
    `Make praise specific, earned and repeated`,
    `Help people discover powers they didn't know they had`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `Praise only matters for big achievements.`,
          isFact: false,
          explain: `The rule is to praise the slightest improvement, and every improvement. Small praise for small steps keeps people moving.`,
        },
        {
          text: `Most of us are quicker to criticise than to praise.`,
          isFact: true,
          explain: `The psychologist Jess Lair wrote that praise is like sunlight to the human spirit, yet most of us are ready to apply the cold wind of criticism and slow to give the warm sunshine of praise.`,
        },
        {
          text: `Praise works even if it's insincere, as long as it's frequent.`,
          isFact: false,
          explain: `Carnegie repeats it: these principles only work when they come from the heart. Nobody wants flattery.`,
        },
      ],
    },
    {
      kind: `reading`,
      title: `Half awake`,
      html:
        `<p>William James, the great psychologist, said that compared with what we ought to be, we are only half awake. We use only a small part of our physical and mental powers. We live far within our limits, with powers we habitually fail to use.</p>` +
        `<p>One of those unused powers, Carnegie says, is your ability to praise people and inspire them to see their hidden potential. If we help the people around us realise the treasures they have, we can do far more than change them. We can transform them.</p>` +
        `<p>Abilities wither under criticism. They blossom under encouragement.</p>` +
        `<p>When progress is slow, look closer. Find the smallest real gain and name it precisely. Specific, earned praise, given again and again, beats sweet, general praise every time.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Abilities wither under criticism and blossom under encouragement. When progress is slow, look closer for the smallest real gain, and name it.`,
    },
  ],
  apply: {
    scenario: `Rule 27, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Jess Lair compare praise to?`,
        options: [
          { text: `Sunlight` },
          { text: `Money`, why: `He compared it to sunlight.` },
          { text: `Medicine`, why: `Sunlight for the human spirit.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Carnegie's line.`,
        template: `Abilities [[1]] under criticism. They [[2]] under encouragement.`,
        blanks: [[`wither`], [`blossom`]],
        distractors: [`grow`, `fade`],
      },
      {
        kind: `typeAnswer`,
        prompt: `William James said that compared with what we ought to be, we are only half ________. (one word)`,
        answers: [`awake`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Slow progress: helpful praise or not?`,
        groups: [`Helpful`, `Not helpful`],
        items: [
          { text: `"You got three more questions right than last week."`, group: 0 },
          { text: `"You're a genius!" after a small step`, group: 1 },
          { text: `"Your opening line is much stronger now."`, group: 0 },
          { text: `Waiting until it's perfect to say anything`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `When progress is slow, what does this lesson suggest?`,
        options: [
          { text: `Look closer for the smallest real gain and name it precisely` },
          { text: `Praise less so it means more`, why: `Praise every improvement.` },
          { text: `Switch to criticism to speed things up`, why: `Abilities wither under criticism.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Encouraging a friend learning a language slowly. Which line is the cold wind?`,
        lines: [
          `Your pronunciation of that tricky word was spot on.`,
          `You ordered the whole meal without English. Huge.`,
          `At this rate you'll be fluent in about twenty years.`,
        ],
        bug: 2,
        fix: `You're noticeably more confident than last month.`,
        explanation: `A joke at their pace is criticism in disguise. It withers exactly what you're trying to grow.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each thinker to the idea.`,
        pairs: [
          [`Jess Lair`, `Praise is sunlight to the spirit`],
          [`William James`, `We are only half awake`],
          [`Pete Barlow`, `Reward the slightest improvement`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 8): what should replace "but" after praise?`,
        options: [
          { text: `"And"` },
          { text: `"However"`, why: `That's just a longer "but".` },
          { text: `"Although"`, why: `Still cancels the praise.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build specific praise for slow progress.`,
        tiles: [`Your`, `second`, `draft`, `is`, `much`, `clearer.`],
        distractors: [`perfect.`],
      },
      {
        kind: `mcq`,
        prompt: `You're coaching a team member who keeps struggling with presentations. Their latest was still shaky, but they made eye contact for the first time. What do you say first?`,
        options: [
          { text: `"Still very nervous. Let's work on that."`, why: `The cold wind, on the day they improved.` },
          { text: `"You made real eye contact with the room today. That's a big step."` },
          { text: `"Great presentation!"`, why: `General, and they know it wasn't great.` },
        ],
        answer: 1,
        explanation: `Find the smallest real gain and name it. That's what keeps them trying.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: notice and praise three separate improvements this week, however small. Who, what, and how did each person react?`,
    starters: [`1) ... improved at...`, `2) ...`, `3) ...`],
  },
  deepen: {
    title: `Hidden treasures`,
    summary: `Carnegie says you can do more than change people: you can transform them, by helping them see the treasures they have. Whose hidden ability could you point out this week?`,
  },
  notes: `Source: Carnegie, Part Four ch. 6: Jess Lair's I Ain't Much, Baby, But I'm All I Got (praise is like sunlight), William James ("only half awake"), "abilities wither under criticism; they blossom under encouragement", sincerity requirement. Retold in our own words.`,
};

export default lesson;
