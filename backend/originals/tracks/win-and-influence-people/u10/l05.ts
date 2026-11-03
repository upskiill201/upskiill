import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 5 (Practice + Checkpoint) — Rule 29 step by step; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `Fifty-Two Minutes to Eight`,
  summary: `At fifteen, he'd been told he was brain-damaged. He couldn't do his times tables and counted on his fingers. His father made a deal: get through a stack of flash cards in under eight minutes. The first night took fifty-two.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Break a hard skill into small wins`,
    `Celebrate every step of progress`,
    `Combine Rules 28 and 29`,
  ],
  learn: [
    {
      kind: `story`,
      title: `David`,
      beats: [
        { speaker: `narrator`, text: `Clarence Jones's son David came to live with him at fifteen. After a car accident as a small boy left a scar on his forehead, his school had decided he was brain-damaged and put him in classes for slow learners. He was two years behind, didn't know his times tables, added on his fingers and could barely read.` },
        { speaker: `narrator`, text: `There was one bright spot: David loved working on radios and TVs and wanted to be a technician. His father pointed out he'd need maths for the training, and offered to help.` },
        { speaker: `narrator`, text: `They got flash cards for all four kinds of sums. Right answers went in one pile; wrong ones went in a repeat pile to go through again. His father made a big fuss over every card David got right, especially ones he'd missed before. The deal: once David could do every card correctly in under eight minutes, they'd stop doing it every night.` },
        { speaker: `narrator`, text: `The first night took fifty-two minutes. Then 48, 45, 44, 41, under 40. Every drop, they celebrated: his father called in his wife, they hugged David and all danced a jig. By the end of the month, David did every card perfectly in under eight minutes.` },
      ],
      choice: {
        prompt: `What happened to David after that?`,
        options: [
          { text: `He passed maths, just about`, outcome: `Far more than that.` },
          { text: `He got a B in maths, won a science-fair prize for the whole city, and made the honour roll every term through high school`, outcome: `That's it. He'd discovered that learning was easy, and fun. When he made a small improvement, he'd ask to do the cards again. Once he found learning was easy, his whole life changed.`, best: true },
          { text: `He gave up the radio idea`, outcome: `The opposite: his confidence grew in everything.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `"Brain-damaged" or "learning is easy"?`,
      before: {
        label: `What school told him`,
        text: `He was brain-damaged, couldn't function normally, belonged with slow learners. Classmates called him names because of the scar.`,
      },
      after: {
        label: `What his father showed him`,
        text: `Small piles of cards. A clear goal. A celebration for every minute saved. Proof, night after night, that he could improve.`,
      },
      notes: [
        `The fault was made to seem easy to fix, one card at a time.`,
        `Every improvement was praised, so he wanted to improve again.`,
      ],
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 28 and 29.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What had David's school decided about him?`,
        options: [
          { text: `That he was brain-damaged and a slow learner` },
          { text: `That he was gifted`, why: `Quite the opposite.` },
          { text: `That he should leave school`, why: `They put him in slow-learner classes.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `David's nightly times, in order.`,
        lines: [`52 minutes`, `48 minutes`, `45 minutes`, `Under 40 minutes`, `Under 8 minutes`],
      },
      {
        kind: `mcq`,
        prompt: `What did the family do each time David's time dropped?`,
        options: [
          { text: `Hugged him and danced a jig` },
          { text: `Set a harder target`, why: `They celebrated first.` },
          { text: `Nothing until he hit eight minutes`, why: `They celebrated every drop.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `What David discovered.`,
        template: `He had made the fantastic discovery that learning was [[1]] and [[2]].`,
        blanks: [[`easy`], [`fun`]],
        distractors: [`hard`, `boring`],
      },
      {
        kind: `typeAnswer`,
        prompt: `What did David want to become? A TV and radio ________. (one word)`,
        answers: [`technician`, `repairman`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Fine reputation`, `Make it easy`],
        items: [
          { text: `"Tommy, I understand you're a natural leader."`, group: 0 },
          { text: `Small piles of flash cards with a clear goal`, group: 1 },
          { text: `"You've always been a fine mechanic."`, group: 0 },
          { text: `"The basics are there, just a few new steps."`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Helping a friend who's "terrible at maths" study for an exam. Which step breaks Rule 29?`,
        lines: [
          `Start with the kind of question they can already do.`,
          `Show them the hardest past paper first so they know what's coming.`,
          `Celebrate each topic they get right.`,
        ],
        bug: 1,
        fix: `Add one slightly harder question each session.`,
        explanation: `The hardest paper first makes it seem hopeless. Make it seem easy, one step at a time.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to its lesson.`,
        pairs: [
          [`Bill the mechanic`, `Reminded of his old standards`],
          [`Marie the Dishwasher`, `Told of the treasures within her`],
          [`The second dance teacher`, `"A natural sense of rhythm"`],
          [`David's flash cards`, `Small wins, celebrated`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 4): what did Lowell Thomas tell Carnegie bridge was?`,
        options: [
          { text: `Just memory and judgement, easy for him` },
          { text: `Very difficult`, why: `He made it seem easy.` },
          { text: `Pure luck`, why: `Memory and judgement.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the message David learned.`,
        tiles: [`Learning`, `is`, `easy`, `and`, `fun.`],
        distractors: [`hard`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your colleague has been told for years they're "bad with numbers" and now has to learn spreadsheets. Which approach combines Rules 28 and 29?`,
        options: [
          { text: `Send them a 40-page manual`, why: `It makes the task seem enormous.` },
          { text: `"You're brilliant at organising projects, and spreadsheets are just organising with columns. Let's do one small task a day and see how fast you get."` },
          { text: `Do their spreadsheets for them`, why: `They'll never discover they can.` },
        ],
        answer: 1,
        explanation: `A true good name (organised), a fault made to seem easy, and small, celebrated steps.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: help someone break one hard thing into small steps this week, and celebrate each one. What was the skill, and what was the first small win?`,
    starters: [`The skill is...`, `The first small step was...`, `We celebrated by...`],
  },
  deepen: {
    title: `Ask to do it again`,
    summary: `The best sign of encouragement working: David began asking to do the cards again. When people ask for more practice, you've made it easy and fun. Watch for that sign.`,
  },
  notes: `Source: Carnegie, Part Four ch. 8: Clarence M. Jones and his son David (the 1958 accident and scar, slow-learner classes, flash cards with discard and repeat stacks, 52/48/45/44/41/under 40/under 8 minutes, the jig, a B in algebra, the science fair prizes, honour roll and national honour society). Retold in our own words.`,
};

export default lesson;
