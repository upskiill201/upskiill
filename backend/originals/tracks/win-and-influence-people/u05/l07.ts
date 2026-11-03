import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7 (Story) — Rule 15: let the other person do a great deal of the talking. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `The Salesman Who Lost His Voice`,
  summary: `The biggest contract of his life, a final pitch to the president of a car company, and he woke up with laryngitis. He could barely whisper. It turned out to be the luckiest morning of his career.`,
  minutes: 11,
  outcomes: [
    `Explain why letting others talk persuades better than talking`,
    `Hold back your ideas while others still have theirs to say`,
    `Ask questions that hand people the floor`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The upholstery contract`,
      beats: [
        { speaker: `narrator`, text: `One of America's biggest car makers was choosing a supplier for a whole year's upholstery fabric. Three companies had made samples. On the final day, a representative from each would make one last pitch to the executives.` },
        { speaker: `narrator`, text: `One representative arrived with severe laryngitis. Shown into a room with the textile engineer, the purchasing agent, the sales director and the company president, he stood up to speak, and could only squeak.` },
        { speaker: `narrator`, text: `He wrote on a pad: "Gentlemen, I have lost my voice. I am speechless." The president said: "I'll do the talking for you." And he did. He showed the samples and praised their good points. A lively discussion followed, with the president arguing the salesman's side. The salesman just smiled, nodded and gestured.` },
      ],
      choice: {
        prompt: `What happened?`,
        options: [
          { text: `He lost the contract to someone who could speak`, outcome: `Quite the opposite.` },
          { text: `He won it: over half a million yards of fabric, worth $1.6 million, the biggest order he'd ever had`, outcome: `That's it. He said he'd have lost it if he hadn't lost his voice, because he'd had the wrong idea about the whole thing. He found out by accident how richly it pays to let the other person talk.`, best: true },
          { text: `The meeting was postponed`, outcome: `It went ahead, and the president did his selling for him.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Let them talk themselves out`,
      html:
        `<p>Most people trying to win others round do far too much of the talking themselves. Let the other person talk themselves out. They know more about their business and their problems than you do. So ask them questions. Let them tell you a few things.</p>` +
        `<p>If you disagree, you'll be tempted to interrupt. Don't. It's dangerous. They won't pay attention to you while they still have a lot of their own ideas crying out to be said. So listen patiently, with an open mind. Be sincere about it. Encourage them to say it all.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 15: Let the other person do a great deal of the talking. Nobody listens while their own ideas are still waiting to come out.`,
    },
  ],
  apply: {
    scenario: `Rule 15: Let them talk.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the salesman write on his pad?`,
        options: [
          { text: `"Please reschedule."`, why: `He stayed.` },
          { text: `"Gentlemen, I have lost my voice. I am speechless."` },
          { text: `"See my samples."`, why: `He let them discover the samples.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Who argued the salesman's case in the meeting?`,
        options: [
          { text: `His assistant`, why: `He came alone.` },
          { text: `The company president` },
          { text: `Nobody`, why: `The president did, enthusiastically.` },
        ],
        answer: 1,
      },
      {
        kind: `typeAnswer`,
        prompt: `How many million dollars was the contract worth? (a number)`,
        answers: [`1.6`, `1,6`],
        placeholder: `A number`,
      },
      {
        kind: `sortGroups`,
        prompt: `Hands them the floor, or takes it back?`,
        groups: [`Hands them the floor`, `Takes it back`],
        items: [
          { text: `"What would make this work best for you?"`, group: 0 },
          { text: `"Let me tell you why ours is better."`, group: 1 },
          { text: `"Tell me more about that."`, group: 0 },
          { text: `Cutting in when you disagree`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Why not interrupt?`,
        template: `They won't pay [[1]] to you while they still have ideas of their own crying for [[2]].`,
        blanks: [[`attention`], [`expression`]],
        distractors: [`money`, `help`],
      },
      {
        kind: `findBug`,
        prompt: `Your plan for a sales call. Which step breaks Rule 15?`,
        lines: [
          `Ask what's been frustrating them with their current supplier.`,
          `Present all forty slides before they can ask anything.`,
          `Let them tell me what a great result would look like.`,
        ],
        bug: 1,
        fix: `Show two slides, then ask what they think.`,
        explanation: `Forty slides is you doing all the talking. The laryngitis salesman won by saying nothing.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each rule to its number.`,
        pairs: [
          [`Rule 13`, `Begin in a friendly way`],
          [`Rule 14`, `Get them saying yes, yes`],
          [`Rule 15`, `Let them do most of the talking`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what does Rule 11 say never to say?`,
        options: [
          { text: `"You're wrong."` },
          { text: `"I'm sorry."`, why: `Saying sorry is fine.` },
          { text: `"Let's look at the facts."`, why: `That's the phrase to use.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a question that hands over the floor.`,
        tiles: [`What`, `do`, `you`, `think`, `we`, `should`, `do?`],
        distractors: [`I`],
      },
      {
        kind: `mcq`,
        prompt: `You're pitching an idea to a group of senior leaders who clearly have strong views. What does this lesson suggest?`,
        options: [
          { text: `Talk fast so you cover everything before they interrupt`, why: `They won't hear it with their own ideas waiting.` },
          { text: `Give the core idea briefly, then ask what they see and let them talk it through` },
          { text: `Stay silent the whole meeting`, why: `Rule 15 is "a great deal", not "all". Guide with questions.` },
        ],
        answer: 1,
        explanation: `Like the upholstery meeting: let them argue it through and they'll often sell it to themselves.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: in one meeting or conversation today, speak last. Ask your question, then let everyone else go first. What did you hear that you'd have missed?`,
    starters: [`In the meeting about...`, `By speaking last I heard...`],
  },
  deepen: {
    title: `Pretend you've lost your voice`,
    summary: `For your next hard conversation, imagine you have laryngitis. Plan only questions and a few short sentences. Notice how much more the other person reveals.`,
  },
  notes: `Source: Carnegie, Part Three ch. 6 "The Safety Valve in Handling Complaints": opening advice (too much talking, ask questions, don't interrupt), G.B.R. and the upholstery contract (laryngitis, the president argued his case, half a million yards, $1,600,000). Retold in our own words.`,
};

export default lesson;
