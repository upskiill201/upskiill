import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 9 (Pressure) — Rule 24 when you've already blundered: the Kaiser and the Chancellor. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `The Kaiser and the Chancellor`,
  summary: `The German Kaiser had embarrassed his country in front of the world and wanted his Chancellor to take the blame. The Chancellor's reply nearly ended his career in one sentence. What he said next saved it.`,
  minutes: 12,
  outcomes: [
    `Recover when a criticism has already slipped out`,
    `Repair pride by humbling yourself and praising the other person`,
    `See why the order matters: humility first, criticism after`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Berlin, 1908`,
      beats: [
        { speaker: `narrator`, text: `Kaiser Wilhelm II, haughty and arrogant, was building an army and navy he boasted could beat anyone. Then, while a guest in England, he made a series of absurd public statements and allowed them to be printed in a British newspaper.` },
        { speaker: `narrator`, text: `He claimed he was the only German friendly to England, that he alone had saved England from humiliation, that it was his battle plan that had won a British war. Europe was furious. German statesmen were aghast.` },
        { speaker: `narrator`, text: `In a panic, the Kaiser asked his Chancellor, Prince von Bülow, to announce publicly that it was all his fault: that he'd advised the Kaiser to say these things.` },
        { speaker: `narrator`, text: `"But Your Majesty," said von Bülow, "nobody in Germany or England could possibly believe I'd have advised you to say such things." The moment the words were out, he knew he'd blundered. The Kaiser exploded: "You think I'm a donkey, capable of blunders you could never have made yourself!"` },
      ],
      choice: {
        prompt: `How did von Bülow recover?`,
        options: [
          { text: `He apologised and offered to resign`, outcome: `He found a better way.` },
          { text: `He said the Kaiser surpassed him in many ways, above all in science, that he often admired the Kaiser's explanations of wireless and X-rays, while he himself was hopeless at science, and had only some knowledge of history and diplomacy`, outcome: `That's it. The Kaiser beamed: "Haven't I always said we complete each other? We'll stick together!" By evening he was threatening to punch anyone who spoke against von Bülow.`, best: true },
          { text: `He insisted he was right`, outcome: `That would have ended his career on the spot.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The right order`,
      html:
        `<p>Von Bülow knew he should have praised before he criticised. Since it was too late for that, he did the next best thing: he praised after he'd criticised, and humbled himself. It worked a miracle.</p>` +
        `<p>But even that canny diplomat made one error. He should have begun by talking about his own shortcomings and the Kaiser's superiority, not by implying the Kaiser was a fool who needed a guardian.</p>` +
        `<p>If a few sentences of humility and praise can turn a proud, insulted Kaiser into a firm friend, imagine what they can do for you and me in everyday life.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Humility first, criticism after. And if a criticism slips out first, repair it fast: lower yourself and lift them up, sincerely.`,
    },
  ],
  apply: {
    scenario: `Rule 24, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the Kaiser ask von Bülow to do?`,
        options: [
          { text: `Take the public blame for the Kaiser's statements` },
          { text: `Resign`, why: `He wanted him to take the blame.` },
          { text: `Apologise to England`, why: `He wanted von Bülow to say it was his advice.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What was von Bülow's blunder?`,
        options: [
          { text: `Implying nobody would believe he'd give such foolish advice` },
          { text: `Refusing outright`, why: `It was how he refused.` },
          { text: `Laughing at the Kaiser`, why: `It was his words.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `The Kaiser's furious reply.`,
        template: `You think I'm a [[1]], capable of blunders you could [[2]] have made!`,
        blanks: [[`donkey`], [`never`]],
        distractors: [`genius`, `always`],
      },
      {
        kind: `sortGroups`,
        prompt: `How von Bülow repaired it: lowering himself, or raising the Kaiser?`,
        groups: [`Lowering himself`, `Raising the Kaiser`],
        items: [
          { text: `"I'm hopeless at science."`, group: 0 },
          { text: `"I admire your explanations of wireless."`, group: 1 },
          { text: `"I have only some knowledge of history."`, group: 0 },
          { text: `"You surpass me in many ways."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `By evening, the Kaiser threatened to punch anyone who spoke against von ________. (one word)`,
        answers: [`Bülow`, `Bulow`, `Buelow`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `You told a colleague their plan "won't work", and they're hurt. Which repair line makes it worse?`,
        lines: [
          `I put that badly, sorry.`,
          `You know this client far better than I do.`,
          `Still, anyone could see the plan had holes.`,
        ],
        bug: 2,
        fix: `I'm better with numbers than people, so I'd love your read on the client.`,
        explanation: `It re-opens the wound. Von Bülow lowered himself and raised the Kaiser. Nothing else.`,
      },
      {
        kind: `orderLines`,
        prompt: `The ideal order von Bülow should have used.`,
        lines: [`Admit your own shortcomings`, `Praise their strengths sincerely`, `Then raise the problem gently`],
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each person to the mistake they admitted first.`,
        pairs: [
          [`Carnegie`, `His blunders at nineteen`],
          [`Dillistone`, `His bad spelling`],
          [`Von Bülow`, `Being hopeless at science`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what did Colonel House want more than credit?`,
        options: [
          { text: `Results` },
          { text: `Praise`, why: `He gave the praise away.` },
          { text: `Power`, why: `He wanted results.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `In a meeting you snapped at your manager, "That's obviously not going to work." The room went quiet. What's the von Bülow repair?`,
        options: [
          { text: `Stay quiet and hope it passes`, why: `The wound stays open.` },
          { text: `"I'm sorry, that came out badly. You see the bigger picture far better than I do. Could I explain the one worry I had?"` },
          { text: `Explain at length why you were right`, why: `That confirms the insult.` },
        ],
        answer: 1,
        explanation: `Lower yourself, lift them, sincerely, then raise the point gently.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: think of a recent moment when a criticism slipped out too bluntly. Write the von Bülow repair you could still offer: humble yourself, sincerely praise them, then raise the point. Send it if it's not too late.`,
    starters: [`What I said was...`, `My repair: ...`],
  },
  deepen: {
    title: `We complete each other`,
    summary: `The Kaiser's reaction, "we complete each other", is what humility and honest praise create: a sense of being on the same team. Who in your life could hear "you're better at that than I am" this week?`,
  },
  notes: `Source: Carnegie, Part Four ch. 3: Prince Bernhard von Bülow and Kaiser Wilhelm II after the Daily Telegraph interview (the book dates it 1909; the interview was published in 1908), the Kaiser's outburst ("you consider me a donkey"), von Bülow's praise of the Kaiser's science (barometer, wireless telegraphy, Röntgen rays), "we complete one another", the threatened punch, Carnegie's verdict on the order. Retold in our own words.`,
};

export default lesson;
