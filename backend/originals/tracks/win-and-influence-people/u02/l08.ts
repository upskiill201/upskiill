import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 (Practice) — Rule 6 at work: names win cooperation. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `The Rabbits and the Steel Mill`,
  summary: `As a boy in Scotland he had a nest of rabbits and nothing to feed them. His solution made him a millionaire years later, and it still works in any canteen queue.`,
  minutes: 11,
  outcomes: [
    `Use names to win cooperation`,
    `Bring names into your work naturally`,
    `Notice name badges, signatures and introductions`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The canteen`,
      before: {
        label: `Day one`,
        text: `Ken ate lunch at his company canteen. The woman behind the counter always looked fed up. She weighed his ham on a little scale, gave him one leaf of lettuce and a few crisps, and pushed the plate over. He was just another sandwich to her.`,
      },
      after: {
        label: `Day two`,
        text: `Same queue, same scowl. But this time Ken noticed her name badge. He smiled and said, "Hello, Eunice," then gave his order. She forgot the scale, piled on the ham, added three leaves of lettuce and heaped on crisps until they fell off the plate.`,
      },
      notes: [
        `A name is the one thing that belongs completely to the person you're dealing with.`,
        `It sets them apart. From the waiter to the chief executive, it works magic.`,
      ],
    },
    {
      kind: `story`,
      title: `The rabbits`,
      beats: [
        { speaker: `narrator`, text: `Andrew Carnegie, the steel king, knew little about making steel. Hundreds of his men knew more. But he knew how to handle people, and he'd learned it at ten.` },
        { speaker: `narrator`, text: `As a boy in Scotland he got hold of a mother rabbit. Presto, a whole nest of babies, and nothing to feed them. So he told the neighbourhood children: pick enough clover and dandelions for the rabbits, and I'll name a bunny after you. It worked like magic.` },
        { speaker: `narrator`, text: `Years later, he wanted to sell steel rails to the Pennsylvania Railroad, whose president was J. Edgar Thomson. So Carnegie built a huge steel works in Pittsburgh, and called it the Edgar Thomson Steel Works.` },
      ],
      choice: {
        prompt: `When the railroad needed rails, where did Mr. Thomson buy them?`,
        options: [
          { text: `From the cheapest supplier`, outcome: `Guess again.` },
          { text: `From the steel works named after him`, outcome: `Of course. The same lesson as the rabbits, worth millions this time.`, best: true },
          { text: `From abroad`, outcome: `Not a chance. His name was on Carnegie's mill.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>Carnegie used it again when he and George Pullman were destroying each other's profits fighting for a railway sleeping-car contract. Carnegie proposed they join forces. Pullman wasn't convinced, until he asked what the new company would be called. "Why, the Pullman Palace Car Company, of course," said Carnegie. Pullman's face lit up. "Come to my room. Let's talk it over."</p>` +
        `<p>Carnegie was proud that he could call many of his factory workers by their first names. A flight attendant named Karen made a habit of learning her passengers' names and using them while serving. One passenger wrote to the airline that from now on he'd fly with nobody else.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Look for names everywhere: badges, email signatures, the start of a call. Then use them, once or twice, warmly.`,
    },
  ],
  apply: {
    scenario: `Rule 6 at work.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What changed Eunice's portions?`,
        options: [
          { text: `Ken complained to her manager`, why: `That's Rule 1 broken. He did something much kinder.` },
          { text: `Ken greeted her by name with a smile` },
          { text: `Ken tipped her`, why: `A name was all it took.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `How did young Andrew Carnegie get food for his rabbits?`,
        options: [
          { text: `He sold some of them`, why: `He found a way to keep them all fed.` },
          { text: `He promised to name a rabbit after each child who brought food` },
          { text: `He paid the children`, why: `He had no money. He had names to give.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Carnegie's steel works.`,
        template: `He named it the Edgar [[1]] Steel Works, after the railroad's [[2]].`,
        blanks: [[`Thomson`], [`president`]],
        distractors: [`Pullman`, `founder`],
      },
      {
        kind: `typeAnswer`,
        prompt: `What did Carnegie say the merged sleeping-car company would be called? The ________ Palace Car Company. (one word)`,
        answers: [`Pullman`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Using names well, or overdoing it?`,
        groups: [`Using it well`, `Overdoing it`],
        items: [
          { text: `"Thanks, Eunice," at the end of the order`, group: 0 },
          { text: `Saying their name in every single sentence`, group: 1 },
          { text: `Crediting a colleague by name in the team update`, group: 0 },
          { text: `Using someone's name to pressure them: "Come on, Dave, Dave, sign it"`, group: 1 },
        ],
      },
      {
        kind: `orderLines`,
        prompt: `A canteen order, Ken's way.`,
        lines: [`Notice the name badge`, `Smile`, `Say "Hello, Eunice"`, `Give your order and thank her`],
      },
      {
        kind: `findBug`,
        prompt: `A team update. Which line misses a chance from this lesson?`,
        lines: [
          `We hit our sales target this month.`,
          `Thanks to everyone, I guess, for doing their bit.`,
          `Special thanks to Luis for landing the Lima account.`,
        ],
        bug: 1,
        fix: `Thanks to Ana, Tom and Wei for the late nights on the proposal.`,
        explanation: `"Everyone, I guess" honours nobody. Names turn thanks into recognition.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they used names.`,
        pairs: [
          [`Ken`, `"Hello, Eunice"`],
          [`Andrew Carnegie`, `Named a steel mill after a buyer`],
          [`Karen the flight attendant`, `Learned her passengers' names`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 5): why did the young PhD join Cryer's company?`,
        options: [
          { text: `Cryer sounded glad to hear from him on the phone` },
          { text: `It paid the most`, why: `Bigger firms offered more.` },
          { text: `It had the best office`, why: `It came down to a warm voice.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `You're running a workshop for thirty strangers. Which move uses this lesson best?`,
        options: [
          { text: `Skip names to save time`, why: `You'll save two minutes and lose the room.` },
          { text: `Use name cards and call on people by name all session` },
          { text: `Refer to people by where they're sitting`, why: `"The lady at the back" tells her she's nobody in particular.` },
        ],
        answer: 1,
        explanation: `People lean in when they hear their own name. It makes the session about them.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: learn the name of someone who serves you: a barista, a driver, a canteen worker. Use it next time you see them. What happened?`,
    starters: [`Their name is...`, `When I used it...`],
  },
  deepen: {
    title: `Name the credit`,
    summary: `In your next thank-you message or update, replace "the team" with the names of the people who did the work. Notice who replies.`,
  },
  notes: `Source: Carnegie, Part Two ch. 3: Ken Nottingham and Eunice, Andrew Carnegie's rabbits, the Edgar Thomson Steel Works, the Pullman Palace Car Company merger, first names of factory workers, Karen Kirsch (TWA flight attendant) and the passenger's letter; "the name sets the individual apart". Retold in our own words.`,
};

export default lesson;
