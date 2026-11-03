import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 9 · Lesson 6 (Pressure) — Rule 26 with the hardest news: rejecting, demoting, letting go. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Hard News, Head High`,
  summary: `Some news can't be softened: you didn't get the job, the role is ending, the answer is no. You can't change the news. You can change whether the person walks away diminished or with their head held high.`,
  minutes: 12,
  outcomes: [
    `Deliver rejection or bad news without humiliating anyone`,
    `Separate the decision from the person's worth`,
    `Choose the setting and words that protect dignity`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `The decision isn't the person`,
      html:
        `<p>GE couldn't keep Steinmetz running a department he was failing at. Granger couldn't keep his seasonal staff when the work ran out. Anna's test had to be redone. The facts didn't change.</p>` +
        `<p>What changed was the message about the person. Steinmetz heard he was a valued consulting engineer. Granger's staff heard they'd done a fine job and the firm believed in them. Anna heard her boss had faith in her.</p>` +
        `<p>That's the skill: <strong>be clear about the decision, and generous about the person.</strong> The worst bad news often isn't the news itself. It's being made to feel small while hearing it.</p>`,
    },
    {
      kind: `steps`,
      title: `Delivering hard news, the face-saving way`,
      steps: [
        { title: `Choose privacy`, body: `Never deliver bad news in front of others if you can avoid it.` },
        { title: `Think first`, body: `Like Granger, think carefully about what this person has genuinely done well before you speak.` },
        { title: `Be clear about the decision`, body: `Don't blur it. Vagueness gives false hope and feels cowardly.` },
        { title: `Separate it from their worth`, body: `Explain the reason in terms of circumstances, fit or timing, not their failings as a person.` },
        { title: `Name what they did well, specifically`, body: `"That time in Newark, you came through brilliantly."` },
        { title: `Leave a door open`, body: `A new role, a reference, an invitation to come back, if you can honestly offer it.` },
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Clear about the decision, generous about the person. They should leave knowing the answer, and still thinking well of themselves.`,
    },
  ],
  apply: {
    scenario: `Rule 26, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What's the core skill in delivering hard news?`,
        options: [
          { text: `Clear about the decision, generous about the person` },
          { text: `Soften the decision until it's vague`, why: `Vagueness gives false hope.` },
          { text: `Get it over with as fast as possible`, why: `That's what left Granger's staff feeling let down.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `Delivering hard news, in order.`,
        lines: [`Choose a private moment`, `Think about what they did well`, `State the decision clearly`, `Separate it from their worth`, `Leave a door open if you honestly can`],
      },
      {
        kind: `sortGroups`,
        prompt: `About the decision, or about their worth?`,
        groups: [`About the decision`, `Attacks their worth`],
        items: [
          { text: `"We've gone with someone who has more design experience."`, group: 0 },
          { text: `"You just weren't good enough."`, group: 1 },
          { text: `"The project's budget has been cut."`, group: 0 },
          { text: `"Frankly, you were a disappointment."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Why vagueness is unkind.`,
        template: `Vagueness gives false [[1]] and feels [[2]].`,
        blanks: [[`hope`], [`cowardly`]],
        distractors: [`fear`, `brave`],
      },
      {
        kind: `typeAnswer`,
        prompt: `Bad news is best delivered in ________, not in front of others. (one word)`,
        answers: [`private`, `privately`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Turning down a job candidate. Which line attacks their worth?`,
        lines: [
          `Thank you for the time you put into the interviews.`,
          `Your portfolio was genuinely impressive, especially the app redesign.`,
          `But you're clearly not senior material yet.`,
        ],
        bug: 2,
        fix: `We've chosen someone with more leadership experience for this role.`,
        explanation: `It judges them as a person. Make the reason about the role, not their worth.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each piece of hard news to how dignity was kept.`,
        pairs: [
          [`Steinmetz removed as head`, `A new title`],
          [`Seasonal staff let go`, `Specific praise and belief`],
          [`Anna's test redone`, `Public faith from her boss`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what should you use when you speak to someone, even when the news is bad?`,
        options: [
          { text: `Their name` },
          { text: `Their job title`, why: `Their name is the sweetest sound.` },
          { text: `Your credentials`, why: `It's their name that matters.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Build the principle.`,
        tiles: [`Clear`, `about`, `the`, `decision,`, `generous`, `about`, `the`, `person.`],
        distractors: [`vague`],
      },
      {
        kind: `mcq`,
        prompt: `A friend asks you to be a co-founder of their start-up, and you've decided to say no. How do you tell them?`,
        options: [
          { text: `Avoid replying for weeks`, why: `That's cowardly and leaves them wondering.` },
          { text: `Tell them clearly, privately: it's about your own timing and finances, you think the idea is strong, and you'd love to help as an adviser` },
          { text: `"I don't think it'll work."`, why: `That's a verdict on their dream, not your decision.` },
        ],
        answer: 1,
        explanation: `Clear decision, reasons about you, honest praise, and an open door.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: say no to someone this week in a way that saves their face. Be clear about the decision and generous about the person. How did they react?`,
    starters: [`I said no to...`, `I made it about...`, `I praised...`],
  },
  deepen: {
    title: `The way it ends`,
    summary: `Think of a rejection you received that still stings. Was it the decision that hurt, or how you were made to feel? Use that memory next time you deliver bad news.`,
  },
  notes: `Synthesis of Part Four ch. 5 (Steinmetz, Granger, Anna Mazzone, Saint-Exupéry). The six steps condense the chapter's advice into a practice checklist. Retold in our own words.`,
};

export default lesson;
