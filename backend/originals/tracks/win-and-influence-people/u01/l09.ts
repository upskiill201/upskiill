import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 (Pressure) — Rule 3 when nothing else works: let them stir the cereal. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `Let Them Stir the Cereal`,
  summary: `A five-year-old screams that he will not go to kindergarten. His father could send him to his room. Instead he asks himself one question, and the next morning the boy is up before anyone else.`,
  minutes: 12,
  outcomes: [
    `Arouse an eager want when orders and pleading have failed`,
    `Let people feel an idea is their own`,
    `Make sure both sides gain, so it's never manipulation`,
  ],
  learn: [
    {
      kind: `story`,
      title: `"I won't go!"`,
      beats: [
        { speaker: `narrator`, text: `Stan came home one evening to find his youngest son, Tim, kicking and screaming on the living-room floor. Tim was starting kindergarten the next day, and he would not go.` },
        { speaker: `narrator`, text: `Stan's usual move would have been to send him to his room and tell him he had no choice. But that night he stopped and asked himself: if I were Tim, why would I be excited about kindergarten?` },
        { speaker: `narrator`, text: `He and his wife made a list of all the fun things Tim would do: finger painting, singing, making new friends. Then the whole family sat at the kitchen table and started finger painting, laughing and having a grand time. Soon Tim was peeping round the corner. Then he was begging to join in.` },
      ],
      choice: {
        prompt: `What did Stan say when Tim begged to paint?`,
        options: [
          { text: `"Of course, come and join us!"`, outcome: `Kind, but it would have used up the want. Stan did something cleverer.` },
          { text: `"Oh no! You have to go to kindergarten first to learn how to finger-paint."`, outcome: `That's it. The next morning Stan found Tim asleep in a chair downstairs, already waiting. He didn't want to be late.`, best: true },
          { text: `"Only if you promise to go tomorrow."`, outcome: `A deal works for a day. A want works for a year.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Two more stubborn children`,
      html:
        `<p>A father couldn't get his three-year-old to eat. Scolding, nagging, "Mummy wants you to eat this." Nothing. Then he asked: what does my boy want? The answer was easy. A bigger boy down the street kept pulling him off his tricycle. When the father explained that eating properly would one day make him big enough to stand up to that bully, the eating problem vanished.</p>` +
        `<p>Another couple couldn't get their little girl to eat her breakfast cereal. She loved feeling grown-up, like her mother. So one morning they let her make the cereal herself. When her father wandered in, she announced proudly that she was making breakfast, and ate two helpings.</p>` +
        `<p>Why can't we do this at work? When you have a brilliant idea, instead of handing it over as yours, let the other person stir it themselves. They'll think of it as their own. They'll like it, and perhaps go back for a second helping.</p>`,
    },
    {
      kind: `compare`,
      title: `Andrew Carnegie's postscript`,
      before: {
        label: `What the mother tried`,
        text: `Andrew Carnegie's sister-in-law was frantic. Her two sons at university never wrote home, however many letters she sent begging them to.`,
      },
      after: {
        label: `What Carnegie tried`,
        text: `He bet he could get a reply by return post without asking for one. He wrote the boys a chatty letter and mentioned at the end he was sending each of them five dollars. He didn't enclose the money. Replies came straight back, thanking dear Uncle Andrew, and you can guess the rest.`,
      },
      notes: [
        `Begging talked about what she wanted. Carnegie talked about what they wanted.`,
        `Funny, yes. But notice the rule: no request at all, and still an answer.`,
      ],
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `This is not manipulation. Arousing an eager want only works, and only stays honest, when the other person truly gains too.`,
    },
  ],
  apply: {
    scenario: `Rule 3, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What question did Stan ask himself instead of sending Tim to his room?`,
        options: [
          { text: `How do I make him obey?`, why: `That's the order he decided not to give.` },
          { text: `If I were Tim, why would I be excited about kindergarten?` },
          { text: `What punishment will work?`, why: `He wanted Tim to go happily, not fearfully.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Where did Stan find Tim the next morning?`,
        options: [
          { text: `Hiding under his bed`, why: `Quite the opposite.` },
          { text: `Asleep in a chair downstairs, waiting to go` },
          { text: `Still crying in his room`, why: `The want had done its work overnight.` },
        ],
        answer: 1,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each child to the want that worked.`,
        pairs: [
          [`Tim`, `Finger painting and new friends`],
          [`The boy who wouldn't eat`, `Being big enough to face the bully`],
          [`The girl and the cereal`, `Feeling grown-up by making it herself`],
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Andrew Carnegie's trick.`,
        template: `He wrote that he was sending five [[1]], and didn't [[2]] the money.`,
        blanks: [[`dollars`], [`enclose`, `include`]],
        distractors: [`pounds`, `spend`],
      },
      {
        kind: `sortGroups`,
        prompt: `Honest eager want, or manipulation?`,
        groups: [`Honest: both gain`, `Manipulation: only you gain`],
        items: [
          { text: `Showing a teammate how a course will help their promotion`, group: 0 },
          { text: `Promising a bonus you know won't come`, group: 1 },
          { text: `Letting your team shape the plan so it's theirs too`, group: 0 },
          { text: `Inventing a deadline so a client panics and signs`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Let them stir the ________ themselves, and they'll eat two helpings. (one word)`,
        answers: [`cereal`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `You want your team to try a new planning tool. Which line kills the eager want?`,
        lines: [
          `Here are two tools that could cut our Monday meeting in half.`,
          `Have a play and tell me which one you'd pick.`,
          `Either way, I've already bought the first one, so get used to it.`,
        ],
        bug: 2,
        fix: `Whatever you choose, we'll use it from next sprint.`,
        explanation: `"Get used to it" turns their choice into your order. Let them stir the idea, and it becomes theirs.`,
      },
      {
        kind: `orderLines`,
        prompt: `When orders have failed, in order:`,
        lines: [`Stop pushing`, `Ask what they want`, `Show how your idea gets them there`, `Let them take it as their own`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 6): what's the best way to find something to praise in someone who annoys you?`,
        options: [
          { text: `Praise everyone equally`, why: `General praise sounds like flattery.` },
          { text: `Ask what they're better at than you are` },
          { text: `Wait until they finally do something perfect`, why: `The janitor was praised for the good moments he already had.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Your housemates won't do a weekly clean, despite rotas and reminders. Which move follows this lesson?`,
        options: [
          { text: `Put up a stricter rota with fines`, why: `More force. You already know how that ends.` },
          { text: `Ask what they'd want from the place, like having friends over, and plan the clean around that` },
          { text: `Do it yourself and say nothing`, why: `That's silent resentment, and the habit stays.` },
        ],
        answer: 1,
        explanation: `Find what THEY want, a flat they're proud to invite people to, and let the clean be their idea.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: think of one thing you've been nagging someone about. Ask yourself, as Stan did: "If I were them, why would I want to do this?" Write their answer, then try it.`,
    starters: [`I've been nagging... about...`, `If I were them, I'd want it because...`],
  },
  deepen: {
    title: `How can I make them want to?`,
    summary: `Write this question on a sticky note: "How can I make this person want to do it?" Put it where you write messages. It will stop you rushing in with talk about your own wants.`,
  },
  notes: `Source: Carnegie, Part One ch. 3: Stan Novak and Tim's kindergarten, the underweight boy and the tricycle bully, K. T. Dutschmann's daughter making the cereal, "let them cook and stir the idea", Andrew Carnegie's nephews and the five-dollar postscript, the note that each party should gain. Retold in our own words.`,
};

export default lesson;
