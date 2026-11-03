import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9 (Pressure) — Rule 15 when you want to boast: let your friends excel you. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `Let Your Friends Excel You`,
  summary: `She was the best recruiter in her agency, and the least liked. Every day she told colleagues about her latest success. They resented every word. What she changed made her the most popular person in the office.`,
  minutes: 12,
  outcomes: [
    `Hold back your own wins so others can share theirs`,
    `Explain why letting others excel builds friendship`,
    `Ask about other people's successes first`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Henrietta's first months`,
      beats: [
        { speaker: `narrator`, text: `Henrietta was a placement counsellor at an employment agency in New York. For her first few months, she didn't have a single friend among her colleagues.` },
        { speaker: `narrator`, text: `Why? Every day she bragged about the jobs she'd filled, the new clients she'd signed, everything she'd achieved. She was good at her work, and proud of it. But instead of sharing her triumphs, her colleagues seemed to resent them.` },
        { speaker: `narrator`, text: `She really wanted them as friends. After hearing some of the ideas in Carnegie's course, she decided to change.` },
      ],
      choice: {
        prompt: `What did she do differently?`,
        options: [
          { text: `Bragged less, but still slipped in her wins`, outcome: `She did more than that.` },
          { text: `Talked less about herself, listened more, and asked colleagues to share their successes, mentioning hers only when asked`, outcome: `That's it. They had things to boast about too, and loved telling her. She became the best-liked counsellor in the agency.`, best: true },
          { text: `Stopped working so hard`, outcome: `She kept her standards. She changed how she talked.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Why it works`,
      html:
        `<p>Even our friends would much rather tell us about their achievements than listen to us boast about ours.</p>` +
        `<p>The French philosopher La Rochefoucauld put it sharply: if you want enemies, excel your friends. If you want friends, let your friends excel you.</p>` +
        `<p>Why is that true? When our friends excel us, they feel important. When we excel them, some of them at least feel inferior, and envious.</p>` +
        `<p>It doesn't mean pretending to be worse than you are. It means giving the stage to others: letting their story be the one that gets told today.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `If you want enemies, excel your friends. If you want friends, let your friends excel you.`,
    },
  ],
  apply: {
    scenario: `Rule 15, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Henrietta have no friends at first?`,
        options: [
          { text: `She was bad at her job`, why: `She was very good at it.` },
          { text: `She bragged about her successes every day` },
          { text: `She was too quiet`, why: `The opposite. She talked about herself constantly.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `La Rochefoucauld's line.`,
        template: `If you want [[1]], excel your friends. If you want [[2]], let your friends excel you.`,
        blanks: [[`enemies`], [`friends`]],
        distractors: [`money`, `respect`],
      },
      {
        kind: `mcq`,
        prompt: `Why do friends resent it when we excel them?`,
        options: [
          { text: `It can make them feel inferior and envious` },
          { text: `They think we're lying`, why: `It's about how they feel, not truth.` },
          { text: `They don't care`, why: `They care a lot. That's the problem.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Lets them excel, or competes with them?`,
        groups: [`Lets them excel`, `Competes`],
        items: [
          { text: `"Congratulations! How did you pull it off?"`, group: 0 },
          { text: `"Nice. I did something similar last year, but bigger."`, group: 1 },
          { text: `Keeping your promotion news for another day while they celebrate theirs`, group: 0 },
          { text: `Topping every story they tell`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Henrietta mentioned her own achievements only when she was ________. (one word)`,
        answers: [`asked`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `A friend just ran their first 10k. Which reply competes?`,
        lines: [
          `That's huge! How did the last kilometre feel?`,
          `Nice, I ran a half marathon in the spring actually.`,
          `What made you sign up?`,
        ],
        bug: 1,
        fix: `I'd love to hear how you trained.`,
        explanation: `It turns their moment into yours. Let them excel today.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story from this chapter.`,
        pairs: [
          [`Henrietta`, `Let colleagues share their wins`],
          [`Laurie`, `"Why, Laurie, why?"`],
          [`The laryngitis salesman`, `Let the president argue his case`],
          [`Allison's motors`, `Three yes-questions`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what did Tippy the dog know?`,
        options: [
          { text: `Interest in others makes friends faster than trying to impress` },
          { text: `Barking gets attention`, why: `Tippy won people with affection.` },
          { text: `Patience wins`, why: `He raced up the hill to meet people.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question Henrietta started asking.`,
        tiles: [`What's`, `the`, `best`, `thing`, `that`, `happened`, `this`, `week?`],
        distractors: [`my`],
      },
      {
        kind: `mcq`,
        prompt: `You and a close friend both applied for the same type of job. You got an offer; they just got theirs too, and called you excited. What does this lesson suggest?`,
        options: [
          { text: `Tell them about your offer straight away, since it's better`, why: `You'd excel them on their happy day.` },
          { text: `Celebrate theirs fully today, ask all about it, and share yours another time` },
          { text: `Say nothing and avoid them for a week`, why: `That's not letting them excel. That's hiding.` },
        ],
        answer: 1,
        explanation: `Let their moment be theirs. Your news will keep.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: ask a friend or colleague about a recent win of theirs, and don't mention any of yours. How did they respond?`,
    starters: [`I asked... about...`, `I held back my news about...`, `They...`],
  },
  deepen: {
    title: `The topping habit`,
    summary: `This week, notice every time you're about to top someone's story with a bigger one of yours. Swap it for one more question about theirs.`,
  },
  notes: `Source: Carnegie, Part Three ch. 6: friends would rather talk about their achievements, La Rochefoucauld's maxim and Carnegie's explanation, Henrietta G—— at the Midtown Personnel Agency. Retold in our own words.`,
};

export default lesson;
