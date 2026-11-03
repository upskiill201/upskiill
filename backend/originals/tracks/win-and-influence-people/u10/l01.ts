import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 1 (Story) — Rule 28: give the other person a fine reputation to live up to. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `Give a Dog a Good Name`,
  summary: `A good mechanic's work had started to slip: slower jobs, lower standards. His manager could fire him or shout at him. He did neither. He reminded the mechanic who he'd always been.`,
  minutes: 11,
  outcomes: [
    `Give someone a reputation to live up to`,
    `Act as if the quality you want is already there`,
    `Correct a slipping performer without resentment`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Bill the mechanic`,
      beats: [
        { speaker: `narrator`, text: `Henry Henke was service manager at a large truck dealership. One of his mechanics, Bill, had been doing unsatisfactory work lately. Firing him wouldn't solve anything. Bawling him out would only cause resentment.` },
        { speaker: `narrator`, text: `So Henke called him in for a heart-to-heart. "Bill, you're a fine mechanic. You've been in this line of work a good number of years. You've repaired a lot of vehicles to customers' satisfaction. We've had plenty of compliments about your work."` },
        { speaker: `narrator`, text: `"Yet lately, the time you take on each job has been growing, and the work isn't up to your own old standards. Because you've been such an outstanding mechanic, I felt sure you'd want to know, and perhaps together we can find a way to fix it."` },
      ],
      choice: {
        prompt: `What did Bill do?`,
        options: [
          { text: `Got defensive and quit`, outcome: `There was nothing to defend against. He'd been praised.` },
          { text: `Said he hadn't realised he'd slipped, promised to improve, and became a fast, thorough mechanic again`, outcome: `That's it. With that reputation to live up to, how could he do anything else?`, best: true },
          { text: `Asked for a pay rise`, outcome: `He simply rose to the standard he'd been reminded of.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Assume a virtue`,
      html:
        `<p>The president of a great locomotive company, Samuel Vauclain, said the average person can be led readily if you have their respect and show that you respect them for some kind of ability.</p>` +
        `<p>In short, if you want to improve someone in a certain way, act as though that quality were already one of their outstanding characteristics.</p>` +
        `<p>Shakespeare wrote: "Assume a virtue, if you have it not." It may be just as well to assume, and say openly, that other people have the virtue you want them to develop. Give them a fine reputation to live up to, and they'll make enormous efforts rather than see you disappointed.</p>` +
        `<p>There's an old saying: give a dog a bad name and you might as well hang him. Give him a good name, and see what happens.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 28: Give the other person a fine reputation to live up to. Talk to the person you know they can be.`,
    },
  ],
  apply: {
    scenario: `Rule 28: A fine reputation.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Henke begin his talk with Bill?`,
        options: [
          { text: `By reminding him what a fine mechanic he'd always been` },
          { text: `By listing his recent mistakes`, why: `He began with Bill's reputation.` },
          { text: `By warning him he might be fired`, why: `No threats.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Shakespeare's line.`,
        template: `Assume a [[1]], if you have it [[2]].`,
        blanks: [[`virtue`], [`not`]],
        distractors: [`role`, `all`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Give a dog a bad ________ and you might as well hang him. (one word)`,
        answers: [`name`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Fine reputation or bad name?`,
        groups: [`Fine reputation`, `Bad name`],
        items: [
          { text: `"You've always been the most reliable person on this team."`, group: 0 },
          { text: `"You're always late."`, group: 1 },
          { text: `"I know how much you care about getting details right."`, group: 0 },
          { text: `"You're so careless."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did Vauclain say makes people easy to lead?`,
        options: [
          { text: `Having their respect and showing you respect them for some ability` },
          { text: `Paying them well`, why: `He named respect.` },
          { text: `Strict rules`, why: `He named respect for their abilities.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Talking to a teammate whose work has slipped. Which line gives them a bad name instead?`,
        lines: [
          `Your reports have always been the most thorough on the team.`,
          `Lately they've been a bit rushed, which isn't like you.`,
          `I guess you've just stopped caring.`,
        ],
        bug: 2,
        fix: `I know you'll want them back to your usual standard.`,
        explanation: `It hands them a bad name to live down to. Henke reminded Bill who he really was.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their idea.`,
        pairs: [
          [`Henry Henke`, `Reminded Bill of his old standards`],
          [`Samuel Vauclain`, `Respect people for some ability`],
          [`Shakespeare`, `Assume a virtue`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 9): what's Rule 27?`,
        options: [
          { text: `Praise the slightest improvement and every improvement` },
          { text: `Give people a good reputation`, why: `That's Rule 28.` },
          { text: `Let them save face`, why: `That's Rule 26.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a fine reputation to live up to.`,
        tiles: [`I`, `know`, `you're`, `someone`, `who`, `keeps`, `promises.`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `Your usually tidy flatmate has let the kitchen go for weeks. What's the Rule 28 move?`,
        options: [
          { text: `"You've become such a slob."`, why: `A bad name. They'll live down to it.` },
          { text: `"You've always been the tidy one here, honestly. Is everything okay lately?"` },
          { text: `Clean up and sulk`, why: `Resentment, and nothing changes.` },
        ],
        answer: 1,
        explanation: `Remind them of their good name, and they'll want to live up to it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: tell someone the good quality you see in them, especially one you'd like to see more of. Who, what did you say, and did they live up to it?`,
    starters: [`I told... that they're...`, `Since then...`],
  },
  deepen: {
    title: `The name you give`,
    summary: `Think about the labels you use for the people around you: "the lazy one", "always late", "difficult". This week, choose a good name for one of them, say it, and watch what happens.`,
  },
  notes: `Source: Carnegie, Part Four ch. 7 "Give a Dog a Good Name": Henry Henke and the mechanic Bill (Lowell, Indiana, quoted in paraphrase), Samuel Vauclain of the Baldwin Locomotive Works, Shakespeare's "Assume a virtue, if you have it not", the "bad name" saying. Retold in our own words.`,
};

export default lesson;
