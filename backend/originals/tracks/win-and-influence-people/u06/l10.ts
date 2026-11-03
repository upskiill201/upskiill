import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 10 (Finale, Unit Challenge) — a family decision; Rules 16–18. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Family Decision`,
  summary: `Your family must decide whether Grandma moves in. Everyone has strong feelings, nobody agrees, and you have a plan you're sure is right. Can you get there without anyone losing?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Let people own the idea, see their side and sympathise, all at once`,
    `Reach a family decision without a winner and a loser`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Let them decide`,
      html:
        `<p>Three rules for bringing people round. Let the other person feel the idea is theirs. Try honestly to see things from their point of view. Be sympathetic with their ideas and desires.</p>` +
        `<p>Today, the hardest room of all: your own family.</p>`,
    },
    {
      kind: `story`,
      title: `Saturday morning`,
      beats: [
        { speaker: `narrator`, text: `Grandma can't manage alone any more. You're sure the best plan is for her to move into the spare room. Your sister Mei thinks a care home would be better. Your dad hasn't said much, which usually means he's upset.` },
      ],
      choice: {
        prompt: `How do you start the family talk?`,
        options: [
          { text: `Present your plan with all the reasons it's best`, outcome: `Mei argues back. Dad goes quiet. It's your plan versus hers.` },
          { text: `"We all want Grandma safe and happy, right? What does everyone think would make that work?"`, outcome: `Everyone agrees on the goal. Ideas come out, including several close to yours.`, best: true },
          { text: `Text everyone your plan first so they're prepared`, outcome: `They arrive ready to fight it.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Mei`,
      beats: [
        { speaker: `narrator`, text: `Mei says, sharply, that a care home is the only sensible option and you're being sentimental. You can feel yourself getting ready to argue.` },
      ],
      choice: {
        prompt: `What do you say?`,
        options: [
          { text: `"You just don't want the hassle."`, outcome: `Mei's hurt, and the conversation becomes about you two.` },
          { text: `"I don't blame you for feeling that. You'd be the one nearby if anything went wrong. What worries you most?"`, outcome: `Mei softens. She's frightened of being responsible for nursing care she can't give. Now you understand her side, and can plan for it.`, best: true },
          { text: `Say nothing and hope Dad backs you`, outcome: `Silence isn't sympathy. Mei still feels unheard.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Dad`,
      beats: [
        { speaker: `narrator`, text: `Finally Dad speaks. He says quietly he wonders whether Grandma could stay with you if a nurse visited twice a week, which would ease Mei's worries. It's almost exactly your plan, plus the nurse.` },
      ],
      choice: {
        prompt: `How do you respond?`,
        options: [
          { text: `"That's what I said at the start!"`, outcome: `True, and now it's your idea again, and Mei feels outvoted.` },
          { text: `"Dad, that's a really good idea, especially the nurse. Mei, would that work for you?"`, outcome: `Mei agrees. Dad's plan, the family's plan. Grandma moves in next month, and nobody lost.`, best: true },
          { text: `"Fine, whatever works."`, outcome: `It sounds like surrender. Give Dad the credit warmly.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 16 to 18.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why was "That's what I said at the start!" the wrong response to Dad?`,
        options: [
          { text: `It takes the idea back, so it's yours again, not the family's` },
          { text: `It wasn't true`, why: `It was true. That's why it's tempting.` },
          { text: `Dad hadn't finished`, why: `He had. The problem is the credit.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Their idea`, `Their point of view`, `Sympathy`],
        items: [
          { text: `Crediting Dad with the nurse plan`, group: 0 },
          { text: `Realising Mei would be the one nearby`, group: 1 },
          { text: `"I don't blame you for feeling that."`, group: 2 },
          { text: `Asking everyone what would make it work`, group: 0 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `This chapter's rules.`,
        template: `Let the other person feel the [[1]] is theirs. See things from their point of [[2]]. Be [[3]] with their ideas and desires.`,
        blanks: [[`idea`], [`view`], [`sympathetic`]],
        distractors: [`credit`, `strict`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`Wesson's unfinished sketches`, `Let it be their idea`],
          [`The boys and the campfire`, `See it from their side`],
          [`The Alcott radio slip`, `Be sympathetic`],
          [`Colonel House`, `Give away the credit`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did the Harvard dean say he'd rather do than walk into a meeting unprepared?`,
        options: [
          { text: `Walk the sidewalk outside for two hours` },
          { text: `Cancel the meeting`, why: `He'd walk outside, planning.` },
          { text: `Send a letter`, why: `He'd walk the sidewalk.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `"If I were you, I'd feel just the ________." (one word)`,
        answers: [`same`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your message to the family group chat. Which line breaks this chapter's rules?`,
        lines: [
          `Thanks everyone for such an honest talk.`,
          `Dad's nurse idea really made it work.`,
          `Glad you all finally came round to my plan.`,
        ],
        bug: 2,
        fix: `Mei, thanks for raising the care side.`,
        explanation: `It reclaims the credit and tells Mei she lost. The plan was the family's.`,
      },
      {
        kind: `orderLines`,
        prompt: `A hard group decision, in order.`,
        lines: [`Agree on the shared goal`, `Ask everyone's ideas`, `Sympathise with each worry`, `Let someone else propose the solution`, `Give them the credit`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 5): what's the yes-yes approach?`,
        options: [
          { text: `Start with questions the other person will agree with` },
          { text: `Agree with everything they say`, why: `It's getting THEM to say yes.` },
          { text: `Ask yes-or-no questions only`, why: `It's about earning yeses, not limiting answers.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what's the most important law of human conduct?`,
        options: [
          { text: `Always make the other person feel important` },
          { text: `Always be honest`, why: `Important, but not the law Carnegie named.` },
          { text: `Always be on time`, why: `No.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question that opened the family talk.`,
        tiles: [`What`, `would`, `make`, `this`, `work`, `for`, `everyone?`],
        distractors: [`me?`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your business partner wants to expand fast; you want to grow slowly. You're fairly sure you're right. Which approach uses all three rules?`,
        options: [
          { text: `Present a detailed case for slow growth`, why: `Your idea, your side, no sympathy for theirs.` },
          { text: `"I get why you're excited. It's a big opportunity. What worries you about going slower? And what would make growth safe for both of us?"` },
          { text: `Agree to expand fast to keep the peace`, why: `That's surrender, not a shared decision.` },
        ],
        answer: 1,
        explanation: `Sympathy for their excitement, curiosity about their side, and a question that lets the plan become shared.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 16 to 18: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `Nobody lost`,
    summary: `The best sign you've used this chapter well: after a hard decision, nobody feels they lost. Look back at your last big disagreement. Did someone lose? What would you do differently now?`,
  },
  notes: `Synthesis of Part Three chs. 7–9 with the weekly review. Scenario is ours. Retold in our own words.`,
};

export default lesson;
