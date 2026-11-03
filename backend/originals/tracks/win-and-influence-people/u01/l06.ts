import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 (Pressure) — Rule 2 when it's hard: praising people who annoy you, or who you take for granted. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Six Roses`,
  summary: `His wife asked him for six things she could change about herself. It would have been easy to make the list. What he sent her instead had her in tears at the front door.`,
  minutes: 12,
  outcomes: [
    `Find something honest to praise in someone who annoys you`,
    `Use public praise to lift someone who is struggling`,
    `Stop taking the people closest to you for granted`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The list`,
      beats: [
        { speaker: `narrator`, text: `A man in one of Carnegie's classes told this story. His wife had joined a self-improvement group, and she asked him to help: would he list six things she could do to become a better wife?` },
        { speaker: `narrator`, text: `He admitted it would have been easy to list six things he'd like to change about her. Heavens, she could have listed a thousand things to change about him. But he told her he'd think about it and answer in the morning.` },
        { speaker: `narrator`, text: `The next morning he got up early and phoned a florist.` },
      ],
      choice: {
        prompt: `What did he send her?`,
        options: [
          { text: `Flowers, with a gentle list of six small things`, outcome: `That's what many of us would do. It isn't what he did.` },
          { text: `Six red roses and a note: he couldn't think of six things to change, he loved her as she was`, outcome: `That's it. When he got home that evening, she met him at the door, almost in tears.`, best: true },
          { text: `Nothing, and he hoped she'd forget`, outcome: `He didn't dodge it. He answered it, in the best way possible.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `The janitor`,
      before: {
        label: `Ridicule`,
        text: `A supervisor named Pamela had a janitor doing poor work. The other staff mocked him and even dropped litter in the halls to show how bad he was. Nothing she tried made him better.`,
      },
      after: {
        label: `Praise in public`,
        text: `She noticed that now and then he did a particularly good piece of work. She praised him for it, in front of everyone. Each day he got a little better, until he did the whole job well, and the others started praising him too.`,
      },
      notes: [
        `Ridicule got results where? Nowhere.`,
        `Honest praise for the rare good moment changed everything.`,
        `Hurting people doesn't change them, and it's never called for.`,
      ],
    },
    {
      kind: `reading`,
      title: `When it's hard to find anything`,
      html:
        `<p>"But you don't know my colleague," you're saying. "There's nothing to praise." I don't believe it.</p>` +
        `<p>Emerson said every man he met was his superior in some way, and in that way he learned from him. If that was true for Emerson, it's a thousand times more true for you and me.</p>` +
        `<p>So stop thinking about what they get wrong. Start looking for what they do well: the one good email, the calm voice on a hard call, the joke that eased a tense meeting. Then say so, honestly.</p>` +
        `<p>And don't save it for strangers. We praise the waiter and forget the person who has cooked for us for twenty years. When a study looked at why wives ran away from home, the main reason was <strong>lack of appreciation</strong>. A study of husbands, I'd bet, would find the same.</p>` +
        `<p>There's an old saying worth taping to your mirror: any kindness I can show, let me show it now. I shall not pass this way again.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Can't find anything to praise? Ask yourself: "What is this person better at than I am?" There's always an answer.`,
    },
  ],
  apply: {
    scenario: `Rule 2, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `His wife asked for six things to improve. What did he send?`,
        options: [
          { text: `A thoughtful list of six things`, why: `He chose not to criticise at all.` },
          { text: `Six roses and a note saying he loved her as she was` },
          { text: `A book on self-improvement`, why: `That would have been a criticism in disguise.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What changed the janitor's work?`,
        options: [
          { text: `His colleagues showing him how bad it was`, why: `The ridicule changed nothing.` },
          { text: `A warning that he might lose his job`, why: `Pamela tried many things. Praise was what worked.` },
          { text: `Being praised in public for the good work he did do` },
        ],
        answer: 2,
      },
      {
        kind: `typeAnswer`,
        prompt: `Emerson: every person I meet is my ________ in some way. (one word)`,
        answers: [`superior`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `You find a colleague irritating. Which moves follow Rule 2?`,
        groups: [`Follows Rule 2`, `Breaks it`],
        items: [
          { text: `Thank them for the one task they nailed this week`, group: 0 },
          { text: `Praise them while rolling your eyes`, group: 1 },
          { text: `Mention their good idea to your manager`, group: 0 },
          { text: `Say "great job" to everyone so it doesn't look personal`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What the study found.`,
        template: `The main reason wives ran away from home was a lack of [[1]].`,
        blanks: [[`appreciation`]],
        distractors: [`money`, `time`],
      },
      {
        kind: `findBug`,
        prompt: `A message to your flatmate. Which line breaks Rule 2?`,
        lines: [
          `Thanks for sorting the bins this week.`,
          `I know you were busy with exams too.`,
          `Shame it took you three months to notice they existed.`,
        ],
        bug: 2,
        fix: `It made the whole flat feel better.`,
        explanation: `A sting at the end cancels the thanks. Now they'll only remember the sting.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 4): what did Dewey call the deepest urge in human nature?`,
        options: [
          { text: `The desire to be important` },
          { text: `The desire to be loved`, why: `Close, but Dewey's phrase was "important".` },
          { text: `The desire to be free`, why: `Not his phrase.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question that always finds something to praise.`,
        tiles: [`What`, `is`, `this`, `person`, `better`, `at`, `than`, `I`, `am?`],
        distractors: [`worse`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match the person to how they used appreciation.`,
        pairs: [
          [`The husband`, `Six roses instead of six faults`],
          [`Pamela`, `Praised the janitor in front of everyone`],
          [`Rockefeller`, `Praised the sixty per cent that was saved`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Your mother calls every Sunday and you usually rush her off the phone. What would Rule 2 have you do this week?`,
        options: [
          { text: `Keep it short; she knows you're busy`, why: `That's the "eating hay for twenty years" problem.` },
          { text: `Tell her one specific thing she did that you're grateful for` },
          { text: `Send her a gift instead of talking`, why: `Gifts are lovely, but the words are what she's starving for.` },
        ],
        answer: 1,
        explanation: `The people closest to us are the ones we most often forget to appreciate.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: praise the person you find hardest to praise. Find one honest, specific thing. Say it today. Then write down what you said and what happened.`,
    starters: [`The hardest person to praise is...`, `What they're genuinely good at is...`, `When I told them...`],
  },
  deepen: {
    title: `Sparks of gratitude`,
    summary: `Carnegie suggests leaving a trail of little sparks of thanks wherever you go: the tired shop assistant, the chef, the colleague who helped. Try three small sparks tomorrow and notice how many come back as friendship.`,
  },
  notes: `Source: Carnegie, Part One ch. 2: the six roses story, Pamela Dunham and the janitor, study on runaway wives ("lack of appreciation"), Emerson "every man I meet is my superior", "I shall pass this way but once", sparks of gratitude. Retold in our own words.`,
};

export default lesson;
