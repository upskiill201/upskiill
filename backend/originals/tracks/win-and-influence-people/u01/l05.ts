import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 (Practice + Checkpoint) — Rule 2: appreciation vs flattery; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `From the Heart, Not the Teeth`,
  summary: `Why would a steel king pay one man a million dollars a year, when others knew more about steel? The man told Carnegie his secret himself. It's not what most people would guess.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Tell sincere appreciation from flattery`,
    `Give praise that is honest and specific`,
    `Bring Rules 1 and 2 together in one reply`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `Flattery or appreciation?`,
      before: {
        label: `Flattery`,
        text: `"You're amazing, honestly the best designer I've ever worked with. Anyway, can you redo the slides by tonight?"`,
      },
      after: {
        label: `Appreciation`,
        text: `"The chart on slide four made the whole argument click for the board. Thank you, that took real thought."`,
      },
      notes: [
        `Flattery is general, and it usually wants something.`,
        `Appreciation is specific: it shows you actually noticed.`,
        `One comes from the teeth out. The other comes from the heart out.`,
      ],
    },
    {
      kind: `story`,
      title: `The million-dollar secret`,
      beats: [
        { speaker: `narrator`, text: `Charles Schwab was one of the first people in American business to be paid over a million dollars a year. Andrew Carnegie, the steel king, made him president of United States Steel when he was just thirty-eight.` },
        { speaker: `narrator`, text: `Was Schwab a genius? No. Did he know more about making steel than anyone? Schwab himself said plenty of his men knew more than he did. So why the million dollars?` },
        { speaker: `narrator`, text: `Schwab said it was his ability to deal with people. His greatest asset, he said, was arousing enthusiasm in his staff, and the way to bring out the best in a person was appreciation and encouragement.` },
        { speaker: `narrator`, text: `He said nothing kills ambition like criticism from the people above you. So he was slow to find fault and quick to praise. If he liked something, he said so, warmly and generously.` },
      ],
      choice: {
        prompt: `And what does the average person do instead?`,
        options: [
          { text: `Praises good work and stays quiet about mistakes`, outcome: `That's Schwab. The average person does the exact opposite.` },
          { text: `Shouts about the bad work and says nothing about the good`, outcome: `Exactly. If they don't like it, everyone hears about it. If they do like it, silence.`, best: true },
          { text: `Says nothing either way`, outcome: `Close, but most people do speak up, about the mistakes.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>Rockefeller knew it too. When a partner lost a million dollars on a bad deal, Rockefeller didn't criticise. He knew the man had done his best. So he found something to praise: the partner had saved sixty per cent of the money. "That's splendid," he said. "We don't always do that well upstairs."</p>` +
        `<p>Now, some of you are saying: that's flattery, and flattery doesn't work on intelligent people. Quite right! Flattery is shallow, selfish and insincere, and it usually fails. It's counterfeit money: pass it around and sooner or later it gets you into trouble.</p>` +
        `<p>The difference is simple. One is sincere and one isn't. One is unselfish, the other is selfish. We spend most of our time thinking about ourselves. Stop for a moment, think about the other person's good points, and you'll never need cheap flattery again.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 2: Give honest, sincere appreciation. Be warm in your approval and generous in your praise, and mean every word.`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 1 and 2.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Schwab say he was paid a million dollars a year?`,
        options: [
          { text: `He knew more about steel than anyone`, why: `He said many of his men knew more.` },
          { text: `His ability to deal with people and arouse their enthusiasm` },
          { text: `He worked longer hours than anyone`, why: `He never gave that as the reason.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Appreciation or flattery?`,
        groups: [`Appreciation`, `Flattery`],
        items: [
          { text: `"The way you calmed that customer down was brilliant."`, group: 0 },
          { text: `"You're the smartest person here. Lend me your notes?"`, group: 1 },
          { text: `"Thanks for staying late to fix the payroll error."`, group: 0 },
          { text: `"Love everything you do, honestly, everything."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `A partner lost Rockefeller a million dollars. What did Rockefeller do?`,
        options: [
          { text: `Fired him to set an example`, why: `He knew the man had done his best.` },
          { text: `Praised him for saving sixty per cent of the money` },
          { text: `Made him pay it back`, why: `No. He found something honest to praise.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The difference in one line.`,
        template: `Appreciation comes from the [[1]] out. Flattery comes from the [[2]] out.`,
        blanks: [[`heart`], [`teeth`]],
        distractors: [`head`, `wallet`],
      },
      {
        kind: `findBug`,
        prompt: `A thank-you note. Which line turns it into flattery?`,
        lines: [
          `Thanks for covering my shift on Saturday.`,
          `You kept the Saturday rush moving and nobody waited long.`,
          `You're basically perfect, so could you do next Saturday too?`,
        ],
        bug: 2,
        fix: `I owe you one. Tell me when you need cover.`,
        explanation: `Vague, over the top, and followed by a request. That's flattery, and people spot it at once.`,
      },
      {
        kind: `typeAnswer`,
        prompt: `Review (Lesson 1): Rule 1 says don't criticise, condemn or ________. (one word)`,
        answers: [`complain`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 3): what did Lincoln do with his angry letter to General Meade?`,
        options: [
          { text: `Sent it the same day`, why: `He never sent it.` },
          { text: `Kept it and never sent it` },
          { text: `Read it aloud to his cabinet`, why: `It was found among his papers after he died.` },
        ],
        answer: 1,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each idea to its lesson.`,
        pairs: [
          [`Criticism is like a homing pigeon`, `It flies back home`],
          [`The desire to be important`, `The deepest urge in human nature`],
          [`Flattery`, `Counterfeit money`],
          [`The unsent letter`, `Feel better without hurting anyone`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Make this praise specific: your colleague ran a great meeting.`,
        tiles: [`Ending`, `on`, `clear`, `next`, `steps`, `made`, `today's`, `meeting`, `work.`],
        distractors: [`Great`, `job!`],
      },
      {
        kind: `orderLines`,
        prompt: `How to give sincere appreciation, in order.`,
        lines: [`Stop thinking about yourself for a moment`, `Look for something they genuinely did well`, `Name exactly what it was`, `Say why it mattered`],
      },
      {
        kind: `mcq`,
        prompt: `A team member's report was late AND had a brilliant analysis section. Using Rules 1 and 2, what do you say first?`,
        options: [
          { text: `"This is late again. We need to talk about deadlines."`, why: `That's criticism first. They'll defend and never hear the praise.` },
          { text: `"The analysis section is the best I've seen from anyone. What slowed the rest down?"` },
          { text: `"Amazing work, you're a genius!" and nothing else`, why: `Over the top and vague. That's flattery, and the lateness goes unspoken.` },
        ],
        answer: 1,
        explanation: `Honest, specific praise, then a curious question about the cause. Both rules at once.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: give one person a specific, honest thank-you today. Name exactly what they did and why it mattered. Write down who, what you said, and how they reacted.`,
    starters: [`I thanked... for...`, `I said...`, `They...`],
  },
  deepen: {
    title: `The hay`,
    summary: `There's an old story of a farm woman who served her family a pile of hay for dinner. When they protested, she said in twenty years of cooking she'd never had a word to tell her they weren't eating hay. Who in your life has been cooking for years without a word?`,
  },
  notes: `Source: Carnegie, Part One ch. 2: Schwab's salary, age 38, US Steel, his own words on appreciation and criticism (paraphrased), "the average person does the opposite"; Rockefeller and Edward Bedford (60% saved); flattery as counterfeit money, heart out vs teeth out; 95% of time thinking about ourselves; the farm woman and the hay (Carnegie says the story is apocryphal). Retold in our own words.`,
};

export default lesson;
