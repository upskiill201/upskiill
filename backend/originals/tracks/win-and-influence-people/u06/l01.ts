import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 1 (Story) — Rule 16: let the other person feel the idea is theirs. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: `The Idea Must Be Theirs`,
  summary: `Once a week for three years, a salesman showed a top fashion buyer his designs. A hundred and fifty times the buyer looked carefully and said no. Then the salesman walked in with sketches that weren't even finished.`,
  minutes: 11,
  outcomes: [
    `Explain why people trust ideas they find themselves`,
    `Ask for input instead of pushing a finished idea`,
    `Turn a pitch into an invitation to help`,
  ],
  learn: [
    {
      kind: `story`,
      title: `150 failures`,
      beats: [
        { speaker: `narrator`, text: `Eugene Wesson sold sketches from a design studio to stylists and textile makers. For three years he called on one leading New York stylist every week. The man always saw him, studied the sketches carefully, and always said: "No, Wesson, I guess we don't get together today."` },
        { speaker: `narrator`, text: `After 150 failures, Wesson decided he was stuck in a rut. He started spending one evening a week studying how to influence people, and came up with a new plan.` },
        { speaker: `narrator`, text: `He grabbed half a dozen unfinished sketches and hurried to the buyer's office. "I'd like you to do me a small favour," he said. "These sketches aren't finished. Would you tell me how we could finish them so they'd be useful to you?"` },
      ],
      choice: {
        prompt: `What happened?`,
        options: [
          { text: `The buyer said no, as usual`, outcome: `Not this time.` },
          { text: `The buyer kept them for a few days, gave his ideas, and bought every one finished his way, then scores more`, outcome: `That's it. Wesson said: I'd been urging him to buy what I thought he should have. Now he felt he was creating the designs. And he was. I didn't have to sell him. He bought.`, best: true },
          { text: `The buyer finished them himself`, outcome: `He gave his ideas; Wesson's studio finished them. And he bought them all.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Ideas you find yourself`,
      html:
        `<p>Don't you have much more faith in ideas you discover yourself than in ideas handed to you on a plate? Then isn't it bad judgement to ram your opinions down other people's throats? Isn't it wiser to make suggestions, and let the other person think it through?</p>` +
        `<p>Nobody likes feeling they're being sold something or told to do something. We much prefer to feel we're buying of our own accord or acting on our own ideas. We like to be consulted about our wishes, our wants and our thoughts.</p>`,
    },
    {
      kind: `compare`,
      title: `The blackboard`,
      before: {
        label: `A tired sales team`,
        text: `Adolph Seltz managed a car showroom with a discouraged, disorganised sales team. He needed to fire them up.`,
      },
      after: {
        label: `What he asked`,
        text: `At a meeting he asked them what they expected from him, and wrote every answer on a blackboard. Then: "I'll give you all of these. Now, what do I have a right to expect from you?" Loyalty, honesty, initiative, teamwork, eight hours of enthusiastic work. One volunteered for fourteen hours a day. Sales soared.`,
      },
      notes: [
        `They'd made a kind of moral bargain with him, Seltz said, and as long as he kept his side, they kept theirs.`,
        `Being consulted was the shot in the arm they needed.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 16: Let the other person feel that the idea is theirs. Ask for their input, and let them help shape it.`,
    },
  ],
  apply: {
    scenario: `Rule 16: Let it be their idea.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How many times did the buyer turn Wesson down?`,
        options: [
          { text: `About 15`, why: `Ten times more.` },
          { text: `About 150` },
          { text: `Just once`, why: `It was weekly for three years.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did Wesson bring on his new visit?`,
        options: [
          { text: `His best finished sketches`, why: `He'd tried that 150 times.` },
          { text: `Unfinished sketches, asking how to finish them` },
          { text: `A discount`, why: `He brought a request for help.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What Wesson realised.`,
        template: `I didn't have to [[1]] him. He [[2]].`,
        blanks: [[`sell`], [`bought`]],
        distractors: [`ask`, `left`],
      },
      {
        kind: `sortGroups`,
        prompt: `Lets it be their idea, or hands them yours?`,
        groups: [`Their idea`, `Your idea`],
        items: [
          { text: `"How would you finish this?"`, group: 0 },
          { text: `"Here's the final plan, please approve."`, group: 1 },
          { text: `"What do you expect from me as your manager?"`, group: 0 },
          { text: `"I've decided we'll do it this way."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Where did Seltz write his team's answers? On a ________. (one word)`,
        answers: [`blackboard`, `board`, `whiteboard`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Introducing a new idea to your team. Which line kills their ownership?`,
        lines: [
          `I've sketched a rough idea for the new rota.`,
          `It's not finished, and I'd love your input before we decide.`,
          `But honestly, I've already decided, so just tell me if it's fine.`,
        ],
        bug: 2,
        fix: `What would you change to make it work for you?`,
        explanation: `It turns an invitation into a formality. People can tell when their input won't change anything.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they let others own the idea.`,
        pairs: [
          [`Eugene Wesson`, `Asked how to finish the sketches`],
          [`Adolph Seltz`, `Wrote the team's expectations on the board`],
          [`Emerson`, `We love our own thoughts coming back to us`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 5): what did Socrates never do?`,
        options: [
          { text: `Tell people they were wrong` },
          { text: `Ask questions`, why: `Questions were his method.` },
          { text: `Win arguments`, why: `He won people round, just never by saying "you're wrong".` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build Wesson's request.`,
        tiles: [`How`, `could`, `we`, `finish`, `these`, `so`, `you`, `could`, `use`, `them?`],
        distractors: [`buy`],
      },
      {
        kind: `mcq`,
        prompt: `You want your family to switch to a cheaper phone plan. Which approach follows Rule 16?`,
        options: [
          { text: `Choose the plan and announce it at dinner`, why: `An order. Expect resistance.` },
          { text: `Show the bills, ask "How could we cut this?" and let them suggest the switch` },
          { text: `Switch it quietly and tell them later`, why: `They'll resent it even if it's smart.` },
        ],
        answer: 1,
        explanation: `Let them stir the idea themselves, and it becomes theirs, like the cereal in Chapter 1.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: take one idea you were going to present finished, and instead ask someone to help improve it. What did they add, and how did they feel about it afterwards?`,
    starters: [`My idea was...`, `I asked... to improve it`, `They added...`],
  },
  deepen: {
    title: `Rejected thoughts`,
    summary: `Emerson wrote that in every work of genius we recognise our own rejected thoughts, coming back to us with a kind of majesty. People love ideas that feel like their own. Let yours come back to them that way.`,
  },
  notes: `Source: Carnegie, Part Three ch. 7 "How to Get Cooperation": opening argument, Adolph Seltz's blackboard meeting (fourteen hours, "moral bargain"), Eugene Wesson's 150 failures and the unfinished sketches, Emerson's "Self-Reliance" quote. Retold in our own words.`,
};

export default lesson;
