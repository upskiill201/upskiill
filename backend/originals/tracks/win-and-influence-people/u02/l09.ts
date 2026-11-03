import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 (Pressure) — Rule 6 when you're "bad with names": Napoleon III's method and FDR. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `How an Emperor Remembered`,
  summary: `"I'm just bad with names." An emperor of France had more to do than you, and still boasted he remembered the name of everyone he met. His method takes about a minute.`,
  minutes: 12,
  outcomes: [
    `Use a step-by-step method to remember names`,
    `Stop using "too busy" as an excuse`,
    `Remember the quiet people, not just the important ones`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `Napoleon III's method`,
      steps: [
        { title: `Make sure you heard it`, body: `If he didn't catch a name clearly, he said: "So sorry, I didn't get the name clearly."` },
        { title: `Check the spelling`, body: `If it was an unusual name, he asked: "How is it spelled?"` },
        { title: `Use it in the conversation`, body: `He took the trouble to repeat the name several times while they talked.` },
        { title: `Link it to their face`, body: `He tried to connect the name in his mind with the person's features, expression and general look.` },
        { title: `Write it, then tear it up`, body: `For important people, once he was alone he wrote the name down, looked at it, concentrated on it, then tore the paper up. That way he had an eye picture of the name as well as a sound.` },
      ],
    },
    {
      kind: `reading`,
      title: `"I'm too busy"`,
      html:
        `<p>Most people don't remember names for a simple reason: they don't spend the time and effort to concentrate, repeat and fix the name in their minds. They make excuses. They're too busy.</p>` +
        `<p>Were they busier than Franklin D. Roosevelt? A car company built a special car for him, because his legs were paralysed. An engineer named Chamberlain delivered it to the White House with a mechanic, and taught the President how to use all the hand controls.</p>` +
        `<p>Roosevelt called Chamberlain by name, made him feel at ease, and praised every detail he'd worked on, in front of his staff. But here's the part that matters. The mechanic was shy. He stayed in the background, never spoke, and Roosevelt heard his name only once, when he arrived.</p>` +
        `<p>Before they left, the President looked for the mechanic, shook his hand, called him by his name, and thanked him for coming to Washington. A few days later Chamberlain received a signed photo and a note of thanks. How Roosevelt found the time, he said, was a mystery.</p>` +
        `<p>Emerson said good manners are made of small sacrifices. Remembering a name is one of them.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `To recall a name is statesmanship. To forget it is to be forgotten. It costs a minute of attention. Spend it.`,
    },
  ],
  apply: {
    scenario: `Rule 6, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Napoleon III say if he didn't catch a name?`,
        options: [
          { text: `Nothing; he guessed`, why: `Guessing is how names get lost.` },
          { text: `"So sorry, I didn't get the name clearly."` },
          { text: `"I'll call you sir."`, why: `He wanted the name, not a cover.` },
        ],
        answer: 1,
      },
      {
        kind: `orderLines`,
        prompt: `Napoleon III's method, in order.`,
        lines: [`Make sure you heard it`, `Ask how it's spelled`, `Repeat it as you talk`, `Link it to their face`, `Write it down later, then tear it up`],
      },
      {
        kind: `fillBlank`,
        prompt: `Why write it down?`,
        template: `To get an [[1]] picture of the name as well as an [[2]] one.`,
        blanks: [[`eye`], [`ear`]],
        distractors: [`exact`, `old`],
      },
      {
        kind: `mcq`,
        prompt: `Who did Roosevelt go out of his way to thank by name?`,
        options: [
          { text: `The car company's chairman`, why: `He wasn't there.` },
          { text: `The shy mechanic who never spoke, and whose name he'd heard once` },
          { text: `His own secretary`, why: `He mentioned her, but the story is about the mechanic.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `Emerson: good manners are made up of small ________. (one word)`,
        answers: [`sacrifices`, `sacrifice`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Excuse or effort?`,
        groups: [`Excuse`, `Effort`],
        items: [
          { text: `"I'm just terrible with names."`, group: 0 },
          { text: `Repeating the name back: "Great to meet you, Tomasz."`, group: 1 },
          { text: `"I meet too many people to remember them."`, group: 0 },
          { text: `Jotting the name in your phone after the meeting`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Meeting someone new. Which step loses the name?`,
        lines: [
          `"Sorry, could you say your name again?"`,
          `"Is that Ayesha with a y?"`,
          `"Great, anyway, I'll just call you 'you there'."`,
        ],
        bug: 2,
        fix: `"Lovely to meet you, Ayesha."`,
        explanation: `You did the hard part, then never used it. Saying it back is what fixes it in your memory.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each name story.`,
        pairs: [
          [`Jim Farley`, `Fifty thousand first names`],
          [`Nicodemus Papadoulos`, `Fifteen years of being called Nick`],
          [`Eunice`, `Extra ham and lettuce`],
          [`Roosevelt`, `Thanked the shy mechanic by name`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the best way to praise someone so it isn't flattery?`,
        options: [
          { text: `Be specific about what they did and why it mattered` },
          { text: `Say it loudly so everyone hears`, why: `Volume doesn't make it sincere.` },
          { text: `Praise them every day`, why: `Frequent but vague is still flattery.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your first day in a new job: you'll meet fifteen people. What's the realistic way to use this lesson?`,
        options: [
          { text: `Don't bother; nobody expects you to remember`, why: `Everyone remembers the newcomer who remembered them.` },
          { text: `Repeat each name as you meet them, link it to something about them, and note them all down at lunch` },
          { text: `Ask for the staff list and memorise it tonight`, why: `A list without faces won't stick. Names fix to people.` },
        ],
        answer: 1,
        explanation: `Napoleon's method, done quickly: hear it, say it, link it, write it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: use Napoleon's method on the next new person you meet. Hear it, check it, say it back, link it, write it down. Who was it, and do you still remember tomorrow?`,
    starters: [`I met...`, `I linked their name to...`, `The next day I...`],
  },
  deepen: {
    title: `The quiet one`,
    summary: `At your next gathering, find the person who's said least and make sure you learn their name and use it before you leave. That's what Roosevelt did for the mechanic.`,
  },
  notes: `Source: Carnegie, Part Two ch. 3: Napoleon III's method (didn't get the name clearly, spelling, repetition, association, writing and tearing up), "too busy" excuse, FDR and W. F. Chamberlain's special car and the shy mechanic, Emerson "good manners are made up of petty sacrifices", politician's maxim "to recall a voter's name is statesmanship. To forget it is oblivion" (paraphrased). Retold in our own words.`,
};

export default lesson;
