import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 4 (Story) — Rule 26: let the other person save face. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `Let Them Save Face`,
  summary: `General Electric had a problem: its brilliant electrical genius was a failure as head of a department, and he was both indispensable and very sensitive. How do you demote a genius without losing him?`,
  minutes: 11,
  outcomes: [
    `Explain why protecting someone's pride matters`,
    `Deliver bad news in a way that preserves dignity`,
    `Let people go with their heads held high`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Charles Steinmetz`,
      beats: [
        { speaker: `narrator`, text: `Years ago General Electric had to remove Charles Steinmetz as head of a department. Steinmetz was a genius when it came to electricity, but a failure at running the calculating department.` },
        { speaker: `narrator`, text: `The company didn't dare offend him. He was indispensable, and highly sensitive.` },
      ],
      choice: {
        prompt: `What did GE do?`,
        options: [
          { text: `Told him plainly he wasn't suited to managing`, outcome: `They'd likely have lost him.` },
          { text: `Gave him a new title, Consulting Engineer, for work he was already doing, and let someone else run the department`, outcome: `That's it. Steinmetz was happy. So were GE's officers. They'd handled their most temperamental star without a storm, by letting him save face.`, best: true },
          { text: `Left him in the job to avoid upsetting him`, outcome: `That would have hurt the department. They found a way to change things and protect his pride.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `"Getting fired is even less fun"`,
      html:
        `<p>Letting someone save face! How vitally important that is, and how few of us stop to think about it. We ride roughshod over people's feelings, find fault, make threats, criticise a child or an employee in front of others, without a thought for their pride. A few minutes' thought and a considerate word or two would ease the sting so much.</p>` +
        `<p>An accountant, Marshall Granger, wrote to Carnegie about the end of every tax season, when his firm had to let seasonal staff go. Firing people is no fun, he said; being fired is even less. The custom was to get it over quickly: "The season's over, we've no more work for you, you knew it was only for the busy season."</p>` +
        `<p>The people left disappointed and let down, with no affection for the firm. So he changed it. He thought carefully about each person's work first, then said something like: you did a fine job. That time we sent you to Newark, you were on the spot and came through brilliantly. You're going a long way, wherever you work. This firm believes in you.</p>` +
        `<p>They left feeling far better about being let go. And when the firm needed them again, they came back with real affection.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 26: Let the other person save face. Even when you have to deliver bad news, protect their dignity.`,
    },
  ],
  apply: {
    scenario: `Rule 26: Let them save face.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What new title did GE give Steinmetz?`,
        options: [
          { text: `Consulting Engineer` },
          { text: `Vice President`, why: `It was a title for the work he already did.` },
          { text: `Head Scientist`, why: `It was Consulting Engineer.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Why couldn't GE simply tell Steinmetz he'd failed as a manager?`,
        options: [
          { text: `He was indispensable and highly sensitive` },
          { text: `His contract forbade it`, why: `It was about his pride.` },
          { text: `He was the owner`, why: `He was an employee, a precious one.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Granger's honest line.`,
        template: `Firing employees is not much [[1]]. Getting fired is even [[2]] fun.`,
        blanks: [[`fun`], [`less`]],
        distractors: [`work`, `more`],
      },
      {
        kind: `sortGroups`,
        prompt: `Saves face or causes loss of face?`,
        groups: [`Saves face`, `Loses face`],
        items: [
          { text: `A new title for work they already do well`, group: 0 },
          { text: `Criticising an employee in front of their team`, group: 1 },
          { text: `"You did a fine job. This firm believes in you."`, group: 0 },
          { text: `"You knew this was temporary anyway."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Granger reminded one employee of a tough assignment in which city? (one word)`,
        answers: [`Newark`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Telling a volunteer they won't lead the event this year. Which line takes their face away?`,
        lines: [
          `Your energy last year got so many people involved.`,
          `Honestly, the committee thought you made a mess of it.`,
          `We'd love you to run the welcome team, where that energy matters most.`,
        ],
        bug: 1,
        fix: `This year we're trying a different structure.`,
        explanation: `It strips their dignity. The rest of the message offers them a new role they can be proud of.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they protected someone's pride.`,
        pairs: [
          [`General Electric`, `A new title for Steinmetz`],
          [`Marshall Granger`, `Praised seasonal staff before letting them go`],
          [`Frank Gammond`, `Let a wrong quotation stand at a dinner`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 8): what did Mayor Langford remove from his office?`,
        options: [
          { text: `His door` },
          { text: `His desk`, why: `It was his door.` },
          { text: `His secretary`, why: `He removed the door, symbolically.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Granger's parting words.`,
        tiles: [`This`, `firm`, `believes`, `in`, `you.`],
        distractors: [`fires`],
      },
      {
        kind: `mcq`,
        prompt: `You have to tell a long-serving colleague their project is being given to someone else. What does Rule 26 suggest?`,
        options: [
          { text: `Tell them in the team meeting so it's transparent`, why: `Public loss of face, guaranteed.` },
          { text: `Tell them privately, recognise specifically what they built, and offer a role where their strengths count` },
          { text: `Let them find out from the new owner`, why: `The worst way to lose face.` },
        ],
        answer: 1,
        explanation: `Privacy, honest recognition, and a dignified next step: Steinmetz and Granger in one.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: deliver one piece of bad news this week, a no, a change, a rejection, in a way that protects the other person's dignity. What did you say?`,
    starters: [`The news was...`, `I protected their pride by...`, `They...`],
  },
  deepen: {
    title: `Come back with affection`,
    summary: `Granger's seasonal staff came back with affection when he needed them. The way you end something decides whether people return. Think of the last time someone left your team or life. How did it end?`,
  },
  notes: `Source: Carnegie, Part Four ch. 5 "Let the Other Person Save Face": General Electric and Charles Steinmetz (Consulting Engineer), "how few of us ever stop to think of it", Marshall A. Granger's letter about seasonal staff (Newark, "this firm believes in you"). Retold in our own words.`,
};

export default lesson;
