import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6 (Pressure) — Rule 14 under pressure: build an honest yes-ladder. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Build a Yes Ladder`,
  summary: `A shop that had just stopped renting bows turned a disappointed caller into a loyal customer with four questions. Today you build your own yes ladder, and learn where it stops being honest.`,
  minutes: 12,
  outcomes: [
    `Design a sequence of honest yes-questions`,
    `Keep the questions about the other person's benefit`,
    `Know when a yes ladder becomes a trap`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `How the bow shop did it`,
      steps: [
        { title: `Agree with them first`, body: `Eddie phoned to rent a bow for his visiting brother. The shop owner, pleasantly, said they no longer rented bows; they couldn't afford to.` },
        { title: `Ask about their experience`, body: `"Have you rented before?" Yes, a few years ago.` },
        { title: `Ask about the cost they know`, body: `"I expect you paid around twenty-five or thirty dollars?" Yes.` },
        { title: `Ask about what they value`, body: `"Are you the kind of person who likes to save money?" Naturally, yes.` },
        { title: `Show how the offer meets that value`, body: `A full bow set was on sale for $34.95, only a few dollars more than renting one. That's why they'd stopped renting. "Does that seem reasonable?" Yes. Eddie bought the set, more items besides, and became a regular.` },
      ],
    },
    {
      kind: `reading`,
      title: `Where it stops being honest`,
      html:
        `<p>Every yes in the bow shop was true, and every one was about Eddie: his past rentals, his money, his values. The offer genuinely saved him money. That's the yes-yes approach as Socrates used it: leading someone, step by step, to a conclusion that really is right.</p>` +
        `<p>It becomes a trap when the questions are designed to corner someone into something that doesn't serve them. That's not persuasion. It's manipulation, and the book is clear that every one of these rules must be sincere. Both sides should gain.</p>` +
        `<p>A simple test: if the other person later saw your list of questions, would they feel helped, or tricked?</p>`,
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `A yes ladder must lead somewhere good for them. If they'd feel tricked seeing your questions afterwards, don't ask them.`,
    },
  ],
  apply: {
    scenario: `Rule 14, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did the bow shop stop renting bows?`,
        options: [
          { text: `They couldn't afford to, and a full set cost only a little more` },
          { text: `Bows kept getting broken`, why: `The owner said they couldn't afford to rent.` },
          { text: `Nobody wanted to rent`, why: `Eddie wanted to.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `The bow shop's questions, in order.`,
        lines: [`Have you rented before?`, `Did it cost around thirty dollars?`, `Do you like saving money?`, `Does a full set for five dollars more seem reasonable?`],
      },
      {
        kind: `sortGroups`,
        prompt: `Honest yes ladder or trap?`,
        groups: [`Honest`, `Trap`],
        items: [
          { text: `Questions that lead to a plan that saves them money`, group: 0 },
          { text: `"You care about your family, right? So sign this pricey policy now."`, group: 1 },
          { text: `Questions that help a colleague see the risk in their own plan`, group: 0 },
          { text: `Yes-questions that hide a contract's hidden fees`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `The full bow set cost $34.95. Renting cost about how many dollars at most? (a number)`,
        answers: [`30`, `thirty`],
        placeholder: `A number`,
      },
      {
        kind: `fillBlank`,
        prompt: `The honesty test.`,
        template: `If they saw your questions later, would they feel [[1]] or [[2]]?`,
        blanks: [[`helped`], [`tricked`]],
        distractors: [`rich`, `bored`],
      },
      {
        kind: `findBug`,
        prompt: `A yes ladder to get your flatmate to share a cleaner. Which question breaks it?`,
        lines: [
          `We both hate spending Sundays cleaning, right?`,
          `And we'd both love the flat tidy when friends come over?`,
          `You wouldn't want to look like a slob, would you?`,
        ],
        bug: 2,
        fix: `So would splitting a cleaner every two weeks be worth trying?`,
        explanation: `It's a jab dressed as a question. It invites a defensive "no" and isn't honest about the goal.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 5): what was the teller's key question to the young man?`,
        options: [
          { text: `Wouldn't you want your money to go to your next of kin?` },
          { text: `Don't you trust us?`, why: `That invites a "no".` },
          { text: `Why won't you answer?`, why: `That's the old, bossy approach.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each ladder to its final yes.`,
        pairs: [
          [`Allison's motors`, `Keep your hands off them`],
          [`Eberson's bank form`, `Name your next of kin`],
          [`The bow shop`, `Buy the set instead of renting`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Build the first rung of a ladder for a tired team.`,
        tiles: [`We`, `all`, `want`, `our`, `evenings`, `back,`, `right?`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `You want your manager to approve a new tool that costs money. Which ladder is honest and strong?`,
        options: [
          { text: `"You want the team happy? You want to look modern? Then you'll approve it."`, why: `Vague flattery-questions that corner them.` },
          { text: `"We want to cut the hours spent on reports, right? Those took about forty hours last month? If this tool halves that, would it be worth a trial?"` },
          { text: `"Everyone else uses it, so..."`, why: `That's pressure, not a yes ladder.` },
        ],
        answer: 1,
        explanation: `Every yes is true, about their goals, and leads to a decision that genuinely helps them.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: plan a yes ladder for a real request you need to make this week. Write the three or four questions. Then apply the honesty test: would they feel helped?`,
    starters: [`My request is...`, `My questions: 1)... 2)... 3)...`, `Honesty test:...`],
  },
  deepen: {
    title: `Same goal`,
    summary: `The strongest first rung is almost always a shared goal: "We both want...". Practise finding the shared goal in every disagreement this week, even if you never say it out loud.`,
  },
  notes: `Source: Carnegie, Part Three ch. 5: Eddie Snow and the Oakland bow store (step-by-step yes questions, $34.95 set, became a regular customer); sincerity and both-sides-gain from Part One ch. 3 and Part Two ch. 1. The honesty test is our framing of the book's sincerity rule. Retold in our own words.`,
};

export default lesson;
