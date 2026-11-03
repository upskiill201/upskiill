import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 7 (Story) — Rule 24: talk about your own mistakes before criticising the other person. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `"I Was Worse at Your Age"`,
  summary: `Carnegie's nineteen-year-old niece came to work as his secretary with almost no experience, and made mistakes. One day he started to criticise her, and stopped himself with a question about his own past.`,
  minutes: 11,
  outcomes: [
    `Admit your own mistakes before pointing out someone else's`,
    `Remember what you were like at their stage`,
    `Make criticism easier to hear through humility`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Josephine`,
      html:
        `<p>Carnegie's niece Josephine came to New York at nineteen to be his secretary. Her business experience was a little more than zero. She went on to become one of the best secretaries anywhere, but at first she was, shall we say, open to improvement.</p>` +
        `<p>One day, as he started to criticise her, he said to himself: Just a minute, Dale Carnegie. You're twice her age and you've had ten thousand times her experience. How can you expect her to have your judgement and initiative, ordinary as they are? And what were you doing at nineteen? Remember the ridiculous blunders you made?</p>` +
        `<p>Thinking it over honestly, he concluded Josephine was doing better at nineteen than he had, which, he admitted, wasn't much of a compliment to her.</p>` +
        `<p>So from then on, when he needed to point out a mistake, he'd begin: "You've made a mistake, Josephine, but heaven knows it's no worse than many I've made. Judgement only comes with experience, and you're better than I was at your age. I've done so many silly things myself, I've very little desire to criticise anyone. But don't you think it would have been wiser to do it this way?"</p>`,
    },
    {
      kind: `story`,
      title: `The cigarettes`,
      beats: [
        { speaker: `narrator`, text: `Clarence Zerhusen discovered his fifteen-year-old son David was experimenting with cigarettes. He didn't want David to smoke. But he and David's mother both smoked: they'd been setting a bad example all along.` },
      ],
      choice: {
        prompt: `How did Clarence talk to his son?`,
        options: [
          { text: `He lectured him about the dangers`, outcome: `He didn't exhort, threaten or warn at all.` },
          { text: `He told David how he'd started at about his age, how nicotine had got hold of him, and reminded him how David used to beg him to stop because of his cough`, outcome: `That's it. David decided not to smoke, and never did. And the conversation led Clarence, with his family's support, to quit too.`, best: true },
          { text: `He banned cigarettes in the house`, outcome: `A rule from a smoking parent would have meant little.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 24: Talk about your own mistakes before criticising the other person. It's far easier to hear about your faults from someone who admits they're far from perfect.`,
    },
  ],
  apply: {
    scenario: `Rule 24: Your mistakes first.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What stopped Carnegie criticising Josephine?`,
        options: [
          { text: `Remembering his own blunders at nineteen` },
          { text: `Her mother asking him to be kind`, why: `He stopped himself.` },
          { text: `She'd improved overnight`, why: `He changed, not her.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `How Carnegie began.`,
        template: `You've made a mistake, but it's no [[1]] than many I've [[2]].`,
        blanks: [[`worse`], [`made`]],
        distractors: [`better`, `seen`],
      },
      {
        kind: `typeAnswer`,
        prompt: `How old was Josephine when she started as Carnegie's secretary? (a number)`,
        answers: [`19`, `nineteen`],
        placeholder: `A number`,
      },
      {
        kind: `sortGroups`,
        prompt: `Own mistakes first, or straight to theirs?`,
        groups: [`Own mistakes first`, `Straight to theirs`],
        items: [
          { text: `"I mixed up these figures loads in my first year. Here's the trick I use."`, group: 0 },
          { text: `"You've mixed up the figures."`, group: 1 },
          { text: `"I used to rush client emails too, and it cost me."`, group: 0 },
          { text: `"Slow down, you're too sloppy."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `Why did Clarence's talk work with his son?`,
        options: [
          { text: `He admitted his own addiction instead of lecturing` },
          { text: `He threatened punishment`, why: `He made no threats.` },
          { text: `He showed health statistics`, why: `He shared his own story.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Coaching a new hire who's nervous in meetings. Which line breaks Rule 24?`,
        lines: [
          `I froze in my first big meeting here, honestly.`,
          `But you really should be past that by now.`,
          `What helped me was writing one point down before I went in.`,
        ],
        bug: 1,
        fix: `It took me months to feel comfortable.`,
        explanation: `It undoes the humility. Keep the focus on how you struggled and what helped.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to the mistake they admitted.`,
        pairs: [
          [`Dale Carnegie`, `His blunders at nineteen`],
          [`Clarence Zerhusen`, `Starting smoking at fifteen`],
          [`Robert E. Lee`, `Losing the battle of Gettysburg`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what's Rule 12?`,
        options: [
          { text: `If you're wrong, admit it quickly and emphatically` },
          { text: `Never admit fault`, why: `The opposite.` },
          { text: `Let the other person save face`, why: `That's a later rule.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Carnegie's humble opener.`,
        tiles: [`I've`, `made`, `the`, `same`, `mistake`, `many`, `times.`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `Your younger sister overspent on her first credit card. You did the same at her age. What's the Rule 24 approach?`,
        options: [
          { text: `"You need to be more responsible."`, why: `True, but she'll hear judgement and shut down.` },
          { text: `"I did exactly this at your age, and it took me a year to pay off. Want to see how I sorted it?"` },
          { text: `Pay it off for her and say nothing`, why: `She learns nothing, and you may resent it.` },
        ],
        answer: 1,
        explanation: `Your own mistake first makes the conversation an offer of help, not a judgement.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before correcting someone this week, tell them about a similar mistake you've made. Who, what did you share, and how did they take the correction?`,
    starters: [`I needed to correct...`, `I shared that I once...`, `They...`],
  },
  deepen: {
    title: `What were you doing at their age?`,
    summary: `Next time someone younger or newer frustrates you, ask Carnegie's question: what was I doing at their stage? It's humbling, and it changes your tone instantly.`,
  },
  notes: `Source: Carnegie, Part Four ch. 3 "Talk About Your Own Mistakes First": Josephine Carnegie (nineteen, secretary, his self-talk and opening, paraphrased), Clarence Zerhusen and his son David's cigarettes (both quit). Retold in our own words.`,
};

export default lesson;
