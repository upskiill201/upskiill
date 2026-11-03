import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 4 (Story) — Rule 29: use encouragement; make the fault seem easy to correct. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `"You Have a Natural Sense of Rhythm"`,
  summary: `A forty-year-old man engaged to be married finally took dancing lessons. His first teacher told him the truth: he was doing it all wrong. He quit. His second teacher may have been fibbing a little, and he kept going.`,
  minutes: 11,
  outcomes: [
    `Explain why "it's all wrong" kills the will to improve`,
    `Make a fault seem easy to fix`,
    `Show faith in someone's undeveloped flair`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Two dance teachers`,
      beats: [
        { speaker: `narrator`, text: `A bachelor friend of Carnegie's, about forty, got engaged, and his fiancée persuaded him to take dancing lessons. Heaven knows he needed them: he danced exactly as he had twenty years before.` },
        { speaker: `narrator`, text: `His first teacher probably told him the truth. She said he was doing it all wrong; he'd have to forget everything and start again. It took the heart out of him. He had no reason to go on, so he quit.` },
        { speaker: `narrator`, text: `The next teacher may have been stretching the truth, but he liked it. She said casually that his dancing was a bit old-fashioned, perhaps, but the fundamentals were fine, and he'd have no trouble learning a few new steps.` },
      ],
      choice: {
        prompt: `What else did the second teacher tell him?`,
        options: [
          { text: `"Practise every day or you'll never get it."`, outcome: `A fair point, but not what kept him going.` },
          { text: `"You have a natural sense of rhythm. You really are a natural-born dancer."`, outcome: `That's it. His common sense told him he'd always be a fourth-rate dancer. But deep down he liked to think she meant it, and he knew he was better for it. It gave him hope. It made him want to improve.`, best: true },
          { text: `"Let's start from scratch."`, outcome: `That's what the first teacher said, and he quit.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Make it seem easy`,
      html:
        `<p>Tell your child, your partner or your employee that they're stupid at something, have no gift for it, and are doing it all wrong, and you've destroyed almost every reason to try.</p>` +
        `<p>Use the opposite technique. Be generous with encouragement. Make the thing seem easy to do. Let them know you have faith in their ability, that they have an undeveloped flair for it, and they'll practise until dawn to excel.</p>` +
        `<p>Lowell Thomas, a great artist in human relations, did this to Carnegie, who knew nothing about the card game bridge. "Why, Dale, there's nothing to it," Thomas said. "It's just memory and judgement. You've written about memory. It'll be easy for you." Before he knew it, Carnegie was at a bridge table for the first time.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 29: Use encouragement. Make the fault seem easy to correct. Faith in someone's flair makes them want to practise until dawn.`,
    },
  ],
  apply: {
    scenario: `Rule 29: Make it seem easy.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did the man quit his first dance teacher?`,
        options: [
          { text: `She said he was doing it all wrong and must start over` },
          { text: `She was too expensive`, why: `It was what she said.` },
          { text: `He was too busy`, why: `She took the heart out of him.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `What the second teacher said.`,
        template: `You have a natural sense of [[1]]. You're a natural-born [[2]].`,
        blanks: [[`rhythm`], [`dancer`]],
        distractors: [`humour`, `singer`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Which card game did Lowell Thomas persuade Carnegie to try? (one word)`,
        answers: [`bridge`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Makes it seem easy, or makes it seem hopeless?`,
        groups: [`Seems easy`, `Seems hopeless`],
        items: [
          { text: `"The basics are there, just a couple of tweaks."`, group: 0 },
          { text: `"You'll have to forget everything and start over."`, group: 1 },
          { text: `"You've got a feel for this."`, group: 0 },
          { text: `"You just don't have the gift for it."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `How did Lowell Thomas make bridge seem easy to Carnegie?`,
        options: [
          { text: `He said it was just memory and judgement, and Carnegie had written about memory` },
          { text: `He gave him a rule book`, why: `He made it sound like a natural fit.` },
          { text: `He let him win`, why: `He encouraged him before he even played.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Encouraging a friend learning to cook. Which line makes it seem hopeless?`,
        lines: [
          `Your sauce has a great flavour already.`,
          `Honestly, you might just not be a natural cook.`,
          `Next time, a bit less salt and it'll be perfect.`,
        ],
        bug: 1,
        fix: `You've clearly got a good sense for flavour.`,
        explanation: `"Not a natural" destroys the reason to try. Make the fix sound small and doable.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each teacher to the effect.`,
        pairs: [
          [`The first dance teacher`, `He quit`],
          [`The second dance teacher`, `He wanted to improve`],
          [`Lowell Thomas`, `Carnegie sat down to play bridge`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what's Rule 28?`,
        options: [
          { text: `Give the other person a fine reputation to live up to` },
          { text: `Make the fault easy to correct`, why: `That's Rule 29.` },
          { text: `Smile`, why: `That's Rule 5.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build an encouraging line.`,
        tiles: [`You're`, `closer`, `than`, `you`, `think.`],
        distractors: [`hopeless.`],
      },
      {
        kind: `mcq`,
        prompt: `Your partner wants to learn to swim as an adult and is embarrassed. What does Rule 29 suggest?`,
        options: [
          { text: `"Adults find it really hard, so expect to struggle."`, why: `True for some, but it kills the will to try.` },
          { text: `"You're already comfortable in water, that's the hardest part. The strokes are just a few movements to learn."` },
          { text: `"Maybe it's too late."`, why: `That's the first dance teacher.` },
        ],
        answer: 1,
        explanation: `Make it seem easy and show faith in their flair, and they'll want to keep going.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: tell someone learning something new "You're closer than you think" and name one thing they've already got right. What happened?`,
    starters: [`... is learning...`, `I told them they'd already got... right`],
  },
  deepen: {
    title: `Practise until dawn`,
    summary: `Carnegie says encouragement makes people practise until dawn. Think of something you gave up learning. Who told you it was all wrong? What would the second teacher have said?`,
  },
  notes: `Source: Carnegie, Part Four ch. 8 "Make the Fault Seem Easy to Correct": the bachelor friend and the two dancing teachers ("natural sense of rhythm"), the "opposite technique" paragraph, Lowell Thomas and the bridge game. Retold in our own words.`,
};

export default lesson;
