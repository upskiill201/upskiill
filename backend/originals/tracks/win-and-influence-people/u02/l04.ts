import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 (Story) — Rule 5: smile. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `A Smile Says "I'm Glad to See You"`,
  summary: `At a dinner party in New York, a rich woman wore a fortune in diamonds and pearls, and made a terrible impression. She'd forgotten the one thing that matters more than anything you wear.`,
  minutes: 11,
  outcomes: [
    `Explain what a smile tells the other person`,
    `Tell a real smile from a mechanical grin`,
    `Use a smile to change the mood of a room`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `What you wear makes a bigger first impression than the expression on your face.`,
          isFact: false,
          explain: `Carnegie watched a woman covered in jewels make a sour impression at a dinner party. The look on your face matters far more than the clothes on your back.`,
        },
        {
          text: `Charles Schwab said his smile was worth a million dollars.`,
          isFact: true,
          explain: `And Carnegie thought he was understating it. Schwab's charm, and his smile above all, were behind his success.`,
        },
        {
          text: `Any smile works, even a forced grin.`,
          isFact: false,
          explain: `A mechanical grin fools nobody, and people resent it. It has to come from inside.`,
        },
      ],
    },
    {
      kind: `story`,
      title: `The waiting room`,
      beats: [
        { speaker: `narrator`, text: `A vet in Missouri described a spring morning when his waiting room was full of people waiting for their pets' injections. Nobody spoke. Everyone looked as if they'd rather be anywhere else.` },
        { speaker: `narrator`, text: `A young woman came in with a nine-month-old baby and a kitten, and sat next to a man who was clearly fed up with the long wait. The baby looked up at him and gave him one of those huge baby smiles.` },
      ],
      choice: {
        prompt: `What happened next?`,
        options: [
          { text: `The man looked away, still annoyed`, outcome: `You'd think so. But try not smiling back at a baby.` },
          { text: `He smiled back, started chatting about his grandchildren, and soon the whole room was talking`, outcome: `That's it. One smile turned a room full of bored, tense strangers into a pleasant morning.`, best: true },
          { text: `He moved to another seat`, outcome: `Nobody moves away from a smile like that.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `What a smile says`,
      html:
        `<p>Actions speak louder than words. And a smile says: <strong>I like you. You make me happy. I'm glad to see you.</strong></p>` +
        `<p>That's why dogs are so popular. They're so glad to see us they almost jump out of their skins. So naturally we're glad to see them.</p>` +
        `<p>A psychologist at the University of Michigan said people who smile tend to manage, teach and sell better, and raise happier children. The hiring manager at a big New York store said she'd rather hire a salesperson who never finished school but had a lovely smile than a professor with a gloomy face.</p>` +
        `<p>The head of one of America's largest companies said people rarely succeed at anything unless they enjoy it. Put simply: you have to enjoy meeting people if you want them to enjoy meeting you.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 5: Smile. A real smile, from the inside, that says "I'm glad to see you."`,
    },
  ],
  apply: {
    scenario: `Rule 5: Smile.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the jewelled woman at the dinner party forget?`,
        options: [
          { text: `Her manners`, why: `It was something on her face.` },
          { text: `That her expression matters more than her clothes` },
          { text: `People's names`, why: `That's a later lesson.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What a smile says.`,
        template: `I [[1]] you. You make me [[2]]. I'm glad to [[3]] you.`,
        blanks: [[`like`], [`happy`], [`see`]],
        distractors: [`need`, `rich`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Schwab said his smile was worth a million ________. (one word)`,
        answers: [`dollars`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Real smile or mechanical grin?`,
        groups: [`Real smile`, `Mechanical grin`],
        items: [
          { text: `Smiling because you're genuinely glad your friend arrived`, group: 0 },
          { text: `A fixed customer-service grin while thinking about lunch`, group: 1 },
          { text: `Smiling back at a baby on the bus`, group: 0 },
          { text: `Grinning through gritted teeth at a boss you resent`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What changed the mood of the vet's waiting room?`,
        options: [
          { text: `The vet came out early`, why: `It was a baby's smile.` },
          { text: `A baby smiled at a grumpy man and he smiled back` },
          { text: `Someone told a joke`, why: `No words were needed to start it.` },
        ],
        answer: 1,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what they said about smiling.`,
        pairs: [
          [`The Michigan psychologist`, `Smilers manage, teach and sell better`],
          [`The store hiring manager`, `A smile beats a degree and a gloomy face`],
          [`The company chairman`, `Enjoy people and they'll enjoy you`],
        ],
      },
      {
        kind: `findBug`,
        prompt: `Which belief about smiling gets it wrong?`,
        lines: [
          `A smile tells people you're glad to see them.`,
          `A forced grin works just as well as a real one.`,
          `Enjoying people makes them enjoy you.`,
        ],
        bug: 1,
        fix: `A smile has to come from inside to work.`,
        explanation: `People can spot a mechanical grin and they resent it.`,
      },
      {
        kind: `mcq`,
        prompt: `Review: which rule did Thurston the magician live by?`,
        options: [
          { text: `Be genuinely interested in other people` },
          { text: `Don't criticise`, why: `True of him maybe, but his secret was loving his audience.` },
          { text: `Arouse an eager want`, why: `His secret was interest in the audience.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build what a smile says.`,
        tiles: [`I'm`, `glad`, `to`, `see`, `you.`],
        distractors: [`need`],
      },
      {
        kind: `mcq`,
        prompt: `You walk into a meeting where everyone looks tense before a hard decision. What does this lesson suggest you do first?`,
        options: [
          { text: `Match their serious faces so you look professional`, why: `That keeps the room tense.` },
          { text: `Greet people with a real, warm smile before you sit down` },
          { text: `Crack a joke straight away`, why: `A joke can misfire in a tense room. A warm smile rarely does.` },
        ],
        answer: 1,
        explanation: `Like the baby in the waiting room: one honest smile can turn a tense room into a friendly one.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: smile first at five people today, the bus driver, a shop assistant, a colleague. Count how many smile back. What happened?`,
    starters: [`I smiled at...`, `This many smiled back:...`, `What surprised me was...`],
  },
  deepen: {
    title: `Enjoy them first`,
    summary: `Before your next meeting or call, take ten seconds to think of one thing you like about the person you're about to see. You'll find the smile arrives on its own.`,
  },
  notes: `Source: Carnegie, Part Two ch. 2 "A Simple Way to Make a Good First Impression": the woman in sables and diamonds, Schwab's million-dollar smile, what a smile says, the dog, Dr. Stephen Sproul's waiting room and the baby, insincere grin, James V. McConnell (Michigan), the store employment manager, the rubber company chairman. Retold in our own words.`,
};

export default lesson;
