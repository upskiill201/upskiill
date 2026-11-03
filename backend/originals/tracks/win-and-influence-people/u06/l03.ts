import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 3 (Pressure) — Rule 16 when you want it badly: lead from behind. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Lead From Behind`,
  summary: `He dreamed of a history tour of the east. His wife had her heart set on the west. Only one trip was possible. He didn't argue for his. He asked his daughter one question.`,
  minutes: 12,
  outcomes: [
    `Let others choose when you badly want a particular outcome`,
    `Involve the people who'll be affected by a decision`,
    `Accept that an idea shared is an idea that lasts`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The family holiday`,
      before: {
        label: `Two dreams, one trip`,
        text: `Paul Davis had long dreamed of visiting America's historic sites: Gettysburg, Philadelphia, Washington, Williamsburg. In March his wife Nancy said she wanted to tour the western states, a trip she'd wanted for years. They couldn't do both.`,
      },
      after: {
        label: `One question`,
        text: `Their daughter Anne had just finished a course in American history and loved it. Paul asked her how she'd like to visit the places she'd learned about on their next holiday. She'd love to. Two evenings later at dinner, Nancy announced that, if everyone agreed, this year's trip would be to the eastern states: it would be wonderful for Anne and thrilling for all of them. Everyone agreed.`,
      },
      notes: [
        `Paul never argued for his trip.`,
        `Nancy announced the decision herself, so it was hers.`,
      ],
    },
    {
      kind: `reading`,
      title: `Let them shape it`,
      html:
        `<p>People are far more likely to accept a plan if they had a part in shaping it. It's true in families, and it's true at work.</p>` +
        `<p>The hardest time to use this rule is when you want something badly. Every instinct says: make your case, push it through. But a plan you push through has one supporter. A plan they shape has many.</p>` +
        `<p>It takes patience, and a willingness to let someone else announce your idea. Colonel House did it with a President. Paul Davis did it at the dinner table. The result was the same: the idea happened, and everyone owned it.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `When you want it most, push least. Ask the question that lets them find the answer, and let them say it first.`,
    },
  ],
  apply: {
    scenario: `Rule 16, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Who announced the family's holiday decision?`,
        options: [
          { text: `Paul`, why: `He let someone else say it.` },
          { text: `Nancy` },
          { text: `Anne`, why: `Anne was the reason. Nancy announced it.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What question did Paul ask Anne?`,
        options: [
          { text: `"Don't you think the east is better?"`, why: `A leading push. He asked something gentler.` },
          { text: `How she'd like to visit the places she'd learned about in history` },
          { text: `"Which trip should we take?"`, why: `Close, but he connected it to her interest.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Pushing your idea, or letting them shape it?`,
        groups: [`Pushing`, `Letting them shape it`],
        items: [
          { text: `"I've booked it already, you'll love it."`, group: 0 },
          { text: `"What would make this trip great for you?"`, group: 1 },
          { text: `Arguing your case again over dinner`, group: 0 },
          { text: `Asking the person most affected what they'd choose`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The hard truth.`,
        template: `A plan you push through has [[1]] supporter. A plan they shape has [[2]].`,
        blanks: [[`one`], [`many`]],
        distractors: [`no`, `none`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Paul's daughter had just finished a course in American ________. (one word)`,
        answers: [`history`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Choosing a team offsite location. Which line stops others shaping it?`,
        lines: [
          `What did people enjoy most about last year's offsite?`,
          `I've narrowed it to my favourite, so let's not overthink it.`,
          `Would anyone like to help pick the final spot?`,
        ],
        bug: 1,
        fix: `Here are three options; which would you pick?`,
        explanation: `It closes the decision before anyone else touches it.`,
      },
      {
        kind: `orderLines`,
        prompt: `Leading from behind, in order.`,
        lines: [`Notice what you want`, `Find what matters to them`, `Ask a question that links the two`, `Let them announce the decision`],
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to how the idea became theirs.`,
        pairs: [
          [`Paul Davis`, `His daughter's history course`],
          [`Colonel House`, `Planted casually, credited to Wilson`],
          [`Eugene Wesson`, `Unfinished sketches`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what words did Franklin use instead of "certainly"?`,
        options: [
          { text: `"It seems to me" or "I imagine"` },
          { text: `"Definitely"`, why: `He banned words like that.` },
          { text: `"Obviously"`, why: `Another fixed-opinion word.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `You're sure your team should adopt a new tool, and you have the authority to just decide. What's the stronger move?`,
        options: [
          { text: `Decide; you're the boss`, why: `You'll get compliance, not enthusiasm.` },
          { text: `Share the problem it solves, ask how they'd tackle it, and let them land on the tool, or a better one` },
          { text: `Get one enthusiastic person to tell everyone else`, why: `Still your idea, delivered by someone else.` },
        ],
        answer: 1,
        explanation: `Authority gets obedience. Shared ideas get commitment.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: hand one decision you care about to the other person today. Ask the question, then let them decide. What did they choose, and how did it feel to let go?`,
    starters: [`The decision was...`, `I asked...`, `They chose...`],
  },
  deepen: {
    title: `Let them announce it`,
    summary: `Next time you want a decision to go your way, aim for this: the other person announces it, in their own words, and believes it's theirs. That's the sign you did it right.`,
  },
  notes: `Source: Carnegie, Part Three ch. 7: Paul M. Davis of Tulsa and the family vacation (eastern historic sites vs western states, daughter Anne's history course, Nancy's announcement); Part Four ch. 4 note that people accept decisions they had a part in. Retold in our own words.`,
};

export default lesson;
