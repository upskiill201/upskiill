import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1 (Story) — Rule 13: begin in a friendly way. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `A Drop of Honey`,
  summary: `1915. He was the most hated man in Colorado. Strikers had been shot, troops called in, and the miners wanted him hanged. He stood up in front of them to speak. His first sentence decided everything.`,
  minutes: 11,
  outcomes: [
    `Explain why a friendly start beats a strong argument`,
    `Open a hostile conversation with genuine warmth`,
    `See that people can be led, but not driven`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Colorado, 1915`,
      beats: [
        { speaker: `narrator`, text: `For two terrible years, one of the bloodiest strikes in American history shook Colorado. Miners demanded higher pay from a coal company controlled by John D. Rockefeller Jr. Property was destroyed. Troops were called in. Strikers were shot.` },
        { speaker: `narrator`, text: `Rockefeller was the most hated man in the state. The air was thick with hatred. And he wanted to win the strikers round to his way of thinking.` },
        { speaker: `narrator`, text: `First, he spent weeks visiting the mining camps, meeting the workers' representatives, visiting their homes, meeting their wives and children. Then he stood up before the strikers' representatives to speak.` },
      ],
      choice: {
        prompt: `How did he begin?`,
        options: [
          { text: `With the facts on wages, to show the company's side clearly`, outcome: `That would have stirred up more anger. He knew it.` },
          { text: `"This is a red-letter day in my life. I'm proud to be here... we meet not as strangers, but as friends."`, outcome: `That's it. He said only two weeks before he'd have been a stranger to most of them, but having visited their homes and met their families, they met as friends. The strikers went back to work without another word about the pay rise they'd fought for.`, best: true },
          { text: `By apologising for everything`, outcome: `He didn't grovel. He was warm, respectful and friendly.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Honey and gall`,
      html:
        `<p>Imagine if Rockefeller had argued, hurled facts at them, and proved by every rule of logic that they were wrong. More anger, more hatred, more revolt.</p>` +
        `<p>If a person's heart is full of bad feeling towards you, you can't win them over with all the logic in the world. Scolding parents, bossy managers and nagging partners should remember: people don't want to change their minds. They can't be forced or driven. But they may be led, if we're gentle and friendly.</p>` +
        `<p>President Woodrow Wilson put it this way: come at me with your fists doubled, and mine will double just as fast. But come and say "let's sit down and work out why we differ", and we'll find we're not so far apart after all.</p>` +
        `<p>Lincoln said it a century earlier: a drop of honey catches more flies than a gallon of gall. If you want to win someone to your cause, first convince them you're their sincere friend. That's the drop of honey that catches their heart, and the heart is the high road to reason.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 13: Begin in a friendly way. A drop of honey catches more flies than a gallon of gall.`,
    },
  ],
  apply: {
    scenario: `Rule 13: Begin in a friendly way.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Rockefeller do in the weeks before his speech?`,
        options: [
          { text: `Prepared legal arguments`, why: `He prepared friendships, not arguments.` },
          { text: `Visited the camps, the workers' homes and their families` },
          { text: `Hired more security`, why: `He went among them in person.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Rockefeller's key line.`,
        template: `We meet here not as [[1]], but as [[2]].`,
        blanks: [[`strangers`], [`friends`]],
        distractors: [`enemies`, `equals`],
      },
      {
        kind: `sortGroups`,
        prompt: `Honey or gall?`,
        groups: [`Honey`, `Gall`],
        items: [
          { text: `"Thanks for meeting me, I know it's been a hard month."`, group: 0 },
          { text: `"Let's be clear, you're in breach of contract."`, group: 1 },
          { text: `"I'm glad we can sit down and talk this through."`, group: 0 },
          { text: `"I've got the facts here that prove my point."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `A drop of honey catches more flies than a gallon of ________. (one word)`,
        answers: [`gall`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `What happened after Rockefeller's speech?`,
        options: [
          { text: `The strike got worse`, why: `It ended.` },
          { text: `The strikers went back to work without another word about the pay rise` },
          { text: `He agreed to every demand`, why: `They went back without the rise they'd fought for.` },
        ],
        answer: 1,
      },
      {
        kind: `findBug`,
        prompt: `Opening a tough conversation with your landlord. Which line is gall?`,
        lines: [
          `Thanks for coming over, I really like living here.`,
          `Before anything else, you should know I've spoken to a lawyer.`,
          `I wanted to talk about the rent for next year.`,
        ],
        bug: 1,
        fix: `You've always been quick to fix things, which I appreciate.`,
        explanation: `Fists doubled before you've begun. Your landlord's fists will double just as fast.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their words on friendliness.`,
        pairs: [
          [`Lincoln`, `A drop of honey catches more flies`],
          [`Woodrow Wilson`, `Come with doubled fists and mine double too`],
          [`Rockefeller Jr.`, `Not as strangers, but as friends`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what's the only way to get the best of an argument?`,
        options: [
          { text: `Avoid it` },
          { text: `Prepare better`, why: `Even if you win, you lose.` },
          { text: `Bring a witness`, why: `The rule is to avoid it.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Wilson's friendly invitation.`,
        tiles: [`Let's`, `sit`, `down`, `and`, `work`, `out`, `why`, `we`, `differ.`],
        distractors: [`fight`],
      },
      {
        kind: `mcq`,
        prompt: `Your neighbour's dog barks all night and you've barely slept. You're furious. How should you open the conversation?`,
        options: [
          { text: `"Your dog is ruining my life."`, why: `Gall. They'll defend the dog, and themselves.` },
          { text: `"Hi! I know dogs can be a handful. Can I ask you something about the evenings?"` },
          { text: `Leave an anonymous note`, why: `Anonymous complaints start feuds.` },
        ],
        answer: 1,
        explanation: `A friendly opening makes them want to help. A furious one makes them want to win.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: start one hard conversation today with something genuinely friendly. What did you open with, and how did it change the conversation?`,
    starters: [`The hard conversation was about...`, `I opened with...`, `It went...`],
  },
  deepen: {
    title: `Visit first`,
    summary: `Rockefeller spent weeks making friends before he made his case. Is there someone you need to win over soon? What could you do this week, before the big conversation, to meet as friends rather than strangers?`,
  },
  notes: `Source: Carnegie, Part Three ch. 4 "A Drop of Honey": Woodrow Wilson's "fists doubled", John D. Rockefeller Jr. and the Colorado Fuel and Iron strike (1915, camps and homes, speech opening paraphrased with key phrases), "can't be forced or driven but may be led", Lincoln's "drop of honey" maxim. Retold in our own words.`,
};

export default lesson;
