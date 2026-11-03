import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 (Finale, Unit Challenge) — a heated meeting; Rules 10–12. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Heated Meeting`,
  summary: `A project review that's about to boil over. A colleague attacks your plan, your boss gets a number wrong, and the mistake everyone's angry about turns out to be yours. Can you come out with the project and the people?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Avoid arguments, respect opinions and admit mistakes in one meeting`,
    `Keep goodwill when the stakes are high`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Never fight`,
      html:
        `<p>Three rules for keeping the peace. The only way to get the best of an argument is to avoid it. Show respect for the other person's opinions; never say "you're wrong". If you're wrong, admit it quickly and emphatically.</p>` +
        `<p>Today, a project review that's already tense before anyone sits down.</p>`,
    },
    {
      kind: `story`,
      title: `10:00`,
      beats: [
        { speaker: `narrator`, text: `Your colleague Dmitri opens by saying your launch plan is "completely unrealistic" and the deadline is fantasy. You think he's wrong, and you're stung.` },
      ],
      choice: {
        prompt: `How do you respond?`,
        options: [
          { text: `"Actually, Dmitri, if you'd read the plan properly..."`, outcome: `He digs in. Forty minutes of argument, two camps, and nobody remembers what the meeting was for.` },
          { text: `"You might be right that it's tight. Which part worries you most?"`, outcome: `He's surprised, and calms down. He points to one risk you hadn't considered. You fix it together, and he backs the plan.`, best: true },
          { text: `Say nothing, then complain about him afterwards`, outcome: `The plan stalls, and you've broken Rule 1 as well.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `10:25`,
      beats: [
        { speaker: `narrator`, text: `Your boss, Fatima, says the budget is forty thousand. It's actually fifty thousand, and the difference changes the whole conversation. The room is full of senior people.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `"Sorry, that's wrong, it's fifty."`, outcome: `You're right. Fatima's face tightens. The room goes cold, and she's short with you for weeks.` },
          { text: `"I may have an older version, but I had fifty in my notes. Shall we check?"`, outcome: `Fatima checks, says "Good catch, it is fifty," and the meeting moves on. She thanks you afterwards.`, best: true },
          { text: `Let it go, even though it changes the decision`, outcome: `Rule 10 is for harmless points. This one matters, so raise it, gently.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `10:50`,
      beats: [
        { speaker: `narrator`, text: `The group turns to last month's delay, which everyone's angry about. As people look for who to blame, you realise it started with an approval you forgot to send.` },
      ],
      choice: {
        prompt: `What do you say?`,
        options: [
          { text: `Nothing; the blame is spread around anyway`, outcome: `Someone else takes the heat. You know, and sooner or later so will they.` },
          { text: `"That was me. I forgot to send the approval. No excuse. Here's how I'll make sure it never happens again."`, outcome: `The room relaxes. Dmitri says it could have happened to anyone. Fatima trusts you with the next launch.`, best: true },
          { text: `"Well, the approval process is confusing."`, outcome: `True, perhaps. But it's an alibi, and everyone hears it as one.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 10 to 12.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did "You might be right that it's tight" calm Dmitri down?`,
        options: [
          { text: `There was nothing left to fight when you agreed with part of it` },
          { text: `He was tired`, why: `He was ready for a fight, until you agreed.` },
          { text: `He felt sorry for you`, why: `It was agreement, not pity.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Avoid the argument`, `Respect their opinion`, `Admit you're wrong`],
        items: [
          { text: `Letting a harmless wrong date go at lunch`, group: 0 },
          { text: `"I may have an older version. Shall we check?"`, group: 1 },
          { text: `"That was me. No excuse."`, group: 2 },
          { text: `"Which part worries you most?"`, group: 0 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `This chapter's rules.`,
        template: `The only way to get the best of an argument is to [[1]] it. Never say "You're [[2]]." If you're wrong, admit it quickly and [[3]].`,
        blanks: [[`avoid`], [`wrong`], [`emphatically`]],
        distractors: [`win`, `quietly`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`The Hamlet quotation`, `Avoid the argument`],
          [`Franklin's banned words`, `Respect their opinion`],
          [`The mounted policeman`, `Admit it first`],
          [`The lumber inspector`, `Questions, not "you're wrong"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `When should you raise a mistake someone else made, rather than let it go?`,
        options: [
          { text: `When it actually matters to the outcome, and then gently` },
          { text: `Always, the truth matters`, why: `Harmless mistakes at a party aren't worth a wounded pride.` },
          { text: `Never`, why: `Rule 10 is for harmless points. Important ones must be raised, respectfully.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Franklin replaced "certainly" with "it seems to me at ________". (one word)`,
        answers: [`present`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your follow-up email after the meeting. Which line undoes your good work?`,
        lines: [
          `Thanks all, especially Dmitri for spotting the risk.`,
          `Sorry again for the approval mix-up, that was on me.`,
          `Though I still think most of the delay was the vendor's fault.`,
        ],
        bug: 2,
        fix: `New checklist attached so it can't happen again.`,
        explanation: `It takes back the admission. Own it fully and move to the fix.`,
      },
      {
        kind: `orderLines`,
        prompt: `When someone attacks your plan, in order.`,
        lines: [`Distrust your first defensive reaction`, `Agree with what you honestly can`, `Ask what worries them most`, `Fix it together`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did the woollens owner do with the furious customer who swore he didn't owe money?`,
        options: [
          { text: `Let him talk himself out, then thanked him` },
          { text: `Proved the debt with records`, why: `He cancelled the charge instead.` },
          { text: `Sent him to the credit department`, why: `The credit department was the problem.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what does a real smile say?`,
        options: [
          { text: `I'm glad to see you` },
          { text: `I want something`, why: `That's a mechanical grin.` },
          { text: `I'm in charge`, why: `Not at all.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the line that got Fatima to check the figure.`,
        tiles: [`I`, `may`, `have`, `an`, `older`, `version.`, `Shall`, `we`, `check?`],
        distractors: [`wrong.`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. A client emails, furious, blaming you for a problem that's partly your fault and partly theirs. Which reply uses all three rules?`,
        options: [
          { text: `List exactly which parts were their fault`, why: `You'll win the argument and lose the client.` },
          { text: `Admit your part plainly, say you may have misunderstood their side, and suggest a call to fix it together` },
          { text: `Apologise for everything, including their part`, why: `Owning more than your share can confuse the real fix.` },
        ],
        answer: 1,
        explanation: `Admit your part emphatically, respect their view, and turn the argument into a shared problem.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 10 to 12: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `Agree with thine adversary`,
    summary: `Two thousand years ago it was said: agree with your adversary quickly. Four thousand years ago an Egyptian king told his son: be diplomatic, it will help you gain your point. Nothing in this chapter is new. That's why it works.`,
  },
  notes: `Synthesis of Part Three chs. 1–3 with the weekly review. Closing references: "Agree with thine adversary quickly" and King Akhtoi of Egypt, both cited in Part Three ch. 2. Scenarios are ours. Retold in our own words.`,
};

export default lesson;
