import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 (Pressure) — Rule 4 must be sincere: interest that helps both sides. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `The Soda Clerk Who Saved the Account`,
  summary: `A salesman was thrown out of a shop and told never to come back. A few hours later the owner doubled his order. The reason was standing behind the soda counter.`,
  minutes: 12,
  outcomes: [
    `Show interest in people others overlook`,
    `Win over someone hostile by getting interested in them`,
    `Keep interest sincere, so both sides gain`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The drugstore in Hingham`,
      beats: [
        { speaker: `narrator`, text: `Edward Sykes sold medical supplies in Massachusetts. Whenever he visited one particular drugstore, he'd chat for a few minutes with the soda clerk and the sales clerk before he went to the owner for an order.` },
        { speaker: `narrator`, text: `One day the owner told him to leave. He wasn't buying from Sykes's company any more; he felt they were ignoring small shops like his. Sykes left with his tail between his legs and drove around town for hours.` },
        { speaker: `narrator`, text: `Finally he went back to at least explain his company's side. As usual, he said hello to the two clerks. When he reached the owner, the man smiled, welcomed him back, and gave him double his usual order.` },
      ],
      choice: {
        prompt: `What had changed the owner's mind in those few hours?`,
        options: [
          { text: `He'd checked the prices again`, outcome: `It wasn't the prices.` },
          { text: `The young soda clerk told him Sykes was one of the only salesmen who ever bothered to say hello to the staff`, outcome: `That's it. The clerk said if any salesman deserved the shop's business, it was him. The owner agreed, and stayed a loyal customer.`, best: true },
          { text: `Sykes's manager had phoned him`, outcome: `No. The help came from someone most salespeople walked straight past.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `The man who hated chain stores`,
      before: {
        label: `Ten years of selling`,
        text: `C. M. Knaphle tried for years to sell fuel to a big chain-store company. He gave a speech in class pouring scorn on chain stores, calling them a curse. And he still wondered why they wouldn't buy from him.`,
      },
      after: {
        label: `One favour`,
        text: `For a class debate, he took the side defending chain stores, and went to an executive he'd despised: "I'm not here to sell fuel. I need your help." He'd asked for one minute. The man talked for an hour and forty-seven minutes, proud of what his company did, and at the door said he'd like to place an order for fuel in the spring.`,
      },
      notes: [
        `Knaphle said two hours of genuine interest got further than ten years of trying to get the man interested in him.`,
        `A Roman poet said it two thousand years ago: we're interested in others when they're interested in us.`,
      ],
    },
    {
      kind: `reading`,
      title: `It has to be real`,
      html:
        `<p>A banker named Charles Walters once needed facts for a confidential report, and the only man who had them wouldn't talk. The interview was cold and short. But Walters had overheard the man's secretary say she had no stamps for him that day: the man collected stamps for his twelve-year-old son.</p>` +
        `<p>Walters's bank received letters from all over the world. The next day he came back with an envelope of foreign stamps for the boy. He was welcomed like a long-lost friend, and after half an hour of stamps and photos of the son, the man gave him every fact he needed, and called in his staff for more.</p>` +
        `<p>Now hear this clearly. Interest, like every rule in this course, must be <strong>sincere</strong>. It has to pay off for the person receiving it, not just the one giving it. It's a two-way street.</p>` +
        `<p>One man remembered a young student nurse from when he was ten, alone and frightened in hospital on a holiday, too poor for his mother to visit. She heard him crying, shared her dinner with him, and stayed long after her shift ended until he fell asleep. Decades later he still thought of her every year. She wanted nothing from him. That's the real thing.</p>`,
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `Interest you fake to get something is just flattery with questions. People feel the difference. Be curious because people are worth being curious about.`,
    },
  ],
  apply: {
    scenario: `Rule 4, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Who saved Sykes's account?`,
        options: [
          { text: `The shop owner's wife`, why: `It was someone Sykes had been kind to.` },
          { text: `The young soda clerk he always said hello to` },
          { text: `His own manager`, why: `The help came from inside the shop.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `How long did Knaphle ask the chain-store executive for?`,
        options: [
          { text: `One minute` },
          { text: `One hour`, why: `He asked for a minute. The executive gave him nearly two hours.` },
          { text: `A full meeting`, why: `He asked for just one minute.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `The Roman poet's line.`,
        template: `We are interested in [[1]] when they are interested in [[2]].`,
        blanks: [[`others`], [`us`]],
        distractors: [`money`, `themselves`],
      },
      {
        kind: `typeAnswer`,
        prompt: `What did Walters bring for the man's son? (one word)`,
        answers: [`stamps`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Sincere interest or fake interest?`,
        groups: [`Sincere`, `Fake`],
        items: [
          { text: `Asking about their hobby because you're curious`, group: 0 },
          { text: `Asking about their kids only to soften them up for a sale`, group: 1 },
          { text: `Staying after your shift to keep a scared patient company`, group: 0 },
          { text: `Liking every post of a boss you never talk to`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Which line makes this conversation fake?`,
        lines: [
          `So you restore old motorbikes? How did that start?`,
          `That's brilliant. Which was the hardest one?`,
          `Great, anyway, now that you like me, about that contract...`,
        ],
        bug: 2,
        fix: `I'd love to see the one you're working on now.`,
        explanation: `It reveals the interest was a tool. The other person will feel used, and rightly.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what won people over.`,
        pairs: [
          [`Sykes`, `Saying hello to the clerks`],
          [`Knaphle`, `Asking for help with his debate`],
          [`Walters`, `Stamps for a collector's son`],
          [`The student nurse`, `Staying with a frightened boy`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the difference between appreciation and flattery?`,
        options: [
          { text: `One is sincere, the other isn't` },
          { text: `Appreciation is quieter`, why: `Volume isn't the difference.` },
          { text: `Flattery is for bosses`, why: `It's about sincerity, not who it's for.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Ask a hostile customer for their view, the Knaphle way.`,
        tiles: [`I'd`, `really`, `value`, `your`, `advice`, `on`, `this.`],
        distractors: [`Buy`, `now.`],
      },
      {
        kind: `mcq`,
        prompt: `A senior colleague is cold to you and you need their help on a project. What does this lesson suggest?`,
        options: [
          { text: `Keep asking for the help until they give in`, why: `Pushing for your want only makes them colder.` },
          { text: `Get genuinely curious about their work and ask their advice on something they know well` },
          { text: `Go over their head to their manager`, why: `You might get the help, but you'll lose the person.` },
        ],
        answer: 1,
        explanation: `Like Knaphle: ask about their world, sincerely. People warm to those who are interested in them.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: talk properly with someone people usually walk past: a cleaner, a guard, a receptionist, the quiet person in your group. Ask about them. What did you learn?`,
    starters: [`I talked to...`, `I asked...`, `I learned...`],
  },
  deepen: {
    title: `The two-way street`,
    summary: `Before you show interest in someone, ask yourself: would I still be curious about this person if they could never help me? If the answer is yes, you're doing it right.`,
  },
  notes: `Source: Carnegie, Part Two ch. 1: Edward M. Sykes Jr. and the Hingham drugstore, C. M. Knaphle and the chain-store debate (one minute, 1h47m), Publilius Syrus quote, Charles R. Walters and the stamps, sincerity as a two-way street, Martin Ginsberg and the student nurse on Thanksgiving. Retold in our own words.`,
};

export default lesson;
