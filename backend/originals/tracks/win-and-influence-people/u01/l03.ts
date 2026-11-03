import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 (Pressure) — Rule 1 when you're right and furious: Lincoln's unsent letter. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `The Letter Lincoln Never Sent`,
  summary: `July 1863. Lincoln's general lets the enemy army escape and the war drags on. Lincoln sits down and writes him the sharpest letter of his life. Then he does something you and I almost never do.`,
  minutes: 12,
  outcomes: [
    `Hold back criticism even when you are right and angry`,
    `Use the unsent-letter method to let off steam safely`,
    `Answer a costly mistake with confidence instead of a lecture`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Washington, July 1863`,
      beats: [
        { speaker: `narrator`, text: `As a young lawyer in Illinois, Abraham Lincoln loved a sharp pen. He wrote letters mocking people and dropped them on country roads where they'd be found.` },
        { speaker: `narrator`, text: `In 1842 he mocked a proud politician named James Shields in the local paper. The whole town laughed. Shields found out who wrote it and challenged Lincoln to a duel. Lincoln chose cavalry swords, and the two men met on a sandbar in the Mississippi, ready to fight to the death. At the last minute, friends stopped it.` },
        { speaker: `narrator`, text: `Lincoln never forgot it. Twenty years later, he is President, in the middle of a civil war. After the battle of Gettysburg, the enemy army is trapped against a flooded river. Lincoln orders General Meade to attack at once and end the war.` },
        { speaker: `narrator`, text: `Meade hesitates. He calls a council of war, which Lincoln told him not to do. He sends excuses. The river goes down and the enemy escapes. Lincoln is beside himself.` },
        { speaker: `narrator`, text: `He sits down and writes Meade a letter. He tells him the chance was right there in his grasp, the war could have ended, and now it will drag on and on. He says he is distressed beyond measure.` },
      ],
      choice: {
        prompt: `What do you suppose Meade did when he read that letter?`,
        options: [
          { text: `He resigned on the spot`, outcome: `He didn't, because of what Lincoln did next.` },
          { text: `He never read it`, outcome: `Exactly. Lincoln never sent it. It was found among his papers after his death.`, best: true },
          { text: `He wrote back defending himself`, outcome: `He would have, almost certainly. But he never got the chance.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Why Lincoln put it in the drawer`,
      html:
        `<p>Nobody knows exactly what went through Lincoln's mind. But you can guess. Perhaps he looked out of the window and thought: it's easy for me to sit in the quiet of the White House and order an attack. If I'd seen the blood Meade has seen this week, maybe I'd have hesitated too.</p>` +
        `<p>And if I send this, it will make me feel better. But Meade will defend himself, he'll condemn me, and it might ruin him as a commander.</p>` +
        `<p>Lincoln had learned the hard way, on a sandbar in the Mississippi, that sharp words almost always end in nothing good. From then on he almost never criticised anybody.</p>` +
        `<p>Mark Twain did the same thing, by accident. When he lost his temper, he wrote letters so fierce they nearly scorched the paper. They let him blow off steam, and they never did any harm, because his wife quietly took them out of the post.</p>`,
    },
    {
      kind: `compare`,
      title: `The mechanic and the pilot`,
      before: {
        label: `What anyone expected`,
        text: `A famous test pilot, Bob Hoover, lands a badly damaged plane after both engines cut out. It was filled with the wrong fuel. Three lives could have been lost. The young mechanic who fuelled it is in tears. Everyone waits for the explosion.`,
      },
      after: {
        label: `What Hoover did`,
        text: `Hoover put his arm around the young man's shoulder and said that, to show he was sure it would never happen again, he wanted him to service his plane the very next day.`,
      },
      notes: [
        `The mechanic already knew he'd made a terrible mistake. A lecture would have added nothing.`,
        `Trust did what criticism couldn't: it made him the most careful mechanic on the airfield.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `When you're right and furious, write the letter. Then don't send it. Ask: if I'd been in their shoes, would I have done any better?`,
    },
  ],
  apply: {
    scenario: `Rule 1, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What nearly happened to Lincoln after he mocked James Shields?`,
        options: [
          { text: `He lost his law licence`, why: `It was more dangerous than that.` },
          { text: `He nearly fought a duel to the death` },
          { text: `He lost an election`, why: `Not this time. Shields wanted a fight.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What happened to Lincoln's letter to General Meade?`,
        options: [
          { text: `Meade framed it`, why: `He never saw it.` },
          { text: `Lincoln sent a softer version`, why: `There's no record of that. He just put it away.` },
          { text: `Lincoln never sent it; it was found after his death` },
        ],
        answer: 2,
      },
      {
        kind: `sortGroups`,
        prompt: `Sending the angry letter: what you get and what it costs.`,
        groups: [`What you get`, `What it costs`],
        items: [
          { text: `You feel better for an hour`, group: 0 },
          { text: `They defend themselves`, group: 1 },
          { text: `They condemn you back`, group: 1 },
          { text: `The relief of saying it`, group: 0 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Mark Twain's furious letters did no harm because...`,
        template: `his [[1]] quietly took them out of the [[2]].`,
        blanks: [[`wife`], [`post`, `mail`]],
        distractors: [`editor`, `fire`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Bob Hoover asked the mechanic who made the mistake to service his plane the very next ________. (one word)`,
        answers: [`day`],
        placeholder: `One word`,
      },
      {
        kind: `orderLines`,
        prompt: `The unsent-letter method, in order.`,
        lines: [`Write everything you want to say`, `Put it away until tomorrow`, `Ask what you'd have done in their shoes`, `Delete it, then speak calmly if you still need to`],
      },
      {
        kind: `findBug`,
        prompt: `You're replying to a colleague who broke the build before a launch. Which line should never be sent?`,
        lines: [
          `I saw the build failed this morning.`,
          `Honestly, I can't believe you'd be this careless before a launch.`,
          `What happened? Let's get it fixed together.`,
        ],
        bug: 1,
        fix: `I know launches make everything feel rushed.`,
        explanation: `That's the sentence Lincoln would have kept in the drawer. It relieves you and wounds them.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what they did with their anger.`,
        pairs: [
          [`Lincoln`, `Wrote the letter, never sent it`],
          [`Mark Twain`, `His wife held back his letters`],
          [`Bob Hoover`, `Trusted the mechanic again the next day`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Build Lincoln's question for yourself.`,
        tiles: [`Would`, `I`, `have`, `done`, `better`, `in`, `their`, `shoes?`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `A new team member's mistake just cost you a whole weekend of work. You're exhausted and you're right. What would Lincoln do?`,
        options: [
          { text: `Tell them now so they never forget it`, why: `They won't forget. They'll also never trust you again.` },
          { text: `Write it all down, sleep on it, then talk calmly about the fix` },
          { text: `Say nothing and do their work yourself next time`, why: `Silent resentment is complaining with the volume turned down.` },
        ],
        answer: 1,
        explanation: `Feelings first go on paper, not on the person. The next day you can talk about what happens next.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: think of someone you're angry with right now. Write them the letter, every word. Don't send it. Tomorrow, read it and write one line about what you'll actually say.`,
    starters: [`I'm angry with... because...`, `Reading it a day later, I...`],
  },
  deepen: {
    title: `"What would Lincoln do?"`,
    summary: `Theodore Roosevelt kept a portrait of Lincoln above his desk. When a problem got hard, he'd look up and ask how Lincoln would handle it. Pick your own reminder, a photo, a note on your phone, and use it the next time you're about to snap.`,
  },
  notes: `Source: Carnegie, Part One ch. 1: Lincoln's ridicule letters, the Shields duel (1842, broadswords, Mississippi sandbar), Gettysburg/Meade and the unsent letter, Carnegie's guess at Lincoln's reasoning (presented as a guess), Roosevelt's Lincoln portrait, Mark Twain's letters removed by his wife, Bob Hoover and the mechanic (jet fuel, "service my F-51 tomorrow"). Retold in our own words.`,
};

export default lesson;
