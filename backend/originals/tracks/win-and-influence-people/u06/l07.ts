import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 7 (Story) — Rule 18: be sympathetic with the other person's ideas and desires. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `The Magic Phrase`,
  summary: `Carnegie made a silly slip on the radio and was flooded with furious letters. One woman's was so scorching he wanted to tell her exactly what he thought. Instead he picked up the phone and used a phrase that works on almost anyone.`,
  minutes: 11,
  outcomes: [
    `Use the phrase that ends ill feeling`,
    `Sympathise sincerely with angry people`,
    `Turn an insult into a friendship`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `"I don't blame you one bit"`,
      html:
        `<p>Wouldn't you like a magic phrase that stops arguments, ends ill feeling, creates goodwill and makes people listen? Here it is:</p>` +
        `<p><strong>"I don't blame you one bit for feeling as you do. If I were you, I'd feel just the same."</strong></p>` +
        `<p>That will soften the crankiest person alive. And you can say it and mean it, because if you were the other person, you would feel just as they do. If you'd been born with their body, their temperament, their life and experiences, you'd be exactly what they are. You deserve very little credit for being what you are, and the irritated, unreasonable people who come to you deserve very little blame for being what they are.</p>` +
        `<p>Three-quarters of the people you'll ever meet are hungry for sympathy. Give it to them, and they'll love you.</p>`,
    },
    {
      kind: `story`,
      title: `Concord`,
      beats: [
        { speaker: `narrator`, text: `Carnegie once gave a radio talk about Louisa May Alcott, author of Little Women. He knew perfectly well she'd lived in Concord, Massachusetts. But without thinking, he said Concord, New Hampshire. Twice.` },
        { speaker: `narrator`, text: `Letters and telegrams poured in, some indignant, a few insulting. One woman from an old Massachusetts family wrote with such scorching fury she could hardly have been angrier if he'd called Miss Alcott a cannibal.` },
        { speaker: `narrator`, text: `Carnegie wanted to write back: I made a mistake in geography, madam, but you've made a far worse one in courtesy. That was just going to be the opening line. Then he stopped himself. Any hothead could do that. He decided to try to turn her hostility into friendliness, as a kind of game.` },
        { speaker: `narrator`, text: `Next time he was in her city, he phoned her: he wanted to thank her for her letter, and apologise for his stupid blunder. It was so kind of her to take the time to write.` },
      ],
      choice: {
        prompt: `What did she say?`,
        options: [
          { text: `"I should think so too."`, outcome: `Quite the opposite.` },
          { text: `"I'm sorry, Mr. Carnegie, I lost my temper. I must apologise."`, outcome: `That's it. They traded apologies, she told him how proud she was of her home state, and by the end she said: "You must be a very nice person. I'd like to know you better."`, best: true },
          { text: `She hung up`, outcome: `She stayed, and by the end she wanted to be friends.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 18: Be sympathetic with the other person's ideas and desires. "If I were you, I'd feel just the same."`,
    },
  ],
  apply: {
    scenario: `Rule 18: Be sympathetic.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What's the magic phrase?`,
        options: [
          { text: `"I don't blame you one bit. If I were you, I'd feel the same."` },
          { text: `"Calm down, it's not a big deal."`, why: `That's the opposite of sympathy.` },
          { text: `"I'm sure you'll see it differently tomorrow."`, why: `That dismisses how they feel now.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `How many people want sympathy?`,
        template: `Three-[[1]] of the people you will ever meet are hungry for [[2]].`,
        blanks: [[`quarters`, `fourths`], [`sympathy`]],
        distractors: [`halves`, `money`],
      },
      {
        kind: `mcq`,
        prompt: `What was Carnegie's radio mistake?`,
        options: [
          { text: `He said Louisa May Alcott lived in Concord, New Hampshire` },
          { text: `He got the title of her book wrong`, why: `It was the state.` },
          { text: `He called her a cannibal`, why: `That's how angry the letter was, not what he said.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Sympathy or self-defence?`,
        groups: [`Sympathy`, `Self-defence`],
        items: [
          { text: `"I'd be upset too if that happened to me."`, group: 0 },
          { text: `"Well, you're overreacting."`, group: 1 },
          { text: `"That sounds really frustrating."`, group: 0 },
          { text: `"It's not my fault you misunderstood."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `By the end of the call, the angry woman said: "You must be a very nice ________." (one word)`,
        answers: [`person`, `man`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Replying to an angry customer. Which line cancels the sympathy?`,
        lines: [
          `I don't blame you one bit for being annoyed.`,
          `In your shoes, I'd feel exactly the same.`,
          `But honestly, most people manage to read the instructions.`,
        ],
        bug: 2,
        fix: `Let me sort it out for you right now.`,
        explanation: `A dig after the sympathy tells them you never meant it.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each step of Carnegie's call to what he said.`,
        pairs: [
          [`Thanks`, `"I want to thank you for your letter"`],
          [`Apology`, `"It was a stupid blunder"`],
          [`Appreciation`, `"So kind of you to take the time to write"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what does Rule 12 say to do when you're wrong?`,
        options: [
          { text: `Admit it quickly and emphatically` },
          { text: `Explain why it happened`, why: `Explanations sound like alibis.` },
          { text: `Wait to see if anyone notices`, why: `Get there first.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the magic phrase.`,
        tiles: [`If`, `I`, `were`, `you,`, `I'd`, `feel`, `the`, `same.`],
        distractors: [`wrong.`],
      },
      {
        kind: `mcq`,
        prompt: `Someone leaves a furious comment about a small mistake in something you published. What would Carnegie do?`,
        options: [
          { text: `Point out their rudeness`, why: `Any hothead could do that. Most would.` },
          { text: `Thank them for taking the time, admit the slip, and say you understand why it bothered them` },
          { text: `Delete the comment`, why: `The person is still angry, and now ignored.` },
        ],
        answer: 1,
        explanation: `Thanks, apology and sympathy turned Carnegie's angriest critic into someone who wanted to know him better.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: use the magic phrase sincerely on someone who's upset today: "I don't blame you for feeling that way. I'd feel the same." What happened?`,
    starters: [`Someone was upset about...`, `I said...`, `They...`],
  },
  deepen: {
    title: `The game`,
    summary: `Carnegie treated the furious letter as a game: could he turn her hostility into friendliness? He said it was far more fun than telling her to jump in the river. Next time someone's rude to you, play the game.`,
  },
  notes: `Source: Carnegie, Part Three ch. 9 "What Everybody Wants": the magic phrase, Al Capone and "the only reason you are not a rattlesnake", "three-fourths of the people", the Louisa May Alcott broadcast (Concord, New Hampshire said twice), the Colonial Dame's letter and the phone call (paraphrased). Retold in our own words.`,
};

export default lesson;
