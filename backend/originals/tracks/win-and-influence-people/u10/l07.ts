import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 7 (Story) — Rule 30: make the other person happy about doing the thing you suggest. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `Too Important for the Job`,
  summary: `1915. The Secretary of State longed to be America's peace envoy to Europe. The President chose someone else. The man chosen had to break the news, and somehow leave the Secretary pleased about it.`,
  minutes: 11,
  outcomes: [
    `Make people happy about what you ask of them`,
    `Frame a request or refusal so it honours the other person`,
    `See how failing at this can wreck even great plans`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The peace envoy`,
      beats: [
        { speaker: `narrator`, text: `In 1915 the nations of Europe had been slaughtering each other for over a year. President Woodrow Wilson decided to send a personal envoy to talk peace with Europe's leaders.` },
        { speaker: `narrator`, text: `His Secretary of State, William Jennings Bryan, a champion of peace, longed to go. He saw a chance to do great good and make his name immortal. But Wilson chose his close friend, Colonel House. And it fell to House to break the news to Bryan without offending him.` },
        { speaker: `narrator`, text: `Bryan was clearly disappointed. He said he'd planned to do it himself.` },
      ],
      choice: {
        prompt: `What did House tell him?`,
        options: [
          { text: `That the President thought House was better suited`, outcome: `True, perhaps, but it would have wounded Bryan.` },
          { text: `That the President thought it unwise for anyone to go officially, and if Bryan went, he'd attract so much attention people would wonder why he was there`, outcome: `That's it. House practically told Bryan he was too important for the job, and Bryan was satisfied.`, best: true },
          { text: `That it was a minor role anyway`, outcome: `That would have belittled the mission, and Bryan's hopes.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `A favour to the President`,
      html:
        `<p>Wilson used the same approach when he invited William McAdoo to join his cabinet as Secretary of the Treasury, the highest honour he could give. McAdoo recalled that Wilson had a delightful way of putting things: he made it feel as if, by accepting this great honour, McAdoo would be doing him a favour.</p>` +
        `<p>Unfortunately, Wilson didn't always use such tact. When he took America into the League of Nations, he left out the leaders of the other party, took unknown men from his own party to the peace conference, and refused to let his opponents feel the League was partly their idea. The result? The Senate rejected it, America stayed out of the League, and Wilson's career and health were ruined. It altered the history of the world.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 30: Make the other person happy about doing the thing you suggest.`,
    },
  ],
  apply: {
    scenario: `Rule 30: Make them happy to do it.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What role did Bryan want?`,
        options: [
          { text: `Peace envoy to Europe` },
          { text: `President`, why: `He wanted the peace mission.` },
          { text: `Ambassador to France`, why: `He wanted to be the peace envoy.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `How did House make Bryan accept the decision?`,
        options: [
          { text: `He implied Bryan was too important to go unnoticed` },
          { text: `He said Bryan wasn't qualified`, why: `That would have hurt.` },
          { text: `He offered him money`, why: `He offered him importance.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `How Wilson invited McAdoo.`,
        template: `He made it seem that by accepting the [[1]], McAdoo would be doing him a [[2]].`,
        blanks: [[`honour`, `honor`], [`favour`, `favor`]],
        distractors: [`job`, `loan`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Which organisation did America stay out of because Wilson didn't make his opponents feel it was their idea too? The League of ________. (one word)`,
        answers: [`Nations`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Makes them happy to do it, or not?`,
        groups: [`Happy to do it`, `Not happy`],
        items: [
          { text: `"You're the only one I'd trust with this."`, group: 0 },
          { text: `"Someone has to do it, so it's you."`, group: 1 },
          { text: `"You'd be doing me a real favour by leading this."`, group: 0 },
          { text: `"It's your turn."`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Asking a colleague to take over a project. Which line spoils it?`,
        lines: [
          `This project needs someone with your judgement.`,
          `You'd be doing the whole team a huge favour.`,
          `Nobody else wanted it anyway.`,
        ],
        bug: 2,
        fix: `I can't think of anyone better.`,
        explanation: `It turns an honour into a leftover. House made Bryan feel too important, not second choice.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to the outcome.`,
        pairs: [
          [`Colonel House`, `Bryan left satisfied`],
          [`Wilson with McAdoo`, `An honour felt like a favour`],
          [`Wilson with the League`, `The Senate rejected it`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what's Rule 16?`,
        options: [
          { text: `Let the other person feel the idea is theirs` },
          { text: `Make them happy to do it`, why: `That's Rule 30.` },
          { text: `Give a fine reputation`, why: `That's Rule 28.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a request that honours them.`,
        tiles: [`You'd`, `be`, `doing`, `me`, `a`, `real`, `favour.`],
        distractors: [`must`],
      },
      {
        kind: `mcq`,
        prompt: `You need to tell a keen volunteer they won't be the event's host this year. What would House do?`,
        options: [
          { text: `"We picked someone better."`, why: `That wounds them.` },
          { text: `"We need you behind the scenes. You're the one person who can keep the whole night running."` },
          { text: `Don't tell them; let them find out`, why: `The worst possible way.` },
        ],
        answer: 1,
        explanation: `Like House with Bryan: make the decision feel like a sign of their importance.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: turn one request this week into an honour, so the person feels important, even grateful, to do it. What did you ask, and how did they respond?`,
    starters: [`I needed... to...`, `I put it as...`, `They...`],
  },
  deepen: {
    title: `Wilson's lesson`,
    summary: `Wilson knew this rule and still broke it when it mattered most. Who in your life needs to feel part of a big decision you're about to make? Bring them in before you announce it.`,
  },
  notes: `Source: Carnegie, Part Four ch. 9 "Making People Glad to Do What You Want": Colonel House and William Jennings Bryan (1915 peace emissary, from House's diary, paraphrased), Wilson inviting William Gibbs McAdoo to be Secretary of the Treasury, Wilson and the League of Nations (Root, Hughes, Lodge left out). Retold in our own words.`,
};

export default lesson;
