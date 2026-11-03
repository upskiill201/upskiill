import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 (Finale, Unit Challenge) — first week somewhere new, Rules 4–6. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The First Week`,
  summary: `Your first week in a new job. A room full of strangers, a name you can't pronounce, and a colleague nobody talks to. How quickly can you be welcome anywhere?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Use interest, a smile and names together`,
    `Make a strong first impression without trying to impress`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Welcome anywhere`,
      html:
        `<p>Three more rules. Become genuinely interested in other people. Smile. Remember that a person's name is the sweetest sound to them.</p>` +
        `<p>Put them together and you'll be welcome anywhere: a new job, a new city, a party where you know nobody. Let's see how they hold up in your first week.</p>`,
    },
    {
      kind: `story`,
      title: `Monday, 9 a.m.`,
      beats: [
        { speaker: `narrator`, text: `Your manager walks you round the office and introduces you to eight people in five minutes. The fourth is a designer called Oluwaseun. You didn't quite catch it.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Nod, smile and move on; you'll work it out later`, outcome: `You won't. By Friday you're avoiding saying it at all.` },
          { text: `"Sorry, I didn't catch that properly, could you say it again?" then use it: "Great to meet you, Oluwaseun."`, outcome: `They light up. Later they tell you most people give up and call them "Seun" without asking.`, best: true },
          { text: `"Can I just call you Sean?"`, outcome: `Nicodemus Papadoulos heard that for fifteen years. Don't be the sixteenth.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Wednesday, lunch`,
      beats: [
        { speaker: `narrator`, text: `You sit with a group at lunch. You're nervous and itching to prove you deserve the job. Someone asks where you worked before.` },
      ],
      choice: {
        prompt: `How do you handle it?`,
        options: [
          { text: `Tell them about your three biggest wins in detail`, outcome: `They nod politely. You were trying to be interesting.` },
          { text: `Answer in a sentence, then ask them how they ended up here and what they enjoy about it`, outcome: `Twenty minutes later you know everyone's story, and they leave thinking you're great company.`, best: true },
          { text: `Say very little in case you say the wrong thing`, outcome: `Safe, but you're still a stranger on Friday.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Friday, 5 p.m.`,
      beats: [
        { speaker: `narrator`, text: `You notice an older colleague, Walter, who eats alone and barely speaks in meetings. People walk straight past his desk. You're tired and ready for the weekend.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Head home; you'll get to know him eventually`, outcome: `Eventually rarely comes.` },
          { text: `Stop by with a real smile: "Have a good weekend, Walter. What are you up to?"`, outcome: `He tells you about restoring an old boat. On Monday he's the one who helps you untangle a problem nobody else understood.`, best: true },
          { text: `Send a group message wishing everyone a good weekend`, outcome: `Friendly, but it doesn't reach Walter. Nothing with "everyone" in it does.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 4 to 6.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did asking questions at lunch work better than sharing your wins?`,
        options: [
          { text: `People are more interested in themselves than in you` },
          { text: `Your wins weren't impressive enough`, why: `It wouldn't matter how impressive they were.` },
          { text: `Questions are more polite`, why: `They're more than polite. They make people feel interesting.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Interest`, `Smile`, `Name`],
        items: [
          { text: `Asking how Walter got into boats`, group: 0 },
          { text: `Greeting the receptionist warmly every morning`, group: 1 },
          { text: `Asking Oluwaseun to repeat their name`, group: 2 },
          { text: `Remembering a colleague's dog's name and asking after it`, group: 0 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The three rules of this chapter.`,
        template: `Become genuinely [[1]] in other people. [[2]]. Remember that a person's [[3]] is the sweetest sound to them.`,
        blanks: [[`interested`], [`Smile`, `smile`], [`name`]],
        distractors: [`important`, `job`],
      },
      {
        kind: `mcq`,
        prompt: `What did Tippy the dog know?`,
        options: [
          { text: `Two months of interest beats two years of trying to be interesting` },
          { text: `Loyalty is everything`, why: `True of dogs, but not the lesson.` },
          { text: `Patience wins friends`, why: `He didn't wait. He ran to meet people.` },
        ],
        answer: 0,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their story.`,
        pairs: [
          [`Howard Thurston`, `"I love my audience"`],
          [`Maria Gonzalez`, `Went first at the water cooler`],
          [`Jim Farley`, `Letters signed simply "Jim"`],
          [`Andrew Carnegie`, `Rabbits named after children`],
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `William James: change the ________ and the feeling follows. (one word)`,
        answers: [`action`, `actions`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your intro message to your new team. Which line works against you?`,
        lines: [
          `Hi all, I'm Kim, really happy to be joining you.`,
          `Fair warning, I'm hopeless with names, so don't take it personally.`,
          `I'd love to hear what each of you is working on this month.`,
        ],
        bug: 1,
        fix: `I'm going to learn everyone's name this week, so forgive me if I ask twice.`,
        explanation: `It tells them in advance their names aren't worth your effort. Promise to try instead.`,
      },
      {
        kind: `orderLines`,
        prompt: `Meeting someone new, all three rules, in order.`,
        lines: [`Smile as you meet them`, `Catch their name and say it back`, `Ask about them`, `Use their name again as you leave`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): your new manager makes a mistake in front of the team. What should you avoid?`,
        options: [
          { text: `Pointing it out sharply in public` },
          { text: `Asking a question about it privately later`, why: `That's a fine way to raise it.` },
          { text: `Assuming they had a reason`, why: `That's exactly the right instinct.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Why did Sid Levy's greeting bring Mr. Papadoulos to tears?`,
        options: [
          { text: `Nobody had ever made the effort to say his real name` },
          { text: `Levy mispronounced it`, why: `He'd practised it carefully.` },
          { text: `It was his birthday`, why: `It was his name, not the date.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the line to say to Walter on Friday.`,
        tiles: [`Have`, `a`, `good`, `weekend,`, `Walter.`, `Any`, `plans?`],
        distractors: [`everyone.`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. A senior client meeting: you're nervous, the client is curt, and you've forgotten their assistant's name. Which plan uses all three rules?`,
        options: [
          { text: `Focus on the client, skip the assistant, keep a serious face`, why: `You'd break all three rules in one go.` },
          { text: `Smile as you walk in, apologise and ask the assistant's name, and ask the client one real question about their week before business` },
          { text: `Open with your company's best results to impress them`, why: `Trying to be interesting. The curt client will only get curter.` },
        ],
        answer: 1,
        explanation: `Smile, name, interest: three small acts in the first minute.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 4 to 6: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `Two months`,
    summary: `For the next two months, make one new person feel genuinely interesting to you every week. At the end, count your new friends. Tippy would be proud.`,
  },
  notes: `Synthesis of Part Two chs. 1–3 (interest, smile, names) with the weekly review from "Nine Suggestions". Scenarios are ours; every rule and story comes from the book. Retold in our own words.`,
};

export default lesson;
