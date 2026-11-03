import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 6 (Pressure) — Rule 23 with sensitive people: hints that land. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Hints That Land`,
  summary: `A famous preacher had died, and a nervous clergyman was asked to fill his pulpit. He wrote and polished his sermon for days, then read it to his wife. It was dreadful. What she said saved his reputation.`,
  minutes: 12,
  outcomes: [
    `Give an indirect hint that someone can act on`,
    `Correct a sensitive person without bruising them`,
    `Lead people to correct themselves`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The sermon`,
      beats: [
        { speaker: `narrator`, text: `In 1887 the famous preacher Henry Ward Beecher died. The following Sunday, Lyman Abbott was invited to speak from his pulpit. Eager to do his best, he wrote, rewrote and polished a sermon with enormous care. Then he read it to his wife.` },
        { speaker: `narrator`, text: `It was poor, as most written speeches are. She could have said: "Lyman, that's terrible. You'll put everyone to sleep. It reads like an encyclopedia. Why don't you talk like a human being?"` },
        { speaker: `narrator`, text: `She could have said that. And you know what would have happened. She knew too.` },
      ],
      choice: {
        prompt: `What did she say instead?`,
        options: [
          { text: `"It's wonderful, darling."`, outcome: `That would have sent him into the pulpit to fail.` },
          { text: `That it would make an excellent article for a leading magazine`, outcome: `That's it. She praised it and, at the same time, quietly suggested it wouldn't work as a speech. He saw the point, tore up the manuscript and preached without notes.`, best: true },
          { text: `Nothing at all`, outcome: `She found a way to say it without saying it.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Three more hints that landed`,
      html:
        `<p><strong>The builders.</strong> Marge Jacob's builders did excellent work but left the yard strewn with offcuts of timber every evening. She didn't want to upset them. So one evening she and her children quietly piled all the scraps neatly in a corner. Next morning she told the foreman how pleased she was the lawn had been left so clean and tidy for the neighbours. From then on, the builders piled up the scraps every day, and the foreman came looking for her approval.</p>` +
        `<p><strong>The haircuts.</strong> Army reservists hated regulation haircuts. A veteran sergeant could have shouted. Instead he told them: you're leaders, and leaders set the example. I'm getting my hair cut today, though it's shorter than some of yours. Look in the mirror, and if you think you need a haircut to be a good example, we'll make time for you. Several went to the barber that afternoon.</p>` +
        `<p>Each time, the person got to correct themselves, and keep their pride.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `A good hint lets the other person see the mistake and fix it themselves. Make sure it's clear enough to act on, and kind enough to accept.`,
    },
  ],
  apply: {
    scenario: `Rule 23, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Lyman Abbott's wife say about his sermon?`,
        options: [
          { text: `That it would make an excellent magazine article` },
          { text: `That it was terrible`, why: `That's what she could have said, and didn't.` },
          { text: `That it was perfect`, why: `She was kind, but honest.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What did Abbott do after her comment?`,
        options: [
          { text: `Tore up the manuscript and preached without notes` },
          { text: `Read it anyway`, why: `He took the hint.` },
          { text: `Sent it to the magazine`, why: `He understood it wouldn't work as a speech.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `What Marge Jacob told the foreman.`,
        template: `I'm really pleased with how [[1]] and tidy the lawn was left last [[2]].`,
        blanks: [[`clean`], [`night`, `evening`]],
        distractors: [`messy`, `week`],
      },
      {
        kind: `sortGroups`,
        prompt: `Hint that lands, or hint that's too vague?`,
        groups: [`Lands`, `Too vague`],
        items: [
          { text: `"This would make a great written report. For the talk, shall we pick the three best points?"`, group: 0 },
          { text: `"Hmm. Interesting."`, group: 1 },
          { text: `"Leaders set the example. I'm getting my hair cut today."`, group: 0 },
          { text: `Sighing loudly near the mess`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `The sergeant told the reservists to look in the ________ and decide for themselves. (one word)`,
        answers: [`mirror`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Hinting to a colleague that their emails are too long. Which line is too blunt to be a hint?`,
        lines: [
          `Your update had loads of useful detail.`,
          `Nobody reads your essays, by the way.`,
          `Would a three-line summary at the top help busy people find it?`,
        ],
        bug: 1,
        fix: `I sometimes struggle to find the key point when I'm skimming.`,
        explanation: `That's direct criticism, and cruel. The last line is the hint that lands.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each hint to who gave it.`,
        pairs: [
          [`"A fine magazine article"`, `Lyman Abbott's wife`],
          [`Scraps piled up overnight`, `Marge Jacob`],
          [`"I'm getting my hair cut today"`, `The sergeant`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 7): what's the rule of thumb for dramatising?`,
        options: [
          { text: `Dramatise the idea, never the person` },
          { text: `The louder the better`, why: `Quiet often works best.` },
          { text: `Always use props`, why: `It's about making the point visible kindly.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the sergeant's hint.`,
        tiles: [`Leaders`, `lead`, `by`, `example.`],
        distractors: [`shouting.`],
      },
      {
        kind: `mcq`,
        prompt: `A sensitive friend asks your opinion on the wedding speech they'll give tomorrow. It's far too long. What's the Abbott's-wife approach?`,
        options: [
          { text: `"It's way too long, cut half."`, why: `Direct, the night before, to a nervous friend.` },
          { text: `"The stories are lovely. You could write a whole book of them! For tomorrow, which two are your favourites?"` },
          { text: `"It's perfect."`, why: `Kind tonight, painful tomorrow.` },
        ],
        answer: 1,
        explanation: `Praise, plus a hint they can act on, so they choose to cut it themselves.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: give one indirect hint this week instead of a direct correction. Make it clear enough to act on. Did the person fix it themselves?`,
    starters: [`I wanted them to change...`, `My hint was...`, `They...`],
  },
  deepen: {
    title: `Clear and kind`,
    summary: `A hint that's too vague is just a sigh. A hint that's too blunt is criticism. Before giving one, ask: will they know exactly what to do, and will they still feel good about themselves?`,
  },
  notes: `Source: Carnegie, Part Four ch. 2: Lyman Abbott's sermon after Henry Ward Beecher's death (1887) and his wife's "North American Review" remark, Marge Jacob and the builders' lumber, Master Sergeant Harley Kaiser and the reservists' haircuts. Retold in our own words.`,
};

export default lesson;
