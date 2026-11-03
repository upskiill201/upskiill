import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6 (Pressure) — Rule 11 when you're sure you're right: how Ben Franklin quit arguing. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `How Ben Franklin Quit Arguing`,
  summary: `A timber salesman knew the inspector rejecting his whole shipment was wrong, and never said so once. Then meet young Ben Franklin, so insufferable his friends avoided him, and the habit that made him one of history's great persuaders.`,
  minutes: 12,
  outcomes: [
    `Replace fixed-opinion words with softer ones`,
    `Persuade when you know you're right without saying "you're wrong"`,
    `Let people find the mistake themselves through questions`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The lumber inspector`,
      beats: [
        { speaker: `narrator`, text: `R. V. Crowley sold timber. For years he'd told stubborn timber inspectors they were wrong, and won the arguments. But inspectors are like referees: once they've decided, they never change. His firm lost thousands.` },
        { speaker: `narrator`, text: `One day a furious customer phoned: they'd rejected a whole railway car of his timber as below grade. Crowley drove out. He could see the inspector was grading far too strictly; he was an expert in hardwoods, but not in the white pine he was checking. White pine happened to be Crowley's speciality.` },
        { speaker: `narrator`, text: `Crowley didn't object once. He watched, and asked friendly questions about why certain boards weren't suitable, saying he only wanted to send exactly what they needed next time.` },
      ],
      choice: {
        prompt: `What happened by the end?`,
        options: [
          { text: `Crowley finally showed him the grading rules`, outcome: `He never had to.` },
          { text: `The inspector admitted he didn't know white pine, regraded the whole car himself after Crowley left, and they paid in full`, outcome: `That's it. He began to feel guilty every time he rejected a board, and realised the mistake was theirs for ordering too low a grade.`, best: true },
          { text: `They agreed to split the cost`, outcome: `They paid every penny, and the goodwill saved was worth even more.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `The rebuke`,
      html:
        `<p>When Ben Franklin was a blundering young man, an old Quaker friend took him aside and told him some hard truths. Ben, you're impossible. Your opinions slap everyone who disagrees. Your friends enjoy themselves more when you're not around. You know so much that nobody can tell you anything, and nobody will try. So you'll never know more than you do now, which is very little.</p>` +
        `<p>One of the finest things about Franklin is how he took it. He was big enough to see it was true, and that he was heading for social disaster. So he changed.</p>` +
        `<p>He made a rule never to contradict anyone directly, and never to state his own views as fixed truth. He banned words like "certainly" and "undoubtedly" and used "I think", "I imagine" or "it seems to me at present" instead. When someone said something he thought was wrong, he denied himself the pleasure of contradicting them. He'd say that in some cases their opinion would be right, but here it seemed to him a little different.</p>` +
        `<p>Conversations became more pleasant. His ideas were accepted more easily. He was less embarrassed when he turned out to be wrong, and found it easier to win people round when he was right. In time it became so natural that, he said, nobody had heard a dogmatic word from him in fifty years. He wasn't a good speaker, he admitted, but he usually carried his point.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Swap "certainly", "obviously" and "definitely" for "I think", "it seems to me" and "I may be wrong". You'll carry more points, not fewer.`,
    },
  ],
  apply: {
    scenario: `Rule 11, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the old Quaker friend tell young Franklin?`,
        options: [
          { text: `That he'd be famous one day`, why: `It was far less flattering.` },
          { text: `That his opinions slapped everyone and his friends preferred him absent` },
          { text: `That he should study harder`, why: `It was about how he treated people.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Words Franklin banned, and words he used instead.`,
        groups: [`Banned`, `Used instead`],
        items: [
          { text: `Certainly`, group: 0 },
          { text: `It seems to me at present`, group: 1 },
          { text: `Undoubtedly`, group: 0 },
          { text: `I imagine`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Franklin on his speaking.`,
        template: `I was a bad [[1]], never eloquent, and yet I generally carried my [[2]].`,
        blanks: [[`speaker`], [`points`, `point`]],
        distractors: [`writer`, `bags`],
      },
      {
        kind: `typeAnswer`,
        prompt: `What kind of timber did the inspector not know well? White ________. (one word)`,
        answers: [`pine`],
        placeholder: `One word`,
      },
      {
        kind: `mcq`,
        prompt: `How did Crowley get the inspector to see his own mistake?`,
        options: [
          { text: `He quoted the grading rules`, why: `That's what he'd done for years, and lost.` },
          { text: `He asked friendly questions and never said he was wrong` },
          { text: `He called the inspector's boss`, why: `He solved it with the inspector himself.` },
        ],
        answer: 1,
      },
      {
        kind: `findBug`,
        prompt: `Rewriting a message the Franklin way. Which line still needs fixing?`,
        lines: [
          `It seems to me the launch date might be tight.`,
          `Obviously we can't do it with this team.`,
          `I may be wrong, so could we check the plan together?`,
        ],
        bug: 1,
        fix: `I wonder whether we'll need more people.`,
        explanation: `"Obviously" states it as fixed truth. Franklin banned exactly that kind of word.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they persuaded.`,
        pairs: [
          [`Ben Franklin`, `Banned fixed-opinion words`],
          [`R. V. Crowley`, `Asked questions while the inspector graded`],
          [`Harold Reinke`, `"We may have got it wrong"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did Adamson do in his five minutes with George Eastman?`,
        options: [
          { text: `Admired his office and asked about his story` },
          { text: `Pitched his seats quickly`, why: `He never pitched.` },
          { text: `Left after five minutes`, why: `He stayed over two hours.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Disagree the Franklin way.`,
        tiles: [`In`, `some`, `cases`, `you'd`, `be`, `right,`, `but`, `here`, `it`, `seems`, `different.`],
        distractors: [`wrong.`],
      },
      {
        kind: `mcq`,
        prompt: `You're an expert and a client keeps rejecting your work based on a misunderstanding. What would Crowley do?`,
        options: [
          { text: `Explain clearly, with evidence, why they're wrong`, why: `Right, and you'll lose the client.` },
          { text: `Ask them to walk you through what they need, and gently raise questions until they see the gap` },
          { text: `Redo it their way to keep them happy`, why: `Sometimes fine, but here you'd both lose out.` },
        ],
        answer: 1,
        explanation: `Questions let them find the mistake themselves, and save their pride.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: for one day, replace every "definitely", "obviously" and "certainly" with "I think" or "it seems to me". Did anyone push back less?`,
    starters: [`I caught myself saying...`, `When I softened it...`],
  },
  deepen: {
    title: `Judge them by their principles`,
    summary: `Martin Luther King, a pacifist, was asked how he could admire a high-ranking Air Force general. He said he judged people by their own principles, not by his. Try judging one person you disagree with by their principles this week.`,
  },
  notes: `Source: Carnegie, Part Three ch. 2: Franklin's autobiography (the Quaker friend's rebuke, banned words "certainly/undoubtedly", "I conceive/I apprehend/I imagine", fifty years without a dogmatic expression, "bad speaker... carried my points"), R. V. Crowley and the white pine lumber inspector, Martin Luther King on Gen. "Chappie" James. Retold in our own words.`,
};

export default lesson;
