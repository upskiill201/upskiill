import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 (Finale, Unit Challenge) — the complaint desk; Rules 13–15. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Complaint Desk`,
  summary: `You're covering the customer desk for a day. A furious regular, a customer who won't sign, and a colleague who wants to vent. Can you start right with every one of them?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Begin friendly, earn yeses and let people talk, in real situations`,
    `Turn upset people into satisfied ones`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Start right`,
      html:
        `<p>Three rules for how a conversation begins. Begin in a friendly way. Get the other person saying "yes, yes" immediately. Let the other person do a great deal of the talking.</p>` +
        `<p>Today you're covering the complaints desk. Let's see how you start.</p>`,
    },
    {
      kind: `story`,
      title: `9:15`,
      beats: [
        { speaker: `narrator`, text: `A regular customer, Mr. Haddad, storms in. His order was wrong for the second time. He slaps the receipt down and starts listing everything your company has ever done wrong.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Interrupt to explain the new system that caused the mix-up`, outcome: `He gets louder. He hasn't finished, and he won't hear a word until he has.` },
          { text: `Let him say everything, nodding, then: "Thank you for telling me. You've been with us for years and you deserve better. Let's fix it now."`, outcome: `By the end he's apologising for shouting. He leaves with the right order and a story about the person who listened.`, best: true },
          { text: `"Please calm down, sir."`, outcome: `Nobody in history has calmed down after being told to calm down.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `11:30`,
      beats: [
        { speaker: `narrator`, text: `A customer, Ms. Silva, wants to upgrade but refuses to sign up for automatic renewal. Company policy needs it for the discount, and she's already said "No" once.` },
      ],
      choice: {
        prompt: `How do you handle it?`,
        options: [
          { text: `"Sorry, no renewal, no discount. Those are the rules."`, outcome: `She walks out. The rules won, the customer lost, and so did you.` },
          { text: `"You'd like to keep the discount, right? And you'd want a reminder before any renewal, so nothing surprises you?" Yes and yes. "I can set a reminder a week before. Would that work?"`, outcome: `She signs happily. Every yes was true, and every one was about what she wanted.`, best: true },
          { text: `"Everyone signs it, it's fine."`, outcome: `Pressure. Her first "no" just got firmer.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `4:00`,
      beats: [
        { speaker: `narrator`, text: `Your colleague Joe slumps down beside you. He's had an awful day and starts telling you about it. You've had an awful day too, worse, honestly.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Tell him about your day, which was worse`, outcome: `Now two people feel unheard.` },
          { text: `Let him tell it all, ask "then what?", and save your own story`, outcome: `Twenty minutes later he says, "Thanks, I needed that." The next morning he brings you a coffee and asks about your day.`, best: true },
          { text: `Give him quick advice so you can both go home`, outcome: `He didn't want advice. Like Lincoln with his old friend, he wanted a listener.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 13 to 15.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Mr. Haddad calm down?`,
        options: [
          { text: `He was allowed to say everything, then thanked and helped` },
          { text: `He got tired`, why: `He got heard, which is different.` },
          { text: `He was given a discount`, why: `He calmed before any offer was made.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Friendly start`, `Yes, yes`, `Let them talk`],
        items: [
          { text: `"You've been with us for years and deserve better."`, group: 0 },
          { text: `"You'd want a reminder before renewal, right?"`, group: 1 },
          { text: `Asking Joe "then what?"`, group: 2 },
          { text: `Letting Mr. Haddad finish every point`, group: 2 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `This chapter's rules.`,
        template: `Begin in a [[1]] way. Get the other person saying "[[2]], yes" immediately. Let the other person do a great deal of the [[3]].`,
        blanks: [[`friendly`], [`yes`], [`talking`]],
        distractors: [`formal`, `no`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`Rockefeller in Colorado`, `Begin in a friendly way`],
          [`Allison's hot motors`, `Get them saying yes`],
          [`The laryngitis salesman`, `Let them talk`],
          [`Henrietta's colleagues`, `Let your friends excel you`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `In the fable, what got the old man's coat off?`,
        options: [
          { text: `The sun's warmth` },
          { text: `The wind's force`, why: `He only held it tighter.` },
          { text: `The rain`, why: `It was the sun.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Lincoln: a drop of ________ catches more flies than a gallon of gall. (one word)`,
        answers: [`honey`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your script for angry callers. Which line breaks this chapter's rules?`,
        lines: [
          `Thank you for calling, I'm sorry this happened.`,
          `Let me stop you there and explain our policy.`,
          `Take your time, tell me everything that went wrong.`,
        ],
        bug: 1,
        fix: `I want to understand exactly what happened.`,
        explanation: `Interrupting with policy shuts them down. Let them talk themselves out first.`,
      },
      {
        kind: `orderLines`,
        prompt: `Handling a complaint, in order.`,
        lines: [`Greet them warmly`, `Let them say everything`, `Thank them for telling you`, `Ask yes-questions about what they want`, `Agree the fix`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what did Carnegie say to the mounted policeman the second time?`,
        options: [
          { text: `"You've caught me red-handed. I'm guilty."` },
          { text: `"He's a harmless little dog."`, why: `He didn't defend himself.` },
          { text: `"I didn't see the sign."`, why: `No alibis.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): which was Schwab's greatest asset?`,
        options: [
          { text: `Arousing enthusiasm through appreciation and encouragement` },
          { text: `His knowledge of steel`, why: `Others knew more.` },
          { text: `His strictness`, why: `He was slow to criticise.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the first yes-question for Ms. Silva.`,
        tiles: [`You'd`, `like`, `to`, `keep`, `the`, `discount,`, `right?`],
        distractors: [`Sign`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. A customer emails: "Third time I've asked. Your service is a joke and I want a full refund." It's partly fair. Which reply uses all three rules?`,
        options: [
          { text: `"Per our policy, refunds are only available within 14 days."`, why: `Policy first is gall, and invites a bigger fight.` },
          { text: `"I'm really sorry you've had to ask three times; you deserve better. You'd like this sorted today, right? Could you tell me what's happened each time, so I fix the whole thing?"` },
          { text: `"Calm down, we're doing our best."`, why: `Defensive and dismissive at once.` },
        ],
        answer: 1,
        explanation: `Friendly, a true yes, and an invitation to let them tell the whole story.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 13 to 15: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `The safety valve`,
    summary: `Carnegie called letting people talk "the safety valve in handling complaints". Pressure builds until it's let out. Your job, when someone's upset, is to open the valve, not to sit on it.`,
  },
  notes: `Synthesis of Part Three chs. 4–6 with the weekly review. Scenarios are ours. Retold in our own words.`,
};

export default lesson;
