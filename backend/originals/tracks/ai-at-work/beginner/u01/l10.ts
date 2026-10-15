import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9, with lessons 1–4 mixed in. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: readers, examples, options',
  summary: 'Who it is for, showing what good looks like, choosing between options, and steering. All mixed together.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can tailor, show, choose and steer', 'Combine it with Who, What, Why, How'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint two! Since the last one you learned four moves. Can you name one?', replies: ["Say who it's for", 'Show an example', 'Ask for options'] },
        { tey: 'Yes. And the fourth: steer with a follow-up instead of starting over. Today mixes all four with the basics.' },
        { tey: 'Fair warning: some of these have two answers that look right. Read carefully. Let\'s go.' },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's launch week.",
    items: [
      {
        kind: 'mcq',
        prompt: 'Which reader description helps the AI most?',
        options: [
          { text: '"For an important client"', why: 'Important how? No useful detail.' },
          { text: '"For Lucía, a client who reads on her phone and does not know technical terms"' },
          { text: '"For a person"', why: 'Says nothing about how to write.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which move is this?',
        groups: ['Reader', 'Example', 'Options'],
        items: [
          { text: 'For my manager, who likes 3 bullets', group: 0 },
          { text: 'Here is an update she liked: [example]', group: 1 },
          { text: 'Give me 4 versions in different styles', group: 2 },
          { text: 'For a new colleague on day one', group: 0 },
          { text: 'Match the tone of this intro: [intro]', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What does "blocked on client" mean in your update?',
        prompt: 'Ada used developer language. Which reply is best?',
        options: [
          { text: "Sorry, jargon! It means we just need your OK on the colours to keep going." },
          { text: 'It is a status in our tracking tool.', why: 'Still jargon. Translate it.' },
          { text: 'Nothing important.', why: 'It is important: it is the one thing she needs to do.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a follow-up that protects the good part.',
        tiles: ['Keep', 'the', 'first', 'line,', 'shorten', 'the', 'rest'],
        distractors: ['delete', 'all'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the risky line in this example request.',
        lines: [
          'Here is a client email I liked:',
          '"Dear Mr Okoro, your account number 0042-1187 is now active..."',
          'Write my welcome email in the same warm tone.',
        ],
        bug: 1,
        fix: '"Dear [name], your account is now active..."',
        explanation: 'Remove private details from examples before pasting them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its move.',
        pairs: [
          ["Say who it's for", 'Tailors tone and length'],
          ['Show what good looks like', 'Pins down the style'],
          ['Ask for options', 'Gives you a choice'],
          ["Steer, don't start over", 'Fixes a nearly-right draft'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'When a draft is nearly right, you should ... it (one word)',
        answers: ['steer', 'refine', 'edit', 'fix'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Lucía needs a launch subject line by tonight. Which request is best?',
        options: [
          { text: 'Write a subject line.', why: 'One guess, no reader, no style.' },
          { text: 'Write 20 subject lines.', why: 'Too many, and probably all alike.' },
          {
            text: 'Give me 4 subject lines for our sign-up launch email to existing customers, each a different style (curious, benefit, short, playful), under 8 words.',
          },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the "show it" request.',
        template: 'Here is an intro Lucía [[1]]: [example]. Match its [[2]], but write about the new [[3]] flow.',
        blanks: [['liked', 'loved'], ['tone', 'style'], ['sign-up']],
        distractors: ['hated', 'typos', 'pricing'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s full routine for an important message.',
        lines: [
          'Say who it is for',
          'Give the facts and the goal',
          'Ask for 3 options in different styles',
          'Pick one and steer it with a specific follow-up',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four moves (reader, example, options, steer) will save you the most time at work? Why?',
    starters: ['The move that helps me most is...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Use all four moves on one real message this week.' },
  notes: 'Review only. No new claims.',
};

export default lesson;
