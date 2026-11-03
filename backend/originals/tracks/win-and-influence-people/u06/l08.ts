import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 8 (Practice) — Rule 18 in practice: acknowledge the feeling, then the facts. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `Sympathy Melts Steel`,
  summary: `A piano student's long, beautiful nails made it nearly impossible to play well. Her teacher never told her to cut them. A week later, the nails were short, and the girl had never trimmed them for anyone before.`,
  minutes: 11,
  outcomes: [
    `Acknowledge someone's feelings before giving the facts`,
    `Sympathise with what someone will have to give up`,
    `Use sympathy to win agreement without pressure`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The fingernails`,
      before: {
        label: `What she could have said`,
        text: `"Those nails have to go if you want lessons with me. You can't play properly like that."`,
      },
      after: {
        label: `What Joyce Norris said`,
        text: `"Babette, you have lovely hands and beautiful nails. If you want to play as well as you're capable of, you'd be surprised how much quicker and easier it'd be with them shorter. Just think about it, okay?" Babette pulled a face. Joyce mentioned it, admiringly, to her mother too. The next week, the nails were trimmed.`,
      },
      notes: [
        `Her mother said she had nothing to do with it: Babette decided herself, the first time she'd ever cut them for anyone.`,
        `Joyce made it clear she knew it was a real sacrifice, and thanked her for it.`,
      ],
    },
    {
      kind: `reading`,
      title: `The angry mother and the escalator`,
      html:
        `<p>President Taft once refused to give a woman's son a government job that needed technical skills he didn't have. She wrote him a furious letter calling him ungrateful. Taft's first instinct was to be severe. Instead he put the letter away for two days, then wrote as politely as he could: he understood a mother's disappointment, but the appointment wasn't his personal choice; it had to go to someone with the right qualifications. She wrote back saying she was sorry.</p>` +
        `<p>Jay Mangum's company maintained a hotel's escalators. The manager hated shutting them down for more than two hours, but a proper repair needed eight. Jay didn't argue for the time. He said: "I know your hotel is busy and you want the shutdown as short as possible. I understand, and we want to help. But if we don't do the whole job now, it could break down for several days. I know you wouldn't want your guests put out for that long."</p>` +
        `<p>The manager agreed to eight hours. Sympathy with his desire to keep guests happy did what argument couldn't.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Name their feeling or desire first: "I know this matters to you because..." Then the facts land softly.`,
    },
  ],
  apply: {
    scenario: `Rule 18 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Joyce Norris start the conversation about Babette's nails?`,
        options: [
          { text: `By saying they had to go`, why: `She never gave an order.` },
          { text: `By praising her lovely hands and beautiful nails` },
          { text: `By asking her mother to make her cut them`, why: `Her mother had nothing to do with it.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did Taft do with the angry mother's letter first?`,
        options: [
          { text: `Answered it sharply`, why: `That was his first impulse, not what he did.` },
          { text: `Put it away for two days` },
          { text: `Gave her son the job`, why: `He still appointed the qualified person.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Sympathy first, or facts first?`,
        groups: [`Sympathy first`, `Facts first`],
        items: [
          { text: `"I know a long shutdown is the last thing you want."`, group: 0 },
          { text: `"The repair takes eight hours. Full stop."`, group: 1 },
          { text: `"It'll be a real sacrifice, I know."`, group: 0 },
          { text: `"The rules say no."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What Jay said to the hotel manager.`,
        template: `I know you wouldn't want your [[1]] inconvenienced for several [[2]].`,
        blanks: [[`guests`], [`days`]],
        distractors: [`staff`, `hours`],
      },
      {
        kind: `typeAnswer`,
        prompt: `How many hours did the full escalator repair need? (a number)`,
        answers: [`8`, `eight`],
        placeholder: `A number`,
      },
      {
        kind: `findBug`,
        prompt: `Telling a friend their wedding budget won't cover the venue they love. Which line lacks sympathy?`,
        lines: [
          `I know how much you've dreamed of that venue.`,
          `Frankly it was always a silly choice for your budget.`,
          `What if we look at places with a similar feel that fit the budget?`,
        ],
        bug: 1,
        fix: `It's a hard thing to let go of.`,
        explanation: `It mocks the very thing they care about. Sympathise with the dream first.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to the desire they sympathised with.`,
        pairs: [
          [`Joyce Norris`, `Babette's pride in her nails`],
          [`President Taft`, `A mother's disappointment`],
          [`Jay Mangum`, `Keeping hotel guests happy`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what is the sweetest sound in any language to a person?`,
        options: [
          { text: `Their own name` },
          { text: `Applause`, why: `It's their name.` },
          { text: `A compliment`, why: `Rule 6: their name.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a sympathetic opening for bad news.`,
        tiles: [`I`, `know`, `this`, `isn't`, `what`, `you`, `hoped`, `for.`],
        distractors: [`Tough.`],
      },
      {
        kind: `mcq`,
        prompt: `A colleague is upset their project was cancelled. You agree with the decision. What does Rule 18 suggest?`,
        options: [
          { text: `Explain why it was the right call`, why: `True, maybe, but they need sympathy before reasons.` },
          { text: `"I'd be gutted too after all that work. It was good work." Then talk about what's next` },
          { text: `Avoid them until they're over it`, why: `They'll remember who wasn't there.` },
        ],
        answer: 1,
        explanation: `Sympathy with their feelings doesn't mean disagreeing with the decision.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before giving your view to someone today, name their feeling or desire first. "I know this matters to you because..." What happened?`,
    starters: [`I said "I know..."`, `Then I gave my view, and...`],
  },
  deepen: {
    title: `Two days in the drawer`,
    summary: `Taft said such letters always bear two days' delay before answering, and after two days you won't send the angry reply. It's Lincoln's unsent letter again. Try the two-day drawer this week.`,
  },
  notes: `Source: Carnegie, Part Three ch. 9: Joyce Norris and Babette's fingernails (mother: "this is the first time she has ever trimmed her nails for anyone"), President Taft's Ethics in Service (the ambitious mother, two days' delay; the later "illness" letter omitted), Jay Mangum and the Tulsa hotel escalator (two hours vs eight). Retold in our own words.`,
};

export default lesson;
