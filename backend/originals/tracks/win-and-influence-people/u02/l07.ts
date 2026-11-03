import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 (Story) — Rule 6: a person's name is the sweetest sound to them. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `Fifty Thousand First Names`,
  summary: `He left school at ten to work in a brickyard. He became the man who put a President in the White House. Carnegie guessed his secret was knowing ten thousand people by name. He was wrong about the number.`,
  minutes: 11,
  outcomes: [
    `Explain why a person's name matters so much to them`,
    `Use people's names naturally and correctly`,
    `See the cost of forgetting or misspelling a name`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Jim Farley`,
      beats: [
        { speaker: `narrator`, text: `In 1898, in a little New York village, a man named Jim Farley was killed by his own horse. He left a widow, three boys and a few hundred dollars. His eldest son, also Jim, was ten. He went to work in a brickyard.` },
        { speaker: `narrator`, text: `Young Jim never got much schooling. But he had a gift for making people like him, so he went into politics. Before he was forty-six, four colleges had given him honorary degrees, and he'd become head of his party and Postmaster General of the United States.` },
        { speaker: `narrator`, text: `Carnegie asked him his secret. "Hard work," said Farley. "Don't be funny," said Carnegie. "I understand you can call ten thousand people by their first names."` },
      ],
      choice: {
        prompt: `What did Farley reply?`,
        options: [
          { text: `"That's an exaggeration. Maybe a thousand."`, outcome: `Quite the opposite.` },
          { text: `"No, you're wrong. I can call fifty thousand people by their first names."`, outcome: `That's it. Fifty thousand. And that gift helped him run the campaign that put Franklin D. Roosevelt in the White House.`, best: true },
          { text: `"I just read their name badges."`, outcome: `No badges. He built a system, and you'll learn it.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `How Farley did it`,
      html:
        `<p>When he met someone new, Farley found out their full name and a few facts about their family, work and opinions. He fixed it all in his mind. A year later he could shake their hand, ask after the family, and ask about the flowers in their garden. No wonder people followed him.</p>` +
        `<p>Before Roosevelt's campaign he wrote hundreds of letters a day, then crossed twenty states in nineteen days, meeting people over meals. Back home, he asked one person in each town for a list of everyone he'd talked to. Every person on those lists, thousands of them, got a personal letter beginning "Dear Bill" or "Dear Jane", signed "Jim".</p>` +
        `<p>Farley had discovered early that the average person is more interested in their own name than in all the other names on earth put together. Remember it and use it easily, and you've paid them a quiet, powerful compliment. Forget it or misspell it, and you've put yourself at a real disadvantage.</p>` +
        `<p>When Carnegie sent letters to Americans living in Paris, the typists misspelled some names. The manager of a big American bank sent him a furious reply about his.</p>`,
    },
    {
      kind: `compare`,
      title: `"Nick" or his real name?`,
      before: {
        label: `What everyone did`,
        text: `A customer called Nicodemus Papadoulos had a name people found hard to say. So for fifteen years, everyone just called him "Nick".`,
      },
      after: {
        label: `What Sid Levy did`,
        text: `Before visiting, Levy practised the full name several times. He greeted him: "Good afternoon, Mr. Nicodemus Papadoulos." The man was silent for a long moment, then, with tears on his cheeks, said that in fifteen years in the country nobody had ever made the effort to call him by his right name.`,
      },
      notes: [
        `A hard name is a reason to try harder, not to give up.`,
        `Getting someone's name right says: you matter enough for me to make the effort.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 6: Remember that a person's name is, to that person, the sweetest and most important sound in any language.`,
    },
  ],
  apply: {
    scenario: `Rule 6: Names.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How many people could Jim Farley call by their first names?`,
        options: [
          { text: `Ten thousand`, why: `That was Carnegie's guess, and Farley corrected him.` },
          { text: `Fifty thousand` },
          { text: `About five hundred`, why: `Much, much more.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `A person's name is, to them, the ________ sound in any language. (one word)`,
        answers: [`sweetest`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `How did Farley sign his campaign letters?`,
        options: [
          { text: `With his full official title`, why: `He kept it personal.` },
          { text: `Simply "Jim"` },
          { text: `With a printed signature`, why: `Every letter was personal.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Honours the name, or slights it?`,
        groups: [`Honours it`, `Slights it`],
        items: [
          { text: `Asking how to pronounce an unfamiliar name`, group: 0 },
          { text: `Giving someone a nickname because their name is "too long"`, group: 1 },
          { text: `Double-checking the spelling before sending an email`, group: 0 },
          { text: `"Sorry, I'm terrible with names" and not trying`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What Farley discovered.`,
        template: `The average person is more interested in their own [[1]] than in all the other names on earth put [[2]].`,
        blanks: [[`name`], [`together`]],
        distractors: [`job`, `away`],
      },
      {
        kind: `findBug`,
        prompt: `An email to a new client called Siobhan. Which line will hurt?`,
        lines: [
          `Hi Siobhan, lovely to meet you yesterday.`,
          `Hope you don't mind if I just call you Shiv, it's easier to spell.`,
          `I've attached the plan we talked about.`,
        ],
        bug: 1,
        fix: `Thanks again for showing me around the studio.`,
        explanation: `Shortening someone's name for your convenience tells them their name, and they, aren't worth the effort.`,
      },
      {
        kind: `mcq`,
        prompt: `What did Nicodemus Papadoulos say when Sid Levy used his full name?`,
        options: [
          { text: `"Just call me Nick."`, why: `He was moved, not dismissive.` },
          { text: `That nobody in fifteen years had made the effort to call him by his right name` },
          { text: `Nothing; he didn't notice`, why: `He noticed so much he was in tears.` },
        ],
        answer: 1,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match the rule to its number.`,
        pairs: [
          [`Rule 4`, `Become genuinely interested`],
          [`Rule 5`, `Smile`],
          [`Rule 6`, `Remember their name`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Greet a new colleague the Farley way.`,
        tiles: [`Morning,`, `Amara!`, `How`, `was`, `your`, `sister's`, `wedding?`],
        distractors: [`mate!`],
      },
      {
        kind: `mcq`,
        prompt: `You've met a colleague three times and forgotten their name. You're about to see them again. What's the best move?`,
        options: [
          { text: `Avoid using any name and hope it doesn't come up`, why: `That's how it stays forgotten forever.` },
          { text: `Admit it honestly, ask again, then use it and write it down` },
          { text: `Call them "boss" or "mate" to cover it`, why: `A friendly cover-up still tells them you don't know who they are.` },
        ],
        answer: 1,
        explanation: `A moment's embarrassment now beats a year of avoiding their name. Then make sure you never forget it again.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: use three people's names today: a colleague, a shop assistant, someone new. Write down their names and how they reacted.`,
    starters: [`I used the names...`, `The reaction that surprised me was...`],
  },
  deepen: {
    title: `The hardest name you know`,
    summary: `Think of someone whose name you've been avoiding because it's hard to say. Look it up, practise it, and use it properly the next time you see them. Watch their face.`,
  },
  notes: `Source: Carnegie, Part Two ch. 3 "If You Don't Do This, You Are Headed for Trouble": Jim Farley (father's death 1898, brickyard, four degrees, Postmaster General, "fifty thousand", his system, nineteen days/twenty states, "Dear Bill" letters signed "Jim"), the Paris misspelled-name complaint, Sid Levy and Nicodemus Papadoulos. Retold in our own words.`,
};

export default lesson;
