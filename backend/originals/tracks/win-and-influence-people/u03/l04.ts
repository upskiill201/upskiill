import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 (Story) — Rule 8: talk in terms of the other person's interests. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: `The Royal Road to a Heart`,
  summary: `Cowboys, diplomats, politicians: whoever visited Theodore Roosevelt left amazed at how much he knew about their world. His secret happened the night before they arrived.`,
  minutes: 11,
  outcomes: [
    `Find out what someone treasures before you meet them`,
    `Start conversations with their interests, not yours`,
    `Talk about what pleases them even if it isn't your subject`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `The night before`,
      html:
        `<p>Everyone who visited Theodore Roosevelt was astonished by how much he knew. A cowboy, a soldier, a New York politician or a foreign diplomat: Roosevelt always knew what to say.</p>` +
        `<p>How? Simple. Whenever he expected a visitor, he sat up late the night before reading about the subject he knew his guest cared about most.</p>` +
        `<p>Roosevelt knew what all leaders know: <strong>the royal road to a person's heart is to talk about the things they treasure most.</strong></p>`,
    },
    {
      kind: `story`,
      title: `The boats`,
      beats: [
        { speaker: `narrator`, text: `When William Lyon Phelps, later a famous professor at Yale, was eight, he spent a weekend with his aunt. One evening a middle-aged man came to visit. After chatting politely with his aunt, the man turned his attention to the boy.` },
        { speaker: `narrator`, text: `Young William was mad about boats at the time. The visitor talked boats with him all evening, and the boy thought it was the most interesting conversation ever. After he left, William raved about him. What a man!` },
        { speaker: `narrator`, text: `His aunt told him the man was a New York lawyer who didn't care the slightest bit about boats.` },
      ],
      choice: {
        prompt: `"Then why did he talk about boats all evening?" the boy asked. What did his aunt say?`,
        options: [
          { text: `"He wanted something from me."`, outcome: `He wanted nothing at all from an eight-year-old.` },
          { text: `"Because he's a gentleman. He saw you loved boats, so he talked about what would interest and please you."`, outcome: `That's it. Phelps said he never forgot his aunt's words.`, best: true },
          { text: `"He was being polite to me."`, outcome: `Polite, yes, but it went further. He chose the boy's subject on purpose.` },
        ],
      },
    },
    {
      kind: `compare`,
      title: `Their subject, or yours?`,
      before: {
        label: `Your subject`,
        text: `You meet your partner's grandfather for the first time and talk about your job, your plans and the film you saw last week. He nods politely.`,
      },
      after: {
        label: `His subject`,
        text: `You've heard he grew roses for fifty years. You ask how he got them through last winter's frost. He talks for an hour, and tells everyone afterwards what a fine young person you are.`,
      },
      notes: [
        `You don't need to love roses. You need to be interested in someone who does.`,
        `Find what they treasure, and ask about it.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 8: Talk in terms of the other person's interests. Find what they treasure most, and that's where the conversation starts.`,
    },
  ],
  apply: {
    scenario: `Rule 8: Talk in terms of their interests.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Roosevelt do the night before a visitor arrived?`,
        options: [
          { text: `Prepared a speech about himself`, why: `The opposite.` },
          { text: `Read up on the subject his guest cared about most` },
          { text: `Slept early so he'd be sharp`, why: `He sat up late reading.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `How much did the lawyer care about boats?`,
        options: [
          { text: `He was an expert sailor`, why: `He didn't care about them at all.` },
          { text: `Not at all` },
          { text: `A little`, why: `Not the slightest bit, said the aunt.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `What all leaders know.`,
        template: `The royal road to a person's [[1]] is to talk about the things they [[2]] most.`,
        blanks: [[`heart`], [`treasure`, `value`]],
        distractors: [`wallet`, `hate`],
      },
      {
        kind: `sortGroups`,
        prompt: `Their interest or yours?`,
        groups: [`Their interest`, `Your interest`],
        items: [
          { text: `Asking your boss about the marathon they're training for`, group: 0 },
          { text: `Telling your boss about your fantasy football league`, group: 1 },
          { text: `Asking a client about their new shop opening`, group: 0 },
          { text: `Describing your weekend in detail to someone who didn't ask`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Young William Lyon Phelps was mad about ________. (one word)`,
        answers: [`boats`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Meeting a new neighbour who keeps bees. Which line misses the chance?`,
        lines: [
          `I saw the hives in your garden, how long have you kept bees?`,
          `I've never understood the appeal myself, anyway, about the parking.`,
          `Do they ever sting you?`,
        ],
        bug: 1,
        fix: `What's the hardest part of keeping them?`,
        explanation: `Dismissing what they treasure closes the royal road before you've started on it.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to how they used Rule 8.`,
        pairs: [
          [`Roosevelt`, `Read up the night before each visit`],
          [`The New York lawyer`, `Talked boats with a boy all evening`],
          [`Phelps's aunt`, `Explained what a gentleman does`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 1): what did the botanist call Carnegie after he'd barely spoken all evening?`,
        options: [
          { text: `A most interesting conversationalist` },
          { text: `A plant expert`, why: `He knew nothing about plants.` },
          { text: `Shy`, why: `He'd listened, and the botanist loved it.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Open with their interest: your colleague just got back from a cycling holiday.`,
        tiles: [`How`, `were`, `the`, `mountain`, `climbs?`],
        distractors: [`My`, `holiday`],
      },
      {
        kind: `mcq`,
        prompt: `You're having dinner with your partner's parents for the first time and you know nothing about them. What's the Roosevelt move?`,
        options: [
          { text: `Rehearse impressive things to say about your career`, why: `That's your subject, not theirs.` },
          { text: `Ask your partner beforehand what each parent loves, then ask them about it` },
          { text: `Stick to the weather to be safe`, why: `Safe and forgettable.` },
        ],
        answer: 1,
        explanation: `Find out what they treasure the night before, then let them talk about it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: find out one person's passion, a hobby, a cause, a team, and ask them about it today. What lit them up?`,
    starters: [`I found out that... loves...`, `When I asked about it...`],
  },
  deepen: {
    title: `Read up`,
    summary: `Before your next important meeting, spend ten minutes learning about the person's interests, like Roosevelt the night before. Open with one question about it.`,
  },
  notes: `Source: Carnegie, Part Two ch. 5 "How to Interest People": Roosevelt reading up the night before visitors, "the royal road to a person's heart", William Lyon Phelps, Aunt Libby Linsley and the boat-talking lawyer. The rose-grower comparison is our illustration. Retold in our own words.`,
};

export default lesson;
