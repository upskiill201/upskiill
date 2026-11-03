import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2 (Practice) — Rule 10 at work: agree, then move on. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Agree About the Other Truck`,
  summary: `He won almost every argument with his customers, and sold almost nothing. Then he learned to say five words about his competitor that left buyers speechless.`,
  minutes: 11,
  outcomes: [
    `Defuse a challenge by agreeing with what you can`,
    `Replace a battle of facts with appreciation`,
    `Keep your mouth shut when arguing won't help`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `Patrick O'Haire sells trucks`,
      before: {
        label: `Before`,
        text: `A buyer says: "Your trucks? Useless. I'm buying the other brand." Pat sees red and goes for the buyer's throat. He wins the argument. He walks out muttering, "I told him something." He has told him something. He hasn't sold him anything.`,
      },
      after: {
        label: `After`,
        text: `Same buyer, same insult. Pat says: "The other brand is a good truck. You won't go wrong with it. Fine company, good people." The buyer is speechless. He can't keep saying "it's the best" while Pat agrees. They move on, and Pat talks about the good points of his own trucks.`,
      },
      notes: [
        `The more Pat argued against the rival, the more the buyer argued for it, and sold himself on it.`,
        `Pat became a star salesman. "I keep my mouth shut now," he said. "It pays."`,
      ],
    },
    {
      kind: `reading`,
      title: `The tax inspector`,
      html:
        `<p>A tax consultant named Frederick Parsons argued for an hour with a government inspector over nine thousand dollars he said was a bad debt that should never be taxed. The inspector was cold, arrogant and stubborn. Facts bounced off him. The longer they argued, the harder he dug in.</p>` +
        `<p>So Parsons stopped arguing, changed the subject, and gave him appreciation. He said this must be a small matter next to the hard decisions the inspector faced every day. He'd studied tax from books, but the inspector learned it on the front line. He sometimes wished he had a job like that. And he meant every word.</p>` +
        `<p>The inspector sat back and talked about his work and the clever frauds he'd uncovered. He grew friendly and told Parsons about his children. Three days later he came to Parsons's office and said he'd leave the tax return exactly as filed.</p>` +
        `<p>As long as Parsons argued, the inspector got his feeling of importance by asserting his authority. Once his importance was recognised, he became a kind and reasonable man.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `When someone attacks your position, find the part you can honestly agree with and say so first. There's no fight left when one side agrees.`,
    },
  ],
  apply: {
    scenario: `Rule 10 at work.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What happened when Pat argued against the rival truck?`,
        options: [
          { text: `The buyer came round to Pat's trucks`, why: `The opposite.` },
          { text: `The buyer argued for the rival and sold himself on it` },
          { text: `The buyer walked out`, why: `He usually stayed, and argued harder.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did Pat start saying about the competitor?`,
        options: [
          { text: `That it was overpriced`, why: `He'd stopped attacking it.` },
          { text: `That it was a good truck made by good people` },
          { text: `Nothing at all`, why: `He praised it, which left nothing to argue about.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Pat's old boast.`,
        template: `"I told that man something." True. But he hadn't [[1]] him [[2]].`,
        blanks: [[`sold`], [`anything`]],
        distractors: [`told`, `everything`],
      },
      {
        kind: `typeAnswer`,
        prompt: `How many dollars were at stake in Parsons's tax dispute? (a number)`,
        answers: [`9000`, `9,000`, `nine thousand`],
        placeholder: `A number`,
      },
      {
        kind: `sortGroups`,
        prompt: `Defusing or escalating?`,
        groups: [`Defusing`, `Escalating`],
        items: [
          { text: `"You've got a point about the price."`, group: 0 },
          { text: `"That's just not true."`, group: 1 },
          { text: `"I can see why you'd prefer the other one."`, group: 0 },
          { text: `"Let me explain why you're wrong."`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `A customer says your app is worse than a rival's. Which reply keeps the argument going?`,
        lines: [
          `They make a good app, a lot of people love it.`,
          `Honestly, their app is a mess if you look closely.`,
          `Can I show you the one thing ours does that theirs doesn't?`,
        ],
        bug: 1,
        fix: `It's a solid choice.`,
        explanation: `Attacking the rival makes the customer defend it, and themselves for liking it.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what changed things.`,
        pairs: [
          [`Pat O'Haire`, `Praising the rival truck`],
          [`Frederick Parsons`, `Appreciating the inspector's experience`],
          [`Frank Gammond`, `Letting a wrong quote stand`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what did Napoleon III do to fix a name in his memory?`,
        options: [
          { text: `Wrote it down, looked at it, then tore it up` },
          { text: `Asked his secretary`, why: `He did it himself.` },
          { text: `Gave people nicknames`, why: `The opposite of his method.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Defuse a challenge to your plan.`,
        tiles: [`You're`, `right`, `that`, `it's`, `ambitious.`],
        distractors: [`wrong`],
      },
      {
        kind: `mcq`,
        prompt: `A stubborn official won't approve your permit, and arguing the rules for an hour has got nowhere. What did Parsons do that you could try?`,
        options: [
          { text: `Quote the rules more firmly`, why: `Facts were already bouncing off.` },
          { text: `Stop arguing and sincerely recognise their experience and authority` },
          { text: `Threaten to complain to their boss`, why: `That makes their authority the battleground.` },
        ],
        answer: 1,
        explanation: `While you argue, they protect their importance. Recognise it, and the reasonable person underneath appears.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: the next time someone challenges you, find the part you honestly agree with and say it first. What did you agree with, and what happened next?`,
    starters: [`They challenged me on...`, `I agreed that...`, `Then...`],
  },
  deepen: {
    title: `Dead right`,
    summary: `An old rhyme tells of a man who died insisting on his right of way: he was right, dead right, but just as dead as if he'd been wrong. Being right in an argument often gets you about as far.`,
  },
  notes: `Source: Carnegie, Part Three ch. 1: Patrick J. O'Haire and the White Motor trucks ("the Whose-It is a good truck", "I keep my mouth shut now. It pays."), the William Jay epitaph, Frederick S. Parsons and the tax inspector ($9,000, appreciation, decision three days later). Retold in our own words.`,
};

export default lesson;
