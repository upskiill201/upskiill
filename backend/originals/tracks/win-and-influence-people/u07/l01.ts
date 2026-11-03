import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 1 (Story) — Rule 19: appeal to the nobler motives. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `Two Reasons for Everything`,
  summary: `A tenant announced he was leaving four months before his lease ended. The landlord could have threatened legal action. Instead he said: I've always thought of you as a man of your word.`,
  minutes: 11,
  outcomes: [
    `Explain J. P. Morgan's two reasons for everything`,
    `Appeal to someone's best image of themselves`,
    `Replace a threat with an appeal to fairness and honour`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `The reason that sounds good`,
      html:
        `<p>Carnegie grew up near the old farm of the outlaw Jesse James, who robbed trains and banks and then gave money to local farmers to pay their mortgages. Jesse James probably thought of himself as an idealist. So did the gangsters you met in Chapter 1.</p>` +
        `<p>The fact is, nearly everyone you meet thinks highly of themselves and likes to feel fine and unselfish in their own eyes.</p>` +
        `<p>The banker J. P. Morgan once observed that a person usually has two reasons for doing something: one that sounds good, and the real one. The person will think of the real reason themselves; you don't need to stress it. But all of us, being idealists at heart, like to think about the motives that sound good.</p>` +
        `<p>So, to change people, <strong>appeal to their nobler motives.</strong></p>`,
    },
    {
      kind: `story`,
      title: `The tenant`,
      beats: [
        { speaker: `narrator`, text: `Hamilton Farrell, a landlord in Pennsylvania, had a disgruntled tenant who announced he was moving out at once, though his lease had four months left. The family had lived there all winter, the most expensive season, and the flat would be hard to re-let before autumn. Farrell saw red.` },
        { speaker: `narrator`, text: `Normally he'd have told the man to read his lease: move out, and the whole remaining rent falls due at once, and he would collect it.` },
        { speaker: `narrator`, text: `Instead he said: "I've listened to you, and I still don't believe you mean to move. Years in this business have taught me something about people, and I sized you up from the start as a man of your word. I'm so sure of it, I'll take a gamble."` },
        { speaker: `narrator`, text: `"Think it over for a few days. If you come back before the rent is due and still want to go, I'll accept it as final and admit I misjudged you. But I believe you're a man of your word and will keep your contract."` },
      ],
      choice: {
        prompt: `What did the tenant do?`,
        options: [
          { text: `Moved out anyway`, outcome: `He didn't.` },
          { text: `Came in and paid the rent in person; he and his wife had decided the only honourable thing was to keep the lease`, outcome: `That's it. No threat could have done what that appeal to his honour did.`, best: true },
          { text: `Asked for a lower rent`, outcome: `He simply paid, and stayed.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 19: Appeal to the nobler motives. People like to see themselves as fair, honest and decent. Speak to that person.`,
    },
  ],
  apply: {
    scenario: `Rule 19: Appeal to the nobler motives.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What were J. P. Morgan's two reasons?`,
        options: [
          { text: `One that sounds good, and the real one` },
          { text: `A selfish one and a lazy one`, why: `Not his words.` },
          { text: `Money and fame`, why: `He meant two kinds of reason.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Why appeal to nobler motives?`,
        template: `All of us, being [[1]] at heart, like to think of motives that sound [[2]].`,
        blanks: [[`idealists`], [`good`]],
        distractors: [`cynics`, `clever`],
      },
      {
        kind: `mcq`,
        prompt: `What did Farrell call the tenant?`,
        options: [
          { text: `A man of his word` },
          { text: `A lease-breaker`, why: `That would have been a threat.` },
          { text: `A difficult customer`, why: `He appealed to his honour instead.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Threat or nobler motive?`,
        groups: [`Threat`, `Nobler motive`],
        items: [
          { text: `"Break the lease and I'll sue."`, group: 0 },
          { text: `"I know you're someone who keeps their word."`, group: 1 },
          { text: `"Pay up or it goes to collections."`, group: 0 },
          { text: `"I'm sure you want to be fair about this."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `How many months were left on the tenant's lease? (a number)`,
        answers: [`4`, `four`],
        placeholder: `A number`,
      },
      {
        kind: `findBug`,
        prompt: `A message to a flatmate who keeps "borrowing" your food. Which line is a threat, not a nobler appeal?`,
        lines: [
          `I know you're the kind of person who'd never take advantage.`,
          `So I'm sure it's just been a busy week.`,
          `But next time I'm putting a lock on the fridge.`,
        ],
        bug: 2,
        fix: `Could we each keep a shelf, so it's fair?`,
        explanation: `A threat undoes the appeal. Leave them the fine image of themselves to live up to.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to the idea.`,
        pairs: [
          [`J. P. Morgan`, `Two reasons for everything`],
          [`Jesse James`, `Robbed banks but saw himself as an idealist`],
          [`Hamilton Farrell`, `"A man of your word"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what's the magic phrase?`,
        options: [
          { text: `"I don't blame you. If I were you, I'd feel the same."` },
          { text: `"Trust me."`, why: `Not the phrase.` },
          { text: `"You're right."`, why: `Close in spirit, but the magic phrase is about sympathy.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Farrell's appeal.`,
        tiles: [`I`, `believe`, `you're`, `a`, `man`, `of`, `your`, `word.`],
        distractors: [`liar.`],
      },
      {
        kind: `mcq`,
        prompt: `A customer wants to return an item they've clearly used, claiming it was never opened. What would Rule 19 suggest?`,
        options: [
          { text: `"You've obviously used this. That's dishonest."`, why: `Even if true, they'll defend their honour by fighting.` },
          { text: `"I'm sure you want to be fair to us too. Since it's been used, could we find a solution that works for both of us?"` },
          { text: `Refund it to avoid a scene`, why: `That rewards the bad reason and ignores the good one.` },
        ],
        answer: 1,
        explanation: `Speak to the fair person they'd like to be. Most people rise to it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: appeal to someone's fairness or honour today instead of pressing your rights. What did you say, and how did they respond?`,
    starters: [`The situation was...`, `I appealed to...`, `They...`],
  },
  deepen: {
    title: `The reason that sounds good`,
    summary: `Next time you want someone to do something, ask: what's the reason that sounds good to THEM, the generous, fair, decent reason? Lead with that.`,
  },
  notes: `Source: Carnegie, Part Three ch. 10 "An Appeal That Everybody Likes": Jesse James's farm, "all people have a high regard for themselves", J. P. Morgan's two reasons, Hamilton J. Farrell's tenant (four months, "a man of your word", "men or monkeys" omitted, paid rent in person). Retold in our own words.`,
};

export default lesson;
