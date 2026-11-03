import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 3 (Pressure) — Rule 19 when it might not work: assume they're honest anyway. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Assume They're Honest`,
  summary: `"That stuff's fine for millionaires and novelists," a sceptic says. "Try it on the tough people I deal with." Fair point. Nothing works on everyone. So why try the nobler motive at all?`,
  minutes: 12,
  outcomes: [
    `Use the nobler motive with people you doubt`,
    `Accept that no rule works on everyone`,
    `Decide when to experiment with a new approach`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `Appealing to nobler motives only works on nice, wealthy or sentimental people.`,
          isFact: false,
          explain: `James Thomas used it on six customers refusing to pay their bills. Five paid more than the minimum.`,
        },
        {
          text: `Every rule in this course works on every person.`,
          isFact: false,
          explain: `Carnegie said plainly: nothing works in all cases, and nothing works with all people. One of Thomas's six still refused to pay.`,
        },
        {
          text: `Even people inclined to cheat often respond well when you treat them as honest.`,
          isFact: true,
          explain: `That was Thomas's experience: make people feel you consider them honest, upright and fair, and most act that way.`,
        },
      ],
    },
    {
      kind: `reading`,
      title: `If you're satisfied, why change?`,
      html:
        `<p>Carnegie anticipated the sceptic. You may be right, he said. Nothing works in every case or with every person. If you're satisfied with the results you're getting now, why change?</p>` +
        `<p>But if you're not satisfied, why not experiment?</p>` +
        `<p>That's the honest case for this rule. Treating people as honest won't turn every cheat into a saint. But most people aren't cheats. And the few who are, often behave better when someone expects better of them. The cost of trying is small: at worst, one in six still won't pay, and you're no worse off than with threats.</p>` +
        `<p>The gain is large: five fair customers, goodwill instead of grudges, and six new car sales.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `No rule works on everyone. But if your current approach isn't working, try expecting the best, and see how many people rise to it.`,
    },
  ],
  apply: {
    scenario: `Rule 19, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Carnegie say to the sceptic?`,
        options: [
          { text: `"It works on everyone."`, why: `He admitted it doesn't.` },
          { text: `"If you're satisfied with your results, why change? If not, why not experiment?"` },
          { text: `"You're wrong."`, why: `He'd never say that. He agreed with the sceptic's point.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `Out of six customers, how many still refused to pay the disputed charge? (a number)`,
        answers: [`1`, `one`],
        placeholder: `A number`,
      },
      {
        kind: `sortGroups`,
        prompt: `Assuming the best, or assuming the worst?`,
        groups: [`Assuming the best`, `Assuming the worst`],
        items: [
          { text: `"I'm sure there's a good reason the payment's late."`, group: 0 },
          { text: `"You're obviously trying to get out of paying."`, group: 1 },
          { text: `"I trust you'll put it right."`, group: 0 },
          { text: `"I've seen your type before."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Thomas's rule.`,
        template: `Assume the customer is sincere, [[1]] and willing to [[2]] once convinced the charges are right.`,
        blanks: [[`honest`], [`pay`]],
        distractors: [`rich`, `argue`],
      },
      {
        kind: `mcq`,
        prompt: `What's the honest case for trying the nobler motive on someone you doubt?`,
        options: [
          { text: `The cost is small and most people rise to it` },
          { text: `It always works`, why: `It doesn't always work.` },
          { text: `It makes you look good`, why: `That's not the reason.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Chasing a client who's two months late paying. Which line assumes the worst?`,
        lines: [
          `I know things get busy at the end of the quarter.`,
          `I'm guessing you're just hoping I'll forget about it.`,
          `I'd be grateful if you could look at it this week.`,
        ],
        bug: 1,
        fix: `I'm sure it's just slipped through.`,
        explanation: `Accusing them of bad faith makes them defend themselves, and gives them a reason to delay.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each person in this chapter to their nobler appeal.`,
        pairs: [
          [`Hamilton Farrell`, `Honour: "a man of your word"`],
          [`James Thomas`, `Fairness: "whatever you say goes"`],
          [`Lord Northcliffe`, `Love: "my mother doesn't like it"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what did Pat O'Haire start saying about rival trucks?`,
        options: [
          { text: `They were good trucks from a fine company` },
          { text: `They were rubbish`, why: `That's what lost him sales.` },
          { text: `Nothing`, why: `He praised them.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build an appeal that assumes the best.`,
        tiles: [`I`, `know`, `you`, `want`, `to`, `do`, `the`, `right`, `thing.`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `Your teenager says they finished their homework, and you suspect they didn't. Which approach uses this lesson?`,
        options: [
          { text: `"I don't believe you. Show me."`, why: `Assuming the worst. They'll defend, and may lie harder.` },
          { text: `"Great, I trust you. I'd love to see the bit you're proudest of."` },
          { text: `Say nothing and check their bag later`, why: `Suspicion behind their back breaks trust if found out.` },
        ],
        answer: 1,
        explanation: `Expect the honest version of them. If they haven't done it, many will quietly go and do it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: treat one person you doubt as completely honest today. Tell them you trust them. What did they do?`,
    starters: [`I doubted... about...`, `I said I trusted them, and...`],
  },
  deepen: {
    title: `Experiment`,
    summary: `Pick one situation where your usual approach keeps failing: a late payer, a messy flatmate, a stubborn colleague. This week, try the nobler motive instead. Write down what happened. That's how Carnegie's classes learned: by experiment.`,
  },
  notes: `Source: Carnegie, Part Three ch. 10: the sceptic ("tough babies I have to collect bills from"), "nothing will work in all cases", "if you are satisfied... why change? If not, why not experiment?", James L. Thomas's six bills (one refused) and his rule about assuming honesty. Retold in our own words.`,
};

export default lesson;
