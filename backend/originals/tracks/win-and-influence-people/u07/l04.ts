import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 4 (Story) — Rule 20: dramatise your ideas. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `One Day, 307 Pages`,
  summary: `A rumour was spreading that a big newspaper was all adverts and no news. Arguing would only spread it further. So the paper printed one ordinary day's news as a book, and the rumour died.`,
  minutes: 11,
  outcomes: [
    `Explain why stating a truth isn't enough`,
    `Make a point vivid with showmanship`,
    `Spot dramatisation in everyday advertising`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The whispering campaign`,
      beats: [
        { speaker: `narrator`, text: `Years ago, a Philadelphia newspaper was the target of a whispering campaign. Advertisers were being told readers had lost interest because the paper had too many adverts and too little news. Something had to be done, fast.` },
        { speaker: `narrator`, text: `The paper could have published denials, or figures showing how much news it carried. Instead, it took every piece of reading matter from one ordinary day's edition, sorted it, and published it as a book.` },
      ],
      choice: {
        prompt: `How long was that book?`,
        options: [
          { text: `About 30 pages`, outcome: `Far more.` },
          { text: `307 pages, the size of a hardback, from one day's paper costing a few cents`, outcome: `That's it. They called it One Day. It made the point more vividly than pages of figures ever could.`, best: true },
          { text: `About 100 pages`, outcome: `Three times that.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Showmanship`,
      html:
        `<p>This is the age of dramatisation. Merely stating a truth isn't enough. The truth has to be made vivid, interesting, dramatic. You have to use showmanship. The movies do it. Television does it. And you'll have to do it if you want attention.</p>` +
        `<p>Window-display experts know it. A maker of a new rat poison gave shops a window display with two live rats in it. Sales that week jumped to five times normal.</p>` +
        `<p>Watch any evening of television adverts and you'll see it everywhere: one detergent gets a shirt clean while the other leaves it grey; a car swerves through bends rather than just being described; happy faces show contentment. They don't tell you. They show you.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 20: Dramatise your ideas. Don't just tell people a truth. Show it to them so they can't forget it.`,
    },
  ],
  apply: {
    scenario: `Rule 20: Dramatise your ideas.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What rumour was spreading about the newspaper?`,
        options: [
          { text: `That it had too many adverts and too little news` },
          { text: `That it was closing`, why: `It was about its content.` },
          { text: `That it printed lies`, why: `The rumour was about adverts vs news.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `What was the newspaper's book called? (two words)`,
        answers: [`One Day`, `one day`],
        placeholder: `Two words`,
      },
      {
        kind: `fillBlank`,
        prompt: `Why dramatise?`,
        template: `Merely stating a [[1]] isn't enough. It has to be made [[2]], interesting, dramatic.`,
        blanks: [[`truth`], [`vivid`]],
        distractors: [`lie`, `short`],
      },
      {
        kind: `sortGroups`,
        prompt: `Telling or showing?`,
        groups: [`Telling`, `Showing`],
        items: [
          { text: `"Our paper has lots of news."`, group: 0 },
          { text: `A 307-page book of one day's news`, group: 1 },
          { text: `"This poison works."`, group: 0 },
          { text: `Two live rats in the shop window`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What happened to rat poison sales with the live-rat window display?`,
        options: [
          { text: `They went up five times` },
          { text: `They doubled`, why: `More than that.` },
          { text: `They fell`, why: `They soared.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Your plan to convince your team that meetings waste time. Which step is only telling?`,
        lines: [
          `Total up last month's meeting hours on one big chart.`,
          `Say "meetings are too long" in the next meeting.`,
          `Show the chart next to the three projects that slipped.`,
        ],
        bug: 1,
        fix: `Put a timer on the screen for the next meeting.`,
        explanation: `Saying it is a truth stated. The chart and the timer make it vivid.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match the dramatisation to what it proved.`,
        pairs: [
          [`One Day`, `The paper was full of news`],
          [`Live rats in the window`, `The poison was worth buying`],
          [`Shirt clean vs grey`, `This detergent works better`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did J. P. Morgan say people have two of?`,
        options: [
          { text: `Reasons: one that sounds good and the real one` },
          { text: `Faces`, why: `It was reasons.` },
          { text: `Motives that are always selfish`, why: `One sounds good; appeal to it.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the rule.`,
        tiles: [`Don't`, `just`, `tell`, `it.`, `Show`, `it.`],
        distractors: [`Shout`],
      },
      {
        kind: `mcq`,
        prompt: `You want your housemates to see how much food is being wasted. Which approach dramatises it?`,
        options: [
          { text: `Send a message saying "we waste too much food"`, why: `A stated truth. Easy to ignore.` },
          { text: `Collect a week's thrown-away food in a clear bag and put it on the kitchen table` },
          { text: `Complain at every meal`, why: `That's Rule 1 broken.` },
        ],
        answer: 1,
        explanation: `A bag of wasted food on the table says it more vividly than any message, and without blaming anyone.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: think of one point you've been making that people keep ignoring. How could you show it instead of telling it? Write the idea down.`,
    starters: [`The point people ignore is...`, `I could show it by...`],
  },
  deepen: {
    title: `Watch the adverts`,
    summary: `Next time you watch adverts, count how many tell you something and how many show it. Notice which ones you remember.`,
  },
  notes: `Source: Carnegie, Part Three ch. 11 "The Movies Do It. TV Does It. Why Don't You Do It?": the Philadelphia Evening Bulletin's One Day (307 pages), "this is the day of dramatization", the rat poison display (five times normal sales), television commercial examples. Retold in our own words.`,
};

export default lesson;
