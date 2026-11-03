import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 5 (Practice + Checkpoint) — Rule 20 at work; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `Pennies on the Floor`,
  summary: `A salesman told a shopkeeper his old tills were throwing money away. The words should have been enough. Then he threw a handful of coins on the floor.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Dramatise a point in a sales pitch, report or request`,
    `Turn data into something people can see and touch`,
    `Combine Rules 19 and 20`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The market report`,
      before: {
        label: `First visit: figures`,
        text: `James Boynton had to present a long market study to one of the toughest men in advertising. He brought tables of figures. They got stuck arguing about the research methods. Boynton won the argument, but the time ran out and nothing was achieved.`,
      },
      after: {
        label: `Second visit: thirty-two jars`,
        text: `This time, while the man finished a phone call, Boynton opened a suitcase and tipped thirty-two jars of cold cream onto his desk, every rival product, each tagged with the research findings. No argument. The man picked them up one by one, read the tags and asked questions. He'd allowed ten minutes. An hour later they were still talking.`,
      },
      notes: [
        `Same facts both times.`,
        `The second time he used showmanship, and what a difference it made.`,
      ],
    },
    {
      kind: `reading`,
      title: `Three more dramatisations`,
      html:
        `<p><strong>The pennies.</strong> Jim Yeamans saw a grocer using old-fashioned tills. He told him: "You're literally throwing away pennies every time a customer goes through your line," and threw a handful of pennies on the floor. The words alone should have mattered. The sound of coins hitting the floor stopped the grocer cold. He replaced every till.</p>` +
        `<p><strong>The form.</strong> Mary Catherine Wolf needed to see her boss, but his secretary kept saying he was too busy. On Friday she put a formal letter in his in-tray with a reply form: "Ms. Wolf, I will be able to see you on ___ at ___. I will give you ___ minutes." By 2 p.m. it was back, filled in by him personally: ten minutes that afternoon. They talked for over an hour.</p>` +
        `<p><strong>The train.</strong> A father couldn't get his young children to tidy their toys. So he invented a train: his son drove his tricycle as the engine driver, his daughter's wagon was the coal truck, and she loaded all the "coal" before riding round the room. The room was tidy, with no lectures and no threats.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Ask: what could they see, hear or hold that makes my point for me?`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 19 and 20.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Boynton's first visit fail?`,
        options: [
          { text: `They argued about research methods and ran out of time` },
          { text: `His facts were wrong`, why: `Same facts worked the second time.` },
          { text: `The man refused to see him`, why: `He saw him, and argued.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `How many jars of cold cream did Boynton tip onto the desk? (a number)`,
        answers: [`32`, `thirty-two`, `thirty two`],
        placeholder: `A number`,
      },
      {
        kind: `mcq`,
        prompt: `What did Yeamans throw on the floor?`,
        options: [
          { text: `A handful of pennies` },
          { text: `His order form`, why: `It was coins.` },
          { text: `The old till receipt`, why: `It was pennies.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Mary Catherine Wolf's form.`,
        template: `I will be able to see you on ___ at ___. I will give you ___ [[1]] of my [[2]].`,
        blanks: [[`minutes`], [`time`]],
        distractors: [`hours`, `money`],
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule is this?`,
        groups: [`Nobler motive`, `Dramatise`],
        items: [
          { text: `"Adjust the bill as you think fair."`, group: 0 },
          { text: `Coins hitting the floor`, group: 1 },
          { text: `"You're a man of your word."`, group: 0 },
          { text: `A toy train that carries the toys away`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Your pitch to cut office printing. Which step is the dull one?`,
        lines: [
          `Stack one month of wasted printouts on the meeting table.`,
          `Read out a paragraph about paper costs.`,
          `Put the cost of the stack on a sticky note on top.`,
        ],
        bug: 1,
        fix: `Let them pick up the stack and feel its weight.`,
        explanation: `A paragraph of costs is stated truth. The stack is the drama.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 2): what did James Thomas say to each customer about the bill?`,
        options: [
          { text: `Adjust it as you would if you were president of my company` },
          { text: `Pay it or face court`, why: `That's what the credit team did.` },
          { text: `We'll take half`, why: `He let them decide.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to its rule.`,
        pairs: [
          [`The tenant who kept his lease`, `Honour`],
          [`One Day, 307 pages`, `A book of one day's news`],
          [`The thirty-two jars`, `Rival products on the desk`],
          [`"My mother doesn't like it"`, `Love for a parent`],
        ],
      },
      {
        kind: `orderLines`,
        prompt: `Planning a dramatisation, in order.`,
        lines: [`Pick the one point that matters`, `Find something they can see or hold`, `Let it make the point without a lecture`, `Then let them ask questions`],
      },
      {
        kind: `tapBuild`,
        prompt: `Build Yeamans's line.`,
        tiles: [`You're`, `throwing`, `away`, `pennies`, `with`, `every`, `customer.`],
        distractors: [`dollars`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your manager keeps putting off your request for better safety gear for the warehouse team. Which approach combines Rules 19 and 20?`,
        options: [
          { text: `Send another email listing the safety rules`, why: `Stated truth, already ignored.` },
          { text: `Bring the torn gloves the team wore this month to the meeting, and say you know they care about everyone getting home safe` },
          { text: `Threaten to report it`, why: `A threat. They'll defend, not act.` },
        ],
        answer: 1,
        explanation: `The gloves dramatise it. The appeal to their care is the nobler motive.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: dramatise one point this week. Bring something people can see or hold, or make a form they fill in. What did you use, and what happened?`,
    starters: [`My point was...`, `I dramatised it by...`, `The reaction was...`],
  },
  deepen: {
    title: `On one knee`,
    summary: `Carnegie notes that the old-fashioned lover didn't just say words of love: he went down on one knee. Dramatisation works at home as well as at work. Where could a small gesture say more than words this week?`,
  },
  notes: `Source: Carnegie, Part Three ch. 11: Jim Yeamans (NCR) and the pennies, the proposal on one knee, Joe B. Fant Jr.'s toy train, Mary Catherine Wolf's form letter (ten minutes, over an hour), James B. Boynton's thirty-two jars of cold cream. Retold in our own words.`,
};

export default lesson;
