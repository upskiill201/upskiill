import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 (Practice) — Rule 1 in daily life: turn the scold into a question. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Criticism Comes Home`,
  summary: `A former president tore into his friend for years. Did his friend ever admit he was wrong? Not once. Today you learn to turn a scold into a question that actually changes things.`,
  minutes: 11,
  outcomes: [
    `Predict how someone reacts to criticism, even from a powerful person`,
    `Rewrite a complaint as a question that finds out why`,
    `Explain why rewards change behaviour better than punishment`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Who was to blame?`,
      html:
        `<p>In 1908 Theodore Roosevelt left the White House and backed his friend William Howard Taft to take his place. Taft won. Roosevelt went off to Africa to hunt lions.</p>` +
        `<p>When he came back, he exploded. He attacked Taft in public for being too timid. He split the Republican Party, ran against him, and in the election that followed Taft's party carried just two states. The worst defeat it had ever known.</p>` +
        `<p>Now, did all that criticism make Taft admit he had been wrong? Of course not. With tears in his eyes, Taft said he didn't see how he could have done anything differently.</p>` +
        `<p>Who was right? Frankly, it doesn't matter. Here's what matters: <strong>all of Roosevelt's criticism didn't change Taft's mind one inch.</strong> It only made him defend himself.</p>` +
        `<p>Or take Albert Fall, a government minister in the 1920s who handed oil reserves to a friend and took a hundred thousand dollars he called a "loan". The scandal sent him to prison. Did he repent? Never. Years later his wife was still insisting her husband had been betrayed, not the one who did the betraying.</p>` +
        `<p>There you have it: human nature in action. People who are plainly in the wrong blaming everybody but themselves. And you and I are no different.</p>`,
    },
    {
      kind: `check`,
      question: `What did Roosevelt's years of public criticism achieve with Taft?`,
      options: [`Taft finally admitted his mistakes`, `Taft defended himself and changed nothing`, `Taft resigned in shame`],
      answer: 1,
      explanation: `Criticism made Taft justify himself, in tears. It never changed his mind.`,
    },
    {
      kind: `compare`,
      title: `The scold and the question`,
      before: {
        label: `The scold`,
        text: `"You've been late three times this week. Honestly, it's not good enough. Everyone else manages to get here on time."`,
      },
      after: {
        label: `The question`,
        text: `"I've noticed mornings have been rough this week. Is something getting in the way? I'd like to help if I can."`,
      },
      notes: [
        `The scold attacks the person, so they defend the person.`,
        `The question goes after the cause, so they can fix the cause.`,
        `"Everyone else manages" compares them to others. That wounds pride fastest of all.`,
      ],
    },
    {
      kind: `text`,
      html:
        `<p>Psychologists have found the same thing in the laboratory. B. F. Skinner showed that an animal rewarded for good behaviour learns faster, and remembers longer, than one punished for bad behaviour. Later studies found the same holds for people.</p>` +
        `<p>Another psychologist, Hans Selye, put it simply: as much as we thirst for approval, we dread condemnation.</p>` +
        `<p>So criticism doesn't just fail to teach. It leaves resentment behind, in the office, at home, among friends, and the problem it complained about is still there.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before you criticise, ask one question instead: "Is something making this hard?" You'll learn more in ten seconds than a lecture would in ten minutes.`,
    },
  ],
  apply: {
    scenario: `Rule 1: Don't criticise, condemn or complain.`,
    items: [
      {
        kind: `mcq`,
        prompt: `After years of attacks from Roosevelt, what did Taft say?`,
        options: [
          { text: `That Roosevelt had been right all along`, why: `He never said that.` },
          { text: `That he didn't see how he could have done anything differently` },
          { text: `That he would never speak to Roosevelt again`, why: `His answer was about himself, not Roosevelt.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Scold or question?`,
        groups: [`Scold`, `Question`],
        items: [
          { text: `"Why can't you ever reply on time?"`, group: 0 },
          { text: `"Is your inbox swamped this week?"`, group: 1 },
          { text: `"You always leave the lights on."`, group: 0 },
          { text: `"What would make it easier to remember the lights?"`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What the psychologists found.`,
        template: `An animal [[1]] for good behaviour learns faster than one [[2]] for bad behaviour.`,
        blanks: [[`rewarded`], [`punished`]],
        distractors: [`ignored`, `paid`],
      },
      {
        kind: `mcq`,
        prompt: `Why is "Why can't you ever reply on time?" a scold, even though it ends in a question mark?`,
        options: [
          { text: `It's too long`, why: `Length isn't the problem.` },
          { text: `It accuses the person, so the honest answer is a defence` },
          { text: `It doesn't use their name`, why: `Names help, but this one would still sting.` },
        ],
        answer: 1,
        explanation: `A real question is curious about the cause. A scold dressed as a question is still an attack.`,
      },
      {
        kind: `findBug`,
        prompt: `A note to a team member. Which sentence will make them defend themselves?`,
        lines: [
          `Thanks for sending the draft.`,
          `Everyone else got theirs in on Monday, so this is pretty disappointing.`,
          `Was anything holding you up?`,
          `Let's find a day that works for the next one.`,
        ],
        bug: 1,
        fix: `I noticed it came in a bit later than planned.`,
        explanation: `Comparing them to "everyone else" wounds their pride. Now they'll spend their energy defending, not improving.`,
      },
      {
        kind: `typeAnswer`,
        prompt: `"As much as we thirst for approval, we dread ________." (one word)`,
        answers: [`condemnation`],
        placeholder: `One word`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what happened.`,
        pairs: [
          [`Roosevelt`, `Attacked his friend for years and changed nothing`],
          [`Taft`, `Defended himself in tears`],
          [`Albert Fall`, `Went to prison still blameless in his own eyes`],
          [`B. F. Skinner`, `Showed reward beats punishment`],
        ],
      },
      {
        kind: `tapBuild`,
        prompt: `Your friend forgot your birthday. Build the reply that doesn't condemn.`,
        tiles: [`Busy`, `month?`, `Let's`, `celebrate`, `this`, `weekend.`],
        distractors: [`Typical.`, `Again?`],
      },
      {
        kind: `orderLines`,
        prompt: `Put the steps for handling a mistake in order.`,
        lines: [`Notice the urge to criticise`, `Ask what made it hard`, `Listen to the answer`, `Work out the fix together`],
      },
      {
        kind: `mcq`,
        prompt: `Your partner keeps leaving dishes in the sink. You've complained five times and nothing changed. What does this lesson say is most likely going on?`,
        options: [
          { text: `They haven't heard you clearly yet, so say it more firmly`, why: `Louder criticism only means louder defending.` },
          { text: `Each complaint makes them defend themselves, so the habit stays` },
          { text: `They agree with you and just need time`, why: `Five complaints and no change says otherwise.` },
        ],
        answer: 1,
        explanation: `Complaints fly home like homing pigeons. Try a question about the cause instead.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: replace one complaint today with a question about the cause. Who was it, what did you ask, and what did you find out?`,
    starters: [`I was about to complain that...`, `So I asked...`, `I found out...`],
  },
  deepen: {
    title: `Homing pigeons`,
    summary: `Think of the last time someone criticised you. Did you agree on the spot, or did you start explaining? Remember that feeling the next time you're tempted to criticise someone else. They'll do exactly what you did.`,
  },
  notes: `Source: Carnegie, How to Win Friends (1981 rev.), Part One ch. 1: Roosevelt vs Taft (1908, Bull Moose split, two states, Taft's tearful reply); Teapot Dome / Albert Fall and Mrs Fall; Skinner reward vs punishment; Hans Selye quote. Retold in our own words.`,
};

export default lesson;
