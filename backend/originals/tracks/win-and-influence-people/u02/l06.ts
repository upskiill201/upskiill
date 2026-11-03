import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 (Pressure) — Rule 5 when you don't feel like it: act your way into cheerfulness. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `When You Don't Feel Like Smiling`,
  summary: `Bad day, tired, nervous, lonely. "How can I smile when I don't feel like it?" A great psychologist had an answer that sounds backwards, and works.`,
  minutes: 11,
  outcomes: [
    `Use action to change how you feel`,
    `Go first, instead of waiting for others to warm up`,
    `See happiness as a matter of attitude, not circumstance`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Act as if`,
      html:
        `<p>You don't feel like smiling? Then do two things. First, make yourself smile. If you're alone, whistle or hum a tune. Act as if you were already happy, and that will tend to make you happy.</p>` +
        `<p>The psychologist William James explained why. It seems as if feelings come first and actions follow. But really they go together. And since we can control our actions directly, and our feelings only indirectly, we can change the feeling by changing the action.</p>` +
        `<p>So the surest road to cheerfulness, if you've lost it, is to sit up, act and speak as if you were already cheerful.</p>` +
        `<p>Happiness doesn't depend on outward conditions. Two people can be in the same place, doing the same job, with the same money, and one is miserable and the other happy. The difference is attitude. Shakespeare said nothing is good or bad, but thinking makes it so. Lincoln said most people are about as happy as they make up their minds to be.</p>` +
        `<p>Carnegie once climbed the steps of a New York station behind a group of thirty or forty boys on crutches and canes. He was astonished by their laughter. The man in charge told him that once the boys got over the first shock of knowing they'd never walk normally, most became as happy as any other boys. Carnegie said he felt like taking his hat off to them.</p>`,
    },
    {
      kind: `story`,
      title: `The water cooler`,
      beats: [
        { speaker: `narrator`, text: `Maria Gonzalez started a job in Guadalajara where she worked alone in a closed-off office. She could hear the other staff chatting and laughing, and envied them. When she passed them in the corridor she looked shyly away.` },
        { speaker: `narrator`, text: `After a few weeks she said to herself: Maria, you can't expect those women to come to you. You have to go and meet them.` },
      ],
      choice: {
        prompt: `What did she do the next time she walked to the water cooler?`,
        options: [
          { text: `Waited for someone to say hello first`, outcome: `That's what she'd done for weeks, and nothing changed.` },
          { text: `Put on her brightest smile and said "Hi, how are you today?" to everyone she met`, outcome: `That's it. Smiles and hellos came straight back. Some became friendships, and her whole job felt brighter.`, best: true },
          { text: `Asked her manager to move her desk`, outcome: `She didn't need a new desk. She needed to go first.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Feelings follow actions. Don't wait to feel friendly before you smile. Smile, and the feeling catches up.`,
    },
  ],
  apply: {
    scenario: `Rule 5, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did William James say about feelings and actions?`,
        options: [
          { text: `Feelings always come first`, why: `That's how it seems, but he said they go together.` },
          { text: `They go together, and changing the action changes the feeling` },
          { text: `Actions don't affect feelings`, why: `His whole point was that they do.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `Lincoln on happiness.`,
        template: `Most people are about as [[1]] as they make up their [[2]] to be.`,
        blanks: [[`happy`], [`minds`]],
        distractors: [`rich`, `hearts`],
      },
      {
        kind: `mcq`,
        prompt: `What did Maria tell herself before she changed?`,
        options: [
          { text: `"They don't like me."`, why: `That's the thought that kept her shy.` },
          { text: `"You can't expect them to come to you. You have to go and meet them."` },
          { text: `"I'll wait for a better job."`, why: `She made this one better instead.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Acting your way to a better mood, or waiting for one?`,
        groups: [`Acting your way there`, `Waiting for it`],
        items: [
          { text: `Humming on the walk to a hard meeting`, group: 0 },
          { text: `"I'll be friendly once people are friendly to me."`, group: 1 },
          { text: `Sitting up straight and greeting people warmly when tired`, group: 0 },
          { text: `Scrolling until you feel like talking`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Shakespeare: nothing is good or bad, but ________ makes it so. (one word)`,
        answers: [`thinking`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Which belief keeps you stuck?`,
        lines: [
          `I can change my mood by changing what I do.`,
          `Happiness depends mostly on my attitude.`,
          `I can only be friendly once I feel friendly.`,
        ],
        bug: 2,
        fix: `If I act friendly, the feeling usually follows.`,
        explanation: `That belief puts your mood in charge. Act first, and the feeling catches up.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their lesson.`,
        pairs: [
          [`William James`, `Change the action, change the feeling`],
          [`Maria Gonzalez`, `Go first with a smile`],
          [`The boys on crutches`, `Happiness is an attitude, not a circumstance`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): you're about to criticise someone. Which question should you ask yourself first?`,
        options: [
          { text: `"Is something making this hard for them?"` },
          { text: `"How can I make my point stick?"`, why: `That's still planning the criticism.` },
          { text: `"Who else should hear about this?"`, why: `That's complaining.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the advice.`,
        tiles: [`Act`, `as`, `if`, `you`, `were`, `already`, `happy.`],
        distractors: [`never`],
      },
      {
        kind: `mcq`,
        prompt: `You've just moved city, know nobody at work, and feel low. What does this lesson suggest for Monday?`,
        options: [
          { text: `Keep your head down until you feel settled`, why: `That's how Maria spent her first weeks, alone.` },
          { text: `Smile and say a cheerful hello to everyone you pass, even if you don't feel it yet` },
          { text: `Wait for HR to organise a welcome lunch`, why: `Waiting puts your happiness in someone else's hands.` },
        ],
        answer: 1,
        explanation: `Act cheerful, go first, and both the feeling and the friendships tend to follow.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: today, say hello first to someone you usually pass in silence. Do it with a real smile, even if you don't feel like it. How did you feel afterwards?`,
    starters: [`I usually pass... without a word`, `When I said hello...`, `Afterwards I felt...`],
  },
  deepen: {
    title: `No shop without a smile`,
    summary: `An old Chinese proverb says a man without a smiling face must not open a shop. Whatever your "shop" is, a team, a classroom, a front desk, open it with a smile tomorrow.`,
  },
  notes: `Source: Carnegie, Part Two ch. 2: "force yourself to smile", William James on action and feeling, happiness depends on inner conditions, Shakespeare and Lincoln quotes, the boys at the Long Island Railroad station (wording modernised), Señora Maria Gonzalez of Guadalajara, Chinese proverb. Retold in our own words.`,
};

export default lesson;
