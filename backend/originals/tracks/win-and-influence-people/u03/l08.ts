import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 (Practice) — Rule 9 in small courtesies and responsibility. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `Little Courtesies`,
  summary: `Two volunteers each thought they were in charge of the drinks stand, and the night was about to turn sour. A young man handed one of them a cash box and saved the evening.`,
  minutes: 11,
  outcomes: [
    `Use small courtesies that make people feel respected`,
    `Give people a role that recognises their importance`,
    `Spot quiet people who need to hear they matter`,
  ],
  learn: [
    {
      kind: `explore`,
      title: `Words that oil the wheels`,
      text: `Waiter brings mashed potatoes instead of chips: "I'm sorry to trouble you, but I'd prefer the chips. Would you mind? Thank you so much."`,
      hotspots: [
        { phrase: `I'm sorry to trouble you`, note: `Respects their time and effort before asking anything.` },
        { phrase: `I'd prefer`, note: `States your want without blaming them for the mistake.` },
        { phrase: `Would you mind?`, note: `A request, not an order. It leaves them in charge.` },
        { phrase: `Thank you so much`, note: `Little courtesies like these oil the wheels of everyday life.` },
      ],
    },
    {
      kind: `story`,
      title: `The cash box`,
      beats: [
        { speaker: `narrator`, text: `David was asked to take charge of the refreshment stand at a charity concert. When he arrived, two older volunteers, Rose and Jane, were standing by the stand in a very bad mood. Each thought she was in charge.` },
        { speaker: `narrator`, text: `A committee member rushed up, handed David the cash box, introduced the two women as his helpers and ran off. A great silence followed.` },
        { speaker: `narrator`, text: `David realised the cash box was a kind of symbol of authority.` },
      ],
      choice: {
        prompt: `What did he do?`,
        options: [
          { text: `Kept the cash box and gave them both jobs`, outcome: `He'd have been right, and the evening would have been miserable.` },
          { text: `Gave Rose the cash box, saying she'd keep the money straight better than him, and put Jane in charge of the drinks machine and the teenage helpers`, outcome: `That's it. Rose happily counted money, Jane ran the teenagers, and David enjoyed the concert.`, best: true },
          { text: `Asked the committee to sort it out`, outcome: `They'd already run off. He fixed it himself, with Rule 9.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `"Am I good enough?"`,
      html:
        `<p>A crafts teacher named Ronald had a shy fourteen-year-old called Chris in his beginners' class, the kind of quiet student who rarely gets noticed. Ronald also taught an advanced class that students saw as a real honour to join.</p>` +
        `<p>One day, watching Chris work, he sensed a hidden fire in him, and asked if he'd like to move up to the advanced class. Chris's face showed a storm of feeling as he held back tears. "Who, me? Am I good enough?" "Yes, Chris, you're good enough."</p>` +
        `<p>Chris walked out that day looking two inches taller. Ronald hung a sign at the front of his classroom: YOU ARE IMPORTANT. It was there to remind him that every student he faced was equally important.</p>` +
        `<p>The truth is that almost everyone you meet feels superior to you in some way. A sure way to their hearts is to let them see, quietly and sincerely, that you recognise their importance.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `"Would you mind?", "I'm sorry to trouble you", "Thank you". Small words, used every day, are Rule 9 in its simplest form.`,
    },
  ],
  apply: {
    scenario: `Rule 9 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did David hand Rose the cash box?`,
        options: [
          { text: `He didn't want the responsibility`, why: `He was giving her importance, not dodging work.` },
          { text: `It was a symbol of authority, and giving it to her made her feel important` },
          { text: `She asked for it`, why: `Nobody asked. He saw what was needed.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What sign did Ronald hang in his classroom?`,
        options: [
          { text: `WORK HARDER`, why: `It was about the students' worth.` },
          { text: `YOU ARE IMPORTANT` },
          { text: `NO PHONES`, why: `It reminded him of every student's importance.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Courtesy or command?`,
        groups: [`Courtesy`, `Command`],
        items: [
          { text: `"Would you mind sending that over?"`, group: 0 },
          { text: `"Send it now."`, group: 1 },
          { text: `"Sorry to trouble you, could you check this?"`, group: 0 },
          { text: `"Fix this."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Chris's words.`,
        template: `"Who, me? Am I [[1]] [[2]]?"`,
        blanks: [[`good`], [`enough`]],
        distractors: [`ready`, `allowed`],
      },
      {
        kind: `findBug`,
        prompt: `Asking a waiter to fix a wrong order. Which line drops the courtesy?`,
        lines: [
          `Sorry to trouble you.`,
          `I ordered chips, obviously, can you not read?`,
          `Would you mind swapping these? Thank you.`,
        ],
        bug: 1,
        fix: `I think I'd ordered the chips.`,
        explanation: `It blames and belittles. The courtesies around it can't rescue it.`,
      },
      {
        kind: `typeAnswer`,
        prompt: `Chris walked out of class looking two inches ________. (one word)`,
        answers: [`taller`],
        placeholder: `One word`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they gave importance.`,
        pairs: [
          [`David`, `Handed over the cash box`],
          [`Ronald`, `Invited a shy boy into the advanced class`],
          [`The diner`, `"Sorry to trouble you"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the difference between appreciation and flattery?`,
        options: [
          { text: `Appreciation is sincere and unselfish; flattery is insincere and selfish` },
          { text: `There's no real difference`, why: `There's all the difference in the world.` },
          { text: `Flattery is just stronger praise`, why: `It's not stronger. It's fake.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a courteous request.`,
        tiles: [`Would`, `you`, `mind`, `checking`, `this`, `for`, `me?`],
        distractors: [`Do`, `it.`],
      },
      {
        kind: `mcq`,
        prompt: `Two colleagues are arguing over who leads a project, and you're their manager. What's the David move?`,
        options: [
          { text: `Pick one and tell the other to accept it`, why: `One wins, one sulks for months.` },
          { text: `Give each a clear area they own, so both feel important` },
          { text: `Lead it yourself to avoid the argument`, why: `Now neither feels important.` },
        ],
        answer: 1,
        explanation: `The cash box for one, the drinks machine for the other. Both in charge of something.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: use "would you mind", "sorry to trouble you" and "thank you" with everyone you ask for something today. Did anyone respond differently?`,
    starters: [`I used them with...`, `The difference I noticed was...`],
  },
  deepen: {
    title: `The quiet student`,
    summary: `Who is your Chris, the quiet person whose work nobody notices? Tell them this week, specifically, that they're good enough.`,
  },
  notes: `Source: Carnegie, Part Two ch. 6: courtesy phrases (the waitress and the potatoes), David G. Smith, Rose, Jane and the cash box, Ronald J. Rowland and Chris ("you are important" sign), "almost all the people you meet feel themselves superior to you in some way". Retold in our own words.`,
};

export default lesson;
