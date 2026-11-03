import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 6 (Pressure) — Rule 17 when you're the one in trouble. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Why Would They Want To?`,
  summary: `Six weeks behind on her car payments, she got a nasty call: pay by Monday or else. She had no way to find the money. On Monday morning, instead of panicking, she looked at it from the caller's side.`,
  minutes: 12,
  outcomes: [
    `See the other person's side even when you're under pressure`,
    `Think a request through from their point of view before you make it`,
    `Ask "Why should they want to?" before every ask`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `Elizabeth's Monday morning`,
      steps: [
        { title: `The pressure`, body: `Elizabeth, in Australia, was six weeks late with her car payment. On Friday the man handling her account rang: pay $122 by Monday or face further action. She had no way to raise it over the weekend.` },
        { title: `Their side first`, body: `When he called first thing Monday, she didn't get upset. She looked at it from his side, and apologised sincerely for all the trouble she'd caused him.` },
        { title: `Say what they're thinking`, body: `She said she must be his most troublesome customer, since this wasn't the first time she'd been late.` },
        { title: `Listen`, body: `His tone changed at once. She was far from his worst, he said, and told her about rude customers who lied and dodged his calls. She said nothing and let him pour out his troubles.` },
        { title: `The result`, body: `Then, without her asking, he said it didn't matter if she couldn't pay it all now. Twenty dollars by the end of the month would do, and the rest whenever she could.` },
      ],
    },
    {
      kind: `reading`,
      title: `Close your eyes first`,
      html:
        `<p>Tomorrow, before you ask anyone to put out a fire, buy your product or support your cause, why not pause, close your eyes, and think the whole thing through from their point of view? Ask yourself: why should they want to do it?</p>` +
        `<p>It takes time. But it avoids making enemies, gets better results, and saves a great deal of friction.</p>` +
        `<p>If you take only one thing from this course, take this: a habit of thinking from the other person's point of view, and seeing things from their angle as well as your own. It could easily be one of the stepping stones of your career.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Before every request, close your eyes for ten seconds and ask: why should they want to do this?`,
    },
  ],
  apply: {
    scenario: `Rule 17, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Elizabeth respond to the collector's Monday call?`,
        options: [
          { text: `She argued that $122 was unfair`, why: `She did the opposite.` },
          { text: `She apologised for the trouble she'd caused him` },
          { text: `She didn't answer`, why: `She answered and saw it from his side.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did the collector end up agreeing?`,
        options: [
          { text: `Full payment by Monday`, why: `He relaxed his demand.` },
          { text: `Twenty dollars by month's end and the rest when she could` },
          { text: `Cancelling the debt`, why: `He made it manageable, not free.` },
        ],
        answer: 1,
      },
      {
        kind: `orderLines`,
        prompt: `Elizabeth's approach, in order.`,
        lines: [`Stay calm`, `Apologise for their trouble`, `Say what they're probably thinking`, `Let them talk`, `Accept the offer that follows`],
      },
      {
        kind: `fillBlank`,
        prompt: `The question before every request.`,
        template: `Why should [[1]] want to [[2]] it?`,
        blanks: [[`they`], [`do`]],
        distractors: [`I`, `fix`],
      },
      {
        kind: `sortGroups`,
        prompt: `Under pressure: from their side, or panic?`,
        groups: [`From their side`, `Panic`],
        items: [
          { text: `"I'm sorry, I know I've made your job harder."`, group: 0 },
          { text: `"You can't do this to me!"`, group: 1 },
          { text: `"You must deal with a lot of difficult calls."`, group: 0 },
          { text: `Hanging up and ignoring the next call`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `How many dollars did the collector first demand by Monday? (a number)`,
        answers: [`122`],
        placeholder: `A number`,
      },
      {
        kind: `findBug`,
        prompt: `You're asking a professor for a deadline extension. Which line is only your side?`,
        lines: [
          `I know extensions make your marking schedule harder.`,
          `I really need this or my grade will suffer.`,
          `If I submit Friday, I can give you a much stronger essay to mark.`,
        ],
        bug: 1,
        fix: `I'd hate to hand in something rushed that wastes your time.`,
        explanation: `Your grade is your worry. The professor cares about their schedule and good work to mark.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to whose side they took.`,
        pairs: [
          [`Elizabeth`, `The debt collector's`],
          [`Carnegie in the park`, `The boys'`],
          [`Sam Douglas`, `His wife's`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): Elizabeth said nothing while the collector poured out his troubles. Which rule was that?`,
        options: [
          { text: `Be a good listener` },
          { text: `Smile`, why: `It was a phone call, and the rule here is listening.` },
          { text: `Remember names`, why: `Not this time. She listened.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `You owe a friend money and you're late paying. They message: "Still waiting." What does this lesson suggest?`,
        options: [
          { text: `"I know, I know, stop hassling me."`, why: `Defensive, and you're the one in the wrong.` },
          { text: `"You're right to chase me, I'm sorry. I must be making things awkward for you. Can I pay half Friday and the rest next week?"` },
          { text: `Ignore it until you can pay`, why: `Silence makes them assume the worst.` },
        ],
        answer: 1,
        explanation: `See it from their side, say what they're thinking, and offer something real.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before your next request, close your eyes for ten seconds and answer "Why should they want to do this?" Write your answer, then make the request. What changed?`,
    starters: [`My request was...`, `They'd want to because...`, `What changed was...`],
  },
  deepen: {
    title: `One stepping stone`,
    summary: `Carnegie said if you take one thing from his book, make it this habit of seeing the other person's point of view. Set a reminder on your phone for one week: "Their side first."`,
  },
  notes: `Source: Carnegie, Part Three ch. 8: Elizabeth Novak of New South Wales ($122 by Monday, apology, "most troublesome customer", $20 by month's end), "pause and close your eyes... Why should he or she want to do it?", the "one thing" from this book. Retold in our own words.`,
};

export default lesson;
