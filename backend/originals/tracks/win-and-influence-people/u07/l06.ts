import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 6 (Pressure) — Rule 20 when it feels awkward or silly. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Stage It Without a Stunt`,
  summary: `"I'm not a showman. Throwing pennies on the floor isn't me." Good news: dramatising doesn't have to be loud. Some of the book's best examples are quiet, small and almost invisible.`,
  minutes: 12,
  outcomes: [
    `Dramatise a point in a quiet, personal way`,
    `Choose a dramatisation that fits the person and setting`,
    `Avoid stunts that embarrass or manipulate`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Quiet drama`,
      html:
        `<p>Not every dramatisation is coins on the floor. Look again at the book's examples.</p>` +
        `<p>Mary Catherine Wolf's form was nothing but a polite letter with blanks to fill in. No noise, no scene. Yet it made her request impossible to ignore, and let her busy boss feel in control.</p>` +
        `<p>The newspaper didn't shout down its critics. It simply printed one day's news as a book.</p>` +
        `<p>The father didn't perform. He turned tidying into a game his children wanted to play.</p>` +
        `<p>What they share: each one made the point <em>visible</em>, so nobody needed to be told twice, and nobody was humiliated. Good dramatisation respects the other person. It never embarrasses them, and it never tricks them.</p>`,
    },
    {
      kind: `compare`,
      title: `Loud or quiet?`,
      before: {
        label: `A stunt that backfires`,
        text: `To show her team their reports were too long, a manager reads one aloud, word for word, in the team meeting, rolling her eyes. The author is mortified. Everyone else is nervous. The point gets lost in the embarrassment.`,
      },
      after: {
        label: `Quiet drama`,
        text: `Instead, she prints her own longest report next to a one-page version and pins both to the board with a note: "Which would you rather read on a Monday?" People laugh, nobody is singled out, and reports get shorter.`,
      },
      notes: [
        `Both make the point visible.`,
        `Only one keeps everyone's pride intact.`,
      ],
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `Dramatise the idea, never the person. If your stunt would embarrass someone or mislead them, choose a quieter way.`,
    },
  ],
  apply: {
    scenario: `Rule 20, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What do all the book's dramatisations have in common?`,
        options: [
          { text: `They make the point visible without needing to be told twice` },
          { text: `They're loud and theatrical`, why: `Many were quiet.` },
          { text: `They cost money`, why: `A form letter costs nothing.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Good dramatisation or harmful stunt?`,
        groups: [`Good dramatisation`, `Harmful stunt`],
        items: [
          { text: `A chart of hours lost to meetings`, group: 0 },
          { text: `Reading someone's mistakes aloud to the team`, group: 1 },
          { text: `A reply form with blanks for a meeting time`, group: 0 },
          { text: `Faking a crisis so people take you seriously`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The rule of thumb.`,
        template: `Dramatise the [[1]], never the [[2]].`,
        blanks: [[`idea`], [`person`]],
        distractors: [`problem`, `price`],
      },
      {
        kind: `typeAnswer`,
        prompt: `The father turned tidying up into a game with a toy ________. (one word)`,
        answers: [`train`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `Why did the reading-aloud stunt fail?`,
        options: [
          { text: `It embarrassed the author, so the point got lost` },
          { text: `It was too quiet`, why: `It was loud, and humiliating.` },
          { text: `The report was too short`, why: `It was about the embarrassment.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Ideas to show your partner you need help with housework. Which one is a harmful stunt?`,
        lines: [
          `A shared list on the fridge showing who does what each week.`,
          `Leave every dirty dish on their pillow.`,
          `Time how long chores take this week and show the total.`,
        ],
        bug: 1,
        fix: `Suggest you swap chores for a week and compare.`,
        explanation: `It humiliates and provokes. They'll fight the stunt, not the problem.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each quiet dramatisation to its setting.`,
        pairs: [
          [`The fill-in-the-blank form`, `Getting a meeting with a busy boss`],
          [`The toy train`, `Getting children to tidy`],
          [`Two reports side by side`, `Getting shorter reports`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what did Colonel House do when Wilson used his idea?`,
        options: [
          { text: `Let Wilson keep the credit` },
          { text: `Corrected him at dinner`, why: `He never did.` },
          { text: `Wrote to the papers`, why: `He wanted results, not credit.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question to ask before any stunt.`,
        tiles: [`Would`, `this`, `embarrass`, `or`, `mislead`, `anyone?`],
        distractors: [`impress`],
      },
      {
        kind: `mcq`,
        prompt: `You're shy, and you need your manager to grasp that your workload is unmanageable. Which quiet dramatisation fits best?`,
        options: [
          { text: `Burst into tears in a meeting so they see how bad it is`, why: `That's a scene, not a dramatisation, and it would embarrass you both.` },
          { text: `Bring a one-page calendar of this week with every task blocked in, and ask which they'd like you to drop` },
          { text: `Say "I'm busy" again`, why: `Stated truth. Already ignored.` },
        ],
        answer: 1,
        explanation: `A full calendar makes the point visible, calmly, and hands them the decision.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: plan one small, quiet dramatisation for a point you need to make. Run the test: would it embarrass or mislead anyone? Write it down and try it.`,
    starters: [`My point is...`, `My quiet dramatisation is...`, `Test passed because...`],
  },
  deepen: {
    title: `Visible, not loud`,
    summary: `The best dramatisations are often the quietest: a form, a chart, a game. This week, look for one thing you could make visible instead of saying again.`,
  },
  notes: `Synthesis of Part Three ch. 11 examples (Mary Catherine Wolf's form, One Day, Joe Fant's train). The reading-aloud vs two-reports comparison is our illustration, combining the dramatize principle with Part Four's "let the other person save face". Retold in our own words.`,
};

export default lesson;
