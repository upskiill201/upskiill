import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4 (Story) — Rule 14: get the other person saying "yes, yes" immediately. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `The Secret of Socrates`,
  summary: `The wisest persuader in history never once told anyone they were wrong. He asked questions they had to say yes to, one after another, until they found themselves agreeing with what they'd denied minutes before.`,
  minutes: 11,
  outcomes: [
    `Explain why "no" is so hard to undo`,
    `Start with the things you agree on`,
    `Use questions that earn a yes`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `Once someone says "No", it's easy to change their mind with good reasons.`,
          isFact: false,
          explain: `A "No" is very hard to overcome. Having said it, our pride demands we stay consistent with it, even if we later feel it was wrong.`,
        },
        {
          text: `Saying "No" affects the whole body, not just the words.`,
          isFact: true,
          explain: `The psychologist Harry Overstreet said a real "No" sets the whole body on guard: a slight physical withdrawal, a readiness to reject.`,
        },
        {
          text: `The best way to persuade is to start with where you disagree, to get it out of the way.`,
          isFact: false,
          explain: `The opposite. Start with what you agree on, and keep emphasising it.`,
        },
      ],
    },
    {
      kind: `reading`,
      title: `The billiard ball`,
      html:
        `<p>When you talk with people, don't begin with the things you differ on. Begin, and keep coming back to, the things you agree on. If you can, show that you both want the same thing and differ only on how to get there.</p>` +
        `<p>Get the other person saying "yes, yes" at the start. Keep them, if you possibly can, from saying "no".</p>` +
        `<p>A skilful speaker gets several "yes" answers early. It sets the listener moving in a positive direction, like a billiard ball. Send it one way, and it takes force to deflect it, and far more force to send it back.</p>` +
        `<p>It's such a simple technique, and so neglected! People often seem to get a sense of importance from antagonising others at the start. Get a customer, a child or a partner to say "no" at the beginning, and it takes the wisdom and patience of angels to turn it into a "yes".</p>`,
    },
    {
      kind: `story`,
      title: `The gadfly of Athens`,
      beats: [
        { speaker: `narrator`, text: `Socrates changed the whole course of human thought, and twenty-four centuries later he's honoured as one of the wisest persuaders who ever lived.` },
        { speaker: `narrator`, text: `His method? Did he tell people they were wrong? Not Socrates. He was far too clever for that.` },
      ],
      choice: {
        prompt: `So what did he do?`,
        options: [
          { text: `He out-argued everyone with brilliant speeches`, outcome: `No speeches. Just questions.` },
          { text: `He asked questions they had to agree with, winning one "yes" after another, until they embraced a conclusion they'd have denied minutes before`, outcome: `That's it, the Socratic method. An armful of yeses, and no one was ever told they were wrong.`, best: true },
          { text: `He wrote books to convince them`, outcome: `Socrates wrote nothing at all. He asked.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 14: Get the other person saying "yes, yes" immediately. Start with what you agree on. The Chinese proverb says: he who treads softly goes far.`,
    },
  ],
  apply: {
    scenario: `Rule 14: Get the yeses.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why is a "No" so hard to overcome?`,
        options: [
          { text: `People forget why they said it`, why: `They remember, and that's the problem.` },
          { text: `Pride demands they stay consistent with it` },
          { text: `It's rude to change your mind`, why: `It's about pride, not manners.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Where to start.`,
        template: `Don't begin with the things on which you [[1]]. Begin with the things on which you [[2]].`,
        blanks: [[`differ`, `disagree`], [`agree`]],
        distractors: [`argue`, `win`],
      },
      {
        kind: `sortGroups`,
        prompt: `Will this get a yes or a no?`,
        groups: [`Likely yes`, `Likely no`],
        items: [
          { text: `"We both want this launch to go smoothly, right?"`, group: 0 },
          { text: `"You don't want to miss the deadline again, do you?"`, group: 1 },
          { text: `"Would you like the team to get home on time on Fridays?"`, group: 0 },
          { text: `"Your plan won't work, will it?"`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Overstreet compared the "yes" response to a ________ ball. (one word)`,
        answers: [`billiard`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `How did Socrates persuade people?`,
        options: [
          { text: `Questions that earned one "yes" after another` },
          { text: `Proving them wrong in public`, why: `He never told anyone they were wrong.` },
          { text: `Long lectures`, why: `He asked; he didn't lecture.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Opening a talk with your team about a new process. Which line invites a "no"?`,
        lines: [
          `We all want fewer late nights, don't we?`,
          `And we all agree the handovers have been messy?`,
          `So you won't mind me changing how everything works?`,
        ],
        bug: 2,
        fix: `So could we try one small change for a fortnight?`,
        explanation: `A big, vague change invites a defensive "no". A small, specific step keeps the yeses coming.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each idea to its source.`,
        pairs: [
          [`The billiard ball`, `Harry Overstreet`],
          [`An armful of yeses`, `Socrates`],
          [`He who treads softly goes far`, `A Chinese proverb`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did Lincoln call the high road to a person's reason?`,
        options: [
          { text: `Their heart, won by a drop of honey` },
          { text: `Clear facts`, why: `Logic can't win a heart full of bad feeling.` },
          { text: `Strong authority`, why: `People can be led, not driven.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build an opening that starts on agreement.`,
        tiles: [`We`, `both`, `want`, `the`, `same`, `thing`, `here.`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `You want your partner to agree to a cheaper holiday this year. They love travel. How should you start?`,
        options: [
          { text: `"We can't afford a big trip this year."`, why: `A "no" in the first sentence.` },
          { text: `"We both love travelling, right? And we both want to do a really big trip next year?"` },
          { text: `"Don't get upset, but..."`, why: `That primes them for a "no".` },
        ],
        answer: 1,
        explanation: `Start on shared ground: same goal, different method. Then the cheaper trip becomes the route to what you both want.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: in your next disagreement, open with something you both agree on, and get a "yes" before you mention the difference. What did you agree on?`,
    starters: [`We disagreed about...`, `I started with...`, `They said yes to...`],
  },
  deepen: {
    title: `Same end, different method`,
    summary: `Next time you disagree with someone, try saying: "We want the same thing. We just see different ways to get there." Watch how the temperature drops.`,
  },
  notes: `Source: Carnegie, Part Three ch. 5 "The Secret of Socrates": begin with agreement, Overstreet's Influencing Human Behavior (pride and consistency, the billiard ball, physical withdrawal), the neglected technique, Socrates' method, "He who treads softly goes far". Retold in our own words.`,
};

export default lesson;
