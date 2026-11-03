import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 1 (Story) — Rule 22: begin with praise and honest appreciation. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `The Barber Lathers First`,
  summary: `A party leader read a campaign speech aloud to a future president, glowing with pride. It would have been a disaster. The president had to say no, without killing the man's enthusiasm.`,
  minutes: 11,
  outcomes: [
    `Explain why praise first makes criticism easier to hear`,
    `Open a correction with honest appreciation`,
    `Say no without crushing someone's enthusiasm`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The speech`,
      beats: [
        { speaker: `narrator`, text: `In 1896, William McKinley was running for President. A prominent supporter wrote a campaign speech he thought was better than anything ever spoken, and read it aloud to McKinley with great glee.` },
        { speaker: `narrator`, text: `It had some fine points. But it simply wouldn't do. It would have stirred up a storm of criticism. McKinley didn't want to hurt the man or kill his splendid enthusiasm. And yet he had to say no.` },
      ],
      choice: {
        prompt: `How did McKinley say no?`,
        options: [
          { text: `"I'm afraid this won't work. Please start again."`, outcome: `True, and it would have deflated him completely.` },
          { text: `"My friend, that's a splendid speech. Nobody could have written a better one. There are many occasions it would be exactly right. But is it quite right for this one? Go home and write one along the lines I suggest, and send me a copy."`, outcome: `That's it. The man did just that. McKinley helped him rewrite it, and he became one of the most effective speakers of the campaign.`, best: true },
          { text: `He said nothing and quietly never used it`, outcome: `He'd have lost a keen supporter and gained nothing.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `"Now, don't get stuck up"`,
      html:
        `<p>A friend of Carnegie's, staying at the White House, overheard President Calvin Coolidge tell his secretary: "That's a pretty dress you're wearing this morning, and you're a very attractive young woman."</p>` +
        `<p>It was probably the warmest praise Silent Cal had ever given a secretary. She blushed in confusion. Then he said: "Now, don't get stuck up. I just said that to make you feel good. From now on, I wish you'd be a little more careful with your punctuation."</p>` +
        `<p>His method was a bit obvious. But the psychology was superb. <strong>It's always easier to hear unpleasant things after we've heard some praise of our good points.</strong></p>` +
        `<p>A barber lathers a man before he shaves him. That's exactly what McKinley did.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 22: Begin with praise and honest appreciation. Like a barber lathering before the shave.`,
    },
  ],
  apply: {
    scenario: `Rule 22: Begin with praise.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why couldn't McKinley use the supporter's speech?`,
        options: [
          { text: `It would have stirred up a storm of criticism` },
          { text: `It was too short`, why: `It was the content, not the length.` },
          { text: `It was plagiarised`, why: `It simply wasn't right for the occasion.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What happened to the supporter after McKinley's reply?`,
        options: [
          { text: `He quit the campaign`, why: `His enthusiasm survived.` },
          { text: `He rewrote it and became one of the campaign's best speakers` },
          { text: `He gave the original speech anyway`, why: `He followed McKinley's lines.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The psychology.`,
        template: `It's easier to hear [[1]] things after we've heard some [[2]] of our good points.`,
        blanks: [[`unpleasant`], [`praise`]],
        distractors: [`happy`, `criticism`],
      },
      {
        kind: `typeAnswer`,
        prompt: `What did Coolidge ask his secretary to be more careful with? Her ________. (one word)`,
        answers: [`punctuation`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Lather first, or straight to the shave?`,
        groups: [`Praise first`, `Straight to criticism`],
        items: [
          { text: `"The research here is excellent. Could the summary be shorter?"`, group: 0 },
          { text: `"The summary is far too long."`, group: 1 },
          { text: `"You handled that customer brilliantly. One thing to try next time..."`, group: 0 },
          { text: `"You got the price wrong again."`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Feedback on a colleague's pitch deck. Which line skips the lather?`,
        lines: [
          `The opening story is gripping.`,
          `The data slides make the case really clearly.`,
          `Slide 12 is a mess, honestly, redo it.`,
        ],
        bug: 2,
        fix: `Slide 12 might land better split into two.`,
        explanation: `After real praise, the correction should stay as gentle as the praise was honest.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they softened a correction.`,
        pairs: [
          [`McKinley`, `"A splendid speech, but is it right for this occasion?"`],
          [`Coolidge`, `Complimented the dress, then the punctuation`],
          [`The barber`, `Lathers before he shaves`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's Rule 2?`,
        options: [
          { text: `Give honest, sincere appreciation` },
          { text: `Smile`, why: `That's Rule 5.` },
          { text: `Avoid arguments`, why: `That's Rule 10.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build McKinley's gentle question.`,
        tiles: [`Is`, `it`, `quite`, `right`, `for`, `this`, `occasion?`],
        distractors: [`terrible`],
      },
      {
        kind: `mcq`,
        prompt: `A keen new volunteer has designed a poster for your event. It's colourful but the date is hard to find. What would McKinley say?`,
        options: [
          { text: `"The date's impossible to see."`, why: `Straight to the shave. Their enthusiasm drops.` },
          { text: `"The colours are brilliant, it really grabs attention. Could we make the date as bold as the rest?"` },
          { text: `Quietly fix it yourself`, why: `They'll notice, and feel their work wasn't good enough.` },
        ],
        answer: 1,
        explanation: `Honest praise for what's good, then the change, framed as making it even better.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: next time you need to correct someone, start with something you honestly admire about their work. What did you praise, and how did they take the correction?`,
    starters: [`I needed to correct...`, `I started by praising...`, `They...`],
  },
  deepen: {
    title: `Keep the enthusiasm`,
    summary: `McKinley's goal wasn't just to fix the speech. It was to keep the man's enthusiasm. Next time you correct someone, ask yourself: will they be keener or flatter after this conversation?`,
  },
  notes: `Source: Carnegie, Part Four ch. 1 "If You Must Find Fault, This Is the Way to Begin": Calvin Coolidge and his secretary (pretty dress, punctuation), the barber analogy, McKinley's 1896 campaign speech (quoted in paraphrase). Retold in our own words.`,
};

export default lesson;
