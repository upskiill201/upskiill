import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 (Practice) — Rule 7 in daily life: listening is something you do. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Listening Is Something You Do`,
  summary: `A loyal customer was about to walk out of a store forever over a torn coat lining. One person listening, instead of pointing at a sign, changed the ending.`,
  minutes: 11,
  outcomes: [
    `Listen without interrupting or contradicting`,
    `Show with your actions that you're listening`,
    `Use listening to keep customers, colleagues and family close`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The torn lining`,
      before: {
        label: `The clerk`,
        text: `Henrietta bought a coat in a sale and found a tear in the lining. When she brought it back, the clerk wouldn't even listen. She pointed at a sign: all sales are final. "Sew it up yourself." "But it's damaged," said Henrietta. "Makes no difference," the clerk cut in. "Final's final."`,
      },
      after: {
        label: `The manager`,
        text: `As Henrietta turned to leave for good, the department manager, who knew her from years of shopping there, asked what had happened. She listened to the whole story and examined the coat. "Sales are final so we can clear stock," she said. "But that doesn't apply to damaged goods. We'll repair it, replace it, or refund you."`,
      },
      notes: [
        `Same store, same policy, same coat.`,
        `The clerk interrupted, contradicted and pointed at a sign. The manager listened.`,
        `Stores spend fortunes on adverts, then hire people who drive customers away by not listening.`,
      ],
    },
    {
      kind: `reading`,
      title: `"You stop and listen to me"`,
      html:
        `<p>Listening matters just as much at home. A mother named Millie made a point of really listening whenever her children wanted to talk.</p>` +
        `<p>One evening in the kitchen, her son Robert said, "Mum, I know you love me very much." Touched, she asked if he'd ever doubted it.</p>` +
        `<p>"No," he said, "but I really know you love me, because whenever I want to talk to you, you stop whatever you're doing and listen."</p>` +
        `<p>A journalist who interviewed hundreds of famous people said many people make a poor impression because they don't listen. They're so busy thinking about what they'll say next that they don't hear a word. Important people, he said, prefer good listeners to good talkers. And good listening is one of the rarest qualities of all.</p>`,
    },
    {
      kind: `steps`,
      title: `Listening, as an action`,
      steps: [
        { title: `Stop what you're doing`, body: `Put the phone down, turn from the screen, face them.` },
        { title: `Let them finish`, body: `No interrupting, even when you know what they'll say.` },
        { title: `Don't contradict while they talk`, body: `There's time for your view later. Right now, understand theirs.` },
        { title: `Ask to hear more`, body: `"Tell me more." "What happened then?" "How did that feel?"` },
      ],
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Stop thinking about your next line. You can't listen and rehearse at the same time.`,
    },
  ],
  apply: {
    scenario: `Rule 7 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the clerk do wrong with Henrietta?`,
        options: [
          { text: `She followed store policy`, why: `The policy didn't even apply. She didn't listen long enough to find out.` },
          { text: `She refused to listen, interrupted and pointed at a sign` },
          { text: `She was too slow`, why: `Speed wasn't the problem.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `How did Robert know his mother really loved him?`,
        options: [
          { text: `She bought him things`, why: `It was simpler than that.` },
          { text: `She stopped whatever she was doing and listened` },
          { text: `She told him every day`, why: `Words weren't what convinced him.` },
        ],
        answer: 1,
      },
      {
        kind: `orderLines`,
        prompt: `Listening as an action, in order.`,
        lines: [`Stop what you're doing`, `Let them finish`, `Hold back your view for now`, `Ask to hear more`],
      },
      {
        kind: `sortGroups`,
        prompt: `Which manager behaviour is this?`,
        groups: [`Listening`, `Not listening`],
        items: [
          { text: `"Tell me what happened from the start."`, group: 0 },
          { text: `"Read the sign."`, group: 1 },
          { text: `Examining the coat while she explains`, group: 0 },
          { text: `"Makes no difference."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `Why people make a poor impression.`,
        template: `They're so busy thinking about what they'll say [[1]] that they don't keep their [[2]] open.`,
        blanks: [[`next`], [`ears`]],
        distractors: [`later`, `eyes`],
      },
      {
        kind: `findBug`,
        prompt: `A customer is explaining a problem. Which response breaks listening?`,
        lines: [
          `I'm sorry, that sounds really frustrating.`,
          `Yeah, yeah, I know, you want a refund, right?`,
          `Can you tell me what happened when it stopped working?`,
        ],
        bug: 1,
        fix: `Take your time, I'm listening.`,
        explanation: `Jumping in with what you think they want tells them you're not hearing them.`,
      },
      {
        kind: `typeAnswer`,
        prompt: `"Tell me ________." Two words that keep people talking. (one word for the blank)`,
        answers: [`more`],
        placeholder: `One word`,
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match the earlier rules.`,
        pairs: [
          [`Smile`, `Says "I'm glad to see you"`],
          [`Use their name`, `Sweetest sound in any language`],
          [`Appreciate`, `From the heart, not the teeth`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did the journalist say important people prefer?`,
        options: [
          { text: `Good listeners to good talkers` },
          { text: `Good talkers to good listeners`, why: `The other way round.` },
          { text: `People who agree with them`, why: `He said listening was what they valued.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `Your teenage child starts telling you about a fight with a friend while you're answering work emails. What do you do?`,
        options: [
          { text: `Keep typing and say "mm-hmm"`, why: `They'll notice, and stop telling you things.` },
          { text: `Close the laptop, turn to face them and say "Tell me what happened"` },
          { text: `Give them advice straight away so you can get back to work`, why: `Advice before listening rarely lands.` },
        ],
        answer: 1,
        explanation: `Stopping what you're doing is how Robert knew he was loved.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: for one whole conversation today, put your phone face down and give the person all your attention. Who was it, and what did you notice?`,
    starters: [`I gave my full attention to...`, `I noticed...`],
  },
  deepen: {
    title: `The rehearsal trap`,
    summary: `In your next meeting, notice every time you start planning what you'll say while someone else is talking. Gently bring your attention back to them. That's the whole skill.`,
  },
  notes: `Source: Carnegie, Part Two ch. 4: department stores hiring clerks who don't listen, Mrs. Henrietta Douglas's coat ("All sales are final", manager's response), Millie Esposito and her son Robert, Isaac F. Marcosson on listeners. Steps card summarises the chapter's advice. Retold in our own words.`,
};

export default lesson;
