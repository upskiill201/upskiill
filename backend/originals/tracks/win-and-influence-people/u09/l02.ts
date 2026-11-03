import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 2 (Practice) — Rule 25 in daily life: the car in the driveway. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Whose Car Is in the Driveway?`,
  summary: `A student had parked illegally, blocking the workshop entrance. He was in the wrong. An instructor stormed in and gave an order. From that day on, the whole class made that instructor's life miserable.`,
  minutes: 11,
  outcomes: [
    `See how one curt order can turn a whole group against you`,
    `Rephrase an order as a friendly question`,
    `Make even a justified instruction easy to accept`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The blocked driveway`,
      before: {
        label: `The order`,
        text: `A student at a vocational school had parked in the entrance to one of the workshops. An instructor stormed into the classroom: "Whose car is blocking the driveway?" When the student owned up, the instructor shouted: "Move that car right now, or I'll wrap a chain round it and drag it out."`,
      },
      after: {
        label: `The question`,
        text: `The student was wrong; the car shouldn't have been there. But if the instructor had asked in a friendly way whose car it was, and suggested that if it were moved, other cars could get in and out, the student would gladly have moved it.`,
      },
      notes: [
        `From that day, not only that student but the whole class did everything they could to make the instructor's job unpleasant.`,
        `One order. Months of resentment. Even though he was right.`,
      ],
    },
    {
      kind: `reading`,
      title: `Questions spark ideas`,
      html:
        `<p>Asking questions doesn't just make an instruction easier to swallow. It often brings out the creativity of the people you ask.</p>` +
        `<p>And people are far more willing to follow an instruction if they had a part in the decision behind it. An order says "I decided." A question says "we're deciding."</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before giving an instruction, try adding the reason and turning it into a question: "Could you move it, so the others can get in?"`,
    },
  ],
  apply: {
    scenario: `Rule 25 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the instructor threaten to do to the car?`,
        options: [
          { text: `Wrap a chain round it and drag it out` },
          { text: `Call the police`, why: `His threat was more dramatic.` },
          { text: `Report the student`, why: `He threatened the chain.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What happened after the instructor's order?`,
        options: [
          { text: `The whole class made his job unpleasant from then on` },
          { text: `Nobody parked there again, and all was well`, why: `The car moved, but the resentment stayed.` },
          { text: `The student apologised`, why: `He resented it, and so did everyone else.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Will this build cooperation or resentment?`,
        groups: [`Cooperation`, `Resentment`],
        items: [
          { text: `"Could you move your car so the others can get in?"`, group: 0 },
          { text: `"Move it or else."`, group: 1 },
          { text: `"Would you mind lowering the music? The baby's asleep."`, group: 0 },
          { text: `"Turn that noise off!"`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What questions do.`,
        template: `Asking questions makes an order more [[1]], and often sparks the [[2]] of the people you ask.`,
        blanks: [[`palatable`, `acceptable`], [`creativity`]],
        distractors: [`painful`, `anger`],
      },
      {
        kind: `typeAnswer`,
        prompt: `The student was in the wrong. Did that make the order work? (yes or no)`,
        answers: [`no`],
        placeholder: `Yes or no`,
      },
      {
        kind: `findBug`,
        prompt: `Asking a flatmate to clear their stuff from the hallway. Which line is the order?`,
        lines: [
          `Hey, the hallway's getting a bit tight.`,
          `Clear your boxes out by tonight.`,
          `Could we find somewhere else for them so nobody trips?`,
        ],
        bug: 1,
        fix: `Any chance you could shift them this week?`,
        explanation: `An order with a deadline. The question around it gets the same result without the resentment.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match the order to its friendly version.`,
        pairs: [
          [`"Move that car now!"`, `"Could you move it so others can get in?"`],
          [`"Be quiet!"`, `"Would you mind keeping it down?"`],
          [`"Sign this today."`, `"Could you look this over today?"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what's Rule 17?`,
        options: [
          { text: `Try honestly to see things from the other person's point of view` },
          { text: `Ask questions instead of orders`, why: `That's Rule 25.` },
          { text: `Dramatise your ideas`, why: `That's Rule 20.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the instructor's better line.`,
        tiles: [`Whose`, `car`, `is`, `that?`, `Could`, `you`, `move`, `it?`],
        distractors: [`chain`],
      },
      {
        kind: `mcq`,
        prompt: `You're a team lead and someone keeps leaving dirty mugs in the shared sink. Which follows Rule 25?`,
        options: [
          { text: `A sign: "WASH YOUR MUGS!"`, why: `An order in capitals. Expect resentment.` },
          { text: `In the team chat: "Could we all try to wash our mugs before we leave, so the kitchen stays nice for the morning?"` },
          { text: `Throw the mugs away`, why: `A stunt, and a war.` },
        ],
        answer: 1,
        explanation: `A question, a reason, and "we". Same result, no grudges.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: turn three instructions you'd normally give today into questions with a reason. What were they, and how did people respond?`,
    starters: [`Instead of "...", I asked "..."`, `They...`],
  },
  deepen: {
    title: `Right and resented`,
    summary: `The instructor was right, and resented for months. Think of a time you were right but gave a curt order. What did it cost you?`,
  },
  notes: `Source: Carnegie, Part Four ch. 4: Dan Santarelli's vocational school in Wyoming, Pennsylvania (the blocked driveway, "wrap a chain around it", the class's resentment, the better way), "asking questions not only makes an order more palatable; it often stimulates the creativity", people accept orders they had a part in. Retold in our own words.`,
};

export default lesson;
