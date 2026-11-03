import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 (Practice + Checkpoint) — Rule 11: why "my" opinion feels like "me"; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `The Supreme Court Mistake`,
  summary: `A young lawyer arguing before the Supreme Court corrected a judge on a point of law. He was right. The temperature in the room dropped to zero, and he lost the one thing he came for.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Explain why people defend their opinions as if defending themselves`,
    `Let people admit a mistake on their own terms`,
    `Combine Rules 10 and 11 when you know you're right`,
  ],
  learn: [
    {
      kind: `story`,
      title: `"There is no statute of limitations"`,
      beats: [
        { speaker: `narrator`, text: `A young New York lawyer was arguing an important case before the United States Supreme Court. A lot of money and an important point of law were at stake.` },
        { speaker: `narrator`, text: `In the middle of his argument, one of the justices said: "The time limit for bringing cases under maritime law is six years, isn't it?"` },
        { speaker: `narrator`, text: `The lawyer stopped, stared at the justice, and said bluntly: "Your Honour, there is no time limit in maritime law."` },
      ],
      choice: {
        prompt: `He was right. What happened?`,
        options: [
          { text: `The justice thanked him for the correction`, outcome: `If only.` },
          { text: `A hush fell, the room went cold, and he failed to persuade`, outcome: `That's it. He said he had the law on his side and spoke better than ever, but he didn't persuade. He'd told a famous, learned man he was wrong.`, best: true },
          { text: `He won the case on that point`, outcome: `He had the law on his side, and still didn't win them over.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The little word "my"`,
      html:
        `<p>Few of us are truly logical. Most of us are full of prejudice, pride, fear and habit. We don't want to change our minds about our religion, our haircut or our favourite film star.</p>` +
        `<p>A historian, James Harvey Robinson, explained why. We often change our minds quietly, with no fuss. But tell us we're wrong, and we harden. It isn't the idea itself we cherish. It's our self-esteem that's being threatened.</p>` +
        `<p>The little word "my" is the most important word in human affairs. My dinner, my dog, my house, my country. We resent being told our watch is wrong or our car is shabby, and just as much that our view on anything is mistaken. So most of our "reasoning" is finding arguments to keep believing what we already believe.</p>` +
        `<p>The psychologist Carl Rogers noticed that our first reaction to almost anything someone says is to judge it: "that's right", "that's stupid". We rarely let ourselves simply understand what it means to them.</p>`,
    },
    {
      kind: `compare`,
      title: `The curtains`,
      before: {
        label: `Friend one`,
        text: `Carnegie paid far too much for some curtains. A friend saw them, heard the price and said triumphantly: "That's awful! He's ripped you off." She was right. And Carnegie spent the next ten minutes defending his purchase: you get what you pay for, quality costs money...`,
      },
      after: {
        label: `Friend two`,
        text: `The next day another friend admired the curtains and wished she could afford something so lovely. Carnegie's reply? "To tell the truth, I can't afford them either. I paid too much. I'm sorry I ordered them."`,
      },
      notes: [
        `Same curtains, same facts, opposite reactions.`,
        `Handled gently, we'll admit our mistakes, and even feel proud of our honesty. Rammed down our throats, never.`,
      ],
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 10 and 11.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the young lawyer do wrong before the Supreme Court?`,
        options: [
          { text: `He got the law wrong`, why: `He was right about the law.` },
          { text: `He bluntly told a famous judge he was wrong` },
          { text: `He spoke too quietly`, why: `He said he spoke better than ever.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Robinson's insight.`,
        template: `It's not the ideas we cherish, but our [[1]] that's [[2]].`,
        blanks: [[`self-esteem`, `pride`], [`threatened`]],
        distractors: [`money`, `rewarded`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Which little word did Robinson call the most important in human affairs? (one word)`,
        answers: [`my`, `"my"`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `Why did Carnegie admit his mistake to the second friend but defend it to the first?`,
        options: [
          { text: `The second friend was right`, why: `Both were right about the price.` },
          { text: `The second friend let him admit it himself, without rubbing it in` },
          { text: `He liked the second friend more`, why: `It was how each one handled it.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Will this help someone admit a mistake, or make them defend it?`,
        groups: [`Helps them admit it`, `Makes them defend it`],
        items: [
          { text: `"I made the same call once. How's it working out?"`, group: 0 },
          { text: `"I told you so."`, group: 1 },
          { text: `"What would you do differently next time?"`, group: 0 },
          { text: `"Anyone could see that was a bad idea."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): how do you get the best of an argument?`,
        options: [
          { text: `Avoid it` },
          { text: `Have better facts`, why: `Facts don't win the person.` },
          { text: `Stay calm and win`, why: `Even winning, you lose.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to its lesson.`,
        pairs: [
          [`Gammond's kick`, `Why prove a man wrong at a party?`],
          [`Pat's trucks`, `Agree, and the fight ends`],
          [`Parsons's inspector`, `Recognise their importance`],
          [`Reinke's dealership`, `"We may have got it wrong"`],
        ],
      },
      {
        kind: `findBug`,
        prompt: `Your partner booked a holiday that turned out overpriced. Which line makes them dig in?`,
        lines: [
          `The hotel looks lovely.`,
          `Shame you didn't check the price comparison sites first, obviously.`,
          `Next time shall we look at deals together?`,
        ],
        bug: 1,
        fix: `It's been a stressful few weeks, we deserve it.`,
        explanation: `That's the first curtain friend. They'll spend the holiday defending the booking.`,
      },
      {
        kind: `orderLines`,
        prompt: `Correcting a senior person, if you really must, in order.`,
        lines: [`Wait for a private moment`, `Say "I may be wrong"`, `Offer the fact as a question`, `Let them reach the conclusion`],
      },
      {
        kind: `tapBuild`,
        prompt: `Rephrase the lawyer's correction respectfully.`,
        tiles: [`I`, `may`, `be`, `mistaken,`, `but`, `I`, `understood`, `there's`, `no`, `limit.`],
        distractors: [`You're`, `wrong.`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. In a client meeting, the client states a figure that's wrong, and it affects the deal. You know the right figure. What do you do?`,
        options: [
          { text: `Correct them on the spot: "Actually, that's wrong"`, why: `The Supreme Court mistake: right, and unpersuasive.` },
          { text: `"I may have different numbers, could we check them together?"` },
          { text: `Say nothing and let the deal go ahead on the wrong figure`, why: `When it matters, you must raise it, just respectfully.` },
        ],
        answer: 1,
        explanation: `When it matters, raise it, but as a shared check, never as "you're wrong".`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: today, when you disagree with someone, ask a question instead of correcting them. What did you ask, and did they change their own mind?`,
    starters: [`Instead of correcting, I asked...`, `They...`],
  },
  deepen: {
    title: `Understand first`,
    summary: `Carl Rogers suggested a test: before you reply to someone's opinion, restate it in your own words until they agree you've got it right. Try it once this week. It's harder, and more powerful, than it sounds.`,
  },
  notes: `Source: Carnegie, Part Three ch. 2: Mr. S—— and the Supreme Court (Lustgarten v. Fleet Corporation; "no statute of limitations in admiralty", described here as maritime law), James Harvey Robinson's The Mind in the Making (paraphrased), Carl Rogers's On Becoming a Person (paraphrased), the interior decorator's curtains and the two friends. Retold in our own words.`,
};

export default lesson;
