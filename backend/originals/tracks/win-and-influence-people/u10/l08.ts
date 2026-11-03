import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 8 (Practice) — Rule 30 in practice: titles, responsibility and benefits. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `Supervisor of Price Tags`,
  summary: `A shop assistant kept forgetting to put price tags on the shelves. Reminders, warnings and confrontations changed nothing. Then her manager gave her a title.`,
  minutes: 11,
  outcomes: [
    `Use a title or responsibility to change behaviour`,
    `Turn a chore into a deal people are glad to take`,
    `Soften a refusal by offering an alternative`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The price tags`,
      before: {
        label: `Reminders`,
        text: `Gunter Schmidt managed a food shop in Germany. One employee kept forgetting to put the right price tags on the shelves, causing confusion and complaints. Reminders, warnings and confrontations did little good.`,
      },
      after: {
        label: `A title`,
        text: `He called her in and appointed her Supervisor of Price Tag Posting for the entire store, responsible for keeping every shelf properly tagged. Her attitude changed completely, and she did the job well from then on.`,
      },
      notes: [
        `Childish? Perhaps. That's what people said to Napoleon when he handed out 15,000 medals and made eighteen generals Marshals of France.`,
        `Napoleon replied: men are ruled by toys.`,
      ],
    },
    {
      kind: `reading`,
      title: `The pears and the detective`,
      html:
        `<p><strong>The pears.</strong> Dale Ferrier's son Jeff had to pick up fallen pears so the person mowing wouldn't have to stop. He hated it and did it badly. Instead of a confrontation, Dale offered a deal: a dollar for every full basket, but a dollar off for every pear left behind. Jeff not only picked up every pear; his father had to watch that he didn't pull a few off the trees to fill the baskets.</p>` +
        `<p><strong>The detective.</strong> A woman named Mrs. Gent was plagued by boys running across her lawn. Criticism and coaxing failed. So she made the worst offender her "detective", in charge of keeping all trespassers off. Problem solved: he built a bonfire in the back garden, heated an iron red-hot and threatened to brand any boy who stepped on the grass.</p>` +
        `<p><strong>The speaker.</strong> Carnegie knew a man who had to turn down many invitations to speak, even from friends. He did it so well people were content. After thanking them and regretting he couldn't come, he immediately suggested another speaker who could. They never had time to feel unhappy about the refusal.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `A title, a responsibility or a fair deal can make people glad to do what nagging never could.`,
    },
  ],
  apply: {
    scenario: `Rule 30 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What title did Gunter Schmidt give his employee?`,
        options: [
          { text: `Supervisor of Price Tag Posting` },
          { text: `Employee of the Month`, why: `It was a responsibility, not an award.` },
          { text: `Store Manager`, why: `A specific title for the tags.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Napoleon's reply to his critics.`,
        template: `Men are ruled by [[1]].`,
        blanks: [[`toys`]],
        distractors: [`fear`, `money`],
      },
      {
        kind: `mcq`,
        prompt: `What was Jeff's deal for picking up pears?`,
        options: [
          { text: `A dollar per basket, minus a dollar per pear left behind` },
          { text: `Pocket money if he did it all summer`, why: `It was per basket.` },
          { text: `No mowing chores`, why: `It was a dollar deal.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `What title did Mrs. Gent give the worst boy on her lawn? Her ________. (one word)`,
        answers: [`detective`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Makes them glad to do it, or nags?`,
        groups: [`Glad to do it`, `Nagging`],
        items: [
          { text: `"You're now in charge of keeping the supply cupboard stocked."`, group: 0 },
          { text: `"I've told you ten times about the cupboard."`, group: 1 },
          { text: `"A dollar for every basket you fill."`, group: 0 },
          { text: `"Pick up the pears or else."`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Declining a speaking invitation. Which line leaves them unhappy?`,
        lines: [
          `Thank you so much for thinking of me.`,
          `I'm sorry I can't make that date.`,
          `I'm sure you'll find somebody eventually.`,
        ],
        bug: 2,
        fix: `My colleague Ana would be brilliant, and she's free that week.`,
        explanation: `It leaves them with a problem. Suggest a substitute so they have no time to feel let down.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their technique.`,
        pairs: [
          [`Gunter Schmidt`, `A title for the tag-forgetter`],
          [`Dale Ferrier`, `A dollar per basket`],
          [`Mrs. Gent`, `A "detective" for the lawn`],
          [`The busy speaker`, `Suggested a substitute`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 7): what's Rule 21?`,
        options: [
          { text: `Throw down a challenge` },
          { text: `Make them happy to do it`, why: `That's Rule 30.` },
          { text: `Ask questions instead of orders`, why: `That's Rule 25.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Give someone a title.`,
        tiles: [`You're`, `now`, `our`, `official`, `welcome`, `host.`],
        distractors: [`servant.`],
      },
      {
        kind: `mcq`,
        prompt: `Your younger sibling never helps set the table. Which approach follows this lesson?`,
        options: [
          { text: `"Set the table, you never help."`, why: `Nagging, plus a bad name.` },
          { text: `"You're officially in charge of the table for Sunday lunch. Design it however you like."` },
          { text: `Do it yourself and complain`, why: `That's Rule 1 broken.` },
        ],
        answer: 1,
        explanation: `A title and some creative control make a chore something to be proud of.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: give someone a small title or responsibility this week instead of a reminder. What was it, and did it change anything?`,
    starters: [`Instead of reminding... I made them...`, `What changed:...`],
  },
  deepen: {
    title: `Ruled by toys`,
    summary: `Napoleon was mocked for giving medals to hardened soldiers. It worked. What small recognition, title or "toy" could make someone you know glad to do their part?`,
  },
  notes: `Source: Carnegie, Part Four ch. 9: Dale O. Ferrier and Jeff's pears, the man who declined speaking invitations by suggesting substitutes, Gunter Schmidt's Supervisor of Price Tag Posting, Napoleon's Legion of Honor ("men are ruled by toys"), Mrs. Ernest Gent's "detective". Retold in our own words.`,
};

export default lesson;
