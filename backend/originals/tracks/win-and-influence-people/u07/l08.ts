import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 8 (Practice) — Rule 21: challenges that change careers. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `"Is the Hero a Coward?"`,
  summary: `Theodore Roosevelt was about to quit the race for governor of New York. A senator turned on him with one question, and changed American history. Then a governor offered a young man the most dangerous job in the state's prisons.`,
  minutes: 11,
  outcomes: [
    `Frame a hard task as a challenge worthy of the person`,
    `Use a challenge to help someone overcome fear`,
    `Recognise when a challenge, not pay, is what motivates`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Two challenges`,
      html:
        `<p><strong>The hero of San Juan Hill.</strong> Theodore Roosevelt came back from the war in Cuba a hero and was chosen to run for governor of New York. Then his opponents discovered he was no longer legally a resident of the state. Frightened, Roosevelt wanted to withdraw.</p>` +
        `<p>Senator Thomas Platt turned on him and cried: "Is the hero of San Juan Hill a coward?" Roosevelt stayed in the fight. He won, and later became President. One challenge changed his life, and his country's future.</p>` +
        `<p><strong>Sing Sing.</strong> When Al Smith was governor of New York, Sing Sing prison had no warden. It was riddled with scandal. Wardens came and went; one lasted three weeks. Smith needed a strong man, and sent for Lewis Lawes.</p>` +
        `<p>"How about taking charge of Sing Sing?" Lawes was stunned. He knew the dangers, and he had a career to think of. Smith saw him hesitate, leaned back and smiled: "Young fellow, I don't blame you for being scared. It's a tough spot. It'll take a big person to go up there and stay."</p>` +
        `<p>Lawes liked the idea of a job that needed someone big. He went, and stayed, and became the most famous warden of his time. His reforms helped transform how prisoners were treated.</p>`,
    },
    {
      kind: `check`,
      question: `What made Lawes take the Sing Sing job?`,
      options: [`A big pay rise`, `The challenge that it would take a big person to do it`, `A threat from the governor`],
      answer: 1,
      explanation: `Smith even sympathised with his fear first, then threw down the challenge.`,
    },
    {
      kind: `compare`,
      title: `An offer or a challenge?`,
      before: {
        label: `An offer`,
        text: `"We need someone to run the struggling Lagos office. It pays a bit more. Interested?"`,
      },
      after: {
        label: `A challenge`,
        text: `"I won't pretend it's easy. Three managers have tried the Lagos office and left. It'll take someone special to turn it round, and I think that's you."`,
      },
      notes: [
        `The offer talks about pay. The challenge talks about the person.`,
        `Notice Smith's order: sympathy for the fear first, then the challenge.`,
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `When someone hesitates at a hard task, don't shrink the task. Say it'll take someone special, and that you think it's them.`,
    },
  ],
  apply: {
    scenario: `Rule 21 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Roosevelt want to quit the race for governor?`,
        options: [
          { text: `He'd been found to be no longer legally a resident of New York` },
          { text: `He was ill`, why: `It was the residency problem.` },
          { text: `He wanted to go back to Cuba`, why: `He was frightened about the residency issue.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Senator Platt's challenge.`,
        template: `Is the hero of San Juan Hill a [[1]]?`,
        blanks: [[`coward`]],
        distractors: [`liar`, `leader`],
      },
      {
        kind: `mcq`,
        prompt: `What did Al Smith say before throwing down the challenge?`,
        options: [
          { text: `"I don't blame you for being scared. It's a tough spot."` },
          { text: `"You'll be paid well."`, why: `He didn't lead with pay.` },
          { text: `"You have no choice."`, why: `He made it Lawes's choice.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `One previous Sing Sing warden lasted only three ________. (one word)`,
        answers: [`weeks`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Offer or challenge?`,
        groups: [`Offer`, `Challenge`],
        items: [
          { text: `"There's a bonus if you take it."`, group: 0 },
          { text: `"It'll take someone big to do this."`, group: 1 },
          { text: `"It's an easy win, honestly."`, group: 0 },
          { text: `"Nobody's cracked it yet. Want to be the first?"`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Asking a nervous colleague to give the big client presentation. Which line weakens the challenge?`,
        lines: [
          `I know it's a big stage, and nerves are normal.`,
          `Don't worry, it's not really that important.`,
          `It needs someone who really knows the work, and that's you.`,
        ],
        bug: 1,
        fix: `It's a chance to show the client what you can do.`,
        explanation: `Shrinking the task removes the challenge. Smith said it was tough, then said it needed someone big.`,
      },
      {
        kind: `orderLines`,
        prompt: `Al Smith's approach, in order.`,
        lines: [`Make the offer`, `Notice the hesitation`, `Sympathise with the fear`, `Say it takes someone big`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each challenger to the person they challenged.`,
        pairs: [
          [`Thomas Platt`, `Theodore Roosevelt`],
          [`Al Smith`, `Lewis Lawes`],
          [`Charles Schwab`, `The day and night shifts`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 6): what's Rule 18?`,
        options: [
          { text: `Be sympathetic with the other person's ideas and desires` },
          { text: `Throw down a challenge`, why: `That's Rule 21.` },
          { text: `Smile`, why: `That's Rule 5.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your talented younger sibling is scared to apply for a competitive scholarship. What would Al Smith say?`,
        options: [
          { text: `"Don't bother if you're scared."`, why: `That gives the fear the final word.` },
          { text: `"I get why it's scary. It's tough. It'll take someone exceptional, and I think that's you."` },
          { text: `"It's easy, anyone could get it."`, why: `If it's easy, there's no challenge, and it isn't true.` },
        ],
        answer: 1,
        explanation: `Sympathy for the fear, then a challenge that tells them they're big enough.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: when someone hesitates at something hard this week, don't shrink it. Tell them it'll take someone special, and that you believe it's them. What happened?`,
    starters: [`Someone hesitated at...`, `I told them...`, `They...`],
  },
  deepen: {
    title: `Fear and courage`,
    summary: `Carnegie quotes the motto of an ancient Greek royal guard: all men have fears, but the brave put down their fears and go forward. What greater challenge is there than overcoming a fear? Which fear of yours could use a challenge this week?`,
  },
  notes: `Source: Carnegie, Part Three ch. 12: Roosevelt, the residency issue and Thomas Collier Platt's challenge; the King's Guard motto; Al Smith and Lewis E. Lawes ("I don't blame you for being scared... it'll take a big person"), 20,000 Years in Sing Sing. The Lagos-office comparison is our illustration. Retold in our own words.`,
};

export default lesson;
