import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 19 — The model decision: Joel writes it down, Arjun signs it. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The model decision',
  summary: 'Friday. Joel writes the decision on one page: what Ask Rao uses, why, what it costs, and what happens if something breaks. Kavya reads it twice and agrees with all of it.',
  minutes: 12,
  outcomes: [
    'Write a model decision as a short record',
    'Give the evidence for each choice',
    'Build the decision as a Python dictionary',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One page',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s page has five lines.' },
        { speaker: 'joel', text: 'Default: model-c, through a hosted API. Same 20 of 30 as the others, about $1.08 a month. Open-weight, permissive licence.' },
        { speaker: 'joel', text: 'Hard messages: anything long or marked "complaint" routes to model-a. Blend: about $6.37 a month.' },
        { speaker: 'joel', text: 'Backup: model-b, already tested, if model-c\'s host is down.' },
        { speaker: 'joel', text: 'Rules: redact phones and emails, send only the matching help-page lines, spending limit set, re-test on every new version.' },
        { speaker: 'kavya', text: 'Monday I wanted model-a for everything at $54. This is better, and I can see why.' },
        { speaker: 'arjun', text: 'Signed. Now, why are we wrong ten times out of thirty?' },
        { speaker: 'tey', text: 'Because finding the right line is a job of its own. Next chapter: how words become numbers you can search.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The decision as data',
      caption: 'A record the code can read.',
      code: 'decision = {\n    "default": "model-c",\n    "hard": "model-a",\n    "backup": "model-b",\n    "monthly_budget": 6.37,\n    "pass_mark": 20,\n}\nfor key, value in decision.items():\n    print(f"{key}: {value}")\n',
      challenge: 'Add "sorter": "practice-tiny".',
    },
  ],
  apply: {
    scenario: 'Writing it down.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the backup model from the decision',
        starter: 'decision = {"default": "model-c", "hard": "model-a", "backup": "model-b"}\n',
        solution: 'decision = {"default": "model-c", "hard": "model-a", "backup": "model-b"}\nprint(decision["backup"])\n',
        hint: 'decision["backup"]',
        checks: [{ message: 'Print model-b', outputEquals: 'model-b' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is model-c the default?',
        options: [
          { text: 'It\'s the newest', why: 'The test and the price decided it.' },
          { text: 'It scored the same 20 of 30 as the others and costs the least' },
          { text: 'It\'s the biggest', why: 'It\'s the smallest of the three.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the role to the model in Joel\'s decision.',
        pairs: [
          ['Default', 'model-c'],
          ['Hard messages', 'model-a'],
          ['Backup', 'model-b'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the decision record, or not?',
        groups: ['In the record', 'Leave out'],
        items: [
          { text: 'Score on our 30 questions', group: 0 },
          { text: 'Monthly cost', group: 0 },
          { text: '"model-a feels smarter"', group: 1 },
          { text: 'A screenshot of a leaderboard', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'If I read this in six months, what tells me whether it\'s still right?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Nothing; decisions are forever.', why: 'Models and prices change all the time.' },
          { text: 'Ask Kavya what she thinks.', why: 'Re-run the evidence, not opinions.' },
          { text: 'Run the 30 questions again and check the bill. If the scores or prices changed, the record says how to decide again.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'decision = {"default": "model-c", "monthly_budget": 6.37}\nprint(decision["monthly_budget"] < 54)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '6.37 is less than 54.' },
          { text: '6.37', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add "sorter": "practice-tiny" to the decision, then print how many entries it has',
        starter: 'decision = {"default": "model-c", "hard": "model-a", "backup": "model-b"}\n',
        solution: 'decision = {"default": "model-c", "hard": "model-a", "backup": "model-b"}\ndecision["sorter"] = "practice-tiny"\nprint(len(decision))\n',
        hint: 'decision["sorter"] = "practice-tiny" then len(decision)',
        checks: [
          { message: 'Print 4', outputEquals: '4' },
          { message: 'The sorter is practice-tiny', expr: 'decision["sorter"] == "practice-tiny"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Joel\'s summary.',
        template: 'Default model-[[1]], hard messages to model-[[2]], backup model-b.',
        blanks: [['c'], ['a']],
        distractors: ['b', 'tiny'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the decision record isn\'t backed by evidence?',
        lines: [
          'Default: model-c (20/30, $1.08 a month).',
          'Backup: model-b (20/30, tested).',
          'model-a is smarter, so it should answer everything.',
          'Re-test on every new model version.',
        ],
        bug: 2,
        fix: 'Hard messages only route to model-a (blend about $6.37 a month).',
        explanation: 'The test showed no gain from model-a on normal questions.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how much a month does the routed plan cost, in dollars?',
        answers: ['6.37', '$6.37', '6'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Kavya changed her mind because she could see the evidence. When has evidence changed your mind about something?',
    starters: ['I changed my mind when...', 'What convinced me was...'],
  },
  deepen: {
    title: 'Decision records',
    summary: 'Engineering teams keep short "decision records": the choice, the options, the evidence and the date. They stop the same argument happening every few months.',
  },
  notes: 'Chapter 4 decision: default model-c via hosted API (20/30, $1.08/month at 30,000 chats), hard messages routed to model-a (blend 0.9/0.1 = $6.37), backup model-b. All numbers measured with teyro_ai. Architecture decision records (ADRs) are a common engineering practice.',
};

export default lesson;
