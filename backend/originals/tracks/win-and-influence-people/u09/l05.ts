import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 5 (Practice + Checkpoint) — Rule 26 in public; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `Two Bosses, Two Endings`,
  summary: `Two employees made mistakes in front of their colleagues. One boss called his supervisor a liar in front of everyone. The other told his young manager, in front of everyone, that he had faith in her. Guess who stayed.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Handle a mistake made in public without humiliating anyone`,
    `Back people up in front of others`,
    `Combine Rules 25 and 26`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `Two meetings`,
      before: {
        label: `The vice-president`,
        text: `At a production meeting, a vice-president fired pointed questions at a supervisor about a process, in a tone meant to expose his failings. Embarrassed in front of his peers, the supervisor answered evasively. The VP lost his temper, berated him and accused him of lying. The supervisor, a good worker, was useless to the company from then on, and soon left for a competitor, where he did very well.`,
      },
      after: {
        label: `Anna's boss`,
        text: `Anna Mazzone's first big project, a test market for a new product, had to be redone because of a serious error in her planning. She had to report it at a meeting before she could warn her boss, and she was shaking. She admitted the error briefly and said she'd repeat it. Her boss thanked her for her work, said mistakes on a first project were normal, and told her, in front of everyone, that he had faith in her and that inexperience, not lack of ability, was the reason.`,
      },
      notes: [
        `Anna left with her head held high, determined never to let him down.`,
        `The supervisor left the company.`,
      ],
    },
    {
      kind: `reading`,
      title: `What matters is what he thinks of himself`,
      html:
        `<p>Even if we're right and the other person is clearly wrong, we only destroy their self-respect by making them lose face.</p>` +
        `<p>The French aviator and writer Antoine de Saint-Exupéry wrote that he had no right to say or do anything that diminishes a person in their own eyes. What matters is not what I think of him, but what he thinks of himself. Hurting a person in their dignity, he said, is a crime.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `If someone stumbles in public, back them in public. Save the hard conversation for private.`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 25 and 26.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the vice-president accuse the supervisor of?`,
        options: [
          { text: `Lying` },
          { text: `Being late`, why: `It was worse: lying, in front of his peers.` },
          { text: `Stealing`, why: `He accused him of lying.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What did Anna's boss say about her mistake, in front of everyone?`,
        options: [
          { text: `That it was normal on a first project and he had faith in her` },
          { text: `That she'd let the team down`, why: `The opposite.` },
          { text: `Nothing; he moved on`, why: `He actively backed her.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Saint-Exupéry's words.`,
        template: `What matters is not what I think of him, but what he thinks of [[1]]. Hurting a man in his [[2]] is a crime.`,
        blanks: [[`himself`], [`dignity`]],
        distractors: [`me`, `wallet`],
      },
      {
        kind: `sortGroups`,
        prompt: `In public: saves face or destroys it?`,
        groups: [`Saves face`, `Destroys it`],
        items: [
          { text: `"First projects often have hiccups. I trust you."`, group: 0 },
          { text: `"Are you lying to me?"`, group: 1 },
          { text: `"Let's go through the details after the meeting."`, group: 0 },
          { text: `Reading out someone's error to the room`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Anna's boss said her mistake came from lack of ________, not lack of ability. (one word)`,
        answers: [`experience`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `A team member's demo crashes in front of a client. Which line should you never say in the room?`,
        lines: [
          `These things happen with live demos, let's take two minutes.`,
          `I told you to test it properly.`,
          `I've seen this work brilliantly, so let's try once more.`,
        ],
        bug: 1,
        fix: `Shall we walk through the screenshots meanwhile?`,
        explanation: `It humiliates them in front of the client. Back them now; review it privately later.`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did Owen D. Young say instead of giving orders?`,
        options: [
          { text: `"You might consider this."` },
          { text: `"Do this now."`, why: `He never gave a direct order.` },
          { text: `"That's wrong."`, why: `He asked and suggested.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to its rule.`,
        pairs: [
          [`The blocked driveway`, `Ask, don't order`],
          [`Macdonald's impossible order`, `Ask the team when it's urgent`],
          [`Steinmetz's new title`, `Let them save face`],
          [`Anna's boss`, `Back people in public`],
        ],
      },
      {
        kind: `orderLines`,
        prompt: `When someone makes a mistake in a meeting, in order.`,
        lines: [`Stay calm`, `Back them in front of others`, `Move the meeting on`, `Talk it through privately later`],
      },
      {
        kind: `tapBuild`,
        prompt: `Build what Anna's boss said.`,
        tiles: [`I`, `have`, `faith`, `in`, `you.`],
        distractors: [`doubts`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. In a team meeting, a colleague gives figures you know are wrong, and the decision depends on them. Which approach uses Rules 25 and 26?`,
        options: [
          { text: `"Those numbers are wrong."`, why: `True, and they lose face in front of everyone.` },
          { text: `"Could we double-check those against the latest sheet before we decide? I may have an older version."` },
          { text: `Say nothing and let the wrong decision stand`, why: `When it matters, raise it, gently.` },
        ],
        answer: 1,
        explanation: `A question, plus room for you to be the one who's out of date, so nobody loses face.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: today, correct nobody in front of others. If something needs saying, back the person in public and talk privately. What did you do instead?`,
    starters: [`Someone made a mistake when...`, `In public I...`, `Privately I...`],
  },
  deepen: {
    title: `Head held high`,
    summary: `Anna said she left that meeting with her head up, determined never to let her boss down. Think of a boss, teacher or parent who once backed you in public. How did it shape your loyalty?`,
  },
  notes: `Source: Carnegie, Part Four ch. 5: Fred Clark of Harrisburg (the vice-president who accused a supervisor of lying; the supervisor later left for a competitor), Anna Mazzone's test-marketing error and her boss's public support, Antoine de Saint-Exupéry quote. Retold in our own words.`,
};

export default lesson;
