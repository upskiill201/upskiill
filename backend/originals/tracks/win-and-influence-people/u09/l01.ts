import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 1 (Story) — Rule 25: ask questions instead of giving direct orders. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `No One Likes Orders`,
  summary: `A man who sat in the same office as one of America's top business leaders for three years said he never once heard him give a direct order. Not one. So how did anything get done?`,
  minutes: 11,
  outcomes: [
    `Turn orders into suggestions and questions`,
    `Explain why questions save pride and spark ideas`,
    `Let people learn by doing it themselves`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Owen D. Young`,
      html:
        `<p>Carnegie once had dinner with Ida Tarbell, the great biographer. She was writing the life of Owen D. Young, one of America's leading businessmen, and had interviewed a man who'd shared an office with Young for three years.</p>` +
        `<p>In all that time, the man said, he'd never heard Young give anyone a direct order. He gave suggestions, not orders. He never said "Do this" or "Don't do that."</p>` +
        `<p>Instead he'd say: "You might consider this." Or: "Do you think that would work?" After dictating a letter, he'd often ask, "What do you think of this?" Looking over an assistant's letter, he'd say, "Maybe if we phrased it this way it would be better."</p>` +
        `<p>He always gave people the chance to do things themselves. He didn't tell his assistants what to do; he let them do it, and let them learn from their mistakes.</p>`,
    },
    {
      kind: `story`,
      title: `Why it works`,
      beats: [
        { speaker: `narrator`, text: `A technique like that makes it easy for a person to correct their own errors. It saves their pride and gives them a feeling of importance. It invites cooperation instead of rebellion.` },
        { speaker: `narrator`, text: `And resentment caused by a curt order can last a long time, even when the order was given to fix something that really was wrong.` },
      ],
      choice: {
        prompt: `Which of these is how Owen D. Young would ask for a change to a letter?`,
        options: [
          { text: `"Rewrite this paragraph."`, outcome: `A direct order. Young never gave one.` },
          { text: `"Maybe if we phrased it this way, it would be better?"`, outcome: `That's it. A suggestion, a "we", and room for the assistant to improve it themselves.`, best: true },
          { text: `"This is badly written."`, outcome: `That's criticism, and an order hiding behind it.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 25: Ask questions instead of giving direct orders. "You might consider..." "Do you think this would work?"`,
    },
  ],
  apply: {
    scenario: `Rule 25: Questions, not orders.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How many direct orders did Owen D. Young's officemate hear in three years?`,
        options: [
          { text: `None` },
          { text: `A few`, why: `Not one.` },
          { text: `Dozens`, why: `He never heard one.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Young's phrases.`,
        template: `"You might [[1]] this." "Do you think that would [[2]]?"`,
        blanks: [[`consider`], [`work`]],
        distractors: [`do`, `fail`],
      },
      {
        kind: `sortGroups`,
        prompt: `Order or question?`,
        groups: [`Order`, `Question or suggestion`],
        items: [
          { text: `"Send it by five."`, group: 0 },
          { text: `"Could we get this out by five?"`, group: 1 },
          { text: `"Don't use that font."`, group: 0 },
          { text: `"What do you think of a cleaner font here?"`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Who wrote Owen D. Young's biography? Ida ________. (one word)`,
        answers: [`Tarbell`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `What does asking instead of ordering do for the other person?`,
        options: [
          { text: `Saves their pride and gives them a feeling of importance` },
          { text: `Makes them work slower`, why: `It invites cooperation.` },
          { text: `Confuses them`, why: `Clear questions aren't confusing.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `A message to your team. Which line is a bare order?`,
        lines: [
          `What do you think of moving stand-up to 9:30?`,
          `Would Tuesday work better for the review?`,
          `Everyone update the tracker tonight. No excuses.`,
        ],
        bug: 2,
        fix: `Could we all get the tracker updated tonight?`,
        explanation: `"No excuses" turns a request into a command. People resent it, even when it's reasonable.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each order to Young's version.`,
        pairs: [
          [`"Rewrite this."`, `"Maybe if we phrased it this way?"`],
          [`"Do it like this."`, `"You might consider this."`],
          [`"That won't work."`, `"Do you think that would work?"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 8): what's Rule 23?`,
        options: [
          { text: `Call attention to people's mistakes indirectly` },
          { text: `Ask questions instead of orders`, why: `That's Rule 25.` },
          { text: `Smile`, why: `That's Rule 5.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Turn "Fix the slides" into a question.`,
        tiles: [`Could`, `we`, `tighten`, `up`, `the`, `slides?`],
        distractors: [`Now.`],
      },
      {
        kind: `mcq`,
        prompt: `Your teenage child's room is a mess and guests are coming. Which approach follows Rule 25?`,
        options: [
          { text: `"Clean your room. Now."`, why: `An order. Expect sulking.` },
          { text: `"Guests are coming at six. What would you need to get your room ready by then?"` },
          { text: `Clean it yourself and complain`, why: `That's Rule 1 broken.` },
        ],
        answer: 1,
        explanation: `A question hands them the plan and keeps their pride.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: give no direct orders for a whole day. Turn every instruction into a question or a suggestion. What changed in how people responded?`,
    starters: [`I usually say...`, `Instead I asked...`, `People...`],
  },
  deepen: {
    title: `Let them learn`,
    summary: `Young let people do things themselves and learn from their mistakes. Next time you're tempted to take over a task, ask instead: "How would you approach it?" and let them try.`,
  },
  notes: `Source: Carnegie, Part Four ch. 4 "No One Likes to Take Orders": Ida Tarbell and her biography of Owen D. Young, the officemate of three years, Young's phrases ("You might consider this", "Do you think that would work?", "What do you think of this?", "Maybe if we were to phrase it this way"), saves pride, resentment from brash orders. Retold in our own words.`,
};

export default lesson;
