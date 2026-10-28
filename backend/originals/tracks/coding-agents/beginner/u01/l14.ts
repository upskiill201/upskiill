import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14 — What it costs: time, money, attention. */

const START = 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n';
const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const WEAK = 'Write is_at_risk so it flags late deliveries. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l14',
  title: 'What it costs',
  summary: 'Brian asks the manager\'s question: "What does the agent cost us?" Tey adds up three bills: money for tokens, time waiting, and the attention it takes to check the work.',
  minutes: 12,
  outcomes: [
    'Estimate the token cost of an agent session',
    'See why a vague brief costs more in every way',
    'Count your own checking time as part of the cost',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Three bills. One: money. Agents run on AI models priced per token, the pieces of text they read and write. Reading files costs tokens, so big projects cost more.', replies: ['How much is a session?'] },
        { tey: 'The practice agent estimates its tokens. Felix\'s good brief used 4,500. At a made-up $5 per million tokens, that\'s about $0.02. Real sessions on real projects use far more: often hundreds of thousands.', replies: ['And the other two bills?'] },
        { tey: 'Two: time waiting while it works. Three, the one people forget: your attention. A vague brief that weakens the tests costs 6,600 tokens AND an hour of your time untangling it.', replies: ['So a good brief is cheaper?'] },
        { tey: 'In every way. Fewer tokens, less waiting, and less to check. The cheapest agent session is the one with a clear brief.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tokens for two briefs',
      caption: 'Practice estimates and a made-up price of $5 per million tokens.',
      code: START + `\nfor brief in [${JSON.stringify(GOOD)}, ${JSON.stringify(WEAK)}]:\n    change = PracticeAgent().run(brief, Project())\n    print(change.tokens, "tokens, about $" + str(round(change.tokens * 5 / 1_000_000, 4)), "|", len(change.files_touched), "files to check")\n`,
      challenge: 'Add "make the delivery thing". Cheapest, but useful?',
    },
  ],
  apply: {
    scenario: 'Counting the cost.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the good brief and print its token estimate',
        starter: START + `brief = ${JSON.stringify(GOOD)}\n`,
        solution: START + `brief = ${JSON.stringify(GOOD)}\nchange = PracticeAgent().run(brief, project)\nprint(change.tokens)\n`,
        hint: 'change.tokens',
        checks: [{ message: 'Print 4500', outputEquals: '4500' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which cost do people forget most?',
        options: [
          { text: 'The token bill', why: 'That one shows up on an invoice.' },
          { text: 'Their own attention, checking the work' },
          { text: 'The waiting time', why: 'People notice waiting; they forget the checking.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the cost in dollars of 4,500 tokens at $5 per million, rounded to 4 places',
        starter: 'tokens = 4500\nprice_per_million = 5\n',
        solution: 'tokens = 4500\nprice_per_million = 5\nprint(round(tokens * price_per_million / 1_000_000, 4))\n',
        hint: 'tokens * price_per_million / 1_000_000',
        checks: [{ message: 'Print 0.0225', outputEquals: '0.0225' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brief to its practice token estimate.',
        pairs: [
          ['"make the delivery thing"', '3000'],
          ['Felix\'s good brief', '4500'],
          ['Vague brief that weakens tests', '6600'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Raises the cost of a session, or lowers it?',
        groups: ['Raises it', 'Lowers it'],
        items: [
          { text: 'A vague brief', group: 0 },
          { text: 'Saying exactly which file to change', group: 1 },
          { text: 'Letting it read the whole project for a one-line fix', group: 0 },
          { text: 'A clear "done when"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Two cents a session? Then let\'s run it all day on everything!',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Great idea.', why: 'Every change still needs checking.' },
          { text: 'It\'s too expensive to use.', why: 'For clear jobs it\'s good value.' },
          { text: 'The tokens are cheap here; my checking time isn\'t. Real sessions also cost more. Clear jobs only, and I check each one.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(6600 - 4500)',
        language: 'python',
        options: [
          { text: '2100' },
          { text: '11100', why: 'It subtracts.' },
          { text: '-2100', why: '6600 is bigger.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Three bills.',
        template: 'Money for [[1]], time waiting, and your [[2]].',
        blanks: [['tokens'], ['attention']],
        distractors: ['GPUs', 'salary'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s cost note is misleading?',
        lines: [
          'Practice estimate: 4,500 tokens per good session.',
          'At $5 per million, about $0.02.',
          'So agent work is free.',
          'My checking time is the bigger cost.',
        ],
        bug: 2,
        fix: 'Tokens are cheap here; real sessions cost more, and checking time counts.',
        explanation: 'Small isn\'t free, and attention costs the most.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the pieces of text an AI model is priced by called?',
        answers: ['tokens', 'token'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something "cheap" that cost you lots of time to fix. What was the real cost?',
    starters: ['It looked cheap because...', 'The real cost was...'],
  },
  deepen: {
    title: 'Plans and limits',
    summary: 'Real agents are paid by subscription, by usage, or both, and many have usage limits. Long sessions on big projects use the most. Chapter 3\'s small steps keep sessions short.',
  },
  notes: 'Practice agent token estimates (2000 + 600 per read + 400 per edit + 300 per test run): "make the delivery thing" 3000; good brief 4500; vague brief with weakened tests 6600. $5 per million is a made-up practice price. Real coding agents are billed by subscription and/or usage (2026); real sessions often use far more tokens.',
};

export default lesson;
