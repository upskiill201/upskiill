import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 7 (Story) — Rule 27: praise the slightest improvement and every improvement. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `Meat, Not the Whip`,
  summary: `A boy in Naples was told by his first teacher he had no voice at all: it sounded like wind in the shutters. His mother went barefoot to pay for his lessons, and told him she could already hear him improving.`,
  minutes: 11,
  outcomes: [
    `Explain why praising small steps keeps people improving`,
    `Notice and praise the slightest improvement`,
    `See how a few words of praise have changed lives`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Three boys`,
      beats: [
        { speaker: `narrator`, text: `A boy of ten worked in a factory in Naples. He longed to sing, but his first teacher said he had no voice at all. His mother, a poor peasant woman, hugged him, told him she knew he could sing and could already hear him improving, and went barefoot to save money for his lessons. His name was Enrico Caruso.` },
        { speaker: `narrator`, text: `A young man in London had barely four years of school. His father was in prison for debt; he pasted labels on bottles in a rat-infested warehouse. He posted his first stories at night so nobody would laugh. Rejection after rejection. Then an editor accepted one, and praised him. He was paid nothing, but he wandered the streets in tears of joy. His name was Charles Dickens.` },
        { speaker: `narrator`, text: `Another London boy swept a drapery shop from five in the morning, fourteen hours a day, for two years, and swore he'd kill himself if he had to stay. He wrote a despairing letter to his old schoolmaster.` },
      ],
      choice: {
        prompt: `What did the schoolmaster write back?`,
        options: [
          { text: `That he should be grateful to have a job`, outcome: `That might have crushed him.` },
          { text: `A little praise: he was very intelligent and fit for better things, and offered him a teaching job`, outcome: `That's it. That praise changed the boy's life. He went on to write bestselling books and became famous as H. G. Wells.`, best: true },
          { text: `Nothing`, outcome: `A few words of praise made all the difference.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Pete's dogs`,
      html:
        `<p>Carnegie had an old friend, Pete Barlow, who spent his life touring with a dog-and-pony act. Carnegie loved watching him train new dogs. The moment a dog showed the slightest improvement, Pete patted it, praised it, gave it meat and made a great fuss.</p>` +
        `<p>Nothing new there. Animal trainers have done it for centuries. So why don't we use the same common sense with people? Why don't we use meat instead of the whip? Praise instead of condemnation?</p>` +
        `<p>Let's praise even the slightest improvement. That inspires the other person to keep on improving.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 27: Praise the slightest improvement and praise every improvement. Use meat, not the whip.`,
    },
  ],
  apply: {
    scenario: `Rule 27: Praise every improvement.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Pete Barlow do the moment a dog improved?`,
        options: [
          { text: `Patted it, praised it and gave it meat` },
          { text: `Moved straight to the next trick`, why: `He made a fuss first.` },
          { text: `Nothing until it was perfect`, why: `He praised the slightest improvement.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each boy to the encouragement that changed him.`,
        pairs: [
          [`Enrico Caruso`, `His mother said she could hear him improving`],
          [`Charles Dickens`, `An editor praised his first story`],
          [`H. G. Wells`, `His old schoolmaster said he was fit for better things`],
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Carnegie's question.`,
        template: `Why don't we use [[1]] instead of a [[2]]?`,
        blanks: [[`meat`], [`whip`]],
        distractors: [`money`, `carrot`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Caruso's first teacher said his voice sounded like the wind in the ________. (one word)`,
        answers: [`shutters`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Meat or whip?`,
        groups: [`Meat (praise)`, `Whip (criticism)`],
        items: [
          { text: `"That's your fastest time yet!"`, group: 0 },
          { text: `"Still not good enough."`, group: 1 },
          { text: `"You're getting the hang of this."`, group: 0 },
          { text: `"Why does this take you so long?"`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did Dickens get paid for his first accepted story?`,
        options: [
          { text: `Nothing, but he got praise` },
          { text: `A large fee`, why: `Not a penny.` },
          { text: `A job at the paper`, why: `He got recognition, and it was enough.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `A note to a child learning piano. Which line is the whip?`,
        lines: [
          `That was your smoothest run-through yet.`,
          `Your left hand is really catching up.`,
          `Shame you still mess up the ending every time.`,
        ],
        bug: 2,
        fix: `Shall we try the ending slowly together?`,
        explanation: `It cancels the progress you just praised. Praise every step, and help with the hard bit.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 4): what title did GE give Steinmetz?`,
        options: [
          { text: `Consulting Engineer` },
          { text: `Chief Executive`, why: `It was Consulting Engineer.` },
          { text: `Department Head`, why: `They moved him from that.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build praise for a small step.`,
        tiles: [`That's`, `a`, `real`, `improvement`, `on`, `last`, `week.`],
        distractors: [`finally`],
      },
      {
        kind: `mcq`,
        prompt: `A friend learning to drive finally parks without hitting the kerb, though it's crooked. What does Rule 27 say?`,
        options: [
          { text: `"It's crooked."`, why: `The whip, on the day they improved.` },
          { text: `"No kerb this time! That's real progress."` },
          { text: `Say nothing until it's perfect`, why: `The slightest improvement deserves praise.` },
        ],
        answer: 1,
        explanation: `Praise the slightest improvement. That's what makes them want to improve again.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: praise someone's tiniest step forward today, a colleague, a child, yourself. What was the step, and how did they react?`,
    starters: [`The small step was...`, `I said...`, `They...`],
  },
  deepen: {
    title: `Your few words`,
    summary: `Carnegie said he could look back and see where a few words of praise had changed his whole future. Can you? Who gave them to you? Who could you give them to this week?`,
  },
  notes: `Source: Carnegie, Part Four ch. 6 "How to Spur People On to Success": Pete Barlow's dog-and-pony act, "meat instead of a whip", Enrico Caruso and his mother, Charles Dickens's first accepted story, H. G. Wells and his schoolmaster. Retold in our own words.`,
};

export default lesson;
