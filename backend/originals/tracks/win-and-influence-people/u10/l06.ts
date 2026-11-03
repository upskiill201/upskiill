import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 6 (Pressure) — Rule 29 when progress is slow or someone's given up. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Make It Look Easy`,
  summary: `A brilliant card player was so stubborn and argumentative that nobody wanted to play with him. Then he met a bridge teacher who saw something nobody else did, and told him so.`,
  minutes: 12,
  outcomes: [
    `Encourage someone who has failed repeatedly`,
    `Spot an undeveloped flair others miss`,
    `Keep encouragement honest when progress is slow`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Ely Culbertson`,
      html:
        `<p>Ely Culbertson's books on bridge sold over a million copies in a dozen languages. Yet he told Carnegie he'd never have made a career of it without one young woman's encouragement.</p>` +
        `<p>When he came to America in 1922, he tried to get a job teaching philosophy and failed. He tried selling coal and failed. He tried selling coffee and failed. He played some bridge, but he was a poor player, and very stubborn: he asked so many questions and held so many post-mortems after each hand that nobody wanted to play with him.</p>` +
        `<p>Then he met a pretty bridge teacher, Josephine Dillon, fell in love and married her. She noticed how carefully he analysed his cards, and persuaded him he was a potential genius at the card table.</p>` +
        `<p>It was that encouragement, and that alone, Culbertson said, that made him take up bridge as a profession.</p>` +
        `<p>Notice what Josephine did. The very habit that annoyed everyone, his endless analysing, was the flair she pointed to. She made his "fault" the seed of his gift.</p>`,
    },
    {
      kind: `compare`,
      title: `After the third failure`,
      before: {
        label: `What most people say`,
        text: `"Maybe this just isn't for you. You've tried three times."`,
      },
      after: {
        label: `What an encourager says`,
        text: `"Three tries, and each one got further. You clearly have a feel for this. What's the one thing that tripped you up this time? That's all we need to fix."`,
      },
      notes: [
        `The first makes the fault seem permanent. The second makes it seem small.`,
        `Both are honest. Only one makes them try again.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `After a failure, shrink the fault and name the flair. "Each try got further. What's the one thing to fix?"`,
    },
  ],
  apply: {
    scenario: `Rule 29, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What had Culbertson failed at before bridge?`,
        options: [
          { text: `Teaching philosophy, selling coal and selling coffee` },
          { text: `Playing football`, why: `Teaching, coal and coffee.` },
          { text: `Nothing`, why: `He'd failed three times.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What did Josephine Dillon notice about him?`,
        options: [
          { text: `How carefully he analysed his cards` },
          { text: `His luck`, why: `It was his careful analysis.` },
          { text: `His charm`, why: `She noticed his analysis.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Culbertson's words.`,
        template: `It was that [[1]] and that alone that made him take up [[2]] as a profession.`,
        blanks: [[`encouragement`], [`bridge`]],
        distractors: [`money`, `chess`],
      },
      {
        kind: `sortGroups`,
        prompt: `After a failure: shrinks the fault or makes it permanent?`,
        groups: [`Shrinks it`, `Makes it permanent`],
        items: [
          { text: `"You got further than last time."`, group: 0 },
          { text: `"Maybe it's just not for you."`, group: 1 },
          { text: `"One thing to fix and you're there."`, group: 0 },
          { text: `"Some people never get it."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `How many copies did Culbertson's bridge books sell? Over a ________. (one word)`,
        answers: [`million`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `A friend failed their driving test for the third time. Which line makes the fault permanent?`,
        lines: [
          `You were much calmer this time, I could see it.`,
          `Maybe you're just not a driver.`,
          `What was the one thing the examiner flagged?`,
        ],
        bug: 1,
        fix: `It's down to one thing now.`,
        explanation: `It turns a fixable fault into who they are. Shrink it instead.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each encourager to the flair they spotted.`,
        pairs: [
          [`Josephine Dillon`, `Culbertson's careful analysis`],
          [`Caruso's mother`, `A voice improving`],
          [`Ruth Hopkins`, `Tommy's leadership`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 9): what did Pete Barlow give a dog the moment it improved?`,
        options: [
          { text: `Praise, pats and meat` },
          { text: `A new trick`, why: `He rewarded it first.` },
          { text: `Nothing`, why: `He made a fuss.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the encourager's question after a failure.`,
        tiles: [`What's`, `the`, `one`, `thing`, `to`, `fix?`],
        distractors: [`everything`],
      },
      {
        kind: `mcq`,
        prompt: `A colleague's third pitch to investors was rejected and they want to give up. What would Josephine Dillon say?`,
        options: [
          { text: `"Maybe it's not the right idea."`, why: `That makes the fault permanent.` },
          { text: `"Your grasp of the numbers impressed every investor. What was the one question you couldn't answer? Let's nail that."` },
          { text: `"Just keep trying, you'll get there."`, why: `Kind but vague. Name the flair and the one fix.` },
        ],
        answer: 1,
        explanation: `Name the real flair, shrink the fault to one thing, and they'll try again.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: find someone who's failed at something recently. Name the flair you've honestly seen, and shrink the fault to one thing to fix. What happened?`,
    starters: [`... failed at...`, `The flair I named was...`, `The one thing to fix:...`],
  },
  deepen: {
    title: `The annoying habit`,
    summary: `Culbertson's annoying habit was his gift. Whose annoying habit could be the seed of a strength? Tell them, sincerely, this week.`,
  },
  notes: `Source: Carnegie, Part Four ch. 8: Ely Culbertson (came to America in 1922, failed at teaching, coal and coffee, stubborn post-mortems, met and married bridge teacher Josephine Dillon, "that encouragement and that alone"). The after-failure comparison is our illustration. Retold in our own words.`,
};

export default lesson;
