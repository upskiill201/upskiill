import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8 (Practice) — Rule 15 at home and at work: hand people the floor. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `"Why, Laurie, Why?"`,
  summary: `She'd lectured, threatened and punished her teenage daughter for months. One evening she was too tired to shout, and asked one quiet question instead. The answer poured out.`,
  minutes: 11,
  outcomes: [
    `Stop lecturing and start asking`,
    `Let people talk their way to a conclusion`,
    `Use Rule 15 with family, candidates and customers`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `Laurie`,
      before: {
        label: `Months of lectures`,
        text: `Barbara's daughter Laurie had gone from a quiet, easy child to an uncooperative, sometimes hostile teenager. Barbara lectured her, threatened her and punished her. Nothing worked.`,
      },
      after: {
        label: `One question`,
        text: `One day Laurie left without doing her chores. When she came back, Barbara was about to scream for the ten-thousandth time, but had no strength left. She just looked at her and said sadly: "Why, Laurie, why?" Laurie asked, calmly, "Do you really want to know?" Barbara nodded, and it all came out.`,
      },
      notes: [
        `Barbara had never listened. Every time Laurie tried to share her thoughts, she was interrupted with more orders.`,
        `Laurie didn't need a bossy mother. She needed someone to confide in.`,
        `From then on Barbara let her talk as much as she wanted, and Laurie became cooperative again.`,
      ],
    },
    {
      kind: `reading`,
      title: `He talked himself into the job`,
      html:
        `<p>Roy Bradley ran a small brokerage firm with no benefits: no health insurance, no pension, no leads. A strong candidate, Richard, had heard all the negatives from Bradley's assistant and came in looking discouraged.</p>` +
        `<p>Bradley mentioned the one real benefit: working as an independent contractor, practically self-employed. Then he let Richard talk. As Richard talked through the advantages, he talked himself out of every doubt he'd walked in with, almost as if thinking out loud.</p>` +
        `<p>Bradley was tempted to jump in several times. He didn't. By the end, Richard had convinced himself, entirely on his own. He was hired and became an outstanding member of the firm.</p>` +
        `<p>People are far more convinced by reasons they find themselves than by reasons you give them.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `When you're about to lecture, ask "Why?" or "What do you think?" instead, and then really wait for the answer.`,
    },
  ],
  apply: {
    scenario: `Rule 15 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What finally got Laurie talking?`,
        options: [
          { text: `A stricter punishment`, why: `Punishments had all failed.` },
          { text: `Her mother quietly asking "Why, Laurie, why?" and listening` },
          { text: `A family holiday`, why: `It was one question and real listening.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What Laurie needed.`,
        template: `Not a bossy [[1]], but someone to [[2]] in.`,
        blanks: [[`mother`], [`confide`]],
        distractors: [`teacher`, `shout`],
      },
      {
        kind: `mcq`,
        prompt: `How did Richard decide to take the job?`,
        options: [
          { text: `Bradley gave him a great pitch`, why: `Bradley said very little.` },
          { text: `He talked himself out of his doubts while Bradley listened` },
          { text: `The pay was raised`, why: `Nothing changed but who was talking.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Lecture or invitation to talk?`,
        groups: [`Lecture`, `Invitation`],
        items: [
          { text: `"How many times have I told you?"`, group: 0 },
          { text: `"What's going on for you right now?"`, group: 1 },
          { text: `"When I was your age..."`, group: 0 },
          { text: `"Do you want to tell me about it?"`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Laurie's reply: "Do you really want to ________?" (one word)`,
        answers: [`know`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your child comes home upset about school. Which line stops them talking?`,
        lines: [
          `You seem down. What happened today?`,
          `Well, I'm sure you did something to start it.`,
          `That sounds hard. Then what?`,
        ],
        bug: 1,
        fix: `I'm listening, take your time.`,
        explanation: `A judgement before you've heard the story. They'll stop telling you things.`,
      },
      {
        kind: `orderLines`,
        prompt: `Bradley's interview approach, in order.`,
        lines: [`Name the real benefit honestly`, `Let the candidate talk`, `Resist jumping in`, `Let them reach their own conclusion`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what they learned.`,
        pairs: [
          [`Barbara`, `Stop ordering, start listening`],
          [`Roy Bradley`, `Let the candidate convince himself`],
          [`The laryngitis salesman`, `Let the buyer argue your case`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): who said "Talk to people about themselves and they'll listen for hours"?`,
        options: [
          { text: `Disraeli` },
          { text: `Lincoln`, why: `It was a British prime minister.` },
          { text: `Schwab`, why: `It was Disraeli.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your partner keeps forgetting to do their share of the chores. You've explained the problem many times. What's the Rule 15 move?`,
        options: [
          { text: `Explain it again, more clearly`, why: `More talking from you hasn't worked.` },
          { text: `Ask, calmly: "What's making chores hard for you lately?" and listen to the whole answer` },
          { text: `Stop doing your share too`, why: `That's a war, not a conversation.` },
        ],
        answer: 1,
        explanation: `Like Barbara with Laurie: one honest question and real listening can do what a hundred lectures couldn't.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: ask someone "What do you think?" today about a decision, and then wait, without filling the silence. What did you learn?`,
    starters: [`I asked... what they thought about...`, `When I waited...`],
  },
  deepen: {
    title: `The ten-thousandth time`,
    summary: `Is there something you've told someone a hundred times? Next time, don't tell. Ask "why?" and listen. Barbara only tried it when she was too tired to shout. You don't have to wait that long.`,
  },
  notes: `Source: Carnegie, Part Three ch. 6: Barbara Wilson and her daughter Laurie ("Why, Laurie, why?", "Do you really want to know?"), Roy G. Bradley and Richard Pryor (no benefits, independent contractor, talked himself in). Retold in our own words.`,
};

export default lesson;
