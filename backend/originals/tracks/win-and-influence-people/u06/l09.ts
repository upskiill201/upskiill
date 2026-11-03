import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 9 (Pressure) — Rule 18 with difficult, dramatic people. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `Dripping With Sympathy`,
  summary: `One of the greatest singers of his age phoned his manager at noon on concert days: his throat was ruined, he couldn't possibly sing. The manager never argued once. And the singer always sang.`,
  minutes: 12,
  outcomes: [
    `Handle dramatic, difficult people with sympathy`,
    `Understand why people show their wounds`,
    `Keep sympathy honest`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The great basso`,
      beats: [
        { speaker: `narrator`, text: `Sol Hurok was America's leading concert manager for nearly half a century, handling stars like Pavlova and Isadora Duncan. One of the first lessons he learned was the need for sympathy, sympathy and more sympathy with his stars' quirks.` },
        { speaker: `narrator`, text: `For three years he managed Feodor Chaliapin, one of the greatest bass singers ever to fill the Metropolitan Opera. Chaliapin behaved like a spoiled child. On the day of a concert, he'd phone at noon: "Sol, I feel terrible. My throat is like raw meat. I cannot sing tonight."` },
      ],
      choice: {
        prompt: `What did Hurok do?`,
        options: [
          { text: `Reminded him of his contract`, outcome: `He knew you couldn't handle artists that way.` },
          { text: `Rushed to his hotel, full of sympathy: "What a pity! Of course you can't sing. I'll cancel at once. It'll only cost you a couple of thousand dollars, but that's nothing next to your reputation."`, outcome: `That's it. Chaliapin would sigh and say: come back at five and see how I feel. At five, the same. At half past seven, he'd agree to sing, if Hurok announced he had a bad cold. Hurok always agreed, and Chaliapin always sang.`, best: true },
          { text: `Booked a replacement singer`, outcome: `He never needed one. Sympathy got Chaliapin on stage every time.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Why people show their wounds`,
      html:
        `<p>An educational psychologist, Arthur Gates, wrote that sympathy is something every human being craves. A child eagerly shows off a cut or bruise, sometimes even hurts themselves, for the sympathy. Adults do the same: they show their bruises, tell of their accidents and illnesses, describe their operations in detail. Some self-pity, real or imagined, is practically universal.</p>` +
        `<p>So when someone dramatic comes to you with their troubles, arguing that they're exaggerating rarely helps. They want sympathy first. Give it, and they can often find their own way back to sense, as Chaliapin did by half past seven.</p>`,
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `Sympathy must stay honest. Feel for their worry, their pain, their pride, sincerely. Never promise what you can't give or pretend what you don't feel.`,
    },
  ],
  apply: {
    scenario: `Rule 18, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Chaliapin say on concert days at noon?`,
        options: [
          { text: `That his throat was ruined and he couldn't sing` },
          { text: `That he wanted more money`, why: `It was about his throat.` },
          { text: `That he'd be late`, why: `He said he couldn't sing at all.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `How did Hurok respond?`,
        options: [
          { text: `He argued Chaliapin was fine`, why: `He never argued.` },
          { text: `With complete sympathy, offering to cancel` },
          { text: `He called a doctor`, why: `He offered sympathy and to cancel.` },
        ],
        answer: 1,
      },
      {
        kind: `orderLines`,
        prompt: `A concert day with Chaliapin, in order.`,
        lines: [`Noon: "I cannot sing tonight"`, `Hurok offers to cancel, full of sympathy`, `Five o'clock: "Come back later"`, `Half past seven: he agrees to sing`],
      },
      {
        kind: `fillBlank`,
        prompt: `Hurok's first lesson with stars.`,
        template: `Sympathy, [[1]] and more [[2]].`,
        blanks: [[`sympathy`], [`sympathy`]],
        distractors: [`patience`, `money`],
      },
      {
        kind: `sortGroups`,
        prompt: `A dramatic friend says their week is "the worst ever". Sympathy or argument?`,
        groups: [`Sympathy`, `Argument`],
        items: [
          { text: `"That sounds exhausting. What's been the hardest part?"`, group: 0 },
          { text: `"It can't be that bad."`, group: 1 },
          { text: `"No wonder you're worn out."`, group: 0 },
          { text: `"Other people have it much worse."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Arthur Gates said a child eagerly displays a cut or ________ for sympathy. (one word)`,
        answers: [`bruise`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your star salesperson says they're too stressed to present tomorrow. Which line argues instead of sympathising?`,
        lines: [
          `That sounds like a brutal week. I'm sorry.`,
          `Everyone's stressed; that's no excuse.`,
          `Would it help if I opened the presentation and you joined for your part?`,
        ],
        bug: 1,
        fix: `You've carried a lot lately.`,
        explanation: `Arguing that they're not really stressed only makes them dig in. Hurok would never.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each person in this chapter to their move.`,
        pairs: [
          [`Sol Hurok`, `Offered to cancel, full of sympathy`],
          [`Joyce Norris`, `Praised the nails she wanted cut`],
          [`Carnegie and the angry listener`, `Thanked and apologised by phone`],
          [`Elizabeth`, `Apologised for the collector's trouble`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 5): what's "the safety valve in handling complaints"?`,
        options: [
          { text: `Letting the other person do a great deal of the talking` },
          { text: `Offering a refund`, why: `It's about letting them talk.` },
          { text: `Transferring the call`, why: `It's letting them talk themselves out.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your elderly relative calls daily with long stories about their aches and pains. You're tempted to say they're exaggerating. What does this lesson suggest?`,
        options: [
          { text: `Tell them gently they're exaggerating`, why: `It won't stop the calls, and it'll hurt them.` },
          { text: `Listen with real sympathy, ask a caring question, then gently move to brighter topics` },
          { text: `Stop answering every day`, why: `They're showing their bruises for sympathy. Give a little.` },
        ],
        answer: 1,
        explanation: `People show their wounds because they crave sympathy. A little, sincerely given, goes a long way.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: when someone moans to you today, respond with sympathy, not advice and not argument. What did you say, and how did they respond?`,
    starters: [`Someone complained about...`, `I said...`, `They...`],
  },
  deepen: {
    title: `Showing bruises`,
    summary: `Notice this week how often people mention their aches, troubles and bad days. It's not weakness. It's the universal hunger for sympathy, the same one you have.`,
  },
  notes: `Source: Carnegie, Part Three ch. 9: Sol Hurok and Feodor Chaliapin ("my throat is like raw hamburger", noon/five/seven-thirty, the cold announcement), Dr. Arthur I. Gates's Educational Psychology on sympathy and self-pity. Retold in our own words.`,
};

export default lesson;
