import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7 (Story) — Rule 12: if you're wrong, admit it quickly and emphatically. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: `Beat Them to It`,
  summary: `A police officer had warned Carnegie: let your dog off the lead in this park again and you'll tell it to the judge. A week later, the dog came racing over a hill straight towards the same officer.`,
  minutes: 11,
  outcomes: [
    `Admit a mistake before anyone else points it out`,
    `Say the critical things about yourself before the other person can`,
    `See how self-criticism takes the fight out of people`,
  ],
  learn: [
    {
      kind: `myth`,
      statements: [
        {
          text: `If you've broken a rule, it's smartest to say nothing until you're caught.`,
          isFact: false,
          explain: `Wait, and you face their criticism. Get in first, and you usually face their mercy. You're about to see it happen.`,
        },
        {
          text: `Criticism is easier to hear from your own mouth than from someone else's.`,
          isFact: true,
          explain: `Carnegie asks: isn't it far easier to listen to self-criticism than to bear condemnation from someone else?`,
        },
      ],
    },
    {
      kind: `story`,
      title: `Rex and the mounted policeman`,
      beats: [
        { speaker: `narrator`, text: `Near Carnegie's home was a wild woodland park. He often walked there with Rex, his friendly little bulldog, without a lead or a muzzle, since they hardly ever met anyone.` },
        { speaker: `narrator`, text: `One day a mounted policeman, itching to show his authority, told him off: a dog loose without a muzzle was against the law. It might kill a squirrel or bite a child. He'd let him off this time. Next time, he could tell it to the judge.` },
        { speaker: `narrator`, text: `Carnegie obeyed, for a while. But Rex hated the muzzle, and so did Carnegie. One afternoon they raced over the top of a hill, and there, on a bay horse, was the law. Rex was running straight at him.` },
      ],
      choice: {
        prompt: `What did Carnegie do?`,
        options: [
          { text: `Explained that Rex was harmless`, outcome: `Ever argued with a police officer? Carnegie didn't try.` },
          { text: `Got in first: "Officer, you've caught me red-handed. I'm guilty. No excuses. You warned me last week."`, outcome: `That's it. The officer softened at once: it's tempting to let a little dog run when nobody's around. "Sure," said Carnegie, "but it's against the law." Soon the officer was telling him to let Rex run over the hill where he couldn't see, and forget all about it.`, best: true },
          { text: `Called Rex and walked off quickly`, outcome: `He'd have been caught anyway, and found guilty of dodging, too.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `Why it works`,
      html:
        `<p>The policeman, being human, wanted to feel important. When Carnegie condemned himself, the only way left for the officer to feel important was to be generous and show mercy.</p>` +
        `<p>If you know you're going to be told off anyway, isn't it better to get there first and do it yourself? It's much easier to hear criticism from your own mouth than from someone else's.</p>` +
        `<p>Say about yourself all the critical things you know the other person is thinking or about to say, and say them before they get the chance. The odds are a hundred to one they'll be generous and play down your mistake.</p>`,
    },
    {
      kind: `compare`,
      title: `The art director`,
      before: {
        label: `What the artist expected`,
        text: `Ferdinand Warren drew for an art director who loved finding fault. One rush job came back: something was wrong. Warren arrived to find him hostile and gloating, ready to tear into him.`,
      },
      after: {
        label: `What happened`,
        text: `Warren said: "If that's true, it's my fault and there's no excuse. I've worked for you long enough to know better. I'm ashamed of myself. I'll redo it." The director immediately started defending him: it was only a small thing, no money lost, no need to redo it. He ended up taking Warren to lunch and giving him another job.`,
      },
      notes: [
        `Warren said it was the first time he'd ever criticised himself, and he loved it.`,
        `His eagerness to blame himself took all the fight out of the other man.`,
      ],
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `Rule 12: If you're wrong, admit it quickly and emphatically. Say what they were about to say, before they say it.`,
    },
  ],
  apply: {
    scenario: `Rule 12: Admit it quickly.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did Carnegie say when the officer caught him the second time?`,
        options: [
          { text: `That Rex was harmless`, why: `He didn't defend himself at all.` },
          { text: `That he was guilty, with no excuses` },
          { text: `That the law was unfair`, why: `He agreed it was the law.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `Why did the officer become generous?`,
        options: [
          { text: `He liked dogs`, why: `He'd threatened a fine a week before.` },
          { text: `With Carnegie condemning himself, showing mercy was the only way left for the officer to feel important` },
          { text: `He was tired`, why: `It was about his sense of importance.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The rule.`,
        template: `If you're wrong, admit it [[1]] and [[2]].`,
        blanks: [[`quickly`], [`emphatically`]],
        distractors: [`quietly`, `eventually`],
      },
      {
        kind: `sortGroups`,
        prompt: `Admitting it, or defending it?`,
        groups: [`Admitting it`, `Defending it`],
        items: [
          { text: `"That's on me. I should have checked."`, group: 0 },
          { text: `"Well, nobody told me the deadline moved."`, group: 1 },
          { text: `"You warned me, and I didn't listen."`, group: 0 },
          { text: `"It's not that big a deal."`, group: 1 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `What breed was Carnegie's dog Rex? A Boston ________. (one word)`,
        answers: [`bulldog`, `terrier`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Your manager is about to raise your missed deadline. Which line spoils your admission?`,
        lines: [
          `Before you say anything, I missed the deadline and I'm sorry.`,
          `I should have flagged it earlier.`,
          `But to be fair, the brief kept changing.`,
        ],
        bug: 2,
        fix: `I'll have it to you by noon tomorrow.`,
        explanation: `"But to be fair" turns the admission back into a defence. Admit it fully, then offer the fix.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their admission.`,
        pairs: [
          [`Carnegie`, `"You've caught me red-handed"`],
          [`Ferdinand Warren`, `"I'm ashamed of myself"`],
          [`Harold Reinke`, `"We may have got it wrong"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 2): what did the stockbroker do every morning after his week of smiling?`,
        options: [
          { text: `Smiled and greeted his wife warmly` },
          { text: `Read the paper in silence`, why: `That was the old him.` },
          { text: `Left before anyone woke`, why: `He made breakfast a happier time.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Beat them to it.`,
        tiles: [`You're`, `right`, `to`, `be`, `annoyed.`, `It's`, `my`, `fault.`],
        distractors: [`your`],
      },
      {
        kind: `mcq`,
        prompt: `You forgot your friend's important exam day and didn't text good luck. They're clearly hurt. What does Rule 12 say?`,
        options: [
          { text: `Wait to see if they bring it up`, why: `Waiting lets the hurt grow.` },
          { text: `Go first: "I completely forgot your exam. No excuse. I'm really sorry. How did it go?"` },
          { text: `Explain how busy your week was`, why: `That's a defence. They'll hear "I mattered less than my week."` },
        ],
        answer: 1,
        explanation: `Say what they're thinking before they say it. It almost always melts the hurt.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: own one small mistake today before anyone mentions it. Say it plainly, no excuses. How did the other person react?`,
    starters: [`My mistake was...`, `I said...`, `They...`],
  },
  deepen: {
    title: `More fun than defending`,
    summary: `Carnegie said admitting your mistakes, believe it or not, is a lot more fun than defending yourself. Warren loved it. Try it once and see if you agree.`,
  },
  notes: `Source: Carnegie, Part Three ch. 3 "If You're Wrong, Admit It": Forest Park, Rex the Boston bulldog, the mounted policeman (both encounters), "say about yourself all the derogatory things", Ferdinand E. Warren and the art director. Retold in our own words.`,
};

export default lesson;
