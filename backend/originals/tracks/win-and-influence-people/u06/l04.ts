import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 4 (Story) — Rule 17: try honestly to see things from the other person's point of view. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `Walk Their Sidewalk First`,
  summary: `For four years he complained that his wife spent too much time on the lawn. Every complaint ruined the evening. It never once occurred to him to ask why she did it.`,
  minutes: 11,
  outcomes: [
    `Look for the reason behind what someone does`,
    `Ask "how would I feel in their shoes?"`,
    `Prepare for a conversation by thinking from their side`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `If someone is clearly wrong, there's no point trying to understand why they act that way.`,
          isFact: false,
          explain: `People may be totally wrong, but they don't think so. There's a reason they think and act as they do. Find it and you have the key to their actions.`,
        },
        {
          text: `Understanding the cause makes you less likely to dislike the effect.`,
          isFact: true,
          explain: `Ask "how would I feel in their shoes?" and you save yourself time and irritation, because you start to understand.`,
        },
      ],
    },
    {
      kind: `story`,
      title: `The lawn`,
      beats: [
        { speaker: `narrator`, text: `Sam Douglas often told his wife she spent too much time on their lawn: weeding, feeding, mowing twice a week, when it looked no better than when they'd moved in four years before. Each time, she was hurt, and the evening was ruined.` },
        { speaker: `narrator`, text: `After taking Carnegie's course, he realised how foolish he'd been. It had never occurred to him that she enjoyed the work, and might love a compliment on it.` },
        { speaker: `narrator`, text: `One evening after dinner, she said she was going out to pull some weeds and asked if he'd keep her company. He started to say no.` },
      ],
      choice: {
        prompt: `What did he do?`,
        options: [
          { text: `Said no and stayed inside`, outcome: `That was the old Sam.` },
          { text: `Changed his mind, went out, helped her weed, and praised how good she'd made a lawn with soil like concrete`, outcome: `That's it. She was visibly pleased. They spent an hour working and talking, and he often helped after that. A happier life for both, because he saw it from her side, even over weeds.`, best: true },
          { text: `Offered to hire a gardener`, outcome: `That would have missed the point. She loved doing it.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Two hours on the sidewalk`,
      html:
        `<p>The dean of Harvard Business School said he'd rather walk up and down the pavement outside someone's office for two hours before a meeting than walk in without a perfectly clear idea of what he'd say, and what they, from what he knew of their interests and motives, would probably answer.</p>` +
        `<p>That's so important it's worth reading twice.</p>` +
        `<p>One writer, Kenneth Goode, suggested this: stop for a minute and compare your keen interest in your own affairs with your mild interest in anything else. Then realise that everyone else in the world feels exactly the same. Grasp that, and you have the only solid foundation for dealing with people.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 17: Try honestly to see things from the other person's point of view. Ask: how would I feel, and what would I do, in their shoes?`,
    },
  ],
  apply: {
    scenario: `Rule 17: See it from their side.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What had Sam never considered about his wife's gardening?`,
        options: [
          { text: `That it was expensive`, why: `It was about her feelings.` },
          { text: `That she enjoyed it and might love a compliment on it` },
          { text: `That the neighbours noticed`, why: `It was about what it meant to her.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Why understanding helps.`,
        template: `By becoming interested in the [[1]], we're less likely to dislike the [[2]].`,
        blanks: [[`cause`], [`effect`]],
        distractors: [`person`, `cost`],
      },
      {
        kind: `typeAnswer`,
        prompt: `The Harvard dean would rather walk outside someone's office for how many hours before a meeting? (a number)`,
        answers: [`2`, `two`],
        placeholder: `A number`,
      },
      {
        kind: `sortGroups`,
        prompt: `From their side, or only yours?`,
        groups: [`Their side`, `Only yours`],
        items: [
          { text: `"Why might she enjoy spending time on the garden?"`, group: 0 },
          { text: `"It's a waste of time, the lawn looks the same."`, group: 1 },
          { text: `"What's this deadline like from my manager's seat?"`, group: 0 },
          { text: `"They should just know what I need."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What happened when Sam joined his wife in the garden?`,
        options: [
          { text: `They had a happy hour of work and talk, and a happier life after` },
          { text: `They argued about the lawn`, why: `He'd stopped complaining.` },
          { text: `She asked him to leave`, why: `She was visibly pleased.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Your prep notes for asking your boss for Fridays off. Which note ignores their side?`,
        lines: [
          `She's worried about client cover on Fridays.`,
          `Suggest how my clients would be handled.`,
          `She should just trust me, I've earned it.`,
        ],
        bug: 2,
        fix: `Offer a three-month trial she can review.`,
        explanation: `It's your view only. The Harvard dean would plan for her likely answer instead.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their insight.`,
        pairs: [
          [`Sam Douglas`, `His wife loved the gardening`],
          [`The Harvard dean`, `Two hours planning their likely answer`],
          [`Kenneth Goode`, `Everyone cares about their own affairs most`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what did Henry Ford say was the one secret of success?`,
        options: [
          { text: `Seeing things from the other person's angle as well as your own` },
          { text: `Hard work`, why: `Ford named something about people.` },
          { text: `Low prices`, why: `His secret was about point of view.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question to ask before judging.`,
        tiles: [`How`, `would`, `I`, `feel`, `in`, `their`, `shoes?`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `A colleague keeps rejecting your designs with vague comments. You're frustrated. What does Rule 17 suggest first?`,
        options: [
          { text: `Escalate to your manager`, why: `You haven't understood them yet.` },
          { text: `Find out what pressures they're under and what they need the designs to do` },
          { text: `Make the next design exactly as you think it should be`, why: `That's only your side again.` },
        ],
        answer: 1,
        explanation: `There's a reason behind their comments. Find it, and you'll find the design they'll approve.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before one request today, write down in a sentence how the other person sees the situation. Did it change what you said?`,
    starters: [`I needed to ask... for...`, `From their side, it looks like...`, `So I said...`],
  },
  deepen: {
    title: `Your mild interest`,
    summary: `For a minute, notice how intensely you care about your own plans today, and how mildly you care about anyone else's. Now remember: everyone you'll talk to today feels exactly the same way.`,
  },
  notes: `Source: Carnegie, Part Three ch. 8 "A Formula That Will Work Wonders for You": other people may be wrong but don't think so, "by becoming interested in the cause", Kenneth M. Goode's How to Turn People Into Gold, Sam Douglas and the lawn, Dean Donham of Harvard Business School (two hours on the sidewalk). Retold in our own words.`,
};

export default lesson;
