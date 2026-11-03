import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 (Practice + Checkpoint) — Rule 14 in action; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `Yes, Yes, Yes`,
  summary: `After thirteen years of trying, a salesman finally sold a factory a few motors. Three weeks later the chief engineer said he wouldn't buy any more: they ran too hot. Arguing would end it. So he asked three questions instead.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Turn a "no" around with a series of yeses`,
    `Ask questions for the other person's sake, not yours`,
    `Combine a friendly start with the yes-yes approach`,
  ],
  learn: [
    {
      kind: `story`,
      title: `"Your motors are too hot"`,
      beats: [
        { speaker: `narrator`, text: `Joseph Allison sold electric motors. His company had called on one factory for thirteen years before they finally bought a few. If those worked, hundreds more would follow. Three weeks later Allison called back, confident.` },
        { speaker: `narrator`, text: `The chief engineer said: "I can't buy the rest of the motors from you. They're too hot. I can't put my hand on them." Allison knew from long experience that arguing would get him nowhere.` },
        { speaker: `narrator`, text: `"I agree with you completely," he said. "If they're running too hot, you shouldn't buy any more. You need motors within the official industry standards. Isn't that so?" Yes. "The standards say a motor can run up to 72 degrees above the room's temperature. Correct?" Yes, but yours are much hotter.` },
        { speaker: `narrator`, text: `"How hot is the mill room?" About 75 degrees. "Well, 75 plus 72 makes 147. Wouldn't you scald your hand under a hot tap at 147 degrees?" Yes, again.` },
      ],
      choice: {
        prompt: `What did Allison suggest next, and what happened?`,
        options: [
          { text: `"So you're wrong about the motors."`, outcome: `He'd been careful never to say that, and he didn't start now.` },
          { text: `"Wouldn't it be a good idea to keep your hands off the motors?" The engineer laughed, agreed, and ordered about $35,000 worth for the next month.`, outcome: `That's it. Allison said it took years and thousands in lost sales before he learned that arguing doesn't pay, and getting people saying "yes, yes" does.`, best: true },
          { text: `He offered a discount to make up for the heat`, outcome: `No discount needed. The motors were fine; the engineer just needed to see it himself.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `The bank form`,
      before: {
        label: `The old way`,
        text: `A young man came into a bank to open an account and refused to answer some of the questions on the form. James Eberson, the teller, would once have said: no answers, no account. It felt good to show who was boss. It also lost customers.`,
      },
      after: {
        label: `The yes-yes way`,
        text: `This time he agreed the information wasn't strictly necessary. Then: "If you had money here when you died, would you want the bank to pass it to your next of kin?" Yes, of course. "Then wouldn't it be wise to give us their name, so we can carry out your wishes?" Yes. He filled in everything, and opened a trust account for his mother too.`,
      },
      notes: [
        `The questions were about what the customer wanted, not what the bank wanted.`,
        `Once he was saying yes, he forgot the issue and was happy to do what was suggested.`,
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Plan your first three questions before a hard conversation. Each should be one they'll honestly say yes to.`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 13 and 14.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Allison respond when told his motors were too hot?`,
        options: [
          { text: `"That's impossible."`, why: `He'd learned not to argue.` },
          { text: `"I agree. If they're too hot, you shouldn't buy any more."` },
          { text: `He offered to take them back`, why: `He started by agreeing, then asked questions.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `75 degrees in the room plus 72 allowed above it makes how many degrees? (a number)`,
        answers: [`147`],
        placeholder: `A number`,
      },
      {
        kind: `orderLines`,
        prompt: `Allison's questions, in order.`,
        lines: [`You need motors within the standards, right?`, `The standard allows 72 degrees above room temperature?`, `How hot is the mill room?`, `Wouldn't 147 degrees scald your hand?`],
      },
      {
        kind: `mcq`,
        prompt: `Why did the young man at the bank agree to fill in the form?`,
        options: [
          { text: `The teller insisted`, why: `That was the old way, and it lost customers.` },
          { text: `He saw the questions were for his benefit, not the bank's` },
          { text: `He was in a hurry`, why: `He stayed and opened a second account.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What Allison learned.`,
        template: `It doesn't pay to [[1]]. It pays to get the other person saying "[[2]], yes".`,
        blanks: [[`argue`], [`yes`]],
        distractors: [`listen`, `no`],
      },
      {
        kind: `sortGroups`,
        prompt: `Review: honey, or a yes-question?`,
        groups: [`Friendly opening (honey)`, `Yes-question`],
        items: [
          { text: `"I'm proud to be here, we meet as friends."`, group: 0 },
          { text: `"You'd want your family looked after, wouldn't you?"`, group: 1 },
          { text: `"I really like how you run this building."`, group: 0 },
          { text: `"We both want this fixed today, right?"`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `A customer won't share their email address at checkout. Which line gets a "no"?`,
        lines: [
          `No problem at all, it's optional.`,
          `You'd like a receipt for returns, wouldn't you?`,
          `Look, everyone gives their email, so you should too.`,
        ],
        bug: 2,
        fix: `If we email it, you'll never lose it. Would that help?`,
        explanation: `"Everyone else does" pushes. The yes-yes approach shows them it's for their benefit.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to its rule.`,
        pairs: [
          [`Rockefeller in Colorado`, `Begin in a friendly way`],
          [`The sun and the wind`, `Gentleness beats force`],
          [`Allison's motors`, `Get them saying yes`],
          [`The flooded basement`, `Stay friendly when you're owed`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 4): what did Socrates never do?`,
        options: [
          { text: `Tell people they were wrong` },
          { text: `Ask questions`, why: `That was his whole method.` },
          { text: `Talk to strangers`, why: `He talked to everyone in Athens.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Allison's closing question.`,
        tiles: [`Wouldn't`, `it`, `be`, `wise`, `to`, `keep`, `your`, `hands`, `off?`],
        distractors: [`wrong`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your teenager refuses to wear a cycle helmet. Which approach combines Rules 13 and 14?`,
        options: [
          { text: `"You'll wear it because I said so."`, why: `An order, and a guaranteed "no".` },
          { text: `"I love that you're cycling more. You want to keep doing the jumps at the park, right? And you'd hate a fall to stop you for months?"` },
          { text: `Show them injury statistics`, why: `Facts at someone who's already said no won't move them.` },
        ],
        answer: 1,
        explanation: `A friendly opening, then yeses on what THEY want, and the helmet becomes their idea.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before your next request, plan two questions the other person will say yes to. Ask them first. Did the real request go more smoothly?`,
    starters: [`My two yes-questions were...`, `Then I asked...`, `They...`],
  },
  deepen: {
    title: `The bow shop`,
    summary: `A shop that no longer rented bows asked a caller: have you rented before? Yes. Did it cost around thirty dollars? Yes. Do you like saving money? Yes. Then a full set is only five dollars more than renting. He bought it, and became a regular. Spot the yes-ladder in the next sales call you get.`,
  },
  notes: `Source: Carnegie, Part Three ch. 5: Joseph Allison and the Westinghouse motors (thirteen years, 72°F above room, 75°F mill room, 147°F, ~$35,000), James Eberson at the Greenwich Savings Bank (next of kin, trust account for his mother), Eddie Snow and the bow store ($34.95 set vs $25–30 rental). Retold in our own words.`,
};

export default lesson;
