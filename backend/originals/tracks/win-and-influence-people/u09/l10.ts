import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 10 (Finale, Unit Challenge) — managing someone who's struggling; Rules 25–27. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Rough First Month`,
  summary: `Your first month managing someone, and they're struggling: slow, nervous, and they just made a mistake in front of the client. Can you lead them without ordering, embarrassing or discouraging them?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Lead with questions, save face and praise progress together`,
    `Turn a struggling new hire into a confident one`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Lead without ordering`,
      html:
        `<p>Three rules for leading people. Ask questions instead of giving direct orders. Let the other person save face. Praise the slightest improvement and praise every improvement.</p>` +
        `<p>You've just become a team lead, and your new hire, Priya, is having a rough first month.</p>`,
    },
    {
      kind: `story`,
      title: `Week one`,
      beats: [
        { speaker: `narrator`, text: `Priya's reports keep coming in late. You know exactly how she should organise her week.` },
      ],
      choice: {
        prompt: `What do you say?`,
        options: [
          { text: `"Start reports on Monday and finish by Wednesday. That's how it's done."`, outcome: `She nods, and you can see she feels like a schoolchild.` },
          { text: `"How are you finding the weekly reports? Is there anything that would make them easier to get done on time?"`, outcome: `She admits she's been waiting for data from another team. You fix it together in five minutes.`, best: true },
          { text: `Say nothing and do the reports yourself`, outcome: `She never learns, and you're doing two jobs.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Week two`,
      beats: [
        { speaker: `narrator`, text: `On a client call, Priya gives a wrong delivery date. The client frowns. Everyone on the call notices.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `"No, Priya, that's wrong, it's the 14th."`, outcome: `Correct, and she's silent for the rest of the call.` },
          { text: `"Thanks, Priya. Let me just double-check the latest schedule, I think it may have moved to the 14th." Then talk privately after.`, outcome: `The client's happy, Priya keeps her dignity, and afterwards she thanks you and asks how to stay on top of schedule changes.`, best: true },
          { text: `Say nothing to avoid embarrassing her`, outcome: `The client leaves with the wrong date. Save her face AND fix it.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Week four`,
      beats: [
        { speaker: `narrator`, text: `Priya's latest report is on time for the first time, though it still has a couple of small errors.` },
      ],
      choice: {
        prompt: `What do you say first?`,
        options: [
          { text: `"Two errors on page three."`, outcome: `The whip, on the week she improved.` },
          { text: `"On time, and your summary section is the clearest I've had from anyone. That's real progress."`, outcome: `She beams. The next report is on time with no errors at all.`, best: true },
          { text: `"Great!"`, outcome: `Nice, but vague. Make it specific.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 25 to 27.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did asking Priya about the reports work better than telling her how?`,
        options: [
          { text: `It uncovered the real cause and let her keep her pride` },
          { text: `It was quicker`, why: `It was better, not just quicker.` },
          { text: `It avoided the problem`, why: `It solved it.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Ask, don't order`, `Save face`, `Praise progress`],
        items: [
          { text: `"Is anything making the reports hard?"`, group: 0 },
          { text: `"Let me double-check the schedule" on the call`, group: 1 },
          { text: `"Your summary is the clearest I've had."`, group: 2 },
          { text: `Talking about the date error privately afterwards`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `This chapter's rules.`,
        template: `Ask [[1]] instead of giving direct orders. Let the other person save [[2]]. Praise the [[3]] improvement.`,
        blanks: [[`questions`], [`face`], [`slightest`]],
        distractors: [`favours`, `biggest`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`Owen D. Young`, `Suggestions, never orders`],
          [`Steinmetz`, `A face-saving title`],
          [`Pete Barlow's dogs`, `Reward the slightest improvement`],
          [`Anna Mazzone's boss`, `Back them in public`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did the instructor threaten to do to the badly parked car?`,
        options: [
          { text: `Drag it out with a chain` },
          { text: `Have it towed`, why: `He threatened the chain himself.` },
          { text: `Let the tyres down`, why: `It was the chain.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Abilities wither under criticism and ________ under encouragement. (one word)`,
        answers: [`blossom`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your end-of-month note to Priya. Which line undoes the progress?`,
        lines: [
          `What a turnaround this month.`,
          `Your client calls have got noticeably more confident.`,
          `Just don't go back to how you were in week one.`,
        ],
        bug: 2,
        fix: `I'm really glad you're on the team.`,
        explanation: `It drags her back to her worst moment. End on confidence, not a warning.`,
      },
      {
        kind: `orderLines`,
        prompt: `Leading a struggling new hire, in order.`,
        lines: [`Ask what's making it hard`, `Fix the cause together`, `Protect their dignity when they slip`, `Praise every step forward, specifically`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 8): what's the order for a feedback conversation?`,
        options: [
          { text: `Praise, your own mistake, the issue as a question, then confidence` },
          { text: `The issue first, then praise to soften it`, why: `Praise comes first.` },
          { text: `Only praise`, why: `The issue still needs raising.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what does Rule 10 say about arguments?`,
        options: [
          { text: `The only way to get the best of one is to avoid it` },
          { text: `Win them with facts`, why: `You lose even when you win.` },
          { text: `Let the boss win`, why: `Avoid them altogether.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build your week-four praise.`,
        tiles: [`On`, `time,`, `and`, `the`, `clearest`, `summary`, `yet.`],
        distractors: [`but`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. A volunteer at your community group keeps showing up late and making mistakes, but they're improving slowly. They just made an error in front of the whole group. Which response uses all three rules?`,
        options: [
          { text: `Point out the error to the group so others learn`, why: `Public loss of face, and they may quit.` },
          { text: `Smooth it over in the moment, then privately ask what would help, and praise the improvements you've seen` },
          { text: `Ignore it all to keep them happy`, why: `They need help to improve, not silence.` },
        ],
        answer: 1,
        explanation: `Save face in public, ask privately, praise the progress.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 25 to 27: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `Twenty-seven rules`,
    summary: `Three rules to go. Before the final chapter, look back at your Triumph Journal. Which rule has given you the most triumphs so far? Which have you barely tried?`,
  },
  notes: `Synthesis of Part Four chs. 4–6 with the weekly review. Scenario is ours. Retold in our own words.`,
};

export default lesson;
