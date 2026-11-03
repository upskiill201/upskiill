import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 5 (Practice + Checkpoint) — Rule 17 in action; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `The Boys and the Campfire`,
  summary: `Boys kept lighting campfires in Carnegie's favourite park, and the fires kept killing the trees. He rode up and ordered them to stop, threatening arrest. It worked, until he rode away. Years later he tried again, from their side.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Rewrite an order from the other person's point of view`,
    `Let people save face while changing what they do`,
    `Combine Rules 16 and 17 in one request`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The park`,
      beats: [
        { speaker: `narrator`, text: `Carnegie loved a park near his home and was heartbroken to see young trees killed season after season by fires. Most were started by boys who came to cook sausages or eggs under the trees.` },
        { speaker: `narrator`, text: `At first, he didn't even try to see their point of view. He'd ride up, warn them they could be jailed, order them in a voice of authority to put the fire out, and threaten to have them arrested if they refused.` },
        { speaker: `narrator`, text: `They obeyed, sullenly and resentfully. Once he'd ridden over the hill, they probably lit it again and wished they could burn the whole park down.` },
        { speaker: `narrator`, text: `Years later, with a little more understanding, he rode up to a fire and began: "Having a good time, boys? What are you cooking? I loved building fires myself as a boy, and I still do."` },
      ],
      choice: {
        prompt: `How did he go on?`,
        options: [
          { text: `"But it's against the law, so put it out now."`, outcome: `That's the old order in a friendlier wrapper.` },
          { text: `He explained other boys weren't as careful, fires spread and kill trees, said he didn't want to spoil their fun, and asked if they'd clear the leaves, bury it well, and use the sandpit next time`, outcome: `That's it. "Thanks so much, boys. Have a good time." No sulking, no resentment. They'd saved face, and they wanted to cooperate.`, best: true },
          { text: `He said nothing and rode away`, outcome: `He did better than nothing. He spoke from their side.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `Order vs their side`,
      before: {
        label: `The order`,
        text: `"Put that fire out right now. You could go to jail for this."`,
      },
      after: {
        label: `From their side`,
        text: `"I know you boys don't mean any harm, and I love a fire too. But others aren't so careful, and we'll lose the trees. Would you rake the leaves back and cover it with plenty of dirt before you go? Next time, the sandpit over the hill is perfect."`,
      },
      notes: [
        `Same request. One makes them want to defy you; the other makes them want to help.`,
        `They got to keep their fun and their pride.`,
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before asking anyone to stop something, ask: why are they doing it, and how can they still get what they want?`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 16 and 17.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What happened when Carnegie used orders and threats?`,
        options: [
          { text: `The boys obeyed, sulking, and probably relit the fire later` },
          { text: `The fires stopped for good`, why: `Only until he rode away.` },
          { text: `The boys apologised`, why: `They obeyed with resentment.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `How did Carnegie open his second approach?`,
        options: [
          { text: `"You could be jailed for this."`, why: `That was the first approach.` },
          { text: `"Having a good time, boys? What are you cooking?"` },
          { text: `"Whose idea was this?"`, why: `He started friendly and curious.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What the second approach did.`,
        template: `They hadn't been forced to obey [[1]]. They had saved their [[2]].`,
        blanks: [[`orders`], [`faces`, `face`]],
        distractors: [`rules`, `money`],
      },
      {
        kind: `sortGroups`,
        prompt: `Order, or request from their side?`,
        groups: [`Order`, `From their side`],
        items: [
          { text: `"Turn that music down."`, group: 0 },
          { text: `"Great playlist! Could we drop it a bit while the baby sleeps?"`, group: 1 },
          { text: `"No phones at dinner."`, group: 0 },
          { text: `"I miss hearing about your day. Phones away while we eat?"`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Where did Carnegie suggest the boys build their next fire? In the ________ over the hill. (one word)`,
        answers: [`sandpit`, `sand pit`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `A note to neighbours about parking. Which line is an order, not their side?`,
        lines: [
          `I know parking's a nightmare for all of us.`,
          `Do NOT park in front of my garage again.`,
          `Would you mind leaving that spot clear in the mornings, so I can get to work?`,
        ],
        bug: 1,
        fix: `I've sometimes been stuck in the mornings.`,
        explanation: `Capitals and commands make people want to do it again. Their side makes them want to help.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did Wesson ask the buyer?`,
        options: [
          { text: `How to finish the sketches so he could use them` },
          { text: `Why he never bought`, why: `That would have put him on the defensive.` },
          { text: `For one last chance`, why: `He asked for help instead.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each person to their approach.`,
        pairs: [
          [`Colonel House`, `Let the President own the idea`],
          [`Paul Davis`, `Let his daughter's interest decide`],
          [`Sam Douglas`, `Saw the lawn from his wife's side`],
          [`Carnegie in the park`, `Spoke from the boys' side`],
        ],
      },
      {
        kind: `orderLines`,
        prompt: `The campfire approach, in order.`,
        lines: [`Start friendly and curious`, `Show you understand what they enjoy`, `Explain the problem without blame`, `Ask, and suggest a way they can still have their fun`],
      },
      {
        kind: `tapBuild`,
        prompt: `Build the ask from their side.`,
        tiles: [`Would`, `you`, `use`, `the`, `sandpit`, `next`, `time?`],
        distractors: [`must`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your teenagers have friends round who leave a mess every weekend. Which request combines Rules 16 and 17?`,
        options: [
          { text: `"No more friends round until you clean up properly."`, why: `An order and a threat. Sullen obedience at best.` },
          { text: `"I love that your friends like coming here. How could we keep it that way without me doing all the clearing up?"` },
          { text: `Clean up and say nothing`, why: `Resentment builds, and nothing changes.` },
        ],
        answer: 1,
        explanation: `From their side (they want friends round), and the solution becomes their idea.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: rewrite one order you'd usually give, at home or work, as a request from the other person's side. What did you say, and how did they respond?`,
    starters: [`I usually say...`, `Instead I said...`, `They...`],
  },
  deepen: {
    title: `Over the hill`,
    summary: `Carnegie guessed the boys relit the fire once he'd ridden over the hill. Orders only work while you're watching. Requests from their side keep working after you've gone.`,
  },
  notes: `Source: Carnegie, Part Three ch. 8: the park fires, the indifferent policeman, Carnegie's first approach (orders, threats) and his later approach (quoted in paraphrase: "Having a good time, boys?", sandpit, "Thanks so much, boys"). Retold in our own words.`,
};

export default lesson;
