import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 (Story) — Rule 4: become genuinely interested in other people. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `The Dog Who Never Read a Book`,
  summary: `Who is the greatest winner of friends the world has ever known? You may meet one tomorrow, coming down the street. It has never read a single book on psychology, and it never needed to.`,
  minutes: 11,
  outcomes: [
    `Explain why being interested beats being interesting`,
    `Notice how much people think about themselves`,
    `Show real interest in someone in your first minutes together`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Tippy`,
      beats: [
        { speaker: `narrator`, text: `Why study a book to learn how to win friends? Why not study the greatest friend-winner of them all? When you get within ten feet of him, he starts wagging his tail. Stop and pat him, and he almost jumps out of his skin to show how much he likes you.` },
        { speaker: `narrator`, text: `And there's no catch. He doesn't want to sell you anything. A hen has to lay eggs and a cow has to give milk. A dog makes its living by giving you nothing but affection.` },
        { speaker: `narrator`, text: `When Carnegie was five, his father bought him a little yellow-haired puppy for fifty cents. Every afternoon at half past four, Tippy sat in the front yard staring at the path. The moment he heard the boy's voice, he was off like a shot, racing up the hill to meet him, barking with joy.` },
      ],
      choice: {
        prompt: `What did Tippy know without ever reading a book?`,
        options: [
          { text: `That you make friends by being impressive`, outcome: `The opposite. Tippy never tried to impress anyone.` },
          { text: `That you make more friends in two months by being interested in others than in two years trying to get them interested in you`, outcome: `That's it. Let me repeat it, because it matters: two months of interest beats two years of trying to be interesting.`, best: true },
          { text: `That friends come to those who wait`, outcome: `Tippy didn't wait. He raced up the hill every single day.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `I, I, I`,
      html:
        `<p>Here's the uncomfortable truth. People are not interested in you. They're not interested in me. They're interested in themselves, morning, noon and after dinner.</p>` +
        `<p>A telephone company once studied five hundred calls to find the word people used most. You've guessed it: "I". It came up 3,900 times.</p>` +
        `<p>When you look at a group photo you're in, whose face do you look for first?</p>` +
        `<p>So people who try to impress others never make many true friends. Napoleon, one of the most famous men who ever lived, told his wife near the end that she was the only person in the world he could rely on. Historians doubt he could even rely on her.</p>` +
        `<p>The psychologist Alfred Adler put it sharply: it's the person who isn't interested in other people who has the hardest time in life and does the most harm to others. All human failures, he said, come from such people.</p>`,
    },
    {
      kind: `compare`,
      title: `The magician`,
      before: {
        label: `Most magicians`,
        text: `They'd look out at the audience and think: a crowd of fools out there. I'll trick them all right.`,
      },
      after: {
        label: `Howard Thurston`,
        text: `The most famous magician of his day said that before every show he told himself: I'm grateful these people came. I'll give them the very best I can. And over and over: I love my audience. I love my audience.`,
      },
      notes: [
        `Thurston admitted others knew as many tricks as he did.`,
        `What set him apart was showmanship, and a genuine interest in the people watching.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 4: Become genuinely interested in other people. To be interesting, be interested.`,
    },
  ],
  apply: {
    scenario: `Rule 4: Become genuinely interested in other people.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why is a dog such a great winner of friends?`,
        options: [
          { text: `It's interested in you and wants nothing back` },
          { text: `It's cute`, why: `Plenty of cute things have no friends. It's the interest.` },
          { text: `It obeys you`, why: `It's not obedience. It's that it's always glad to see you.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Let me repeat it.`,
        template: `You make more friends in two [[1]] by being interested in others than in two [[2]] trying to get them interested in you.`,
        blanks: [[`months`], [`years`]],
        distractors: [`days`, `weeks`],
      },
      {
        kind: `typeAnswer`,
        prompt: `In 500 phone calls, which word came up most? (one word)`,
        answers: [`I`, `"I"`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Trying to be interesting, or being interested?`,
        groups: [`Trying to be interesting`, `Being interested`],
        items: [
          { text: `Telling your best travel story first`, group: 0 },
          { text: `"Where did you grow up?"`, group: 1 },
          { text: `Mentioning your new job title early`, group: 0 },
          { text: `"How did you get into that?"`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did Thurston say to himself before every show?`,
        options: [
          { text: `"I'll fool them all"`, why: `That's what the ordinary magicians thought.` },
          { text: `"I love my audience"` },
          { text: `"Don't make a mistake"`, why: `His focus wasn't on himself.` },
        ],
        answer: 1,
      },
      {
        kind: `findBug`,
        prompt: `Your first message to a new teammate. Which line shows no interest in them?`,
        lines: [
          `Welcome to the team!`,
          `I've been here five years, so I basically know everything.`,
          `What are you most looking forward to working on?`,
        ],
        bug: 1,
        fix: `I'd love to hear what you worked on before this.`,
        explanation: `It's about you. Swap it for a question about them.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what they show us.`,
        pairs: [
          [`Tippy`, `Interest wins friends without trying`],
          [`Napoleon`, `Impressing people leaves you alone`],
          [`Alfred Adler`, `People uninterested in others struggle most`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the only way to get anybody to do anything?`,
        options: [
          { text: `Make them want to do it` },
          { text: `Explain it clearly`, why: `Clear isn't enough if they don't want to.` },
          { text: `Offer money`, why: `Money is one want among many. The rule is broader.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the rule in five words.`,
        tiles: [`To`, `be`, `interesting,`, `be`, `interested.`],
        distractors: [`impressive.`],
      },
      {
        kind: `mcq`,
        prompt: `At a party you're nervous and plan to rehearse a few good stories about yourself. What does this lesson suggest instead?`,
        options: [
          { text: `Rehearse even better stories`, why: `Trying to be interesting is the slow road.` },
          { text: `Go in curious: ask people about themselves and really listen` },
          { text: `Stay quiet and wait for someone to approach`, why: `Tippy didn't wait. He went to meet people.` },
        ],
        answer: 1,
        explanation: `Nerves shrink when your attention is on them, not on how you're coming across.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: in your next conversation, ask three questions about the other person before you say anything about yourself. Who was it, and what did you learn?`,
    starters: [`I talked to...`, `My three questions were...`, `I learned...`],
  },
  deepen: {
    title: `The group photo test`,
    summary: `Next time you see a group photo you're in, notice whose face you look for first. Then remember: everyone else in that photo looked for theirs. That's who you're talking to, every day.`,
  },
  notes: `Source: Carnegie, Part Two ch. 1 "Do This and You'll Be Welcome Anywhere": the dog, Tippy (fifty cents, 4:30, killed by lightning, not included), "two months vs two years", NY Telephone study ("I" 3,900 times in 500 calls), group photo, Napoleon and Josephine, Alfred Adler quote, Howard Thurston "I love my audience". Retold in our own words.`,
};

export default lesson;
