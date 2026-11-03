import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 (Story) — Rule 9: make the other person feel important, sincerely. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `"I Wish I Had Your Hair"`,
  summary: `A bored post office clerk, the same dull job year after year. Carnegie set himself a challenge: make that clerk like him, in the time it took to weigh one letter.`,
  minutes: 11,
  outcomes: [
    `State the most important law of human conduct`,
    `Find something to honestly admire, even in a stranger`,
    `Give importance with no strings attached`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The post office queue`,
      beats: [
        { speaker: `narrator`, text: `Carnegie was waiting in a New York post office to send a letter. The clerk looked bored: weighing envelopes, selling stamps, giving change, the same grind year after year.` },
        { speaker: `narrator`, text: `Carnegie said to himself: I'm going to make that clerk like me. To do that, I must say something nice, not about me, but about him. What is there about him I can honestly admire?` },
        { speaker: `narrator`, text: `With strangers that's sometimes hard. This time it was easy. As the clerk weighed his envelope, Carnegie said warmly: "I certainly wish I had your head of hair."` },
        { speaker: `narrator`, text: `The clerk looked up, half startled, and broke into a smile. "Well, it isn't as good as it used to be," he said. Carnegie assured him it was still magnificent. They chatted happily, and the clerk's last words were: "Many people have admired my hair."` },
      ],
      choice: {
        prompt: `When Carnegie told this story in public, a man asked him: "What did you want to get out of him?" What was Carnegie's answer?`,
        options: [
          { text: `"Faster service next time."`, outcome: `Carnegie was outraged at the very idea.` },
          { text: `"Something priceless: the feeling I'd done something for him that he could never repay."`, outcome: `That's it. If we can't give a little honest appreciation without wanting something back, he said, our souls are no bigger than sour crab apples.`, best: true },
          { text: `"I wanted to test my technique."`, outcome: `It wasn't a technique. It was a kindness.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The law`,
      html:
        `<p>There is one all-important law of human conduct. Obey it, and you'll almost never get into trouble. Break it, and you'll get into endless trouble. Here it is: <strong>always make the other person feel important.</strong></p>` +
        `<p>Philosophers have argued about human relationships for thousands of years, and only one great rule has come out of it all. Zoroaster taught it in Persia. Confucius taught it in China. Buddha taught it by the Ganges. Jesus summed it up: do to others as you would have them do to you.</p>` +
        `<p>You want the people around you to approve of you. You want your worth recognised. You don't want cheap flattery, but you crave sincere appreciation. All of us do. So give others what you'd want yourself. When? Where? All the time, everywhere.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 9: Make the other person feel important, and do it sincerely.`,
    },
  ],
  apply: {
    scenario: `Rule 9: Make them feel important.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Carnegie admire about the post office clerk?`,
        options: [
          { text: `His speed`, why: `It was something more personal.` },
          { text: `His head of hair` },
          { text: `His handwriting`, why: `It was his hair.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did Carnegie want from the clerk?`,
        options: [
          { text: `Better service`, why: `He wanted nothing material at all.` },
          { text: `The feeling of having done something for him that couldn't be repaid` },
          { text: `A discount on stamps`, why: `The very idea offended him.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The all-important law.`,
        template: `Always make the other person feel [[1]].`,
        blanks: [[`important`]],
        distractors: [`grateful`, `small`],
      },
      {
        kind: `typeAnswer`,
        prompt: `People who want something back for every kindness have souls no bigger than sour crab ________. (one word)`,
        answers: [`apples`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Sincere importance or strings attached?`,
        groups: [`Sincere`, `Strings attached`],
        items: [
          { text: `Telling the bus driver you appreciate their calm driving`, group: 0 },
          { text: `Praising your landlord's taste right before asking for a rent cut`, group: 1 },
          { text: `Thanking the IT person who fixed your laptop`, group: 0 },
          { text: `Complimenting a stranger so they'll swap seats with you`, group: 1 },
        ],
      },
      {
        kind: `findBug`,
        prompt: `Which statement gets Rule 9 wrong?`,
        lines: [
          `Everyone wants to feel important in their little world.`,
          `It works best with powerful people, so focus on them.`,
          `Do it all the time, everywhere.`,
        ],
        bug: 1,
        fix: `It matters most to people who rarely get it.`,
        explanation: `Carnegie practised it on a bored post office clerk. Everyone, everywhere.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each teacher to the land where they taught the same rule.`,
        pairs: [
          [`Zoroaster`, `Persia`],
          [`Confucius`, `China`],
          [`Buddha`, `The banks of the Ganges`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 4): what's the royal road to a person's heart?`,
        options: [
          { text: `Talking about the things they treasure most` },
          { text: `Gifts`, why: `Not according to Roosevelt's method.` },
          { text: `Agreeing with everything they say`, why: `That's not it.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question Carnegie asked himself in the queue.`,
        tiles: [`What`, `can`, `I`, `honestly`, `admire`, `about`, `them?`],
        distractors: [`get`],
      },
      {
        kind: `mcq`,
        prompt: `A tired cashier at the end of a long shift is short with you. What does Rule 9 suggest?`,
        options: [
          { text: `Be equally short back`, why: `That's the homing pigeon again.` },
          { text: `Find something honest to appreciate and say it warmly` },
          { text: `Complain to the manager`, why: `They're having a hard day. Rule 9 can change it.` },
        ],
        answer: 1,
        explanation: `The post office clerk was bored and flat too, until someone made him feel important.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: make a stranger's day with one honest compliment, wanting nothing back. Who was it, what did you say, and how did their face change?`,
    starters: [`I said to a stranger...`, `Their face...`, `It made me feel...`],
  },
  deepen: {
    title: `All the time, everywhere`,
    summary: `For one day, try to leave every person you deal with feeling a little more important than before you met. Notice how the day goes.`,
  },
  notes: `Source: Carnegie, Part Two ch. 6 "How to Make People Like You Instantly": the post office clerk at 33rd and 8th ("I wish I had your head of hair"), "What did you want to get out of him?", sour crab apples, the law of human conduct, Zoroaster/Confucius/Lao-tse/Buddha/Hinduism/Jesus and the Golden Rule. Retold in our own words.`,
};

export default lesson;
