import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 5 (Practice + Checkpoint) — Rule 23 by example; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `Say It Without Saying It`,
  summary: `A shop owner saw a customer ignored while his staff chatted. A mayor's "open door" was blocked by his own staff. Neither gave a lecture. One served the customer himself; the other took his door off its hinges.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Correct a habit by setting the example yourself`,
    `Use a symbolic act to make a point`,
    `Combine Rules 22 and 23`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The ignored customer`,
      beats: [
        { speaker: `narrator`, text: `John Wanamaker, founder of a great department store in Philadelphia, toured his store every day. One day he saw a customer waiting at a counter. Nobody was paying her the slightest attention.` },
        { speaker: `narrator`, text: `The salespeople? Huddled at the far end of the counter, laughing and chatting among themselves.` },
      ],
      choice: {
        prompt: `What did Wanamaker do?`,
        options: [
          { text: `Called the staff over and told them off in front of the customer`, outcome: `That's what most bosses would do.` },
          { text: `Slipped behind the counter, served the customer himself, then handed the purchase to the staff to wrap, and walked on`, outcome: `That's it. Not a word was said. Not a word was needed.`, best: true },
          { text: `Wrote a memo to all staff that evening`, outcome: `He did something far more memorable on the spot.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The missing door`,
      html:
        `<p>Carl Langford, long-time mayor of Orlando, Florida, kept telling his staff he had an open-door policy: any citizen could come and see him. Yet his secretaries and officials kept blocking people at the door.</p>` +
        `<p>So the mayor found a solution. He had the door to his office removed.</p>` +
        `<p>His staff got the message. From that day, his administration was truly open.</p>` +
        `<p>Wanamaker and the mayor both did the same thing: they made the point with an act, not an accusation. Nobody was humiliated. Everybody understood.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before you lecture, ask: is there something I could do that would make the point for me?`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 22 and 23.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Wanamaker do about the ignored customer?`,
        options: [
          { text: `Served her himself, without a word` },
          { text: `Fired the staff`, why: `He didn't say a word.` },
          { text: `Apologised and left`, why: `He served her personally.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `What did the mayor of Orlando remove from his office? (one word)`,
        answers: [`door`, `the door`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Correcting by example, or by accusation?`,
        groups: [`By example`, `By accusation`],
        items: [
          { text: `Picking up litter yourself while the team watches`, group: 0 },
          { text: `"Who left this mess?"`, group: 1 },
          { text: `Arriving early to every meeting you chair`, group: 0 },
          { text: `"Some of you are always late."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Review (Lesson 4): the swap.`,
        template: `Change the word "[[1]]" to "[[2]]" after praise.`,
        blanks: [[`but`], [`and`]],
        distractors: [`so`, `or`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did McKinley say about the speech he couldn't use?`,
        options: [
          { text: `That it was splendid, but was it right for this occasion?` },
          { text: `That it was unusable`, why: `He praised it first.` },
          { text: `Nothing`, why: `He said no, very tactfully.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Your staff keep ignoring the shop's "greet every customer" rule. Which plan breaks Rule 23?`,
        lines: [
          `Greet every customer warmly yourself, in front of the team.`,
          `Pin a list of staff who forgot to greet people on the noticeboard.`,
          `Thank the first person you see greeting someone, publicly.`,
        ],
        bug: 1,
        fix: `Ask the team how we could make greeting easier at busy times.`,
        explanation: `Naming and shaming is direct criticism in public. Example and praise do it indirectly.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story from this chapter.`,
        pairs: [
          [`Coolidge`, `Pretty dress, careful punctuation`],
          [`Dorothy`, `Praised the trainee, then taught her`],
          [`Schwab`, `Cigars for the smokers`],
          [`Mayor Langford`, `Removed his office door`],
        ],
      },
      {
        kind: `orderLines`,
        prompt: `Correcting a team habit, in order.`,
        lines: [`Notice the habit`, `Set the example yourself`, `Praise anyone who follows it`, `Only then mention it, gently, if you must`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 3): why did the teller trainee improve so quickly?`,
        options: [
          { text: `Her manager's praise gave her confidence` },
          { text: `She was given a warning`, why: `She was given confidence.` },
          { text: `She was moved to another job`, why: `She stayed and mastered it.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build an indirect nudge to a messy team.`,
        tiles: [`Thanks`, `to`, `whoever`, `cleared`, `the`, `kitchen`, `yesterday!`],
        distractors: [`Finally!`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your team's meetings always overrun because people arrive late. You run the meeting. Which approach combines Rules 22 and 23?`,
        options: [
          { text: `"I'm sick of starting late. Be on time."`, why: `Direct, frustrated, and it puts everyone on the defensive.` },
          { text: `Start exactly on time every week, and thank the people who were there at the start for making it efficient` },
          { text: `Lock the door at the start time`, why: `A humiliating stunt.` },
        ],
        answer: 1,
        explanation: `Your example makes the point, and praise for the punctual does the rest.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: pick one habit you'd like others to change and do it yourself, visibly, all week, without saying a word. Did anyone follow?`,
    starters: [`The habit I want to change is...`, `I'm modelling it by...`, `What happened:...`],
  },
  deepen: {
    title: `Actions, not words`,
    summary: `Wanamaker and the mayor never said a word about the problem. Think about the last time you lectured someone. What could you have done instead that would have said it for you?`,
  },
  notes: `Source: Carnegie, Part Four ch. 2: John Wanamaker serving the ignored customer, Mayor Carl Langford of Orlando removing his office door. Retold in our own words.`,
};

export default lesson;
