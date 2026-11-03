import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8 (Practice) — Rule 12 at work: "It was my fault", no alibis. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `"It Was My Fault"`,
  summary: `His boss blamed personnel, then accounting, then two other people. Each time, the young man said the same four words. It ended the storm, and earned him a respect he never lost.`,
  minutes: 11,
  outcomes: [
    `Admit a mistake plainly, without alibis`,
    `Hold your ground when others try to take the blame off you`,
    `See how owning a mistake builds respect`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The overpaid employee`,
      before: {
        label: `The temptation`,
        text: `Bruce Harvey wrongly approved full pay for an employee on sick leave. Fixing it meant cutting the employee's next pay cheque, which would hurt him badly. Paying it back slowly needed the boss's approval, and Bruce knew the boss would explode. He could blame the system.`,
      },
      after: {
        label: `What he did`,
        text: `He told his boss he'd made a mistake and gave him all the facts. The boss blamed personnel. Bruce said it was his fault. The boss blamed accounting. Bruce said it was his fault. The boss blamed two other people. Each time: "It was my fault." Finally the boss said, "All right, it was your fault. Now fix it."`,
      },
      notes: [
        `It was fixed, and nobody else got into trouble.`,
        `Bruce said he felt great, and his boss respected him more from then on.`,
      ],
    },
    {
      kind: `story`,
      title: `"All this has been my fault"`,
      beats: [
        { speaker: `narrator`, text: `July 1863, Gettysburg. General Pickett leads one of the most famous charges in history: thousands of men sweeping across open fields towards the enemy lines, banners flying, cannon fire tearing through their ranks.` },
        { speaker: `narrator`, text: `They reach the stone wall on the ridge, plant their flags for a moment, and are cut down. In minutes, four out of five of Pickett's men have fallen. It's the beginning of the end for General Robert E. Lee's army.` },
        { speaker: `narrator`, text: `Lee could have found a dozen excuses. Some commanders had failed him. The cavalry arrived too late. This went wrong and that went wrong. As the beaten, bloody survivors staggered back, Lee rode out alone to meet them.` },
      ],
      choice: {
        prompt: `What did Lee say to his men?`,
        options: [
          { text: `"Your commanders failed you."`, outcome: `He could have. He didn't.` },
          { text: `"All this has been my fault. I and I alone have lost this battle."`, outcome: `That's it. Few generals in history have had the courage to say that. He even offered his resignation.`, best: true },
          { text: `"We'll win next time."`, outcome: `He didn't reach for comfort. He reached for the blame.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>Any fool can try to defend their mistakes, and most fools do. But admitting them lifts you above the crowd and gives you a feeling of real dignity.</p>` +
        `<p>There's another benefit: owning a mistake clears the air of guilt and defensiveness, and often helps solve the problem the mistake created.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `"It was my fault" works best on repeat. When someone offers you an excuse, don't take it. Say it again.`,
    },
  ],
  apply: {
    scenario: `Rule 12 at work.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How many times did Bruce's boss try to blame someone else?`,
        options: [
          { text: `Once`, why: `More than that.` },
          { text: `Several times: personnel, accounting, two other people` },
          { text: `Never`, why: `He kept looking for someone else to blame.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `What four words did Bruce keep repeating? "It was my ________." (one word)`,
        answers: [`fault`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `What did Lee say after Pickett's charge failed?`,
        options: [
          { text: `"All this has been my fault."` },
          { text: `"The cavalry let us down."`, why: `He could have said that. He didn't.` },
          { text: `"Pickett was too reckless."`, why: `He blamed no one but himself.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Alibi or ownership?`,
        groups: [`Alibi`, `Ownership`],
        items: [
          { text: `"The software crashed."`, group: 0 },
          { text: `"I didn't back it up. That's on me."`, group: 1 },
          { text: `"Nobody reminded me."`, group: 0 },
          { text: `"I forgot, and I'll set a reminder from now on."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The book's line.`,
        template: `Any fool can try to [[1]] their mistakes, and most fools [[2]].`,
        blanks: [[`defend`], [`do`]],
        distractors: [`admit`, `don't`],
      },
      {
        kind: `findBug`,
        prompt: `Your apology to a client for a late delivery. Which line is an alibi?`,
        lines: [
          `I'm sorry the order was three days late.`,
          `Our courier has been terrible lately, which isn't really on us.`,
          `It was our job to warn you, and we didn't.`,
        ],
        bug: 1,
        fix: `We should have built in more time.`,
        explanation: `Blaming the courier is the cavalry excuse. Lee wouldn't have used it.`,
      },
      {
        kind: `orderLines`,
        prompt: `Owning a mistake, in order.`,
        lines: [`Go to them first`, `Say plainly what you did`, `Turn down any excuse they offer you`, `Fix it`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their words.`,
        pairs: [
          [`Bruce Harvey`, `"It was my fault", again and again`],
          [`Robert E. Lee`, `"I and I alone have lost this battle"`],
          [`Ferdinand Warren`, `"There's no excuse for my blunder"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did David hand Rose at the charity concert?`,
        options: [
          { text: `The cash box` },
          { text: `A thank-you card`, why: `It was a symbol of authority.` },
          { text: `The drinks machine`, why: `That went to Jane.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your team missed a target. Your manager asks what went wrong, and you can see two teammates dropped the ball. You led the project. What does this lesson suggest?`,
        options: [
          { text: `Name the two teammates; it's the truth`, why: `It may be true, but blaming down never builds a team.` },
          { text: `Say it was your responsibility as lead, then fix the process with the team privately` },
          { text: `Say it was nobody's fault`, why: `That dodges ownership. Someone led it: you.` },
        ],
        answer: 1,
        explanation: `Like Lee: the leader takes the blame. The lessons can be worked out quietly afterwards.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: admit one mistake today without a single excuse. If someone offers you a way out, don't take it. What happened?`,
    starters: [`I admitted...`, `They offered me the excuse that...`, `I said...`],
  },
  deepen: {
    title: `The dignity of owning it`,
    summary: `Think of the last time you blamed something or someone else for your mistake. Write down what you'd say now, using Lee's words as a model.`,
  },
  notes: `Source: Carnegie, Part Three ch. 3: Bruce Harvey of Albuquerque and the sick-leave overpayment, "any fool can try to defend his or her mistakes", Pickett's charge at Gettysburg and Lee's "All this has been my fault... I and I alone have lost this battle", Lee's resignation offer. Retold in our own words.`,
};

export default lesson;
