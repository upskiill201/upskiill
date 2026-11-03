import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 3 (Pressure) — Rule 28 when a good name sounds fake: keep it true. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Reputations That Stick`,
  summary: `Telling a lazy colleague they're "the hardest worker here" won't work. They'll know it's false, and so will you. A good name only sticks when there's a grain of truth in it.`,
  minutes: 12,
  outcomes: [
    `Find a true quality to build a reputation on`,
    `Avoid good names that sound like flattery`,
    `Give a fine reputation to someone difficult`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `A good name that rings false, and one that rings true`,
      before: {
        label: `Rings false`,
        text: `To a colleague who misses every deadline: "You're the most punctual person I know!" They'll hear sarcasm, or flattery. Either way, it changes nothing.`,
      },
      after: {
        label: `Rings true`,
        text: `"When you commit to something you care about, like the charity run, you're the most dependable person here. I'd love that energy on the Q3 report." It names something real, and points it at the behaviour you want.`,
      },
      notes: [
        `Look at the book's examples: Bill really had been a fine mechanic; Bridgit really did good work; Jack really had listened before.`,
        `Find the real quality first, then build on it.`,
      ],
    },
    {
      kind: `reading`,
      title: `Where to find the grain of truth`,
      html:
        `<p>Every good name in the book had something true at its heart. Henke reminded Bill of years of good work. Dr. Fitzhugh thanked Bridgit for the cleaning she had done well. Ruth Hopkins knew Tommy learned quickly and had natural influence, even if he used it badly. Bill Parker had seen Jack listen before.</p>` +
        `<p>So when someone seems to have no good quality to build on, look more widely. At their past. At what they do outside work. At what they do when they care. The quality is usually there, aimed at the wrong thing.</p>` +
        `<p>And remember Carnegie's constant warning: nobody wants insincerity. A good name that's false is just flattery dressed up, and it will be spotted.</p>`,
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `A fine reputation must be built on something true. Find the real quality, often from their past or outside work, and point it at what you need.`,
    },
  ],
  apply: {
    scenario: `Rule 28, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why does "You're the most punctual person I know!" fail with someone always late?`,
        options: [
          { text: `It's obviously false, so it sounds like sarcasm or flattery` },
          { text: `It's too short`, why: `It's untrue.` },
          { text: `It's too kind`, why: `Kind is fine. False isn't.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Rings true, or rings false?`,
        groups: [`Rings true`, `Rings false`],
        items: [
          { text: `"You were brilliant with that angry customer last month."`, group: 0 },
          { text: `"You're perfect at everything."`, group: 1 },
          { text: `"You've always been the one who spots the problems early."`, group: 0 },
          { text: `"You're the best employee we've ever had" (to someone struggling)`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Where to look for the grain of truth.`,
        template: `At their [[1]], at what they do outside [[2]], at what they do when they care.`,
        blanks: [[`past`], [`work`]],
        distractors: [`salary`, `home`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Ruth Hopkins built Tommy's good name on his talent for learning quickly and his natural ________. (one word)`,
        answers: [`influence`, `leadership`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `What did all the book's good names have in common?`,
        options: [
          { text: `Something genuinely true at their heart` },
          { text: `They were exaggerated to motivate`, why: `They were built on truth.` },
          { text: `They came with money`, why: `Only Bridgit's mentioned pay, for time.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Giving a reputation to a colleague who's been negative in meetings. Which line rings false?`,
        lines: [
          `You're often the first to spot what could go wrong.`,
          `That's a real strength when it's pointed at solutions.`,
          `You're honestly the most positive person in the company.`,
        ],
        bug: 2,
        fix: `Could you help us find fixes for the risks you see?`,
        explanation: `Everyone knows it's untrue. The first two lines found the real quality and aimed it well.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each good name to the truth behind it.`,
        pairs: [
          [`"You're a fine mechanic"`, `Years of satisfied customers`],
          [`"You're willing to listen"`, `Jack had listened before`],
          [`"Thanks for the fine cleaning"`, `Bridgit's good work so far`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's flattery compared to?`,
        options: [
          { text: `Counterfeit money` },
          { text: `Sunlight`, why: `That's praise.` },
          { text: `Honey`, why: `That's friendliness.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a true good name for a negative colleague.`,
        tiles: [`You`, `always`, `spot`, `the`, `risks`, `first.`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `Your teenage son does almost no homework but spends hours mastering a hard video game. What true good name could you give him?`,
        options: [
          { text: `"You're a brilliant student."`, why: `He'll know it's not true right now.` },
          { text: `"You're incredibly persistent. I've watched you master that game. Imagine that applied to maths."` },
          { text: `"You're wasting your talent."`, why: `A bad name. He'll live down to it.` },
        ],
        answer: 1,
        explanation: `Persistence is genuinely his. Point it at what you need.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: pick someone difficult. Find one genuinely true quality, from their past, outside work, or when they care. Give them that good name this week. What was it?`,
    starters: [`The person is...`, `Their true quality is...`, `I told them...`],
  },
  deepen: {
    title: `Aimed at the wrong thing`,
    summary: `Tommy's leadership was real, just aimed at trouble. Most "difficult" people have a strength aimed at the wrong thing. What's the strength behind the difficulty in someone you know?`,
  },
  notes: `Synthesis of Part Four ch. 7 examples (Henke, Parker, Fitzhugh, Hopkins) with the sincerity rule from Part One ch. 2 and Part Four ch. 6. The punctuality comparison is our illustration. Retold in our own words.`,
};

export default lesson;
