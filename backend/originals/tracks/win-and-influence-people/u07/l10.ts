import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 10 (Finale, Unit Challenge) — the team that gave up; Rules 19–21. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Team That Gave Up`,
  summary: `You've inherited a volunteer team that has stopped believing. A fundraiser is weeks away, sign-ups are dismal, and your best volunteer wants to quit. Can you move them without pushing?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Use nobler motives, dramatisation and challenge together`,
    `Revive a discouraged group without pressure`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Move people`,
      html:
        `<p>Three rules for moving people. Appeal to the nobler motives. Dramatise your ideas. Throw down a challenge.</p>` +
        `<p>Today you take over a volunteer team running a community food bank fundraiser. Morale is on the floor.</p>`,
    },
    {
      kind: `story`,
      title: `The first meeting`,
      beats: [
        { speaker: `narrator`, text: `Eight tired volunteers sit in a cold hall. Last year's fundraiser raised half its target. Several say there's no point trying again.` },
      ],
      choice: {
        prompt: `How do you open?`,
        options: [
          { text: `"We need to raise more this year or the food bank's in trouble."`, outcome: `They nod wearily. A stated truth they already knew.` },
          { text: `Put a full bag of groceries on the table: "This feeds a family for a week. Last year you filled 300 of these. This year, what if we filled 400?"`, outcome: `People sit up. Someone says, "We could do 400." The bag makes it real; the number makes it a game.`, best: true },
          { text: `"Anyone not committed can leave now."`, outcome: `Two people leave. The rest feel threatened.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `The volunteer who wants to quit`,
      beats: [
        { speaker: `narrator`, text: `Your most experienced volunteer, Amaka, tells you privately she's thinking of quitting. She's tired of doing everything herself.` },
      ],
      choice: {
        prompt: `What do you say?`,
        options: [
          { text: `"We really can't manage without you."`, outcome: `True, but it's about your need. She feels trapped, not valued.` },
          { text: `"I don't blame you. You've carried this for years. You're the reason families got fed. Would you lead a team of new volunteers so it's not all on you?"`, outcome: `She stays. Sympathy, her nobler motive, and a new challenge worthy of her.`, best: true },
          { text: `"Everyone's tired, that's no excuse."`, outcome: `She quits that evening.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Two weeks out`,
      beats: [
        { speaker: `narrator`, text: `Sign-ups have stalled. Two neighbourhoods are collecting donations, but neither is pulling ahead.` },
      ],
      choice: {
        prompt: `What's your move?`,
        options: [
          { text: `Send a firm reminder to both teams`, outcome: `The manager's coaxing and pushing from the steel mill. Nothing changes.` },
          { text: `Put up a board in the hall showing each neighbourhood's total, and say nothing else`, outcome: `By the weekend each team has overtaken the other twice. You hit 430 bags. Chalk on the floor works in a food bank too.`, best: true },
          { text: `Promise a prize to the winners`, outcome: `It helps a little. But pay alone never holds good people. The game does.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 19 to 21.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did the bag of groceries work better than "we need to raise more"?`,
        options: [
          { text: `It made the point vivid and real` },
          { text: `It was a gift`, why: `It was a dramatisation.` },
          { text: `It was cheaper`, why: `It worked because people could see it.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Nobler motive`, `Dramatise`, `Challenge`],
        items: [
          { text: `"You're the reason families got fed."`, group: 0 },
          { text: `A full grocery bag on the table`, group: 1 },
          { text: `"What if we filled 400?"`, group: 2 },
          { text: `A board showing each neighbourhood's total`, group: 2 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `This chapter's rules.`,
        template: `Appeal to the [[1]] motives. [[2]] your ideas. Throw down a [[3]].`,
        blanks: [[`nobler`], [`Dramatise`, `dramatise`, `Dramatize`, `dramatize`], [`challenge`]],
        distractors: [`selfish`, `threat`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`"A man of your word"`, `Nobler motive`],
          [`Thirty-two jars of cold cream`, `Dramatise`],
          [`Chalk on the mill floor`, `Friendly competition`],
          [`"It'll take a big person"`, `A challenge to overcome fear`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Which line from Amaka's conversation was the nobler motive?`,
        options: [
          { text: `"You're the reason families got fed."` },
          { text: `"I don't blame you."`, why: `That's sympathy, Rule 18.` },
          { text: `"Would you lead a team?"`, why: `That's the challenge.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Herzberg found the biggest motivator was the ________ itself. (one word)`,
        answers: [`work`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your fundraiser update email. Which line undoes the challenge?`,
        lines: [
          `We've filled 310 bags, more than all of last year.`,
          `The Riverside team is just ahead of Hilltop.`,
          `Hilltop, frankly, you're embarrassing us.`,
        ],
        bug: 2,
        fix: `Hilltop, think you can catch them by Sunday?`,
        explanation: `Shaming turns the game into pressure. Keep it a dare.`,
      },
      {
        kind: `orderLines`,
        prompt: `Reviving a discouraged team, in order.`,
        lines: [`Make the purpose vivid`, `Appeal to why it matters`, `Set a number worth beating`, `Show the score and let them chase it`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 5): what's Rule 14?`,
        options: [
          { text: `Get the other person saying "yes, yes" immediately` },
          { text: `Throw down a challenge`, why: `That's Rule 21.` },
          { text: `Dramatise your ideas`, why: `That's Rule 20.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): how did Ben Franklin carry his points despite being a poor speaker?`,
        options: [
          { text: `He never stated opinions as fixed truth or contradicted people directly` },
          { text: `He argued harder`, why: `He stopped arguing.` },
          { text: `He spoke louder`, why: `He spoke more modestly.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the challenge you set at the first meeting.`,
        tiles: [`What`, `if`, `we`, `filled`, `400`, `this`, `year?`],
        distractors: [`must`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your company's staff ignore a new recycling scheme despite emails. Which plan uses all three rules?`,
        options: [
          { text: `A strongly worded email about compliance`, why: `Pressure, and they already ignore emails.` },
          { text: `Show a week of unsorted rubbish in a clear bin, say you know people care about the planet their kids inherit, and put up a floor-by-floor recycling score` },
          { text: `Fine anyone who gets it wrong`, why: `A threat. Sullen compliance at best.` },
        ],
        answer: 1,
        explanation: `The bin dramatises, the children are the nobler motive, the scoreboard is the challenge.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 19 to 21: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `Twenty-one rules`,
    summary: `You've now learned twelve ways to win people to your way of thinking, and twenty-one rules in all. Before the final part of the course, leadership, write down the three rules you use most and the three you find hardest. Practise the hard ones this week.`,
  },
  notes: `Synthesis of Part Three chs. 10–12 with the weekly review. Scenario is ours. Retold in our own words.`,
};

export default lesson;
