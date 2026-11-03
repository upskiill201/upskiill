import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1 (Story) — Rule 10: the only way to get the best of an argument is to avoid it. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `You Can't Win an Argument`,
  summary: `At a banquet in London, the man next to Carnegie got a famous quotation wrong. Carnegie knew it. He was certain. So he corrected him, and his oldest friend kicked him under the table.`,
  minutes: 11,
  outcomes: [
    `Explain why you lose an argument even when you win it`,
    `Let a harmless mistake go to protect someone's pride`,
    `Choose goodwill over being proved right`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The banquet`,
      beats: [
        { speaker: `narrator`, text: `After the First World War, Carnegie was at a banquet in London. The man next to him told a funny story built around a famous line: "There's a divinity that shapes our ends, rough-hew them how we will." He said it came from the Bible.` },
        { speaker: `narrator`, text: `He was wrong. Carnegie knew it, positively. So, to feel important and show off a little, he appointed himself a committee of one to correct him.` },
        { speaker: `narrator`, text: `The man stuck to his guns. Shakespeare? Impossible! It was from the Bible. So they agreed to ask Carnegie's old friend Frank Gammond, sitting on his other side, who had spent years studying Shakespeare.` },
        { speaker: `narrator`, text: `Gammond listened, kicked Carnegie under the table, and gave his verdict.` },
      ],
      choice: {
        prompt: `What did Frank Gammond say?`,
        options: [
          { text: `"It's Shakespeare. Hamlet, Act Five."`, outcome: `That was the truth, and he knew it perfectly well. But it's not what he said.` },
          { text: `"Dale, you're wrong. The gentleman is right. It's from the Bible."`, outcome: `That's it. On the way home Carnegie protested: "Frank, you knew it was Shakespeare!" "Of course," said Gammond. "But we were guests at a happy occasion. Why prove to a man he's wrong? Is that going to make him like you? Always avoid the acute angle."`, best: true },
          { text: `"Let's look it up tomorrow."`, outcome: `A fair dodge, but Gammond did something kinder and wiser.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `If you lose it, you lose it. If you win it, you lose it.`,
      html:
        `<p>Carnegie needed that lesson badly. He'd argued with his brother about everything under the sun, studied debating at college, even taught it, and once planned to write a book on it.</p>` +
        `<p>After watching thousands of arguments, he came to this: there's only one way under heaven to get the best of an argument, and that's to avoid it. Avoid it like rattlesnakes and earthquakes.</p>` +
        `<p>Nine times out of ten, an argument ends with both people more convinced than ever that they're right. You can't win it. If you lose, you lose. And if you win, you still lose. Why? Say you shoot their argument full of holes. You feel fine. But you've made them feel inferior. You've hurt their pride. They'll resent your triumph. And, as the old rhyme goes, a man convinced against his will is of the same opinion still.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 10: The only way to get the best of an argument is to avoid it. You can have the victory or their goodwill. You can seldom have both.`,
    },
  ],
  apply: {
    scenario: `Rule 10: Avoid the argument.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Carnegie correct the man at the banquet?`,
        options: [
          { text: `To help him get it right`, why: `He admitted the real reason was less noble.` },
          { text: `To feel important and show he knew better` },
          { text: `Because the host asked him to`, why: `Nobody asked for his opinion.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Where did the quotation really come from?`,
        options: [
          { text: `The Bible`, why: `That's what Gammond said, to keep the peace.` },
          { text: `Shakespeare's Hamlet` },
          { text: `A popular song`, why: `It's Hamlet, Act Five.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Gammond's advice.`,
        template: `Always avoid the [[1]] [[2]].`,
        blanks: [[`acute`], [`angle`]],
        distractors: [`sharp`, `topic`],
      },
      {
        kind: `typeAnswer`,
        prompt: `A man convinced against his will is of the same ________ still. (one word)`,
        answers: [`opinion`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `What happens when you win an argument?`,
        groups: [`What you get`, `What you lose`],
        items: [
          { text: `The pleasure of being right`, group: 0 },
          { text: `Their goodwill`, group: 1 },
          { text: `A story to tell later`, group: 0 },
          { text: `Any chance they'll change their mind`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `A friend says a film came out in 2009. You know it was 2010. Which reply is the acute angle?`,
        lines: [
          `Ha, was it that long ago?`,
          `No, it was 2010, I'm absolutely certain, look it up.`,
          `Either way, the ending was brilliant.`,
        ],
        bug: 1,
        fix: `Feels like yesterday, doesn't it?`,
        explanation: `One year, no harm done. Correcting it wins a point and loses a little warmth.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their part in the story.`,
        pairs: [
          [`The storyteller`, `Got the quote wrong`],
          [`Carnegie`, `Corrected him to feel important`],
          [`Frank Gammond`, `Kicked him under the table`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what's the law of human conduct?`,
        options: [
          { text: `Always make the other person feel important` },
          { text: `Always tell the truth`, why: `Important, but not the law Carnegie named.` },
          { text: `Always be first`, why: `No.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Gammond's question.`,
        tiles: [`Why`, `prove`, `to`, `a`, `man`, `he's`, `wrong?`],
        distractors: [`right?`],
      },
      {
        kind: `mcq`,
        prompt: `At a family dinner, your uncle states a fact you know is wrong. It's harmless, and he's enjoying himself. What does Rule 10 say?`,
        options: [
          { text: `Correct him; facts matter`, why: `They do. But this one costs his pride and gains nothing.` },
          { text: `Let it go and enjoy the evening` },
          { text: `Show him the right answer on your phone`, why: `Even quieter, it's still proving him wrong in front of everyone.` },
        ],
        answer: 1,
        explanation: `He didn't ask for your opinion. Avoid the acute angle.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: let one wrong but harmless claim go today without correcting it. Who said it, what was it, and how hard was it to stay quiet?`,
    starters: [`Someone said...`, `I wanted to correct them because...`, `Staying quiet felt...`],
  },
  deepen: {
    title: `Victory or goodwill`,
    summary: `Benjamin Franklin said if you argue and contradict, you may win sometimes, but it's an empty victory: you never get the other person's goodwill. Before your next disagreement, decide which one you want.`,
  },
  notes: `Source: Carnegie, Part Three ch. 1 "You Can't Win an Argument": Sir Ross Smith banquet, the Hamlet quotation (Act V sc. 2) attributed to the Bible, Frank Gammond ("always avoid the acute angle"), Carnegie's debating past, "avoid it as you would rattlesnakes and earthquakes", "if you lose it you lose it; if you win it you lose it", "a man convinced against his will", Franklin on empty victories. Retold in our own words.`,
};

export default lesson;
