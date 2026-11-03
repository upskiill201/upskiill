import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 (Pressure) — Rule 9 with powerful people and people you might lose. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: `The Oak Panels`,
  summary: `He was warned: take more than five minutes of George Eastman's time and you'll lose the order. He was there for over two hours, went home to lunch with him, and won a ninety-thousand-dollar contract. He never once pitched.`,
  minutes: 12,
  outcomes: [
    `Show sincere admiration to someone powerful without flattering`,
    `Keep a valued person by telling them how much they matter`,
    `Recognise loneliness and the hunger for appreciation`,
  ],
  learn: [
    {
      kind: `story`,
      title: `Five minutes with George Eastman`,
      beats: [
        { speaker: `narrator`, text: `George Eastman, the founder of Kodak, was building a music school and concert hall. James Adamson wanted the order to supply the theatre seats. The architect warned him: Eastman is strict and very busy. Take more than five minutes and you've lost it.` },
        { speaker: `narrator`, text: `While they waited, Adamson looked around the office. When Eastman looked up, Adamson said he'd been admiring the room. He worked with fine wood himself, and had never seen a more beautiful office.` },
        { speaker: `narrator`, text: `Eastman said he'd almost forgotten. It was beautiful, he'd loved it when it was built, but these days he hardly noticed it for weeks at a time. Adamson ran his hand across a panel: "This is English oak, isn't it?" It was, chosen for him by a friend.` },
        { speaker: `narrator`, text: `Eastman showed him round the room. Then he pointed out the hospitals and schools he was funding, and Adamson congratulated him warmly. Eastman unlocked a case and brought out his very first camera. Adamson asked about his early struggles, and Eastman spoke with real feeling about his poor childhood, his widowed mother, the nights experimenting until dawn.` },
      ],
      choice: {
        prompt: `Adamson came in at 10:15 with five minutes. What happened?`,
        options: [
          { text: `He was shown out at 10:20`, outcome: `Not even close.` },
          { text: `Two hours later Eastman invited him home for lunch to show him some chairs he'd painted himself`, outcome: `That's it. Cheap chairs from Japan, repainted by a multimillionaire who was proud of the job. The order for $90,000 of seats went to Adamson, and they were friends until Eastman died.`, best: true },
          { text: `Eastman bought the seats on the spot to end the meeting`, outcome: `No pitch was ever made. Adamson simply admired what Eastman was proud of.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Starving for a little recognition`,
      html:
        `<p>A lawyer visiting his wife's relatives was left alone with an elderly aunt. He looked around for something he could honestly admire. "This house was built around 1890, wasn't it?" It was. "It's beautiful. They don't build houses like this any more."</p>` +
        `<p>Her face changed. She and her husband had dreamed of it for years and planned it themselves. She showed him every treasure she'd collected on her travels. Then she led him to the garage, to a car her late husband had bought her and she'd never driven since. She insisted on giving it to him. Her relatives, she said, were just waiting for her to die to get it.</p>` +
        `<p>She was alone in a big house with her memories, starving for a little warmth and genuine appreciation, and no one had given it to her.</p>` +
        `<p>A restaurant owner in France was shocked when his most valuable employee, Paulette, resigned after five years. He realised he'd taken her for granted. He told her he couldn't accept it: she was as important to the restaurant as he was. He said it again in front of the whole staff, and again at his home with his family present. She stayed, and he made a habit of telling her how much she mattered.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Powerful or lonely, famous or forgotten, everyone craves to feel important. Admire honestly what they're proud of. Tell the people you rely on how much they matter, before they have to resign to hear it.`,
    },
  ],
  apply: {
    scenario: `Rule 9, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How long was Adamson warned he could take with Eastman?`,
        options: [
          { text: `Five minutes` },
          { text: `An hour`, why: `Much less. He ended up staying over two hours.` },
          { text: `As long as he liked`, why: `The architect warned him to be very quick.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What did Adamson admire first?`,
        options: [
          { text: `Eastman's fortune`, why: `He admired something Eastman had helped create.` },
          { text: `The office and its English oak panels` },
          { text: `Kodak's cameras`, why: `The camera came later, when Eastman showed it.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The result.`,
        template: `Adamson won the [[1]]-thousand-dollar order, and they were [[2]] for life.`,
        blanks: [[`ninety`, `90`], [`friends`]],
        distractors: [`nine`, `rivals`],
      },
      {
        kind: `sortGroups`,
        prompt: `Honest admiration of a powerful person, or flattery?`,
        groups: [`Honest admiration`, `Flattery`],
        items: [
          { text: `"This oak panelling is beautiful. Is it English?"`, group: 0 },
          { text: `"You're a genius, everyone says so."`, group: 1 },
          { text: `"How did you keep going in those early years?"`, group: 0 },
          { text: `"I'd do anything to be like you."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `What did Eastman want to show Adamson at his home? Chairs he'd ________ himself. (one word)`,
        answers: [`painted`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your best colleague just handed in her notice. Which line should you not say?`,
        lines: [
          `I can't accept this without telling you how much you mean to this team.`,
          `To be honest, we'll manage fine, people come and go.`,
          `Can we talk about what would make you want to stay?`,
        ],
        bug: 1,
        fix: `You're as important to our success as anyone here.`,
        explanation: `It confirms what she probably felt: that she wasn't valued. The restaurant owner said the opposite, three times.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to what the person was hungry for.`,
        pairs: [
          [`George Eastman`, `Someone to notice what he'd built`],
          [`The elderly aunt`, `A little warmth and appreciation`],
          [`Paulette`, `To hear how much she mattered`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Lesson 5): what did the scout leader ask about first?`,
        options: [
          { text: `The framed million-dollar cheque` },
          { text: `Money for the boys`, why: `He didn't mention it until asked.` },
          { text: `The man's company`, why: `He asked about the cheque.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `The Adamson approach, in order.`,
        lines: [`Notice something they're proud of`, `Admire it honestly and specifically`, `Ask how it came about`, `Listen, and let business come later`],
      },
      {
        kind: `mcq`,
        prompt: `You get five minutes with a famous, busy chief executive at an event. What would Adamson do?`,
        options: [
          { text: `Pitch your idea as fast as you can`, why: `Five minutes of your wants is forgettable.` },
          { text: `Ask sincerely about something they built that you genuinely admire, and listen` },
          { text: `Tell them you're their biggest fan`, why: `That's flattery. They hear it all day.` },
        ],
        answer: 1,
        explanation: `Powerful people rarely get honest, specific interest in what they're proud of. It's why five minutes became two hours.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: tell someone you rely on, a colleague, a partner, a parent, exactly how much they matter and why. Don't wait for them to resign or leave. Who, and what did you say?`,
    starters: [`I told... that...`, `They responded...`],
  },
  deepen: {
    title: `Talk to people about themselves`,
    summary: `Disraeli, one of the shrewdest men ever to run the British Empire, said: talk to people about themselves and they'll listen for hours. Test it at your next gathering.`,
  },
  notes: `Source: Carnegie, Part Two ch. 6: James Adamson and George Eastman (five minutes, English oak, first camera, early struggles, painted Japanese chairs, $90,000), the Connecticut attorney and the aunt's Packard, Claude Marais and Paulette (Rouen), Disraeli quote. The judge's dogs story is omitted for length. Retold in our own words.`,
};

export default lesson;
