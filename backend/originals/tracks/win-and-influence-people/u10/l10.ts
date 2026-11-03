import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 10 · Lesson 10 (Course finale, Unit Challenge) — a full week using all 30 rules. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Whole Toolkit`,
  summary: `The final lesson. One week, every kind of person: a stranger, a critic, a struggling teammate, a family decision. Thirty rules. Let's see how far you've come.`,
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Use rules from every chapter in real situations`,
    `Choose the right rule for each person and moment`,
    `Look back at your triumphs and plan what's next`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Thirty rules, one way of life`,
      html:
        `<p>You've now learned every rule in the book. Don't criticise. Appreciate. Arouse an eager want. Be interested. Smile. Remember names. Listen. Talk about their interests. Make them feel important. Avoid arguments. Never say "you're wrong". Admit your mistakes. Begin friendly. Get yeses. Let them talk. Let it be their idea. See their side. Sympathise. Appeal to their best. Dramatise. Challenge. Praise first. Point indirectly. Mention your own mistakes. Ask, don't order. Save their face. Praise every step. Give them a good name. Make it seem easy. Make them glad to do it.</p>` +
        `<p>Carnegie said it again and again: this isn't a bag of tricks. It's a new way of life. And it only works when it comes from the heart.</p>` +
        `<p>One last week. Let's go.</p>`,
    },
    {
      kind: `story`,
      title: `Monday: the stranger`,
      beats: [
        { speaker: `narrator`, text: `At a conference, you're seated next to Dr. Yusuf Adeyemi, who designs water systems for cities. You know nothing about water systems, and you're hoping to make a contact.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Tell him all about your own work so he knows what you do`, outcome: `He's polite, and forgets you by lunch.` },
          { text: `Smile, use his name, and ask: "Water for whole cities? What got you into that?" Then listen.`, outcome: `He talks for twenty minutes and hands you his card: "Let's stay in touch." Interest, a smile, his name, listening.`, best: true },
          { text: `Ask him to introduce you to his boss`, outcome: `Your want, before any interest in his. He moves on.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Wednesday: the critic`,
      beats: [
        { speaker: `narrator`, text: `A colleague, Lena, emails the whole team saying your proposal is "naive and badly researched". Part of her criticism is fair. Most isn't. You're furious.` },
      ],
      choice: {
        prompt: `How do you reply?`,
        options: [
          { text: `Reply-all, point by point, showing where she's wrong`, outcome: `You win the argument and lose Lena, and half the team watches it happen.` },
          { text: `Write the angry reply and delete it. Then message Lena privately: "Thanks for the challenge. You're right that the cost section was thin, that's on me. Could we go through the rest together? I may be missing something."`, outcome: `Lena softens, helps you strengthen the cost section, and backs the proposal in the next meeting. The unsent letter, admitting fault, "I may be wrong", and a friendly start.`, best: true },
          { text: `Ignore it and complain to your manager`, outcome: `Rule 1 broken, and the proposal stalls.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Friday: the struggling teammate`,
      beats: [
        { speaker: `narrator`, text: `Your teammate Tom has been quiet and slow all week. He just sent in work with obvious errors, and the client meeting is Monday.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `"Tom, these errors aren't acceptable before a client meeting."`, outcome: `Correct, and Tom goes quieter still.` },
          { text: `"Tom, your client research is the best on the team. I made exactly these slips when I was stretched thin last year. Is anything making this week hard? You're closer than you think, let's fix the last bits together."`, outcome: `Tom admits he's been caring for his sick father. You rebalance the work. Monday goes brilliantly. Praise first, your own mistakes, a question, a good name, and making it seem easy.`, best: true },
          { text: `Fix it yourself and say nothing`, outcome: `The meeting's saved, but Tom never knew you noticed, or cared.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Course Challenge: all 30 rules.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Which story opened this whole course?`,
        options: [
          { text: `A gunman under siege writing about his kind heart` },
          { text: `Lincoln's unsent letter`, why: `That was lesson 3.` },
          { text: `Schwab's chalk on the floor`, why: `That was Chapter 7.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which part of the book does each rule come from?`,
        groups: [`Make people like you`, `Win them to your thinking`, `Lead and change them`],
        items: [
          { text: `Remember their name`, group: 0 },
          { text: `Never say "you're wrong"`, group: 1 },
          { text: `Let them save face`, group: 2 },
          { text: `Get them saying "yes, yes"`, group: 1 },
          { text: `Smile`, group: 0 },
          { text: `Give them a fine reputation`, group: 2 },
        ],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`Tippy the dog`, `Be genuinely interested`],
          [`The Hamlet quotation`, `Avoid the argument`],
          [`Wesson's sketches`, `Let it be their idea`],
          [`Steinmetz's new title`, `Let them save face`],
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The book's big secret.`,
        template: `The only way to get anybody to do anything is to make them [[1]] to do it.`,
        blanks: [[`want`]],
        distractors: [`have`, `need`],
      },
      {
        kind: `mcq`,
        prompt: `What did Charles Schwab say his million-dollar ability was?`,
        options: [
          { text: `Arousing enthusiasm through appreciation and encouragement` },
          { text: `Knowing more about steel than anyone`, why: `Others knew more.` },
          { text: `Strict discipline`, why: `He was slow to criticise.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `"I may be wrong. I often am. Let's look at the ________." (one word)`,
        answers: [`facts`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your plan for winning over a difficult new manager. Which step breaks the course's rules?`,
        lines: [
          `Learn what they're proud of and ask about it.`,
          `Point out their mistakes early so they respect me.`,
          `Make my ideas feel like theirs by asking for their input.`,
        ],
        bug: 1,
        fix: `Find honest things to appreciate before raising anything.`,
        explanation: `Criticism early makes them defend themselves for months. Appreciation and interest come first.`,
      },
      {
        kind: `mcq`,
        prompt: `Why did Lincoln never send his letter to General Meade?`,
        options: [
          { text: `It would have relieved him but made Meade defend himself and resent him` },
          { text: `He forgot`, why: `He chose not to.` },
          { text: `Meade had already resigned`, why: `He kept it in a drawer.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `Winning someone over, start to finish.`,
        lines: [`Begin in a friendly way`, `Find what you agree on`, `Let them do most of the talking`, `See it from their side`, `Let the solution be their idea`],
      },
      {
        kind: `mcq`,
        prompt: `What does a real smile say?`,
        options: [
          { text: `I like you, you make me happy, I'm glad to see you` },
          { text: `I want something`, why: `That's a mechanical grin.` },
          { text: `I agree with you`, why: `It says you're glad to see them.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the law of human conduct.`,
        tiles: [`Always`, `make`, `the`, `other`, `person`, `feel`, `important.`],
        distractors: [`small.`],
      },
      {
        kind: `mcq`,
        prompt: `Which did Carnegie insist every one of these rules needs?`,
        options: [
          { text: `Sincerity: they must come from the heart` },
          { text: `Charm`, why: `It's sincerity.` },
          { text: `Authority`, why: `Most of these rules work without any authority at all.` },
        ],
        answer: 0,
      },
      {
        kind: `findBug`,
        prompt: `Your plan for using what you've learned. Which line misunderstands the course?`,
        lines: [
          `Review my notes every month and keep practising.`,
          `Use these techniques on people when I need something from them.`,
          `Keep a weekly review and a record of my triumphs.`,
        ],
        bug: 1,
        fix: `Make these habits part of how I treat everyone, every day.`,
        explanation: `Carnegie said it's not a bag of tricks for getting things. It's a new way of life.`,
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your neighbour, who you've argued with for months about a fence, comes to your door, clearly upset about something else entirely. Which response best reflects the whole course?`,
        options: [
          { text: `Remind them about the fence while you have them`, why: `Your want, at their worst moment.` },
          { text: `Greet them warmly by name, listen to what's wrong with real sympathy, and offer to help, leaving the fence for another day` },
          { text: `Keep it short; you're still not on good terms`, why: `A drop of honey now could end the fence war too.` },
        ],
        answer: 1,
        explanation: `Interest, a name, listening, sympathy and a friendly start. Win the friend, and the fence will likely sort itself out.`,
      },
    ],
  },
  reflect: {
    prompt: `Final review. Look back at every triumph you've recorded. Which rule changed things most? Which do you still find hardest? Write one sentence about the person you want to be with people a year from now.`,
    starters: [`The rule that changed most for me was...`, `The rule I still find hardest is...`, `A year from now, I want to be someone who...`],
  },
  deepen: {
    title: `Review it every month`,
    summary: `Carnegie's advice for his own book: don't read it once and put it away. Review it every month, keep it near you, and use it as a working handbook for daily problems. Come back to this course whenever you face a hard conversation. The rules work every time you choose to use them.`,
  },
  notes: `Course finale: synthesis of all 30 principles (Parts One to Four) plus "Nine Suggestions" (monthly review, working handbook, record of triumphs) and Carnegie's repeated "new way of life" theme. Scenarios are ours; every rule and story comes from the book. Retold in our own words.`,
};

export default lesson;
