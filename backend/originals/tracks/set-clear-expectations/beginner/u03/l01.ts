import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: Joel's "ready for review". Different ideas of "good". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Ready for review?',
  summary: 'Day 12. Joel\'s pull request says "Ready for review!" Arjun opens it: the order emails work, beautifully, in English. No Hindi. No tests. No message if the email fails. Joel is proud of it. To Joel, this IS good.',
  minutes: 11,
  outcomes: [
    'See why "good" means different things to different people',
    'Notice the difference between done and good',
    'Know this chapter\'s goal: everyone can see what good looks like',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 12, 5:40 p.m.',
      beats: [
        { speaker: 'joel', text: 'Ready for review! The emails look great. I tested them on my phone.' },
        { speaker: 'narrator', text: 'Arjun\'s standard for "ready for review": tests, Hindi, error handling, no secrets in the code. Joel\'s last job had no tests at all, so "tested on my phone" is honestly his normal.' },
        { speaker: 'narrator', text: 'Arjun has 30 comments typed. He hasn\'t sent them. He knows exactly how Joel will feel when 30 red comments land at 5:40 p.m.' },
      ],
      choice: {
        prompt: 'What should Arjun do?',
        options: [
          {
            text: 'Hold the 30 comments. Message Joel: "This works really well. My bar for review isn\'t written down anywhere. Can we make a checklist together tomorrow?"',
            outcome: 'Next morning, 20 minutes: a 7-line review checklist. Joel fixes his own PR against it by lunch. Arjun leaves three comments, not thirty.',
            best: true,
          },
          {
            text: 'Send all 30 comments now. He needs to learn.',
            outcome: 'Joel works until midnight, fixing comments one by one, and learns that "ready for review" means "ready to be hit with a list".',
          },
          {
            text: 'Fix it all himself tonight.',
            outcome: 'Faster tonight. Joel\'s next PR has the same gaps, because he never saw what was missing.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Chapters 1 and 2 made the <em>what</em> and the <em>who</em> clear. But two people can agree on the task and the owner and still disagree about <strong>how good</strong> it needs to be. Joel brought the standard from his last job. Arjun's standard lived in his head, again. <strong>This chapter:</strong> quality bars, early drafts, priorities and trade-offs, realistic deadlines, checking understanding, and what \"good enough\" means.</p>",
    },
  ],
  apply: {
    scenario: 'Day 12, the pull request.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Joel think his work is ready?',
        options: [
          { text: 'He\'s careless', why: 'He\'s the most careful person on the team.' },
          { text: 'It meets the standard from his last job; Arjun\'s was never written down' },
          { text: 'He wanted to go home', why: 'He\'s genuinely proud of it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Joel\'s idea of good, or Arjun\'s?',
        groups: ['Joel\'s', 'Arjun\'s'],
        items: [
          { text: 'Tested on my phone', group: 0 },
          { text: 'Automated tests', group: 1 },
          { text: 'Looks great in English', group: 0 },
          { text: 'A message if the email fails', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Did you get a chance to look at my PR?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, 30 comments coming.', why: 'A wall of red at 5:40 p.m.' },
          { text: 'Don\'t worry, I fixed it.', why: 'Joel never learns what was missing.' },
          { text: 'Yes, the emails work really well. I\'ve never written down my bar for review. Can we make a checklist together tomorrow, then you check it against that?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'People bring the quality bar from their last ___. (one word)',
        answers: ['job', 'Job', 'team', 'workplace'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s better response in order.',
        lines: ['Say what works', 'Own the missing standard', 'Write the checklist together', 'Joel checks his own work against it'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between "done" and "good"?',
        options: [
          { text: 'Done is finished; good is how well it\'s finished' },
          { text: 'They\'re the same', why: 'Joel\'s emails were done, not yet good enough.' },
          { text: 'Good is faster', why: 'Good is about quality, not speed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s message. Which line makes it personal?',
        lines: [
          'The emails work really well on my phone too.',
          'Honestly, I expected more from someone careful like you.',
          'Let\'s write my review checklist together tomorrow.',
        ],
        bug: 1,
        fix: 'My bar for review isn\'t written down. That\'s on me.',
        explanation: 'He couldn\'t meet a bar he never saw. Disappointment lands as blame.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 2 review.',
        pairs: [
          ['RACI', 'Who does, owns, advises, hears'],
          ['Commander\'s intent', 'The why and the end result'],
          ['Working agreement', 'How we work together'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Everyone can [[1]] what good looks like before they [[2]].',
        blanks: [['see'], ['start', 'begin']],
        distractors: ['guess', 'finish'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s honest line.',
        tiles: ['My', 'bar', 'isn\'t', 'written', 'down.'],
        distractors: ['your'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of work you were proud of that someone else thought wasn\'t good enough. Whose standard was it, and had you seen it?',
    starters: ['I was proud of...', 'Their standard was...'],
  },
  deepen: {
    title: 'Write your bar',
    summary: 'Pick one kind of work you often review. Write the five things you always check. That\'s your bar, finally visible.',
  },
  notes: 'Story setup. Differing quality standards carried from previous roles; making review criteria explicit (code-review checklists are common engineering practice). Fictional events.',
};

export default lesson;
