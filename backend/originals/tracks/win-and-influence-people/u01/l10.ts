import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 (Finale, Unit Challenge) — one ordinary day that tests Rules 1–3; the weekly review begins. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: `Real Day: The Beehive`,
  summary: `A Monday full of small annoyances: a late colleague, a careless mistake, a team that won't come to training. Every one is a beehive. Can you get the honey without kicking it over?`,
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    `Use Rules 1, 2 and 3 together in real situations`,
    `Choose the reply that wins cooperation, not just the argument`,
    `Start a weekly review of how you handle people`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `If you want honey, don't kick the hive`,
      html:
        `<p>Three rules so far. Don't criticise, condemn or complain. Give honest, sincere appreciation. Arouse in the other person an eager want.</p>` +
        `<p>They sound simple. They are simple. But when you're tired, rushed and right, the natural thing, the impulsive thing, is nearly always wrong. So today you'll live through one ordinary Monday and make the calls yourself.</p>`,
    },
    {
      kind: `story`,
      title: `9:05 a.m.`,
      beats: [
        { speaker: `narrator`, text: `You've barely sat down when your colleague Sam strolls in, late for the third time this week. The client call starts in ten minutes and you needed Sam's numbers an hour ago.` },
      ],
      choice: {
        prompt: `What do you say?`,
        options: [
          { text: `"Third time this week, Sam. Some of us were here at eight."`, outcome: `Sam goes red, mutters about the trains and sends the numbers in silence. The call goes fine. Sam doesn't speak to you for the rest of the day.` },
          { text: `"Morning! Rough journey? Can you send the numbers before the call? I'll grab you a coffee."`, outcome: `Sam laughs, sends them in two minutes, and later tells you a new baby is keeping them up at night. Now you can actually help.`, best: true },
          { text: `Say nothing and complain about Sam to your manager later`, outcome: `Complaining behind someone's back is still complaining, and it always finds its way home.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `1:30 p.m.`,
      beats: [
        { speaker: `narrator`, text: `A junior designer, Ray, sent the wrong file to a client. It's embarrassing, the client noticed, and you have to fix it. You are right and you are annoyed. Ray looks terrified.` },
      ],
      choice: {
        prompt: `What do you do?`,
        options: [
          { text: `Write Ray a sharp message while it's fresh, so they learn`, outcome: `It relieves you for an hour. Ray stops asking you questions for a month, and makes more mistakes, not fewer.` },
          { text: `Draft the angry message, delete it, then tell Ray: "It happens. I trust you to send the next one. Let's fix it together."`, outcome: `Like the test pilot with his mechanic. Ray triple-checks every file from that day on.`, best: true },
          { text: `Fix it yourself and never give Ray client work again`, outcome: `Quiet punishment. Ray never learns, and you've just doubled your own workload.` },
        ],
      },
    },
    {
      kind: `story`,
      title: `4:00 p.m.`,
      beats: [
        { speaker: `narrator`, text: `You're running a new training session on Friday and only two people have signed up. Your first message said: "I need at least ten people or the session gets cancelled."` },
      ],
      choice: {
        prompt: `How do you rewrite the invitation?`,
        options: [
          { text: `"Please sign up, I really need the numbers."`, outcome: `Strawberries on the hook. One more person signs up, out of pity.` },
          { text: `"Friday's session shows the shortcut that cuts weekly reports from two hours to twenty minutes. Lunch is included."`, outcome: `Fourteen sign-ups by the end of the day. You talked about what they want.`, best: true },
          { text: `"Attendance is mandatory."`, outcome: `They'll come, sulking, and check their phones the whole time.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>Before you sleep, try the habit of a banker Carnegie once knew. Every Saturday night he went through his diary alone and asked himself three questions: What mistakes did I make? What did I do right, and how could I have done better? What can I learn from it?</p>` +
        `<p>He said the review often made him unhappy at first. Over the years the mistakes became fewer. He called it the most valuable thing he ever did.</p>`,
    },
  ],
  apply: {
    scenario: `Unit Challenge: Rules 1 to 3.`,
    items: [
      {
        kind: `mcq`,
        prompt: `Why did Sam go quiet all day in the first ending?`,
        options: [
          { text: `Sam was busy`, why: `Sam was hurt, and defending their pride.` },
          { text: `The criticism wounded Sam's pride, so they defended themselves` },
          { text: `Sam agreed and felt ashamed`, why: `People almost never criticise themselves.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Which rule does each move follow?`,
        groups: [`Rule 1: don't criticise`, `Rule 2: appreciate`, `Rule 3: eager want`],
        items: [
          { text: `Deleting the angry message to Ray`, group: 0 },
          { text: `Thanking Sam for the quick numbers`, group: 1 },
          { text: `Promising the report shortcut in the invitation`, group: 2 },
          { text: `Asking Sam about the rough journey instead of scolding`, group: 0 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `The three rules of this chapter.`,
        template: `Don't [[1]], condemn or complain. Give honest, sincere [[2]]. Arouse in the other person an eager [[3]].`,
        blanks: [[`criticise`, `criticize`], [`appreciation`], [`want`]],
        distractors: [`praise`, `need`],
      },
      {
        kind: `mcq`,
        prompt: `Who wrote a furious letter to his general and never sent it?`,
        options: [
          { text: `Theodore Roosevelt`, why: `He criticised Taft, very publicly.` },
          { text: `Abraham Lincoln` },
          { text: `Andrew Carnegie`, why: `He's the five-dollar postscript.` },
        ],
        answer: 1,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to its lesson.`,
        pairs: [
          [`Crowley's kind heart`, `Nobody thinks they're the villain`],
          [`Schwab's million dollars`, `Appreciation brings out people's best`],
          [`Emerson's calf`, `Think of what they want`],
          [`The ballroom rent`, `Talk about their gains`],
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Flattery comes from the teeth out. Appreciation comes from the ________ out. (one word)`,
        answers: [`heart`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `A Monday message to the team. Which line breaks a rule from this chapter?`,
        lines: [
          `Great work on Friday's launch, especially the support team's speedy replies.`,
          `Honestly though, the design team let everyone down again.`,
          `This week's training can save you an hour on every report.`,
        ],
        bug: 1,
        fix: `Design, let's grab ten minutes to see what slowed things down.`,
        explanation: `Public condemnation. The design team will defend themselves and hear nothing else in the message.`,
      },
      {
        kind: `orderLines`,
        prompt: `The banker's Saturday review, in order.`,
        lines: [`What mistakes did I make?`, `What did I do right, and how could I do better?`, `What can I learn from it?`],
      },
      {
        kind: `mcq`,
        prompt: `What did the warden of Sing Sing say about his prisoners?`,
        options: [
          { text: `Few saw themselves as bad people` },
          { text: `Most were sorry`, why: `Most justified what they'd done.` },
          { text: `They blamed their parents`, why: `They blamed many things, but his point was that few blamed themselves.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the question that comes before every request.`,
        tiles: [`How`, `can`, `I`, `make`, `them`, `want`, `to`, `do`, `it?`],
        distractors: [`tell`],
      },
      {
        kind: `mcq`,
        prompt: `What did Rockefeller praise after a partner lost a million dollars?`,
        options: [
          { text: `His honesty in admitting it`, why: `He praised something more specific.` },
          { text: `Saving sixty per cent of the money` },
          { text: `His courage in taking the risk`, why: `Not what Rockefeller picked.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Hardest one. Your best friend borrowed money two months ago and hasn't mentioned it. You need it back. Which reply uses all three rules?`,
        options: [
          { text: `"You've clearly forgotten about the money. Not cool."`, why: `Criticism. They'll defend themselves and you'll lose a friend and probably the money.` },
          { text: `"You've been such a good friend this year, thank you. Could we sort the loan this month? It'd help me book my trip."` },
          { text: `Drop hints about being broke until they get it`, why: `Complaining in disguise, and they may never get it.` },
        ],
        answer: 1,
        explanation: `Honest appreciation, no criticism, and a clear want they can help with. All three rules in two sentences.`,
      },
    ],
  },
  reflect: {
    prompt: `Your first weekly review. Look back on this week with the banker's three questions. What did you do wrong with someone? What did you do right? What will you do differently? Then write down one triumph: a name, what you did, what happened.`,
    starters: [`My mistake this week was...`, `What I did right was...`, `My triumph: ...`],
  },
  deepen: {
    title: `The dime game`,
    summary: `Carnegie suggested a game: give a friend or partner a small coin every time they catch you breaking one of these rules. Try it this week with Rule 1. It's the fastest way to see how often we criticise without noticing.`,
  },
  notes: `Synthesis of Part One (chs. 1–3) plus "Nine Suggestions": the Wall Street banker's Saturday-night review and its three questions, the dime game. Scenarios are ours; every rule, story and answer comes from the book. Retold in our own words.`,
};

export default lesson;
