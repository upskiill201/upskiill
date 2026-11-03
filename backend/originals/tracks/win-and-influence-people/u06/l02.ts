import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 2 (Practice) — Rule 16: plant the idea and let them sell themselves. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Plant It and Walk Away`,
  summary: `The President's most trusted adviser once urged an idea on him, and the President seemed to reject it. Days later, at dinner, the President announced it as his own. What the adviser did next is why he stayed so powerful.`,
  minutes: 11,
  outcomes: [
    `Plant an idea casually and let it grow`,
    `Give away the credit to get the result`,
    `Let customers and clients sell themselves`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Colonel House`,
      html:
        `<p>While Woodrow Wilson was President, Colonel Edward House had enormous influence over him, more than most of his cabinet. How? House explained it himself.</p>` +
        `<p>He'd learned that the best way to win Wilson over to an idea was to plant it in his mind casually, so it interested him and got him thinking about it on his own. The first time it happened by accident. House urged a policy that Wilson seemed to dislike. Days later at dinner, House was amazed to hear Wilson put forward the very same idea as his own.</p>` +
        `<p>Did House interrupt and say, "That's my idea"? Not House. He didn't care about credit. He wanted results. So he let Wilson go on feeling it was his. He even gave Wilson public credit for it.</p>` +
        `<p>Everyone we deal with is just as human as Woodrow Wilson.</p>`,
    },
    {
      kind: `compare`,
      title: `The X-ray machines`,
      before: {
        label: `Every other salesperson`,
        text: `A Brooklyn hospital was building the finest X-ray department in America. Its head doctor was swamped by salespeople, each singing the praises of their own equipment.`,
      },
      after: {
        label: `One manufacturer`,
        text: `One wrote: our new machines have just arrived. They aren't perfect, we know that, and we want to improve them. Would you find time to look them over and tell us how to make them more useful? We'll send a car whenever you like. The doctor cancelled a dinner to go. The more he studied it, the more he liked it. "Nobody tried to sell it to me," he said. "I felt the idea of buying it was my own." He ordered it.`,
      },
      notes: [
        `Asking for his advice made him feel important.`,
        `He sold himself on its qualities.`,
      ],
    },
    {
      kind: `text`,
      html:
        `<p>Carnegie fell for it himself. Planning a fishing trip in Canada, he wrote to the tourist office and was buried in brochures and testimonials. One camp owner did something different: he sent the names and numbers of people in New York who'd stayed with him, and invited Carnegie to call them and find out for himself.</p>` +
        `<p>Carnegie knew one of them, phoned him, and booked. The others tried to sell him. One let him sell himself. That one won.</p>` +
        `<p>Twenty-five centuries ago Lao-tse wrote that rivers and seas receive the streams of a hundred mountains because they keep below them. So the wise person, wishing to lead, puts themselves behind.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Want the result more than the credit. Plant the idea, ask for their view, and let them make it theirs.`,
    },
  ],
  apply: {
    scenario: `Rule 16 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Colonel House do when Wilson presented House's idea as his own?`,
        options: [
          { text: `Reminded him it was House's idea`, why: `He never did.` },
          { text: `Let Wilson keep it, and even gave him public credit` },
          { text: `Told the newspapers`, why: `He wanted results, not credit.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did the X-ray manufacturer ask the doctor for?`,
        options: [
          { text: `An order`, why: `He asked for something cleverer.` },
          { text: `His advice on how to improve the machines` },
          { text: `A meeting with the hospital board`, why: `He asked the doctor himself.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The doctor's words.`,
        template: `Nobody tried to [[1]] it to me. I felt the idea of buying it was my [[2]].`,
        blanks: [[`sell`], [`own`]],
        distractors: [`give`, `boss's`],
      },
      {
        kind: `sortGroups`,
        prompt: `Lets them sell themselves, or sells to them?`,
        groups: [`Let them sell themselves`, `Sell to them`],
        items: [
          { text: `"Here are three past clients, call any of them."`, group: 0 },
          { text: `"We're the best in the business, trust me."`, group: 1 },
          { text: `"Would you try it for a week and tell us what's missing?"`, group: 0 },
          { text: `Ten pages of testimonials`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Carnegie booked a camp after phoning someone on the owner's list. Where was the camp? New ________. (one word)`,
        answers: [`Brunswick`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `You suggested an idea last month; now your manager presents it as theirs. Which response breaks Rule 16?`,
        lines: [
          `That's a great direction. How can I help make it happen?`,
          `Funny, that's exactly what I said in March, actually.`,
          `I'd love to lead the first part if that's useful.`,
        ],
        bug: 1,
        fix: `I think it could really work.`,
        explanation: `You'd win the credit and lose the idea. House wanted the result.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they planted the idea.`,
        pairs: [
          [`Colonel House`, `Let the President think it was his`],
          [`The X-ray maker`, `Asked the doctor for advice`],
          [`The camp owner`, `Gave names of past guests to call`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did Roosevelt do before a visitor arrived?`,
        options: [
          { text: `Read up on the visitor's interests` },
          { text: `Prepared his own talking points`, why: `He prepared their subject, not his.` },
          { text: `Nothing special`, why: `He sat up late reading.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the X-ray maker's request.`,
        tiles: [`How`, `could`, `we`, `make`, `them`, `more`, `useful`, `to`, `you?`],
        distractors: [`buy`],
      },
      {
        kind: `mcq`,
        prompt: `You think your team should change how it runs weekly meetings. What's the House approach?`,
        options: [
          { text: `Present a full new format and ask for a vote`, why: `Your idea, presented as yours.` },
          { text: `Casually ask "Do our meetings ever feel long to you?" and let the team come up with changes` },
          { text: `Change the meeting invite and see who complains`, why: `An order in disguise.` },
        ],
        answer: 1,
        explanation: `Plant the question, let them grow the idea, and give them the credit.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: let someone else take the credit for an idea today, or plant one with a question and let them run with it. What happened?`,
    starters: [`I planted the idea of...`, `They...`],
  },
  deepen: {
    title: `Keep below them`,
    summary: `Lao-tse said rivers rule the mountain streams because they stay below them. This week, try leading one decision from behind: ask, suggest, and let someone else stand in front.`,
  },
  notes: `Source: Carnegie, Part Three ch. 7: Colonel Edward M. House and Woodrow Wilson (via Arthur D. Howden Smith in The Saturday Evening Post), the Brooklyn hospital X-ray letter, the New Brunswick fishing camp's list of references, Lao-tse on rivers and seas. Retold in our own words.`,
};

export default lesson;
