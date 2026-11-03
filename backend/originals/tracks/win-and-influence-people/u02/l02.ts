import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 (Practice) — Rule 4 in action: small acts that show real interest. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Interest Shows in Actions`,
  summary: `A President of the United States once phoned a servant's cottage just to tell his valet's wife there was a bird outside her window. Small things like that are how interest becomes friendship.`,
  minutes: 11,
  outcomes: [
    `Turn interest into small, thoughtful actions`,
    `Greet people in a way that shows you're glad to see them`,
    `Remember the details that matter to others`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `The bobwhite`,
      html:
        `<p>Theodore Roosevelt was adored, even by his servants. His valet, James Amos, wrote a whole book about him. In it he tells how his wife once asked the President what a bobwhite looked like. She'd never seen one. Roosevelt described the bird to her in detail.</p>` +
        `<p>Some time later, the phone rang in their little cottage on the estate. It was the President himself, calling to say there was a bobwhite outside her window, if she'd like to look.</p>` +
        `<p>Whenever he walked past the cottage, even if they were out of sight, they'd hear him call out a friendly greeting to them by name.</p>` +
        `<p>Years later he visited the White House while the new President was away. He greeted every old member of staff by name, even the kitchen maids. He asked the cook if she still made her corn bread, ate a piece on his way to the office, and greeted the gardeners as he passed. The head usher, who'd been there forty years, said with tears in his eyes it was the only happy day they'd had in nearly two years.</p>`,
    },
    {
      kind: `check`,
      question: `Why did Roosevelt phone his valet's cottage?`,
      options: [`To give an order`, `To tell his valet's wife a bobwhite was outside her window`, `To complain about the noise`],
      answer: 1,
      explanation: `He remembered a small thing she cared about and went out of his way for it.`,
    },
    {
      kind: `steps`,
      title: `Four ways to show interest, from the book`,
      steps: [
        { title: `Do things that cost you time and thought`, body: `Before touring South America, the Prince of Wales spent months learning Spanish so he could speak to people in their own language. They loved him for it.` },
        { title: `Remember what matters to them`, body: `For years Carnegie found out his friends' birthdays, wrote them down and sent a note on the day. Often he was the only person who remembered.` },
        { title: `Greet people with warmth`, body: `Say hello as if you're glad they're there. On the phone, let your voice say you're pleased they called.` },
        { title: `Notice people others overlook`, body: `The cleaner, the receptionist, the junior at the back. They notice who notices them.` },
      ],
    },
    {
      kind: `text`,
      html:
        `<p>Carnegie even used interest to get the busiest people in America to give free talks to his students. He wrote to famous authors saying how much his class admired their work and wanted to learn their secrets. He knew they were too busy to prepare a lecture, so he enclosed a list of questions about themselves. They liked that. Who wouldn't? So they came.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Interest you only feel doesn't count. It has to show up in something you do: a question, a call, a remembered birthday.`,
    },
  ],
  apply: {
    scenario: `Rule 4 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Roosevelt greet the White House staff years after leaving?`,
        options: [
          { text: `With a formal speech`, why: `It was personal, not formal.` },
          { text: `By name, every one, even the kitchen maids` },
          { text: `He didn't see them`, why: `He went out of his way to.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did the Prince of Wales do before touring South America?`,
        options: [
          { text: `Hired the best translators`, why: `He did something that cost him more effort.` },
          { text: `Spent months learning Spanish` },
          { text: `Sent gifts ahead`, why: `It was his time and effort that won them.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Shows real interest, or just looks busy?`,
        groups: [`Shows real interest`, `Doesn't`],
        items: [
          { text: `Asking how their mum's operation went`, group: 0 },
          { text: `"Hey" without looking up from your laptop`, group: 1 },
          { text: `Remembering the name of their dog`, group: 0 },
          { text: `A copy-paste "happy birthday" with no name`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Roosevelt rang to tell his valet's wife about a bird outside her window. What kind of bird? (one word)`,
        answers: [`bobwhite`, `bob-white`],
        placeholder: `One word`,
      },
      {
        kind: `orderLines`,
        prompt: `Carnegie's birthday system, in order.`,
        lines: [`Find out the person's birthday`, `Write it down as soon as they turn away`, `Put it in the calendar for the year`, `Send a note on the day`],
      },
      {
        kind: `fillBlank`,
        prompt: `How Carnegie got famous authors to visit his class.`,
        template: `He enclosed a list of [[1]] about [[2]].`,
        blanks: [[`questions`], [`themselves`, `them`]],
        distractors: [`fees`, `the class`],
      },
      {
        kind: `findBug`,
        prompt: `Answering a call from a customer. Which line kills the warmth?`,
        lines: [
          `Hello, this is Mia, thanks for calling!`,
          `Ugh, okay, what's the problem this time?`,
          `I'll sort that out for you right now.`,
        ],
        bug: 1,
        fix: `How can I help today?`,
        explanation: `Your voice tells callers whether you're glad they called. That line says you're not.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each Chapter 1 idea.`,
        pairs: [
          [`Lincoln's letter`, `Written, never sent`],
          [`Schwab`, `Hearty in approval, lavish in praise`],
          [`The ballroom`, `A list of their advantages`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Show interest in a colleague back from leave.`,
        tiles: [`How`, `is`, `the`, `new`, `baby`, `sleeping?`],
        distractors: [`Finally`, `back?`],
      },
      {
        kind: `mcq`,
        prompt: `You manage a busy team and barely know the night cleaner who's worked there for years. What would Roosevelt do?`,
        options: [
          { text: `Nothing; it's not your job`, why: `Roosevelt greeted the kitchen maids. Nobody's too unimportant.` },
          { text: `Learn their name and greet them warmly each time you see them` },
          { text: `Send a team-wide thank-you that mentions cleaning`, why: `General thanks is nice, but personal interest is what people remember.` },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: `Mission: find out one friend's birthday, or one thing a colleague cares about, and write it down somewhere you'll see it again. Who and what?`,
    starters: [`I found out that...`, `I'll remember it by...`],
  },
  deepen: {
    title: `Greet like you mean it`,
    summary: `For one day, answer every call and every hello as if you're genuinely pleased it's them. Notice whether people sound warmer back.`,
  },
  notes: `Source: Carnegie, Part Two ch. 1: James Amos and the bobwhite, Roosevelt at the White House (Alice's corn bread, Ike Hoover's tears), Brooklyn authors and question lists, Prince of Wales learning Spanish, the birthday book, greeting with animation, telephone tone. Retold in our own words.`,
};

export default lesson;
