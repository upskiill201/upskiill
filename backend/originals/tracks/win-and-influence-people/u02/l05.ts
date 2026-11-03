import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 (Practice + Checkpoint) — Rule 5 on the phone and at home; reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: `Smile Down the Phone`,
  summary: `A star graduate turned down bigger, better-known companies to work for a small one. When his new boss asked why, his answer had nothing to do with salary.`,
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: [
    `Let warmth come through in your voice and messages`,
    `Make smiling a daily habit, starting at home`,
    `Combine Rules 4 and 5 in your first seconds with anyone`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `Two ways to answer`,
      before: {
        label: `Cold and businesslike`,
        text: `"Hello. Yes. We've received your application. Are you available Thursday at two?"`,
      },
      after: {
        label: `Glad to hear from you`,
        text: `"Hi! Really good to hear from you. We loved your application. Could you come in Thursday at two? I'd love you to meet the team."`,
      },
      notes: [
        `A smile comes through in your voice even when nobody can see it.`,
        `American phone companies trained staff to smile while talking on the phone for exactly this reason.`,
      ],
    },
    {
      kind: `story`,
      title: `Why us?`,
      beats: [
        { speaker: `narrator`, text: `Robert Cryer ran a computer department in Cincinnati and was desperate to hire a PhD in computer science. He found a young man with ideal qualifications, about to graduate, who had offers from much bigger, better-known companies.` },
        { speaker: `narrator`, text: `To his delight, the young man accepted. Once he'd started, Cryer asked him why he'd chosen them over the others.` },
      ],
      choice: {
        prompt: `What did the young man say?`,
        options: [
          { text: `"You offered the most money."`, outcome: `It wasn't the money.` },
          { text: `"The others sounded cold on the phone. You sounded glad to hear from me."`, outcome: `That's it. The others made him feel like a business transaction. Cryer's voice made him feel wanted. Cryer said he still answers the phone with a smile.`, best: true },
          { text: `"Your office was closest to home."`, outcome: `No. It came down to how each company sounded on the phone.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The grouch of Broadway`,
      html:
        `<p>Carnegie asked thousands of people to smile at someone every hour of the day for a week and report back. One stockbroker wrote that in eighteen years of marriage he'd hardly smiled at his wife or said two dozen words to her before leaving for work. He called himself one of the worst grouches in New York.</p>` +
        `<p>The next morning, combing his hair, he told his scowling reflection that today he was going to smile. At breakfast he greeted his wife warmly, with a smile. She was bewildered. Shocked. He told her she could expect it every morning from now on, and he kept it up.</p>` +
        `<p>He smiled at the lift operator, the doorman, the cashier in the subway. Everyone smiled back. Complaints at work got settled more easily. A young clerk confessed he'd thought him a terrible grouch, and only now saw he was human.</p>` +
        `<p>Two months on, he said there was more happiness in his home than in the whole year before. He'd become a happier man, a richer man, richer in friendships and happiness, the only things that matter much in the end.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `On a call, smile before you say hello. On a message, read it back and ask: does this sound glad to hear from them?`,
    },
  ],
  apply: {
    scenario: `Checkpoint: Rules 4 and 5.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did the young PhD choose Cryer's smaller company?`,
        options: [
          { text: `Better pay`, why: `The bigger companies could pay more.` },
          { text: `Cryer sounded glad to hear from him on the phone` },
          { text: `It was nearer`, why: `It came down to how they sounded.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Does this sound glad to hear from them?`,
        groups: [`Sounds glad`, `Sounds cold`],
        items: [
          { text: `"Great to hear from you! How can I help?"`, group: 0 },
          { text: `"Yes?"`, group: 1 },
          { text: `"Hi Priya, thanks so much for calling back."`, group: 0 },
          { text: `"Per my last email."`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `How did the stockbroker's wife react to his first smile at breakfast?`,
        options: [
          { text: `She didn't notice`, why: `She noticed, all right.` },
          { text: `She was bewildered, even shocked` },
          { text: `She laughed at him`, why: `She was too surprised to laugh.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The broker's result after two months.`,
        template: `More [[1]] in his home in two months than in the whole year [[2]].`,
        blanks: [[`happiness`], [`before`]],
        distractors: [`money`, `after`],
      },
      {
        kind: `findBug`,
        prompt: `Your voicemail greeting. Which line sounds unwelcoming?`,
        lines: [
          `Hi, you've reached Jordan, thanks for calling.`,
          `If it's not urgent, honestly, maybe just don't.`,
          `Leave a message and I'll call you back today.`,
        ],
        bug: 1,
        fix: `I'd love to hear from you.`,
        explanation: `Even as a joke, it tells callers they're a bother. A smile comes through on a recording too.`,
      },
      {
        kind: `typeAnswer`,
        prompt: `Review (Lesson 1): to be interesting, be ________. (one word)`,
        answers: [`interested`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 3): who saved Sykes's account with the drugstore?`,
        options: [
          { text: `The soda clerk he always said hello to` },
          { text: `The owner's son`, why: `It was a clerk Sykes had been kind to.` },
          { text: `A rival salesman`, why: `No, it was someone inside the shop.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story to its rule.`,
        pairs: [
          [`Tippy the dog`, `Be genuinely interested`],
          [`The baby in the waiting room`, `Smile`],
          [`Roosevelt and the bobwhite`, `Show interest in small actions`],
          [`Knaphle's debate`, `Ask for their view and expertise`],
        ],
      },
      {
        kind: `orderLines`,
        prompt: `Your first ten seconds with anyone, in order.`,
        lines: [`Smile before you speak`, `Greet them like you're glad they're here`, `Ask something about them`, `Listen to the answer`],
      },
      {
        kind: `tapBuild`,
        prompt: `Build a warm phone greeting.`,
        tiles: [`Hi!`, `So`, `good`, `to`, `hear`, `from`, `you.`],
        distractors: [`What?`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. You work from home and talk to clients only by video and chat. Which habit uses Rules 4 and 5 best?`,
        options: [
          { text: `Keep the camera off to save time`, why: `You lose the smile entirely.` },
          { text: `Open every call smiling and asking one real question about them before business` },
          { text: `Send short replies so you seem efficient`, why: `Efficient can easily read as cold.` },
        ],
        answer: 1,
        explanation: `A smile and a genuine question work through a screen just as they do in person.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: answer every call and greet every person at home today with a real smile, starting with the first person you see this morning. What changed?`,
    starters: [`The first person I smiled at was...`, `Their reaction was...`, `By the end of the day...`],
  },
  deepen: {
    title: `A smile every hour`,
    summary: `Try Carnegie's week-long experiment: smile at someone every hour you're awake, for seven days. Write down one result each evening.`,
  },
  notes: `Source: Carnegie, Part Two ch. 2: phone companies' "phone power" smiling program, Robert Cryer's PhD recruit from Purdue, the smile-every-hour-for-a-week assignment, William B. Steinhardt the stockbroker (18 years, wife bewildered, two months of happiness). Retold in our own words.`,
};

export default lesson;
