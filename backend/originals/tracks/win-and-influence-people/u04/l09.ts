import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9 (Pressure) — Rule 12 when it costs your pride: the gracious retreat. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `The Gracious Retreat`,
  summary: `For years a father refused to make the first move towards the son who'd cut him off. Tradition said the young must come to the old. Then he heard one rule in a class in Hong Kong.`,
  minutes: 12,
  outcomes: [
    `Admit a mistake when it costs your pride or breaks with habit`,
    `Answer an angry critic with grace instead of a counter-attack`,
    `See that yielding often gets you more than fighting`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `Admitting you're wrong makes people respect you less.`,
          isFact: false,
          explain: `Bruce Harvey's boss respected him more. The art director gave Warren more work. Admitting it raises you above the crowd.`,
        },
        {
          text: `If you're the older or more senior person, it's always up to the other side to apologise first.`,
          isFact: false,
          explain: `A father in Hong Kong believed this for years, and lost years with his son because of it.`,
        },
        {
          text: `By yielding, you often get more than you expected.`,
          isFact: true,
          explain: `It's an old proverb Carnegie quotes: by fighting you never get enough, but by yielding you get more than you expected.`,
        },
      ],
    },
    {
      kind: `story`,
      title: `The father in Hong Kong`,
      beats: [
        { speaker: `narrator`, text: `A teacher of Carnegie's course in Hong Kong had a middle-aged student who'd been estranged from his son for years. The father had once been addicted to opium, now cured. He longed to see his son, and the grandchildren he'd never met.` },
        { speaker: `narrator`, text: `But in his culture, an older person doesn't take the first step. He felt it was his son's place to come to him, and his classmates understood.` },
        { speaker: `narrator`, text: `Near the end of the course, he stood up and said he'd thought hard about the rule: if you're wrong, admit it quickly and emphatically. It was too late to admit it quickly, he said. But he could still admit it emphatically.` },
      ],
      choice: {
        prompt: `What did he do?`,
        options: [
          { text: `Sent his son a letter and waited`, outcome: `He did more than that.` },
          { text: `Went to his son's house, admitted he'd wronged him, and asked for forgiveness`, outcome: `That's it. He told the class he might lose face asking a younger man's forgiveness, but the fault was his. His son forgave him, and he finally met his grandchildren.`, best: true },
          { text: `Decided tradition mattered more`, outcome: `He weighed it, and chose his son.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `A handshake over the miles`,
      html:
        `<p>Elbert Hubbard wrote fiery articles that often made readers furious. When an angry reader wrote in to say he disagreed and called Hubbard every name under the sun, Hubbard would reply something like this:</p>` +
        `<p><em>Come to think of it, I don't entirely agree with it myself. Not everything I wrote yesterday appeals to me today. I'm glad to know what you think. Next time you're nearby, come and see us and we'll thrash it out. Here's a handshake across the miles.</em></p>` +
        `<p>What could you say to a man who treated you like that?</p>` +
        `<p>When we're right, let's win people gently. When we're wrong, which will be surprisingly often if we're honest, let's admit it quickly and with enthusiasm.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `It's never too late to admit it emphatically. Pride and habit are poor reasons to keep a mistake alive.`,
    },
  ],
  apply: {
    scenario: `Rule 12, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why had the Hong Kong father waited so long?`,
        options: [
          { text: `He didn't care`, why: `He longed to see his son and grandchildren.` },
          { text: `Tradition said the younger person should come to the older` },
          { text: `His son had moved away`, why: `It was about who should take the first step.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What the father told his class.`,
        template: `It's too late to admit it [[1]], but I can admit it [[2]].`,
        blanks: [[`quickly`], [`emphatically`]],
        distractors: [`quietly`, `later`],
      },
      {
        kind: `mcq`,
        prompt: `How did Elbert Hubbard answer angry readers?`,
        options: [
          { text: `He ignored them`, why: `He replied, warmly.` },
          { text: `He said he didn't entirely agree with himself either, and invited them to visit` },
          { text: `He defended every word`, why: `The opposite.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Answering an angry critic: grace or counter-attack?`,
        groups: [`Grace`, `Counter-attack`],
        items: [
          { text: `"You might have a point. I'll think about it."`, group: 0 },
          { text: `"Clearly you didn't read it properly."`, group: 1 },
          { text: `"Thanks for taking the time to write."`, group: 0 },
          { text: `"Who asked you?"`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `By fighting you never get enough, but by ________ you get more than you expected. (one word)`,
        answers: [`yielding`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Replying to a harsh comment on something you posted. Which line is the counter-attack?`,
        lines: [
          `Fair challenge, I don't agree with all of it myself any more.`,
          `Though you clearly don't know much about the subject.`,
          `Happy to talk it through properly if you'd like.`,
        ],
        bug: 1,
        fix: `I'd love to hear where you'd disagree most.`,
        explanation: `One jab undoes the grace. Hubbard's replies had none.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story from this chapter.`,
        pairs: [
          [`Rex the bulldog`, `Admit it before they say it`],
          [`Pickett's charge`, `"I alone have lost this battle"`],
          [`The Hong Kong father`, `Never too late to admit it`],
          [`Elbert Hubbard`, `A handshake over the miles`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): which Chapter 1 rule did Hubbard's critics break by calling him names?`,
        options: [
          { text: `Don't criticise, condemn or complain` },
          { text: `Remember names`, why: `They used names, unkind ones.` },
          { text: `Smile`, why: `It's Rule 1 they broke.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Hubbard's opening.`,
        tiles: [`Come`, `to`, `think`, `of`, `it,`, `I`, `don't`, `entirely`, `agree`, `myself.`],
        distractors: [`you`],
      },
      {
        kind: `mcq`,
        prompt: `You fell out with a close friend a year ago over something you now see was mostly your fault. Neither of you has reached out. What does this lesson say?`,
        options: [
          { text: `Wait; they owe you a message too`, why: `That's what the Hong Kong father believed, for years.` },
          { text: `Reach out first and admit your part emphatically` },
          { text: `Let it go; too much time has passed`, why: `It's never too late to admit it emphatically.` },
        ],
        answer: 1,
        explanation: `You may lose a little pride. You may get a friend back.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: think of someone you've been waiting to apologise to you, where you were at least partly wrong. Write the message admitting your part. Send it if you're ready.`,
    starters: [`I've been waiting for... to...`, `My part was...`, `My message: ...`],
  },
  deepen: {
    title: `Surprisingly often`,
    summary: `Carnegie said if we're honest, we'll find we're wrong surprisingly often. Keep a tally this week of times you were wrong about something, big or small. The number is humbling, and freeing.`,
  },
  notes: `Source: Carnegie, Part Three ch. 3: Michael Cheung's class in Hong Kong and the estranged father, Elbert Hubbard's replies to angry readers (paraphrased), "by fighting you never get enough, but by yielding you get more than you expected". Retold in our own words.`,
};

export default lesson;
