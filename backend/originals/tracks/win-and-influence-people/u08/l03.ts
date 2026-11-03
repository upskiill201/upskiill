import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 3 (Pressure) — Rule 22 when you're frustrated: find the real strength first. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Novocain Before the Drill`,
  summary: `The head teller wanted the new trainee fired: she couldn't balance her cash drawer, however often she was shown. Her branch manager watched her for a day before deciding.`,
  minutes: 12,
  outcomes: [
    `Find a genuine strength before correcting someone who frustrates you`,
    `Use praise to calm a nervous person before teaching them`,
    `Keep praise honest, never invented`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The teller trainee`,
      before: {
        label: `The head teller's view`,
        text: `Dorothy managed a branch of a credit union. Her head teller came in fuming: the new trainee was holding everyone up at closing time because she was so slow to balance her cash. "I've shown her over and over. She's got to go."`,
      },
      after: {
        label: `What Dorothy did`,
        text: `The next day Dorothy watched. The trainee was quick, accurate and lovely with customers. After closing, Dorothy found her nervous and upset. She praised her friendliness and the speed and accuracy of her daily work. Then she suggested they go through balancing together. Once the trainee knew her manager had confidence in her, she picked it up easily. No problems after that.`,
      },
      notes: [
        `The head teller only saw the weakness. Dorothy looked for the strength first.`,
        `Confidence calmed the nerves that were causing the mistakes.`,
      ],
    },
    {
      kind: `reading`,
      title: `The dentist`,
      html:
        `<p>Beginning with praise is like the dentist who starts with an anaesthetic. The patient still gets drilled, but the injection takes the pain away.</p>` +
        `<p>The hard part comes when you're frustrated. When someone has let you down, everything in you wants to go straight to the problem. That's exactly when this rule matters most, because a frustrated correction lands on a person who's already defensive, or, like the trainee, already frightened.</p>` +
        `<p>And remember Carnegie's warning from the very start: this only works if the praise is honest. Dorothy didn't invent anything. She watched until she saw what the trainee genuinely did well. If you have to make it up, it's flattery, and people can tell.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `When you're frustrated, look harder for the real strength, not softer for an excuse. Praise first is the anaesthetic before the drill.`,
    },
  ],
  apply: {
    scenario: `Rule 22, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the head teller want to do with the trainee?`,
        options: [
          { text: `Fire her` },
          { text: `Give her more training`, why: `She'd given up on training.` },
          { text: `Move her to another branch`, why: `She wanted her gone.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What did Dorothy do before correcting the trainee?`,
        options: [
          { text: `Watched her work and praised what she did well` },
          { text: `Gave her a written warning`, why: `She gave her confidence instead.` },
          { text: `Asked the head teller to try once more`, why: `She did it herself, with praise.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `The dentist comparison.`,
        template: `Beginning with praise is like the dentist who begins with an [[1]]. The patient still gets a [[2]].`,
        blanks: [[`anaesthetic`, `anesthetic`, `injection`], [`drilling`]],
        distractors: [`lollipop`, `refund`],
      },
      {
        kind: `sortGroups`,
        prompt: `Honest praise, or invented to soften the blow?`,
        groups: [`Honest`, `Invented`],
        items: [
          { text: `"Customers love dealing with you, I've seen it."`, group: 0 },
          { text: `"Everything you do is great, but..."`, group: 1 },
          { text: `"Your daily transactions are fast and accurate."`, group: 0 },
          { text: `"You're the best trainee we've ever had" (said to everyone)`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `What was the trainee slow at? Balancing her ________ drawer. (one word)`,
        answers: [`cash`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `You're frustrated with a teammate who missed a handover. Which line should you drop?`,
        lines: [
          `Your notes on the client calls are always really thorough.`,
          `I don't know why I bother relying on you.`,
          `Could we set a handover checklist so nothing slips?`,
        ],
        bug: 1,
        fix: `This week's handover got missed, so let's fix it together.`,
        explanation: `Frustration leaks out as a verdict on them. Keep the praise honest and the correction about the task.`,
      },
      {
        kind: `orderLines`,
        prompt: `Dorothy's approach, in order.`,
        lines: [`Watch before deciding`, `Notice what they do well`, `Praise it sincerely`, `Teach the weak spot together`],
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match the correction method to its story.`,
        pairs: [
          [`Praise the dress, then the punctuation`, `Coolidge`],
          [`Praise strengths, then name grave faults`, `Lincoln to Hooker`],
          [`Watch, praise, then teach`, `Dorothy and the trainee`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what did Carnegie say to the boys at the campfire the second time?`,
        options: [
          { text: `"Having a good time, boys? What are you cooking?"` },
          { text: `"You'll be arrested."`, why: `That was the first time.` },
          { text: `"Go home."`, why: `He started friendly.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your teenager's school report is mostly poor, but their art grade is excellent. You're frustrated. What does this lesson suggest?`,
        options: [
          { text: `Go straight to the poor grades so they know you're serious`, why: `They'll defend, or shut down.` },
          { text: `Start with sincere pride in the art grade, then talk calmly about one subject to work on together` },
          { text: `Only mention the art`, why: `Praise first, but the problem still needs raising.` },
        ],
        answer: 1,
        explanation: `The anaesthetic first, then the drilling, just one subject at a time.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: think of someone who's frustrating you. Watch them, like Dorothy did, until you find one thing they genuinely do well. Write it down, and start your next conversation with it.`,
    starters: [`... frustrates me because...`, `What they genuinely do well is...`],
  },
  deepen: {
    title: `Nerves cause mistakes`,
    summary: `The trainee's problem wasn't ability. It was nerves. Before correcting anyone this week, ask: are they struggling because they can't, or because they're anxious? Confidence fixes the second.`,
  },
  notes: `Source: Carnegie, Part Four ch. 1: Dorothy Wrublewski of the Fort Monmouth Federal Credit Union and the teller trainee; the dentist and Novocain comparison; sincerity requirement from Part One ch. 2. Retold in our own words.`,
};

export default lesson;
