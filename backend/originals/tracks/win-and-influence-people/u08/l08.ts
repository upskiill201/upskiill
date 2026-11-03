import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 8 (Practice) — Rule 24 at work: shared weakness as an opening. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: `The Spelling Book`,
  summary: `An engineer's new secretary kept sending him letters with two or three spelling mistakes a page. Pointing them out changed nothing. So he pulled out a little black book he'd kept for years, full of words he couldn't spell himself.`,
  minutes: 11,
  outcomes: [
    `Use your own weakness as a way into a correction`,
    `Share the tool or habit that helped you`,
    `Keep the correction about the task, not the person`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The secretary's spelling`,
      before: {
        label: `Pointing out errors`,
        text: `E. G. Dillistone, an engineer in Canada, kept getting letters to sign with two or three spelling mistakes per page. He pointed out the errors. It made no difference to how carefully she checked.`,
      },
      after: {
        label: `Sharing his own weakness`,
        text: `Next time, he sat down with her: "This word doesn't look right. It's one I've always struggled with. That's why I keep this spelling book." He opened his little black book to the page. "Here it is. I'm careful about spelling now, because people judge us by our letters, and mistakes make us look less professional."`,
      },
      notes: [
        `He didn't know if she copied his system. But her mistakes dropped sharply after that conversation.`,
        `He made it "us", not "you".`,
      ],
    },
    {
      kind: `reading`,
      title: `Why "us" works`,
      html:
        `<p>Like many engineers, Dillistone admitted he wasn't famous for his spelling. That admission was the whole key. It put him on the same side as his secretary, two people trying to look professional, rather than a boss marking a test.</p>` +
        `<p>Notice too that he gave her something useful: the tool that had helped him. Admitting a weakness is good. Admitting it and sharing how you fixed it is even better. It turns criticism into help.</p>` +
        `<p>It isn't nearly so hard to listen to a list of your faults if the person speaking begins by humbly admitting that they, too, are far from perfect.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Try: "I've always struggled with this too. Here's what helps me." It's a correction, an admission and a gift in one.`,
    },
  ],
  apply: {
    scenario: `Rule 24 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Dillistone keep in his desk?`,
        options: [
          { text: `A little black book of words he found hard to spell` },
          { text: `A list of his secretary's mistakes`, why: `It was his own weaknesses.` },
          { text: `A dictionary`, why: `It was his personal spelling book.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `What reason did he give for being careful with spelling?`,
        options: [
          { text: `People judge us by our letters, and mistakes look unprofessional` },
          { text: `His boss would be angry`, why: `He made it about "us".` },
          { text: `It's the rules`, why: `He gave a shared reason.` },
        ],
        answer: 0,
      },
      {
        kind: `sortGroups`,
        prompt: `"Us" or "you"?`,
        groups: [`"Us"`, `"You"`],
        items: [
          { text: `"People judge us by our letters."`, group: 0 },
          { text: `"Your letters are full of errors."`, group: 1 },
          { text: `"We both want this client to trust us."`, group: 0 },
          { text: `"You need to check your work."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What makes criticism easier to hear.`,
        template: `When the person criticising humbly admits they too are far from [[1]].`,
        blanks: [[`perfect`, `impeccable`]],
        distractors: [`busy`, `home`],
      },
      {
        kind: `typeAnswer`,
        prompt: `How many spelling mistakes per page was the secretary making? About two or ________. (a number)`,
        answers: [`3`, `three`],
        placeholder: `A number`,
      },
      {
        kind: `findBug`,
        prompt: `Helping a colleague with messy spreadsheets. Which line drops the "us"?`,
        lines: [
          `My spreadsheets used to be chaos too.`,
          `This colour-coding trick saved me hours.`,
          `Honestly though, yours are the worst I've seen.`,
        ],
        bug: 2,
        fix: `Want me to show you how I set it up?`,
        explanation: `It breaks the shared weakness and makes it a verdict on them.`,
      },
      {
        kind: `orderLines`,
        prompt: `Dillistone's approach, in order.`,
        lines: [`Sit down beside them`, `Admit the word is hard for you too`, `Show the tool that helps you`, `Give the shared reason it matters`],
      },
      {
        kind: `matchPairs`,
        prompt: `Review: match each story in this chapter to its rule.`,
        pairs: [
          [`McKinley's speech`, `Begin with praise`],
          [`Schwab's cigars`, `Point to mistakes indirectly`],
          [`Dillistone's spelling book`, `Talk about your own mistakes first`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 5): what's Rule 15?`,
        options: [
          { text: `Let the other person do a great deal of the talking` },
          { text: `Talk about your own mistakes first`, why: `That's Rule 24.` },
          { text: `Smile`, why: `That's Rule 5.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `A new team member keeps being late for morning stand-up. You struggled with mornings too. What's the Dillistone move?`,
        options: [
          { text: `"Be on time from now on."`, why: `Direct, and the "you" makes it personal.` },
          { text: `"I was always late when I started, it nearly cost me. Two alarms and laying out my stuff the night before fixed it. Would something like that help?"` },
          { text: `Move stand-up later for everyone`, why: `That avoids the conversation entirely.` },
        ],
        answer: 1,
        explanation: `Your weakness, your fix, offered as help.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: when you next need to correct someone, share a weakness of your own and the tool that helped you. What did you share, and did they use it?`,
    starters: [`My own weakness is...`, `What helps me is...`, `They...`],
  },
  deepen: {
    title: `Your black book`,
    summary: `What's your equivalent of Dillistone's spelling book, the habit or tool that covers a weakness of yours? It's the perfect thing to share next time someone struggles with the same thing.`,
  },
  notes: `Source: Carnegie, Part Four ch. 3: E. G. Dillistone of Brandon, Manitoba, his secretary's spelling (two or three errors per page) and his little black thumb-index book; "it isn't nearly so difficult to listen to a recital of your faults if the person criticizing begins by humbly admitting that he, too, is far from impeccable". Retold in our own words.`,
};

export default lesson;
