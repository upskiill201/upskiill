import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4 (Story) — Rule 11: show respect for others' opinions; never say "You're wrong". */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `Never Say "You're Wrong"`,
  summary: `One of the most famous presidents in history said he'd be delighted if he were right three times out of four. If that was his best, why do you and I keep telling people they're wrong?`,
  minutes: 11,
  outcomes: [
    `Explain why "you're wrong" never changes a mind`,
    `Use "I may be wrong, let's look at the facts"`,
    `Show respect for opinions you disagree with`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Seventy-five per cent`,
      html:
        `<p>When Theodore Roosevelt was in the White House, he said that if he could be right seventy-five per cent of the time, he'd reach his highest hopes.</p>` +
        `<p>If that's the best one of the most remarkable men of the century could hope for, what about you and me? If you could be sure of being right even fifty-five per cent of the time, you could make a fortune on the stock market. If you can't, why tell other people they're wrong?</p>` +
        `<p>You can tell someone they're wrong with a look, a tone or a gesture as clearly as with words. And when you do, do you make them want to agree with you? Never! You've struck at their intelligence, their judgement and their pride. They'll want to strike back, not change their mind.</p>` +
        `<p>And never begin with "I'm going to prove to you that..." That's the same as saying "I'm cleverer than you." It's a challenge. It makes them want to fight before you've started. If you must prove something, do it so quietly that nobody feels you're doing it.</p>`,
    },
    {
      kind: `story`,
      title: `The car dealer`,
      beats: [
        { speaker: `narrator`, text: `Harold Reinke ran a car dealership in Montana. Under pressure, he'd become hard and short with customers who complained. Tempers flared, sales were lost, everyone was miserable.` },
        { speaker: `narrator`, text: `So he tried something new. When a customer came in angry, he'd say: "Our dealership has made so many mistakes that I'm often ashamed. We may have got it wrong with you. Tell me about it."` },
      ],
      choice: {
        prompt: `What did that do?`,
        options: [
          { text: `Customers took advantage and demanded more`, outcome: `Quite the opposite.` },
          { text: `It disarmed them; by the time they'd let off steam they were far more reasonable, and some even sent friends to buy cars`, outcome: `That's it. Several thanked him for being so understanding, and two brought in friends to buy new cars.`, best: true },
          { text: `Nothing changed`, outcome: `It changed the whole tone of every complaint.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>There's magic, real magic, in a few words: <strong>"I may be wrong. I often am. Let's look at the facts."</strong></p>` +
        `<p>Nobody on earth will ever object to you saying that. Socrates told his followers that the only thing he knew was that he knew nothing. Galileo said you can't teach anyone anything; you can only help them find it in themselves. A poet put it: teach people as if you weren't teaching them.</p>` +
        `<p>Admitting you might be wrong stops the argument and invites the other person to be just as open-minded. It makes them want to admit they might be wrong too.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 11: Show respect for the other person's opinions. Never say "You're wrong." Say: "I may be wrong. Let's look at the facts."`,
    },
  ],
  apply: {
    scenario: `Rule 11: Respect their opinions.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How often did Roosevelt hope to be right?`,
        options: [
          { text: `All the time`, why: `He was more realistic.` },
          { text: `Seventy-five per cent of the time` },
          { text: `Half the time`, why: `He hoped for three out of four.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The magic phrase.`,
        template: `I may be [[1]]. I often am. Let's look at the [[2]].`,
        blanks: [[`wrong`], [`facts`]],
        distractors: [`right`, `rules`],
      },
      {
        kind: `mcq`,
        prompt: `Why is "I'm going to prove to you that..." a bad opening?`,
        options: [
          { text: `It's too formal`, why: `Formality isn't the issue.` },
          { text: `It's a challenge that says "I'm cleverer than you"` },
          { text: `It takes too long`, why: `It's the attitude, not the length.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Respects their opinion, or tells them they're wrong?`,
        groups: [`Respects it`, `Tells them they're wrong`],
        items: [
          { text: `"I see it differently, but I might be missing something."`, group: 0 },
          { text: `"That's not how it works."`, group: 1 },
          { text: `A loud sigh and an eye roll`, group: 1 },
          { text: `"Interesting. What makes you think so?"`, group: 0 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Socrates said the one thing he knew was that he knew ________. (one word)`,
        answers: [`nothing`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Replying to a colleague's suggestion you think won't work. Which line breaks Rule 11?`,
        lines: [
          `Thanks, that's a creative idea.`,
          `Honestly, that's just wrong, it'll never scale.`,
          `I may be wrong, but could we test it on a small group first?`,
        ],
        bug: 1,
        fix: `I'm not sure about scaling. What do you think?`,
        explanation: `"That's just wrong" strikes at their judgement. They'll defend the idea harder.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each thinker to their idea.`,
        pairs: [
          [`Socrates`, `I know only that I know nothing`],
          [`Galileo`, `Help people find it in themselves`],
          [`Roosevelt`, `Right three times in four would be wonderful`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did Frank Gammond say about the quotation?`,
        options: [
          { text: `That the storyteller was right, to spare his pride` },
          { text: `That it was Shakespeare`, why: `He knew it, but said the opposite to keep the peace.` },
          { text: `That he didn't know`, why: `He knew perfectly well.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Reinke's opening to an angry customer.`,
        tiles: [`We`, `may`, `have`, `got`, `it`, `wrong.`, `Tell`, `me.`],
        distractors: [`You're`],
      },
      {
        kind: `mcq`,
        prompt: `A friend insists a news story is true, and you're fairly sure it's been debunked. What does Rule 11 suggest?`,
        options: [
          { text: `"That's fake. Everyone knows that."`, why: `They'll defend it, and themselves, harder.` },
          { text: `"I might be wrong, but I read it was disputed. Shall we look it up together?"` },
          { text: `Send them a fact-check link with no comment`, why: `Silent "you're wrong" is still "you're wrong".` },
        ],
        answer: 1,
        explanation: `"I may be wrong, let's look at the facts" lets them change their mind without losing face.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: say "I may be wrong" in your next disagreement, and mean it. What happened to the other person's tone?`,
    starters: [`We disagreed about...`, `When I said "I may be wrong"...`],
  },
  deepen: {
    title: `The silent "you're wrong"`,
    summary: `This week, catch the times you say "you're wrong" without words: the sigh, the raised eyebrow, the "well, actually". They wound just as much.`,
  },
  notes: `Source: Carnegie, Part Three ch. 2 "A Sure Way of Making Enemies": Roosevelt's 75%, 55% on Wall Street, telling people they're wrong by a look or gesture, "I'm going to prove...", Alexander Pope, Galileo, Lord Chesterfield, Socrates, "I may be wrong. I frequently am. Let's examine the facts.", Harold Reinke's Dodge dealership. Retold in our own words.`,
};

export default lesson;
