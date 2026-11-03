import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 4 (Story) — Rule 23: call attention to people's mistakes indirectly. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `Change "But" to "And"`,
  summary: `"We're really proud of your grades, but..." The moment a child hears "but", the praise turns to dust. Swap one three-letter word, and the same message lands completely differently.`,
  minutes: 11,
  outcomes: [
    `Remove the "but" that cancels praise`,
    `Point out a mistake without stating it directly`,
    `Correct by example instead of by lecture`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `Sincere praise followed by "but" is the best way to give feedback.`,
          isFact: false,
          explain: `The "but" makes people doubt the praise. It sounds like a set-up for criticism. "And" keeps the praise believable.`,
        },
        {
          text: `Sensitive people often resent direct criticism bitterly, but respond to indirect hints.`,
          isFact: true,
          explain: `Calling attention to mistakes indirectly works wonders with people who'd resent being told straight out.`,
        },
      ],
    },
    {
      kind: `compare`,
      title: `Johnnie's algebra`,
      before: {
        label: `With "but"`,
        text: `"We're really proud of you, Johnnie, for raising your grades this term. But if you'd worked harder on your algebra, the results would have been better."`,
      },
      after: {
        label: `With "and"`,
        text: `"We're really proud of you, Johnnie, for raising your grades this term, and if you keep up the same effort next term, your algebra can be up with all the others."`,
      },
      notes: [
        `With "but", Johnnie wonders whether the praise was just a lead-in to criticism.`,
        `With "and", he accepts the praise, and the algebra becomes something to live up to.`,
      ],
    },
    {
      kind: `story`,
      title: `The cigars`,
      beats: [
        { speaker: `narrator`, text: `Charles Schwab was walking through one of his steel mills at noon when he came across some workers smoking, right under a sign that said NO SMOKING.` },
      ],
      choice: {
        prompt: `What did Schwab do?`,
        options: [
          { text: `Pointed at the sign: "Can't you read?"`, outcome: `Oh no, not Schwab.` },
          { text: `Handed each man a cigar and said, "I'd appreciate it, boys, if you'd smoke these outside."`, outcome: `That's it. They knew he knew they'd broken the rule, and they admired him for saying nothing about it, giving them a gift and making them feel important.`, best: true },
          { text: `Fined them all`, outcome: `He made them feel important instead.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 23: Call attention to people's mistakes indirectly. Swap "but" for "and", and let an example or a hint do the correcting.`,
    },
  ],
  apply: {
    scenario: `Rule 23: Point to mistakes indirectly.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What happens when praise is followed by "but"?`,
        options: [
          { text: `People doubt the praise was sincere` },
          { text: `People remember the praise more`, why: `They remember the criticism.` },
          { text: `Nothing changes`, why: `"But" cancels the praise.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Which three-letter word should replace "but"? (one word)`,
        answers: [`and`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `What did Schwab hand the smoking workers?`,
        options: [
          { text: `Cigars, asking them to smoke outside` },
          { text: `A warning letter`, why: `He gave them a present.` },
          { text: `Nothing; he pointed at the sign`, why: `Not Schwab.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Direct criticism or indirect?`,
        groups: [`Direct`, `Indirect`],
        items: [
          { text: `"Can't you read the sign?"`, group: 0 },
          { text: `"I'd appreciate it if you'd smoke these outside."`, group: 1 },
          { text: `"Your algebra was weak."`, group: 0 },
          { text: `"Keep it up and your algebra will catch up too."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Rewrite with "and".`,
        template: `Great presentation, [[1]] with a shorter ending it'll be even [[2]].`,
        blanks: [[`and`], [`stronger`, `better`]],
        distractors: [`but`, `worse`],
      },
      {
        kind: `findBug`,
        prompt: `Feedback to a junior writer. Which sentence cancels the praise?`,
        lines: [
          `This article is your most readable yet.`,
          `But the headline is still weak, as usual.`,
          `And with a punchier headline, it'll fly.`,
        ],
        bug: 1,
        fix: `The intro especially pulls you in.`,
        explanation: `"But... as usual" turns praise into a set-up and a dig. "And" carries the change without cancelling anything.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each example to how it corrected indirectly.`,
        pairs: [
          [`Schwab`, `A gift of cigars`],
          [`Johnnie's parents`, `"And" instead of "but"`],
          [`McKinley`, `"Is it right for this occasion?"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what's the magic phrase for disagreeing?`,
        options: [
          { text: `"I may be wrong. Let's look at the facts."` },
          { text: `"You're wrong, but that's okay."`, why: `Never say "you're wrong".` },
          { text: `"Trust me on this."`, why: `That's a fixed opinion.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build an "and" sentence for a colleague.`,
        tiles: [`Strong`, `report,`, `and`, `a`, `summary`, `will`, `make`, `it`, `perfect.`],
        distractors: [`but`],
      },
      {
        kind: `mcq`,
        prompt: `Your housemate keeps leaving the front door unlocked. What's an indirect approach in Schwab's spirit?`,
        options: [
          { text: `"You left the door unlocked AGAIN."`, why: `Direct, and they'll defend.` },
          { text: `Get them a nice keyring and say "Thought this might help us both remember the lock"` },
          { text: `Lock them out once to teach them`, why: `A stunt that humiliates.` },
        ],
        answer: 1,
        explanation: `A small gift and a shared "us" points to the mistake without accusing.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: for one day, catch every "but" after praise and change it to "and". Write down one sentence before and after.`,
    starters: [`Before: "..., but ..."`, `After: "..., and ..."`],
  },
  deepen: {
    title: `The "but" detector`,
    summary: `Ask a friend to point out every time you say "but" after a compliment this week. You'll be surprised how often it sneaks in, and how much better "and" sounds.`,
  },
  notes: `Source: Carnegie, Part Four ch. 2 "How to Criticize, and Not Be Hated for It": Schwab and the cigars, changing "but" to "and" (Johnnie's algebra), indirect correction works with sensitive people. Retold in our own words.`,
};

export default lesson;
