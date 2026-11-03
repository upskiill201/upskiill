import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 7 (Story) — Rule 21: throw down a challenge. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `Chalk on the Floor`,
  summary: `A steel mill kept missing its targets. The manager had coaxed, pushed, sworn and threatened. Charles Schwab asked for a piece of chalk, wrote one number on the floor, and walked away without a word.`,
  minutes: 11,
  outcomes: [
    `Explain how a challenge appeals to the desire to excel`,
    `Use friendly competition to lift performance`,
    `Tell a healthy challenge from pressure`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The mill`,
      beats: [
        { speaker: `narrator`, text: `One of Schwab's mill managers couldn't get his men to meet their targets. "I've coaxed them, pushed them, sworn at them, threatened to fire them," he said. "Nothing works."` },
        { speaker: `narrator`, text: `It was the end of the day shift, just before the night shift came on. Schwab asked for a piece of chalk, turned to the nearest worker and asked how many heats, batches of steel, his shift had made that day. "Six."` },
        { speaker: `narrator`, text: `Without another word, Schwab chalked a big "6" on the floor and walked away. When the night shift arrived and asked what it meant, the day shift told them: the big boss asked how many heats we made, and chalked it on the floor.` },
      ],
      choice: {
        prompt: `What did Schwab find the next morning?`,
        options: [
          { text: `The 6 had been rubbed out and nothing replaced it`, outcome: `Someone did rub it out, but not for nothing.` },
          { text: `The night shift had replaced the 6 with a big 7`, outcome: `That's it. So the night shift thought they were better? The day shift went at it and left a swaggering "10". Soon the lagging mill was out-producing every other mill in the plant.`, best: true },
          { text: `The workers had complained to the union`, outcome: `They were too busy trying to beat each other.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The desire to excel`,
      html:
        `<p>Schwab explained it himself: the way to get things done is to stimulate competition. Not in a grubby, money-grabbing way, but in the desire to excel.</p>` +
        `<p>The desire to excel! The challenge! Throwing down the gauntlet. It's an infallible way of appealing to people of spirit.</p>` +
        `<p>That's what makes footraces, hog-calling contests and pie-eating competitions. The desire to excel. The desire to feel important.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 21: Throw down a challenge. People of spirit will rise to it, not for money but for the chance to excel.`,
    },
  ],
  apply: {
    scenario: `Rule 21: Throw down a challenge.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What had the mill manager already tried?`,
        options: [
          { text: `Coaxing, pushing, swearing and threats` },
          { text: `A friendly competition`, why: `That was Schwab's idea.` },
          { text: `Higher pay`, why: `He'd used pressure, not pay.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `What number did Schwab chalk on the floor? (a number)`,
        answers: [`6`, `six`],
        placeholder: `A number`,
      },
      {
        kind: `orderLines`,
        prompt: `The numbers on the floor, in order.`,
        lines: [`6, chalked by Schwab`, `7, from the night shift`, `10, from the day shift`],
      },
      {
        kind: `fillBlank`,
        prompt: `Schwab's principle.`,
        template: `Stimulate [[1]], not in a money-getting way, but in the desire to [[2]].`,
        blanks: [[`competition`], [`excel`]],
        distractors: [`fear`, `win money`],
      },
      {
        kind: `sortGroups`,
        prompt: `Challenge or pressure?`,
        groups: [`Challenge`, `Pressure`],
        items: [
          { text: `"Last month we hit 40. Think we can beat it?"`, group: 0 },
          { text: `"Hit 50 or there'll be consequences."`, group: 1 },
          { text: `A friendly scoreboard between two teams`, group: 0 },
          { text: `Swearing at people until they work faster`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `How did Schwab create the challenge?`,
        options: [
          { text: `He announced a contest with prizes`, why: `He said nothing at all.` },
          { text: `He chalked one number on the floor and walked away` },
          { text: `He fired the slowest worker`, why: `No threats were needed.` },
        ],
        answer: 1,
      },
      {
        kind: `findBug`,
        prompt: `A message to your study group. Which line turns a challenge into pressure?`,
        lines: [
          `Last week we averaged 70 on the practice test.`,
          `Bet we can hit 80 by Friday.`,
          `Anyone below 75 is letting the whole group down.`,
        ],
        bug: 2,
        fix: `Let's post our scores and cheer each other on.`,
        explanation: `Shaming the low scorers turns excitement into fear. The chalk was a dare, not a threat.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match the rule to its number.`,
        pairs: [
          [`Rule 19`, `Appeal to the nobler motives`],
          [`Rule 20`, `Dramatise your ideas`],
          [`Rule 21`, `Throw down a challenge`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what did Schwab say kills ambition faster than anything?`,
        options: [
          { text: `Criticism from superiors` },
          { text: `Low pay`, why: `He named criticism.` },
          { text: `Long hours`, why: `He named criticism from above.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your support team's reply times are slow and reminders haven't helped. What would Schwab do?`,
        options: [
          { text: `Send another firm reminder`, why: `More of the manager's coaxing and pushing.` },
          { text: `Post yesterday's average reply time on the team board, and say nothing else` },
          { text: `Warn that slow replies will affect reviews`, why: `Pressure. Sullen compliance at best.` },
        ],
        answer: 1,
        explanation: `A visible number invites people of spirit to beat it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: set one friendly challenge today, for yourself, your team, your family. What was the number to beat, and what happened?`,
    starters: [`My challenge was...`, `The number to beat was...`, `What happened:...`],
  },
  deepen: {
    title: `Your own chalk`,
    summary: `Write today's number for something you want to improve, steps, pages, reply time, somewhere you'll see it tomorrow. Then try to beat it. The desire to excel works on you too.`,
  },
  notes: `Source: Carnegie, Part Three ch. 12 "When Nothing Else Works, Try This": Charles Schwab, the mill manager, chalk "6", night shift "7", day shift "10", Schwab's quote on stimulating competition in the desire to excel, "footraces and hog-calling and pie-eating contests". Retold in our own words.`,
};

export default lesson;
