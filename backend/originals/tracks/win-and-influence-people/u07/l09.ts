import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 9 (Pressure) — Rule 21: the game itself; when challenges backfire. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `The Game Itself`,
  summary: `A tyre tycoon said pay alone never held good people. A scientist studied thousands of workers to find what really drives them. Neither answer was money.`,
  minutes: 12,
  outcomes: [
    `Explain why the work itself motivates more than pay`,
    `Make a task feel like a game worth winning`,
    `Spot when a challenge has turned into pressure`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `Pay alone is what brings good people together and keeps them.`,
          isFact: false,
          explain: `Harvey Firestone, founder of the tyre company, said he'd never found that pay alone would bring together or hold good people. It was the game itself.`,
        },
        {
          text: `In a large study of workers, the biggest motivator turned out to be the work itself.`,
          isFact: true,
          explain: `The behavioural scientist Frederick Herzberg studied thousands of people from factory floors to senior management. Not money, not conditions, not benefits: interesting, exciting work.`,
        },
        {
          text: `Any challenge motivates anyone, however it's set.`,
          isFact: false,
          explain: `A challenge appeals to the desire to excel. Turn it into a threat or a humiliation and it becomes pressure, which Schwab's mill manager had already tried and failed with.`,
        },
      ],
    },
    {
      kind: `reading`,
      title: `What every successful person loves`,
      html:
        `<p>That's what every successful person loves: the game. The chance to express themselves. The chance to prove their worth, to excel, to win.</p>` +
        `<p>So when you want someone to give their best, ask: how can I make this a game worth winning? A target to beat. A record to break. A problem nobody's cracked. A chance to show what they can do.</p>` +
        `<p>And watch for the line. A challenge says "I think you can." Pressure says "you'd better." A challenge leaves people free to rise to it. Pressure gives them no choice, and gets the sullen obedience Carnegie saw in the boys at the campfire.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `People work hardest for the game itself: the chance to excel. Make the task a game worth winning, and keep it a dare, never a threat.`,
    },
  ],
  apply: {
    scenario: `Rule 21, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Harvey Firestone say held good people together?`,
        options: [
          { text: `Pay`, why: `He said pay alone never did.` },
          { text: `The game itself` },
          { text: `Strict rules`, why: `He named the game.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did Herzberg find was the biggest motivator?`,
        options: [
          { text: `Money`, why: `Not money.` },
          { text: `Good working conditions`, why: `Not conditions.` },
          { text: `The work itself, when it's exciting and interesting` },
        ],
        answer: 2,
      },
      {
        kind: `fillBlank`,
        prompt: `What every successful person loves.`,
        template: `The [[1]]. The chance to prove their [[2]], to excel, to win.`,
        blanks: [[`game`], [`worth`]],
        distractors: [`money`, `rank`],
      },
      {
        kind: `sortGroups`,
        prompt: `"I think you can" or "you'd better"?`,
        groups: [`Challenge`, `Pressure`],
        items: [
          { text: `"Nobody's solved this bug in a month. Fancy a go?"`, group: 0 },
          { text: `"Solve it by Friday or we'll talk about your future."`, group: 1 },
          { text: `"Can we beat last quarter's record?"`, group: 0 },
          { text: `"Everyone else hit target, so what's your excuse?"`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Carnegie lists footraces, hog-calling and ________-eating contests as proof of the desire to excel. (one word)`,
        answers: [`pie`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Launching a reading challenge for a class. Which rule breaks the spirit of it?`,
        lines: [
          `Everyone sets their own target for the month.`,
          `A board shows how many pages the whole class has read.`,
          `The lowest reader each week has to stand up and explain why.`,
        ],
        bug: 2,
        fix: `Celebrate anyone who beats their own target.`,
        explanation: `Public shaming turns the game into fear. Keep it a dare, never a humiliation.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their finding.`,
        pairs: [
          [`Harvey Firestone`, `Pay alone never holds good people`],
          [`Frederick Herzberg`, `The work itself motivates most`],
          [`Charles Schwab`, `Stimulate the desire to excel`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what's the deepest urge in human nature, according to Dewey?`,
        options: [
          { text: `The desire to be important` },
          { text: `The desire to win`, why: `Winning feeds it, but Dewey's phrase was "important".` },
          { text: `The desire for money`, why: `Not his phrase.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a challenge, not a threat.`,
        tiles: [`I`, `think`, `you`, `can`, `crack`, `this.`],
        distractors: [`better`],
      },
      {
        kind: `mcq`,
        prompt: `Your volunteer group is losing members because the work feels like a chore. What does this lesson suggest?`,
        options: [
          { text: `Remind them of their commitment`, why: `Duty without the game rarely holds people.` },
          { text: `Turn it into a game: set a group goal, show progress, celebrate each milestone, let people own a piece` },
          { text: `Offer gift cards`, why: `Small rewards help, but pay alone doesn't hold good people.` },
        ],
        answer: 1,
        explanation: `The game itself, the chance to excel and see progress, is what keeps people coming back.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: pick one dull task, yours or a team's, and turn it into a game: a target, a record, a scoreboard. Did it feel different?`,
    starters: [`The dull task was...`, `I turned it into a game by...`, `It felt...`],
  },
  deepen: {
    title: `Your own game`,
    summary: `What part of your work or study could become a game you'd actually enjoy winning? Firestone and Herzberg would say that's where your best effort is hiding.`,
  },
  notes: `Source: Carnegie, Part Three ch. 12: Harvey S. Firestone ("pay and pay alone... it was the game itself"), Frederic Herzberg's study of work attitudes (the work itself), "that is what every successful person loves: the game". The challenge-vs-pressure line synthesises chs. 12 and 8 (the campfire). Retold in our own words.`,
};

export default lesson;
