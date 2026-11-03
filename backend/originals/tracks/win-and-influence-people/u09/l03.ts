import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 3 (Pressure) — Rule 25 when it's urgent: ask the team. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Ask When It's Urgent`,
  summary: `A huge order landed on a small factory, with a delivery date that looked impossible. The manager could have ordered everyone to work faster. Instead he gathered them and asked questions.`,
  minutes: 12,
  outcomes: [
    `Use questions even under time pressure`,
    `Involve people in decisions that affect them`,
    `Turn an impossible task into a team challenge`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `Ian Macdonald's impossible order`,
      steps: [
        { title: `The problem`, body: `Ian Macdonald managed a small plant in Johannesburg making precision machine parts. A very large order came in, but with work already scheduled and so little time, he was sure they couldn't deliver on time.` },
        { title: `The temptation`, body: `He could have pushed his people to speed up and rushed the order through.` },
        { title: `Gather the team`, body: `Instead he called everyone together, explained the situation, and told them how much it would mean to the company, and to them, if they could deliver on time.` },
        { title: `Ask, don't tell`, body: `"Is there anything we can do to handle this order?" "Can anyone think of a different way to run it through the shop?" "Could we adjust hours or assignments to help?"` },
        { title: `The result`, body: `The team came up with lots of ideas and insisted he take the order. They went at it with a "we can do this" attitude. It was accepted, made and delivered on time.` },
      ],
    },
    {
      kind: `reading`,
      title: `Urgency is when orders feel most tempting`,
      html:
        `<p>When time is short, questions feel like a luxury. Just tell them what to do! But that's exactly when people's ideas and commitment matter most.</p>` +
        `<p>Macdonald's questions did three things. They gave the team ownership of the decision. They uncovered ideas he'd never have thought of. And they turned a burden handed down from above into a challenge the team chose for themselves.</p>` +
        `<p>Orders get compliance. Questions get commitment. Under pressure, you need commitment.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `When it's urgent, don't skip the questions. "How could we make this work?" gets you ideas and commitment that orders never will.`,
    },
  ],
  apply: {
    scenario: `Rule 25, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Macdonald do when the big order arrived?`,
        options: [
          { text: `Gathered the team and asked how they could handle it` },
          { text: `Turned it down`, why: `The team insisted he take it.` },
          { text: `Ordered overtime for everyone`, why: `He asked instead.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `Macdonald's approach, in order.`,
        lines: [`Call everyone together`, `Explain the situation honestly`, `Say what it would mean to them`, `Ask how it could be done`, `Let them decide`],
      },
      {
        kind: `fillBlank`,
        prompt: `The line to remember.`,
        template: `Orders get [[1]]. Questions get [[2]].`,
        blanks: [[`compliance`], [`commitment`]],
        distractors: [`results`, `excuses`],
      },
      {
        kind: `sortGroups`,
        prompt: `Urgent deadline: question or order?`,
        groups: [`Question`, `Order`],
        items: [
          { text: `"What could we drop this week to hit Friday?"`, group: 0 },
          { text: `"Everyone's working the weekend."`, group: 1 },
          { text: `"Who has ideas for speeding up testing?"`, group: 0 },
          { text: `"Just make it happen."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `In which city was Macdonald's factory? (one word)`,
        answers: [`Johannesburg`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your message to the team about a sudden deadline. Which line shuts down their ideas?`,
        lines: [
          `A client needs this by Thursday, which is tight.`,
          `It would really help the team's reputation if we made it.`,
          `I've already planned who does what, so just follow the plan.`,
        ],
        bug: 2,
        fix: `How do you think we could pull it off?`,
        explanation: `It turns a challenge into an order and wastes the team's ideas.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each question to what it uncovered.`,
        pairs: [
          [`"Can we handle this order?"`, `The team's willingness`],
          [`"A different way through the shop?"`, `New process ideas`],
          [`"Adjust hours or assignments?"`, `New ways to staff it`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 7): what's Rule 21?`,
        options: [
          { text: `Throw down a challenge` },
          { text: `Ask questions instead of orders`, why: `That's Rule 25.` },
          { text: `Appeal to nobler motives`, why: `That's Rule 19.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Macdonald's first question.`,
        tiles: [`Is`, `there`, `anything`, `we`, `can`, `do`, `to`, `handle`, `this?`],
        distractors: [`must`],
      },
      {
        kind: `mcq`,
        prompt: `Your family has to move house in two weeks, and everyone's stressed. What would Macdonald do?`,
        options: [
          { text: `Hand out a list of tasks to each person`, why: `Efficient, and everyone resents their list.` },
          { text: `Sit everyone down, explain the deadline, and ask how each person thinks they could help` },
          { text: `Do it all yourself`, why: `You'll burn out, and they'll feel shut out.` },
        ],
        answer: 1,
        explanation: `Questions turn a burden into a shared plan people commit to.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: next time something urgent comes up, ask the people involved "How could we make this work?" before deciding. What ideas came up that you hadn't thought of?`,
    starters: [`The urgent thing was...`, `I asked...`, `Ideas that came up:...`],
  },
  deepen: {
    title: `"We can do it"`,
    summary: `Macdonald's team insisted he take the order. That's the sign of a team that owns a decision. When did your team last insist on something? What question started it?`,
  },
  notes: `Source: Carnegie, Part Four ch. 4: Ian Macdonald of Johannesburg, the precision machine parts plant, the large order with a short deadline, his three questions (paraphrased), the "We can do it" attitude and on-time delivery. Retold in our own words.`,
};

export default lesson;
