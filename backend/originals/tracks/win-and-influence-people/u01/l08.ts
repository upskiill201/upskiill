import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 (Practice) — Rule 3 in writing: talk about what they want and show them how to get it. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `Talk About What They Want`,
  summary: `His hotel tripled the rent after the tickets were printed. He didn't complain or plead. He took out a sheet of paper, drew a line down the middle, and talked only about what the manager wanted.`,
  minutes: 12,
  outcomes: [
    `Rewrite a request so it leads with the other person's gain`,
    `Use an advantages and disadvantages list to persuade`,
    `See a situation from the other person's angle as well as your own`,
  ],
  learn: [
    {
      kind: `explore`,
      title: `A letter that asks for a favour`,
      text: `Dear station manager, our agency wants to keep its place as the leader in radio advertising. We are the biggest agency in the country. We want the latest information on your station, so please put us on your preferred list and reply promptly. It will be mutually helpful.`,
      hotspots: [
        { phrase: `our agency wants`, note: `Who cares what you want? The manager is worried about their own problems.` },
        { phrase: `We are the biggest agency`, note: `Boasting about your size makes the reader feel small. They're interested in how big THEY are.` },
        { phrase: `put us on your preferred list`, note: `A favour, asked without even a please, from someone who just made them feel unimportant.` },
        { phrase: `reply promptly`, note: `An order. To someone who doesn't work for you.` },
        { phrase: `mutually helpful`, note: `At last, a hint of what's in it for them, but vague, and right at the end.` },
      ],
    },
    {
      kind: `story`,
      title: `The ballroom`,
      beats: [
        { speaker: `narrator`, text: `Carnegie rented a hotel ballroom in New York for twenty nights each season to give lectures. One season, after all the tickets were printed and sold, the hotel told him the rent would almost triple.` },
        { speaker: `narrator`, text: `He didn't storm in. A few days later he went to see the manager and said he'd been a bit shocked, but he didn't blame him at all. In his position he'd probably have done the same. His job was to make the hotel as much profit as he could.` },
        { speaker: `narrator`, text: `Then he took a sheet of paper, drew a line down the middle, and headed one side "Advantages" and the other "Disadvantages". Under advantages he wrote: the ballroom would be free to rent for dances and conventions, which pay far more.` },
        { speaker: `narrator`, text: `Under disadvantages: Carnegie couldn't pay the new rent, so the hotel would lose his money entirely. And it would lose thousands of educated people walking through its doors, better advertising than it could buy in the papers. He handed over the sheet and asked the manager to think it over.` },
      ],
      choice: {
        prompt: `What did the hotel do?`,
        options: [
          { text: `Kept the triple rent`, outcome: `It didn't, because Carnegie had made the manager see it from his own side.` },
          { text: `Raised it by fifty per cent instead of three hundred`, outcome: `That's it. And Carnegie hadn't said one word about what he wanted.`, best: true },
          { text: `Cancelled his booking`, outcome: `No. The disadvantages list made that the worst option for the hotel.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>Henry Ford said that if there's any one secret of success, it's the ability to see things from the other person's point of view as well as your own. It's so simple. And yet most of us ignore it most of the time.</p>` +
        `<p>A woman named Barbara needed to move to Phoenix for her son's health. She wrote to twelve banks. She didn't say what she wanted. She said how her ten years of banking could help a growing bank like theirs. Eleven of the twelve invited her for an interview.</p>` +
        `<p>And remember: this isn't a trick to get people to act against their own interest. Both sides should gain. The hotel got a fair deal, Carnegie kept his lectures. The bank got a good employee, Barbara got her job.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before you send any request, find the sentence about what THEY gain and move it to the top.`,
    },
  ],
  apply: {
    scenario: `Rule 3 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Carnegie start his talk with the hotel manager?`,
        options: [
          { text: `By saying the rise was outrageous`, why: `That would have started an argument.` },
          { text: `By saying he didn't blame him; in his shoes he'd have done the same` },
          { text: `By threatening to go elsewhere`, why: `He let the list make that point for him.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Carnegie's list: which column did each point go in?`,
        groups: [`Advantages to the hotel`, `Disadvantages to the hotel`],
        items: [
          { text: `Ballroom free for dances and conventions`, group: 0 },
          { text: `Losing Carnegie's rent altogether`, group: 1 },
          { text: `Losing crowds of people who see the hotel`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `How much did the rent finally go up?`,
        options: [
          { text: `Three hundred per cent`, why: `That was the original demand.` },
          { text: `Fifty per cent` },
          { text: `Not at all`, why: `It did rise, but far less.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Henry Ford's secret.`,
        template: `See things from the other person's [[1]] of view as well as your [[2]].`,
        blanks: [[`point`], [`own`]],
        distractors: [`side`, `boss's`],
      },
      {
        kind: `findBug`,
        prompt: `A job application email. Which line is all about the writer?`,
        lines: [
          `Your team's new app launch caught my eye.`,
          `I really need a job closer to home, so this would suit me perfectly.`,
          `I've shipped three apps used by over a million people, and I'd love to help with yours.`,
        ],
        bug: 1,
        fix: `My last app cut support tickets by a third, which could help your launch.`,
        explanation: `The bank letter that got eleven interviews never said what the writer needed. It said how she could help.`,
      },
      {
        kind: `typeAnswer`,
        prompt: `Barbara wrote to twelve banks. How many invited her for an interview? (a number)`,
        answers: [`11`, `eleven`],
        placeholder: `A number`,
      },
      {
        kind: `orderLines`,
        prompt: `Rewrite a request the Carnegie way, in order.`,
        lines: [`Show you understand their position`, `Say what they gain`, `Say what they'd lose if things stay as they are`, `Let them decide`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match the hotspot in the bad letter to the problem.`,
        pairs: [
          [`"Our agency wants"`, `Talks about the writer's wants`],
          [`"We are the biggest"`, `Makes the reader feel small`],
          [`"Reply promptly"`, `Gives an order to a stranger`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Lead with their gain: you want your landlord to fix the heating.`,
        tiles: [`Fixing`, `it`, `now`, `stops`, `damp`, `damaging`, `your`, `walls.`],
        distractors: [`I'm`, `freezing.`],
      },
      {
        kind: `mcq`,
        prompt: `Your manager wants you in the office five days a week; you want three. Which opening follows this lesson?`,
        options: [
          { text: `"Commuting five days is ruining my life."`, why: `True for you, but it's only your want.` },
          { text: `"I can see why you want the team together. Could we look at what three days would gain and lose for the team?"` },
          { text: `"Other companies let people work from home."`, why: `Comparisons put people on the defensive.` },
        ],
        answer: 1,
        explanation: `Start from their position, then lay out the gains and losses for THEM, like the ballroom list.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: rewrite one message you were about to send so that its first sentence is about what the other person gains. What was the old first line, and what's the new one?`,
    starters: [`My old first line was...`, `My new first line is...`],
  },
  deepen: {
    title: `The line down the middle`,
    summary: `Next time you need someone to change their mind, try Carnegie's sheet: draw a line, write their advantages on one side and their disadvantages on the other, then hand it over and let them decide.`,
  },
  notes: `Source: Carnegie, Part One ch. 3: the radio agency letter with Carnegie's bracketed reactions (paraphrased as hotspots), the hotel ballroom rent (twenty nights, ~300% rise, advantages/disadvantages sheet, final 50%), Henry Ford quote, Barbara Anderson's letter to twelve Phoenix banks (eleven interviews), both parties should gain. Retold in our own words.`,
};

export default lesson;
