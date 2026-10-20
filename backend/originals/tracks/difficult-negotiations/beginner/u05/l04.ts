import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: saving face for both sides. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Saving face',
  summary: 'Mr Pryce has a boss and a savings target. If he looks like he lost, he may stall the signature. Tey explains how to help the other side look good, without giving anything away.',
  minutes: 12,
  outcomes: [
    'Understand why saving face matters in hard deals',
    'Give the other side a story they can tell their boss',
    'Avoid gloating, even when you did well',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Pryce has to explain this deal to his finance director. If his story is "I lost", he\'ll find reasons to delay.', replies: ['So what\'s his story?'] },
        { tey: 'Help him write it: "We got £6,000 off the first quote, and launch support included, worth £4,000. The only team that can make spring." That\'s a good report.', replies: ['Do I say that to him?'] },
        { tey: 'Put it in your summary email: "Thanks for pushing for a strong package. Including launch support at £42,000 gives you full cover through the spring sale." True, and it helps him.', replies: ['And Kavya wants to celebrate online.'] },
        { tey: 'Celebrate privately. A public "we beat procurement!" post is the fastest way to make a client regret signing. Let them feel they did well, because they did.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Give the other side a true story they can be proud of. Celebrate privately; never gloat.',
    },
  ],
  apply: {
    scenario: 'Pryce\'s report to his boss.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does saving face matter for Mr Pryce?',
        options: [
          { text: 'If he looks like he lost, he may stall or reopen the deal' },
          { text: 'It doesn\'t; the deal is done', why: 'Nothing is signed yet.' },
          { text: 'He wants to be friends', why: 'He has a target and a boss.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps him save face, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: '"Thanks for pushing for a strong package."', group: 0 },
          { text: '"We got way more than you wanted to pay!"', group: 1 },
          { text: '"Support included gives full spring cover."', group: 0 },
          { text: 'A LinkedIn post: "We beat procurement!"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saving off the first quote (£6,000) plus included support (£4,000). Total value Pryce can report, in pounds?',
        answers: ['10000', '10,000', '£10,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Can I post "We held our price against a giant" online?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Celebrate with the team, privately. A public post makes them feel beaten and regret signing.' },
          { text: 'Yes, tag them.', why: 'That humiliates the client.' },
          { text: 'Post it anonymously.', why: 'They\'ll recognise it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it gives Pryce.',
        pairs: [
          ['"£6,000 off the first quote"', 'A saving to report'],
          ['"Support included"', 'Extra value'],
          ['"The only team that can make spring"', 'A reason the choice was right'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Give them a [[1]] story. Celebrate [[2]].',
        blanks: [['true'], ['privately']],
        distractors: ['fake', 'publicly'],
      },
      {
        kind: 'mcq',
        prompt: 'Is helping Pryce save face the same as giving him more money?',
        options: [
          { text: 'No. It\'s framing true facts so his report looks good' },
          { text: 'Yes', why: 'The price doesn\'t change.' },
          { text: 'It means lying for him', why: 'Every fact in the story is true.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Arjun\'s summary email hurts Pryce\'s face?',
        lines: [
          'Thanks for pushing for a strong package.',
          '£42,000 includes launch support through spring.',
          'Glad you finally came round to our price.',
          'Statement of work attached for signature.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '"Finally came round" says he lost.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The package is how many pounds below the £48,000 first quote?',
        answers: ['6000', '6,000', '£6,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the summary email.',
        lines: ['Thank them for the work', 'State the package', 'Highlight what they gained', 'Attach the statement of work'],
      },
    ],
  },
  reflect: {
    prompt: 'After your last tough negotiation, did the other side leave looking good? What could you have said to help?',
    starters: ['They left feeling...', 'I could have said...'],
  },
  deepen: {
    title: 'Face',
    summary: 'In Getting to Yes, Fisher and Ury stress that people need to be able to accept a deal without feeling they\'ve backed down. Helping them save face often matters as much as the numbers.',
  },
  notes: 'Face-saving: Fisher, Ury & Patton, Getting to Yes ("make it easy for them to agree"); Ury, Getting Past No step 4 "Build them a golden bridge". Fictional: £6,000 saving + £4,000 support value.',
};

export default lesson;
