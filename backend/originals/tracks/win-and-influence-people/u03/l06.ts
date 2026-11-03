import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 (Pressure) — Rule 8 when stakes are high: do your homework on people. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: `Do Your Homework on People`,
  summary: `He wanted a job from a powerful, unreachable businessman guarded by a stern secretary. So he studied them both, the boss and the gatekeeper, and walked in with exactly the right first sentence.`,
  minutes: 12,
  outcomes: [
    `Prepare for an important conversation by studying the person`,
    `Win over the gatekeeper as well as the decision-maker`,
    `Make sure the conversation benefits both of you`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `How Edward Harriman got the job`,
      steps: [
        { title: `Find out who matters`, body: `After the army, Edward wanted to live in a beautiful valley in Maryland where jobs were scarce. He learned that many local companies were controlled by one self-made businessman, R. J. Funkhouser, famous for refusing to see job-seekers.` },
        { title: `Learn what drives them`, body: `He asked around and found the man's great interests were money and power.` },
        { title: `Study the gatekeeper too`, body: `Funkhouser was protected by a stern secretary of fifteen years. Edward studied her interests and goals before visiting her unannounced. He told her he had a proposal that could bring the boss financial and political success, and talked with her about her own part in his success. She became enthusiastic and arranged the meeting.` },
        { title: `Open with their interest`, body: `In the huge office, Funkhouser barked, "How about it, young man?" Edward didn't ask for a job. He said: "I believe I can make money for you."` },
        { title: `Show how both sides gain`, body: `Funkhouser invited him to sit. Edward explained his ideas and how they'd help the businesses. He was hired on the spot, and for over twenty years they both prospered.` },
      ],
    },
    {
      kind: `reading`,
      title: `Homework is a kindness`,
      html:
        `<p>Charles Cubellis answered a newspaper advert for a senior job. Before the interview, he spent hours finding out everything he could about the man who'd founded the business.</p>` +
        `<p>In the interview he said he'd be proud to work for a company with such a record, and asked: was it true the founder had started twenty-eight years ago with just a desk and one assistant?</p>` +
        `<p>Almost every successful person loves talking about their early struggles. This man talked for a long time: four hundred and fifty dollars, an idea, years of sixteen-hour days and ridicule, until the biggest names in finance came to him for advice. Then he asked Cubellis a few questions, called in a vice-president and said, "I think this is the person we're looking for."</p>` +
        `<p>Doing your homework on someone isn't sneaky. It tells them they were worth your time before you even met.</p>`,
    },
    {
      kind: `callout`,
      tone: `warning`,
      text: `Homework only works if what you offer is real. Harriman could make Funkhouser money, and did, for twenty years. Never study someone to use them.`,
    },
  ],
  apply: {
    scenario: `Rule 8, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What were Funkhouser's main interests?`,
        options: [
          { text: `Golf and travel`, why: `Harriman found something else.` },
          { text: `Money and power` },
          { text: `His family`, why: `Not what Harriman's research found.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What was Harriman's first sentence to Funkhouser?`,
        options: [
          { text: `"I'm looking for a job."`, why: `He deliberately didn't ask for a job.` },
          { text: `"I believe I can make money for you."` },
          { text: `"Your secretary sent me."`, why: `He led with the boss's interest.` },
        ],
        answer: 1,
      },
      {
        kind: `orderLines`,
        prompt: `Harriman's preparation, in order.`,
        lines: [`Find out who makes the decision`, `Learn what drives them`, `Win over the gatekeeper`, `Open with their interest`, `Show how both sides gain`],
      },
      {
        kind: `fillBlank`,
        prompt: `What Cubellis asked the founder.`,
        template: `Did you really start twenty-eight years ago with just a [[1]] and one [[2]]?`,
        blanks: [[`desk`], [`assistant`, `stenographer`]],
        distractors: [`loan`, `partner`],
      },
      {
        kind: `sortGroups`,
        prompt: `Good homework or creepy homework?`,
        groups: [`Good homework`, `Creepy homework`],
        items: [
          { text: `Reading the company's story and the founder's interviews`, group: 0 },
          { text: `Bringing up their child's school by name, uninvited`, group: 1 },
          { text: `Learning what the team is proud of shipping this year`, group: 0 },
          { text: `Quoting their private posts from years ago`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Almost every successful person loves to talk about their early ________. (one word)`,
        answers: [`struggles`, `struggle`, `days`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your plan for a meeting with an investor. Which step breaks this lesson?`,
        lines: [
          `Read about the companies she's backed and why.`,
          `Ask her about the first company she ever invested in.`,
          `Invent a mutual friend so she trusts me faster.`,
        ],
        bug: 2,
        fix: `Show how my business fits what she already loves to fund.`,
        explanation: `Homework is about understanding them, never about deceiving them.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their homework.`,
        pairs: [
          [`Harriman`, `Studied the boss and the secretary`],
          [`Cubellis`, `Researched the founder's early struggles`],
          [`Roosevelt`, `Read up the night before visitors`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what's the first step of Napoleon III's name method?`,
        options: [
          { text: `Make sure you heard it clearly` },
          { text: `Write it down`, why: `That comes last.` },
          { text: `Link it to their face`, why: `That comes after hearing and repeating it.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `You have a job interview tomorrow at a company you've barely heard of. Which preparation follows this lesson?`,
        options: [
          { text: `Polish your list of achievements`, why: `Useful, but it's all about you.` },
          { text: `Learn the company's story and what the interviewer is proud of, and plan one question about it` },
          { text: `Memorise answers to common questions`, why: `Fine, but it won't make you stand out.` },
        ],
        answer: 1,
        explanation: `Cubellis got the job by letting the founder tell the story he loved telling.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: before your next important meeting or call, spend ten minutes learning about the person: what they've built, what they care about. Write down one question you'll ask.`,
    starters: [`I'm meeting...`, `I found out they...`, `My question will be...`],
  },
  deepen: {
    title: `The gatekeeper`,
    summary: `Who guards the people you need: an assistant, a receptionist, a team lead? This week, learn their name and what they care about. Harriman got through the door because he took the gatekeeper seriously.`,
  },
  notes: `Source: Carnegie, Part Two ch. 5: Edward E. Harriman and R. J. Funkhouser (money and power, the secretary of fifteen years, "I believe I can make money for you", twenty years); Part Three ch. 6: Charles T. Cubellis's interview (twenty-eight years, desk room and one stenographer, $450). Retold in our own words.`,
};

export default lesson;
