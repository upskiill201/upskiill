import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 (Practice + Checkpoint) — Rule 8 when you need something; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `The Million-Dollar Cheque`,
  summary: `A scout leader needed a rich man to pay for one boy's trip to Europe. He didn't mention the boy, the trip or the money. He asked about a framed cheque on the wall, and got five times what he came for.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Open a request with the other person's interest`,
    `Use their passion to build goodwill before business`,
    `Combine listening and their interests in one conversation`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The framed cheque`,
      beats: [
        { speaker: `narrator`, text: `Edward Chalif ran a Boy Scout troop. A big scout gathering was coming up in Europe, and he wanted the president of one of America's largest companies to pay for one of his boys to go.` },
        { speaker: `narrator`, text: `Just before the meeting, he heard that this man had once written a cheque for a million dollars, and after it cleared, had it framed.` },
        { speaker: `narrator`, text: `So the first thing Chalif did in the office was ask to see the cheque. He said he'd never known anyone to write such a cheque and wanted to tell his boys he'd seen one. The man gladly showed it off. Chalif admired it and asked how it came to be written.` },
        { speaker: `narrator`, text: `He said nothing about the scouts, the trip or what he wanted. Eventually the man said: "Oh, by the way, what did you want to see me about?"` },
      ],
      choice: {
        prompt: `What happened when Chalif told him?`,
        options: [
          { text: `He agreed to send the one boy`, outcome: `He did more than that, much more.` },
          { text: `He sent five boys and Chalif, gave them a thousand dollars, and met them in Paris himself`, outcome: `That's it. He paid for seven weeks in Europe, gave them letters of introduction, and later found jobs for some of the boys.`, best: true },
          { text: `He said he'd think about it`, outcome: `No need to think. Chalif had warmed him up first.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `Four years, then one conversation`,
      before: {
        label: `Four years of pushing`,
        text: `A baker named Henry Duvernoy tried for four years to sell bread to a New York hotel. He called on the manager every week, went to the same social events, even took a room in the hotel. Nothing.`,
      },
      after: {
        label: `One conversation about him`,
        text: `Then he found out the manager was president of a hotel-greeters' society and passionate about it. Next visit, Duvernoy asked about it. The man talked for half an hour, glowing, and signed him up as a member. Bread wasn't mentioned. A few days later the hotel's steward called asking for samples and prices.`,
      },
      notes: [
        `"I don't know what you did to the old boy," said the steward, "but he's sold on you."`,
        `Four years of talking about bread. One conversation about what the manager loved.`,
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before any important ask, find out what the person is proud of, and start there. Your request can wait.`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 7 and 8.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Chalif ask about first?`,
        options: [
          { text: `Money for the trip`, why: `He didn't mention money at all at first.` },
          { text: `The framed million-dollar cheque` },
          { text: `The company's profits`, why: `He asked about the thing the man was proud of.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `How long had Duvernoy been trying to sell to the hotel?`,
        options: [
          { text: `Four months`, why: `Much longer.` },
          { text: `Four years` },
          { text: `Four weeks`, why: `It was years of weekly visits.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What the steward said to Duvernoy.`,
        template: `I don't know what you did to the old boy, but he's [[1]] on [[2]].`,
        blanks: [[`sold`], [`you`]],
        distractors: [`angry`, `bread`],
      },
      {
        kind: `sortGroups`,
        prompt: `Opening a request: their interest first, or yours?`,
        groups: [`Their interest first`, `Yours first`],
        items: [
          { text: `"Congratulations on the award. How did the team pull it off?"`, group: 0 },
          { text: `"I need ten minutes to pitch you something."`, group: 1 },
          { text: `"I saw your talk on climate design. What got you into it?"`, group: 0 },
          { text: `"Quick favour before you go."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Chalif asked for one boy's trip. How many boys did the man send? (a number)`,
        answers: [`5`, `five`],
        placeholder: `A number`,
      },
      {
        kind: `findBug`,
        prompt: `A message to a busy expert you want advice from. Which line should go?`,
        lines: [
          `Your podcast episode on small-business pricing changed how I run my bakery.`,
          `I'd love to know how you worked out that three-tier idea.`,
          `I know you're busy, but I really need your help, so can we talk this week?`,
        ],
        bug: 2,
        fix: `If you ever have fifteen minutes, I'd value your take on one question.`,
        explanation: `It swings back to what you need. Keep the message about their work and interests.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 2): how did Robert know his mother loved him?`,
        options: [
          { text: `She stopped what she was doing and listened` },
          { text: `She cooked his favourite meal`, why: `It was her listening.` },
          { text: `She told him so`, why: `He knew it from what she did.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 3): what did the furious phone customer do after four visits from a listener?`,
        options: [
          { text: `Paid all his bills and withdrew his complaints` },
          { text: `Switched companies`, why: `He stayed, and paid.` },
          { text: `Sued again`, why: `The listening ended the war.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to what won the person over.`,
        pairs: [
          [`The botanist`, `Hours of attentive listening`],
          [`The phone customer`, `Being heard out completely`],
          [`Young William Phelps`, `Talking about boats`],
          [`The hotel manager`, `Questions about his greeters' society`],
        ],
      },
      {
        kind: `orderLines`,
        prompt: `Chalif's approach, in order.`,
        lines: [`Find out what they're proud of`, `Ask about it first`, `Listen and admire honestly`, `Wait until they ask what you came for`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. You need a favour from a department head who's always rushed and curt. What's the plan?`,
        options: [
          { text: `Email the request in one line to respect their time`, why: `Efficient, but it's all about your want.` },
          { text: `Find out what they care about, open by asking about it, and let them bring up business` },
          { text: `Get your manager to ask for you`, why: `You may get the favour, but you'll never get the relationship.` },
        ],
        answer: 1,
        explanation: `Listening plus their interests: the Chalif and Duvernoy method. Their goodwill does the asking for you.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: open your next request, at work or home, with a question about something the other person is proud of. Let them ask what you came for. How did it go?`,
    starters: [`I needed...`, `I opened by asking about...`, `What happened was...`],
  },
  deepen: {
    title: `Both sides gain`,
    summary: `A man who used this rule all his life said his reward was different from each person, but always the same in one way: every conversation made his own life bigger. Talking about their interests isn't only useful. It's how you learn about the world.`,
  },
  notes: `Source: Carnegie, Part Two ch. 5: Edward L. Chalif and the framed million-dollar cheque (five boys, $1,000, seven weeks, met them in Paris, jobs for boys), Henry G. Duvernoy and the Hotel Greeters (four years, steward's quote), Howard Z. Herzig's "enlargement of his life". Retold in our own words.`,
};

export default lesson;
