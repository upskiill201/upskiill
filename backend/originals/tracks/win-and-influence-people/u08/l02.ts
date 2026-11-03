import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 2 (Practice) — Rule 22 in writing and business: Lincoln's letter to Hooker. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Lincoln's Letter to Hooker`,
  summary: `In the darkest months of the war, Lincoln had to put a brave but reckless general in charge of the army, and tell him exactly what was wrong with him. It's the sharpest letter he sent as President, and it starts with praise.`,
  minutes: 11,
  outcomes: [
    `Structure written feedback: praise, concern, confidence`,
    `Name serious faults without calling them faults`,
    `Use praise to win cooperation before business`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `April 1863`,
      html:
        `<p>For eighteen months, Lincoln's generals had led the Union army from one defeat to another. Soldiers were deserting by the thousand. Even members of his own party wanted him out. Lincoln said it seemed even the Almighty was against them.</p>` +
        `<p>He gave command of the army to General Joseph Hooker, a brave man who had also undermined his previous commander and talked about the country needing a dictator. Lincoln wrote to him. Notice the order:</p>` +
        `<p>He began by saying there were "some things" he was "not quite satisfied" with. Talk about tact! Then: I believe you to be a brave and skilful soldier, which of course I like. You don't mix politics with your profession, in which you are right. You have confidence in yourself, a valuable quality. You are ambitious, which within reason does more good than harm.</p>` +
        `<p>Only then did he raise the grave faults: that Hooker had thwarted his previous commander out of ambition, a great wrong; that he'd talked of dictators. He ended with confidence and a warning: beware of rashness, but go forward with energy and give us victories.</p>`,
    },
    {
      kind: `compare`,
      title: `The bronze supplier`,
      before: {
        label: `Hammer and dynamite`,
        text: `A building in Philadelphia was nearly finished when the firm making its bronze fittings said it couldn't deliver on time. Heavy penalties loomed. Phone calls, arguments, heated conversations: all useless.`,
      },
      after: {
        label: `Praise first`,
        text: `W. P. Gaw went to see the supplier's president in person. He mentioned that the man was the only person in the Brooklyn phone book with his name. The man was delighted and talked about his family's history. Gaw praised his factory as one of the cleanest he'd seen, admired machines the man had invented himself, and was taken to lunch. Business wasn't mentioned once. After lunch the president said: "I know why you're here. Your material will be made and shipped, even if other orders wait."`,
      },
      notes: [
        `Gaw got everything he wanted without asking for it.`,
        `The building was finished on the day the contract required.`,
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `For written feedback, try Lincoln's order: honest praise, then the concern (gently named), then your confidence in them.`,
    },
  ],
  apply: {
    scenario: `Rule 22 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Lincoln open the subject of Hooker's faults?`,
        options: [
          { text: `"Some things in regard to which I am not quite satisfied with you."` },
          { text: `"You have failed the country."`, why: `Lincoln was far more tactful.` },
          { text: `He never mentioned them`, why: `He did, after the praise.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `The order of Lincoln's letter.`,
        lines: [`Gently say there are some concerns`, `Praise his real strengths`, `Name the serious faults`, `End with confidence and a warning`],
      },
      {
        kind: `sortGroups`,
        prompt: `Which of Hooker's qualities did Lincoln praise, and which did he warn about?`,
        groups: [`Praised`, `Warned about`],
        items: [
          { text: `Brave and skilful`, group: 0 },
          { text: `Rashness`, group: 1 },
          { text: `Confidence in himself`, group: 0 },
          { text: `Thwarting his previous commander`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Gaw's opener: the supplier was the only person in the Brooklyn ________ book with his name. (one word)`,
        answers: [`phone`, `telephone`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `What did the bronze supplier promise after lunch?`,
        options: [
          { text: `To ship on time even if other orders had to wait` },
          { text: `A discount`, why: `He promised the delivery.` },
          { text: `To think about it`, why: `He promised outright.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Lincoln's closing words to Hooker.`,
        template: `Beware of [[1]], but with energy go forward and give us [[2]].`,
        blanks: [[`rashness`], [`victories`]],
        distractors: [`delay`, `excuses`],
      },
      {
        kind: `findBug`,
        prompt: `A performance note to a team member. Which line breaks Lincoln's order?`,
        lines: [
          `Your client relationships are the strongest on the team.`,
          `There's one area I'm not quite satisfied with: deadlines.`,
          `Frankly, you're unreliable and everyone knows it.`,
        ],
        bug: 2,
        fix: `I'm confident you can get these back on track.`,
        explanation: `It turns a named concern into a verdict on the person. Lincoln ended with confidence, not condemnation.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their approach.`,
        pairs: [
          [`Lincoln`, `Praise before grave faults`],
          [`W. P. Gaw`, `Admired the factory before business`],
          [`McKinley`, `Splendid speech, wrong occasion`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did James Adamson admire in George Eastman's office?`,
        options: [
          { text: `The English oak panels` },
          { text: `The view`, why: `It was the woodwork.` },
          { text: `The furniture prices`, why: `It was the oak panelling.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `A supplier keeps delivering late and you need it fixed. Which approach follows this lesson?`,
        options: [
          { text: `Send a list of every late delivery`, why: `Hammer and dynamite. They'll defend.` },
          { text: `Visit, genuinely praise what they do well, and let the delivery issue come up once there's goodwill` },
          { text: `Threaten to switch suppliers`, why: `A threat makes them defend, not deliver.` },
        ],
        answer: 1,
        explanation: `Gaw got his bronze on time without even asking, because he began with honest praise.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: write one piece of feedback this week in Lincoln's order: praise, then the concern, then confidence. Who was it for, and how did they respond?`,
    starters: [`I wrote to...`, `My praise was...`, `My concern was...`],
  },
  deepen: {
    title: `Twelve thousand dollars`,
    summary: `Lincoln's letter to Hooker sold at auction in 1926 for twelve thousand dollars, more than Lincoln saved in half a century of work. Tact, it turns out, is valuable.`,
  },
  notes: `Source: Carnegie, Part Four ch. 1: Lincoln's letter to Gen. Joseph Hooker, 26 April 1863 (context, "some things in regard to which I am not quite satisfied", praise of bravery/skill/confidence/ambition, faults, "beware of rashness... give us victories", sold for $12,000 in 1926); W. P. Gaw of the Wark Company and the bronze subcontractor. Retold in our own words; only short phrases from the letter quoted.`,
};

export default lesson;
