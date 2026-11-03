import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 (Finale, Unit Challenge) — a dinner where you know almost nobody; Rules 7–9. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Dinner Party`,
  summary: `A dinner where you know only the host. A know-it-all, a quiet guest and a famous name at your table. By dessert, can you be the most interesting person in the room without telling a single story about yourself?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Use listening, their interests and importance together`,
    `Handle a talker, a quiet guest and a powerful person`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Six ways to make people like you`,
      html:
        `<p>You now have all six of the book's ways to make people like you. Be genuinely interested in them. Smile. Remember their name. Be a good listener. Talk about their interests. Make them feel important, and mean it.</p>` +
        `<p>Tonight, a dinner party. You know only the host. Let's see what happens.</p>`,
    },
    {
      kind: `story`,
      title: `Drinks`,
      beats: [
        { speaker: `narrator`, text: `The host introduces you to a guest called Professor Ama Mensah, who studies volcanoes. You know nothing about volcanoes. You're worried you'll have nothing to say.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Steer the chat to something you know, like football`, outcome: `She's polite. She moves on after five minutes.` },
          { text: `"Volcanoes! I know nothing about them. What first got you hooked?"`, outcome: `She talks for twenty minutes, glowing. At the end she says you're wonderful company. You said maybe six sentences. The botanist rule.`, best: true },
          { text: `Admit you don't know anything and go quiet`, outcome: `Not knowing is the perfect start, if you follow it with a question.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Dinner`,
      beats: [
        { speaker: `narrator`, text: `At dinner, a man named Victor takes over the table with stories about himself. Next to you, a young guest, Lin, hasn't said a word all evening.` },
      ],
      choice: {
        prompt: `How do you handle the table?`,
        options: [
          { text: `Out-talk Victor with a better story`, outcome: `Now there are two bores at the table, and Lin is quieter than ever.` },
          { text: `Turn to Lin, use her name, and ask about something she cares about`, outcome: `Lin opens up about the animation studio she's starting. Others lean in. Victor even asks her a question.`, best: true },
          { text: `Tell Victor he's talking too much`, outcome: `You'd be right, and you'd humiliate him in front of everyone. The table would freeze.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `Dessert`,
      beats: [
        { speaker: `narrator`, text: `Over dessert, you find yourself next to the host's mother, a famous architect. You've admired one of her buildings for years, and you'd love her advice on your career.` },
      ],
      choice: {
        prompt: `What's your move?`,
        options: [
          { text: `Ask her straight away for a job introduction`, outcome: `She smiles politely and talks to someone else.` },
          { text: `Tell her specifically what you love about the building and ask how she came up with it`, outcome: `She lights up and talks for an hour. As you leave, she gives you her card and says, "Come and see the studio."`, best: true },
          { text: `Tell her she's the greatest architect alive`, outcome: `Flattery. She's heard it a thousand times, and she can tell.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 7 to 9.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did the volcano professor find you wonderful company?`,
        options: [
          { text: `You knew a lot about geology`, why: `You knew nothing.` },
          { text: `You listened with real interest while she talked about her passion` },
          { text: `You told funny stories`, why: `You barely spoke.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Listen`, `Their interests`, `Feel important`],
        items: [
          { text: `Letting the professor talk for twenty minutes`, group: 0 },
          { text: `Asking Lin about her animation studio`, group: 1 },
          { text: `Telling the architect exactly what you love about her building`, group: 2 },
          { text: `Not interrupting an angry caller`, group: 0 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The rules of this chapter.`,
        template: `Be a good [[1]]. Talk in terms of the other person's [[2]]. Make the other person feel [[3]], and do it sincerely.`,
        blanks: [[`listener`], [`interests`], [`important`]],
        distractors: [`speaker`, `grateful`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`The botanist`, `Be a good listener`],
          [`Roosevelt reading up`, `Talk about their interests`],
          [`The post office clerk's hair`, `Make them feel important`],
          [`Eastman's oak panels`, `Admire what they're proud of`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did the phone company troubleshooter mostly do on his visits?`,
        options: [
          { text: `Listened and sympathised` },
          { text: `Explained the bill`, why: `The bill didn't come up until visit four.` },
          { text: `Offered refunds`, why: `The customer ended up paying in full.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Ronald's classroom sign said: YOU ARE ________. (one word)`,
        answers: [`important`, `IMPORTANT`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your plan for networking events. Which line breaks this chapter's rules?`,
        lines: [
          `Ask each person what they're working on that excites them.`,
          `Bring my best three stories and get them in early.`,
          `Remember names and use them as I leave.`,
        ],
        bug: 1,
        fix: `Ask a follow-up question before I mention myself.`,
        explanation: `Rehearsed stories are trying to be interesting. Be interested instead.`,
      },
      {
        kind: `orderLines`,
        prompt: `Meeting someone you admire, in order.`,
        lines: [`Smile and use their name`, `Name what you honestly admire`, `Ask how it came about`, `Listen far more than you talk`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): what's the only way to get anyone to do anything?`,
        options: [
          { text: `Make them want to do it` },
          { text: `Ask nicely`, why: `Nice helps, but the rule is about their want.` },
          { text: `Be in charge`, why: `Authority gets obedience until your back is turned.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what did Jim Farley's campaign letters start with?`,
        options: [
          { text: `"Dear Bill" or "Dear Jane"` },
          { text: `"Dear Voter"`, why: `Every one was personal.` },
          { text: `"To whom it may concern"`, why: `That's the gunman's letter from Chapter 1.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build a question for someone whose world you know nothing about.`,
        tiles: [`What`, `first`, `got`, `you`, `hooked?`],
        distractors: [`Boring?`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. A colleague who usually annoys you corners you to talk at length about their weekend. You're busy. Which response uses all three rules?`,
        options: [
          { text: `"Sorry, really busy," and walk off`, why: `Sometimes necessary, but it uses none of the rules.` },
          { text: `Give them five minutes of full attention, ask about the part they're most excited about, and thank them for telling you` },
          { text: `Nod along while typing`, why: `They'll notice. Half-listening is worse than honestly saying you're busy.` },
        ],
        answer: 1,
        explanation: `Short and sincere beats long and distracted. Five real minutes of listening to what they care about makes them feel important.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 7 to 9: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `The six ways`,
    summary: `Write the six ways to make people like you on a card: interest, smile, name, listen, their interests, importance. Keep it in your wallet or phone case for a month and look at it before every social event.`,
  },
  notes: `Synthesis of Part Two (all six principles, "In a Nutshell") with the weekly review from "Nine Suggestions". Scenarios are ours; every rule and story comes from the book. Retold in our own words.`,
};

export default lesson;
