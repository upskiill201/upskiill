import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 (Story) — Rule 7: be a good listener. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `The Great Talker Who Said Nothing`,
  summary: `At a dinner party, a famous scientist told the host that Carnegie was one of the most interesting talkers he'd ever met. Carnegie had barely said a word all night.`,
  minutes: 11,
  outcomes: [
    `Explain why listening makes people find you interesting`,
    `Encourage others to talk about themselves`,
    `Give someone your full attention`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The botanist`,
      beats: [
        { speaker: `narrator`, text: `At a dinner party in New York, Carnegie met a well-known botanist. He'd never talked to a botanist before and found him fascinating. He sat on the edge of his chair while the man talked about exotic plants, experiments with new kinds of plant life, even astonishing facts about the humble potato.` },
        { speaker: `narrator`, text: `There were a dozen other guests. Carnegie ignored them all, which broke every rule of etiquette, and listened to the botanist for hours.` },
        { speaker: `narrator`, text: `At midnight he said goodnight and left. The botanist turned to the host and paid Carnegie several compliments. He was "most stimulating". He was this and that.` },
      ],
      choice: {
        prompt: `And how did the botanist finish his praise?`,
        options: [
          { text: `"He knows a great deal about plants."`, outcome: `Carnegie knew no more about botany than about the anatomy of a penguin.` },
          { text: `"He's a most interesting conversationalist."`, outcome: `That's it. A brilliant talker, and he'd hardly said anything. He'd simply listened, because he was genuinely interested, and the botanist felt it.`, best: true },
          { text: `"He's very polite."`, outcome: `Ignoring a dozen guests wasn't polite. But he'd paid the botanist the highest compliment there is.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Africa`,
      html:
        `<p>At another party, a woman found out Carnegie had travelled all over Europe and begged him to tell her about the wonderful places he'd seen. As they sat down, she mentioned she and her husband had just come back from Africa.</p>` +
        `<p>"Africa!" said Carnegie. "How interesting! I've always wanted to go. Did you see the big-game country? How lucky. Do tell me about Africa."</p>` +
        `<p>She talked for forty-five minutes and never asked again where he'd been. She didn't really want to hear about his travels. She wanted an interested listener, so she could talk about hers.</p>` +
        `<p>Was she unusual? Not at all. Listening with rapt attention is one of the highest compliments you can pay anyone. Few people can resist it.</p>`,
    },
    {
      kind: `text`,
      html:
        `<p>Charles Eliot, a great president of Harvard, said there's no mystery to a successful business meeting: complete attention to the person speaking to you is what matters. Nothing else is as flattering.</p>` +
        `<p>The novelist Henry James described Eliot listening: sitting very straight, hands in his lap, perfectly still except for slowly turning his thumbs, as if he were hearing with his eyes as well as his ears. At the end, the person who'd talked to him felt they'd had their say.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 7: Be a good listener. Encourage others to talk about themselves. To be interesting, be interested, and ask questions people will enjoy answering.`,
    },
  ],
  apply: {
    scenario: `Rule 7: Be a good listener.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did the botanist call Carnegie a great conversationalist?`,
        options: [
          { text: `Carnegie told brilliant stories`, why: `He barely spoke.` },
          { text: `Carnegie listened with genuine interest for hours` },
          { text: `Carnegie knew a lot about plants`, why: `He knew almost nothing about botany.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did the woman back from Africa really want?`,
        options: [
          { text: `To hear about Carnegie's travels`, why: `That's what she said, but not what she wanted.` },
          { text: `An interested listener for her own story` },
          { text: `Advice for her next trip`, why: `She just wanted to tell her story.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `How many minutes did the woman talk about Africa? (a number)`,
        answers: [`45`, `forty-five`, `forty five`],
        placeholder: `A number`,
      },
      {
        kind: `sortGroups`,
        prompt: `Good listener or bad listener?`,
        groups: [`Good listener`, `Bad listener`],
        items: [
          { text: `"Then what happened?"`, group: 0 },
          { text: `Checking your phone while they talk`, group: 1 },
          { text: `"How did that feel?"`, group: 0 },
          { text: `"That reminds me of when I..." every time`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Harvard's Charles Eliot on business meetings.`,
        template: `Complete [[1]] to the person speaking to you. Nothing else is so [[2]].`,
        blanks: [[`attention`], [`flattering`]],
        distractors: [`agreement`, `quick`],
      },
      {
        kind: `findBug`,
        prompt: `Your friend is telling you about their trip. Which reply stops them talking?`,
        lines: [
          `Japan? What was the best thing you ate?`,
          `Ha, I went to Japan too, let me tell you about my trip.`,
          `Did anything surprise you?`,
        ],
        bug: 1,
        fix: `How did you find getting around?`,
        explanation: `It takes the conversation away from them. They wanted a listener, not a rival story.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their listening lesson.`,
        pairs: [
          [`The botanist`, `Thought the listener was a brilliant talker`],
          [`The woman back from Africa`, `Wanted to tell, not to hear`],
          [`Charles Eliot`, `Listened as if with his eyes too`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what's the sweetest sound in any language to a person?`,
        options: [
          { text: `Their own name` },
          { text: `Praise`, why: `Close, but Rule 6 is about their name.` },
          { text: `Laughter`, why: `Not according to Carnegie.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a question people enjoy answering.`,
        tiles: [`What`, `got`, `you`, `into`, `that`, `in`, `the`, `first`, `place?`],
        distractors: [`me`],
      },
      {
        kind: `mcq`,
        prompt: `You're on a first date and terrified of awkward silences, so you've prepared lots to say. What does this lesson suggest?`,
        options: [
          { text: `Fill every gap with your best stories`, why: `They'll remember you talked a lot, not that you were good company.` },
          { text: `Ask about the things they light up about, and really listen` },
          { text: `Let them do all the work`, why: `Listening is active: questions, attention, interest.` },
        ],
        answer: 1,
        explanation: `The botanist rule: listen with real interest and you'll be remembered as fascinating.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: in your next conversation, talk for less than half the time. Ask questions, follow up, and listen. What did you learn about them that you didn't know?`,
    starters: [`I talked with...`, `I learned that...`, `They seemed...`],
  },
  deepen: {
    title: `Their toothache`,
    summary: `Carnegie said a person's toothache means more to them than a famine on the other side of the world. Remember that when you start a conversation: their small worries are their big news.`,
  },
  notes: `Source: Carnegie, Part Two ch. 4 "An Easy Way to Become a Good Conversationalist": the bridge-party woman back from Africa (45 minutes), the botanist at the publisher's dinner ("most interesting conversationalist"), Jack Woodford on rapt attention, Charles W. Eliot and Henry James's description, "toothache vs famine". Retold in our own words.`,
};

export default lesson;
