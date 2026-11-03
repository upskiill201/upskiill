import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3 (Pressure) — Rule 10 when a disagreement is real: keep it from becoming an argument. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Disagree Without a War`,
  summary: `Some disagreements matter and can't just be let go. Lincoln had advice for a young officer about that, involving a dog, and the book gives a set of steps for when you really do disagree.`,
  minutes: 12,
  outcomes: [
    `Keep a real disagreement from turning into an argument`,
    `Distrust your first defensive reaction`,
    `Use time and questions to reach a better answer`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `Keeping a disagreement from becoming an argument`,
      steps: [
        { title: `Welcome the disagreement`, body: `If two partners always agree, one of them isn't needed. A point you hadn't considered may save you from a serious mistake.` },
        { title: `Distrust your first reaction`, body: `Our first instinct is to defend. It may be you at your worst, not your best.` },
        { title: `Control your temper`, body: `You can measure a person by what makes them angry.` },
        { title: `Listen first`, body: `Let them finish. Don't resist, defend or debate. Build bridges, not higher walls.` },
        { title: `Look for agreement`, body: `When they've finished, start with the points you agree on.` },
        { title: `Be honest`, body: `Find where you can admit you were wrong, and say so. It disarms people.` },
        { title: `Promise to think it over, and mean it`, body: `They may be right. Better to agree now to consider it than to hear "we tried to tell you" later.` },
        { title: `Thank them`, body: `Anyone who takes the time to disagree cares about the same things you do.` },
        { title: `Postpone if needed`, body: `Suggest meeting again later or tomorrow, when all the facts are in.` },
      ],
    },
    {
      kind: `reading`,
      title: `Lincoln and the dog`,
      html:
        `<p>Lincoln once scolded a young army officer for getting into a bitter row with a colleague. Nobody who means to make the most of himself, Lincoln said, can spare time for personal quarrels, let alone the bad temper and loss of self-control that come with them.</p>` +
        `<p>Give way on big things where your claim is no better than theirs, he said, and give way on small things even when they're clearly yours. Better to let a dog have the path than be bitten fighting it for the right of way. Even killing the dog wouldn't cure the bite.</p>` +
        `<p>Before you meet again, ask yourself some hard questions. Could they be right? Partly right? Will my reaction solve the problem, or just relieve my frustration? Will it push them away or bring them closer? What will it cost me if I win?</p>` +
        `<p>An opera singer married nearly fifty years said he and his wife had one rule they never broke: when one shouts, the other listens. When two people shout, there's no communication, just noise.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Your first reaction to disagreement is to defend. Pause. It may be you at your worst. Listen, find agreement, and buy time.`,
    },
  ],
  apply: {
    scenario: `Rule 10, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why welcome a disagreement?`,
        options: [
          { text: `It's a chance to show you're smarter`, why: `That's how arguments start.` },
          { text: `It may point out something you missed before you make a serious mistake` },
          { text: `People respect those who argue back`, why: `Not the reason given.` },
        ],
        answer: 1,
      },
      {
        kind: `orderLines`,
        prompt: `Handling a real disagreement, in order.`,
        lines: [`Distrust your first reaction`, `Listen until they finish`, `Start with where you agree`, `Admit where you were wrong`, `Promise to think it over`],
      },
      {
        kind: `fillBlank`,
        prompt: `Lincoln's advice.`,
        template: `Better give your path to a [[1]] than be [[2]] by him fighting for the right.`,
        blanks: [[`dog`], [`bitten`]],
        distractors: [`horse`, `blamed`],
      },
      {
        kind: `typeAnswer`,
        prompt: `"If two partners always agree, one of them is not ________." (one word)`,
        answers: [`necessary`, `needed`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Building bridges or building walls?`,
        groups: [`Bridges`, `Walls`],
        items: [
          { text: `"Let me make sure I understand your concern."`, group: 0 },
          { text: `"We've already decided, so..."`, group: 1 },
          { text: `"You've got a point there, I hadn't thought of that."`, group: 0 },
          { text: `Cutting in before they finish`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Replying to a colleague who disagrees with your plan. Which line builds a wall?`,
        lines: [
          `Thanks for pushing back, that's useful.`,
          `I agree the timeline is tight.`,
          `But honestly you don't have the full picture, so leave it to me.`,
        ],
        bug: 2,
        fix: `Can we look at the numbers together tomorrow?`,
        explanation: `It dismisses them and ends the conversation. Postpone and look together instead.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match the hard question to what it checks.`,
        pairs: [
          [`Could they be right?`, `Your certainty`],
          [`Will this relieve the problem or my frustration?`, `Your motive`],
          [`What will it cost me if I win?`, `The price of victory`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did the phone troubleshooter do for nearly three hours?`,
        options: [
          { text: `Listened` },
          { text: `Explained the bill`, why: `He never got to it on the first visit.` },
          { text: `Argued about the charges`, why: `Arguing was what everyone before him had done.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What was the opera singer's marriage rule?`,
        options: [
          { text: `Never go to bed angry`, why: `A good rule, but not his.` },
          { text: `When one shouts, the other listens` },
          { text: `Always let her win`, why: `It was about listening.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `In a meeting, your manager rejects your proposal in front of the team, and you're sure they've misunderstood it. What's the best next move?`,
        options: [
          { text: `Argue it out right there so everyone sees you're right`, why: `Even if you win, your manager loses face in public.` },
          { text: `Say "Good points, let me think them over," then ask for a time tomorrow to go through it together` },
          { text: `Drop it and complain to colleagues afterwards`, why: `That breaks Rule 1 and solves nothing.` },
        ],
        answer: 1,
        explanation: `Thank them, promise to consider it, and postpone. Tomorrow, with the facts, the disagreement can be a conversation.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: in your next disagreement, say "Let me think about that" instead of defending yourself. Then actually think about it. Were they partly right?`,
    starters: [`We disagreed about...`, `When I thought it over...`],
  },
  deepen: {
    title: `Measure yourself`,
    summary: `You can measure the size of a person by what makes them angry. This week, notice what makes you angry. Is it worth it?`,
  },
  notes: `Source: Carnegie, Part Three ch. 1: the Bits and Pieces suggestions (welcome the disagreement, distrust first instinct, control temper, listen first, look for agreement, be honest, promise to think it over, thank opponents, postpone; the hard questions), Lincoln's reprimand of a young officer (the dog and the path), Jan Peerce's marriage pact. Retold in our own words.`,
};

export default lesson;
