import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 10 (Finale, Unit Challenge) — giving hard feedback; Rules 22–24. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Feedback Talk`,
  summary: `You've been asked to give feedback to Sam, a friend on your team whose work has slipped. You like Sam. You also need things to change. Can you say it so Sam leaves keener, not crushed?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Give hard feedback with praise, indirectness and humility`,
    `Keep a friendship and change the work`,
    `Review your week the banker's way`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Correct without wounding`,
      html:
        `<p>Three rules for correcting people. Begin with praise and honest appreciation. Call attention to people's mistakes indirectly. Talk about your own mistakes before criticising the other person.</p>` +
        `<p>Today: a feedback talk with a friend whose work has been slipping. Reports are late, and two had errors a client spotted.</p>`,
    },
    {
      kind: `story`,
      title: `The opening`,
      beats: [
        { speaker: `narrator`, text: `Sam sits down, already looking worried. You have your notes: two late reports, two client-spotted errors.` },
      ],
      choice: {
        prompt: `How do you start?`,
        options: [
          { text: `"Let's get straight to it: the last two reports had errors."`, outcome: `Sam's face drops. Everything you say next sounds like a verdict.` },
          { text: `"The way you handled the Okafor account this quarter was brilliant. The client asked for you by name."`, outcome: `Sam relaxes and smiles. The lather is on, and it's true.`, best: true },
          { text: `"You're doing great, honestly, but..."`, outcome: `The "but" cancels the praise before it lands.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `The hard part`,
      beats: [
        { speaker: `narrator`, text: `Now you need to raise the errors and the lateness.` },
      ],
      choice: {
        prompt: `How do you raise them?`,
        options: [
          { text: `"You've been careless lately."`, outcome: `A label. Sam defends: the workload, the deadlines, the client's changes.` },
          { text: `"When I was juggling three accounts last year, I let two reports slip too, and a client caught a mistake. It was awful. Have the last couple of weeks felt like that for you?"`, outcome: `Sam admits the workload has been crushing and they've stopped double-checking. Now you can solve it together.`, best: true },
          { text: `Say nothing about it to protect the friendship`, outcome: `The errors continue, and so does the client's doubt.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `The close`,
      beats: [
        { speaker: `narrator`, text: `You've agreed Sam will hand one account to a colleague for a month. You want to end on the right note.` },
      ],
      choice: {
        prompt: `How do you finish?`,
        options: [
          { text: `"So, no more mistakes, okay?"`, outcome: `It drags the meeting back to the errors.` },
          { text: `"You're one of the best on this team, and with a lighter load your reports will be as sharp as your client work. Let's check in Friday."`, outcome: `Sam leaves keener than they arrived. The next two reports are early and spotless.`, best: true },
          { text: `"Don't worry about it."`, outcome: `Kind, but it tells Sam it didn't matter.` },
        ],
      },
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 22 to 24.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did "You're doing great, honestly, but..." fail?`,
        options: [
          { text: `The "but" made the praise feel like a set-up` },
          { text: `The praise was too long`, why: `It was the "but".` },
          { text: `Sam wasn't listening`, why: `Sam heard the "but" loud and clear.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Praise first`, `Indirect`, `Own mistakes first`],
        items: [
          { text: `"The client asked for you by name."`, group: 0 },
          { text: `"Have the last weeks felt like that for you?"`, group: 1 },
          { text: `"I let two reports slip too last year."`, group: 2 },
          { text: `Schwab handing out cigars`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `This chapter's rules.`,
        template: `Begin with [[1]] and honest appreciation. Call attention to mistakes [[2]]. Talk about your [[3]] mistakes first.`,
        blanks: [[`praise`], [`indirectly`], [`own`]],
        distractors: [`criticism`, `loudly`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its rule.`,
        pairs: [
          [`Lincoln's letter to Hooker`, `Praise before grave faults`],
          [`Mayor Langford's door`, `Correct by example`],
          [`Josephine Carnegie`, `"I was worse at your age"`],
          [`Von Bülow`, `Humble yourself to repair it`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did Lyman Abbott's wife suggest his sermon would make?`,
        options: [
          { text: `An excellent magazine article` },
          { text: `A great book`, why: `It was a magazine article.` },
          { text: `A wonderful speech`, why: `She hinted it wouldn't work as a speech.` },
        ],
        answer: 0,
      },
      {
        kind: `typeAnswer`,
        prompt: `Beginning with praise is like the barber who ________ a man before shaving him. (one word)`,
        answers: [`lathers`, `lather`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your follow-up message to Sam. Which line undoes the meeting?`,
        lines: [
          `Thanks for being so open today.`,
          `Really glad we've freed up some of your load.`,
          `Just don't let me down again.`,
        ],
        bug: 2,
        fix: `Looking forward to Friday's check-in.`,
        explanation: `It reopens the wound and replaces confidence with a warning.`,
      },
      {
        kind: `orderLines`,
        prompt: `A feedback conversation, in order.`,
        lines: [`Honest, specific praise`, `Share a similar mistake of your own`, `Raise the issue indirectly, as a question`, `Agree the fix together`, `End with confidence in them`],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 7): what did Schwab chalk on the mill floor?`,
        options: [
          { text: `The number of heats the day shift made` },
          { text: `A warning`, why: `Just a number.` },
          { text: `The manager's name`, why: `It was the number 6.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what's the most important law of human conduct?`,
        options: [
          { text: `Always make the other person feel important` },
          { text: `Always tell people the truth bluntly`, why: `That's what this chapter teaches you not to do.` },
          { text: `Always win`, why: `No.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build your closing line to Sam.`,
        tiles: [`You're`, `one`, `of`, `the`, `best`, `on`, `this`, `team.`],
        distractors: [`but`],
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your best friend asks your honest opinion on a business idea you think is badly flawed. Which reply uses all three rules?`,
        options: [
          { text: `"Honestly? It won't work."`, why: `Blunt, and they'll defend it, or stop sharing ideas with you.` },
          { text: `"I love how much you care about this, and the branding is great. My first business idea had a similar gap: I hadn't checked who'd pay. Have you had a chance to test that yet?"` },
          { text: `"It's brilliant, go for it!"`, why: `Kind, but not honest. Praise must be sincere.` },
        ],
        answer: 1,
        explanation: `Praise first, your own mistake, and the flaw raised as a question they can explore.`,
      },
    ],
  },
  reflect: {
    prompt: `Weekly review: What mistake did you make with someone this week? What did you do right? What will you do differently? Then record one triumph from Rules 22 to 24: a name, what you did, what happened.`,
    starters: [`My mistake was...`, `What went right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `Keener, not crushed`,
    summary: `The test of good feedback: does the person leave keener than they came in? Think of the last feedback you gave. Would it pass? What would you change now?`,
  },
  notes: `Synthesis of Part Four chs. 1–3 with the weekly review. Scenario is ours. Retold in our own words.`,
};

export default lesson;
