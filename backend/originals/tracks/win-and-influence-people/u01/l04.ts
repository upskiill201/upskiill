import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 (Story) — the desire to be important: the hunger behind Rule 2. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `The Hunger Nobody Feeds`,
  summary: `Food, sleep, money: most of what we want, we get. But there's one craving almost as deep as hunger that hardly anyone ever satisfies. Feed it honestly and people will do almost anything for you.`,
  minutes: 11,
  outcomes: [
    `Name the deepest urge in human nature`,
    `Spot how different people get their feeling of importance`,
    `Explain why this hunger matters when dealing with anyone`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `The thing most people want most, after the basics, is money.`,
          isFact: false,
          explain: `The philosopher John Dewey said the deepest urge in human nature is the desire to be important. Money is often just a way of getting it.`,
        },
        {
          text: `William James, the great psychologist, said people "wish" to be appreciated.`,
          isFact: false,
          explain: `He chose a stronger word on purpose. He called it a craving: the craving to be appreciated.`,
        },
        {
          text: `This hunger is one of the main things that sets people apart from animals.`,
          isFact: true,
          explain: `A prize pig doesn't care about its ribbon. The farmer who owns it cares a great deal.`,
        },
      ],
    },
    {
      kind: `story`,
      title: `The blue ribbons`,
      beats: [
        { speaker: `narrator`, text: `When Dale Carnegie was a farm boy in Missouri, his father bred fine pigs and cattle and won first prizes at county fairs all over the Midwest.` },
        { speaker: `narrator`, text: `His father pinned every blue ribbon onto a long white sheet of cloth. When visitors came, he'd fetch it out, hold one end, have his son hold the other, and show off the ribbons.` },
        { speaker: `narrator`, text: `The pigs didn't care two pins about the ribbons. But Father did. Those ribbons gave him a feeling of importance.` },
      ],
    },
    {
      kind: `reading`,
      title: `Tell me how you get it, and I'll tell you who you are`,
      html:
        `<p>This same desire made a poor shop clerk study law books he found at the bottom of a barrel of junk. His name was Lincoln. It drove Dickens to write his novels. It's why people buy the latest phone and talk about their brilliant children.</p>` +
        `<p>What matters is <strong>how</strong> a person gets their feeling of importance. That tells you their character.</p>` +
        `<p>John D. Rockefeller got his by paying for a hospital in China for millions of poor people he would never meet. John Dillinger got his by robbing banks. When the police were hunting him, he burst into a farmhouse and announced, proudly, who he was: Public Enemy Number One.</p>` +
        `<p>The only difference between them was how they fed the same hunger.</p>` +
        `<p>Now here is the point for you and me. We feed our families and our teams. We'd never let them go six days without food. Yet we let them go six days, six weeks, sometimes sixty years without a word of honest appreciation, which they crave almost as much.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Everyone you meet is hungry to feel important. The rare person who honestly satisfies that hunger will hold people in the palm of their hand.`,
    },
  ],
  apply: {
    scenario: `The desire to be important.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did John Dewey call the deepest urge in human nature?`,
        options: [
          { text: `The desire to be rich`, why: `Money is often only a road to it.` },
          { text: `The desire to be important` },
          { text: `The desire to be safe`, why: `Safety is basic, but it's usually satisfied.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `William James didn't call it a wish. He called it the ________ to be appreciated. (one word)`,
        answers: [`craving`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `Why did Carnegie's father show off his blue ribbons on a white sheet?`,
        options: [
          { text: `To sell more pigs`, why: `He was showing friends, not buyers.` },
          { text: `They gave him a feeling of importance` },
          { text: `To keep them clean`, why: `He brought them out for visitors on purpose.` },
        ],
        answer: 1,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they fed the same hunger.`,
        pairs: [
          [`Rockefeller`, `Paid for a hospital for strangers`],
          [`Dillinger`, `Bragged about being Public Enemy Number One`],
          [`Lincoln`, `Studied law books from a barrel of junk`],
        ],
      },
      {
        kind: `sortGroups`,
        prompt: `Is this person feeding their need to feel important?`,
        groups: [`Yes, that's the hunger`, `No, that's something else`],
        items: [
          { text: `Posting a promotion with a long caption`, group: 0 },
          { text: `Eating lunch because they're hungry`, group: 1 },
          { text: `Telling everyone about their child's exam results`, group: 0 },
          { text: `Going to bed because they're tired`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The test of character.`,
        template: `Tell me how you get your feeling of [[1]], and I'll tell you what you [[2]].`,
        blanks: [[`importance`], [`are`]],
        distractors: [`money`, `want`],
      },
      {
        kind: `findBug`,
        prompt: `Which statement gets this lesson wrong?`,
        lines: [
          `Most of our basic wants, like food and sleep, are usually met.`,
          `The wish to feel important is rarely satisfied.`,
          `Only vain or selfish people want to feel important.`,
          `How we chase importance shows our character.`,
        ],
        bug: 2,
        fix: `Everyone wants to feel important; it's human.`,
        explanation: `It isn't vanity. It's one of the deepest human needs, in the humble and the proud alike.`,
      },
      {
        kind: `mcq`,
        prompt: `Carnegie compares appreciation to food. What's his point?`,
        options: [
          { text: `We feed people's bodies but starve them of appreciation for years` },
          { text: `Appreciation should be given at mealtimes`, why: `It's a comparison, not a schedule.` },
          { text: `People care more about food than praise`, why: `He argues they crave it almost as much.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the big idea.`,
        tiles: [`Everyone`, `you`, `meet`, `wants`, `to`, `feel`, `important.`],
        distractors: [`rich.`],
      },
      {
        kind: `mcq`,
        prompt: `A colleague keeps reminding meetings that they built the original system. It's starting to annoy everyone. Using this lesson, what's probably going on?`,
        options: [
          { text: `They're arrogant and need to be put in their place`, why: `That's Rule 1 broken, and it would make it worse.` },
          { text: `They're hungry to feel important, and nobody has recognised that work` },
          { text: `They want a pay rise`, why: `Maybe, but the reminders are about recognition.` },
        ],
        answer: 1,
        explanation: `Feed the hunger honestly, by recognising what they built, and the reminders usually stop on their own.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: notice how three people around you get their feeling of importance. A job title, a skill, their children, their car? Write down one for each.`,
    starters: [`My boss gets it from...`, `My friend gets it from...`, `I get mine from...`],
  },
  deepen: {
    title: `Your own blue ribbons`,
    summary: `What are your blue ribbons, the things you'd quietly love someone to notice? Knowing your own hunger makes it much easier to see everyone else's.`,
  },
  notes: `Source: Carnegie, Part One ch. 2 "The Big Secret of Dealing with People": Freud/Dewey desire to be important, William James "craving", father's blue ribbons on muslin, Lincoln and the barrel of law books, Dickens, Rockefeller's hospital in Peking vs Dillinger, six days without food vs sixty years without appreciation, "palm of his hand". Retold in our own words.`,
};

export default lesson;
