import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3 (Pressure) — Rule 13 when you're owed or in the right. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Friendly When You're Owed`,
  summary: `His new basement exploded with floodwater: two thousand dollars of damage, and it was the developer's fault. He drove twenty-five miles to see him, and opened by asking about his holiday.`,
  minutes: 12,
  outcomes: [
    `Stay friendly when you're angry and in the right`,
    `Win a claim or complaint without a fight`,
    `Turn a critic into an ally with a friendly explanation`,
  ],
  learn: [
    {
      kind: `reading`,
      title: `Three people who had every right to be angry`,
      html:
        `<p><strong>The flooded basement.</strong> One spring, heavy rain on frozen ground sent water pouring onto Gerald Winn's new building plot. The pressure burst up through his basement floor and ruined the boiler and water heater: over two thousand dollars of damage, uninsured. Then he found out the developer had failed to put in a storm drain that would have prevented it.</p>` +
        `<p>On the twenty-five-mile drive to see him, Winn decided anger would get him nowhere. He stayed calm, started by chatting about the developer's recent holiday in the Caribbean, and only when the moment felt right mentioned the "little" problem of the water. The developer quickly agreed to help. A few days later he called to say he'd pay for all the damage and put in a drain.</p>` +
        `<p><strong>The car that kept breaking.</strong> Gale Connor took his four-month-old car back to the dealer's service department for the third time. Shouting at the service manager clearly wasn't going to work. So he asked to see the owner, introduced himself, and said he'd bought from them because friends praised their prices and service. The owner smiled. Then Connor described the problem, adding he thought the owner would want to know about anything that might hurt his fine reputation. The owner thanked him, took charge personally, and lent Connor his own car while it was fixed.</p>`,
    },
    {
      kind: `story`,
      title: `The man with the camera`,
      beats: [
        { speaker: `narrator`, text: `Dean Woodcock ran a department at an electric company in Pittsburgh. His team was doing a repair on top of a pole for the first time, so managers from all over the company came to watch. Cars and trucks everywhere, dozens of people standing around, two men up the pole.` },
        { speaker: `narrator`, text: `Woodcock noticed a man up the street taking photos, and realised how it looked: dozens of people for a two-person job. He walked over. The man said his mother owned shares in the company, this would open her eyes, and the newspapers might like the pictures too.` },
      ],
      choice: {
        prompt: `What did Woodcock say?`,
        options: [
          { text: `"You can't take photos here."`, outcome: `That would have made a great headline: company tries to stop photographer.` },
          { text: `"It does look like that, doesn't it? I'd think the same in your position. But this is unusual..."`, outcome: `That's it. He explained it was his team's first job of this kind, so everyone had come to watch, and normally two people would do it. The man put away his camera, shook his hand and thanked him.`, best: true },
          { text: `"That's none of your business."`, outcome: `Gall, and a front-page story.` },
        ],
      },
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Being in the right doesn't make anger work. The friendly approach gets you the repair, the refund and the goodwill.`,
    },
  ],
  apply: {
    scenario: `Rule 13, under pressure.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Winn talk about first with the developer?`,
        options: [
          { text: `The flood damage`, why: `He saved that for later.` },
          { text: `The developer's holiday in the Caribbean` },
          { text: `His lawyer`, why: `He never mentioned one.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `How did Connor open with the car dealer's owner?`,
        options: [
          { text: `He listed every fault with the car`, why: `He started somewhere friendlier.` },
          { text: `He said he'd bought there because friends praised their prices and service` },
          { text: `He demanded a new car`, why: `He began with honest praise.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `You're owed something. Friendly or hostile?`,
        groups: [`Friendly`, `Hostile`],
        items: [
          { text: `"I thought you'd want to know, since it could hurt your reputation."`, group: 0 },
          { text: `"This is completely unacceptable."`, group: 1 },
          { text: `"I'd think the same in your shoes."`, group: 0 },
          { text: `"I'll see you in court."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What Woodcock said to the photographer.`,
        template: `It does [[1]] like that, doesn't it? I'd think the same in your [[2]].`,
        blanks: [[`look`], [`position`, `shoes`]],
        distractors: [`sound`, `office`],
      },
      {
        kind: `typeAnswer`,
        prompt: `What did the car dealer's owner lend Connor while his car was fixed? His own ________. (one word)`,
        answers: [`car`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Complaining to a restaurant about a bad meal. Which line will make them defensive?`,
        lines: [
          `We come here often and usually love it.`,
          `So I'm guessing the new chef just doesn't know what they're doing.`,
          `Tonight the fish was quite undercooked, and I thought you'd want to know.`,
        ],
        bug: 1,
        fix: `I'm sure it was a one-off.`,
        explanation: `Insulting the chef turns a fixable problem into a defence of the kitchen.`,
      },
      {
        kind: `orderLines`,
        prompt: `Winn's approach to the developer, in order.`,
        lines: [`Decide on the drive that anger won't help`, `Arrive calm`, `Chat about something they enjoy`, `Mention the problem when the time is right`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to what they won.`,
        pairs: [
          [`Gerald Winn`, `Damages paid and a new drain`],
          [`Gale Connor`, `The owner's personal help and his car`],
          [`Dean Woodcock`, `No photos in the papers`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 3): what did Chalif ask the company president about first?`,
        options: [
          { text: `His framed million-dollar cheque` },
          { text: `Funding for his scouts`, why: `That came only when asked.` },
          { text: `His holiday plans`, why: `It was the cheque.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your airline lost your bag and you've been on hold for an hour. When someone finally answers, what do you open with?`,
        options: [
          { text: `"An hour! This is a disgrace."`, why: `Right, and they'll do the minimum.` },
          { text: `"Thanks for picking up, I know you must be swamped today. I'm hoping you can help me find my bag."` },
          { text: `"I want your supervisor."`, why: `You'll wait longer and the agent will stop trying.` },
        ],
        answer: 1,
        explanation: `The person on the phone didn't lose your bag. Make them your friend and they'll fight to find it.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: next time you have a complaint, open with something friendly and honest before you mention the problem. What happened?`,
    starters: [`My complaint was...`, `I opened with...`, `The result was...`],
  },
  deepen: {
    title: `Their reputation`,
    summary: `Connor's best line was: "I thought you'd want to know about anything that might hurt your fine reputation." It turns a complaint into a favour. Keep it ready for your next one.`,
  },
  notes: `Source: Carnegie, Part Three ch. 4: Gerald H. Winn's flooded basement ($2,000+, missing storm drain, the Caribbean holiday, twenty-five miles), F. Gale Connor and the car dealer (third visit, owner Mr. White, lent his car), Dean Woodcock and the photographer. Retold in our own words.`,
};

export default lesson;
