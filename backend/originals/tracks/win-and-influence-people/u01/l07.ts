import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 (Story) — Rule 3: arouse an eager want. Bait the hook to suit the fish. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `Bait the Hook for the Fish`,
  summary: `One of America's great thinkers and his son pushed and pulled a calf with all their strength, and it wouldn't budge. Then the maid walked over and did it with one finger.`,
  minutes: 11,
  outcomes: [
    `Explain the only way to get anyone to do anything`,
    `Ask "what do they want?" before "what do I want?"`,
    `Spot when a request only talks about your own wants`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `Strawberries or worms?`,
      before: {
        label: `What I like`,
        text: `Carnegie loved strawberries and cream. But when he went fishing, he didn't put strawberries on the hook.`,
      },
      after: {
        label: `What the fish likes`,
        text: `He put on a worm or a grasshopper, dangled it in front of the fish, and as good as said: wouldn't you like that?`,
      },
      notes: [
        `It's obvious with fish. Why don't we use the same sense with people?`,
        `When asked how he stayed in power while others fell, a British prime minister said he'd learned to bait the hook to suit the fish.`,
      ],
    },
    {
      kind: `story`,
      title: `Emerson and the calf`,
      beats: [
        { speaker: `narrator`, text: `One day Ralph Waldo Emerson, the famous writer and thinker, tried to get a calf into the barn with his son.` },
        { speaker: `narrator`, text: `They made the usual mistake: they thought only of what they wanted. Emerson pushed. His son pulled. And the calf did exactly what they were doing. It thought only of what it wanted. It stiffened its legs and refused to leave the field.` },
        { speaker: `narrator`, text: `The housemaid saw what was happening. She couldn't write essays or books. But on that day, at least, she had more common sense than Emerson.` },
      ],
      choice: {
        prompt: `What did she do?`,
        options: [
          { text: `Pushed harder from behind`, outcome: `That's what the two men were already doing. The calf only dug in more.` },
          { text: `Let the calf suck her finger and gently led it into the barn`, outcome: `That's it. She thought about what the calf wanted, and it walked in after her.`, best: true },
          { text: `Waited for it to get hungry`, outcome: `Close in spirit, she did think about its hunger. But she didn't wait. She used it.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The only way`,
      html:
        `<p>There is only one way under heaven to get anybody to do anything: <strong>make them want to do it.</strong> Remember, there is no other way.</p>` +
        `<p>Oh, you can force people. You can threaten an employee with the sack and get cooperation, until your back is turned. But force has ugly side effects.</p>` +
        `<p>Every act you've ever performed, you did because you wanted something. Even when you gave to charity, you did it because you wanted the feeling of helping more than you wanted the money.</p>` +
        `<p>So why talk about what you want? Of course you're interested in it. But nobody else is. The rest of us are like you: interested in what <em>we</em> want.</p>` +
        `<p>The writer Harry Overstreet put it in one line: first, arouse in the other person an eager want. Whoever can do this has the whole world with them. Whoever can't walks a lonely road.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 3: Arouse in the other person an eager want. Before you ask, stop and think: how can I make them want to do it?`,
    },
  ],
  apply: {
    scenario: `Rule 3: Arouse an eager want.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why didn't Carnegie put strawberries on his fishing hook?`,
        options: [
          { text: `He wanted them for himself`, why: `True, but that's not the lesson.` },
          { text: `Fish want worms, not what he likes` },
          { text: `Strawberries sink`, why: `The point is about wants, not weight.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Why did the calf refuse to move for Emerson and his son?`,
        options: [
          { text: `It was too heavy`, why: `The maid moved it easily.` },
          { text: `It was thinking only of what it wanted, just like them` },
          { text: `It was frightened of the barn`, why: `It walked in happily after the maid.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The only way.`,
        template: `The only way to get anybody to do anything is to make them [[1]] to do it.`,
        blanks: [[`want`]],
        distractors: [`have`, `need`],
      },
      {
        kind: `sortGroups`,
        prompt: `Whose want does each line talk about?`,
        groups: [`Mine`, `Theirs`],
        items: [
          { text: `"I really need this signed off today."`, group: 0 },
          { text: `"Signing today means your team starts on Monday."`, group: 1 },
          { text: `"I'd love more people at the gym."`, group: 0 },
          { text: `"A quick game after work clears your head."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `"Bait the hook to suit the ________." (one word)`,
        answers: [`fish`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `An invitation to a team lunch. Which line only talks about what you want?`,
        lines: [
          `Lunch is on the company this Friday.`,
          `I really want a good turnout so I don't look bad.`,
          `It's a chance to meet the new designers before the project starts.`,
        ],
        bug: 1,
        fix: `There's a vegetarian option, so everyone's covered.`,
        explanation: `Nobody cares how you look. They care what's in it for them: free food, meeting people, a break.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match the rule to the idea.`,
        pairs: [
          [`Rule 1`, `Don't criticise, condemn or complain`],
          [`Rule 2`, `Give honest, sincere appreciation`],
          [`Rule 3`, `Arouse an eager want`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question to ask before any request.`,
        tiles: [`How`, `can`, `I`, `make`, `them`, `want`, `to?`],
        distractors: [`force`],
      },
      {
        kind: `mcq`,
        prompt: `Overstreet said whoever can arouse an eager want has the whole world with them. And whoever can't?`,
        options: [
          { text: `Walks a lonely road` },
          { text: `Has to work harder`, why: `Not quite his phrase.` },
          { text: `Must use force`, why: `Force is the crude alternative, not his phrase.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `You want your teenage brother to stop vaping. Which approach follows Rule 3?`,
        options: [
          { text: `Tell him how much it worries you`, why: `That's your want, not his.` },
          { text: `Show him how it could cost him his place on the football team he loves` },
          { text: `Lecture him about the health statistics`, why: `Facts he doesn't care about won't move him.` },
        ],
        answer: 1,
        explanation: `Carnegie's own example: don't preach to a boy about smoking. Show him it might keep him off the team.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before you ask anyone for anything today, ask them what they want first, or think it through. What did they want, and how did it change your ask?`,
    starters: [`I was going to ask...`, `What they actually wanted was...`, `So I said...`],
  },
  deepen: {
    title: `Your last request`,
    summary: `Scroll back to the last message where you asked someone for something. Count how many sentences were about what you wanted, and how many were about what they wanted. Most of us are shocked by the score.`,
  },
  notes: `Source: Carnegie, Part One ch. 3: strawberries and worms, Lloyd George's "bait the hook to suit the fish", the smoking/basketball example, Emerson's calf and the Irish housemaid, Red Cross donation, Overstreet's "arouse an eager want... walks a lonely way", Part One ch. 2 opening ("only one way... make the other person want to do it"). Retold in our own words.`,
};

export default lesson;
