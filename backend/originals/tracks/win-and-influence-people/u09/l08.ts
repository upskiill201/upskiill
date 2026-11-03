import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 8 (Practice) — Rule 27 at home and work: specific praise. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `Praise Every Step`,
  summary: `A young printer was about to be fired for his attitude. Then the head of the company walked into the print shop to tell him exactly why his latest job was the best work they'd seen in a long time.`,
  minutes: 11,
  outcomes: [
    `Make praise specific so it sounds sincere`,
    `Replace constant correction with praise for progress`,
    `Turn around someone who's struggling`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The young printer`,
      before: {
        label: `About to be fired`,
        text: `A new printer was struggling to settle in. His supervisor thought he had a bad attitude and was seriously considering letting him go.`,
      },
      after: {
        label: `Specific praise`,
        text: `Keith Roper, who ran the company, received some exceptionally high-quality printing. Learning who'd done it, he went to the print shop himself, told the young man it was the best work he'd seen from there in a long time, pointed out exactly why it was superior, and explained how important his contribution was. Within days the young man had turned around completely, telling co-workers that someone really appreciated good work. He became a loyal, dedicated worker.`,
      },
      notes: [
        `Roper didn't just say "you're good". He said exactly what was good.`,
        `Specific praise sounds sincere. General praise can sound like flattery.`,
      ],
    },
    {
      kind: `reading`,
      title: `The parents who stopped yelling`,
      html:
        `<p>John Ringelspaugh and his wife realised their main way of communicating with their children was yelling. And, as in many families, the children got worse after each session, and so did the parents.</p>` +
        `<p>They decided to praise instead of harping on faults. It wasn't easy: all they could see were the things going wrong. But they managed to find something, and within a day or two some of the most upsetting behaviour stopped. Then other faults began to disappear. The children started going out of their way to do things right.</p>` +
        `<p>It didn't last perfectly forever. But once things settled, the new normal was so much better. The children were doing far more right than wrong.</p>` +
        `<p>The psychologist B. F. Skinner showed the same thing: when criticism is minimised and praise emphasised, the good things people do are reinforced, and the poorer things fade for lack of attention.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Make praise specific: what exactly they did, and why it mattered. "The colour balance on the cover is perfect" beats "nice work".`,
    },
  ],
  apply: {
    scenario: `Rule 27 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What made Keith Roper's praise so effective?`,
        options: [
          { text: `He pointed out exactly why the work was superior` },
          { text: `He gave the printer a bonus`, why: `It was the specific praise.` },
          { text: `He praised the whole team`, why: `He singled out this young man's work.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What happened when the Ringelspaughs switched from yelling to praise?`,
        options: [
          { text: `The worst behaviour stopped within days, and the children tried to do things right` },
          { text: `Nothing changed`, why: `Things improved quickly.` },
          { text: `The children got spoiled`, why: `They started doing more things right.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Specific praise, or general?`,
        groups: [`Specific`, `General`],
        items: [
          { text: `"Your summary made the board meeting so much shorter."`, group: 0 },
          { text: `"Great job!"`, group: 1 },
          { text: `"You remembered to ask the customer's name. That made them smile."`, group: 0 },
          { text: `"You're amazing."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What Skinner found.`,
        template: `When criticism is minimised and [[1]] emphasised, the good things are [[2]].`,
        blanks: [[`praise`], [`reinforced`]],
        distractors: [`punishment`, `forgotten`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Roper's printer had been about to be ________ before he was praised. (one word)`,
        answers: [`fired`, `dismissed`, `sacked`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Which line turns specific praise back into flattery?`,
        lines: [
          `The layout on page two is beautifully clear.`,
          `The way you grouped the numbers saved readers real time.`,
          `You're basically the best designer who's ever lived.`,
        ],
        bug: 2,
        fix: `That's the standard I'd love the whole report to have.`,
        explanation: `Over-the-top and vague. The first two lines were specific, and believable.`,
      },
      {
        kind: `orderLines`,
        prompt: `Giving specific praise, in order.`,
        lines: [`Notice something done well`, `Say exactly what it was`, `Say why it mattered`, `Thank them`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what they learned.`,
        pairs: [
          [`Keith Roper`, `Specific praise saved a worker`],
          [`The Ringelspaughs`, `Praise worked where yelling failed`],
          [`B. F. Skinner`, `Praised behaviour is reinforced`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the difference between appreciation and flattery?`,
        options: [
          { text: `Appreciation is sincere and specific; flattery is insincere and selfish` },
          { text: `Flattery is louder`, why: `It's about sincerity.` },
          { text: `They're the same`, why: `One is counterfeit.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `A colleague who's been coasting finally sends a really well-researched proposal. What does this lesson suggest?`,
        options: [
          { text: `"About time."`, why: `The whip, on the day they improved.` },
          { text: `"The competitor analysis on page three is really sharp. It changed my view of the market. Thanks."` },
          { text: `Say nothing in case they get complacent`, why: `Silence wastes the moment that could turn them around.` },
        ],
        answer: 1,
        explanation: `Specific praise at the moment of improvement, like Roper with his printer.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: give one person specific praise today: exactly what they did, and exactly why it mattered. Write down what you said.`,
    starters: [`I praised... for...`, `I said it mattered because...`],
  },
  deepen: {
    title: `Find something`,
    summary: `The Ringelspaughs said the hardest part was finding anything to praise, when all they could see were faults. Pick the person you criticise most, and find one specific thing to praise each day this week.`,
  },
  notes: `Source: Carnegie, Part Four ch. 6: B. F. Skinner on praise vs criticism, John Ringelspaugh's children, Keith Roper and the young printer (specific praise), "when praise is specific, it comes across as sincere". Retold in our own words.`,
};

export default lesson;
