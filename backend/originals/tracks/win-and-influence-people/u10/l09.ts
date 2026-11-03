import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 9 (Pressure) — Rule 30 done honestly: the six guidelines. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `The Glad Yes`,
  summary: `You need someone to clean out a messy stockroom before visitors arrive. You could give a curt order. Or you could follow six guidelines that make even a dull job something they're glad to do.`,
  minutes: 12,
  outcomes: [
    `Use the six guidelines for changing behaviour`,
    `Phrase a request so the other person sees their benefit`,
    `Never promise what you can't deliver`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `Six guidelines for a glad yes`,
      steps: [
        { title: `Be sincere`, body: `Don't promise anything you can't deliver. Forget the benefits to yourself and focus on the benefits to the other person.` },
        { title: `Know exactly what you want`, body: `Be clear in your own mind what you want the other person to do.` },
        { title: `Be empathetic`, body: `Ask yourself what the other person really wants.` },
        { title: `Consider their benefits`, body: `What will they gain from doing what you suggest?` },
        { title: `Match the benefits to their wants`, body: `Link what they'll gain to what they actually care about.` },
        { title: `Ask in a way that shows they benefit`, body: `Put your request so they can see they'll personally gain.` },
      ],
    },
    {
      kind: `compare`,
      title: `The stockroom`,
      before: {
        label: `A curt order`,
        text: `"John, customers are coming tomorrow and I need the stockroom cleaned. Sweep it out, stack the stock neatly on the shelves and polish the counter."`,
      },
      after: {
        label: `Showing John the benefits`,
        text: `"John, we've a job that should be done right away, so we won't have it hanging over us later. I'm bringing customers in tomorrow and I'd like to show them the stockroom, but it's in poor shape. If you could sweep it, stack the stock neatly and polish the counter, it would make us look efficient, and you'll have done your part for the company's image."`,
      },
      notes: [
        `Will John be thrilled? Probably not. But happier than with the curt order, especially if he takes pride in his stockroom.`,
        `It's naive to expect a glad yes every time. But if these approaches make you even ten per cent more effective, that's your benefit.`,
      ],
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `Never promise what you can't deliver. A glad yes built on a false promise becomes a bitter no later.`,
    },
  ],
  apply: {
    scenario: `Rule 30, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What's the first of the six guidelines?`,
        options: [
          { text: `Be sincere: don't promise what you can't deliver` },
          { text: `Be firm`, why: `Sincerity comes first.` },
          { text: `Be quick`, why: `It's sincerity.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `The six guidelines, in order.`,
        lines: [`Be sincere`, `Know exactly what you want`, `Be empathetic`, `Consider their benefits`, `Match benefits to their wants`, `Ask so they see they benefit`],
      },
      {
        kind: `fillBlank`,
        prompt: `Carnegie's realistic note.`,
        template: `If you increase your successes by even [[1]] per cent, you're that much more effective as a [[2]].`,
        blanks: [[`10`, `ten`], [`leader`]],
        distractors: [`50`, `boss`],
      },
      {
        kind: `sortGroups`,
        prompt: `Honest benefit, or false promise?`,
        groups: [`Honest benefit`, `False promise`],
        items: [
          { text: `"Doing it now means it won't hang over you later."`, group: 0 },
          { text: `"Do this and you'll definitely get promoted."`, group: 1 },
          { text: `"It'll make the team look great to the client."`, group: 0 },
          { text: `"I'll give you Friday off" (you can't)`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `In the example, the job was cleaning out the ________. (one word)`,
        answers: [`stockroom`, `stock room`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Asking a teammate to cover your shift. Which line breaks guideline one?`,
        lines: [
          `I know weekends matter to you, so I'll owe you one.`,
          `You'd get the overtime rate for the Saturday.`,
          `And I'll make sure you get the next promotion.`,
        ],
        bug: 2,
        fix: `I'll cover any shift you need next month.`,
        explanation: `You can't promise a promotion. A false promise turns a glad yes into resentment later.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each guideline to the question it asks.`,
        pairs: [
          [`Be empathetic`, `What do they really want?`],
          [`Consider their benefits`, `What will they gain?`],
          [`Know what you want`, `What exactly should they do?`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the only way to get anybody to do anything?`,
        options: [
          { text: `Make them want to do it` },
          { text: `Tell them firmly`, why: `Orders get compliance at best.` },
          { text: `Pay them more`, why: `Money is one want among many.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a request that shows their benefit.`,
        tiles: [`Done`, `now,`, `it`, `won't`, `hang`, `over`, `you`, `later.`],
        distractors: [`or`, `else.`],
      },
      {
        kind: `mcq`,
        prompt: `You need your housemates to clear the hallway before a landlord inspection. Which follows the six guidelines?`,
        options: [
          { text: `"Clear the hallway by tonight."`, why: `A curt order with no benefit shown.` },
          { text: `"The landlord's inspecting Thursday. A clear hallway means we're much more likely to get our deposit back. Could we each clear our stuff tonight?"` },
          { text: `"Clear it and I'll pay your share of the rent" (you won't)`, why: `Never promise what you can't deliver.` },
        ],
        answer: 1,
        explanation: `Clear want, a true benefit they care about (the deposit), and a request that shows it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: make one request this week using all six guidelines. Write down what you wanted, what they'd gain, and how you asked.`,
    starters: [`What I wanted:...`, `Their benefit:...`, `How I asked:...`],
  },
  deepen: {
    title: `Ten per cent`,
    summary: `Carnegie admits these rules won't win every time. But ten per cent more success is ten per cent more effective. Look back at the course: where have you become at least ten per cent better with people?`,
  },
  notes: `Source: Carnegie, Part Four ch. 9: the six guidelines for changing attitudes or behaviour, the stockroom request to John (curt vs benefit version), "it is naive to believe you will always get a favorable reaction", the 10 percent remark. Retold in our own words.`,
};

export default lesson;
