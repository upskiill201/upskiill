import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 2 (Practice) — Rule 28 in practice: naming the virtue you want to grow. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Marie the Dishwasher`,
  summary: `A shy kitchen girl nobody noticed was told, one day, that she had treasures inside her she didn't know about. She didn't ask a question. She went back to the kitchen and began to change.`,
  minutes: 11,
  outcomes: [
    `Use "I know you're the kind of person who..."`,
    `Thank people for the behaviour you want before you ask for it`,
    `Turn a troublemaker's reputation around`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Three good names`,
      html:
        `<p><strong>Marie.</strong> The writer Georgette Leblanc had her meals brought by a servant girl from a nearby hotel, known to everyone as "Marie the Dishwasher". She was plain, poor and overlooked. One day, as Marie held out a plate, Georgette said to her: "Marie, you don't know what treasures are within you." Marie stood still, then quietly said she would never have believed it. She went back to the kitchen and repeated it, and nobody laughed at her. She began to take care of herself, and blossomed. Two months later she announced she was marrying the chef's nephew. One small phrase had changed her life.</p>` +
        `<p><strong>Bridgit.</strong> A Dublin dentist, Dr. Fitzhugh, was embarrassed when a patient pointed out that a cup holder was tarnished. Instead of complaining to his cleaner, Bridgit, he wrote her a note thanking her for the fine job she'd been doing, and saying that since two hours twice a week wasn't much time, she should feel free to work an extra half hour now and then for "once-in-a-while" jobs like polishing the cup holders, paid, of course. The next day his desk shone like a mirror, and the cup holder gleamed. How much extra time did she spend? None at all.</p>` +
        `<p><strong>Tommy.</strong> A fourth-grade teacher, Ruth Hopkins, found the school's most notorious troublemaker, Tommy, on her class list. On the first day, greeting each child, she looked him in the eye and said: "Tommy, I understand you're a natural leader. I'm going to depend on you to help make this the best class in the fourth grade." She kept reinforcing it. With that reputation to live up to, even a nine-year-old couldn't let her down, and he didn't.</p>`,
    },
    {
      kind: `compare`,
      title: `The second hearing`,
      before: {
        label: `Rejected`,
        text: `A food sales rep, Bill Parker, was crushed when a store manager, Jack, turned down his company's new product line. Bill brooded all day.`,
      },
      after: {
        label: `A reputation to live up to`,
        text: `That evening he went back: "Jack, I realised I hadn't given you the whole picture. I've always respected that you're willing to listen, and big enough to change your mind when the facts warrant it." Could Jack refuse a second hearing? Not with that reputation to live up to.`,
      },
      notes: [
        `Bill gave Jack a fine quality, open-mindedness, and Jack lived up to it.`,
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Try: "I know you're the kind of person who..." and finish it with the quality you want them to show.`,
    },
  ],
  apply: {
    scenario: `Rule 28 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Georgette Leblanc tell Marie?`,
        options: [
          { text: `That she didn't know what treasures were within her` },
          { text: `That she should work harder`, why: `She gave her a good name.` },
          { text: `That she'd be promoted`, why: `It was about her hidden worth.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `How did Dr. Fitzhugh get the cup holders polished?`,
        options: [
          { text: `He thanked Bridgit for her fine work and offered paid time for extra polishing` },
          { text: `He complained about the tarnish`, why: `He thanked her first.` },
          { text: `He polished them himself`, why: `He gave Bridgit a reputation to live up to.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `What Ruth Hopkins told Tommy.`,
        template: `I understand you're a natural [[1]]. I'm going to [[2]] on you.`,
        blanks: [[`leader`], [`depend`, `rely`]],
        distractors: [`problem`, `spy`],
      },
      {
        kind: `sortGroups`,
        prompt: `Gives a fine reputation, or a bad name?`,
        groups: [`Fine reputation`, `Bad name`],
        items: [
          { text: `"I've always respected that you're open to new ideas."`, group: 0 },
          { text: `"You never listen to anything new."`, group: 1 },
          { text: `"Thanks for always keeping this place so spotless."`, group: 0 },
          { text: `"I heard you're the class troublemaker."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `How much extra time did Bridgit spend making everything shine? (one word)`,
        answers: [`none`, `zero`, `nothing`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your first message to a new student with a "difficult" reputation. Which line keeps the bad name?`,
        lines: [
          `Welcome! I've heard you've got real energy.`,
          `Your last teacher warned me about you, so behave.`,
          `I'm counting on you to help make this class great.`,
        ],
        bug: 1,
        fix: `I think you could be a real leader here.`,
        explanation: `It hands them their old bad name. Ruth Hopkins gave Tommy a new, good one.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to the reputation they were given.`,
        pairs: [
          [`Marie`, `Treasures within`],
          [`Bridgit`, `A fine cleaner`],
          [`Tommy`, `A natural leader`],
          [`Jack`, `Big enough to change his mind`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did Carnegie admire about the post office clerk?`,
        options: [
          { text: `His head of hair` },
          { text: `His speed`, why: `It was his hair.` },
          { text: `His uniform`, why: `It was his hair.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the sentence starter.`,
        tiles: [`I`, `know`, `you're`, `the`, `kind`, `of`, `person`, `who...`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `A colleague rarely shares ideas in meetings. What's the Rule 28 approach?`,
        options: [
          { text: `"You never speak up."`, why: `A bad name, and they'll stay silent.` },
          { text: `"You always have the most thoughtful take when we chat one-to-one. I'd love the team to hear it Thursday."` },
          { text: `Put them on the spot in the meeting`, why: `That embarrasses them.` },
        ],
        answer: 1,
        explanation: `Name the quality you see, and they'll want to show it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: use "I know you're the kind of person who..." with someone today, finishing it honestly with a quality you'd like to see more of. What happened?`,
    starters: [`I said to... "I know you're the kind of person who..."`, `They...`],
  },
  deepen: {
    title: `Thank them first`,
    summary: `Dr. Fitzhugh thanked Bridgit for the standard he wanted, before asking. Is there something you want from someone this week that you could thank them for in advance, honestly?`,
  },
  notes: `Source: Carnegie, Part Four ch. 7: Georgette Leblanc's Souvenirs and "Marie the Dishwasher" (physical description softened), Bill Parker and store manager Jack (Daytona Beach), Dr. Martin Fitzhugh and Bridgit (Dublin, cup holders), Ruth Hopkins and Tommy T. ("a natural leader"). Retold in our own words.`,
};

export default lesson;
